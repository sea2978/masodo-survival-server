import assert from "node:assert/strict";
import { CHARACTERS, createServerPlayer } from "../src/game_data.js";
import { beginServerAction, completeAction, initWorld } from "../src/match_engine.js";

const realRandom=Math.random;
let cases=0;
for(const [idx,ch] of CHARACTERS.entries()){
  for(const mode of ["hit","miss"]){
    const t0=1_702_000_000_000+idx*100_000+(mode==="miss"?50_000:0);
    const a=createServerPlayer({sessionId:"a"+idx+mode,playerName:ch.name,charId:ch.id,startRegion:"city"},0);
    const b=createServerPlayer({sessionId:"b"+idx+mode,playerName:"Target",charId:"c01",startRegion:"city"},1);
    a.sp=a.maxSp;a.hp=a.maxHp;b.hp=b.maxHp;
    const m={matchId:"skill-"+idx+"-"+mode,phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[a,b],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
    initWorld(m);a.encounter={kind:"player",targetId:b.playerId};
    Math.random=()=>mode==="hit"?0:.999;
    const accepted=beginServerAction(m,a,"skill",{},t0);
    assert.equal(accepted.ok,true,`${ch.id} skill should be accepted (${mode})`);
    const result=completeAction(m,a,accepted.action.completeAt+1);
    assert.ok(result&&typeof result.ok==="boolean",`${ch.id} skill result missing (${mode})`);
    assert.ok(Number.isFinite(a.hp)&&Number.isFinite(a.sp));
    assert.ok(Number.isFinite(b.hp)&&Number.isFinite(b.sp));
    assert.ok(a.sp>=0&&a.sp<=a.maxSp+1e-6);
    assert.ok((a.cdCUntil||0)>t0);
    cases++;
  }
}
Math.random=realRandom;
assert.equal(cases,104);
console.log("all combat skills runtime audit ok",{cases});
