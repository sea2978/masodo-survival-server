import assert from "node:assert/strict";
import { CHARACTERS, REGIONS, createServerPlayer } from "../src/game_data.js";
import { ITEMS, WILD_TEMPLATES, ENCOUNTER_EVENTS } from "../src/offline_content.js";
import { beginServerAction, completeAction, initWorld, publicPlayer } from "../src/match_engine.js";

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

const pub=publicPlayer(match,p,t0+20_000);
assert.equal(pub.playerName,"QA");
assert.ok(pub.inventory);
console.log("engine smoke ok", {characters:CHARACTERS.length,items:Object.keys(ITEMS).length,wilds:match.wilds.length,crafted:craftId});
