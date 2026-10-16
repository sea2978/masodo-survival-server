import assert from 'node:assert/strict';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
import {compactSnapshot,stateDiff} from '../src/state_transport.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {ITEMS,ENCOUNTER_EVENTS,WILD_TEMPLATES} from '../src/offline_content.js';
const Room=await loadRoom(),h=createHarness(Room);let now=1700000000000;
const clock=Date.now,random=Math.random;Date.now=()=>now;Math.random=()=>.99;
try{
 const m=await h.room.getMatch();const original=JSON.stringify(m);
 h.room.broadcastMatchState(m);assert.equal(JSON.stringify(m),original,'snapshot must not advance or mutate authoritative state');
 const adapter=new MasodoNetworkAdapter('https://example.test');let requests=0;adapter.requestState=()=>requests++;
 let msg=h.sockets[0].messages.at(-1);assert.ok(msg.itemCatalog);let decoded=adapter.acceptStateMessage(msg);
 assert.deepEqual(decoded.match.self.inventory,h.room.snapshot(m,'s0',now).self.inventory);
 h.resetMetrics();now+=1000;h.room.broadcastMatchState(m);assert.equal(h.metrics.messages,0,'clock alone must not send packets');
 await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_rest'}));
 assert.equal(h.metrics.messages,2,'accepted + delta for acting player only');
 msg=h.sockets[0].messages.at(-1);assert.equal(msg.type,'match_delta');decoded=adapter.acceptStateMessage(msg);assert.equal(decoded.match.self.pendingAction.type,'rest');
 const due=(await h.room.getMatch()).players[0].pendingAction.completeAt;now=due;h.resetMetrics();await h.fireAlarm();
 for(const event of h.sockets[0].messages)if(event.type.startsWith('match_'))decoded=adapter.acceptStateMessage(event);
 assert.equal(decoded.match.self.pendingAction,null);assert.equal(h.metrics.puts,1,'completion and AI slot share one match write');
 // Nested deletion, inventory metadata, status changes and combat events round trip.
 const next=await h.room.getMatch(),p=next.players[0];p.mat.wood=2;p.statuses.poison={until:now+2000,sourceId:next.players[1].playerId};p.con.bread=1;
 h.resetMetrics();h.room.broadcastMatchState(next);msg=h.sockets[0].messages.at(-1);decoded=adapter.acceptStateMessage(msg);
 assert.deepEqual(decoded.match.self.inventory,h.room.snapshot(next,'s0',now).self.inventory);
 delete p.statuses.poison;next.combatNoticeSeq=1;next.combatNotices=[{id:1,sourceId:p.playerId,targetId:next.players[1].playerId,damage:5}];
 h.room.broadcastMatchState(next);decoded=adapter.acceptStateMessage(h.sockets[0].messages.at(-1));assert.equal(decoded.match.self.statuses.poison,undefined);assert.equal(decoded.match.combatNotices.length,1);
 const clean=JSON.stringify(adapter.lastMatch);
 assert.equal(adapter.acceptStateMessage({type:'match_delta',baseRevision:999,stateRevision:1000,patch:{set:[],remove:[]}}),null);
 adapter.acceptStateMessage(msg);assert.equal(requests,1);assert.equal(JSON.stringify(adapter.lastMatch),clean,'gap must retain last valid state');
 h.room.sendMatchState(h.sockets[0],next,{force:true});adapter.acceptStateMessage(h.sockets[0].messages.at(-1));assert.equal(adapter.resyncPending,false);
 const rev=adapter.stateRevision;adapter.acceptStateMessage({type:'match_delta',baseRevision:rev,stateRevision:rev+1,patch:{set:[[['__proto__','bad'],true]],remove:[]}});assert.equal(requests,2);assert.equal({}.bad,undefined);
 // New object after hibernation has no in-memory baseline and must send a full snapshot.
 const awake=new Room(h.ctx,h.env);h.resetMetrics();awake.broadcastMatchState(await awake.getMatch());assert.equal(h.metrics.messages,10);assert.ok(h.sockets.every(ws=>ws.messages.at(-1).type==='match_state'));
 await awake.saveMatch(await awake.getMatch());const stored=h.data.get('match_state');assert.equal(stored.eventCatalog,undefined);assert.equal(stored.wildTemplates,undefined);
 const hydrated=await awake.getMatch();assert.equal(hydrated.eventCatalog,ENCOUNTER_EVENTS);assert.equal(hydrated.wildTemplates,WILD_TEMPLATES);
 hydrated.eventCatalog=[{id:'custom'}];await awake.saveMatch(hydrated);assert.deepEqual((await awake.getMatch()).eventCatalog,[{id:'custom'}]);
 h.resetMetrics();const meta=await awake.getMeta();await awake.saveMeta(meta);await awake.saveMeta(meta);assert.equal(h.metrics.puts,0);
 await awake.scheduleNextAlarm(hydrated,meta);await awake.scheduleNextAlarm(hydrated,meta);assert.ok(h.metrics.alarms<=1);
 // Legacy clients keep the original full state schema.
 const legacy=createHarness(Room,{delta:false});legacy.room.broadcastMatchState(await legacy.room.getMatch());assert.ok(legacy.sockets.every(ws=>!ws.messages.at(-1).stateRevision));
 const full=legacy.sockets[0].messages.at(-1);assert.equal(adapter.acceptStateMessage(full).match,full.match);
 // Poison changes must reach both victim and source even on an otherwise idle AI slot.
 const poison=createHarness(Room,{now}),pm=await poison.room.getMatch();pm.players[0].statuses.poison={until:now+10000,stacks:1,sourceId:pm.players[1].playerId};await poison.room.saveMatch(pm);poison.room.broadcastMatchState(pm);poison.resetMetrics();now+=2000;await poison.fireAlarm();
 assert.ok(poison.sockets[0].messages.some(e=>e.type==='match_delta'&&e.combatNotices.length));assert.ok(poison.sockets[1].messages.some(e=>e.type==='match_delta'&&e.combatNotices.length));assert.equal(poison.metrics.messages,2);
 // Resume while another player's action completes must update all affected clients.
 const resume=createHarness(Room,{now});await resume.room.webSocketMessage(resume.sockets[1],JSON.stringify({type:'command_rest'}));resume.resetMetrics();now+=4000;
 await resume.room.webSocketMessage(resume.sockets[0],JSON.stringify({type:'hello',resumeSessionId:'s0',features:['state_delta_v1']}));
 assert.ok(resume.sockets[0].messages.some(e=>e.type==='match_state'&&e.stateRevision));assert.ok(resume.sockets[1].messages.some(e=>e.type==='match_delta'&&e.patch.set.some(([path,value])=>path.join('.')==='self.pendingAction'&&value===null)));
 const end=await resume.room.getMatch();for(const p of end.players.slice(1)){p.hp=0;p.alive=false}await resume.room.saveMatch(end);resume.room.broadcastMatchState(end);
 assert.equal(resume.sockets[0].messages.at(-1).patch.set.find(([path])=>path.join('.')==='result')[1].outcome,'victory');assert.equal(resume.data.get('room_meta').phase,'finished');
 // Diffs correctly handle type replacement and object field removal.
 assert.deepEqual(stateDiff({a:{b:1},c:1},{a:null}),{set:[[['a'],null]],remove:[['c']]});
 console.log('state transport / full-room / hibernation / resync / legacy audit ok');
}finally{Date.now=clock;Math.random=random}
