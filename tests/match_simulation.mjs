import assert from "node:assert/strict";
import { CHARACTERS, REGIONS, createAIPlayer, createServerPlayer } from "../src/game_data.js";
import { completeAction, initWorld, runAITick, updatePassiveTime } from "../src/match_engine.js";

let seed=0x2f6e2b1;
const realRandom=Math.random;
Math.random=()=>{
  seed=(1664525*seed+1013904223)>>>0;
  return seed/4294967296;
};

const t0=1_700_100_000_000;
const human=createServerPlayer({sessionId:"human",playerName:"HumanQA",charId:"c29",startRegion:"city"},0);
const players=[human];
for(let i=1;i<11;i++){
  const ch=CHARACTERS[(i*7)%CHARACTERS.length];
  const region=REGIONS[(i*3)%REGIONS.length];
  const profile=["balanced","craft","aggro","safe"][i%4];
  players.push(createAIPlayer(i,ch.id,region.id,profile));
}
const match={matchId:"sim",phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players,nextAiTickAt:t0,eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
for(const p of players){p.tempEffects=[];p.statusImmunity={};p.cdCUntil=0;p.cdAUntil=0;p.lastSatietyAt=t0;p.nextStatusTick=t0}
initWorld(match);

let completed=0,queued=0;
for(let second=0;second<=900;second++){
  const now=t0+second*1000;
  for(const p of match.players){
    if(p.pendingAction&&p.pendingAction.completeAt<=now){
      const result=completeAction(match,p,now);
      if(result)completed++;
    }
  }
  if((match.nextAiTickAt||0)<=now){
    for(const p of match.players)if(p.isAI&&!p.pendingAction&&p.alive)queued+=0;
    runAITick(match,now);
  }
  updatePassiveTime(match,now);

  for(const p of match.players){
    assert.ok(Number.isFinite(p.hp),`HP must stay finite: ${p.playerId}`);
    assert.ok(Number.isFinite(p.sp),`SP must stay finite: ${p.playerId}`);
    assert.ok(Number.isFinite(p.satiety),`satiety must stay finite: ${p.playerId}`);
    assert.ok(p.hp<=p.maxHp+20,`HP runaway: ${p.playerId}`);
    assert.ok(p.sp<=p.maxSp+0.001,`SP overflow: ${p.playerId}`);
    assert.ok(REGIONS.some(r=>r.id===p.region),`invalid region: ${p.playerId}`);
    if(p.pendingAction)assert.ok(p.pendingAction.completeAt>=p.pendingAction.startedAt);
  }
  assert.ok(match.players.filter(p=>p.alive).length<=11);
  assert.equal(Object.keys(match.uniqueSpecials).length,41);
}
Math.random=realRandom;

assert.equal(match.players.length,11);
assert.ok(completed>20,`expected many completed timed actions, got ${completed}`);
assert.ok(match.elapsed>=900);
console.log("900s simulation ok",{
  alive:match.players.filter(p=>p.alive).length,
  completed,
  corpses:match.corpses.length,
  elapsed:match.elapsed
});
