import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {rememberEnemy,rememberIncoming} from '../src/enemy_contacts.js';
import {beginEventChoice,beginServerAction,completeAction,updatePassiveTime} from '../src/match_engine.js';
import {nextRegionLockAt,updateRegionRestrictions} from '../src/region_restrictions.js';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const Room=await loadRoom(),t=1700000000000,h=createHarness(Room,{humans:3,ai:0,now:t}),m=h.match,[p,q,r]=m.players;
// Old saved offsets and stale cached elapsed values must never enter snapshots or locks.
m.timeOffsetMs=90000;m.elapsed=7;updatePassiveTime(m,t+100000);assert.equal(m.elapsed,100);
m.elapsed=7;const first=h.room.snapshot(m,p.sessionId,t+100250);assert.equal(first.elapsed,100);assert.equal(nextRegionLockAt(m),t+180000);assert.equal(updateRegionRestrictions(m,t+100250),false);
p.pendingEvent='E001';const queued=beginEventChoice(m,p,1,t+100250);assert(queued.queued);assert.equal(queued.action.completeAt,t+104250);assert.equal(h.room.snapshot(m,p.sessionId,t+100250).elapsed,100);assert.equal(completeAction(m,p,t+104249),null);assert(completeAction(m,p,t+104250).ok);assert.equal(m.elapsed,104);assert.equal(nextRegionLockAt(m),t+180000);
// Repaint the SAME old event snapshot while the four-second wait runs.
// Previously syncMatchClock reset elapsed=100 every repaint, then appeared to add 4 at completion.
const html=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),clockEl={textContent:''};let perf=0;
const ctx={$:()=>clockEl,performance:{now:()=>perf},requestAnimationFrame:()=>1,cancelAnimationFrame(){}};vm.createContext(ctx);
vm.runInContext(html.slice(html.indexOf('let matchClockFrame=null,'),html.indexOf('const skillCooldowns=')),ctx);
ctx.syncMatchClock(first);assert.equal(clockEl.textContent,'100');perf=2000;ctx.syncMatchClock(first);assert.equal(clockEl.textContent,'102');perf=4000;ctx.syncMatchClock(first);assert.equal(clockEl.textContent,'104');ctx.syncMatchClock(h.room.snapshot(m,p.sessionId,t+104250));assert.equal(clockEl.textContent,'104');perf=5000;ctx.syncMatchClock(first);assert.equal(clockEl.textContent,'105','stale sample must not rewind');
const end={...h.room.snapshot(m,p.sessionId,t+105250),phase:'finished',elapsed:105};ctx.syncMatchClock(end);perf=9000;ctx.syncMatchClock(end);assert.equal(clockEl.textContent,'105');ctx.syncMatchClock({...first,matchId:'next-game',startedAt:t+100000,serverNow:t+100250});assert.equal(clockEl.textContent,'0');
// Direct observations update HP in place; incoming attacks preserve known HP and order.
p.region=q.region=r.region='city';
const observed=(target,hp)=>({id:target.playerId,name:target.playerName,kind:'player',source:'encounter',hp,maxHp:100,alive:true});
rememberEnemy(p,observed(q,72),t);rememberEnemy(p,observed(r,55),t+1);const ids=p.enemyContacts.city.map(x=>x.id),old=JSON.stringify(p.enemyContacts.city);
rememberIncoming(p,q,q.playerName,t+2);assert.equal(JSON.stringify(p.enemyContacts.city),old);
rememberEnemy(p,observed(q,61),t+3);assert.deepEqual(p.enemyContacts.city.map(x=>x.id),ids);assert.equal(p.enemyContacts.city.find(x=>x.id===q.playerId).hp,61);
rememberIncoming(p,q,q.playerName,t+4);assert.deepEqual(p.enemyContacts.city.map(x=>x.id),ids);assert.equal(p.enemyContacts.city.find(x=>x.id===q.playerId).hp,61);
// A previously unknown attacker still gets HP ?, without reordering on repeated attacks.
rememberIncoming(q,p,p.playerName,t);assert.equal(q.enemyContacts.city[0].hp,null);const unknown=JSON.stringify(q.enemyContacts.city);rememberIncoming(q,p,p.playerName,t+1);assert.equal(JSON.stringify(q.enemyContacts.city),unknown);
// Run an actual incoming combat action against a known target card.
q.encounter={kind:'player',targetId:p.playerId};const random=Math.random;Math.random=()=>0;
try{const a=beginServerAction(m,q,'attack',{},t+107000);assert(a.ok);assert(completeAction(m,q,a.action.completeAt).ok);assert.deepEqual(p.enemyContacts.city.map(x=>x.id),ids);assert.equal(p.enemyContacts.city.find(x=>x.id===q.playerId).hp,61)}finally{Math.random=random}
await h.room.saveMatch(m);const room=new Room(h.ctx,h.env),net=new MasodoNetworkAdapter('https://example.test');room.sendMatchState(h.sockets[0],await room.getMatch(),{force:true,now:t+106000});net.acceptStateMessage(h.sockets[0].messages.at(-1));assert.deepEqual(net.lastMatch.self.enemyContacts.map(x=>x.id),ids);assert.equal(net.lastMatch.self.enemyContacts.find(x=>x.id===q.playerId).hp,61);assert.equal(net.lastMatch.elapsed,106);
console.log('PASS: stale-snapshot clock jump reproduced and fixed; legacy offsets ignored by engine/snapshot/locks; timed choice clock advances only in real time; frozen finish/new game; HP and stable contact order survive incoming attacks/observation/save/reconnect (clock DOM mock)');
