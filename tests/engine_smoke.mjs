import assert from "node:assert/strict";
import { CHARACTERS, REGIONS, createAIPlayer, createServerPlayer } from "../src/game_data.js";
import { ITEMS, WILD_TEMPLATES, ENCOUNTER_EVENTS } from "../src/offline_content.js";
import { beginServerAction, completeAction, initWorld, publicPlayer, resolveEventChoice, runAIStep } from "../src/match_engine.js";

assert.equal(CHARACTERS.length,51);
assert.equal(REGIONS.length,13);
assert.equal(Object.keys(ITEMS).length,169);
assert.equal(WILD_TEMPLATES.length,12);
assert.equal(ENCOUNTER_EVENTS.length,78);

const t0=1_700_000_000_000;
const p=createServerPlayer({sessionId:"s1",playerName:"QA",charId:"c01",startRegion:"city"},0);
const match={matchId:"qa",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[p],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
initWorld(match);
assert.ok(match.wilds.length>0);
assert.equal(Object.keys(match.uniqueSpecials).length,41);
assert.equal(match.uniqueSpecials.special_01.state,"unspawned");

let r=beginServerAction(match,p,"move",{to:"estate"},t0);
assert.equal(r.ok,true);
completeAction(match,p,r.action.completeAt+1);
assert.equal(p.region,"estate");

const craftable=Object.entries(ITEMS).find(([,it])=>it?.r&&Object.keys(it.r).every(k=>ITEMS[k]));
assert.ok(craftable);
const [craftId,craftItem]=craftable;
for(const [id,n]of Object.entries(craftItem.r)){
  const src=ITEMS[id];
  if(src.t==="m")p.mat[id]=(p.mat[id]||0)+n;
  else if(src.t==="c")p.con[id]=(p.con[id]||0)+n;
  else for(let i=0;i<n;i++)p.eq.push(id);
}
r=beginServerAction(match,p,"craft",{id:craftId},t0+10_000);
assert.equal(r.ok,true);
const crafted=completeAction(match,p,r.action.completeAt+1);
assert.equal(crafted.ok,true);

p.encounter={kind:"wild",wildId:match.wilds[0].id};
assert.equal(beginServerAction(match,p,"search",{},t0+20_000).error,"encounter_in_progress");
p.encounter=null;
p.pendingEvent=ENCOUNTER_EVENTS[0].id;
assert.equal(beginServerAction(match,p,"search",{},t0+20_100).error,"event_choice_required");
p.pendingEvent=null;

const ai=createAIPlayer(1,"c02","city","aggro");
assert.equal(ai.isAI,true);
assert.equal(ai.playerName,"이하령");
match.players.push(ai);
const oldRandom=Math.random;
Math.random=()=>0;
assert.equal(runAIStep(match,ai,t0+30_000),true);
assert.ok(ai.pendingAction,"AI should queue a timed server action instead of mutating instantly");
const aiAction=ai.pendingAction;
completeAction(match,ai,aiAction.completeAt+1);
Math.random=oldRandom;

const specialRecipe=Object.entries(ITEMS).find(([,it])=>it?.r&&Object.keys(it.r).some(k=>/^special_\d{2}$/.test(k)));
assert.ok(specialRecipe);
const [specialCraftId,specialCraftItem]=specialRecipe;
for(const [id,n] of Object.entries(specialCraftItem.r)){
  const src=ITEMS[id];
  if(/^special_\d{2}$/.test(id)){
    p.mat[id]=n;
    match.uniqueSpecials[id]={state:"held",holderId:p.playerId,region:null};
  } else if(src.t==="m") p.mat[id]=(p.mat[id]||0)+n;
  else if(src.t==="c") p.con[id]=(p.con[id]||0)+n;
  else for(let i=0;i<n;i++)p.eq.push(id);
}
r=beginServerAction(match,p,"craft",{id:specialCraftId},t0+40_000);
assert.equal(r.ok,true);
completeAction(match,p,r.action.completeAt+1);
for(const id of Object.keys(specialCraftItem.r).filter(k=>/^special_\d{2}$/.test(k)))assert.equal(match.uniqueSpecials[id].state,"consumed");

const support=createServerPlayer({sessionId:"s3",playerName:"Support",charId:"c07",startRegion:"city"},2);
support.sp=10;match.players.push(support);
r=beginServerAction(match,support,"char_action",{},t0+60_000);
assert.equal(r.ok,true);
completeAction(match,support,r.action.completeAt+1);
assert.ok(support.sp>10,"c07 additional action should restore SP rather than spend it");

const haku=createServerPlayer({sessionId:"s4",playerName:"Haku",charId:"c13",startRegion:"city"},3);
haku.con.mint_choco_fish=1;match.players.push(haku);
r=beginServerAction(match,haku,"use_item",{id:"mint_choco_fish"},t0+70_000);
assert.equal(r.ok,true);
completeAction(match,haku,r.action.completeAt+1);
assert.equal(haku.alive,false,"Haku mint-choco reaction should be fatal");
assert.ok(match.corpses.some(x=>x.playerId===undefined&&x.name==="Haku")||match.corpses.some(x=>x.name==="Haku"));

const eater=createServerPlayer({sessionId:"s5",playerName:"Eater",charId:"c01",startRegion:"city"},4);
eater.hp=40;eater.con.sandwich=3;match.players.push(eater);
for(let i=0;i<3;i++){
  r=beginServerAction(match,eater,"use_item",{id:"sandwich"},t0+80_000+i*3000);
  assert.equal(r.ok,true);
  completeAction(match,eater,r.action.completeAt+1);
}
assert.equal(eater.foodRepeatCount,2);
assert.ok(eater.hp<40+36,"repeat food healing should be reduced on repeated use");

const healer=createServerPlayer({sessionId:"s6",playerName:"Healer",charId:"c13",startRegion:"city"},5);
const dummy=createAIPlayer(6,"c02","city","balanced");
healer.hp=30;healer.encounter={kind:"player",targetId:dummy.playerId};match.players.push(healer,dummy);
let oldRnd=Math.random;Math.random=()=>0.999;
r=beginServerAction(match,healer,"skill",{},t0+90_000);
assert.equal(r.ok,true);
completeAction(match,healer,r.action.completeAt+1);
Math.random=oldRnd;
assert.ok(healer.hp>=50,"c13 combat heal should apply even when the skill misses");

const sleeper=createAIPlayer(7,"c03","city","balanced");
const striker=createServerPlayer({sessionId:"s8",playerName:"Striker",charId:"c38",startRegion:"city"},7);
sleeper.statuses.sleep={stacks:1,until:t0+200_000,sourceId:null};
striker.encounter={kind:"player",targetId:sleeper.playerId};match.players.push(sleeper,striker);
oldRnd=Math.random;Math.random=()=>0;
r=beginServerAction(match,striker,"attack",{},t0+100_000);
assert.equal(r.ok,true);
completeAction(match,striker,r.action.completeAt+1);
Math.random=oldRnd;
assert.equal(sleeper.statuses.sleep,undefined,"damage should wake sleeping targets");
assert.ok((sleeper.statusImmunity.sleep||0)>t0+100_000,"woken target should gain sleep immunity");

const poisonKiller=createServerPlayer({sessionId:"s9",playerName:"Poisoner",charId:"c17",startRegion:"city"},8);
const poisonVictim=createAIPlayer(9,"c01","city","balanced");
poisonVictim.hp=1;poisonVictim.statuses.poison={stacks:1,until:t0+300_000,sourceId:poisonKiller.playerId};poisonVictim.nextStatusTick=t0+110_000;
match.players.push(poisonKiller,poisonVictim);
const beforeKills=poisonKiller.kills;
publicPlayer(match,poisonVictim,t0+112_100);
assert.equal(poisonVictim.alive,false,"poison tick should kill low-HP victim");
assert.equal(poisonKiller.kills,beforeKills+1,"status death should credit the source player");
assert.ok(match.corpses.some(x=>x.name==="서노리"),"status death should create a corpse");

const eventPlayer=createServerPlayer({sessionId:"s10",playerName:"EventQA",charId:"c01",startRegion:"city"},9);
match.players.push(eventPlayer);
eventPlayer.pendingEvent="E001";
const beforeOffset=match.timeOffsetMs||0;
oldRnd=Math.random;Math.random=()=>0.5;
const er=resolveEventChoice(match,eventPlayer,0,t0+120_000);
Math.random=oldRnd;
assert.equal(er.ok,true);
assert.equal(eventPlayer.pendingEvent,null);
assert.ok((match.timeOffsetMs||0)>=beforeOffset+1000,"event time cost should advance virtual match time");
assert.ok(typeof er.summary==="string"&&er.summary.length>0);

const looter=createServerPlayer({sessionId:"s11",playerName:"Looter",charId:"c01",startRegion:"city"},10);
match.players.push(looter);
match.corpses.push({id:"corpse_test",name:"LootTarget",region:"city",eq:[],mat:{iron:3},con:{},expiresAt:t0+400_000});
r=beginServerAction(match,looter,"loot_corpse",{corpseId:"corpse_test",kind:"mat",id:"iron",qty:3},t0+130_000);
assert.equal(r.ok,true);
assert.ok(r.action.completeAt>r.action.startedAt,"corpse loot must take server time");
assert.equal(looter.mat.iron||0,0,"loot should not transfer before action completes");
completeAction(match,looter,r.action.completeAt+1);
assert.equal(looter.mat.iron,3,"loot should transfer after the timed action");
assert.equal(match.corpses.some(x=>x.id==="corpse_test"),false,"empty corpse should be removed");

const riskPlayer=createServerPlayer({sessionId:"s12",playerName:"RiskQA",charId:"c01",startRegion:"city"},11);
match.players.push(riskPlayer);
riskPlayer.pendingEvent="E001";
const hpBeforeRisk=riskPlayer.hp;
oldRnd=Math.random;Math.random=()=>0.99;
const riskSafe=resolveEventChoice(match,riskPlayer,0,t0+140_000);
Math.random=oldRnd;
assert.equal(riskSafe.ok,true);
assert.equal(riskPlayer.hp,hpBeforeRisk,"15% event damage must not be applied unconditionally");

riskPlayer.pendingEvent="E001";
oldRnd=Math.random;Math.random=()=>0;
const riskHit=resolveEventChoice(match,riskPlayer,0,t0+150_000);
Math.random=oldRnd;
assert.ok(riskPlayer.hp<hpBeforeRisk,"15% event damage should apply when the probability roll succeeds");

const pub=publicPlayer(match,p,t0+50_000);
assert.equal(pub.playerName,"QA");
assert.ok(pub.inventory);
console.log("engine smoke ok", {characters:CHARACTERS.length,items:Object.keys(ITEMS).length,wilds:match.wilds.length,crafted:craftId});
