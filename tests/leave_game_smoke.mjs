import assert from 'node:assert/strict';
import{installOfflineMode}from '../public/offline_runtime.js';import{MasodoNetworkAdapter}from '../public/network_adapter.js';
const prior={storage:globalThis.localStorage,fetch:globalThis.fetch,WebSocket:globalThis.WebSocket,setTimeout:globalThis.setTimeout,clearTimeout:globalThis.clearTimeout};
const saved=new Map();let network=0;globalThis.localStorage={getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)};globalThis.fetch=()=>{network++;throw Error('offline fetch')};globalThis.WebSocket={OPEN:1};globalThis.setTimeout=()=>1;globalThis.clearTimeout=()=>{};
try{
 let net=installOfflineMode(new MasodoNetworkAdapter('https://unused.invalid'));let local=net.useOffline();await net.loadCatalog();await net.createRoom({aiMode:'fixed',aiCount:1});await net.connect('LOCAL',{charId:'c52'});net.send('set_ready',{ready:true});await local.queue;net.send('request_start');await local.queue;
 const game=await local.room.getMatch();game.startedAt=Date.now()-10000;game.introCompleted=true;game.players[0].statuses={};await local.room.saveMatch(game);
 saved.set('masodo-favorite-items','["final_19"]');
 net.send('command_search');const queued=local.queue;await net.leaveGame();await queued;
 assert(!local.running);assert.equal(local.timer,null);assert.equal(local.alarmAt,null);assert.equal(local.data.size,0);assert.equal(local.room.sessions.size,0);assert.equal(net.lastMatch,null);assert.equal(net.roomCode,null);assert.equal(net.ws,null);assert.equal((await net.listRooms()).rooms.length,0);assert(!saved.has('masodo-offline-session-v1'));assert.equal(saved.get('masodo-favorite-items'),'["final_19"]');
 net=installOfflineMode(new MasodoNetworkAdapter('https://unused.invalid'));local=net.useOffline();await net.loadCatalog();assert.equal((await net.listRooms()).rooms.length,0,'reload cannot resume abandoned game');await net.createRoom({name:'새 게임',aiMode:'none'});await net.connect('LOCAL',{charId:'c01'});assert.equal((await local.room.getMeta()).name,'새 게임');assert.equal(await local.room.getMatch(),null);await net.leaveGame();assert.equal(network,0);
 let closed=0;net.useOnline();net.ws={close(){closed++}};await net.leaveGame();assert.equal(closed,1);assert(net.manualClose);assert.equal(net.roomCode,null);
 console.log('PASS: leave during queued offline action drains writes, cancels timers, clears only current game, preserves favorites; reload has no resume; new game and online disconnect work with zero offline network');
}finally{globalThis.localStorage=prior.storage;globalThis.fetch=prior.fetch;globalThis.WebSocket=prior.WebSocket;globalThis.setTimeout=prior.setTimeout;globalThis.clearTimeout=prior.clearTimeout}
