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
const TUTORIAL_SCENES={
 story:{intro:[['n','텅 빈 도심. 익숙한 도시의 풍경 사이로, 서로 다른 참가자들의 모습이 보인다.'],['u','유저노트로 모두를 이 블랙서바이벌식 게임 세계에 옮겼어.'],['p','탐색하고, 무기를 만들고… 다른 참가자와 싸우는 세계라는 거지?'],['u','맞아. 첫 장부터 같이 해 보자.']],beats:['노트를 펼쳐 봐. 이 세계에서 할 수 있는 일이 적혀 있어.','가진 능력도, 손에 넣는 물품도 생존에 도움이 될 거야.','지금부터는 각 장의 목표를 직접 해 보면 돼.'],outro:[['u','첫 장은 여기까지. 이제 네가 어떤 모습으로 출전할지 정하자.']]},
 lobby:{intro:[['n','도심의 준비 구역. 유저노트에 참가자들의 이름이 펼쳐졌다.'],['u','모두 같은 조건으로 싸우지는 않아. 캐릭터의 능력부터 골라 보자.']],beats:['패시브와 두 종류의 스킬을 읽고 마음에 드는 캐릭터를 골라.','출발할 지역과 AI 설정도 정해야 해.','준비가 끝났으면 참가자들을 확인하자.'],outro:[['u','준비 끝. 다음 장에서는 도심을 직접 탐색해 보자.']]},
 search:{intro:[['n','건물 사이로 난 길. 멀리서 누군가 움직이는 소리가 들린다.'],['u','보이는 것과 알고 있는 건 다를 수 있어. 먼저 주변을 살펴보자.']],beats:['왼쪽 아래를 봐. 네 상태를 알아야 다음 행동을 정할 수 있어.','탐색해 봐. 결과가 나오기 전까지는 행동이 진행 중이야.','방금 소리가 났어. 이름을 알아도 체력까지 아는 건 아니야.','확인했던 상대가 다른 곳으로 갔네. 남아 있던 흔적을 다시 확인하자.'],outro:[['u','흔적은 그 순간의 기록이야. 이전 정보만 믿고 공격을 서두르지 마.']]},
 recovery:{intro:[['n','잠시 쉴 수 있는 도심의 한쪽. 긴 이동으로 몸이 지쳐 있다.'],['u','계속 움직이기 전에 회복부터 하자. 버틸 힘도 준비해야 하니까.']],beats:['잠깐 쉬자. 휴식도 시간이 지나야 회복돼.','가지고 있는 빵을 먹어 봐. 수량과 상태가 함께 바뀔 거야.','빵하고 물이 있네. 둘을 조합해 보자.','완성했으면 먹어 보자. 회복되는 종류를 비교해 봐.'],outro:[['u','회복할 수 있을 때 준비해 두자. 음식 설명을 먼저 읽는 것도 잊지 말고.']]},
 combat:{intro:[['n','유저노트가 마련한 대련 장면. 참가자를 본뜬 전투용 잔상이 앞을 가로막는다.'],['u','여기서는 잔상을 상대로 공격과 스킬, 도주를 연습해 볼 거야.']],beats:['먼저 일반 공격. 적중했는지와 상대의 상태를 함께 확인해.','이번에는 전투 스킬을 써 보자. 사용 뒤에는 쿨타임이 생겨.','싸움을 끝내고 빠져나오는 것도 판단이야. 도주해 보자.'],outro:[['u','실전에서는 공격받은 사람과 피해량도 알림에 나와. 결과를 보고 다음 수를 정하자.']]},
 craft:{intro:[['n','도심의 작업대. 총과 기계 부품이 놓여 있다.'],['u','주운 물품을 그대로 쓰는 것만이 방법은 아니야. 제작 목표를 정해 보자.']],beats:['도감에서 강화총을 목표로 표시하자.','총과 기계 부품을 모았어. 제작창에서 강화해 봐.','장착한 총이 재료라면, 그 자리를 완성품이 이어받을 수 있어.','이번에는 분해해 보자. 어떤 재료가 돌아오는지 확인해.','준최종과 최종의 재료 제한도 기억해 두자.'],outro:[['u','완성품만 보지 말고 그 아래 제작 트리도 보자. 이동할 이유가 생길 거야.']]},
 inventory:{intro:[['n','챙겨 온 물품으로 소모품칸과 장착칸이 가득 찼다.'],['u','새 물품이 좋아 보여도 무엇을 남길지는 직접 골라야 해.']],beats:['새 음식을 발견했어. 이번에는 생수 대신 받아 보자.','지금 가진 것을 남기고, 새로 발견한 물품을 포기할 수도 있어.','강화총이 나왔네. 원래 총을 교체해서 받아 보자.','필요 없는 장비는 버려서 칸을 비울 수 있어.'],outro:[['u','칸이 가득 차도 자동으로 정리해 주지는 않아. 무엇을 버릴지 잘 보고 선택하자.']]},
 regions:{intro:[['n','도심에서 여러 지역으로 이어지는 갈림길. 유저노트에 지도가 펼쳐졌다.'],['u','물품만 보면서 움직이다가는 길이 잠길 수 있어. 지도와 시간을 같이 보자.']],beats:['지도를 열고 서노리의 저택으로 이동해 봐.','이 장면만 3분 시점으로 넘겨 볼게. 잠긴 두 곳을 지도에서 확인해.','이번에는 13분 시점이야. 마지막 구역이 어떻게 바뀌는지 보자.'],outro:[['u','이제 시간이 지나면 왜 도심으로 모이는지 알겠지. 실전에서는 알림을 놓치지 마.']]},
 status:{intro:[['n','발목에 남은 상처. 상태 아이콘 하나가 눈에 들어온다.'],['u','평소와 다른 상태라면 아이콘부터 읽자. 할 수 있는 행동도 달라지니까.']],beats:['출혈 아이콘을 눌러 봐. 중첩이 어떻게 줄어드는지 적혀 있어.','출혈 상태에서 이동하면 어떤 변화가 생기는지 확인하자.','이번에는 속박이야. 이동과 도주는 막히지만 공격까지 막히는 건 아니야.','다른 상태들도 아이콘을 눌러 비교해 봐.'],outro:[['u','받은 디버프는 누가 왜 걸었는지도 알림으로 확인할 수 있어.']]},
 gimmick:{intro:[['n','유저노트의 다음 장에는 캐릭터별 능력이 서로 다른 형태로 기록되어 있다.'],['u','같은 버튼이어도 캐릭터마다 쓰임이 달라. 몇 가지를 직접 해 보자.']],beats:['서노리로 정원을 설치해 보자.','정원이 있는 곳에서 받는 패시브와 상대의 인형 효과를 확인해.','이번에는 백은설이야. 키워드를 하나 얻어 보자.','얻은 키워드를 읽고 마법탄에 전부 사용해 봐.','유채원의 모듈은 종류를 먼저 순환해서 고를 수 있어.','고른 모듈을 추가 행동으로 적용하자.'],outro:[['u','다른 캐릭터도 도감을 읽고 자신만의 조합을 찾아보자. 장비의 부가 효과도 도움이 될 거야.']]},
 events:{intro:[['n','길가에 버려진 보급품. 겉으로는 안쪽 상황을 알 수 없다.'],['u','바로 열 수도 있지만 함정을 조사하는 선택도 있어.']],beats:['선택지를 읽어 보자. 조건이나 걸리는 시간이 다를 수 있어.','이번에는 함정을 조사하자. 조사가 끝날 때까지 기다려야 해.','보상과 소음을 확인했으면 다음으로 가자.'],outro:[['u','이벤트에서도 행동은 시간이 들어. 급한 상황이라면 그 점까지 생각해서 골라야 해.']]},
 finish:{intro:[['n','마지막 대련 장면. 앞서 싸웠던 잔상이 다시 모습을 드러낸다.'],['u','이 상대를 쓰러뜨리고 이번 시나리오의 결산을 확인하자.']],beats:['마지막 공격이야. 빗나가면 다시 시도해도 돼.','끝났어. 결산창에서 결과를 확인해 보자.','실제 경기에서 나가기와 연결이 끊겼을 때의 대응도 기억하자.'],outro:[['p','탐색, 제작, 전투… 이제 직접 해 볼 수 있겠어.'],['u','유저노트의 기본 장은 여기까지야. 필요한 장은 언제든 다시 펼쳐 봐.']]}
};
export class TutorialUI{
 constructor(root,{Practice,sprite,effectDefinitions={},screen,background=()=>'',enter=()=>{},leave=()=>{}}){
  this.root=root;this.screen=screen;this.Practice=Practice;this.sprite=sprite;this.effects=effectDefinitions;this.background=background;this.onEnter=enter;this.onLeave=leave;this.key='masodo-tutorial-scenario-progress-v1';this.completed=new Set();this.chapter=0;this.index=0;this.phase='idle';this.generation=0;this.active=false;this.busy=false;this.done=false;this.timers=new Set();this.storageWarning='';
  try{const saved=JSON.parse(localStorage.getItem(this.key)||'null');if(saved?.version===1&&Array.isArray(saved.completed))this.completed=new Set(saved.completed.filter(id=>TUTORIAL_CHAPTERS.some(c=>c.id===id)))}catch{}
  root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.tutChapter!==undefined)this.select(Number(b.dataset.tutChapter));if(b.dataset.tut==='launch')this.start(this.chapter);if(b.dataset.tut==='exit')root.close()});
  screen.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
   if(d.tut==='dialogue-next')this.advanceDialogue();else if(d.tut==='dialogue-skip')this.endDialogue();else if(d.tut==='exit')this.exit(true);else if(d.tut==='restart')this.start(this.chapter);else if(d.tut==='next-chapter')this.start((this.chapter+1)%TUTORIAL_CHAPTERS.length);else if(d.tut==='close-panel')this.closePanel();else if(d.tut==='act')this.act();else if(d.tut==='cycle')this.act('cycle');else if(d.tutCommand)this.command(d.tutCommand);else if(d.tutDestination)this.chooseMove(d.tutDestination);else if(d.tutCraft)this.chooseCraft(d.tutCraft);else if(d.tutChoice)this.resolvePickup(d.tutChoice);else if(d.tutEvent&&this.step().action==='event_choice'&&Number(d.tutEvent)===this.step().payload.index)this.act('event_choice',{index:Number(d.tutEvent)});else if(d.tutEffect)this.describeEffect(d.tutEffect);
  });
  for(const event of ['pointerover','focusin'])screen.addEventListener(event,e=>{const b=e.target.closest?.('[data-tut-effect]');if(b)this.describeEffect(b.dataset.tutEffect)});
  screen.addEventListener('change',e=>{if(e.target.id==='tutorialCharacter'&&this.phase==='play'){this.practice.reset(e.target.value,this.now());this.paint();this.paintPanel('settings')}});
  screen.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();if(this.panel)this.closePanel();else this.exit(true)}else if(this.phase==='dialogue'&&['ArrowRight','Enter',' '].includes(e.key)&&!['BUTTON','INPUT','SELECT'].includes(e.target.tagName)){e.preventDefault();this.advanceDialogue()}});
 }
 q(selector){return this.screen.querySelector(selector)}
 chapterInfo(){return TUTORIAL_CHAPTERS[this.chapter]}
 step(){return this.chapterInfo().steps[this.index]}
 scene(){return TUTORIAL_SCENES[this.chapterInfo().id]}
 now(){return (this.pausedAt??Date.now())-(this.offset||0)}
 pause(value){if(value&&this.pausedAt===null)this.pausedAt=Date.now();if(!value&&this.pausedAt!==null){this.offset+=Date.now()-this.pausedAt;this.pausedAt=null}}
 later(fn,ms){const generation=this.generation;const id=setTimeout(()=>{this.timers.delete(id);if(this.active&&generation===this.generation)fn()},ms);this.timers.add(id);return id}
 open(){if(this.active)this.exit(false);const first=TUTORIAL_CHAPTERS.findIndex(c=>!this.completed.has(c.id));this.select(first<0?0:first);this.root.showModal()}
 select(index){if(!TUTORIAL_CHAPTERS[index])return;this.chapter=index;const c=this.chapterInfo();this.root.innerHTML=`<div class="popup-head"><h2>유저노트 · 튜토리얼 시나리오</h2><button type="button" data-tut="exit">로비로</button></div><p class="tutorial-isolation">챕터를 골라 전용 시나리오를 플레이하세요. 대화와 목표 수행으로 이야기가 이어집니다.</p><div class="tutorial-select-grid">${TUTORIAL_CHAPTERS.map((c,i)=>`<button type="button" data-tut-chapter="${i}" ${index===i?'aria-current="step"':''}><b>${this.completed.has(c.id)?'✓ ':''}${tutEscape(c.title)}</b><span>${tutEscape(c.summary)}</span></button>`).join('')}</div><div class="tutorial-selected"><b>${tutEscape(c.title)}</b><p>${tutEscape(c.summary)}</p><p>별도 시나리오 · 수료 기록 저장 · 언제든 다시 플레이</p><button type="button" data-tut="launch">시나리오 시작</button></div>`}
 stop(){this.generation++;for(const id of this.timers)clearTimeout(id);this.timers.clear();clearInterval(this.interval);this.interval=null;this.busy=false;if(this.practice)this.practice.player.pendingAction=null}
 exit(chooser=false){this.stop();this.active=false;this.phase='idle';this.panel=null;this.screen.hidden=true;this.onLeave();if(chooser){this.select(this.chapter);this.root.showModal()}}
 save(){try{localStorage.setItem(this.key,JSON.stringify({version:1,completed:[...this.completed]}))}catch{this.storageWarning='이 환경에서는 수료 기록이 저장되지 않습니다.'}}
 start(index){
  if(!TUTORIAL_CHAPTERS[index])return;this.stop();this.root.close();this.chapter=index;this.index=0;this.offset=0;this.pausedAt=null;this.active=true;this.setup=null;this.panel=null;this.done=false;this.practice=new this.Practice();this.practice.enemy.playerName='유저노트의 전투 잔상';this.screen.hidden=false;this.render();this.onEnter();this.interval=setInterval(()=>this.paint(),200);this.enterStep(true);
 }
 render(){
  this.screen.innerHTML=`<div class="scenario-background"></div><div class="scenario-shade"></div><header class="scenario-header"><div><span>유저노트 · 전용 시나리오</span><h2>${tutEscape(this.chapterInfo().title)}</h2><b class="scenario-region"></b></div><div class="scenario-header-buttons"><button type="button" data-tut="restart">다시 시작</button><button type="button" data-tut="exit">챕터 선택</button></div></header><div class="scenario-objective" role="status"></div><div class="scenario-contacts"></div><div class="scenario-enemy" hidden><canvas></canvas><span></span></div><section class="scenario-player" aria-label="시나리오 플레이어"><div class="scenario-player-portrait"><canvas></canvas><span></span></div><div class="scenario-vitals"></div></section><div class="scenario-effects" aria-label="버프와 디버프"></div><div class="scenario-effect-bubble" role="status" hidden></div><div class="scenario-feedback" role="status" aria-live="polite"></div><div class="scenario-loading" role="status" hidden></div><nav class="scenario-commands" aria-label="시나리오 행동">${[['search','탐색'],['attack','공격'],['skill','스킬'],['char_action','추가 행동'],['flee','도주'],['rest','휴식'],['move','이동'],['inventory','인벤토리'],['craft','제작'],['info','정보']].map(([id,label])=>`<button type="button" data-tut-command="${id}"><span>${label}</span>${['skill','char_action'].includes(id)?'<i class="scenario-cooldown" hidden></i>':''}</button>`).join('')}<button type="button" data-tut="cycle" hidden>종류 변경</button></nav><section class="scenario-panel" hidden role="dialog" aria-modal="true" aria-label="시나리오 선택창"><div class="popup-head"><h3 class="scenario-panel-title"></h3><button type="button" data-tut="close-panel">닫기</button></div><div class="scenario-panel-body"></div></section><section class="scenario-dialogue" aria-label="스토리 대화" hidden><div class="scenario-speaker-portrait"><canvas></canvas><span></span></div><div class="scenario-dialogue-box"><b class="scenario-speaker"></b><p class="scenario-line"></p><div class="scenario-dialogue-controls"><span class="scenario-dialogue-count"></span><button type="button" data-tut="dialogue-skip">이번 대화 건너뛰기</button><button type="button" data-tut="dialogue-next">다음 ▸</button></div></div></section><section class="scenario-result" hidden role="dialog" aria-modal="true" aria-label="시나리오 결산"><h2>시나리오 클리어</h2><p class="scenario-result-text"></p><button type="button" data-tut="next-chapter">다음 시나리오</button><button type="button" data-tut="exit">챕터 선택</button></section>`;
 }
 enterStep(first=false){
  const s=this.step();this.done=false;this.busy=false;this.effectKey=null;this.closePanel();if(s.prep)this.practice.prepare(s.prep,this.now());this.practice.enemy.playerName='유저노트의 전투 잔상';this.q('.scenario-feedback').textContent='';this.q('.scenario-effect-bubble').hidden=true;this.playerSpriteKey=null;this.enemySpriteKey=null;this.enemyFading=false;this.paint();
  const lines=[...(first?this.scene().intro:[]),['u',this.scene().beats[this.index]||s.title],['note',s.text]];
  this.dialogue(lines,()=>{
   this.phase='play';this.pause(false);this.paint();
   if(s.action==='read'&&!['character','room','result','all_effects','effects'].includes(s.view))this.finish({ok:true});
   else if(s.view==='character'||s.view==='room')this.openPanel('settings');else if(s.action==='roster')this.openPanel('roster');else if(s.action==='event_choice')this.openPanel('event');else if(s.view==='result')this.openPanel('result');else if(s.view==='all_effects'||(s.action==='read'&&s.view==='effects'))this.openPanel('effects');
  });
 }
 dialogue(lines,after){this.phase='dialogue';this.pause(true);this.closePanel();this.lines=lines;this.lineIndex=0;this.afterDialogue=after;this.q('.scenario-dialogue').hidden=false;this.paintLine();this.paintControls()}
 paintLine(){
  clearTimeout(this.lineTimer);const[kind,text]=this.lines[this.lineIndex];this.lineText=text;this.typed=0;
  const p=this.q('.scenario-speaker-portrait');p.hidden=kind==='n'||kind==='note';this.q('.scenario-speaker').textContent=kind==='u'?'{user}':kind==='p'?'당신':kind==='note'?'유저노트':'이야기';
  if(!p.hidden)this.sprite?.(p.querySelector('canvas'),p.querySelector('span'),kind==='u'?'c52':this.practice.player.charId,kind==='u'?'{user}':'당신','standing','neutral');
  this.q('.scenario-dialogue-count').textContent=`${this.lineIndex+1} / ${this.lines.length}`;const el=this.q('.scenario-line');el.setAttribute('aria-label',text);el.textContent='';
  const type=()=>{if(this.phase!=='dialogue')return;this.typed=Math.min(text.length,this.typed+2);el.textContent=text.slice(0,this.typed);if(this.typed<text.length)this.lineTimer=this.later(type,24)};type();this.q('[data-tut="dialogue-next"]').focus?.();
 }
 advanceDialogue(){if(this.phase!=='dialogue')return;if(this.typed<this.lineText.length){clearTimeout(this.lineTimer);this.typed=this.lineText.length;this.q('.scenario-line').textContent=this.lineText;return}if(++this.lineIndex<this.lines.length)this.paintLine();else this.endDialogue()}
 endDialogue(){if(this.phase!=='dialogue')return;clearTimeout(this.lineTimer);this.q('.scenario-dialogue').hidden=true;const fn=this.afterDialogue;this.afterDialogue=null;fn?.()}
 command(type){
  if(this.phase!=='play'||this.busy||this.done)return;const s=this.step();
  if(['inventory','move','craft','info'].includes(type)){let panel=type;if(type==='info'){if(s.view==='character'||s.view==='room')panel='settings';else if(s.action==='roster')panel='roster';else if(s.action==='event_choice')panel='event';else if(s.view==='result')panel='result';else if(s.action==='read'&&['effects','all_effects'].includes(s.view))panel='effects'}this.openPanel(panel);return}
  if(type!==s.action){this.q('.scenario-feedback').textContent='현재 목표: '+s.button;return}this.act();
 }
 payload(){const s=this.step();return{...s.payload,...(s.payloadChoice?{choice:this.practice.choice}:{})}}
 act(action=this.step().action,payload=this.payload()){
  if(this.phase!=='play'||this.busy||this.done)return;const s=this.step(),p=this.practice;
  if(action==='inspect_effect'){this.describeEffect('bleed');return}
  if(action==='pickup_replace'||action==='pickup_discard'||action==='pickup_equipment'){this.resolvePickup(action==='pickup_discard'?'discard':'replace');return}
  if(action==='roster'){this.finish({ok:true});return}
  if(!s.engine){if(s.view==='room'){this.setup={region:this.q('#tutorialStart').value,ai:this.q('#tutorialAI').value};p.player.region=this.setup.region}this.finish(p.instant(action,payload,this.now()));return}
  if(s.requireKill&&!p.player.encounter){p.enemy.region=p.player.region;p.player.encounter={kind:'player',targetId:p.enemy.playerId}}
  const r=p.begin(action,payload,this.now());if(!r.ok){this.error(r.error);return}this.closePanel();if(!p.player.pendingAction){this.finish(r);return}
  this.busy=true;this.phase='action';this.q('.scenario-loading').hidden=false;this.paintControls();
  const resolve=()=>{const a=p.player.pendingAction;if(!a)return;if(this.now()<a.completeAt){this.later(resolve,a.completeAt-this.now());return}const result=p.complete(this.now());if(!result){this.later(resolve,50);return}this.busy=false;this.phase='play';this.q('.scenario-loading').hidden=true;this.enemyReaction(result);if(!result.ok){this.paintControls();this.error(result.error);return}if(s.requireKill&&p.enemy.alive){this.paint();this.q('.scenario-feedback').textContent='공격이 빗나갔다. 다시 공격해 보자.';return}this.finish(result)};
  this.later(resolve,Math.max(0,p.player.pendingAction.completeAt-this.now()));this.paint();
 }
 enemyReaction(result){if(!['attack','skill','flee'].includes(result?.type))return;const el=this.q('.scenario-enemy');this.enemyFading=true;el.hidden=false;this.sprite?.(el.querySelector('canvas'),el.querySelector('span'),this.practice.enemy.charId,this.practice.enemy.playerName,'standing',result.type!=='flee'&&result.hit!==false?'contempt':'neutral');el.classList.remove('scenario-fade');this.later(()=>el.classList.add('scenario-fade'),30);this.later(()=>{el.hidden=true;el.classList.remove('scenario-fade');this.enemyFading=false},850)}
 finish(result,message){
  if(!result?.ok){this.error(result?.error);return}this.done=true;this.busy=false;this.phase='play';this.closePanel();this.paint();
  const text=message||this.describeResult(result);this.q('.scenario-feedback').textContent=text;
  this.later(()=>this.dialogue([['u',text]],()=>{if(this.index+1<this.chapterInfo().steps.length){this.index++;this.enterStep()}else this.dialogue(this.scene().outro,()=>this.completeChapter())}),850);
 }
 completeChapter(){this.phase='result';this.pause(true);this.completed.add(this.chapterInfo().id);this.save();this.q('.scenario-dialogue').hidden=true;this.q('.scenario-result').hidden=false;this.q('.scenario-result-text').textContent=this.chapterInfo().title+' 수료 · '+(this.storageWarning||'수료 기록을 저장했습니다.');this.q('[data-tut="next-chapter"]').textContent=this.chapter===TUTORIAL_CHAPTERS.length-1?'프롤로그 다시 플레이':'다음 시나리오';this.paintControls()}
 openPanel(kind){if(this.phase!=='play'||this.busy||this.done)return;this.panel=kind;this.q('.scenario-panel').hidden=false;this.paintPanel(kind)}
 closePanel(){this.panel=null;const p=this.q('.scenario-panel');if(p)p.hidden=true}
 paintPanel(kind){
  const p=this.practice.player,v=this.practice.snapshot(this.now()),s=this.step(),body=this.q('.scenario-panel-body');this.q('.scenario-panel-title').textContent=({move:'이동',craft:'제작',inventory:'인벤토리',info:'정보',settings:'출전 준비',effects:'효과 확인',roster:'참가자 소개',result:'결산',event:'특수 이벤트'})[kind]||'';
  if(kind==='settings'){
   if(s.view==='character'){const c=this.practice.characters.find(c=>c.id===p.charId);body.innerHTML=`<label for="tutorialCharacter">캐릭터</label><select id="tutorialCharacter">${this.practice.characters.map(c=>`<option value="${c.id}" ${c.id===p.charId?'selected':''}>${tutEscape(c.name)}</option>`).join('')}</select><div class="scenario-card"><b>${tutEscape(c.name)}</b><p>패시브 · ${tutEscape(c.passive)}<br>${tutEscape(c.passiveEffectText)}</p><p>전투 · ${tutEscape(c.combat)}<br>${tutEscape(c.combatEffectText)}</p><p>추가 행동 · ${tutEscape(c.action)}<br>${tutEscape(c.actionEffectText)}</p></div><button type="button" data-tut="act">이 캐릭터로 준비</button>`}
   else body.innerHTML=`<label for="tutorialStart">시작 지역</label><select id="tutorialStart">${this.practice.regions.map(r=>`<option value="${r.id}">${tutEscape(r.name)}</option>`).join('')}</select><label for="tutorialAI">AI 수</label><select id="tutorialAI"><option value="fill">남은 인원 채우기</option><option value="none">없음</option><option value="3">3명</option></select><button type="button" data-tut="act">설정하고 준비</button>`;
  }else if(kind==='event'){const event=this.practice.match.eventCatalog.find(e=>e.id===p.pendingEvent);body.innerHTML='<h3>'+tutEscape(event?.name||'버려진 보급품')+'</h3>'+(event?.choices||[]).map((c,i)=>`<div class="scenario-card"><button type="button" data-tut-event="${i}" ${s.payload?.index!==i?'disabled':''}>${tutEscape(c.label)}</button><p>${tutEscape(c.result.replace(/시간 \+(\d+)초/g,'대기 $1초'))}</p></div>`).join('');
  }else if(kind==='move'){
   body.innerHTML=this.practice.regions.map(r=>{const locked=v.match.regionRestrictions.locked.includes(r.id),connected=v.adjacent.includes(r.id),garden=v.match.regionGardens?.[r.id]?.until>this.now();return`<button type="button" data-tut-destination="${r.id}" ${!connected||locked?'disabled':''} class="${garden?'scenario-garden':''} ${s.payload?.to===r.id?'scenario-target':''}">${tutEscape(r.name)}${r.id===p.region?' · 현재':locked?' · 잠금':!connected?' · 연결 안 됨':''}</button>`}).join('')+(['lock_preview','final_preview'].includes(s.action)?`<button type="button" data-tut="act">${tutEscape(s.button)}</button>`:'');
  }else if(kind==='craft'){
   const id=s.payload?.id||'gun',it=this.practice.items[id];body.innerHTML=`<div class="scenario-card"><b>${tutEscape(it.n)}</b><p>${tutEscape(it.t==='e'?(it.equipKind==='weapon'?'무기':'장비'):'소모품')} · ${tutEscape(it.effectText||'공격력 '+(it.atk||0)+' / 방어력 '+(it.def||0))}</p><ul>${Object.entries(it.r||{}).map(([id,n])=>`<li>${tutEscape(this.practice.items[id]?.n||id)} ×${n}</li>`).join('')}</ul><p>${v.favorites.length?'★ 목표에 등록됨':'제작 트리에서 재료를 확인하세요.'}</p></div>${s.action==='favorite'?'<button type="button" data-tut="act">★ 즐겨찾기 등록</button>':`<button type="button" data-tut-craft="${id}" ${s.action!=='craft'?'disabled':''}>제작</button>`}`;
  }else if(kind==='inventory'){
   const pickup=p.pendingPickup;body.innerHTML=`<h4>장착 ${p.eq.length}/3</h4>${p.eq.map((id,i)=>`<div class="scenario-card">${tutEscape(this.practice.items[id]?.n||id)}${s.action==='inventory'&&s.payload.id===id&&s.payload.index===i?` <button type="button" data-tut="act">${s.payload.mode==='drop_equipment'?'버리기':'분해'}</button>`:''}</div>`).join('')}<h4>소모품 ${Object.keys(p.con).length}/3</h4>${Object.entries(p.con).map(([id,n])=>`<div class="scenario-card">${tutEscape(this.practice.items[id]?.n||id)} ×${n}${s.action==='use_item'&&s.payload.id===id?' <button type="button" data-tut="act">사용</button>':''}</div>`).join('')}<h4>재료</h4><p>${Object.entries(p.mat).map(([id,n])=>tutEscape(this.practice.items[id]?.n||id)+' ×'+n).join(' · ')||'없음'}</p>${pickup?`<div class="scenario-card"><b>발견: ${tutEscape(pickup.name)}</b><p>남길 물품을 직접 선택하세요.</p><button type="button" data-tut-choice="replace" ${s.action==='pickup_discard'?'disabled':''}>${pickup.kind==='equipment'?'기존 총':'기존 생수'}를 버리고 획득</button><button type="button" data-tut-choice="discard" ${s.action!=='pickup_discard'?'disabled':''}>발견한 물품 버리기</button></div>`:''}`;
  }else if(kind==='effects')body.innerHTML='<p>화면 중앙 아래 원형 아이콘을 눌러 설명을 확인하세요.</p><button type="button" data-tut="act">효과 확인 완료</button>';
  else if(kind==='roster'){const count=this.setup?.ai==='none'?0:this.setup?.ai==='3'?3:10;body.innerHTML=`<p>당신 · ${tutEscape(this.practice.characters.find(c=>c.id===p.charId).name)}</p>${this.practice.characters.filter(c=>!c.testOnly).slice(0,count).map((c,i)=>`<p>AI ${i+1} · ${tutEscape(c.name)}</p>`).join('')}<button type="button" data-tut="act">준비 완료 · 시작</button>`}
  else if(kind==='result')body.innerHTML=`<h3>시나리오 승리</h3><p>처치 ${p.kills} · 남은 HP ${Math.ceil(p.hp)}</p><button type="button" data-tut="act">결산 확인</button>`;
  else body.innerHTML=`<p>${tutEscape(this.practice.characters.find(c=>c.id===p.charId).name)} · 생존</p><p>${tutEscape(this.practice.enemy.playerName)} · ${this.practice.enemy.alive?'생존':'대련 종료'}</p>${['trace_clear','lock_preview','final_preview'].includes(s.action)?`<button type="button" data-tut="act">${tutEscape(s.button)}</button>`:''}`;
 }
 chooseMove(id){if(this.phase!=='play'||this.step().action!=='move'||id!==this.step().payload.to)return;this.act('move',{to:id})}
 chooseCraft(id){if(this.phase!=='play'||this.step().action!=='craft'||id!==this.step().payload.id)return;this.act('craft',{id})}
 resolvePickup(choice){if(this.phase!=='play'||this.busy)return;const s=this.step(),p=this.practice.player;if(!s.action.startsWith('pickup_'))return;if((s.action==='pickup_discard')!==(choice==='discard'))return;this.finish(this.practice.instant('inventory',{mode:'resolve_pickup',token:p.pendingPickup?.token,choice,...(s.action==='pickup_replace'?{replaceId:'water'}:{}),...(s.action==='pickup_equipment'?{replaceIndex:0,replaceId:'basic_gun'}:{})},this.now()))}
 describeEffect(id){if(!this.active)return;const row=this.effectRows?.[id]||{stacks:id==='bleed'?3:1},d=this.effects[id],el=this.q('.scenario-effect-bubble');el.hidden=false;el.textContent=(d?.name||row.name||'고유 효과')+' · '+(d?.describe(row.stacks||1)||row.description||'캐릭터 고유 효과');if(this.phase==='play'&&!this.done&&this.step().action==='inspect_effect'&&id==='bleed')this.finish({ok:true},'출혈 설명을 확인했어. 이번에는 이동 뒤 중첩을 비교해 보자.')}
 paint(){
  if(!this.active)return;const v=this.practice.snapshot(this.now()),p=v.self,m=v.match,s=this.step(),region=this.practice.regions.find(r=>r.id===p.region)?.name||p.region;this.q('.scenario-background').style.backgroundImage=`url("${this.background(p.region)}")`;this.q('.scenario-region').textContent=region+' · '+Math.floor(Math.max(0,this.now()-m.startedAt)/60000).toString().padStart(2,'0')+':'+Math.floor(Math.max(0,this.now()-m.startedAt)/1000%60).toString().padStart(2,'0');
  this.q('.scenario-objective').textContent=this.phase==='result'?'시나리오 수료':`목표 ${this.index+1}/${this.chapterInfo().steps.length} · ${s.title}${this.done?' ✓':''}`;
  const bar=(label,value,max)=>`<div><span>${label}</span><meter min="0" max="${max}" value="${Math.max(0,value)}"></meter><b>${Math.ceil(value)} / ${Math.ceil(max)}</b></div>`;this.q('.scenario-vitals').innerHTML=`<b>${tutEscape(this.practice.characters.find(c=>c.id===p.charId).name)}</b>${bar('HP',p.hp,p.maxHp)}${bar('SP',p.sp,p.maxSp)}${bar('포만도',p.satiety,100)}<small>공격력 ${p.atk.toFixed(1)} · 방어력 ${p.def.toFixed(1)}</small>`;
  if(this.playerSpriteKey!==p.charId){this.playerSpriteKey=p.charId;const el=this.q('.scenario-player-portrait');this.sprite?.(el.querySelector('canvas'),el.querySelector('span'),p.charId,'플레이어','upperbody')}
  this.q('.scenario-contacts').innerHTML=(p.enemyContacts||[]).map(e=>`<div>${tutEscape(e.name)} · HP ${e.hp===null?'?':Math.ceil(e.hp)}</div>`).join('');
  const enemy=this.q('.scenario-enemy');if(!this.enemyFading){const visible=!!p.encounter;enemy.hidden=!visible;if(visible&&this.enemySpriteKey!==this.practice.enemy.charId){this.enemySpriteKey=this.practice.enemy.charId;this.sprite?.(enemy.querySelector('canvas'),enemy.querySelector('span'),this.practice.enemy.charId,this.practice.enemy.playerName,'standing','neutral')}}
  const rows={...p.statuses,...p.buffs};this.effectRows=rows;const shown=s.view==='all_effects'?Object.fromEntries(Object.keys(this.effects).filter(k=>['poison','bleed','slow','bind','sleep','fear','confusion','silence','actionDelay'].includes(k)).map(k=>[k,{stacks:k==='bleed'?3:1,until:null}])):rows;
  const key=Object.entries(shown).filter(([,r])=>r.until===null||r.until>this.now()).map(([id,r])=>id+':'+r.stacks+':'+r.until).join('|');if(this.effectKey!==key){this.effectKey=key;this.q('.scenario-effects').innerHTML=Object.entries(shown).filter(([,r])=>r.until===null||r.until>this.now()).map(([id,r])=>`<button type="button" data-tut-effect="${tutEscape(id)}" aria-label="${tutEscape(this.effects[id]?.name||r.name||'고유 효과')}"><svg viewBox="0 0 24 24" aria-hidden="true">${this.effects[id]?.icon||'<circle cx="12" cy="12" r="8"/>'}</svg>${r.stacks>1?`<small>${r.stacks}</small>`:''}</button>`).join('')}
  for(const b of this.q('.scenario-effects').querySelectorAll('[data-tut-effect]')){const r=shown[b.dataset.tutEffect];b.style.setProperty('--scenario-ring',(r.until===null?360:Math.max(0,(r.until-this.now())/(r.durationMs||10000)*360))+'deg')}
  this.q('.scenario-loading').textContent=(s.action==='event_choice'?'조사':({search:'탐색',attack:'공격',skill:'스킬 사용',char_action:'추가 행동',move:'이동',craft:'제작',rest:'휴식',use_item:'소모품 사용',flee:'도주'})[s.action]||s.button)+' 중'+'.'.repeat(Math.floor(Date.now()/400)%3+1);
  this.paintControls(v);
 }
 paintControls(view){
  if(!this.active)return;const s=this.step(),v=view||this.practice.snapshot(this.now());let target=s.action;
  if(['use_item','inventory','pickup_replace','pickup_discard','pickup_equipment'].includes(target))target='inventory';if(target==='favorite'||s.action==='craft')target='craft';if(['lock_preview','final_preview'].includes(target))target='move';if(target==='trace_clear'||target==='event_choice'||target==='roster'||s.action==='read')target='info';
  for(const b of this.q('.scenario-commands').querySelectorAll('[data-tut-command]')){const id=b.dataset.tutCommand;b.disabled=this.phase!=='play'||this.busy||this.done;b.classList.toggle('scenario-target',id===target);const cd=b.querySelector('.scenario-cooldown');if(cd){const left=id==='skill'?v.self.cdC:v.self.cdA,total=id==='skill'?(v.self.cdCDuration||60):(v.self.cdADuration||30);cd.hidden=left<=0;cd.style.setProperty('--scenario-ring',Math.min(1,left/total)*360+'deg')}}
  const cycle=this.q('[data-tut="cycle"]');cycle.hidden=!v.choice;cycle.disabled=this.phase!=='play'||s.action!=='cycle'||this.done;cycle.textContent='종류: '+(v.choiceLabel||'변경');cycle.classList.toggle('scenario-target',s.action==='cycle');
 }
 describeResult(r){if(r.hit===false)return '이번 공격은 빗나갔네. 결과를 확인한 다음 행동을 정하면 돼.';if(r.itemName)return `${r.itemName} 완성. 재료와 장착칸이 바뀐 걸 확인했지?`;if(r.damage!==undefined)return `상대에게 ${r.damage} 피해를 줬어. 지금 표시된 체력은 이 행동의 결과야.`;if(r.type==='trace_clear')return '상대의 흔적이 사라졌어. 남아 있던 정보도 지워졌네.';if(r.type==='event_choice')return '조사가 끝났어. 기다린 뒤에 보상이 들어왔지?';return '좋아. 방금 바뀐 상태를 기억하고 다음 장면으로 가자.'}
 error(code){this.q('.scenario-feedback').textContent=({bound:'속박 중에는 이동과 도주를 시작할 수 없습니다.',skill_cooldown:'아직 전투 스킬 쿨타임 중입니다.',action_cooldown:'아직 추가 행동 쿨타임 중입니다.',asleep:'수면 중에는 행동할 수 없습니다.'})[code]||'현재 상태로 실행할 수 없습니다. 물품과 효과를 확인하거나 시나리오를 다시 시작하세요.'}
}
