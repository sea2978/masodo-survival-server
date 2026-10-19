import assert from 'node:assert/strict';
import {applyStatus,beginServerAction,completeAction,updatePassiveTime,validateAction} from '../src/match_engine.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const Room=await loadRoom(),t=1700000000000;
const fresh=()=>{const h=createHarness(Room,{humans:3,ai:0,now:t});for(const p of h.match.players){p.charId='c01';p.proficiency={};p.eq=[]}return h};
const random=(values,fn)=>{const old=Math.random;let i=0;Math.random=()=>values[i++]??.99;try{return fn()}finally{Math.random=old}};
const near=(a,b)=>assert(Math.abs(a-b)<.000001,`${a} != ${b}`);
const attack=(m,p,q,type='attack',now=t,draw=.1)=>{p.encounter={kind:'player',targetId:q.playerId};const a=random([draw],()=>beginServerAction(m,p,type,{},now));assert(a.ok,JSON.stringify(a));const result=random([0,.99,.99,.99],()=>completeAction(m,p,a.action.completeAt));return {a,result}};
{
 const h=fresh(),m=h.match,[p,q]=m.players;applyStatus(p,'bleed',9,10,q.playerId,t);assert.equal(p.statuses.bleed.stacks,5);assert.equal(p.statuses.bleed.until,null);
 updatePassiveTime(m,t+60000);assert.equal(p.statuses.bleed.stacks,5);const hp=p.hp;
 for(let i=0;i<5;i++){const {result}=attack(m,p,q,'attack',t+60000+i*3000);assert.equal(result.bleedDamage,2*(5-i));assert.equal(p.statuses.bleed?.stacks??0,4-i)}
 assert.equal(p.hp,hp-30);assert(!p.statuses.bleed);
 applyStatus(p,'bleed',3,null,q.playerId,t+80000);p.encounter={kind:'player',targetId:q.playerId};const a=beginServerAction(m,p,'attack',{},t+80000);const miss=random([.99],()=>completeAction(m,p,a.action.completeAt));assert.equal(miss.hit,false);assert.equal(miss.bleedDamage,6);assert.equal(p.statuses.bleed.stacks,2);
 p.encounter=null;const move=beginServerAction(m,p,'move',{to:'estate'},t+83000);assert(move.ok);const moved=completeAction(m,p,move.action.completeAt);assert.equal(moved.bleedDamage,4);assert.equal(p.statuses.bleed.stacks,1);
 p.pendingAction=null;p.con.bandage=1;const bandage=beginServerAction(m,p,'use_item',{id:'bandage'},t+90000);assert(bandage.ok);completeAction(m,p,bandage.action.completeAt);assert(!p.statuses.bleed);
}
{
 const h=fresh(),m=h.match,[p,q]=m.players;p.statuses.bleed={stacks:3,until:t+10000,sourceId:q.playerId};updatePassiveTime(m,t+1000);assert.equal(p.statuses.bleed.until,null);updatePassiveTime(m,t+60000);assert.equal(p.statuses.bleed.stacks,3);
 p.charId='c03';p.pendingAction=null;const a=beginServerAction(m,p,'char_action',{choice:'bleed'},t+61000);assert(a.ok);completeAction(m,p,a.action.completeAt);assert(!p.statuses.bleed,'specific cleanse removes permanent bleed');
 p.charId='c50';p.rework.resources.flow=2;p.cdAUntil=0;applyStatus(p,'bleed',5,null,null,t+65000);const b=beginServerAction(m,p,'char_action',{choice:'cleanse'},t+65000);assert(b.ok);completeAction(m,p,b.action.completeAt);assert(!p.statuses.bleed,'generic cleanse removes permanent bleed');
}
for(const [id,seconds]of [['slow',10],['bind',5],['sleep',10],['fear',5],['confusion',10],['silence',10],['actionDelay',10]]){
 const h=fresh(),p=h.match.players[0];applyStatus(p,id,1,1,null,t);assert.equal(p.statuses[id].until,t+seconds*1000,id+' ignores obsolete source duration');
}
for(const [stacks,mult]of [[1,1.25],[2,1.5]]){
 const plain=fresh(),slow=fresh();const p=slow.match.players[0];applyStatus(p,'slow',stacks,null,null,t);const x=beginServerAction(plain.match,plain.match.players[0],'move',{to:'estate'},t),y=beginServerAction(slow.match,p,'move',{to:'estate'},t);near(y.action.completeAt-t,(x.action.completeAt-t)*mult);
 const h=fresh(),[a,b]=h.match.players;a.encounter={kind:'player',targetId:b.playerId};applyStatus(a,'slow',stacks,null,null,t);const flee=beginServerAction(h.match,a,'flee',{},t);near(flee.action.completeAt-t,1500*mult);
}
{
 const h=fresh(),m=h.match,[p,q]=m.players;const baseline=beginServerAction(m,p,'move',{to:'estate'},t);p.pendingAction=null;applyStatus(p,'fear',1,null,null,t);const faster=beginServerAction(m,p,'move',{to:'estate'},t);near(faster.action.completeAt-t,(baseline.action.completeAt-t)*.8);p.pendingAction=null;p.encounter={kind:'player',targetId:q.playerId};const flee=beginServerAction(m,p,'flee',{},t);near(flee.action.completeAt-t,1200);
}
for(const input of ['attack','skill'])for(const [draw,expected]of [[.1,'attack'],[.9,'skill']]){
 const h=fresh(),m=h.match,[p,q]=m.players;applyStatus(p,'confusion',1,null,null,t);const {a}=attack(m,p,q,input,t,draw);assert.equal(a.action.type,expected,input+' randomized once');assert.equal(p.cdCUntil>t,expected==='skill');
}
for(const input of ['attack','skill']){
 const h=fresh(),m=h.match,[p,q]=m.players;p.cdCUntil=t+60000;applyStatus(p,'confusion',1,null,null,t);const sp=p.sp;const {a,result}=attack(m,p,q,input,t,.9);assert.equal(a.action.type,'attack');assert(result.ok);assert.equal(p.sp,sp);assert.equal(p.cdCUntil,t+60000,'cooldown fallback does not consume/reset skill');
}
for(const id of ['fear','confusion'])for(const type of ['attack','skill']){
 const h=fresh(),m=h.match,[p,q]=m.players;applyStatus(p,id,1,null,null,t);p.encounter={kind:'player',targetId:q.playerId};const a=random([type==='skill'?.9:.1],()=>beginServerAction(m,p,type,{},t));assert(a.ok);const miss=random([.75],()=>completeAction(m,p,a.action.completeAt));assert.equal(miss.hit,false,id+' reduces both attack and skill accuracy by 10 percentage points');
}
{
 const h=fresh(),m=h.match,[p,q]=m.players;applyStatus(p,'bind',1,null,null,t);assert.equal(validateAction(m,p,'move',{to:'estate'},t).error,'bound');p.encounter={kind:'player',targetId:q.playerId};assert.equal(validateAction(m,p,'flee',{},t).error,'bound');applyStatus(p,'bind',1,null,null,t+1000);assert.equal(p.statuses.bind.until,t+6000);
}
{
 const h=fresh(),m=h.match,[p,q]=m.players;applyStatus(p,'sleep',1,null,null,t);assert.equal(validateAction(m,p,'rest',{},t+9000).error,'asleep');assert(validateAction(m,p,'rest',{},t+10000).ok);
 applyStatus(p,'sleep',1,null,null,t+11000);attack(m,q,p,'attack',t+11000);assert(!p.statuses.sleep);assert(!applyStatus(p,'sleep',1,null,null,t+13000),'damage-wake immunity preserved');
}
{
 const h=fresh(),m=h.match,[p,q]=m.players;p.encounter={kind:'player',targetId:q.playerId};applyStatus(p,'silence',1,null,null,t);assert.equal(validateAction(m,p,'skill',{},t+9000).error,'silenced');assert(validateAction(m,p,'attack',{},t+9000).ok);
 p.encounter=null;applyStatus(p,'actionDelay',1,null,null,t);const rest=beginServerAction(m,p,'rest',{},t);near(rest.action.completeAt-t,3750);
}
{
 const h=fresh(),m=h.match,[p,q]=m.players;applyStatus(p,'bleed',5,null,q.playerId,t);await h.room.saveMatch(m);const resumed=new Room(h.ctx,h.env),loaded=await resumed.getMatch();assert.equal(loaded.players[0].statuses.bleed.until,null);resumed.sendMatchState(h.sockets[0],loaded,{force:true,now:t});const net=new MasodoNetworkAdapter('https://example.test');net.acceptStateMessage(h.sockets[0].messages.at(-1));assert.equal(net.lastMatch.self.statuses.bleed.stacks,5);assert.equal(net.lastMatch.self.statuses.bleed.until,null);
 const before=loaded.players[0].hp;attack(loaded,loaded.players[0],loaded.players[1],'attack',t+2000);assert.equal(loaded.players[0].hp,before-10);assert.equal(loaded.players[0].statuses.bleed.stacks,4);
}
console.log('PASS: count-based bleed cap/decay/persistence/legacy/cleanse; new status durations; slow/fear timing; confusion both buttons/random branch/cooldown fallback/accuracy; bind/sleep/silence/action delay; save/reload/network snapshot');

// Resolved confused actions survive storage and execute once without rolling again.
{
 const h=fresh(),m=h.match,[p,q]=m.players;p.encounter={kind:'player',targetId:q.playerId};applyStatus(p,'confusion',1,null,null,t);
 const queued=random([.9],()=>beginServerAction(m,p,'attack',{},t));assert.equal(queued.action.type,'skill');await h.room.saveMatch(m);
 const resumed=new Room(h.ctx,h.env),loaded=await resumed.getMatch(),actor=loaded.players[0];const sp=actor.sp;
 random([0,.99,.99,.99],()=>completeAction(loaded,actor,actor.pendingAction.completeAt));assert(actor.sp<sp);assert(actor.cdCUntil>t);assert.equal(completeAction(loaded,actor,t+3000),null);
}
console.log('PASS: confused combat action survives save/reload without reroll or duplicate completion');
