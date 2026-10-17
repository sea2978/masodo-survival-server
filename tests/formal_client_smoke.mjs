import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8');
const standalone=fs.readFileSync(new URL('../public/MasodoSurvival.html',import.meta.url),'utf8');
for(const html of [source,standalone]){
 assert(!/ALPHA_SERVER_URL|ALPHA_CODE_DIGEST|alphaCodePanel|alphaCreateGrant|alphacheonbung\.workers\.dev|알파 테스트 전용/.test(html));
 assert(html.includes('id="serverAddress"'));assert(html.includes('class="event-choices"'));assert(html.includes('class="event-choice"'));
 assert(html.includes("style.setProperty('--encounter-info-height'"));assert(html.includes('width:min(38vw,300px)'));
 for(const fn of ['renderRegionRestrictions','renderPickup','renderOtherSurvivors','refreshInfo'])assert(html.includes('function '+fn+'('));
 assert(html.includes("message.textContent='서버 연결됨'"));assert(!html.includes("message.textContent='서버 연결 성공: '+url.origin"));
}
const els=new Map(),$=id=>{if(!els.has(id))els.set(id,{value:'',textContent:'',disabled:false,open:false,showModal(){this.open=true},close(){this.open=false}});return els.get(id)};
let loaded=0,rooms=0,enabled=false;
const ctx={$,URL,serverReady:true,roomEntryBusy:false,net:{close(){},async loadCatalog(){loaded++}},renderBuild(){},fillCatalog(){},async refreshRooms(){rooms++},setServerControls:v=>enabled=v,showLobby(){},log(){}};
vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf("$('#create').onclick="),source.indexOf("$('#cancelCreateRoom').onclick=")),ctx);
$('#create').onclick();assert($('#createRoomPanel').open,'room settings open immediately without a secret');
vm.runInContext(source.slice(source.indexOf("$('#connectServer').onclick="),source.indexOf("$('#loginForm').onsubmit=")),ctx);
$('#name').value='QA';$('#serverAddress').value='https://chosen-server.example/path';await $('#connectServer').onclick();assert.equal(ctx.net.baseUrl,'https://chosen-server.example');assert.equal(loaded,1);assert.equal(rooms,1);assert(enabled);assert.equal($('#serverConnectMessage').textContent,'서버 연결됨');
$('#serverAddress').value='invalid';await $('#connectServer').onclick();assert.equal(loaded,1,'invalid address must not connect');
console.log('PASS: ordinary room creation without code, user-selected server connection, no pinned alpha endpoint/branding, mobile fixes and gameplay features retained (DOM mocks)');
