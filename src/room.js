import { DurableObject } from "cloudflare:workers";
import { MAX_HUMANS, json, parseJsonMessage, safeText, send } from "./protocol.js";
import { ADJACENCY, CHARACTERS, REGIONS, createAIPlayer, createServerPlayer, isValidCharacter, isValidRegion } from "./game_data.js";
import { ITEMS, WILD_TEMPLATES, ENCOUNTER_EVENTS } from "./offline_content.js";
import { beginServerAction, completeAction, eventChoiceAvailability, initWorld, lootCorpse, publicPlayer, recommendedCrafts, resolveEventChoice, runAITick, updatePassiveTime } from "./match_engine.js";
import { BUILD_LABEL, GAME_VERSION, PHASE, PROTOCOL_VERSION } from "./version.js";

const ROOM_META_KEY="room_meta",MATCH_KEY="match_state";
const DIRECTORY_KEY="room_directory_v1",DIRECTORY_NAME="__MASODO_ROOM_DIRECTORY__";
const EMPTY_ROOM_TTL_MS=10*60*1000,RECONNECT_GRACE_MS=2*60*1000,ACTIVE_DIRECTORY_TTL_MS=6*60*60*1000;

async function sha256Hex(value){
  const bytes=new TextEncoder().encode(String(value||""));
  const digest=await crypto.subtle.digest("SHA-256",bytes);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

export class GameRoom extends DurableObject{
  constructor(ctx,env){
    super(ctx,env);this.env=env;this.sessions=new Map();
    for(const ws of this.ctx.getWebSockets()){const a=ws.deserializeAttachment();if(a?.sessionId)this.sessions.set(ws,a)}
    this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping","pong"));
  }
  async getMeta(){return(await this.ctx.storage.get(ROOM_META_KEY))||null}
  async saveMeta(v){await this.ctx.storage.put(ROOM_META_KEY,v)}
  async getMatch(){return(await this.ctx.storage.get(MATCH_KEY))||null}
  async saveMatch(v){await this.ctx.storage.put(MATCH_KEY,v)}
  joinedSessions(){return[...this.sessions.values()].filter(s=>s.joined).sort((a,b)=>(a.joinedAt||0)-(b.joinedAt||0))}
  reconnectRecords(meta){return Array.isArray(meta?.reconnectRecords)?meta.reconnectRecords:[]}
  connectedPlayers(meta){return this.joinedSessions().map(s=>({sessionId:s.sessionId,playerName:s.playerName,charId:s.charId,startRegion:s.startRegion||"city",ready:!!s.ready,joinedAt:s.joinedAt,host:meta.hostSessionId===s.sessionId}))}
  activeReservedCount(meta,now=Date.now()){return this.reconnectRecords(meta).filter(r=>!r.disconnectedAt||now-r.disconnectedAt<RECONNECT_GRACE_MS).length}
  roomState(meta){
    const players=this.connectedPlayers(meta);
    return{code:meta.code,phase:meta.phase||"lobby",createdAt:meta.createdAt,maxHumans:MAX_HUMANS,players,humanCount:players.length,reservedCount:this.activeReservedCount(meta),allReady:players.length>=1&&players.every(p=>p.ready),hostSessionId:meta.hostSessionId||null,emptySince:meta.emptySince||null,protocolVersion:PROTOCOL_VERSION,serverVersion:GAME_VERSION,buildLabel:BUILD_LABEL,phaseLabel:PHASE}
  }
  broadcast(type,payload={}){for(const ws of this.sessions.keys())send(ws,type,payload)}
  async directoryStub(){return this.env.ROOMS.getByName(DIRECTORY_NAME)}
  async updateDirectory(meta){
    if(!meta?.code||meta.code===DIRECTORY_NAME)return;
    const state=this.roomState(meta),expiresAt=state.humanCount===0?(meta.emptySince||Date.now())+EMPTY_ROOM_TTL_MS:Date.now()+ACTIVE_DIRECTORY_TTL_MS;
    const stub=await this.directoryStub();
    await stub.fetch("https://directory.internal/directory/upsert",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({
      code:state.code,phase:state.phase,createdAt:state.createdAt,humanCount:state.humanCount,reservedCount:state.reservedCount,maxHumans:state.maxHumans,allReady:state.allReady,expiresAt,updatedAt:Date.now()
    })});
  }
  async removeFromDirectory(code){
    if(!code||code===DIRECTORY_NAME)return;
    const stub=await this.directoryStub();
    await stub.fetch("https://directory.internal/directory/remove",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({code})});
  }
  async handleDirectoryRequest(request,path){
    if(path==="/directory/list"&&request.method==="GET"){
      const now=Date.now(),directory=(await this.ctx.storage.get(DIRECTORY_KEY))||{};let changed=false;
      for(const[code,entry]of Object.entries(directory)){if(!entry||entry.expiresAt<=now){delete directory[code];changed=true}}
      if(changed)await this.ctx.storage.put(DIRECTORY_KEY,directory);
      const rooms=Object.values(directory).sort((a,b)=>(b.humanCount-a.humanCount)||(b.updatedAt-a.updatedAt));
      return json({ok:true,rooms,updatedAt:now});
    }
    if(path==="/directory/upsert"&&request.method==="POST"){
      const body=await request.json().catch(()=>({})),code=safeText(body.code,8,"").toUpperCase();
      if(!code)return json({ok:false,error:"invalid_room"},400);
      const directory=(await this.ctx.storage.get(DIRECTORY_KEY))||{};
      directory[code]={code,phase:safeText(body.phase,20,"lobby"),createdAt:Number(body.createdAt)||Date.now(),humanCount:Math.max(0,Number(body.humanCount)||0),reservedCount:Math.max(0,Number(body.reservedCount)||0),maxHumans:Math.max(1,Number(body.maxHumans)||MAX_HUMANS),allReady:!!body.allReady,updatedAt:Number(body.updatedAt)||Date.now(),expiresAt:Number(body.expiresAt)||Date.now()+EMPTY_ROOM_TTL_MS};
      await this.ctx.storage.put(DIRECTORY_KEY,directory);return json({ok:true});
    }
    if(path==="/directory/remove"&&request.method==="POST"){
      const body=await request.json().catch(()=>({})),code=safeText(body.code,8,"").toUpperCase(),directory=(await this.ctx.storage.get(DIRECTORY_KEY))||{};
      if(code&&directory[code]){delete directory[code];await this.ctx.storage.put(DIRECTORY_KEY,directory)}
      return json({ok:true});
    }
    return json({ok:false,error:"directory_not_found"},404);
  }
  async broadcastRoomState(meta){this.broadcast("room_state",{room:this.roomState(meta)});await this.updateDirectory(meta)}
  matchPlayerForSession(match,sid){return match?.players?.find(p=>p.sessionId===sid)||null}
  snapshot(match,sid,now=Date.now()){
    updatePassiveTime(match,now);
    const self=this.matchPlayerForSession(match,sid);
    const others=match.players.filter(p=>p.sessionId!==sid).map(p=>({playerId:p.playerId,playerName:p.playerName,charId:p.charId,alive:p.alive,kills:p.kills,isAI:!!p.isAI}));
    const encounter=self?.encounter?(()=>{
      if(self.encounter.kind==="player"){const t=match.players.find(p=>p.playerId===self.encounter.targetId);return t?.alive&&t.region===self.region?{kind:"player",targetId:t.playerId,name:t.playerName,charId:t.charId,hp:t.hp,maxHp:t.maxHp}:null}
      const w=match.wilds.find(x=>x.id===self.encounter.wildId);if(!w?.alive||w.region!==self.region)return null;
      const t=(match.wildTemplates||[]).find(x=>x.id===w.templateId);return{kind:"wild",wildId:w.id,name:t?.n||w.templateId,hp:w.hp,maxHp:t?.hp||w.hp,skillText:t?.skillText||""}
    })():null;
    return{matchId:match.matchId,phase:match.phase,createdAt:match.createdAt,startedAt:match.startedAt,serverNow:now,elapsed:match.elapsed||0,self:self?publicPlayer(match,self,now):null,others,aliveCount:match.players.filter(p=>p.alive).length,regions:REGIONS,adjacency:ADJACENCY,encounter,
      pendingEvent:self?.pendingEvent?(()=>{
        const e=match.eventCatalog.find(e=>e.id===self.pendingEvent);if(!e)return null;
        return {...e,choices:(e.choices||[]).map((choice,index)=>({...choice,...eventChoiceAvailability(e,self,index)}))}
      })():null,
      aiCount:match.players.filter(p=>p.isAI).length,
      corpses:(match.corpses||[]).filter(c=>c.region===self?.region&&c.expiresAt>now),
      recommendations:self?recommendedCrafts(self,12):[],
      craftable:self?Object.entries(ITEMS).filter(([id,it])=>it?.r&&Object.entries(it.r).every(([k,n])=>{
        const src=ITEMS[k];const count=src?.t==="m"?(self.mat[k]||0):src?.t==="c"?(self.con[k]||0):(self.eq||[]).filter(x=>x===k).length;return count>=n
      })).slice(0,80).map(([id,it])=>({id,name:it.n,t:it.t,tier:it.tier||"",atk:it.atk||0,def:it.def||0,r:it.r})):[]}
  }
  sendMatchState(ws,match){const s=this.sessions.get(ws)||ws.deserializeAttachment();if(s?.sessionId)send(ws,"match_state",{match:this.snapshot(match,s.sessionId)})}
  broadcastMatchState(match){for(const ws of this.sessions.keys())this.sendMatchState(ws,match)}
  async scheduleNextAlarm(match,meta=null){
    const now=Date.now(),times=[];
    if(this.joinedSessions().length>0&&match){
      times.push(...match.players.map(p=>p.pendingAction?.completeAt).filter(Number.isFinite));
      if(match.phase==="playing"&&match.players.some(p=>p.isAI&&p.alive)){
        if(!Number.isFinite(match.nextAiTickAt)||match.nextAiTickAt<now)match.nextAiTickAt=now+1000;
        times.push(match.nextAiTickAt);
      }
    }
    if(meta?.emptySince)times.push(meta.emptySince+EMPTY_ROOM_TTL_MS);
    for(const r of this.reconnectRecords(meta))if(r.disconnectedAt)times.push(r.disconnectedAt+RECONNECT_GRACE_MS);
    const future=times.filter(Number.isFinite).map(t=>Math.max(now+250,t));
    if(future.length)await this.ctx.storage.setAlarm(Math.min(...future));else await this.ctx.storage.deleteAlarm();
  }
  async completeDueActions(match,now=Date.now()){
    let changed=false;
    for(const p of match.players){
      if(!p.pendingAction||p.pendingAction.completeAt>now)continue;
      const result=completeAction(match,p,now);changed=true;
      const ws=[...this.sessions.entries()].find(([,s])=>s.sessionId===p.sessionId)?.[0];
      if(ws)send(ws,"action_result",{result});
    }
    updatePassiveTime(match,now);
    if(changed){match.updatedAt=now;await this.saveMatch(match);this.broadcastMatchState(match)}
    return changed;
  }
  async alarm(){
    const meta=await this.getMeta();if(!meta)return;
    const now=Date.now();meta.reconnectRecords=this.reconnectRecords(meta).filter(r=>!r.disconnectedAt||now-r.disconnectedAt<RECONNECT_GRACE_MS);
    if(this.joinedSessions().length===0){
      meta.emptySince||=now;
      if(now-meta.emptySince>=EMPTY_ROOM_TTL_MS){await this.removeFromDirectory(meta.code);await this.ctx.storage.deleteAll();return}
      await this.saveMeta(meta);await this.updateDirectory(meta);await this.scheduleNextAlarm(null,meta);return;
    }
    if(meta.emptySince){delete meta.emptySince;await this.saveMeta(meta)}
    const m=await this.getMatch();
    if(!m||m.phase!=="playing"){await this.saveMeta(meta);await this.updateDirectory(meta);await this.scheduleNextAlarm(null,meta);return}
    await this.completeDueActions(m,now);
    if((m.nextAiTickAt||0)<=now){
      const changed=runAITick(m,now);
      await this.saveMatch(m);
      if(changed)this.broadcastMatchState(m);
    }
    await this.saveMeta(meta);await this.scheduleNextAlarm(m,meta)
  }

  async fetch(request){
    const url=new URL(request.url),path=url.pathname;
    if(path.startsWith("/directory/"))return this.handleDirectoryRequest(request,path);
    if(path==="/init"&&request.method==="POST"){
      const body=await request.json().catch(()=>({})),existing=await this.getMeta();
      if(existing)return json({ok:false,reason:"exists",room:this.roomState(existing)},409);
      const meta={code:safeText(body.code,8,"ROOM"),createdAt:Date.now(),phase:"lobby",hostSessionId:null,emptySince:Date.now(),reconnectRecords:[]};await this.saveMeta(meta);await this.updateDirectory(meta);await this.scheduleNextAlarm(null,meta);return json({ok:true,room:this.roomState(meta)},201)
    }
    const meta=await this.getMeta();if(!meta)return json({ok:false,error:"room_not_found"},404);
    if(path==="/status"&&request.method==="GET"){const m=await this.getMatch();return json({ok:true,room:this.roomState(meta),matchPhase:m?.phase||null})}
    if(path==="/ws"){
      const up=request.headers.get("Upgrade");if(!up||up.toLowerCase()!=="websocket")return json({ok:false,error:"websocket_required"},426);
      const pair=new WebSocketPair(),[client,server]=Object.values(pair);this.ctx.acceptWebSocket(server);
      const session={sessionId:crypto.randomUUID(),joined:false,playerName:"Player",charId:"c01",startRegion:"city",ready:false,joinedAt:Date.now()};
      server.serializeAttachment(session);this.sessions.set(server,session);
      send(server,"connected",{sessionId:session.sessionId,room:this.roomState(meta),build:{version:GAME_VERSION,buildLabel:BUILD_LABEL,phase:PHASE,protocolVersion:PROTOCOL_VERSION},catalog:{characters:CHARACTERS.map(c=>({id:c.id,name:c.name,arch:c.arch})),regions:REGIONS}});
      return new Response(null,{status:101,webSocket:client})
    }
    return json({ok:false,error:"not_found"},404)
  }

  async webSocketMessage(ws,message){
    const msg=parseJsonMessage(message),session=this.sessions.get(ws)||ws.deserializeAttachment(),meta=await this.getMeta();
    if(!msg||!session||!meta){send(ws,"error",{error:"invalid_message"});return}
    if(msg.type==="hello"){
      const now=Date.now(),token=safeText(msg.reconnectToken,180,""),legacyResume=safeText(msg.resumeSessionId,80,"");
      let records=this.reconnectRecords(meta).filter(r=>!r.disconnectedAt||now-r.disconnectedAt<RECONNECT_GRACE_MS),record=null,reconnectToken=token,resumed=false;
      if(token){const hash=await sha256Hex(token);record=records.find(r=>r.tokenHash===hash)||null}
      let m=null,p=null;
      if(meta.phase!=="lobby"){
        m=await this.getMatch();
        if(record)p=this.matchPlayerForSession(m,record.sessionId);
        if(!p&&legacyResume){p=this.matchPlayerForSession(m,legacyResume);if(p){record=records.find(r=>r.sessionId===legacyResume)||null}}
        if(!m||!p){send(ws,"error",{error:"resume_required"});return}
      }
      if(record){
        session.sessionId=record.sessionId;session.playerName=record.playerName;session.charId=record.charId;session.startRegion=record.startRegion||"city";session.ready=!!record.ready;session.joinedAt=record.joinedAt||now;resumed=true;record.disconnectedAt=null;
      }else if(meta.phase==="lobby"){
        if(this.connectedPlayers(meta).length>=MAX_HUMANS){send(ws,"error",{error:"room_full"});ws.close(4001,"Room full");return}
        reconnectToken=crypto.randomUUID()+crypto.randomUUID();
        session.playerName=safeText(msg.playerName,20,"Player");session.charId=isValidCharacter(msg.charId)?msg.charId:"c01";session.startRegion=isValidRegion(msg.startRegion)?msg.startRegion:"city";session.ready=false;session.joinedAt=now;
        record={sessionId:session.sessionId,tokenHash:await sha256Hex(reconnectToken),playerName:session.playerName,charId:session.charId,startRegion:session.startRegion,ready:false,joinedAt:session.joinedAt,disconnectedAt:null};records.push(record);
      }else{
        reconnectToken=crypto.randomUUID()+crypto.randomUUID();
        record={sessionId:p.sessionId,tokenHash:await sha256Hex(reconnectToken),playerName:p.playerName,charId:p.charId,startRegion:p.region,ready:true,joinedAt:now,disconnectedAt:null};records.push(record);
        session.sessionId=p.sessionId;session.playerName=p.playerName;session.charId=p.charId;session.startRegion=p.region;session.ready=true;session.joinedAt=now;resumed=true;
      }
      for(const[other,os]of this.sessions.entries())if(other!==ws&&os?.sessionId===session.sessionId){this.sessions.delete(other);try{other.close(4002,"Session resumed elsewhere")}catch{}}
      session.joined=true;ws.serializeAttachment(session);this.sessions.set(ws,session);
      record.playerName=session.playerName;record.charId=session.charId;record.startRegion=session.startRegion;record.ready=!!session.ready;record.disconnectedAt=null;
      meta.reconnectRecords=records;if(meta.emptySince)delete meta.emptySince;if(!meta.hostSessionId)meta.hostSessionId=session.sessionId;await this.saveMeta(meta);
      send(ws,"hello_ok",{sessionId:session.sessionId,reconnectToken,resumed,reconnected:resumed,host:meta.hostSessionId===session.sessionId});
      if(meta.phase!=="lobby"){this.sendMatchState(ws,m);await this.updateDirectory(meta);await this.scheduleNextAlarm(m,meta)}else await this.broadcastRoomState(meta);
      return
    }
    if(!session.joined){send(ws,"error",{error:"hello_required"});return}
    if(msg.type==="set_ready"){if(meta.phase!=="lobby"){send(ws,"error",{error:"match_already_started"});return}session.ready=!!msg.ready;const rr=this.reconnectRecords(meta).find(r=>r.sessionId===session.sessionId);if(rr)rr.ready=session.ready;await this.saveMeta(meta);ws.serializeAttachment(session);this.sessions.set(ws,session);await this.broadcastRoomState(meta);return}
    if(msg.type==="set_character"){if(meta.phase!=="lobby"||!isValidCharacter(msg.charId)){send(ws,"error",{error:"invalid_character"});return}session.charId=msg.charId;session.ready=false;const rr=this.reconnectRecords(meta).find(r=>r.sessionId===session.sessionId);if(rr){rr.charId=session.charId;rr.ready=false}await this.saveMeta(meta);ws.serializeAttachment(session);this.sessions.set(ws,session);await this.broadcastRoomState(meta);return}
    if(msg.type==="set_start_region"){if(meta.phase!=="lobby"||!isValidRegion(msg.region)){send(ws,"error",{error:"invalid_region"});return}session.startRegion=msg.region;session.ready=false;const rr=this.reconnectRecords(meta).find(r=>r.sessionId===session.sessionId);if(rr){rr.startRegion=session.startRegion;rr.ready=false}await this.saveMeta(meta);ws.serializeAttachment(session);this.sessions.set(ws,session);await this.broadcastRoomState(meta);return}
    if(msg.type==="request_start"){
      const room=this.roomState(meta);if(meta.hostSessionId!==session.sessionId){send(ws,"error",{error:"host_only"});return}if(!room.allReady){send(ws,"error",{error:"not_all_ready"});return}if(meta.phase!=="lobby"){send(ws,"error",{error:"already_started"});return}
      const humans=this.joinedSessions(),players=humans.map((s,i)=>createServerPlayer(s,i));
      const profiles=["balanced","craft","aggro","safe"];
      while(players.length<11){
        const c=CHARACTERS[Math.floor(Math.random()*CHARACTERS.length)];
        const r=REGIONS[Math.floor(Math.random()*REGIONS.length)];
        players.push(createAIPlayer(players.length,c.id,r.id,profiles[Math.floor(Math.random()*profiles.length)]));
      }
      const match={matchId:crypto.randomUUID(),phase:"playing",createdAt:Date.now(),startedAt:Date.now(),updatedAt:Date.now(),players,nextAiTickAt:Date.now()+1000};
      for(const p of match.players){p.tempEffects=[];p.statusImmunity={};p.cdCUntil=0;p.cdAUntil=0;p.lastSatietyAt=match.startedAt;p.nextStatusTick=match.startedAt}
      match.wildTemplates=WILD_TEMPLATES;match.eventCatalog=ENCOUNTER_EVENTS;initWorld(match);
      meta.phase="playing";meta.startedAt=match.startedAt;await Promise.all([this.saveMeta(meta),this.saveMatch(match)]);await this.scheduleNextAlarm(match,meta);await this.updateDirectory(meta);this.broadcast("match_started",{matchId:match.matchId,serverNow:Date.now(),competitors:match.players.length,aiCount:match.players.filter(p=>p.isAI).length});this.broadcastMatchState(match);return
    }
    if(msg.type==="request_state"){const m=await this.getMatch();if(!m){send(ws,"error",{error:"match_not_started"});return}await this.completeDueActions(m,Date.now());this.sendMatchState(ws,m);return}
    if(msg.type==="chat"){const text=safeText(msg.text,120,"");if(text)this.broadcast("chat",{from:session.sessionId,playerName:session.playerName,text,at:Date.now()});return}

    const commandMap={command_move:"move",command_search:"search",command_rest:"rest",command_craft:"craft",command_use_item:"use_item",command_attack:"attack",command_skill:"skill",command_flee:"flee",command_char_action:"char_action",command_loot_corpse:"loot_corpse"};
    if(commandMap[msg.type]){
      const m=await this.getMatch();if(!m||m.phase!=="playing"){send(ws,"error",{error:"match_not_playing"});return}
      await this.completeDueActions(m,Date.now());const p=this.matchPlayerForSession(m,session.sessionId);const type=commandMap[msg.type],payload={to:msg.to,id:msg.id};
      if(type==="loot_corpse"){payload.corpseId=msg.corpseId;payload.kind=msg.kind;payload.qty=msg.qty;payload.replace=!!msg.replace}
      const r=beginServerAction(m,p,type,payload,Date.now());if(!r.ok){if(r.error==="no_encounter"){await this.saveMatch(m);this.broadcastMatchState(m)}send(ws,"error",{error:r.error});return}
      await this.saveMatch(m);await this.scheduleNextAlarm(m,meta);send(ws,"action_accepted",{action:r.action});this.broadcastMatchState(m);return
    }
    if(msg.type==="event_choice"){
      const m=await this.getMatch(),p=this.matchPlayerForSession(m,session.sessionId);if(!m||!p){send(ws,"error",{error:"match_not_playing"});return}
      const r=resolveEventChoice(m,p,Number(msg.index),Date.now());if(!r.ok){send(ws,"error",{error:r.error,reason:r.reason||""});return}await this.saveMatch(m);send(ws,"event_result",{result:r});this.broadcastMatchState(m);return
    }
    send(ws,"error",{error:"unknown_message_type",received:msg.type})
  }

  async markDisconnected(ws){
    const ss=this.sessions.get(ws)||ws.deserializeAttachment();this.sessions.delete(ws);const meta=await this.getMeta();if(!meta)return;
    const now=Date.now(),record=this.reconnectRecords(meta).find(r=>r.sessionId===ss?.sessionId);if(record&&!this.joinedSessions().some(x=>x.sessionId===ss.sessionId))record.disconnectedAt=now;
    if(meta.phase==="lobby"&&meta.hostSessionId===ss?.sessionId)meta.hostSessionId=this.joinedSessions()[0]?.sessionId||null;
    if(this.joinedSessions().length===0)meta.emptySince||=now;
    await this.saveMeta(meta);await this.broadcastRoomState(meta);await this.scheduleNextAlarm(await this.getMatch(),meta);
  }
  async webSocketClose(ws,code,reason){await this.markDisconnected(ws);try{ws.close(code,reason)}catch{}}
  async webSocketError(ws){await this.markDisconnected(ws)}
}
