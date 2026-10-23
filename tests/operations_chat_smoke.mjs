import assert from 'node:assert/strict';
import {operatingWindow,operationStatus,pollUsage,handleOperations} from '../src/server_operations.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const at=x=>Date.parse('2026-10-23T'+x+'+09:00');
for(const [time,open]of [['17:29:59',false],['17:30:00',true],['23:59:59',true],['00:00:00',false]])assert.equal(operatingWindow(at(time)).open,open,time);
const env={OPERATING_HOURS_ENABLED:'true',QUOTA_GUARD_ENABLED:'true'},now=at('18:00:00'),day='2026-10-23';
assert.equal(operationStatus(env,{day,checkedAt:now,blocked:false},now).open,true);
assert.equal(operationStatus(env,{day,checkedAt:now,blocked:true},now).reason,'quota_exhausted');
assert.equal(operationStatus(env,null,now).reason,'usage_unavailable');
assert.equal(operationStatus(env,{day,checkedAt:now-600001},now).open,false);
assert.equal(operationStatus(env,{day,checkedAt:now,blocked:true},Date.parse('2026-10-24T09:00:00+09:00')).reason,'usage_unavailable','previous quota cannot reopen without fresh reading');
for(const value of [79999,80000,80001]){
 const usage=await pollUsage({CF_ACCOUNT_ID:'test',CF_ANALYTICS_TOKEN:'test'},async()=>new Response(JSON.stringify({data:{viewer:{accounts:[{workers:[{sum:{requests:value}}],objects:[{sum:{requests:1}}]}]}}})),now);
 assert.equal(usage.blocked,value>=80000);
}
await assert.rejects(pollUsage({},fetch,now),/credentials/);
await assert.rejects(pollUsage({CF_ACCOUNT_ID:'x',CF_ANALYTICS_TOKEN:'x'},async()=>new Response(JSON.stringify({errors:[{message:'denied'}]})),now),/query/);
const Room=await loadRoom(),h=createHarness(Room,{humans:3,ai:0});let clock=now;const realNow=Date.now;Date.now=()=>clock;
try{
 const meta=await h.room.getMeta();meta.phase='lobby';await h.room.saveMeta(meta);
 for(let i=0;i<115;i++){clock+=1001;await h.room.webSocketMessage(h.sockets[i%2],JSON.stringify({type:'chat',text:'대화 '+i+(i===0?' <img src=x onerror=alert(1)>':'')}))}
 assert.equal(h.data.get('chat_count'),115);assert.equal(h.data.get('chat_page_0').length,50);assert.equal(h.data.get('chat_page_2').length,15);
 const reload=new Room(h.ctx,h.env);const newcomer=h.sockets[2];newcomer.messages=[];
 await reload.sendChatHistory(newcomer,meta);let message=newcomer.messages.at(-1);assert.equal(message.messages.length,50);assert.equal(message.messages[0].seq,65);assert(message.hasMore);
 const all=[...message.messages];while(message.hasMore){clock+=1001;await reload.webSocketMessage(newcomer,JSON.stringify({type:'chat_history',before:message.before}));message=newcomer.messages.at(-1);all.unshift(...message.messages)}assert.equal(all.length,115);assert.equal(all[0].seq,0);assert.equal(all.at(-1).seq,114);
 clock+=1001;await Promise.all(h.sockets.slice(0,2).map((ws,i)=>reload.webSocketMessage(ws,JSON.stringify({type:'chat',text:'동시 '+i}))));assert.equal(h.data.get('chat_count'),117);
 await reload.webSocketMessage(h.sockets[0],JSON.stringify({type:'chat',text:'너무 빠름'}));assert.equal(h.sockets[0].messages.at(-1).error,'chat_rate_limited');
 const separate=createHarness(Room,{humans:1,ai:0});await separate.room.sendChatHistory(separate.sockets[0],separate.meta);assert.equal(separate.sockets[0].messages.at(-1).messages.length,0);
 h.sockets[0].attachment.joined=false;reload.sessions.get(h.sockets[0]).joined=false;clock+=1001;await reload.webSocketMessage(h.sockets[0],JSON.stringify({type:'chat',text:'unauthorized'}));assert.equal(h.sockets[0].messages.at(-1).error,'hello_required');
 // Real shutdown path at midnight, with no client commands.
 const gate=createHarness(Room,{humans:2,ai:1});gate.env.OPERATING_HOURS_ENABLED='true';clock=at('23:59:59');await gate.room.scheduleNextAlarm(null,gate.meta);assert.equal(await gate.ctx.storage.getAlarm(),at('23:59:59')+1000);
 clock+=1000;await gate.fireAlarm();assert(gate.sockets.every(ws=>ws.messages.some(m=>m.type==='server_closed')));assert.equal(await gate.ctx.storage.getAlarm(),null);assert.equal(gate.room.sessions.size,0);
 await gate.room.webSocketClose(gate.sockets[0],4003,'closed');assert.equal(await gate.ctx.storage.getAlarm(),null);
 // Quota closure follows the same path and never resumes the game on retries.
 const quota=createHarness(Room,{humans:1,ai:1});quota.env.QUOTA_GUARD_ENABLED='true';quota.env.ROOMS.getByName=()=>({fetch:async()=>new Response(JSON.stringify({open:false,reason:'quota_exhausted',message:'80% 종료'}))});clock=now;
 await quota.room.webSocketMessage(quota.sockets[0],JSON.stringify({type:'command_search'}));assert.equal(quota.sockets[0].messages.at(-1).type,'server_closed');assert.equal((await quota.room.getMatch()).players[0].pendingAction,null);
 const net=new MasodoNetworkAdapter('https://test');let notice=null;net.on('server_closed',x=>notice=x);assert.throws(()=>net.checkServerClosed({error:'server_closed',message:'80% 종료'}),/80%/);assert(net.manualClose);assert.equal(net.reconnectTimer,null);assert.equal(notice.message,'80% 종료');
}finally{Date.now=realNow}
console.log('PASS: KST boundaries; 79,999/80,000 thresholds; stale/missing usage fail closed; persistent 115-message history + pagination + isolation + concurrency + rate limits; midnight alarm shutdown; quota shutdown; no reconnect');
