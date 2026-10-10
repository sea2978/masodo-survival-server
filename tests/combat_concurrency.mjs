import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { beginServerAction, completeAction, initWorld } from "../src/match_engine.js";

const t0=1_700_400_000_000;
const a=createServerPlayer({sessionId:"a",playerName:"A",charId:"c38",startRegion:"city"},0);
const b=createServerPlayer({sessionId:"b",playerName:"B",charId:"c39",startRegion:"city"},1);
const match={matchId:"combat-race",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[a,b],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
initWorld(match);

// Force both players into a mutual encounter and lethal HP so both attacks can be queued.
a.encounter={kind:"player",targetId:b.playerId};
b.encounter={kind:"player",targetId:a.playerId};
a.hp=1;b.hp=1;

const oldRandom=Math.random;Math.random=()=>0;
const ra=beginServerAction(match,a,"attack",{},t0);
const rb=beginServerAction(match,b,"attack",{},t0);
assert.equal(ra.ok,true);
assert.equal(rb.ok,true);

// A resolves first. B must die and its already queued action must be cancelled.
const firstAt=Math.min(ra.action.completeAt,rb.action.completeAt);
const first=completeAction(match,a,Math.max(firstAt,ra.action.completeAt)+1);
assert.equal(first.ok,true);
assert.equal(b.alive,false);
assert.equal(b.pendingAction,null);
assert.equal(a.kills,1);

// A dead participant can never execute a ghost action after death.
const ghost=completeAction(match,b,Math.max(ra.action.completeAt,rb.action.completeAt)+5);
assert.equal(ghost,null);
assert.equal(a.alive,true);
assert.equal(b.kills,0);
assert.equal(match.corpses.filter(c=>c.name==="B").length,1);

Math.random=oldRandom;
console.log("combat concurrency ok",{winner:a.playerName,kills:a.kills});
