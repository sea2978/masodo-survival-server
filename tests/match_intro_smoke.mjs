import assert from 'node:assert/strict';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {beginServerAction,updatePassiveTime,runAITick} from '../src/match_engine.js';
import {MatchIntro} from '../public/match_intro.js';
const Room=await loadRoom(),t=1700000000000,h=createHarness(Room,{humans:2,ai:0,now:t});
const meta=await h.room.getMeta();Object.assign(meta,{phase:'lobby',aiMode:'fixed',aiCount:2});await h.room.saveMeta(meta);for(const [ws,s]of h.room.sessions){s.ready=true;ws.serializeAttachment(s)}
const prev=Date.now;let clock=t;Date.now=()=>clock;
try{
 await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'request_start'}));let match=await h.room.getMatch();assert.equal(match.startedAt,t+5000);assert.equal(match.players.length,4);assert.equal(await h.ctx.storage.getAlarm(),t+5000);assert.equal(h.room.snapshot(match,'s0',t).elapsed,0);
 const before=JSON.stringify(match.players);assert.equal(beginServerAction(match,match.players[0],'search',{},t).error,'match_starting');assert.equal(runAITick(match,t),false);updatePassiveTime(match,t);assert.equal(JSON.stringify(match.players),before);
 for(const type of ['command_search','command_rest','command_char_action','command_move']){await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type,to:'estate'}));assert.equal(h.sockets[0].messages.at(-1).error,'match_starting')}
 await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_inventory',mode:'discard',id:'iron'}));assert.equal(h.sockets[0].messages.at(-1).result.error,'match_starting');
 clock=t+4000;await h.fireAlarm();assert.equal(JSON.stringify((await h.room.getMatch()).players),before);assert.equal(await h.ctx.storage.getAlarm(),t+5000);
 const resumed=new Room(h.ctx,h.env);const saved=await resumed.getMatch();assert.equal(saved.startedAt,t+5000);assert.equal(resumed.snapshot(saved,'s1',clock).others.length,3);
 clock=t+5000;h.resetMetrics();await h.fireAlarm();match=await h.room.getMatch();assert.equal(match.introCompleted,true);assert(h.sockets[0].messages.some(m=>m.type==='match_delta'||m.type==='match_state'));assert.equal(h.room.snapshot(match,'s0',clock).elapsed,0);assert.equal(JSON.stringify(match.players),before,'AI does not get a head start');
 await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_search'}));match=await h.room.getMatch();assert.equal(match.players[0].pendingAction.type,'search');clock=match.players[0].pendingAction.completeAt;await h.fireAlarm();assert.equal((await h.room.getMatch()).players[0].pendingAction,null);
}finally{Date.now=prev}
// Local animation does not wait for another server message and reconnect uses remaining time.
const node=()=>({hidden:true,textContent:'',children:[],append(...x){this.children.push(...x)},appendChild(x){this.children.push(x)},replaceChildren(){this.children=[]}});const priorDoc=globalThis.document;globalThis.document={createElement:node};let now=0,id=0,finished=null;const frames=new Map(),root=node(),cards=node(),counter=node(),sprites=[];
try{
 const intro=new MatchIntro(root,cards,counter,{character:id=>({name:'캐릭터 '+id}),sprite:(...x)=>sprites.push(x),now:()=>now,raf:fn=>{frames.set(++id,fn);return id},cancel:id=>frames.delete(id),onFinish:m=>finished=m});
 const m={matchId:'intro',phase:'playing',startedAt:t+5000,serverNow:t,self:{playerId:'a',playerName:'<나>',charId:'c01'},others:[{playerId:'b',playerName:'친구',charId:'c02'},{playerId:'ai',playerName:'봇',charId:'c03',isAI:true}]};
 assert(intro.show(m));assert(!root.hidden);assert.equal(cards.children.length,3);assert.equal(sprites.length,3);assert.equal(cards.children[0].children[2].textContent,'<나>');assert.equal(counter.textContent,'5');now=2000;assert(intro.show(m));assert.equal(sprites.length,3);for(const fn of frames.values()){frames.clear();fn();break}assert.equal(counter.textContent,'3');now=5000;for(const fn of frames.values()){frames.clear();fn();break}assert(root.hidden);assert.equal(finished.serverNow,m.startedAt);assert(!intro.show(finished));
 intro.show({...m,matchId:'resume',serverNow:t+3500});assert.equal(counter.textContent,'2');intro.clear();assert(root.hidden);assert.equal(frames.size,0);assert(!intro.show({...m,phase:'finished'}));
}finally{globalThis.document=priorDoc}
console.log('PASS: 5-second roster intro, all humans/AI, no early action/passive/AI/clock, storage/reconnect, synchronized release and search completion, local countdown/fallback/safe names/cleanup (DOM mocks; no live visual QA)');
