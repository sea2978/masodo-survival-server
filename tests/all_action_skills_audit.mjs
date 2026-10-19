import {reworkState} from "../src/character_reworks.js";
import assert from "node:assert/strict";
import { CHARACTERS, createServerPlayer } from "../src/game_data.js";
import { beginServerAction, completeAction, initWorld } from "../src/match_engine.js";

const realRandom=Math.random;Math.random=()=>0;
let cases=0;
for(const [idx,ch] of CHARACTERS.entries()){
  const t0=1_703_000_000_000+idx*100_000;
  const p=createServerPlayer({sessionId:"p"+idx,playerName:ch.name,charId:ch.id,startRegion:"city"},0);
  p.hp=Math.max(30,p.maxHp-30);p.sp=Math.max(20,p.maxSp-30);
  p.statuses.poison={stacks:2,until:t0+60_000,sourceId:null};
  p.statuses.bleed={stacks:2,until:t0+60_000,sourceId:null};
  const m={matchId:"action-"+idx,phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[p],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
  initWorld(m);
  m.corpses.push({id:"corpse-"+idx,name:"Dummy",region:"city",eq:[],mat:{iron:1},con:{},expiresAt:t0+60_000});
  const target=createServerPlayer({sessionId:"target",playerName:"Target",charId:"c01",startRegion:"city"},2);m.players.push(target);p.encounter={kind:"player",targetId:target.playerId};reworkState(p).resources={paint:3,luck:3};if(ch.id==="c49")m.corpses[0].mat={};
  const accepted=beginServerAction(m,p,"char_action",{choice:ch.id==="c04"?"rail":undefined},t0);
  assert.equal(accepted.ok,true,`${ch.id} action should be accepted`);
  const result=completeAction(m,p,accepted.action.completeAt+1);
  assert.ok(result&&result.ok!==undefined,`${ch.id} action result missing`);
  assert.ok(Number.isFinite(p.hp)&&Number.isFinite(p.sp));
  assert.ok((p.cdAUntil||0)>=t0,`${ch.id} action cooldown missing`);
  cases++;
}
Math.random=realRandom;
assert.equal(cases,52);
console.log("all additional actions runtime audit ok",{cases});
