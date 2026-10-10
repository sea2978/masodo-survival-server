import assert from "node:assert/strict";
import { createServerPlayer } from "../src/game_data.js";
import { ITEMS, ENCOUNTER_EVENTS } from "../src/offline_content.js";
import { actionDuration, beginServerAction, completeAction, initWorld, publicPlayer, resolveEventChoice } from "../src/match_engine.js";

const t0=1_700_600_000_000;
const makeMatch=(players,id="audit")=>{const m={matchId:id,phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players,eventPity:{},lastEventId:null,corpses:[],worldLog:[]};initWorld(m);return m};

// Active equipped weapon controls proficiency, not the character's preferred weapon when another weapon is used.
{
  const p=createServerPlayer({sessionId:"p",playerName:"Prof",charId:"c30",startRegion:"city"},0);
  const t=createServerPlayer({sessionId:"t",playerName:"Target",charId:"c01",startRegion:"city"},1);
  const m=makeMatch([p,t],"prof");
  p.eq=["basic_sword"];p.encounter={kind:"player",targetId:t.playerId};
  const terminalBefore=p.proficiency["단말"]||0,swordBefore=p.proficiency["검"]||0;
  const old=Math.random;Math.random=()=>0;
  const a=beginServerAction(m,p,"attack",{},t0);completeAction(m,p,a.action.completeAt+1);Math.random=old;
  assert.ok((p.proficiency["검"]||0)>swordBefore);
  assert.equal(p.proficiency["단말"]||0,terminalBefore);
}

// Recovery module uses offline multiplicative 1.08 consumable-heal bonus.
{
  const p=createServerPlayer({sessionId:"h",playerName:"Heal",charId:"c01",startRegion:"city"},0);
  const m=makeMatch([p],"heal");p.eq=["recovery"];p.con.sandwich=1;p.hp=20;
  const before=p.hp,heal=ITEMS.sandwich.heal;
  const a=beginServerAction(m,p,"use_item",{id:"sandwich"},t0);completeAction(m,p,a.action.completeAt+1);
  assert.ok(Math.abs((p.hp-before)-heal*1.08)<0.001);
}

// Bespoke timing multipliers are multiplicative.
{
  const p=createServerPlayer({sessionId:"tim",playerName:"Timing",charId:"c01",startRegion:"city"},0);
  const m=makeMatch([p],"timing");
  p.eq=["accel"];assert.ok(Math.abs(actionDuration(m,p,"attack",{},t0)-1.15*.96)<1e-9);
  p.eq=["evasion"];assert.ok(Math.abs(actionDuration(m,p,"flee",{},t0)-1.5*.95)<1e-9);
}

// Focus reduces base combat-skill SP cost by 5%.
{
  const p=createServerPlayer({sessionId:"f",playerName:"Focus",charId:"c01",startRegion:"city"},0);
  const t=createServerPlayer({sessionId:"ft",playerName:"Target",charId:"c02",startRegion:"city"},1);
  const m=makeMatch([p,t],"focus");p.eq=["focus"];p.sp=100;p.encounter={kind:"player",targetId:t.playerId};
  const old=Math.random;Math.random=()=>.999;
  const a=beginServerAction(m,p,"skill",{},t0);completeAction(m,p,a.action.completeAt+1);Math.random=old;
  assert.ok(Math.abs(p.sp-(100-12*.95))<0.001);
}

// Spell amplifier extends control duration by exactly 6% before target resistance.
{
  const p=createServerPlayer({sessionId:"s",playerName:"Spell",charId:"c01",startRegion:"city"},0);
  const t=createServerPlayer({sessionId:"st",playerName:"Target",charId:"c01",startRegion:"city"},1);
  const m=makeMatch([p,t],"spell");p.eq=["spell_amp"];p.encounter={kind:"player",targetId:t.playerId};
  const old=Math.random;Math.random=()=>0;
  const a=beginServerAction(m,p,"skill",{},t0);const done=a.action.completeAt+1;completeAction(m,p,done);Math.random=old;
  assert.ok(t.statuses.bind);
  const seconds=(t.statuses.bind.until-done)/1000;
  assert.ok(seconds>2.64&&seconds<2.66,`bind duration ${seconds}`);
}

// Crow harassment applies the missing next-attack accuracy penalty.
{
  const p=createServerPlayer({sessionId:"w",playerName:"WildQA",charId:"c01",startRegion:"city"},0);
  const m=makeMatch([p],"wild");
  const crow=m.wilds.find(x=>x.templateId==="wild_crows"&&x.region==="city");assert.ok(crow);
  p.encounter={kind:"wild",wildId:crow.id};
  const old=Math.random;Math.random=()=>0;
  const a=beginServerAction(m,p,"attack",{},t0);completeAction(m,p,a.action.completeAt+1);Math.random=old;
  assert.ok(p.nextHitBonus<=-.06);
}

// Event failure fallback is only paid on actual special-material failure.
{
  const e=ENCOUNTER_EVENTS.find(x=>x.id==="E002");
  const fail=createServerPlayer({sessionId:"ef",playerName:"Fail",charId:"c01",startRegion:"city"},0);
  const mf=makeMatch([fail],"event-fail");fail.pendingEvent=e.id;
  let old=Math.random;Math.random=()=>.99;resolveEventChoice(mf,fail,0,t0);Math.random=old;
  assert.ok((fail.mat.iron||0)>0&&(fail.mat.cloth||0)>0);
  assert.equal(fail.mat.special_01||0,0);

  const win=createServerPlayer({sessionId:"ew",playerName:"Win",charId:"c01",startRegion:"city"},0);
  const mw=makeMatch([win],"event-win");win.pendingEvent=e.id;
  old=Math.random;Math.random=()=>0;resolveEventChoice(mw,win,0,t0);Math.random=old;
  assert.equal(win.mat.special_01,1);
  assert.equal(win.mat.iron||0,0);
  assert.equal(win.mat.cloth||0,0);
}

// Audited event modifiers persist in authoritative state.
{
  const p=createServerPlayer({sessionId:"em",playerName:"Mods",charId:"c01",startRegion:"mgmt_admin"},0);
  const m=makeMatch([p],"mods");
  const e=ENCOUNTER_EVENTS.find(x=>x.id==="E032");p.pendingEvent=e.id;
  resolveEventChoice(m,p,0,t0);
  assert.equal(p.eventMods.regionLootBoosts.mgmt_training.kind,"weapon");
  assert.equal(p.eventMods.regionLootBoosts.mgmt_training.bonus,.20);

  const instant=ENCOUNTER_EVENTS.find(e=>e.choices.some(c=>/다음 행정실 탐색 1회 즉시 완료/.test(c.result)));
  if(instant){
    p.region=instant.region;p.pendingEvent=instant.id;
    const idx=instant.choices.findIndex(c=>/다음 행정실 탐색 1회 즉시 완료/.test(c.result));
    resolveEventChoice(m,p,idx,t0+1000);
    p.region="mgmt_admin";
    assert.ok(actionDuration(m,p,"search",{},t0+2000)<.1);
  }
}

const snapshot=publicPlayer(makeMatch([createServerPlayer({sessionId:"x",playerName:"X",charId:"c01",startRegion:"city"},0)],"snap"),createServerPlayer({sessionId:"z",playerName:"Z",charId:"c01",startRegion:"city"},1),t0);
void snapshot;
console.log("Phase 2P runtime parity audit ok");
