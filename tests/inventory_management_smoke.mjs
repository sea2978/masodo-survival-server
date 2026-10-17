import {isUniqueMaterial} from '../src/unique_materials.js';
import assert from 'node:assert/strict';
import {ITEMS,POOLS} from '../src/offline_content.js';
import {beginServerAction,completeAction,initWorld,publicPlayer} from '../src/match_engine.js';
import {equipmentSalvage,inventoryOperation} from '../src/inventory_ops.js';
import {settleMatch} from '../src/match_result.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const Room=await loadRoom(),t=1700000000000;
function setup(){const h=createHarness(Room,{humans:2,ai:0,now:t}),m=structuredClone(h.match),p=m.players[0];m.players[1].region='factory';m.wilds=[];return{h,m,p}}
function search(m,p,id){const pool=POOLS[p.region],ix=pool.indexOf(id);assert(ix>=0);const rolls=[.99,.99,0,(ix+.5)/pool.length],random=Math.random;Math.random=()=>rolls.shift()??.99;try{const a=beginServerAction(m,p,'search',{},t);assert(a.ok,JSON.stringify(a));return completeAction(m,p,a.action.completeAt+1)}finally{Math.random=random}}
const conId=POOLS.city.find(id=>ITEMS[id].t==='c'&&!['bread','water','medicine'].includes(id));assert(conId);
{
 const {m,p}=setup();p.con={bread:3,water:2,medicine:1};const before={...p.con};const r=search(m,p,conId);assert.equal(r.kind,'pending_pickup');assert.deepEqual(p.con,before);assert.equal(p.pendingPickup.id,conId);
 assert.equal(beginServerAction(m,p,'rest',{},t+5000).error,'pickup_choice_required');
 const token=p.pendingPickup.token;const restored=JSON.parse(JSON.stringify(m)),q=restored.players[0];
 assert.equal(inventoryOperation(restored,q,{mode:'resolve_pickup',token:'stale',choice:'replace',replaceId:'bread'}).error,'pickup_missing');assert.deepEqual(q.con,before);
 assert.equal(inventoryOperation(restored,q,{mode:'resolve_pickup',token,choice:'replace',replaceId:'invalid'}).error,'replacement_missing');assert.deepEqual(q.con,before);
 assert(inventoryOperation(restored,q,{mode:'resolve_pickup',token,choice:'replace',replaceId:'bread'}).ok);assert.equal(q.con.bread,undefined);assert.equal(q.con[conId],1);assert.equal(Object.keys(q.con).length,3);assert.equal(q.pendingPickup,null);
 assert.equal(inventoryOperation(restored,q,{mode:'resolve_pickup',token,choice:'replace',replaceId:'water'}).error,'pickup_missing');assert.equal(q.con.water,2);
}
{
 const {m,p}=setup();p.con={bread:3,water:2,medicine:1};search(m,p,conId);const token=p.pendingPickup.token;assert(inventoryOperation(m,p,{mode:'resolve_pickup',token,choice:'discard'}).ok);assert.deepEqual(p.con,{bread:3,water:2,medicine:1});assert.equal(p.pendingPickup,null);
}
{
 const {m,p}=setup();p.con={bread:3,water:2,medicine:1};assert.equal(search(m,p,'bread').kind,'item');assert.equal(p.con.bread,4);assert(!p.pendingPickup);
}
{
 const {m,p}=setup();p.eq=['plate','plate','focus'];const old=publicPlayer(m,p,t).def;
 assert.equal(inventoryOperation(m,p,{mode:'drop_equipment',index:0,id:'focus'}).error,'item_missing');assert.equal(p.eq.length,3);
 assert(inventoryOperation(m,p,{mode:'drop_equipment',index:1,id:'plate'}).ok);assert.deepEqual(p.eq,['plate','focus']);assert(publicPlayer(m,p,t).def<old);
 assert(inventoryOperation(m,p,{mode:'dismantle_equipment',index:0,id:'plate'}).ok);assert.deepEqual(p.mat,{steel:1,rubber:1});assert.deepEqual(p.eq,['focus']);
 p.con={bread:8};assert(inventoryOperation(m,p,{mode:'drop_consumable',id:'bread'}).ok);assert.deepEqual(p.con,{});
}
// Every recipe returns exactly its direct ingredients, without replacing unrelated gear.
for(const [id,it]of Object.entries(ITEMS).filter(([,it])=>it.t==='e'&&it.r)){
 const {m,p}=setup();p.eq=[id];p.con={};p.mat={};for(const x of equipmentSalvage(id))if(/^special_/.test(x.id))m.uniqueSpecials[x.id].state='consumed';
 const result=inventoryOperation(m,p,{mode:'dismantle_equipment',index:0,id});assert(result.ok,id+' '+JSON.stringify(result));
 for(const [part,count]of Object.entries(it.r)){const actual=ITEMS[part].t==='e'?p.eq.filter(x=>x===part).length:ITEMS[part].t==='c'?p.con[part]:p.mat[part];assert.equal(actual,count,id+':'+part);if(isUniqueMaterial(part))assert.equal(m.uniqueSpecials[part].holderId,p.playerId)}
}
{
 const {m,p}=setup();p.eq=['toxin_kit'];p.con={bread:1,water:1,canned:1};const before=JSON.stringify([p.eq,p.con,p.mat]);assert.equal(inventoryOperation(m,p,{mode:'dismantle_equipment',index:0,id:'toxin_kit'}).error,'inventory_full');assert.equal(JSON.stringify([p.eq,p.con,p.mat]),before);
 p.pendingAction={type:'rest'};assert.equal(inventoryOperation(m,p,{mode:'drop_equipment',index:0,id:'toxin_kit'}).error,'action_in_progress');p.pendingAction=null;p.alive=false;assert.equal(inventoryOperation(m,p,{mode:'drop_equipment',index:0,id:'toxin_kit'}).error,'player_not_active');
}
// Actual room command -> persisted delta -> adapter -> resumed full snapshot.
{
 const {h,m,p}=setup();p.eq=['plate'];p.con={bread:3,water:2,medicine:1};search(m,p,conId);await h.room.saveMatch(m);h.room.broadcastMatchState(m);
 const net=new MasodoNetworkAdapter('https://example.test');net.acceptStateMessage(h.sockets[0].messages.at(-1));assert.equal(net.lastMatch.self.pendingPickup.id,conId);
 const clock=Date.now;Date.now=()=>t+5000;try{await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_inventory',mode:'resolve_pickup',token:p.pendingPickup.token,choice:'replace',replaceId:'water'}));}finally{Date.now=clock}
 for(const msg of h.sockets[0].messages.slice(1))net.acceptStateMessage(msg);
 assert.equal(net.lastMatch.self.pendingPickup,null);assert.equal(net.lastMatch.self.inventory.con.find(x=>x.id===conId).count,1);
 const resumed=new Room(h.ctx,h.env);resumed.sendMatchState(h.sockets[0],await resumed.getMatch(),{force:true,now:t+5000});net.acceptStateMessage(h.sockets[0].messages.at(-1));assert(!net.lastMatch.self.inventory.con.some(x=>x.id==='water'));
}
{
 const {m,p}=setup();p.pendingPickup={token:'x',id:conId,count:1};m.players[1].alive=false;settleMatch(m,t);assert.equal(p.pendingPickup,null);
}
console.log('inventory management PASS: full-slot search/merge/replace/discard, stale and replayed decisions, persistence/delta/reload, all equipment recipes, full returns rollback, stats, dead/busy guards');
