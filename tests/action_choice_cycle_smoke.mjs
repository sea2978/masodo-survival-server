import assert from 'node:assert/strict';
import {ReworkUI} from '../public/rework_ui.js';
import {REWORK_CONFIG,reworkState} from '../src/character_reworks.js';
import {beginServerAction,completeAction} from '../src/match_engine.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
const node=()=>({children:[],style:{},setAttribute(){},addEventListener(){},appendChild(x){this.children.push(x)},replaceChildren(){this.children=[]},showModal(){this.open=true},close(){this.open=false}});
const nodes=new Map(['#actionChoiceCycle','#actionChoiceRow','#reworkState','#regionalObjects'].map(k=>[k,node()]));
globalThis.document={body:node(),createElement:node,createTextNode:text=>({textContent:text}),querySelector:k=>nodes.get(k)};
const storage=new Map();globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)};
const Room=await loadRoom(),T=1700000000000;let types=0;
for(const [id,cfg]of Object.entries(REWORK_CONFIG).filter(([,c])=>c.choices.length>1)){
 const h=createHarness(Room,{humans:2,ai:0,now:T}),m=h.match,[p,t]=m.players;p.charId=id;p.sp=100;p.hp=50;p.encounter={kind:'player',targetId:t.playerId};p.enemyContacts={city:[{id:t.playerId}]};reworkState(p).resources={paint:3,luck:3,flow:2};
 if(id==='c04')p.rework.mode='blade';let snapshot=h.room.snapshot(m,'s0',T),payloads=[];
 const args={state:()=>snapshot,send:x=>{payloads.push(x)},skill(){},remove(){},character:()=>({}),region:x=>x};const ui=new ReworkUI(args);ui.update(snapshot);
 const expected=cfg.choices.filter(x=>id!=='c04'||x!=='blade');const seen=[];const initial=ui.selection().selected.id;
 for(let n=0;n<expected.length;n++){seen.push(ui.selection().selected.id);ui.cycle();}
 assert.deepEqual(new Set(seen),new Set(expected),id);assert.equal(ui.selection().selected.id,initial);assert.equal(payloads.length,0);assert.equal(p.sp,100);assert.equal(p.cdAUntil,0);
 ui.cycle();const selected=ui.selection().selected.id;const resumed=new ReworkUI(args);resumed.update(snapshot);assert.equal(resumed.selection().selected.id,selected,'selection survives client reconstruction');
 ui.open();assert(!ui.dialog.open,id);assert.equal(payloads.at(-1).choice,selected);const a=beginServerAction(m,p,'char_action',payloads.at(-1),T);assert(a.ok,id+JSON.stringify(a));assert.equal(p.pendingAction.payload.choice,selected);const r=completeAction(m,p,a.action.completeAt);assert(r.ok,id+JSON.stringify(r));assert.equal(r.choice,selected);assert.equal(p.cdAUntil,a.action.completeAt+cfg.cd*1000);ui.update(h.room.snapshot(m,'s0',a.action.completeAt));assert(!ui.dialog.open);types++;
}
// Unrelated direct actions and destination/target selection stay available.
for(const id of ['c01','c09','c24','c51']){let sent=0;const ui=new ReworkUI({state:()=>({phase:'playing',self:{charId:id,alive:true,reworkOptions:{choices:[],targeted:false,objects:[]}}}),send:()=>sent++});ui.update(ui.state());assert(nodes.get('#actionChoiceRow').hidden);ui.open();assert.equal(sent,1);assert(!ui.dialog.open);}
console.log('PASS:',types,'characters: cycle every kind -> wrap -> no SP/CD/network -> restore selection -> selected payload -> real action/effect/CD; direct actions unchanged (DOM mocks)');
