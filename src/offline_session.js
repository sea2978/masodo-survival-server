import {GameRoom} from './room.js';
import {CHARACTERS,REGIONS,isValidCharacter,isValidRegion} from './game_data.js';
import {ITEMS} from './offline_content.js';
import {normalizeRoomSettings} from './room_settings.js';
import {GAME_VERSION,BUILD_LABEL,PHASE,PROTOCOL_VERSION} from './version.js';
const SAVE_KEY='masodo-offline-session-v1';
export class OfflineSession{
 constructor(adapter){
  this.adapter=adapter;this.timer=null;this.alarmAt=null;this.queue=Promise.resolve();this.running=false;this.data=new Map();
  try{const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');if(saved?.schema===1&&saved.data)this.data=new Map(Object.entries(saved.data))}catch{}
  const copy=v=>v===undefined?undefined:structuredClone(v),persist=()=>{try{localStorage.setItem(SAVE_KEY,JSON.stringify({schema:1,version:GAME_VERSION,data:Object.fromEntries(this.data)}))}catch{}};
  this.ws={readyState:1,attachment:null,deserializeAttachment:()=>this.ws.attachment,serializeAttachment:v=>this.ws.attachment=copy(v),send:s=>{if(this.running)this.receive(JSON.parse(s))},close:()=>this.stop()};
  this.ctx={getWebSockets:()=>[],setWebSocketAutoResponse(){},storage:{get:async k=>copy(this.data.get(k)),put:async(k,v)=>{this.data.set(k,copy(v));persist()},getAlarm:async()=>this.alarmAt,setAlarm:async at=>{this.alarmAt=at;this.schedule()},deleteAlarm:async()=>{this.alarmAt=null;this.schedule()},deleteAll:async()=>{this.data.clear();persist()}}};
  // Directory bookkeeping stays entirely in memory; no Request, fetch or WebSocket is opened.
  this.room=new GameRoom(this.ctx,{ROOMS:{getByName:()=>({fetch:async()=>({ok:true,json:async()=>({ok:true})})})}});
 }
 receive(msg){
  if(msg.type==='match_state'){this.adapter.lastMatch=msg.match;this.adapter.networkState=msg.match;this.adapter.stateRevision=0}
  this.adapter.emit(msg.type,msg);this.adapter.emit('*',msg);
 }
 async catalog(){const catalog={characters:CHARACTERS,regions:REGIONS,items:ITEMS};this.adapter.catalog=catalog;this.adapter.itemCatalog=ITEMS;this.adapter.build={version:GAME_VERSION,buildLabel:BUILD_LABEL+' · 오프라인',phase:PHASE,protocolVersion:PROTOCOL_VERSION};this.adapter.emit('catalog',catalog);this.adapter.emit('build',this.adapter.build);return catalog}
 async list(){const meta=await this.room.getMeta();return{ok:true,rooms:meta?[this.room.roomState(meta)]:[]}}
 async create(settings={}){await this.queue;const checked=normalizeRoomSettings(settings);if(!checked.ok)throw Error(checked.error);this.stop();this.alarmAt=null;this.room.sessions.clear();this.data.clear();this.room.metaJson=null;this.room.matchJson=null;this.room.recipeCache.clear();const meta={code:'LOCAL',phase:'lobby',createdAt:Date.now(),...checked.settings,hostSessionId:'offline-player',reconnectRecords:[]};await this.room.saveMeta(meta);return{ok:true,code:'LOCAL',room:this.room.roomState(meta)}}
 async status(){const meta=await this.room.getMeta();if(!meta)throw Error('room_not_found');return{ok:true,room:this.room.roomState(meta)}}
 async connect(code,options={}){
  await this.queue;const meta=await this.room.getMeta();if(!meta||code!=='LOCAL')throw Error('room_not_found');
  const match=await this.room.getMatch(),existing=match?.players.find(p=>p.sessionId==='offline-player');
  const session={sessionId:'offline-player',joined:true,joinedAt:meta.createdAt,ready:!!existing,playerName:existing?.playerName||String(options.playerName||'user').slice(0,20),charId:existing?.charId||(isValidCharacter(options.charId)?options.charId:'c01'),startRegion:existing?.region||(isValidRegion(options.startRegion)?options.startRegion:'city'),deltaState:false,pickupChoices:true};
  this.ws.attachment=session;this.room.sessions.set(this.ws,session);meta.hostSessionId=session.sessionId;meta.reconnectRecords=[{...session,disconnectedAt:null}];await this.room.saveMeta(meta);
  this.running=true;this.ws.readyState=1;this.adapter.ws=this.ws;this.adapter.roomCode='LOCAL';this.adapter.sessionId=session.sessionId;this.adapter.manualClose=false;
  this.receive({type:'connected',build:this.adapter.build,offline:true});this.receive({type:'hello_ok',sessionId:session.sessionId,host:true,resumed:!!existing});
  if(match){await this.room.completeDueActions(match,Date.now(),{defer:true});await this.room.saveMatch(match);this.room.sendMatchState(this.ws,match,{force:true});await this.room.scheduleNextAlarm(match,meta);this.schedule()}else this.receive({type:'room_state',room:this.room.roomState(meta)});
  return this.adapter;
 }
 send(type,payload){if(!this.running)return false;this.enqueue(()=>this.room.webSocketMessage(this.ws,JSON.stringify({type,...payload})));return true}
 enqueue(fn){this.queue=this.queue.then(fn).catch(error=>this.receive({type:'error',error:String(error.message||error)}));return this.queue}
 schedule(){if(this.timer!==null)clearTimeout(this.timer);this.timer=null;if(!this.running||this.alarmAt===null)return;this.timer=setTimeout(()=>{this.timer=null;this.alarmAt=null;this.enqueue(()=>this.room.alarm()).then(()=>this.schedule())},Math.max(0,this.alarmAt-Date.now()))}
 stop(){this.running=false;if(this.timer!==null)clearTimeout(this.timer);this.timer=null;this.ws.readyState=3;if(this.adapter.ws===this.ws)this.adapter.ws=null}
}
export function installOfflineMode(adapter){
 let local=null;const original={};
 for(const method of ['loadCatalog','listRooms','createRoom','roomStatus','connect','send','close'])original[method]=adapter[method].bind(adapter);
 adapter.offline=false;
 adapter.useOffline=()=>{original.close();adapter.offline=true;local??=new OfflineSession(adapter);return local};
 adapter.useOnline=()=>{local?.stop();adapter.offline=false};
 adapter.loadCatalog=(...args)=>adapter.offline?local.catalog():original.loadCatalog(...args);
 adapter.listRooms=(...args)=>adapter.offline?local.list():original.listRooms(...args);
 adapter.createRoom=(...args)=>adapter.offline?local.create(...args):original.createRoom(...args);
 adapter.roomStatus=(...args)=>adapter.offline?local.status(...args):original.roomStatus(...args);
 adapter.connect=(...args)=>adapter.offline?local.connect(...args):original.connect(...args);
 adapter.send=(type,payload={})=>adapter.offline?local.send(type,payload):original.send(type,payload);
 adapter.close=(...args)=>{if(adapter.offline){local.stop();adapter.manualClose=true}else original.close(...args)};
 return adapter;
}
