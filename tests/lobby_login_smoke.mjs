import {equipmentKind,itemClassLabel,itemClassIcon} from '../src/item_classification.js';
import {GAME_VERSION} from '../src/version.js';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {CHARACTERS} from '../src/game_data.js';
import {ITEMS} from '../src/offline_content.js';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const source=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),els=new Map(),calls=[];
const element=()=>({value:'',hidden:false,disabled:false,open:false,textContent:'',innerHTML:'',style:{},children:[],className:'',showModal(){this.open=true},close(){this.open=false},replaceChildren(){this.children=[]},appendChild(x){this.children.push(x)},prepend(){},querySelectorAll(){return[]}});
const $=id=>{if(!els.has(id))els.set(id,element());return els.get(id)};
const ctx={equipmentKind,itemClassLabel,itemClassIcon,$,URL,matchIntro:{clear(){}},debuffHud:{clear(){}},serverReady:false,roomEntryBusy:false,WebSocket:{OPEN:1},D:{items:ITEMS},document:{body:{classList:{remove(){},add(){}}},querySelectorAll:()=>[],createElement:element},clearMatchClock(){},clearSkillCooldowns(){},hideReconnectLoading(){},clearLocalAction(){},stopSearchLoading(){},renderCharInfo(){},renderBuild(){},fillCatalog(){},refreshRooms:async()=>{},log(){},escapeRoomText:x=>String(x).replaceAll('<','&lt;'),setCharacterSprite(){},net:{catalog:{characters:CHARACTERS,items:ITEMS},close(){},async loadCatalog(){calls.push('catalog');this.catalog={characters:CHARACTERS,items:ITEMS}},async listRooms(){return{rooms:[]}},setReady(v){calls.push(['ready',v])}},connectRoom:async(...x)=>{calls.push(x);return true}};
vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf('function craftStatsText('),source.indexOf('function nextUpgradeItems(')),ctx);
vm.runInContext(source.slice(source.indexOf('function showLogin('),source.indexOf('const gameLog=')),ctx);
ctx.showLobby();assert(!$('#loginScreen').hidden);assert($('#lobbyScreen').hidden);assert($('#gameScreen').hidden);
vm.runInContext(source.slice(source.indexOf('function openLobbyPanel('),source.indexOf("document.querySelectorAll('[data-lobby-panel]').forEach")),ctx);
vm.runInContext(source.slice(source.indexOf('function setServerControls('),source.indexOf('setServerControls(false);')),ctx);
vm.runInContext(source.slice(source.indexOf("$('#connectServer').onclick="),source.indexOf("$('#loginForm').onsubmit=")),ctx);
$('#serverAddress').value='https://example.test';await $('#connectServer').onclick();assert.equal(calls.length,0);assert($('#serverConnectMessage').textContent.includes('플레이어명'));
$('#name').value='  테스터  ';await $('#connectServer').onclick();assert.equal($('#name').value,'테스터');assert.equal(ctx.net.baseUrl,'https://example.test');assert($('#loginScreen').hidden);assert(!$('#lobbyScreen').hidden);assert.equal($('#lobbyPlayerName').textContent,'테스터');
for(const id of ['quickMatchPanel','roomBrowserPanel','itemCodexPanel','characterCodexPanel','playerSettingsPanel']){ctx.openLobbyPanel(id);assert($('#'+id).open,id)}
assert($('#itemCodexList').innerHTML.includes('량아 레하의 금속 카드'));$('#itemCodexSearch').value='량아';ctx.renderItemCodex();assert($('#itemCodexList').innerHTML.includes('금속 카드'));assert(!$('#itemCodexList').innerHTML.includes('철조각</h3>'));
$('#characterCodexSearch').value='량아 레하';ctx.renderCharacterCodex();assert.equal($('#characterCodexList').children.length,1);assert($('#characterCodexList').children[0].innerHTML.includes('미스디렉션'));
calls.length=0;ctx.net.listRooms=async()=>({rooms:[{code:'ABCDEF',phase:'lobby',humanCount:1,maxHumans:10},{code:'FULL00',phase:'lobby',humanCount:10,maxHumans:10}]});await ctx.quickMatch();assert.equal(calls[0][0],'ABCDEF');assert.deepEqual(calls.at(-1),['ready',true]);
calls.length=0;ctx.net.listRooms=async()=>({rooms:[]});await ctx.quickMatch();assert.equal(calls[0][1],true);assert.equal(calls[0][2].aiMode,'fill');assert.deepEqual(calls.at(-1),['ready',true]);
ctx.net.loadCatalog=async()=>{throw Error('offline')};ctx.showLogin();$('#serverAddress').value='https://bad.test';await $('#connectServer').onclick();assert(!$('#loginScreen').hidden);assert($('#lobbyScreen').hidden);assert(!$('#connectServer').disabled);
const fetch=globalThis.fetch;globalThis.fetch=async()=>new Response(JSON.stringify({ok:true,characters:CHARACTERS,regions:[],items:ITEMS}));try{const a=new MasodoNetworkAdapter('https://example.test');await a.loadCatalog();assert.equal(Object.keys(a.catalog.items).length,Object.keys(ITEMS).length);a.mergeCatalog({characters:[{id:'c01',name:'서노리'}]});assert(a.catalog.items.final_22);}finally{globalThis.fetch=fetch}
for(const id of ['name','char','startRegion','room','ready','start'])assert.equal((source.match(new RegExp('id="'+id+'"','g'))||[]).length,1,'unique DOM id '+id);
console.log('PASS: login validation/success/failure, five lobby popups, codex searches, quick join/create/ready, catalog retention and unique controls (DOM mocks)');

let workerSource=fs.readFileSync(new URL('../src/index.js',import.meta.url),'utf8').replace('export { GameRoom } from "./room.js";','');workerSource=workerSource.replace(/from "\.\/([^\"]+)"/g,(_,p)=>'from '+JSON.stringify(new URL('../src/'+p,import.meta.url).href));
const worker=(await import('data:text/javascript;base64,'+Buffer.from(workerSource).toString('base64'))).default;
const response=await worker.fetch(new Request('https://example.test/api/catalog?clientVersion='+GAME_VERSION),{}),catalog=await response.json();assert.equal(response.status,200);assert.equal(catalog.characters.length,52);assert.equal(Object.keys(catalog.items).length,Object.keys(ITEMS).length);assert(catalog.items.final_22.r.special_37);
console.log('PASS: real catalog API supplies character skills and complete item recipes for lobby codices');

for(const version of ['', '0.0.0-online','99.0.0-online']){const response=await worker.fetch(new Request('https://example.test/api/catalog?clientVersion='+version),{});assert.equal(response.status,426);const data=await response.json();assert.equal(data.error,'client_version_mismatch');assert.equal(data.version,GAME_VERSION);assert(!data.characters);}
const versionFetch=globalThis.fetch;globalThis.fetch=(url,options)=>worker.fetch(new Request(url,options),{});
try{const adapter=new MasodoNetworkAdapter('https://example.test');adapter.clientVersion='0.0.0-online';await assert.rejects(adapter.loadCatalog(),error=>error.code==='client_version_mismatch'&&error.serverVersion===GAME_VERSION);assert.equal(adapter.catalog,null);adapter.clientVersion=GAME_VERSION;await adapter.loadCatalog();assert.equal(adapter.build.version,GAME_VERSION);}finally{globalThis.fetch=versionFetch}
console.log('PASS: real server rejects absent/older/newer versions; adapter receives typed update error and matching catalog succeeds');
