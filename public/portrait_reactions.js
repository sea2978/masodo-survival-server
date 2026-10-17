export class PortraitReactions{
 constructor(){this.key=null;this.previous=null;this.emotion='neutral';this.until=0}
 update(m,now){
  const p=m.self,key=m.matchId+'|'+p?.playerId+'|'+p?.charId;
  const state={seq:m.combatNoticeSeq||0,rest:p?.pendingAction?.type==='rest'?p.pendingAction.startedAt:null,event:m.pendingEvent?.id||null};
  if(this.key!==key){this.key=key;this.previous=state;this.emotion='neutral';this.until=0}
  if(!p?.alive||m.phase!=='playing'){this.emotion='neutral';this.until=0;this.previous=state;return this.emotion}
  const before=this.previous;
  const hit=(m.combatNotices||[]).some(e=>e.id>before.seq&&e.targetId===p.playerId&&e.sourceId!==p.playerId&&e.hit!==false&&e.damage>0);
  const found=state.event&&state.event!==before.event,rest=state.rest!==null&&state.rest!==before.rest;
  if(hit){this.emotion='angry';this.until=now+2000}
  else if((found||rest)&&!(this.emotion==='angry'&&this.until>now)){
   this.emotion=found?'happy':'closed_eyes';this.until=now+2000;
  }
  this.previous=state;
  if(this.until<=now)this.emotion='neutral';
  return this.emotion;
 }
}
export class EnemyExitReaction{
 constructor(){this.key=null;this.seq=0;this.region=null;this.enemy=null;this.exit=null}
 update(m,now){
  const p=m.self,key=m.matchId+'|'+p?.playerId;
  if(this.key!==key||this.region!==p?.region||!p?.alive){
   this.key=key;this.seq=m.combatNoticeSeq||0;this.region=p?.region;this.enemy=null;this.exit=null;
  }
  const before=this.enemy,hit=before&&(m.combatNotices||[]).some(e=>e.id>this.seq&&e.sourceId===p?.playerId&&e.targetId===(before.targetId||before.wildId)&&e.hit!==false&&e.damage>0&&['일반 공격','전투 스킬'].includes(e.kind));
  this.seq=Math.max(this.seq,m.combatNoticeSeq||0);
  if(!p?.alive){this.enemy=null;this.exit=null;return null}
  if(m.encounter){this.enemy={...m.encounter};this.exit=null;return {enemy:this.enemy,emotion:'neutral',opacity:1,animate:false}}
  if(before){this.exit={enemy:before,startedAt:now,emotion:hit?'contempt':'neutral',hold:hit?200:0};this.enemy=null}
  if(this.exit){
   const elapsed=now-this.exit.startedAt;
   if(elapsed<this.exit.hold+1000)return {enemy:this.exit.enemy,emotion:this.exit.emotion,opacity:Math.max(0,1-Math.max(0,elapsed-this.exit.hold)/1000),animate:true};
  }
  this.enemy=null;this.exit=null;return null;
 }
}
