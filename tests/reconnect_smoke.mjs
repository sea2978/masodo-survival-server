import assert from 'node:assert/strict';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const original={fetch:globalThis.fetch,WebSocket:globalThis.WebSocket,setTimeout:globalThis.setTimeout,clearTimeout:globalThis.clearTimeout,sessionStorage:globalThis.sessionStorage};
let tid=0;const timers=new Map(),sockets=[];
class Socket extends EventTarget{
 static OPEN=1;constructor(url){super();this.url=url;this.readyState=0;this.sent=[];sockets.push(this)}
 open(){this.readyState=1;this.dispatchEvent(new Event('open'))}
 fail(){this.dispatchEvent(new Event('error'))}
 send(s){this.sent.push(JSON.parse(s))}
 close(){this.readyState=3;this.dispatchEvent(new Event('close'))}
 message(data){this.dispatchEvent(new MessageEvent('message',{data:JSON.stringify(data)}))}
}
globalThis.fetch=async()=>({ok:true,json:async()=>({ok:true,room:{}})});globalThis.WebSocket=Socket;globalThis.setTimeout=(fn,ms)=>{const id=++tid;timers.set(id,{fn,ms});return id};globalThis.clearTimeout=id=>timers.delete(id);globalThis.sessionStorage={getItem(){return null},setItem(){}};
const flush=async()=>{for(let i=0;i<20;i++)await Promise.resolve()};
try{
 const net=new MasodoNetworkAdapter('https://example.test');net.getReconnectToken=async()=> 'token';net.saveReconnectToken=()=>{};
 let pending=net.connect('ROOM',{playerName:'QA'});await flush();sockets.at(-1).open();await pending;
 sockets.at(-1).message({type:'hello_ok',sessionId:'same',reconnectToken:'token'});sockets.at(-1).close();assert(net.reconnectTimer);assert.equal(net.reconnectAttempts,1);
 const attempt=async()=>{const id=net.reconnectTimer;const timer=timers.get(id);timers.delete(id);timer.fn();await flush()};
 await attempt();sockets.at(-1).fail();await flush();assert(net.reconnectTimer);assert.equal(net.reconnectAttempts,2);
 await attempt();const hanging=[...timers].find(([,t])=>t.ms===10000);timers.delete(hanging[0]);hanging[1].fn();await flush();assert(net.reconnectTimer);assert.equal(net.reconnectAttempts,3);
 await attempt();const live=sockets.at(-1);live.open();await flush();assert.equal(live.sent[0].resumeSessionId,'same');assert.equal(live.sent[0].reconnectToken,'token');live.message({type:'hello_ok',sessionId:'same'});assert.equal(net.reconnectAttempts,0);
 let received=false;net.on('match_state',()=>received=true);live.message({type:'match_state',match:{matchId:'original'}});assert(received);assert.equal(net.lastMatch.matchId,'original');
 live.close();assert(net.reconnectTimer);net.close();assert.equal(net.reconnectTimer,null);assert(net.manualClose);
 let resolveToken;net.getReconnectToken=()=>new Promise(resolve=>resolveToken=resolve);const n=sockets.length;pending=net.connect('ROOM');await flush();net.close();resolveToken(null);await pending;assert.equal(sockets.length,n);
 const guarded=new MasodoNetworkAdapter('https://example.test');guarded.clientVersion='current';guarded.getReconnectToken=async()=>null;let mismatch=null,connected=false;guarded.on('client_version_mismatch',x=>mismatch=x);guarded.on('connected',()=>connected=true);const handshake=guarded.connect('ROOM');await flush();const oldServer=sockets.at(-1);oldServer.open();await handshake;oldServer.message({type:'connected',build:{version:'changed'}});assert.equal(mismatch.serverVersion,'changed');assert(!connected);assert(guarded.manualClose);assert.equal(guarded.reconnectTimer,null);assert.equal(guarded.ws,null);
 console.log('PASS: build changes between login and room/reconnect -> version mismatch event -> socket closes without retry loop');
 console.log('reconnect PASS: unexpected disconnect, repeated failed opens, timeout retries, session/token resume, state receipt, manual cancellation and in-flight cancellation');
}finally{Object.assign(globalThis,original)}
