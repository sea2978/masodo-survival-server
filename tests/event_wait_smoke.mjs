import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {ENCOUNTER_EVENTS} from '../src/offline_content.js';
import {beginEventChoice,beginServerAction,completeAction,runAIStep} from '../src/match_engine.js';
import {inventoryOperation} from '../src/inventory_ops.js';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const Room=await loadRoom(),t=1700000000000;
let cases=0;
const inventory=p=>JSON.stringify([p.mat,p.eq,p.con]);
for(const e of ENCOUNTER_EVENTS)for(let i=0;i<e.choices.length;i++){
 const seconds=+(e.choices[i].result.match(/시간 \+(\d+)초/)?.[1]||0);if(!seconds)continue;
 const h=createHarness(Room,{humans:2,ai:0,now:t}),m=h.match,[p,q]=m.players;
 p.region=e.region;p.eq=['basic_tool','basic_terminal'];p.mat.precision=10;p.mat.electronics=10;p.pendingEvent=e.id;
 q.cdCUntil=t+60000;q.cdAUntil=t+55000;q.pendingAction={type:'rest',startedAt:t,completeAt:t+60000};
 const before=inventory(p),hp=p.hp,r=beginEventChoice(m,p,i,t);
 assert(r.queued);assert.equal(r.action.completeAt,t+seconds*1000);assert.equal(m.timeOffsetMs||0,0);assert.equal(inventory(p),before);assert.equal(p.hp,hp);
 assert.equal(q.cdCUntil,t+60000);assert.equal(q.cdAUntil,t+55000);assert.equal(q.pendingAction.completeAt,t+60000);
 assert.equal(beginEventChoice(m,p,i,t).error,'action_in_progress');assert.equal(beginServerAction(m,p,'search',{},t).error,'action_in_progress');assert.equal(inventoryOperation(m,p,{mode:'discard'}).error,'action_in_progress');
 assert.equal(completeAction(m,p,t+seconds*1000-1),null);assert.equal(inventory(p),before);
 const result=completeAction(m,p,t+seconds*1000);assert(result.ok);assert.equal(result.type,'event_choice');assert.equal(result.eventId,e.id);assert.equal(p.pendingAction,null);assert.equal(m.timeOffsetMs||0,0);assert.equal(m.elapsed,seconds);assert.equal(completeAction(m,p,t+seconds*1000+1),null);
 cases++;
}
assert.equal(cases,33);
// Cancellation must not consume costs or award anything, even across a saved deadline.
for(const reason of ['death','final-lock']){
 const m=createHarness(Room,{humans:2,ai:0,now:t}).match,p=m.players[0];p.pendingEvent='E001';const before=inventory(p);assert(beginEventChoice(m,p,1,t+779000).queued);
 if(reason==='death')p.alive=false;
 completeAction(m,p,reason==='death'?t+783000:t+780000);assert.equal(p.pendingAction,null);assert.equal(inventory(p),before);
}
// Untimed choices stay immediate; finished matches cannot queue rewards.
{
 const m=createHarness(Room,{humans:2,ai:0,now:t}).match,p=m.players[0];p.pendingEvent='E001';const i=ENCOUNTER_EVENTS.find(e=>e.id==='E001').choices.findIndex(c=>!/시간 \+/.test(c.result));assert(i>=0);assert(beginEventChoice(m,p,i,t).ok);assert(!p.pendingAction);m.phase='finished';p.pendingEvent='E001';assert(!beginEventChoice(m,p,0,t).ok);
}
// AI uses exactly the same queue rather than applying a time jump.
{
 const m=createHarness(Room,{humans:2,ai:1,now:t}).match,p=m.players.at(-1);p.pendingEvent='E001';const random=Math.random;Math.random=()=>0;try{assert(runAIStep(m,p,t));assert.equal(p.pendingAction.type,'event_choice');assert.equal(m.timeOffsetMs||0,0)}finally{Math.random=random}
}
// Real websocket -> persisted queue -> reconstructed room -> alarm -> state adapter.
// Wait on the wall clock for E001's actual one-second option as well as boundary tests above.
{
 const started=Date.now(),h=createHarness(Room,{humans:2,ai:0,now:started}),p=h.match.players[0],ws=h.sockets[0];p.pendingEvent='E001';const before=inventory(p);await h.room.saveMatch(h.match);
 await h.room.webSocketMessage(ws,JSON.stringify({type:'event_choice',index:0}));assert(ws.messages.some(x=>x.type==='action_accepted'&&x.action.type==='event_choice'));assert(!ws.messages.some(x=>x.type==='event_result'));
 const saved=await h.room.getMatch(),deadline=saved.players[0].pendingAction.completeAt;assert.equal(inventory(saved.players[0]),before);assert.equal(await h.ctx.storage.getAlarm(),deadline);
 const room=new Room(h.ctx,h.env),net=new MasodoNetworkAdapter('https://example.test');room.sendMatchState(ws,await room.getMatch(),{force:true});net.acceptStateMessage(ws.messages.at(-1));assert.equal(net.lastMatch.self.pendingAction.completeAt,deadline);
 await new Promise(r=>setTimeout(r,Math.max(0,deadline-Date.now()+20)));await room.alarm();assert(Date.now()-started>=1000);assert.equal((await room.getMatch()).players[0].pendingAction,null);assert.equal(ws.messages.filter(x=>x.type==='event_result').length,1);await room.alarm();assert.equal(ws.messages.filter(x=>x.type==='event_result').length,1);
 for(const msg of ws.messages)net.acceptStateMessage(msg);assert.equal(net.lastMatch.self.pendingAction,null);assert.equal((await room.getMatch()).timeOffsetMs||0,0);
}
// Use the actual client renderer to check pending state and completion loading text.
{
 const html=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),el={hidden:true,textContent:''},ctx={$:()=>el,clearTimeout(){},searchLoading:null};vm.createContext(ctx);
 vm.runInContext(html.slice(html.indexOf('let localAction=null,'),html.indexOf('for(const [method,type] of Object.entries({move:')),ctx);
 ctx.renderActionLoading({phase:'playing',self:{alive:true,pendingAction:{type:'event_choice'}}});assert(!el.hidden);assert.equal(el.textContent,'이벤트 진행 중');ctx.renderActionLoading({phase:'playing',self:{alive:true}});assert(el.hidden);
}
console.log('PASS: all 33 timed choices wait; global/other timers unchanged; duplicate/action guards; cancellation, AI, websocket persistence/recovery, actual one-second wait/alarm and loading renderer (DOM mock)');
