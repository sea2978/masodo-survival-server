import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { ITEMS } from "../src/offline_content.js";
import { beginServerAction, initWorld } from "../src/match_engine.js";

const recipe=Object.entries(ITEMS).find(([id,it])=>it.t==="c"&&it.r&&id!=="water"&&id!=="bread"&&id!=="chocolate");
assert.ok(recipe,"consumable recipe required for audit");
const [id,it]=recipe,t0=1_706_000_000_000;
const p=createServerPlayer({sessionId:"craft",playerName:"CraftQA",charId:"c01",startRegion:"city"},0);
const m={matchId:"craft",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[p],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};initWorld(m);
for(const [rid,n] of Object.entries(it.r)){
  const src=ITEMS[rid];
  if(src.t==="m")p.mat[rid]=(p.mat[rid]||0)+n;
  else if(src.t==="c")p.con[rid]=(p.con[rid]||0)+n;
  else for(let i=0;i<n;i++)p.eq.push(rid);
}
for(const filler of ["water","bread","chocolate","coffee"]){
  if(filler!==id&&(p.con[filler]||0)<=0&&Object.keys(p.con).filter(k=>(p.con[k]||0)>0).length<3)p.con[filler]=1;
}
assert.equal(Object.keys(p.con).filter(k=>(p.con[k]||0)>0).length,3);
assert.equal(p.con[id]||0,0);
const recipeSnapshot=Object.fromEntries(Object.keys(it.r).map(k=>[k,{mat:p.mat[k]||0,con:p.con[k]||0,eq:p.eq.filter(x=>x===k).length}]));
const r=beginServerAction(m,p,"craft",{id},t0);
assert.equal(r.ok,false);
assert.equal(r.error,"inventory_full");
for(const [k,v] of Object.entries(recipeSnapshot)){
  assert.equal(p.mat[k]||0,v.mat,"material consumed on rejected craft: "+k);
  assert.equal(p.con[k]||0,v.con,"consumable consumed on rejected craft: "+k);
  assert.equal(p.eq.filter(x=>x===k).length,v.eq,"equipment consumed on rejected craft: "+k);
}
console.log("craft preflight audit ok",{recipe:id});
