import {CHARACTERS} from '../src/game_data.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync(process.env.MASODO_CLIENT_HTML||new URL('../public/MasodoSurvival.html',import.meta.url),'utf8');
let navigations=0,clickPromise=null,fail=false;assert(!html.includes('<script type="module">'));assert(/<button id="connectServer" type="button" disabled>/.test(html));assert(html.includes('<form id="loginForm" onsubmit="return false"'));
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]));const nodes=new Map();
const node=()=>({value:'',textContent:'',innerHTML:'',hidden:false,disabled:false,open:false,style:{setProperty(){},removeProperty(){}},classList:{add(){},remove(){},toggle(){}},dataset:{},children:[],options:[],appendChild(x){this.children.push(x);x.parentNode=this},append(...x){this.children.push(...x)},prepend(){},remove(){if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(x=>x!==this)},setAttribute(){},removeAttribute(){},addEventListener(){},removeEventListener(){},querySelectorAll:()=>[],querySelector:()=>node(),showModal(){this.open=true},close(){this.open=false},replaceChildren(){this.children=[]},click(){if(this.disabled)return;let prevented=false;clickPromise=Promise.resolve(this.onclick?.({preventDefault(){prevented=true}}));if(this.type==='submit'&&!prevented)navigations++;return clickPromise},getBoundingClientRect:()=>({width:100,height:100})});
const document={querySelector(s){if(s.startsWith('#')&&!s.includes(' ')){if(!ids.has(s.slice(1))){if(s==='#gameLog')return null;throw Error('missing DOM '+s)}if(!nodes.has(s))nodes.set(s,node());const el=nodes.get(s);if(s==='#connectServer'&&!el.initialized){el.disabled=true;el.type='button';el.initialized=true}return el}return node()},querySelectorAll:()=>[],createElement:()=>node(),addEventListener(){},body:node(),documentElement:node()};
let perf=0;const frames=new Map();let frameSeq=0;
const requests=[];const ctx={fetch:async url=>{requests.push(url);if(fail)throw Error('offline');return {ok:true,json:async()=>url.endsWith('/api/catalog')?{ok:true,characters:[{id:'c01',name:'서노리'}],regions:[{id:'city',name:'도심'}],items:{},version:'test'}:{ok:true,rooms:[]}}},document,console,location:{origin:'null',protocol:'file:'},matchMedia:()=>({matches:false,addEventListener(){}}),URL,Map,Set,Math,Date,performance:{now:()=>perf},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},requestAnimationFrame:fn=>{frames.set(++frameSeq,fn);return frameSeq},cancelAnimationFrame:id=>frames.delete(id),localStorage:{getItem:()=>null,setItem(){},removeItem(){}},navigator:{},screen:{},ResizeObserver:class{observe(){}},Image:class{},WebSocket:{OPEN:1},alert(){},confirm:()=>true};ctx.window=ctx;ctx.window.addEventListener=()=>{};vm.createContext(ctx);
const button=document.querySelector('#connectServer');button.click();assert.equal(navigations,0);assert(button.disabled);
const code=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]).join('\n');new vm.Script(code,{filename:'standalone.js'}).runInContext(ctx);assert(!button.disabled);assert.equal(typeof button.onclick,'function');
document.querySelector('#name').value='QA';document.querySelector('#serverAddress').value='https://server.example';await button.click();assert.equal(document.querySelector('#serverConnectMessage').textContent,'서버 연결됨');assert.equal(document.querySelector('#lobbyScreen').hidden,false);assert.equal(navigations,0);assert.equal(requests.length,2);
await document.querySelector('#returnLogin').onclick();assert(document.querySelector('#lobbyScreen').hidden);fail=true;let prevented=false;document.querySelector('#loginForm').onsubmit({preventDefault(){prevented=true}});await clickPromise;assert(prevented);assert.equal(navigations,0);assert(document.querySelector('#serverConnectMessage').textContent.includes('연결하지 못했습니다'));assert(!button.disabled);assert.equal(document.querySelector('#name').value,'QA');
fail=false;document.querySelector('#loginForm').onsubmit({preventDefault(){}});await clickPromise;assert.equal(document.querySelector('#lobbyScreen').hidden,false);assert.equal(navigations,0);
console.log('PASS: complete bundled-page startup, disabled pre-init click, click/Enter login -> catalog/rooms -> lobby, connection failure/retry without reload or input loss; actual client code with DOM/network mocks');

// Exercise the entire game renderer and real server action through the client adapter.
const Room=await loadRoom(),t=1700000000000,h=createHarness(Room,{humans:2,ai:0,now:t});
const net=vm.runInContext('net',ctx);net.emit('match_state',{match:h.room.snapshot(h.match,'s0',t)});
assert.equal(document.querySelector('#elapsed').textContent,'0');
perf=2000;for(const [id,fn]of [...frames]){frames.delete(id);fn()}
assert.equal(document.querySelector('#elapsed').textContent,'2','clock advances after full match rendering');
const sent=[];net.ws={readyState:1,send:s=>sent.push(JSON.parse(s))};
await document.querySelector('#search').onclick();assert.equal(sent.at(-1)?.type,'command_search','search reaches server transport');
const realNow=Date.now;let serverNow=t+2000;Date.now=()=>serverNow;
try{
 await h.room.webSocketMessage(h.sockets[0],JSON.stringify(sent.at(-1)));
 const accepted=h.sockets[0].messages.find(x=>x.type==='action_accepted');assert(accepted,'server accepts search');
 for(const msg of h.sockets[0].messages){const incoming=net.acceptStateMessage(msg);if(incoming)net.emit(incoming.type,incoming)}
 const stored=await h.room.getMatch();assert.equal(stored.players[0].pendingAction.type,'search');
 serverNow=stored.players[0].pendingAction.completeAt;h.resetMetrics();await h.fireAlarm();
 assert(h.sockets[0].messages.some(x=>x.type==='action_result'),'alarm completes search');
 for(const msg of h.sockets[0].messages){const incoming=net.acceptStateMessage(msg);if(incoming)net.emit(incoming.type,incoming)}
 assert.equal((await h.room.getMatch()).players[0].pendingAction,null);
 assert.equal(document.querySelector('#actionLoading').hidden,true,'completed search clears loading');
 assert.equal(vm.runInContext('searchLoading',ctx),null);
}finally{Date.now=realNow}
console.log('PASS: full-page match rendering -> clock advances -> click search -> real room action/alarm -> result/state -> loading clears (DOM/socket mocks)');

// Confusion keeps both combat inputs usable during cooldown, and acknowledges the resolved action.
const actor=h.match.players[0],target=h.match.players[1],sample=t+20000;
actor.pendingAction=null;actor.encounter={kind:'player',targetId:target.playerId};actor.statuses={confusion:{stacks:1,until:sample+10000}};actor.cdCUntil=sample+60000;actor.cdCDuration=60;
perf=20000;net.emit('match_state',{match:h.room.snapshot(h.match,'s0',sample)});
assert.equal(document.querySelector('#skill').disabled,false,'confusion permits pressing the skill button during cooldown');
await document.querySelector('#skill').onclick();assert.equal(sent.at(-1).type,'command_skill');
net.emit('action_accepted',{action:{type:'attack'}});assert.equal(vm.runInContext('localAction.type',ctx),'attack');assert.equal(document.querySelector('#actionLoading').textContent,'공격 중');
net.emit('action_result',{result:{ok:true}});assert.equal(vm.runInContext('localAction',ctx),null);
perf=31000;vm.runInContext('paintSkillCooldowns()',ctx);assert.equal(document.querySelector('#skill').disabled,true,'expired confusion restores cooldown lock without another snapshot');
console.log('PASS: full client cooldown input during confusion, resolved action acknowledgement/loading text, result unlock and local confusion expiry');

// Existing original-image client receives the new character dynamically from the catalog.
const testRoom=createHarness(Room,{humans:2,ai:0,now:t+40000}),testActor=testRoom.match.players[0];testActor.charId='c52';testActor.sp=testActor.maxSp=100;testRoom.match.matchId='test-character-flow';
net.catalog.characters=CHARACTERS;
let apiNow=t+40000;const savedNow=Date.now;Date.now=()=>apiNow;
const deliver=()=>{const list=testRoom.sockets[0].messages.splice(0);for(const msg of list){const incoming=net.acceptStateMessage(msg);if(incoming)net.emit(incoming.type,incoming)}};
try{
 await testRoom.room.saveMatch(testRoom.match);testRoom.room.sendMatchState(testRoom.sockets[0],testRoom.match,{force:true,now:apiNow});deliver();
 assert.equal(vm.runInContext("charInfo('c52').name",ctx),'{user}');
 await document.querySelector('#charAction').onclick();assert.equal(sent.at(-1).type,'command_char_action');await testRoom.room.webSocketMessage(testRoom.sockets[0],JSON.stringify(sent.at(-1)));deliver();
 apiNow=(await testRoom.room.getMatch()).players[0].pendingAction.completeAt;perf+=500;await testRoom.fireAlarm();deliver();
 assert.equal(vm.runInContext('debuffHud.buttons.size',ctx),9,'self-test skill displays all nine debuff icons');assert.equal(vm.runInContext('M.self.hp',ctx),100);
 apiNow+=11000;perf+=11000;const ready=await testRoom.room.getMatch();await testRoom.room.completeDueActions(ready,apiNow);testRoom.room.sendMatchState(testRoom.sockets[0],ready,{force:true,now:apiNow});deliver();
 assert.equal(vm.runInContext('debuffHud.buttons.size',ctx),1);assert.equal(vm.runInContext('M.self.hp',ctx),100);
 const duel=await testRoom.room.getMatch();duel.players[0].encounter={kind:'player',targetId:duel.players[1].playerId};duel.players[1].charId='c37';await testRoom.room.saveMatch(duel);testRoom.room.sendMatchState(testRoom.sockets[0],duel,{force:true,now:apiNow});deliver();
 await document.querySelector('#skill').onclick();await testRoom.room.webSocketMessage(testRoom.sockets[0],JSON.stringify(sent.at(-1)));deliver();apiNow=(await testRoom.room.getMatch()).players[0].pendingAction.completeAt;perf+=650;await testRoom.fireAlarm();deliver();
 assert.equal(vm.runInContext('M.phase',ctx),'finished');assert(document.querySelector('#resultTitle').textContent.includes('승리'));assert.equal(vm.runInContext('M.self.kills',ctx),1);
}finally{Date.now=savedNow}
console.log('PASS: original client dynamic {user} catalog -> self-debuff skill -> 9 HUD icons -> invulnerable wait/expiry -> instant skill kill -> victory results (real room actions/alarms with DOM/socket mocks)');

// The current downloadable client drives garden installation and receives enemy control states.
const gardenRoom=createHarness(Room,{humans:2,ai:0,now:t+100000});gardenRoom.match.matchId='garden-client-flow';
let gardenNow=t+100000;const priorGardenNow=Date.now;Date.now=()=>gardenNow;
function gardenDeliver(){for(const msg of gardenRoom.sockets[0].messages.splice(0)){const incoming=net.acceptStateMessage(msg);if(incoming)net.emit(incoming.type,incoming)}}
try{
 await gardenRoom.room.saveMatch(gardenRoom.match);gardenRoom.room.sendMatchState(gardenRoom.sockets[0],gardenRoom.match,{force:true,now:gardenNow});gardenDeliver();
 assert(vm.runInContext("charInfo('c01').actionEffectText",ctx).includes('30초'));
 await document.querySelector('#charAction').onclick();assert.equal(sent.at(-1).type,'command_char_action');await gardenRoom.room.webSocketMessage(gardenRoom.sockets[0],JSON.stringify(sent.at(-1)));gardenDeliver();
 const pending=await gardenRoom.room.getMatch();assert(!pending.regionGardens.city);gardenNow=pending.players[0].pendingAction.completeAt;perf+=1000;await gardenRoom.fireAlarm();gardenDeliver();
 const active=await gardenRoom.room.getMatch();assert.equal(active.regionGardens.city.until,gardenNow+30000);assert(document.querySelector('#actionLoading').hidden);
 assert(document.querySelector('#enemyContactHud').innerHTML.includes('QA1'));assert(document.querySelector('#enemyContactHud').innerHTML.includes('HP 102 / 102'));
 net.emit('match_state',{match:gardenRoom.room.snapshot(active,'s1',gardenNow)});assert.equal(vm.runInContext('debuffHud.buttons.size',ctx),2,'target client displays both garden debuffs');
 gardenNow+=30000;perf+=30000;await gardenRoom.room.completeDueActions(active,gardenNow);net.emit('match_state',{match:gardenRoom.room.snapshot(active,'s0',gardenNow)});assert(!gardenRoom.room.snapshot(active,'s0',gardenNow).self.inGarden);assert.equal(vm.runInContext('debuffHud.buttons.size',ctx),0);
}finally{Date.now=priorGardenNow}
console.log('PASS: full original client skill click -> actual room/alarm -> 30-second garden -> enemy bind/delay HUD -> expiry, current dynamic catalog text (DOM/socket mocks, no live visual assertion)');
