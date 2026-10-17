import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {PortraitReactions,EnemyExitReaction} from '../public/portrait_reactions.js';
import {PORTRAIT_EXPRESSIONS} from '../public/portrait_expressions.js';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {beginServerAction,completeAction} from '../src/match_engine.js';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const base={matchId:'qa',phase:'playing',combatNoticeSeq:0,combatNotices:[],self:{playerId:'me',charId:'c01',alive:true,region:'city'}};
const state=(props={})=>({...structuredClone(base),...props});
const incoming={id:1,sourceId:'enemy',targetId:'me',hit:true,damage:12,kind:'일반 공격'};
{
 const r=new PortraitReactions();assert.equal(r.update(state(),0),'neutral');
 const rest=state({self:{...base.self,pendingAction:{type:'rest',startedAt:100}}});assert.equal(r.update(rest,100),'closed_eyes');assert.equal(r.update(rest,2000),'closed_eyes');assert.equal(r.update(rest,2100),'neutral');
 const found=state({pendingEvent:{id:'E001'}});assert.equal(r.update(found,2200),'happy');assert.equal(r.update(found,4300),'neutral');
 const hit={...found,combatNoticeSeq:1,combatNotices:[incoming]};assert.equal(r.update(hit,4400),'angry');assert.equal(r.update({...hit,pendingEvent:{id:'E002'}},4500),'angry');assert.equal(r.update({...hit,pendingEvent:{id:'E002'}},6400),'neutral','unchanged combat sequence cannot extend expression');
 assert.equal(r.update(state({combatNoticeSeq:2,combatNotices:[{...incoming,id:2,hit:false,damage:0}]}),6500),'neutral');
 assert.equal(r.update(state({combatNoticeSeq:3,combatNotices:[{...incoming,id:3,sourceId:'me'}]}),6600),'neutral');
 assert.equal(r.update(state({combatNoticeSeq:4,combatNotices:[{...incoming,id:4}]}),6700),'angry');assert.equal(r.update(state({self:{...base.self,alive:false}}),6800),'neutral');
 assert.equal(r.update({...hit,matchId:'new'},6900),'neutral','new/reconnected view must not replay historical damage');
}
const enemy={kind:'player',targetId:'enemy',charId:'c02',name:'적'};
const outgoing={...incoming,sourceId:'me',targetId:'enemy'};
{
 const r=new EnemyExitReaction();assert.equal(r.update(state({encounter:enemy}),0).opacity,1);
 const hit=state({combatNoticeSeq:1,combatNotices:[outgoing]});let v=r.update(hit,100);assert.equal(v.emotion,'contempt');assert.equal(v.opacity,1);assert(v.animate);
 assert.equal(r.update(hit,300).opacity,1);assert.equal(r.update(hit,800).opacity,.5);assert.equal(r.update(hit,1300),null);assert.equal(r.update(hit,1400),null);
 r.update(state({encounter:enemy}),2000);assert.equal(r.update(state({combatNoticeSeq:2,combatNotices:[{...outgoing,id:2,hit:false,damage:0}]}),2100),null);
 r.update(state({encounter:enemy}),2200);assert.equal(r.update(state(),2300),null,'flee/lost target hides without contempt');
 r.update(state({encounter:enemy}),2400);r.update(state({combatNoticeSeq:3,combatNotices:[{...outgoing,id:3,kind:'전투 스킬'}]}),2500);assert.equal(r.update(state({encounter:{...enemy,targetId:'new',charId:'c03'}}),2600).emotion,'neutral');
 assert.equal(r.update(state({self:{...base.self,region:'church'}}),2700),null,'old image must not follow the player to another region');
}
assert.equal(Object.keys(PORTRAIT_EXPRESSIONS).length,48);
for(const [id,emotions]of Object.entries(PORTRAIT_EXPRESSIONS))for(const name of ['angry','closed_eyes','happy','contempt'])assert(fs.statSync(new URL('../public'+emotions[name],import.meta.url)).size>1000,id+' '+name);
// Actual attack engine -> saved room -> network adapter -> animation renderer.
const Room=await loadRoom(),t=1700000000000,h=createHarness(Room,{humans:3,ai:0,now:t}),m=h.match,[p,q]=m.players;p.region=q.region='city';p.encounter={kind:'player',targetId:q.playerId};
let perf=0,frame=null;const nodes=new Map(),draws=[],$=s=>{if(!nodes.has(s))nodes.set(s,{style:{}});return nodes.get(s)};
const ctx={EnemyExitReaction,$,warmExpression(){},performance:{now:()=>perf},setCharacterSprite:(...x)=>draws.push(x),cancelAnimationFrame(){frame=null},requestAnimationFrame:cb=>{frame=cb;return 1}};vm.createContext(ctx);
const html=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8');vm.runInContext(html.slice(html.indexOf('const enemyExitReaction='),html.indexOf('function applyGameVisuals(')),ctx);
ctx.M=h.room.snapshot(m,p.sessionId,t);ctx.renderEnemyVisual(ctx.M);assert.equal(draws.at(-1)[5],'neutral');
const random=Math.random;Math.random=()=>0;let action;try{action=beginServerAction(m,p,'attack',{},t);assert(action.ok);assert(completeAction(m,p,action.action.completeAt).hit)}finally{Math.random=random}
await h.room.saveMatch(m);const resumed=new Room(h.ctx,h.env),net=new MasodoNetworkAdapter('https://example.test');resumed.sendMatchState(h.sockets[0],await resumed.getMatch(),{force:true,now:action.action.completeAt});net.acceptStateMessage(h.sockets[0].messages.at(-1));ctx.M=net.lastMatch;perf=100;ctx.renderEnemyVisual(ctx.M);assert.equal(draws.at(-1)[5],'contempt');assert.equal($('.enemy-standing-slot').style.opacity,'1');assert(frame);const drawCount=draws.length;perf=800;frame();assert.equal($('.enemy-standing-slot').style.opacity,'0.5');assert.equal(draws.length,drawCount,'animation should not redraw/reload the atlas every frame');perf=1300;frame();assert.equal($('#enemyStanding').style.display,'none');assert.equal($('.enemy-standing-slot').style.opacity,'0');
console.log('PASS: 48 expression mappings; timed player reactions/priority/replay/death; hit/skill/miss/flee/new encounter/region fade behavior; actual combat, storage, adapter and renderer with a simulated animation clock (not live browser QA)');
