import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CHARACTERS,isValidCharacter} from '../src/game_data.js';
import {applyStatus,STATUS_DEFS,beginServerAction,completeAction,updatePassiveTime,resolveEventChoice} from '../src/match_engine.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {ENCOUNTER_EVENTS} from '../src/offline_content.js';
const Room=await loadRoom(),t=1700000000000;
assert.equal(CHARACTERS.length,52);const def=CHARACTERS.find(c=>c.name==='{user}');assert.equal(def.id,'c52');assert(isValidCharacter(def.id));assert(def.testOnly);
const fresh=()=>{const h=createHarness(Room,{humans:3,ai:0,now:t}),p=h.match.players[0];p.charId='c52';p.maxSp=p.sp=100;return h};
const run=(values,fn)=>{const old=Math.random;let i=0;Math.random=()=>values[i++]??.99;try{return fn()}finally{Math.random=old}};
const act=(m,p,type,payload={},at=t)=>{const a=run([0],()=>beginServerAction(m,p,type,payload,at));assert(a.ok,JSON.stringify(a));return run([0,.99,.99,.99],()=>completeAction(m,p,a.action.completeAt))};
{
 const h=fresh(),m=h.match,[p,q]=m.players;const hp=p.hp;q.encounter={kind:'player',targetId:p.playerId};const hit=act(m,q,'skill');assert.equal(hit.damage,0);assert.equal(p.hp,hp);assert(p.alive);
 applyStatus(p,'poison',3,null,q.playerId,t+2000);applyStatus(p,'bleed',5,null,q.playerId,t+2000);updatePassiveTime(m,t+6000);assert.equal(p.hp,hp);
 p.encounter={kind:'player',targetId:q.playerId};const attack=act(m,p,'attack',{},t+7000);assert.equal(attack.bleedDamage,0);assert.equal(p.statuses.bleed.stacks,4);assert.equal(p.hp,hp);
 p.encounter=null;p.con.carbonara_mint_fish=1;const food=act(m,p,'use_item',{id:'carbonara_mint_fish'},t+10000);assert.equal(food.dead,false);assert(p.alive);assert.equal(p.hp,hp);
 const danger=ENCOUNTER_EVENTS.find(e=>e.choices.some(c=>/HP\s*-/.test(c.result)&&!c.condition));if(danger){p.pendingEvent=danger.id;const index=danger.choices.findIndex(c=>/HP\s*-/.test(c.result)&&!c.condition);run([0,0,0,0,0],()=>resolveEventChoice(m,p,index,t+12000));assert.equal(p.hp,hp);assert(p.alive)}
}
{
 const h=fresh(),m=h.match,p=m.players[0];p.statusImmunity={sleep:t+12000};const hp=p.hp;act(m,p,'char_action');assert.equal(Object.keys(p.statuses).length,9);for(const id of Object.keys(STATUS_DEFS))assert.equal(p.statuses[id].stacks,1,id);assert.equal(p.hp,hp);assert.equal(p.cdAUntil,t+500,'no additional skill cooldown');
 assert.equal(beginServerAction(m,p,'rest',{},t+1000).error,'asleep','invulnerability does not remove debuff control effects');updatePassiveTime(m,t+12000);assert.equal(p.hp,hp);assert.deepEqual(Object.keys(p.statuses),['bleed']);
 await h.room.saveMatch(m);const reloaded=await new Room(h.ctx,h.env).getMatch();assert.equal(reloaded.players[0].charId,'c52');assert(reloaded.players[0].alive);assert.equal(reloaded.players[0].statuses.bleed.until,null);
}
for(const targetId of ['c01','c37','c52']){
 const h=fresh(),m=h.match,[p,q]=m.players;q.charId=targetId;p.encounter={kind:'player',targetId:q.playerId};const sp=p.sp;const result=act(m,p,'skill');assert.equal(p.sp,sp);assert(result.hit);
 if(targetId==='c52'){assert(q.alive);assert.equal(result.damage,0);assert.equal(p.kills,0)}else{assert(!q.alive);assert.equal(q.hp,0);assert.equal(p.kills,1);assert.equal(q.deathSource.name,p.playerName);assert(!q.rev,'instant death bypasses revive')}
}
{
 const h=fresh(),m=h.match,p=m.players[0],w=m.wilds.find(w=>w.region==='city');assert(w);p.encounter={kind:'wild',wildId:w.id};const result=act(m,p,'skill');assert(result.killed);assert.equal(w.hp,0);assert(!w.alive);
}
// The online AI population excludes the explicitly flagged test character.
const roomSource=fs.readFileSync(new URL('../src/room.js',import.meta.url),'utf8');assert(roomSource.includes('CHARACTERS.filter(c=>!c.testOnly)'));assert(roomSource.includes('aiCharacters[Math.floor(Math.random()*aiCharacters.length)]'));
console.log('PASS: {user} roster, damage/poison/bleed/event/food immunity; 9 self debuffs and control effects; save/reload; instant player/reviver/wild kills and invulnerable target immunity; AI exclusion');
