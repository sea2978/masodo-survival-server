import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {loadRoom,createHarness} from './room_test_harness.mjs';
import {beginServerAction,completeAction,updatePassiveTime} from '../src/match_engine.js';
import {PASSIVE_FX} from '../src/skill_defs.js';
import {WILD_TEMPLATES} from '../src/offline_content.js';
import {playerResult} from '../src/match_result.js';
import {MasodoNetworkAdapter} from '../public/network_adapter.js';
const Room=await loadRoom(),t=1700000000000,random=Math.random;Math.random=()=>0;
const fresh=()=>createHarness(Room,{humans:3,ai:0,now:t});
const attack=(m,a,b,now)=>{a.encounter={kind:'player',targetId:b.playerId};const r=beginServerAction(m,a,'attack',{},now);assert(r.ok);return completeAction(m,a,r.action.completeAt)};
let deathView;
try{
 const h=fresh(),m=h.match,[p,q]=m.players;p.hp=1;attack(m,q,p,t);assert(!p.alive);assert.equal(p.deathSource.name,q.playerName);assert.equal(p.deathSource.kind,'player');assert.equal(q.kills,1);
 const recorded=structuredClone(p.deathSource);q.playerName='後変更';updatePassiveTime(m,t+10000);assert.deepEqual(p.deathSource,recorded);
 await h.room.saveMatch(m);const room=new Room(h.ctx,h.env),net=new MasodoNetworkAdapter('https://example.test');room.sendMatchState(h.sockets[0],await room.getMatch(),{force:true,now:t+10000});net.acceptStateMessage(h.sockets[0].messages.at(-1));assert.deepEqual(net.lastMatch.result.deathSource,recorded);assert.deepEqual(net.lastMatch.self.deathSource,recorded);deathView=net.lastMatch;
 // Poison attribution survives a source dying before its victim; kill-credit rules stay unchanged.
 for(const status of ['poison','bleed']){
  const m=fresh().match,[p,q]=m.players;p.hp=1;p.statuses[status]={until:t+10000,stacks:1,sourceId:q.playerId};
  if(status==='poison'){q.alive=false;updatePassiveTime(m,t+2000)}else{const r=beginServerAction(m,p,'move',{to:'factory'},t);assert(r.ok);completeAction(m,p,r.action.completeAt)}
  assert(!p.alive);assert.equal(p.deathSource.name,q.playerName);assert.equal(p.deathSource.cause,status==='poison'?'독':'출혈');
 }
 {
  const m=fresh().match,p=m.players[0],w=m.wilds[0];w.region=p.region;w.hp=10000;p.hp=1;p.encounter={kind:'wild',wildId:w.id};const r=beginServerAction(m,p,'attack',{},t);assert(r.ok);completeAction(m,p,r.action.completeAt);assert(!p.alive);assert.equal(p.deathSource.kind,'wild');assert.equal(p.deathSource.name,WILD_TEMPLATES.find(x=>x.id===w.templateId).n);
 }
 {
  const m=fresh().match,[p,q]=m.players;p.charId=Object.entries(PASSIVE_FX).find(([,fx])=>fx.revive)[0];p.hp=1;attack(m,q,p,t);assert(p.alive);assert(!p.deathSource);p.hp=1;attack(m,q,p,t+5000);assert(!p.alive);assert.equal(p.deathSource.name,q.playerName);
 }
 {
  const m=fresh().match,p=m.players[0];p.con.carbonara_mint_fish=1;const r=beginServerAction(m,p,'use_item',{id:'carbonara_mint_fish'},t);assert(r.ok);completeAction(m,p,r.action.completeAt);assert(!p.alive);assert.equal(p.deathSource.kind,'environment');assert(p.deathSource.cause.includes('섭취'));assert.equal(p.deathSource.name,null);
 }
}finally{Math.random=random}
const html=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),nodes=new Map(),$=id=>{if(!nodes.has(id))nodes.set(id,{hidden:false,style:{},textContent:'',setAttribute(k,v){this[k]=v},showModal(){this.open=true}});return nodes.get(id)};
const ctx={$,stopSearchLoading(){},document:{querySelectorAll:()=>[]},charInfo:()=>({name:'캐릭터'}),rname:x=>x};vm.createContext(ctx);
vm.runInContext(html.slice(html.indexOf('const shownResults='),html.indexOf("$('#resultWatch').onclick=")),ctx);ctx.renderResult(deathView);assert($('#resultDeath').textContent.includes('QA1에게 사망'));assert(!$('#resultDeath').hidden);
ctx.renderResult({matchId:'win',self:deathView.self,phase:'finished',result:{outcome:'victory',total:3,kills:1,survivalSeconds:10,region:'city'}});assert($('#resultDeath').hidden);
vm.runInContext(html.slice(html.indexOf('function renderVitalBars('),html.indexOf('function renderOtherSurvivors(')),ctx);ctx.renderVitalBars({hp:25,maxHp:100,sp:40,maxSp:80,satiety:75});assert.equal($('#hpFill').style.width,'25%');assert.equal($('#spFill').style.width,'50%');assert.equal($('#satFill').style.width,'75%');ctx.renderVitalBars({hp:-10,maxHp:100,sp:0,maxSp:0,satiety:120});assert.equal($('#hpFill').style.width,'0%');assert.equal($('#spFill').style.width,'0%');assert.equal($('#satFill').style.width,'100%');
// Verify the real sprite renderer crops the standing atlas, while codex faces stay unchanged.
const draws=[],spriteCtx={EXTRA_CHARACTER_IMAGES:{},PORTRAIT_EXPRESSIONS:{},STANDING_SPRITES:{c01:[0,0]},SPRITE_ROWS:{standing:['standing'],profile:['profile']},spriteImageCache:new Map([['standing',Promise.resolve({naturalWidth:5600,naturalHeight:1024})],['profile',Promise.resolve({naturalWidth:4096,naturalHeight:512})]]),assetUrl:x=>x};vm.createContext(spriteCtx);vm.runInContext(html.slice(html.indexOf('function setCharacterSprite('),html.indexOf('function warmExpression(')),spriteCtx);
const canvas=()=>({style:{},setAttribute(){},getContext:()=>({drawImage:(...args)=>draws.push(args)})}),fallback={style:{}};
const bust=canvas();spriteCtx.setCharacterSprite(bust,fallback,'c01','앨리스','upperbody');await Promise.resolve();assert.equal(bust.height,563);assert.equal(draws[0][4],563);const face=canvas();spriteCtx.setCharacterSprite(face,fallback,'c01','앨리스','profile');await Promise.resolve();assert.equal(face.height,512);
for(const id of ['hp','sp','sat','playerProfile'])assert.equal((html.match(new RegExp('id="'+id+'"','g'))||[]).length,1);
console.log('PASS: player/poison/bleed/wild/environment deaths, revive guard, persisted attribution/result adapter, result UI, vital bars and upper-body sprite crop; DOM/canvas mocks, not visual browser QA');

