import assert from 'node:assert/strict';import fs from 'node:fs';
import {TutorialPractice} from '../src/tutorial_practice.js';import{TutorialUI,TUTORIAL_CHAPTERS}from'../public/tutorial.js';
const source=fs.readFileSync('public/index.html','utf8');assert(source.includes('data-lobby-panel="tutorialPanel"'));assert(source.includes('TutorialPractice'));assert.equal(TUTORIAL_CHAPTERS.length,12);assert(TUTORIAL_CHAPTERS[0].steps[0].text.includes('{user}는 유저노트를 사용해 모든 캐릭터'));
const savedNow=Date.now,savedTimeout=globalThis.setTimeout,savedInterval=globalThis.setInterval,savedClearTimeout=globalThis.clearTimeout,savedClearInterval=globalThis.clearInterval,savedStorage=globalThis.localStorage,savedFetch=globalThis.fetch,savedWS=globalThis.WebSocket;
let now=1700000000000,seq=0;const timers=new Map(),storage=new Map([['masodo-offline-session-v1','OFFLINE_GAME_UNCHANGED'],['masodo.favorites','FAVORITES_UNCHANGED']]);let writes=0;
Date.now=()=>now;globalThis.setTimeout=(fn,ms)=>{timers.set(++seq,{fn,at:now+ms});return seq};globalThis.clearTimeout=id=>timers.delete(id);globalThis.setInterval=()=>++seq;globalThis.clearInterval=()=>{};globalThis.fetch=()=>{throw Error('Tutorial attempted fetch')};globalThis.WebSocket=class{constructor(){throw Error('Tutorial attempted WebSocket')}};globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>{assert.equal(k,'masodo-tutorial-progress-v1');writes++;storage.set(k,v)}};
const node=()=>({innerHTML:'',textContent:'',hidden:false,value:'',style:{setProperty(){}},setAttribute(){},querySelectorAll:()=>[]});
const makeRoot=()=>({open:false,nodes:new Map(),listeners:{},innerHTML:'',querySelector(selector){if(!this.nodes.has(selector))this.nodes.set(selector,node());return this.nodes.get(selector)},addEventListener(type,fn){this.listeners[type]=fn},contains:()=>true,showModal(){this.open=true},close(){this.open=false;this.listeners.close?.()}});
const advance=()=>{let count=0;while(timers.size){assert(count++<100);const[id,t]=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];timers.delete(id);now=Math.max(now,t.at);t.fn()}};
const click=(root,kind)=>root.listeners.click({target:{closest:()=>({dataset:{tut:kind}})}});
try{
 const root=makeRoot(),ui=new TutorialUI(root,{Practice:TutorialPractice,sprite(){},effectDefinitions:{bleed:{name:'출혈',icon:'',describe:n=>'출혈 '+n}}});ui.open();assert(root.open);
 let actions=0;
 for(let ci=0;ci<TUTORIAL_CHAPTERS.length;ci++){
  ui.start(ci);const chapter=ui.chapterInfo();
  for(let si=0;si<chapter.steps.length;si++){
   const step=ui.step();assert.equal(ui.index,si);const before=ui.practice.snapshot(now),offline=storage.get('masodo-offline-session-v1');
   if(step.view==='room'){ui.q('#tutorialStart').value='estate';ui.q('#tutorialAI').value='3'}
   click(root,'act');actions++;
   if(step.engine&&ui.busy){assert(ui.practice.player.pendingAction);assert(!ui.done,'cannot advance before deadline');const oldIndex=ui.index;click(root,'next');assert.equal(ui.index,oldIndex);advance()}
   let retries=0;while(!ui.done&&step.requireKill&&retries++<30){click(root,'act');advance()}
   assert(ui.done,chapter.id+' / '+step.title+' / '+ui.q('.tutorial-feedback').textContent);
   if(step.action==='rest'){assert(ui.practice.player.hp>before.self.hp);assert(ui.practice.player.sp>before.self.sp)}
   if(step.prep==='full_recipe')assert.deepEqual(ui.practice.player.eq,['plate','recovery','gun']);
   if(step.action==='pickup_replace'){assert(!ui.practice.player.con.water);assert.equal(ui.practice.player.con.wet_bread,1)}
   if(step.action==='trace_clear')assert.equal(ui.practice.snapshot(now).self.enemyContacts.length,0);
   if(step.prep==='garden'){assert(ui.practice.enemy.statuses.bind);assert(ui.practice.enemy.statuses.actionDelay);assert(ui.practice.snapshot(now).self.buffs)}
   if(step.prep==='keyword'){assert.equal(ui.practice.player.rework.keywords.length,1)}
   if(step.action==='skill'&&ci===9){assert.equal(ui.practice.player.rework.keywords.length,0)}
   if(step.payloadChoice)assert.equal(ui.practice.player.rework.mode,ui.practice.choice);
   if(step.action==='final_preview'){assert.equal(ui.practice.player.region,'city');assert.equal(ui.practice.match.regionRestrictions.final,true)}
   assert.equal(storage.get('masodo-offline-session-v1'),offline);assert.equal(storage.get('masodo.favorites'),'FAVORITES_UNCHANGED');
   if(si<chapter.steps.length-1)click(root,'next');
  }
  assert(ui.completed.has(chapter.id));
 }
 assert.equal(ui.completed.size,12);assert.equal(writes,12);root.close();assert.equal(timers.size,0);
 const resumed=new TutorialUI(makeRoot(),{Practice:TutorialPractice,sprite(){}});assert.equal(resumed.completed.size,12);resumed.open();assert.equal(resumed.chapter,0);resumed.start(2);resumed.index=1;resumed.enterStep();resumed.act();assert(resumed.busy);const pending=resumed.practice.player.pendingAction;resumed.root.close();advance();assert.equal(resumed.practice.player.pendingAction,null);assert(!resumed.done,'exit cancels pending lesson without awarding progress');assert(pending);
 console.log(`PASS: all 12 chapters / ${actions} guided interactions using production engine; real action deadlines, waiting/next guard, results, recipes/full equipment, inventory choices, locks, status effects, garden/keywords/modules, completion persistence/reload and mid-action exit; zero network, offline save/favorites unchanged (DOM mocks)`);
}finally{Date.now=savedNow;globalThis.setTimeout=savedTimeout;globalThis.setInterval=savedInterval;globalThis.clearTimeout=savedClearTimeout;globalThis.clearInterval=savedClearInterval;globalThis.localStorage=savedStorage;globalThis.fetch=savedFetch;globalThis.WebSocket=savedWS}
