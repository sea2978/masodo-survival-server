import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { beginServerAction, completeAction, initWorld, publicPlayer } from "../src/match_engine.js";

const t0=1_700_410_000_000;
const defender=createServerPlayer({sessionId:"d",playerName:"Def",charId:"c31",startRegion:"city"},0);
const tempo=createServerPlayer({sessionId:"t",playerName:"Tempo",charId:"c14",startRegion:"city"},1);
const target=createServerPlayer({sessionId:"x",playerName:"Target",charId:"c01",startRegion:"city"},2);
const match={matchId:"audit",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[defender,tempo,target],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
initWorld(match);

// c31 passive defFlat +2 must be present in public DEF.
assert.equal(publicPlayer(match,defender,t0).def,3);

// c14 passive cdRate=.20 should shorten its combat skill cooldown.
tempo.encounter={kind:"player",targetId:target.playerId};
const oldRandom=Math.random;Math.random=()=>0;
const r=beginServerAction(match,tempo,"skill",{},t0);
assert.equal(r.ok,true);
completeAction(match,tempo,r.action.completeAt+1);
Math.random=oldRandom;
const cdSec=(tempo.cdCUntil-(r.action.completeAt+1))/1000;
assert.ok(Math.abs(cdSec-55)<0.001,"c14 cooldown-rate +20% should make its 48s base cooldown 40s");

// c30 proficiency modifier is tested with a deterministic hit.
const prof=createServerPlayer({sessionId:"p",playerName:"Prof",charId:"c30",startRegion:"city"},3);
const victim=createServerPlayer({sessionId:"v",playerName:"Victim",charId:"c01",startRegion:"city"},4);
match.players.push(prof,victim);
prof.eq.push("basic_terminal");
prof.encounter={kind:"player",targetId:victim.playerId};
const weapon="단말",before=prof.proficiency[weapon]||0;
Math.random=()=>0;
const pAction=beginServerAction(match,prof,"attack",{},t0+100_000);
completeAction(match,prof,pAction.action.completeAt+1);
Math.random=oldRandom;
assert.ok((prof.proficiency[weapon]||0)-before===1.5,"c30 records replace retired proficiency amplifier");

console.log("passive audit ok",{def:publicPlayer(match,defender,t0).def,cdSec,profGain:(prof.proficiency[weapon]||0)-before});
