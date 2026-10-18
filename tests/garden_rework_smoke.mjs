import assert from 'node:assert/strict';
import {applyStatus,beginServerAction,completeAction,publicPlayer,actionDuration} from '../src/match_engine.js';
import {WILD_TEMPLATES} from '../src/offline_content.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
const Room=await loadRoom(),t=1700000000000;
const fresh=()=>createHarness(Room,{humans:4,ai:1,now:t});
const random=(fn)=>{const prev=Math.random;Math.random=()=>.5;try{return fn()}finally{Math.random=prev}};
function act(m,p,type,payload={},at=t){const a=beginServerAction(m,p,type,payload,at);assert(a.ok,JSON.stringify(a));return {at:a.action.completeAt,result:random(()=>completeAction(m,p,a.action.completeAt))}}
{
 const h=fresh(),m=h.match,[p,q,r,s,ai]=m.players;r.region='estate';s.alive=false;q.eq=['focus'];p.hp=40;p.sp=40;
 const a=beginServerAction(m,p,'char_action',{},t);assert(a.ok);assert.equal(a.action.completeAt,t+1000);assert(!m.regionGardens.city);const result=random(()=>completeAction(m,p,a.action.completeAt));assert(result.ok);assert(m.regionGardens.city);assert.equal(p.hp,40,'old action heal removed');assert.equal(p.cdAUntil,t+46000);
 for(const target of [q,ai,...m.wilds.filter(w=>w.region==='city')]){assert.equal(target.statuses.bind.until,t+6000);assert.equal(target.statuses.actionDelay.until,t+11000)}
 for(const target of [p,r,s])assert(!target.statuses.bind);const contacts=publicPlayer(m,p,t+1000,false).enemyContacts;assert.deepEqual(new Set(contacts.map(x=>x.id)),new Set([q.playerId,ai.playerId]));assert.equal(contacts.find(x=>x.id===q.playerId).hp,q.hp);const seenHp=q.hp;q.hp-=5;assert.equal(publicPlayer(m,p,t+1500,false).enemyContacts.find(x=>x.id===q.playerId).hp,seenHp);assert.equal(beginServerAction(m,q,'move',{to:'estate'},t+1500).error,'bound');assert.equal(actionDuration(m,q,'rest',{},t+1500),3*1.25);
 const hp=p.hp,sp=p.sp;act(m,p,'rest',{},t+2000);assert.equal(p.hp,hp+6.75);assert.equal(p.sp,sp+16.2);
 q.hp=40;q.sp=40;q.statuses={};act(m,q,'rest',{},t+15000);assert.equal(q.hp,45,'non-Seonori does not receive garden passive');
 p.region='estate';p.hp=40;p.sp=40;act(m,p,'rest',{},t+20000);assert.equal(p.hp,45);assert.equal(p.sp,52);
 p.region='city';assert(publicPlayer(m,p,t+30000,false).inGarden);await h.room.saveMatch(m);const saved=await new Room(h.ctx,h.env).getMatch();assert(saved.regionGardens.city);assert.equal(publicPlayer(saved,saved.players[0],t+30000,false).enemyContacts.length,2);assert(h.room.snapshot(saved,'s0',t+30000).regionGardens.city);assert(publicPlayer(saved,saved.players[0],t+30000,false).inGarden);
 // Shared region state: another Seonori benefits even when not its installer.
 q.charId='c01';q.hp=40;q.sp=40;act(m,q,'rest',{},t+25000);assert.equal(q.hp,46.75);
 assert(!publicPlayer(saved,saved.players[0],t+31000,false).inGarden);
 p.hp=40;p.sp=40;act(m,p,'rest',{},t+31000);assert.equal(p.hp,45);assert.equal(p.sp,52);assert(!m.regionGardens.city);
 p.cdAUntil=0;act(m,p,'char_action',{},t+40000);assert.equal(m.regionGardens.city.until,t+71000);
}
function damage(statuses,wild=false){const h=fresh(),m=h.match,p=m.players[0],target=wild?m.wilds.find(w=>w.region==='city'):m.players[1];target.hp=1000;target.guardReady=false;target.statuses={};for(const id of statuses)applyStatus(target,id,1,null,p.playerId,t);p.encounter=wild?{kind:'wild',wildId:target.id}:{kind:'player',targetId:target.playerId};const out=act(m,p,'skill');assert(out.result.hit);assert.equal(p.cdCUntil,out.at+60000);assert(!target.statuses.slow,'old skill slow removed');const expectedMult=statuses.includes('bind')?2.5:statuses.includes('actionDelay')?2:1.5;const defense=wild?WILD_TEMPLATES.find(x=>x.id===target.templateId).def:publicPlayer(m,target,out.at,false).def;const attack=publicPlayer(m,p,t,false).atk;assert.equal(out.result.damage,Math.round(Math.max(1,attack*100/(100+defense))*expectedMult));return out.result.damage}
for(const wild of [false,true]){const base=damage([],wild),delay=damage(['actionDelay'],wild),bind=damage(['bind'],wild),both=damage(['bind','actionDelay'],wild);assert(Math.abs(delay/base-2/1.5)<.2);assert(Math.abs(bind/base-2.5/1.5)<.2);assert.equal(bind,both);assert.equal(damage(['bind'],wild),bind)}
// Search uses the garden-only discovery bonus through the real loot roll.
for(const garden of [false,true]){const h=fresh(),m=h.match,p=m.players[0];m.players=[p];m.wilds=[];if(garden)m.regionGardens.city={ownerId:p.playerId,installedAt:t,until:t+30000};let prev=Math.random;Math.random=()=>.95;try{const a=beginServerAction(m,p,'search',{},t);assert(a.ok);const out=completeAction(m,p,a.action.completeAt);assert.equal(out.kind==='nothing',!garden,JSON.stringify(out))}finally{Math.random=prev}}
console.log('PASS: garden installation at completion, all local live enemies/AI/wilds, guaranteed control, no old heal/slow, HP/SP recovery only in gardens, 30-second expiry/reinstallation, shared regions and storage/snapshot, conditional player/wild damage priority and 60s cooldown, real loot roll');
