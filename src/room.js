import { DurableObject } from "cloudflare:workers";
import { MAX_HUMANS, json, parseJsonMessage, safeText, send } from "./protocol.js";
import { ADJACENCY, CHARACTERS, REGIONS, createServerPlayer, isValidCharacter, isValidRegion, movementProfile } from "./game_data.js";

const ROOM_META_KEY = "room_meta";
const MATCH_KEY = "match_state";

export class GameRoom extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sessions = new Map();
    for (const ws of this.ctx.getWebSockets()) {
      const attachment = ws.deserializeAttachment();
      if (attachment?.sessionId) this.sessions.set(ws, attachment);
    }
    this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong"));
  }

  async getMeta() { return (await this.ctx.storage.get(ROOM_META_KEY)) || null; }
  async saveMeta(meta) { await this.ctx.storage.put(ROOM_META_KEY, meta); }
  async getMatch() { return (await this.ctx.storage.get(MATCH_KEY)) || null; }
  async saveMatch(match) { await this.ctx.storage.put(MATCH_KEY, match); }

  joinedSessions() {
    return [...this.sessions.values()].filter((s) => s.joined).sort((a,b)=>(a.joinedAt||0)-(b.joinedAt||0));
  }

  connectedPlayers(meta) {
    return this.joinedSessions().map((s) => ({
      sessionId:s.sessionId, playerName:s.playerName, charId:s.charId, startRegion:s.startRegion||"city",
      ready:!!s.ready, joinedAt:s.joinedAt, host:meta.hostSessionId===s.sessionId
    }));
  }

  roomState(meta) {
    const players=this.connectedPlayers(meta);
    return {
      code:meta.code, phase:meta.phase||"lobby", createdAt:meta.createdAt, maxHumans:MAX_HUMANS, players,
      humanCount:players.length, allReady:players.length>=2&&players.every((p)=>p.ready),
      hostSessionId:meta.hostSessionId||null, protocolVersion:2, serverVersion:"phase-2a"
    };
  }

  broadcast(type,payload={}) { for (const ws of this.sessions.keys()) send(ws,type,payload); }
  async broadcastRoomState(meta) { this.broadcast("room_state",{room:this.roomState(meta)}); }
  matchPlayerForSession(match,sessionId) { return match?.players?.find((p)=>p.sessionId===sessionId)||null; }

  matchSnapshotFor(match,sessionId) {
    if(!match) return null;
    const self=this.matchPlayerForSession(match,sessionId);
    const others=match.players.filter((p)=>p.sessionId!==sessionId).map((p)=>({
      playerId:p.playerId, playerName:p.playerName, charId:p.charId, alive:p.alive, kills:p.kills
    }));
    return {
      matchId:match.matchId, phase:match.phase, createdAt:match.createdAt, startedAt:match.startedAt,
      serverNow:Date.now(), self, others, aliveCount:match.players.filter((p)=>p.alive).length,
      regions:REGIONS, adjacency:ADJACENCY
    };
  }

  sendMatchState(ws,match) {
    const session=this.sessions.get(ws)||ws.deserializeAttachment();
    if(session?.sessionId) send(ws,"match_state",{match:this.matchSnapshotFor(match,session.sessionId)});
  }
  broadcastMatchState(match) { for(const ws of this.sessions.keys()) this.sendMatchState(ws,match); }

  async scheduleNextAlarm(match) {
    const times=match.players.map((p)=>p.pendingAction?.completeAt).filter(Number.isFinite);
    if(times.length) await this.ctx.storage.setAlarm(Math.min(...times));
  }

  async completeDueActions(match,now=Date.now()) {
    let changed=false;
    for(const p of match.players) {
      const action=p.pendingAction;
      if(!action||action.completeAt>now) continue;
      if(action.type==="move"&&p.alive&&(ADJACENCY[p.region]||[]).includes(action.to)&&p.sp>=action.spCost) {
        p.region=action.to;
        p.sp=Math.max(0,p.sp-action.spCost);
      }
      p.pendingAction=null;
      changed=true;
    }
    if(changed) {
      match.updatedAt=now;
      await this.saveMatch(match);
      this.broadcastMatchState(match);
    }
    return changed;
  }

  async alarm() {
    const match=await this.getMatch();
    if(!match||match.phase!=="playing") return;
    await this.completeDueActions(match,Date.now());
    await this.scheduleNextAlarm(match);
  }

  async fetch(request) {
    const url=new URL(request.url), path=url.pathname;
    if(path==="/init"&&request.method==="POST") {
      const body=await request.json().catch(()=>({}));
      const existing=await this.getMeta();
      if(existing) return json({ok:false,reason:"exists",room:this.roomState(existing)},409);
      const meta={code:safeText(body.code,8,"ROOM"),createdAt:Date.now(),phase:"lobby",hostSessionId:null};
      await this.saveMeta(meta);
      return json({ok:true,room:this.roomState(meta)},201);
    }

    const meta=await this.getMeta();
    if(!meta) return json({ok:false,error:"room_not_found"},404);

    if(path==="/status"&&request.method==="GET") {
      const match=await this.getMatch();
      return json({ok:true,room:this.roomState(meta),matchPhase:match?.phase||null});
    }

    if(path==="/ws") {
      const upgrade=request.headers.get("Upgrade");
      if(!upgrade||upgrade.toLowerCase()!=="websocket") return json({ok:false,error:"websocket_required"},426);
      if(meta.phase==="lobby"&&this.connectedPlayers(meta).length>=MAX_HUMANS) return json({ok:false,error:"room_full"},409);

      const pair=new WebSocketPair(), [client,server]=Object.values(pair);
      this.ctx.acceptWebSocket(server);
      const session={sessionId:crypto.randomUUID(),joined:false,playerName:"Player",charId:"c01",startRegion:"city",ready:false,joinedAt:Date.now()};
      server.serializeAttachment(session);
      this.sessions.set(server,session);
      send(server,"connected",{
        sessionId:session.sessionId,room:this.roomState(meta),
        catalog:{characters:CHARACTERS.map((c)=>({id:c.id,name:c.name,arch:c.arch})),regions:REGIONS}
      });
      return new Response(null,{status:101,webSocket:client});
    }
    return json({ok:false,error:"not_found"},404);
  }

  async webSocketMessage(ws,message) {
    const msg=parseJsonMessage(message);
    const session=this.sessions.get(ws)||ws.deserializeAttachment();
    const meta=await this.getMeta();
    if(!msg||!session||!meta) { send(ws,"error",{error:"invalid_message"}); return; }

    if(msg.type==="hello") {
      if(meta.phase!=="lobby") { send(ws,"error",{error:"match_already_started"}); return; }
      if(!session.joined&&this.connectedPlayers(meta).length>=MAX_HUMANS) { send(ws,"error",{error:"room_full"}); ws.close(4001,"Room full"); return; }
      session.joined=true;
      session.playerName=safeText(msg.playerName,20,"Player");
      session.charId=isValidCharacter(msg.charId)?msg.charId:"c01";
      session.startRegion=isValidRegion(msg.startRegion)?msg.startRegion:"city";
      session.ready=false;
      session.joinedAt ||= Date.now();
      if(!meta.hostSessionId) { meta.hostSessionId=session.sessionId; await this.saveMeta(meta); }
      ws.serializeAttachment(session); this.sessions.set(ws,session);
      send(ws,"hello_ok",{sessionId:session.sessionId,host:meta.hostSessionId===session.sessionId});
      await this.broadcastRoomState(meta); return;
    }

    if(!session.joined) { send(ws,"error",{error:"hello_required"}); return; }

    if(msg.type==="set_ready") {
      if(meta.phase!=="lobby") { send(ws,"error",{error:"match_already_started"}); return; }
      session.ready=!!msg.ready; ws.serializeAttachment(session); this.sessions.set(ws,session);
      await this.broadcastRoomState(meta); return;
    }

    if(msg.type==="set_character") {
      if(meta.phase!=="lobby") { send(ws,"error",{error:"match_already_started"}); return; }
      if(!isValidCharacter(msg.charId)) { send(ws,"error",{error:"invalid_character"}); return; }
      session.charId=msg.charId; session.ready=false; ws.serializeAttachment(session); this.sessions.set(ws,session);
      await this.broadcastRoomState(meta); return;
    }

    if(msg.type==="set_start_region") {
      if(meta.phase!=="lobby") { send(ws,"error",{error:"match_already_started"}); return; }
      if(!isValidRegion(msg.region)) { send(ws,"error",{error:"invalid_region"}); return; }
      session.startRegion=msg.region; session.ready=false; ws.serializeAttachment(session); this.sessions.set(ws,session);
      await this.broadcastRoomState(meta); return;
    }

    if(msg.type==="request_start") {
      const room=this.roomState(meta);
      if(meta.hostSessionId!==session.sessionId) { send(ws,"error",{error:"host_only"}); return; }
      if(!room.allReady) { send(ws,"error",{error:"not_all_ready"}); return; }
      if(meta.phase!=="lobby") { send(ws,"error",{error:"already_started"}); return; }
      const match={
        matchId:crypto.randomUUID(),phase:"playing",createdAt:Date.now(),startedAt:Date.now(),updatedAt:Date.now(),
        players:this.joinedSessions().map((s,i)=>createServerPlayer(s,i))
      };
      meta.phase="playing"; meta.startedAt=match.startedAt;
      await Promise.all([this.saveMeta(meta),this.saveMatch(match)]);
      this.broadcast("match_started",{matchId:match.matchId,serverNow:Date.now()});
      this.broadcastMatchState(match); return;
    }

    if(msg.type==="request_state") {
      const match=await this.getMatch();
      if(!match) { send(ws,"error",{error:"match_not_started"}); return; }
      await this.completeDueActions(match,Date.now());
      this.sendMatchState(ws,match); return;
    }

    if(msg.type==="command_move") {
      const match=await this.getMatch();
      if(!match||match.phase!=="playing") { send(ws,"error",{error:"match_not_playing"}); return; }
      await this.completeDueActions(match,Date.now());
      const p=this.matchPlayerForSession(match,session.sessionId);
      if(!p||!p.alive) { send(ws,"error",{error:"player_not_active"}); return; }
      if(p.pendingAction) { send(ws,"error",{error:"action_in_progress"}); return; }
      const to=String(msg.to||"");
      if(!isValidRegion(to)||!(ADJACENCY[p.region]||[]).includes(to)) { send(ws,"error",{error:"invalid_move"}); return; }
      const profile=movementProfile(p.region,to);
      if(p.sp<profile.spCost) { send(ws,"error",{error:"not_enough_sp"}); return; }
      const now=Date.now();
      p.pendingAction={type:"move",from:p.region,to,label:profile.label,spCost:profile.spCost,startedAt:now,completeAt:now+profile.durationMs};
      match.updatedAt=now;
      await this.saveMatch(match);
      await this.scheduleNextAlarm(match);
      send(ws,"action_accepted",{action:p.pendingAction});
      this.broadcastMatchState(match); return;
    }

    if(msg.type==="chat") {
      const text=safeText(msg.text,120,"");
      if(!text) return;
      this.broadcast("chat",{from:session.sessionId,playerName:session.playerName,text,at:Date.now()}); return;
    }

    send(ws,"error",{error:"unknown_message_type",received:msg.type});
  }

  async webSocketClose(ws,code,reason) {
    const session=this.sessions.get(ws)||ws.deserializeAttachment();
    this.sessions.delete(ws);
    try { ws.close(code,reason); } catch {}
    const meta=await this.getMeta();
    if(!meta) return;
    if(meta.phase==="lobby"&&meta.hostSessionId===session?.sessionId) {
      meta.hostSessionId=this.joinedSessions()[0]?.sessionId||null;
      await this.saveMeta(meta);
    }
    await this.broadcastRoomState(meta);
  }

  async webSocketError(ws) {
    const session=this.sessions.get(ws)||ws.deserializeAttachment();
    this.sessions.delete(ws);
    const meta=await this.getMeta();
    if(!meta) return;
    if(meta.phase==="lobby"&&meta.hostSessionId===session?.sessionId) {
      meta.hostSessionId=this.joinedSessions()[0]?.sessionId||null;
      await this.saveMeta(meta);
    }
    await this.broadcastRoomState(meta);
  }
}
