import assert from 'node:assert/strict';import{loadRoom,createHarness}from './room_test_harness.mjs';import{installOfflineMode}from '../public/offline_runtime.js';import{MasodoNetworkAdapter}from '../public/network_adapter.js';
const Room=await loadRoom();async function lobby(humans=3){const h=createHarness(Room,{humans,ai:0});const meta=await h.room.getMeta();meta.phase='lobby';await h.room.saveMeta(meta);h.data.delete('match_state');h.room.matchJson=null;return h}
{
 const h=await lobby();await h.room.webSocketMessage(h.sockets[1],JSON.stringify({type:'delete_room'}));assert.equal(h.sockets[1].messages.at(-1).error,'host_only');assert(await h.room.getMeta());
 await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'leave_room'}));assert(h.sockets[0].messages.some(x=>x.type==='room_left'));let meta=await h.room.getMeta();assert.equal(meta.hostSessionId,'s1');assert(!meta.reconnectRecords.some(r=>r.sessionId==='s0'));assert.equal(h.room.roomState(meta).humanCount,2);
 const reloaded=new Room(h.ctx,h.env);assert.equal(reloaded.roomState(await reloaded.getMeta()).humanCount,2);assert.equal((await reloaded.getMeta()).hostSessionId,'s1');
 await reloaded.webSocketMessage(h.sockets[1],JSON.stringify({type:'delete_room'}));assert.equal(await reloaded.getMeta(),null);assert.equal(await h.ctx.storage.getAlarm(),null);for(const ws of h.sockets.slice(1))assert(ws.messages.some(x=>x.type==='room_deleted'));
 await reloaded.webSocketClose(h.sockets[2],1000,'closed');assert.equal(await reloaded.getMeta(),null,'close callback cannot recreate deleted room');assert.equal((await reloaded.fetch(new Request('https://room.internal/status'))).status,404);assert(h.metrics.directory>0);
}
{
 const h=await lobby(1);await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'leave_room'}));assert.equal(await h.room.getMeta(),null);assert.equal(await h.ctx.storage.getAlarm(),null);
}
{
 const h=createHarness(Room,{humans:2,ai:0});for(const type of ['leave_room','delete_room']){await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type}));assert.equal(h.sockets[0].messages.at(-1).error,'match_already_started');assert(await h.room.getMatch())}
}
const prior={storage:globalThis.localStorage,fetch:globalThis.fetch,set:globalThis.setTimeout,clear:globalThis.clearTimeout};const saved=new Map();let calls=0;
globalThis.localStorage={getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)};globalThis.fetch=()=>{calls++;throw Error('network')};globalThis.setTimeout=()=>1;globalThis.clearTimeout=()=>{};
try{
 const net=installOfflineMode(new MasodoNetworkAdapter('https://unused.invalid')),local=net.useOffline();await net.loadCatalog();const seen=[];net.on('*',e=>seen.push(e));
 for(const command of ['leaveRoom','deleteRoom']){await net.createRoom({name:'나가기 검증',aiMode:'none'});await net.connect('LOCAL');assert(net[command]());await local.queue;assert.equal((await net.listRooms()).rooms.length,0);assert(!local.running);assert.equal(net.roomCode,null);assert.equal(net.ws,null);assert(net.manualClose)}
 assert(seen.some(e=>e.type==='room_left'));assert(seen.some(e=>e.type==='room_deleted'));assert.equal(calls,0);
}finally{globalThis.localStorage=prior.storage;globalThis.fetch=prior.fetch;globalThis.setTimeout=prior.set;globalThis.clearTimeout=prior.clear}
console.log('PASS: guest deletion denied; explicit leave releases seat and transfers host across reload; last leave/delete removes directory/storage/alarm; peers notified; playing match protected; offline leave/delete with zero network');
