import { CHARACTER_BY_ID, ADJACENCY, movementProfile } from "./game_data.js";
import { ITEMS, POOLS, WILD_TEMPLATES, ENCOUNTER_EVENTS } from "./offline_content.js";
import { PASSIVE_FX, COMBAT_SKILL_DEFS, ACTION_SKILL_DEFS } from "./skill_defs.js";

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const nowSec=(match,now=Date.now())=>Math.max(0,(now-match.startedAt)/1000);
const item=id=>ITEMS[id]||null;
const char=p=>CHARACTER_BY_ID.get(p.charId)||CHARACTER_BY_ID.get("c01");

function tempFx(p,match,now=Date.now()){
  const out={};
  p.tempEffects=(p.tempEffects||[]).filter(e=>e?.until>now);
  for(const e of p.tempEffects)for(const[k,v]of Object.entries(e.fx||{}))if(typeof v==="number")out[k]=(out[k]||0)+v;
  return out;
}
function combinedFx(p,match,now=Date.now()){
  const out={...(PASSIVE_FX[p.charId]||{})};
  for(const[k,v]of Object.entries(tempFx(p,match,now)))out[k]=(out[k]||0)+v;
  for(const id of p.eq||[]){
    const it=item(id);if(!it)continue;
    if(id==="synergy_01"){out.markHit=(out.markHit||0)+.05;out.trackingDuration=(out.trackingDuration||0)+.20}
    if(id==="synergy_02"){out.conceal=(out.conceal||0)+.07;out.quietDamage=(out.quietDamage||0)+.04}
    if(id==="synergy_03"){out.poisonChance=(out.poisonChance||0)+.06;out.poisonDamage=(out.poisonDamage||0)+.03}
    if(id==="synergy_04"){out.moveSp=(out.moveSp||0)+1;out.moveHit=(out.moveHit||0)+.04}
    if(id==="synergy_05"){out.damageTaken=(out.damageTaken||0)-.03;out.lowDef=(out.lowDef||0)+4}
    if(id==="synergy_06"){out.consumeHeal=(out.consumeHeal||0)+.08;out.restHeal=(out.restHeal||0)+.05}
    if(id==="synergy_07"){out.controlDuration=(out.controlDuration||0)+.06;out.statusChance=(out.statusChance||0)+.03}
    if(id==="synergy_08"){out.prep=(out.prep||0)-.04;out.chain3=(out.chain3||0)+.03}
    if(id==="synergy_09"){out.woundedDetect=(out.woundedDetect||0)+.08;out.redetectHit=(out.redetectHit||0)+.04}
    if(id==="synergy_10"){out.poisonDurationTaken=(out.poisonDurationTaken||0)-.20}
    if(id==="synergy_11"){out.fleePrep=(out.fleePrep||0)-.05}
    if(id==="synergy_12"){out.skillSp=(out.skillSp||0)-.05;out.delayResist=(out.delayResist||0)+.10}
  }
  return out;
}
function maxHp(p,match,now=Date.now()){return Math.max(1,p.maxHp+(tempFx(p,match,now).maxHpFlat||0))}
function equipmentAtk(p){return (p.eq||[]).reduce((s,id)=>s+(item(id)?.atk||0),0)}
function equipmentDef(p){return (p.eq||[]).reduce((s,id)=>s+(item(id)?.def||0),0)}
function atk(p,match,now=Date.now()){
  let v=char(p).baseAtk+equipmentAtk(p);
  if(p.charId==="c10")v+=Math.min(3,Math.floor(nowSec(match,now)/120)*.5);
  return v;
}
function def(p,match,now=Date.now()){
  let v=char(p).baseDef+equipmentDef(p);
  const fx=combinedFx(p,match,now);
  if(p.hp/maxHp(p,match,now)<.5)v+=fx.lowDef||0;
  return Math.max(0,v);
}
function incomingMult(p,match,now=Date.now()){
  let m=1+(combinedFx(p,match,now).damageTaken||0);
  if(p.tempGuardUntil>now)m*=1-(p.tempGuardRate||0);
  return Math.max(.25,m);
}
function addTemp(p,fx,seconds,now=Date.now()){(p.tempEffects??=[]).push({fx:{...fx},until:now+seconds*1000})}
function owned(p,id){
  const it=item(id);if(!it)return 0;
  if(it.t==="m")return p.mat?.[id]||0;
  if(it.t==="c")return p.con?.[id]||0;
  return (p.eq||[]).filter(x=>x===id).length;
}
function addItem(p,id,n=1){
  const it=item(id);if(!it)return false;
  if(it.t==="m"){p.mat[id]=(p.mat[id]||0)+n;return true}
  if(it.t==="c"){
    const distinct=Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0);
    if((p.con[id]||0)<=0&&distinct.length>=3)return false;
    p.con[id]=(p.con[id]||0)+n;return true
  }
  for(let i=0;i<n;i++){if(p.eq.length>=3)p.eq.shift();p.eq.push(id)}
  return true
}
function consumeItem(p,id,n=1){
  const it=item(id);if(!it||owned(p,id)<n)return false;
  if(it.t==="m"){p.mat[id]-=n;if(p.mat[id]<=0)delete p.mat[id];return true}
  if(it.t==="c"){p.con[id]-=n;if(p.con[id]<=0)delete p.con[id];return true}
  for(let i=0;i<n;i++){const ix=p.eq.indexOf(id);if(ix<0)return false;p.eq.splice(ix,1)}
  return true
}
function canCraft(p,id){const r=item(id)?.r;return !!r&&Object.entries(r).every(([k,v])=>owned(p,k)>=v)}
function craftItem(p,id){
  const it=item(id);if(!it||!canCraft(p,id))return {ok:false,error:"recipe_missing"};
  for(const[k,v]of Object.entries(it.r))if(!consumeItem(p,k,v))return {ok:false,error:"recipe_race"};
  if(!addItem(p,id,1))return {ok:false,error:"inventory_full"};
  return {ok:true,itemId:id,itemName:it.n};
}
function status(p,id,now=Date.now()){const s=p.statuses?.[id];return s&&s.until>now?s:null}
function applyStatus(p,id,stacks=1,duration=5,sourceId=null,now=Date.now()){
  p.statuses??={};
  if(id==="sleep"&&p.statusImmunity?.sleepUntil>now)return false;
  const max=id==="poison"||id==="bleed"?3:id==="slow"?2:1;
  const old=p.statuses[id];
  p.statuses[id]={stacks:clamp((old?.until>now?old.stacks:0)+stacks,1,max),until:now+duration*1000,sourceId};
  return true
}
function cleanseExpired(p,now){
  for(const[id,s]of Object.entries(p.statuses||{}))if(!s||s.until<=now)delete p.statuses[id];
  p.tempEffects=(p.tempEffects||[]).filter(e=>e?.until>now);
}
function updateSatiety(match,p,now){
  const elapsed=Math.max(0,now-(p.lastSatietyAt||match.startedAt));
  const ticks=Math.floor(elapsed/20000);
  if(ticks>0){p.satiety=clamp((p.satiety??100)-ticks*5,0,100);p.lastSatietyAt=(p.lastSatietyAt||match.startedAt)+ticks*20000}
}
function applyStatusTicks(match,p,now){
  p.nextStatusTick??=match.startedAt;
  while(p.nextStatusTick+2000<=now){
    p.nextStatusTick+=2000;
    const poison=p.statuses?.poison;if(poison?.until>p.nextStatusTick)p.hp-=maxHp(p,match,p.nextStatusTick)*.02*(poison.stacks||1);
  }
  if(p.hp<=0)p.alive=false;
}
export function updatePassiveTime(match,now=Date.now()){
  for(const p of match.players){
    if(!p.alive)continue;
    cleanseExpired(p,now);updateSatiety(match,p,now);applyStatusTicks(match,p,now);
    p.hp=Math.min(p.hp,maxHp(p,match,now));
  }
  match.elapsed=Math.floor(nowSec(match,now));
}
export function initWorld(match){
  let seq=1;match.wilds=[];
  for(const t of WILD_TEMPLATES)for(const region of t.regions)match.wilds.push({id:"w"+seq++,templateId:t.id,region,hp:t.hp,alive:true,guardReady:t.skill==="guard"});
  match.eventPity={};match.lastEventId=null;match.corpses=[];match.worldLog=[];
}
function wildTemplate(w){return WILD_TEMPLATES.find(x=>x.id===w.templateId)}
function playerById(match,id){return match.players.find(p=>p.playerId===id)}
function encounterTarget(match,p){
  const e=p.encounter;if(!e)return null;
  if(e.kind==="player"){const t=playerById(match,e.targetId);return t?.alive&&t.region===p.region?{kind:"player",obj:t}:null}
  const w=match.wilds.find(x=>x.id===e.wildId);return w?.alive&&w.region===p.region?{kind:"wild",obj:w}:null
}
function profHit(p){
  const type=char(p).preferredWeapon,xp=p.proficiency?.[type]||0;
  return xp>=115 ? .12 : xp>=80 ? .10 : xp>=55 ? .08 : xp>=35 ? .06 : xp>=20 ? .04 : xp>=10 ? .02 : 0;
}
function gainProf(p,n){
  const type=char(p).preferredWeapon;if(!type)return;
  p.proficiency[type]=(p.proficiency[type]||0)+n;
}
function hitRoll(p,skill,bonus,match,now){
  let chance=.80+profHit(p)+bonus;
  if(status(p,"fear"))chance-=.08;if(skill&&status(p,"confusion"))chance-=.06;
  chance+=combinedFx(p,match,now).hit||0;
  return Math.random()<clamp(chance,.55,.95);
}
function baseDamage(a,b,match,now){
  return Math.max(1,Math.round(atk(a,match,now)*100/(100+def(b,match,now))*incomingMult(b,match,now)));
}
function wildDamage(a,w,match,now){
  const t=wildTemplate(w);let wa=t.atk;if(t.skill==="berserk"&&w.hp/t.hp<=.4)wa*=1.25;
  return Math.max(1,Math.round(wa*100/(100+def(a,match,now))*incomingMult(a,match,now)));
}
function killPlayer(match,a,b,now){
  const fx=PASSIVE_FX[b.charId]||{};
  if(fx.revive&&!b.rev){b.rev=true;b.hp=Math.min(18,maxHp(b,match,now));return {revived:true}}
  b.alive=false;b.encounter=null;a.kills++;
  const corpse={id:"corpse_"+b.playerId+"_"+now,name:b.playerName,region:b.region,eq:[...b.eq],mat:{...b.mat},con:{...b.con},expiresAt:now+75000};
  match.corpses.push(corpse);b.eq=[];b.mat={};b.con={};
  return {killed:true}
}
function wildCounter(match,p,w,now){
  if(!p.alive||!w.alive)return 0;
  const t=wildTemplate(w),d=wildDamage(p,w,match,now);p.hp-=d;
  if(t.skill==="bite_bleed"&&Math.random()<.20)applyStatus(p,"bleed",1,10,w.id,now);
  else if(t.skill==="scan_delay"&&Math.random()<.20)applyStatus(p,"actionDelay",1,3,w.id,now);
  else if(t.skill==="emp"&&Math.random()<.20)applyStatus(p,"silence",1,3,w.id,now);
  else if(t.skill==="toxic"&&Math.random()<.30)applyStatus(p,"poison",1,8,w.id,now);
  else if(t.skill==="chimera_status"&&Math.random()<.30)applyStatus(p,pick(["poison","bleed","slow"]),1,6,w.id,now);
  else if(t.skill==="phantom_fear"&&Math.random()<.25)applyStatus(p,"fear",1,5,w.id,now);
  else if(t.skill==="pilfer"&&Math.random()<.20)p.sp=Math.max(0,p.sp-5);
  else if(t.skill==="mana_bite"&&Math.random()<.20)p.sp=Math.max(0,p.sp-8);
  if(p.hp<=0)p.alive=false;
  return d;
}
function attackPlayer(match,p,t,skill=false,now=Date.now()){
  const sd=COMBAT_SKILL_DEFS[p.charId]||{mult:1.08,sp:12,cd:55};
  let spCost=0,bonus=0,mult=1;
  if(skill){
    if(status(p,"silence"))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    spCost=Math.max(0,(sd.sp??12)-(p.nextSkillSpDiscount||0));if(p.sp<spCost)return {ok:false,error:"not_enough_sp"};
    p.sp-=spCost;p.nextSkillSpDiscount=0;p.cdCUntil=now+(sd.cd??55)*1000;bonus=sd.hit||0;
    mult=sd.multMin!=null?sd.multMin+Math.random()*(sd.multMax-sd.multMin):(sd.mult??1.08);
    if(sd.lowHpMult!=null&&p.hp/maxHp(p,match,now)<.5)mult=sd.lowHpMult;
    if(sd.timeScale)mult*=1+Math.min(.20,Math.floor(nowSec(match,now)/120)*.05);
  }
  if(!hitRoll(p,skill,bonus,match,now)){gainProf(p,.5);return {ok:true,hit:false,damage:0}}
  let d=baseDamage(p,t,match,now)*mult*(1+(combinedFx(p,match,now).skillDamage||0));
  let crit=Math.random()<clamp(.05+(sd.crit||0)+(combinedFx(p,match,now).crit||0),0,.5);if(crit)d*=1.4;
  d=Math.max(1,Math.round(d));t.hp-=d;gainProf(p,1.5);
  if(skill){
    for(const row of sd.statuses||[]){const[id,chance,dur,stacks=1]=row;if(Math.random()<chance)applyStatus(t,id,stacks,dur||5,p.playerId,now)}
    if(sd.forcePoison)applyStatus(t,"poison",sd.forcePoison,8,p.playerId,now);
    if(sd.randomStatus&&Math.random()<.35)applyStatus(t,pick(["poison","bleed","slow"]),1,6,p.playerId,now);
    if(sd.doubleRandomStatus)for(const id of pick([["poison","bleed"],["poison","slow"],["bleed","slow"]]))if(Math.random()<.5)applyStatus(t,id,1,6,p.playerId,now);
    if(sd.randomControl&&Math.random()<sd.randomControl)applyStatus(t,pick(["slow","bind","fear","confusion","silence"]),1,5,p.playerId,now);
    if(sd.heal)p.hp=clamp(p.hp+sd.heal,0,maxHp(p,match,now));if(sd.restoreSp)p.sp=clamp(p.sp+sd.restoreSp,0,p.maxSp);
    if(sd.drainSp)t.sp=Math.max(0,t.sp-sd.drainSp);if(sd.lifesteal)p.hp=clamp(p.hp+d*sd.lifesteal,0,maxHp(p,match,now));
    if(sd.freeMove)p.nextMoveFree=true;if(sd.tempGuard){p.tempGuardUntil=now+(sd.tempGuardDuration||8)*1000;p.tempGuardRate=sd.tempGuard}
  }
  const death=t.hp<=0?killPlayer(match,p,t,now):null;
  return {ok:true,hit:true,crit,damage:d,death};
}
function attackWild(match,p,w,skill=false,now=Date.now()){
  const t=wildTemplate(w),sd=COMBAT_SKILL_DEFS[p.charId]||{mult:1.08,sp:12,cd:55};
  let spCost=0,bonus=0,mult=1;
  if(skill){
    if(status(p,"silence"))return {ok:false,error:"silenced"};if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    spCost=Math.max(0,(sd.sp??12)-(p.nextSkillSpDiscount||0));if(p.sp<spCost)return {ok:false,error:"not_enough_sp"};
    p.sp-=spCost;p.cdCUntil=now+(sd.cd??55)*1000;bonus=sd.hit||0;mult=sd.multMin!=null?sd.multMin+Math.random()*(sd.multMax-sd.multMin):(sd.mult??1.08);
  }
  if(!hitRoll(p,skill,bonus,match,now)){gainProf(p,.5);return {ok:true,hit:false,damage:0,counter:wildCounter(match,p,w,now)}}
  let d=Math.max(1,Math.round(atk(p,match,now)*100/(100+t.def)*mult));
  const crit=Math.random()<clamp(.05+(sd.crit||0)+(combinedFx(p,match,now).crit||0),0,.5);if(crit)d=Math.round(d*1.4);
  if(t.skill==="guard"&&w.guardReady){w.guardReady=false;d=Math.max(1,Math.round(d*.8))}
  w.hp-=d;gainProf(p,1.5);
  let drop=null,extra=[];
  if(w.hp<=0){w.alive=false;w.hp=0;drop=pick(t.drop);addItem(p,drop);if(t.skill==="supply_cache")for(let i=0;i<2;i++){const x=pick(t.drop);if(addItem(p,x))extra.push(x)}}
  const counter=w.alive&&p.alive?wildCounter(match,p,w,now):0;
  return {ok:true,hit:true,crit,damage:d,killed:!w.alive,drop,extra,counter};
}
function searchResult(match,p,now){
  p.sp=Math.max(0,p.sp-3);
  const eventChance=Math.min(.12,.05+(match.eventPity[p.region]||0));
  if(Math.random()<eventChance){
    const pool=ENCOUNTER_EVENTS.filter(e=>e.region===p.region&&e.id!==match.lastEventId);
    if(pool.length){const e=pick(pool);match.lastEventId=e.id;match.eventPity[p.region]=0;p.pendingEvent=e.id;return {kind:"event",event:e}}
  } else match.eventPity[p.region]=(match.eventPity[p.region]||0)+.007;
  const humans=match.players.filter(x=>x!==p&&x.alive&&x.region===p.region);
  if(humans.length&&Math.random()<.70){const t=pick(humans);p.encounter={kind:"player",targetId:t.playerId};return {kind:"player",target:{playerId:t.playerId,playerName:t.playerName,charId:t.charId,hp:t.hp,maxHp:t.maxHp}}}
  const wilds=match.wilds.filter(w=>w.alive&&w.region===p.region&&nowSec(match,now)>=wildTemplate(w).after);
  if(wilds.length&&Math.random()<.50){const w=pick(wilds),t=wildTemplate(w);p.encounter={kind:"wild",wildId:w.id};return {kind:"wild",target:{wildId:w.id,name:t.n,hp:w.hp,maxHp:t.hp,skillText:t.skillText}}}
  const corpse=match.corpses.find(c=>c.region===p.region&&c.expiresAt>now&&(c.eq.length||Object.keys(c.mat).length||Object.keys(c.con).length));
  if(corpse&&Math.random()<.08)return {kind:"corpse",corpse};
  const pool=POOLS[p.region]||[];if(pool.length&&Math.random()<.90){const id=pick(pool);if(addItem(p,id))return {kind:"item",itemId:id,itemName:item(id)?.n||id}}
  return {kind:"nothing"};
}
function useConsumable(match,p,id,now){
  const it=item(id);if(!it||it.t!=="c"||owned(p,id)<=0)return {ok:false,error:"item_missing"};
  const inCombat=!!p.encounter,combat=inCombat?(it.combatEff??.75):1;
  const healMult=(1+(combinedFx(p,match,now).consumeHeal||0))*combat;
  if(it.heal)p.hp=clamp(p.hp+it.heal*healMult,0,maxHp(p,match,now));if(it.sp)p.sp=clamp(p.sp+it.sp*combat,0,p.maxSp);if(it.sat)p.satiety=clamp(p.satiety+it.sat,0,100);
  if(id==="energy_drink")addTemp(p,{moveSp:1},25,now);else if(id==="coffee")addTemp(p,{searchTime:-.05},30,now);else if(id==="chocolate")addTemp(p,{moveTime:-.05},15,now);else if(id==="grilled_meat")addTemp(p,{maxHpFlat:8},30,now);
  if(id==="antidote"&&p.statuses.poison){p.statuses.poison.stacks=Math.max(0,p.statuses.poison.stacks-2);p.statuses.poison.until=now+(p.statuses.poison.until-now)*.5;if(!p.statuses.poison.stacks)delete p.statuses.poison}
  if(id==="bandage"&&p.statuses.bleed){p.statuses.bleed.stacks=Math.max(0,p.statuses.bleed.stacks-2);if(!p.statuses.bleed.stacks)delete p.statuses.bleed}
  consumeItem(p,id,1);
  if(inCombat){const target=encounterTarget(match,p);if(target?.kind==="wild")wildCounter(match,p,target.obj,now);p.encounter=null}
  return {ok:true,itemId:id,itemName:it.n};
}
function charAction(match,p,now){
  const d=ACTION_SKILL_DEFS[p.charId];if(!d)return {ok:false,error:"action_missing"};
  if((p.cdAUntil||0)>now)return {ok:false,error:"action_cooldown"};if(p.sp<(d.sp||0))return {ok:false,error:"not_enough_sp"};
  p.sp-=d.sp||0;p.cdAUntil=now+(d.cd||45)*1000;
  if(d.heal)p.hp=clamp(p.hp+d.heal,0,maxHp(p,match,now));if(d.restoreSp)p.sp=clamp(p.sp+d.restoreSp,0,p.maxSp);
  if(d.selfDamage){p.hp-=d.selfDamage;if(p.hp<=0)p.alive=false}
  if(d.giveItem)addItem(p,d.giveItem,1);if(d.nextDetect)p.nextDetectBonus=(p.nextDetectBonus||0)+d.nextDetect;
  if(d.nextSearch)p.nextSearchLootBonus=(p.nextSearchLootBonus||0)+d.nextSearch;if(d.nextHit)p.nextHitBonus=(p.nextHitBonus||0)+d.nextHit;
  if(d.nextDamage)p.nextDamageBonus=(p.nextDamageBonus||0)+d.nextDamage;if(d.nextCrit)p.nextCritBonus=(p.nextCritBonus||0)+d.nextCrit;
  if(d.nextSkillSpDiscount)p.nextSkillSpDiscount=Math.max(p.nextSkillSpDiscount||0,d.nextSkillSpDiscount);
  if(d.nextCraftTimeMult)p.nextCraftTimeMult=Math.min(p.nextCraftTimeMult||1,d.nextCraftTimeMult);if(d.nextMoveFree)p.nextMoveFree=true;
  const fx={};for(const k of["damage","damageTaken","hit","crit","detect","conceal","moveTime","moveSp","searchLoot","searchTime","statusChance","incomingStatusDuration","defFlat","prep"]){if(d[k]!=null)fx[k]=d[k]}
  if(Object.keys(fx).length)addTemp(p,fx,d.duration||18,now);
  return {ok:true};
}
export function publicPlayer(match,p,now=Date.now()){
  updatePassiveTime(match,now);
  return {...p,maxHp:maxHp(p,match,now),atk:atk(p,match,now),def:def(p,match,now),cdC:Math.max(0,((p.cdCUntil||0)-now)/1000),cdA:Math.max(0,((p.cdAUntil||0)-now)/1000),
    inventory:{eq:(p.eq||[]).map(id=>({id,...item(id)})),mat:Object.entries(p.mat||{}).filter(([,n])=>n>0).map(([id,n])=>({id,count:n,name:item(id)?.n||id})),con:Object.entries(p.con||{}).filter(([,n])=>n>0).map(([id,n])=>({id,count:n,...item(id)}))}
  };
}
export function actionDuration(match,p,type,payload={},now=Date.now()){
  const fx=combinedFx(p,match,now);let sec=1;
  if(type==="search")sec=Math.max(.8,1.5*(1+(fx.searchTime||0)));
  else if(type==="rest")sec=3;
  else if(type==="craft")sec=Math.max(.8,1.8*(1+(fx.craftTime||0))*(p.nextCraftTimeMult||1));
  else if(type==="use_item")sec=item(payload.id)?.useTime??1.2;
  else if(type==="attack")sec=Math.max(.65,1.15*(1+(fx.prep||0)));
  else if(type==="skill")sec=Math.max(.65,1*(COMBAT_SKILL_DEFS[p.charId]?.prep||1));
  else if(type==="flee")sec=Math.max(.7,1.5*(1+(fx.fleePrep||0)));
  else if(type==="char_action")sec=ACTION_SKILL_DEFS[p.charId]?.time??.8;
  if(status(p,"actionDelay"))sec*=1.25;
  return sec;
}
export function validateAction(match,p,type,payload={},now=Date.now()){
  updatePassiveTime(match,now);
  if(!p?.alive)return {ok:false,error:"player_not_active"};if(p.pendingAction)return {ok:false,error:"action_in_progress"};if(status(p,"sleep",now))return {ok:false,error:"asleep"};
  if(p.pendingEvent)return {ok:false,error:"event_choice_required"};
  if(type!=="attack"&&type!=="skill"&&type!=="flee"&&p.encounter&&type!=="use_item")return {ok:false,error:"encounter_in_progress"};
  if(type==="move"){if(status(p,"bind"))return {ok:false,error:"bound"};if(!ADJACENCY[p.region]?.includes(payload.to))return {ok:false,error:"invalid_move"};const mv=movementProfile(p.region,payload.to),cost=p.nextMoveFree?0:Math.max(0,mv.spCost-(combinedFx(p,match,now).moveSp||0));if(p.sp<cost)return {ok:false,error:"not_enough_sp"};return {ok:true,meta:{...mv,spCost:cost}}}
  if(type==="search"&&p.sp<3)return {ok:false,error:"not_enough_sp"};
  if(type==="craft"&&!canCraft(p,payload.id))return {ok:false,error:"cannot_craft"};
  if(type==="use_item"&&owned(p,payload.id)<=0)return {ok:false,error:"item_missing"};
  if(["attack","skill","flee"].includes(type)&&!encounterTarget(match,p))return {ok:false,error:"no_encounter"};
  if(type==="skill"){
    const sd=COMBAT_SKILL_DEFS[p.charId]||{sp:12,cd:55};
    const cost=Math.max(0,(sd.sp??12)-(p.nextSkillSpDiscount||0));
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    if(p.sp<cost)return {ok:false,error:"not_enough_sp"};
  }
  if(type==="char_action"){
    const d=ACTION_SKILL_DEFS[p.charId];if(!d)return {ok:false,error:"action_missing"};
    if((p.cdAUntil||0)>now)return {ok:false,error:"action_cooldown"};
    if(p.sp<(d.sp||0))return {ok:false,error:"not_enough_sp"};
  }
  if(type==="flee"&&status(p,"bind"))return {ok:false,error:"bound"};
  return {ok:true};
}
export function beginServerAction(match,p,type,payload={},now=Date.now()){
  const v=validateAction(match,p,type,payload,now);if(!v.ok)return v;
  let duration=actionDuration(match,p,type,payload,now),meta=v.meta||{};
  if(type==="move"){duration=(meta.durationMs/1000)*(1+(combinedFx(p,match,now).moveTime||0))}
  p.pendingAction={type,payload,startedAt:now,completeAt:now+duration*1000,meta};
  return {ok:true,action:p.pendingAction};
}
export function completeAction(match,p,now=Date.now()){
  const a=p.pendingAction;if(!a||a.completeAt>now)return null;p.pendingAction=null;
  const type=a.type,x=a.payload||{};let result={ok:true,type};
  if(type==="move"){p.region=x.to;p.sp=Math.max(0,p.sp-(a.meta?.spCost||0));p.nextMoveFree=false;p.encounter=null;result.to=x.to}
  else if(type==="search")result={...result,...searchResult(match,p,now)};
  else if(type==="rest"){p.hp=clamp(p.hp+5*(1+(combinedFx(p,match,now).restHeal||0)),0,maxHp(p,match,now));p.sp=clamp(p.sp+12*(1+(combinedFx(p,match,now).restSp||0)),0,p.maxSp)}
  else if(type==="craft"){result={...result,...craftItem(p,x.id)};p.nextCraftTimeMult=1}
  else if(type==="use_item")result={...result,...useConsumable(match,p,x.id,now)}
  else if(type==="attack"){const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,false,now):attackWild(match,p,t.obj,false,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="skill"){const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,true,now):attackWild(match,p,t.obj,true,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="flee"){result.success=Math.random()<.70;if(result.success)p.encounter=null}
  else if(type==="char_action")result={...result,...charAction(match,p,now)};
  match.corpses=(match.corpses||[]).filter(c=>c.expiresAt>now);
  match.updatedAt=now;updatePassiveTime(match,now);return result;
}
export function resolveEventChoice(match,p,index,now=Date.now()){
  const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);if(!e)return {ok:false,error:"no_event"};
  const choice=e.choices?.[index];if(!choice)return {ok:false,error:"invalid_choice"};
  p.pendingEvent=null;
  // Exact event text is preserved; bespoke mechanical parsing remains intentionally conservative.
  const pool=POOLS[p.region]||[];const rewards=[];
  const count=/2~4|2~3|2개|3개/.test(choice.result)?2:1;
  for(let i=0;i<count&&pool.length;i++){const id=pick(pool);if(addItem(p,id)){rewards.push(id)}}
  if(/HP \+18/.test(choice.result))p.hp=clamp(p.hp+18,0,maxHp(p,match,now));
  if(/HP \+10/.test(choice.result))p.hp=clamp(p.hp+10,0,maxHp(p,match,now));
  if(/SP \+20/.test(choice.result))p.sp=clamp(p.sp+20,0,p.maxSp);
  if(/SP \+18/.test(choice.result))p.sp=clamp(p.sp+18,0,p.maxSp);
  if(/SP \+14/.test(choice.result))p.sp=clamp(p.sp+14,0,p.maxSp);
  if(/SP \+10/.test(choice.result))p.sp=clamp(p.sp+10,0,p.maxSp);
  return {ok:true,eventId:e.id,choiceIndex:index,text:choice.result,rewards};
}
export function lootCorpse(match,p,corpseId,kind,id,now=Date.now()){
  const c=match.corpses.find(x=>x.id===corpseId&&x.region===p.region&&x.expiresAt>now);if(!c)return {ok:false,error:"corpse_missing"};
  if(kind==="mat"){const n=c.mat[id]||0;if(!n)return {ok:false,error:"loot_missing"};p.mat[id]=(p.mat[id]||0)+n;delete c.mat[id];return {ok:true,n}}
  if(kind==="con"){const n=c.con[id]||0;if(!n||!addItem(p,id,n))return {ok:false,error:"inventory_full"};delete c.con[id];return {ok:true,n}}
  if(kind==="eq"){const ix=c.eq.indexOf(id);if(ix<0)return {ok:false,error:"loot_missing"};addItem(p,id);c.eq.splice(ix,1);return {ok:true,n:1}}
  return {ok:false,error:"invalid_loot"};
}
