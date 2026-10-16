import assert from 'node:assert/strict';
import {PASSIVE_FX} from '../src/skill_defs.js';
import {CHARACTERS,createServerPlayer} from '../src/game_data.js';
import {beginServerAction,completeAction,actionDuration,initWorld,publicPlayer} from '../src/match_engine.js';
for(const [id,fx] of Object.entries(PASSIVE_FX))for(const [k,v] of Object.entries(fx)){
 if(typeof v==='number'&&v!==0&&Math.abs(v)<1&&!['timeAtk'].includes(k)&&!((k==='taken'||k==='prep')&&v>0))assert(Math.abs(v)>=.2,`${id}.${k}`);
}
for(const c of CHARACTERS)for(const m of c.passiveEffectText.matchAll(/([+-]?)(\d+(?:\.\d+)?)%/g)){

 assert(Number(m[2])>=20,`${c.id} description ${m[0]}`);
}
assert.equal(PASSIVE_FX.c39.taken,.2);assert.equal(PASSIVE_FX.c44.prep,.2);assert.equal(PASSIVE_FX.c34.chainPerHit,.2);assert.equal(PASSIVE_FX.c34.chainMax,.8);assert.equal(PASSIVE_FX.c10.timeAtk,.5);assert.equal(PASSIVE_FX.c37.revive,1);
const t=1700000000000,p=createServerPlayer({sessionId:'p',playerName:'QA',charId:'c13',startRegion:'city'},0);const m={phase:'playing',startedAt:t,players:[p],corpses:[]};initWorld(m);p.con={medicine:1};p.hp=20;
const a=beginServerAction(m,p,'use_item',{id:'medicine'},t);assert(a.ok);completeAction(m,p,a.action.completeAt+1);assert(Math.abs(p.hp-46.4)<1e-8);
const tempo=createServerPlayer({sessionId:'t',playerName:'Tempo',charId:'c14',startRegion:'city'},1);m.players.push(tempo);assert(Math.abs(actionDuration(m,tempo,'attack',{},t)-1.15*.8)<1e-9);
const heavy=createServerPlayer({sessionId:'h',playerName:'Heavy',charId:'c44',startRegion:'city'},2);m.players.push(heavy);assert(Math.abs(actionDuration(m,heavy,'attack',{},t)-1.15*1.2)<1e-9);
const attacker=createServerPlayer({sessionId:'a',playerName:'A',charId:'c01',startRegion:'city'},3),emma=createServerPlayer({sessionId:'e',playerName:'Emma',charId:'c39',startRegion:'city'},4);m.players.push(attacker,emma);
const av=publicPlayer(m,attacker,t),ev=publicPlayer(m,emma,t);attacker.encounter={kind:'player',targetId:emma.playerId};const previousRandom=Math.random;Math.random=()=>.1;
try{const attack=beginServerAction(m,attacker,'attack',{},t);assert(attack.ok);const hit=completeAction(m,attacker,attack.action.completeAt+1);assert(hit.hit);assert.equal(hit.damage,Math.max(1,Math.round(av.atk*100/(100+ev.def)*1.2)))}finally{Math.random=previousRandom}
console.log('passive minimum PASS: 51 definitions/descriptions, 20% beneficial floor, 20% drawbacks and unchanged fixed values, chain stages, actual healing and action speed');
