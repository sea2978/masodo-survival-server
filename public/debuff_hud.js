const DEBUFF_ICONS={
 doll:{name:'인형',color:'#bc88e8',seconds:30,max:1,icon:'<circle cx="12" cy="6" r="3"/><path d="M12 9v9M5 12h14M12 18l-5 4m5-4 5 4M4 2l3 3m13-3-3 3"/>',describe:()=> '상대의 정원에 있는 동안 공격력과 방어력이 각각 10% 감소합니다. 정원이 겹쳐도 중복 적용되지 않으며 지역을 벗어나면 해제됩니다.'},
 gardenPassive:{name:'모형정원의 주인',color:'#7cdeac',seconds:30,max:1,icon:'<path d="M12 21V10M12 15C4 15 3 9 4 6c6 0 8 3 8 9Zm0-3c0-7 4-9 8-9 1 5-1 9-8 9Z"/>',describe:()=> '정원에서 패시브가 활성화되어 탐색 아이템 발견률 +30%, 휴식 HP·SP 회복 +35%를 받습니다. 중복 적용되지 않습니다.'},
 poison:{name:'독',color:'#93cf63',seconds:8,max:3,icon:'<path d="M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12Z"/><path d="m9 14 6 4m0-4-6 4"/>',describe:n=>`2초마다 최대 HP의 ${n*2}% 피해를 받습니다. 최대 3중첩.`},
 bleed:{name:'출혈',color:'#f16c7d',max:5,icon:'<path d="M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12Z"/><path d="m14 8-4 7h4l-3 6"/>',describe:n=>`이동·공격·전투 스킬 완료 시 ${n*2} 피해를 받고 1중첩 소모합니다. 시간으로 사라지지 않으며 최대 5중첩입니다.`},
 slow:{name:'둔화',color:'#75b9e7',seconds:10,max:2,icon:'<path d="M7 3v11H3l9 7 9-7h-4V3M7 7h10"/>',describe:n=>`이동·도주 소요시간이 ${n>=2?50:25}% 증가합니다. 최대 2중첩.`},
 bind:{name:'속박',color:'#d1a576',seconds:5,max:1,icon:'<path d="m10 14 4-4m-6 6-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m0 2 1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/>',describe:()=> '지역 이동과 도주를 시작할 수 없습니다. 일반 공격과 전투 스킬은 사용할 수 있습니다.'},
 sleep:{name:'수면',color:'#b9a0ee',seconds:10,max:1,icon:'<path d="M3 12q9 9 18 0M7 16l-2 3m7-1v3m5-5 2 3M13 3h7l-7 6h7"/>',describe:()=> '새로운 행동을 시작할 수 없습니다. 피해를 받으면 깨어나며, 피해로 깨어난 뒤 12초간 수면에 면역입니다.'},
 fear:{name:'공포',color:'#c793c6',seconds:5,max:1,icon:'<path d="M5 21V10a7 7 0 0 1 14 0v11l-3-2-4 2-4-2-3 2Z"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><path d="M10 16q2-3 4 0"/>',describe:()=> '일반 공격·전투 스킬 명중률이 10%p 감소합니다. 이동·도주 소요시간은 20% 감소합니다.'},
 confusion:{name:'혼란',color:'#ebbf6b',seconds:10,max:1,icon:'<path d="M4 5h3c5 0 5 14 10 14h3m-4-4 4 4-4 3M4 19h3c5 0 5-14 10-14h3m-4-3 4 3-4 4"/>',describe:()=> '전체 명중률이 10%p 감소합니다. 공격·스킬 입력 시 50%씩 일반 공격 또는 전투 스킬을 선택하며, 스킬 쿨타임 중이면 일반 공격합니다.'},
 silence:{name:'침묵',color:'#a5b7c9',seconds:10,max:1,icon:'<path d="M20 14a6 6 0 0 1-6 4H9l-5 3 1-6a7 7 0 0 1-2-5 7 7 0 0 1 7-7h5a6 6 0 0 1 5 3M3 3l18 18"/>',describe:()=> '전투 스킬을 사용할 수 없습니다. 일반 공격과 추가 행동 스킬은 사용할 수 있습니다.'},
 actionDelay:{name:'행동지연',color:'#df9674',seconds:10,max:1,icon:'<path d="M5 3h14M5 21h14M7 3v5l10 8v5M17 3v5L7 16v5M9 18h6"/>',describe:()=> '탐색·이동·공격·스킬·휴식·제작 등 일반 행동의 소요시간이 25% 증가합니다.'}
};

export class DebuffHud{
 constructor(root,bubble){
  this.root=root;this.bubble=bubble;this.buttons=new Map();this.rows={};this.frame=null;this.active=null;this.pinned=false;this.anchor=null;this.key=null;
  document.addEventListener('pointerdown',e=>{if(!this.root.contains(e.target)&&!this.bubble.contains(e.target))this.hide()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')this.hide()});
  window.addEventListener('resize',()=>this.position());root.addEventListener('scroll',()=>this.position());
 }
 clear(){
  if(this.frame!==null)cancelAnimationFrame(this.frame);this.frame=null;this.rows={};this.buttons.clear();this.root.replaceChildren();this.root.hidden=true;this.hide();this.anchor=null;this.key=null;
 }
 now(){return this.anchor.serverNow+performance.now()-this.anchor.at}
 update(m){
  if(!m?.self?.alive||m.phase!=='playing'){this.clear();return}
  const key=m.matchId+'|'+m.self.playerId;if(this.key!==key){this.clear();this.key=key}
  const sample=Number.isFinite(m.serverNow)?m.serverNow:Date.now();
  if(!this.anchor||sample>this.anchor.serverNow)this.anchor={serverNow:sample,at:performance.now()};
  this.rows={...(m.self.statuses||{}),...(m.self.buffs||{})};
  if(this.frame!==null)cancelAnimationFrame(this.frame);this.frame=null;this.paint();
 }
 show(id,pin=false){
  if(!this.buttons.has(id))return;if(this.active&&this.active!==id)this.buttons.get(this.active)?.removeAttribute('aria-describedby');this.active=id;this.pinned=pin;this.bubble.hidden=false;
  this.buttons.get(id).setAttribute('aria-describedby','debuffBubble');this.describe();this.position();
 }
 hide(){
  if(this.active)this.buttons.get(this.active)?.removeAttribute('aria-describedby');this.active=null;this.pinned=false;this.bubble.hidden=true;
 }
 describe(){
  if(!this.active)return;const info=DEBUFF_ICONS[this.active],s=this.rows[this.active];if(!s){this.hide();return}
  const left=this.active==='bleed'?null:Math.max(0,(s.until-this.now())/1000);
  const title=s.name||info.name,detail=info.describe(s.stacks),foot=left===null?`${s.stacks} / ${info.max}중첩 · 원형 게이지는 남은 중첩`:`남은 시간 ${left.toFixed(1)}초${info.max>1?' · '+s.stacks+'중첩':''}`;
  const key=title+detail+foot;if(this.bubbleKey===key)return;this.bubbleKey=key;
  this.bubble.replaceChildren();for(const [tag,content]of [['strong',title],['span',detail],['small',foot]]){const el=document.createElement(tag);el.textContent=content;this.bubble.appendChild(el)}
 }
 position(){
  if(this.bubble.hidden||!this.active)return;const b=this.buttons.get(this.active);if(!b)return;
  const r=b.getBoundingClientRect(),tip=this.bubble.getBoundingClientRect(),width=window.innerWidth||document.documentElement.clientWidth;
  const left=Math.max(8,Math.min(width-tip.width-8,r.left+r.width/2-tip.width/2));
  this.bubble.style.left=left+'px';this.bubble.style.top=Math.max(8,r.top-tip.height-12)+'px';
  this.bubble.style.setProperty('--bubble-arrow-left',Math.max(14,Math.min(tip.width-14,r.left+r.width/2-left))+'px');
 }
 paint(){
  this.frame=null;if(!this.anchor)return;const now=this.now();let ticking=false;
  for(const [id,info]of Object.entries(DEBUFF_ICONS)){
   const s=this.rows[id],active=s?.stacks>0&&(id==='bleed'||s.until>now);
   let b=this.buttons.get(id);
   if(!active){if(b){if(this.active===id)this.hide();b.remove();this.buttons.delete(id)}continue}
   if(!b){
    b=document.createElement('button');b.type='button';b.className='debuff-icon'+(id==='gardenPassive'?' buff-icon':'');b.dataset.debuff=id;
    b.style.setProperty('--debuff-color',info.color);b.setAttribute('aria-label',s.name||info.name);
    b.innerHTML='<svg class="debuff-timer" viewBox="0 0 40 40" aria-hidden="true"><circle class="debuff-track" cx="20" cy="20" r="18"/><circle class="debuff-ring" cx="20" cy="20" r="18" pathLength="100"/></svg><svg class="debuff-symbol" viewBox="0 0 24 24" aria-hidden="true">'+info.icon+'</svg>';
    b.addEventListener('mouseenter',()=>{if(!this.pinned)this.show(id)});b.addEventListener('mouseleave',()=>{if(!this.pinned)this.hide()});
    b.addEventListener('focus',()=>{if(!this.pinned)this.show(id)});b.addEventListener('blur',()=>{if(!this.pinned)this.hide()});
    b.addEventListener('click',()=>{if(this.active===id&&this.pinned)this.hide();else{this.hide();this.show(id,true)}});
    this.buttons.set(id,b);
   }
   const duration=s.durationMs>0?s.durationMs:Math.max(info.seconds*1000||1,s.until-(s.startedAt??now));
   const ratio=id==='bleed'?s.stacks/info.max:(s.until-now)/duration;
   b.style.setProperty('--debuff-offset',String(100*(1-Math.max(0,Math.min(1,ratio)))));
   // Append only on snapshot changes/new icons so pointer focus remains stable while timers tick.
   if(!b.parentNode)this.root.appendChild(b);
   if(id!=='bleed')ticking=true;
  }
  this.root.hidden=this.buttons.size===0;
  if(this.active){this.describe();this.position()}
  if(ticking)this.frame=requestAnimationFrame(()=>this.paint());
 }
}
