import assert from 'node:assert/strict';
import {REGIONS,ADJACENCY} from '../src/game_data.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {SAFE_PASSAGES,updateRegionRestrictions,nextRegionLockAt} from '../src/region_restrictions.js';
import {beginServerAction,completeAction,runAITick} from '../src/match_engine.js';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const Room=await loadRoom(),t=1700000000000;
const fresh=()=>{const h=createHarness(Room,{humans:2,ai:1,now:t});return {h,m:structuredClone(h.match)}};
const random=Math.random;Math.random=()=>0;
try{
 const {m}=fresh();assert.equal(updateRegionRestrictions(m,t+179999),false);assert.deepEqual(m.regionRestrictions.locked,[]);
 m.players[0].region='estate';m.players[0].pendingEvent='E008';m.players[0].encounter={kind:'player',targetId:m.players[1].playerId};m.players[0].pendingPickup={token:'reward',id:'bread',count:1};
 const inventory=JSON.stringify([m.players[0].eq,m.players[0].mat,m.players[0].con]);
 let previous=[];
 for(const seconds of [180,360,540,720]){
  assert(updateRegionRestrictions(m,t+seconds*1000));const rule=m.regionRestrictions;
  assert.equal(rule.locked.length,2);assert.equal(new Set(rule.locked).size,2);assert(rule.locked.every(id=>!SAFE_PASSAGES.includes(id)));assert(previous.every(id=>!rule.locked.includes(id)),'old locks must reopen');
  const before=JSON.stringify(rule);assert.equal(updateRegionRestrictions(m,t+seconds*1000+100),false);assert.equal(JSON.stringify(rule),before);previous=[...rule.locked];
 }
 assert.equal(m.players[0].region,'city');assert.equal(m.players[0].pendingEvent,null);assert.equal(m.players[0].encounter,null);assert.equal(m.players[0].pendingPickup.token,'reward');assert.equal(JSON.stringify([m.players[0].eq,m.players[0].mat,m.players[0].con]),inventory);
 const restored=JSON.parse(JSON.stringify(m));assert.equal(updateRegionRestrictions(restored,t+779999),false);
 restored.players.forEach((p,i)=>{p.region=i?'mgmt_lobby':'city';p.pendingAction={type:'move',payload:{to:'estate'},completeAt:t+800000};p.pendingEvent='E008';p.encounter={kind:'wild',wildId:'w0'}});
 assert(updateRegionRestrictions(restored,t+780000));assert(restored.players.every(p=>p.region==='city'&&!p.pendingAction&&!p.pendingEvent&&!p.encounter));assert.equal(restored.regionRestrictions.locked.length,REGIONS.length-1);assert(!restored.regionRestrictions.locked.includes('city'));assert.equal(nextRegionLockAt(restored),null);assert.equal(updateRegionRestrictions(restored,t+1200000),false);
 for(const id of ADJACENCY.city)assert.equal(beginServerAction(restored,restored.players[1],'move',{to:id},t+780001).error,'region_locked');
 runAITick(restored,t+781000);assert(restored.players.every(p=>p.region==='city'));assert(restored.players.every(p=>p.pendingAction?.type!=='move'));
 // Travel queued immediately before a lock cannot enter the newly locked destination.
 const {m:travel}=fresh(),p=travel.players[0];p.region='city';const a=beginServerAction(travel,p,'move',{to:'estate'},t+179999);assert(a.ok);const sp=p.sp;
 assert.equal(completeAction(travel,p,a.action.completeAt+1),null);assert.equal(p.region,'city');assert.equal(p.sp,sp);assert.equal(p.pendingAction,null);
 // Legacy virtual time offsets must no longer accelerate the clock or locks.
 const {m:offset}=fresh();offset.timeOffsetMs=60000;assert.equal(nextRegionLockAt(offset),t+180000);assert.equal(updateRegionRestrictions(offset,t+120000),false);assert(updateRegionRestrictions(offset,t+180000));offset.phase='finished';const rule=JSON.stringify(offset.regionRestrictions);assert.equal(updateRegionRestrictions(offset,t+900000),false);assert.equal(JSON.stringify(offset.regionRestrictions),rule);
 // A human-only idle room still schedules a boundary alarm and broadcasts/persists it.
 const h=createHarness(Room,{humans:2,ai:0,now:t});const clock=Date.now;Date.now=()=>t;
 try{await h.room.scheduleNextAlarm(h.match);assert.equal(await h.ctx.storage.getAlarm(),t+180000);
  Date.now=()=>t+180000;await h.room.alarm();const saved=await h.room.getMatch();assert.equal(saved.regionRestrictions.locked.length,2);assert.equal(await h.ctx.storage.getAlarm(),t+360000);
  const net=new MasodoNetworkAdapter('https://example.test');for(const msg of h.sockets[0].messages)net.acceptStateMessage(msg);assert.equal(net.lastMatch.regionRestrictions.round,1);
  Date.now=()=>t+780000;await h.room.alarm();const final=await h.room.getMatch();assert(final.regionRestrictions.final);assert(final.players.every(p=>p.region==='city'));assert.equal(await h.ctx.storage.getAlarm(),null);
 }finally{Date.now=clock}
}finally{Math.random=random}
console.log('PASS: 3/6/9/12-minute distinct lock rotation, protected passages, evacuation/cancellation without item loss, 13-minute city finale, AI, JSON recovery, ignored legacy offsets, idle-room alarms and network snapshots');
