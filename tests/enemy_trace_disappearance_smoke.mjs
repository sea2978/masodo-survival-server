import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {rememberEnemy} from '../src/enemy_contacts.js';
import {beginServerAction,completeAction,publicPlayer} from '../src/match_engine.js';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
import {ITEMS} from '../src/offline_content.js';
const Room=await loadRoom(),t=1700000000000,h=createHarness(Room,{humans:3,ai:0,now:t}),m=structuredClone(h.match),[p,q,r]=m.players;m.wilds=[];p.region=q.region=r.region='city';
for(const target of [q,r])rememberEnemy(p,{id:target.playerId,name:target.playerName,kind:'player',source:'encounter',hp:77,maxHp:100,alive:true},t);
p.region='factory';rememberEnemy(p,{id:q.playerId,name:q.playerName,kind:'player',source:'encounter',hp:70,maxHp:100,alive:true},t);p.region='city';
let a=beginServerAction(m,q,'move',{to:'factory'},t);assert(a.ok);completeAction(m,q,a.action.completeAt+1);assert(publicPlayer(m,p,t,false).enemyContacts.some(x=>x.id===q.playerId),'movement alone must not reveal disappearance');
const before=JSON.parse(JSON.stringify(publicPlayer(m,p,t,false)));r.hp=40;
const random=Math.random;Math.random=()=>.99;
try{
 a=beginServerAction(m,p,'search',{},t+5000);assert(a.ok);assert(publicPlayer(m,p,t,false).enemyContacts.some(x=>x.id===q.playerId),'pending search must retain card');completeAction(m,p,a.action.completeAt+1);
 assert(!publicPlayer(m,p,t,false).enemyContacts.some(x=>x.id===q.playerId));assert.equal(publicPlayer(m,p,t,false).enemyContacts.find(x=>x.id===r.playerId).hp,77,'failed detection must retain last-known HP of present enemy');assert.equal(p.enemyTraceSeq,1);assert.equal(p.enemyTraceNotices[0].name,q.playerName);assert.equal(p.enemyContacts.factory.length,1);
 a=beginServerAction(m,p,'search',{},t+10000);assert(a.ok);completeAction(m,p,a.action.completeAt+1);assert.equal(p.enemyTraceSeq,1,'same disappearance must not repeat');
}finally{Math.random=random}
await h.room.saveMatch(m);const resumed=new Room(h.ctx,h.env),net=new MasodoNetworkAdapter('https://example.test');resumed.sendMatchState(h.sockets[0],await resumed.getMatch(),{force:true,now:t+13000});net.acceptStateMessage(h.sockets[0].messages.at(-1));assert.equal(net.lastMatch.self.enemyTraceSeq,1);assert.equal(net.lastMatch.self.enemyTraceNotices[0].targetId,q.playerId);assert(!net.lastMatch.self.enemyContacts.some(x=>x.id===q.playerId));
const source=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),toasts=[],root={hidden:false,innerHTML:''},ctx={I:id=>ITEMS[id],toast:(...x)=>toasts.push(x),$:()=>root,escapeRoomText:x=>x};vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf("let activityNoticeKey="),source.indexOf("let craftShopCategory=")),ctx);
ctx.notifyMatchChanges({matchId:m.matchId,self:before});ctx.notifyMatchChanges(net.lastMatch);assert.equal(toasts.length,1);assert(toasts[0][1].includes(q.playerName+'의 흔적이 사라졌습니다.'));ctx.notifyMatchChanges(net.lastMatch);assert.equal(toasts.length,1,'full state replay must not repeat toast');
vm.runInContext(source.slice(source.indexOf('function renderEnemyContacts('),source.indexOf('function renderOtherSurvivors(')),ctx);ctx.renderEnemyContacts(net.lastMatch);assert(!root.innerHTML.includes(q.playerName));assert(root.innerHTML.includes(r.playerName));assert(!root.innerHTML.includes('enemy-contact-bar'));assert(!root.innerHTML.includes('width:'));
ctx.renderEnemyContacts({self:{region:'city',enemyContacts:[{region:'city',name:'처치된 적',hp:0,maxHp:100,alive:false,source:'encounter'}]}});assert(root.innerHTML.includes('HP 0 / 100'));assert(!root.innerHTML.includes('사망'));
// Death/removal also clears a previously displayed trace on the next actual search.
r.alive=false;Math.random=()=>.99;try{a=beginServerAction(m,p,'search',{},t+15000);assert(a.ok);completeAction(m,p,a.action.completeAt+1);assert.equal(publicPlayer(m,p,t,false).enemyContacts.length,0);assert.equal(p.enemyTraceSeq,2);}finally{Math.random=random}
console.log('PASS: numeric-only HP; completed search removes absent/dead contacts, retains present undetected contacts and frozen HP; no early tracking, repeated alerts or cross-region deletion; saved/decoded notification and HUD updates (DOM mocks)');
