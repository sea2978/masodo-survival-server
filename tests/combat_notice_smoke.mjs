import assert from 'node:assert/strict';
import {createServerPlayer} from '../src/game_data.js';
import {initWorld,completeAction,updatePassiveTime} from '../src/match_engine.js';
const now=1700000000000;
const p=createServerPlayer({sessionId:'s1',playerName:'공격자',charId:'c01',startRegion:'city'},0);
const q=createServerPlayer({sessionId:'s2',playerName:'방어자',charId:'c02',startRegion:'city'},1);
const m={phase:'playing',startedAt:now,players:[p,q],corpses:[]};initWorld(m);
const random=Math.random;Math.random=()=>.1;
try{
p.encounter={kind:'player',targetId:q.playerId};p.pendingAction={type:'attack',payload:{},completeAt:now};const result=completeAction(m,p,now);
assert(result.hit);assert.equal(m.combatNotices.length,1);const e=m.combatNotices[0];assert.equal(e.sourceName,'공격자');assert.equal(e.targetName,'방어자');assert.equal(e.damage,result.damage);assert.equal(e.kind,'일반 공격');
const w=m.wilds.find(w=>w.region==='city');w.hp=99999;p.encounter={kind:'wild',wildId:w.id};p.pendingAction={type:'attack',payload:{},completeAt:now+2000};const wild=completeAction(m,p,now+2000);
assert(wild.hit);const hit=m.combatNotices.find(e=>e.targetId===w.id);const counter=m.combatNotices.find(e=>e.sourceId===w.id);assert(hit.targetName);assert.equal(counter.sourceName,hit.targetName);assert.equal(counter.damage,wild.counter);assert.equal(counter.targetId,p.playerId);
q.statuses.poison={stacks:1,until:now+10000,sourceId:p.playerId};q.nextStatusTick=now;updatePassiveTime(m,now+2000);const poison=m.combatNotices.find(e=>e.kind==='독');assert.equal(poison.sourceName,'공격자');assert.equal(poison.targetName,'방어자');assert(poison.damage>0);
assert.equal(new Set(m.combatNotices.map(e=>e.id)).size,m.combatNotices.length);assert.deepEqual(JSON.parse(JSON.stringify(m.combatNotices)),m.combatNotices);
console.log('combat notice PASS: player attack damage and names, wild attack and counter, poison source, unique IDs, persistence');
}finally{Math.random=random}
