// Isolated lesson fixtures; all gameplay actions use the production engine.
// No adapter, room storage, timers, fetch, WebSocket or global RNG overrides.
import {CHARACTERS,REGIONS,ADJACENCY,createServerPlayer} from './game_data.js';
import {ITEMS,ENCOUNTER_EVENTS,WILD_TEMPLATES} from './offline_content.js';
import {initWorld,beginServerAction,completeAction,beginEventChoice,applyStatus,publicPlayer,updatePassiveTime} from './match_engine.js';
import {inventoryOperation,offerSearchConsumable,offerEquipment} from './inventory_ops.js';
import {rememberIncoming,rememberEnemy,pruneEnemyTraces} from './enemy_contacts.js';
import {updateRegionRestrictions} from './region_restrictions.js';
import {REWORK_CONFIG,REWORK_LABELS} from './character_reworks.js';
export class TutorialPractice{
 constructor(){this.characters=CHARACTERS;this.items=ITEMS;this.regions=REGIONS;this.reset()}
 reset(charId='c01',now=Date.now()){
  this.now=now;this.favorites=[];this.choice='';this.result=null;
  const make=(id,index,name)=>createServerPlayer({sessionId:'tutorial-'+index,playerName:name,charId:id,startRegion:'city'},index);
  this.player=make(charId,0,'연습 플레이어');this.enemy=make('c01',1,'연습 상대');this.enemy.region='factory';
  this.match={matchId:'tutorial-local',phase:'playing',startedAt:now,createdAt:now,players:[this.player,this.enemy],wildTemplates:WILD_TEMPLATES,eventCatalog:ENCOUNTER_EVENTS};initWorld(this.match);
  for(const p of this.match.players){p.pickupChoices=true;p.tempEffects=[];p.statusImmunity={};p.nextStatusTick=now;p.lastSatietyAt=now;p.cdCUntil=0;p.cdAUntil=0}
  this.match.wilds=[];
 }
 prepare(kind,now=Date.now()){
  this.now=now;const p=this.player,e=this.enemy,m=this.match;
  p.pendingAction=null;p.pendingEvent=null;p.pendingPickup=null;p.pickupQueue=[];p.encounter=null;
  if(kind==='wounded'){p.hp=45;p.sp=35;p.satiety=50;p.con={bread:2,water:2}}
  if(kind==='food_recipe'){p.con={bread:1,water:1};p.hp=45;p.sp=35;p.satiety=50}
  if(kind==='encounter'||kind==='last_enemy'){e.region=p.region;e.alive=true;e.hp=kind==='last_enemy'?1:100;e.maxHp=100;p.encounter={kind:'player',targetId:e.playerId};if(kind==='last_enemy')p.eq=['gun'];}
  if(kind==='gun_recipe'){p.eq=['basic_gun'];p.mat={machine:1}}
  if(kind==='full_recipe'){p.eq=['basic_gun','plate','recovery'];p.mat={machine:1}}
  if(kind==='full_consumables'){p.con={bread:1,water:1,bandage:1};offerSearchConsumable(m,p,'wet_bread')}
  if(kind==='equipment_reward'){p.eq=['basic_gun','plate','recovery'];offerEquipment(m,p,'gun')}
  if(kind==='discard_reward')offerSearchConsumable(m,p,'water');
  if(kind==='event'){p.region='city';p.pendingEvent='E001'}
  if(kind==='incoming'){e.region=p.region;rememberIncoming(p,e,e.playerName,now,'연습 소음');}
  if(kind==='trace'){e.region=p.region;rememberEnemy(p,{id:e.playerId,name:e.playerName,kind:'player',source:'encounter',hp:e.hp,maxHp:e.maxHp,alive:true},now)}
  if(kind==='garden'){this.reset('c01',now);this.enemy.region=this.player.region}
  if(kind==='keyword')this.reset('c51',now);
  if(kind==='mode'){this.reset('c04',now);this.choice='rail'}
  if(kind==='debuff'){p.statuses={};applyStatus(p,'bleed',3,null,e.playerId,now,e,m,'연습용 출혈')}
  if(kind==='bound'){p.statuses={};applyStatus(p,'bind',1,null,e.playerId,now,e,m,'연습용 속박')}
 }
 begin(type,payload={},now=Date.now()){
  this.now=now;this.result=null;
  const r=type==='event_choice'?beginEventChoice(this.match,this.player,payload.index,now):beginServerAction(this.match,this.player,type,payload,now);
  if(!r.ok)this.result=r;return r;
 }
 complete(now=Date.now()){this.now=now;this.result=completeAction(this.match,this.player,now);return this.result}
 instant(type,payload={},now=Date.now()){
  this.now=now;const p=this.player,m=this.match;
  if(type==='inventory')return this.result=inventoryOperation(m,p,payload);
  if(type==='favorite'){this.favorites=['gun'];return this.result={ok:true,type}}
  if(type==='trace_clear'){this.enemy.region='factory';if(p.region==='factory')this.enemy.region='church';pruneEnemyTraces(m,p,now);return this.result={ok:true,type}}
  if(type==='lock_preview'||type==='final_preview'){
   // Preview only: jump the isolated lesson timeline, never the running match clock.
   m.startedAt=now-(type==='lock_preview'?180000:780000);updateRegionRestrictions(m,now);return this.result={ok:true,type};
  }
  if(type==='cycle'){const choices=REWORK_CONFIG[p.charId]?.choices||[];this.choice=choices[(choices.indexOf(this.choice)+1)%choices.length]||'';return this.result={ok:true,type}}
  if(type==='clear_bound'){p.statuses={};return this.result={ok:true,type}}
  return this.result={ok:true,type};
 }
 snapshot(now=Date.now()){
  this.now=now;updatePassiveTime(this.match,now);
  return{self:publicPlayer(this.match,this.player,now,false),enemy:this.enemy,match:this.match,favorites:this.favorites,result:this.result,choice:this.choice,choiceLabel:REWORK_LABELS[this.choice]||this.choice,adjacent:ADJACENCY[this.player.region]||[]};
 }
}
