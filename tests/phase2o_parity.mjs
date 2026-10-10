import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { ENCOUNTER_EVENTS } from "../src/offline_content.js";
import { beginServerAction, completeAction, initWorld, publicPlayer, resolveEventChoice } from "../src/match_engine.js";

const t0=1_700_500_000_000;
const attacker=createServerPlayer({sessionId:"a",playerName:"A",charId:"c27",startRegion:"city"},0);
const target=createServerPlayer({sessionId:"b",playerName:"B",charId:"c01",startRegion:"city"},1);
const observer=createServerPlayer({sessionId:"o",playerName:"O",charId:"c01",startRegion:"estate"},2);
const match={matchId:"parity",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[attacker,target,observer],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
initWorld(match);

// c27 action grants a one-shot next-skill damage bonus. A missed skill should not consume it.
attacker.nextSkillDamageBonus=.10;
attacker.encounter={kind:"player",targetId:target.playerId};
const oldRandom=Math.random;
Math.random=()=>.999;
let r=beginServerAction(match,attacker,"skill",{},t0);
assert.equal(r.ok,true);
completeAction(match,attacker,r.action.completeAt+1);
assert.equal(attacker.nextSkillDamageBonus,.10);

// Event noise becomes temporary server state and is visible in adjacent-region intel.
const noisy=ENCOUNTER_EVENTS.find(e=>e.id==="E004");
target.pendingEvent="E004";
Math.random=()=>.5;
const er=resolveEventChoice(match,target,0,t0+20_000);
assert.equal(er.ok,true);
assert.ok((match.noises||[]).some(x=>x.playerId===target.playerId&&x.level==="높음"));
const obs=publicPlayer(match,observer,t0+20_100);
assert.ok((obs.nearbyNoise||[]).some(x=>x.playerId===target.playerId));

// Expired noise disappears.
const later=publicPlayer(match,observer,t0+50_000);
assert.equal((later.nearbyNoise||[]).some(x=>x.playerId===target.playerId),false);

Math.random=oldRandom;
console.log("phase 2O parity/noise ok",{noiseCount:match.noises.length});
