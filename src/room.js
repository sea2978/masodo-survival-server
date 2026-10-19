import {isUniqueMaterial} from "./unique_materials.js";
import {updateRegionRestrictions,nextRegionLockAt} from "./region_restrictions.js";
import {normalizeRoomSettings,roomSettings,humanCapacity,plannedAICount} from "./room_settings.js";
import {inventoryOperation} from "./inventory_ops.js";
import {STATE_DELTA_FEATURE,stateDiff,substantivePatch,compactSnapshot} from "./state_transport.js";
import {settleMatch,playerResult} from "./match_result.js";
import { DurableObject } from "cloudflare:workers";
import { MAX_HUMANS, json, parseJsonMessage, safeText, send } from "./protocol.js";
import { ADJACENCY, CHARACTERS, REGIONS, createAIPlayer, createServerPlayer, isValidCharacter, isValidRegion } from "./game_data.js";
import { ITEMS, WILD_TEMPLATES, ENCOUNTER_EVENTS } from "./offline_content.js";
import { beginServerAction, completeAction, eventChoiceAvailability, initWorld, lootCorpse, publicPlayer, recommendedCrafts, beginEventChoice, runAITick, updatePassiveTime } from "./match_engine.js";
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
    super(ctx,env);this.env=env;this.sessions=new Map();this.sentStates=new WeakMap();this.recipeCache=new Map();
    for(const ws of this.ctx.getWebSockets()){const a=ws.deserializeAttachment();if(a?.sessionId)this.sessions.set(ws,a)}
    this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping","pong"));
  }
  async getMeta(){const value=(await this.ctx.storage.get(ROOM_META_KEY))||null;this.metaJson=JSON.stringify(value);return value}
  async saveMeta(v){const json=JSON.stringify(v);if(json===this.metaJson)return;await this.ctx.storage.put(ROOM_META_KEY,v);this.metaJson=json}
  async getMatch(){
    const v=(await this.ctx.storage.get(MATCH_KEY))||null;this.matchJson=JSON.stringify(v);
    if(v){
      if(!v.eventCatalog||JSON.stringify(v.eventCatalog)===JSON.stringify(ENCOUNTER_EVENTS))v.eventCatalog=ENCOUNTER_EVENTS;
      if(!v.wildTemplates||JSON.stringify(v.wildTemplates)===JSON.stringify(WILD_TEMPLATES))v.wildTemplates=WILD_TEMPLATES;
    }
    return v;
  }
  async saveMatch(v){
    settleMatch(v);const stored={...v};
    if(v.eventCatalog===ENCOUNTER_EVENTS)delete stored.eventCatalog;
    if(v.wildTemplates===WILD_TEMPLATES)delete stored.wildTemplates;
    stored.definitionVersion=GAME_VERSION;
    const json=JSON.stringify(stored);
    if(json!==this.matchJson){await this.ctx.storage.put(MATCH_KEY,stored);this.matchJson=json}
    if(v.phase==="finished"){const meta=await this.getMeta();if(meta&&meta.phase!=="finished"){meta.phase="finished";await this.saveMeta(meta);await this.updateDirectory(meta)}}
  }
  joinedSessions(){return[...this.sessions.values()].filter(s=>s.joined).sort((a,b)=>(a.joinedAt||0)-(b.joinedAt||0))}
  reconnectRecords(meta){return Array.isArray(meta?.reconnectRecords)?meta.reconnectRecords:[]}
  connectedPlayers(meta){return this.joinedSessions().map(s=>({sessionId:s.sessionId,playerName:s.playerName,charId:s.charId,startRegion:s.startRegion||"city",ready:!!s.ready,joinedAt:s.joinedAt,host:meta.hostSessionId===s.sessionId}))}
  activeReservedCount(meta,now=Date.now()){return this.reconnectRecords(meta).filter(r=>!r.disconnectedAt||now-r.disconnectedAt<RECONNECT_GRACE_MS).length}
  roomState(meta){
    const players=this.connectedPlayers(meta);
    return{code:meta.code,...roomSettings(meta),plannedAiCount:plannedAICount(meta,players.length),phase:meta.phase||"lobby",createdAt:meta.createdAt,maxHumans:humanCapacity(meta),players,humanCount:players.length,reservedCount:this.activeReservedCount(meta),allReady:players.length>=1&&players.every(p=>p.ready),hostSessionId:meta.hostSessionId||null,emptySince:meta.emptySince||null,protocolVersion:PROTOCOL_VERSION,serverVersion:GAME_VERSION,buildLabel:BUILD_LABEL,phaseLabel:PHASE}
  }
  broadcast(type,payload={}){for(const ws of this.sessions.keys())send(ws,type,payload)}
  async directoryStub(){return this.env.ROOMS.getByName(DIRECTORY_NAME)}
  async updateDirectory(meta){
    if(!meta?.code||meta.code===DIRECTORY_NAME)return;
    const state=this.roomState(meta),expiresAt=state.humanCount===0?(meta.emptySince||Date.now())+EMPTY_ROOM_TTL_MS:Date.now()+ACTIVE_DIRECTORY_TTL_MS;
    const stub=await this.directoryStub();
    await stub.fetch("https://directory.internal/directory/upsert",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({
      code:state.code,name:state.name,aiMode:state.aiMode,aiCount:state.aiCount,phase:state.phase,createdAt:state.createdAt,humanCount:state.humanCount,reservedCount:state.reservedCount,maxHumans:state.maxHumans,allReady:state.allReady,expiresAt,updatedAt:Date.now()
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
      directory[code]={code,...roomSettings(body),phase:safeText(body.phase,20,"lobby"),createdAt:Number(body.createdAt)||Date.now(),humanCount:Math.max(0,Number(body.humanCount)||0),reservedCount:Math.max(0,Number(body.reservedCount)||0),maxHumans:Math.max(1,Number(body.maxHumans)||MAX_HUMANS),allReady:!!body.allReady,updatedAt:Number(body.updatedAt)||Date.now(),expiresAt:Number(body.expiresAt)||Date.now()+EMPTY_ROOM_TTL_MS};
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
  recipeView(p){
    const key=JSON.stringify([p.charId,p.eq,p.mat,p.con]),cached=this.recipeCache.get(p.playerId);
    if(cached?.key===key)return cached.value;
    const value={recommendations:recommendedCrafts(p,12),craftable:Object.entries(ITEMS).filter(([,it])=>it?.r&&Object.entries(it.r).every(([k,n])=>{
      const src=ITEMS[k];return (src?.t==="m"?(p.mat[k]||0):src?.t==="c"?(p.con[k]||0):(p.eq||[]).filter(x=>x===k).length)>=n;
    })).slice(0,80).map(([id,it])=>({id,name:it.n,t:it.t,tier:it.tier||"",atk:it.atk||0,def:it.def||0,r:it.r}))};
    this.recipeCache.set(p.playerId,{key,value});return value;
  }
  snapshot(match,sid,now=Date.now()){
    const self=this.matchPlayerForSession(match,sid);
    const others=match.players.filter(p=>p.sessionId!==sid).map(p=>({playerId:p.playerId,playerName:p.playerName,charId:p.charId,alive:p.alive,kills:p.kills,isAI:!!p.isAI}));
    const encounter=self?.encounter?(()=>{
      if(self.encounter.kind==="player"){const t=match.players.find(p=>p.playerId===self.encounter.targetId);return t?.alive&&t.region===self.region?{kind:"player",targetId:t.playerId,name:t.playerName,charId:t.charId,hp:t.hp,maxHp:t.maxHp}:null}
      const w=match.wilds.find(x=>x.id===self.encounter.wildId);if(!w?.alive||w.region!==self.region)return null;
      const t=(match.wildTemplates||[]).find(x=>x.id===w.templateId);return{kind:"wild",wildId:w.id,name:t?.n||w.templateId,hp:w.hp,maxHp:t?.hp||w.hp,skillText:t?.skillText||""}
    })():null;
    return{introPending:now<match.startedAt,reworkRegions:(match.reworkObjects||[]).filter(o=>o.kind==="mist").map(o=>({region:o.region,until:o.until})),regionGardens:match.regionGardens||{},regionRestrictions:match.regionRestrictions,combatNoticeSeq:match.combatNoticeSeq||0,combatNotices:(match.combatNotices||[]).filter(e=>e.sourceId===self?.playerId||e.targetId===self?.playerId),result:playerResult(match,self,now),matchId:match.matchId,phase:match.phase,createdAt:match.createdAt,startedAt:match.startedAt,serverNow:now,elapsed:match.phase==="playing"?Math.max(0,Math.floor((now-match.startedAt)/1000)):(match.elapsed||0),self:self?publicPlayer(match,self,now,false):null,others,aliveCount:match.players.filter(p=>p.alive).length,regions:REGIONS,adjacency:ADJACENCY,encounter,
      pendingEvent:self?.pendingEvent?(()=>{
        const e=match.eventCatalog.find(e=>e.id===self.pendingEvent);if(!e)return null;
        return {...e,choices:(e.choices||[]).map((choice,index)=>({...choice,...eventChoiceAvailability(e,self,index)}))}
      })():null,
      aiCount:match.players.filter(p=>p.isAI).length,
      corpses:(match.corpses||[]).filter(c=>c.region===self?.region&&c.expiresAt>now),
      specialRouteStates:Object.fromEntries(Object.entries(match.uniqueSpecials||{}).map(([id,s])=>[id,{state:isUniqueMaterial(id)?s.state:"repeatable",...(s.state==="ground"&&isUniqueMaterial(id)?{region:s.region}:{})}])),
      ...(self?this.recipeView(self):{recommendations:[],craftable:[]})}
  }
  sendMatchState(ws,match,{force=false,now=Date.now()}={}){
    const session=this.sessions.get(ws)||ws.deserializeAttachment();if(!session?.joined)return;
    const snapshot=this.snapshot(match,session.sessionId,now);
    if(!session.deltaState){send(ws,"match_state",{match:snapshot});return}
    const state=compactSnapshot(snapshot),previous=this.sentStates.get(ws);
    if(force||!previous||previous.state.matchId!==state.matchId){
      const revision=(previous?.revision||0)+1;
      if(send(ws,"match_state",{match:state,stateRevision:revision,itemCatalog:ITEMS}))this.sentStates.set(ws,{state,revision});
      return;
    }
    const events=state.combatNotices.filter(e=>e.id>(previous.state.combatNoticeSeq||0));
    const before={...previous.state,combatNotices:[]},after={...state,combatNotices:[]},patch=stateDiff(before,after);
    if(!substantivePatch(patch)&&!events.length)return;
    const revision=previous.revision+1;
    if(send(ws,"match_delta",{baseRevision:previous.revision,stateRevision:revision,patch,combatNotices:events}))this.sentStates.set(ws,{state,revision});
  }
  broadcastMatchState(match){const now=Date.now();for(const ws of this.sessions.keys())this.sendMatchState(ws,match,{now})}

  async scheduleNextAlarm(match,meta=null){
    const now=Date.now(),times=[];
    if(this.joinedSessions().length>0&&match){
      if(match.phase==="playing"&&match.startedAt>now)times.push(match.startedAt);
      times.push(...Object.values(match.regionGardens||{}).flatMap(g=>(g.sources||[g]).map(x=>x.until)));
      times.push(...match.players.map(p=>p.pendingAction?.completeAt).filter(Number.isFinite));
      times.push(...(match.reworkStrikes||[]).map(v=>v.at));
      for(const o of match.reworkObjects||[]){times.push(o.until);if(o.matureAt>now&&!o.bloomed)times.push(o.matureAt);}
      for(const p of match.players.filter(p=>p.alive)){
        for(const st of Object.values(p.statuses||{}))if(st.until>now)times.push(st.until);
        if(p.statuses?.poison?.until>now)times.push((p.nextStatusTick||now)+2000);
        for(const st of Object.values(p.rework?.timed||{})){if(st.until>now)times.push(st.until);if(st.nextTick>now&&st.nextTick<=st.until)times.push(st.nextTick);}
        const rw=p.rework;if(rw?.resources?.attention&&rw.lastPvp)times.push(Math.max(rw.lastPvp+25000,(rw.attentionDecayAt||0)+5000));
        if(p.charId==="c05"&&rw?.resources?.charge)times.push((rw.lastFight||now)+15001);
        if(p.charId==="c23"&&rw?.resources?.will)times.push((rw.lastPvp||now)+20001);
      }
      if(match.phase==="playing"){const lockAt=nextRegionLockAt(match);if(lockAt!==null)times.push(lockAt)}
      if(match.phase==="playing"&&match.players.some(p=>p.isAI&&p.alive)){
        if(!Number.isFinite(match.nextAiTickAt)||match.nextAiTickAt<now)match.nextAiTickAt=now+1000;
        times.push(match.nextAiTickAt);
      }
    }
    if(meta?.emptySince)times.push(meta.emptySince+EMPTY_ROOM_TTL_MS);
    for(const r of this.reconnectRecords(meta))if(r.disconnectedAt)times.push(r.disconnectedAt+RECONNECT_GRACE_MS);
    const future=times.filter(Number.isFinite).map(t=>Math.max(now+250,t));
    const current=await this.ctx.storage.getAlarm();
    if(future.length){const next=Math.min(...future);if(current!==next&&!(current>now&&current<next))await this.ctx.storage.setAlarm(next)}
    else if(current!==null)await this.ctx.storage.deleteAlarm();
  }
  async completeDueActions(match,now=Date.now(),{defer=false}={}){
    if(now<match.startedAt)return false;
    const introChanged=match.introCompleted===false;if(introChanged)match.introCompleted=true;
    const passiveView=()=>JSON.stringify([match.combatNoticeSeq,match.players.map(p=>[p.hp,p.sp,p.satiety,p.alive,p.statuses,p.statusNoticeSeq,p.dollNoticeRegion,p.tempEffects,p.delayedEffects,p.enemyContacts,p.heardNoiseIds,p.rework,p.reworkPause]),match.noises,match.regionGardens,match.reworkObjects,match.reworkStrikes]);
    const before=passiveView();
    let changed=updateRegionRestrictions(match,now)||introChanged;
    for(const p of match.players){
      if(!p.pendingAction||p.pendingAction.completeAt>now)continue;
      const result=completeAction(match,p,now);changed=true;
      const ws=[...this.sessions.entries()].find(([,s])=>s.sessionId===p.sessionId)?.[0];
      if(ws)send(ws,result?.type==="event_choice"?"event_result":"action_result",{result});
    }
    updatePassiveTime(match,now);
    changed ||= before!==passiveView();
    if(changed){match.updatedAt=now;if(!defer){await this.saveMatch(match);this.broadcastMatchState(match)}}
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
    let changed=await this.completeDueActions(m,now,{defer:true}),ticked=false;
    changed=settleMatch(m)||changed;
    if(m.phase==="playing"&&now>=m.startedAt&&m.players.some(p=>p.isAI&&p.alive)&&(m.nextAiTickAt||0)<=now){changed=runAITick(m,now)||changed;ticked=true}
    if(changed||ticked)await this.saveMatch(m);
    if(changed)this.broadcastMatchState(m);
    meta.phase=m.phase;await this.saveMeta(meta);await this.scheduleNextAlarm(m,meta)
  }

  async fetch(request){
    const url=new URL(request.url),path=url.pathname;
    if(path.startsWith("/directory/"))return this.handleDirectoryRequest(request,path);
    if(path==="/init"&&request.method==="POST"){
      const body=await request.json().catch(()=>({})),existing=await this.getMeta();
      if(existing)return json({ok:false,reason:"exists",room:this.roomState(existing)},409);
      const parsed=normalizeRoomSettings(body);if(!parsed.ok)return json(parsed,400);
      const meta={...parsed.settings,code:safeText(body.code,8,"ROOM"),createdAt:Date.now(),phase:"lobby",hostSessionId:null,emptySince:Date.now(),reconnectRecords:[]};await this.saveMeta(meta);await this.updateDirectory(meta);await this.scheduleNextAlarm(null,meta);return json({ok:true,room:this.roomState(meta)},201)
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
        if(this.connectedPlayers(meta).length>=humanCapacity(meta)){send(ws,"error",{error:"room_full"});ws.close(4001,"Room full");return}
        reconnectToken=crypto.randomUUID()+crypto.randomUUID();
        session.playerName=safeText(msg.playerName,20,"Player");session.charId=isValidCharacter(msg.charId)?msg.charId:"c01";session.startRegion=isValidRegion(msg.startRegion)?msg.startRegion:"city";session.ready=false;session.joinedAt=now;
        record={sessionId:session.sessionId,tokenHash:await sha256Hex(reconnectToken),playerName:session.playerName,charId:session.charId,startRegion:session.startRegion,ready:false,joinedAt:session.joinedAt,disconnectedAt:null};records.push(record);
      }else{
        reconnectToken=crypto.randomUUID()+crypto.randomUUID();
        record={sessionId:p.sessionId,tokenHash:await sha256Hex(reconnectToken),playerName:p.playerName,charId:p.charId,startRegion:p.region,ready:true,joinedAt:now,disconnectedAt:null};records.push(record);
        session.sessionId=p.sessionId;session.playerName=p.playerName;session.charId=p.charId;session.startRegion=p.region;session.ready=true;session.joinedAt=now;resumed=true;
      }
      for(const[other,os]of this.sessions.entries())if(other!==ws&&os?.sessionId===session.sessionId){this.sessions.delete(other);try{other.close(4002,"Session resumed elsewhere")}catch{}}
      session.deltaState=Array.isArray(msg.features)&&msg.features.includes(STATE_DELTA_FEATURE);
      session.pickupChoices=Array.isArray(msg.features)&&msg.features.includes("inventory_choice_v1");
      if(p){p.pickupChoices=session.pickupChoices}
      session.joined=true;ws.serializeAttachment(session);this.sessions.set(ws,session);
      record.playerName=session.playerName;record.charId=session.charId;record.startRegion=session.startRegion;record.ready=!!session.ready;record.disconnectedAt=null;
      meta.reconnectRecords=records;if(meta.emptySince)delete meta.emptySince;if(!meta.hostSessionId)meta.hostSessionId=session.sessionId;await this.saveMeta(meta);
      send(ws,"hello_ok",{sessionId:session.sessionId,reconnectToken,resumed,reconnected:resumed,host:meta.hostSessionId===session.sessionId});
      if(meta.phase!=="lobby"){const changed=await this.completeDueActions(m,now,{defer:true});await this.saveMatch(m);this.sendMatchState(ws,m,{force:true});if(changed)for(const other of this.sessions.keys())if(other!==ws)this.sendMatchState(other,m,{now});meta.phase=m.phase;await this.updateDirectory(meta);await this.scheduleNextAlarm(m,meta)}else await this.broadcastRoomState(meta);
      return
    }
    if(!session.joined){send(ws,"error",{error:"hello_required"});return}
    if(msg.type==="set_ready"){if(meta.phase!=="lobby"){send(ws,"error",{error:"match_already_started"});return}session.ready=!!msg.ready;const rr=this.reconnectRecords(meta).find(r=>r.sessionId===session.sessionId);if(rr)rr.ready=session.ready;await this.saveMeta(meta);ws.serializeAttachment(session);this.sessions.set(ws,session);await this.broadcastRoomState(meta);return}
    if(msg.type==="set_character"){if(meta.phase!=="lobby"||!isValidCharacter(msg.charId)){send(ws,"error",{error:"invalid_character"});return}session.charId=msg.charId;session.ready=false;const rr=this.reconnectRecords(meta).find(r=>r.sessionId===session.sessionId);if(rr){rr.charId=session.charId;rr.ready=false}await this.saveMeta(meta);ws.serializeAttachment(session);this.sessions.set(ws,session);await this.broadcastRoomState(meta);return}
    if(msg.type==="set_start_region"){if(meta.phase!=="lobby"||!isValidRegion(msg.region)){send(ws,"error",{error:"invalid_region"});return}session.startRegion=msg.region;session.ready=false;const rr=this.reconnectRecords(meta).find(r=>r.sessionId===session.sessionId);if(rr){rr.startRegion=session.startRegion;rr.ready=false}await this.saveMeta(meta);ws.serializeAttachment(session);this.sessions.set(ws,session);await this.broadcastRoomState(meta);return}
    if(msg.type==="request_start"){
      const room=this.roomState(meta);if(meta.hostSessionId!==session.sessionId){send(ws,"error",{error:"host_only"});return}if(!room.allReady){send(ws,"error",{error:"not_all_ready"});return}if(meta.phase!=="lobby"){send(ws,"error",{error:"already_started"});return}
      const humans=this.joinedSessions(),players=humans.map((s,i)=>({...createServerPlayer(s,i),pickupChoices:!!s.pickupChoices}));
      const profiles=["balanced","craft","aggro","safe"],aiCharacters=CHARACTERS.filter(c=>!c.testOnly);
      const targetCompetitors=players.length+plannedAICount(meta,players.length);
      while(players.length<targetCompetitors){
        const c=aiCharacters[Math.floor(Math.random()*aiCharacters.length)];
        const r=REGIONS[Math.floor(Math.random()*REGIONS.length)];
        players.push(createAIPlayer(players.length,c.id,r.id,profiles[Math.floor(Math.random()*profiles.length)]));
      }
      this.recipeCache.clear();
      const startNow=Date.now();
      const match={matchId:crypto.randomUUID(),roomName:roomSettings(meta).name,aiSettings:roomSettings(meta),phase:"playing",createdAt:startNow,startedAt:startNow+5000,introCompleted:false,updatedAt:startNow,players,nextAiTickAt:startNow+6000};
      for(const p of match.players){p.tempEffects=[];p.statusImmunity={};p.cdCUntil=0;p.cdAUntil=0;p.lastSatietyAt=match.startedAt;p.nextStatusTick=match.startedAt}
      match.wildTemplates=WILD_TEMPLATES;match.eventCatalog=ENCOUNTER_EVENTS;initWorld(match);
      meta.phase="playing";meta.startedAt=match.startedAt;await Promise.all([this.saveMeta(meta),this.saveMatch(match)]);await this.scheduleNextAlarm(match,meta);await this.updateDirectory(meta);this.broadcast("match_started",{matchId:match.matchId,serverNow:Date.now(),competitors:match.players.length,aiCount:match.players.filter(p=>p.isAI).length});this.broadcastMatchState(match);return
    }
    if(msg.type==="request_state"){const m=await this.getMatch();if(!m){send(ws,"error",{error:"match_not_started"});return}const changed=await this.completeDueActions(m,Date.now(),{defer:true});if(changed){await this.saveMatch(m);this.broadcastMatchState(m)}this.sendMatchState(ws,m,{force:true});return}
    if(msg.type==="command_inventory"){
      const m=await this.getMatch();if(!m){send(ws,"inventory_result",{result:{ok:false,error:"match_not_playing"}});return}
      if(Date.now()<m.startedAt){send(ws,"inventory_result",{result:{ok:false,error:"match_starting"}});return}
      const changed=await this.completeDueActions(m,Date.now(),{defer:true});settleMatch(m);
      const p=this.matchPlayerForSession(m,session.sessionId),result=inventoryOperation(m,p,msg);
      if(result.ok){updatePassiveTime(m,Date.now());m.updatedAt=Date.now()}
      if(result.ok||changed||m.phase!=="playing")await this.saveMatch(m);
      send(ws,"inventory_result",{result});
      if(result.ok||changed||m.phase!=="playing")this.broadcastMatchState(m);
      return;
    }
    if(msg.type==="chat"){const text=safeText(msg.text,120,"");if(text)this.broadcast("chat",{from:session.sessionId,playerName:session.playerName,text,at:Date.now()});return}

    const commandMap={command_remove_object:"remove_object",command_move:"move",command_search:"search",command_rest:"rest",command_craft:"craft",command_use_item:"use_item",command_attack:"attack",command_skill:"skill",command_flee:"flee",command_char_action:"char_action",command_loot_corpse:"loot_corpse"};
    if(commandMap[msg.type]){
      const m=await this.getMatch();if(!m||m.phase!=="playing"){send(ws,"error",{error:"match_not_playing"});return}
      const dueChanged=await this.completeDueActions(m,Date.now(),{defer:true});settleMatch(m);if(m.phase!=="playing"){await this.saveMatch(m);send(ws,"error",{error:"match_not_playing"});this.broadcastMatchState(m);return}const p=this.matchPlayerForSession(m,session.sessionId);const type=commandMap[msg.type],payload={to:msg.to,id:msg.id};
      if(type==="char_action")Object.assign(payload,{choice:msg.choice,targetId:msg.targetId,region:msg.region,words:msg.words,dispelKey:msg.dispelKey});
      if(type==="remove_object")payload.objectId=msg.objectId;
      if(type==="skill")payload.dispelKey=msg.dispelKey;
      if(type==="craft"){payload.replaceIndex=msg.replaceIndex;payload.replaceId=msg.replaceId}
      if(type==="loot_corpse"){payload.corpseId=msg.corpseId;payload.kind=msg.kind;payload.qty=msg.qty;payload.replace=!!msg.replace}
      const r=beginServerAction(m,p,type,payload,Date.now());if(!r.ok){if(dueChanged||r.error==="no_encounter"){await this.saveMatch(m);this.broadcastMatchState(m)}send(ws,"error",{error:r.error});return}
      await this.saveMatch(m);await this.scheduleNextAlarm(m,meta);send(ws,"action_accepted",{action:r.action});this.broadcastMatchState(m);return
    }
    if(msg.type==="event_choice"){
      const m=await this.getMatch(),p=this.matchPlayerForSession(m,session.sessionId);if(!m||!p){send(ws,"error",{error:"match_not_playing"});return}
      const changed=await this.completeDueActions(m,Date.now(),{defer:true});const r=beginEventChoice(m,p,Number(msg.index),Date.now());if(!r.ok){if(changed){await this.saveMatch(m);this.broadcastMatchState(m)}await this.scheduleNextAlarm(m,meta);send(ws,"error",{error:r.error,reason:r.reason||""});return}await this.saveMatch(m);await this.scheduleNextAlarm(m,meta);if(r.queued)send(ws,"action_accepted",{action:r.action});else send(ws,"event_result",{result:r});this.broadcastMatchState(m);return
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
