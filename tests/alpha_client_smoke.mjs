import {ITEMS} from '../src/offline_content.js';
import {GAME_VERSION} from '../src/version.js';
import {applyStatus} from "../src/match_engine.js";
import {CHARACTERS} from '../src/game_data.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync(process.env.MASODO_CLIENT_HTML||new URL('../public/MasodoSurvival.html',import.meta.url),'utf8');
let navigations=0,clickPromise=null,fail=false,serverVersion=GAME_VERSION;assert(!html.includes('<script type="module">'));assert(/<button id="connectServer" type="button" disabled>/.test(html));assert(html.includes('<form id="loginForm" onsubmit="return false"'));
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]));const nodes=new Map();
const node=()=>({value:'',textContent:'',innerHTML:'',hidden:false,disabled:false,open:false,style:{setProperty(){},removeProperty(){}},classList:{add(){},remove(){},toggle(){}},dataset:{},children:[],get firstElementChild(){return this.children[0]},options:[],appendChild(x){this.children.push(x);x.parentNode=this},append(...x){this.children.push(...x)},prepend(x){this.children.unshift(x);x.parentNode=this},remove(){if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(x=>x!==this)},setAttribute(){},removeAttribute(){},focus(){},addEventListener(){},removeEventListener(){},querySelectorAll:()=>[],querySelector:()=>node(),showModal(){this.open=true},close(){this.open=false},replaceChildren(){this.children=[]},click(){if(this.disabled)return;let prevented=false;clickPromise=Promise.resolve(this.onclick?.({preventDefault(){prevented=true}}));if(this.type==='submit'&&!prevented)navigations++;return clickPromise},getBoundingClientRect:()=>({width:100,height:100})});
const document={querySelector(s){if(s.startsWith('#')&&!s.includes(' ')){if(!ids.has(s.slice(1))){if(s==='#gameLog')return null;throw Error('missing DOM '+s)}if(!nodes.has(s))nodes.set(s,node());const el=nodes.get(s);if(s==='#connectServer'&&!el.initialized){el.disabled=true;el.type='button';el.initialized=true}return el}return node()},querySelectorAll:()=>[],createTextNode:text=>({...node(),textContent:text}),createElement:tag=>({...node(),tagName:tag.toUpperCase()}),addEventListener(){},body:node(),documentElement:node()};
let perf=0;const frames=new Map();let frameSeq=0;
const requests=[];const ctx={structuredClone,crypto:globalThis.crypto,fetch:async url=>{requests.push(url);if(fail)throw Error('offline');return {ok:true,json:async()=>new URL(url).pathname==='/api/catalog'?{ok:true,characters:[{id:'c01',name:'서노리'}],regions:[{id:'city',name:'도심'}],items:{},version:serverVersion}:{ok:true,rooms:[]}}},document,console,location:{origin:'null',protocol:'file:'},matchMedia:()=>({matches:false,addEventListener(){}}),URL,Map,Set,Math,Date,performance:{now:()=>perf},setTimeout:()=>1,clearTimeout(){},setInterval:()=>1,clearInterval(){},requestAnimationFrame:fn=>{frames.set(++frameSeq,fn);return frameSeq},cancelAnimationFrame:id=>frames.delete(id),localStorage:{getItem:()=>null,setItem(){},removeItem(){}},navigator:{},screen:{},ResizeObserver:class{observe(){}},Image:class{},WebSocket:{OPEN:1},alert(){},confirm:()=>true};ctx.window=ctx;ctx.window.addEventListener=()=>{};vm.createContext(ctx);
const button=document.querySelector('#connectServer');button.click();assert.equal(navigations,0);assert(button.disabled);
const code=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]).join('\n');new vm.Script(code,{filename:'standalone.js'}).runInContext(ctx);assert(!button.disabled);assert.equal(typeof button.onclick,'function');assert.equal(document.querySelector('#name').value,'user');
document.querySelector('#name').value='QA';await button.click();assert.equal(document.querySelector('#serverConnectMessage').textContent,'서버 연결됨');assert.equal(document.querySelector('#lobbyScreen').hidden,false);assert.equal(navigations,0);assert.equal(requests.length,2);
await document.querySelector('#returnLogin').onclick();assert(document.querySelector('#lobbyScreen').hidden);fail=true;let prevented=false;document.querySelector('#loginForm').onsubmit({preventDefault(){prevented=true}});await clickPromise;assert(prevented);assert.equal(navigations,0);assert(document.querySelector('#serverConnectMessage').textContent.includes('연결하지 못했습니다'));assert(!button.disabled);assert.equal(document.querySelector('#name').value,'QA');
fail=false;document.querySelector('#loginForm').onsubmit({preventDefault(){}});await clickPromise;assert.equal(document.querySelector('#lobbyScreen').hidden,false);assert.equal(navigations,0);
// An outdated (or newer/missing-version) server never causes entry into the lobby.
for(const version of ['0.0.0-online','99.0.0-online',undefined]){
 await document.querySelector('#returnLogin').onclick();serverVersion=version;const before=requests.length;await button.click();assert(document.querySelector('#loginScreen').hidden===false);assert(document.querySelector('#lobbyScreen').hidden);assert(document.querySelector('#clientUpdatePanel').open);assert(document.querySelector('#clientUpdateVersions').textContent.includes(GAME_VERSION));assert.equal(requests.length,before+1,'version mismatch never fetches room list');assert(!button.disabled);await document.querySelector('#clientUpdateClose').onclick();
}
serverVersion=GAME_VERSION;await button.click();assert(!document.querySelector('#lobbyScreen').hidden);
console.log('PASS: mismatched older/newer/missing version -> update popup -> login retained -> no room list; matching retry -> lobby (complete client DOM/network mocks)');
console.log('PASS: complete bundled-page startup, disabled pre-init click, click/Enter login -> catalog/rooms -> lobby, connection failure/retry without reload or input loss; actual client code with DOM/network mocks');

// Actual alpha login and room creation flow.
assert(!ids.has('serverAddress'));
assert(requests.every(url=>new URL(url).origin==='https://masodo-survival-server.alphacheonbung.workers.dev'));
const alphaNet=vm.runInContext('net',ctx),savedCreate=alphaNet.createRoom,savedConnect=alphaNet.connect;
let alphaCreates=0,alphaSettings;
alphaNet.createRoom=async settings=>{alphaCreates++;alphaSettings=settings;return{code:'ALPHA1'}};
alphaNet.connect=async()=>{};
for(const value of ['', 'wrong']){document.querySelector('#alphaRoomAccess').value=value;assert.equal(await vm.runInContext("connectRoom(null,true,{name:'알파방',aiMode:'none'})",ctx),false);assert.equal(alphaCreates,0)}
document.querySelector('#alphaRoomAccess').value='cjsthRhfflsek';
await vm.runInContext("connectRoom(null,true,{name:'알파방',aiMode:'none'})",ctx);
assert.equal(alphaCreates,1);assert.equal(alphaSettings.alphaCode,'cjsthRhfflsek');assert.equal(alphaSettings.name,'알파방');assert.equal(document.querySelector('#room').value,'ALPHA1');assert.equal(document.querySelector('#alphaRoomAccess').value,'');
alphaNet.createRoom=savedCreate;alphaNet.connect=savedConnect;
let fullscreenRequests=0;document.documentElement.requestFullscreen=async()=>{fullscreenRequests++};
vm.runInContext('mobileScreenQuery.matches=true',ctx);await button.click();assert.equal(fullscreenRequests,1);vm.runInContext('mobileScreenQuery.matches=false',ctx);
console.log('PASS: alpha fixed-address login -> wrong code blocked -> exact code creates/joins -> code cleared; mobile login requests fullscreen (DOM/network mocks)');

// A favorite prepared in the lobby is immediately used by the live game route.
vm.runInContext("toggleFavoriteItem('final_15')",ctx);
assert.equal(vm.runInContext('favoriteItems[0]',ctx),'final_15');
// Exercise the entire game renderer and real server action through the client adapter.
const Room=await loadRoom(),t=1700000000000,h=createHarness(Room,{humans:2,ai:0,now:t});
const net=vm.runInContext('net',ctx);net.emit('match_state',{match:h.room.snapshot(h.match,'s0',t)});
assert.equal(document.querySelector('#elapsed').textContent,'0');
assert.equal(document.querySelector('#routeTargetName').textContent,'휘트니의 건틀릿');
console.log('PASS: favorite prepared in lobby automatically becomes live match route target (complete client DOM mocks)');
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
 const active=await gardenRoom.room.getMatch();assert.equal(active.regionGardens.city.until,gardenNow+30000);assert(document.querySelector('#actionLoading').hidden);assert(vm.runInContext("debuffHud.buttons.has('gardenPassive')",ctx));vm.runInContext("debuffHud.show('gardenPassive',true)",ctx);assert.equal(document.querySelector('#debuffBubble').children[0].textContent,'모형정원의 주인');
 assert(document.querySelector('#toastStack').children.some(c=>c.children.some(x=>x.textContent.includes('QA1을 속박했습니다.'))));
 assert(document.querySelector('#enemyContactHud').innerHTML.includes('QA1'));assert(document.querySelector('#enemyContactHud').innerHTML.includes('HP 102 / 102'));
 net.emit('match_state',{match:gardenRoom.room.snapshot(active,'s1',gardenNow)});assert.equal(vm.runInContext('debuffHud.buttons.size',ctx),3,'target client displays binding, action delay and doll');assert(vm.runInContext("debuffHud.buttons.has('doll')",ctx));
 const visiting=structuredClone(active);visiting.players[1].region='factory';net.emit('match_state',{match:gardenRoom.room.snapshot(visiting,'s1',gardenNow)});assert(document.querySelector('#moves').innerHTML.includes('garden-region'));assert(document.querySelector('#moves').innerHTML.includes('정원'));
 gardenNow+=30000;perf+=30000;await gardenRoom.room.completeDueActions(active,gardenNow);net.emit('match_state',{match:gardenRoom.room.snapshot(active,'s0',gardenNow)});assert(!gardenRoom.room.snapshot(active,'s0',gardenNow).self.inGarden);assert.equal(vm.runInContext('debuffHud.buttons.size',ctx),0);
}finally{Date.now=priorGardenNow}
console.log('PASS: full original client skill click -> actual room/alarm -> 30-second garden -> enemy bind/delay HUD -> expiry, current dynamic catalog text (DOM/socket mocks, no live visual assertion)');

// Start from an actual lobby; all clients receive a roster while the server holds actions.
const introRoom=createHarness(Room,{humans:2,ai:0,now:t+200000});const introMeta=await introRoom.room.getMeta();Object.assign(introMeta,{phase:'lobby',aiMode:'fixed',aiCount:2});await introRoom.room.saveMeta(introMeta);for(const [ws,s]of introRoom.room.sessions){s.ready=true;ws.serializeAttachment(s)}
let introNow=t+200000;const oldIntroNow=Date.now;Date.now=()=>introNow;
const introDeliver=()=>{for(const msg of introRoom.sockets[0].messages.splice(0)){const incoming=net.acceptStateMessage(msg);if(incoming)net.emit(incoming.type,incoming)}};
try{
 await introRoom.room.webSocketMessage(introRoom.sockets[0],JSON.stringify({type:'request_start'}));introDeliver();assert(!document.querySelector('#matchIntro').hidden);assert(document.querySelector('#gameScreen').hidden);assert.equal(document.querySelector('#introCards').children.length,4);assert.equal(document.querySelector('#introCountdown').textContent,'5');
 await introRoom.room.webSocketMessage(introRoom.sockets[0],JSON.stringify({type:'command_search'}));assert.equal(introRoom.sockets[0].messages.at(-1).error,'match_starting');introDeliver();assert(!document.querySelector('#matchIntro').hidden);
 perf+=5000;for(const [id,fn]of [...frames]){frames.delete(id);fn()}assert(document.querySelector('#matchIntro').hidden);assert(!document.querySelector('#gameScreen').hidden);assert.equal(document.querySelector('#elapsed').textContent,'0');
 introNow+=5000;await introRoom.fireAlarm();introDeliver();assert(document.querySelector('#matchIntro').hidden);await document.querySelector('#search').onclick();await introRoom.room.webSocketMessage(introRoom.sockets[0],JSON.stringify(sent.at(-1)));introDeliver();assert.equal((await introRoom.room.getMatch()).players[0].pendingAction.type,'search');
}finally{Date.now=oldIntroNow}
console.log('PASS: original full HTML lobby start -> 4 human/AI cards -> server input guard -> local countdown -> game at 00:00 -> server release -> search accepted (DOM/socket mocks, not live browser visual QA)');

// Server local-noise discovery reaches both the top toast and unknown-HP contact HUD.
const noisy=await introRoom.room.getMatch(),listener=noisy.players[0],noisemaker=noisy.players[1];noisy.noises=[{id:'ui-local-noise',playerId:noisemaker.playerId,playerName:noisemaker.playerName,region:listener.region,level:'높음',createdAt:introNow+10,expiresAt:introNow+10000}];
await introRoom.room.completeDueActions(noisy,introNow+100,{defer:true});introRoom.room.sendMatchState(introRoom.sockets[0],noisy,{force:true,now:introNow+100});introDeliver();
assert(document.querySelector('#enemyContactHud').innerHTML.includes('QA1'));assert(document.querySelector('#enemyContactHud').innerHTML.includes('HP ?'));assert(document.querySelector('#enemyContactHud').innerHTML.includes('소음 확인'));
assert(document.querySelector('#toastStack').children.some(c=>c.children.some(x=>x.textContent==='소음 감지')));assert(!ids.has('intel'));assert(ids.has('others'));
console.log('PASS: full original HTML receives local noise -> single toast and identified HP ? HUD; garden bind wording and player-only information panel (DOM/socket mocks)');

// Offline button drives the full bundled page with every external transport blocked.
await document.querySelector('#returnLogin').onclick();let offlineFetches=0,offlineSockets=0;const priorFetch=ctx.fetch,priorSocket=ctx.WebSocket,priorTimeout=ctx.setTimeout,priorClear=ctx.clearTimeout;
ctx.fetch=()=>{offlineFetches++;throw Error('forbidden offline fetch')};ctx.WebSocket=class{static OPEN=1;constructor(){offlineSockets++;throw Error('forbidden offline socket')}};ctx.setTimeout=()=>1;ctx.clearTimeout=()=>{};
let localSession;const useOffline=net.useOffline;net.useOffline=()=>{localSession=useOffline();return localSession};let localNow=t+400000;const oldLocalNow=Date.now;Date.now=()=>localNow;
try{
 
 await document.querySelector('#offlineMode').onclick();assert(net.offline);assert(!document.querySelector('#lobbyScreen').hidden);assert.equal(net.catalog.characters.length,52);assert(document.querySelector('#status').textContent.includes('오프라인'));
 document.querySelector('#char').value='c52';document.querySelector('#startRegion').value='city';assert(await vm.runInContext("connectRoom(null,true,{name:'오프라인 연습',aiMode:'fixed',aiCount:1})",ctx));
 document.querySelector('#ready').onclick();await localSession.queue;document.querySelector('#start').onclick();await localSession.queue;assert(!document.querySelector('#matchIntro').hidden);assert.equal(document.querySelector('#introCards').children.length,2);
 localNow+=5000;perf+=5000;await localSession.room.alarm();assert(document.querySelector('#matchIntro').hidden);assert(!document.querySelector('#gameScreen').hidden);assert.equal(document.querySelector('#elapsed').textContent,'0');
 await document.querySelector('#search').onclick();await localSession.queue;let game=await localSession.room.getMatch();assert.equal(game.players[0].pendingAction.type,'search');localNow=game.players[0].pendingAction.completeAt;await localSession.room.alarm();assert(document.querySelector('#actionLoading').hidden);
 game=await localSession.room.getMatch();const me=game.players[0],enemy=game.players[1];me.pendingEvent=null;me.pendingPickup=null;enemy.region=me.region;me.encounter={kind:'player',targetId:enemy.playerId};await localSession.room.saveMatch(game);localSession.room.sendMatchState(localSession.ws,game,{force:true,now:localNow});
 await document.querySelector('#skill').onclick();await localSession.queue;game=await localSession.room.getMatch();localNow=game.players[0].pendingAction.completeAt;await localSession.room.alarm();assert(document.querySelector('#resultTitle').textContent.includes('승리'));assert.equal(offlineFetches,0);assert.equal(offlineSockets,0);
 net.close();net.useOnline();assert.equal(net.offline,false);
}finally{net.close();Date.now=oldLocalNow;ctx.fetch=priorFetch;ctx.WebSocket=priorSocket;ctx.setTimeout=priorTimeout;ctx.clearTimeout=priorClear}
console.log('PASS: full HTML offline button -> local catalog/lobby -> character/AI room -> 5s roster -> search/loading -> instant skill/victory UI with zero fetch/WebSocket calls; explicit online switch (DOM mocks, not live browser visual QA)');

// Additional action selection uses the full page, adapter payload and real room.
{
 const h=createHarness(Room,{humans:2,ai:0,now:t}),m=h.match,p=m.players[0];p.charId='c04';p.rework.mode='blade';p.pendingAction=null;p.encounter={kind:'player',targetId:m.players[1].playerId};await h.room.saveMatch(m);net.ws={readyState:1,send:s=>sent.push(JSON.parse(s))};net.offline=false;
 vm.runInContext('clearLocalAction();localAction=null',ctx);net.emit('match_state',{match:h.room.snapshot(m,'s0',t)});
 assert.equal(document.querySelector('#charAction').parentNode,document.querySelector('#encounterActionRow'));assert.equal(document.querySelector('#charAction').disabled,false);const cycle=document.querySelector('#actionChoiceCycle');assert.equal(document.querySelector('#actionChoiceRow').hidden,false);assert(cycle.textContent.includes('레일건'));const before=sent.length;await cycle.onclick();assert(cycle.textContent.includes('부스터'));await cycle.onclick();assert(cycle.textContent.includes('레일건'));assert.equal(sent.length,before,'cycling never sends a command or spends resources');await document.querySelector('#charAction').onclick();assert.equal(sent.at(-1).choice,'rail');assert(!vm.runInContext('reworkUI.dialog.open',ctx));const clock=Date.now;Date.now=()=>t;
 try{await h.room.webSocketMessage(h.sockets[0],JSON.stringify(sent.at(-1)));let saved=await h.room.getMatch();assert.equal(saved.players[0].pendingAction.payload.choice,'rail');Date.now=()=>t+1000;await h.room.completeDueActions(saved,t+1000);assert.equal(saved.players[0].rework.mode,'rail');h.room.sendMatchState(h.sockets[0],saved,{force:true,now:t+1000});for(const msg of h.sockets[0].messages){const incoming=net.acceptStateMessage(msg);if(incoming)net.emit(incoming.type,incoming);}assert(document.querySelector('#reworkState').textContent.includes('레일건'));}finally{Date.now=clock;}
}
console.log('PASS: full client local cycle button -> immediate selected action -> adapter payload -> room completion -> resource/mode HUD (DOM mocks)');

// Full client: random action is one click, then keyword feedback and incoming cause toast.
{
 const h=createHarness(Room,{humans:2,ai:0,now:t}),m=h.match,p=m.players[0],q=m.players[1];p.charId='c51';p.pendingAction=null;q.playerName='알림 시전자';await h.room.saveMatch(m);net.ws={readyState:1,send:s=>sent.push(JSON.parse(s))};net.offline=false;vm.runInContext('clearLocalAction();noticeSnapshot=null',ctx);net.emit('match_state',{match:h.room.snapshot(m,'s0',t)});
 await document.querySelector('#charAction').onclick();assert.equal(sent.at(-1).type,'command_char_action');assert.equal(sent.at(-1).choice,undefined);assert.equal(sent.at(-1).words,undefined);assert(!vm.runInContext('reworkUI.dialog.open',ctx));
 const clock=Date.now,oldRandom=Math.random;Date.now=()=>t;
 const deliver=()=>{for(const msg of h.sockets[0].messages.splice(0)){const incoming=net.acceptStateMessage(msg);if(incoming)net.emit(incoming.type,incoming)}};
 try{await h.room.webSocketMessage(h.sockets[0],JSON.stringify(sent.at(-1)));deliver();let saved=await h.room.getMatch();const due=saved.players[0].pendingAction.completeAt;Date.now=()=>due;Math.random=()=>.01;await h.room.completeDueActions(saved,due);deliver();assert(document.querySelector('#reworkState').textContent.includes('키워드 1/10'));assert(vm.runInContext("debuffHud.buttons.has('rw_keyword_tracking')",ctx));vm.runInContext("debuffHud.show('rw_keyword_tracking',true)",ctx);assert.equal(document.querySelector('#debuffBubble').children[0].textContent,'키워드: 추적');assert(document.querySelector('#debuffBubble').children[1].textContent.includes('명중률 +20%p'));assert(document.querySelector('#debuffBubble').children[2].textContent.includes('1 / 10중첩'));assert(document.querySelector('#toastStack').children.some(x=>x.children.some(y=>String(y.textContent).includes('추적 획득'))));
  applyStatus(saved.players[0],'bind',1,null,q.playerId,due,q,saved,'정원 설치');applyStatus(saved.players[0],'actionDelay',1,null,q.playerId,due,q,saved,'정원 설치');h.room.sendMatchState(h.sockets[0],saved,{force:true,now:due});deliver();const alerts=document.querySelector('#toastStack').children;assert(alerts.some(x=>x.children.some(y=>String(y.textContent).includes('알림 시전자')&&String(y.textContent).includes('속박'))&&x.children.some(y=>String(y.textContent).includes('정원 설치'))));const previous=alerts.map(x=>x.children.map(y=>y.textContent).join('|'));h.room.sendMatchState(h.sockets[0],saved,{force:true,now:due});deliver();assert.deepEqual(document.querySelector('#toastStack').children.map(x=>x.children.map(y=>y.textContent).join('|')),previous,'resync does not duplicate toasts');
 }finally{Date.now=clock;Math.random=oldRandom}
}
console.log('PASS: full client random keyword click -> room -> acquisition toast/HUD; incoming status source/cause -> grouped toast; repeated full state deduplicated (DOM mocks)');
// Mixed-stat weapons/equipment retain their class in the actual inventory renderer.
{
 const classified=createHarness(Room,{humans:2,ai:0,now:t}),p=classified.match.players[0];p.eq=['gauntlet','near_final_01','final_16'];classified.match.matchId='classified-inventory';vm.runInContext('clearLocalAction();noticeSnapshot=null',ctx);net.emit('match_state',{match:classified.room.snapshot(classified.match,'s0',t)});const equipped=document.querySelector('#eq').innerHTML;assert(equipped.includes('강화권갑'));assert(equipped.includes('벨리트라의 혀 피어싱'));assert(equipped.includes('제타의 마법서'));assert(equipped.includes('무기 · 희귀'));assert(equipped.includes('장비 · 준최종'));assert(equipped.includes('무기 · 최종'));
}
console.log('PASS: actual full client inventory displays mixed-stat gauntlet/grimoire as weapons and piercing as equipment; common three-slot storage preserved (DOM/socket mocks)');

net.catalog.items=ITEMS;vm.runInContext('fillCatalog()',ctx);assert.equal(vm.runInContext("I('final_18').n",ctx),'하나린의 검');assert.equal(vm.runInContext("I('final_18').def",ctx),0);assert.equal(vm.runInContext("I('final_03').atk",ctx),5);assert(vm.runInContext("I('final_15').effectText.includes('60%')",ctx));assert(vm.runInContext("I('near_final_03').r.rare_boots===1",ctx));
console.log('PASS: full client crafting data sync uses the current catalog: corrected DB names/recipes, role stats and 60% x2 tooltip (DOM mocks)');
