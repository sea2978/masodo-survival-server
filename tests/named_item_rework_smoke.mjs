import assert from 'node:assert/strict';
import {NAMED_ITEMS} from '../src/named_gear.js';
import {ITEMS} from '../src/offline_content.js';
import {CHARACTERS} from '../src/game_data.js';
import {beginServerAction,completeAction,publicPlayer,updatePassiveTime} from '../src/match_engine.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
const Room=await loadRoom(),T=1700000000000;
const random=(value,f)=>{const old=Math.random;Math.random=()=>value;try{return f()}finally{Math.random=old}};
function fresh(id){const h=createHarness(Room,{humans:3,ai:0,now:T}),m=h.match,[p,t]=m.players;p.charId='c51';p.eq=[id];p.sp=1000;p.hp=50;p.rework.keywords=[];t.charId='c01';t.maxHp=t.hp=10000;t.sp=1000;t.eq=[];m.players[2].region='estate';m.wilds=[];return{...h,m,p,t,now:T};}
function act(h,type,x={},draw=.01,actor=h.p){actor.pendingAction=null;actor.pendingEvent=null;actor.pendingPickup=null;actor.statuses={};actor.cdCUntil=actor.cdAUntil=0;actor.encounter=['attack','skill'].includes(type)?{kind:'player',targetId:(actor===h.p?h.t:h.p).playerId}:null;const a=beginServerAction(h.m,actor,type,x,h.now);assert(a.ok,JSON.stringify({type,x,a,id:actor.eq}));const out=random(draw,()=>completeAction(h.m,actor,a.action.completeAt));assert(out?.ok,JSON.stringify({type,out}));h.now=a.action.completeAt+2100;return out;}
assert.equal(Object.keys(NAMED_ITEMS).length,41);
for(const[id,d]of Object.entries(NAMED_ITEMS)){
 const h=fresh(id),{m,p,t}=h,g=d.gimmick;assert.notEqual(p.charId,d.owner,'effect tested on a non-owner');
 if(g.chargeEvent==='search')act(h,'search',{},.999);
 if(g.chargeEvent==='move'){act(h,'move',{to:'estate'});t.region=p.region;}
 if(g.chargeEvent==='food'){p.con.bread=1;act(h,'use_item',{id:'bread'});}
 if(g.chargeEvent==='hit')act(h,'attack');
 if(g.chargeEvent==='miss')act(h,'attack',{},.999);
 if(g.chargeEvent==='hurt')act(h,'attack',{},.01,t);
 if(g.chargeEvent==='kill'){t.hp=1;act(h,'attack');t.alive=true;t.hp=10000;}
 if(g.chargeEvent){assert.equal(p.gearState[id].count,1,id+' earns a real charge');const hp=p.hp;act(h,'skill');assert.equal(p.gearState[id].count,0,id+' consumes charge on actual cast');assert(p.alive);}
 if(g.actionShield){act(h,g.actionShield);assert(p.gearState[id].shield.amount>0,id);}
 if(g.castHeal||g.castSp||g.castShield||g.randomCast){p.hp=40;p.sp=100;act(h,'skill');const s=p.gearState[id];assert(s.castAt>0,id);if(g.castHeal)assert(p.hp>40,id);if(g.castShield)assert(s.shield?.amount>0,id);if(g.randomCast)assert.equal(s.lastRoll,'HP 회복',id);}
 if(g.hurtShield){p.hp=20;act(h,'attack',{},.01,t);assert(p.gearState[id].castAt>0,id+' emergency shield');}
 if(g.rows){h.now+=50000;t.statuses={};act(h,g.skillOnly?'skill':'attack');for(const[status]of g.rows){assert(t.statuses[status]?.stacks>0,id+' applies '+status);const notice=t.statusNotices?.find(n=>n.statusId===status);assert(notice?.cause.includes(ITEMS[id].n),id+' preserves received-debuff item cause');}}
 if(g.mark){act(h,'attack');assert.equal(p.gearState[id].targetId,t.playerId);}
 const snapshot=publicPlayer(m,p,h.now,false);assert(snapshot.buffs['rw_gear_'+id],id+' visible equipped gimmick');assert(snapshot.buffs['rw_gear_'+id].description.includes(d.text));
 await h.room.saveMatch(m);const restored=await new Room(h.ctx,h.env).getMatch();assert.deepEqual(restored.players[0].gearState,p.gearState,id+' state persists');
 // Removing the item removes its HUD and active stored charge/shield, but cannot reset effect cooldowns.
 const cooldown=p.gearState?.[id]?.castAt;p.eq=[];updatePassiveTime(m,h.now);const removed=publicPlayer(m,p,h.now,false);assert(!removed.buffs['rw_gear_'+id]);assert.equal(p.gearState?.[id]?.count||0,0);assert(!p.gearState?.[id]?.shield);if(cooldown)assert.equal(p.gearState[id].castAt,cooldown);
}
for(const[id,it]of Object.entries(ITEMS))if(it.t==='e'){if(it.equipKind==='weapon'){assert(it.atk>0,id);assert.equal(it.def,0,id);}else{assert.equal(it.atk,0,id);assert(it.def>0,id);}}
assert.equal(ITEMS.final_18.weaponType,'검');assert.equal(ITEMS.final_18.n,'하나린의 검');assert(ITEMS.final_18.r.blade);assert(!ITEMS.final_18.r.rare_dagger);assert.equal(CHARACTERS.find(c=>c.id==='c38').preferredWeapon,'검');assert.equal(CHARACTERS.find(c=>c.id==='c07').preferredWeapon,'총');assert.equal(ITEMS.near_final_02.weaponType,'총');assert.equal(ITEMS.near_final_03.equipKind,'equipment');assert(ITEMS.near_final_03.r.rare_boots);assert(ITEMS.rare_boots.r.basic_boots);assert.equal(ITEMS.final_09.n,'녹투아의 일본도');
console.log('PASS: all 41 named items work on non-owner characters through real action/cast/hit/status/shield/charge paths; source notices, private buff HUD, save/load, removal; all weapon/equipment stats and DB corrections');
// Casting consumes the stored bonus before damage; the same weak mechanic also works on the legacy c01 path.
for(const charId of ['c51','c01']){
 const charged=fresh('final_04');charged.p.charId=charId;act(charged,'attack');act(charged,'attack');assert.equal(charged.p.gearState.final_04.count,2);const boosted=act(charged,'skill');const plain=fresh('final_04');plain.p.charId=charId;const ordinary=act(plain,'skill');assert(boosted.damage>ordinary.damage,JSON.stringify({charId,boosted,ordinary}));assert.equal(charged.p.gearState.final_04.count,0);
}
{
 const h=fresh('near_final_01');h.p.eq=['near_final_01','near_final_01'];act(h,'attack');assert.equal(h.t.statusNotices.filter(x=>x.cause.includes(ITEMS.near_final_01.n)).length,1,'duplicate equipped copy cannot double proc');
 const blocked=fresh('final_02');act(blocked,'skill');const hp=blocked.p.hp,amount=blocked.p.gearState.final_02.shield.amount;act(blocked,'attack',{},.1,blocked.t);assert((blocked.p.gearState.final_02.shield?.amount||0)<amount);assert.equal(blocked.p.hp,hp,'actual incoming hit is absorbed by the gear shield');
}
console.log('PASS: consumed charge increases actual skill damage for reworked and legacy characters; duplicate-copy proc lock; real incoming shield absorption');
// 60% x2 uses two actual strikes with separate hit rolls, a persisted 200ms gap and target revalidation.
for(const charId of ['c51','c01']){
 const h=fresh('final_15');h.p.charId=charId;const first=act(h,'attack',{},.1),queue=h.m.reworkStrikes[0],due=queue.at,afterFirst=h.t.hp;assert.equal(queue.spec.hits,2);assert.equal(queue.spec.mult,1.2);assert.equal(queue.remaining,1);random(.1,()=>updatePassiveTime(h.m,due-1));assert.equal(h.t.hp,afterFirst);await h.room.saveMatch(h.m);const restored=await new Room(h.ctx,h.env).getMatch();random(.1,()=>updatePassiveTime(restored,due));assert(restored.players[1].hp<afterFirst);const strikes=restored.combatNotices.filter(x=>x.sourceId===h.p.playerId&&x.targetId===h.t.playerId);assert.equal(strikes.length,2);assert.equal(strikes[0].damage,strikes[1].damage);assert.equal(strikes[1].at-strikes[0].at,200);assert.equal(restored.reworkStrikes.length,0);
}
{
 const h=fresh('final_15');act(h,'attack',{},.1);const due=h.m.reworkStrikes[0].at,hp=h.t.hp;random(.999,()=>updatePassiveTime(h.m,due));assert.equal(h.t.hp,hp);assert(h.m.combatNotices.some(x=>x.targetId===h.t.playerId&&x.hit===false));
 const left=fresh('final_15');act(left,'attack',{},.1);const deadline=left.m.reworkStrikes[0].at,before=left.t.hp;left.t.region='estate';random(.1,()=>updatePassiveTime(left.m,deadline));assert.equal(left.t.hp,before);assert.equal(left.m.reworkStrikes.length,0);
}
console.log('PASS: 60% x2 actual attack strikes, independent miss, exact 200ms interval, save/reload of second strike, reworked/legacy owners, moved-target cancellation');
{
 const h=fresh('final_18');h.p.charId='c38';h.p.proficiency={'단검':42};updatePassiveTime(h.m,h.now);assert.equal(h.p.proficiency['검'],42);h.p.charId='c07';h.p.proficiency={'단말':33};updatePassiveTime(h.m,h.now);assert.equal(h.p.proficiency['총'],33);
}
console.log('PASS: saved Hana/Isia proficiency migrates to corrected sword/gun tags without deleting prior proficiency');
