import assert from 'node:assert/strict';
import {PASSIVE_FX} from '../src/skill_defs.js';
import {CHARACTERS,createServerPlayer} from '../src/game_data.js';
import {beginServerAction,completeAction,actionDuration,initWorld} from '../src/match_engine.js';
for(const [id,fx] of Object.entries(PASSIVE_FX))for(const [k,v] of Object.entries(fx)){
 if(typeof v==='number'&&v!==0&&Math.abs(v)<1&&!['timeAtk'].includes(k)&&!((k==='taken'||k==='prep')&&v>0))assert(Math.abs(v)>=.2,`${id}.${k}`);
}
for(const c of CHARACTERS)for(const m of c.passiveEffectText.matchAll(/([+-]?)(\d+(?:\.\d+)?)%/g)){
 if(c.id==='c39'&&m[0]==='+3%'||c.id==='c44'&&m[0]==='+4%')continue;
 assert(Number(m[2])>=20,`${c.id} description ${m[0]}`);
}
assert.equal(PASSIVE_FX.c39.taken,.03);assert.equal(PASSIVE_FX.c44.prep,.04);assert.equal(PASSIVE_FX.c34.chainPerHit,.2);assert.equal(PASSIVE_FX.c34.chainMax,.8);assert.equal(PASSIVE_FX.c10.timeAtk,.5);assert.equal(PASSIVE_FX.c37.revive,1);
const t=1700000000000,p=createServerPlayer({sessionId:'p',playerName:'QA',charId:'c13',startRegion:'city'},0);const m={phase:'playing',startedAt:t,players:[p],corpses:[]};initWorld(m);p.con={medicine:1};p.hp=20;
const a=beginServerAction(m,p,'use_item',{id:'medicine'},t);assert(a.ok);completeAction(m,p,a.action.completeAt+1);assert(Math.abs(p.hp-46.4)<1e-8);
const tempo=createServerPlayer({sessionId:'t',playerName:'Tempo',charId:'c14',startRegion:'city'},1);m.players.push(tempo);assert(Math.abs(actionDuration(m,tempo,'attack',{},t)-1.15*.8)<1e-9);
console.log('passive minimum PASS: 51 definitions/descriptions, 20% beneficial floor, unchanged drawbacks/fixed values, chain stages, actual healing and action speed');
