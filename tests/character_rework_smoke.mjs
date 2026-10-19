import assert from 'node:assert/strict';
import {CHARACTERS,createServerPlayer} from '../src/game_data.js';
import {beginServerAction,completeAction,publicPlayer,applyStatus,updatePassiveTime,actionDuration,initWorld} from '../src/match_engine.js';
import {REWORK_CONFIG,reworkState} from '../src/character_reworks.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
const T=1700000000000,Room=await loadRoom();
function fresh(id){const h=createHarness(Room,{humans:3,ai:0,now:T}),m=h.match,[p,t,q]=m.players;p.charId=id;t.charId='c01';q.region='estate';m.wilds=[];p.hp=50;p.sp=100;p.eq=[];t.eq=[];p.encounter={kind:'player',targetId:t.playerId};p.enemyContacts={city:[{id:t.playerId,name:t.playerName,region:'city',source:'encounter',hp:t.hp,maxHp:t.maxHp}]};const r=reworkState(p);r.resources={paint:3,luck:3,charge:3,spark:2,light:3,momentum:2,soul:3,star:2,will:15,shard:3,calamity:3,amp:3,feast:3,flow:2,gear:3,attention:3};r.lastFight=T;r.lastPvp=T;for(const k of ['sparkExpiry','momentumExpiry','ampExpiry','gearExpiry'])r.timed[k]={until:T+60000,startedAt:T};return {h,m,p,t,q};}
function random(v,f){const old=Math.random;Math.random=()=>v;try{return f()}finally{Math.random=old}}
function act(m,p,type,x={},n=T){const a=random(.5,()=>beginServerAction(m,p,type,x,n));assert(a.ok,JSON.stringify({id:p.charId,type,x,a}));const r=random(.1,()=>completeAction(m,p,a.action.completeAt));assert(r?.ok,JSON.stringify({id:p.charId,type,x,r}));return {r,n:a.action.completeAt};}
let cases=0;
for(const [id,cfg] of Object.entries(REWORK_CONFIG))for(const choice of cfg.choices.length?cfg.choices:[null]){
 const {m,p,t}=fresh(id);const x={targetId:t.playerId,...(choice?{choice}:{}),...(id==='c51'?{words:['tracking','flame']}:{})};
 if(id==='c04'&&choice==='blade')reworkState(p).mode='rail';if(id==='c18')x.region='estate';if(id==='c07')x.region='city';
 const a=act(m,p,'char_action',x);assert.equal(p.cdAUntil,a.n+cfg.cd*1000);assert(p.sp>=0);assert(!Number.isNaN(p.hp));
 const saved=structuredClone(m);assert.deepEqual(saved.players[0].rework,p.rework);cases++;
}
for(const id of Object.keys(REWORK_CONFIG))for(const hit of [true,false]){
 const {m,p,t}=fresh(id);t.hp=1000;const a=beginServerAction(m,p,'skill',{},T);assert(a.ok);const r=random(hit?.1:.999,()=>completeAction(m,p,a.action.completeAt));assert(r.ok,id);assert.equal(r.hit,hit,id);updatePassiveTime(m,a.action.completeAt+1000);assert(Number.isFinite(t.hp)&&Number.isFinite(p.hp),id);assert(p.sp>=0);cases++;
}
// Selection values must reach the authoritative room and survive save/reload.
{
 const {h,m,p}=fresh('c04');p.encounter=null;await h.room.saveMatch(m);const real=Date.now;Date.now=()=>T;
 try{await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_char_action',choice:'rail'}));const saved=await h.room.getMatch();assert.equal(saved.players[0].pendingAction.payload.choice,'rail');Date.now=()=>T+1000;await h.room.completeDueActions(saved,T+1000);assert.equal(saved.players[0].rework.mode,'rail');await h.room.saveMatch(saved);assert.equal((await new Room(h.ctx,h.env).getMatch()).players[0].rework.mode,'rail');}finally{Date.now=real;}
}
// Shield is consumed by real incoming damage and never absorbs poison.
{
 const {m,p,t}=fresh('c03');act(m,p,'char_action',{choice:'poison'});const before=p.hp;t.encounter={kind:'player',targetId:p.playerId};act(m,t,'attack',{},T+2000);assert.equal(p.hp,before);assert(p.rework.timed.shield.amount<p.maxHp*.2);applyStatus(p,'poison',1,null,t.playerId,T+4000,t,m);updatePassiveTime(m,T+6500);assert(p.hp<before);
}
// Two independently resisted statuses, immunity, and own poison ownership.
{
 const {m,p,t}=fresh('c17');assert.equal(applyStatus(p,'poison',1,null,t.playerId,T,t,m),false);act(m,p,'char_action',{choice:'bleed'});p.encounter={kind:'player',targetId:t.playerId};act(m,p,'skill',{},T+2000);assert(t.statuses.poison);assert.equal(t.statuses.bleed.stacks,2);
 const s=m.players[2];s.charId='c43';s.region='city';s.encounter={kind:'player',targetId:t.playerId};const before=t.statuses.poison.stacks;act(m,s,'skill',{},T+4000);assert(t.statuses.poison.stacks>=before,'cannot consume another caster poison');
}
// Time-stop preserves global time and pauses one pending action, including resume.
{
 const {m,p,t}=fresh('c14');p.encounter=null;t.encounter=null;const a=beginServerAction(m,t,'rest',{},T);assert(a.ok);const end=a.action.completeAt;const stop=act(m,p,'char_action',{targetId:t.playerId});assert.equal(m.startedAt,T);assert.equal(t.pendingAction.completeAt,end+2000);assert.equal(beginServerAction(m,t,'attack',{},stop.n).error,'action_in_progress');const saved=structuredClone(m);updatePassiveTime(saved,stop.n+2001);assert(!saved.players[1].statuses.timeStop);assert(completeAction(saved,saved.players[1],end+2000).ok);
}
// Avatar remote info never leaks HP; enemy removes it with a timed action.
{
 const {m,p,t,q}=fresh('c07');p.encounter=null;q.region='estate';act(m,p,'char_action',{region:'estate'});assert.equal(p.intel.remoteScout.region,'estate');assert(!('hp' in p.intel.remoteScout));const obj=m.reworkObjects[0];q.encounter=null;act(m,q,'remove_object',{objectId:obj.id},T+2000);assert(!m.reworkObjects.some(o=>o.id===obj.id));
}
// Target leaves between input and completion: no damage or cross-region marks.
for(const id of ['c02','c20','c45','c48']){const {m,p,t}=fresh(id);const a=beginServerAction(m,p,'char_action',{targetId:t.playerId},T);assert(a.ok);t.region='estate';const out=completeAction(m,p,a.action.completeAt);assert.equal(out.ok,false,id);assert.equal(p.cdAUntil,0,id);}
// Repeated barrages revalidate each later hit; stored queue survives serialization.
{
 const {m,p,t}=fresh('c37');t.hp=1000;const a=act(m,p,'skill');assert(m.reworkStrikes.length);const hp=t.hp;t.region='estate';const saved=structuredClone(m);updatePassiveTime(saved,a.n+1000);assert.equal(saved.players[1].hp,hp);assert.equal(saved.reworkStrikes.length,0);
}
// Full map lock cannot strand the movement character's action.
{const {m,p}=fresh('c18');p.encounter=null;const a=act(m,p,'char_action',{},T+781000);assert.equal(p.region,'city');assert(a.n-(T+781000)>=2000);}
console.log('PASS: character reworks',cases,'choice/action and hit/miss cases; room payload/save/reload, shields/poison, resistance, own-poison accounting, stopped actions, remote scouts/removal, moved-target validation, persisted barrages, final-city action');
