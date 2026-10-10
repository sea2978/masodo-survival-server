import assert from "node:assert/strict";
import { CHARACTERS, REGIONS, createAIPlayer, createServerPlayer } from "../src/game_data.js";
import { ITEMS, WILD_TEMPLATES, ENCOUNTER_EVENTS } from "../src/offline_content.js";
import { beginServerAction, completeAction, initWorld, publicPlayer, runAIStep } from "../src/match_engine.js";

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

const pub=publicPlayer(match,p,t0+50_000);
assert.equal(pub.playerName,"QA");
assert.ok(pub.inventory);
console.log("engine smoke ok", {characters:CHARACTERS.length,items:Object.keys(ITEMS).length,wilds:match.wilds.length,crafted:craftId});
