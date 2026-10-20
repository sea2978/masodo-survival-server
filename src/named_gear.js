// Shared item text and runtime effects. Wearer-independent miniature character mechanics.
const D=(owner,fx,gimmick,text)=>({owner,fx,gimmick,text});
export const NAMED_ITEMS={
 near_final_01:D('c02',{}, {rows:[['fear',.2]]},'거짓 선언: 적중 시 20%로 공포 시도 · 효과 재사용 15초'),
 near_final_02:D('c07',{detect:.15},{chargeEvent:'search',cap:1,bonus:.15},'아바타 잔상: 탐색 완료로 잔상 1개 · 다음 전투 스킬 피해 +15% 후 소모'),
 near_final_03:D('c09',{taken:-.15},{rows:[['bind',.2]],skillOnly:true},'모발 포박: 받는 피해 −15% · 전투 스킬 적중 시 20%로 속박 시도 · 15초'),
 near_final_04:D('c10',{skillSpFlat:1},{chargeEvent:'hit',cap:2,bonus:.1},'미니 뷰어쉽: 일반 공격 적중으로 주목 최대 2개 · 다음 전투 스킬에 개당 피해 +10% 후 소모 · 스킬 SP −1'),
 near_final_05:D('c12',{statusChance:.15,statusTargetDamage:.15},{rows:[['talisman',.2]]},'부적: 상태이상 대상 피해 +15%·상태 부여 확률 +15%p · 적중 시 기본 20%로 부적 표식 시도 · 15초'),
 near_final_06:D('c14',{prep:-.15},{rows:[['actionDelay',.2]],skillOnly:true},'느린 초침: 공격 준비 −15% · 스킬 적중 시 20%로 행동지연 시도 · 15초'),
 near_final_07:D('c16',{}, {chargeEvent:'search',cap:2,bonus:.1},'작은 팔레트: 탐색 완료로 물감 최대 2개 · 다음 전투 스킬에 개당 피해 +10% 후 소모'),
 near_final_08:D('c21',{prep:-.15},{chargeEvent:'move',cap:1,bonus:.15},'휴대 기어: 공격 준비 −15% · 이동 완료 후 다음 전투 스킬 피해 +15%'),
 near_final_09:D('c22',{skillHit:.15},{mark:true},'별 추적: 스킬 명중 +15%p · 적중한 대상을 12초 기억 · 그 대상에 대한 명중 +15%p'),
 near_final_10:D('c25',{searchLoot:.15},{chargeEvent:'miss',cap:2,bonus:.1},'작은 천운: 아이템 발견 +15%p · 빗나감으로 행운 최대 2개 · 다음 스킬에 개당 피해 +10%'),
 near_final_11:D('c26',{restHeal:.2},{actionShield:'rest',shield:.06},'방패꽃: 휴식 회복 +20% · 휴식 완료 시 최대 HP 6% 보호막 8초 · 재사용 15초'),
 near_final_12:D('c40',{conceal:.15},{rows:[['fear',.25]]},'귀면: 피탐지 −15%p · 적중 시 25%로 공포 시도 · 재사용 15초'),
 near_final_13:D('c41',{heal:.15},{castHeal:5},'생체 적응: 회복량 +15% · 전투 스킬 발사 시 HP 5 회복 · 재사용 15초'),
 near_final_14:D('c43',{poisonVsDamage:.15},{rows:[['poison',.25]]},'희석 맹독: 독 대상 피해 +15% · 적중 시 25%로 독 1중첩 시도 · 15초'),
 near_final_15:D('c45',{restSp:.2},{rows:[['sleep',.2]],skillOnly:true},'꿈결: 휴식 SP 회복 +20% · 스킬 적중 시 20%로 수면 시도 · 15초'),
 near_final_16:D('c47',{moveTime:-.15},{rows:[['fragrance',.2]]},'하피 잔향: 이동시간 −15% · 적중 시 20%로 향기(공격력 −20%) 시도 · 15초'),
 near_final_17:D('c49',{killHeal:6},{chargeEvent:'food',cap:2,bonus:.1},'작은 포식: 음식 섭취로 포식 최대 2개 · 다음 스킬에 개당 피해 +10% · 처치 HP +6'),
 final_01:D('c01',{searchLoot:.2,restHeal:.2},{rows:[['bind',.25],['actionDelay',.25]],skillOnly:true},'정원 잔재: 아이템 발견·휴식 회복 +20% · 스킬 적중 시 속박·행동지연 각각 25% 시도 · 효과 재사용 20초'),
 final_02:D('c03',{heal:.2},{castShield:.1},'작은 성벽: 회복량 +20% · 스킬 발사 시 최대 HP 10% 보호막 8초 · 20초'),
 final_03:D('c04',{taken:-.15,moveTime:-.15},{castShield:.12},'방어 모듈: 받는 피해·이동시간 −15% · 스킬 발사 시 최대 HP 12% 보호막 8초 · 20초'),
 final_04:D('c05',{}, {chargeEvent:'hit',cap:2,bonus:.15},'흑뢰 충전: 일반 공격 적중으로 최대 2충전 · 다음 스킬에 충전당 피해 +15% 후 소모'),
 final_05:D('c06',{hit:.15,prep:-.15},{},'정밀 찌르기: 명중 +15%p · 공격 준비시간 −15%'),
 final_06:D('c08',{statusChance:.15},{randomCast:true},'정령의 선물: 상태 부여 +15%p · 스킬 발사 시 HP 6/SP 6/최대 HP 8% 보호막 중 무작위 1개 · 20초'),
 final_07:D('c11',{afterMoveDamage:.2},{rows:[['slow',.3]]},'하얀 파도: 이동 후 8초 내 첫 공격 피해 +20% · 적중 시 30%로 둔화 시도 · 20초'),
 final_08:D('c13',{statusTargetDamage:.15},{castHeal:8},'치유의 빛 조각: 상태이상 대상 피해 +15% · 스킬 발사 시 HP 8 회복 · 20초'),
 final_09:D('c15',{hit:.2,detect:.2},{mark:true},'초감각: 명중·탐지 +20%p · 적중한 대상을 12초 기억 · 그 대상에 명중 +15%p'),
 final_10:D('c17',{poisonVsDamage:.2},{rows:[['poison',.3]]},'독공 잔류: 독 대상 피해 +20% · 적중 시 30%로 독 1중첩 시도 · 20초'),
 final_11:D('c18',{moveTime:-.15},{chargeEvent:'move',cap:2,bonus:.15},'로시난테의 발굽: 이동시간 −15% · 이동으로 기세 최대 2개 · 다음 스킬에 개당 피해 +15%'),
 final_12:D('c19',{killHeal:6,killSp:6},{chargeEvent:'kill',cap:2,bonus:.15},'혼령 수집: 처치 HP·SP +6 · 혼령 최대 2개 · 다음 스킬에 개당 피해 +15%'),
 final_13:D('c20',{detect:.2,skillHit:.15},{mark:true},'축소 천리안: 탐지 +20%p·스킬 명중 +15%p · 적중한 대상을 12초 기억 · 그 대상에 명중 +15%p'),
 final_14:D('c23',{taken:-.15,damage:.15},{},'양날의 공방: 주는 피해 +15% · 받는 피해 −15%'),
 final_15:D('c24',{prep:-.15},{basicHits:2,basicRatio:.6},'연속 타격: 일반 공격이 60% 위력씩 2연타(각각 명중 판정, 간격 0.2초) · 전투 스킬은 유지 · 공격 준비 −15%'),
 final_16:D('c27',{skillSpFlat:2,skillDamage:.15},{randomCast:true},'축소 랜덤 캐스트: 스킬 SP −2·피해 +15% · 발사 시 HP 6/SP 6/최대 HP 8% 보호막 중 무작위 1개 · 20초'),
 final_17:D('c37',{lowHpDamage:.2},{hurtShield:.15,interval:45},'윤회의 잔재: HP 40% 미만 피해 +20% · HP 40% 미만 피격 시 최대 HP 15% 보호막 8초 · 45초(부활 없음)'),
 final_18:D('c38',{hit:.15,crit:.15},{mark:true},'검성의 칼끝: 명중·치명타 확률 +15%p · 적중한 대상을 12초 기억 · 그 대상에 명중 +15%p'),
 final_19:D('c39',{damage:.15,prep:.05},{chargeEvent:'hit',cap:2,bonus:.1},'증폭 회로: 피해 +15%·공격 준비 +5% · 일반 공격 적중으로 최대 2증폭 · 다음 스킬에 개당 피해 +10%'),
 final_20:D('c42',{incomingStatusDuration:-.2,statusChance:.2},{rows:[['awe',.2]],skillOnly:true},'작은 용의 위압: 받는 상태시간 −20%·상태 부여 +20%p · 스킬 적중 시 기본 20%로 공격력 −20% 시도 · 20초'),
 final_21:D('c44',{damage:.2,prep:.15},{castShield:.08},'기사장의 버팀: 피해 +20%·공격 준비 +15% · 스킬 발사 시 최대 HP 8% 보호막 8초 · 20초'),
 final_22:D('c46',{hit:.15},{rows:[['confusion',.3]]},'미스디렉션: 명중 +15%p · 적중 시 30%로 혼란 시도 · 20초'),
 final_23:D('c48',{statusTargetDamage:.15},{rows:[['silence',.25],['bind',.2]],skillOnly:true},'작은 봉쇄: 상태이상 대상 피해 +15% · 스킬 적중 시 침묵 25%·속박 20% 각각 시도 · 20초'),
 final_24:D('c50',{}, {castHeal:5,castSp:5,rows:[['slow',.25]]},'수류 순환: 스킬 발사 시 HP·SP +5 · 적중 시 25%로 둔화 시도 · 각 재사용 20초')
};
export const NAMED_GEAR_EFFECTS=Object.fromEntries(Object.entries(NAMED_ITEMS).map(([id,d])=>[id,d.fx]));
export function applyItemRework(items,events=[]){
 items.basic_boots={n:'전투 부츠',t:'e',weaponType:'방어구',equipKind:'equipment',tier:'고급',r:{leather:1,rubber:1}};
 items.rare_boots={n:'강화 전투 부츠',t:'e',weaponType:'방어구',equipKind:'equipment',tier:'희귀',r:{basic_boots:1,steel:1,mana_fiber:1}};
 const fixes={near_final_02:{n:'페더파일의 광선총',weaponType:'총',equipKind:'weapon',r:{gun:1,special_07:1}},near_final_03:{n:'헤드라의 모발 부츠',weaponType:'방어구',equipKind:'equipment',r:{rare_boots:1,special_09:1}},final_09:{n:'녹투아의 일본도'},final_18:{n:'하나린의 검',weaponType:'검',r:{blade:1,special_29:1}}};
 for(const[id,v]of Object.entries(fixes))Object.assign(items[id],v);
 for(const[id,it]of Object.entries(items))if(it.t==='e'){
  const grade=it.tier==='최종'?4:it.tier==='준최종'?3:['희귀','희귀 시너지'].includes(it.tier)?2:1;
  if(it.equipKind==='weapon'){it.atk=[0,8,18,25,34][grade]+(['중량무기','둔기'].includes(it.weaponType)?2:it.weaponType==='단검'?-1:0);it.def=0;}
  else{it.atk=0;it.def=[0,8,18,25,34][grade]-(it.weaponType==='장신구'?4:0);}
  // Small secondary bonuses follow the item's physical role, never its category.
  if(it.equipKind==='weapon'){
   if(it.weaponType==='권갑'||it.weaponType==='마법서')it.def=[0,1,2,3,4][grade];
   const guards={final_01:4,final_02:3,final_06:2,final_11:2,final_14:4,final_21:4,near_final_11:3};
   if(guards[id])it.def=guards[id];
  }else{
   if(it.weaponType==='도구')it.atk=[0,1,2,3,4][grade];
   if(it.weaponType==='병기')it.atk=[0,1,3,4,5][grade];
   if(['basic_boots','rare_boots','near_final_03'].includes(id))it.atk=[0,1,2,3,4][grade];
  }
  if(NAMED_ITEMS[id]){it.effectText=NAMED_ITEMS[id].text+(NAMED_ITEMS[id].gimmick.chargeEvent?' · 충전 획득 간격 2초':'')+' · 동일 아이템의 고유 효과는 중복 발동하지 않음';it.namedOwner=NAMED_ITEMS[id].owner;}
 }
 items.carbonara_mint_fish.effectText='아바돈: HP·SP·포만도 최대 + 모든 장착 장비 소실 + 포식 3 즉시 획득(재료·다른 소모품 보존) · 아바돈 이외: 섭취 시 즉사';
 const renames={};for(const[id,n]of Object.entries({special_07:'아바타 광선총 코어',special_09:'모발 제어 부츠 조각',special_29:'월광 검편'})){renames[items[id].n]=n;items[id].n=n;}
 const rewrite=value=>{if(typeof value==='string'){for(const[a,b]of Object.entries(renames))value=value.split(a).join(b);return value;}if(Array.isArray(value))return value.map(rewrite);if(value&&typeof value==='object')for(const k of Object.keys(value))value[k]=rewrite(value[k]);return value;};for(const e of events)rewrite(e);
}
