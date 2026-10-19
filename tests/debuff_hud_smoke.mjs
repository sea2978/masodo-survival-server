import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DebuffHud} from '../public/debuff_hud.js';
import {applyStatus} from '../src/match_engine.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
const events={},frames=new Map();let perf=0,seq=0;
class Node{
 constructor(){this.children=[];this.style={setProperty:(k,v)=>this.style[k]=v};this.attrs={};this.events={};this.dataset={};this.hidden=false;this.textContent=''}
 appendChild(n){if(n.parentNode)n.remove();n.parentNode=this;this.children.push(n)}
 replaceChildren(){for(const n of this.children)n.parentNode=null;this.children=[]}
 remove(){if(this.parentNode){this.parentNode.children=this.parentNode.children.filter(x=>x!==this);this.parentNode=null}}
 contains(n){return this===n||this.children.some(x=>x.contains(n))}
 setAttribute(k,v){this.attrs[k]=v}removeAttribute(k){delete this.attrs[k]}
 addEventListener(k,v){this.events[k]=v}
 getBoundingClientRect(){return this.isBubble?{left:0,top:0,width:280,height:110}:{left:150,top:240,width:28,height:28}}
}
globalThis.document={createElement:()=>new Node(),addEventListener:(k,v)=>events[k]=v,documentElement:{clientWidth:640}};
globalThis.window={innerWidth:640,addEventListener(){}};globalThis.performance={now:()=>perf};globalThis.requestAnimationFrame=fn=>{frames.set(++seq,fn);return seq};globalThis.cancelAnimationFrame=id=>frames.delete(id);
const root=new Node(),bubble=new Node();bubble.isBubble=true;const hud=new DebuffHud(root,bubble),t=1700000000000;
const state=(statuses,extra={})=>({matchId:'hud',phase:'playing',serverNow:t,self:{playerId:'me',alive:true,statuses},...extra});
const statuses={};for(const [id,duration]of [['poison',8000],['bleed',null],['slow',10000],['bind',5000],['sleep',10000],['fear',5000],['confusion',10000],['silence',10000],['actionDelay',10000]])statuses[id]={stacks:id==='bleed'?5:id==='slow'?2:1,startedAt:t,durationMs:duration,until:duration===null?null:t+duration};
hud.update(state(statuses));assert.equal(root.children.length,9);assert(!root.hidden);
for(const b of root.children){assert(b.innerHTML.includes('<svg'));assert(!b.innerHTML.includes('<text'));assert.equal(b.textContent,'');assert(b.attrs['aria-label'])}
const bleed=hud.buttons.get('bleed'),poison=hud.buttons.get('poison');assert.equal(bleed.style['--debuff-offset'],'0');
perf=4000;hud.paint();assert.equal(poison.style['--debuff-offset'],'50');
// Re-rendering the same stored snapshot must not restart countdowns.
hud.update(state(statuses));assert.equal(poison.style['--debuff-offset'],'50');
poison.events.mouseenter();assert(!bubble.hidden);assert.equal(bubble.children[0].textContent,'독');assert(bubble.children[2].textContent.includes('4.0초'));poison.events.mouseleave();assert(bubble.hidden);
bleed.events.click();assert(!bubble.hidden);assert(hud.pinned);assert(bubble.children[1].textContent.includes('10 피해'));assert(bubble.children[2].textContent.includes('5 / 5중첩'));
bleed.events.mouseleave();assert(!bubble.hidden,'pinned tap tooltip persists');events.pointerdown({target:new Node()});assert(bubble.hidden);
bleed.events.click();events.keydown({key:'Escape'});assert(bubble.hidden);
bleed.events.focus();assert(!bubble.hidden);bleed.events.blur();assert(bubble.hidden);
const changed=structuredClone(statuses);changed.bleed.stacks=3;hud.update(state(changed,{serverNow:t+4000}));assert.equal(bleed.style['--debuff-offset'],'40');assert.equal(root.children.length,9,'no duplicate buttons on snapshots');
poison.events.click();perf=8000;hud.paint();assert(!hud.buttons.has('poison'));assert(bubble.hidden,'expiration closes active tooltip');assert(hud.buttons.has('bleed'),'permanent bleed never times out');
perf=14000;hud.paint();assert.equal(hud.buttons.size,1);assert.equal(hud.frame,null,'no animation loop when only count-based bleed remains');
hud.update(state({}));assert(root.hidden);assert.equal(root.children.length,0);
hud.update(state(statuses,{matchId:'other',serverNow:t+14000}));assert.equal(hud.buttons.size,1,'new match clears expired time statuses');
hud.update(state(statuses,{self:{playerId:'me',alive:false,statuses}}));assert(root.hidden);assert(bubble.hidden);assert.equal(hud.frame,null);
// Actual server status metadata survives storage, reconnect snapshot and HUD time fraction.
const Room=await loadRoom(),h=createHarness(Room,{humans:2,ai:0,now:t}),p=h.match.players[0];applyStatus(p,'slow',2,null,null,t);assert.equal(p.statuses.slow.durationMs,10000);await h.room.saveMatch(h.match);const resumed=new Room(h.ctx,h.env),snapshot=resumed.snapshot(await resumed.getMatch(),p.sessionId,t+2500);
perf=0;hud.update(snapshot);assert.equal(hud.buttons.get('slow').style['--debuff-offset'],'25');hud.clear();assert(root.hidden);
const source=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8');assert(source.includes('debuffHud.update(m)'));assert(source.includes('debuffHud.clear()'));assert(source.includes('var(--encounter-info-height,0px) + 16px'));
for(const w of [640,740,844,915,1024,1280]){const clamp=(a,b,c)=>Math.max(a,Math.min(b,c));const available=Math.min(520,w-clamp(132,w*.23,210)-clamp(158,w*.26,230)-28),icons=9*clamp(28,w*.032,32)+8*4+4;assert(icons<=available,`${w}: all nine mobile icons fit in central safe area`)}
console.log('PASS: all 9 icon-only HUD entries, accurate local rings/stale samples/bleed count, hover/tap/focus/dismiss/expiry/death; actual server metadata storage/reconnect; mobile safe-area geometry (DOM mocks, no live visual assertion)');
// Regression: permanent collected resources never reached the timed-only icon HUD.
const {reworkState}=await import('../src/character_reworks.js');
const {beginServerAction,completeAction}=await import('../src/match_engine.js');
const kh=createHarness(Room,{humans:2,ai:0,now:t}),kp=kh.match.players[0];kp.charId='c51';kp.sp=100;kp.encounter={kind:'player',targetId:kh.match.players[1].playerId};reworkState(kp).keywords=['tracking','tracking','recoil'];
const before=JSON.stringify(kp.rework);perf=0;const kstate=kh.room.snapshot(kh.match,'s0',t);assert.equal(JSON.stringify(kp.rework),before,'snapshot metadata never consumes or mutates resources');hud.update(kstate);
const tracking=hud.buttons.get('rw_keyword_tracking'),recoil=hud.buttons.get('rw_keyword_recoil');assert(tracking&&recoil);assert.equal(tracking.stackBadge.textContent,'2');assert.equal(tracking.style['--debuff-offset'],'80');assert(!recoil.className.split(' ').includes('buff-icon'));tracking.events.mouseenter();assert.equal(bubble.children[0].textContent,'키워드: 추적');assert(bubble.children[1].textContent.includes('명중률 +20%p'));assert(bubble.children[2].textContent.includes('2 / 10중첩'));tracking.events.click();perf=600000;hud.paint();assert(hud.buttons.has('rw_keyword_tracking'));assert(!bubble.children[2].textContent.includes('NaN'));assert.equal(hud.frame,null,'stored keywords do not animate an imaginary duration');
await kh.room.saveMatch(kh.match);const resumedKeyword=new Room(kh.ctx,kh.env),loaded=await resumedKeyword.getMatch();perf=0;hud.update(resumedKeyword.snapshot(loaded,'s0',t));assert.equal(hud.buttons.get('rw_keyword_tracking').stackBadge.textContent,'2');
const cast=beginServerAction(loaded,loaded.players[0],'skill',{},t);assert(cast.ok);const oldRandom=Math.random;Math.random=()=>.1;try{assert(completeAction(loaded,loaded.players[0],cast.action.completeAt).ok)}finally{Math.random=oldRandom}hud.update(resumedKeyword.snapshot(loaded,'s0',cast.action.completeAt));assert(!hud.buttons.has('rw_keyword_tracking'));assert(!hud.buttons.has('rw_keyword_recoil'));assert(bubble.hidden);
const {gimmickBuffs}=await import('../src/gimmick_buffs.js');
for(const [id,key,max]of [['c05','charge',3],['c06','spark',2],['c10','attention',3],['c13','light',3],['c16','paint',3],['c18','momentum',2],['c19','soul',3],['c21','gear',5],['c22','star',2],['c23','will',20],['c25','luck',3],['c31','shard',3],['c33','calamity',3],['c39','amp',3],['c49','feast',3],['c50','flow',2]]){const rows=gimmickBuffs({charId:id,maxHp:100},{resources:{[key]:2}});const r=rows['rw_resource_'+key];assert.equal(r.stacks,2);assert.equal(r.maxStacks,max);hud.update(state({}, {self:{playerId:'me',alive:true,buffs:rows}}));assert(hud.buttons.has('rw_resource_'+key));assert.equal(hud.buttons.get('rw_resource_'+key).stackBadge.textContent,'2');}
for(const [id,mode]of [['c04','rail'],['c08','earth'],['c09','attack'],['c24','legs'],['c29','wall'],['c37','sword']]){const rows=gimmickBuffs({charId:id},{resources:{},mode});hud.update(state({}, {self:{playerId:'me',alive:true,buffs:rows}}));const b=hud.buttons.get('rw_mode');assert(b);b.events.click();assert(bubble.children[2].textContent.includes('장착 중'));assert(!bubble.children[2].textContent.includes('NaN'));}
console.log('PASS: real keyword snapshot -> distinct icons/count/hover/tap -> no false timeout -> storage/reconnect -> spell consumes/removes icons; all 16 resources and 6 equipped mode families shown (DOM mocks)');
