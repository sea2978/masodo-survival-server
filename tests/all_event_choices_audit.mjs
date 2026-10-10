import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { ENCOUNTER_EVENTS } from "../src/offline_content.js";
import { eventChoiceAvailability, initWorld, resolveEventChoice } from "../src/match_engine.js";

const realRandom=Math.random;let cases=0;
for(const [ei,e] of ENCOUNTER_EVENTS.entries()){
  for(let ci=0;ci<e.choices.length;ci++){
    const t0=1_705_000_000_000+ei*100_000+ci*10_000;
    const p=createServerPlayer({sessionId:`e${ei}-${ci}`,playerName:"EventAudit",charId:"c01",startRegion:e.region},0);
    p.eq=["basic_tool","basic_terminal"];p.mat.precision=10;p.mat.electronics=10;p.mat.iron=10;p.mat.steel=10;p.mat.alloy=5;p.hp=p.maxHp;p.sp=p.maxSp;
    const other=createServerPlayer({sessionId:"other",playerName:"Other",charId:"c02",startRegion:e.region},1);
    const m={matchId:`event-${ei}-${ci}`,phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players:[p,other],eventPity:{},lastEventId:null,corpses:[],worldLog:[]};initWorld(m);
    p.pendingEvent=e.id;
    const av=eventChoiceAvailability(e,p,ci);assert.equal(av.available,true,`${e.id}.${ci+1} should be available in fully provisioned audit fixture: ${av.reason||""}`);
    Math.random=()=>.5;
    const result=resolveEventChoice(m,p,ci,t0+1000);
    assert.equal(result.ok,true,`${e.id}.${ci+1} resolution failed`);
    assert.equal(p.pendingEvent,null);
    assert.ok(Number.isFinite(p.hp)&&Number.isFinite(p.sp)&&Number.isFinite(p.satiety),`${e.id}.${ci+1} numeric corruption`);
    assert.ok(p.eq.length<=3,`${e.id}.${ci+1} equipment overflow`);
    assert.ok(Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0).length<=3,`${e.id}.${ci+1} consumable type overflow`);
    assert.equal(Object.keys(m.uniqueSpecials).length,41);
    cases++;
  }
}
Math.random=realRandom;
assert.equal(cases,234);
console.log("all event choices runtime audit ok",{cases});
