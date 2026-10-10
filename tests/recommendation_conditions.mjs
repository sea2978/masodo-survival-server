import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { ENCOUNTER_EVENTS } from "../src/offline_content.js";
import { eventChoiceAvailability, initWorld, recommendedCrafts, resolveEventChoice } from "../src/match_engine.js";

const t0=1_700_200_000_000;
const p=createServerPlayer({sessionId:"rec",playerName:"RecQA",charId:"c01",startRegion:"city"},0);
const match={matchId:"rec",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[p],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
initWorld(match);

const recs=recommendedCrafts(p,12);
assert.ok(Array.isArray(recs));
assert.ok(recs.length>0,"at least one recommendation should be generated");
assert.ok(recs.every(x=>Number.isFinite(x.score)&&typeof x.reason==="string"&&Array.isArray(x.missing)));

const e004=ENCOUNTER_EVENTS.find(x=>x.id==="E004");
assert.equal(eventChoiceAvailability(e004,p,1).available,false);
p.eq.push("basic_tool");
assert.equal(eventChoiceAvailability(e004,p,1).available,true);

const e008=ENCOUNTER_EVENTS.find(x=>x.id==="E008");
assert.equal(eventChoiceAvailability(e008,p,1).available,false);
p.mat.precision=1;
assert.equal(eventChoiceAvailability(e008,p,1).available,true);
p.pendingEvent="E008";
const before=p.mat.precision;
const oldRandom=Math.random;Math.random=()=>0.5;
const result=resolveEventChoice(match,p,1,t0+1000);
Math.random=oldRandom;
assert.equal(result.ok,true);
assert.equal(p.mat.precision,before-1,"precision part must be consumed and not re-awarded");

console.log("recommendation/condition smoke ok",{recommendations:recs.length});
