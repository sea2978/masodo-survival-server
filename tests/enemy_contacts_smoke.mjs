import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {beginServerAction,completeAction,publicPlayer} from '../src/match_engine.js';
import {PASSIVE_FX} from '../src/skill_defs.js';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const Room=await loadRoom(),t=1700000000000,h=createHarness(Room,{humans:3,ai:0,now:t}),m=structuredClone(h.match),[p,q,r]=m.players;
m.wilds=m.wilds.slice(0,1);m.wilds[0].region='factory';p.region=q.region='city';r.region='factory';
const random=Math.random;
try{
 let rolls=[.99,.99,0,0];Math.random=()=>rolls.shift()??0;
 let a=beginServerAction(m,p,'search',{},t);assert(a.ok);let result=completeAction(m,p,a.action.completeAt+1);assert.equal(result.kind,'player');
 let row=publicPlayer(m,p,t,false).enemyContacts.find(x=>x.id===q.playerId);assert.equal(row.hp,q.hp);const initial=row.hp;
 q.hp-=20;assert.equal(publicPlayer(m,p,t,false).enemyContacts.find(x=>x.id===q.playerId).hp,initial,'unobserved HP changes must stay hidden');
 Math.random=()=>0;a=beginServerAction(m,p,'attack',{},t+3000);assert(a.ok);completeAction(m,p,a.action.completeAt+1);row=publicPlayer(m,p,t,false).enemyContacts.find(x=>x.id===q.playerId);assert.equal(row.hp,q.hp);const afterAttack=row.hp;
 const attacker=publicPlayer(m,q,t,false).enemyContacts.find(x=>x.id===p.playerId);assert.equal(attacker.name,p.playerName);assert.equal(attacker.hp,null);assert.equal(attacker.maxHp,null);assert.equal(attacker.source,'incoming');
 q.hp=q.maxHp;assert.equal(publicPlayer(m,p,t,false).enemyContacts.find(x=>x.id===q.playerId).hp,afterAttack);
 // A different attacker adds a separate unknown card; observing it later reveals only that result.
 r.region='city';r.encounter={kind:'player',targetId:p.playerId};a=beginServerAction(m,r,'attack',{},t+6000);assert(a.ok);completeAction(m,r,a.action.completeAt+1);assert.equal(publicPlayer(m,p,t,false).enemyContacts.find(x=>x.id===r.playerId).hp,null);
 p.encounter={kind:'player',targetId:r.playerId};a=beginServerAction(m,p,'flee',{},t+9000);assert(a.ok);completeAction(m,p,a.action.completeAt+1);assert.equal(publicPlayer(m,p,t,false).enemyContacts.find(x=>x.id===r.playerId).hp,r.hp);
 // Killed wild enemies show the post-action result, and other-region history is hidden.
 const wild=m.wilds[0];wild.hp=1;p.region='factory';p.encounter={kind:'wild',wildId:wild.id};a=beginServerAction(m,p,'attack',{},t+12000);assert(a.ok);completeAction(m,p,a.action.completeAt+1);row=publicPlayer(m,p,t,false).enemyContacts.find(x=>x.id===wild.id);assert.equal(row.hp,0);assert.equal(row.alive,false);assert(!publicPlayer(m,p,t,false).enemyContacts.some(x=>x.id===q.playerId));
 a=beginServerAction(m,p,'move',{to:'city'},t+15000);assert(a.ok);completeAction(m,p,a.action.completeAt+1);assert.equal(publicPlayer(m,p,t,false).enemyContacts.find(x=>x.id===q.playerId).hp,afterAttack);
 // Saved history survives a resumed room and the actual state adapter; no live HP lookup.
 await h.room.saveMatch(m);const resumed=new Room(h.ctx,h.env),net=new MasodoNetworkAdapter('https://example.test');resumed.sendMatchState(h.sockets[0],await resumed.getMatch(),{force:true,now:t+18000});net.acceptStateMessage(h.sockets[0].messages.at(-1));assert.equal(net.lastMatch.self.enemyContacts.find(x=>x.id===q.playerId).hp,afterAttack);
 const receiver=new MasodoNetworkAdapter('https://example.test');resumed.sendMatchState(h.sockets[1],await resumed.getMatch(),{force:true,now:t+18000});receiver.acceptStateMessage(h.sockets[1].messages.at(-1));assert.equal(receiver.lastMatch.self.enemyContacts.find(x=>x.id===p.playerId).hp,null);
 // A miss still identifies the attacker without HP; a revive records the final surviving HP.
 {
  const other=createHarness(Room,{humans:2,ai:0,now:t}),game=structuredClone(other.match),[a,b]=game.players;a.region=b.region='city';a.encounter={kind:'player',targetId:b.playerId};Math.random=()=>.999;
  let pending=beginServerAction(game,a,'attack',{},t);assert(pending.ok);const hp=b.hp;completeAction(game,a,pending.action.completeAt+1);assert.equal(b.hp,hp);assert.equal(publicPlayer(game,b,t,false).enemyContacts.find(x=>x.id===a.playerId).hp,null);
  b.charId=Object.entries(PASSIVE_FX).find(([,fx])=>fx.revive)[0];b.hp=1;b.rev=false;a.encounter={kind:'player',targetId:b.playerId};Math.random=()=>0;pending=beginServerAction(game,a,'attack',{},t+4000);assert(pending.ok);completeAction(game,a,pending.action.completeAt+1);assert(b.alive);assert(b.hp>0);assert.equal(publicPlayer(game,a,t,false).enemyContacts.find(x=>x.id===b.playerId).hp,b.hp);
 }
}finally{Math.random=random}
const source=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),root={hidden:false,innerHTML:''},ctx={$:()=>root,escapeRoomText:x=>x};vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('function renderEnemyContacts('),source.indexOf('function renderOtherSurvivors(')),ctx);
ctx.renderEnemyContacts({self:{region:'city',enemyContacts:[{region:'city',name:'직접 조우',hp:31,maxHp:100,alive:true,source:'encounter'},{region:'city',name:'나를 공격한 적',hp:99,maxHp:100,source:'incoming'},{region:'factory',name:'다른 지역',hp:1,maxHp:100,source:'encounter'}]}});assert(root.innerHTML.includes('HP 31 / 100'));assert(root.innerHTML.includes('HP ?'));assert(!root.innerHTML.includes('HP 99'));assert(!root.innerHTML.includes('다른 지역'));ctx.renderEnemyContacts({self:{region:'city',enemyContacts:[]}});assert(root.hidden);
assert(source.includes('@media(pointer:fine){#toastStack.top-toast-stack{left:12px;right:auto;top:78px;transform:none;'));
console.log('PASS: observed/search/attack/flee/kill result HP, unknown attacker HP, frozen history, region filtering, persistence/reconnect/adapter, HUD and PC toast placement (DOM mocks; no live visual assertion)');
