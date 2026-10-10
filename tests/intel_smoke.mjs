import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { ENCOUNTER_EVENTS } from "../src/offline_content.js";
import { initWorld, publicPlayer, resolveEventChoice } from "../src/match_engine.js";

const t0=1_700_310_000_000;
const p=createServerPlayer({sessionId:"intel",playerName:"IntelQA",charId:"c01",startRegion:"church"},0);
const other=createServerPlayer({sessionId:"other",playerName:"Other",charId:"c02",startRegion:"factory"},1);
const match={matchId:"intel",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[p,other],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
initWorld(match);

p.pendingEvent="E017";
const oldRandom=Math.random;Math.random=()=>0;
const r=resolveEventChoice(match,p,0,t0+1000);
Math.random=oldRandom;
assert.equal(r.ok,true);
assert.ok(p.intel?.playerTraces?.length===1);
assert.equal(p.intel.playerTraces[0].name,"Other");
assert.equal(p.intel.playerTraces[0].region,"factory");

const pub=publicPlayer(match,p,t0+2000);
assert.ok(pub.intel?.playerTraces?.length===1);
console.log("intel smoke ok",pub.intel.playerTraces[0]);
