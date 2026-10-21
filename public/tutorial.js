// Chapters are client-only. Practice calls the same engine bundled for offline play.
const step=(title,text,button,action='read',extra={})=>({title,text,button,action,...extra});
export const TUTORIAL_CHAPTERS=[
 {id:'story',title:'프롤로그 · 유저노트',summary:'이 세계가 시작된 이유',steps:[
  step('모든 것은 한 권의 노트에서','{user}는 유저노트를 사용해 모든 캐릭터를 블랙서바이벌식 게임 세계로 이동시켰다. 익숙한 도시의 풍경 속에서, 서로 다른 능력을 가진 참가자들의 생존 게임이 시작된다.','유저노트 펼치기'),
  step('살아남기 위한 준비','여기서는 탐색으로 재료를 모으고, 무기와 장비를 제작하고, 다른 참가자와 싸우며 마지막까지 살아남아야 한다. 이 노트의 연습 공간에서 조작을 배워 보자.','연습 공간으로'),
  step('안전한 연습 공간','각 장은 따로 다시 시작할 수 있다. 튜토리얼의 시간·물품·결과는 연습용이며, 실제 온라인 방과 저장된 오프라인 경기에는 반영되지 않는다.','첫 장 완료') ]},
 {id:'lobby',title:'1장 · 경기 준비',summary:'캐릭터 · 시작 지역 · AI · 준비',steps:[
  step('캐릭터 도감과 플레이어 세팅','캐릭터를 선택해 패시브·전투 스킬·추가 행동을 읽어 보자. 실제 로비에서는 캐릭터 도감에서 비교하고 플레이어 세팅에서 출전 캐릭터를 정한다.','이 캐릭터 확인','read',{view:'character'}),
  step('방 목록과 빠른대전','시작 지역과 연습 AI 수를 고르자. 실제 방 만들기에서는 방 이름과 AI 수를 정하며 만들기·참여 즉시 그 방에 들어간다. 빠른대전은 참가 가능한 방을 찾는다.','설정 확인','read',{view:'room'}),
  step('준비하고 시작하기','참가자는 준비를 누르고 방장이 경기를 시작한다. 시작 전 참가자·캐릭터 소개 화면이 잠시 표시된다. 방 나가기는 참가자 누구나, 대기 중인 방 삭제는 방장만 할 수 있다.','준비 · 참가자 소개','roster') ]},
 {id:'search',title:'2장 · 화면과 탐색',summary:'능력치 · 행동 대기 · 흔적과 소음',steps:[
  step('상태 확인','왼쪽 아래의 HP·SP·포만도와 그 아래 공격력·방어력을 확인하자. HP를 잃으면 위험하며 행동에는 SP와 시간이 필요하다. 연습 화면의 수치도 실제 엔진 상태다.','상태 확인'),
  step('탐색 버튼','탐색을 누르면 즉시 탐색 중 문구가 나타난다. 행동이 끝날 때까지 기다려야 결과가 적용된다. 탐색으로 물품·적·야생 적·특수 이벤트 등을 만날 수 있다.','탐색','search',{engine:true}),
  step('피격·소음으로 알게 된 적','피격이나 같은 지역의 흔적·소음으로 적이 드러나면 상단에 정보가 나타난다. 처음 피격으로만 알게 된 적의 HP는 ?다. 이미 알고 있는 HP와 표시 순서는 피격만으로 바뀌지 않는다.','알려진 정보 확인','read',{prep:'incoming'}),
  step('흔적이 사라질 때','관측한 HP는 그때의 정보이며 실시간 위치 추적이 아니다. 적이 지역을 떠난 뒤 탐색으로 확인하면 흔적 소멸 알림과 함께 표시가 지워진다.','흔적 소멸 확인','trace_clear',{prep:'trace'}) ]},
 {id:'recovery',title:'3장 · 회복과 음식',summary:'휴식 · 소모품 · 음식 조합',steps:[
  step('쉬어서 회복하기','HP·SP가 줄어든 연습 상태다. 휴식은 행동시간이 지나면 회복되며, 회복량은 패시브·장비 등에 따라 달라진다.','휴식','rest',{engine:true,prep:'wounded'}),
  step('소모품 사용','빵을 사용하고 HP·포만도와 수량이 바뀌는 것을 확인하자. 소모품마다 효과가 다르며 캐릭터 전용 예외나 위험한 음식도 있으니 도감을 읽자.','빵 사용','use_item',{engine:true,payload:{id:'bread'}}),
  step('음식도 제작한다','빵 + 생수로 물에 젖은 빵을 만든다. 재료가 실제로 소모되고 상위 소모품이 들어오는지 확인하자.','물에 젖은 빵 제작','craft',{engine:true,payload:{id:'wet_bread'},prep:'food_recipe'}),
  step('완성한 음식 사용','완성된 음식의 HP·SP·포만도 회복을 확인하자. 같은 음식의 반복 사용이나 전투 중 사용에는 개별 규칙이 있으니 효과 설명을 확인하는 습관을 들이자.','물에 젖은 빵 사용','use_item',{engine:true,payload:{id:'wet_bread'}}) ]},
 {id:'combat',title:'4장 · 조우와 전투',summary:'일반 공격 · 스킬 · 도주',steps:[
  step('적을 만났다면','연습 상대를 만났다. 일반 공격도 빗나갈 수 있으며, 행동 완료 후 결과와 관측된 적 HP를 확인해야 한다. 적 그림은 공격 결과 연출 후 사라진다.','일반 공격','attack',{engine:true,prep:'encounter'}),
  step('전투 스킬','스킬은 캐릭터 고유 효과·SP 비용·쿨타임이 있다. 회색 원형 쿨타임이 차 있는 동안 다시 쓸 수 없다. 아래 버튼 위의 원형 표시를 확인하자.','정원 재현 사용','skill',{engine:true,prep:'encounter'}),
  step('위험하면 도주','도주는 시작 가능한 상태라면 성공 확률 100%다. 다만 준비시간이 있고 속박 중에는 시작할 수 없다. 도주는 조우를 끝내며 지역 이동은 별도로 선택한다.','도주','flee',{engine:true,prep:'encounter'}) ]},
 {id:'craft',title:'5장 · 도감과 제작',summary:'즐겨찾기 · 제작 트리 · 장착 재료',steps:[
  step('제작 목표 정하기','아이템 도감은 카테고리·검색·제작 트리를 제공한다. 로비에서 즐겨찾기한 목표는 경기의 루트 안내에도 이어진다. 여기서는 연습용 즐겨찾기로 강화총을 고른다.','강화총 즐겨찾기','favorite',{view:'recipe'}),
  step('하위 무기를 강화한다','총 + 기계 부품으로 강화총을 제작한다. 아래 재료와 제작 결과를 확인하자. 무기는 공격 역할, 장비는 방어·보조 역할이며 일부 혼합 스탯도 있다.','강화총 제작','craft',{engine:true,payload:{id:'gun'},prep:'gun_recipe',view:'recipe'}),
  step('세 칸을 다 착용했어도','연습 장착칸을 총·플레이트·회복 모듈로 채웠다. 총이 제작 재료로 소비되면 생긴 칸에 강화총을 넣고 나머지 장비는 유지한다. 장착 재료를 쓰지 않는데 칸이 꽉 차면 교체할 장비를 고른다.','가득 찬 상태에서 강화','craft',{engine:true,payload:{id:'gun'},prep:'full_recipe'}),
  step('분해와 재료 반환','강화총을 분해해 하위 재료를 돌려받는다. 장비는 버릴 수도 있고, 레시피가 있는 장비는 반환 공간이 허용될 때 분해할 수 있다.','강화총 분해','inventory',{payload:{mode:'dismantle_equipment',index:2,id:'gun'}}),
  step('최종 재료와 중복','준최종 재료·장비는 중복 획득과 반복 제작이 가능하다. 최종 특수 재료는 한 판에 하나다. 네임드 장비는 다른 캐릭터도 사용할 수 있으므로 효과를 보고 조합을 짜 보자.','제작 규칙 확인') ]},
 {id:'inventory',title:'6장 · 물품 선택',summary:'가득 찬 칸 · 교체 · 버리기',steps:[
  step('소모품 세 칸이 가득 찼다','빵·생수·붕대를 가진 상태에서 물에 젖은 빵을 발견했다. 기존 생수 한 종류를 버리고 새 음식을 받을지, 발견한 것을 포기할지 고를 수 있다. 이번에는 교체를 연습하자.','생수를 버리고 획득','pickup_replace',{prep:'full_consumables'}),
  step('발견한 물품을 포기하기','이번에는 새로 발견한 생수를 버린다. 기존 소모품은 그대로 남는지 확인하자.','발견한 생수 버리기','pickup_discard',{prep:'discard_reward'}),
  step('장비 획득도 선택한다','장착 세 칸이 가득 찬 상태의 새 강화총이다. 기존 총을 교체해 받자. 다른 장비가 자동으로 사라져서는 안 된다.','총을 강화총으로 교체','pickup_equipment',{prep:'equipment_reward'}),
  step('장착한 아이템 버리기','장착한 강화총을 버려 한 칸을 비운다. 버린 물품은 되돌릴 수 없으니 실제 경기에서는 먼저 효과와 재료 사용 여부를 확인하자.','강화총 버리기','inventory',{payload:{mode:'drop_equipment',index:2,id:'gun'}}) ]},
 {id:'regions',title:'7장 · 이동과 잠금',summary:'연결된 지역 · 3분 잠금 · 13분 도심',steps:[
  step('이동에도 시간이 든다','현재 지역에서 연결된 지역으로만 이동할 수 있다. 이번에는 도심에서 서노리의 저택으로 이동한다. 이동시간·SP 소모는 구간과 효과에 따라 달라진다.','서노리의 저택으로','move',{engine:true,payload:{to:'estate'}}),
  step('3분 간격 지역 제한','이 버튼은 연습 시계만 3분 시점으로 넘긴다. 주요 통로인 도심·관리국 1층 로비·악의조직 접견실을 제외한 두 지역이 잠기며 다음 잠금 때 풀린다. 잠긴 곳의 참가자는 도심으로 이동된다.','3분 잠금 미리 보기','lock_preview'),
  step('13분 이후 최종 구역','연습 시계를 13분 시점으로 넘겨 보자. 모든 참가자가 도심으로 이동하고 다른 모든 지역이 잠긴다. 실제 경기에서는 경과 시간과 잠금 알림을 확인하자.','13분 구역 미리 보기','final_preview') ]},
 {id:'status',title:'8장 · 디버프 읽기',summary:'원형 아이콘 · 출혈 중첩 · 속박',steps:[
  step('디버프 아이콘 열기','디버프는 중앙 아래 원형 아이콘으로 표시된다. 아이콘을 클릭하거나 커서를 올려 설명을 읽자. 출혈은 시간 대신 발동할 때마다 중첩이 줄며 최대 5중첩이다.','출혈 설명 열기','inspect_effect',{prep:'debuff',view:'effects'}),
  step('출혈을 지닌 채 이동','출혈 3중첩에서 이동해 보자. 이동·공격·전투 스킬 완료 시 중첩에 따른 피해를 받고 1중첩을 소모한다.','출혈 상태로 이동','move',{engine:true,payload:{to:'estate'},view:'effects'}),
  step('속박의 제한','속박 중에는 이동·도주를 시작할 수 없다. 공격과 전투 스킬은 사용할 수 있다. 옳은 대응을 고르자.','일반 공격이나 전투 스킬을 고려한다','read',{prep:'bound',view:'effects'}),
  step('다른 효과도 확인하기','둔화는 이동·도주 지연, 수면은 행동 제한, 공포는 명중 감소와 빠른 이동·도주, 혼란은 공격·스킬 무작위 선택, 침묵은 전투 스킬 제한, 행동지연은 행동시간 증가다. 아래 효과별 설명을 열어 정확한 수치를 확인하자.','효과 규칙 확인','read',{view:'all_effects'}) ]},
 {id:'gimmick',title:'9장 · 캐릭터 기믹',summary:'정원 · 고유 버프 · 키워드 · 모드 순환',steps:[
  step('서노리의 정원 설치','서노리로 연습한다. 현재 지역에 정원을 설치해 같은 지역 적에게 속박·행동지연을 기본 100%로 시도한다. 장비 등의 저항으로 대비할 수 있으며 확정 부여와는 다르다. 정원은 30초 유지된다.','정원 설치','char_action',{engine:true,prep:'garden'}),
  step('패시브와 상태 시너지','정원 지역에서 서노리는 탐색 아이템 발견 +30%·휴식 회복 +35%를 받는다. 적은 인형으로 공격·방어 −10%를 받으며 정원은 중복 적용되지 않는다. 고유 버프 아이콘과 보라색 지역 표시를 확인하자.','정원 효과 확인','read',{view:'effects'}),
  step('백은설의 키워드','이번에는 백은설이다. 랜덤 키워드를 사용해 이로운 5종·부정적 3종 중 하나를 얻는다. CD 3초·SP 5이며 최대 10개를 보관한다. 결과는 버프창에 표시된다.','랜덤 키워드','char_action',{engine:true,prep:'keyword'}),
  step('키워드를 쓰는 마법탄','마법탄은 기본 120% 공격에 보유 키워드의 모든 효과를 적용한 뒤 전부 소모한다. 어떤 키워드를 받았는지 읽고 발사하자.','키워드 마법탄','skill',{engine:true,prep:'encounter',view:'effects'}),
  step('종류를 먼저 순환 선택','유채원의 모듈처럼 종류를 바꾸는 추가 행동은 특수 버튼으로 선택을 순환한 뒤 추가 행동을 눌러 적용한다. 이번에는 순환 버튼으로 블레이드 이외의 모듈을 선택하자.','종류 순환','cycle',{prep:'mode'}),
  step('선택한 추가 행동 실행','아래 선택한 모듈 이름을 확인하고 사용하자. 실제 경기에서도 매번 질문창이 뜨는 대신 선택된 종류대로 동작한다. 캐릭터별 상세 규칙은 도감에서 확인한다.','선택한 모듈 적용','char_action',{engine:true,payloadChoice:true,view:'effects'}) ]},
 {id:'events',title:'10장 · 특수 이벤트',summary:'선택지 조건 · 실제 대기 · 보상',steps:[
  step('버려진 보급품','도심의 특수 이벤트를 연습한다. 실제 이벤트에는 캐릭터·물품·능력치 등의 선택 조건이 있을 수 있다. 시간을 쓰는 선택지는 경과 시간을 강제로 더하는 대신 그 시간 동안 기다린다.','이벤트 확인','read',{prep:'event'}),
  step('함정을 조사한다','이번 선택은 4초 조사다. 완료 전에는 보상이 들어오지 않으며 조사 중 표시가 나온다. 행동 완료 후 재료와 알림을 확인하자.','함정을 조사한다','event_choice',{engine:true,payload:{index:1}}),
  step('소음과 정보창','이벤트·전투 등으로 생긴 소음과 흔적은 알림으로 전달된다. 정보창의 플레이어 목록은 누를 때 갱신된다. 관측한 적 정보와 전체 생존자 목록을 구분하자.','이벤트 장 완료') ]},
 {id:'finish',title:'11장 · 결산과 실전',summary:'승패 · 종료 · 재연결 · 오프라인',steps:[
  step('마지막 상대','HP가 얼마 남지 않은 연습 상대를 공격해 보자. 빗나가면 다시 시도할 수 있다. 실제 경기에서는 승리하거나 사망하면 결산창이 열리고 사망 시 가해자가 표시된다.','마지막 상대 공격','attack',{engine:true,prep:'last_enemy',requireKill:true}),
  step('결산 확인','아래 연습 결과를 확인하자. 실제 결산창에서 로비로 돌아갈 수 있고, 경기 도중 직접 나가려면 정보창 맨 아래 게임 나가기를 사용한다. 오프라인 경기도 이 버튼으로 종료해야 재접속 때 이어지지 않는다.','결산 확인','read',{view:'result'}),
  step('연결이 끊겼다면','온라인 경기 도중 연결이 끊기면 서버 연결 중 화면이 나타나 재연결을 시도한다. 버전이 맞지 않으면 업데이트 안내가 표시된다. 오프라인 모드는 로그인 화면에서 선택하며 서버 통신 없이 AI와 플레이한다.','실전 준비 완료') ]}
];
const tutEscape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export class TutorialUI{
 constructor(root,{Practice,sprite,effectDefinitions={}}){
  this.root=root;this.Practice=Practice;this.sprite=sprite;this.effects=effectDefinitions;this.key='masodo-tutorial-progress-v1';this.completed=new Set();this.chapter=0;this.index=0;this.generation=0;this.busy=false;this.done=false;this.storageWarning='';
  try{const saved=JSON.parse(localStorage.getItem(this.key)||'null');if(saved?.version===1&&Array.isArray(saved.completed))this.completed=new Set(saved.completed.filter(id=>TUTORIAL_CHAPTERS.some(c=>c.id===id)))}catch{}
  root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!root.contains(b))return;if(b.dataset.tutChapter!==undefined)this.start(Number(b.dataset.tutChapter));else if(b.dataset.tut==='act')this.act();else if(b.dataset.tut==='next')this.next();else if(b.dataset.tut==='restart')this.start(this.chapter);else if(b.dataset.tut==='exit')root.close();else if(b.dataset.tutEffect)this.describeEffect(b.dataset.tutEffect)});
  root.addEventListener('pointerover',e=>{const b=e.target.closest('[data-tut-effect]');if(b)this.describeEffect(b.dataset.tutEffect)});
  root.addEventListener('focusin',e=>{if(e.target.dataset.tutEffect)this.describeEffect(e.target.dataset.tutEffect)});
  root.addEventListener('change',e=>{if(e.target.id==='tutorialCharacter'){this.practice.reset(e.target.value);this.paintState();this.paintCharacter()}});
  root.addEventListener('close',()=>this.stop());root.addEventListener('cancel',()=>this.stop());
 }
 q(selector){return this.root.querySelector(selector)}
 open(){this.root.showModal();const first=TUTORIAL_CHAPTERS.findIndex(c=>!this.completed.has(c.id));this.start(first<0?0:first)}
 stop(){this.generation++;clearInterval(this.interval);clearTimeout(this.timeout);this.interval=null;this.timeout=null;this.busy=false;if(this.practice)this.practice.player.pendingAction=null}
 save(){try{localStorage.setItem(this.key,JSON.stringify({version:1,completed:[...this.completed]}))}catch{this.storageWarning='이 환경에서는 수료 기록이 저장되지 않습니다.'}}
 start(chapter){
  if(!Number.isInteger(chapter)||!TUTORIAL_CHAPTERS[chapter])return;this.stop();this.chapter=chapter;this.index=0;this.setup=null;this.practice=new this.Practice();this.done=false;this.message='';this.renderShell();this.enterStep();this.interval=setInterval(()=>this.paintState(),250);
 }
 renderShell(){
  const c=TUTORIAL_CHAPTERS[this.chapter];this.root.innerHTML=`<div class="popup-head"><h2>유저노트 · 튜토리얼</h2><button type="button" data-tut="exit">로비로</button></div><p class="tutorial-isolation">독립된 연습 공간 · 실제 경기와 물품은 유지됩니다.</p><div class="tutorial-layout"><nav class="tutorial-chapters" aria-label="튜토리얼 챕터">${TUTORIAL_CHAPTERS.map((c,i)=>`<button type="button" data-tut-chapter="${i}" ${i===this.chapter?'aria-current="step"':''}><b>${this.completed.has(c.id)?'✓ ':''}${tutEscape(c.title)}</b><span>${tutEscape(c.summary)}</span></button>`).join('')}</nav><section class="tutorial-lesson" aria-label="연습 화면"><div class="tutorial-heading"><h3>${tutEscape(c.title)}</h3><button type="button" data-tut="restart">챕터 다시 시작</button></div><p class="tutorial-progress"></p><div class="tutorial-story"></div><div class="tutorial-task"></div><div class="tutorial-stage"><div class="tutorial-portrait"><canvas></canvas><span></span></div><div class="tutorial-state"></div></div><div class="tutorial-extras"></div><div class="tutorial-effects" aria-label="연습 효과"></div><div class="tutorial-effect-bubble" role="status" hidden></div><div class="tutorial-actions"></div><div class="tutorial-feedback" role="status" aria-live="polite"></div><p class="tutorial-save-message"></p></section></div>`;
 }
 enterStep(){
  const s=this.step();this.busy=false;this.done=false;this.message='';if(s.prep)this.practice.prepare(s.prep);this.q('.tutorial-progress').textContent=`${this.index+1} / ${this.chapterInfo().steps.length} 단계 · ${this.completed.size} / ${TUTORIAL_CHAPTERS.length}장 수료`;
  this.q('.tutorial-story').textContent=s.title;this.q('.tutorial-task').textContent=s.text;this.q('.tutorial-feedback').textContent='';this.q('.tutorial-effect-bubble').hidden=true;this.effectKey=null;
  this.paintExtras();this.paintActions();this.paintState();this.paintPortrait();
 }
 chapterInfo(){return TUTORIAL_CHAPTERS[this.chapter]}
 step(){return this.chapterInfo().steps[this.index]}
 paintPortrait(){const c=this.practice.characters.find(c=>c.id===this.practice.player.charId);this.sprite?.(this.q('.tutorial-portrait canvas'),this.q('.tutorial-portrait span'),c.id,c.name,'upperbody')}
 paintCharacter(){const el=this.q('.tutorial-character-info');if(!el)return;const c=this.practice.characters.find(c=>c.id===this.practice.player.charId);el.innerHTML=`<b>${tutEscape(c.name)}</b><p>패시브 · ${tutEscape(c.passive)}<br>${tutEscape(c.passiveEffectText)}</p><p>전투 · ${tutEscape(c.combat)}<br>${tutEscape(c.combatEffectText)}</p><p>추가 행동 · ${tutEscape(c.action)}<br>${tutEscape(c.actionEffectText)}</p>`;this.paintPortrait()}
 paintExtras(){
  const s=this.step(),el=this.q('.tutorial-extras');el.innerHTML='';
  if(s.view==='character'){el.innerHTML=`<label for="tutorialCharacter">연습에서 살펴볼 캐릭터</label><select id="tutorialCharacter">${this.practice.characters.map(c=>`<option value="${c.id}">${tutEscape(c.name)}</option>`).join('')}</select><div class="tutorial-character-info"></div>`;this.paintCharacter()}
  if(s.view==='room')el.innerHTML=`<div class="tutorial-room"><label for="tutorialStart">연습 시작 지역</label><select id="tutorialStart">${this.practice.regions.map(r=>`<option value="${r.id}">${tutEscape(r.name)}</option>`).join('')}</select><label for="tutorialAI">연습 AI 수</label><select id="tutorialAI"><option value="fill">남은 인원 채우기</option><option value="none">없음</option><option value="3">3명</option></select></div>`;
  if(s.view==='recipe')el.innerHTML='<div class="tutorial-recipe">강화총 ← 총 + 기계 부품<br>총 ← 철 + 화약<br><small>연습용 즐겨찾기는 실제 즐겨찾기를 변경하지 않습니다.</small></div>';
  if(s.view==='result')el.innerHTML=`<div class="tutorial-result"><h4>연습 결산</h4><b>${this.practice.enemy.alive?'결과 확인':'연습 승리'}</b><p>처치 ${this.practice.player.kills} · 생존 HP ${Math.ceil(this.practice.player.hp)}</p><p>실제 경기 통계에는 기록되지 않습니다.</p></div>`;
 }
 paintState(){
  if(!this.practice||!this.root.open)return;const v=this.practice.snapshot(),p=v.self,m=v.match,region=this.practice.regions.find(r=>r.id===p.region)?.name||p.region;
  const bar=(label,value,max)=>`<div class="tutorial-vital"><span>${label}</span><meter min="0" max="${max}" value="${Math.max(0,value)}"></meter><b>${Math.ceil(value)} / ${Math.ceil(max)}</b></div>`;
  this.q('.tutorial-state').innerHTML=`<div class="tutorial-location">${tutEscape(region)}${p.inGarden?' · <strong>정원</strong>':''} · ${Math.floor(Math.max(0,Date.now()-m.startedAt)/60000).toString().padStart(2,'0')}:${Math.floor(Math.max(0,Date.now()-m.startedAt)/1000%60).toString().padStart(2,'0')}</div>${bar('HP',p.hp,p.maxHp)}${bar('SP',p.sp,p.maxSp)}${bar('포만도',p.satiety,100)}<p>공격력 ${p.atk.toFixed(1)} · 방어력 ${p.def.toFixed(1)}</p><p>장착 ${p.eq.length}/3: ${p.eq.map(id=>tutEscape(this.practice.items[id]?.n||id)).join(' · ')||'없음'}<br>소모품 ${Object.keys(p.con).length}/3: ${Object.entries(p.con).map(([id,n])=>`${tutEscape(this.practice.items[id]?.n||id)} ×${n}`).join(' · ')||'없음'}<br>재료: ${Object.entries(p.mat).map(([id,n])=>`${tutEscape(this.practice.items[id]?.n||id)} ×${n}`).join(' · ')||'없음'}</p>${v.choice?`<p>선택: ${tutEscape(v.choiceLabel)} · 적용 모드: ${tutEscape(p.reworkOptions?.choices?.find(x=>x.id===p.rework?.mode)?.name||'기본')}</p>`:''}${v.favorites.length?'<p>★ 강화총 · 목표 재료: 총, 기계 부품</p>':''}${(p.enemyContacts||[]).map(e=>`<div class="tutorial-contact">${tutEscape(e.name)} · HP ${e.hp===null?'?':Math.ceil(e.hp)}</div>`).join('')}${m.regionRestrictions?.locked.length?`<p class="tutorial-lock">잠금: ${m.regionRestrictions.locked.map(id=>tutEscape(this.practice.regions.find(r=>r.id===id)?.name)).join(' · ')}</p>`:''}`;
  const rows={...p.statuses,...p.buffs};this.effectRows=rows;
  const shown=this.step().view==='all_effects'?Object.fromEntries(Object.keys(this.effects).filter(k=>['poison','bleed','slow','bind','sleep','fear','confusion','silence','actionDelay'].includes(k)).map(k=>[k,{stacks:k==='bleed'?3:1,until:null}])):rows;
  const effectMarkup=Object.entries(shown).filter(([,r])=>r.until===null||r.until>Date.now()).map(([id,r])=>{const d=this.effects[id],duration=r.durationMs||10000,left=r.until===null?1:Math.max(0,Math.min(1,(r.until-Date.now())/duration));return `<button type="button" data-tut-effect="${tutEscape(id)}" aria-label="${tutEscape(d?.name||r.name||'고유 효과')}" style="--tutorial-ring:${left*360}deg"><svg viewBox="0 0 24 24" aria-hidden="true">${d?.icon||'<circle cx="12" cy="12" r="8"/>'}</svg>${r.stacks>1?`<small>${r.stacks}</small>`:''}</button>`}).join('');
  const key=Object.entries(shown).map(([id,r])=>id+':'+r.stacks+':'+r.until).join('|');
  if(this.effectKey!==key){this.q('.tutorial-effects').innerHTML=effectMarkup;this.effectKey=key}else for(const b of this.q('.tutorial-effects').querySelectorAll('[data-tut-effect]')){const r=shown[b.dataset.tutEffect];const left=r.until===null?1:Math.max(0,Math.min(1,(r.until-Date.now())/(r.durationMs||10000)));b.style.setProperty('--tutorial-ring',left*360+'deg')}
  const busyEl=this.q('.tutorial-busy');if(busyEl){const a=this.practice.player.pendingAction;busyEl.textContent=(this.step().action==='event_choice'?'조사':this.step().button.replace(/ 사용| 제작/,''))+' 중'+'.'.repeat(Math.floor(Date.now()/400)%3+1);if(a)busyEl.style.setProperty('--tutorial-wait',`${Math.max(0,(a.completeAt-Date.now())/(a.completeAt-a.startedAt))*100}%`)}
  const cd=this.q('.tutorial-cooldown');if(cd){const left=Math.max(0,p.cdC),total=(p.cdCDuration||60);cd.style.setProperty('--tutorial-ring',`${Math.min(1,left/total)*360}deg`);cd.hidden=left<=0}
 }
 describeEffect(id){const row=this.effectRows?.[id]||{stacks:id==='bleed'?3:1},d=this.effects[id];const el=this.q('.tutorial-effect-bubble');el.hidden=false;el.textContent=(d?.name||row.name||'고유 효과')+' · '+(d?.describe(row.stacks||1)||row.description||'캐릭터 고유 효과입니다.');if(!this.done&&this.step().action==='inspect_effect'&&id==='bleed')this.finish({ok:true},'출혈 설명을 확인했다. 아래 중첩과 다음 이동 후 상태를 비교해 보자.')}
 paintActions(){const s=this.step();this.q('.tutorial-actions').innerHTML=`<button type="button" data-tut="act" ${this.busy||this.done?'disabled':''}>${tutEscape(s.button)}${s.action==='skill'?'<span class="tutorial-cooldown" aria-hidden="true" hidden></span>':''}</button>${this.busy?'<span class="tutorial-busy" role="status"></span>':''}<button type="button" data-tut="next" ${!this.done?'disabled':''}>${this.index===this.chapterInfo().steps.length-1?(this.chapter===TUTORIAL_CHAPTERS.length-1?'챕터 목록으로':'다음 챕터'):'다음 단계'}</button>`}
 act(){
  if(this.busy||this.done)return;const s=this.step(),p=this.practice;let payload={...s.payload};
  if(s.payloadChoice)payload.choice=p.choice;
  if(s.action==='inspect_effect'){this.describeEffect('bleed');return}
  if(s.action==='pickup_replace'||s.action==='pickup_discard'||s.action==='pickup_equipment'){
   payload={mode:'resolve_pickup',token:p.player.pendingPickup?.token,choice:s.action==='pickup_discard'?'discard':'replace',...(s.action==='pickup_replace'?{replaceId:'water'}:{}),...(s.action==='pickup_equipment'?{replaceIndex:0,replaceId:'basic_gun'}:{})};this.finish(p.instant('inventory',payload));return;
  }
  if(s.action==='roster'){
   const c=p.characters.find(c=>c.id===p.player.charId);this.q('.tutorial-extras').innerHTML=`<div class="tutorial-roster"><b>연습 참가자 소개</b><p>당신 · ${tutEscape(c.name)}</p>${Array.from({length:this.setup?.ai==='none'?0:this.setup?.ai==='3'?3:10},(_,i)=>'<p>연습 AI '+(i+1)+' · '+tutEscape(p.characters.filter(c=>!c.testOnly)[i].name)+'</p>').join('')}<small>선택한 설정의 소개 예시입니다. 실제 경기의 소개 화면은 시작 시점에 맞춰 자동 종료됩니다.</small></div>`;
  }
  if(!s.engine){if(s.view==='room'){this.setup={region:this.q('#tutorialStart').value,ai:this.q('#tutorialAI').value};p.player.region=this.setup.region;}this.finish(p.instant(s.action,payload));return}
  if(s.requireKill&&!p.player.encounter){p.enemy.region=p.player.region;p.player.encounter={kind:'player',targetId:p.enemy.playerId}}
  const r=p.begin(s.action,payload);if(!r.ok){this.error(r.error);return}if(!p.player.pendingAction){this.finish(r);return}
  this.busy=true;this.paintActions();this.paintState();const generation=this.generation,completeAt=p.player.pendingAction.completeAt;
  const resolve=()=>{if(generation!==this.generation||!this.root.open)return;if(Date.now()<completeAt){this.timeout=setTimeout(resolve,completeAt-Date.now());return}const result=p.complete();if(!result){this.timeout=setTimeout(resolve,50);return}this.busy=false;if(!result.ok){this.paintActions();this.error(result.error);return}if(s.requireKill&&p.enemy.alive){this.paintActions();this.q('.tutorial-feedback').textContent='공격이 빗나갔다. 다시 공격해 보자.';this.paintState();return}this.finish(result)};
  this.timeout=setTimeout(resolve,Math.max(0,completeAt-Date.now()));
 }
 finish(result,message){
  if(!result?.ok){this.error(result?.error);return}this.done=true;this.busy=false;this.paintActions();this.paintState();this.message=message||this.describeResult(result);this.q('.tutorial-feedback').textContent=this.message;
  if(this.index===this.chapterInfo().steps.length-1){this.completed.add(this.chapterInfo().id);this.save();this.q('.tutorial-save-message').textContent=this.storageWarning||'이 챕터 수료 기록을 저장했습니다.';const b=this.q(`[data-tut-chapter="${this.chapter}"] b`);if(b&&!b.textContent.startsWith('✓'))b.textContent='✓ '+b.textContent}
 }
 describeResult(r){if(r.hit===false)return '공격이 빗나갔다. 공격 시도와 행동시간을 확인했다.';if(r.itemName)return `${r.itemName} 제작 완료. 물품과 재료 수량을 확인하자.`;if(r.damage!==undefined)return `연습 상대에게 ${r.damage} 피해. 표시된 HP는 행동 결과를 관측한 값이다.`;if(r.type==='trace_clear')return '연습 상대의 흔적이 사라졌다. 상단 정보가 제거됐다.';if(r.type==='event_choice')return '조사를 마치고 보상을 받았다. 기다린 시간이 경과 시간에 자연스럽게 반영됐다.';return '연습을 완료했다. 바뀐 수치·물품·효과를 확인하고 다음 단계로 진행하자.'}
 error(code){const errors={bound:'속박 중에는 이동·도주를 시작할 수 없다. 효과가 끝나면 다시 시도하자.',skill_cooldown:'아직 스킬 쿨타임 중이다.',action_cooldown:'아직 추가 행동 쿨타임 중이다.',asleep:'수면 중에는 새 행동을 시작할 수 없다.',pickup_choice_required:'발견한 물품의 교체·버리기를 먼저 선택하자.',event_choice_required:'이벤트 선택지를 먼저 골라야 한다.',no_encounter:'현재 조우한 대상이 없다. 챕터를 다시 시작해 보자.'};this.q('.tutorial-feedback').textContent=errors[code]||'현재 조건으로 진행할 수 없다. 상태·재료·선택을 확인하거나 이 챕터를 다시 시작해 보자.'}
 next(){if(!this.done||this.busy)return;if(this.index<this.chapterInfo().steps.length-1){this.index++;this.enterStep()}else this.start(this.chapter===TUTORIAL_CHAPTERS.length-1?0:this.chapter+1)}
}
