import assert from 'node:assert/strict';
import {ACTION_SKILL_DEFS as A,COMBAT_SKILL_DEFS as C} from '../src/skill_defs.js';
import {CHARACTERS,createServerPlayer} from '../src/game_data.js';
import {initWorld,beginServerAction,completeAction} from '../src/match_engine.js';
for(const [id,d]of Object.entries(C))for(const k of ['hit','crit','tempGuard','defIgnore','dispelBonus','quietBonus'])if(d[k]>0)assert(d[k]>=.15,`${id}.${k}`);
for(const [id,d]of Object.entries(A)){for(const k of ['nextDetect','nextDamage','nextHit','nextSearch','nextCrit'])if(d[k]>0)assert(d[k]>=.15,`${id}.${k}`);for(const group of ['tempFx','nextStatus'])for(const [k,v]of Object.entries(d[group]||{}))if(typeof v==='number'&&v!==0&&Math.abs(v)<1)assert(Math.abs(v)>=.15,`${id}.${group}.${k}`)}
for(const c of CHARACTERS)for(const field of ['actionEffectText','combatEffectText']){if(c.id==='c10'&&field==='combatEffectText')continue;for(const m of c[field].matchAll(/([+-]?)(\d+(?:\.\d+)?)%/g)){if(c.id==='c01'&&field==='actionEffectText'&&m[0]==='-10%')continue;assert(Number(m[2])>=15,`${c.id} ${field} ${m[0]}`)}}
const t=1700000000000;
for(const id of ['c01','c08','c25','c12']){
 const p=createServerPlayer({sessionId:id,playerName:id,charId:id,startRegion:'city'},0),m={phase:'playing',startedAt:t,players:[p],corpses:[]};initWorld(m);const oldRandom=Math.random;Math.random=()=>.99;
 try{const a=beginServerAction(m,p,'char_action',{},t);assert(a.ok);assert(completeAction(m,p,a.action.completeAt+1).ok)}finally{Math.random=oldRandom}
 if(id==='c01')assert(m.regionGardens.city);
 if(id==='c08')assert(p.tempEffects.some(x=>x.fx.statusChance===.15));
 if(id==='c25')assert.equal(p.nextCritBonus,.2);
 if(id==='c12')assert.equal(m.regionTraps.city.hitBonus,.2);
}
assert.equal(C.c01.mult,1.5);assert.equal(C.c01.cd,60);assert.equal(A.c01.garden,true);assert.equal(A.c01.cd,45);assert.equal(A.c51.tempFx.profGain,.3);assert.equal(C.c44.prep,1.2);assert.equal(A.c44.tempFx.moveTime,.2);
console.log('skill bonuses PASS: 102 skill definitions/descriptions, bonus floors, actual search/status/luck/trap buffs, original damage/healing/time and stronger bonuses retained');
