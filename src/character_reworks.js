import {gimmickBuffs} from "./gimmick_buffs.js";
import {KEYWORDS,KEYWORD_BY_ID,KEYWORD_LIMIT,keywordCounts,keywordView} from "./keyword_defs.js";
// Approved character plan, revision 1. All state is JSON data stored with the match.
export const REWORK_CONFIG={};
const cds=[35,40,20,35,35,25,20,18,40,35,40,40,50,35,30,25,45,35,30,20,30,40,18,35,30,35,40,30,30,30,35,35,40,30,40,40,30,30,40,35,40,35,35,45,35,35,35,40,30,25];
const combatCds=[45,50,45,55,40,45,45,45,45,45,45,45,55,45,45,45,50,50,60,40,45,50,40,50,50,45,50,45,45,45,45,50,45,50,50,55,45,50,50,45,55,50,55,50,45,45,55,50,40,45];
const choices={c02:['fear','confusion'],c03:['poison','bleed'],c04:['blade','rail','boost'],c07:['avatar'],c08:['earth','wind','life'],c16:['shield','bird'],c17:['bleed','slow','silence'],c18:['leap'],c25:['aim','guard'],c26:['thorn','flower'],c29:['card','wall'],c32:['spore','steel','bloom'],c37:['sword','barrage'],c39:['amplify','reverse'],c41:['shell','regen'],c50:['cycle','cleanse']};
export const REWORK_LABELS={fear:'공포 선언',confusion:'혼란 선언',poison:'독',bleed:'출혈 / 혈독',slow:'연근독',silence:'신경독',blade:'블레이드',rail:'레일건',boost:'부스터',avatar:'아바타 배치',earth:'대지',wind:'바람',life:'생명',shield:'방패',bird:'새',leap:'초월기동',aim:'명중 길조',guard:'방어 길조',thorn:'가시덩굴',flower:'방패꽃',card:'카드 계약',wall:'방벽 계약',spore:'포자',steel:'강철나무',bloom:'홍련화',sword:'대검',barrage:'마력 난사',amplify:'자기 증폭',reverse:'역증폭',shell:'갑각',regen:'재생',cycle:'순환',cleanse:'세척',tracking:'추적',flame:'화염',repeat:'연타'};
const targeted=new Set(['c02','c06','c14','c20','c30','c35','c38','c42','c45','c46','c48']);
for(let n=2;n<=51;n++){const id='c'+String(n).padStart(2,'0');REWORK_CONFIG[id]={cd:cds[n-2],combatCd:combatCds[n-2],choices:choices[id]||[],targeted:targeted.has(id),time:id==='c13'?3:id==='c51'?2:['c20','c42'].includes(id)?(id==='c20'?2:1.5):1,sp:id==='c18'?12:id==='c51'?10:8};}
REWORK_CONFIG.c18.time=1;
REWORK_CONFIG.c51.cd=3;REWORK_CONFIG.c51.sp=5;
const sid=x=>x?.playerId||x?.id;
const active=(r,k,n)=>r[k]?.until>n?r[k]:null;
const has=(p,k,n)=>{const s=p.statuses?.[k];return s?.stacks>0&&(s.until===null||s.until>n)?s:null};
const cap=(x,a,b)=>Math.max(a,Math.min(b,x));
const defaults={c04:'blade',c08:'life',c09:'defense',c24:'arms',c29:'card',c37:'barrage'};
export function reworkState(p){return p.rework??=( {mode:defaults[p.charId]||'',resources:{},timed:{},records:{},seenCorpses:[],version:1,attentionDecayAt:0,keywordVersion:2,keywords:[]} );}
export function createReworkSystem(api){
 const {status,fx,maxHp,heal,sp,apply,notice,known,locked,adjacency,kill,wildDeath,prof,bleed,noise,cleanse,damage}=api;
 function resource(p,k,delta=0,max=3){const r=reworkState(p);r.resources[k]=cap((r.resources[k]||0)+delta,0,max);return r.resources[k]}
 function timed(p,k,seconds,n,data={}){const r=reworkState(p);return r.timed[k]={startedAt:n,until:n+seconds*1000,durationMs:seconds*1000,...data};}
 function live(p,k,n){return active(reworkState(p).timed,k,n)}
 function buff(p,k,seconds,n,effects,data={}){return timed(p,k,seconds,n,{effects,...data})}
 function shield(m,p,ratio,seconds,n){const r=reworkState(p),s=live(p,'shield',n),mult=1+(fx(p,m,n).shieldPower||0);timed(p,'shield',seconds,n,{amount:Math.max(s?.amount||0,maxHp(p,m,n)*ratio*mult),name:'보호막'});}
 function getTarget(m,p,x={},n){const id=x.targetId||p.encounter?.targetId||p.encounter?.wildId;const all=[...m.players,...(m.wilds||[])];let t=all.find(t=>sid(t)===id&&t!==p&&t.alive&&t.region===p.region);if(!t&&!id){const contacts=(p.enemyContacts?.[p.region]||[]).map(x=>x.id);t=all.find(t=>t!==p&&t.alive&&t.region===p.region&&(p.isAI||contacts.includes(sid(t))));}return t;}
 function targets(m,p){return [...m.players,...(m.wilds||[])].filter(t=>t!==p&&t.alive&&t.region===p.region)}
 function roll(m,p,t,id,chance,n,stacks=1,duration=null,cause=null){if(!t||Math.random()>=cap(chance+(fx(p,m,n).statusChance||0),0,1))return false;return apply(t,id,stacks,duration,p.playerId,n,p,m,cause||api.skillName(p,id==='awe'||id==='fragrance'?'passive':id==='starTarget'?'combat':'action'));}
 function mark(m,p,t,id,seconds,n,data={}){return roll(m,p,t,id,1,n,1,seconds)?Object.assign(t.statuses[id],data):null;}
 function own(p,t,k,n){const s=has(t,k,n);return s?.sourceId===p.playerId?s:null;}
 function consume(p,k,n){const v=live(p,k,n);delete reworkState(p).timed[k];return v;}
 function record(p,t){return reworkState(p).records[sid(t)]??={count:0,lastAt:0};}
 function observe(p,t,n){const r=record(p,t);if(!r.lastAt||n-r.lastAt>=5000){r.count=Math.min(3,r.count+1);r.lastAt=n;}}
 function afterApplied(m,p,t,id,n){
  if(p.charId==='c03'&&['poison','bleed'].includes(id))return;
  if(p.charId==='c42'&&['slow','bind','sleep','fear','confusion','silence','actionDelay','domination'].includes(id))mark(m,p,t,'awe',10,n);
  if(p.charId==='c41'){
   const r=record(p,t);r.statuses??={};r.statuses[id]=n+15000;
   if(Object.values(r.statuses).filter(x=>x>n).length>=2)timed(p,'mutationStudy',15,n,{targetId:sid(t)});
  }
  if(p.charId==='c45'&&id==='sleep'){const r=record(p,t);if(!r.sleepRewardAt||n-r.sleepRewardAt>=20000){heal(p,12,m,n);sp(p,8,m,n);r.sleepRewardAt=n;}}
 }
 function effects(p,m,n){
  const r=reworkState(p),out={};for(const b of Object.values(r.timed))if(b.until>n)for(const[k,v]of Object.entries(b.effects||{}))out[k]=(out[k]||0)+v;
  const res=k=>r.resources[k]||0,id=p.charId;
  if(id==='c04')Object.assign(out,r.mode==='blade'?{atkPct:.25}:r.mode==='rail'?{}:{moveTime:-.25});
  if(id==='c05'&&res('charge'))out.atkPct=.20;
  if(id==='c06')out.moveTime=-.25;
  if(id==='c07'&&(m.reworkObjects||[]).some(x=>x.ownerId===p.playerId&&x.until>n&&x.kind==='avatar'))out.detect=.25;
  if(id==='c08')Object.assign(out,r.mode==='earth'?{defPct:.25}:r.mode==='wind'?{moveTime:-.25}:{restHeal:.30,restSp:.30});
  if(id==='c09')Object.assign(out,r.mode==='attack'?{basicDamage:.25}:{rwTaken:-.25});
  if(id==='c10'&&res('attention'))out.atkPct=res('attention')>=3?.35:.20;
  if(id==='c11')out.specificDuration=-.25;
  if(id==='c13')out.heal=.25;
  if(id==='c14')out.skillPrep=-.25;
  if(id==='c18')out.moveTime=-.25;
  if(id==='c16'&&res('paint')===3)out.searchLoot=.25;
  if(id==='c19'&&res('soul'))out.allSp=-.20;
  if(id==='c20')out.detect=.25;
  if(id==='c21'){const gear=res('gear')||1;if(gear>1){out.prep=-([0,0,.20,.25,.30,.35][gear]);out.moveTime=out.prep;out.allSp=-out.prep;}}
  if(id==='c23'&&p.hp<=maxHp(p,m,n)*.5)out.rwTaken=-.25;
  if(id==='c24')Object.assign(out,r.mode==='legs'?{moveTime:-.25}:{atkPct:.25});
  if(id==='c25'&&res('luck'))out.searchLoot=.25;
  if(id==='c26'&&(m.reworkObjects||[]).some(x=>x.ownerId===p.playerId&&x.region===p.region&&x.until>n))Object.assign(out,{restHeal:.30,restSp:.30});
  if(id==='c28')out.incomingStatusDuration=-.25;
  if(id==='c29')Object.assign(out,r.mode==='card'?{skillHit:.20}:{shieldPower:.25});
  if(id==='c31'&&res('shard'))out.defPct=.25;
  if(id==='c32'){out.itemHeal=.25;if(live(p,'potion',n)||live(p,'shield',n)&&r.potionKind==='steel')out.searchLoot=.20;}
  if(id==='c33'&&res('calamity')>=2)out.rwTaken=-.20;
  if(id==='c35')out.incomingStatusDuration=-.25;
  if(id==='c36'){out.conceal=.25;if(n-(p.lastAttackAt||0)>=10000)out.rwQuiet=.25;}
  if(id==='c37'&&p.rev){out.atkPct=.25;out.heal=-.20;}
  if(id==='c39'&&res('amp')){out.atkPct=.20;if(res('amp')===3)out.rwTaken=.20;}
  if(id==='c43')out.poisonDamage=.25;
  if(id==='c44'){out.rwTaken=-.25;out.prep=.25;}
  if(id==='c49')out.itemHeal=.25;
  if(id==='c50'&&res('flow'))out.restSp=.30;
  if(has(p,'awe',n)||has(p,'fragrance',n))out.atkPct=(out.atkPct||0)-Math.max(has(p,'awe',n)?.20:0,has(p,'fragrance',n)?.20:0);
  // Temporary weakens stack additively with other attack modifiers.
  if(has(p,'reverseAmp',n))out.atkPct=(out.atkPct||0)-.25;
  return out;
 }
 function healObserved(p,amount,m,n,allowLight=true){if(p.charId==='c13'&&amount>=15&&allowLight)resource(p,'light',1);}
 function reduction(p,t,m,n){let mult=1;const id=p.charId;
  if(id==='c30'&&live(p,'analyzedGuard',n)?.targetId===sid(t))mult*=.75;
  if(id==='c34'&&live(p,'learned',n)?.targetId===sid(t))mult*=.75;
  if(id==='c46'&&own(p,t,'confusion',n))mult*=.75;
  const f=effects(p,m,n),base=f.rwTaken||0,temps=Object.values(reworkState(p).timed).filter(v=>v.until>n&&v.effects?.rwTaken);const total=temps.reduce((a,b)=>a+b.effects.rwTaken,0);if(base-total)mult*=1+base-total;for(const b of temps)mult*=1+b.effects.rwTaken;
  if(live(p,'heavyPrep',n))mult*=.8;
  return mult;
 }
 function takeDirect(m,t,p,amount,n){
  if(!t.playerId){t.hp-=amount;return amount;}
  if(api.invincible(t))return 0;
  const r=reworkState(t);let d=api.gearAbsorb(m,t,Math.max(0,amount),n),b=live(t,'reverse',n);if(b){consume(t,'reverse',n);const saved=d*.3;d-=saved;timed(t,'momentum',12,n,{value:Math.min(maxHp(t,m,n)*.15,saved)});}
  b=live(t,'nextGuard',n);if(b){consume(t,'nextGuard',n);d*=.7;}
  b=live(t,'shield',n);if(b){const absorbed=Math.min(d,b.amount);b.amount-=absorbed;d-=absorbed;if(b.amount<=0)consume(t,'shield',n);}
  consume(t,'revGuard',n);
  d=Math.max(0,Math.round(d));const actual=Math.min(Math.max(t.hp,0),d);damage(t,d);if(actual>0){
   if(t.charId==='c23'&&p?.playerId){resource(t,'will',actual,maxHp(t,m,n)*.2);r.lastPvp=n;}
   if(t.charId==='c34')timed(t,'learned',12,n,{targetId:sid(p)});
   if(t.charId==='c30')observe(t,p,n);
   if(p?.playerId&&t.charId==='c10')attention(t,n);
   if(['c25','c33'].includes(t.charId)&&(!r.lastBadAt||n-r.lastBadAt>= (t.charId==='c25'?4000:5000))){resource(t,t.charId==='c25'?'luck':'calamity',1);r.lastBadAt=n;}
  }return d;
 }
 function attention(p,n){const r=reworkState(p);r.lastPvp=n;if(!r.attentionAt||n-r.attentionAt>=4000){resource(p,'attention',1);r.attentionAt=n;}}
 function damageMult(m,p,t,skill,n,ctx={}){
  let mult=1;const id=p.charId,tid=sid(t),r=reworkState(p);
  if(id==='c02'&&(own(p,t,'fear',n)||own(p,t,'confusion',n)))mult*=1.25;
  if(id==='c12'&&own(p,t,'talisman',n))mult*=1.25;
  if(id==='c17'&&has(t,'poison',n))mult*=1.2;
  if(id==='c40'&&(has(t,'fear',n)||has(t,'confusion',n)))mult*=1.25;
  if(id==='c48'&&(has(t,'silence',n)||has(t,'bind',n)))mult*=1.25;
  if(id==='c41'&&live(p,'mutationStudy',n)?.targetId===tid)mult*=1.25;
  if(id==='c09'&&!skill&&r.mode==='attack')mult*=1.25;
  if(id==='c36'&&ctx.quietReady)mult*=1.25;
  return mult;
 }
 function hitBonus(m,p,t,skill,n){const r=reworkState(p),tid=sid(t);let b=0;
  if(p.charId==='c15'&&live(p,'heard',n)?.targetId===tid)b+=.2;
  if(p.charId==='c20'&&skill&&live(p,'observed',n)?.targetId===tid)b+=.2;
  if(p.charId==='c22'&&own(p,t,'starTarget',n))b+=.2;
  if(p.charId==='c30'&&(r.records[tid]?.count||0)>=2)b+=.2;
  if(p.charId==='c35'&&skill&&live(p,'analysis',n)?.targetId===tid)b+=.2;
  if(p.charId==='c38'&&live(p,'insight',n)?.targetId===tid)b+=.2;
  return b;
 }
 function afterDirect(m,p,t,skill,hit,d,n){
  api.gearHit(m,p,t,skill,hit,n);
  const id=p.charId,r=reworkState(p);
  if(!hit){if(['c25','c33'].includes(id)&&(!r.lastBadAt||n-r.lastBadAt>=(id==='c25'?4000:5000))){resource(p,id==='c25'?'luck':'calamity',1);r.lastBadAt=n;}return;}
  if(id==='c30')observe(p,t,n);
  if(id==='c10'&&t.playerId)attention(p,n);
  if(id==='c47')roll(m,p,t,'fragrance',.8,n,1,null,api.skillName(p,'passive')+' · 공격 적중');
  if(!skill){
   if(id==='c05'){resource(p,'charge',1);r.lastFight=n;}
   if(id==='c06'&&live(p,'moved',n)){resource(p,'spark',1,2);consume(p,'moved',n);timed(p,'sparkExpiry',10,n);}
   if(id==='c38'){let v=live(p,'insight',n);timed(p,'insight',12,n,{targetId:sid(t),count:Math.min(2,v?.targetId===sid(t)?(v.count||0)+1:1)});}
   if(id==='c39'){resource(p,'amp',1);timed(p,'ampExpiry',10,n);if(consume(p,'reverseAmpReady',n))roll(m,p,t,'reverseAmp',1,n,1,null,'역증폭 · 일반 공격 적중');}
   if(id==='c43'&&consume(p,'toxin',n))roll(m,p,t,'poison',1,n,2,null,api.skillName(p,'action')+' · 일반 공격 적중');
  }
  if(id==='c28')timed(p,'close',8,n,{targetId:sid(t)});
  if(t.charId==='c28'&&live(t,'domain',n))timed(t,'close',8,n,{targetId:sid(p)});
 }
 function skillSpec(m,p,t,n){
  const id=p.charId,r=reworkState(p),s={mult:1.5,sp:12,cd:REWORK_CONFIG[id]?.combatCd||45,hit:0,rows:[]},res=k=>resource(p,k),spend=k=>{const v=res(k);r.resources[k]=0;return v;},use=k=>consume(p,k,n),is=k=>!!has(t,k,n),tid=sid(t);
  switch(id){
   case 'c02': {const k=own(p,t,'fear',n)?'fear':own(p,t,'confusion',n)?'confusion':null;if(k){s.mult=2;s.removeAfter=k;}break;}
   case 'c03':s.mult=1.6;{const b=live(p,'shield',n);if(b){const v=b.amount/2;b.amount-=v;s.heal=v;}}break;
   case 'c04':s.mult=r.mode==='blade'?1.8:r.mode==='rail'?1.6:1.4;if(r.mode==='rail')s.defIgnore=.25;if(r.mode==='boost')buff(p,'moveBoost',10,n,{moveTime:-.30},{uses:1});break;
   case 'c05':s.mult=1.5+spend('charge')*.3;break;
   case 'c06':{const a=spend('spark');s.mult=1.5+a*.3;if(a)s.hit=.2;break;}
   case 'c07':s.mult=1.4+.25*(m.reworkObjects||[]).filter(x=>x.kind==='avatar'&&x.ownerId===p.playerId&&x.region===p.region&&x.until>n).length;break;
   case 'c08':if(r.mode==='earth'){s.mult=1.3;s.rows=[['bind',.8]];}else if(r.mode==='wind'){s.mult=1.6;s.hit=.2;}else{s.mult=1.2;s.heal=15;}break;
   case 'c09':s.mult=r.mode==='attack'?1.5:1.2;s.rows=[['bind',.8+(use('hairReady')?.2:0)]];if(r.mode!=='attack')s.heal=10;break;
   case 'c10':s.mult=1.4+res('attention')*.2;if(live(p,'broadcast',n))s.spOnHit=8;break;
   case 'c11':s.mult=use('wave')?2:1.6;s.rows=[['slow',.8]];if(s.mult===2)api.removeStacks(p,'poison',1);break;
   case 'c12':if(own(p,t,'talisman',n)){s.mult=1.9;s.rows=[['confusion',1]];s.removeAfter='talisman';}break;
   case 'c13':{const a=spend('light');s.mult=1.4+a*.15;s.heal=a*5;s.noLight=true;break;}
   case 'c14':s.mult=use('analyzed')?2:1.6;break;
   case 'c15':s.mult=is('bleed')?2:1.6;s.rows=[['bleed',1]];break;
   case 'c16':{let a=Math.min(2,res('paint'));resource(p,'paint',-a);s.mult=1.5+a*.25;if(use('art')?.kind==='bird')s.damageBonus=.25;break;}
   case 'c17':s.rows=[['poison',1,1]];{const v=use('poisonLoad');if(v)s.rows.push([v.kind,.8,v.kind==='bleed'||v.kind==='slow'?2:1]);}break;
   case 'c18':s.mult=1.6+spend('momentum')*.3;break;
   case 'c19':{const a=Math.min(2,res('soul'));resource(p,'soul',-a);s.mult=1.6+a*.25;s.rows=[['fear',.2+a*.3]];break;}
   case 'c20':s.mult=live(p,'observed',n)?.targetId===tid?2.3:1.7;use('observed');break;
   case 'c21':s.mult=1.4+(res('gear')||1)*.15;resource(p,'gear',-1,5);r.resources.gear=Math.max(1,res('gear'));break;
   case 'c22':s.mult=1.5+spend('star')*.25;if(own(p,t,'starTarget',n))s.rows=[['actionDelay',.8]];s.starMark=true;break;
   case 'c23':s.mult=1.4;s.flat=spend('will');s.heal=10;break;
   case 'c24':s.mult=r.mode==='arms'?1.8:1.5;if(r.mode==='legs')s.rows=[['slow',.8]];if(use('combo'))s.mult+=.3;break;
   case 'c25':s.luckSpent=Math.min(2,res('luck'));resource(p,'luck',-s.luckSpent);s.mult=1.5+s.luckSpent*.3;break;
   case 'c26':{const o=(m.reworkObjects||[]).find(x=>x.ownerId===p.playerId&&x.region===p.region&&x.matureAt<=n);if(o){o.until=n;if(o.kind==='thorn'){s.mult=1.9;s.rows=[['bind',1]];}else s.heal=20;}break;}
   case 'c27':{const v=Math.floor(Math.random()*4);s.mult=[1,1.6,1.4,2.3][v];if(use('miracle'))s.damageBonus=.25;if(v===0){shield(m,p,.15,8,n);buff(p,'miracle',1200,n,{});}if(v===1)s.rows=[['actionDelay',.8]];if(v===2)s.heal=18;break;}
   case 'c28':if(live(p,'close',n)?.targetId===tid){s.mult=2;s.rows=[['silence',.8]];}break;
   case 'c29':s.mult=r.mode==='card'?1.9:1.6;if(use('cardPierce'))s.defIgnore=.2;if(r.mode==='wall'){const b=live(p,'shield',n);if(b)b.until=Math.min(b.startedAt+17000,b.until+5000);}break;
   case 'c30':s.defIgnore=(r.records[tid]?.count||0)*.1;break;
   case 'c31':{const a=spend('shard');s.mult=1.5+a*.25;if(a>=2)s.rows=[['bleed',.8,2]];break;}
   case 'c32':{s.mult=1.6;const b=use('potion');if(b?.kind==='spore')s.rows=[['poison',1,2]];if(b?.kind==='bloom')s.damageBonus=.25;break;}
   case 'c33':{const a=spend('calamity');s.mult=1.5+a*.25;if(a===3)s.rows=[['confusion',1]];break;}
   case 'c34':s.mult=1.6;s.flat=(use('momentum')?.value||0)*2;break;
   case 'c35':{const v=live(p,'analysis',n);if(v?.targetId===tid&&dispel(m,p,t,r.dispelKey,n)){s.mult=1.9;s.dispelled=true;}break;}
   case 'c36':s.mult=1.8;if(use('invisible')){s.hit=.2;s.rows=[['bleed',.8,2]];}break;
   case 'c37':s.mult=r.mode==='sword'?2.2:1.8;s.hits=r.mode==='sword'?1:3;r.mode='barrage';if(p.rev)s.restoreSp=8;break;
   case 'c38':s.mult=1.7+(live(p,'insight',n)?.targetId===tid?(use('insight')?.count||0)*.3:0);break;
   case 'c39':s.mult=1.5+spend('amp')*.3;s.selfDamage=5;break;
   case 'c40':s.mult=is('confusion')?1.9:1.5;s.rows=[['fear',1]];break;
   case 'c41':{const pool=['poison','bleed','slow'];const a=pool.splice(Math.floor(Math.random()*3),1)[0],b=pool[Math.floor(Math.random()*2)];s.rows=[[a,.8],[b,.8]];break;}
   case 'c42':s.mult=1.6;if(own(p,t,'domination',n)){delete t.statuses.domination;s.mult=2.1;}s.rows=[['bind',.8]];break;
   case 'c43':{const poison=has(t,'poison',n);const a=Math.min(3,poison?.owners?.[p.playerId]|| (poison?.sourceId===p.playerId?poison.stacks:0));s.mult=1.5+a*.3;if(a){poison.stacks-=a;if(poison.owners)delete poison.owners[p.playerId];if(poison.stacks<=0)delete t.statuses.poison;}else s.rows=[['poison',1]];break;}
   case 'c44':s.mult=2.2;s.rows=[['actionDelay',1]];break;
   case 'c45':s.mult=is('sleep')?2.1:1.5;break;
   case 'c46':s.mult=1.6;if(own(p,t,'suggestion',n)){s.mult=1.9;s.rows=[['confusion',1]];s.removeAfter='suggestion';}break;
   case 'c47':s.mult=own(p,t,'fragrance',n)?2:1.6;buff(p,'moveBoost',10,n,{moveTime:-.25},{uses:1});break;
   case 'c48':s.rows=[['silence',.8]];if(own(p,t,'chainMark',n)){s.rows.push(['bind',1]);s.removeAfter='chainMark';}break;
   case 'c49':s.mult=1.6+spend('feast')*.2;s.lifesteal=.25;break;
   case 'c50':s.mult=resource(p,'flow')>0?1.9:1.5;if(res('flow'))resource(p,'flow',-1,2);s.rows=[['slow',.8]];break;
   case 'c51':{const keys=[...(r.keywords||[])],c=keywordCounts(keys);s.mult=1.2;s.hit=((c.tracking||0)-(c.scatter||0))*.2;s.damageBonus=Math.max(-.8,((c.amplify||0)-(c.weakness||0))*.2);s.defIgnore=Math.min(1,(c.piercing||0)*.2);s.heal=(c.healing||0)*5;s.restoreSp=(c.vigor||0)*3;s.selfDamage=(c.recoil||0)*5;s.words=keys;r.keywords=[];break;}
  }
  if(id==='c04'&&r.mode==='rail')s.defIgnore=.25;
  return s;
 }
 function dispel(m,p,t,key,n){
  const r=reworkState(t),keys=Object.keys(r.timed).filter(k=>r.timed[k].until>n&&['shield','art','domain','potion','mutation','invisible','nextGuard','reverse','moveBoost','broadcast','revGuard','hairReady','combo','toxin'].includes(k));
  const k=keys.includes(key)?key:keys[0];if(k&&Math.random()>=cap(fx(t,m,n).dispelResist||0,0,1)){delete r.timed[k];return true;}
  const a=(t.tempEffects||[]).find(x=>x.until>n&&Object.values(x.fx||{}).some(v=>v>0));if(a){t.tempEffects.splice(t.tempEffects.indexOf(a),1);return true;}return false;
 }
 function afterSkill(m,p,t,s,hit,total,killed,n){
  if(s.heal)heal(p,s.heal,m,n,!s.noLight);if(s.restoreSp)sp(p,s.restoreSp,m,n);if(hit&&s.spOnHit)sp(p,s.spOnHit,m,n);
  if(s.selfDamage){damage(p,s.selfDamage);if(p.hp<=0)api.environmentDeath(m,p,n,false,null,'스킬 반동');}
  if(s.lifesteal)heal(p,total*s.lifesteal,m,n);
  if(!hit&&s.luckSpent)resource(p,'luck',1);
  if(hit){for(const[k,ch,stacks=1]of s.rows)roll(m,p,t,k,ch,n,stacks,null,api.skillName(p,'combat'));if(s.removeAfter)delete t.statuses[s.removeAfter];
   if(s.starMark){for(const q of [...m.players,...(m.wilds||[])])if(q.statuses?.starTarget?.sourceId===p.playerId)delete q.statuses.starTarget;mark(m,p,t,'starTarget',30,n);}}
  if(p.charId==='c50')resource(p,'flow',1,2);

 }
 function killed(m,p,t,n){api.gearKill(m,p,t,n);if(p.charId==='c19')resource(p,'soul',1);if(p.charId==='c40'&&(has(t,'fear',n)||has(t,'confusion',n)))heal(p,15,m,n);}
 function options(m,p,n){const cfg=REWORK_CONFIG[p.charId]||{choices:[],targeted:false};const knownIds=(p.enemyContacts?.[p.region]||[]).map(x=>x.id);const ts=targets(m,p).filter(t=>p.isAI||sid(t)===p.encounter?.targetId||sid(t)===p.encounter?.wildId||knownIds.includes(sid(t))).map(t=>({id:sid(t),name:t.playerName||api.wildName(t)}));return {choices:cfg.choices.map(id=>({id,name:REWORK_LABELS[id]})),targeted:cfg.targeted,targets:ts,regions:[p.region,...(adjacency[p.region]||[])].filter(x=>!locked(m,x)),objects:(m.reworkObjects||[]).filter(o=>o.region===p.region&&o.ownerId!==p.playerId&&o.until>n).map(o=>({id:o.id,kind:o.kind,name:o.kind==='avatar'?'아바타 제거':o.kind==='trap'?'부적 해제':'식물 제거',seconds:o.kind==='avatar'||o.kind==='trap'?2:3}))};}
 function validate(m,p,x,n){
  const cfg=REWORK_CONFIG[p.charId];if(!cfg)return null;const r=reworkState(p),v=x.choice||cfg.choices[0];
  if(x.choice&&!cfg.choices.includes(x.choice))return {ok:false,error:'invalid_skill_choice'};
  if(p.sp<cfg.sp*(1+(effects(p,m,n).allSp||0)))return {ok:false,error:'not_enough_sp'};
  if(cfg.targeted&&!getTarget(m,p,x,n))return {ok:false,error:'rework_target_missing'};
  if(cfg.targeted&&x.targetId&&!p.isAI&&!options(m,p,n).targets.some(t=>t.id===x.targetId))return {ok:false,error:'rework_target_unknown'};
  if(p.charId==='c02'&&has(p,'silence',n))return {ok:false,error:'silenced'};
  if(p.charId==='c04'&&v===r.mode)return {ok:false,error:'same_module'};
  if(['c16','c25'].includes(p.charId)&&resource(p,p.charId==='c16'?'paint':'luck')<1)return {ok:false,error:'rework_resource_missing'};
  if(['c33','c39'].includes(p.charId)&&p.hp<=5)return {ok:false,error:'not_enough_hp'};
  if(['c18','c47'].includes(p.charId)&&has(p,'bind',n))return {ok:false,error:'bound'};
  if(p.charId==='c18'&&!m.regionRestrictions?.final){const to=x.region||(adjacency[p.region]||[]).find(t=>!locked(m,t));if(!to||!(adjacency[p.region]||[]).includes(to)||locked(m,to))return {ok:false,error:'invalid_move'};}
  if(p.charId==='c07'&&x.region&&(![p.region,...(adjacency[p.region]||[])].includes(x.region)||locked(m,x.region)))return {ok:false,error:'invalid_move'};
  if(p.charId==='c49'){const c=api.firstCorpse(m,p,n);if(c&&(c.eq?.length||Object.values(c.mat||{}).some(x=>x>0)||Object.values(c.con||{}).some(x=>x>0)))return {ok:false,error:'corpse_loot_first'};if(!c&&(p.satiety||0)<15)return {ok:false,error:'not_enough_satiety'};}
  if(p.charId==='c51'&&(r.keywords||[]).length>=KEYWORD_LIMIT)return {ok:false,error:'keywords_full'};
  return {ok:true};
 }
 function install(m,p,kind,seconds,n,extra={},max=1){m.reworkObjectSeq=(m.reworkObjectSeq||0)+1;const list=m.reworkObjects??=[];let own=list.filter(x=>x.ownerId===p.playerId&&x.until>n);while(own.length>=max){const old=own.shift();old.until=n;}const o={id:'rw_'+m.reworkObjectSeq,ownerId:p.playerId,region:p.region,kind,startedAt:n,until:n+seconds*1000,...extra};list.push(o);return o;}
 function action(m,p,x,n){
  const cfg=REWORK_CONFIG[p.charId];if(!cfg)return null;const v=validate(m,p,x,n);if(!v.ok)return v;const r=reworkState(p),choice=x.choice||cfg.choices[0],t=getTarget(m,p,x,n),res=(k,d=1,max=3)=>resource(p,k,d,max);
  p.sp-=cfg.sp*(1+(effects(p,m,n).allSp||0));p.cdAUntil=n+cfg.cd*1000;p.cdADuration=cfg.cd;
  const healed=k=>{if(has(p,k,n)){delete p.statuses[k];if(p.charId==='c03')buff(p,'purified',12,n,{atkPct:.25});return true;}return false;};
  switch(p.charId){
   case 'c02':roll(m,p,t,choice,1,n);break;
   case 'c03':healed(choice);shield(m,p,.2,10,n);break;
   case 'c04':r.mode=choice;shield(m,p,.15,10,n);break;
   case 'c05':res('charge',2);r.lastFight=n;buff(p,'overload',10,n,{rwTaken:.2});break;
   case 'c06':roll(m,p,t||targets(m,p)[0],'slow',1,n);res('spark',1,2);timed(p,'sparkExpiry',10,n);break;
   case 'c07':{const o=install(m,p,'avatar',25,n,{region:x.region||p.region},2);scan(m,p,n,o.region);break;}
   case 'c08':r.mode=choice;sp(p,10,m,n);break;
   case 'c09':r.mode=r.mode==='defense'?'attack':'defense';if(r.mode==='defense')shield(m,p,.15,8,n);else timed(p,'hairReady',10,n);break;
   case 'c10':res('attention');r.lastPvp=n;timed(p,'broadcast',15,n);noise(m,p,'high','라이브 개시',n);break;
   case 'c11':healed(has(p,'slow',n)?'slow':'actionDelay');buff(p,'moveBoost',12,n,{moveTime:-.30},{uses:1});timed(p,'wave',10,n);break;
   case 'c12':{const o=install(m,p,'trap',30,n);triggerObject(m,o,n);break;}
   case 'c13':heal(p,20,m,n);api.removeStacks(p,'bleed',2);break;
   case 'c14':if(mark(m,p,t,'timeStop',2,n)){const pause=t.statuses.timeStop.until-n,old=t.pendingAction;if(old){old.completeAt+=pause;r.stoppedActionId=old.startedAt;t.reworkPause={until:n+pause,sourceId:p.playerId};}t.statusImmunity??={};t.statusImmunity.timeStop=n+pause+15000;}break;
   case 'c15':scan(m,p,n);break;
   case 'c16':if(live(p,'art',n)?.kind==='shield')consume(p,'shield',n);res('paint',-1);if(choice==='shield'){shield(m,p,.2,12,n);timed(p,'art',12,n,{kind:'shield'});}else timed(p,'art',15,n,{kind:'bird'});break;
   case 'c17':timed(p,'poisonLoad',25,n,{kind:choice});break;
   case 'c18':{if(n-m.startedAt<780000){const to=x.region||(adjacency[p.region]||[]).find(v=>!locked(m,v));const from=p.region;p.region=to;p.encounter=null;for(const q of m.players)if(q.encounter?.targetId===p.playerId)q.encounter=null;moved(m,p,from,n);}res('momentum',1,2);timed(p,'momentumExpiry',15,n);break;}
   case 'c19':res('soul');buff(p,'soulGuard',12,n,{rwTaken:-.2});break;
   case 'c20':known(m,p,t,n,true);timed(p,'observed',15,n,{targetId:sid(t)});notice(m,p,t,0,'조준',n,false);break;
   case 'c21':if((r.resources.gear||1)>=5){r.resources.gear=2;sp(p,10,m,n);}else r.resources.gear=(r.resources.gear||1)+1;timed(p,'gearExpiry',10,n);break;
   case 'c22':if(targets(m,p).some(t=>own(p,t,'starTarget',n))){res('star',1,2);for(const t of targets(m,p))if(own(p,t,'starTarget',n))known(m,p,t,n,false);}else buff(p,'detectOnce',15,n,{detect:.25},{uses:1});break;
   case 'c23':shield(m,p,.2,12,n);break;
   case 'c24':r.mode=r.mode==='arms'?'legs':'arms';timed(p,'combo',10,n);if(r.mode==='arms')buff(p,'armHit',10,n,{basicDamage:.25},{uses:1});else buff(p,'freeMove',10,n,{},{uses:1});break;
   case 'c25':res('luck',-1);if(choice==='aim')buff(p,'aimOnce',12,n,{hit:.2},{uses:1});else timed(p,'nextGuard',12,n);break;
   case 'c26':install(m,p,choice,35,n,{matureAt:n+8000});break;
   case 'c27':sp(p,16,m,n);timed(p,'freeSpell',15,n);break;
   case 'c28':timed(p,'domain',10,n,{effects:{rwTaken:-.3}});break;
   case 'c29':r.mode=choice;if(choice==='card')timed(p,'cardPierce',15,n);else shield(m,p,.2,12,n);break;
   case 'c30':{const v=record(p,t);v.count=Math.min(3,v.count+1);timed(p,'analyzedGuard',15,n,{targetId:sid(t)});break;}
   case 'c31':res('shard',2);break;
   case 'c32':if(r.potionKind==='steel')consume(p,'shield',n);r.potionKind=choice;consume(p,'potion',n);if(choice==='steel')shield(m,p,.2,12,n);else timed(p,'potion',20,n,{kind:choice});break;
   case 'c33':damage(p,5);res('calamity');buff(p,'searchOnce',15,n,{searchLoot:.25},{uses:1});break;
   case 'c34':timed(p,'reverse',8,n);break;
   case 'c35':timed(p,'analysis',15,n,{targetId:sid(t),names:dispelNames(t,n)});r.dispelKey=x.dispelKey||null;break;
   case 'c36':buff(p,'invisible',15,n,{conceal:.20});break;
   case 'c37':r.mode=choice;timed(p,'memoryChoice',15,n);break;
   case 'c38':{const old=live(p,'insight',n);timed(p,'insight',12,n,{targetId:sid(t),count:Math.min(2,(old?.targetId===sid(t)?old.count:0)+1)});buff(p,'revGuard',8,n,{rwTaken:-.25},{uses:1});break;}
   case 'c39':if(choice==='amplify'){res('amp');timed(p,'ampExpiry',10,n);}else timed(p,'reverseAmpReady',12,n);break;
   case 'c40':install(m,p,'mist',15,n,{seen:[]});buff(p,'mistConceal',15,n,{conceal:.25});break;
   case 'c41':buff(p,'mutation',15,n,choice==='shell'?{defPct:.25}:{},{kind:choice,nextTick:n+3000});break;
   case 'c42':mark(m,p,t,'domination',10,n);break;
   case 'c43':timed(p,'toxin',15,n);break;
   case 'c44':shield(m,p,.2,12,n);buff(p,'heavyMove',12,n,{moveTime:.25,fleePrep:.25});break;
   case 'c45':roll(m,p,t,'sleep',1,n);break;
   case 'c46':mark(m,p,t,'suggestion',15,n);break;
   case 'c47':buff(p,'moveBoost',12,n,{moveTime:-.30},{uses:1});timed(p,'freeMove',12,n);noise(m,p,'medium','비상',n);break;
   case 'c48':mark(m,p,t,'chainMark',15,n);break;
   case 'c49':{const c=api.firstCorpse(m,p,n);if(c){m.corpses.splice(m.corpses.indexOf(c),1);heal(p,20,m,n);}else{p.satiety-=15;heal(p,10,m,n);}res('feast');break;}
   case 'c50':if(res('flow',0,2)){res('flow',-1,2);if(choice==='cycle'){heal(p,12,m,n);sp(p,12,m,n);}else cleanse(p,1,n);}else{sp(p,12,m,n);res('flow',1,2);}break;
   case 'c51':{const word=KEYWORDS[Math.min(KEYWORDS.length-1,Math.floor(Math.random()*KEYWORDS.length))];(r.keywords??=[]).push(word.id);r.keywordSeq=(r.keywordSeq||0)+1;(r.keywordNotices??=[]).push({...word,id:r.keywordSeq,keywordId:word.id,at:n,total:r.keywords.length});r.keywordNotices=r.keywordNotices.slice(-32);break;}
  }
  return {ok:true,rework:true,choice,resource:{...r.resources},targetId:sid(t)};
 }
 function dispelNames(t,n){const r=reworkState(t);return Object.entries(r.timed).filter(([k,v])=>v.until>n&&['shield','art','domain','potion','mutation','invisible','nextGuard','reverse','moveBoost','broadcast','revGuard','hairReady','combo','toxin'].includes(k)).map(([id,v])=>({id,name:v.name||display[id]?.[0]||'강화 효과'}));}
 function scan(m,p,n,region=p.region){for(const t of m.players.filter(t=>t!==p&&t.alive&&t.region===region)){if(Math.random()<cap(1-(fx(t,m,n).conceal||0),0,1)){if(region===p.region)known(m,p,t,n,false);else{p.intel??={};p.intel.remoteScout={at:n,region,names:[...(p.intel.remoteScout?.region===region?p.intel.remoteScout.names:[]).filter(x=>x!==t.playerName),t.playerName]};}}}}
 function triggerObject(m,o,n,t=null){const p=m.players.find(p=>p.playerId===o.ownerId);if(!p?.alive||o.until<=n)return;const ts=t?[t]:targets(m,{...p,region:o.region});const valid=ts.filter(q=>sid(q)!==p.playerId),q=valid[Math.floor(Math.random()*valid.length)];if(o.kind==='trap'&&q){mark(m,p,q,'talisman',15,n);roll(m,p,q,'slow',1,n);known(m,p,q,n,false);o.until=n;}}
 function moved(m,p,from,n){const r=reworkState(p);if(p.charId==='c06')timed(p,'moved',8,n);if(p.charId==='c11')timed(p,'wave',10,n);if(p.charId==='c18'){const hist=r.route||[];if(!hist.includes(p.region)){resource(p,'momentum',1,2);}r.route=[...hist,p.region].slice(-3);timed(p,'momentumExpiry',15,n);}if(p.charId==='c21')timed(p,'gearExpiry',10,n);
  for(const o of m.reworkObjects||[])if(o.region===p.region&&o.until>n){if(o.kind==='trap'&&o.ownerId!==p.playerId)triggerObject(m,o,n,p);if(o.kind==='avatar'&&o.ownerId!==p.playerId){const owner=m.players.find(t=>t.playerId===o.ownerId);if(owner)scan(m,owner,n,o.region);}}
  consume(p,'freeMove',n);consume(p,'moveBoost',n);
 }
 function afterComplete(m,p,type,x,result,n,before){if(!REWORK_CONFIG[p.charId]||!result?.ok)return;const r=reworkState(p);
  if(type==='move')moved(m,p,before.region,n);
  if(type==='search'){if(p.charId==='c16')resource(p,'paint',1);consume(p,'searchOnce',n);consume(p,'detectOnce',n);for(const o of m.reworkObjects||[])if(o.kind==='mist'&&o.region===p.region&&o.ownerId!==p.playerId&&o.until>n&&!o.seen.includes(p.playerId)){o.seen.push(p.playerId);const owner=m.players.find(t=>t.playerId===o.ownerId);if(owner)roll(m,owner,p,'confusion',.6,n);}}
  if(type==='loot_corpse'&&p.charId==='c19'&&!r.seenCorpses.includes(x.corpseId)){resource(p,'soul',1);r.seenCorpses.push(x.corpseId);}
  if(type==='use_item'&&p.charId==='c49'&&api.isFood(x.id))resource(p,'feast',1);
  for(const q of m.players)if(q!==p&&q.alive&&q.region===p.region&&q.charId==='c14')timed(q,'analyzed',10,n);
 }
 function tick(m,n){
  m.reworkObjects=(m.reworkObjects||[]).filter(o=>o.until>n&&!locked(m,o.region)&&m.players.some(p=>p.playerId===o.ownerId&&p.alive));
  for(const o of m.reworkObjects)if(o.kind==='flower'&&o.matureAt<=n&&!o.bloomed){const p=m.players.find(p=>p.playerId===o.ownerId);if(p?.region===o.region){shield(m,p,.2,12,n);o.bloomed=true;}}
  for(const p of m.players){if(!p.alive)continue;const r=reworkState(p);
   if(p.charId==='c51'&&r.keywordVersion!==2){const legacy=r.timed.words?.until>n?r.timed.words.keys||[]:[];r.keywords=legacy.map(k=>({flame:'amplify',repeat:'tracking'}[k]||k)).filter(k=>KEYWORD_BY_ID[k]).slice(0,KEYWORD_LIMIT);delete r.timed.words;delete r.timed.wordCombo;delete r.keptWord;r.keywordVersion=2;}
   if(p.reworkPause){const s=has(p,'timeStop',n);if(!s&&p.reworkPause.until>n&&p.pendingAction)p.pendingAction.completeAt-=p.reworkPause.until-n;if(!s)delete p.reworkPause;}
   if(p.charId==='c05'&&r.resources.charge&&n-(r.lastFight||0)>15000)r.resources.charge=0;
   if(p.charId==='c06'&&r.resources.spark&&!live(p,'sparkExpiry',n))r.resources.spark=0;
   if(p.charId==='c10'&&r.lastPvp&&n-r.lastPvp>20000){const decayAt=r.attentionDecayAt||r.lastPvp+20000;const steps=Math.floor((n-decayAt)/5000);if(steps>0){resource(p,'attention',-steps);r.attentionDecayAt=decayAt+steps*5000;}}else r.attentionDecayAt=0;
   if(p.charId==='c18'&&r.resources.momentum&&!live(p,'momentumExpiry',n))r.resources.momentum=0;
   if(p.charId==='c21'){const e=r.timed.gearExpiry;if(e&&e.until<=n){const steps=1+Math.floor((n-e.until)/5000);r.resources.gear=Math.max(1,(r.resources.gear||1)-steps);e.until+=steps*5000;}}
   if(p.charId==='c23'&&r.resources.will&&n-(r.lastPvp||0)>20000)r.resources.will=0;
   if(p.charId==='c37'&&r.timed.memoryChoice&&r.timed.memoryChoice.until<=n)r.mode='barrage';
   if(p.charId==='c39'&&r.resources.amp&&!live(p,'ampExpiry',n))r.resources.amp=0;
   const b=r.timed.mutation;if(b?.kind==='regen'){while(b.nextTick<=n&&b.nextTick<=b.until){heal(p,4,m,b.nextTick);b.nextTick+=3000;}}
   if(p.charId==='c28'&&live(p,'close',n)){const target=m.players.find(t=>t.playerId===live(p,'close',n).targetId);if(target&&target.region!==p.region)consume(p,'close',n);}
  }
 }
 function heard(m,p,source,n){if(p.charId==='c15')timed(p,'heard',10,n,{targetId:sid(source)});}
 const display={shield:['보호막','남은 보호막이 직접 전투 피해를 흡수합니다. 독·출혈 피해는 막지 않습니다.'],purified:['정화의 축복','공격력 +25%'],overload:['출력 개방','받는 직접 피해 +20%'],moved:['이동 직후','첫 일반 공격 적중 시 섬뢰를 얻습니다.'],sparkExpiry:['섬뢰 유지','남은 시간 동안 섬뢰를 사용할 수 있습니다.'],broadcast:['라이브 진행','전투 스킬 적중 시 SP 8을 회복합니다.'],moveBoost:['기동 강화','다음 이동 소요시간을 줄입니다. 1회 사용 시 소모합니다.'],wave:['물결','다음 전투 스킬이 강화됩니다.'],art:['묘화 작품','그려둔 작품의 효과를 사용할 수 있습니다.'],poisonLoad:['독 장전','다음 전투 스킬에 선택한 독을 부여합니다.'],momentumExpiry:['기세 유지','기세가 다음 돌격의 위력을 높입니다.'],soulGuard:['영혼불','받는 직접 피해 −20%'],observed:['정밀 관측','관측한 대상에게 저격 위력과 명중률이 증가합니다.'],gearExpiry:['가속 기어','기어가 높을수록 빠르지만 SP 소모가 증가합니다.'],detectOnce:['탐지 준비','다음 탐색의 플레이어 탐지 확률 +25%p'],freeMove:['이동 준비','다음 이동의 SP 소모가 0이 됩니다.'],combo:['연계 준비','다음 전투 스킬의 피해 계수 +30%p'],armHit:['팔 증강 준비','다음 일반 공격 피해 +25%'],aimOnce:['명중 길조','다음 일반 공격 명중률 +20%p'],nextGuard:['방어 길조','다음 직접 피격 피해 −30%'],miracle:['다음 기적','다음 전투 스킬 위력 +25%'],freeSpell:['주문 준비','다음 전투 스킬의 SP 소모가 0이 됩니다.'],domain:['일미터의 법칙','받는 직접 피해 −30%'],cardPierce:['카드 계약','다음 전투 스킬이 방어력 20%를 무시합니다.'],analyzedGuard:['기록 대조','대조한 상대에게 받는 직접 피해 −25%'],potion:['실험약','선택한 실험약이 다음 전투 스킬에 적용됩니다.'],searchOnce:['위험 탐색 준비','다음 탐색의 아이템 발견률 +25%p'],reverse:['벡터 반전','다음 직접 피격 피해를 30% 줄이고 운동량을 저장합니다.'],momentum:['저장 운동량','다음 전투 스킬에 추가 피해로 사용합니다.'],analysis:['술식 해석','해석한 상대의 해제 가능한 강화 효과를 파훼할 수 있습니다.'],invisible:['광학 소거','피탐지 확률 −20%p·이동 소음 억제. 공격 시 해제됩니다.'],memoryChoice:['전생 회상','선택한 전투 형식을 유지합니다.'],insight:['간파','같은 대상에게 명중률과 전투 스킬 위력이 증가합니다.'],revGuard:['검집의 정적','다음 직접 피격 피해 −25%'],reverseAmpReady:['역증폭 준비','다음 일반 공격에 공격력 약화를 시도합니다.'],ampExpiry:['증폭 유지','증폭이 다음 타격의 위력을 높입니다.'],mistConceal:['환영 안개','피탐지 확률 −25%p'],mutation:['키메라 적응','갑각: 방어력 +25% / 재생: 3초마다 HP 4'],mutationStudy:['변이 관찰','관찰한 대상에게 피해 +25%'],toxin:['맹독 농축','다음 일반 공격 적중 시 독 2중첩 부여를 시도합니다.'],heavyMove:['중량 자세','이동·도주 소요시간 +25%'],heavyPrep:['강타 준비','준비 중 받는 직접 피해 −20%'],words:['영창 키워드','선택한 마법어를 다음 영창에 적용합니다.'],wordCombo:['문장 연계','다음 전투 스킬 위력 +20%'],heard:['기척 확인','기척을 확인한 상대에게 첫 일반 공격 명중률 +20%p'],analyzed:['초침 분석','다음 전투 스킬이 강화됩니다.'],hairReady:['모발 포박 준비','다음 전투 스킬의 속박 부여 기본 확률 +20%p'],learned:['방향 학습','직전 피격 상대에게 받는 직접 피해 −25%']};
 const equippedDetails={poisonLoad:{bleed:'다음 전투 스킬에 출혈 2중첩 부여를 기본 확률 80%로 시도합니다.',slow:'다음 전투 스킬에 둔화 2중첩 부여를 기본 확률 80%로 시도합니다.',silence:'다음 전투 스킬에 침묵 부여를 기본 확률 80%로 시도합니다.'},art:{shield:'직접 전투 피해를 흡수하는 보호막 작품입니다.',bird:'다음 전투 스킬 피해 +25%.'},potion:{spore:'다음 전투 스킬에 독 2중첩 부여를 기본 확률 100%로 시도합니다.',bloom:'다음 전투 스킬 피해 +25%.'},mutation:{shell:'방어력 +25%.',regen:'3초마다 HP 4 회복.'}};
 function view(m,p,n){const r=reworkState(p),buffs=gimmickBuffs(p,r,{maxHp:maxHp(p,m,n),players:m.players});for(const[k,b]of Object.entries(r.timed))if(b.until>n)buffs['rw_'+k]={...b,stacks:b.count||1,...(k==='insight'?{category:'resource',maxStacks:2}:{}),name:(k==='shield'&&p.charId==='c32'&&r.potionKind==='steel'?'강철나무 보호막':b.name||display[k]?.[0]||'고유 효과')+(b.kind?' · '+(REWORK_LABELS[b.kind]||b.kind):''),description:(equippedDetails[k]?.[b.kind]||display[k]?.[1]||'캐릭터 고유 효과가 활성화되어 있습니다.')+(k==='momentum'?' 저장량: '+Math.round((b.value||0)*10)/10+'.':k==='shield'?' 남은 보호막: '+Math.ceil(b.amount||0)+'.':'')};return {rework:{mode:r.mode,resources:r.resources,...(p.charId==='c51'?{keywords:keywordView(r.keywords),keywordTotal:(r.keywords||[]).length,keywordLimit:KEYWORD_LIMIT,keywordSeq:r.keywordSeq||0,keywordNotices:r.keywordNotices||[]}:{}),shield:live(p,'shield',n)?.amount||0,records:p.charId==='c35'?live(p,'analysis',n)?.names:undefined,remoteScout:p.intel?.remoteScout},reworkOptions:options(m,p,n),reworkBuffs:buffs};}
 return {effects,healObserved,takeDirect,reduction,damageMult,hitBonus,afterDirect,skillSpec,afterSkill,killed,action,validate,tick,moved,afterComplete,afterApplied,heard,view,resource,live,consume,target:getTarget,roll,shield};
}
