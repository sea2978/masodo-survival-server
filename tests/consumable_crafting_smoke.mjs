import assert from 'node:assert/strict';
import {createServerPlayer} from '../src/game_data.js';
import {ITEMS} from '../src/offline_content.js';
import {beginServerAction,completeAction,initWorld,publicPlayer} from '../src/match_engine.js';
const t=1700000000000,ids=['wet_bread','chocolate_bread','sandwich','warm_soup','strong_coffee','hearty_meal'];
function setup(){const p=createServerPlayer({sessionId:'s',playerName:'QA',charId:'c01',startRegion:'city'},0);const m={phase:'playing',matchId:'food',startedAt:t,players:[p],corpses:[]};initWorld(m);p.con={};return{p,m}}
function action(m,p,type,payload,now=t){const a=beginServerAction(m,p,type,payload,now);assert(a.ok,JSON.stringify(a));return completeAction(m,p,a.action.completeAt+1)}
for(const id of ids){const {p,m}=setup();p.con={...ITEMS[id].r};assert(action(m,p,'craft',{id}).ok);assert.equal(p.con[id],1);for(const k of Object.keys(ITEMS[id].r))assert.equal(p.con[k]||0,0);p.hp=20;p.sp=10;p.satiety=20;const before=p.hp;assert(action(m,p,'use_item',{id},t+5000).ok);assert.equal(p.con[id]||0,0);if(ITEMS[id].heal)assert(p.hp>before);if(ITEMS[id].sp)assert(p.sp>10);if(ITEMS[id].consumableBuff)assert(p.tempEffects.some(x=>JSON.stringify(x.fx)===JSON.stringify(ITEMS[id].consumableBuff.fx)));}
{
const {p,m}=setup();p.con={bread:1,water:1,medicine:1};assert(action(m,p,'craft',{id:'wet_bread'}).ok);assert.deepEqual(p.con,{medicine:1,wet_bread:1});const restored=JSON.parse(JSON.stringify(m));assert.equal(publicPlayer(restored,restored.players[0],t+3000).inventory.con.find(x=>x.id==='wet_bread').count,1);
}
{
const {p,m}=setup();p.con={bread:2,water:2,medicine:1};const before=JSON.stringify(p.con);const a=beginServerAction(m,p,'craft',{id:'wet_bread'},t);assert.equal(a.error,'inventory_full');assert.equal(JSON.stringify(p.con),before);
}
{
const {p,m}=setup();p.con={bread:1};assert.equal(beginServerAction(m,p,'craft',{id:'wet_bread'},t).error,'cannot_craft');assert.equal(p.con.bread,1);
}
{
const {p,m}=setup();p.con={hearty_meal:1};action(m,p,'use_item',{id:'hearty_meal'});assert(p.tempEffects.some(x=>x.fx.maxHpFlat===12));publicPlayer(m,p,t+60000);assert(!p.tempEffects.some(x=>x.fx.maxHpFlat===12));
}
console.log('consumable crafting PASS: six recipes -> consumption -> actual healing/buffs, full-slot merge, blocked slots no loss, missing ingredients, saved inventory, buff expiry');
