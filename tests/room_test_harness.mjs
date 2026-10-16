import fs from 'node:fs';
import {createServerPlayer,createAIPlayer} from '../src/game_data.js';
import {initWorld} from '../src/match_engine.js';
import {ENCOUNTER_EVENTS,WILD_TEMPLATES} from '../src/offline_content.js';
export async function loadRoom(file=new URL('../src/room.js',import.meta.url)){
 let source=fs.readFileSync(file,'utf8').replace('import { DurableObject } from "cloudflare:workers";','class DurableObject{constructor(ctx){this.ctx=ctx}}');
 source=source.replace(/from "\.\/([^\"]+)"/g,(_,p)=>'from '+JSON.stringify(new URL('../src/'+p,import.meta.url).href));
 globalThis.WebSocketRequestResponsePair??=class{};
 return (await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).GameRoom;
}
export function createHarness(Room,{humans=10,ai=1,delta=true,now=1700000000000}={}){
 const players=Array.from({length:humans},(_,i)=>createServerPlayer({sessionId:'s'+i,playerName:'QA'+i,charId:'c'+String(i+1).padStart(2,'0'),startRegion:'city'},i));
 for(let i=0;i<ai;i++)players.push(createAIPlayer(humans+i,'c49','city','balanced'));
 const match={matchId:'network-audit',phase:'playing',createdAt:now,startedAt:now,players,wildTemplates:WILD_TEMPLATES,eventCatalog:ENCOUNTER_EVENTS,nextAiTickAt:now+1000};initWorld(match);
 for(const p of players){p.nextStatusTick=now;p.lastSatietyAt=now;p.cdCUntil=0;p.cdAUntil=0;p.tempEffects=[];p.statusImmunity={}}
 const meta={code:'AUDIT',phase:'playing',hostSessionId:'s0',createdAt:now,reconnectRecords:players.slice(0,humans).map(p=>({sessionId:p.sessionId,playerName:p.playerName,charId:p.charId,startRegion:p.region,disconnectedAt:null}))};
 const data=new Map([['room_meta',structuredClone(meta)],['match_state',structuredClone(match)]]),metrics={messages:0,bytes:0,puts:0,putBytes:0,alarms:0,deletes:0,directory:0};let alarm=null;
 const sockets=players.slice(0,humans).map(p=>({messages:[],attachment:{sessionId:p.sessionId,playerName:p.playerName,joined:true,deltaState:delta},deserializeAttachment(){return this.attachment},serializeAttachment(v){this.attachment=v},send(s){metrics.messages++;metrics.bytes+=Buffer.byteLength(s);this.messages.push(JSON.parse(s))},close(){}}));
 const ctx={getWebSockets:()=>sockets,setWebSocketAutoResponse(){},storage:{async get(k){return structuredClone(data.get(k))},async put(k,v){metrics.puts++;metrics.putBytes+=Buffer.byteLength(JSON.stringify(v));data.set(k,structuredClone(v))},async getAlarm(){return alarm},async setAlarm(t){metrics.alarms++;alarm=t},async deleteAlarm(){metrics.deletes++;alarm=null},async deleteAll(){data.clear()}}};
 const env={ROOMS:{getByName(){return{async fetch(){metrics.directory++;return new Response('{}')}}}}};
 const room=new Room(ctx,env);
 return{room,ctx,env,sockets,data,metrics,match,meta,fireAlarm:async()=>{alarm=null;await room.alarm()},resetMetrics(){for(const k of Object.keys(metrics))metrics[k]=0;for(const ws of sockets)ws.messages=[]}};
}
