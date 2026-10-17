import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {ITEMS} from '../src/offline_content.js';
import {beginServerAction,completeAction,resolveEventChoice,lootCorpse,updatePassiveTime} from '../src/match_engine.js';
import {inventoryOperation,offerEquipment} from '../src/inventory_ops.js';
import {isUniqueMaterial} from '../src/unique_materials.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const Room=await loadRoom(),t=1700000000000;
const setup=()=>{const h=createHarness(Room,{humans:2,ai:0,now:t}),m=structuredClone(h.match),p=m.players[0];p.eq=[];p.mat={};p.con={};m.wilds=[];return{h,m,p,q:m.players[1]}};
const source=fs.readFileSync(new URL('../src/match_engine.js',import.meta.url),'utf8'),route=vm.runInNewContext('('+source.match(/const SPECIAL_ROUTE_REGION=(\{[\s\S]*?\});/)[1]+')');
const random=Math.random;
try{
 for(const [id,it]of Object.entries(ITEMS).filter(([,it])=>it.tier==='준최종')){
  const {m,p,q}=setup(),special=Object.keys(it.r).find(x=>x.startsWith('special_'));assert(!isUniqueMaterial(special));p.region=route[special];q.region=p.region==='city'?'factory':'city';
  const candidates=Object.entries(route).filter(([,r])=>r===p.region).map(([id])=>id),ix=candidates.indexOf(special);
  // Old persisted one-off states must not restrict these resources after upgrading.
  m.uniqueSpecials[special].state='consumed';
  for(let n=0;n<3;n++){let rolls=[.99,0,(ix+.5)/candidates.length];Math.random=()=>rolls.shift()??.99;const a=beginServerAction(m,p,'search',{},t);assert(a.ok);const result=completeAction(m,p,a.action.completeAt+1);assert.equal(result.itemId,special,id);assert.equal(p.mat[special],n+1)}
  for(let n=0;n<2;n++){for(const [part,count]of Object.entries(it.r))if(ITEMS[part].t==='e')for(let i=0;i<count;i++)p.eq.push(part);const a=beginServerAction(m,p,'craft',{id},t);assert(a.ok);assert(completeAction(m,p,a.action.completeAt+1).ok);assert.equal(p.eq.filter(x=>x===id).length,n+1)}
  q.mat[special]=2;assert(inventoryOperation(m,p,{mode:'dismantle_equipment',index:0,id}).ok);assert.equal(p.mat[special],2);assert.equal(p.eq.filter(x=>x===id).length,1);
 }
 // Reproduce the former E075 deletion with the same full inventory.
 {
  const {m,p}=setup();p.region='evil_training';p.eq=['near_final_02','final_01','final_02'];p.pendingEvent='E075';const before=[...p.eq];Math.random=()=>0;assert(resolveEventChoice(m,p,2,t).ok);assert.deepEqual(p.eq,before);assert.equal(p.pendingPickup.kind,'equipment');
  const restored=JSON.parse(JSON.stringify(m)),rp=restored.players[0],token=rp.pendingPickup.token;
  for(const payload of [{replaceIndex:-1},{replaceIndex:1,replaceId:'wrong'}]){assert.equal(inventoryOperation(restored,rp,{mode:'resolve_pickup',token,choice:'replace',...payload}).ok,false);assert.deepEqual(rp.eq,before)}
  const result=inventoryOperation(restored,rp,{mode:'resolve_pickup',token,choice:'replace',replaceIndex:1,replaceId:'final_01'});assert(result.ok);assert.deepEqual(rp.eq,['near_final_02','final_02','basic_sword']);assert(!rp.pendingPickup);assert.equal(inventoryOperation(restored,rp,{mode:'resolve_pickup',token,choice:'discard'}).error,'pickup_missing');
 }
 // Multiple identical rewards, one-slot replacement, discard and replay protection.
 {
  const {m,p}=setup();p.eq=['plate','plate','focus'];offerEquipment(m,p,'basic_sword',2);assert.equal(p.pickupQueue.length,1);const token=p.pendingPickup.token;
  assert(inventoryOperation(m,p,{mode:'resolve_pickup',token,choice:'replace',replaceIndex:1,replaceId:'plate'}).ok);assert.deepEqual(p.eq,['plate','focus','basic_sword']);assert(p.pendingPickup);assert.equal(inventoryOperation(m,p,{mode:'resolve_pickup',token,choice:'discard'}).error,'pickup_missing');
  assert(inventoryOperation(m,p,{mode:'resolve_pickup',token:p.pendingPickup.token,choice:'discard'}).ok);assert.deepEqual(p.eq,['plate','focus','basic_sword']);assert(!p.pendingPickup);
 }
 // Full corpse acquisition also asks instead of automatically replacing gear.
 {
  const {m,p}=setup();p.eq=['plate','focus','accel'];m.corpses=[{id:'loot',region:p.region,eq:['near_final_02'],mat:{},con:{},expiresAt:t+10000}];assert(lootCorpse(m,p,'loot','eq','near_final_02',1,true,t).ok);assert.deepEqual(p.eq,['plate','focus','accel']);assert.equal(p.pendingPickup.id,'near_final_02');assert(inventoryOperation(m,p,{mode:'resolve_pickup',token:p.pendingPickup.token,choice:'discard'}).ok);assert.deepEqual(p.eq,['plate','focus','accel']);
 }
 // Real event command -> persisted choice -> adapter -> reconnect -> explicit swap.
 {
  const {h,m,p}=setup();p.region='evil_training';p.eq=['plate','focus','accel'];p.pendingEvent='E075';await h.room.saveMatch(m);const clock=Date.now;Date.now=()=>t;Math.random=()=>0;
  try{await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'event_choice',index:2}));const pending=(await h.room.getMatch()).players[0].pendingPickup;assert(pending);const resumed=new Room(h.ctx,h.env),net=new MasodoNetworkAdapter('https://example.test');resumed.sendMatchState(h.sockets[0],await resumed.getMatch(),{force:true,now:t});net.acceptStateMessage(h.sockets[0].messages.at(-1));assert.equal(net.lastMatch.self.pendingPickup.kind,'equipment');await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_inventory',mode:'resolve_pickup',token:pending.token,choice:'replace',replaceIndex:2,replaceId:'accel'}));assert.deepEqual((await h.room.getMatch()).players[0].eq,['plate','focus','basic_sword']);}finally{Date.now=clock}
 }
 // Death moves reserved gear and repeatable materials into the corpse; final materials keep their one world drop.
 {
  const {m,p}=setup();p.eq=['plate','focus','accel'];p.mat={special_14:3,special_01:1};Object.assign(m.uniqueSpecials.special_01,{state:'held',holderId:p.playerId});offerEquipment(m,p,'basic_sword',2);p.hp=1;p.statuses={poison:{stacks:3,until:t+10000}};p.nextStatusTick=t;
  updatePassiveTime(m,t+2000);assert(!p.alive);const corpse=m.corpses.find(x=>x.name===p.playerName);assert(corpse);assert.equal(corpse.mat.special_14,3);assert.equal(corpse.eq.filter(id=>id==='basic_sword').length,2);assert(!corpse.mat.special_01);assert.equal(m.uniqueSpecials.special_01.state,'ground');assert(!p.pendingPickup);assert.deepEqual(p.pickupQueue,[]);
 }
 assert.equal(Object.keys(ITEMS).filter(isUniqueMaterial).length,24);
}finally{Math.random=random}
console.log('PASS: all 17 semi-final resources repeatedly searched/crafted/dismantled; old ledger migration; event/corpse equipment choices, duplicate reward queue, stale/replayed selections, persistence/reconnect; 24 final resources remain unique');
