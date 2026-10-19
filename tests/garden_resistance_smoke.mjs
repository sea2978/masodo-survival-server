import assert from 'node:assert/strict';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {beginServerAction,completeAction} from '../src/match_engine.js';
import {ACTION_SKILL_DEFS,NAMED_GEAR_FX} from '../src/skill_defs.js';
const Room=await loadRoom(),t=1700000000000;
assert.equal(ACTION_SKILL_DEFS.c01.gardenStatusChance,1);
function cast(eq=[],roll=()=>.999999){const h=createHarness(Room,{humans:2,ai:0,now:t}),m=h.match,[p,q]=m.players;q.eq=eq;m.wilds=[];const a=beginServerAction(m,p,'char_action',{},t);assert(a.ok);const prev=Math.random;Math.random=roll;let out;try{out=completeAction(m,p,a.action.completeAt)}finally{Math.random=prev}assert(out.ok);return{...h,m,p,q}}
for(const r of [0,.5,.999999]){const {q}=cast([],()=>r);assert(q.statuses.bind);assert(q.statuses.actionDelay)}
// Existing focus equipment can now resist garden action delay at its original 10% rate.
{const {p,q}=cast(['focus'],()=>.05);assert(q.statuses.bind);assert(!q.statuses.actionDelay);assert.equal(p.gardenDetectionNotices[0].targets[0].playerId,q.playerId)}
{const {q}=cast(['focus'],()=>.10);assert(q.statuses.bind);assert(q.statuses.actionDelay)}
// Exercise the general equipment probability-resistance hook without changing any live item stats.
const original=NAMED_GEAR_FX.final_20;
try{
 NAMED_GEAR_FX.final_20={...original,statusResist:.4};
 let {p,q}=cast(['final_20'],()=>.2);assert(!q.statuses.bind);assert(!q.statuses.actionDelay);assert(!p.gardenDetectionSeq);assert(!p.enemyContacts?.city?.some(x=>x.id===q.playerId));
 ({q}=cast(['final_20'],()=>.4));assert(q.statuses.bind);assert(q.statuses.actionDelay);
 let rolls=[0,.1,0,.8];({p,q}=cast(['final_20'],()=>rolls.shift()??.5));assert(!q.statuses.bind);assert(q.statuses.actionDelay);assert(p.enemyContacts.city.some(x=>x.id===q.playerId));assert(!p.gardenDetectionSeq,'do not announce binding when only action delay succeeds');
}finally{NAMED_GEAR_FX.final_20=original}
// Saved successful/partly resisted statuses retain their actual outcome after room recovery.
{const h=cast(['focus'],()=>.05);await h.room.saveMatch(h.m);const saved=await new Room(h.ctx,h.env).getMatch();assert(saved.players[1].statuses.bind);assert(!saved.players[1].statuses.actionDelay)}
console.log('PASS: garden base 100% without 95% cap; existing 10% focus resistance; general gear resistance boundaries and independent debuffs; honest bind notification/detection and persisted outcomes; live gear stats unchanged');
