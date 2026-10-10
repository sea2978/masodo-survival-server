import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { beginServerAction, completeAction, initWorld } from "../src/match_engine.js";

const t0=1_700_300_000_000;
const a=createServerPlayer({sessionId:"a",playerName:"A",charId:"c01",startRegion:"city"},0);
const b=createServerPlayer({sessionId:"b",playerName:"B",charId:"c02",startRegion:"city"},1);
const match={matchId:"race",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[a,b],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
initWorld(match);
match.corpses.push({id:"corpse_race",name:"RaceTarget",region:"city",eq:[],mat:{iron:2},con:{},expiresAt:t0+60_000});

const ra=beginServerAction(match,a,"loot_corpse",{corpseId:"corpse_race",kind:"mat",id:"iron",qty:2},t0);
const rb=beginServerAction(match,b,"loot_corpse",{corpseId:"corpse_race",kind:"mat",id:"iron",qty:2},t0);
assert.equal(ra.ok,true);
assert.equal(rb.ok,true);

const first=completeAction(match,a,ra.action.completeAt+1);
assert.equal(first.ok,true);
assert.equal(a.mat.iron,2);

const second=completeAction(match,b,Math.max(rb.action.completeAt,ra.action.completeAt)+2);
assert.equal(second.ok,false);
assert.equal(second.error,"corpse_missing");
assert.equal(b.mat.iron||0,0);
assert.equal(match.corpses.some(x=>x.id==="corpse_race"),false);

console.log("concurrency smoke ok",{winner:a.playerName,loser:b.playerName});
