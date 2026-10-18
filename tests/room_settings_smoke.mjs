import assert from 'node:assert/strict';
import fs from 'node:fs';
import {normalizeRoomSettings,humanCapacity,plannedAICount} from '../src/room_settings.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const Room=await loadRoom(),t=1700000000000;
assert.deepEqual(normalizeRoomSettings().settings,{name:'생존게임 방',aiMode:'fill',aiCount:0});
for(const count of [-1,11,1.5,'3',null,NaN])assert.equal(normalizeRoomSettings({aiMode:'fixed',aiCount:count}).ok,false);
assert.equal(normalizeRoomSettings({aiMode:'bad'}).ok,false);assert.equal(normalizeRoomSettings(null).ok,false);
assert.equal(normalizeRoomSettings({name:'\n  모임방  \t'}).settings.name,'모임방');assert.equal(normalizeRoomSettings({name:'가'.repeat(99)}).settings.name.length,32);
for(const [aiMode,aiCount,humans,expected]of [['fill',0,1,10],['fill',0,10,1],['none',0,1,0],['none',0,2,0],['fixed',3,1,3],['fixed',3,8,3],['fixed',10,1,10],['fixed',0,2,0]]){
 const h=createHarness(Room,{humans,ai:0,now:t}),meta=await h.room.getMeta();Object.assign(meta,{name:'같이 놀자 <방>',phase:'lobby',aiMode,aiCount});await h.room.saveMeta(meta);
 for(const [ws,s]of h.room.sessions){Object.assign(s,{ready:true,charId:'c01',startRegion:'city'});ws.serializeAttachment(s)}
 const state=h.room.roomState(meta);assert.equal(state.name,meta.name);assert.equal(state.maxHumans,humanCapacity(meta));assert.equal(state.plannedAiCount,expected);
 const clock=Date.now;Date.now=()=>t;
 try{await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'request_start'}))}finally{Date.now=clock}
 const match=await h.room.getMatch();assert.equal(match.players.filter(p=>p.isAI).length,expected,JSON.stringify([aiMode,aiCount,humans]));assert.equal(match.players.length,humans+expected);assert.equal(match.roomName,meta.name);
 const resumed=new Room(h.ctx,h.env);assert.equal((await resumed.getMeta()).aiMode,aiMode);assert.equal((await resumed.getMatch()).players.length,humans+expected);
 if(humans===1&&expected===0){assert.equal(match.phase,'playing','solo practice must not instantly finish');assert.equal(await h.ctx.storage.getAlarm(),t+5000,'practice schedules the intro end before the region boundary');const clock=Date.now;Date.now=()=>t+5000;try{await h.fireAlarm();await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_rest'}));Date.now=()=>t+9000;await h.fireAlarm()}finally{Date.now=clock}assert.equal((await h.room.getMatch()).players[0].pendingAction,null);assert.equal((await h.room.getMatch()).phase,'playing');const ended=await h.room.getMatch();ended.players[0].alive=false;ended.players[0].hp=0;await h.room.saveMatch(ended);assert.equal((await h.room.getMatch()).phase,'finished');}
}
// Fixed AI seats are reserved, and rejected joins do not change settings.
{
 const h=createHarness(Room,{humans:1,ai:0}),meta=await h.room.getMeta();Object.assign(meta,{phase:'lobby',aiMode:'fixed',aiCount:10,name:'한 명 연습'});await h.room.saveMeta(meta);
 const ws={attachment:{sessionId:'extra',joined:false},messages:[],deserializeAttachment(){return this.attachment},serializeAttachment(v){this.attachment=v},send(v){this.messages.push(JSON.parse(v))},close(){}};h.room.sessions.set(ws,ws.attachment);
 await h.room.webSocketMessage(ws,JSON.stringify({type:'hello',playerName:'extra'}));assert.equal(ws.messages.at(-1).error,'room_full');assert.equal((await h.room.getMeta()).aiCount,10);
}
// API -> init -> persisted settings -> directory row.
{
 let source=fs.readFileSync(new URL('../src/index.js',import.meta.url),'utf8').replace('export { GameRoom } from "./room.js";','');source=source.replace(/from "\.\/([^\"]+)"/g,(_,p)=>'from '+JSON.stringify(new URL('../src/'+p,import.meta.url).href));
 const worker=(await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).default;
 const rooms=[],directory=createHarness(Room,{humans:0,ai:0});directory.data.clear();
 const env={ROOMS:{getByName(name){if(name==='__MASODO_ROOM_DIRECTORY__')return {fetch:(url,opts)=>directory.room.fetch(new Request(url,opts))};const h=createHarness(Room,{humans:0,ai:0});h.data.clear();h.room.env=env;rooms.push(h);return {fetch:(url,opts)=>h.room.fetch(new Request(url,opts))}}}};
 const create=body=>worker.fetch(new Request('https://test/api/room/create',{method:'POST',body}),env);
 const response=await create(JSON.stringify({name:'친구 방',aiMode:'fixed',aiCount:3}));assert.equal(response.status,201);const result=await response.json();assert.equal(result.room.name,'친구 방');assert.equal(result.room.maxHumans,8);assert.equal((await rooms[0].room.getMeta()).aiCount,3);
 const list=await (await directory.room.fetch(new Request('https://directory/directory/list'))).json();assert.equal(list.rooms[0].name,'친구 방');assert.equal(list.rooms[0].aiCount,3);assert.equal(list.rooms[0].maxHumans,8);
 const legacy=await create('');assert.equal(legacy.status,201);assert.equal((await legacy.json()).room.aiMode,'fill');
 for(const body of ['{',JSON.stringify({aiMode:'fixed',aiCount:99}),JSON.stringify({aiMode:'???'})])assert.equal((await create(body)).status,400);
}
// Adapter forwards the creation fields in its POST request.
{
 const oldFetch=globalThis.fetch;let sent;
 globalThis.fetch=async(url,opts)=>{sent={url,...opts};return new Response(JSON.stringify({ok:true,code:'ABCDEF'}))};
 try{const a=new MasodoNetworkAdapter('https://test');await a.createRoom({name:'친구',aiMode:'fixed',aiCount:3});assert.deepEqual(JSON.parse(sent.body),{name:'친구',aiMode:'fixed',aiCount:3});assert.equal(sent.headers['content-type'],'application/json')}finally{globalThis.fetch=oldFetch}
}
console.log('room settings PASS: API validation/persistence/directory/adapter; fill, none, 0/3/10 fixed AI; reserved seats; reload; solo practice and action completion');
