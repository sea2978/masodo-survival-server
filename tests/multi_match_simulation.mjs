import assert from "node:assert/strict";
import { CHARACTERS, REGIONS, createAIPlayer } from "../src/game_data.js";
import { completeAction, initWorld, runAITick, updatePassiveTime } from "../src/match_engine.js";

function rng(seed){let s=seed>>>0;return()=>{s=(1664525*s+1013904223)>>>0;return s/4294967296}}
const realRandom=Math.random;
const summaries=[];

for(let run=0;run<12;run++){
  Math.random=rng(0x510000+run*7919);
  const t0=1_701_000_000_000+run*2_000_000;
  const players=[];
  for(let i=0;i<11;i++){
    const ch=CHARACTERS[(run*11+i*5)%CHARACTERS.length];
    const region=REGIONS[(run*3+i*2)%REGIONS.length];
    players.push(createAIPlayer(i,ch.id,region.id,["balanced","craft","aggro","safe"][(run+i)%4]));
  }
  const match={matchId:"multi-"+run,phase:"playing",createdAt:t0,startedAt:t0,updatedAt:t0,players,nextAiTickAt:t0,eventPity:{},lastEventId:null,corpses:[],worldLog:[]};
  for(const p of players){p.tempEffects=[];p.statusImmunity={};p.cdCUntil=0;p.cdAUntil=0;p.lastSatietyAt=t0;p.nextStatusTick=t0}
  initWorld(match);

  let completed=0;
  for(let second=0;second<=900;second++){
    const now=t0+second*1000;
    for(const p of players){
      if(p.pendingAction&&p.pendingAction.completeAt<=now){
        const r=completeAction(match,p,now);if(r)completed++;
      }
    }
    if((match.nextAiTickAt||0)<=now)runAITick(match,now);
    updatePassiveTime(match,now);
    for(const p of players){
      assert.ok(Number.isFinite(p.hp)&&Number.isFinite(p.sp)&&Number.isFinite(p.satiety));
      assert.ok(p.sp<=p.maxSp+0.001);
      assert.ok(REGIONS.some(r=>r.id===p.region));
      assert.ok((p.eq||[]).length<=3);
      assert.ok(Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0).length<=3);
    }
    const corpseIds=(match.corpses||[]).map(c=>c.id);
    assert.equal(new Set(corpseIds).size,corpseIds.length,"corpse IDs must remain unique");
    assert.equal(Object.keys(match.uniqueSpecials).length,41);
  }
  assert.ok(completed>10,"each match should execute timed actions");
  summaries.push({run,alive:players.filter(p=>p.alive).length,kills:players.reduce((n,p)=>n+p.kills,0),completed});
}
Math.random=realRandom;
assert.equal(summaries.length,12);
assert.ok(summaries.reduce((n,x)=>n+x.completed,0)>200);
console.log("12x900s multi-match simulation ok",summaries);
