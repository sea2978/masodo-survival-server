import {loadRoom,createHarness} from './room_test_harness.mjs';
import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync(new URL('../public/MasodoSurvival.html',import.meta.url),'utf8');
let navigations=0,clickPromise=null,fail=false;assert(!html.includes('<script type="module">'));assert(/<button id="connectServer" type="button" disabled>/.test(html));assert(html.includes('<form id="loginForm" onsubmit="return false"'));
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]));const nodes=new Map();
const node=()=>({value:'',textContent:'',innerHTML:'',hidden:false,disabled:false,open:false,style:{setProperty(){},removeProperty(){}},classList:{add(){},remove(){},toggle(){}},dataset:{},children:[],options:[],appendChild(x){this.children.push(x)},append(...x){this.children.push(...x)},prepend(){},setAttribute(){},removeAttribute(){},addEventListener(){},removeEventListener(){},querySelectorAll:()=>[],querySelector:()=>node(),showModal(){this.open=true},close(){this.open=false},replaceChildren(){this.children=[]},click(){if(this.disabled)return;let prevented=false;clickPromise=Promise.resolve(this.onclick?.({preventDefault(){prevented=true}}));if(this.type==='submit'&&!prevented)navigations++;return clickPromise},getBoundingClientRect:()=>({width:100,height:100})});
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
