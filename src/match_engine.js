import { CHARACTER_BY_ID, ADJACENCY, movementProfile } from "./game_data.js";
import { ITEMS, POOLS, WILD_TEMPLATES, ENCOUNTER_EVENTS } from "./offline_content.js";
import { PASSIVE_FX, COMBAT_SKILL_DEFS, ACTION_SKILL_DEFS, NAMED_GEAR_FX } from "./skill_defs.js";

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const nowSec=(match,now=Date.now())=>Math.max(0,(now-match.startedAt+(match.timeOffsetMs||0))/1000);
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
const SPECIAL_OWNER_CHAR={
  special_01:"c01",special_02:"c02",special_03:"c03",special_04:"c04",special_05:"c05",special_06:"c06",
  special_07:"c07",special_08:"c08",special_09:"c09",special_10:"c10",special_11:"c11",special_12:"c12",
  special_13:"c13",special_14:"c14",special_15:"c15",special_16:"c16",special_17:"c17",special_18:"c18",
  special_19:"c19",special_20:"c20",special_21:"c21",special_22:"c22",special_23:"c23",special_24:"c24",
  special_25:"c25",special_26:"c26",special_27:"c27",
  special_28:"c37",special_29:"c38",special_30:"c39",special_31:"c40",special_32:"c41",special_33:"c42",
  special_34:"c43",special_35:"c44",special_36:"c45",special_37:"c46",special_38:"c47",special_39:"c48",
  special_40:"c49",special_41:"c50"
};
function linkedSpecialForChar(charId){return Object.keys(SPECIAL_OWNER_CHAR).find(id=>SPECIAL_OWNER_CHAR[id]===charId)||null}

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


function noiseSpec(level){
  if(level==="높음"||level==="큼")return{level:"높음",detect:.12,duration:20};
  if(level==="중간")return{level:"중간",detect:.06,duration:12};
  if(level==="낮음")return{level:"낮음",detect:.03,duration:7};
  return null;
}
function recordNoise(match,p,level,source,now=Date.now()){
  const spec=noiseSpec(level);if(!spec)return null;
  match.noises??=[];
  const row={id:"noise_"+p.playerId+"_"+now,playerId:p.playerId,playerName:p.playerName,region:p.region,level:spec.level,detect:spec.detect,source,createdAt:now,expiresAt:now+spec.duration*1000};
  match.noises.push(row);
  match.noises=match.noises.filter(x=>x.expiresAt>now).slice(-40);
  return row;
}
function eventNoiseLevel(ev,text){
  if(/소음 없음/.test(text))return null;
  if(/소음 큼/.test(text))return"높음";
  if(/소음 중간/.test(text))return"중간";
  if(/소음 낮음/.test(text))return"낮음";
  return ["높음","중간","낮음"].includes(ev?.noise)?ev.noise:null;
}
function activeNoiseFor(match,p,now=Date.now()){
  return (match.noises||[]).filter(x=>x.playerId===p.playerId&&x.region===p.region&&x.expiresAt>now).sort((a,b)=>b.detect-a.detect)[0]||null;
}
function nearbyNoiseFor(match,p,now=Date.now()){
  const adjacent=new Set(ADJACENCY[p.region]||[]);
  return (match.noises||[]).filter(x=>x.playerId!==p.playerId&&x.expiresAt>now&&(x.region===p.region||adjacent.has(x.region))).sort((a,b)=>b.createdAt-a.createdAt).slice(0,6).map(x=>({...x,regionName:regionName(x.region)}));
}
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
    if(id==="toxin_kit"||id==="synergy_03"){}
    if(id==="propulsion"||id==="synergy_04"){out.moveSp=(out.moveSp||0)+1}
    if(id==="plate"||id==="synergy_05"){out.lowDef=(out.lowDef||0)+4}
    if(id==="spell_amp"||id==="synergy_07"){out.statusChance=(out.statusChance||0)+.03}
    if(id==="accel"||id==="synergy_08"){}
    if(id==="focus"||id==="synergy_12"){out.delayResist=(out.delayResist||0)+.10}
  }
  return out;
}
function maxHp(p,match,now=Date.now()){return Math.max(1,p.maxHp+(tempFx(p,match,now).maxHpFlat||0))}
function equipmentAtk(p){return (p.eq||[]).reduce((s,id)=>s+(item(id)?.atk||0),0)}
function equipmentDef(p){return (p.eq||[]).reduce((s,id)=>s+(item(id)?.def||0),0)}
function atk(p,match,now=Date.now()){
  let v=char(p).baseAtk+equipmentAtk(p),fx=combinedFx(p,match,now);
  if(fx.timeAtk&&fx.timeAtkEvery)v+=Math.min(fx.timeAtkCap??Infinity,Math.floor(nowSec(match,now)/fx.timeAtkEvery)*fx.timeAtk);
  return v;
}
function def(p,match,now=Date.now()){
  let v=char(p).baseDef+equipmentDef(p);
  const fx=combinedFx(p,match,now);
  v+=fx.defFlat||0;
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
  if(it.t==="e"&&it.weaponType){match.craftStats??={};match.craftStats[it.weaponType]=(match.craftStats[it.weaponType]||0)+1}
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
    if((source.eq||[]).includes("spell_amp"))dur*=1.06;
    dur*=1+(combinedFx(source,match,now).statusDuration||0);
  }
  if(targetFx.incomingStatusDuration)dur*=Math.max(.5,1+targetFx.incomingStatusDuration);
  if(id==="poison"&&(p.eq||[]).includes("detox"))dur*=.80;
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
  victim.alive=false;victim.encounter=null;victim.pendingAction=null;
  if(killer){
    killer.kills++;
    const linked=linkedSpecialForChar(victim.charId);
    if(linked&&specialState(match,linked)?.state==="unspawned")grantSpecial(match,killer,linked);
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
  match.noises=(match.noises||[]).filter(x=>x.expiresAt>now);
  match.elapsed=Math.floor(nowSec(match,now));
}
export function initWorld(match){
  let seq=1;match.wilds=[];
  for(const t of WILD_TEMPLATES)for(const region of t.regions)match.wilds.push({id:"w"+seq++,templateId:t.id,region,hp:t.hp,alive:true,guardReady:t.skill==="guard"});
  match.eventPity={};match.lastEventId=null;match.corpses=[];match.worldLog=[];match.regionTraps={};match.noises=[];match.battleLog=[];match.craftStats={};match.uniqueSpecials=initUniqueSpecials();
}
function wildTemplate(w){return WILD_TEMPLATES.find(x=>x.id===w.templateId)}
function playerById(match,id){return match.players.find(p=>p.playerId===id)}
function encounterTarget(match,p){
  const e=p.encounter;if(!e)return null;
  if(e.kind==="player"){const t=playerById(match,e.targetId);return t?.alive&&t.region===p.region?{kind:"player",obj:t}:null}
  const w=match.wilds.find(x=>x.id===e.wildId);return w?.alive&&w.region===p.region?{kind:"wild",obj:w}:null
}
function activeWeaponType(p){
  let best=null,bestAtk=-1;
  for(const id of p.eq||[]){const it=item(id);if(!it?.weaponType)continue;const score=it.atk||0;if(score>bestAtk){best=it;bestAtk=score}}
  return best?.weaponType||"맨손";
}
function profHit(p){
  const xp=p.proficiency?.[activeWeaponType(p)]||0;
  return xp>=160 ? .14 : xp>=115 ? .12 : xp>=80 ? .10 : xp>=55 ? .08 : xp>=35 ? .06 : xp>=20 ? .04 : xp>=10 ? .02 : 0;
}
function gainProf(p,n,match,now=Date.now()){
  if(!p.alive||n<=0)return;
  const type=activeWeaponType(p),mult=Math.max(.25,1+(PASSIVE_FX[p.charId]?.profGain||0)+(tempFx(p,match,now).profGain||0));
  p.proficiency[type]=(p.proficiency[type]||0)+n*mult;
}
function detectionPenalty(target,match,now){
  let pen=combinedFx(target,match,now).conceal||0;
  if((target.eq||[]).includes("camo_mask"))pen+=.07;
  if((target.detoxStealthUntil||0)>now)pen+=.03;
  return pen;
}
function detectionBonus(seeker,target,match,now){
  let add=(combinedFx(seeker,match,now).detect||0)+(seeker.nextDetectBonus||0);
  add+=activeNoiseFor(match,target,now)?.detect||0;
  if((seeker.eq||[]).includes("trace")&&target.hp<maxHp(target,match,now))add+=.08;
  if(target.hp<maxHp(target,match,now))add+=combinedFx(seeker,match,now).woundedDetect||0;
  return add;
}
function onTargetDetected(seeker,target,match,now){
  const tid=target.playerId;
  if((seeker.eq||[]).includes("aim_terminal")){
    seeker.trackingMarks??={};
    seeker.trackingMarks[tid]=now+24000;
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
  const ctx={tid,quietReady,movedRecently:now-(p.lastMoveAt||0)<=8000,hitBonus,actionDamageBonus:p.nextDamageBonus||0,skillDamageBonus:0,actionCritBonus:p.nextCritBonus||0};
  p.nextHitBonus=0;p.nextDamageBonus=0;p.nextCritBonus=0;p.lastAttackAt=now;
  if(p.moveHitReady)p.moveHitReady=false;if(p.redetectReady)p.redetectReady=false;
  return ctx;
}
function modifyAttackDamage(match,p,target,d,ctx,now){
  const fx=combinedFx(p,match,now);
  if(p.attackChainTarget===ctx.tid)p.attackChainHits=(p.attackChainHits||0)+1;else{p.attackChainTarget=ctx.tid;p.attackChainHits=1}
  if(p.namedChainTarget===ctx.tid)p.namedChainHits=(p.namedChainHits||0)+1;else{p.namedChainTarget=ctx.tid;p.namedChainHits=1}
  let mult=1+(fx.damage||0)+(ctx.actionDamageBonus||0);
  if(ctx.quietReady&&(p.eq||[]).includes("camo_mask"))mult*=1.04;
  if(ctx.quietReady&&fx.quietDamage)mult*=1+fx.quietDamage;
  if((p.eq||[]).includes("toxin_kit")&&status(target,"poison",now))mult*=1.03;
  if(status(target,"poison",now)&&fx.poisonVsDamage)mult*=1+fx.poisonVsDamage;
  const anyStatus=Object.values(target.statuses||{}).some(s=>s&&s.until>now);
  if(anyStatus&&fx.statusTargetDamage)mult*=1+fx.statusTargetDamage;
  if(ctx.movedRecently&&fx.afterMoveDamage)mult*=1+fx.afterMoveDamage;
  if(p.hp/maxHp(p,match,now)<.4&&fx.lowHpDamage)mult*=1+fx.lowHpDamage;
  if((p.eq||[]).includes("accel")&&p.attackChainHits>=3){mult*=1.03;p.attackChainHits=0}
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
  if(status(p,"fear",now))chance-=.08;if(skill&&status(p,"confusion",now))chance-=.06;
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
  p.alive=false;p.encounter=null;p.pendingAction=null;createDeathCorpse(match,p,now);return true;
}
function killPlayer(match,a,b,now){
  const fx=PASSIVE_FX[b.charId]||{};
  if(fx.revive&&!b.rev){b.rev=true;b.hp=Math.min(18,maxHp(b,match,now));b.statuses={};return {revived:true}}
  b.alive=false;b.encounter=null;b.pendingAction=null;a.kills++;
  const linked=linkedSpecialForChar(b.charId);
  if(linked&&specialState(match,linked)?.state==="unspawned"&&a.alive)grantSpecial(match,a,linked);
  createDeathCorpse(match,b,now);
  return {killed:true}
}
function wildCounter(match,p,w,now){
  if(!p.alive||!w.alive)return 0;
  const t=wildTemplate(w),d=wildDamage(p,w,match,now);p.hp-=d;wakeOnDamage(p,now);
  if(t.skill==="bite_bleed"&&Math.random()<.20)applyStatus(p,"bleed",1,10,w.id,now,null,match);
  else if(t.skill==="harass"&&Math.random()<.25)p.nextHitBonus=(p.nextHitBonus||0)-.06;
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
function clearOneNegativeStatus(p,now=Date.now()){
  for(const id of Object.keys(p.statuses||{})){if(status(p,id,now)){delete p.statuses[id];return true}}
  return false;
}
function applySkillSelfEffects(match,p,sd,damageDealt=0,killed=false,now=Date.now()){
  const fx=combinedFx(p,match,now);
  if(sd.heal)p.hp=clamp(p.hp+sd.heal,0,maxHp(p,match,now));
  if(sd.restoreSp)recoverSp(p,sd.restoreSp,match,now);
  if(sd.selfDamage){p.hp-=sd.selfDamage;if(p.hp<=0)environmentDeath(match,p,now)}
  if(sd.freeMove)p.nextMoveFree=true;
  if(sd.lifesteal&&damageDealt>0)p.hp=clamp(p.hp+damageDealt*sd.lifesteal,0,maxHp(p,match,now));
  if(sd.killHeal&&killed)p.hp=clamp(p.hp+sd.killHeal,0,maxHp(p,match,now));
  if(sd.tempGuard){p.tempGuardUntil=now+(sd.tempGuardDuration||8)*1000;p.tempGuardRate=sd.tempGuard}
}
function skillDamageVsPlayer(match,p,t,sd,now){
  const ignore=sd.defIgnore||0,d=Math.max(0,def(t,match,now)*(1-ignore));
  return Math.max(1,atk(p,match,now)*100/(100+d)*incomingMult(t,match,now));
}
function skillDamageVsWild(match,p,w,sd,now){
  const wt=wildTemplate(w),ignore=sd.defIgnore||0,d=Math.max(0,wt.def*(1-ignore));
  return Math.max(1,atk(p,match,now)*100/(100+d));
}
function attackPlayer(match,p,t,skill=false,now=Date.now()){
  const sd=COMBAT_SKILL_DEFS[p.charId]||{mult:1.08,sp:12,cd:55};
  const ctx=attackContext(match,p,t,skill,now);
  let spCost=0,bonus=ctx.hitBonus,mult=1;
  if(skill){
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    const fx=combinedFx(p,match,now);
    spCost=Math.max(0,(sd.sp??12)*((p.eq||[]).includes("focus") ? .95 : 1)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0));
    if(p.sp<spCost)return {ok:false,error:"not_enough_sp"};
    p.sp-=spCost;p.nextSkillSpDiscount=0;p.cdCUntil=now+((sd.cd??55)/Math.max(.25,1+(fx.cdRate||0)))*1000;bonus+=sd.hit||0;
    mult=sd.multMin!=null?sd.multMin+Math.random()*(sd.multMax-sd.multMin):(sd.mult??1.08);
    if(sd.lowHpMult!=null&&p.hp/maxHp(p,match,now)<.5)mult=sd.lowHpMult;
    if(sd.timeScale)mult*=1+Math.min(.20,Math.floor(nowSec(match,now)/120)*.05);
  }
  if(!hitRoll(p,skill,bonus,match,now)){
    gainProf(p,.5,match,now);p.attackChainTarget=t.playerId;p.attackChainHits=0;
    if(skill)applySkillSelfEffects(match,p,sd,0,false,now);
    const bleedDamage=triggerBleedAction(match,p,now);
    return {ok:true,hit:false,damage:0,bleedDamage};
  }

  const fx=combinedFx(p,match,now);
  let d=(skill?skillDamageVsPlayer(match,p,t,sd,now):baseDamage(p,t,match,now))*mult;
  if(skill){ctx.skillDamageBonus=p.nextSkillDamageBonus||0;p.nextSkillDamageBonus=0;d*=1+(fx.skillDamage||0)+ctx.skillDamageBonus}
  if(skill&&sd.quietBonus&&ctx.quietReady)d*=1+sd.quietBonus;
  let dispelled=false;
  if(skill&&sd.dispelOne){dispelled=clearOneNegativeStatus(t,now);if(dispelled)d*=1+(sd.dispelBonus||0)}
  const canSkillCrit=!skill||!!sd.crit;
  const crit=canSkillCrit&&Math.random()<clamp(.05+(skill?(sd.crit||0):0)+(fx.crit||0)+(ctx.actionCritBonus||0),0,.5);
  if(crit)d*=1.4;
  d=modifyAttackDamage(match,p,t,d,ctx,now);
  t.hp-=d;wakeOnDamage(t,now);recordBattle(match,p,t,now);gainProf(p,1.5,match,now);

  if(skill){
    for(const row of sd.statuses||[]){
      const[id,chance,dur,stacks=1]=row,finalChance=clamp(chance+(fx.statusChance||0),0,.95);
      if(Math.random()<finalChance)applyStatus(t,id,stacks,dur||null,p.playerId,now,p,match);
    }
    if(sd.forcePoison)applyStatus(t,"poison",sd.forcePoison,8,p.playerId,now,p,match);
    if(sd.randomStatus&&Math.random()<clamp(.35+(fx.statusChance||0),0,.95))applyStatus(t,pick(["poison","bleed","slow"]),1,null,p.playerId,now,p,match);
    if(sd.doubleRandomStatus)for(const id of pick([["poison","bleed"],["poison","slow"],["bleed","slow"]]))if(Math.random()<clamp(.50+(fx.statusChance||0),0,.95))applyStatus(t,id,1,null,p.playerId,now,p,match);
    if(sd.randomControl&&Math.random()<clamp(sd.randomControl+(fx.statusChance||0),0,.95))applyStatus(t,pick(["slow","bind","fear","confusion","silence"]),1,null,p.playerId,now,p,match);
    if(sd.drainSp)t.sp=Math.max(0,t.sp-sd.drainSp);
    if(sd.mark){p.trackingMarks??={};p.trackingMarks[t.playerId]=now+sd.mark*1000}
  }

  if((p.eq||[]).includes("toxin_kit")&&Math.random()<clamp(.06+(combinedFx(p,match,now).statusChance||0),0,.95))applyStatus(t,"poison",1,8,p.playerId,now,p,match);
  applyOnHitStatuses(match,p,t,now);
  const death=t.hp<=0?killPlayer(match,p,t,now):null,killed=!!death?.killed;
  if(skill)applySkillSelfEffects(match,p,sd,d,killed,now);
  if(killed){
    const kfx=combinedFx(p,match,now);
    if(kfx.killHeal)p.hp=clamp(p.hp+kfx.killHeal,0,maxHp(p,match,now));
    if(kfx.killSp)recoverSp(p,kfx.killSp,match,now);
  }
  const bleedDamage=triggerBleedAction(match,p,now);
  return {ok:true,hit:true,crit,damage:d,death,dispelled,bleedDamage};
}
function attackWild(match,p,w,skill=false,now=Date.now()){
  const t=wildTemplate(w),sd=COMBAT_SKILL_DEFS[p.charId]||{mult:1.08,sp:12,cd:55};
  const ctx=attackContext(match,p,w,skill,now);
  let spCost=0,bonus=ctx.hitBonus,mult=1;
  if(skill){
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    const fx=combinedFx(p,match,now);
    spCost=Math.max(0,(sd.sp??12)*((p.eq||[]).includes("focus") ? .95 : 1)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0));
    if(p.sp<spCost)return {ok:false,error:"not_enough_sp"};
    p.sp-=spCost;p.nextSkillSpDiscount=0;p.cdCUntil=now+((sd.cd??55)/Math.max(.25,1+(fx.cdRate||0)))*1000;bonus+=sd.hit||0;
    mult=sd.multMin!=null?sd.multMin+Math.random()*(sd.multMax-sd.multMin):(sd.mult??1.08);
    if(sd.lowHpMult!=null&&p.hp/maxHp(p,match,now)<.5)mult=sd.lowHpMult;
    if(sd.timeScale)mult*=1+Math.min(.20,Math.floor(nowSec(match,now)/120)*.05);
  }
  if(!hitRoll(p,skill,bonus,match,now)){
    gainProf(p,.5,match,now);p.attackChainTarget=w.id;p.attackChainHits=0;
    if(skill)applySkillSelfEffects(match,p,sd,0,false,now);
    const bleedDamage=triggerBleedAction(match,p,now);
    return {ok:true,hit:false,damage:0,counter:wildCounter(match,p,w,now),bleedDamage};
  }

  const fx=combinedFx(p,match,now);
  let d=(skill?skillDamageVsWild(match,p,w,sd,now):Math.max(1,atk(p,match,now)*100/(100+t.def)))*mult;
  if(skill){ctx.skillDamageBonus=p.nextSkillDamageBonus||0;p.nextSkillDamageBonus=0;d*=1+(fx.skillDamage||0)+ctx.skillDamageBonus}
  if(skill&&sd.quietBonus&&ctx.quietReady)d*=1+sd.quietBonus;
  const canSkillCrit=!skill||!!sd.crit;
  const crit=canSkillCrit&&Math.random()<clamp(.05+(skill?(sd.crit||0):0)+(fx.crit||0)+(ctx.actionCritBonus||0),0,.5);
  if(crit)d*=1.4;
  d=modifyAttackDamage(match,p,w,d,ctx,now);
  if(t.skill==="guard"&&w.guardReady){w.guardReady=false;d=Math.max(1,Math.round(d*.8))}
  w.hp-=d;gainProf(p,1.5,match,now);

  let drop=null,extra=[],killed=false;
  if(w.hp<=0){
    killed=true;w.alive=false;w.hp=0;drop=pick(t.drop);addItem(p,drop);
    if(t.skill==="supply_cache")for(let i=0;i<2;i++){const x=pick(t.drop);if(addItem(p,x))extra.push(x)}
    const kfx=combinedFx(p,match,now);
    if(kfx.killHeal)p.hp=clamp(p.hp+kfx.killHeal,0,maxHp(p,match,now));
    if(kfx.killSp)recoverSp(p,kfx.killSp,match,now);
  }
  if(skill)applySkillSelfEffects(match,p,sd,d,killed,now);
  const bleedDamage=triggerBleedAction(match,p,now);
  const counter=w.alive&&p.alive?wildCounter(match,p,w,now):0;
  return {ok:true,hit:true,crit,damage:d,killed,drop,extra,counter,bleedDamage};
}
function hasEquippedWeaponType(p,type){return (p.eq||[]).some(id=>item(id)?.weaponType===type)}
function hasTool(p){return hasEquippedWeaponType(p,"도구")}
function hasTerminal(p){return hasEquippedWeaponType(p,"단말")}
function metalMaterialKinds(p){return ["iron","steel","alloy","silver","wire"].filter(id=>(p.mat?.[id]||0)>0).length}
function eventEligibleForPlayer(e,p){
  const cond=e?.condition||"";
  if(cond==="금속 재료 2종 이상 보유")return metalMaterialKinds(p)>=2;
  return true;
}
export function eventChoiceAvailability(e,p,index){
  const choice=e?.choices?.[index];if(!choice)return{available:false,reason:"선택지 없음"};
  const text=(choice.label||"")+" "+(choice.result||"");
  if(/도구 보유 시/.test(text)||/도구로/.test(choice.label||"")){
    if(!hasTool(p))return{available:false,reason:"도구 장비 필요"};
  }
  if(/정밀부품 1개 소비/.test(text)){
    if((p.mat?.precision||0)<1)return{available:false,reason:"정밀부품 1개 필요"};
  }
  if(/단말 태그 보유 시/.test(text)||/단말로/.test(choice.label||"")){
    if(!hasTerminal(p))return{available:false,reason:"단말 장비 필요"};
  }
  if(e.id==="E048"&&index===0&&!hasTool(p)&&(p.mat?.electronics||0)<1)return{available:false,reason:"도구 또는 전자부품 필요"};
  if(e.id==="E078"&&index===0&&!hasTool(p)&&(p.mat?.precision||0)<1)return{available:false,reason:"도구 또는 정밀부품 필요"};
  return{available:true,reason:""};
}
function consumeEventChoiceCost(e,p,index){
  const choice=e?.choices?.[index],text=choice?.result||"";
  if(/정밀부품 1개 소비/.test(text))consumeItem(p,"precision",1);
}
function searchResult(match,p,now){
  p.sp=Math.max(0,p.sp-3);
  const mods=cleanupEventMods(p,now),regionBoost=mods.regionEventBoosts[p.region]?.bonus||0;
  const eventChance=Math.min(.20,.05+(match.eventPity[p.region]||0)+regionBoost);
  if(Math.random()<eventChance){
    let pool=ENCOUNTER_EVENTS.filter(e=>e.region===p.region&&e.id!==match.lastEventId&&eventEligibleForPlayer(e,p));
    const normal=pool.filter(e=>e.condition!=="매우 낮은 확률"),rare=pool.filter(e=>e.condition==="매우 낮은 확률");
    if(rare.length&&Math.random()<.12)pool=rare;else if(normal.length)pool=normal;
    if(pool.length){
      const specialBoost=mods.nextSpecialEventBoost||0;
      const specialRegional=mods.regionSpecialEventBoosts[p.region]?.bonus||0;
      const e=weightedPick(pool,x=>{
        let w=1+(mods.eventWeights[x.id]?.bonus||0)+(x.type?.includes("특수")?(specialBoost+specialRegional):0);
        if(x.id==="E002"&&specialState(match,"special_01")?.state==="unspawned")w+=.75;
        return w
      });
      mods.nextSpecialEventBoost=0;if(mods.eventWeights[e.id]?.oneShot)delete mods.eventWeights[e.id];match.lastEventId=e.id;match.eventPity[p.region]=0;p.pendingEvent=e.id;return {kind:"event",event:e}
    }
  } else match.eventPity[p.region]=(match.eventPity[p.region]||0)+.007;
  const ground=groundSpecialsInRegion(match,p.region);
  if(ground.length&&Math.random()<.35){const id=pick(ground);if(pickupGroundSpecial(match,p,id))return {kind:"special",itemId:id,itemName:item(id)?.n||id,source:"ground"}}
  const regional=regionSpecialCandidates(match,p.region);
  const specialChance=clamp(.035+(mods.regionSpecialBoosts[p.region]?.bonus||0)+(mods.nextSpecialChanceBonus||0),0,.95);
  if(regional.length){mods.nextSpecialChanceBonus=0}
  if(regional.length&&Math.random()<specialChance){const id=pick(regional);if(grantSpecial(match,p,id))return {kind:"special",itemId:id,itemName:item(id)?.n||id,source:"search"}}
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
  const pool=POOLS[p.region]||[],fx=combinedFx(p,match,now);
  const itemChance=clamp(.90+(fx.searchLoot||0)+(p.nextSearchLootBonus||0),.20,.99);
  p.nextSearchLootBonus=0;
  if(pool.length&&Math.random()<itemChance){
    const boost=mods.regionLootBoosts[p.region];
    const weaponMat=new Set(["iron","steel","alloy","wire","wood","stick","gunpowder","leather","rubber"]);
    const medMagic=new Set(["medicine","toxin","mana_ink","mana_fiber","mana_stone","crystal"]);
    const id=boost?weightedPick(pool,x=>1+(boost.kind==="weapon"&&weaponMat.has(x)?boost.bonus:boost.kind==="medmagic"&&medMagic.has(x)?boost.bonus:0)):pick(pool);
    if(addItem(p,id))return {kind:"item",itemId:id,itemName:item(id)?.n||id}
  }
  return {kind:"nothing"};
}
function useConsumable(match,p,id,now){
  const it=item(id);if(!it||it.t!=="c"||owned(p,id)<=0)return {ok:false,error:"item_missing"};
  const inCombat=!!p.encounter,combat=inCombat?(it.combatEff??.75):1,repeat=foodRepeatMultiplier(p,id,it,now);
  const fx=combinedFx(p,match,now),recoveryMult=(p.eq||[]).includes("recovery")?1.08:1,healMult=repeat*combat*recoveryMult*(1+(fx.heal||0)),spMult=repeat*combat;
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
  p.cdAUntil=now+((d.cd||45)/Math.max(.25,1+(combinedFx(p,match,now).cdRate||0)))*1000;

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
function normalizedFxText(it){
  if(!it?.fx)return "";
  if(typeof it.fx==="string")return it.fx.toLowerCase();
  try{return JSON.stringify(it.fx).toLowerCase()}catch{return ""}
}
function characterGearTags(p){
  const ch=char(p),tags=new Set([ch.preferredWeapon]);
  const fx=PASSIVE_FX[p.charId]||{},sd=COMBAT_SKILL_DEFS[p.charId]||{},ad=ACTION_SKILL_DEFS[p.charId]||{};
  if((fx.statusChance||fx.poisonChance||fx.fearChance||fx.sleepChance||fx.bindChance)||(sd.statuses?.length||sd.forcePoison||sd.randomControl))tags.add("상태");
  if((fx.detect||fx.woundedDetect)||(ad.nextDetect||ad.tempFx?.detect))tags.add("탐지");
  if(fx.conceal||ad.tempFx?.conceal)tags.add("은신");
  if((fx.moveTime||fx.moveSp||fx.afterMoveHit||fx.afterMoveDamage)||(ad.nextMoveFree||ad.tempFx?.moveTime))tags.add("기동");
  if((fx.heal||fx.restHeal)||sd.heal||sd.lifesteal||ad.heal)tags.add("회복");
  if((fx.taken||fx.lowDef||fx.defFlat)||sd.tempGuard||ad.tempFx?.taken||ad.tempFx?.defFlat)tags.add("방어");
  if((fx.crit||fx.prep||fx.damage)||sd.crit||(sd.mult??1)<1.1)tags.add("연타");
  return tags
}
function recommendedGearScore(p,id,it){
  if(!p||!it||it.t!=="e")return-999;
  let s=0;const ch=char(p),tags=characterGearTags(p),fx=normalizedFxText(it);
  if(it.weaponType===ch.preferredWeapon)s+=50;
  else if(it.weaponType&&["검","단검","창","둔기","낫","권갑","활","총","투척무기","중량무기","특수무기","마도구","마법서"].includes(it.weaponType))s-=8;
  if(it.tier==="최종")s+=20;else if(it.tier==="준최종")s+=15;else if(it.tier==="희귀 시너지")s+=12;else if(it.tier==="희귀")s+=7;else if(it.tier==="고급")s+=3;
  if(tags.has("탐지")&&(fx.includes("tracking")||id==="aim_terminal"||id==="trace"))s+=16;
  if(tags.has("은신")&&(fx.includes("stealth")||id==="camo_mask"||id==="evasion"))s+=16;
  if(tags.has("상태")&&(fx.includes("poison")||fx.includes("control")||["spell_amp","toxin_kit","focus","detox"].includes(id)))s+=16;
  if(tags.has("기동")&&(fx.includes("mobility")||["propulsion","evasion"].includes(id)))s+=16;
  if(tags.has("회복")&&(fx.includes("sustain")||id==="recovery"))s+=16;
  if(tags.has("방어")&&(fx.includes("bruiser")||id==="plate"||(it.def||0)>=20))s+=13;
  if(tags.has("연타")&&(fx.includes("rapid")||id==="accel"))s+=13;
  if((it.atk||0)>0)s+=Math.min(12,it.atk*.45);
  if((it.def||0)>0)s+=Math.min(10,it.def*.22);
  return s
}
function recommendedReason(p,id,it){
  const ch=char(p),parts=[],tags=characterGearTags(p),fx=normalizedFxText(it);
  if(it.weaponType===ch.preferredWeapon)parts.push("선호 "+ch.preferredWeapon);
  if(tags.has("탐지")&&(fx.includes("tracking")||id==="aim_terminal"||id==="trace"))parts.push("탐지 시너지");
  if(tags.has("은신")&&(fx.includes("stealth")||id==="camo_mask"||id==="evasion"))parts.push("은신 시너지");
  if(tags.has("상태")&&(fx.includes("poison")||fx.includes("control")||["spell_amp","toxin_kit","focus","detox"].includes(id)))parts.push("상태이상 시너지");
  if(tags.has("기동")&&(fx.includes("mobility")||["propulsion","evasion"].includes(id)))parts.push("기동 시너지");
  if(tags.has("회복")&&(fx.includes("sustain")||id==="recovery"))parts.push("회복 시너지");
  if(tags.has("방어")&&(fx.includes("bruiser")||id==="plate"))parts.push("방어 시너지");
  if(tags.has("연타")&&(fx.includes("rapid")||id==="accel"))parts.push("공격 템포 시너지");
  return parts.length?parts.join(" · "):"기본 능력치 효율"
}
function recipeProgress(p,it){
  if(!it?.r)return{ready:false,have:0,need:0,missing:[]};
  let have=0,need=0;const missing=[];
  for(const[id,n]of Object.entries(it.r)){
    const count=owned(p,id);need+=n;have+=Math.min(n,count);
    if(count<n)missing.push({id,name:item(id)?.n||id,need:n,have:count,missing:n-count});
  }
  return{ready:missing.length===0,have,need,missing};
}
export function recommendedCrafts(p,limit=12){
  return Object.entries(ITEMS)
    .filter(([,it])=>it?.t==="e"&&it.r)
    .map(([id,it])=>{
      const score=recommendedGearScore(p,id,it),progress=recipeProgress(p,it);
      return{id,name:it.n,tier:it.tier||"",atk:it.atk||0,def:it.def||0,score,reason:recommendedReason(p,id,it),ready:progress.ready,have:progress.have,need:progress.need,missing:progress.missing}
    })
    .filter(x=>x.score>=18)
    .sort((a,b)=>(Number(b.ready)-Number(a.ready))||(b.score-a.score)||((b.have/Math.max(1,b.need))-(a.have/Math.max(1,a.need))))
    .slice(0,limit)
}
function ensureIntel(p){
  p.intel??={playerTraces:[],specialCandidates:[],materialHints:[],eventHints:[]};
  for(const k of["playerTraces","specialCandidates","materialHints","eventHints"])p.intel[k]??=[];
  return p.intel;
}
function pushIntel(list,row,max=6){
  list.unshift(row);
  if(list.length>max)list.length=max;
}
function regionName(id){
  const map={city:"텅 빈 도심",estate:"저택",church:"교회",factory:"폐공장",mgmt_lobby:"관리국 로비",mgmt_admin:"관리국 행정실",mgmt_director:"관리국장실",mgmt_cafeteria:"관리국 식당",mgmt_lab:"관리국 연구실",mgmt_training:"관리국 훈련실",evil_reception:"악의 조직 접견실",evil_quarters:"악의 조직 숙소",evil_training:"악의 조직 훈련실"};
  return map[id]||id;
}
function recordPlayerTraceIntel(match,p,now){
  const candidates=match.players.filter(x=>x!==p&&x.alive&&!((ensureEventMods(x).traceHiddenUntil||0)>now));
  if(!candidates.length)return null;
  const target=pick(candidates),row={kind:"player_trace",playerId:target.playerId,name:target.playerName,region:target.region,regionName:regionName(target.region),at:now};
  pushIntel(ensureIntel(p).playerTraces,row);return row;
}
function recordSpecialCandidateIntel(match,p,now){
  const ids=[...groundSpecialsInRegion(match,p.region),...regionSpecialCandidates(match,p.region)];
  const unique=[...new Set(ids)].slice(0,6),row={kind:"special_candidates",region:p.region,regionName:regionName(p.region),items:unique.map(id=>({id,name:item(id)?.n||id,state:specialState(match,id)?.state||"unknown"})),at:now};
  pushIntel(ensureIntel(p).specialCandidates,row);return row;
}
function materialTargetRegions(ids){
  const wanted=new Set(ids);return Object.entries(POOLS).filter(([,pool])=>pool.some(id=>wanted.has(id))).map(([region,pool])=>({region,regionName:regionName(region),hits:pool.filter(id=>wanted.has(id))})).sort((a,b)=>b.hits.length-a.hits.length).slice(0,5)
}
function recordMaterialHintIntel(p,now){
  const rec=recommendedCrafts(p,4).find(x=>!x.ready&&x.missing?.length);
  if(!rec)return null;
  const ids=rec.missing.map(x=>x.id),row={kind:"material_hint",targetId:rec.id,targetName:rec.name,regions:materialTargetRegions(ids),at:now};
  pushIntel(ensureIntel(p).materialHints,row);return row;
}
export function publicPlayer(match,p,now=Date.now()){
  updatePassiveTime(match,now);ensureIntel(p);
  return {...p,nearbyNoise:nearbyNoiseFor(match,p,now),maxHp:maxHp(p,match,now),atk:atk(p,match,now),def:def(p,match,now),cdC:Math.max(0,((p.cdCUntil||0)-now)/1000),cdA:Math.max(0,((p.cdAUntil||0)-now)/1000),
    inventory:{eq:(p.eq||[]).map(id=>({id,...item(id)})),mat:Object.entries(p.mat||{}).filter(([,n])=>n>0).map(([id,n])=>({id,count:n,name:item(id)?.n||id})),con:Object.entries(p.con||{}).filter(([,n])=>n>0).map(([id,n])=>({id,count:n,...item(id)}))}
  };
}
export function actionDuration(match,p,type,payload={},now=Date.now()){
  const fx=combinedFx(p,match,now);let sec=1;
  if(type==="search"){const mods=cleanupEventMods(p,now);sec=mods.instantSearchRegion===p.region ? .08 : Math.max(.8,1.5*(1+(fx.searchTime||0)))}
  else if(type==="rest")sec=3;
  else if(type==="craft")sec=Math.max(.8,1.8*(1+(fx.craftTime||0))*(p.nextCraftTimeMult||1));
  else if(type==="use_item")sec=item(payload.id)?.useTime??1.2;
  else if(type==="attack")sec=Math.max(.65,1.15*((p.eq||[]).includes("accel") ? .96 : 1)*(1+(fx.prep||0)));
  else if(type==="skill")sec=Math.max(.65,1*(COMBAT_SKILL_DEFS[p.charId]?.prep||1));
  else if(type==="flee")sec=Math.max(.7,1.5*((p.eq||[]).includes("evasion") ? .95 : 1)*(1+(fx.fleePrep||0)));
  else if(type==="char_action")sec=ACTION_SKILL_DEFS[p.charId]?.time??.8;
  else if(type==="loot_corpse"){
    const qty=Math.max(1,Math.floor(payload.qty||1));
    sec=payload.kind==="eq"?1.2:payload.kind==="con" ? .9:Math.min(1.5,.65+.12*Math.max(0,qty-1));
  }
  sec*=Math.max(.65,1+(combinedFx(p,match,now).actionTime||0));
  if(status(p,"actionDelay",now))sec*=1.25;
  return sec;
}
export function validateAction(match,p,type,payload={},now=Date.now()){
  updatePassiveTime(match,now);
  if(!p?.alive)return {ok:false,error:"player_not_active"};if(p.pendingAction)return {ok:false,error:"action_in_progress"};if(status(p,"sleep",now))return {ok:false,error:"asleep"};
  if(p.pendingEvent)return {ok:false,error:"event_choice_required"};
  if(type!=="attack"&&type!=="skill"&&type!=="flee"&&p.encounter&&type!=="use_item")return {ok:false,error:"encounter_in_progress"};
  if(type==="move"){if(status(p,"bind",now))return {ok:false,error:"bound"};if(!ADJACENCY[p.region]?.includes(payload.to))return {ok:false,error:"invalid_move"};const mv=movementProfile(p.region,payload.to),cost=p.nextMoveFree?0:Math.max(0,mv.spCost-(combinedFx(p,match,now).moveSp||0));if(p.sp<cost)return {ok:false,error:"not_enough_sp"};return {ok:true,meta:{...mv,spCost:cost}}}
  if(type==="search"&&p.sp<3)return {ok:false,error:"not_enough_sp"};
  if(type==="craft"&&!canCraft(p,payload.id))return {ok:false,error:"cannot_craft"};
  if(type==="use_item"&&owned(p,payload.id)<=0)return {ok:false,error:"item_missing"};
  if(type==="loot_corpse"){
    const corpse=match.corpses.find(x=>x.id===payload.corpseId&&x.region===p.region&&x.expiresAt>now);
    if(!corpse)return {ok:false,error:"corpse_missing"};
    if(!["mat","con","eq"].includes(payload.kind)||!item(payload.id))return {ok:false,error:"invalid_loot"};
    if(payload.kind==="mat"&&(corpse.mat?.[payload.id]||0)<=0)return {ok:false,error:"loot_missing"};
    if(payload.kind==="con"){
      if((corpse.con?.[payload.id]||0)<=0)return {ok:false,error:"loot_missing"};
      const kinds=Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0);
      if((p.con[payload.id]||0)<=0&&kinds.length>=3)return {ok:false,error:"inventory_full"};
    }
    if(payload.kind==="eq"){
      if(!corpse.eq?.includes(payload.id))return {ok:false,error:"loot_missing"};
      if((p.eq||[]).length>=3&&!payload.replace)return {ok:false,error:"equipment_full"};
    }
  }
  if(["attack","skill","flee"].includes(type)&&!encounterTarget(match,p))return {ok:false,error:"no_encounter"};
  if(type==="skill"){
    const sd=COMBAT_SKILL_DEFS[p.charId]||{sp:12,cd:55};
    const fx=combinedFx(p,match,now),cost=Math.max(0,(sd.sp??12)*((p.eq||[]).includes("focus") ? .95 : 1)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0));
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    if(p.sp<cost)return {ok:false,error:"not_enough_sp"};
  }
  if(type==="char_action"){
    const d=ACTION_SKILL_DEFS[p.charId];if(!d)return {ok:false,error:"action_missing"};
    if((p.cdAUntil||0)>now)return {ok:false,error:"action_cooldown"};
  }
  if(type==="flee"&&status(p,"bind",now))return {ok:false,error:"bound"};
  return {ok:true};
}
export function beginServerAction(match,p,type,payload={},now=Date.now()){
  const v=validateAction(match,p,type,payload,now);if(!v.ok)return v;
  let duration=actionDuration(match,p,type,payload,now),meta=v.meta||{};
  if(type==="move"){const slow=status(p,"slow",now)?.stacks||0,fx=combinedFx(p,match,now);const slowMult=slow>=2?1.25:slow===1?1.15:1;duration=(meta.durationMs/1000)*slowMult*(1+(fx.moveTime||0))*Math.max(.65,1+(fx.actionTime||0));if(status(p,"actionDelay",now))duration*=1.25}
  if(type==="flee"){const slow=status(p,"slow",now)?.stacks||0;duration*=slow>=2?1.25:slow===1?1.15:1;if(status(p,"fear",now))duration*=1.10}
  p.pendingAction={type,payload,startedAt:now,completeAt:now+duration*1000,meta};
  return {ok:true,action:p.pendingAction};
}
export function completeAction(match,p,now=Date.now()){
  const a=p.pendingAction;if(!a||a.completeAt>now)return null;
  if(!p.alive){p.pendingAction=null;return {ok:false,error:"player_not_active",type:a.type}}
  p.pendingAction=null;
  const type=a.type,x=a.payload||{};let result={ok:true,type};
  if(type==="move"){p.region=x.to;p.sp=Math.max(0,p.sp-(a.meta?.spCost||0));p.lastMoveAt=now;const fx=combinedFx(p,match,now);p.moveHitReady=(p.eq||[]).includes("propulsion")||!!(fx.afterMoveHit||fx.afterMoveDamage);p.nextMoveFree=false;p.encounter=null;result.to=x.to;result.bleedDamage=triggerBleedAction(match,p,now)}
  else if(type==="search"){const mods=cleanupEventMods(p,now);if(mods.instantSearchRegion===p.region)mods.instantSearchRegion=null;result={...result,...searchResult(match,p,now)};}
  else if(type==="rest"){const fx=combinedFx(p,match,now),recoveryMult=(p.eq||[]).includes("recovery")?1.05:1;p.hp=clamp(p.hp+5*recoveryMult*(1+(fx.restHeal||0)),0,maxHp(p,match,now));recoverSp(p,12*(1+(fx.restSp||0)),match,now)}
  else if(type==="craft"){result={...result,...craftItem(match,p,x.id)};p.nextCraftTimeMult=1}
  else if(type==="use_item")result={...result,...useConsumable(match,p,x.id,now)}
  else if(type==="attack"){const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,false,now):attackWild(match,p,t.obj,false,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="skill"){const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,true,now):attackWild(match,p,t.obj,true,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="flee"){result.success=Math.random()<.70;if(result.success){p.encounter=null;if((p.eq||[]).includes("evasion"))p.nextMoveFree=true}}
  else if(type==="char_action")result={...result,...charAction(match,p,now)};
  else if(type==="loot_corpse")result={...result,...lootCorpse(match,p,x.corpseId,x.kind,x.id,x.qty||1,!!x.replace,now)};
  match.corpses=(match.corpses||[]).filter(c=>c.expiresAt>now);
  match.updatedAt=now;updatePassiveTime(match,now);return result;
}
function ensureEventMods(p){
  p.eventMods??={eventWeights:{},regionEventBoosts:{},regionSpecialEventBoosts:{},regionSpecialBoosts:{},regionLootBoosts:{},nextSpecialChanceBonus:0,nextSpecialEventBoost:0,instantSearchRegion:null,traceHiddenUntil:0,nextCraftFilter:null,nextEventSuccess:null,hazardReductionUntil:0};
  return p.eventMods;
}
function weightedPick(rows,weightFn){
  let total=0;const weighted=rows.map(x=>{const w=Math.max(.001,weightFn(x));total+=w;return[x,w]});
  let r=Math.random()*total;for(const[x,w]of weighted){r-=w;if(r<=0)return x}return rows[rows.length-1];
}
function cleanupEventMods(p,now){
  const m=ensureEventMods(p);
  for(const map of [m.eventWeights,m.regionEventBoosts,m.regionSpecialEventBoosts,m.regionSpecialBoosts,m.regionLootBoosts])for(const[k,v]of Object.entries(map))if(v?.until&&v.until<=now)delete map[k];
  if((m.traceHiddenUntil||0)<=now)m.traceHiddenUntil=0;
  return m;
}
function recordBattle(match,a,b,now){
  match.battleLog??=[];
  match.battleLog.unshift({at:now,region:a.region,aId:a.playerId,bId:b?.playerId||null});
  match.battleLog=match.battleLog.filter(x=>x.at>now-120000).slice(0,40);
}
function gearTierRank(t){return t==="최종"?5:t==="준최종"?4:t==="희귀 시너지"?3:t==="희귀"?2:t==="고급"?1:0}
function recordAdvancedEventIntel(match,p,text,now){
  const intel=ensureIntel(p);
  if(/무작위 플레이어 1명의 장비 등급 범위 확인/.test(text)){
    const targets=match.players.filter(x=>x!==p&&x.alive&&!((ensureEventMods(x).traceHiddenUntil||0)>now));
    const t=targets.length?pick(targets):null;if(t){
      const tiers=(t.eq||[]).map(id=>item(id)?.tier||"일반"),max=tiers.sort((a,b)=>gearTierRank(b)-gearTierRank(a))[0]||"무장 없음";
      pushIntel(intel.eventHints,{kind:"gear_grade",name:t.playerName,value:max,at:now});
    }
  }
  if(/금속 장비 보유자 존재 여부 탐지/.test(text)){
    const mgmt=new Set(["mgmt_lobby","mgmt_admin","mgmt_director","mgmt_cafeteria","mgmt_lab","mgmt_training"]);
    const found=match.players.some(x=>x!==p&&x.alive&&mgmt.has(x.region)&&(x.eq||[]).some(id=>/철|강철|합금|금속/.test(item(id)?.n||"")));
    pushIntel(intel.eventHints,{kind:"metal_holder",name:"관리국 금속 장비 탐지",value:found?"존재":"미탐지",at:now});
  }
  if(/최근.*전투.*층|최근 관리국 전투 흔적 공개/.test(text)){
    const mgmt=new Set(["mgmt_lobby","mgmt_admin","mgmt_director","mgmt_cafeteria","mgmt_lab","mgmt_training"]);
    const row=(match.battleLog||[]).find(x=>x.at>now-120000&&mgmt.has(x.region));
    pushIntel(intel.eventHints,{kind:"battle_trace",name:"최근 관리국 전투",value:row?regionName(row.region):"최근 흔적 없음",at:now});
  }
  if(/현재 가장 많이 제작된 무기 태그 공개/.test(text)){
    const entries=Object.entries(match.craftStats||{}).sort((a,b)=>b[1]-a[1]);
    pushIntel(intel.eventHints,{kind:"craft_meta",name:"가장 많이 제작된 무기",value:entries[0]?.[0]||"기록 없음",at:now});
  }
}
function eventGenericMaterialPool(){return Object.keys(ITEMS).filter(id=>ITEMS[id]?.t==="m"&&!isSpecialMaterial(id))}
function eventConsumablePool(){return Object.keys(ITEMS).filter(id=>ITEMS[id]?.t==="c")}
function eventAwardItem(match,p,id,count=1){
  if(!id||!item(id))return 0;let got=0;
  for(let i=0;i<count;i++){
    const it=item(id);
    if(isSpecialMaterial(id)){if(grantSpecial(match,p,id))got++;break}
    if(it.t==="m"||it.t==="c"){if(addItem(p,id))got++}
    else{
      if(p.eq.length>=3){
        let worst=0,worstScore=Infinity;
        for(let j=0;j<p.eq.length;j++){const q=item(p.eq[j]),score=(q?.atk||0)+(q?.def||0);if(score<worstScore){worstScore=score;worst=j}}
        p.eq.splice(worst,1);
      }
      p.eq.push(id);got++;
    }
  }
  return got;
}
function eventAwardEquipmentType(match,p,type){
  const rows=Object.entries(ITEMS).filter(([id,it])=>it?.t==="e"&&it.weaponType===type&&["고급","희귀"].includes(it.tier));
  if(!rows.length)return 0;
  rows.sort((a,b)=>(b[1].tier==="희귀"?1:0)-(a[1].tier==="희귀"?1:0));
  const rare=rows.filter(([,it])=>it.tier==="희귀"),pool=rare.length?rare:rows;
  return eventAwardItem(match,p,pick(pool)[0],1);
}
function eventAwardGeneric(match,p,kind,count=1){
  const mats=eventGenericMaterialPool(),cons=eventConsumablePool(),eq=Object.keys(ITEMS).filter(id=>ITEMS[id]?.t==="e");let pool=[];
  if(kind==="material")pool=mats;
  else if(kind==="high_material")pool=mats.filter(id=>["steel","alloy","precision","mana_stone","crystal","silver","machine"].includes(id));
  else if(kind==="medicine")pool=cons.filter(id=>item(id)?.kind==="medicine");
  else if(kind==="food")pool=cons.filter(id=>["food","drink"].includes(item(id)?.kind));
  else if(kind==="high_food")pool=cons.filter(id=>["food","drink"].includes(item(id)?.kind)&&["고급","희귀"].includes(item(id)?.tier));
  else if(kind==="electronic")pool=mats.filter(id=>["electronics","battery","precision","machine"].includes(id));
  else if(kind==="metal")pool=mats.filter(id=>["iron","steel","alloy","silver","wire"].includes(id));
  else if(kind==="magic")pool=mats.filter(id=>["mana_ink","mana_fiber","mana_stone","crystal"].includes(id));
  else if(kind==="accessory")pool=["silver","crystal","mana_stone","mana_ink"].filter(id=>item(id));
  else if(kind==="high_reward")pool=[...eq.filter(id=>["희귀","희귀 시너지"].includes(item(id)?.tier)),...cons.filter(id=>["고급","희귀"].includes(item(id)?.tier)),...mats.filter(id=>["steel","alloy","precision","mana_stone","crystal","silver"].includes(id))];
  else pool=mats.length?mats:cons;
  let got=0;for(let i=0;i<count&&pool.length;i++)got+=eventAwardItem(match,p,pick(pool),1);return got;
}
function eventExtractCount(text,def=1){
  const m=text.match(/(\d+)~(\d+)개/);if(m)return Math.floor(+m[1]+Math.random()*(+m[2]-+m[1]+1));
  const n=text.match(/(\d+)개/);return n?+n[1]:def;
}
function eventSpecialCandidates(ev,text){
  const all=(ev.special||"").split("/").map(x=>x.trim()).filter(Boolean).map(findItemIdByExactName).filter(Boolean);
  const named=all.filter(id=>text.includes(item(id)?.n||""));
  if(named.length)return named;
  if(!/다음/.test(text)&&/(?:특수재료 )?(?:판정률|획득률).*?(?:상승|증가)/.test(text))return all;
  return [];
}
function eventRewardClauses(text){
  return (text||"").split("/").map(x=>x.trim()).filter(Boolean);
}
function clauseExactRewards(clause){
  return Object.entries(ITEMS).filter(([id,it])=>!isSpecialMaterial(id)&&it?.n&&clause.includes(it.n)).sort((a,b)=>b[1].n.length-a[1].n.length);
}
function awardExactClause(match,p,clause,rewards,summary){
  let exact=clauseExactRewards(clause);if(!exact.length)return 0;
  const kept=[];
  for(const row of exact){if(!kept.some(([,it])=>it.n.includes(row[1].n)||row[1].n.includes(it.n)))kept.push(row)}
  exact=kept;
  const explicit=/\d+(?:~\d+)?개/.test(clause),count=eventExtractCount(clause,1);
  let rows=exact;
  if(/또는|중\s*\d|중 하나/.test(clause))rows=[pick(exact)];
  else if(explicit&&/·/.test(clause)&&!/\+/.test(clause)&&exact.length>1){
    rows=[...exact].sort(()=>Math.random()-.5).slice(0,Math.min(count,exact.length));
  }
  let got=0;
  for(const[id,it]of rows){
    const qty=(rows.length===1?Math.min(count,3):1),n=eventAwardItem(match,p,id,qty);
    if(n){got+=n;rewards.push(...Array(n).fill(id));summary.push(it.n+" 획득")}
  }
  return got;
}
function awardGenericClause(match,p,clause,e,index,rewards,summary){
  const count=Math.min(eventExtractCount(clause,1),4);
  const award=(kind,n=count,label=null)=>{const got=eventAwardGeneric(match,p,kind,n);if(got)summary.push(label||"보상 "+got+"개");return got};
  if(/일반재료 또는 음식/.test(clause)){const kind=Math.random()<.5?"material":"food";return award(kind,count,kind==="material"?"재료 획득":"음식 획득")}
  if(/금속·기계 재료/.test(clause)){let got=0;for(let j=0;j<count;j++)got+=eventAwardGeneric(match,p,Math.random()<.5?"metal":"electronic",1);if(got)summary.push("금속·기계 재료 획득");return got}
  if(/고급 전자재료/.test(clause))return award("electronic",count,"고급 전자재료 획득");
  if(/고급재료/.test(clause))return award("high_material",count,"고급재료 획득");
  if(/일반재료|일반 재료|재료 \d|재료 \d+개/.test(clause))return award("material",count,"재료 획득");
  if(/약품/.test(clause))return award("medicine",Math.min(count,2),"약품 획득");
  if(/고급 ?요리/.test(clause))return award("high_food",Math.min(count,2),"고급 음식 획득");
  if(/음식|음료|디저트|식량|일반 식사 소모품|고기·|우유|달걀|채소|쌀·|감자|소금·|기름|설탕/.test(clause))return award("food",Math.min(count,3),"음식 획득");
  if(/마력재료/.test(clause))return award("magic",Math.min(count,2),"마력재료 획득");
  if(/장신구/.test(clause))return award("accessory",Math.min(count,2),"장신구 재료 획득");
  if(/고급보상|가치 높은 보상/.test(clause))return award("high_reward",Math.min(count,3),"고급 보상 획득");
  if(/^보상 \d+개/.test(clause))return award("high_material",count,"보상 획득");
  const typeMatch=clause.match(/(검|활|낫|도구) 계열 고급 (?:아이템|무기)/);
  if(typeMatch){const got=eventAwardEquipmentType(match,p,typeMatch[1]);if(got)summary.push(typeMatch[1]+" 계열 장비 획득");return got}
  if(/투척재료/.test(clause))return award("material",count,"투척 재료 획득");
  if(/안전 획득/.test(clause)&&e.id==="E022"&&index===1)return award("material",3,"안전 보상 획득");
  return 0;
}
function processEventRewardClauses(match,p,e,index,clauses,rewards,summary){
  for(const clause of clauses){
    if(/소비|실패 시|확률|판정|시간|소음|위험 없음|즉시 종료|지속시간|피발견률|탐색시간|행동속도|가중치|추천 지역|흔적|표시|공개|보정|성공률|함정 무효|판정률|상태이상|중독|독성 상태|공포|혼란|수면|HP\s*[+-]|SP\s*[+-]|포만도\s*\+/.test(clause)){
      // Exact item rewards can coexist with risk/modifier text, so still allow exact matches.
      awardExactClause(match,p,clause,rewards,summary);
      continue;
    }
    if(awardExactClause(match,p,clause,rewards,summary))continue;
    awardGenericClause(match,p,clause,e,index,rewards,summary);
  }
}

function advanceEventTime(match,sec,now=Date.now()){
  sec=Math.max(0,Math.floor(sec||0));if(!sec)return;
  const delta=sec*1000;match.timeOffsetMs=(match.timeOffsetMs||0)+delta;
  for(const q of match.players){
    if(q.cdCUntil)q.cdCUntil=Math.max(now,q.cdCUntil-delta);
    if(q.cdAUntil)q.cdAUntil=Math.max(now,q.cdAUntil-delta);
    if(q.pendingAction?.completeAt)q.pendingAction.completeAt=Math.max(now,q.pendingAction.completeAt-delta);
    for(const s of Object.values(q.statuses||{}))if(s?.until)s.until-=delta;
    for(const e of q.tempEffects||[])if(e?.until)e.until-=delta;
    for(const e of q.delayedEffects||[])if(e?.at)e.at-=delta;
    if(q.lastSatietyAt)q.lastSatietyAt-=delta;
    if(q.nextStatusTick)q.nextStatusTick-=delta;
  }
  for(const corpse of match.corpses||[])corpse.expiresAt-=delta;
  updatePassiveTime(match,now);
}
export function resolveEventChoice(match,p,index,now=Date.now()){
  const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);if(!e)return {ok:false,error:"no_event"};
  const choice=e.choices?.[index];if(!choice)return {ok:false,error:"invalid_choice"};
  const availability=eventChoiceAvailability(e,p,index);if(!availability.available)return {ok:false,error:"event_choice_unavailable",reason:availability.reason};
  consumeEventChoiceCost(e,p,index);
  p.pendingEvent=null;const text=choice.result||"",rewardText=text.split("/").filter(part=>!/소비/.test(part)).join(" / "),rewards=[],summary=[];

  const tm=text.match(/시간 \+(\d+)초/);
  if(tm){advanceEventTime(match,+tm[1],now);summary.push("시간 +"+tm[1]+"초")}

  // Resolve percentage-gated HP damage first and remember those text spans so they are not also applied unconditionally.
  const probabilisticHpSpans=[];
  const eventModsBefore=cleanupEventMods(p,now),successMod=eventModsBefore.nextEventSuccess&&e.name.includes(eventModsBefore.nextEventSuccess.keyword)?eventModsBefore.nextEventSuccess:null;
  const hazardReduce=(eventModsBefore.hazardReductionUntil||0)>now ? .25 : 0;
  for(const m of text.matchAll(/(\d+)%[^/]*?HP\s*-\s*(\d+)/g)){
    probabilisticHpSpans.push([m.index,m.index+m[0].length]);
    const risk=clamp(+m[1]/100-(successMod?.bonus||0)-hazardReduce,0,1);
    if(Math.random()<risk){
      const d=+m[2];p.hp=clamp(p.hp-d,0,maxHp(p,match,now));summary.push("확률 피해 HP -"+d);
    }else summary.push("위험 판정 회피");
  }
  const overlapsProbHp=(idx,len)=>probabilisticHpSpans.some(([a,b])=>idx<b&&idx+len>a);
  for(const m of text.matchAll(/HP\s*([+-])\s*(\d+)/g)){
    if(overlapsProbHp(m.index,m[0].length))continue;
    if(/가능/.test(text.slice(Math.max(0,m.index-8),m.index+m[0].length+8))&&Math.random()>=.50)continue;
    const n=+m[2]*(m[1]==="-"?-1:1);p.hp=clamp(p.hp+n,0,maxHp(p,match,now));summary.push("HP "+(n>=0?"+":"")+n);
  }
  for(const m of text.matchAll(/SP\s*([+-])\s*(\d+)/g)){
    const n=+m[2]*(m[1]==="-"?-1:1);p.sp=clamp(p.sp+n,0,p.maxSp);summary.push("SP "+(n>=0?"+":"")+n);
  }
  if(p.hp<=0)environmentDeath(match,p,now);

  if(/독성 상태|중독/.test(text)){
    const pm=text.match(/(\d+)%[^/]*(?:독성 상태|중독)/);
    if(!pm||Math.random()<+pm[1]/100)applyStatus(p,"poison",1,8,null,now,null,match);
  }
  for(const[ko,id]of[["혼란","confusion"],["공포","fear"],["수면","sleep"]]){
    const m=text.match(new RegExp(ko+"\\s*(\\d+)초"));
    if(m){
      const prefix=text.slice(Math.max(0,(m.index||0)-18),m.index||0),pm=prefix.match(/(\d+)%[^%]*$/);
      if(!pm||Math.random()<+pm[1]/100)applyStatus(p,id,1,+m[1],null,now,null,match);
    }
  }

  if(/독\/출혈 지속시간 50% 감소/.test(text))for(const id of["poison","bleed"]){const s=p.statuses?.[id];if(s&&s.until>now)s.until=now+(s.until-now)*.5}
  if(/공포·혼란 지속시간 -20%/.test(text))for(const id of["fear","confusion"]){const s=p.statuses?.[id];if(s&&s.until>now)s.until=now+(s.until-now)*.8}
  if(/피발견률 -5% 30초/.test(text))addTemp(p,{conceal:.05},30,now);
  if(/탐색시간 -5%/.test(text))addTemp(p,{searchTime:-.05},30,now);
  if(/행동속도 \+4%/.test(text))addTemp(p,{actionTime:-.04},30,now);

  const specials=eventSpecialCandidates(e,text);let specialSucceeded=false,specialAttempted=false;
  if(specials.length){
    specialAttempted=true;
    const guaranteed=!/판정|확률/.test(text),boost=/크게 상승|상승|증가/.test(text),mods0=cleanupEventMods(p,now);
    const chance=clamp((guaranteed ? 1 : (boost ? .78 : .55))+(mods0.nextSpecialChanceBonus||0),0,1);mods0.nextSpecialChanceBonus=0;
    if(Math.random()<chance){
      const valid=specials.filter(id=>specialState(match,id)?.state==="unspawned");
      if(valid.length){
        const id=pick(valid);if(eventAwardItem(match,p,id,1)){rewards.push(id);summary.push("특수재료 획득");specialSucceeded=true}
      }else{eventAwardGeneric(match,p,"material",2);summary.push("특수재료 대체 보상");specialSucceeded=true}
    }else summary.push("특수재료 판정 실패");
  }

  const clauses=eventRewardClauses(text),normalClauses=clauses.filter(x=>!/^실패 시/.test(x)&&!/소비/.test(x));
  processEventRewardClauses(match,p,e,index,normalClauses,rewards,summary);
  if(specialAttempted&&!specialSucceeded){
    const failClauses=clauses.filter(x=>/^실패 시/.test(x)).map(x=>x.replace(/^실패 시\s*/,""));
    processEventRewardClauses(match,p,e,index,failClauses,rewards,summary);
  }

  if(/희귀 약품 확률/.test(text)&&Math.random()<.35)eventAwardItem(match,p,"advanced_first_aid",1);
  if(/고급장신구 재료 확률/.test(text)&&Math.random()<.40)eventAwardGeneric(match,p,"accessory",1);
  if(/특수보상 확률 낮음/.test(text)&&Math.random()<.20)eventAwardGeneric(match,p,"high_reward",1);
  if(e.id==="E044"&&index===0&&!clauseExactRewards(text).length){if(Math.random()<.18)eventAwardItem(match,p,"mint_choco_fish",1);else eventAwardGeneric(match,p,"food",1)}
  if(e.id==="E048"&&index===0){
    const ownedMats=Object.entries(p.mat||{}).filter(([id,n])=>n>0&&!isSpecialMaterial(id));let left=2;
    for(const[id,n]of ownedMats){const take=Math.min(left,n);if(take>0){consumeItem(p,id,take);left-=take}if(left<=0)break}
    if(left===0)eventAwardGeneric(match,p,"high_food",1);
  }
  if(e.id==="E048"&&index===2){
    if(Math.random()>=.20)eventAwardGeneric(match,p,"high_food",1);
    else{const row=Object.entries(p.mat||{}).find(([id,n])=>n>0&&!isSpecialMaterial(id));if(row)consumeItem(p,row[0],1)}
  }

  if(/다음.*제작시간 -50%/.test(text))p.nextCraftTimeMult=Math.min(p.nextCraftTimeMult||1,.5);
  if(/다음.*제작시간 -20%/.test(text))p.nextCraftTimeMult=Math.min(p.nextCraftTimeMult||1,.8);
  if(/피발견률 \+10% 20초/.test(text))addTemp(p,{conceal:-.10},20,now);
  if(/다음.*피발견률 -5%/.test(text))addTemp(p,{conceal:.05},30,now);
  const mods=cleanupEventMods(p,now);
  let mmod;
  if((mmod=text.match(/(\d+)초 동안 해당 이벤트 재등장 가중치 \+(\d+)%/))){mods.eventWeights[e.id]={bonus:+mmod[2]/100,until:now+(+mmod[1])*1000}}
  if(/특수 이벤트 발견 \+1회 보정/.test(text))mods.nextSpecialEventBoost=Math.max(mods.nextSpecialEventBoost||0,.35);
  if((mmod=text.match(/다음 특수재료 판정 \+(\d+)%/)))mods.nextSpecialChanceBonus=Math.max(mods.nextSpecialChanceBonus||0,+mmod[1]/100);
  if(/특수재료 판정률 소폭 감소/.test(text))mods.nextSpecialChanceBonus=Math.min(mods.nextSpecialChanceBonus||0,-.15);
  if(/특수재료 획득률 크게 상승|판정률 증가|특수재료 판정 상승/.test(text))mods.nextSpecialChanceBonus=Math.max(mods.nextSpecialChanceBonus||0,.25);
  if((mmod=text.match(/(\d+)초간 간부 숙소 특수이벤트 \+(\d+)%/)))mods.regionSpecialEventBoosts.evil_quarters={bonus:+mmod[2]/100,until:now+(+mmod[1])*1000};
  if((mmod=text.match(/(\d+)초간 악의조직 훈련장 특수이벤트 \+(\d+)%/)))mods.regionSpecialEventBoosts.evil_training={bonus:+mmod[2]/100,until:now+(+mmod[1])*1000};
  if(/다음 온실 이벤트 특수재료 확률 \+30%/.test(text))mods.regionSpecialBoosts.estate={bonus:.30,until:now+60000};
  if(/다음 마도 이벤트 가중치 \+/.test(text))mods.nextSpecialEventBoost=Math.max(mods.nextSpecialEventBoost||0,.20);
  if(/다음 구내식당 특수음식 이벤트 확률 \+50%/.test(text))mods.eventWeights.E045={bonus:.50,oneShot:true};
  if(/무작위 외부 지역 하나의 이벤트 가중치/.test(text)){
    const external=["city","estate","church","factory"],r=pick(external);mods.regionEventBoosts[r]={bonus:.25,until:now+60000};
  }
  if(/60초간 관리국 훈련장 무기재료 드롭 가중치 \+20%/.test(text))mods.regionLootBoosts.mgmt_training={kind:"weapon",bonus:.20,until:now+60000};
  if(/60초간 연구실 약품·마도 드롭 가중치 \+20%/.test(text))mods.regionLootBoosts.mgmt_lab={kind:"medmagic",bonus:.20,until:now+60000};
  if(/다음 금고 이벤트 성공률 \+30%/.test(text))mods.nextEventSuccess={keyword:"금고",bonus:.30};
  if(/다음 통로 이벤트 성공률 상승/.test(text))mods.nextEventSuccess={keyword:"통로",bonus:.25};
  if(/최면 계열 이벤트 위험 감소/.test(text))mods.hazardReductionUntil=now+60000;
  if(/다음 행정실 탐색 1회 즉시 완료/.test(text))mods.instantSearchRegion="mgmt_admin";
  if(/자신의 정보 흔적 감소|최근 관리국 흔적 제거|흔적을 남기지 않음/.test(text))mods.traceHiddenUntil=Math.max(mods.traceHiddenUntil||0,now+30000);
  if(/25초간 상태이상 지속 -5%/.test(text))addTemp(p,{incomingStatusDuration:-.05},25,now);
  if((mmod=text.match(/이후 SP회복 -(\d+)% (\d+)초/)))addTemp(p,{spRecovery:-(+mmod[1]/100)},+mmod[2],now);
  if((mmod=text.match(/포만도 \+(\d+)/)))p.satiety=clamp((p.satiety??100)+(+mmod[1]),0,100);
  if(/출혈 지속시간 50% 감소/.test(text)){const s=p.statuses?.bleed;if(s&&s.until>now)s.until=now+(s.until-now)*.5}
  if((mmod=text.match(/(\d+)% 상태이상/))&&Math.random()<+mmod[1]/100)applyStatus(p,pick(["poison","bleed","slow","fear","confusion"]),1,null,null,now,null,match);
  if((mmod=text.match(/(\d+)% 혼란(?!\s*\d)/))&&Math.random()<+mmod[1]/100)applyStatus(p,"confusion",1,5,null,now,null,match);
  recordAdvancedEventIntel(match,p,text,now);

  if(/다른 플레이어.*흔적|최근.*플레이어 흔적|출입 흔적|최근.*방문 플레이어/.test(text)){
    const row=recordPlayerTraceIntel(match,p,now);summary.push(row?"플레이어 흔적 획득":"플레이어 흔적 없음");
  }
  if(/특수재료 후보 공개|특수재료 후보|특수 이벤트.*보정/.test(text)){
    const row=recordSpecialCandidateIntel(match,p,now);summary.push(row?.items?.length?"특수재료 후보 확인":"특수재료 후보 없음");
  }
  if(/추천 지역 표시|재료 카테고리.*추천 지역/.test(text)){
    const row=recordMaterialHintIntel(p,now);summary.push(row?.regions?.length?"추천 파밍 지역 확인":"추천 지역 정보 없음");
  }
  if(/다음 이벤트 종류 미리 확인/.test(text)){
    const candidates=ENCOUNTER_EVENTS.filter(x=>x.region===p.region&&x.id!==e.id);
    const next=candidates.length?pick(candidates):null;
    if(next){pushIntel(ensureIntel(p).eventHints,{kind:"event_hint",region:p.region,eventId:next.id,name:next.name,type:next.type,at:now});summary.push("다음 이벤트 정보 획득")}
  }
  if(successMod)eventModsBefore.nextEventSuccess=null;
  const noiseLevel=eventNoiseLevel(e,text);
  if(noiseLevel){recordNoise(match,p,noiseLevel,e.id,now);summary.push("소음 "+noiseLevel+" 발생")}
  if(!summary.length)summary.push("이벤트 효과 적용");

  return {ok:true,eventId:e.id,choiceIndex:index,text,rewards,summary:summary.join(" · "),elapsed:match.elapsed};
}
function lootEquipScore(id){const it=item(id);return (it?.atk||0)+(it?.def||0)*.8+(it?.tier==="최종"?30:it?.tier==="준최종"?20:it?.tier==="희귀 시너지"?14:it?.tier==="희귀"?8:0)}
function removeCorpseIfEmpty(match,corpse){
  if(!corpse)return false;
  const empty=!corpse.eq.length&&!Object.values(corpse.mat||{}).some(n=>n>0)&&!Object.values(corpse.con||{}).some(n=>n>0);
  if(!empty)return false;
  const i=match.corpses.indexOf(corpse);if(i>=0)match.corpses.splice(i,1);return true;
}
export function lootCorpse(match,p,corpseId,kind,id,qty=1,replace=false,now=Date.now()){
  const corpse=match.corpses.find(x=>x.id===corpseId&&x.region===p.region&&x.expiresAt>now);
  if(!corpse)return {ok:false,error:"corpse_missing"};
  const it=item(id);if(!it)return {ok:false,error:"invalid_loot"};
  qty=Math.max(1,Math.floor(qty||1));
  if(kind==="mat"){
    const have=corpse.mat[id]||0;if(have<=0)return {ok:false,error:"loot_missing"};
    const n=Math.min(qty,have);p.mat[id]=(p.mat[id]||0)+n;corpse.mat[id]-=n;if(corpse.mat[id]<=0)delete corpse.mat[id];
    removeCorpseIfEmpty(match,corpse);return {ok:true,n,itemId:id};
  }
  if(kind==="con"){
    const have=corpse.con[id]||0;if(have<=0)return {ok:false,error:"loot_missing"};
    const kinds=Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0);
    if((p.con[id]||0)<=0&&kinds.length>=3)return {ok:false,error:"inventory_full"};
    const n=Math.min(qty,have);p.con[id]=(p.con[id]||0)+n;corpse.con[id]-=n;if(corpse.con[id]<=0)delete corpse.con[id];
    removeCorpseIfEmpty(match,corpse);return {ok:true,n,itemId:id};
  }
  if(kind==="eq"){
    const ix=corpse.eq.indexOf(id);if(ix<0)return {ok:false,error:"loot_missing"};
    if(p.eq.length>=3){
      if(!replace)return {ok:false,error:"equipment_full"};
      let worst=0,worstScore=Infinity;
      for(let i=0;i<p.eq.length;i++){const score=lootEquipScore(p.eq[i]);if(score<worstScore){worstScore=score;worst=i}}
      const old=p.eq[worst];p.eq.splice(worst,1,id);corpse.eq.splice(ix,1,old);
      return {ok:true,n:1,itemId:id,replaced:old};
    }
    p.eq.push(id);corpse.eq.splice(ix,1);removeCorpseIfEmpty(match,corpse);return {ok:true,n:1,itemId:id};
  }
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
  const recommendedReady=recommendedCrafts(p,12).filter(x=>x.ready);
  if(recommendedReady.length)return recommendedReady[0].id;
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
  const targetRec=recommendedCrafts(p,4).find(x=>!x.ready&&x.missing?.length);
  const wanted=new Set(targetRec?.missing?.map(x=>x.id)||[]);
  let best=opts[0],bestScore=-Infinity;
  for(const r of opts){
    let s=Math.random()*.2,pool=POOLS[r]||[];
    const wantedHits=pool.filter(id=>wanted.has(id)).length;
    if(wantedHits)s+=wantedHits*(p.ai==="craft" ? .42 : .22);
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
function aiLootChoice(match,p,now){
  const corpse=(match.corpses||[]).find(c=>c.region===p.region&&c.expiresAt>now&&(c.eq.length||Object.keys(c.mat).length||Object.keys(c.con).length));
  if(!corpse)return null;
  const mats=Object.entries(corpse.mat||{}).filter(([,n])=>n>0);
  if(mats.length){const[id,n]=mats[0];return{corpseId:corpse.id,kind:"mat",id,qty:n,replace:false}}
  const consumables=Object.entries(corpse.con||{}).filter(([,n])=>n>0).sort((a,b)=>(item(b[0])?.heal||0)-(item(a[0])?.heal||0));
  for(const[id,n]of consumables){
    const kinds=Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0);
    if((p.con[id]||0)>0||kinds.length<3)return{corpseId:corpse.id,kind:"con",id,qty:n,replace:false}
  }
  const gearValue=id=>lootEquipScore(id)+Math.max(0,recommendedGearScore(p,id,item(id))*.35);
  const best=[...(corpse.eq||[])].sort((a,b)=>gearValue(b)-gearValue(a))[0];
  if(best){
    if(p.eq.length<3)return{corpseId:corpse.id,kind:"eq",id:best,qty:1,replace:false};
    const worst=Math.min(...p.eq.map(gearValue));
    if(gearValue(best)>worst+2)return{corpseId:corpse.id,kind:"eq",id:best,qty:1,replace:true};
  }
  return null;
}
function aiQueue(match,p,type,payload,now){
  const r=beginServerAction(match,p,type,payload||{},now);
  return !!r.ok;
}
function aiChooseEncounterCommand(match,p,target,now){
  if(!target)return null;
  if(aiShouldAvoidFight(match,p,target,now))return{type:"flee",payload:{}};
  const skillScore=aiSkillUtility(match,p,target,now);
  const useSkill=target.kind==="player"?(skillScore>.85||(skillScore>.45&&Math.random()<.45)):(skillScore>.90||(skillScore>.50&&Math.random()<.35));
  return{type:useSkill?"skill":"attack",payload:{}};
}
export function runAIStep(match,p,now=Date.now()){
  if(!p?.isAI||!p.alive||p.pendingAction||status(p,"sleep",now))return false;
  if(status(p,"actionDelay",now)&&Math.random()<.25)return false;

  if(p.pendingEvent){
    const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);
    if(e?.choices?.length){
      const available=e.choices.map((_,i)=>i).filter(i=>eventChoiceAvailability(e,p,i).available);
      if(available.length)resolveEventChoice(match,p,pick(available),now);
      else p.pendingEvent=null;
    }else p.pendingEvent=null;
    return true;
  }

  if(p.encounter){
    const cmd=aiChooseEncounterCommand(match,p,encounterTarget(match,p),now);
    return cmd?aiQueue(match,p,cmd.type,cmd.payload,now):false;
  }

  if((match.corpses||[]).some(c=>c.region===p.region&&c.expiresAt>now)&&Math.random()<(p.ai==="craft" ? .28 : .16)){
    const loot=aiLootChoice(match,p,now);
    if(loot&&aiQueue(match,p,"loot_corpse",loot,now))return true;
  }

  const heal=aiBestHeal(p);
  if(heal&&(aiHpRatio(match,p,now)<.48||aiHasBadStatus(p,now))){
    if(aiQueue(match,p,"use_item",{id:heal},now))return true;
  }

  if(aiShouldUseAction(match,p,now)){
    if(aiQueue(match,p,"char_action",{},now))return true;
  }

  const craftId=aiChooseCraft(p);
  if(craftId&&((p.ai==="craft"&&Math.random()<.65)||Math.random()<.18)){
    if(aiQueue(match,p,"craft",{id:craftId},now))return true;
  }

  const crowded=sameRegion(match,p.region).length-1;
  if(!status(p,"bind",now)&&p.ai==="safe"&&crowded>0&&aiHpRatio(match,p,now)<.65){
    const to=aiMoveChoice(match,p);
    if(to&&aiQueue(match,p,"move",{to},now))return true;
  }

  let searchChance=.58;
  if(p.ai==="aggro")searchChance=.76;
  if(p.ai==="craft")searchChance=.68;
  if(p.ai==="safe"&&aiHpRatio(match,p,now)<.45)searchChance=.38;
  if(p.sp>=3&&Math.random()<searchChance){
    if(aiQueue(match,p,"search",{},now))return true;
  }

  if(!status(p,"bind",now)){
    const to=aiMoveChoice(match,p);
    if(to&&aiQueue(match,p,"move",{to},now))return true;
  }
  return false;
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
