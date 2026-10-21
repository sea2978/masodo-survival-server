import assert from 'node:assert/strict';import fs from 'node:fs';
import {TutorialPractice} from '../src/tutorial_practice.js';import{TutorialUI,TUTORIAL_CHAPTERS}from'../public/tutorial.js';
const source=fs.readFileSync('public/index.html','utf8');assert(source.includes('data-lobby-panel="tutorialPanel"'));assert(source.includes('id="tutorialGameScreen"'));assert.equal(TUTORIAL_CHAPTERS.length,12);
const original={now:Date.now,timeout:setTimeout,interval:setInterval,clearTimeout,clearInterval,storage:globalThis.localStorage,fetch:globalThis.fetch,ws:globalThis.WebSocket};
let now=1700000000000,seq=0;const timers=new Map(),storage=new Map([['masodo-offline-session-v1','OFFLINE_UNCHANGED'],['masodo.favorites','FAVORITES_UNCHANGED'],['masodo-tutorial-progress-v1','OLD_LESSONS_UNCHANGED']]);let writes=0,enters=0,leaves=0;const sprites=[];
Date.now=()=>now;globalThis.setTimeout=(fn,ms)=>{timers.set(++seq,{fn,at:now+ms});return seq};globalThis.clearTimeout=id=>timers.delete(id);globalThis.setInterval=()=>++seq;globalThis.clearInterval=()=>{};globalThis.fetch=()=>{throw Error('Unexpected network')};globalThis.WebSocket=class{constructor(){throw Error('Unexpected socket')}};globalThis.localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>{assert.equal(k,'masodo-tutorial-scenario-progress-v1');writes++;storage.set(k,v)}};
const node=()=>({innerHTML:'',textContent:'',hidden:false,value:'',dataset:{},disabled:false,style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},setAttribute(){},focus(){},children:new Map(),querySelector(s){if(!this.children.has(s))this.children.set(s,node());return this.children.get(s)},querySelectorAll:()=>[]});
const surface=()=>({...node(),open:false,nodes:new Map(),listeners:{},querySelector(s){if(!this.nodes.has(s))this.nodes.set(s,node());return this.nodes.get(s)},addEventListener(type,fn){this.listeners[type]=fn},showModal(){this.open=true},close(){this.open=false}});
const root=surface(),screen=surface();screen.hidden=true;
const ui=new TutorialUI(root,{Practice:TutorialPractice,screen,sprite:(...x)=>sprites.push(x),effectDefinitions:{bleed:{name:'출혈',icon:'',describe:n=>'출혈 '+n}},enter:()=>enters++,leave:()=>leaves++});
const click=(surface,data)=>surface.listeners.click({target:{closest:()=>({dataset:data})}});
const nextTimer=()=>{assert(timers.size,'expected pending timer');const[id,t]=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];timers.delete(id);now=Math.max(now,t.at);t.fn()};
const readDialogue=()=>{let n=0;while(ui.phase==='dialogue'){assert(n++<50);click(screen,{tut:'dialogue-next'})}};
try{
 ui.open();assert(root.open);assert(!ui.active);assert(!ui.practice,'chapter picker does not start gameplay');assert(screen.hidden);let actions=0;
 for(let ci=0;ci<TUTORIAL_CHAPTERS.length;ci++){
  click(root,{tutChapter:String(ci)});assert.equal(ui.chapter,ci);assert(!ui.active);click(root,{tut:'launch'});assert(!root.open);assert(ui.active);assert(!screen.hidden);assert.equal(ui.phase,'dialogue');assert(ui.q('.scenario-speaker').textContent);const paused=ui.now();now+=17000;assert.equal(ui.now(),paused,'scenario clock pauses during dialogue');
  // Dialogue skip cannot finish a gameplay objective.
  click(screen,{tut:'dialogue-skip'});
  for(let si=0;si<TUTORIAL_CHAPTERS[ci].steps.length;si++){
   assert.equal(ui.index,si);readDialogue();const step=ui.step();
   if(step.view==='room'){ui.q('#tutorialStart').value='estate';ui.q('#tutorialAI').value='3'}
   if(!ui.done){const hp=ui.practice.player.hp;
    if(step.action==='read'||step.action==='roster')click(screen,{tut:'act'});
    else if(step.action==='inspect_effect')click(screen,{tutEffect:'bleed'});
    else if(step.action==='move'){click(screen,{tutCommand:'move'});click(screen,{tutDestination:step.payload.to})}
    else if(step.action==='craft'){click(screen,{tutCommand:'craft'});click(screen,{tutCraft:step.payload.id})}
    else if(step.action==='favorite'){click(screen,{tutCommand:'craft'});click(screen,{tut:'act'})}
    else if(step.action==='event_choice')click(screen,{tutEvent:String(step.payload.index)});
    else if(step.action.startsWith('pickup_')){click(screen,{tutCommand:'inventory'});click(screen,{tutChoice:step.action==='pickup_discard'?'discard':'replace'})}
    else if(step.action==='inventory'||step.action==='use_item'){click(screen,{tutCommand:'inventory'});click(screen,{tut:'act'})}
    else if(step.action==='cycle')click(screen,{tut:'cycle'});
    else if(['lock_preview','final_preview','trace_clear'].includes(step.action)){click(screen,{tutCommand:step.action==='trace_clear'?'info':'move'});click(screen,{tut:'act'})}
    else click(screen,{tutCommand:step.action});
    actions++;if(step.engine){assert(ui.busy,'actual action waiting: '+step.title);assert(!ui.done);const pending=ui.practice.player.pendingAction;assert(pending.completeAt>ui.now());ui.command('search');assert.equal(ui.practice.player.pendingAction,pending);let n=0;while(ui.busy){assert(n++<1000);nextTimer()}}
    let retries=0;while(!ui.done&&step.requireKill&&retries++<40){ui.command('attack');while(ui.busy)nextTimer()}
    assert(ui.done,ci+' / '+step.title+' / '+ui.q('.scenario-feedback').textContent);if(step.action==='rest')assert(ui.practice.player.hp>hp);
   }
   if(step.prep==='full_recipe')assert.deepEqual(ui.practice.player.eq,['plate','recovery','gun']);if(step.action==='pickup_replace')assert.equal(ui.practice.player.con.wet_bread,1);if(step.action==='final_preview')assert.equal(ui.practice.player.region,'city');if(step.prep==='keyword')assert.equal(ui.practice.player.rework.keywords.length,1);if(step.payloadChoice)assert.equal(ui.practice.player.rework.mode,ui.practice.choice);
   let count=0;while(ui.index===si&&ui.phase!=='result'){assert(count++<1000);if(ui.phase==='dialogue')readDialogue();else nextTimer()}
  }
  assert.equal(ui.phase,'result');assert(ui.completed.has(TUTORIAL_CHAPTERS[ci].id));assert(!ui.q('.scenario-result').hidden);assert.equal(ui.q('.scenario-dialogue').hidden,true);ui.exit(false);assert(screen.hidden);assert(!ui.active);
 }
 assert.equal(writes,12);assert.equal(ui.completed.size,12);assert.equal(storage.get('masodo-offline-session-v1'),'OFFLINE_UNCHANGED');assert.equal(storage.get('masodo.favorites'),'FAVORITES_UNCHANGED');assert.equal(storage.get('masodo-tutorial-progress-v1'),'OLD_LESSONS_UNCHANGED');assert(sprites.some(x=>x[2]==='c52'&&x[4]==='standing'));
 const resumed=new TutorialUI(surface(),{Practice:TutorialPractice,screen:surface(),sprite(){}});assert.equal(resumed.completed.size,12);resumed.open();assert(!resumed.active);resumed.start(4);resumed.endDialogue();resumed.command('attack');assert(resumed.busy);resumed.exit(false);assert.equal(resumed.practice.player.pendingAction,null);assert(!resumed.active);assert.equal(timers.size,0);assert.equal(enters,12);assert.equal(leaves,12);
 console.log(`PASS: chapter picker -> 12 dedicated scenario sessions / 45 objectives -> dialogue/typewriter/skip gates -> real game actions and panels -> result -> chapter picker; clock pause, zero network, save/resume, old saves/favorites unchanged, exit cancels timers (DOM mocks; actual browser appearance unverified)`);
}finally{Date.now=original.now;globalThis.setTimeout=original.timeout;globalThis.setInterval=original.interval;globalThis.clearTimeout=original.clearTimeout;globalThis.clearInterval=original.clearInterval;globalThis.localStorage=original.storage;globalThis.fetch=original.fetch;globalThis.WebSocket=original.ws}
