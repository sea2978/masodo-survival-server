import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {ITEMS} from '../src/offline_content.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
const source=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),els=new Map(),messages=[];
const element=()=>({children:[],open:false,textContent:'',replaceChildren(){this.children=[]},appendChild(x){this.children.push(x)},showModal(){this.open=true},close(){this.open=false}});
const $=id=>{if(!els.has(id))els.set(id,element());return els.get(id)};
let p={eq:['plate','focus','accel'],mat:{electronics:1,precision:1,battery:1},con:{}};
const ctx={$,I:id=>ITEMS[id],busy:()=>false,M:{self:{alive:true}},document:{createElement:element},me:()=>p,toast:()=>{},canCraft:()=>true,net:{craft:(id,replacement)=>messages.push({id,...replacement})}};
vm.createContext(ctx);vm.runInContext(source.slice(source.indexOf('function craft(p,'),source.indexOf('function toast(')),ctx);
ctx.craft(p,'aim_terminal');assert($('#craftDiscardPanel').open);assert.equal($('#craftDiscardChoices').children.length,3);assert.equal(messages.length,0);
$('#craftDiscardPanel').close();assert.equal(messages.length,0,'cancel must not send or discard');
ctx.craft(p,'aim_terminal');$('#craftDiscardChoices').children[1].onclick();assert.equal(messages[0].replaceId,'focus');assert.equal(messages[0].replaceIndex,1);assert(!$('#craftDiscardPanel').open);
const upgrade=Object.keys(ITEMS).find(id=>ITEMS[id].t==='e'&&Object.keys(ITEMS[id].r||{}).some(k=>ITEMS[k].t==='e'));
p.eq=[Object.keys(ITEMS[upgrade].r).find(k=>ITEMS[k].t==='e'),'plate','focus'];ctx.craft(p,upgrade);assert.equal(messages.at(-1).id,upgrade);assert(!$('#craftDiscardPanel').open);
// Real room command -> timed action -> stored inventory -> broadcast.
const Room=await loadRoom(),t=1700000000000,h=createHarness(Room,{humans:2,ai:0,now:t});const m=structuredClone(h.match),q=m.players[0];q.eq=['plate','focus','accel'];q.mat={electronics:1,precision:1,battery:1};q.con={};m.players[1].region='factory';await h.room.saveMatch(m);
const clock=Date.now;Date.now=()=>t;
try{await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_craft',...messages[0]}));const saved=await h.room.getMatch();assert.equal(saved.players[0].pendingAction.payload.replaceId,'focus');assert.deepEqual(saved.players[0].eq,['plate','focus','accel']);await h.room.completeDueActions(saved,t+10000);const done=await h.room.getMatch();assert.deepEqual(done.players[0].eq,['plate','accel','aim_terminal']);}finally{Date.now=clock}
console.log('PASS: craft choice/cancel/upgrade UI handlers (DOM mocks); real room command, timed completion and stored inventory');
