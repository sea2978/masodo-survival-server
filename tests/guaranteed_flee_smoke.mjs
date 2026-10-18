import assert from 'node:assert/strict';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {beginServerAction,completeAction,applyStatus} from '../src/match_engine.js';
const Room=await loadRoom(),t=1700000000000;
for(const wild of [false,true])for(const roll of [0,.7,.999999]){
 const h=createHarness(Room,{humans:2,ai:0,now:t}),m=h.match,[p,q]=m.players,w=m.wilds.find(w=>w.region===p.region);p.eq=['evasion'];p.encounter=wild?{kind:'wild',wildId:w.id}:{kind:'player',targetId:q.playerId};
 const a=beginServerAction(m,p,'flee',{},t);assert(a.ok);assert(a.action.completeAt>t);assert.equal(completeAction(m,p,a.action.completeAt-1),null);assert(p.encounter);await h.room.saveMatch(m);const saved=await new Room(h.ctx,h.env).getMatch(),actor=saved.players[0];const before=wild?saved.wilds.find(x=>x.id===w.id).hp:saved.players[1].hp;
 const prev=Math.random;Math.random=()=>roll;let out;try{out=completeAction(saved,actor,a.action.completeAt)}finally{Math.random=prev}
 assert(out.ok);assert.equal(out.success,true);assert.equal(actor.encounter,null);assert.equal(actor.pendingAction,null);assert.equal(actor.nextMoveFree,true);assert.equal(wild?saved.wilds.find(x=>x.id===w.id).hp:saved.players[1].hp,before);
}
{
 const h=createHarness(Room,{humans:2,ai:0,now:t}),m=h.match,[p,q]=m.players;p.encounter={kind:'player',targetId:q.playerId};applyStatus(p,'bind',1,null,q.playerId,t);assert.equal(beginServerAction(m,p,'flee',{},t).error,'bound');p.statuses={};applyStatus(p,'sleep',1,null,q.playerId,t);assert.equal(beginServerAction(m,p,'flee',{},t).error,'asleep');p.statuses={};p.encounter=null;assert.equal(beginServerAction(m,p,'flee',{},t).error,'no_encounter');
}
console.log('PASS: guaranteed player/wild escape at all rolls, original wait and saved action recovery, encounter release and evasion effect; bind/sleep/no-encounter restrictions retained');
