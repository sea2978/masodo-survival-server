import assert from 'node:assert/strict';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
import {publicPlayer,beginServerAction,completeAction} from '../src/match_engine.js';
const Room=await loadRoom(),t=1700000000000,h=createHarness(Room,{humans:3,ai:2,now:t}),m=h.match;
const net=new MasodoNetworkAdapter('https://example.test'),send=()=>{h.room.sendMatchState(h.sockets[0],m,{now:t+5000});return net.acceptStateMessage(h.sockets[0].messages.at(-1))?.match};
assert.equal(send().spectatorPlayers,null);
const dead=m.players[0];dead.alive=false;dead.hp=0;dead.diedAt=t+1000;
let view=send();assert.equal(Object.keys(view.spectatorPlayers).length,5);assert.equal(h.sockets[0].messages.at(-1).type,'match_delta');
for(const p of m.players){const seen=view.spectatorPlayers[p.playerId],actual=publicPlayer(m,p,t+5000,false);for(const key of ['charId','region','hp','sp','satiety','atk','def','maxHp','alive','kills'])assert.equal(seen[key],actual[key]);for(const key of ['sessionId','ai','trackingMarks'])assert(!(key in seen));assert.deepEqual(seen.inventory.eq.map(x=>x.id),p.eq)}
assert.equal(h.room.snapshot(m,'s1',t).spectatorPlayers,null);assert.equal(h.room.snapshot(m,'unknown',t).spectatorPlayers,null);
const target=m.players[1];target.hp=37;target.eq=['sword'];target.statuses.bind={until:t+10000,stacks:1,sourceId:dead.playerId};target.kills=2;
view=send();assert.equal(view.spectatorPlayers[target.playerId].hp,37);assert.equal(view.spectatorPlayers[target.playerId].kills,2);assert.equal(view.spectatorPlayers[target.playerId].inventory.eq[0].id,'sword');assert(view.spectatorPlayers[target.playerId].statuses.bind);
// Reconnect sends a complete, current baseline; it does not depend on pressing a new command.
await h.room.saveMatch(m);const room=new Room(h.ctx,h.env);room.sendMatchState(h.sockets[0],await room.getMatch(),{force:true,now:t+5000});assert.equal(h.sockets[0].messages.at(-1).match.spectatorPlayers[target.playerId].hp,37);
// Living viewers cannot enter observation by sending a client command, and revival revokes full data.
dead.alive=true;dead.hp=50;view=send();assert.equal(view.spectatorPlayers,null);
const rejected=beginServerAction(m,{...dead,alive:false},'search',{},t+5000);assert(!rejected.ok);
m.phase='finished';assert.equal(Object.keys(h.room.snapshot(m,'s1',t+5000).spectatorPlayers).length,5);
// Completed attacks still reach the observer through the existing per-connection delta stream.
m.phase='playing';dead.alive=false;const a=m.players[2],b=m.players[3];a.region=b.region='city';a.encounter={kind:'player',targetId:b.playerId};b.hp=b.maxHp=10000;const random=Math.random;Math.random=()=>0;
try{const r=beginServerAction(m,a,'attack',{},t+6000);assert(r.ok);completeAction(m,a,r.action.completeAt)}finally{Math.random=random}
view=send();assert.equal(view.spectatorPlayers[b.playerId].hp,b.hp);assert(b.hp<10000);
console.log('PASS: dead-only full gameplay projection, all humans/AI including dead, live combat/stats/inventory/status delta updates, reconnect baseline, revival revocation, finished match access and dead command rejection');
