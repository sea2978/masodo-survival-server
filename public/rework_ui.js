// Mode/type selection is local; only pressing the action sends a command.
export class ReworkUI{
 constructor({state,send,skill,remove,character,region}){this.state=state;this.send=send;this.skill=skill;this.remove=remove;this.character=character;this.region=region;this.dialog=document.createElement('dialog');this.dialog.className='game-popup';this.dialog.setAttribute('aria-label','추가행동 선택');document.body.appendChild(this.dialog);this.dialog.addEventListener('click',e=>{if(e.target===this.dialog)this.dialog.close()});}
 selection(m=this.state()){
 const p=m?.self,o=p?.reworkOptions,rows=(o?.choices||[]).filter(x=>p.charId!=='c04'||x.id!==p.rework?.mode);
 if(rows.length<2&&(o?.choices?.length||0)<2)return null;
 const key=[m.matchId,p.playerId||p.charId,p.charId].join(':');
 if(this.selectionKey!==key){this.selectionKey=key;try{this.choice=localStorage.getItem('masodo.actionChoice:'+key)}catch{this.choice=null;}}
 if(!rows.some(x=>x.id===this.choice))this.choice=rows.find(x=>x.id===p.rework?.mode)?.id||rows[0]?.id;
 return {rows,selected:rows.find(x=>x.id===this.choice)};
 }
 cycle(){const s=this.selection();if(!s?.rows.length)return;this.choice=s.rows[(s.rows.findIndex(x=>x.id===this.choice)+1)%s.rows.length].id;try{localStorage.setItem('masodo.actionChoice:'+this.selectionKey,this.choice)}catch{}this.update(this.state());}
 open(){const m=this.state(),p=m?.self,o=p?.reworkOptions;
 const selection=this.selection(m);if(selection?.selected&&(!o.targeted||o.targets.length<=1||o.targets.some(t=>t.id===(p.encounter?.targetId||p.encounter?.wildId)))){const x={choice:selection.selected.id};if(o.targeted){const id=p.encounter?.targetId||p.encounter?.wildId;x.targetId=o.targets.find(t=>t.id===id)?.id||o.targets[0]?.id;}return this.send(x);}
if(p?.charId==='c51'||!o||(!o.choices.length&&!o.targeted&&!o.objects.length))return this.send({});this.dialog.replaceChildren();const title=document.createElement('h2');title.textContent=this.character(p.charId)?.action||'추가행동';this.dialog.appendChild(title);
 const description=document.createElement('p');description.textContent=this.character(p.charId)?.actionEffectText||'';this.dialog.appendChild(description);
 const select=(label,rows)=>{const box=document.createElement('label');box.style.cssText='display:block;margin:12px 0';box.appendChild(document.createTextNode(label+' '));const el=document.createElement('select');for(const row of rows){const opt=document.createElement('option');opt.value=row.id;opt.textContent=row.name;el.appendChild(opt);}box.appendChild(el);this.dialog.appendChild(box);return el;};
 const target=o.targeted?select('대상',o.targets):null;
 const choice=!selection&&o.choices.length&&p.charId!=='c51'?select('선택',p.charId==='c04'?o.choices.filter(x=>x.id!==p.rework?.mode):o.choices):null;
 const region=['c07','c18'].includes(p.charId)?select('지역',o.regions.filter(id=>p.charId!=='c18'||id!==p.region).map(id=>({id,name:this.region(id)}))):null;

 const dispel=p.charId==='c35'&&p.rework?.records?.length?select('제거할 버프',p.rework.records):null;
 const feedback=document.createElement('p');feedback.setAttribute('role','status');this.dialog.appendChild(feedback);
 const go=document.createElement('button');go.textContent='사용';go.disabled=!!(target&&!o.targets.length);go.onclick=()=>{const x={...(target?{targetId:target.value}:{}),...(selection?.selected?{choice:selection.selected.id}:choice?{choice:choice.value}:{}),...(region?.value?{region:region.value}:{}),...(dispel?{dispelKey:dispel.value}:{})};if(this.send(x)!==false)this.dialog.close();};this.dialog.appendChild(go);
 for(const obj of o.objects||[]){const b=document.createElement('button');b.textContent=obj.name+' · '+obj.seconds+'초';b.style.margin='8px';b.onclick=()=>{if(this.remove(obj.id)!==false)this.dialog.close();};this.dialog.appendChild(b);}
 const close=document.createElement('button');close.textContent='닫기';close.onclick=()=>this.dialog.close();close.style.marginLeft='10px';this.dialog.appendChild(close);this.dialog.showModal();
 }
 openCombat(){const p=this.state()?.self,rows=p?.rework?.records;if(p?.charId!=='c35'||!rows?.length)return this.skill({});this.dialog.replaceChildren();const title=document.createElement('h2');title.textContent='파훼할 강화 효과';this.dialog.appendChild(title);for(const row of rows){const b=document.createElement('button');b.textContent=row.name;b.style.margin='8px';b.onclick=()=>{if(this.skill({dispelKey:row.id})!==false)this.dialog.close();};this.dialog.appendChild(b);}const cancel=document.createElement('button');cancel.textContent='닫기';cancel.onclick=()=>this.dialog.close();this.dialog.appendChild(cancel);this.dialog.showModal();}

 update(m){const p=m?.self,selection=this.selection(m),button=document.querySelector('#actionChoiceCycle'),row=document.querySelector('#actionChoiceRow');
 if(row)row.hidden=!selection?.selected||!p?.alive||m.phase!=='playing';
 if(button){button.disabled=!selection?.selected;button.onclick=()=>this.cycle();button.textContent=selection?.selected?'종류 변경 ↻ · '+selection.selected.name:'종류 변경';button.title=selection?.rows.map(x=>x.name).join(' → ')||'';button.setAttribute('aria-label',selection?.selected?'현재 선택: '+selection.selected.name+'. 누르면 다음 종류 선택':'종류 변경');}
 const el=document.querySelector('#reworkState');if(!el)return;
 const objects=document.querySelector('#regionalObjects');if(objects){objects.replaceChildren();for(const row of p?.reworkOptions?.objects||[]){const b=document.createElement('button');b.textContent=row.name+' · '+row.seconds+'초';b.disabled=!!p.pendingAction;b.onclick=()=>this.remove(row.id);objects.appendChild(b);}}
 const r=p?.rework;if(!r){el.textContent='';return;}const names={charge:'흑뢰',spark:'섬뢰',attention:'주목',paint:'물감',soul:'혼령',light:'빛',momentum:'기세',gear:'기어',star:'별',will:'의지',luck:'운',shard:'파편',calamity:'재액',amp:'증폭',feast:'포식',flow:'수류'};
 const modes={blade:'블레이드',rail:'레일건',boost:'부스터',earth:'대지',wind:'바람',life:'생명',attack:'공격형',defense:'방어형',arms:'팔 증강',legs:'다리 증강',card:'카드 계약',wall:'방벽 계약',sword:'대검',barrage:'마력 난사'};
 el.textContent=[(m.reworkRegions||[]).some(o=>o.region===p.region)?'환영 안개: 탐색 시 혼란 주의':'',modes[r.mode],r.keywordTotal!==undefined?'키워드 '+r.keywordTotal+'/'+r.keywordLimit+' · '+(r.keywords||[]).map(x=>x.name+' ×'+x.count).join(' / '):'',...Object.entries(r.resources||{}).filter(([,v])=>v>0).map(([k,v])=>(names[k]||k)+' '+Math.round(v*10)/10),r.shield>0?'보호막 '+Math.ceil(r.shield):'',r.remoteScout?'원격 정찰: '+this.region(r.remoteScout.region)+' · '+r.remoteScout.names.join(', '):''].filter(Boolean).join(' · ');
 el.title=(r.keywords||[]).map(x=>x.name+' ×'+x.count+': '+x.description).join('\n');
 if(this.dialog.open&&(!p.alive||p.pendingAction||m.phase!=='playing'))this.dialog.close();
 }
}
