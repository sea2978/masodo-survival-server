import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { ITEMS } from "../src/offline_content.js";
import { beginServerAction, initWorld } from "../src/match_engine.js";

const id="__audit_consumable";
ITEMS[id]={n:"감사 전용 소모품",t:"c",r:{iron:1},kind:"medicine",useTime:1.2};
const t0=1_706_000_000_000;
const p=createServerPlayer({sessionId:"craft",playerName:"CraftQA",charId:"c01",startRegion:"city"},0);
const m={matchId:"craft",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[p],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};initWorld(m);
p.mat.iron=1;p.con.water=1;p.con.bread=1;p.con.chocolate=1;
assert.equal(Object.keys(p.con).filter(k=>(p.con[k]||0)>0).length,3);
const beforeIron=p.mat.iron;
const r=beginServerAction(m,p,"craft",{id},t0);
assert.equal(r.ok,false);
assert.equal(r.error,"inventory_full");
assert.equal(p.mat.iron,beforeIron,"recipe ingredient must remain after output-capacity rejection");
delete ITEMS[id];
console.log("craft preflight audit ok");
