import assert from 'node:assert/strict';
import {beginServerAction,completeAction,publicPlayer,updatePassiveTime,applyStatus,resolveEventChoice} from '../src/match_engine.js';
import {KEYWORDS,KEYWORD_LIMIT} from '../src/keyword_defs.js';
import {notifyStatusFeedback} from '../public/status_feedback.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
const Room=await loadRoom(),T=1700000000000;
function fresh(id='c51'){const h=createHarness(Room,{humans:3,ai:0,now:T}),m=h.match,[p,q]=m.players;p.charId=id;p.rework.mode='';p.eq=[];p.hp=50;p.sp=100;q.charId='c01';q.eq=[];q.hp=1000;m.players[2].region='estate';m.wilds=[];return {...h,m,p,q};}
function fixed(v,fn){const old=Math.random;Math.random=()=>v;try{return fn()}finally{Math.random=old}}
function act(m,p,type,x={},n=T,draw=.1){const a=beginServerAction(m,p,type,x,n);assert(a.ok,JSON.stringify(a));const result=fixed(draw,()=>completeAction(m,p,a.action.completeAt));assert(result?.ok,JSON.stringify(result));return {result,n:a.action.completeAt};}
assert.equal(KEYWORDS.length,8);assert.equal(KEYWORDS.filter(x=>x.good).length,5);assert.equal(KEYWORD_LIMIT,10);
for(let i=0;i<8;i++){const {m,p}=fresh(),before=p.sp;const out=act(m,p,'char_action',{},T,(i+.5)/8);assert.deepEqual(p.rework.keywords,[KEYWORDS[i].id]);assert.equal(p.sp,before-5);assert.equal(p.cdAUntil,out.n+10000);assert.equal(p.rework.keywordNotices[0].name,KEYWORDS[i].name);assert.equal(p.rework.keywordNotices[0].id,1);}
{
 const {m,p}=fresh();let now=T;
 for(let n=0;n<10;n++){const out=act(m,p,'char_action',{},now,.01);now=out.n+10000;}
 assert.equal(p.rework.keywords.length,10);assert(p.rework.keywords.every(x=>x==='tracking'));const before={sp:p.sp,cd:p.cdAUntil};assert.equal(beginServerAction(m,p,'char_action',{},now).error,'keywords_full');assert.equal(p.sp,before.sp);assert.equal(p.cdAUntil,before.cd);
 updatePassiveTime(m,now+100000);assert.equal(p.rework.keywords.length,10,'no timed expiry');
 const view=publicPlayer(m,p,now+100000,false);assert.equal(view.rework.keywordTotal,10);assert.equal(view.rework.keywords[0].count,10);
}
function shot(words,draw=.1,armor=false){const h=fresh(),{m,p,q}=h;p.rework.keywords=[...words];q.eq=armor?['aim_terminal','camo_mask','toxin_kit']:[];p.encounter={kind:'player',targetId:q.playerId};const before={hp:p.hp,sp:p.sp},out=act(m,p,'skill',{},T,draw);assert.equal(p.rework.keywords.length,0,'all words consumed on fire');assert.equal(p.cdCUntil,out.n+45000);return {...h,...out,before};}
const base=shot([]);assert.equal(base.result.damage,Math.round(publicPlayer(base.m,base.p,T,false).atk*100/(100+publicPlayer(base.m,base.q,T,false).def)*1.2),'120% base magic bullet');
assert(shot(['amplify','amplify']).result.damage>base.result.damage);assert(shot(['weakness','weakness']).result.damage<base.result.damage);assert(shot(Array(10).fill('weakness')).result.damage>0);
assert(shot(['piercing','piercing','piercing','piercing','piercing'],.1,true).result.damage>shot([],.1,true).result.damage);
assert.equal(shot(['tracking'],.9).result.hit,true);assert.equal(shot(['scatter'],.8).result.hit,false);
{
 const h=shot(['healing','healing','vigor','vigor','recoil'],.999);assert.equal(h.result.hit,false);assert.equal(h.p.hp,h.before.hp+10-5);assert.equal(h.p.sp,h.before.sp-12+6);
}
{
 const {m,p,q}=fresh();p.rework.keywords=['amplify'];p.encounter={kind:'player',targetId:q.playerId};const a=beginServerAction(m,p,'skill',{},T);q.region='estate';assert.equal(completeAction(m,p,a.action.completeAt).error,'target_lost');assert.deepEqual(p.rework.keywords,['amplify'],'not fired, retain words');
 p.encounter=null;p.pendingAction=null;p.cdAUntil=0;p.rework.keywordVersion=1;p.rework.timed.words={until:T+30000,keys:['flame','repeat']};delete p.rework.keywords;updatePassiveTime(m,T+1000);assert.deepEqual(p.rework.keywords,['amplify','tracking']);assert(!p.rework.timed.words);
}
// Receiver-side notices contain actual source and cause, including refreshes.
{
 const {m,p,q}=fresh('c01');const out=fixed(.5,()=>act(m,p,'char_action'));const rows=q.statusNotices;assert(rows.some(x=>x.statusId==='bind'&&x.sourceName===p.playerName&&x.cause==='정원 설치'));assert(rows.some(x=>x.statusId==='actionDelay'));assert(rows.some(x=>x.statusId==='doll'&&x.cause.includes('정원')));
 const count=rows.length;publicPlayer(m,q,out.n+100,false);publicPlayer(m,q,out.n+200,false);assert.equal(q.statusNotices.length,count,'reads never duplicate notices');
 const n=q.statusNoticeSeq;applyStatus(q,'bind',1,null,p.playerId,out.n+1000,p,m,'정원 설치');assert.equal(q.statusNoticeSeq,n+1);
 const notices=[];notifyStatusFeedback({self:q},{statusSeq:0},(...x)=>notices.push(x));assert(notices.some(x=>x[1].includes(p.playerName)&&x[1].includes('속박')&&x[2].includes('정원 설치')));const again=[];notifyStatusFeedback({self:q},{statusSeq:q.statusNoticeSeq},(...x)=>again.push(x));assert.equal(again.length,0);
}
{
 const {m,p,q}=fresh('c17');const before=p.statusNoticeSeq||0;assert.equal(applyStatus(p,'poison',1,null,q.playerId,T,q,m,'독 공격'),false);assert.equal(p.statusNoticeSeq||0,before,'immune: no received notice');
 q.tempEffects=[{until:T+10000,fx:{statusResist:1}}];assert.equal(fixed(0,()=>applyStatus(q,'bind',1,null,p.playerId,T,p,m,'구속')),false);assert.equal(q.statusNoticeSeq||0,0,'resisted: no received notice');
}
{
 const {m,p}=fresh('c52');act(m,p,'char_action');assert.equal(p.statusNotices.length,9);assert(p.statusNotices.every(x=>x.sourceId===p.playerId&&x.cause.includes('모든 디버프')));const out=[];notifyStatusFeedback({self:p},{statusSeq:0},(...x)=>out.push(x));assert.equal(out.length,1,'same cast grouped');
}
{
 const h=fresh('c01'),{m,p}=h;p.pendingEvent='E014';const out=fixed(0,()=>resolveEventChoice(m,p,1,T));assert(out.ok);assert(p.statusNotices.some(x=>x.sourceName==='환경'&&x.cause.includes('버려진 부적 묶음')&&x.cause.includes('전부 챙긴다')));
}
{
 const h=fresh('c01'),{m,p,q}=h;// Real wild-source lookup comes from the current catalog.
 const w={id:'source-wild',templateId:'wild_crows',region:p.region,alive:true,hp:10};m.wilds=[w];applyStatus(p,'confusion',1,null,w.id,T,null,m);assert(p.statusNotices[0].sourceName!=='알 수 없는 대상');assert(p.statusNotices[0].cause.includes('반격'));
 await h.room.saveMatch(m);const loaded=await new Room(h.ctx,h.env).getMatch();assert.deepEqual(loaded.players[0].statusNotices,p.statusNotices);
 h.room.sendMatchState(h.sockets[0],loaded,{force:true,now:T});const state=h.sockets[0].messages.at(-1).match;assert(state.self.statusNotices.length);assert(!JSON.stringify(state.others).includes('statusNotices'));
}
// Actual online command payload cannot select the supposedly random word.
{
 const h=fresh(),{m,p}=h;await h.room.saveMatch(m);const clock=Date.now;Date.now=()=>T;
 try{await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_char_action',words:['healing']}));let saved=await h.room.getMatch();const due=saved.players[0].pendingAction.completeAt;Date.now=()=>due;fixed(.01,()=>completeAction(saved,saved.players[0],due));assert.deepEqual(saved.players[0].rework.keywords,['tracking']);await h.room.saveMatch(saved);const loaded=await new Room(h.ctx,h.env).getMatch();assert.deepEqual(loaded.players[0].rework.keywords,['tracking']);}finally{Date.now=clock;}
}
console.log('PASS: all 8 equal-probability outcomes, CD10/SP5, duplicates/cap10, no expiry, 120% shot, every stacked effect, hit/miss/target-loss, legacy migration, successful-only debuff provenance, self/event/wild/garden causes, grouping/deduplication, private snapshots and save/reload');
