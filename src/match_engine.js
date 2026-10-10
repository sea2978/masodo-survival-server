import { CHARACTER_BY_ID, ADJACENCY, movementProfile } from "./game_data.js";
import { ITEMS, POOLS, WILD_TEMPLATES, ENCOUNTER_EVENTS } from "./offline_content.js";
import { PASSIVE_FX, COMBAT_SKILL_DEFS, ACTION_SKILL_DEFS, NAMED_GEAR_FX } from "./skill_defs.js";

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const nowSec=(match,now=Date.now())=>Math.max(0,(now-match.startedAt)/1000);
const item=id=>ITEMS[id]||null;
const STATUS_DEFS={
  poison:{duration:8,max:3},bleed:{duration:10,max:3},slow:{duration:6,max:2},bind:{duration:2.5,max:1},
  sleep:{duration:3,max:1},fear:{duration:5,max:1},confusion:{duration:5,max:1},silence:{duration:3,max:1},actionDelay:{duration:3,max:1}
};
const char=p=>CHARACTER_BY_ID.get(p.charId)||CHARACTER_BY_ID.get("c01");
const SPECIAL_ROUTE_REGION={
  special_01:"estate",special_02:"city",special_03:"church",special_04:"mgmt_lab",
  special_05:"mgmt_training",special_06:"mgmt_training",special_07:"mgmt_admin",special_08:"church",
  special_09:"evil_quarters",special_10:"city",special_11:"factory",special_12:"church",
  special_13:"mgmt_training",special_14:"estate",special_15:"mgmt_training",special_16:"estate",
  special_17:"evil_training",special_18:"mgmt_training",special_19:"evil_training",special_20:"estate",
  special_21:"mgmt_training",special_22:"estate",special_23:"factory",special_24:"factory",
  special_25:"church",special_26:"estate",special_27:"mgmt_lab",special_28:"evil_training",
  special_29:"evil_quarters",special_30:"evil_training",special_31:"city",special_32:"mgmt_lab",
  special_33:"church",special_34:"mgmt_lab",special_35:"evil_training",special_36:"evil_quarters",
  special_37:"evil_quarters",special_38:"city",special_39:"evil_training",special_40:"mgmt_lab",
  special_41:"city"
};
function isSpecialMaterial(id){return /^special_\d{2}$/.test(id)&&!!item(id)}
function initUniqueSpecials(){
  const out={};for(let i=1;i<=41;i++){const id="special_"+String(i).padStart(2,"0");out[id]={state:"unspawned",holderId:null,region:null}}return out
}
function specialState(match,id){return match.uniqueSpecials?.[id]||null}
function grantSpecial(match,p,id){
  const s=specialState(match,id);if(!s||s.state!=="unspawned"||(p.mat[id]||0)>0)return false;
  p.mat[id]=(p.mat[id]||0)+1;s.state="held";s.holderId=p.playerId;s.region=null;return true
}
function pickupGroundSpecial(match,p,id){
  const s=specialState(match,id);if(!s||s.state!=="ground"||s.region!==p.region)return false;
  p.mat[id]=(p.mat[id]||0)+1;s.state="held";s.holderId=p.playerId;s.region=null;return true
}
function dropSpecialsFromPlayer(match,p,region=p.region){
  for(const[id,n]of Object.entries(p.mat||{})){if(!isSpecialMaterial(id)||n<=0)continue;p.mat[id]=0;const s=specialState(match,id);if(s&&s.state!=="consumed"){s.state="ground";s.holderId=null;s.region=region}}
}
function markSpecialConsumed(match,id){
  if(!isSpecialMaterial(id))return;const s=specialState(match,id);if(s){s.state="consumed";s.holderId=null;s.region=null}
}
function groundSpecialsInRegion(match,region){return Object.entries(match.uniqueSpecials||{}).filter(([,s])=>s.state==="ground"&&s.region===region).map(([id])=>id)}
function regionSpecialCandidates(match,region){return Object.entries(SPECIAL_ROUTE_REGION).filter(([id,r])=>r===region&&specialState(match,id)?.state==="unspawned").map(([id])=>id)}
function findItemIdByExactName(name){return Object.keys(ITEMS).find(id=>ITEMS[id]?.n===name)||null}


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
    const named=NAMED_GEAR_FX[id];
    if(named)for(const[k,v]of Object.entries(named))if(typeof v==="number")out[k]=(out[k]||0)+v;
    if(id==="aim_terminal"||id==="synergy_01"){out.markHit=(out.markHit||0)+.05;out.trackingDuration=(out.trackingDuration||0)+.20}
    if(id==="camo_mask"||id==="synergy_02"){out.conceal=(out.conceal||0)+.07;out.quietDamage=(out.quietDamage||0)+.04}
    if(id==="toxin_kit"||id==="synergy_03"){out.poisonChance=(out.poisonChance||0)+.06;out.poisonVsDamage=(out.poisonVsDamage||0)+.03}
    if(id==="propulsion"||id==="synergy_04"){out.moveSp=(out.moveSp||0)+1;out.afterMoveHit=(out.afterMoveHit||0)+.04}
    if(id==="plate"||id==="synergy_05"){out.damageTaken=(out.damageTaken||0)-.03;out.lowDef=(out.lowDef||0)+4}
    if(id==="recovery"||id==="synergy_06"){out.consumeHeal=(out.consumeHeal||0)+.08;out.restHeal=(out.restHeal||0)+.05}
    if(id==="spell_amp"||id==="synergy_07"){out.controlDuration=(out.controlDuration||0)+.06;out.statusChance=(out.statusChance||0)+.03}
    if(id==="accel"||id==="synergy_08"){out.prep=(out.prep||0)-.04;out.thirdHit=(out.thirdHit||0)+.03}
    if(id==="trace"||id==="synergy_09"){out.woundedDetect=(out.woundedDetect||0)+.08;out.redetectHit=(out.redetectHit||0)+.04}
    if(id==="detox"||id==="synergy_10"){out.poisonDurationTaken=(out.poisonDurationTaken||0)-.20}
    if(id==="evasion"||id==="synergy_11"){out.fleePrep=(out.fleePrep||0)-.05}
    if(id==="focus"||id==="synergy_12"){out.skillSp=(out.skillSp||0)-.05;out.delayResist=(out.delayResist||0)+.10}
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
  const fx=combinedFx(p,match,now);
  let m=1+(fx.damageTaken||0)+(fx.taken||0);
  if((p.eq||[]).includes("plate")&&p.hp/maxHp(p,match,now)>=.5)m*=.97;
  if(p.tempGuardUntil>now)m*=1-(p.tempGuardRate||0);
  return Math.max(.25,m);
}
function addTemp(p,fx,seconds,now=Date.now()){(p.tempEffects??=[]).push({fx:{...fx},until:now+seconds*1000})}
function scheduleDelayedFx(p,delaySeconds,fx,durationSeconds,now=Date.now()){
  (p.delayedEffects??=[]).push({at:now+delaySeconds*1000,fx:{...fx},duration:durationSeconds});
}
function processDelayedEffects(p,now=Date.now()){
  const remain=[];
  for(const e of p.delayedEffects||[]){
    if(e.at<=now)addTemp(p,e.fx,e.duration||10,now);
    else remain.push(e);
  }
  p.delayedEffects=remain;
}
function foodRepeatMultiplier(p,id,it,now=Date.now()){
  if(it?.kind!=="food")return 1;
  if(p.lastFoodId===id&&now-(p.lastFoodAt||0)<=20000)p.foodRepeatCount=Math.min(2,(p.foodRepeatCount||0)+1);
  else p.foodRepeatCount=0;
  p.lastFoodId=id;p.lastFoodAt=now;
  return p.foodRepeatCount===0 ? 1 : p.foodRepeatCount===1 ? .85 : .70;
}
function removeStatusStacks(p,id,n){
  const s=p.statuses?.[id];if(!s)return 0;
  const removed=Math.min(n,s.stacks||1);s.stacks=(s.stacks||1)-removed;
  if(s.stacks<=0)delete p.statuses[id];
  return removed;
}
function recoverSp(p,amount,match,now=Date.now()){
  const mult=Math.max(.25,1+(combinedFx(p,match,now).spRecovery||0));
  const gained=Math.max(0,amount)*mult;p.sp=clamp(p.sp+gained,0,p.maxSp);return gained;
}
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
function craftItem(match,p,id){
  const it=item(id);if(!it||!canCraft(p,id))return {ok:false,error:"recipe_missing"};
  for(const[k,v]of Object.entries(it.r)){if(!consumeItem(p,k,v))return {ok:false,error:"recipe_race"};if(isSpecialMaterial(k)&&(p.mat[k]||0)<=0)markSpecialConsumed(match,k)}
  if(!addItem(p,id,1))return {ok:false,error:"inventory_full"};
  return {ok:true,itemId:id,itemName:it.n};
}
function status(p,id,now=Date.now()){const s=p.statuses?.[id];return s&&s.until>now?s:null}
function applyStatus(p,id,stacks=1,duration=null,sourceId=null,now=Date.now(),source=null,match=null){
  p.statuses??={};const defn=STATUS_DEFS[id];if(!defn)return false;
  if((p.statusImmunity?.[id]||0)>now)return false;
  const targetFx=match?combinedFx(p,match,now):{};
  if(id==="actionDelay"&&targetFx.delayResist&&Math.random()<targetFx.delayResist)return false;
  let dur=duration??defn.duration;
  if(source&&match&&["slow","bind","sleep","fear","confusion","silence","actionDelay"].includes(id)){
    dur*=1+(combinedFx(source,match,now).controlDuration||0)+(combinedFx(source,match,now).statusDuration||0);
  }
  if(targetFx.incomingStatusDuration)dur*=Math.max(.5,1+targetFx.incomingStatusDuration);
  if(id==="poison"&&targetFx.poisonDurationTaken)dur*=Math.max(.5,1+targetFx.poisonDurationTaken);
  const old=p.statuses[id];
  if(id==="bind"&&old?.until>now){
    old.until=Math.min(now+3500,old.until+1000);
    if(sourceId!=null)old.sourceId=sourceId;
    return true;
  }
  p.statuses[id]={stacks:clamp((old?.until>now?old.stacks:0)+stacks,1,defn.max),until:now+dur*1000,sourceId};
  return true;
}
function wakeOnDamage(p,now=Date.now()){
  if(status(p,"sleep",now)){
    delete p.statuses.sleep;p.statusImmunity??={};p.statusImmunity.sleep=now+12000;
    return true;
  }
  return false;
}
function awardStatusKill(match,victim,sourceId,now){
  const killer=match.players.find(x=>x.playerId===sourceId&&x!==victim&&x.alive);
  const fx=PASSIVE_FX[victim.charId]||{};
  if(fx.revive&&!victim.rev){victim.rev=true;victim.hp=Math.min(18,maxHp(victim,match,now));victim.statuses={};return {revived:true,killerId:killer?.playerId||null}}
  victim.alive=false;victim.encounter=null;
  if(killer){
    killer.kills++;
    const kfx=combinedFx(killer,match,now);
    if(kfx.killHeal)killer.hp=clamp(killer.hp+kfx.killHeal,0,maxHp(killer,match,now));
    if(kfx.killSp)recoverSp(killer,kfx.killSp,match,now);
  }
  createDeathCorpse(match,victim,now);
  return {killed:true,killerId:killer?.playerId||null};
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
  while(p.alive&&p.nextStatusTick+2000<=now){
    p.nextStatusTick+=2000;
    const poison=p.statuses?.poison;
    if(poison?.until>p.nextStatusTick){
      p.hp-=Math.max(1,Math.round(maxHp(p,match,p.nextStatusTick)*.02*(poison.stacks||1)));
      wakeOnDamage(p,p.nextStatusTick);
      if(p.hp<=0){awardStatusKill(match,p,poison.sourceId,p.nextStatusTick);break}
    }
  }
}
export function updatePassiveTime(match,now=Date.now()){
  for(const p of match.players){
    if(!p.alive)continue;
    processDelayedEffects(p,now);cleanseExpired(p,now);updateSatiety(match,p,now);applyStatusTicks(match,p,now);
    p.hp=Math.min(p.hp,maxHp(p,match,now));
  }
  match.elapsed=Math.floor(nowSec(match,now));
}
export function initWorld(match){
  let seq=1;match.wilds=[];
  for(const t of WILD_TEMPLATES)for(const region of t.regions)match.wilds.push({id:"w"+seq++,templateId:t.id,region,hp:t.hp,alive:true,guardReady:t.skill==="guard"});
  match.eventPity={};match.lastEventId=null;match.corpses=[];match.worldLog=[];match.regionTraps={};match.uniqueSpecials=initUniqueSpecials();
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
function detectionPenalty(target,match,now){
  let pen=combinedFx(target,match,now).conceal||0;
  if((target.eq||[]).includes("camo_mask"))pen+=.07;
  if((target.detoxStealthUntil||0)>now)pen+=.03;
  return pen;
}
function detectionBonus(seeker,target,match,now){
  let add=(combinedFx(seeker,match,now).detect||0)+(seeker.nextDetectBonus||0);
  if((seeker.eq||[]).includes("trace")&&target.hp<maxHp(target,match,now))add+=.08;
  if(target.hp<maxHp(target,match,now))add+=combinedFx(seeker,match,now).woundedDetect||0;
  return add;
}
function onTargetDetected(seeker,target,match,now){
  const tid=target.playerId;
  if((seeker.eq||[]).includes("aim_terminal")){
    seeker.trackingMarks??={};
    const dur=24*(1+(combinedFx(seeker,match,now).trackingDuration||0));
    seeker.trackingMarks[tid]=now+dur*1000;
  }
  if((seeker.eq||[]).includes("trace")){
    seeker.redetectReady=seeker.lastDetectedTarget===tid;
    seeker.lastDetectedTarget=tid;
  }
  if((seeker.eq||[]).includes("detox")&&status(target,"poison",now))seeker.detoxStealthUntil=now+20000;
}
function triggerBleedAction(match,p,now){
  const s=status(p,"bleed",now);if(!s||!p.alive)return 0;
  const d=2*(s.stacks||1);p.hp-=d;wakeOnDamage(p,now);
  if(p.hp<=0)awardStatusKill(match,p,s.sourceId,now);
  return d;
}
function attackContext(match,p,target,skill,now){
  const fx=combinedFx(p,match,now),tid=target.playerId||target.id||null;
  const quietReady=((p.eq||[]).includes("camo_mask")||fx.quietDamage)&&now-(p.lastAttackAt||0)>=8000;
  let hitBonus=(p.nextHitBonus||0)+(skill?(fx.skillHit||0):0);
  if((p.eq||[]).includes("aim_terminal")&&tid&&(p.trackingMarks?.[tid]||0)>now)hitBonus+=.05;
  if((p.eq||[]).includes("propulsion")&&p.moveHitReady&&now-(p.lastMoveAt||0)<=8000)hitBonus+=.04;
  if((p.eq||[]).includes("trace")&&p.redetectReady&&p.lastDetectedTarget===tid)hitBonus+=.04;
  if(p.moveHitReady&&now-(p.lastMoveAt||0)<=8000)hitBonus+=fx.afterMoveHit||0;
  const ctx={tid,quietReady,movedRecently:now-(p.lastMoveAt||0)<=8000,hitBonus,actionDamageBonus:p.nextDamageBonus||0,skillDamageBonus:skill?(p.nextSkillDamageBonus||0):0,actionCritBonus:p.nextCritBonus||0};
  p.nextHitBonus=0;p.nextDamageBonus=0;if(skill)p.nextSkillDamageBonus=0;p.nextCritBonus=0;p.lastAttackAt=now;
  if(p.moveHitReady)p.moveHitReady=false;if(p.redetectReady)p.redetectReady=false;
  return ctx;
}
function modifyAttackDamage(match,p,target,d,ctx,now){
  const fx=combinedFx(p,match,now);
  if(p.attackChainTarget===ctx.tid)p.attackChainHits=(p.attackChainHits||0)+1;else{p.attackChainTarget=ctx.tid;p.attackChainHits=1}
  if(p.namedChainTarget===ctx.tid)p.namedChainHits=(p.namedChainHits||0)+1;else{p.namedChainTarget=ctx.tid;p.namedChainHits=1}
  let mult=1+(fx.damage||0)+(ctx.actionDamageBonus||0)+(ctx.skillDamageBonus||0);
  if(ctx.quietReady&&fx.quietDamage)mult*=1+fx.quietDamage;
  if(status(target,"poison",now)&&fx.poisonVsDamage)mult*=1+fx.poisonVsDamage;
  const anyStatus=Object.values(target.statuses||{}).some(s=>s&&s.until>now);
  if(anyStatus&&fx.statusTargetDamage)mult*=1+fx.statusTargetDamage;
  if(ctx.movedRecently&&fx.afterMoveDamage)mult*=1+fx.afterMoveDamage;
  if(p.hp/maxHp(p,match,now)<.4&&fx.lowHpDamage)mult*=1+fx.lowHpDamage;
  if(fx.thirdHit&&p.namedChainHits%3===0)mult*=1+fx.thirdHit;
  if(fx.chainPerHit)mult*=1+Math.min(fx.chainMax||fx.chainPerHit,Math.max(0,p.namedChainHits-1)*fx.chainPerHit);
  if(fx.extraChance&&Math.random()<fx.extraChance)mult*=1+(fx.extraRatio||0);
  return Math.max(1,Math.round(d*mult));
}
function applyOnHitStatuses(match,p,target,now){
  const fx=combinedFx(p,match,now),one=p.nextStatusBonus||{};
  const chance=(key,base)=>clamp(base+(one[key]||0)+(fx.statusChance||0),0,.95);
  for(const[key,id]of [["poison","poison"],["fear","fear"],["slow","slow"],["confusion","confusion"],["bleed","bleed"],["sleep","sleep"],["bind","bind"]]){
    const base=fx[key+"Chance"]||0;if(base&&Math.random()<chance(key,base))applyStatus(target,id,1,id==="poison"?8:id==="bleed"?10:id==="slow"?6:id==="bind"?2.5:id==="sleep"?3:5,p.playerId,now,p,match);
  }
  p.nextStatusBonus={};
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
function createDeathCorpse(match,p,now){
  dropSpecialsFromPlayer(match,p,p.region);
  const corpse={id:"corpse_"+p.playerId+"_"+now,name:p.playerName,region:p.region,eq:[...p.eq],mat:Object.fromEntries(Object.entries(p.mat||{}).filter(([id,n])=>n>0&&!isSpecialMaterial(id))),con:{...p.con},expiresAt:now+75000};
  match.corpses.push(corpse);p.eq=[];p.mat={};p.con={};return corpse;
}
function environmentDeath(match,p,now){
  if(!p.alive)return false;
  const fx=PASSIVE_FX[p.charId]||{};
  if(fx.revive&&!p.rev){p.rev=true;p.hp=Math.min(18,maxHp(p,match,now));p.statuses={};return false}
  p.alive=false;p.encounter=null;createDeathCorpse(match,p,now);return true;
}
function killPlayer(match,a,b,now){
  const fx=PASSIVE_FX[b.charId]||{};
  if(fx.revive&&!b.rev){b.rev=true;b.hp=Math.min(18,maxHp(b,match,now));b.statuses={};return {revived:true}}
  b.alive=false;b.encounter=null;a.kills++;
  createDeathCorpse(match,b,now);
  return {killed:true}
}
function wildCounter(match,p,w,now){
  if(!p.alive||!w.alive)return 0;
  const t=wildTemplate(w),d=wildDamage(p,w,match,now);p.hp-=d;wakeOnDamage(p,now);
  if(t.skill==="bite_bleed"&&Math.random()<.20)applyStatus(p,"bleed",1,10,w.id,now,null,match);
  else if(t.skill==="scan_delay"&&Math.random()<.20)applyStatus(p,"actionDelay",1,3,w.id,now,null,match);
  else if(t.skill==="emp"&&Math.random()<.20)applyStatus(p,"silence",1,3,w.id,now,null,match);
  else if(t.skill==="toxic"&&Math.random()<.30)applyStatus(p,"poison",1,8,w.id,now,null,match);
  else if(t.skill==="chimera_status"&&Math.random()<.30)applyStatus(p,pick(["poison","bleed","slow"]),1,null,w.id,now,null,match);
  else if(t.skill==="phantom_fear"&&Math.random()<.25)applyStatus(p,"fear",1,5,w.id,now,null,match);
  else if(t.skill==="pilfer"&&Math.random()<.20)p.sp=Math.max(0,p.sp-5);
  else if(t.skill==="mana_bite"&&Math.random()<.20)p.sp=Math.max(0,p.sp-8);
  if(p.hp<=0)environmentDeath(match,p,now);
  return d;
}
function attackPlayer(match,p,t,skill=false,now=Date.now()){
  const sd=COMBAT_SKILL_DEFS[p.charId]||{mult:1.08,sp:12,cd:55};
  const ctx=attackContext(match,p,t,skill,now);
  let spCost=0,bonus=ctx.hitBonus,mult=1;
  if(skill){
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    const fx=combinedFx(p,match,now);
    spCost=Math.max(0,(sd.sp??12)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0));
    if(p.sp<spCost)return {ok:false,error:"not_enough_sp"};
    p.sp-=spCost;p.nextSkillSpDiscount=0;p.cdCUntil=now+(sd.cd??55)*1000;bonus+=sd.hit||0;
    mult=sd.multMin!=null?sd.multMin+Math.random()*(sd.multMax-sd.multMin):(sd.mult??1.08);
    if(sd.lowHpMult!=null&&p.hp/maxHp(p,match,now)<.5)mult=sd.lowHpMult;
    if(sd.timeScale)mult*=1+Math.min(.20,Math.floor(nowSec(match,now)/120)*.05);
  }
  if(!hitRoll(p,skill,bonus,match,now)){
    gainProf(p,.5);p.attackChainTarget=t.playerId;p.attackChainHits=0;const bleedDamage=triggerBleedAction(match,p,now);
    return {ok:true,hit:false,damage:0,bleedDamage};
  }

  let d=baseDamage(p,t,match,now)*mult;
  const fx=combinedFx(p,match,now);
  if(skill)d*=1+(fx.skillDamage||0);
  let crit=Math.random()<clamp(.05+(sd.crit||0)+(fx.crit||0)+(ctx.actionCritBonus||0),0,.5);
  if(crit)d*=1.4;
  d=modifyAttackDamage(match,p,t,d,ctx,now);
  t.hp-=d;wakeOnDamage(t,now);gainProf(p,1.5);

  if(skill){
    for(const row of sd.statuses||[]){
      const[id,chance,dur,stacks=1]=row;
      const finalChance=clamp(chance+(fx.statusChance||0),0,.95);
      if(Math.random()<finalChance)applyStatus(t,id,stacks,dur||5,p.playerId,now,p,match);
    }
    if(sd.forcePoison)applyStatus(t,"poison",sd.forcePoison,8,p.playerId,now,p,match);
    if(sd.randomStatus&&Math.random()<.35)applyStatus(t,pick(["poison","bleed","slow"]),1,6,p.playerId,now,p,match);
    if(sd.doubleRandomStatus)for(const id of pick([["poison","bleed"],["poison","slow"],["bleed","slow"]]))if(Math.random()<.5)applyStatus(t,id,1,6,p.playerId,now,p,match);
    if(sd.randomControl&&Math.random()<sd.randomControl)applyStatus(t,pick(["slow","bind","fear","confusion","silence"]),1,5,p.playerId,now,p,match);
    if(sd.heal)p.hp=clamp(p.hp+sd.heal*(1+(fx.heal||0)),0,maxHp(p,match,now));
    if(sd.restoreSp)recoverSp(p,sd.restoreSp,match,now);
    if(sd.drainSp)t.sp=Math.max(0,t.sp-sd.drainSp);
    if(sd.lifesteal)p.hp=clamp(p.hp+d*sd.lifesteal,0,maxHp(p,match,now));
    if(sd.freeMove)p.nextMoveFree=true;
    if(sd.tempGuard){p.tempGuardUntil=now+(sd.tempGuardDuration||8)*1000;p.tempGuardRate=sd.tempGuard}
  }

  applyOnHitStatuses(match,p,t,now);
  const death=t.hp<=0?killPlayer(match,p,t,now):null;
  if(death?.killed){
    const kfx=combinedFx(p,match,now);
    if(kfx.killHeal)p.hp=clamp(p.hp+kfx.killHeal,0,maxHp(p,match,now));
    if(kfx.killSp)recoverSp(p,kfx.killSp,match,now);
  }
  const bleedDamage=triggerBleedAction(match,p,now);
  return {ok:true,hit:true,crit,damage:d,death,bleedDamage};
}
function attackWild(match,p,w,skill=false,now=Date.now()){
  const t=wildTemplate(w),sd=COMBAT_SKILL_DEFS[p.charId]||{mult:1.08,sp:12,cd:55};
  const ctx=attackContext(match,p,w,skill,now);
  let spCost=0,bonus=ctx.hitBonus,mult=1;
  if(skill){
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    const fx=combinedFx(p,match,now);
    spCost=Math.max(0,(sd.sp??12)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0));
    if(p.sp<spCost)return {ok:false,error:"not_enough_sp"};
    p.sp-=spCost;p.nextSkillSpDiscount=0;p.cdCUntil=now+(sd.cd??55)*1000;bonus+=sd.hit||0;
    mult=sd.multMin!=null?sd.multMin+Math.random()*(sd.multMax-sd.multMin):(sd.mult??1.08);
    if(sd.lowHpMult!=null&&p.hp/maxHp(p,match,now)<.5)mult=sd.lowHpMult;
  }
  if(!hitRoll(p,skill,bonus,match,now)){
    gainProf(p,.5);p.attackChainTarget=w.id;p.attackChainHits=0;const bleedDamage=triggerBleedAction(match,p,now);
    return {ok:true,hit:false,damage:0,counter:wildCounter(match,p,w,now),bleedDamage};
  }
  const fx=combinedFx(p,match,now);
  let d=Math.max(1,Math.round(atk(p,match,now)*100/(100+t.def)*mult));
  if(skill)d*=1+(fx.skillDamage||0);
  const crit=Math.random()<clamp(.05+(sd.crit||0)+(fx.crit||0)+(ctx.actionCritBonus||0),0,.5);
  if(crit)d*=1.4;
  d=modifyAttackDamage(match,p,w,d,ctx,now);
  if(t.skill==="guard"&&w.guardReady){w.guardReady=false;d=Math.max(1,Math.round(d*.8))}
  w.hp-=d;gainProf(p,1.5);
  let drop=null,extra=[];
  if(w.hp<=0){
    w.alive=false;w.hp=0;drop=pick(t.drop);addItem(p,drop);
    if(t.skill==="supply_cache")for(let i=0;i<2;i++){const x=pick(t.drop);if(addItem(p,x))extra.push(x)}
    if(fx.killHeal)p.hp=clamp(p.hp+fx.killHeal,0,maxHp(p,match,now));
    if(fx.killSp)recoverSp(p,fx.killSp,match,now);
  }
  const bleedDamage=triggerBleedAction(match,p,now);
  const counter=w.alive&&p.alive?wildCounter(match,p,w,now):0;
  return {ok:true,hit:true,crit,damage:d,killed:!w.alive,drop,extra,counter,bleedDamage};
}
function searchResult(match,p,now){
  p.sp=Math.max(0,p.sp-3);
  const eventChance=Math.min(.12,.05+(match.eventPity[p.region]||0));
  if(Math.random()<eventChance){
    const pool=ENCOUNTER_EVENTS.filter(e=>e.region===p.region&&e.id!==match.lastEventId);
    if(pool.length){const e=pick(pool);match.lastEventId=e.id;match.eventPity[p.region]=0;p.pendingEvent=e.id;return {kind:"event",event:e}}
  } else match.eventPity[p.region]=(match.eventPity[p.region]||0)+.007;
  const ground=groundSpecialsInRegion(match,p.region);
  if(ground.length&&Math.random()<.35){const id=pick(ground);if(pickupGroundSpecial(match,p,id))return {kind:"special",itemId:id,itemName:item(id)?.n||id,source:"ground"}}
  const regional=regionSpecialCandidates(match,p.region);
  if(regional.length&&Math.random()<.035){const id=pick(regional);if(grantSpecial(match,p,id))return {kind:"special",itemId:id,itemName:item(id)?.n||id,source:"search"}}
  const humans=match.players.filter(x=>x!==p&&x.alive&&x.region===p.region);
  if(humans.length){
    const t=pick(humans),detectChance=clamp(.70+detectionBonus(p,t,match,now)-detectionPenalty(t,match,now),.10,.95);
    if(Math.random()<detectChance){
      p.nextDetectBonus=0;
      const trap=match.regionTraps?.[p.region];
      if(trap&&trap.until>now&&trap.ownerId===p.playerId){p.nextHitBonus=(p.nextHitBonus||0)+(trap.hitBonus||0);delete match.regionTraps[p.region]}
      onTargetDetected(p,t,match,now);
      p.encounter={kind:"player",targetId:t.playerId};
      return {kind:"player",target:{playerId:t.playerId,playerName:t.playerName,charId:t.charId,hp:t.hp,maxHp:t.maxHp}};
    }
  }
  const wilds=match.wilds.filter(w=>w.alive&&w.region===p.region&&nowSec(match,now)>=wildTemplate(w).after);
  if(wilds.length&&Math.random()<.50){const w=pick(wilds),t=wildTemplate(w);p.encounter={kind:"wild",wildId:w.id};return {kind:"wild",target:{wildId:w.id,name:t.n,hp:w.hp,maxHp:t.hp,skillText:t.skillText}}}
  const corpse=match.corpses.find(c=>c.region===p.region&&c.expiresAt>now&&(c.eq.length||Object.keys(c.mat).length||Object.keys(c.con).length));
  if(corpse&&Math.random()<.08)return {kind:"corpse",corpse};
  const pool=POOLS[p.region]||[];if(pool.length&&Math.random()<.90){const id=pick(pool);if(addItem(p,id))return {kind:"item",itemId:id,itemName:item(id)?.n||id}}
  return {kind:"nothing"};
}
function useConsumable(match,p,id,now){
  const it=item(id);if(!it||it.t!=="c"||owned(p,id)<=0)return {ok:false,error:"item_missing"};
  const inCombat=!!p.encounter,combat=inCombat?(it.combatEff??.75):1,repeat=foodRepeatMultiplier(p,id,it,now);
  const fx=combinedFx(p,match,now),healMult=repeat*combat*(1+(fx.heal||0)+(fx.consumeHeal||0)),spMult=repeat*combat;
  if(it.heal)p.hp=clamp(p.hp+it.heal*healMult,0,maxHp(p,match,now));
  if(it.sp)recoverSp(p,it.sp*spMult,match,now);
  if(it.sat)p.satiety=clamp(p.satiety+it.sat,0,100);

  if(id==="energy_drink")addTemp(p,{moveSp:1},25,now);
  else if(id==="coffee")addTemp(p,{searchTime:-.05},30,now);
  else if(id==="strong_coffee"){addTemp(p,{actionTime:-.04},30,now);scheduleDelayedFx(p,30,{spRecovery:-.10},20,now)}
  else if(id==="chocolate")addTemp(p,{moveTime:-.05},15,now);
  else if(id==="grilled_meat")addTemp(p,{maxHpFlat:8},30,now);
  else if(id==="warm_soup"){
    for(const sid of["fear","confusion"]){const s=p.statuses?.[sid];if(s&&s.until>now)s.until=now+(s.until-now)*.8}
  }else if(id==="antidote"){
    removeStatusStacks(p,"poison",2);const s=p.statuses?.poison;if(s&&s.until>now)s.until=now+(s.until-now)*.5;
  }else if(id==="bandage")removeStatusStacks(p,"bleed",2);

  if(id==="mint_choco_fish"){
    if(p.charId==="c49")p.satiety=100;
    if(p.charId==="c13"){
      consumeItem(p,id,1);environmentDeath(match,p,now);
      return {ok:true,itemId:id,itemName:it.n,special:"하쿠 특수 반응",dead:!p.alive};
    }
  }
  if(id==="carbonara_mint_fish"&&p.charId==="c49"){
    p.hp=maxHp(p,match,now);p.sp=p.maxSp;p.satiety=100;consumeItem(p,id,1);
    dropSpecialsFromPlayer(match,p,p.region);p.eq=[];
    for(const mid of Object.keys(p.mat||{}))if(!isSpecialMaterial(mid))delete p.mat[mid];
    p.con={};
    if(inCombat)p.encounter=null;
    return {ok:true,itemId:id,itemName:it.n,special:"아바돈 특수 반응"};
  }

  consumeItem(p,id,1);
  if(inCombat){const target=encounterTarget(match,p);if(target?.kind==="wild"&&p.alive)wildCounter(match,p,target.obj,now);p.encounter=null}
  return {ok:true,itemId:id,itemName:it.n,repeatMultiplier:repeat,combatMultiplier:combat};
}
function firstCorpseInRegion(match,p,now){return (match.corpses||[]).find(c=>c.region===p.region&&c.expiresAt>now)}
function removeAnyStatus(p,n=1,now=Date.now()){
  let removed=0;
  for(const id of Object.keys(p.statuses||{})){if(removed>=n)break;const s=p.statuses[id];if(s&&s.until>now){delete p.statuses[id];removed++}}
  return removed;
}
function charAction(match,p,now){
  const d=ACTION_SKILL_DEFS[p.charId];if(!d)return {ok:false,error:"action_missing"};
  if((p.cdAUntil||0)>now)return {ok:false,error:"action_cooldown"};
  p.cdAUntil=now+(d.cd||45)*1000;

  if(d.heal)p.hp=clamp(p.hp+d.heal,0,maxHp(p,match,now));
  if(d.sp)recoverSp(p,d.sp,match,now);
  if(d.selfDamage){p.hp-=d.selfDamage;if(p.hp<=0){environmentDeath(match,p,now);return {ok:true,selfDeath:!p.alive}}}
  if(d.tempFx)addTemp(p,d.tempFx,d.duration||20,now);
  if(d.nextDetect)p.nextDetectBonus=(p.nextDetectBonus||0)+d.nextDetect;
  if(d.nextSearch)p.nextSearchLootBonus=(p.nextSearchLootBonus||0)+d.nextSearch;
  if(d.nextHit)p.nextHitBonus=(p.nextHitBonus||0)+d.nextHit;
  if(d.nextDamage){
    if(d.skillOnlyDamage)p.nextSkillDamageBonus=(p.nextSkillDamageBonus||0)+d.nextDamage;
    else p.nextDamageBonus=(p.nextDamageBonus||0)+d.nextDamage;
  }
  if(d.nextCrit)p.nextCritBonus=(p.nextCritBonus||0)+d.nextCrit;
  if(d.nextStatus)p.nextStatusBonus={...(p.nextStatusBonus||{}),...d.nextStatus};
  if(d.nextSkillSpDiscount)p.nextSkillSpDiscount=Math.max(p.nextSkillSpDiscount||0,d.nextSkillSpDiscount);
  if(d.nextCraftTimeMult)p.nextCraftTimeMult=Math.min(p.nextCraftTimeMult||1,d.nextCraftTimeMult);
  if(d.nextMoveFree)p.nextMoveFree=true;

  if(d.cleanseAny)removeAnyStatus(p,d.cleanseAny,now);
  if(d.cleanse){
    let n=d.cleanseCount||1;
    for(const id of d.cleanse){if(n<=0)break;const s=p.statuses?.[id];if(s&&s.until>now){delete p.statuses[id];n--}}
  }
  if(d.cleanseSpecific)for(const[id,n]of Object.entries(d.cleanseSpecific))removeStatusStacks(p,id,n);

  if(d.material)p.mat[d.material]=(p.mat[d.material]||0)+(d.materialQty||1);
  if(d.consumable)addItem(p,d.consumable,1);
  if(d.randomMetal){const id=Math.random()<.65?"iron":"steel";p.mat[id]=(p.mat[id]||0)+1}

  if(d.corpseHeal||d.consumeCorpse){
    const corpse=firstCorpseInRegion(match,p,now);
    if(corpse){
      p.hp=clamp(p.hp+(d.corpseHeal||0),0,maxHp(p,match,now));
      if(d.consumeCorpse)match.corpses.splice(match.corpses.indexOf(corpse),1);
    }else{
      if(d.noCorpseSp)recoverSp(p,d.noCorpseSp,match,now);
      if(d.noCorpseHeal)p.hp=clamp(p.hp+d.noCorpseHeal,0,maxHp(p,match,now));
    }
  }

  if(d.healIfRevUsed&&p.rev)p.hp=clamp(p.hp+d.healIfRevUsed,0,maxHp(p,match,now));
  if(d.reduceCombatCd)p.cdCUntil=Math.max(now,(p.cdCUntil||now)-d.reduceCombatCd*1000);
  if(d.refundActionCd)p.cdAUntil=Math.max(now,p.cdAUntil-d.refundActionCd*1000);
  if(d.luckAction){
    const r=Math.random();
    if(r<.34)p.hp=clamp(p.hp+10,0,maxHp(p,match,now));
    else if(r<.67)recoverSp(p,12,match,now);
    else p.nextCritBonus=(p.nextCritBonus||0)+.08;
  }
  if(d.trap){
    match.regionTraps??={};
    match.regionTraps[p.region]={ownerId:p.playerId,until:now+45000,hitBonus:.08};
  }
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
  sec*=Math.max(.65,1+(combinedFx(p,match,now).actionTime||0));
  if(status(p,"actionDelay",now))sec*=1.25;
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
    const fx=combinedFx(p,match,now),cost=Math.max(0,(sd.sp??12)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0));
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    if(p.sp<cost)return {ok:false,error:"not_enough_sp"};
  }
  if(type==="char_action"){
    const d=ACTION_SKILL_DEFS[p.charId];if(!d)return {ok:false,error:"action_missing"};
    if((p.cdAUntil||0)>now)return {ok:false,error:"action_cooldown"};
  }
  if(type==="flee"&&status(p,"bind"))return {ok:false,error:"bound"};
  return {ok:true};
}
export function beginServerAction(match,p,type,payload={},now=Date.now()){
  const v=validateAction(match,p,type,payload,now);if(!v.ok)return v;
  let duration=actionDuration(match,p,type,payload,now),meta=v.meta||{};
  if(type==="move"){const slow=status(p,"slow",now)?.stacks||0;const slowMult=slow>=2?1.25:slow===1?1.15:1;duration=(meta.durationMs/1000)*slowMult*(1+(combinedFx(p,match,now).moveTime||0))}
  if(type==="flee"){const slow=status(p,"slow",now)?.stacks||0;duration*=slow>=2?1.25:slow===1?1.15:1;if(status(p,"fear",now))duration*=1.10}
  p.pendingAction={type,payload,startedAt:now,completeAt:now+duration*1000,meta};
  return {ok:true,action:p.pendingAction};
}
export function completeAction(match,p,now=Date.now()){
  const a=p.pendingAction;if(!a||a.completeAt>now)return null;p.pendingAction=null;
  const type=a.type,x=a.payload||{};let result={ok:true,type};
  if(type==="move"){p.region=x.to;p.sp=Math.max(0,p.sp-(a.meta?.spCost||0));p.lastMoveAt=now;const fx=combinedFx(p,match,now);p.moveHitReady=(p.eq||[]).includes("propulsion")||!!(fx.afterMoveHit||fx.afterMoveDamage);p.nextMoveFree=false;p.encounter=null;result.to=x.to;result.bleedDamage=triggerBleedAction(match,p,now)}
  else if(type==="search")result={...result,...searchResult(match,p,now)};
  else if(type==="rest"){const fx=combinedFx(p,match,now);p.hp=clamp(p.hp+5*(1+(fx.restHeal||0)),0,maxHp(p,match,now));recoverSp(p,12*(1+(fx.restSp||0)),match,now)}
  else if(type==="craft"){result={...result,...craftItem(match,p,x.id)};p.nextCraftTimeMult=1}
  else if(type==="use_item")result={...result,...useConsumable(match,p,x.id,now)}
  else if(type==="attack"){const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,false,now):attackWild(match,p,t.obj,false,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="skill"){const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,true,now):attackWild(match,p,t.obj,true,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="flee"){result.success=Math.random()<.70;if(result.success){p.encounter=null;if((p.eq||[]).includes("evasion"))p.nextMoveFree=true}}
  else if(type==="char_action")result={...result,...charAction(match,p,now)};
  match.corpses=(match.corpses||[]).filter(c=>c.expiresAt>now);
  match.updatedAt=now;updatePassiveTime(match,now);return result;
}
export function resolveEventChoice(match,p,index,now=Date.now()){
  const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);if(!e)return {ok:false,error:"no_event"};
  const choice=e.choices?.[index];if(!choice)return {ok:false,error:"invalid_choice"};
  p.pendingEvent=null;const text=choice.result||"",rewards=[];
  for(const m of text.matchAll(/HP\s*([+-])\s*(\d+)/g)){const n=+m[2]*(m[1]==="-"?-1:1);p.hp=clamp(p.hp+n,0,maxHp(p,match,now))}
  for(const m of text.matchAll(/SP\s*([+-])\s*(\d+)/g)){const n=+m[2]*(m[1]==="-"?-1:1);p.sp=clamp(p.sp+n,0,p.maxSp)}
  const names=(e.special||"").split("/").map(x=>x.trim()).filter(Boolean);
  const specialIds=names.map(findItemIdByExactName).filter(id=>id&&text.includes(item(id)?.n||""));
  if(specialIds.length){
    const guaranteed=!/판정|확률/.test(text),boost=/크게 상승|상승|증가/.test(text),chance=guaranteed ? 1 : (boost ? .78 : .55);
    if(Math.random()<chance){
      const valid=specialIds.filter(id=>specialState(match,id)?.state==="unspawned");
      if(valid.length){const id=pick(valid);if(grantSpecial(match,p,id))rewards.push(id)}
    }
  }
  let count=1;const range=text.match(/(\d+)~(\d+)개/);if(range)count=Math.floor(+range[1]+Math.random()*(+range[2]-+range[1]+1));else{const n=text.match(/(\d+)개/);if(n)count=+n[1]}
  const exact=Object.entries(ITEMS).filter(([id,it])=>!isSpecialMaterial(id)&&it?.n&&text.includes(it.n)).sort((a,b)=>b[1].n.length-a[1].n.length);
  const used=new Set();
  for(const[id,it]of exact){if([...used].some(n=>n.includes(it.n)||it.n.includes(n)))continue;for(let i=0;i<Math.min(count,3);i++)if(addItem(p,id)){rewards.push(id);used.add(it.n)}}
  const pool=POOLS[p.region]||[];
  if(!rewards.length&&/일반재료|고급재료|재료|음식|음료|약품|배터리|전자부품|기계부품|정밀부품/.test(text)){
    for(let i=0;i<Math.min(count,3)&&pool.length;i++){const id=pick(pool);if(addItem(p,id))rewards.push(id)}
  }
  if(/독성 상태|중독/.test(text))applyStatus(p,"poison",1,8,null,now);
  for(const[ko,id]of[["혼란","confusion"],["공포","fear"],["수면","sleep"]]){const m=text.match(new RegExp(ko+"\\s*(\\d+)초"));if(m)applyStatus(p,id,1,+m[1],null,now)}
  if(/공포·혼란 지속시간 -20%/.test(text)){for(const id of["fear","confusion"]){const s=p.statuses?.[id];if(s&&s.until>now)s.until=now+(s.until-now)*.8}}
  if(/다음.*제작시간 -50%/.test(text))p.nextCraftTimeMult=Math.min(p.nextCraftTimeMult||1,.5);
  if(/다음.*제작시간 -20%/.test(text))p.nextCraftTimeMult=Math.min(p.nextCraftTimeMult||1,.8);
  return {ok:true,eventId:e.id,choiceIndex:index,text,rewards};
}
export function lootCorpse(match,p,corpseId,kind,id,now=Date.now()){
  const c=match.corpses.find(x=>x.id===corpseId&&x.region===p.region&&x.expiresAt>now);if(!c)return {ok:false,error:"corpse_missing"};
  if(kind==="mat"){const n=c.mat[id]||0;if(!n)return {ok:false,error:"loot_missing"};p.mat[id]=(p.mat[id]||0)+n;delete c.mat[id];return {ok:true,n}}
  if(kind==="con"){const n=c.con[id]||0;if(!n||!addItem(p,id,n))return {ok:false,error:"inventory_full"};delete c.con[id];return {ok:true,n}}
  if(kind==="eq"){const ix=c.eq.indexOf(id);if(ix<0)return {ok:false,error:"loot_missing"};addItem(p,id);c.eq.splice(ix,1);return {ok:true,n:1}}
  return {ok:false,error:"invalid_loot"};
}


function aiHpRatio(match,p,now){return p.hp/Math.max(1,maxHp(p,match,now))}
function aiSpRatio(p){return p.sp/Math.max(1,p.maxSp)}
function aiHasBadStatus(p,now){return ["poison","bleed","fear","confusion","slow"].some(id=>status(p,id,now))}
function aiBestHeal(p){
  const ids=Object.keys(p.con||{}).filter(id=>(p.con[id]||0)>0);
  if((p.statuses?.poison?.stacks||0)>0&&ids.includes("antidote"))return"antidote";
  if((p.statuses?.bleed?.stacks||0)>0&&ids.includes("bandage"))return"bandage";
  return ids.filter(id=>item(id)?.heal).sort((a,b)=>(item(b)?.heal||0)-(item(a)?.heal||0))[0]||null
}
function aiChooseCraft(p){
  const craftables=Object.keys(ITEMS).filter(id=>canCraft(p,id));
  if(!craftables.length)return null;
  const score=id=>{
    const it=item(id);let s=(it?.atk||0)+(it?.def||0)*.8;
    if(it?.t==="c")s=(it.heal||0)*.6+(it.sp||0)*.3;
    if(it?.t==="m")s=.1;
    if(it?.tier==="최종")s+=50;else if(it?.tier==="준최종")s+=28;else if(it?.tier==="희귀 시너지")s+=18;else if(it?.tier==="희귀")s+=10;
    return s
  };
  return craftables.sort((x,y)=>score(y)-score(x))[0]
}
function sameRegion(match,region){return match.players.filter(x=>x.alive&&x.region===region)}
function aiMoveChoice(match,p){
  const opts=(ADJACENCY[p.region]||[]);if(!opts.length)return null;
  let best=opts[0],bestScore=-Infinity;
  for(const r of opts){
    let s=Math.random()*.2,pool=POOLS[r]||[];
    if(p.ai==="craft")s+=pool.filter(id=>item(id)?.t==="m").length*.04;
    if(p.ai==="safe")s-=sameRegion(match,r).length*.25;
    if(p.ai==="aggro")s+=sameRegion(match,r).length*.18;
    if(r==="city")s+=.05;
    if(s>bestScore){bestScore=s;best=r}
  }
  return best
}
function aiSkillUtility(match,p,target,now){
  const d=COMBAT_SKILL_DEFS[p.charId]||{},cost=Math.max(0,(d.sp??12)-(p.nextSkillSpDiscount||0));
  if((p.cdCUntil||0)>now||p.sp<cost||status(p,"silence",now)||status(p,"sleep",now))return-99;
  let score=.35,mult=d.multMax??d.mult??1.08;
  if(mult>=1.3)score+=.35;
  if(d.statuses?.length||d.forcePoison||d.randomControl||d.randomStatus||d.doubleRandomStatus)score+=.35;
  if(d.heal&&aiHpRatio(match,p,now)<.60)score+=.50;
  if(d.lifesteal&&aiHpRatio(match,p,now)<.60)score+=.45;
  if(d.drainSp&&target.kind==="player"&&aiSpRatio(target.obj)>.35)score+=.20;
  if(target.kind==="player"&&target.obj.hp/Math.max(1,maxHp(target.obj,match,now))<.35)score+=.55;
  if(target.kind==="wild"&&target.obj.hp/Math.max(1,wildTemplate(target.obj).hp)<.35)score+=.30;
  if(aiSpRatio(p)<.25)score-=.55;
  if(p.ai==="aggro")score+=.25;
  if(p.ai==="safe"&&aiSpRatio(p)<.45)score-=.20;
  return score
}
function aiShouldAvoidFight(match,p,target,now){
  if(target.kind==="wild")return aiHpRatio(match,p,now)<.22&&target.obj.hp/Math.max(1,wildTemplate(target.obj).hp)>.45;
  const t=target.obj,ownPower=atk(p,match,now)+def(p,match,now)*.7+(p.hp/maxHp(p,match,now)*100)*.12;
  const foePower=atk(t,match,now)+def(t,match,now)*.7+(t.hp/maxHp(t,match,now)*100)*.12;
  let threshold=p.ai==="aggro" ? .62 : p.ai==="safe" ? .92 : .78;
  if(aiHpRatio(match,p,now)<.28)threshold+=.25;
  return ownPower<foePower*threshold
}
function aiResolveEncounter(match,p,target,now){
  if(!p.alive||!target)return;
  if(aiShouldAvoidFight(match,p,target,now)){p.encounter=null;return}
  const skillScore=aiSkillUtility(match,p,target,now),useSkill=target.kind==="player"?(skillScore>.85||(skillScore>.45&&Math.random()<.45)):(skillScore>.90||(skillScore>.50&&Math.random()<.35));
  if(target.kind==="player")attackPlayer(match,p,target.obj,useSkill,now);
  else attackWild(match,p,target.obj,useSkill,now);
  p.encounter=null;
}
function aiActionUtility(match,p,now){
  if((p.cdAUntil||0)>now||p.encounter||status(p,"sleep",now))return 0;
  const d=ACTION_SKILL_DEFS[p.charId]||{};let score=.10;
  if(d.heal)score+=Math.max(0,1-aiHpRatio(match,p,now))*(d.heal/8);
  if(d.sp)score+=Math.max(0,1-aiSpRatio(p))*(d.sp/10);
  if((d.cleanse||d.cleanseAny||d.cleanseSpecific)&&aiHasBadStatus(p,now))score+=1.2;
  if(d.material||d.randomMetal||d.consumable)score+=p.ai==="craft" ? .65 : .22;
  if(d.nextDetect||d.tempFx?.detect)score+=p.ai==="aggro" ? .55 : .25;
  if(d.nextMoveFree||d.tempFx?.moveTime||d.tempFx?.moveSp)score+=aiSpRatio(p)<.35 ? .65 : .20;
  if(d.reduceCombatCd&&(p.cdCUntil||0)>now+10000)score+=.65;
  if(d.selfDamage&&aiHpRatio(match,p,now)<.35)score-=1.5;
  return score
}
function aiShouldUseAction(match,p,now){const u=aiActionUtility(match,p,now);return u>1.05||(u>.55&&Math.random()<.40)}
function aiLootCorpse(match,p,now){
  const c=(match.corpses||[]).find(c=>c.region===p.region&&c.expiresAt>now&&(c.eq.length||Object.keys(c.mat).length||Object.keys(c.con).length));
  if(!c)return false;
  for(const[id,n]of Object.entries(c.mat||{})){p.mat[id]=(p.mat[id]||0)+n;delete c.mat[id]}
  const consumables=Object.entries(c.con||{}).sort((a,b)=>(item(b[0])?.heal||0)-(item(a[0])?.heal||0));
  for(const[id,n]of consumables){if(addItem(p,id,n))delete c.con[id]}
  for(const id of [...c.eq]){
    const candidate=item(id),candidateScore=(candidate?.atk||0)+(candidate?.def||0);
    if(p.eq.length<3){addItem(p,id);c.eq.splice(c.eq.indexOf(id),1);continue}
    let wi=0,ws=Infinity;for(let i=0;i<p.eq.length;i++){const q=item(p.eq[i]),s=(q?.atk||0)+(q?.def||0);if(s<ws){ws=s;wi=i}}
    if(candidateScore>ws){p.eq.splice(wi,1,id);c.eq.splice(c.eq.indexOf(id),1)}
  }
  return true
}
export function runAIStep(match,p,now=Date.now()){
  if(!p?.isAI||!p.alive||p.pendingAction||status(p,"sleep",now))return false;
  if(status(p,"actionDelay",now)&&Math.random()<.25)return false;
  if(p.pendingEvent){const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);if(e?.choices?.length)resolveEventChoice(match,p,Math.floor(Math.random()*e.choices.length),now);else p.pendingEvent=null;return true}
  if(p.encounter){aiResolveEncounter(match,p,encounterTarget(match,p),now);return true}
  if((match.corpses||[]).some(c=>c.region===p.region&&c.expiresAt>now)&&Math.random()<(p.ai==="craft" ? .28 : .16)){if(aiLootCorpse(match,p,now))return true}
  const heal=aiBestHeal(p);if(heal&&(aiHpRatio(match,p,now)<.48||aiHasBadStatus(p,now))){useConsumable(match,p,heal,now);return true}
  if(aiShouldUseAction(match,p,now)){const r=charAction(match,p,now);if(r.ok)return true}
  const craftId=aiChooseCraft(p);if(craftId&&((p.ai==="craft"&&Math.random()<.65)||Math.random()<.18)){if(craftItem(match,p,craftId).ok)return true}
  const crowded=sameRegion(match,p.region).length-1;
  if(!status(p,"bind",now)&&p.ai==="safe"&&crowded>0&&aiHpRatio(match,p,now)<.65){
    const to=aiMoveChoice(match,p);if(to){const mv=movementProfile(p.region,to),cost=p.nextMoveFree?0:Math.max(0,mv.spCost-(combinedFx(p,match,now).moveSp||0));if(p.sp>=cost){p.region=to;p.sp-=cost;p.nextMoveFree=false;return true}}
  }
  let searchChance=.58;if(p.ai==="aggro")searchChance=.76;if(p.ai==="craft")searchChance=.68;if(p.ai==="safe"&&aiHpRatio(match,p,now)<.45)searchChance=.38;
  if(p.sp>=3&&Math.random()<searchChance){
    const result=searchResult(match,p,now);
    if(result.kind==="player"||result.kind==="wild")aiResolveEncounter(match,p,encounterTarget(match,p),now);
    else if(result.kind==="event"&&p.pendingEvent){const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);if(e?.choices?.length)resolveEventChoice(match,p,Math.floor(Math.random()*e.choices.length),now)}
    return true
  }
  if(!status(p,"bind",now)){const to=aiMoveChoice(match,p);if(to){const mv=movementProfile(p.region,to),cost=p.nextMoveFree?0:Math.max(0,mv.spCost-(combinedFx(p,match,now).moveSp||0));if(p.sp>=cost){p.region=to;p.sp-=cost;p.nextMoveFree=false;return true}}}
  return false
}
export function runAITick(match,now=Date.now()){
  updatePassiveTime(match,now);let changed=false;
  for(const p of match.players){
    if(!p.isAI||!p.alive)continue;
    if(Math.random()<.34)changed=runAIStep(match,p,now)||changed;
  }
  match.nextAiTickAt=now+1000;
  if(changed)match.updatedAt=now;
  return changed
}
