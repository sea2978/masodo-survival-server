import assert from 'node:assert/strict';
import {ITEMS} from '../src/offline_content.js';
import {createServerPlayer} from '../src/game_data.js';
import {initWorld,beginServerAction,completeAction,resolveEventChoice} from '../src/match_engine.js';
import {inventoryOperation} from '../src/inventory_ops.js';
import {uniqueMaterialExists,isUniqueMaterial} from '../src/unique_materials.js';
const t=1700000000000;
function setup(){const p=createServerPlayer({sessionId:'craft',playerName:'Craft',charId:'c01',startRegion:'city'},0),q=createServerPlayer({sessionId:'other',playerName:'Other',charId:'c02',startRegion:'factory'},1);const m={matchId:'craft',phase:'playing',startedAt:t,players:[p,q]};initWorld(m);p.eq=['plate','focus','accel'];p.mat={};p.con={};return{m,p,q}}
function ingredients(p,id){for(const [part,n]of Object.entries(ITEMS[id].r||{})){const bag=ITEMS[part].t==='m'?p.mat:ITEMS[part].t==='c'?p.con:null;if(bag)bag[part]=n;else for(let i=0;i<n;i++)p.eq.push(part)}}
const direct=Object.keys(ITEMS).find(id=>ITEMS[id].t==='e'&&ITEMS[id].r&&Object.keys(ITEMS[id].r).every(x=>ITEMS[x].t==='m'));
{
 const {m,p}=setup();ingredients(p,direct);const before=JSON.stringify([p.eq,p.mat]);
 assert.equal(beginServerAction(m,p,'craft',{id:direct},t).error,'equipment_full');assert.equal(JSON.stringify([p.eq,p.mat]),before);
 assert.equal(beginServerAction(m,p,'craft',{id:direct,replaceIndex:1,replaceId:'plate'},t).error,'equipment_full');
 const a=beginServerAction(m,p,'craft',{id:direct,replaceIndex:1,replaceId:'focus'},t);assert(a.ok);assert.equal(JSON.stringify([p.eq,p.mat]),before,'no early discard');
 const restored=JSON.parse(JSON.stringify(m)),rp=restored.players[0];const result=completeAction(restored,rp,a.action.completeAt+1);assert(result.ok);assert.deepEqual(rp.eq,['plate','accel',direct]);assert.equal(result.discarded,'focus');
}
for(const [id,it]of Object.entries(ITEMS).filter(([,it])=>it.t==='e'&&it.r&&Object.keys(it.r).some(x=>ITEMS[x].t==='e'))){
 const {m,p}=setup();p.eq=[];ingredients(p,id);while(p.eq.length<3)p.eq.push('plate');const before=[...p.eq];
 for(const part of Object.keys(it.r))if(part.startsWith('special_'))Object.assign(m.uniqueSpecials[part],{state:'held',holderId:p.playerId});
 const a=beginServerAction(m,p,'craft',{id},t);assert(a.ok,id+JSON.stringify(a));const result=completeAction(m,p,a.action.completeAt+1);assert(result.ok,id);
 const expected=[...before];for(const [part,n]of Object.entries(it.r))if(ITEMS[part].t==='e')for(let i=0;i<n;i++)expected.splice(expected.indexOf(part),1);expected.push(id);assert.deepEqual(p.eq,expected,id);
}
{
 const {m,p}=setup();ingredients(p,direct);const a=beginServerAction(m,p,'craft',{id:direct,replaceIndex:1,replaceId:'focus'},t);assert(a.ok);p.eq[1]='plate';const before=JSON.stringify([p.eq,p.mat]);assert.equal(completeAction(m,p,a.action.completeAt+1).ok,false);assert.equal(JSON.stringify([p.eq,p.mat]),before,'stale selection preserves materials');
}
for(const [id,it]of Object.entries(ITEMS).filter(([,it])=>it.t==='e'&&Object.keys(it.r||{}).some(isUniqueMaterial))){
 const {m,p,q}=setup();p.eq=[];ingredients(p,id);const special=Object.keys(it.r).find(x=>x.startsWith('special_'));Object.assign(m.uniqueSpecials[special],{state:'held',holderId:p.playerId});
 const a=beginServerAction(m,p,'craft',{id},t);assert(a.ok);assert(completeAction(m,p,a.action.completeAt+1).ok);assert.equal(p.mat[special],undefined);assert.equal(m.uniqueSpecials[special].state,'consumed');assert(uniqueMaterialExists(m,special));
 q.mat[special]=1;assert.equal(inventoryOperation(m,p,{mode:'dismantle_equipment',id,index:p.eq.indexOf(id)}).error,'special_already_exists');delete q.mat[special];
 assert(inventoryOperation(m,p,{mode:'dismantle_equipment',id,index:p.eq.indexOf(id)}).ok);assert.equal(p.mat[special],1);assert.equal(m.uniqueSpecials[special].state,'held');
}
console.log('PASS: full-slot explicit discard, all equipped recipe upgrades, stale selection rollback, persisted craft; unique final materials craft/dismantle');

// Two players claiming the same event resource, including after JSON reload.
{
 const {m,p,q}=setup();p.region=q.region='city';p.mat.precision=q.mat.precision=4;p.eq=q.eq=[];
 const random=Math.random;Math.random=()=>.5;
 try{
  for(const player of [p,q,p,q]){player.pendingEvent='E002';assert(resolveEventChoice(m,player,0,t+1000).ok)}
  const counts=Object.values(m.uniqueSpecials).filter(x=>x.state==='held');assert.equal(counts.length,1);
  const unique=Object.keys(m.uniqueSpecials).find(id=>m.uniqueSpecials[id].state==='held');assert.equal((p.mat[unique]||0)+(q.mat[unique]||0),1);
  const restored=JSON.parse(JSON.stringify(m));for(const player of restored.players){player.mat.precision=1;player.pendingEvent='E002';assert(resolveEventChoice(restored,player,0,t+2000).ok)}
  assert.equal(restored.players.reduce((n,x)=>n+(x.mat[unique]||0),0),1);
 }finally{Math.random=random}
}
console.log('PASS: repeated competing event awards and JSON reload retain one unique material per match');
