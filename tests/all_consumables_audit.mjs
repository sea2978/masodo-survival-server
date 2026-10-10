import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { ITEMS } from "../src/offline_content.js";
import { beginServerAction, completeAction, initWorld, publicPlayer } from "../src/match_engine.js";

const t0=1_704_000_000_000;
const consumables=Object.entries(ITEMS).filter(([,it])=>it.t==="c");
assert.equal(consumables.length,17);

function matchFor(p,id){const m={matchId:id,phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[p],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};initWorld(m);return m}

for(const [idx,[id,it]] of consumables.entries()){
  const p=createServerPlayer({sessionId:"c"+idx,playerName:id,charId:"c01",startRegion:"city"},idx);
  const m=matchFor(p,"con-"+id);p.con[id]=1;p.hp=Math.max(10,p.maxHp-40);p.sp=Math.max(10,p.maxSp-40);p.satiety=40;
  const a=beginServerAction(m,p,"use_item",{id},t0+idx*5000);
  assert.equal(a.ok,true,`${id} should be usable`);
  assert.ok(Math.abs((a.action.completeAt-a.action.startedAt)/1000-(it.useTime??1.2))<1e-9,`${id} useTime mismatch`);
  const r=completeAction(m,p,a.action.completeAt+1);
  assert.equal(r.ok,true,`${id} use result`);
  assert.equal(p.con[id]||0,0,`${id} should be consumed`);
  assert.ok(Number.isFinite(p.hp)&&Number.isFinite(p.sp)&&Number.isFinite(p.satiety));
}

{
  const p=createServerPlayer({sessionId:"strong",playerName:"Strong",charId:"c01",startRegion:"city"},0),m=matchFor(p,"strong");
  p.con.strong_coffee=1;
  const a=beginServerAction(m,p,"use_item",{id:"strong_coffee"},t0);completeAction(m,p,a.action.completeAt+1);
  assert.ok(p.tempEffects.some(x=>x.fx?.actionTime===-.04));
  publicPlayer(m,p,t0+31_000);
  assert.ok(p.tempEffects.some(x=>x.fx?.spRecovery===-.10),"strong coffee delayed SP recovery penalty missing");
}
{
  const p=createServerPlayer({sessionId:"anti",playerName:"Anti",charId:"c01",startRegion:"city"},0),m=matchFor(p,"anti");
  p.con.antidote=1;p.statuses.poison={stacks:3,until:t0+20_000,sourceId:null};
  const a=beginServerAction(m,p,"use_item",{id:"antidote"},t0);completeAction(m,p,a.action.completeAt+1);
  assert.equal(p.statuses.poison?.stacks,1);
  assert.ok(p.statuses.poison.until<t0+20_000);
}
{
  const p=createServerPlayer({sessionId:"band",playerName:"Band",charId:"c01",startRegion:"city"},0),m=matchFor(p,"band");
  p.con.bandage=1;p.statuses.bleed={stacks:3,until:t0+20_000,sourceId:null};
  const a=beginServerAction(m,p,"use_item",{id:"bandage"},t0);completeAction(m,p,a.action.completeAt+1);
  assert.equal(p.statuses.bleed?.stacks,1);
}
{
  const p=createServerPlayer({sessionId:"haku",playerName:"Haku",charId:"c13",startRegion:"city"},0),m=matchFor(p,"haku");
  p.con.mint_choco_fish=1;const a=beginServerAction(m,p,"use_item",{id:"mint_choco_fish"},t0);completeAction(m,p,a.action.completeAt+1);
  assert.equal(p.alive,false);
}
{
  const p=createServerPlayer({sessionId:"aba",playerName:"Abaddon",charId:"c49",startRegion:"city"},0),m=matchFor(p,"aba");
  p.hp=10;p.sp=10;p.satiety=10;p.con.carbonara_mint_fish=1;p.mat.iron=3;p.eq.push("basic_tool");
  const a=beginServerAction(m,p,"use_item",{id:"carbonara_mint_fish"},t0);completeAction(m,p,a.action.completeAt+1);
  assert.equal(p.hp,p.maxHp);assert.equal(p.sp,p.maxSp);assert.equal(p.satiety,100);assert.equal(p.eq.length,0);assert.equal(p.mat.iron||0,0);
}
console.log("all consumables audit ok",{consumables:consumables.length});
