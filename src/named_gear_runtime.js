import {NAMED_ITEMS} from './named_gear.js';
export function createNamedGearSystem(api){
 const owned=p=>[...new Set(p?.eq||[])].filter(id=>NAMED_ITEMS[id]);
 const state=(p,id)=>(p.gearState??={})[id]??=((p.gearState)[id]={count:0});
 const interval=id=>(NAMED_ITEMS[id].gimmick.interval||(id.startsWith('final_')?20:15))*1000;
 const shield=(p,id,s,ratio,m,n)=>{s.shield={amount:api.maxHp(p,m,n)*ratio,startedAt:n,until:n+8000};};
 function charge(p,id,event,n,target){const g=NAMED_ITEMS[id].gimmick;if(g.chargeEvent!==event)return;const s=state(p,id);if(g.targeted&&s.targetId!==target){s.count=0;s.targetId=target;}if(n-(s.chargeAt||0)<2000)return;s.count=Math.min(g.cap||2,(s.count||0)+1);s.chargeAt=n;}
 function prepare(m,p,target,skill,n){let bonus=0,hit=0;for(const id of owned(p)){const g=NAMED_ITEMS[id].gimmick,s=state(p,id);if(g.mark&&s.targetId===(target.playerId||target.id)&&s.markUntil>n)hit+=.15;if(!skill)continue;
   if(s.count){if(!g.targeted||s.targetId===(target.playerId||target.id))bonus+=s.count*(g.bonus||0);s.count=0;}
   if((g.castHeal||g.castSp||g.castShield||g.randomCast)&&n-(s.castAt||0)>=interval(id)){
    s.castAt=n;if(g.castHeal)api.heal(p,g.castHeal,m,n);if(g.castSp)api.sp(p,g.castSp,m,n);if(g.castShield)shield(p,id,s,g.castShield,m,n);
    if(g.randomCast){const roll=Math.floor(Math.random()*3);if(roll===0)api.heal(p,6,m,n);else if(roll===1)api.sp(p,6,m,n);else shield(p,id,s,.08,m,n);s.lastRoll=['HP 회복','SP 회복','보호막'][roll];}
   }
  }return{bonus,hit};}
 function hit(m,p,t,skill,success,n){if(!p?.playerId)return;for(const id of owned(p)){const g=NAMED_ITEMS[id].gimmick,s=state(p,id);if(!skill||!success)charge(p,id,success?'hit':'miss',n,t.playerId||t.id);if(!success)continue;if(g.mark){s.targetId=t.playerId||t.id;s.targetName=t.playerName||t.id;s.markUntil=n+12000;}if(g.skillOnly&&!skill)continue;
   for(const[status,chance]of g.rows||[]){const key='proc_'+status;if(n-(s[key]||0)<interval(id))continue;if(Math.random()<Math.min(.95,chance+(api.fx(p,m,n).statusChance||0))&&api.apply(t,status,1,null,p.playerId,n,p,m,api.name(id)+' · 장착 효과'))s[key]=n;}
  }}
 function action(m,p,type,n,x={}){for(const id of owned(p)){const g=NAMED_ITEMS[id].gimmick,s=state(p,id);charge(p,id,type==='use_item'&&api.isFood(x.id)?'food':type,n);if(g.actionShield===type&&n-(s.castAt||0)>=interval(id)){s.castAt=n;shield(p,id,s,g.shield,m,n);}}}
 function kill(m,p,t,n){for(const id of owned(p))charge(p,id,'kill',n,t?.playerId||t?.id);}
 function absorb(m,p,damage,n){if(!p?.playerId||damage<=0)return damage;let d=damage;for(const id of owned(p)){const g=NAMED_ITEMS[id].gimmick,s=state(p,id);charge(p,id,'hurt',n);if(g.hurtShield&&p.hp/api.maxHp(p,m,n)<.4&&n-(s.castAt||0)>=interval(id)){s.castAt=n;shield(p,id,s,g.hurtShield,m,n);}if(s.shield?.until>n){const a=Math.min(d,s.shield.amount);s.shield.amount-=a;d-=a;if(s.shield.amount<=0)delete s.shield;}}return d;}
 function tick(p){const ids=new Set(owned(p));for(const[id,s]of Object.entries(p.gearState||{}))if(!ids.has(id)){s.count=0;delete s.shield;delete s.markUntil;}}
 function view(m,p,n){const buffs={};for(const id of owned(p)){const g=NAMED_ITEMS[id].gimmick,s=p.gearState?.[id]||{},cooldowns=Object.entries(s).filter(([k,v])=>(k==='castAt'||k.startsWith('proc_'))&&n-v<interval(id)).map(([k,v])=>Math.ceil((v+interval(id)-n)/1000));const extra=[s.lastRoll?'최근 무작위 효과: '+s.lastRoll:'',s.markUntil>n?'기억한 대상: '+s.targetName:''].filter(Boolean).join(' · ');
  buffs['rw_gear_'+id]={name:api.name(id),description:api.description(id)+(extra?' · '+extra:''),stacks:s.count||1,displayStacks:g.cap?(s.count||0):undefined,maxStacks:g.cap||1,category:g.cap?'resource':'mode',until:null,retention:g.cap?'충전 '+(s.count||0)+' · 해제 시 소모':'해제할 때까지 유지',gear:true};
  if(s.shield?.until>n)buffs['rw_gear_shield_'+id]={...s.shield,name:api.name(id)+' · 보호막',description:'직접 전투 피해를 흡수합니다. 남은 보호막 '+Math.ceil(s.shield.amount),stacks:1,durationMs:8000};
 }return buffs;}
 function attackProfile(p){for(const id of owned(p)){const g=NAMED_ITEMS[id].gimmick;if(g.basicHits)return{hits:g.basicHits,mult:g.basicRatio*g.basicHits,rows:[]};}return null;}
 return{prepare,hit,action,kill,absorb,tick,view,attackProfile};
}
