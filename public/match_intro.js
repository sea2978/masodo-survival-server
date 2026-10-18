// Uses server time for the deadline and the local animation clock between snapshots.
export class MatchIntro{
 constructor(root,cards,countdown,{character,sprite,onFinish,now=()=>performance.now(),raf=fn=>requestAnimationFrame(fn),cancel=id=>cancelAnimationFrame(id)}={}){Object.assign(this,{root,cards,countdown,character,sprite,onFinish,now,raf,cancel});this.frame=null;this.key=null}
 clear(){if(this.frame!==null)this.cancel(this.frame);this.frame=null;this.root.hidden=true;this.key=null}
 show(match){
  const server=Number(match.serverNow),start=Number(match.startedAt);
  if(match.phase!=='playing'||!Number.isFinite(server)||!Number.isFinite(start)||start<=server){this.clear();return false}
  const key=match.matchId;
  if(this.key!==key||this.sample!==server){this.deadline=this.now()+Math.max(0,start-server);this.sample=server}
  this.match=match;
  if(this.now()>=this.deadline){this.clear();return false}
  const roster=[match.self,...(match.others||[])].filter(Boolean),signature=JSON.stringify(roster.map(p=>[p.playerId,p.playerName,p.charId,p.isAI]));
  if(this.key!==key||this.signature!==signature){
   this.cards.replaceChildren();
   for(const p of roster){
    const card=document.createElement('article'),image=document.createElement('div'),canvas=document.createElement('canvas'),fallback=document.createElement('span'),name=document.createElement('strong'),character=document.createElement('span'),tag=document.createElement('small');
    card.className='intro-card'+(p.playerId===match.self?.playerId?' intro-self':'');image.className='intro-portrait';fallback.className='intro-fallback';name.textContent=p.playerName;character.textContent=this.character(p.charId)?.name||'알 수 없는 캐릭터';tag.textContent=p.isAI?'AI':p.playerId===match.self?.playerId?'나':'플레이어';
    image.append(canvas,fallback);card.append(image,character,name,tag);this.cards.appendChild(card);this.sprite(canvas,fallback,p.charId,character.textContent,'standing','neutral');
   }
   this.signature=signature;
  }
  this.key=key;this.root.hidden=false;
  if(this.frame===null)this.paint();return true;
 }
 paint(){this.frame=null;if(this.root.hidden)return;const remaining=this.deadline-this.now();this.countdown.textContent=String(Math.max(0,Math.ceil(remaining/1000)));if(remaining<=0){const match=this.match;this.clear();this.onFinish({...match,serverNow:match.startedAt,elapsed:0});return}this.frame=this.raf(()=>this.paint())}
}
