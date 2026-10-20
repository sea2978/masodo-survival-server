import assert from 'node:assert/strict';
import {ITEMS}from '../src/offline_content.js';
import {CHARACTERS,createServerPlayer}from '../src/game_data.js';
import {initWorld,beginServerAction,completeAction}from '../src/match_engine.js';
const chains={blade:['basic_sword','steel'],spear:['basic_spear','steel'],bow:['basic_bow','wood'],gun:['basic_gun','machine'],gauntlet:['basic_gauntlet','steel']};
const time=1700000000000;
for(const[id,[base,material]]of Object.entries(chains)){
 assert.deepEqual(ITEMS[id].r,{[base]:1,[material]:1});assert.equal(ITEMS[base].weaponType,ITEMS[id].weaponType);
 const p=createServerPlayer({sessionId:'upgrade',playerName:'강화',charId:'c01',startRegion:'city'},0),q=createServerPlayer({sessionId:'other',charId:'c02',startRegion:'factory'},1);
 const m={matchId:id,phase:'playing',startedAt:time,players:[p,q]};initWorld(m);
 p.eq=[base,'plate','focus'];p.mat={[material]:1};p.con={};
 const a=beginServerAction(m,p,'craft',{id},time);assert(a.ok,id+JSON.stringify(a));assert.deepEqual(p.eq,[base,'plate','focus'],'no early consumption');
 const restored=JSON.parse(JSON.stringify(m)),rp=restored.players[0];assert(completeAction(restored,rp,a.action.completeAt+1).ok);
 assert.deepEqual(rp.eq,['plate','focus',id]);assert(!rp.mat[material]);
 const missing=beginServerAction(restored,rp,'craft',{id},a.action.completeAt+2000);assert(!missing.ok,'cannot bypass base weapon');assert.deepEqual(rp.eq,['plate','focus',id]);
 const named=Object.entries(ITEMS).filter(([,x])=>x.r?.[id]);assert(named.length>0,'upgraded weapon still reaches named gear');
}
for(const[id,x]of Object.entries(ITEMS))if(x.equipKind==='weapon'&&x.tier==='희귀'){
 const bases=Object.keys(x.r||{}).filter(k=>ITEMS[k]?.equipKind==='weapon');assert(bases.length===1,'rare weapon must upgrade one base: '+id);assert.equal(ITEMS[bases[0]].tier,'고급');assert.equal(ITEMS[bases[0]].weaponType,x.weaponType);
}
const visiting=new Set(),done=new Set();function visit(id){assert(ITEMS[id],id);assert(!visiting.has(id),'recipe cycle '+id);if(done.has(id))return;visiting.add(id);for(const part of Object.keys(ITEMS[id].r||{}))visit(part);visiting.delete(id);done.add(id)}for(const id of Object.keys(ITEMS))visit(id);
console.log('PASS: all 13 weapon families have basic -> rare chains; 5 corrected upgrades with full slots/persisted completion/no loss/no bypass; named descendants and acyclic recipes');

assert.equal(ITEMS.final_19.n,'엠마의 배틀액스');assert.equal(ITEMS.final_19.weaponType,'중량무기');assert.deepEqual(ITEMS.final_19.r,{rare_heavy:1,special_30:1});assert.equal(CHARACTERS.find(x=>x.id==='c39').preferredWeapon,'중량무기');assert.equal(ITEMS.special_30.n,'미노타우로스 배틀액스 파편');console.log('PASS: Emma battle axe name/type/base/material and preferred weapon agree');
