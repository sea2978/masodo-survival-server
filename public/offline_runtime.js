// Generated from the current authoritative game modules. No runtime downloads.
const OfflineRuntime=(()=>{
class DurableObject{constructor(ctx){this.ctx=ctx}}
class WebSocketRequestResponsePair{}
const __modules={"cloudflare:workers":{DurableObject}};
__modules["src/named_gear.js"]=(()=>{
// Shared item text and runtime effects. Wearer-independent miniature character mechanics.
const D=(owner,fx,gimmick,text)=>({owner,fx,gimmick,text});
const NAMED_ITEMS={
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
const NAMED_GEAR_EFFECTS=Object.fromEntries(Object.entries(NAMED_ITEMS).map(([id,d])=>[id,d.fx]));
function applyItemRework(items,events=[]){
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


return {NAMED_ITEMS,NAMED_GEAR_EFFECTS,applyItemRework};
})();
__modules["src/item_classification.js"]=(()=>{
// A stat bonus does not decide whether an item is a weapon or wearable equipment.
const WEAPON_ITEM_TYPES=['검','단검','창','둔기','낫','권갑','활','총','투척무기','중량무기','특수무기','마도구','마법서'];
function equipmentKind(it){
 if(it?.t!=='e')return null;
 if(it.equipKind==='weapon'||it.equipKind==='equipment')return it.equipKind;
 return WEAPON_ITEM_TYPES.includes(it.weaponType)?'weapon':'equipment';
}
function itemClassLabel(it){return it?.t==='m'?'재료':it?.t==='c'?'소모품':equipmentKind(it)==='weapon'?'무기':equipmentKind(it)==='equipment'?'장비':'기타';}
function itemClassIcon(it){return it?.t==='m'?'M':it?.t==='c'?'C':equipmentKind(it)==='weapon'?'W':equipmentKind(it)==='equipment'?'E':'I';}


return {WEAPON_ITEM_TYPES,equipmentKind,itemClassLabel,itemClassIcon};
})();
__modules["src/offline_content.js"]=(()=>{
const {applyItemRework}=__modules["src/named_gear.js"];
const {equipmentKind}=__modules["src/item_classification.js"];
// Generated from public/offline.html v0.6.4. Keep this server copy authoritative for online matches.
const ITEMS={"iron":{"n":"철조각","t":"m","tier":"일반"},"glass":{"n":"유리조각","t":"m","tier":"일반"},"rubber":{"n":"고무","t":"m","tier":"일반"},"wire":{"n":"철사","t":"m","tier":"일반"},"battery":{"n":"배터리","t":"m","tier":"일반"},"electronics":{"n":"전자부품","t":"m","tier":"일반"},"cloth":{"n":"질긴 천","t":"m","tier":"일반"},"medicine":{"n":"약품","t":"c","heal":22,"tier":"일반","kind":"medicine","useTime":1.2,"combatEff":0.85},"water":{"n":"생수","t":"c","sp":12,"effectText":"SP +12 · 포만도 +5","tier":"일반","kind":"drink","sat":5,"useTime":1.2,"combatEff":0.75},"bread":{"n":"빵","t":"c","heal":10,"effectText":"HP +10 · 포만도 +15","tier":"일반","kind":"food","sat":15,"useTime":1.2,"combatEff":0.75},"canned":{"n":"통조림","t":"c","heal":14,"effectText":"HP +14 · 포만도 +18","kind":"food","sat":18,"useTime":1.2,"combatEff":0.75},"chocolate":{"n":"초콜릿","t":"c","sp":10,"effectText":"SP +10 · 포만도 +10 · 15초간 이동속도 +5%","tier":"일반","kind":"food","sat":10,"useTime":1.2,"combatEff":0.75},"silver":{"n":"은괴","t":"m","tier":"일반"},"crystal":{"n":"수정","t":"m","tier":"일반"},"mana_ink":{"n":"마력잉크","t":"m","tier":"일반"},"mana_fiber":{"n":"마력섬유","t":"m","tier":"일반"},"leather":{"n":"가죽","t":"m","tier":"일반"},"precision":{"n":"정밀부품","t":"m","tier":"일반"},"mana_stone":{"n":"마력석","t":"m","tier":"일반"},"steel":{"n":"강철판","t":"m","tier":"일반"},"alloy":{"n":"특수합금","t":"m","tier":"일반"},"machine":{"n":"기계부품","t":"m","tier":"일반"},"toxin":{"n":"독성물질","t":"m","tier":"일반"},"wood":{"n":"강화목재","t":"m","tier":"일반"},"stick":{"n":"나무막대","t":"m","tier":"일반"},"gunpowder":{"n":"화약","t":"m","tier":"일반"},"aim_terminal":{"n":"전술 조준 단말","t":"e","def":18,"r":{"electronics":1,"precision":1,"battery":1},"fx":"tracking","tier":"희귀 시너지","effectText":"탐지한 적을 20초 표식(장비 보정으로 24초) · 표식 대상 첫 공격 명중률 +5% · 추적 정보 지속시간 +20%","weaponType":"단말"},"camo_mask":{"n":"저소음 위장 마스크","t":"e","def":19,"r":{"cloth":1,"mana_fiber":1},"fx":"stealth","tier":"희귀 시너지","effectText":"적에게 탐지될 확률 -7% · 8초 이상 공격하지 않았다면 다음 첫 적중 피해 +4%"},"toxin_kit":{"n":"독성 투여 키트","t":"e","def":17,"r":{"toxin":1,"medicine":1},"fx":"poison","tier":"희귀 시너지","effectText":"공격 적중 시 독 부여 확률 +6% · 독 상태 대상에게 주는 피해 +3%","weaponType":"도구"},"propulsion":{"n":"경량 추진 하네스","t":"e","def":18,"r":{"battery":1,"rubber":1,"machine":1},"fx":"mobility","tier":"희귀 시너지","effectText":"지역 이동 SP 소모 -1 · 이동 후 8초 이내 첫 공격 명중률 +4%"},"plate":{"n":"충격 흡수 플레이트","t":"e","def":22,"r":{"steel":1,"rubber":1},"fx":"bruiser","tier":"희귀 시너지","effectText":"HP 50% 이상일 때 받는 전투 피해 -3% · HP 50% 미만일 때 방어력 +4"},"recovery":{"n":"응급 회복 모듈","t":"e","def":18,"r":{"medicine":1,"mana_fiber":1},"fx":"sustain","tier":"희귀 시너지","effectText":"음식/약품 HP 회복량 +8% · 비전투 회복 효과 +5%"},"spell_amp":{"n":"술식 증폭 장신구","t":"e","def":18,"r":{"mana_stone":1,"crystal":1},"fx":"control","tier":"희귀 시너지","effectText":"가하는 상태이상 지속시간 +6% · 상태이상 부여 확률 +3%","weaponType":"장신구"},"accel":{"n":"반응 가속 모듈","t":"e","def":17,"r":{"precision":1,"battery":1},"fx":"rapid","tier":"희귀 시너지","effectText":"일반 공격 준비시간 -4% · 같은 대상을 연속 3회 적중하면 3번째 피해 +3%","weaponType":"단말"},"trace":{"n":"추적용 흔적 분석기","t":"e","def":17,"r":{"precision":1,"electronics":1},"fx":"tracking","tier":"희귀 시너지","effectText":"부상당한 적 탐지 확률 +8% · 같은 대상을 다시 탐지했을 때 첫 공격 명중률 +4%","weaponType":"단말"},"detox":{"n":"해독 방호 마스크","t":"e","def":20,"r":{"mana_fiber":1,"medicine":1},"fx":"poison","tier":"희귀 시너지","effectText":"받는 독 지속시간 -20% · 독 상태 적을 발견하면 20초간 자신이 탐지될 확률 -3%"},"evasion":{"n":"전술 회피 장치","t":"e","def":17,"r":{"precision":1,"rubber":1},"fx":"mobility","tier":"희귀 시너지","effectText":"도주 준비시간 -5% · 도주 성공 후 다음 지역 이동 SP 소모 0"},"focus":{"n":"집중 유지 부적","t":"e","def":17,"r":{"mana_ink":1,"mana_fiber":1},"fx":"control","tier":"희귀 시너지","effectText":"전투 스킬 SP 소모 -5% · 행동지연 저항 +10%","weaponType":"장신구"},"blade":{"n":"강화검","t":"e","atk":18,"r":{"basic_sword":1,"steel":1},"def":0,"tier":"희귀","weaponType":"검"},"spear":{"n":"강화창","t":"e","atk":18,"r":{"basic_spear":1,"steel":1},"def":0,"tier":"희귀","weaponType":"창"},"bow":{"n":"강화활","t":"e","atk":17,"r":{"basic_bow":1,"wood":1},"def":0,"tier":"희귀","weaponType":"활"},"gun":{"n":"강화총","t":"e","atk":19,"r":{"basic_gun":1,"machine":1},"def":0,"tier":"희귀","weaponType":"총"},"gauntlet":{"n":"강화권갑","t":"e","atk":16,"r":{"basic_gauntlet":1,"steel":1},"def":3,"tier":"희귀","weaponType":"권갑"},"ceramic":{"n":"세라믹","t":"m","tier":"일반"},"energy_drink":{"n":"에너지드링크","t":"c","sp":22,"effectText":"SP +22 · 포만도 +10 · 25초간 지역 이동 SP 소모 -1","tier":"고급","kind":"drink","sat":10,"useTime":1.2,"combatEff":0.75},"coffee":{"n":"커피","t":"c","sp":18,"effectText":"SP +18 · 포만도 +8 · 30초간 탐색 시간 -5%","tier":"고급","kind":"drink","sat":8,"useTime":1.2,"combatEff":0.75},"strong_coffee":{"n":"진한 커피","t":"c","sp":25,"effectText":"SP +25 · 포만도 +10 · 30초간 행동속도 +4% · 종료 후 20초 SP회복 -10%","tier":"희귀","kind":"drink","sat":10,"useTime":1.2,"combatEff":0.75,"r":{"coffee":2}},"sandwich":{"n":"샌드위치","t":"c","heal":12,"sp":12,"effectText":"HP +12 · SP +12 · 포만도 +20","tier":"고급","kind":"food","sat":20,"useTime":1.2,"combatEff":0.75,"r":{"bread":1,"canned":1}},"grilled_meat":{"n":"구운 고기","t":"c","heal":18,"effectText":"HP +18 · 포만도 +25 · 30초간 최대 HP +8","tier":"고급","kind":"food","sat":25,"useTime":1.2,"combatEff":0.75},"warm_soup":{"n":"따뜻한 수프","t":"c","heal":18,"effectText":"HP +18 · 포만도 +20 · 공포/혼란 지속시간 -20%","tier":"고급","kind":"food","sat":20,"useTime":1.2,"combatEff":0.75,"r":{"canned":1,"water":1}},"first_aid":{"n":"응급약","t":"c","heal":22,"effectText":"HP +22 · 전투 중 회복효율 85%","tier":"고급","kind":"medicine","useTime":1.2,"combatEff":0.85},"advanced_first_aid":{"n":"고급응급약","t":"c","heal":30,"effectText":"HP +30 · 전투 중 회복효율 80% · 사용시간 1.4초","tier":"희귀","kind":"medicine","useTime":1.4,"combatEff":0.8},"antidote":{"n":"해독제","t":"c","effectText":"독 2스택 제거 · 남은 독 지속시간 절반","tier":"고급","kind":"medicine","useTime":1.2,"combatEff":1},"bandage":{"n":"붕대","t":"c","heal":8,"effectText":"HP +8 · 출혈 2스택 제거","tier":"일반","kind":"medicine","useTime":1.2,"combatEff":0.85},"mint_choco_fish":{"n":"민트초코 붕어빵","t":"c","heal":16,"sp":8,"effectText":"HP +16 · SP +8 · 포만도 +20 · 하쿠/아바돈 특수 반응","tier":"희귀","kind":"food","sat":20,"useTime":1.2,"combatEff":0.75},"carbonara_mint_fish":{"n":"카르보나라 파스타 민트초코 붕어빵(성심담 에디션)","t":"c","heal":18,"sp":12,"effectText":"아바돈: HP·SP·포만도 최대 + 모든 아이템 소실 · 아바돈 이외: 섭취 시 즉사","tier":"희귀","kind":"food","sat":25,"useTime":1.2,"combatEff":0.75},"basic_sword":{"n":"검","t":"e","atk":8,"def":0,"r":{"iron":1,"stick":1},"tier":"고급","category":"무기","weaponType":"검"},"basic_dagger":{"n":"단검","t":"e","atk":7,"def":0,"r":{"iron":1,"rubber":1},"tier":"고급","category":"무기","weaponType":"단검"},"basic_spear":{"n":"창","t":"e","atk":8,"def":0,"r":{"stick":1,"iron":1},"tier":"고급","category":"무기","weaponType":"창"},"basic_blunt":{"n":"둔기","t":"e","atk":9,"def":0,"r":{"iron":1,"wood":1},"tier":"고급","category":"무기","weaponType":"둔기"},"basic_scythe":{"n":"낫","t":"e","atk":8,"def":0,"r":{"iron":1,"stick":1},"tier":"고급","category":"무기","weaponType":"낫"},"basic_gauntlet":{"n":"권갑","t":"e","atk":7,"def":2,"r":{"leather":1,"iron":1},"tier":"고급","category":"무기","weaponType":"권갑"},"basic_bow":{"n":"활","t":"e","atk":7,"def":0,"r":{"wood":1,"wire":1},"tier":"고급","category":"무기","weaponType":"활"},"basic_gun":{"n":"총","t":"e","atk":9,"def":0,"r":{"iron":1,"gunpowder":1},"tier":"고급","category":"무기","weaponType":"총"},"basic_throw":{"n":"투척무기","t":"e","atk":7,"def":0,"r":{"iron":1,"cloth":1},"tier":"고급","category":"무기","weaponType":"투척무기"},"basic_heavy":{"n":"중량무기","t":"e","atk":10,"def":0,"r":{"steel":1,"wood":1},"tier":"고급","category":"무기","weaponType":"중량무기"},"basic_special":{"n":"특수무기","t":"e","atk":8,"def":1,"r":{"machine":1,"iron":1},"tier":"고급","category":"무기","weaponType":"특수무기"},"basic_magic":{"n":"마도구","t":"e","atk":4,"def":4,"r":{"mana_stone":1,"stick":1},"tier":"고급","category":"장비","weaponType":"마도구"},"basic_grimoire":{"n":"마법서","t":"e","atk":3,"def":5,"r":{"mana_ink":1,"cloth":1},"tier":"고급","category":"장비","weaponType":"마법서"},"basic_terminal":{"n":"단말","t":"e","atk":2,"def":6,"r":{"electronics":1,"battery":1},"tier":"고급","category":"장비","weaponType":"단말"},"basic_mask":{"n":"가면","t":"e","atk":0,"def":7,"r":{"cloth":1,"glass":1},"tier":"고급","category":"장비"},"basic_accessory":{"n":"장신구","t":"e","atk":1,"def":6,"r":{"silver":1,"crystal":1},"tier":"고급","category":"장비"},"basic_tool":{"n":"도구","t":"e","atk":2,"def":5,"r":{"machine":1,"rubber":1},"tier":"고급","category":"장비","weaponType":"도구"},"basic_armament":{"n":"병기","t":"e","atk":3,"def":8,"r":{"steel":1,"machine":1},"tier":"고급","category":"장비","weaponType":"병기"},"rare_dagger":{"n":"강화단검","t":"e","atk":17,"def":0,"r":{"basic_dagger":1,"alloy":1},"tier":"희귀","weaponType":"단검"},"rare_blunt":{"n":"강화둔기","t":"e","atk":19,"def":0,"r":{"basic_blunt":1,"alloy":1},"tier":"희귀","weaponType":"둔기"},"rare_scythe":{"n":"강화낫","t":"e","atk":18,"def":0,"r":{"basic_scythe":1,"alloy":1},"tier":"희귀","weaponType":"낫"},"rare_throw":{"n":"강화투척무기","t":"e","atk":17,"def":0,"r":{"basic_throw":1,"alloy":1},"tier":"희귀","weaponType":"투척무기"},"rare_heavy":{"n":"강화중량무기","t":"e","atk":21,"def":0,"r":{"basic_heavy":1,"alloy":1},"tier":"희귀","weaponType":"중량무기"},"rare_special":{"n":"강화특수무기","t":"e","atk":18,"def":2,"r":{"basic_special":1,"alloy":1},"tier":"희귀","weaponType":"특수무기"},"rare_magic":{"n":"강화마도구","t":"e","atk":10,"def":8,"r":{"basic_magic":1,"alloy":1},"tier":"희귀","weaponType":"마도구"},"rare_grimoire":{"n":"고위마법서","t":"e","atk":9,"def":10,"r":{"basic_grimoire":1,"alloy":1},"tier":"희귀","weaponType":"마법서"},"rare_terminal":{"n":"강화단말","t":"e","atk":6,"def":12,"r":{"basic_terminal":1,"alloy":1},"tier":"희귀","weaponType":"단말"},"rare_mask":{"n":"주술가면","t":"e","atk":2,"def":13,"r":{"basic_mask":1,"alloy":1},"tier":"희귀"},"rare_accessory":{"n":"고급장신구","t":"e","atk":4,"def":12,"r":{"basic_accessory":1,"alloy":1},"tier":"희귀"},"rare_tool":{"n":"특수도구","t":"e","atk":6,"def":10,"r":{"basic_tool":1,"alloy":1},"tier":"희귀","weaponType":"도구"},"rare_armament":{"n":"강화병기","t":"e","atk":8,"def":14,"r":{"basic_armament":1,"alloy":1},"tier":"희귀","weaponType":"병기"},"special_01":{"n":"백색 양산살","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_02":{"n":"자수정 피어싱 조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_03":{"n":"성흔이 새겨진 철편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_04":{"n":"아레스 나노코어","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_05":{"n":"흑색 대검 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_06":{"n":"은빛 레이피어 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_07":{"n":"해킹 단말 칩","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_08":{"n":"성창의 금빛 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_09":{"n":"무언의 가면 조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_10":{"n":"아이돌 마이크 코어","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_11":{"n":"청해의 닻사슬","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_12":{"n":"여우 문양 부적지","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_13":{"n":"백은 칼날 조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_14":{"n":"고장 난 회중시계 부품","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_15":{"n":"검붉은 검편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_16":{"n":"마력이 밴 붓털","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_17":{"n":"당문 암기편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_18":{"n":"기사창 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_19":{"n":"검은 낫날 조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_20":{"n":"정밀 활시위","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_21":{"n":"리볼버 실린더","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_22":{"n":"별 장식 결정","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_23":{"n":"기사검 장갑판","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_24":{"n":"주황색 건틀릿 코어","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_25":{"n":"성화 부채살","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_26":{"n":"마력이 깃든 꽃잎","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_27":{"n":"마법서의 백지 페이지","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_28":{"n":"붉은 대검 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_29":{"n":"월광 비수편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_30":{"n":"미노타우로스 배틀액스 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_31":{"n":"장산범의 털가죽","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_32":{"n":"키메라 조직 샘플","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_33":{"n":"청룡의 비늘","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_34":{"n":"독사의 허물","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_35":{"n":"기사장의 갑주편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_36":{"n":"몽마의 뿔조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_37":{"n":"마술사의 금속 카드","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_38":{"n":"하피의 깃털","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_39":{"n":"붉은 검집 장식","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_40":{"n":"탐식 기관 조직","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_41":{"n":"심해 촉수편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"near_final_01":{"n":"벨리트라의 혀 피어싱","t":"e","atk":12,"def":8,"r":{"rare_accessory":1,"special_02":1},"tier":"준최종","effectText":"명중률 +2% · 치명타 확률 +2%","weaponType":"장신구"},"near_final_02":{"n":"페더파일의 마도 단말","t":"e","atk":5,"def":16,"r":{"rare_terminal":1,"special_07":1},"tier":"준최종","effectText":"플레이어 탐지 확률 +6%","weaponType":"단말"},"near_final_03":{"n":"헤드라의 가면","t":"e","atk":5,"def":16,"r":{"rare_mask":1,"special_09":1},"tier":"준최종","effectText":"자신이 탐지될 확률 -5%"},"near_final_04":{"n":"아이리스의 스테이지 마이크","t":"e","atk":12,"def":8,"r":{"rare_special":1,"special_10":1},"tier":"준최종","effectText":"전투 스킬 SP 소모 -2","weaponType":"특수무기"},"near_final_05":{"n":"키츠네의 고헤이","t":"e","atk":12,"def":8,"r":{"rare_magic":1,"special_12":1},"tier":"준최종","effectText":"상태이상 부여 확률 +4%","weaponType":"마도구"},"near_final_06":{"n":"몽트르의 회중시계","t":"e","atk":12,"def":8,"r":{"rare_accessory":1,"special_14":1},"tier":"준최종","effectText":"공격 준비시간 -3% · 이동시간 -3%","weaponType":"장신구"},"near_final_07":{"n":"우시아의 마도붓","t":"e","atk":12,"def":8,"r":{"rare_magic":1,"special_16":1},"tier":"준최종","effectText":"일반 탐색의 아이템 발견 확률 +5%","weaponType":"마도구"},"near_final_08":{"n":"티에스의 리볼버","t":"e","atk":12,"def":8,"r":{"gun":1,"special_21":1},"tier":"준최종","effectText":"치명타 확률 +3%","weaponType":"총"},"near_final_09":{"n":"유니온의 별봉","t":"e","atk":12,"def":8,"r":{"rare_magic":1,"special_22":1},"tier":"준최종","effectText":"전투 스킬 피해 +5%","weaponType":"마도구"},"near_final_10":{"n":"제니아의 성화부채","t":"e","atk":12,"def":8,"r":{"rare_magic":1,"special_25":1},"tier":"준최종","effectText":"가하는 제어 상태 지속시간 +5%","weaponType":"마도구"},"near_final_11":{"n":"이본느의 마법 꽃다발","t":"e","atk":12,"def":8,"r":{"rare_accessory":1,"special_26":1},"tier":"준최종","effectText":"소비 아이템 HP 회복 +5% · 휴식 HP 회복 +5%","weaponType":"마도구"},"near_final_12":{"n":"영령의 귀면","t":"e","atk":12,"def":8,"r":{"rare_mask":1,"special_31":1},"tier":"준최종","effectText":"공격 적중 시 6% 확률로 공포 5초"},"near_final_13":{"n":"샤를노아의 생체개조 도구","t":"e","atk":12,"def":16,"r":{"rare_tool":1,"special_32":1},"tier":"준최종","effectText":"소비 아이템 HP 회복 +5%","weaponType":"도구"},"near_final_14":{"n":"시즈쿠의 독극물 키트","t":"e","atk":12,"def":8,"r":{"rare_tool":1,"special_34":1},"tier":"준최종","effectText":"공격 적중 시 독 부여 +8% · 독 상태 대상 피해 +2%","weaponType":"도구"},"near_final_15":{"n":"메리앤의 마각 장식","t":"e","atk":5,"def":16,"r":{"rare_accessory":1,"special_36":1},"tier":"준최종","effectText":"휴식 SP 회복 +15%","weaponType":"장신구"},"near_final_16":{"n":"아브락사스의 하피 발톱","t":"e","atk":12,"def":8,"r":{"rare_special":1,"special_38":1},"tier":"준최종","effectText":"이동시간 -4% · 이동 후 8초 내 첫 공격 명중 +5%","weaponType":"특수무기"},"near_final_17":{"n":"아바돈의 포식구","t":"e","atk":12,"def":8,"r":{"rare_special":1,"special_40":1},"tier":"준최종","effectText":"적 처치 시 HP 6 회복 · 소비 아이템 HP 회복 +6%","weaponType":"특수무기"},"final_01":{"n":"앨리스의 백양산","t":"e","atk":30,"def":12,"r":{"rare_special":1,"special_01":1},"tier":"최종","effectText":"자신이 탐지될 확률 -4% · 8초 이상 비공격 후 다음 첫 적중 피해 +8%","weaponType":"특수무기"},"final_02":{"n":"크리스티나의 성철퇴","t":"e","atk":30,"def":12,"r":{"rare_blunt":1,"special_03":1},"tier":"최종","effectText":"전투 스킬 피해 +8% · 상태이상 대상에게 주는 피해 +4%","weaponType":"둔기"},"final_03":{"n":"기갑슈트 아레스","t":"e","atk":16,"def":28,"r":{"rare_armament":1,"special_04":1},"tier":"최종","effectText":"받는 전투 피해 -5% · HP 50% 미만 방어력 +6 · 이동 SP 소모 -1","weaponType":"병기"},"final_04":{"n":"에클레르의 흑색 대검","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_05":1},"tier":"최종","effectText":"같은 대상 연속 적중마다 피해 +2% (최대 +6%)","weaponType":"중량무기"},"final_05":{"n":"에클레어의 레이피어","t":"e","atk":30,"def":12,"r":{"blade":1,"special_06":1},"tier":"최종","effectText":"명중률 +5% · 공격 준비시간 -6% · 치명타 확률 +2%","weaponType":"검"},"final_06":{"n":"가브리엘의 성창","t":"e","atk":30,"def":12,"r":{"spear":1,"special_08":1},"tier":"최종","effectText":"전투 스킬 명중률 +4% · 전투 스킬 피해 +7%","weaponType":"창"},"final_07":{"n":"제니퍼의 대형 닻","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_11":1},"tier":"최종","effectText":"피해 +4% · 공격 적중 시 12% 확률로 둔화","weaponType":"중량무기"},"final_08":{"n":"라퓌셀의 백은 카타나","t":"e","atk":30,"def":12,"r":{"blade":1,"special_13":1},"tier":"최종","effectText":"공격 준비시간 -4% · 적 처치 시 HP 10 회복","weaponType":"검"},"final_09":{"n":"녹투아의 마검","t":"e","atk":30,"def":12,"r":{"blade":1,"special_15":1},"tier":"최종","effectText":"치명타 확률 +5% · 전투 스킬 피해 +4%","weaponType":"검"},"final_10":{"n":"파벨의 암기함","t":"e","atk":30,"def":12,"r":{"rare_throw":1,"special_17":1},"tier":"최종","effectText":"공격 적중 시 독 부여 +12% · 독 상태 대상 피해 +5%","weaponType":"투척무기"},"final_11":{"n":"키호테의 기사창","t":"e","atk":30,"def":12,"r":{"spear":1,"special_18":1},"tier":"최종","effectText":"이동 후 8초 내 첫 공격 명중 +8% / 피해 +8%","weaponType":"창"},"final_12":{"n":"리퍼의 대낫","t":"e","atk":30,"def":12,"r":{"rare_scythe":1,"special_19":1},"tier":"최종","effectText":"적 처치 시 HP 8 / SP 10 회복","weaponType":"낫"},"final_13":{"n":"스카디의 장궁","t":"e","atk":30,"def":12,"r":{"bow":1,"special_20":1},"tier":"최종","effectText":"플레이어 탐지 확률 +12% · 명중률 +5%","weaponType":"활"},"final_14":{"n":"베로니카의 양날대검","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_23":1},"tier":"최종","effectText":"주는 피해 +8% · 공격 준비시간 +5%","weaponType":"중량무기"},"final_15":{"n":"휘트니의 건틀릿","t":"e","atk":30,"def":12,"r":{"gauntlet":1,"special_24":1},"tier":"최종","effectText":"공격 준비시간 -10% · 같은 대상 3번째 적중 피해 +6%","weaponType":"권갑"},"final_16":{"n":"제타의 마법서","t":"e","atk":16,"def":28,"r":{"rare_grimoire":1,"special_27":1},"tier":"최종","effectText":"전투 스킬 SP 소모 -3 · 전투 스킬 피해 +7% · 상태이상 부여 확률 +3%","weaponType":"마법서"},"final_17":{"n":"네라뷸의 대검","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_28":1},"tier":"최종","effectText":"주는 피해 +5% · HP 40% 미만일 때 추가 피해 +7%","weaponType":"중량무기"},"final_18":{"n":"하나린의 비수","t":"e","atk":30,"def":12,"r":{"rare_dagger":1,"special_29":1},"tier":"최종","effectText":"자신이 탐지될 확률 -7% · 8초 이상 비공격 후 다음 첫 적중 피해 +12%","weaponType":"단검"},"final_19":{"n":"엠마의 배틀액스","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_30":1},"tier":"최종","effectText":"주는 피해 +3% · 치명타 확률 +6%","weaponType":"중량무기","equipKind":"weapon"},"final_20":{"n":"나리 옌의 여의주","t":"e","atk":16,"def":28,"r":{"rare_magic":1,"special_33":1},"tier":"최종","effectText":"상태이상 부여 확률 +5% · 가하는 제어 지속시간 +10% · 받는 상태 지속시간 -10%","weaponType":"마도구"},"final_21":{"n":"릴리아의 기사 대검","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_35":1},"tier":"최종","effectText":"주는 피해 +9% · 공격 준비시간 +7%","weaponType":"중량무기"},"final_22":{"n":"량아 레하의 금속 카드","t":"e","atk":30,"def":12,"r":{"rare_throw":1,"special_37":1},"tier":"최종","effectText":"명중률 +4% · 공격 적중 시 10% 확률로 혼란","weaponType":"투척무기"},"final_23":{"n":"에덴의 전투검","t":"e","atk":30,"def":12,"r":{"blade":1,"special_39":1},"tier":"최종","effectText":"주는 피해 +4% · 공격 적중 시 10% 확률로 출혈","weaponType":"검"},"final_24":{"n":"천소의 팔완 촉수장치","t":"e","atk":30,"def":12,"r":{"rare_special":1,"special_41":1},"tier":"최종","effectText":"공격 적중 시 15% 확률로 추가타(기존 피해의 35%)","weaponType":"특수무기"},"wet_bread":{"n":"물에 젖은 빵","t":"c","tier":"고급","kind":"food","heal":12,"sp":14,"sat":22,"useTime":1.2,"combatEff":0.75,"r":{"bread":1,"water":1},"effectText":"HP +12 · SP +14 · 포만도 +22"},"chocolate_bread":{"n":"초콜릿 빵","t":"c","tier":"고급","kind":"food","heal":16,"sp":16,"sat":28,"useTime":1.2,"combatEff":0.75,"r":{"bread":1,"chocolate":1},"effectText":"HP +16 · SP +16 · 포만도 +28 · 20초간 이동시간 -5%","consumableBuff":{"fx":{"moveTime":-0.05},"duration":20}},"hearty_meal":{"n":"든든한 식사","t":"c","tier":"희귀","kind":"food","heal":40,"sp":20,"sat":40,"useTime":1.6,"combatEff":0.75,"r":{"sandwich":1,"warm_soup":1},"effectText":"HP +40 · SP +20 · 포만도 +40 · 40초간 최대 HP +12","consumableBuff":{"fx":{"maxHpFlat":12},"duration":40}}};
const POOLS={"city":["iron","glass","rubber","wire","battery","electronics","cloth","medicine","water","bread","canned","chocolate"],"estate":["silver","crystal","mana_ink","mana_fiber","cloth","leather","precision","chocolate"],"church":["silver","mana_stone","crystal","medicine","mana_ink","cloth","bread","water"],"factory":["iron","steel","alloy","machine","precision","wire","rubber","water","canned"],"mgmt_lobby":["iron","electronics","battery","cloth","glass","water","bread"],"mgmt_admin":["electronics","battery","precision","wire","machine"],"mgmt_director":["silver","crystal","mana_fiber","precision","leather","chocolate"],"mgmt_cafeteria":["bread","medicine","water","canned","chocolate"],"mgmt_lab":["medicine","toxin","electronics","precision","mana_stone","crystal","mana_ink","mana_fiber"],"mgmt_training":["iron","steel","wood","stick","leather","gunpowder","rubber"],"evil_reception":["mana_stone","crystal","cloth","iron","medicine","water","canned"],"evil_quarters":["silver","leather","mana_fiber","precision","mana_ink","chocolate"],"evil_training":["steel","alloy","wood","machine","gunpowder","toxin","rubber"]};
const WILD_TEMPLATES=[{"id":"wild_dog","n":"들개","hp":32,"atk":8,"def":4,"after":0,"regions":["city","estate"],"drop":["leather"],"skill":"bite_bleed","skillText":"물어뜯기: 반격 적중 시 20% 확률로 출혈"},{"id":"wild_crows","n":"까마귀 떼","hp":28,"atk":7,"def":2,"after":0,"regions":["city","church","estate"],"drop":["cloth","mana_fiber"],"skill":"harass","skillText":"난무: 25% 확률로 다음 공격 명중 -6%"},{"id":"wild_training_drone","n":"관리국 훈련 드론","hp":38,"atk":9,"def":7,"after":30,"regions":["mgmt_lobby","mgmt_training"],"drop":["electronics","machine"],"skill":"scan_delay","skillText":"전투 스캔: 20% 확률로 행동지연 10초"},{"id":"wild_scrap_drone","n":"폐기 전투 드론","hp":52,"atk":11,"def":11,"after":120,"regions":["factory","mgmt_lab"],"drop":["precision","battery"],"skill":"emp","skillText":"EMP: 20% 확률로 침묵 10초"},{"id":"wild_automaton","n":"폭주 오토마톤","hp":72,"atk":13,"def":18,"after":180,"regions":["factory","evil_training"],"drop":["steel","alloy"],"skill":"berserk","skillText":"과열: HP 40% 이하에서 공격력 25% 증가"},{"id":"wild_slime","n":"실험체 슬라임","hp":34,"atk":7,"def":3,"after":60,"regions":["mgmt_lab"],"drop":["medicine","toxin"],"skill":"toxic","skillText":"점액: 30% 확률로 독 1중첩"},{"id":"wild_chimera","n":"키메라","hp":78,"atk":14,"def":10,"after":300,"regions":["mgmt_lab","evil_training"],"drop":["toxin","mana_fiber"],"skill":"chimera_status","skillText":"불안정 변이: 30% 확률로 독/출혈/둔화 중 하나"},{"id":"wild_goblin","n":"고블린","hp":44,"atk":9,"def":6,"after":60,"regions":["city","factory","evil_reception"],"drop":["canned","iron","leather"],"skill":"pilfer","skillText":"약탈: 반격 적중 시 20% 확률로 SP 5 추가 감소"},{"id":"wild_jangsan","n":"장산범 잔영","hp":58,"atk":11,"def":8,"after":150,"regions":["estate","evil_quarters","church"],"drop":["mana_fiber","crystal"],"skill":"phantom_fear","skillText":"환청: 25% 확률로 공포 5초"},{"id":"wild_beast","n":"마수","hp":68,"atk":12,"def":12,"after":180,"regions":["church","estate","evil_reception"],"drop":["mana_stone","crystal","leather"],"skill":"mana_bite","skillText":"마력 포식: 반격 시 20% 확률로 SP 8 감소"},{"id":"wild_armored","n":"갑주 마물","hp":86,"atk":14,"def":22,"after":360,"regions":["evil_training","mgmt_training"],"drop":["steel","alloy"],"skill":"guard","skillText":"갑주: 첫 피격 피해 20% 감소"},{"id":"wild_supply_golem","n":"보급 수송 골렘","hp":92,"atk":10,"def":16,"after":240,"regions":["city","factory","mgmt_lobby","evil_reception"],"drop":["alloy","precision","battery","mana_stone"],"skill":"supply_cache","skillText":"보급 코어: 처치 시 추가 재료 2개 드롭"}];
const OFFLINE_RULES={"maxTime":900,"zoneTimes":[180,330,480,630,750]};
const ENCOUNTER_EVENTS=[{"id":"E001","region":"city","name":"버려진 보급품","type":"보급","condition":"일반 탐색","choices":[{"label":"바로 연다","result":"시간 +1초 / 일반재료 또는 음식 2~4개 / 15% 함정으로 HP -8"},{"label":"함정을 조사한다","result":"시간 +4초 / 함정 무효 / 일반재료 2~3개 + 고급재료 확률"},{"label":"표시만 해둔다","result":"즉시 종료 / 60초 동안 해당 이벤트 재등장 가중치 +50%"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"도심 대표 보급 이벤트"},{"id":"E002","region":"city","name":"우산꽂이의 흰 양산","type":"특수재료","condition":"백색 양산살이 아직 라운드에 존재하지 않을 때 우선","choices":[{"label":"살대를 분해한다","result":"백색 양산살 판정 / 실패 시 철조각+질긴 천"},{"label":"천부터 조사한다","result":"마력섬유 또는 질긴 천 / 특수재료 판정률 소폭 감소"},{"label":"그대로 둔다","result":"이벤트 종료 / 이후 같은 지역에서 특수이벤트 누적 +1"}],"special":"백색 양산살","noise":"낮음","rewardGrade":"특수","repeat":"라운드 1개","note":"이미 존재하면 보상은 마력섬유+질긴 천으로 대체"},{"id":"E003","region":"city","name":"골목의 거대한 깃털","type":"추적","condition":"일반 탐색","choices":[{"label":"바람의 흔적을 따라간다","result":"시간 +5초 / 하피의 깃털 판정 / 실패 시 마력섬유"},{"label":"깃털만 챙긴다","result":"질긴 천 또는 마력섬유 1개"},{"label":"주변을 살핀다","result":"다른 플레이어 흔적 탐지 + 이벤트 보상 포기"}],"special":"하피의 깃털","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"아브락사스 연계"},{"id":"E004","region":"city","name":"깨진 약국 셔터","type":"선택 보상","condition":"약품/도구 태그 보유 시 조건부 선택 활성","choices":[{"label":"강제로 들어간다","result":"시간 +3초 / 약품 2~3개 / 소음 큼"},{"label":"도구로 연다","result":"도구 보유 시 시간 +2초 / 약품 2개 + 희귀 약품 확률"},{"label":"포기한다","result":"위험 없음"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"도심 회복 보급"},{"id":"E005","region":"city","name":"버려진 승용차","type":"분해","condition":"일반 탐색","choices":[{"label":"배터리를 뜯는다","result":"배터리 1~2개 / 시간 +3초"},{"label":"엔진룸을 분해한다","result":"기계부품 또는 정밀부품 / 10% HP -6"},{"label":"트렁크를 연다","result":"음식/잡화/전자부품 중 1~2개"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"범용 파밍"},{"id":"E006","region":"city","name":"닫힌 무인점포","type":"보급","condition":"일반 탐색","choices":[{"label":"유리를 깨고 들어간다","result":"음식/음료 2~3개 / 소음 큼"},{"label":"뒷문을 찾는다","result":"시간 +5초 / 음식 2개 / 소음 없음"},{"label":"자판기만 조사한다","result":"생수·에너지드링크·초콜릿 중 1~2개"}],"special":"","noise":"높음","rewardGrade":"중","repeat":"반복 가능","note":"소모품 보충"},{"id":"E007","region":"estate","name":"잠겨 있는 인형방","type":"고급 보상","condition":"일반 탐색","choices":[{"label":"문을 강제로 연다","result":"HP -6 / 장신구·마력재료 2개"},{"label":"열쇠를 찾는다","result":"시간 +6초 / 안전하게 고급재료 2개"},{"label":"문틈만 조사한다","result":"저택 내 다음 이벤트 종류 미리 확인"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"고급재료 집중"},{"id":"E008","region":"estate","name":"멈춘 골동품 시계","type":"특수재료","condition":"정밀부품 보유 시 조건부 강화","choices":[{"label":"분해한다","result":"정밀부품 1개 + 고장 난 회중시계 부품 판정"},{"label":"정밀부품으로 수리한다","result":"정밀부품 1개 소비 / 특수재료 획득률 크게 상승"},{"label":"그대로 챙긴다","result":"장신구 계열 일반재료"}],"special":"고장 난 회중시계 부품","noise":"없음","rewardGrade":"특수","repeat":"반복 가능","note":"몽트르 연계"},{"id":"E009","region":"estate","name":"온실의 이상한 꽃","type":"특수재료","condition":"일반 탐색","choices":[{"label":"꽃잎만 채취한다","result":"마력이 깃든 꽃잎 판정 / 실패 시 약품 또는 마력섬유"},{"label":"뿌리째 뽑는다","result":"보상 2개 / 25% 독성 상태 8초"},{"label":"관찰한다","result":"다음 온실 이벤트 특수재료 확률 +30%"}],"special":"마력이 깃든 꽃잎","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"이본느 연계"},{"id":"E010","region":"estate","name":"오래된 활 보관함","type":"특수재료","condition":"일반 탐색","choices":[{"label":"활시위를 살핀다","result":"정밀 활시위 판정"},{"label":"목재를 분해한다","result":"강화목재 1~2개"},{"label":"통째로 가져간다","result":"활 계열 고급 아이템 확률"}],"special":"정밀 활시위","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"스카디 연계"},{"id":"E011","region":"estate","name":"비밀 서재","type":"정보","condition":"일반 탐색","choices":[{"label":"마도 서적을 읽는다","result":"특수 이벤트 발견 +1회 보정 / 마력잉크"},{"label":"값나가는 책을 챙긴다","result":"은괴·수정·장신구 재료 중 1개"},{"label":"숨겨진 서랍을 찾는다","result":"시간 +5초 / 고급장신구 재료 확률"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"정보+재료"},{"id":"E012","region":"estate","name":"디저트 카트","type":"음식","condition":"일반 탐색","choices":[{"label":"케이크를 먹는다","result":"HP +18 / 포만도 +25"},{"label":"포장한다","result":"케이크 소모품 1개 획득"},{"label":"홍차를 마신다","result":"SP +14 / 25초간 상태이상 지속 -5%"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"회복 루트"},{"id":"E013","region":"church","name":"금이 간 성유물함","type":"특수재료","condition":"일반 탐색","choices":[{"label":"기도문을 읽고 연다","result":"성흔이 새겨진 철편 또는 성창의 금빛 파편 판정"},{"label":"강제로 연다","result":"시간 +2초 / HP -5 / 은괴+마력석"},{"label":"마력 반응을 조사한다","result":"시간 +4초 / 다음 특수재료 판정 +25%"}],"special":"성흔이 새겨진 철편 / 성창의 금빛 파편","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"두 특수재료 중 하나"},{"id":"E014","region":"church","name":"버려진 부적 묶음","type":"특수재료","condition":"일반 탐색","choices":[{"label":"깨끗한 부적지를 고른다","result":"여우 문양 부적지 판정"},{"label":"전부 챙긴다","result":"마력잉크+질긴 천 / 낮은 확률 혼란 10초"},{"label":"태워 반응을 본다","result":"마력석 1개 / 다음 마도 이벤트 가중치 +20%"}],"special":"여우 문양 부적지","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"키츠네 연계"},{"id":"E015","region":"church","name":"비늘이 붙은 석상","type":"특수재료","condition":"비/번개 계열 환경 이벤트가 활성화되면 확률 상승","choices":[{"label":"비늘을 떼어낸다","result":"청룡의 비늘 판정"},{"label":"물을 끼얹는다","result":"시간 +3초 / 판정률 증가"},{"label":"석상 아래를 조사한다","result":"수정 또는 마력석"}],"special":"청룡의 비늘","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"나리 옌 연계"},{"id":"E016","region":"church","name":"구호물자 창고","type":"보급","condition":"일반 탐색","choices":[{"label":"식량 상자를 연다","result":"빵·수프·생수 2~3개"},{"label":"의약품 상자를 연다","result":"약품 1~2개"},{"label":"둘 다 뒤진다","result":"시간 +5초 / 위 둘에서 1개씩"}],"special":"","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"회복 중심"},{"id":"E017","region":"church","name":"고해실의 속삭임","type":"정보/위험","condition":"일반 탐색","choices":[{"label":"끝까지 듣는다","result":"다른 플레이어 한 명의 최근 지역 흔적 획득 / SP -5"},{"label":"문을 연다","result":"장신구 또는 마력재료 / 10% 공포 6초"},{"label":"무시한다","result":"이벤트 종료"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"정보전"},{"id":"E018","region":"church","name":"봉사자용 주방","type":"음식","condition":"일반 탐색","choices":[{"label":"수프를 데운다","result":"따뜻한 수프 획득"},{"label":"빵을 챙긴다","result":"빵 2개"},{"label":"약초차를 끓인다","result":"SP +10 / 공포·혼란 지속시간 -20%"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"안정적인 회복"},{"id":"E019","region":"factory","name":"멈춘 생산라인","type":"고급 재료","condition":"일반 탐색","choices":[{"label":"전원을 넣는다","result":"금속·기계 재료 3개 / 20% 폭주로 HP -10"},{"label":"수동 분해한다","result":"시간 +6초 / 금속·기계 재료 2개 확정"},{"label":"핵심부만 뜯는다","result":"특수합금 또는 정밀부품"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"고위험 고보상"},{"id":"E020","region":"factory","name":"잠긴 정비함","type":"고급 재료","condition":"도구 보유 시 강화","choices":[{"label":"비틀어 연다","result":"철조각+기계부품 / 10% 손상 HP -5"},{"label":"도구로 연다","result":"시간 +2초 / 정밀부품+고무"},{"label":"그대로 들고 간다","result":"도구 계열 고급 아이템 판정"}],"special":"","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"도구 시너지"},{"id":"E021","region":"factory","name":"부서진 대형 장비","type":"특수재료","condition":"일반 탐색","choices":[{"label":"제어코어를 해체한다","result":"아레스 나노코어 또는 주황색 건틀릿 코어 판정"},{"label":"장갑판을 뜯는다","result":"기사검 장갑판 판정 / 실패 시 강철판"},{"label":"외장만 분해한다","result":"강철판+특수합금"}],"special":"아레스 나노코어 / 기사검 장갑판 / 주황색 건틀릿 코어","noise":"높음","rewardGrade":"특수","repeat":"반복 가능","note":"기계계 특수재료 허브"},{"id":"E022","region":"factory","name":"압축기 사이의 상자","type":"위험 보급","condition":"일반 탐색","choices":[{"label":"빠르게 꺼낸다","result":"일반재료 3개 / 20% HP -8"},{"label":"기계를 멈춘다","result":"시간 +4초 / 안전 획득"},{"label":"버린다","result":"위험 없음"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"시간 대 위험 선택"},{"id":"E023","region":"factory","name":"용접 작업대","type":"제작 보조","condition":"금속 재료 2종 이상 보유","choices":[{"label":"즉석 가공한다","result":"다음 금속계 제작시간 -50%"},{"label":"부품을 챙긴다","result":"철사+철조각"},{"label":"불꽃을 크게 낸다","result":"특수합금 1개 / 소음 큼"}],"special":"","noise":"높음","rewardGrade":"중","repeat":"반복 가능","note":"제작 템포 지원"},{"id":"E024","region":"factory","name":"노동자 휴게실","type":"음식","condition":"일반 탐색","choices":[{"label":"자판기를 뒤진다","result":"생수·에너지드링크 중 1~2개"},{"label":"사물함을 연다","result":"통조림 또는 초콜릿"},{"label":"의자에서 쉰다","result":"SP +18 / 시간 +5초"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"폐공장 유지력"},{"id":"E025","region":"mgmt_lobby","name":"반납되지 않은 분실물함","type":"보급","condition":"일반 탐색","choices":[{"label":"장신구 칸을 본다","result":"장신구 재료 또는 소모품"},{"label":"전자기기 칸을 본다","result":"배터리·전자부품"},{"label":"전부 뒤진다","result":"시간 +4초 / 위 둘 중 2개"}],"special":"","noise":"낮음","rewardGrade":"중","repeat":"반복 가능","note":"초반 안정 보급"},{"id":"E026","region":"mgmt_lobby","name":"비상 보급 캐비닛","type":"보급","condition":"일반 탐색","choices":[{"label":"강제로 연다","result":"음식+약품 / 소음 중간"},{"label":"단말로 해제한다","result":"단말 태그 보유 시 고급 소모품 확률"},{"label":"봉인 스티커만 뜯는다","result":"일반재료 1개 / 빠름"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"관리국 진입 보급"},{"id":"E027","region":"mgmt_lobby","name":"방문객 안내 키오스크","type":"정보","condition":"일반 탐색","choices":[{"label":"지도 기록을 본다","result":"관리국 내 플레이어 흔적 한 번 탐지"},{"label":"부품을 뜯는다","result":"전자부품+배터리"},{"label":"로그를 삭제한다","result":"자신의 최근 관리국 흔적 제거"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"관리국 정보전"},{"id":"E028","region":"mgmt_lobby","name":"보안 검색대","type":"위험/정보","condition":"일반 탐색","choices":[{"label":"검색 장치를 켠다","result":"같은 관리국 내부의 금속 장비 보유자 존재 여부 탐지"},{"label":"분해한다","result":"기계부품+전자부품"},{"label":"우회한다","result":"이벤트 종료"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"감지형"},{"id":"E029","region":"mgmt_lobby","name":"자동판매기 고장","type":"음식","condition":"일반 탐색","choices":[{"label":"두드린다","result":"음료 1개 / 10% 소음"},{"label":"동전을 찾는다","result":"시간 +3초 / 음료 2개"},{"label":"분해한다","result":"배터리+철조각"}],"special":"","noise":"낮음","rewardGrade":"중","repeat":"반복 가능","note":"소모품"},{"id":"E030","region":"mgmt_lobby","name":"버려진 민원 서류","type":"정보","condition":"일반 탐색","choices":[{"label":"읽는다","result":"무작위 외부 지역 하나의 이벤트 가중치 +25% 60초"},{"label":"종이만 챙긴다","result":"마력잉크/질긴 천 대체재 판정"},{"label":"버린다","result":"이벤트 종료"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"다음 동선 유도"},{"id":"E031","region":"mgmt_admin","name":"켜져 있는 단말기","type":"특수재료/정보","condition":"일반 탐색","choices":[{"label":"검색한다","result":"다음 특수 이벤트 지역 힌트"},{"label":"해킹한다","result":"해킹 단말 칩 판정 / 실패 시 소음"},{"label":"전원부를 뜯는다","result":"전자부품+배터리"}],"special":"해킹 단말 칩","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"페더파일 연계"},{"id":"E032","region":"mgmt_admin","name":"미처 처리되지 않은 물자 요청서","type":"정보","condition":"일반 탐색","choices":[{"label":"훈련 물자 문서를 읽는다","result":"60초간 관리국 훈련장 무기재료 드롭 가중치 +20%"},{"label":"연구 물자 문서를 읽는다","result":"60초간 연구실 약품·마도 드롭 가중치 +20%"},{"label":"보급 문서를 찢어 챙긴다","result":"일반 재료 1개"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"지역 가중치 변동"},{"id":"E033","region":"mgmt_admin","name":"잠긴 서류 캐비닛","type":"보급","condition":"정밀부품 또는 도구 보유 시 강화","choices":[{"label":"자물쇠를 뜯는다","result":"정밀부품 또는 전자부품 / 소음"},{"label":"도구로 연다","result":"시간 +3초 / 고급 전자재료 2개"},{"label":"무시한다","result":"이벤트 종료"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"전자 제작"},{"id":"E034","region":"mgmt_admin","name":"야근자의 책상","type":"음식","condition":"일반 탐색","choices":[{"label":"커피를 마신다","result":"SP +18 / 30초 탐색시간 -5%"},{"label":"간식을 챙긴다","result":"초콜릿 또는 빵"},{"label":"서랍을 뒤진다","result":"배터리·전자부품 중 1개"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"행정실 유지력"},{"id":"E035","region":"mgmt_admin","name":"오작동하는 프린터","type":"재료","condition":"일반 탐색","choices":[{"label":"토너를 빼낸다","result":"마력잉크 대체재 1개 판정"},{"label":"기판을 뜯는다","result":"전자부품"},{"label":"수리한다","result":"시간 +4초 / 다음 행정실 탐색 1회 즉시 완료"}],"special":"","noise":"낮음","rewardGrade":"중","repeat":"반복 가능","note":"작은 템포 보상"},{"id":"E036","region":"mgmt_admin","name":"내부 메신저 기록","type":"정보","condition":"단말 태그 보유 시 강화","choices":[{"label":"최근 대화를 읽는다","result":"관리국 내 최근 전투 발생 층 표시"},{"label":"검색어로 찾는다","result":"특정 재료 카테고리의 추천 지역 표시"},{"label":"로그아웃한다","result":"자신의 정보 흔적 감소"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"정보 전문"},{"id":"E037","region":"mgmt_director","name":"잠긴 개인 서랍","type":"보급","condition":"일반 탐색","choices":[{"label":"자물쇠를 연다","result":"장신구 재료+커피"},{"label":"힘으로 뜯는다","result":"시간 짧음 / 소음 중간 / 고급재료 1개"},{"label":"그대로 둔다","result":"위험 없음"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"고급 보급"},{"id":"E038","region":"mgmt_director","name":"국장실 비상금고","type":"고위험 보상","condition":"일반 탐색","choices":[{"label":"비밀번호를 추측한다","result":"시간 +8초 / 은괴·특수합금·고급장신구 재료 2~3개"},{"label":"강제로 연다","result":"시간 +4초 / 소음 큼 / HP -5 가능 / 보상 3개"},{"label":"위치를 기억한다","result":"다음 금고 이벤트 성공률 +30%"}],"special":"","noise":"높음","rewardGrade":"특수","repeat":"반복 가능","note":"고급 보상 핵심"},{"id":"E039","region":"mgmt_director","name":"비서용 커피 스테이션","type":"음식","condition":"일반 탐색","choices":[{"label":"진한 커피를 만든다","result":"SP +25 / 30초 행동속도 +4% / 이후 SP회복 -10% 20초"},{"label":"일반 커피를 챙긴다","result":"커피 1개"},{"label":"각설탕만 챙긴다","result":"설탕 2개"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"버프 음식"},{"id":"E040","region":"mgmt_director","name":"파쇄되지 않은 기밀문서","type":"정보","condition":"일반 탐색","choices":[{"label":"읽는다","result":"무작위 플레이어 1명의 장비 등급 범위 확인"},{"label":"파쇄한다","result":"자신의 다음 피발견률 -5% 30초"},{"label":"종이만 챙긴다","result":"마력잉크 대체재 판정"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"정보전"},{"id":"E041","region":"mgmt_director","name":"고급 선물 바구니","type":"음식/보급","condition":"일반 탐색","choices":[{"label":"과자를 챙긴다","result":"초콜릿+케이크"},{"label":"포장재를 뜯는다","result":"질긴 천+장신구 재료"},{"label":"전부 챙긴다","result":"시간 +4초 / 음식 2개+재료 1개"}],"special":"","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"복합 보상"},{"id":"E042","region":"mgmt_director","name":"낡은 훈장 진열장","type":"장신구","condition":"일반 탐색","choices":[{"label":"훈장을 분해한다","result":"은괴 또는 장신구 재료"},{"label":"유리만 깬다","result":"유리조각+은괴 가능 / 소음"},{"label":"감정한다","result":"시간 +3초 / 가치 높은 보상만 획득"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"장신구 파밍"},{"id":"E043","region":"mgmt_cafeteria","name":"오늘의 남은 식사","type":"음식","condition":"일반 탐색","choices":[{"label":"바로 먹는다","result":"HP +16 / SP +8 / 포만도 +20"},{"label":"포장한다","result":"일반 식사 소모품 1개"},{"label":"재조리한다","result":"시간 +4초 / 고급 요리 1개"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"구내식당 핵심"},{"id":"E044","region":"mgmt_cafeteria","name":"냉장고 깊숙한 곳","type":"특수 음식","condition":"일반 탐색","choices":[{"label":"냉동칸을 뒤진다","result":"민트초코 붕어빵 낮은 확률 / 그 외 디저트"},{"label":"냉장칸을 뒤진다","result":"고기·우유·달걀·채소 2개"},{"label":"문을 닫는다","result":"이벤트 종료"}],"special":"","noise":"없음","rewardGrade":"특수","repeat":"반복 가능","note":"민트초코 붕어빵 등장"},{"id":"E045","region":"mgmt_cafeteria","name":"이상한 한정 메뉴","type":"특수 음식","condition":"매우 낮은 확률","choices":[{"label":"주문표대로 만든다","result":"카르보나라 파스타 민트초코 붕어빵(성심담 에디션) 획득"},{"label":"재료만 챙긴다","result":"고기+우유+빵"},{"label":"레시피를 외운다","result":"다음 구내식당 특수음식 이벤트 확률 +50%"}],"special":"","noise":"낮음","rewardGrade":"특수","repeat":"희귀 반복","note":"아바돈 특수반응 음식"},{"id":"E046","region":"mgmt_cafeteria","name":"남은 디저트 트레이","type":"음식","condition":"일반 탐색","choices":[{"label":"케이크를 챙긴다","result":"케이크 1개"},{"label":"초콜릿을 챙긴다","result":"초콜릿 1~2개"},{"label":"전부 먹는다","result":"HP +10 / SP +15 / 포만도 +25"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"빠른 회복"},{"id":"E047","region":"mgmt_cafeteria","name":"주방 창고","type":"음식 재료","condition":"일반 탐색","choices":[{"label":"탄수화물 상자","result":"쌀·감자·빵 중 2개"},{"label":"단백질 상자","result":"고기·달걀·우유 중 2개"},{"label":"조미료 상자","result":"소금·기름·설탕 중 2개"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"요리 빌드 핵심"},{"id":"E048","region":"mgmt_cafeteria","name":"고장난 자동조리기","type":"선택 보상","condition":"도구 또는 전자부품 보유 시 강화","choices":[{"label":"수리한다","result":"재료 2개를 무작위 고급요리로 변환"},{"label":"부품을 뜯는다","result":"전자부품+기계부품"},{"label":"강제로 돌린다","result":"고급요리 확률 / 20% 실패로 재료 소실"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"음식 제작 가속"},{"id":"E049","region":"mgmt_lab","name":"폐기 예정 실험 샘플","type":"특수재료","condition":"일반 탐색","choices":[{"label":"안전장비를 착용한다","result":"시간 +4초 / 키메라 조직 샘플·독사의 허물·탐식 기관 조직 중 판정"},{"label":"맨손으로 채취한다","result":"빠름 / 판정률 상승 / 25% 상태이상"},{"label":"폐기한다","result":"약품 1개 획득"}],"special":"키메라 조직 샘플 / 독사의 허물 / 탐식 기관 조직","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"생체 특수재료"},{"id":"E050","region":"mgmt_lab","name":"깨진 마법서 보관함","type":"특수재료","condition":"일반 탐색","choices":[{"label":"낱장을 모은다","result":"마법서의 백지 페이지 판정"},{"label":"잉크만 회수한다","result":"마력잉크 1~2개"},{"label":"봉인을 조사한다","result":"다음 마도 이벤트 가중치 +25%"}],"special":"마법서의 백지 페이지","noise":"없음","rewardGrade":"특수","repeat":"반복 가능","note":"제타 연계"},{"id":"E051","region":"mgmt_lab","name":"오염된 약품 선반","type":"약품","condition":"일반 탐색","choices":[{"label":"정상 라벨만 고른다","result":"약품 2개"},{"label":"전부 챙긴다","result":"약품+독성물질 / 20% 중독"},{"label":"성분을 분석한다","result":"시간 +3초 / 희귀 약품 확률"}],"special":"","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"독/회복"},{"id":"E052","region":"mgmt_lab","name":"격리된 마력 결정","type":"마도","condition":"일반 탐색","choices":[{"label":"차폐를 해제한다","result":"마력석+수정 / 소음 중간"},{"label":"조심스럽게 채취한다","result":"시간 +5초 / 마력석 2개"},{"label":"관찰만 한다","result":"다음 마도 제작 효과 +5% 1회"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"마도 제작"},{"id":"E053","region":"mgmt_lab","name":"실험 단말 로그","type":"정보","condition":"단말 태그 보유 시 강화","choices":[{"label":"최근 실험 기록","result":"현재 연구실 특수재료 후보 공개"},{"label":"보안 로그","result":"최근 연구실 방문 플레이어 흔적 확인"},{"label":"부품 회수","result":"정밀부품+전자부품"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"정보"},{"id":"E054","region":"mgmt_lab","name":"응급 세척 장치","type":"회복","condition":"상태이상 보유 시 우선 가치 상승","choices":[{"label":"전신 세척","result":"독 지속시간 50% 감소 · 출혈 중첩 50% 감소 / 시간 +4초"},{"label":"의약품만 챙긴다","result":"약품 1개"},{"label":"장치를 분해한다","result":"기계부품+고무"}],"special":"","noise":"낮음","rewardGrade":"중","repeat":"반복 가능","note":"상태이상 대응"},{"id":"E055","region":"mgmt_training","name":"부서진 검 훈련대","type":"특수재료","condition":"일반 탐색","choices":[{"label":"대검 부품을 찾는다","result":"흑색 대검 파편 또는 검붉은 검편 판정"},{"label":"세검 부품을 찾는다","result":"은빛 레이피어 파편 또는 백은 칼날 조각 판정"},{"label":"철만 회수한다","result":"철조각+강철판"}],"special":"흑색 대검 파편 / 검붉은 검편 / 은빛 레이피어 파편 / 백은 칼날 조각","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"검 계열"},{"id":"E056","region":"mgmt_training","name":"창 훈련대","type":"특수재료","condition":"일반 탐색","choices":[{"label":"창날을 조사한다","result":"기사창 파편 판정"},{"label":"장식 파편을 찾는다","result":"성창의 금빛 파편 보조 판정"},{"label":"목재를 회수한다","result":"강화목재+나무막대"}],"special":"기사창 파편","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"창 계열"},{"id":"E057","region":"mgmt_training","name":"사격장 잔해","type":"특수재료","condition":"일반 탐색","choices":[{"label":"리볼버 부품을 찾는다","result":"리볼버 실린더 판정"},{"label":"탄약을 회수한다","result":"화약 1~2개"},{"label":"표적장치를 뜯는다","result":"정밀부품+전자부품"}],"special":"리볼버 실린더","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"총 계열"},{"id":"E058","region":"mgmt_training","name":"훈련용 갑주 더미","type":"고급 재료","condition":"일반 탐색","choices":[{"label":"장갑판을 뜯는다","result":"강철판+특수합금"},{"label":"관절을 분해한다","result":"정밀부품+고무"},{"label":"통째로 넘어뜨린다","result":"재료 3개 / 소음 큼"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"방어 장비"},{"id":"E059","region":"mgmt_training","name":"탄약 보관함","type":"보급","condition":"일반 탐색","choices":[{"label":"안전하게 연다","result":"화약+기계부품"},{"label":"강제로 연다","result":"화약 2개 / 소음 큼"},{"label":"잠금장치만 뜯는다","result":"정밀부품 1개"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"총기 제작"},{"id":"E060","region":"mgmt_training","name":"훈련 기록 단말","type":"정보","condition":"일반 탐색","choices":[{"label":"무기 기록 확인","result":"현재 가장 많이 제작된 무기 태그 공개"},{"label":"대련 기록 확인","result":"최근 관리국 전투 흔적 공개"},{"label":"부품 회수","result":"전자부품+배터리"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"메타 정보"},{"id":"E061","region":"evil_reception","name":"놓고 간 선물상자","type":"위험 보급","condition":"일반 탐색","choices":[{"label":"바로 연다","result":"마력석·약품·소모품 2개 / 20% 함정"},{"label":"거리 두고 파괴한다","result":"일반재료 2개 / 특수보상 확률 낮음"},{"label":"함정을 해제한다","result":"시간 +5초 / 고급보상 2개"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"악의조직 입구 대표"},{"id":"E062","region":"evil_reception","name":"낙서 가득한 작전 지도","type":"정보","condition":"일반 탐색","choices":[{"label":"숙소 표시를 본다","result":"60초간 간부 숙소 특수이벤트 +25%"},{"label":"훈련장 표시를 본다","result":"60초간 악의조직 훈련장 특수이벤트 +25%"},{"label":"지도를 찢어 챙긴다","result":"질긴 천 대체재+마력잉크"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"동선 선택"},{"id":"E063","region":"evil_reception","name":"수상한 환영 명패","type":"마도","condition":"일반 탐색","choices":[{"label":"만진다","result":"수정 또는 마력석 / 15% 혼란"},{"label":"부순다","result":"마력석 1개 / 소음"},{"label":"관찰한다","result":"다음 환술/최면 계열 이벤트 위험 감소"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"영령/량아 분위기"},{"id":"E064","region":"evil_reception","name":"접객용 간식대","type":"음식","condition":"일반 탐색","choices":[{"label":"간식을 먹는다","result":"HP +10 / SP +8"},{"label":"포장한다","result":"초콜릿 또는 통조림"},{"label":"음료만 마신다","result":"SP +14"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"보급"},{"id":"E065","region":"evil_reception","name":"부서진 감시 카메라","type":"정보/재료","condition":"일반 탐색","choices":[{"label":"기록을 복구한다","result":"최근 접견실 출입 흔적 확인"},{"label":"부품을 뜯는다","result":"전자부품+정밀부품"},{"label":"카메라를 다른 방향으로 돌린다","result":"자신의 피발견률 -5% 30초"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"정보"},{"id":"E066","region":"evil_reception","name":"붉은 천막 뒤 통로","type":"위험 탐색","condition":"일반 탐색","choices":[{"label":"안쪽까지 들어간다","result":"고급재료 2~3개 / 20% 적대 NPC 조우"},{"label":"입구만 뒤진다","result":"일반재료 1~2개"},{"label":"표식을 남긴다","result":"다음 통로 이벤트 성공률 상승"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"NPC 연계 예정"},{"id":"E067","region":"evil_quarters","name":"하나린의 방","type":"특수재료","condition":"랜덤 간부방 이벤트","choices":[{"label":"검집을 조사한다","result":"월광 비수편 판정"},{"label":"차 도구를 뒤진다","result":"회복 음료+장신구 재료"},{"label":"조용히 나온다","result":"흔적을 남기지 않음"}],"special":"월광 비수편","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"하나린"},{"id":"E068","region":"evil_quarters","name":"메리앤의 방","type":"특수재료","condition":"랜덤 간부방 이벤트","choices":[{"label":"베개 주변을 찾는다","result":"몽마의 뿔조각 판정"},{"label":"사탕을 챙긴다","result":"사탕/초콜릿 2개"},{"label":"잠깐 눕는다","result":"SP +20 / 15% 수면 10초"}],"special":"몽마의 뿔조각","noise":"없음","rewardGrade":"특수","repeat":"반복 가능","note":"메리앤"},{"id":"E069","region":"evil_quarters","name":"량아 레하의 방","type":"특수재료","condition":"랜덤 간부방 이벤트","choices":[{"label":"금속 카드를 집는다","result":"마술사의 금속 카드 판정 / 최면 함정 가능"},{"label":"거울을 먼저 가린다","result":"시간 +3초 / 함정 무효 / 판정률 상승"},{"label":"마술도구만 챙긴다","result":"정밀부품+장신구 재료"}],"special":"마술사의 금속 카드","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"량아 레하"},{"id":"E070","region":"evil_quarters","name":"영령의 흔적","type":"특수재료","condition":"랜덤 간부방 이벤트","choices":[{"label":"털가죽 조각을 찾는다","result":"장산범의 털가죽 판정"},{"label":"냄새를 따라간다","result":"특수재료 판정 상승 / 피발견률 +10% 20초"},{"label":"문을 닫는다","result":"위험 없음"}],"special":"장산범의 털가죽","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"영령"},{"id":"E071","region":"evil_quarters","name":"아바돈의 식량 더미","type":"특수재료/음식","condition":"랜덤 간부방 이벤트","choices":[{"label":"이상한 조직을 조사한다","result":"탐식 기관 조직 보조 판정"},{"label":"먹을 만한 것만 챙긴다","result":"음식 2개"},{"label":"전부 뒤진다","result":"음식 3개 / 15% 상태이상"}],"special":"탐식 기관 조직","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"아바돈"},{"id":"E072","region":"evil_quarters","name":"간부 공용 보관함","type":"고급 보급","condition":"일반 탐색","choices":[{"label":"무기 칸","result":"특수합금·정밀부품"},{"label":"장신구 칸","result":"은괴·마력섬유"},{"label":"소모품 칸","result":"에너지드링크·초콜릿"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"숙소 공용"},{"id":"E073","region":"evil_training","name":"피 묻은 배틀액스 더미","type":"특수재료","condition":"일반 탐색","choices":[{"label":"가장 큰 조각을 찾는다","result":"미노타우로스 배틀액스 파편 판정"},{"label":"금속만 회수한다","result":"특수합금+강철판"},{"label":"고무 패드를 뜯는다","result":"고무+가죽"}],"special":"미노타우로스 배틀액스 파편","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"엠마"},{"id":"E074","region":"evil_training","name":"기사 훈련 갑주","type":"특수재료","condition":"일반 탐색","choices":[{"label":"흉갑을 분해한다","result":"기사장의 갑주편 판정"},{"label":"검집을 조사한다","result":"붉은 검집 장식 판정"},{"label":"철판만 뜯는다","result":"강철판 2개"}],"special":"기사장의 갑주편 / 붉은 검집 장식","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"릴리아/에덴"},{"id":"E075","region":"evil_training","name":"붉은 대검 거치대","type":"특수재료","condition":"일반 탐색","choices":[{"label":"대검 잔해를 찾는다","result":"붉은 대검 파편 판정"},{"label":"강철 프레임을 뜯는다","result":"강철판+특수합금"},{"label":"훈련용 검을 챙긴다","result":"검 계열 고급 무기 확률"}],"special":"붉은 대검 파편","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"네라뷸"},{"id":"E076","region":"evil_training","name":"암기 훈련 표적","type":"특수재료","condition":"일반 탐색","choices":[{"label":"박힌 암기를 뽑는다","result":"당문 암기편 판정"},{"label":"표적 뒤를 조사한다","result":"독성물질+질긴 천"},{"label":"전부 떼어낸다","result":"투척재료 2개 / 시간 +4초"}],"special":"당문 암기편","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"파벨"},{"id":"E077","region":"evil_training","name":"부러진 대낫","type":"특수재료","condition":"일반 탐색","choices":[{"label":"날을 분해한다","result":"검은 낫날 조각 판정"},{"label":"자루를 뜯는다","result":"강화목재+철조각"},{"label":"통째로 가져간다","result":"낫 계열 고급 무기 확률"}],"special":"검은 낫날 조각","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"리퍼"},{"id":"E078","region":"evil_training","name":"개조 실험대","type":"고위험 제작","condition":"도구/정밀부품 보유 시 강화","choices":[{"label":"안전하게 개조한다","result":"다음 장비 제작시간 -50%"},{"label":"출력을 올린다","result":"특수합금 또는 고급재료 2개 / 20% HP -8"},{"label":"부품만 챙긴다","result":"정밀부품+기계부품"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"후반 제작 가속"}];
for(const it of Object.values(ITEMS))if(it.t==='e')it.equipKind=equipmentKind(it);
applyItemRework(ITEMS,ENCOUNTER_EVENTS);
const ITEM_IDS=Object.keys(ITEMS);
function item(id){return ITEMS[id]||null;}
function recipeOf(id){return ITEMS[id]?.r||null;}
function regionPool(region){return POOLS[region]||[];}


return {ITEMS,POOLS,WILD_TEMPLATES,OFFLINE_RULES,ENCOUNTER_EVENTS,ITEM_IDS,item,recipeOf,regionPool};
})();
__modules["src/unique_materials.js"]=(()=>{
const {ITEMS}=__modules["src/offline_content.js"];
const finalMaterials=new Set(Object.values(ITEMS).filter(it=>it.tier==='최종').flatMap(it=>Object.keys(it.r||{})).filter(id=>/^special_\d{2}$/.test(id)));
const isUniqueMaterial=id=>finalMaterials.has(id);
// A material embedded in a crafted item is still the same unique world resource.
function contains(id,material,seen=new Set()){
 if(id===material)return true;
 if(seen.has(id))return false;seen.add(id);
 return Object.keys(ITEMS[id]?.r||{}).some(part=>contains(part,material,new Set(seen)));
}
function uniqueMaterialExists(match,id,ignorePlayer=null,ignoreIndex=-1){
 for(const p of [...(match.players||[]),...(match.corpses||[])]){
  if((p.mat?.[id]||0)>0)return true;
  if([p.pendingPickup,...(p.pickupQueue||[])].some(x=>x&&contains(x.id,id)))return true;
  if((p.eq||[]).some((eq,index)=>!(p===ignorePlayer&&index===ignoreIndex)&&contains(eq,id)))return true;
 }
 return false;
}


return {isUniqueMaterial,uniqueMaterialExists};
})();
__modules["src/keyword_defs.js"]=(()=>{
// One uniform draw from eight words. Duplicate words count toward the total cap.
const KEYWORD_LIMIT=10;
const KEYWORDS=[
 {id:'tracking',name:'추적',good:true,description:'마법탄 명중률 +20%p / 중첩'},
 {id:'amplify',name:'증폭',good:true,description:'마법탄 피해 +20% / 중첩'},
 {id:'piercing',name:'관통',good:true,description:'대상 방어력 20% 무시 / 중첩 (최대 100%)'},
 {id:'healing',name:'회복',good:true,description:'발사 시 자신의 HP 5 회복 / 중첩'},
 {id:'vigor',name:'활력',good:true,description:'발사 시 자신의 SP 3 회복 / 중첩'},
 {id:'scatter',name:'산란',good:false,description:'마법탄 명중률 −20%p / 중첩'},
 {id:'weakness',name:'쇠약',good:false,description:'마법탄 피해 −20% / 중첩 (기본 위력의 최소 20%)'},
 {id:'recoil',name:'반동',good:false,description:'발사 시 자신에게 HP 5 반동 피해 / 중첩'}
];
const KEYWORD_BY_ID=Object.fromEntries(KEYWORDS.map(x=>[x.id,x]));
function keywordCounts(words){const counts={};for(const id of words||[])if(KEYWORD_BY_ID[id])counts[id]=(counts[id]||0)+1;return counts;}
function keywordView(words){const counts=keywordCounts(words);return KEYWORDS.filter(x=>counts[x.id]).map(x=>({...x,count:counts[x.id]}));}


return {KEYWORD_LIMIT,KEYWORDS,KEYWORD_BY_ID,keywordCounts,keywordView};
})();
__modules["src/gimmick_buffs.js"]=(()=>{
const {keywordView,KEYWORD_LIMIT}=__modules["src/keyword_defs.js"];
// Snapshot-only metadata: never changes the authoritative resource or equipment.
const resources={
 c05:['charge','흑뢰',3,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +30%p. 보유 중 공격력 +20%. 15초간 전투하지 않으면 사라집니다.'],
 c06:['spark','섬뢰',2,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +30%p. 소모 시 명중률 +20%p. 유지시간이 끝나면 사라집니다.'],
 c10:['attention','주목',3,'보유 중 공격력 +20%, 3중첩이면 +35%. 전투 스킬 피해 계수는 중첩당 +20%p. 비전투 시 감소합니다.'],
 c13:['light','빛',3,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +15%p, HP 5 회복.'],
 c16:['paint','물감',3,'3중첩이면 아이템 발견률 +25%p. 작품 제작에 1개, 전투 스킬에 최대 2개 소모하여 개당 피해 계수 +25%p.'],
 c18:['momentum','기세',2,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +30%p. 유지시간이 끝나면 사라집니다.'],
 c19:['soul','혼령',3,'보유 중 SP 소모 −20%. 전투 스킬에 최대 2개를 소모하여 개당 피해 계수 +25%p, 공포 확률 +30%p.'],
 c21:['gear','가속 기어',5,'기어에 따라 행동 준비·이동시간이 줄고 SP 소모가 증가합니다. 전투 스킬 피해 계수는 기어당 +15%p이며 사용 시 1단계 감소합니다.'],
 c22:['star','별',2,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +25%p.'],
 c23:['will','의지',0,'전투 스킬의 추가 피해로 소모. 20초간 전투하지 않으면 사라집니다.'],
 c25:['luck','운',3,'보유 중 아이템 발견률 +25%p. 길조에 1개, 전투 스킬에 최대 2개 소모하여 개당 피해 계수 +30%p.'],
 c31:['shard','파편',3,'보유 중 방어력 +25%. 전투 스킬에 전부 소모하여 중첩당 피해 계수 +25%p. 2개 이상이면 출혈 2중첩 부여를 시도합니다.'],
 c33:['calamity','재액',3,'2중첩 이상이면 받는 직접 피해 −20%. 전투 스킬에 전부 소모하여 중첩당 피해 계수 +25%p. 3중첩이면 혼란 부여를 시도합니다.'],
 c39:['amp','증폭',3,'보유 중 공격력 +20%. 3중첩이면 받는 직접 피해 +20%. 전투 스킬에 전부 소모하여 중첩당 피해 계수 +30%p.'],
 c49:['feast','포식',3,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +20%p.'],
 c50:['flow','수류',2,'보유 중 휴식 SP 회복 +30%. 추가행동·전투 스킬을 강화할 때 1개 소모합니다.']
};
const modes={
 c04:{blade:['블레이드','공격력 +25%. 전투 스킬 피해 180%.'],rail:['레일건','전투 스킬 피해 160%, 방어력 25% 무시.'],boost:['부스터','이동시간 −25%. 전투 스킬 피해 140%, 사용 후 다음 이동 강화.']},
 c08:{earth:['대지','방어력 +25%. 전투 스킬 피해 130%, 속박 기본 확률 80%.'],wind:['바람','이동시간 −25%. 전투 스킬 피해 160%, 명중률 +20%p.'],life:['생명','휴식 HP·SP 회복 +30%. 전투 스킬 피해 120%, HP 15 회복.']},
 c09:{attack:['공격형','일반 공격 강화. 전투 스킬 피해 150%.'],defense:['방어형','받는 직접 피해 −25%. 전투 스킬 피해 120%, HP 10 회복.']},
 c24:{arms:['팔 증강','공격력 +25%. 전투 스킬 기본 피해 180%.'],legs:['다리 증강','이동시간 −25%. 전투 스킬 기본 피해 150%, 둔화 기본 확률 80%.']},
 c29:{card:['카드 계약','전투 스킬 명중률 +20%p, 기본 피해 190%.'],wall:['방벽 계약','보호막 효과 +25%. 전투 스킬 기본 피해 160%, 남은 보호막 유지시간 연장.']},
 c37:{sword:['대검','다음 전투 스킬 피해 220% 단타. 사용 후 마력 난사로 돌아갑니다.'],barrage:['마력 난사','전투 스킬은 3연타로 발사됩니다.']}
};
function gimmickBuffs(p,r,{maxHp=p.maxHp,players=[]}={}){
 const out={},entry=(id,name,description,stacks=1,maxStacks=1,extra={})=>out[id]={name,description,stacks,maxStacks,until:null,permanent:true,category:'resource',...extra};
 const def=resources[p.charId];if(def){const[k,name,max,description]=def,v=r.resources?.[k]||(k==='gear'?1:0);if(v>0)entry('rw_resource_'+k,name,description,v,k==='will'?Math.round(maxHp*.2*10)/10:max);}
 const mode=modes[p.charId]?.[r.mode];if(mode)entry('rw_mode',mode[0],mode[1],1,1,{category:'mode',stackLabel:'장착',retention:'전환할 때까지 유지'});
 if(p.charId==='c51')for(const word of keywordView(r.keywords))entry('rw_keyword_'+word.id,'키워드: '+word.name,word.description+'. 마법탄 발사 시 모두 적용하고 소모합니다.',word.count,KEYWORD_LIMIT,{category:'keyword',keywordId:word.id,good:word.good,retention:'발사 전까지 보관'});
 if(p.charId==='c30')for(const[id,record]of Object.entries(r.records||{}))if(record.count>0)entry('rw_record_'+id,'관측 기록 · '+(players.find(x=>x.playerId===id)?.playerName||'대상'),'기록한 대상에 대한 방어력 무시: 중첩당 10%. 2중첩 이상이면 해당 대상에 대한 명중률 +20%p.',record.count,3);
 return out;
}


return {gimmickBuffs};
})();
__modules["src/character_reworks.js"]=(()=>{
const {gimmickBuffs}=__modules["src/gimmick_buffs.js"];
const {KEYWORDS,KEYWORD_BY_ID,KEYWORD_LIMIT,keywordCounts,keywordView}=__modules["src/keyword_defs.js"];
// Approved character plan, revision 1. All state is JSON data stored with the match.
const REWORK_CONFIG={};
const cds=[35,40,20,35,35,25,20,18,40,35,40,40,50,35,30,25,45,35,30,20,30,40,18,35,30,35,40,30,30,30,35,35,40,30,40,40,30,30,40,35,40,35,35,45,35,35,35,40,30,25];
const combatCds=[45,50,45,55,40,45,45,45,45,45,45,45,55,45,45,45,50,50,60,40,45,50,40,50,50,45,50,45,45,45,45,50,45,50,50,55,45,50,50,45,55,50,55,50,45,45,55,50,40,45];
const choices={c02:['fear','confusion'],c03:['poison','bleed'],c04:['blade','rail','boost'],c07:['avatar'],c08:['earth','wind','life'],c16:['shield','bird'],c17:['bleed','slow','silence'],c18:['leap'],c25:['aim','guard'],c26:['thorn','flower'],c29:['card','wall'],c32:['spore','steel','bloom'],c37:['sword','barrage'],c39:['amplify','reverse'],c41:['shell','regen'],c50:['cycle','cleanse']};
const REWORK_LABELS={fear:'공포 선언',confusion:'혼란 선언',poison:'독',bleed:'출혈 / 혈독',slow:'연근독',silence:'신경독',blade:'블레이드',rail:'레일건',boost:'부스터',avatar:'아바타 배치',earth:'대지',wind:'바람',life:'생명',shield:'방패',bird:'새',leap:'초월기동',aim:'명중 길조',guard:'방어 길조',thorn:'가시덩굴',flower:'방패꽃',card:'카드 계약',wall:'방벽 계약',spore:'포자',steel:'강철나무',bloom:'홍련화',sword:'대검',barrage:'마력 난사',amplify:'자기 증폭',reverse:'역증폭',shell:'갑각',regen:'재생',cycle:'순환',cleanse:'세척',tracking:'추적',flame:'화염',repeat:'연타'};
const targeted=new Set(['c02','c06','c14','c20','c30','c35','c38','c42','c45','c46','c48']);
for(let n=2;n<=51;n++){const id='c'+String(n).padStart(2,'0');REWORK_CONFIG[id]={cd:cds[n-2],combatCd:combatCds[n-2],choices:choices[id]||[],targeted:targeted.has(id),time:id==='c13'?3:id==='c51'?2:['c20','c42'].includes(id)?(id==='c20'?2:1.5):1,sp:id==='c18'?12:id==='c51'?10:8};}
REWORK_CONFIG.c18.time=1;
REWORK_CONFIG.c51.cd=3;REWORK_CONFIG.c51.sp=5;
const sid=x=>x?.playerId||x?.id;
const active=(r,k,n)=>r[k]?.until>n?r[k]:null;
const has=(p,k,n)=>{const s=p.statuses?.[k];return s?.stacks>0&&(s.until===null||s.until>n)?s:null};
const cap=(x,a,b)=>Math.max(a,Math.min(b,x));
const defaults={c04:'blade',c08:'life',c09:'defense',c24:'arms',c29:'card',c37:'barrage'};
function reworkState(p){return p.rework??=( {mode:defaults[p.charId]||'',resources:{},timed:{},records:{},seenCorpses:[],version:1,attentionDecayAt:0,keywordVersion:2,keywords:[]} );}
function createReworkSystem(api){
 const {status,fx,maxHp,heal,sp,apply,notice,known,locked,adjacency,kill,wildDeath,prof,bleed,noise,cleanse,damage}=api;
 function resource(p,k,delta=0,max=3){const r=reworkState(p);r.resources[k]=cap((r.resources[k]||0)+delta,0,max);return r.resources[k]}
 function timed(p,k,seconds,n,data={}){const r=reworkState(p);return r.timed[k]={startedAt:n,until:n+seconds*1000,durationMs:seconds*1000,...data};}
 function live(p,k,n){return active(reworkState(p).timed,k,n)}
 function buff(p,k,seconds,n,effects,data={}){return timed(p,k,seconds,n,{effects,...data})}
 function shield(m,p,ratio,seconds,n){const r=reworkState(p),s=live(p,'shield',n),mult=1+(fx(p,m,n).shieldPower||0);timed(p,'shield',seconds,n,{amount:Math.max(s?.amount||0,maxHp(p,m,n)*ratio*mult),name:'보호막'});}
 function getTarget(m,p,x={},n){const id=x.targetId||p.encounter?.targetId||p.encounter?.wildId;const all=[...m.players,...(m.wilds||[])];let t=all.find(t=>sid(t)===id&&t!==p&&t.alive&&t.region===p.region);if(!t&&!id){const contacts=(p.enemyContacts?.[p.region]||[]).map(x=>x.id);t=all.find(t=>t!==p&&t.alive&&t.region===p.region&&(p.isAI||contacts.includes(sid(t))));}return t;}
 function targets(m,p){return [...m.players,...(m.wilds||[])].filter(t=>t!==p&&t.alive&&t.region===p.region)}
 function roll(m,p,t,id,chance,n,stacks=1,duration=null,cause=null){if(!t||Math.random()>=cap(chance+(fx(p,m,n).statusChance||0),0,1))return false;return apply(t,id,stacks,duration,p.playerId,n,p,m,cause||api.skillName(p,id==='awe'||id==='fragrance'?'passive':id==='starTarget'?'combat':'action'));}
 function mark(m,p,t,id,seconds,n,data={}){return roll(m,p,t,id,1,n,1,seconds)?Object.assign(t.statuses[id],data):null;}
 function own(p,t,k,n){const s=has(t,k,n);return s?.sourceId===p.playerId?s:null;}
 function consume(p,k,n){const v=live(p,k,n);delete reworkState(p).timed[k];return v;}
 function record(p,t){return reworkState(p).records[sid(t)]??={count:0,lastAt:0};}
 function observe(p,t,n){const r=record(p,t);if(!r.lastAt||n-r.lastAt>=5000){r.count=Math.min(3,r.count+1);r.lastAt=n;}}
 function afterApplied(m,p,t,id,n){
  if(p.charId==='c03'&&['poison','bleed'].includes(id))return;
  if(p.charId==='c42'&&['slow','bind','sleep','fear','confusion','silence','actionDelay','domination'].includes(id))mark(m,p,t,'awe',10,n);
  if(p.charId==='c41'){
   const r=record(p,t);r.statuses??={};r.statuses[id]=n+15000;
   if(Object.values(r.statuses).filter(x=>x>n).length>=2)timed(p,'mutationStudy',15,n,{targetId:sid(t)});
  }
  if(p.charId==='c45'&&id==='sleep'){const r=record(p,t);if(!r.sleepRewardAt||n-r.sleepRewardAt>=20000){heal(p,12,m,n);sp(p,8,m,n);r.sleepRewardAt=n;}}
 }
 function effects(p,m,n){
  const r=reworkState(p),out={};for(const b of Object.values(r.timed))if(b.until>n)for(const[k,v]of Object.entries(b.effects||{}))out[k]=(out[k]||0)+v;
  const res=k=>r.resources[k]||0,id=p.charId;
  if(id==='c04')Object.assign(out,r.mode==='blade'?{atkPct:.25}:r.mode==='rail'?{}:{moveTime:-.25});
  if(id==='c05'&&res('charge'))out.atkPct=.20;
  if(id==='c06')out.moveTime=-.25;
  if(id==='c07'&&(m.reworkObjects||[]).some(x=>x.ownerId===p.playerId&&x.until>n&&x.kind==='avatar'))out.detect=.25;
  if(id==='c08')Object.assign(out,r.mode==='earth'?{defPct:.25}:r.mode==='wind'?{moveTime:-.25}:{restHeal:.30,restSp:.30});
  if(id==='c09')Object.assign(out,r.mode==='attack'?{basicDamage:.25}:{rwTaken:-.25});
  if(id==='c10'&&res('attention'))out.atkPct=res('attention')>=3?.35:.20;
  if(id==='c11')out.specificDuration=-.25;
  if(id==='c13')out.heal=.25;
  if(id==='c14')out.skillPrep=-.25;
  if(id==='c18')out.moveTime=-.25;
  if(id==='c16'&&res('paint')===3)out.searchLoot=.25;
  if(id==='c19'&&res('soul'))out.allSp=-.20;
  if(id==='c20')out.detect=.25;
  if(id==='c21'){const gear=res('gear')||1;if(gear>1){out.prep=-([0,0,.20,.25,.30,.35][gear]);out.moveTime=out.prep;out.allSp=-out.prep;}}
  if(id==='c23'&&p.hp<=maxHp(p,m,n)*.5)out.rwTaken=-.25;
  if(id==='c24')Object.assign(out,r.mode==='legs'?{moveTime:-.25}:{atkPct:.25});
  if(id==='c25'&&res('luck'))out.searchLoot=.25;
  if(id==='c26'&&(m.reworkObjects||[]).some(x=>x.ownerId===p.playerId&&x.region===p.region&&x.until>n))Object.assign(out,{restHeal:.30,restSp:.30});
  if(id==='c28')out.incomingStatusDuration=-.25;
  if(id==='c29')Object.assign(out,r.mode==='card'?{skillHit:.20}:{shieldPower:.25});
  if(id==='c31'&&res('shard'))out.defPct=.25;
  if(id==='c32'){out.itemHeal=.25;if(live(p,'potion',n)||live(p,'shield',n)&&r.potionKind==='steel')out.searchLoot=.20;}
  if(id==='c33'&&res('calamity')>=2)out.rwTaken=-.20;
  if(id==='c35')out.incomingStatusDuration=-.25;
  if(id==='c36'){out.conceal=.25;if(n-(p.lastAttackAt||0)>=10000)out.rwQuiet=.25;}
  if(id==='c37'&&p.rev){out.atkPct=.25;out.heal=-.20;}
  if(id==='c39'&&res('amp')){out.atkPct=.20;if(res('amp')===3)out.rwTaken=.20;}
  if(id==='c43')out.poisonDamage=.25;
  if(id==='c44'){out.rwTaken=-.25;out.prep=.25;}
  if(id==='c49')out.itemHeal=.25;
  if(id==='c50'&&res('flow'))out.restSp=.30;
  if(has(p,'awe',n)||has(p,'fragrance',n))out.atkPct=(out.atkPct||0)-Math.max(has(p,'awe',n)?.20:0,has(p,'fragrance',n)?.20:0);
  // Temporary weakens stack additively with other attack modifiers.
  if(has(p,'reverseAmp',n))out.atkPct=(out.atkPct||0)-.25;
  return out;
 }
 function healObserved(p,amount,m,n,allowLight=true){if(p.charId==='c13'&&amount>=15&&allowLight)resource(p,'light',1);}
 function reduction(p,t,m,n){let mult=1;const id=p.charId;
  if(id==='c30'&&live(p,'analyzedGuard',n)?.targetId===sid(t))mult*=.75;
  if(id==='c34'&&live(p,'learned',n)?.targetId===sid(t))mult*=.75;
  if(id==='c46'&&own(p,t,'confusion',n))mult*=.75;
  const f=effects(p,m,n),base=f.rwTaken||0,temps=Object.values(reworkState(p).timed).filter(v=>v.until>n&&v.effects?.rwTaken);const total=temps.reduce((a,b)=>a+b.effects.rwTaken,0);if(base-total)mult*=1+base-total;for(const b of temps)mult*=1+b.effects.rwTaken;
  if(live(p,'heavyPrep',n))mult*=.8;
  return mult;
 }
 function takeDirect(m,t,p,amount,n){
  if(!t.playerId){t.hp-=amount;return amount;}
  if(api.invincible(t))return 0;
  const r=reworkState(t);let d=api.gearAbsorb(m,t,Math.max(0,amount),n),b=live(t,'reverse',n);if(b){consume(t,'reverse',n);const saved=d*.3;d-=saved;timed(t,'momentum',12,n,{value:Math.min(maxHp(t,m,n)*.15,saved)});}
  b=live(t,'nextGuard',n);if(b){consume(t,'nextGuard',n);d*=.7;}
  b=live(t,'shield',n);if(b){const absorbed=Math.min(d,b.amount);b.amount-=absorbed;d-=absorbed;if(b.amount<=0)consume(t,'shield',n);}
  consume(t,'revGuard',n);
  d=Math.max(0,Math.round(d));const actual=Math.min(Math.max(t.hp,0),d);damage(t,d);if(actual>0){
   if(t.charId==='c23'&&p?.playerId){resource(t,'will',actual,maxHp(t,m,n)*.2);r.lastPvp=n;}
   if(t.charId==='c34')timed(t,'learned',12,n,{targetId:sid(p)});
   if(t.charId==='c30')observe(t,p,n);
   if(p?.playerId&&t.charId==='c10')attention(t,n);
   if(['c25','c33'].includes(t.charId)&&(!r.lastBadAt||n-r.lastBadAt>= (t.charId==='c25'?4000:5000))){resource(t,t.charId==='c25'?'luck':'calamity',1);r.lastBadAt=n;}
  }return d;
 }
 function attention(p,n){const r=reworkState(p);r.lastPvp=n;if(!r.attentionAt||n-r.attentionAt>=4000){resource(p,'attention',1);r.attentionAt=n;}}
 function damageMult(m,p,t,skill,n,ctx={}){
  let mult=1;const id=p.charId,tid=sid(t),r=reworkState(p);
  if(id==='c02'&&(own(p,t,'fear',n)||own(p,t,'confusion',n)))mult*=1.25;
  if(id==='c12'&&own(p,t,'talisman',n))mult*=1.25;
  if(id==='c17'&&has(t,'poison',n))mult*=1.2;
  if(id==='c40'&&(has(t,'fear',n)||has(t,'confusion',n)))mult*=1.25;
  if(id==='c48'&&(has(t,'silence',n)||has(t,'bind',n)))mult*=1.25;
  if(id==='c41'&&live(p,'mutationStudy',n)?.targetId===tid)mult*=1.25;
  if(id==='c09'&&!skill&&r.mode==='attack')mult*=1.25;
  if(id==='c36'&&ctx.quietReady)mult*=1.25;
  return mult;
 }
 function hitBonus(m,p,t,skill,n){const r=reworkState(p),tid=sid(t);let b=0;
  if(p.charId==='c15'&&live(p,'heard',n)?.targetId===tid)b+=.2;
  if(p.charId==='c20'&&skill&&live(p,'observed',n)?.targetId===tid)b+=.2;
  if(p.charId==='c22'&&own(p,t,'starTarget',n))b+=.2;
  if(p.charId==='c30'&&(r.records[tid]?.count||0)>=2)b+=.2;
  if(p.charId==='c35'&&skill&&live(p,'analysis',n)?.targetId===tid)b+=.2;
  if(p.charId==='c38'&&live(p,'insight',n)?.targetId===tid)b+=.2;
  return b;
 }
 function afterDirect(m,p,t,skill,hit,d,n){
  api.gearHit(m,p,t,skill,hit,n);
  const id=p.charId,r=reworkState(p);
  if(!hit){if(['c25','c33'].includes(id)&&(!r.lastBadAt||n-r.lastBadAt>=(id==='c25'?4000:5000))){resource(p,id==='c25'?'luck':'calamity',1);r.lastBadAt=n;}return;}
  if(id==='c30')observe(p,t,n);
  if(id==='c10'&&t.playerId)attention(p,n);
  if(id==='c47')roll(m,p,t,'fragrance',.8,n,1,null,api.skillName(p,'passive')+' · 공격 적중');
  if(!skill){
   if(id==='c05'){resource(p,'charge',1);r.lastFight=n;}
   if(id==='c06'&&live(p,'moved',n)){resource(p,'spark',1,2);consume(p,'moved',n);timed(p,'sparkExpiry',10,n);}
   if(id==='c38'){let v=live(p,'insight',n);timed(p,'insight',12,n,{targetId:sid(t),count:Math.min(2,v?.targetId===sid(t)?(v.count||0)+1:1)});}
   if(id==='c39'){resource(p,'amp',1);timed(p,'ampExpiry',10,n);if(consume(p,'reverseAmpReady',n))roll(m,p,t,'reverseAmp',1,n,1,null,'역증폭 · 일반 공격 적중');}
   if(id==='c43'&&consume(p,'toxin',n))roll(m,p,t,'poison',1,n,2,null,api.skillName(p,'action')+' · 일반 공격 적중');
  }
  if(id==='c28')timed(p,'close',8,n,{targetId:sid(t)});
  if(t.charId==='c28'&&live(t,'domain',n))timed(t,'close',8,n,{targetId:sid(p)});
 }
 function skillSpec(m,p,t,n){
  const id=p.charId,r=reworkState(p),s={mult:1.5,sp:12,cd:REWORK_CONFIG[id]?.combatCd||45,hit:0,rows:[]},res=k=>resource(p,k),spend=k=>{const v=res(k);r.resources[k]=0;return v;},use=k=>consume(p,k,n),is=k=>!!has(t,k,n),tid=sid(t);
  switch(id){
   case 'c02': {const k=own(p,t,'fear',n)?'fear':own(p,t,'confusion',n)?'confusion':null;if(k){s.mult=2;s.removeAfter=k;}break;}
   case 'c03':s.mult=1.6;{const b=live(p,'shield',n);if(b){const v=b.amount/2;b.amount-=v;s.heal=v;}}break;
   case 'c04':s.mult=r.mode==='blade'?1.8:r.mode==='rail'?1.6:1.4;if(r.mode==='rail')s.defIgnore=.25;if(r.mode==='boost')buff(p,'moveBoost',10,n,{moveTime:-.30},{uses:1});break;
   case 'c05':s.mult=1.5+spend('charge')*.3;break;
   case 'c06':{const a=spend('spark');s.mult=1.5+a*.3;if(a)s.hit=.2;break;}
   case 'c07':s.mult=1.4+.25*(m.reworkObjects||[]).filter(x=>x.kind==='avatar'&&x.ownerId===p.playerId&&x.region===p.region&&x.until>n).length;break;
   case 'c08':if(r.mode==='earth'){s.mult=1.3;s.rows=[['bind',.8]];}else if(r.mode==='wind'){s.mult=1.6;s.hit=.2;}else{s.mult=1.2;s.heal=15;}break;
   case 'c09':s.mult=r.mode==='attack'?1.5:1.2;s.rows=[['bind',.8+(use('hairReady')?.2:0)]];if(r.mode!=='attack')s.heal=10;break;
   case 'c10':s.mult=1.4+res('attention')*.2;if(live(p,'broadcast',n))s.spOnHit=8;break;
   case 'c11':s.mult=use('wave')?2:1.6;s.rows=[['slow',.8]];if(s.mult===2)api.removeStacks(p,'poison',1);break;
   case 'c12':if(own(p,t,'talisman',n)){s.mult=1.9;s.rows=[['confusion',1]];s.removeAfter='talisman';}break;
   case 'c13':{const a=spend('light');s.mult=1.4+a*.15;s.heal=a*5;s.noLight=true;break;}
   case 'c14':s.mult=use('analyzed')?2:1.6;break;
   case 'c15':s.mult=is('bleed')?2:1.6;s.rows=[['bleed',1]];break;
   case 'c16':{let a=Math.min(2,res('paint'));resource(p,'paint',-a);s.mult=1.5+a*.25;if(use('art')?.kind==='bird')s.damageBonus=.25;break;}
   case 'c17':s.rows=[['poison',1,1]];{const v=use('poisonLoad');if(v)s.rows.push([v.kind,.8,v.kind==='bleed'||v.kind==='slow'?2:1]);}break;
   case 'c18':s.mult=1.6+spend('momentum')*.3;break;
   case 'c19':{const a=Math.min(2,res('soul'));resource(p,'soul',-a);s.mult=1.6+a*.25;s.rows=[['fear',.2+a*.3]];break;}
   case 'c20':s.mult=live(p,'observed',n)?.targetId===tid?2.3:1.7;use('observed');break;
   case 'c21':s.mult=1.4+(res('gear')||1)*.15;resource(p,'gear',-1,5);r.resources.gear=Math.max(1,res('gear'));break;
   case 'c22':s.mult=1.5+spend('star')*.25;if(own(p,t,'starTarget',n))s.rows=[['actionDelay',.8]];s.starMark=true;break;
   case 'c23':s.mult=1.4;s.flat=spend('will');s.heal=10;break;
   case 'c24':s.mult=r.mode==='arms'?1.8:1.5;if(r.mode==='legs')s.rows=[['slow',.8]];if(use('combo'))s.mult+=.3;break;
   case 'c25':s.luckSpent=Math.min(2,res('luck'));resource(p,'luck',-s.luckSpent);s.mult=1.5+s.luckSpent*.3;break;
   case 'c26':{const o=(m.reworkObjects||[]).find(x=>x.ownerId===p.playerId&&x.region===p.region&&x.matureAt<=n);if(o){o.until=n;if(o.kind==='thorn'){s.mult=1.9;s.rows=[['bind',1]];}else s.heal=20;}break;}
   case 'c27':{const v=Math.floor(Math.random()*4);s.mult=[1,1.6,1.4,2.3][v];if(use('miracle'))s.damageBonus=.25;if(v===0){shield(m,p,.15,8,n);buff(p,'miracle',1200,n,{});}if(v===1)s.rows=[['actionDelay',.8]];if(v===2)s.heal=18;break;}
   case 'c28':if(live(p,'close',n)?.targetId===tid){s.mult=2;s.rows=[['silence',.8]];}break;
   case 'c29':s.mult=r.mode==='card'?1.9:1.6;if(use('cardPierce'))s.defIgnore=.2;if(r.mode==='wall'){const b=live(p,'shield',n);if(b)b.until=Math.min(b.startedAt+17000,b.until+5000);}break;
   case 'c30':s.defIgnore=(r.records[tid]?.count||0)*.1;break;
   case 'c31':{const a=spend('shard');s.mult=1.5+a*.25;if(a>=2)s.rows=[['bleed',.8,2]];break;}
   case 'c32':{s.mult=1.6;const b=use('potion');if(b?.kind==='spore')s.rows=[['poison',1,2]];if(b?.kind==='bloom')s.damageBonus=.25;break;}
   case 'c33':{const a=spend('calamity');s.mult=1.5+a*.25;if(a===3)s.rows=[['confusion',1]];break;}
   case 'c34':s.mult=1.6;s.flat=(use('momentum')?.value||0)*2;break;
   case 'c35':{const v=live(p,'analysis',n);if(v?.targetId===tid&&dispel(m,p,t,r.dispelKey,n)){s.mult=1.9;s.dispelled=true;}break;}
   case 'c36':s.mult=1.8;if(use('invisible')){s.hit=.2;s.rows=[['bleed',.8,2]];}break;
   case 'c37':s.mult=r.mode==='sword'?2.2:1.8;s.hits=r.mode==='sword'?1:3;r.mode='barrage';if(p.rev)s.restoreSp=8;break;
   case 'c38':s.mult=1.7+(live(p,'insight',n)?.targetId===tid?(use('insight')?.count||0)*.3:0);break;
   case 'c39':s.mult=1.5+spend('amp')*.3;s.selfDamage=5;break;
   case 'c40':s.mult=is('confusion')?1.9:1.5;s.rows=[['fear',1]];break;
   case 'c41':{const pool=['poison','bleed','slow'];const a=pool.splice(Math.floor(Math.random()*3),1)[0],b=pool[Math.floor(Math.random()*2)];s.rows=[[a,.8],[b,.8]];break;}
   case 'c42':s.mult=1.6;if(own(p,t,'domination',n)){delete t.statuses.domination;s.mult=2.1;}s.rows=[['bind',.8]];break;
   case 'c43':{const poison=has(t,'poison',n);const a=Math.min(3,poison?.owners?.[p.playerId]|| (poison?.sourceId===p.playerId?poison.stacks:0));s.mult=1.5+a*.3;if(a){poison.stacks-=a;if(poison.owners)delete poison.owners[p.playerId];if(poison.stacks<=0)delete t.statuses.poison;}else s.rows=[['poison',1]];break;}
   case 'c44':s.mult=2.2;s.rows=[['actionDelay',1]];break;
   case 'c45':s.mult=is('sleep')?2.1:1.5;break;
   case 'c46':s.mult=1.6;if(own(p,t,'suggestion',n)){s.mult=1.9;s.rows=[['confusion',1]];s.removeAfter='suggestion';}break;
   case 'c47':s.mult=own(p,t,'fragrance',n)?2:1.6;buff(p,'moveBoost',10,n,{moveTime:-.25},{uses:1});break;
   case 'c48':s.rows=[['silence',.8]];if(own(p,t,'chainMark',n)){s.rows.push(['bind',1]);s.removeAfter='chainMark';}break;
   case 'c49':s.mult=1.6+spend('feast')*.2;s.lifesteal=.25;break;
   case 'c50':s.mult=resource(p,'flow')>0?1.9:1.5;if(res('flow'))resource(p,'flow',-1,2);s.rows=[['slow',.8]];break;
   case 'c51':{const keys=[...(r.keywords||[])],c=keywordCounts(keys);s.mult=1.2;s.hit=((c.tracking||0)-(c.scatter||0))*.2;s.damageBonus=Math.max(-.8,((c.amplify||0)-(c.weakness||0))*.2);s.defIgnore=Math.min(1,(c.piercing||0)*.2);s.heal=(c.healing||0)*5;s.restoreSp=(c.vigor||0)*3;s.selfDamage=(c.recoil||0)*5;s.words=keys;r.keywords=[];break;}
  }
  if(id==='c04'&&r.mode==='rail')s.defIgnore=.25;
  return s;
 }
 function dispel(m,p,t,key,n){
  const r=reworkState(t),keys=Object.keys(r.timed).filter(k=>r.timed[k].until>n&&['shield','art','domain','potion','mutation','invisible','nextGuard','reverse','moveBoost','broadcast','revGuard','hairReady','combo','toxin'].includes(k));
  const k=keys.includes(key)?key:keys[0];if(k&&Math.random()>=cap(fx(t,m,n).dispelResist||0,0,1)){delete r.timed[k];return true;}
  const a=(t.tempEffects||[]).find(x=>x.until>n&&Object.values(x.fx||{}).some(v=>v>0));if(a){t.tempEffects.splice(t.tempEffects.indexOf(a),1);return true;}return false;
 }
 function afterSkill(m,p,t,s,hit,total,killed,n){
  if(s.heal)heal(p,s.heal,m,n,!s.noLight);if(s.restoreSp)sp(p,s.restoreSp,m,n);if(hit&&s.spOnHit)sp(p,s.spOnHit,m,n);
  if(s.selfDamage){damage(p,s.selfDamage);if(p.hp<=0)api.environmentDeath(m,p,n,false,null,'스킬 반동');}
  if(s.lifesteal)heal(p,total*s.lifesteal,m,n);
  if(!hit&&s.luckSpent)resource(p,'luck',1);
  if(hit){for(const[k,ch,stacks=1]of s.rows)roll(m,p,t,k,ch,n,stacks,null,api.skillName(p,'combat'));if(s.removeAfter)delete t.statuses[s.removeAfter];
   if(s.starMark){for(const q of [...m.players,...(m.wilds||[])])if(q.statuses?.starTarget?.sourceId===p.playerId)delete q.statuses.starTarget;mark(m,p,t,'starTarget',30,n);}}
  if(p.charId==='c50')resource(p,'flow',1,2);

 }
 function killed(m,p,t,n){api.gearKill(m,p,t,n);if(p.charId==='c19')resource(p,'soul',1);if(p.charId==='c40'&&(has(t,'fear',n)||has(t,'confusion',n)))heal(p,15,m,n);}
 function options(m,p,n){const cfg=REWORK_CONFIG[p.charId]||{choices:[],targeted:false};const knownIds=(p.enemyContacts?.[p.region]||[]).map(x=>x.id);const ts=targets(m,p).filter(t=>p.isAI||sid(t)===p.encounter?.targetId||sid(t)===p.encounter?.wildId||knownIds.includes(sid(t))).map(t=>({id:sid(t),name:t.playerName||api.wildName(t)}));return {choices:cfg.choices.map(id=>({id,name:REWORK_LABELS[id]})),targeted:cfg.targeted,targets:ts,regions:[p.region,...(adjacency[p.region]||[])].filter(x=>!locked(m,x)),objects:(m.reworkObjects||[]).filter(o=>o.region===p.region&&o.ownerId!==p.playerId&&o.until>n).map(o=>({id:o.id,kind:o.kind,name:o.kind==='avatar'?'아바타 제거':o.kind==='trap'?'부적 해제':'식물 제거',seconds:o.kind==='avatar'||o.kind==='trap'?2:3}))};}
 function validate(m,p,x,n){
  const cfg=REWORK_CONFIG[p.charId];if(!cfg)return null;const r=reworkState(p),v=x.choice||cfg.choices[0];
  if(x.choice&&!cfg.choices.includes(x.choice))return {ok:false,error:'invalid_skill_choice'};
  if(p.sp<cfg.sp*(1+(effects(p,m,n).allSp||0)))return {ok:false,error:'not_enough_sp'};
  if(cfg.targeted&&!getTarget(m,p,x,n))return {ok:false,error:'rework_target_missing'};
  if(cfg.targeted&&x.targetId&&!p.isAI&&!options(m,p,n).targets.some(t=>t.id===x.targetId))return {ok:false,error:'rework_target_unknown'};
  if(p.charId==='c02'&&has(p,'silence',n))return {ok:false,error:'silenced'};
  if(p.charId==='c04'&&v===r.mode)return {ok:false,error:'same_module'};
  if(['c16','c25'].includes(p.charId)&&resource(p,p.charId==='c16'?'paint':'luck')<1)return {ok:false,error:'rework_resource_missing'};
  if(['c33','c39'].includes(p.charId)&&p.hp<=5)return {ok:false,error:'not_enough_hp'};
  if(['c18','c47'].includes(p.charId)&&has(p,'bind',n))return {ok:false,error:'bound'};
  if(p.charId==='c18'&&!m.regionRestrictions?.final){const to=x.region||(adjacency[p.region]||[]).find(t=>!locked(m,t));if(!to||!(adjacency[p.region]||[]).includes(to)||locked(m,to))return {ok:false,error:'invalid_move'};}
  if(p.charId==='c07'&&x.region&&(![p.region,...(adjacency[p.region]||[])].includes(x.region)||locked(m,x.region)))return {ok:false,error:'invalid_move'};
  if(p.charId==='c49'){const c=api.firstCorpse(m,p,n);if(c&&(c.eq?.length||Object.values(c.mat||{}).some(x=>x>0)||Object.values(c.con||{}).some(x=>x>0)))return {ok:false,error:'corpse_loot_first'};if(!c&&(p.satiety||0)<15)return {ok:false,error:'not_enough_satiety'};}
  if(p.charId==='c51'&&(r.keywords||[]).length>=KEYWORD_LIMIT)return {ok:false,error:'keywords_full'};
  return {ok:true};
 }
 function install(m,p,kind,seconds,n,extra={},max=1){m.reworkObjectSeq=(m.reworkObjectSeq||0)+1;const list=m.reworkObjects??=[];let own=list.filter(x=>x.ownerId===p.playerId&&x.until>n);while(own.length>=max){const old=own.shift();old.until=n;}const o={id:'rw_'+m.reworkObjectSeq,ownerId:p.playerId,region:p.region,kind,startedAt:n,until:n+seconds*1000,...extra};list.push(o);return o;}
 function action(m,p,x,n){
  const cfg=REWORK_CONFIG[p.charId];if(!cfg)return null;const v=validate(m,p,x,n);if(!v.ok)return v;const r=reworkState(p),choice=x.choice||cfg.choices[0],t=getTarget(m,p,x,n),res=(k,d=1,max=3)=>resource(p,k,d,max);
  p.sp-=cfg.sp*(1+(effects(p,m,n).allSp||0));p.cdAUntil=n+cfg.cd*1000;p.cdADuration=cfg.cd;
  const healed=k=>{if(has(p,k,n)){delete p.statuses[k];if(p.charId==='c03')buff(p,'purified',12,n,{atkPct:.25});return true;}return false;};
  switch(p.charId){
   case 'c02':roll(m,p,t,choice,1,n);break;
   case 'c03':healed(choice);shield(m,p,.2,10,n);break;
   case 'c04':r.mode=choice;shield(m,p,.15,10,n);break;
   case 'c05':res('charge',2);r.lastFight=n;buff(p,'overload',10,n,{rwTaken:.2});break;
   case 'c06':roll(m,p,t||targets(m,p)[0],'slow',1,n);res('spark',1,2);timed(p,'sparkExpiry',10,n);break;
   case 'c07':{const o=install(m,p,'avatar',25,n,{region:x.region||p.region},2);scan(m,p,n,o.region);break;}
   case 'c08':r.mode=choice;sp(p,10,m,n);break;
   case 'c09':r.mode=r.mode==='defense'?'attack':'defense';if(r.mode==='defense')shield(m,p,.15,8,n);else timed(p,'hairReady',10,n);break;
   case 'c10':res('attention');r.lastPvp=n;timed(p,'broadcast',15,n);noise(m,p,'high','라이브 개시',n);break;
   case 'c11':healed(has(p,'slow',n)?'slow':'actionDelay');buff(p,'moveBoost',12,n,{moveTime:-.30},{uses:1});timed(p,'wave',10,n);break;
   case 'c12':{const o=install(m,p,'trap',30,n);triggerObject(m,o,n);break;}
   case 'c13':heal(p,20,m,n);api.removeStacks(p,'bleed',2);break;
   case 'c14':if(mark(m,p,t,'timeStop',2,n)){const pause=t.statuses.timeStop.until-n,old=t.pendingAction;if(old){old.completeAt+=pause;r.stoppedActionId=old.startedAt;t.reworkPause={until:n+pause,sourceId:p.playerId};}t.statusImmunity??={};t.statusImmunity.timeStop=n+pause+15000;}break;
   case 'c15':scan(m,p,n);break;
   case 'c16':if(live(p,'art',n)?.kind==='shield')consume(p,'shield',n);res('paint',-1);if(choice==='shield'){shield(m,p,.2,12,n);timed(p,'art',12,n,{kind:'shield'});}else timed(p,'art',15,n,{kind:'bird'});break;
   case 'c17':timed(p,'poisonLoad',25,n,{kind:choice});break;
   case 'c18':{if(n-m.startedAt<780000){const to=x.region||(adjacency[p.region]||[]).find(v=>!locked(m,v));const from=p.region;p.region=to;p.encounter=null;for(const q of m.players)if(q.encounter?.targetId===p.playerId)q.encounter=null;moved(m,p,from,n);}res('momentum',1,2);timed(p,'momentumExpiry',15,n);break;}
   case 'c19':res('soul');buff(p,'soulGuard',12,n,{rwTaken:-.2});break;
   case 'c20':known(m,p,t,n,true);timed(p,'observed',15,n,{targetId:sid(t)});notice(m,p,t,0,'조준',n,false);break;
   case 'c21':if((r.resources.gear||1)>=5){r.resources.gear=2;sp(p,10,m,n);}else r.resources.gear=(r.resources.gear||1)+1;timed(p,'gearExpiry',10,n);break;
   case 'c22':if(targets(m,p).some(t=>own(p,t,'starTarget',n))){res('star',1,2);for(const t of targets(m,p))if(own(p,t,'starTarget',n))known(m,p,t,n,false);}else buff(p,'detectOnce',15,n,{detect:.25},{uses:1});break;
   case 'c23':shield(m,p,.2,12,n);break;
   case 'c24':r.mode=r.mode==='arms'?'legs':'arms';timed(p,'combo',10,n);if(r.mode==='arms')buff(p,'armHit',10,n,{basicDamage:.25},{uses:1});else buff(p,'freeMove',10,n,{},{uses:1});break;
   case 'c25':res('luck',-1);if(choice==='aim')buff(p,'aimOnce',12,n,{hit:.2},{uses:1});else timed(p,'nextGuard',12,n);break;
   case 'c26':install(m,p,choice,35,n,{matureAt:n+8000});break;
   case 'c27':sp(p,16,m,n);timed(p,'freeSpell',15,n);break;
   case 'c28':timed(p,'domain',10,n,{effects:{rwTaken:-.3}});break;
   case 'c29':r.mode=choice;if(choice==='card')timed(p,'cardPierce',15,n);else shield(m,p,.2,12,n);break;
   case 'c30':{const v=record(p,t);v.count=Math.min(3,v.count+1);timed(p,'analyzedGuard',15,n,{targetId:sid(t)});break;}
   case 'c31':res('shard',2);break;
   case 'c32':if(r.potionKind==='steel')consume(p,'shield',n);r.potionKind=choice;consume(p,'potion',n);if(choice==='steel')shield(m,p,.2,12,n);else timed(p,'potion',20,n,{kind:choice});break;
   case 'c33':damage(p,5);res('calamity');buff(p,'searchOnce',15,n,{searchLoot:.25},{uses:1});break;
   case 'c34':timed(p,'reverse',8,n);break;
   case 'c35':timed(p,'analysis',15,n,{targetId:sid(t),names:dispelNames(t,n)});r.dispelKey=x.dispelKey||null;break;
   case 'c36':buff(p,'invisible',15,n,{conceal:.20});break;
   case 'c37':r.mode=choice;timed(p,'memoryChoice',15,n);break;
   case 'c38':{const old=live(p,'insight',n);timed(p,'insight',12,n,{targetId:sid(t),count:Math.min(2,(old?.targetId===sid(t)?old.count:0)+1)});buff(p,'revGuard',8,n,{rwTaken:-.25},{uses:1});break;}
   case 'c39':if(choice==='amplify'){res('amp');timed(p,'ampExpiry',10,n);}else timed(p,'reverseAmpReady',12,n);break;
   case 'c40':install(m,p,'mist',15,n,{seen:[]});buff(p,'mistConceal',15,n,{conceal:.25});break;
   case 'c41':buff(p,'mutation',15,n,choice==='shell'?{defPct:.25}:{},{kind:choice,nextTick:n+3000});break;
   case 'c42':mark(m,p,t,'domination',10,n);break;
   case 'c43':timed(p,'toxin',15,n);break;
   case 'c44':shield(m,p,.2,12,n);buff(p,'heavyMove',12,n,{moveTime:.25,fleePrep:.25});break;
   case 'c45':roll(m,p,t,'sleep',1,n);break;
   case 'c46':mark(m,p,t,'suggestion',15,n);break;
   case 'c47':buff(p,'moveBoost',12,n,{moveTime:-.30},{uses:1});timed(p,'freeMove',12,n);noise(m,p,'medium','비상',n);break;
   case 'c48':mark(m,p,t,'chainMark',15,n);break;
   case 'c49':{const c=api.firstCorpse(m,p,n);if(c){m.corpses.splice(m.corpses.indexOf(c),1);heal(p,20,m,n);}else{p.satiety-=15;heal(p,10,m,n);}res('feast');break;}
   case 'c50':if(res('flow',0,2)){res('flow',-1,2);if(choice==='cycle'){heal(p,12,m,n);sp(p,12,m,n);}else cleanse(p,1,n);}else{sp(p,12,m,n);res('flow',1,2);}break;
   case 'c51':{const word=KEYWORDS[Math.min(KEYWORDS.length-1,Math.floor(Math.random()*KEYWORDS.length))];(r.keywords??=[]).push(word.id);r.keywordSeq=(r.keywordSeq||0)+1;(r.keywordNotices??=[]).push({...word,id:r.keywordSeq,keywordId:word.id,at:n,total:r.keywords.length});r.keywordNotices=r.keywordNotices.slice(-32);break;}
  }
  return {ok:true,rework:true,choice,resource:{...r.resources},targetId:sid(t)};
 }
 function dispelNames(t,n){const r=reworkState(t);return Object.entries(r.timed).filter(([k,v])=>v.until>n&&['shield','art','domain','potion','mutation','invisible','nextGuard','reverse','moveBoost','broadcast','revGuard','hairReady','combo','toxin'].includes(k)).map(([id,v])=>({id,name:v.name||display[id]?.[0]||'강화 효과'}));}
 function scan(m,p,n,region=p.region){for(const t of m.players.filter(t=>t!==p&&t.alive&&t.region===region)){if(Math.random()<cap(1-(fx(t,m,n).conceal||0),0,1)){if(region===p.region)known(m,p,t,n,false);else{p.intel??={};p.intel.remoteScout={at:n,region,names:[...(p.intel.remoteScout?.region===region?p.intel.remoteScout.names:[]).filter(x=>x!==t.playerName),t.playerName]};}}}}
 function triggerObject(m,o,n,t=null){const p=m.players.find(p=>p.playerId===o.ownerId);if(!p?.alive||o.until<=n)return;const ts=t?[t]:targets(m,{...p,region:o.region});const valid=ts.filter(q=>sid(q)!==p.playerId),q=valid[Math.floor(Math.random()*valid.length)];if(o.kind==='trap'&&q){mark(m,p,q,'talisman',15,n);roll(m,p,q,'slow',1,n);known(m,p,q,n,false);o.until=n;}}
 function moved(m,p,from,n){const r=reworkState(p);if(p.charId==='c06')timed(p,'moved',8,n);if(p.charId==='c11')timed(p,'wave',10,n);if(p.charId==='c18'){const hist=r.route||[];if(!hist.includes(p.region)){resource(p,'momentum',1,2);}r.route=[...hist,p.region].slice(-3);timed(p,'momentumExpiry',15,n);}if(p.charId==='c21')timed(p,'gearExpiry',10,n);
  for(const o of m.reworkObjects||[])if(o.region===p.region&&o.until>n){if(o.kind==='trap'&&o.ownerId!==p.playerId)triggerObject(m,o,n,p);if(o.kind==='avatar'&&o.ownerId!==p.playerId){const owner=m.players.find(t=>t.playerId===o.ownerId);if(owner)scan(m,owner,n,o.region);}}
  consume(p,'freeMove',n);consume(p,'moveBoost',n);
 }
 function afterComplete(m,p,type,x,result,n,before){if(!REWORK_CONFIG[p.charId]||!result?.ok)return;const r=reworkState(p);
  if(type==='move')moved(m,p,before.region,n);
  if(type==='search'){if(p.charId==='c16')resource(p,'paint',1);consume(p,'searchOnce',n);consume(p,'detectOnce',n);for(const o of m.reworkObjects||[])if(o.kind==='mist'&&o.region===p.region&&o.ownerId!==p.playerId&&o.until>n&&!o.seen.includes(p.playerId)){o.seen.push(p.playerId);const owner=m.players.find(t=>t.playerId===o.ownerId);if(owner)roll(m,owner,p,'confusion',.6,n);}}
  if(type==='loot_corpse'&&p.charId==='c19'&&!r.seenCorpses.includes(x.corpseId)){resource(p,'soul',1);r.seenCorpses.push(x.corpseId);}
  if(type==='use_item'&&p.charId==='c49'&&api.isFood(x.id))resource(p,'feast',1);
  for(const q of m.players)if(q!==p&&q.alive&&q.region===p.region&&q.charId==='c14')timed(q,'analyzed',10,n);
 }
 function tick(m,n){
  m.reworkObjects=(m.reworkObjects||[]).filter(o=>o.until>n&&!locked(m,o.region)&&m.players.some(p=>p.playerId===o.ownerId&&p.alive));
  for(const o of m.reworkObjects)if(o.kind==='flower'&&o.matureAt<=n&&!o.bloomed){const p=m.players.find(p=>p.playerId===o.ownerId);if(p?.region===o.region){shield(m,p,.2,12,n);o.bloomed=true;}}
  for(const p of m.players){if(!p.alive)continue;const r=reworkState(p);
   if(p.charId==='c51'&&r.keywordVersion!==2){const legacy=r.timed.words?.until>n?r.timed.words.keys||[]:[];r.keywords=legacy.map(k=>({flame:'amplify',repeat:'tracking'}[k]||k)).filter(k=>KEYWORD_BY_ID[k]).slice(0,KEYWORD_LIMIT);delete r.timed.words;delete r.timed.wordCombo;delete r.keptWord;r.keywordVersion=2;}
   if(p.reworkPause){const s=has(p,'timeStop',n);if(!s&&p.reworkPause.until>n&&p.pendingAction)p.pendingAction.completeAt-=p.reworkPause.until-n;if(!s)delete p.reworkPause;}
   if(p.charId==='c05'&&r.resources.charge&&n-(r.lastFight||0)>15000)r.resources.charge=0;
   if(p.charId==='c06'&&r.resources.spark&&!live(p,'sparkExpiry',n))r.resources.spark=0;
   if(p.charId==='c10'&&r.lastPvp&&n-r.lastPvp>20000){const decayAt=r.attentionDecayAt||r.lastPvp+20000;const steps=Math.floor((n-decayAt)/5000);if(steps>0){resource(p,'attention',-steps);r.attentionDecayAt=decayAt+steps*5000;}}else r.attentionDecayAt=0;
   if(p.charId==='c18'&&r.resources.momentum&&!live(p,'momentumExpiry',n))r.resources.momentum=0;
   if(p.charId==='c21'){const e=r.timed.gearExpiry;if(e&&e.until<=n){const steps=1+Math.floor((n-e.until)/5000);r.resources.gear=Math.max(1,(r.resources.gear||1)-steps);e.until+=steps*5000;}}
   if(p.charId==='c23'&&r.resources.will&&n-(r.lastPvp||0)>20000)r.resources.will=0;
   if(p.charId==='c37'&&r.timed.memoryChoice&&r.timed.memoryChoice.until<=n)r.mode='barrage';
   if(p.charId==='c39'&&r.resources.amp&&!live(p,'ampExpiry',n))r.resources.amp=0;
   const b=r.timed.mutation;if(b?.kind==='regen'){while(b.nextTick<=n&&b.nextTick<=b.until){heal(p,4,m,b.nextTick);b.nextTick+=3000;}}
   if(p.charId==='c28'&&live(p,'close',n)){const target=m.players.find(t=>t.playerId===live(p,'close',n).targetId);if(target&&target.region!==p.region)consume(p,'close',n);}
  }
 }
 function heard(m,p,source,n){if(p.charId==='c15')timed(p,'heard',10,n,{targetId:sid(source)});}
 const display={shield:['보호막','남은 보호막이 직접 전투 피해를 흡수합니다. 독·출혈 피해는 막지 않습니다.'],purified:['정화의 축복','공격력 +25%'],overload:['출력 개방','받는 직접 피해 +20%'],moved:['이동 직후','첫 일반 공격 적중 시 섬뢰를 얻습니다.'],sparkExpiry:['섬뢰 유지','남은 시간 동안 섬뢰를 사용할 수 있습니다.'],broadcast:['라이브 진행','전투 스킬 적중 시 SP 8을 회복합니다.'],moveBoost:['기동 강화','다음 이동 소요시간을 줄입니다. 1회 사용 시 소모합니다.'],wave:['물결','다음 전투 스킬이 강화됩니다.'],art:['묘화 작품','그려둔 작품의 효과를 사용할 수 있습니다.'],poisonLoad:['독 장전','다음 전투 스킬에 선택한 독을 부여합니다.'],momentumExpiry:['기세 유지','기세가 다음 돌격의 위력을 높입니다.'],soulGuard:['영혼불','받는 직접 피해 −20%'],observed:['정밀 관측','관측한 대상에게 저격 위력과 명중률이 증가합니다.'],gearExpiry:['가속 기어','기어가 높을수록 빠르지만 SP 소모가 증가합니다.'],detectOnce:['탐지 준비','다음 탐색의 플레이어 탐지 확률 +25%p'],freeMove:['이동 준비','다음 이동의 SP 소모가 0이 됩니다.'],combo:['연계 준비','다음 전투 스킬의 피해 계수 +30%p'],armHit:['팔 증강 준비','다음 일반 공격 피해 +25%'],aimOnce:['명중 길조','다음 일반 공격 명중률 +20%p'],nextGuard:['방어 길조','다음 직접 피격 피해 −30%'],miracle:['다음 기적','다음 전투 스킬 위력 +25%'],freeSpell:['주문 준비','다음 전투 스킬의 SP 소모가 0이 됩니다.'],domain:['일미터의 법칙','받는 직접 피해 −30%'],cardPierce:['카드 계약','다음 전투 스킬이 방어력 20%를 무시합니다.'],analyzedGuard:['기록 대조','대조한 상대에게 받는 직접 피해 −25%'],potion:['실험약','선택한 실험약이 다음 전투 스킬에 적용됩니다.'],searchOnce:['위험 탐색 준비','다음 탐색의 아이템 발견률 +25%p'],reverse:['벡터 반전','다음 직접 피격 피해를 30% 줄이고 운동량을 저장합니다.'],momentum:['저장 운동량','다음 전투 스킬에 추가 피해로 사용합니다.'],analysis:['술식 해석','해석한 상대의 해제 가능한 강화 효과를 파훼할 수 있습니다.'],invisible:['광학 소거','피탐지 확률 −20%p·이동 소음 억제. 공격 시 해제됩니다.'],memoryChoice:['전생 회상','선택한 전투 형식을 유지합니다.'],insight:['간파','같은 대상에게 명중률과 전투 스킬 위력이 증가합니다.'],revGuard:['검집의 정적','다음 직접 피격 피해 −25%'],reverseAmpReady:['역증폭 준비','다음 일반 공격에 공격력 약화를 시도합니다.'],ampExpiry:['증폭 유지','증폭이 다음 타격의 위력을 높입니다.'],mistConceal:['환영 안개','피탐지 확률 −25%p'],mutation:['키메라 적응','갑각: 방어력 +25% / 재생: 3초마다 HP 4'],mutationStudy:['변이 관찰','관찰한 대상에게 피해 +25%'],toxin:['맹독 농축','다음 일반 공격 적중 시 독 2중첩 부여를 시도합니다.'],heavyMove:['중량 자세','이동·도주 소요시간 +25%'],heavyPrep:['강타 준비','준비 중 받는 직접 피해 −20%'],words:['영창 키워드','선택한 마법어를 다음 영창에 적용합니다.'],wordCombo:['문장 연계','다음 전투 스킬 위력 +20%'],heard:['기척 확인','기척을 확인한 상대에게 첫 일반 공격 명중률 +20%p'],analyzed:['초침 분석','다음 전투 스킬이 강화됩니다.'],hairReady:['모발 포박 준비','다음 전투 스킬의 속박 부여 기본 확률 +20%p'],learned:['방향 학습','직전 피격 상대에게 받는 직접 피해 −25%']};
 const equippedDetails={poisonLoad:{bleed:'다음 전투 스킬에 출혈 2중첩 부여를 기본 확률 80%로 시도합니다.',slow:'다음 전투 스킬에 둔화 2중첩 부여를 기본 확률 80%로 시도합니다.',silence:'다음 전투 스킬에 침묵 부여를 기본 확률 80%로 시도합니다.'},art:{shield:'직접 전투 피해를 흡수하는 보호막 작품입니다.',bird:'다음 전투 스킬 피해 +25%.'},potion:{spore:'다음 전투 스킬에 독 2중첩 부여를 기본 확률 100%로 시도합니다.',bloom:'다음 전투 스킬 피해 +25%.'},mutation:{shell:'방어력 +25%.',regen:'3초마다 HP 4 회복.'}};
 function view(m,p,n){const r=reworkState(p),buffs=gimmickBuffs(p,r,{maxHp:maxHp(p,m,n),players:m.players});for(const[k,b]of Object.entries(r.timed))if(b.until>n)buffs['rw_'+k]={...b,stacks:b.count||1,...(k==='insight'?{category:'resource',maxStacks:2}:{}),name:(k==='shield'&&p.charId==='c32'&&r.potionKind==='steel'?'강철나무 보호막':b.name||display[k]?.[0]||'고유 효과')+(b.kind?' · '+(REWORK_LABELS[b.kind]||b.kind):''),description:(equippedDetails[k]?.[b.kind]||display[k]?.[1]||'캐릭터 고유 효과가 활성화되어 있습니다.')+(k==='momentum'?' 저장량: '+Math.round((b.value||0)*10)/10+'.':k==='shield'?' 남은 보호막: '+Math.ceil(b.amount||0)+'.':'')};return {rework:{mode:r.mode,resources:r.resources,...(p.charId==='c51'?{keywords:keywordView(r.keywords),keywordTotal:(r.keywords||[]).length,keywordLimit:KEYWORD_LIMIT,keywordSeq:r.keywordSeq||0,keywordNotices:r.keywordNotices||[]}:{}),shield:live(p,'shield',n)?.amount||0,records:p.charId==='c35'?live(p,'analysis',n)?.names:undefined,remoteScout:p.intel?.remoteScout},reworkOptions:options(m,p,n),reworkBuffs:buffs};}
 return {effects,healObserved,takeDirect,reduction,damageMult,hitBonus,afterDirect,skillSpec,afterSkill,killed,action,validate,tick,moved,afterComplete,afterApplied,heard,view,resource,live,consume,target:getTarget,roll,shield};
}


return {REWORK_CONFIG,REWORK_LABELS,reworkState,createReworkSystem};
})();
__modules["src/game_data.js"]=(()=>{
const {reworkState}=__modules["src/character_reworks.js"];
// Server-side core data synchronized from public/offline.html v0.6.4.
const CHARACTERS=[{"id":"c01","name":"서노리","passive":"모형정원의 주인","combat":"정원 재현","action":"정원 설치","arch":"zone","baseHp":100,"baseSp":112,"baseAtk":7.6,"baseDef":2,"preferredWeapon":"특수무기","startProf":20,"passiveEffectText":"정원 지역에서 탐색 아이템 발견률 +30% · 휴식 HP/SP 회복 +35%","combatEffectText":"피해 150% · 행동지연 대상 200% · 속박 대상 250%(우선) · 재사용 60초","actionEffectText":"현재 지역을 30초간 정원으로 변경 · 지역 내 적에게 인형(공격력/방어력 -10%, 중복 불가) · 설치 시 지역 내 모든 적에게 속박 5초 및 행동지연 10초 각각 기본 100% 확률로 부여(상대 저항 적용) · 디버프 부여 시 적 캐릭터 발견"},{"id":"c02","name":"이하령","passive":"거짓부렁","combat":"허언의 실현","action":"사실 선언","arch":"control","baseHp":102,"baseSp":116,"baseAtk":8,"baseDef":2,"preferredWeapon":"마도구","startProf":10,"passiveEffectText":"자신이 부여한 공포·혼란 상태의 적에게 피해 +25%. 모든 제어 효과에 상시 보너스를 주지는 않는다.","combatEffectText":"CD 45초. 피해 150%. 대상이 자신의 공포·혼란을 하나 이상 가지고 있으면 200%가 되고 해당 상태 하나를 소모한다.","actionEffectText":"CD 35초. 현재 확인한 적 1명에게 ‘넌 두려워하고 있어’(공포) 또는 ‘넌 판단을 잃었어’(혼란)를 선택해 기본 100%로 시도한다. 자신이 침묵 상태면 사용 불가라는 고유 제한을 둔다.","reworkVersion":1},{"id":"c03","name":"라헬","passive":"불량 성녀","combat":"신성 철퇴","action":"축복의 방벽","arch":"sustain","baseHp":106,"baseSp":118,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"둔기","startProf":20,"passiveEffectText":"자신이 독·출혈을 해제하면 12초간 공격력 +25%. 재발동은 지속시간만 갱신한다.","combatEffectText":"CD 50초. 피해 160%. 자신의 보호막이 남아 있으면 남은 보호막의 절반을 소모하고 그 수치만큼 HP를 회복한다.","actionEffectText":"CD 40초. 독 또는 출혈 중 선택한 한 종류를 전부 해제하고 최대 HP의 20% 보호막을 10초간 얻는다. 제거할 상태가 없어도 방벽은 생성한다.","reworkVersion":1},{"id":"c04","name":"유채원","passive":"아레스 전투보조","combat":"전투 프로토콜","action":"모듈 재구축","arch":"adaptive","baseHp":106,"baseSp":104,"baseAtk":8.1,"baseDef":3,"preferredWeapon":"병기","startProf":35,"passiveEffectText":"현재 모듈의 특성 하나만 적용한다. 블레이드: 공격력 +25%, 레일건: 전투 스킬 방어력 25% 무시, 부스터: 이동시간 −25%. 시작은 블레이드다.","combatEffectText":"CD 45초. 블레이드 180%, 레일건 160%·준비 1.5초, 부스터 140%·다음 이동시간 −30%(10초 내 1회).","actionEffectText":"CD 20초. 세 모듈 중 선택해 교체한다. 교체 후 10초간 최대 HP 15% 보호막을 얻으며, 같은 모듈을 다시 선택해 방벽만 재생성할 수 없다.","reworkVersion":1},{"id":"c05","name":"레이안","passive":"억눌린 흑뢰","combat":"흑뢰 대절단","action":"출력 개방","arch":"mark","baseHp":100,"baseSp":108,"baseAtk":8.3,"baseDef":2,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"일반 공격 적중 시 전하 1개, 최대 3개. 전하가 하나라도 있으면 공격력 +20%. 15초간 전투하지 않으면 전부 소멸한다.","combatEffectText":"CD 55초·준비 1.2초. 전하를 전부 소모해 150/180/210/240% 피해(0/1/2/3개). 빗나가도 전하를 소모한다.","actionEffectText":"CD 35초. 전하 2개를 얻고 10초간 받는 전투 피해 +20%라는 위험을 진다.","reworkVersion":1},{"id":"c06","name":"레이아","passive":"백색섬뢰","combat":"백뢰 천자","action":"뇌전 채찍","arch":"mobility","baseHp":99,"baseSp":106,"baseAtk":8.4,"baseDef":2,"preferredWeapon":"검","startProf":35,"passiveEffectText":"이동시간 −25%. 이동 완료 후 8초 내 첫 일반 공격 적중 시 10초간 섬뢰 1개, 최대 2개를 얻는다. 같은 이동은 한 번만 인정한다.","combatEffectText":"CD 40초. 피해 150%, 섬뢰를 전부 소모해 하나당 +30%p 피해 계수와 명중 +20%p(중첩 불가)를 얻는다. 최대 210%.","actionEffectText":"CD 35초. 확인한 적 1명에게 둔화 1중첩을 기본 100%로 시도하고 섬뢰 1개를 얻는다.","reworkVersion":1},{"id":"c07","name":"이시아","passive":"병렬 접속","combat":"동기화 사격","action":"아바타 배치","arch":"scout","baseHp":98,"baseSp":120,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"단말","startProf":20,"passiveEffectText":"살아 있는 아바타가 하나 이상이면 탐지 확률 +25%. 분신은 아이템·시체·제작 재료를 수집하지 않는다.","combatEffectText":"CD 45초. 본체와 같은 지역의 확인된 적에게 140%, 그 지역의 아바타 한 기당 +25%p(최대 190%). 원격 지역 공격은 불가하다.","actionEffectText":"CD 25초. 현재 지역 또는 잠기지 않은 인접 지역에 25초짜리 아바타 하나를 배치한다. 최대 2기. 배치 시 해당 지역 적의 이름·HP ?를 한 번 보고한다. 적은 ‘아바타 제거’ 2초 행동으로 파괴할 수 있다.","reworkVersion":1},{"id":"c08","name":"정수아","passive":"정령의 벗","combat":"정령의 응답","action":"정령 교감","arch":"utility","baseHp":98,"baseSp":118,"baseAtk":7.6,"baseDef":2,"preferredWeapon":"창","startProf":20,"passiveEffectText":"활성 정령에 따라 대지: 방어력 +25%, 바람: 이동시간 −25%, 생명: 휴식 HP/SP 회복 +30%. 시작은 생명이다.","combatEffectText":"CD 45초. 대지 130%·속박 기본 80%, 바람 160%·명중 +20%p, 생명 120%·HP 15 회복.","actionEffectText":"CD 20초. 정령 하나를 선택하며 SP 10 회복. 소모 SP 8을 먼저 지불하므로 순회복은 2다.","reworkVersion":1},{"id":"c09","name":"박다희","passive":"살아 있는 모발","combat":"포박 연각","action":"모발 재편","arch":"stealth","baseHp":100,"baseSp":114,"baseAtk":8.4,"baseDef":1,"preferredWeapon":"마도구","startProf":10,"passiveEffectText":"공격형에서는 일반 공격 피해 +25%, 방어형에서는 받는 전투 피해 −25%. 시작은 방어형이다.","combatEffectText":"CD 45초. 피해 150%·속박 기본 80%. 방어형이면 피해 120% 대신 HP 10 회복. 공격형 전환 보너스로 속박 기본값은 최대 100%다.","actionEffectText":"CD 18초. 두 형태를 교체한다. 방어형으로 바꾸면 8초간 최대 HP 15% 보호막, 공격형으로 바꾸면 다음 전투 스킬의 제어 부여율 +20%p(10초 내 1회).","reworkVersion":1},{"id":"c10","name":"민하율","passive":"뷰어쉽","combat":"라이브 스테이지","action":"라이브 개시","arch":"growth","baseHp":98,"baseSp":116,"baseAtk":7.6,"baseDef":1,"preferredWeapon":"특수무기","startProf":10,"passiveEffectText":"플레이어를 공격해 적중하거나 플레이어에게 피해를 받으면 주목 1개, 최대 3개. 1개 이상에서 공격력 +20%, 3개에서 +35%로 대체. 20초간 PvP가 없으면 5초마다 하나 감소한다. 동일 상대에게서 주목 획득은 4초에 한 번이다.","combatEffectText":"CD 45초. 140% + 주목당 20%p(최대 200%). 생방송 중 적중 시 SP 8 회복, 스킬 한 번당 한 번만 회복한다.","actionEffectText":"CD 40초. 15초간 생방송, 주목 1개 획득. 같은 지역 적에게 자신의 이름·HP ?를 알리는 소음이 발생한다.","reworkVersion":1},{"id":"c11","name":"남이비","passive":"하얀물결","combat":"백파의 닻","action":"파도타기","arch":"brawl","baseHp":102,"baseSp":98,"baseAtk":8,"baseDef":3,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"자신에게 걸린 둔화·행동지연 지속시간 −25%. 이동을 완료하면 10초간 물결을 하나 보유한다(중첩 불가).","combatEffectText":"CD 45초. 피해 160%·둔화 1중첩 기본 80%. 물결을 소모하면 200%가 되고 자신의 독 1중첩도 씻는다.","actionEffectText":"CD 35초. 둔화 또는 행동지연 한 종류를 제거하고 다음 이동시간 −30%(12초 내 1회), 물결 획득. 속박을 무시해 이동하지는 않는다.","reworkVersion":1},{"id":"c12","name":"유여울","passive":"여우의 장난","combat":"여우불 점화","action":"부적진","arch":"trap","baseHp":100,"baseSp":116,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"자신의 부적 표식이 있는 적에게 피해 +25%.","combatEffectText":"CD 45초. 피해 150%. 자신의 부적 표식이 있으면 소모해 190%·혼란 기본 100%.","actionEffectText":"CD 40초. 현재 지역에 30초간 덫 하나. 이미 있는 적 중 무작위 1명 또는 이후 처음 들어온 적에게 표식 15초·둔화 1중첩을 각각 기본 100%로 시도하고 소멸한다. 적은 ‘부적 해제’ 2초 행동으로 제거 가능하다.","reworkVersion":1},{"id":"c13","name":"하쿠","passive":"치유의 빛","combat":"빛을 두른 검","action":"온기의 손길","arch":"sustain","baseHp":106,"baseSp":120,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"검","startProf":20,"passiveEffectText":"자신의 HP 회복량 +25%. 실제로 잃은 HP를 15 이상 회복할 때 빛 1개, 최대 3개를 얻는다. 한 번의 회복으로는 최대 한 개이며 초과 회복은 제외한다.","combatEffectText":"CD 45초. 피해 140%. 빛을 전부 소모하여 하나당 HP 5 회복·피해 계수 +15%p(최대 185%). 이 회복은 빛을 만들지 않는다.","actionEffectText":"준비 3초·CD 40초. HP 20 회복, 출혈 최대 2중첩 제거. 다른 행동과 동시에 사용할 수 없다.","reworkVersion":1},{"id":"c14","name":"윤가람","passive":"초침 관찰","combat":"고","action":"스탑","arch":"tempo","baseHp":98,"baseSp":110,"baseAtk":8.3,"baseDef":1,"preferredWeapon":"장신구","startProf":20,"passiveEffectText":"전투 스킬 준비시간 −25%. 같은 적이 행동을 완료하는 것을 현재 지역에서 관측하면 분석 1개(10초, 최대 1개)를 얻는다.","combatEffectText":"CD 55초. 피해 160%. 분석이 있으면 소모해 200%. 정지 중에는 본인도 그 적에게 공격·스킬을 사용할 수 없고, 재개 후 타격한다.","actionEffectText":"CD 50초. 확인한 적에게 고유 디버프 ‘시간정지’ 2초를 기본 100%로 시도한다. 그동안 신규 행동과 진행 중 행동의 남은 준비만 정지하며, 종료 후 남은 시간을 이어간다. 경기 시계·CD·독 틱은 그대로 흐른다. 종료 후 해당 시전자의 정지에 15초간 면역이다.","reworkVersion":1},{"id":"c15","name":"하 린","passive":"붉은 격자","combat":"혈향 발도","action":"감각 개방","arch":"track","baseHp":100,"baseSp":108,"baseAtk":8,"baseDef":2,"preferredWeapon":"검","startProf":35,"passiveEffectText":"현재 지역에서 실제 소음이 발생하면 소음 원인의 이름·HP ?를 확인한다. 해당 이름의 적을 직접 공격할 때 명중 +20%p, 10초간 한 번. 소음만으로 실제 HP를 얻지 않는다.","combatEffectText":"CD 45초. 피해 160%·출혈 1중첩 기본 100%. 대상에게 출혈이 이미 있으면 200%로 대체한다.","actionEffectText":"CD 35초. 현재 지역 적을 이름·HP ?로 한 번 감지한다. 숨은 대상 탐지에도 같은 저항 판정을 적용한다.","reworkVersion":1},{"id":"c16","name":"양서희","passive":"색채 수집","combat":"걸작 전개","action":"허공의 캔버스","arch":"craft","baseHp":100,"baseSp":118,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"마도구","startProf":10,"passiveEffectText":"탐색을 실제 완료하면 물감 1개, 최대 3개. 물감이 3개면 탐색 아이템 발견률 +25%. 추가행동·전투 외의 방법으로 물감을 복제할 수 없다.","combatEffectText":"CD 45초. 피해 150%. 남은 물감을 최대 2개 소모해 하나당 +25%p. 새 작품 보너스는 최종 피해에 한 번 적용하고 작품 소멸.","actionEffectText":"CD 30초. 물감 1개를 소모해 ‘방패’(최대 HP 20% 보호막 12초) 또는 ‘새’(다음 전투 피해 +25%, 15초 내 1회)를 그린다. 작품은 한 개만 유지한다.","reworkVersion":1},{"id":"c17","name":"당소하","passive":"만독불침","combat":"당문 암우","action":"독 배합","arch":"poison","baseHp":100,"baseSp":118,"baseAtk":8.2,"baseDef":1,"preferredWeapon":"투척무기","startProf":35,"passiveEffectText":"일반 독 상태이상에 면역. 독에 걸린 적에게 피해 +20%. 출혈·질병 설정의 모든 효과·특수 음식 즉사까지 면역으로 확대하지 않는다.","combatEffectText":"CD 45초. 피해 150%·독 1중첩 기본 100%. 장전한 독을 소모해 선택 효과를 기본 80%로 별도 시도한다.","actionEffectText":"CD 25초. 다음 전투 스킬에 쓸 독을 선택한다. 혈독: 출혈 2중첩, 연근독: 둔화 2중첩, 신경독: 침묵. 한 종류만 장전하며 25초 유지.","reworkVersion":1},{"id":"c18","name":"이유진","passive":"로시난테","combat":"정의의 돌격","action":"초월기동","arch":"mobility","baseHp":101,"baseSp":106,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"창","startProf":35,"passiveEffectText":"이동시간 −25%. 서로 다른 지역으로 연속 이동하면 기세 1개씩 최대 2개. 같은 두 지역만 왕복하면 두 번째부터 기세를 얻지 않고, 15초간 이동하지 않으면 소멸한다.","combatEffectText":"CD 50초. 피해 160%, 기세 전부 소모하여 하나당 +30%p, 최대 220%.","actionEffectText":"CD 45초. 잠기지 않은 인접 지역으로 실제 이동한다(준비 1초·SP 12). 이동 완료 시 기세 1개 추가, 최대치는 유지. 속박이면 사용 불가.","reworkVersion":1},{"id":"c19","name":"그림","passive":"망자의 속삭임","combat":"혼령 베기","action":"영혼불","arch":"corpse","baseHp":101,"baseSp":110,"baseAtk":8.1,"baseDef":2,"preferredWeapon":"낫","startProf":35,"passiveEffectText":"자신이 적을 처치하면 혼령 1개, 최대 3개. 플레이어 시체 조사 시에도 시체당 경기 1회만 1개 획득한다. 혼령 보유 중 SP 소모 −20%.","combatEffectText":"CD 50초. 피해 160%. 혼령 최대 2개를 소모해 하나당 +25%p와 공포 부여율 +30%p(기본 20%, 최대 80%).","actionEffectText":"CD 35초. 주변 혼령을 불러 혼령 1개 획득. 12초간 자신이 받는 전투 피해 −20%.","reworkVersion":1},{"id":"c20","name":"하츠","passive":"천리안","combat":"대칭의 한 발","action":"정밀 관측","arch":"sniper","baseHp":95,"baseSp":108,"baseAtk":8.3,"baseDef":1,"preferredWeapon":"활","startProf":35,"passiveEffectText":"탐지 확률 +25%. 추가행동으로 관측한 대상에 한해 전투 스킬 명중 +20%p.","combatEffectText":"준비 1.5초·CD 60초. 피해 170%, 관측 대상이면 230%로 대체하고 기록 소모. 사격 완료 전 지역이 달라지면 공격이 성립하지 않는다.","actionEffectText":"준비 2초·CD 30초. 현재 확인한 적 1명의 실제 HP를 그 시점에 확인하고 15초간 관측 기록을 얻는다. 상대에게 조준당함을 알린다.","reworkVersion":1},{"id":"c21","name":"란한서","passive":"기어 가속","combat":"가속탄","action":"기어 업","arch":"tempo","baseHp":98,"baseSp":110,"baseAtk":8.2,"baseDef":1,"preferredWeapon":"총","startProf":35,"passiveEffectText":"시작 1단. 2~5단은 공격 준비·이동시간을 각각 20/25/30/35% 줄이지만 SP 소모는 20/25/30/35% 늘린다. 10초간 이동·공격하지 않으면 1단씩 하락(이후 5초마다).","combatEffectText":"CD 40초. 피해 140% + 현재 기어당 15%p(155~215%). 사용 후 기어 1단 감소. 준비시간에 패시브를 적용한다.","actionEffectText":"CD 20초. 기어 +1, 최대 5. 5단에서 사용하면 SP 10 회복 대신 2단으로 낮추는 냉각이 된다.","reworkVersion":1},{"id":"c22","name":"임루나","passive":"놓치지 않는 별","combat":"별의 낙하","action":"별빛 추적","arch":"mark","baseHp":100,"baseSp":108,"baseAtk":8,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"자신이 마지막으로 전투 스킬을 적중시킨 한 명을 30초간 집착 대상으로 지정. 그 대상 명중 +20%p. 다른 대상 적중 시 교체한다.","combatEffectText":"CD 45초. 피해 150%, 별을 전부 소모해 하나당 +25%p. 대상이 기존 집착 대상이면 적중 시 행동지연 기본 80%.","actionEffectText":"CD 30초. 현재 지역에 집착 대상이 있으면 이름·HP ?를 확인하고 자신에게 별 1개, 최대 2개. 없으면 다음 탐지 확률 +25%(15초 내 1회). 잠긴 지역의 좌표는 노출하지 않는다.","reworkVersion":1},{"id":"c23","name":"서유라","passive":"꺾이지 않는 의지","combat":"수호자의 응답","action":"황금 방패","arch":"bruiser","baseHp":108,"baseSp":100,"baseAtk":7.8,"baseDef":4,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"HP 50% 이하에서 받는 전투 피해 −25%. 실제 전투 HP 피해를 누적해 의지로 저장, 최대 최대 HP의 20%. 보호막·자해·독 틱은 적립하지 않는다.","combatEffectText":"CD 50초. 피해 140% + 저장 의지와 같은 수치의 추가 일반 피해. 의지를 전부 소모하고 HP 10 회복. 추가 피해에도 방어가 적용된다.","actionEffectText":"CD 40초. 최대 HP 20% 보호막을 12초간 얻는다.","reworkVersion":1},{"id":"c24","name":"나세라","passive":"부분증강","combat":"증강 콤비네이션","action":"증강 전환","arch":"adaptive","baseHp":104,"baseSp":104,"baseAtk":8,"baseDef":3,"preferredWeapon":"권갑","startProf":35,"passiveEffectText":"팔 증강: 공격력 +25%, 다리 증강: 이동시간 −25%. 시작은 팔. 반대 부위로 전환하면 10초간 연계 준비(1회)를 얻는다.","combatEffectText":"CD 40초. 팔 180%, 다리 150%·둔화 1중첩 기본 80%. 연계 준비를 소모하면 피해 계수 +30%p.","actionEffectText":"CD 18초. 부위를 바꾼다. 팔로 전환하면 다음 일반 공격 피해 +25%(10초 내 1회), 다리로 전환하면 다음 이동 SP 소모 0(10초 내 1회).","reworkVersion":1},{"id":"c25","name":"케르테","passive":"천운","combat":"성화의 인과","action":"길조 선택","arch":"luck","baseHp":100,"baseSp":116,"baseAtk":8.3,"baseDef":1,"preferredWeapon":"마도구","startProf":10,"passiveEffectText":"자신의 직접 공격이 빗나가거나 적의 직접 공격을 맞으면 운 1개(4초당 1회), 최대 3개. 운이 있으면 아이템 발견률 +25%. 자해로 획득 불가.","combatEffectText":"CD 50초. 피해 150%, 운 최대 2개를 소모하여 하나당 +30%p. 빗나가면 소비한 운 중 1개를 돌려준다.","actionEffectText":"CD 35초. 운 1개를 소모해 다음 일반 공격 명중 +20%p 또는 다음 직접 피격 피해 −30% 중 하나를 고른다. 12초 내 1회만 적용.","reworkVersion":1},{"id":"c26","name":"이 연","passive":"생장","combat":"개화","action":"씨앗 심기","arch":"zone","baseHp":101,"baseSp":112,"baseAtk":7.8,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"자신의 식물이 있는 지역에서 휴식 회복 +30%. 식물은 심은 뒤 8초가 지나면 성숙한다.","combatEffectText":"CD 50초. 피해 150%. 같은 지역의 성숙한 가시덩굴을 소모하면 190%·속박 기본 100%. 방패꽃을 소모하면 HP 20 회복.","actionEffectText":"CD 30초. 현재 지역에 가시덩굴 또는 방패꽃을 선택해 35초간 설치, 자신 기준 총 1개. 방패꽃은 성숙 시 소유자에게 최대 HP 20% 보호막(12초)을 한 번 부여한다. 가시덩굴은 전투 연계용이다. 적은 3초 행동으로 제거 가능하다.","reworkVersion":1},{"id":"c27","name":"백유설","passive":"기적을 기다리는 마음","combat":"랜덤 캐스트","action":"페이지 넘기기","arch":"random","baseHp":98,"baseSp":122,"baseAtk":8.4,"baseDef":1,"preferredWeapon":"마법서","startProf":20,"passiveEffectText":"전투 스킬이 가장 낮은 결과를 뽑으면 다음 전투 스킬 위력 +25%(중첩 불가). 다음 결과를 미리 보거나 직접 선택할 수 없다.","combatEffectText":"CD 45초. 각각 25%로 ‘비눗방울’ 100%·자신 최대 HP 15% 보호막 8초 / ‘충격’ 160%·행동지연 기본 80% / ‘치유광’ 140%·HP 18 회복 / ‘대마법’ 230%. 한 결과만 뽑는다.","actionEffectText":"CD 35초. SP 16 회복, 15초 내 다음 전투 스킬 SP 소모 0. 무한 재시도로 원하는 주문을 고르지 못한다.","reworkVersion":1},{"id":"c28","name":"권세림","passive":"절대영역","combat":"영역 압살","action":"일미터의 법칙","arch":"control","baseHp":102,"baseSp":116,"baseAtk":7.8,"baseDef":3,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"받는 디버프 지속시간 −25%. 자신이 직접 공격을 적중시킨 상대에게 8초간 근접 판정(동시에 1명)을 남긴다. 지역이 달라지면 즉시 해제.","combatEffectText":"CD 50초. 피해 150%, 근접 대상이면 200%·침묵 기본 80%. 스킬 완료 전에 대상 조건을 다시 확인한다.","actionEffectText":"CD 40초. 10초간 받는 직접 전투 피해 −30%. 그동안 자신을 직접 적중시킨 적도 근접 대상으로 지정한다.","reworkVersion":1},{"id":"c29","name":"비비","passive":"공정계약","combat":"계약 집행","action":"조항 작성","arch":"predict","baseHp":102,"baseSp":116,"baseAtk":8.3,"baseDef":2,"preferredWeapon":"투척무기","startProf":20,"passiveEffectText":"현재 사물 계약에 따라 카드 계약: 전투 스킬 명중 +20%p / 방벽 계약: 보호막 생성량 +25%. 시작은 카드 계약.","combatEffectText":"CD 45초. 피해 160%. 카드 계약 190%로 대체, 방벽 계약이면 피해는 유지하고 보호막 지속시간을 5초 연장(최초 생성 시점부터 최대 17초).","actionEffectText":"CD 30초. 사물 계약을 선택한다. 카드 계약이면 다음 전투 스킬 방어력 20% 무시(15초 내 1회), 방벽 계약이면 최대 HP 20% 보호막을 12초간 얻는다.","reworkVersion":1},{"id":"c30","name":"하와","passive":"완전기억","combat":"최적해 실행","action":"기록 대조","arch":"analysis","baseHp":102,"baseSp":116,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"단말","startProf":20,"passiveEffectText":"서로 다른 적마다 관측 0~3을 저장한다. 해당 적에게 직접 피해를 주거나 받으면 +1(대상별 5초당 1회). 관측 2 이상이면 그 적에게 명중 +20%p. HP를 실시간으로 알아내는 기능은 없다.","combatEffectText":"CD 45초. 피해 150%, 관측당 대상 방어력 10% 무시(최대 30%). 관측은 소모하지 않는다.","actionEffectText":"CD 30초. 현재 확인한 적의 관측 +1, 15초간 그 적에게 받는 직접 피해 −25%.","reworkVersion":1},{"id":"c31","name":"김예화","passive":"메탈리카","combat":"금속의 비","action":"금속 회수","arch":"metal","baseHp":104,"baseSp":104,"baseAtk":8,"baseDef":3,"preferredWeapon":"병기","startProf":35,"passiveEffectText":"파편 0~3 보유. 파편이 있으면 방어력 +25%. 파편은 전투 전용 가상 자원으로 실제 철조각과 다르다.","combatEffectText":"CD 45초. 피해 150%, 파편 전부 소모해 하나당 +25%p. 2개 이상 소비 시 출혈 2중첩 기본 80%.","actionEffectText":"CD 30초. 파편 2개 획득, 최대 3개. 실제 재료를 소비하거나 생성하지 않는다.","reworkVersion":1},{"id":"c32","name":"이아엘","passive":"실험 기록","combat":"연금 개화","action":"식물 연금","arch":"alchemy","baseHp":102,"baseSp":118,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"도구","startProf":20,"passiveEffectText":"직접 사용한 회복 소모품 효과 +25%. 조제 효과가 있는 동안 탐색 아이템 발견률 +20%.","combatEffectText":"CD 45초. 피해 160%. 포자·홍련화 효과는 적중 여부와 무관하게 한 번 소모한다. 강철나무는 스킬 후에도 잔여 수명 유지.","actionEffectText":"CD 35초. 20초 유지되는 실험약 하나를 선택해 즉시 자신에게 적용한다. 포자: 다음 전투에 독 2중첩 기본 100% / 강철나무: 최대 HP 20% 보호막 12초 / 홍련화: 다음 전투 피해 +25%. 한 조제 효과만 유지한다.","reworkVersion":1},{"id":"c33","name":"나루","passive":"재액 적립","combat":"재액 전가","action":"불길한 징조","arch":"risk","baseHp":100,"baseSp":108,"baseAtk":8,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"적에게 직접 HP 피해를 받거나 자신의 직접 공격이 빗나가면 재액 1개(5초당 1회), 최대 3개. 재액 2개 이상이면 받는 직접 피해 −20%.","combatEffectText":"CD 50초. 피해 150%, 재액 전부 소모해 하나당 +25%p. 3개 소비 시 혼란 기본 100%.","actionEffectText":"CD 35초. HP 5를 소모하고 재액 1개, 다음 탐색 아이템 발견률 +25%(15초 내 1회). HP 5 이하면 사용 불가.","reworkVersion":1},{"id":"c34","name":"린","passive":"방향 학습","combat":"역방향 타격","action":"벡터 반전","arch":"counter","baseHp":100,"baseSp":108,"baseAtk":8,"baseDef":2,"preferredWeapon":"특수무기","startProf":35,"passiveEffectText":"같은 적에게 직접 피격되면 12초간 그 적에게 받는 직접 피해 −25%. 연속 피격으로 수치가 중첩하지 않고 지속시간만 갱신한다.","combatEffectText":"CD 45초. 피해 160% + 저장 운동량의 2배에 해당하는 추가 일반 피해. 운동량 전부 소모, 추가 피해에도 방어 적용.","actionEffectText":"CD 40초. 8초간 자세 유지. 다음 직접 공격 한 번의 피해를 30% 줄이고, 줄인 양을 운동량으로 12초 저장한다. 최대 최대 HP의 15%. 반사 연쇄는 없다.","reworkVersion":1},{"id":"c35","name":"엘린","passive":"술식 해석","combat":"파훼","action":"사전 해석","arch":"dispel","baseHp":102,"baseSp":118,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"자신에게 걸리는 제어 디버프 지속시간 −25%. 자신이 해석한 대상에 전투 스킬 명중 +20%p.","combatEffectText":"CD 50초. 피해 150%. 해석 대상이면 공격 판정 전 해제 가능한 버프 하나를 선택해 제거한다. 제거 성공 시 190%. 제거 판정은 기본 100%·강화 해제 저항 적용, 빗나감과 별개.","actionEffectText":"CD 30초. 현재 확인한 적 1명의 해제 가능한 버프 이름을 보여주고 15초간 해석 기록을 얻는다. 고유 패시브·장비 영구 효과는 대상이 아니다.","reworkVersion":1},{"id":"c36","name":"리금애","passive":"불가시화","combat":"무음 절단","action":"광학 소거","arch":"assassin","baseHp":94,"baseSp":106,"baseAtk":8.7,"baseDef":1,"preferredWeapon":"단검","startProf":35,"passiveEffectText":"자신이 탐지될 기본 확률 −25%p(최저 탐지율은 공통 규칙 적용). 10초간 직접 공격하지 않으면 다음 직접 공격 피해 +25%(한 번).","combatEffectText":"CD 50초. 피해 180%. 광학 소거 상태에서 시작했으면 명중 +20%p·출혈 2중첩 기본 80%. 피해 판정 전에 소거 상태를 소모한다.","actionEffectText":"CD 40초. 15초간 피탐지 확률 추가 −20%p, 자신의 이동 소음 억제. 직접 공격·스킬을 실행하면 즉시 해제된다. 현재 확정된 조우 정보를 강제로 지우지는 않는다.","reworkVersion":1},{"id":"c37","name":"네라뷸","passive":"윤회전생","combat":"전생의 전투기억","action":"전생 회상","arch":"revive","baseHp":100,"baseSp":112,"baseAtk":8.2,"baseDef":3,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"현재 경기당 1회 HP 18 부활을 유지한다. 발동 후 공격력 +25% 대신 받는 HP 회복 −20%라는 영구 대가를 제안한다. 부활 직후 짧은 무적은 추가하지 않는다.","combatEffectText":"CD 55초. 준비한 형식을 실행하고 선택을 초기화한다. 부활을 이미 썼으면 SP 8 회복.","actionEffectText":"CD 40초. 15초간 다음 전투 스킬을 ‘대검’ 또는 ‘마력 난사’로 준비한다. 대검: 220%·준비 1.2초 / 난사: 60%×3회·회당 독립 명중, 0.2초 간격. 기본은 난사다.","reworkVersion":1},{"id":"c38","name":"하나린","passive":"검성의 간격","combat":"월광 발도","action":"검집의 정적","arch":"duel","baseHp":98,"baseSp":106,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"단검","startProf":35,"passiveEffectText":"같은 대상에게 일반 공격을 적중시키면 간파 1개, 최대 2개·12초. 간파가 있는 적에게 명중 +20%p. 대상 변경 시 초기화한다.","combatEffectText":"CD 45초. 피해 170%, 간파 전부 소모해 하나당 +30%p(최대 230%).","actionEffectText":"CD 30초. 8초간 다음 직접 피격 피해 −25%, 간파 1개를 현재 확인한 대상에 준비한다.","reworkVersion":1},{"id":"c39","name":"엠마","passive":"증폭","combat":"과부하 충격","action":"출력 선택","arch":"brute","baseHp":104,"baseSp":98,"baseAtk":8,"baseDef":3,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"일반 공격 적중 시 10초간 증폭 1개, 최대 3개. 하나라도 있으면 공격력 +20%. 3개 상태에서는 받는 직접 피해도 +20%.","combatEffectText":"CD 50초. 피해 150% + 증폭당 30%p(최대 240%). 전부 소비하고 자신 HP 5 소모, HP 5 이하면 사용 불가.","actionEffectText":"CD 30초. 12초간 ‘자기 증폭’(증폭 +1) 또는 ‘역증폭 준비’ 중 선택. 역증폭은 다음 일반 공격 적중 시 적 공격력 −25% 8초를 기본 100%로 시도, 1회 소모.","reworkVersion":1},{"id":"c40","name":"영령","passive":"사냥감의 공포","combat":"장산범의 울음","action":"안개 환술","arch":"fear","baseHp":101,"baseSp":118,"baseAtk":7.9,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"공포 또는 혼란인 적에게 피해 +25%. 그 적을 처치하면 HP 15 회복.","combatEffectText":"CD 50초. 피해 150%·공포 기본 100%. 공격 전부터 대상이 혼란이면 190%.","actionEffectText":"CD 40초. 현재 지역 15초간 환영 안개. 자신 피탐지 확률 −25%p. 적이 이 지역에서 탐색을 완료하면 혼란 기본 60%를 1인당 한 번만 시도. 지역에 안개 경고를 표시한다.","reworkVersion":1},{"id":"c41","name":"샤를노아","passive":"변이 관찰","combat":"두근두근 변이 광선","action":"키메라 적응","arch":"status","baseHp":104,"baseSp":112,"baseAtk":7.8,"baseDef":3,"preferredWeapon":"도구","startProf":20,"passiveEffectText":"자신이 같은 대상에게 서로 다른 디버프 2종을 성공시키면 15초간 그 대상에게 피해 +25%. 지속시간 갱신만 허용한다.","combatEffectText":"CD 45초. 피해 150%. 독 1중첩·출혈 1중첩·둔화 1중첩 중 서로 다른 2개를 무작위 선택해 각각 기본 80% 시도한다.","actionEffectText":"CD 35초. 15초간 갑각(방어력 +25%) 또는 재생(3초마다 HP 4, 총 5회)을 선택. 두 형태 중복 불가.","reworkVersion":1},{"id":"c42","name":"나리 옌","passive":"용의 위압","combat":"청룡의 명령","action":"용안 응시","arch":"control","baseHp":100,"baseSp":116,"baseAtk":7.6,"baseDef":2,"preferredWeapon":"마도구","startProf":35,"passiveEffectText":"자신이 제어 상태를 성공시킨 적에게 10초간 공격력 −20%인 위압을 기본 100%로 별도 시도한다. 위압은 최대 1개, 저항 가능.","combatEffectText":"CD 55초. 피해 160%·속박 기본 80%. 자신의 지배가 남아 있으면 소모하고 210%.","actionEffectText":"준비 1.5초·CD 40초. 현재 확인한 적에게 ‘지배’ 10초를 기본 100%로 시도. 지배 중 그 적의 첫 전투 스킬은 준비시간 +25%, 완료 또는 취소 시 지배 소모. 입력 버튼을 바꿔치기하지 않는다.","reworkVersion":1},{"id":"c43","name":"시즈쿠","passive":"요르문간드","combat":"독성 붕괴","action":"맹독 농축","arch":"poison","baseHp":100,"baseSp":118,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"도구","startProf":35,"passiveEffectText":"자신이 부여한 독의 틱 피해 +25%. 독 중첩 상한 3과 지속시간은 공통값을 유지한다.","combatEffectText":"CD 50초. 피해 150%. 자신의 독 중첩을 최대 3개 소모해 하나당 +30%p(최대 240%). 시즈쿠 자신의 독이 없으면 독 1중첩 기본 100%를 시도한다.","actionEffectText":"CD 35초. 15초 내 다음 일반 공격 적중 시 독 2중첩을 기본 100%로 시도. 적중 시 소모하고, 빗나가면 남은 시간 동안 유지한다.","reworkVersion":1},{"id":"c44","name":"릴리아","passive":"거인의 갑주","combat":"기사장의 일격","action":"중량 자세","arch":"tank","baseHp":112,"baseSp":96,"baseAtk":7.2,"baseDef":5,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"받는 직접 피해 −25%, 일반 공격 준비시간 +25%.","combatEffectText":"준비 1.5초·CD 55초. 피해 220%. 스킬을 준비하는 동안 받는 직접 피해 −20%. 적중 시 행동지연 기본 100%.","actionEffectText":"CD 35초. 12초간 최대 HP 20% 보호막. 유지 중 자신의 이동·도주시간 +25%.","reworkVersion":1},{"id":"c45","name":"메리앤","passive":"달콤한 꿈","combat":"악몽의 별","action":"꿈구름","arch":"sleep","baseHp":100,"baseSp":120,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"자신이 수면을 성공시키면 HP 12·SP 8 회복(대상별 20초당 1회). 자기에게 수면을 걸거나 이미 잠든 대상에게 갱신해서 자원을 만들 수 없다.","combatEffectText":"CD 50초. 피해 150%. 수면 대상이면 210%로 대체하며 피해로 깨운다. 이후 현재 규칙대로 12초간 수면 면역.","actionEffectText":"CD 45초. 현재 확인한 적 1명에게 수면 기본 100% 시도, 직접 피해 없음.","reworkVersion":1},{"id":"c46","name":"량아 레하","passive":"미스디렉션","combat":"커튼 콜","action":"진자의 암시","arch":"deception","baseHp":100,"baseSp":120,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"투척무기","startProf":20,"passiveEffectText":"자신의 혼란 상태인 적에게 받는 직접 피해 −25%. 혼란 상태가 끝나면 즉시 정상으로 돌아간다.","combatEffectText":"CD 45초. 피해 160%. 자신의 암시를 소모하면 190%·혼란 기본 100%.","actionEffectText":"CD 35초. 현재 확인한 적에게 암시 15초를 기본 100%로 시도한다. 암시 자체로 행동을 차단하지 않고, 상단에 고유 표식만 표시한다.","reworkVersion":1},{"id":"c47","name":"아브락사스","passive":"이상향의 향기","combat":"향기로운 급습","action":"비상","arch":"mobility","baseHp":99,"baseSp":106,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"특수무기","startProf":35,"passiveEffectText":"자신이 직접 공격을 적중시키면 향기 10초를 기본 80%로 시도. 향기는 적 공격력 −20%, 중첩 불가.","combatEffectText":"CD 45초. 피해 160%, 자신의 향기 상태인 적에게 200%. 완료 후 10초 내 다음 이동시간 −25%(비상과는 더 강한 하나만 적용).","actionEffectText":"CD 35초. 다음 이동시간 −30%·SP 0(12초 내 1회). 현재 지역 적에게는 자신이 날아오르는 소음 알림이 간다. 속박 상태 사용 불가.","reworkVersion":1},{"id":"c48","name":"에덴","passive":"봉쇄자","combat":"붉은 구속","action":"사슬 조준","arch":"bind","baseHp":100,"baseSp":112,"baseAtk":7.7,"baseDef":3,"preferredWeapon":"검","startProf":35,"passiveEffectText":"침묵 또는 속박인 적에게 피해 +25%. 같은 적에 대한 자기 속박 종료 후 10초간 새 속박을 부여할 수 없다(사슬을 끊을 틈).","combatEffectText":"CD 55초. 피해 150%·침묵 기본 80%. 자신의 사슬 표식이 있으면 소모해 속박 기본 100%도 별도로 시도한다.","actionEffectText":"CD 35초. 확인한 적에게 사슬 표식 15초를 기본 100%로 시도한다. 위치를 실시간 추적하지 않는다.","reworkVersion":1},{"id":"c49","name":"아바돈","passive":"벨제부브","combat":"폭식 충동","action":"포식","arch":"devour","baseHp":102,"baseSp":96,"baseAtk":7.8,"baseDef":3,"preferredWeapon":"특수무기","startProf":35,"passiveEffectText":"회복 음식의 HP 효과 +25%. 실제 음식을 소비하면 포식 1개, 최대 3개. 약품·물 반복 사용은 포식 자원을 만들지 않는다. 포만도 감소 속도 +25%라는 대가를 둔다.","combatEffectText":"CD 50초. 피해 160% + 포식당 20%p(최대 220%), 전부 소비. 실제 HP 피해의 25% 회복.","actionEffectText":"CD 40초. 현재 지역 플레이어 시체 하나를 소비해 HP 20·포식 1개. 시체가 없으면 포만도 15 소모해 HP 10·포식 1개. 포만도 15 미만이면 불가. 시체의 미수령 전리품은 먼저 선택창으로 처리하고 자동 삭제하지 않는다.","reworkVersion":1},{"id":"c50","name":"천소","passive":"운디네의 순환","combat":"고압 수류","action":"수형변환","arch":"utility","baseHp":98,"baseSp":118,"baseAtk":7.5,"baseDef":2,"preferredWeapon":"특수무기","startProf":20,"passiveEffectText":"전투 스킬 완료 후 수류 1개, 최대 2개. 수류 보유 중 휴식 SP 회복 +30%.","combatEffectText":"CD 40초. 피해 150%·둔화 1중첩 기본 80%. 수류를 보유하고 있으면 하나 소모해 190%, 완료 후 패시브로 수류 1개를 얻는다.","actionEffectText":"CD 30초. 수류 1개를 소모해 순환(HP 12·SP 12 회복) 또는 세척(자신의 해제 가능한 디버프 1종 제거)을 선택한다. 수류가 없으면 대신 SP 4를 순회복하고 수류 1개를 만든다(기본 비용 납부 후 총 12 회복).","reworkVersion":1},{"id":"c51","name":"백은설","passive":"마법어 수집","combat":"키워드 마법탄","action":"랜덤 키워드","arch":"keyword","baseHp":98,"baseSp":122,"baseAtk":8.3,"baseDef":1,"preferredWeapon":"마법서","startProf":20,"passiveEffectText":"랜덤 키워드를 중복 포함 최대 10개 보관 · 마법탄 발사 시 전부 사용·소모 · 보관 중 시간 경과로 소멸하지 않음","combatEffectText":"기본 피해 120% · 보유 키워드 모든 중첩의 효과 적용 후 전부 소모 · 명중은 공통 한계 적용, 방어 무시 최대 100%, 피해 보정 최소 기본 위력의 20% · 회복·활력·반동은 빗나가도 적용 · SP 12 / CD 45초 유지","actionEffectText":"CD 3초 · SP 5 · 기존 준비시간 2초 · 이로운 5종(추적: 명중 +20%p, 증폭: 피해 +20%, 관통: 방어력 20% 무시, 회복: HP +5, 활력: SP +3)과 부정적 3종(산란: 명중 −20%p, 쇠약: 피해 −20%, 반동: 자신 HP −5) 중 동일 확률로 1개 획득 · 같은 단어 중복 가능 · 총 최대 10개","reworkVersion":1},{"id":"c52","name":"{user}","passive":"테스트 캐릭터","combat":"테스트 스킬: 상대 즉사","action":"테스트 스킬: 모든 디버프","arch":"test","baseHp":100,"baseSp":100,"baseAtk":8,"baseDef":2,"preferredWeapon":"특수무기","startProf":20,"testOnly":true,"passiveEffectText":"무적 · 전투·독·출혈·환경 피해 및 즉사 면역","combatEffectText":"조우한 상대 즉사 · 명중 판정 및 부활 무시 · 무적 대상 제외","actionEffectText":"모든 디버프 9종을 자신에게 각각 1중첩 부여"}];
const REGIONS=[{"id":"city","name":"텅 빈 도심"},{"id":"estate","name":"서노리의 저택"},{"id":"church","name":"교회"},{"id":"factory","name":"폐공장"},{"id":"mgmt_lobby","name":"관리국 1층 로비"},{"id":"mgmt_admin","name":"관리국 2층 행정실"},{"id":"mgmt_director","name":"관리국 3층 비서실&국장실"},{"id":"mgmt_cafeteria","name":"관리국 지하1층 구내식당"},{"id":"mgmt_lab","name":"관리국 지하3층 연구실"},{"id":"mgmt_training","name":"관리국 지하5층 훈련장"},{"id":"evil_reception","name":"악의조직 접견실"},{"id":"evil_quarters","name":"악의조직 간부 개인숙소 층"},{"id":"evil_training","name":"악의조직 훈련장"}];
const EDGES=[["city","estate"],["city","church"],["city","factory"],["city","mgmt_lobby"],["city","evil_reception"],["estate","church"],["factory","evil_reception"],["evil_reception","evil_quarters"],["evil_reception","evil_training"],["evil_quarters","evil_training"],["mgmt_lobby","mgmt_admin"],["mgmt_lobby","mgmt_director"],["mgmt_lobby","mgmt_cafeteria"],["mgmt_lobby","mgmt_lab"],["mgmt_lobby","mgmt_training"],["mgmt_admin","mgmt_director"],["mgmt_admin","mgmt_cafeteria"],["mgmt_admin","mgmt_lab"],["mgmt_admin","mgmt_training"],["mgmt_director","mgmt_cafeteria"],["mgmt_director","mgmt_lab"],["mgmt_director","mgmt_training"],["mgmt_cafeteria","mgmt_lab"],["mgmt_cafeteria","mgmt_training"],["mgmt_lab","mgmt_training"]];

for(const c of CHARACTERS){if(c.id==='c07')c.preferredWeapon='총';if(c.id==='c38')c.preferredWeapon='검';}
const CHARACTER_BY_ID=new Map(CHARACTERS.map(c=>[c.id,c]));
const REGION_BY_ID=new Map(REGIONS.map(r=>[r.id,r]));
const ADJACENCY=Object.fromEntries(REGIONS.map(r=>[r.id,[]]));
for(const[a,b]of EDGES){ADJACENCY[a].push(b);ADJACENCY[b].push(a)}
function isValidCharacter(id){return CHARACTER_BY_ID.has(id)}
function isValidRegion(id){return REGION_BY_ID.has(id)}
function movementProfile(from,to){
  const mgmt=new Set(["mgmt_lobby","mgmt_admin","mgmt_director","mgmt_cafeteria","mgmt_lab","mgmt_training"]);
  const evil=new Set(["evil_reception","evil_quarters","evil_training"]);
  if(mgmt.has(from)&&mgmt.has(to))return{durationMs:1800,spCost:3,label:"관리국 내부 이동"};
  if(evil.has(from)&&evil.has(to))return{durationMs:2000,spCost:4,label:"악의조직 내부 이동"};
  return{durationMs:3000,spCost:5,label:"지역 이동"};
}
function createServerPlayer(session,index){
  const c=CHARACTER_BY_ID.get(session.charId)||CHARACTERS[0],region=isValidRegion(session.startRegion)?session.startRegion:"city",proficiency={};
  if(c.preferredWeapon)proficiency[c.preferredWeapon]=c.startProf||0;
  return{playerId:`p${index+1}`,sessionId:session.sessionId,playerName:session.playerName,charId:c.id,region,maxHp:c.baseHp,maxSp:c.baseSp,hp:c.baseHp,sp:c.baseSp,satiety:100,alive:true,kills:0,eq:[],mat:{},con:{},statuses:{},rework:reworkState({charId:c.id}),proficiency,encounter:null,pendingAction:null,rev:false,isAI:false,ai:null,lastFoodId:null,lastFoodAt:0,foodRepeatCount:0,delayedEffects:[],lastAttackAt:0,lastMoveAt:0,moveHitReady:false,attackChainTarget:null,attackChainHits:0,namedChainTarget:null,namedChainHits:0,nextHitBonus:0,nextDamageBonus:0,nextSkillDamageBonus:0,nextCritBonus:0,nextDetectBonus:0,nextSearchLootBonus:0,nextSkillSpDiscount:0,nextCraftTimeMult:1,nextStatusBonus:{},tempGuardUntil:0,tempGuardRate:0,lastDetectedTarget:null,redetectReady:false,trackingMarks:{},detoxStealthUntil:0};
}

function createAIPlayer(index,charId,region,profile="balanced"){
  const c=CHARACTER_BY_ID.get(charId)||CHARACTERS[0],proficiency={};
  if(c.preferredWeapon)proficiency[c.preferredWeapon]=c.startProf||0;
  return{playerId:`p${index+1}`,sessionId:null,playerName:c.name,charId:c.id,region:isValidRegion(region)?region:"city",maxHp:c.baseHp,maxSp:c.baseSp,hp:c.baseHp,sp:c.baseSp,satiety:100,alive:true,kills:0,eq:[],mat:{},con:{},statuses:{},rework:reworkState({charId:c.id}),proficiency,encounter:null,pendingAction:null,rev:false,isAI:true,ai:profile,lastFoodId:null,lastFoodAt:0,foodRepeatCount:0,delayedEffects:[],lastAttackAt:0,lastMoveAt:0,moveHitReady:false,attackChainTarget:null,attackChainHits:0,namedChainTarget:null,namedChainHits:0,nextHitBonus:0,nextDamageBonus:0,nextSkillDamageBonus:0,nextCritBonus:0,nextDetectBonus:0,nextSearchLootBonus:0,nextSkillSpDiscount:0,nextCraftTimeMult:1,nextStatusBonus:{},tempGuardUntil:0,tempGuardRate:0,lastDetectedTarget:null,redetectReady:false,trackingMarks:{},detoxStealthUntil:0};
}


return {CHARACTERS,REGIONS,EDGES,CHARACTER_BY_ID,REGION_BY_ID,ADJACENCY,isValidCharacter,isValidRegion,movementProfile,createServerPlayer,createAIPlayer};
})();
__modules["src/region_restrictions.js"]=(()=>{
const {REGIONS}=__modules["src/game_data.js"];
const SAFE_PASSAGES=['city','mgmt_lobby','evil_reception'];
const LOCK_INTERVAL=180,FINAL_CITY_TIME=780;
const matchElapsedSeconds=(m,now)=>Math.max(0,(now-m.startedAt)/1000);
function isRegionLocked(match,id){return (match.regionRestrictions?.locked||[]).includes(id)}
function nextRegionLockAt(match){
 const next=match.regionRestrictions?match.regionRestrictions.nextAt:LOCK_INTERVAL;
 return next===null?null:match.startedAt+next*1000;
}
function updateRegionRestrictions(match,now=Date.now()){
 if(match.phase==='finished')return false;
 const seconds=matchElapsedSeconds(match,now),final=seconds>=FINAL_CITY_TIME,round=final?5:Math.floor(seconds/LOCK_INTERVAL);
 const before=match.regionRestrictions;
 if(before?.round===round)return false;
 const candidates=REGIONS.map(r=>r.id).filter(id=>!SAFE_PASSAGES.includes(id)&&!(before?.locked||[]).includes(id));
 const locked=[];
 if(final)locked.push(...REGIONS.filter(r=>r.id!=='city').map(r=>r.id));
 else if(round>0)while(locked.length<2&&candidates.length){const index=Math.floor(Math.random()*candidates.length);locked.push(candidates.splice(index,1)[0])}
 match.regionRestrictions={round,locked,final,nextAt:final?null:Math.min((round+1)*LOCK_INTERVAL,FINAL_CITY_TIME)};
 const moved=new Set();
 for(const p of match.players||[]){
  if(final||locked.includes(p.region)){
   p.region='city';p.pendingAction=null;p.pendingEvent=null;p.encounter=null;moved.add(p.playerId);
  }else if(p.pendingAction?.type==='move'&&locked.includes(p.pendingAction.payload?.to))p.pendingAction=null;
 }
 for(const p of match.players||[])if(p.encounter?.kind==='player'&&moved.has(p.encounter.targetId))p.encounter=null;
 return true;
}


return {SAFE_PASSAGES,LOCK_INTERVAL,matchElapsedSeconds,isRegionLocked,nextRegionLockAt,updateRegionRestrictions};
})();
__modules["src/protocol.js"]=(()=>{
const MAX_HUMANS = 10;
const ROOM_CODE_LENGTH = 6;
const ROOM_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

function safeRoomCode(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, ROOM_CODE_LENGTH);
}

function randomRoomCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(ROOM_CODE_LENGTH));
  let out = "";
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) out += ROOM_CODE_ALPHABET[bytes[i] % ROOM_CODE_ALPHABET.length];
  return out;
}

function safeText(value, max = 32, fallback = "") {
  const s = String(value ?? fallback).trim().slice(0, max);
  return s || fallback;
}

function parseJsonMessage(message) {
  try {
    const text = typeof message === "string" ? message : new TextDecoder().decode(message);
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function send(ws, type, payload = {}) {
  try {
    ws.send(JSON.stringify({ type, ...payload }));
    return true;
  } catch {
    return false;
  }
}


return {MAX_HUMANS,ROOM_CODE_LENGTH,ROOM_CODE_ALPHABET,json,safeRoomCode,randomRoomCode,safeText,parseJsonMessage,send};
})();
__modules["src/room_settings.js"]=(()=>{
const {MAX_HUMANS}=__modules["src/protocol.js"];
const MAX_COMPETITORS=11;
function normalizeRoomSettings(body={}){
 if(!body||typeof body!=='object'||Array.isArray(body))return {ok:false,error:'invalid_room_settings'};
 const name=String(body.name??'').replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,32)||'생존게임 방';
 const aiMode=body.aiMode??'fill';
 if(!['fill','none','fixed'].includes(aiMode))return {ok:false,error:'invalid_ai_mode'};
 const aiCount=aiMode==='fixed'?body.aiCount:0;
 if(!Number.isInteger(aiCount)||aiCount<0||aiCount>10)return {ok:false,error:'invalid_ai_count'};
 return {ok:true,settings:{name,aiMode,aiCount}};
}
function roomSettings(meta){return normalizeRoomSettings(meta).settings||normalizeRoomSettings().settings}
function humanCapacity(meta){const s=roomSettings(meta);return Math.min(MAX_HUMANS,MAX_COMPETITORS-(s.aiMode==='fixed'?s.aiCount:0))}
function plannedAICount(meta,humans){const s=roomSettings(meta);return s.aiMode==='fill'?Math.max(0,MAX_COMPETITORS-humans):s.aiMode==='fixed'?s.aiCount:0}


return {MAX_COMPETITORS,normalizeRoomSettings,roomSettings,humanCapacity,plannedAICount};
})();
__modules["src/inventory_ops.js"]=(()=>{
const {uniqueMaterialExists,isUniqueMaterial}=__modules["src/unique_materials.js"];
const {ITEMS}=__modules["src/offline_content.js"];
function equipmentSalvage(id){
 const it=ITEMS[id];return it?.t==='e'&&it.r?Object.entries(it.r).map(([id,count])=>({id,count,name:ITEMS[id].n,t:ITEMS[id].t})):[];
}
function offerSearchConsumable(match,p,id,count=1){
 if(p.isAI||p.pickupChoices===false||p.pendingPickup)return false;
 match.pickupSeq=(match.pickupSeq||0)+1;
 p.pendingPickup={token:p.playerId+':'+match.pickupSeq,id,count,name:ITEMS[id].n};return true;
}
function offerEquipment(match,p,id,count=1){
 if(p.isAI||p.pickupChoices===false)return false;
 for(let i=0;i<count;i++){
  match.pickupSeq=(match.pickupSeq||0)+1;
  const reward={token:p.playerId+':'+match.pickupSeq,id,count:1,name:ITEMS[id].n,kind:'equipment'};
  if(p.pendingPickup)(p.pickupQueue??=[]).push(reward);else p.pendingPickup=reward;
 }
 return true;
}
function advancePickup(p){p.pendingPickup=p.pickupQueue?.shift()||null}
function inventoryOperation(match,p,msg){
 if(match?.phase!=='playing'||!p?.alive)return {ok:false,error:'player_not_active'};
 if(p.pendingAction)return {ok:false,error:'action_in_progress'};
 const mode=msg.mode;
 if(mode==='resolve_pickup'){
  const pickup=p.pendingPickup;if(!pickup||msg.token!==pickup.token)return {ok:false,error:'pickup_missing'};
  if(msg.choice==='discard'){advancePickup(p);return {ok:true,mode,discarded:true,itemId:pickup.id}}
  if(msg.choice!=='replace')return {ok:false,error:'invalid_inventory_choice'};
  if(pickup.kind==='equipment'){
   let discarded=null;
   if(p.eq.length>=3){
    if(!Number.isInteger(msg.replaceIndex)||msg.replaceIndex<0||msg.replaceIndex>=p.eq.length||p.eq[msg.replaceIndex]!==msg.replaceId)return {ok:false,error:'replacement_missing'};
    discarded={id:p.eq[msg.replaceIndex],count:1};p.eq.splice(msg.replaceIndex,1);
   }
   p.eq.push(pickup.id);advancePickup(p);return {ok:true,mode,itemId:pickup.id,count:1,discarded};
  }
  const existing=Object.keys(p.con).filter(id=>p.con[id]>0),merges=(p.con[pickup.id]||0)>0;
  if(!merges&&existing.length>=3&&(!existing.includes(msg.replaceId)||msg.replaceId===pickup.id))return {ok:false,error:'replacement_missing'};
  let discarded=null;
  if(!merges&&existing.length>=3){discarded={id:msg.replaceId,count:p.con[msg.replaceId]};delete p.con[msg.replaceId]}
  p.con[pickup.id]=(p.con[pickup.id]||0)+pickup.count;advancePickup(p);
  return {ok:true,mode,itemId:pickup.id,count:pickup.count,discarded};
 }
 if(p.pendingPickup)return {ok:false,error:'pickup_choice_required'};
 if(mode==='drop_consumable'){
  if(ITEMS[msg.id]?.t!=='c'||!(p.con[msg.id]>0))return {ok:false,error:'item_missing'};
  const count=p.con[msg.id];delete p.con[msg.id];return {ok:true,mode,itemId:msg.id,count};
 }
 if(!['drop_equipment','dismantle_equipment'].includes(mode))return {ok:false,error:'invalid_inventory_choice'};
 if(!Number.isInteger(msg.index)||msg.index<0||p.eq[msg.index]!==msg.id)return {ok:false,error:'item_missing'};
 const rewards=mode==='dismantle_equipment'?equipmentSalvage(msg.id):[];
 if(mode==='dismantle_equipment'&&!rewards.length)return {ok:false,error:'cannot_dismantle'};
 const eqCount=p.eq.length-1+rewards.filter(x=>x.t==='e').reduce((n,x)=>n+x.count,0);
 if(eqCount>3)return {ok:false,error:'equipment_full'};
 const cons=new Set(Object.keys(p.con).filter(id=>p.con[id]>0));for(const x of rewards)if(x.t==='c')cons.add(x.id);
 if(cons.size>3)return {ok:false,error:'inventory_full'};
 for(const x of rewards)if(isUniqueMaterial(x.id)&&(match.uniqueSpecials?.[x.id]?.state!=='consumed'||uniqueMaterialExists(match,x.id,p,msg.index)))return {ok:false,error:'special_already_exists'};
 p.eq.splice(msg.index,1);
 for(const x of rewards){
  if(x.t==='e')for(let i=0;i<x.count;i++)p.eq.push(x.id);
  else{const bag=x.t==='c'?p.con:p.mat;bag[x.id]=(bag[x.id]||0)+x.count}
  if(isUniqueMaterial(x.id))Object.assign(match.uniqueSpecials[x.id],{state:'held',holderId:p.playerId,region:null});
 }
 return {ok:true,mode,itemId:msg.id,rewards};
}


return {equipmentSalvage,offerSearchConsumable,offerEquipment,inventoryOperation};
})();
__modules["src/state_transport.js"]=(()=>{
// Complete baselines on join/resync, ordered per-connection patches afterwards.
const STATE_DELTA_FEATURE='state_delta_v1';
const plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
function stateDiff(before,after,path=[],set=[],remove=[]){
  if(plain(before)&&plain(after)){
    for(const key of Object.keys(before))if(!(key in after))remove.push([...path,key]);
    for(const key of Object.keys(after)){
      if(!(key in before))set.push([[...path,key],after[key]]);
      else stateDiff(before[key],after[key],[...path,key],set,remove);
    }
  }else if(JSON.stringify(before)!==JSON.stringify(after))set.push([path,after]);
  return {set,remove};
}
function substantivePatch(patch){
  const clock=p=>p.length===1&&['serverNow','elapsed','combatNoticeSeq'].includes(p[0])||p.length===2&&p[0]==='self'&&['cdC','cdA'].includes(p[1]);
  return patch.remove.some(p=>!clock(p))||patch.set.some(([p])=>!clock(p));
}
function compactSnapshot(snapshot){
  // Clients already receive the versioned catalog with the complete baseline.
  const fields=['playerId','playerName','charId','region','maxHp','maxSp','hp','sp','satiety','alive','kills','statuses','statusNoticeSeq','statusNotices','buffs','rework','reworkOptions','proficiency','pendingAction','pendingPickup','enemyContacts','enemyTraceSeq','enemyTraceNotices','gardenDetectionSeq','gardenDetectionNotices','rev','isAI','intel','nearbyNoise','atk','def','cdC','cdA','cdCUntil','cdAUntil','cdCDuration','cdADuration','tempEffects','inventory','diedAt','finishRank','deathSource'];
  const s={...snapshot,self:snapshot.self?Object.fromEntries(fields.filter(k=>k in snapshot.self).map(k=>[k,snapshot.self[k]])):null};
  if(s.self?.inventory){const inv=s.self.inventory;s.self.inventory={eq:inv.eq.map(x=>({id:x.id,salvage:x.salvage})),mat:inv.mat.map(x=>({id:x.id,count:x.count})),con:inv.con.map(x=>({id:x.id,count:x.count}))}}
  return JSON.parse(JSON.stringify(s));
}


return {STATE_DELTA_FEATURE,stateDiff,substantivePatch,compactSnapshot};
})();
__modules["src/match_result.js"]=(()=>{
// Resolve results once on the server; retain elimination records across reconnects.
function settleMatch(match,now=Date.now()){
  if(match.phase!=="playing"||match.players.length===0)return false;
  const alive=match.players.filter(p=>p.alive);
  if(match.players.length===1&&alive.length===1)return false;
  for(const p of match.players){
    if(!p.alive){p.diedAt??=now;p.finishRank??=alive.length+1}
  }
  if(alive.length>1)return false;
  match.phase="finished";match.endedAt=now;match.elapsed=Math.max(0,Math.floor((now-match.startedAt)/1000));
  match.winnerId=alive[0]?.playerId||null;
  for(const p of match.players){p.pendingAction=null;p.encounter=null;p.pendingEvent=null;p.pendingPickup=null;p.pickupQueue=[]}
  return true;
}
function playerResult(match,p,now=Date.now()){
  if(!p||p.alive&&match.phase!=="finished")return null;
  const won=p.alive&&match.winnerId===p.playerId;
  const end=p.alive?(match.endedAt||now):(p.diedAt||now);
  return {outcome:won?"victory":p.alive?"finished":"defeat",rank:won?1:(p.finishRank||null),
    total:match.players.length,kills:p.kills||0,survivalSeconds:Math.max(0,Math.floor((end-match.startedAt)/1000)),
    region:p.region,endedAt:end,...(p.deathSource?{deathSource:p.deathSource}:{})};
}


return {settleMatch,playerResult};
})();
__modules["src/named_gear_runtime.js"]=(()=>{
const {NAMED_ITEMS}=__modules["src/named_gear.js"];
function createNamedGearSystem(api){
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


return {createNamedGearSystem};
})();
__modules["src/status_notices.js"]=(()=>{
// Receiver-private, persisted event stream. Never infer applications from snapshots.
const STATUS_NAMES={poison:'독',bleed:'출혈',slow:'둔화',bind:'속박',sleep:'수면',fear:'공포',confusion:'혼란',silence:'침묵',actionDelay:'행동지연',doll:'인형',timeStop:'시간정지',awe:'용의 위압',reverseAmp:'역증폭',fragrance:'이상향의 향기',talisman:'부적 표식',starTarget:'집착 대상',domination:'지배',suggestion:'암시',chainMark:'사슬 표식'};
function appendStatusNotice(target,{statusId,sourceId=null,sourceName='환경',cause='환경 효과',at,stacks=1}){
 if(!target?.playerId)return;
 target.statusNoticeSeq=(target.statusNoticeSeq||0)+1;
 const row={id:target.statusNoticeSeq,at,statusId,statusName:STATUS_NAMES[statusId]||statusId,sourceId,sourceName,cause,stacks};
 (target.statusNotices??=[]).push(row);target.statusNotices=target.statusNotices.slice(-64);return row;
}


return {STATUS_NAMES,appendStatusNotice};
})();
__modules["src/enemy_contacts.js"]=(()=>{
// Remember observations, never query an enemy's current state when displaying history.
function rememberEnemy(player,contact,at){
 if(!player?.playerId||!contact?.id||contact.id===player.playerId)return;
 const book=player.enemyContacts??={};
 const rows=book[player.region]??=[];
 const index=rows.findIndex(row=>row.id===contact.id);
 if(index>=0){
  if(contact.source==='incoming')return;
  rows[index]={...contact,at,region:player.region};
 }else rows.unshift({...contact,at,region:player.region});
 book[player.region]=rows.slice(0,32);
}
function rememberIncoming(player,source,name,at,reason=null){
 const id=source?.playerId||source?.id;if(!id)return;
 rememberEnemy(player,{id,name,kind:source.playerId?'player':'wild',source:'incoming',...(reason?{reason}:{}),hp:null,maxHp:null,alive:null},at);
}
function pruneEnemyTraces(match,player,at){
 const rows=player.enemyContacts?.[player.region]||[];
 const disappeared=rows.filter(row=>{
  const target=(row.kind==='wild'?match.wilds:match.players)?.find(x=>(x.playerId||x.id)===row.id);
  return !target?.alive||target.region!==player.region;
 });
 if(!disappeared.length)return;
 const ids=new Set(disappeared.map(x=>x.id));
 player.enemyContacts[player.region]=rows.filter(x=>!ids.has(x.id));
 for(const row of disappeared){
  player.enemyTraceSeq=(player.enemyTraceSeq||0)+1;
  (player.enemyTraceNotices??=[]).push({id:player.enemyTraceSeq,targetId:row.id,name:row.name,region:player.region,at});
 }
 player.enemyTraceNotices=player.enemyTraceNotices.slice(-32);
}


return {rememberEnemy,rememberIncoming,pruneEnemyTraces};
})();
__modules["src/skill_defs.js"]=(()=>{
const {NAMED_GEAR_EFFECTS}=__modules["src/named_gear.js"];
const {REWORK_CONFIG}=__modules["src/character_reworks.js"];
// Extracted verbatim from the v0.6.4 offline build.
const PASSIVE_FX={
  "c01": {
    "gardenSearchLoot": 0.3,
    "gardenRestHeal": 0.35,
    "gardenRestSp": 0.35
  },
  "c02": {
    "conceal": 0.2,
    "confusionChance": 0.2
  },
  "c03": {
    "heal": 0.2,
    "incomingStatusDuration": -0.2
  },
  "c04": {
    "taken": -0.2,
    "lowHpDamage": 0.2
  },
  "c05": {
    "detect": 0.2,
    "hit": 0.2
  },
  "c06": {
    "moveTime": -0.2,
    "afterMoveHit": 0.2
  },
  "c07": {
    "detect": 0.2,
    "skillSpFlat": 1
  },
  "c08": {
    "statusDuration": 0.2,
    "restSp": 0.2
  },
  "c09": {
    "conceal": 0.2
  },
  "c10": {
    "timeAtk": 0.5,
    "timeAtkEvery": 120,
    "timeAtkCap": 3
  },
  "c11": {
    "damage": 0.2,
    "moveSp": 1
  },
  "c12": {
    "statusChance": 0.2,
    "slowChance": 0.2
  },
  "c13": {
    "heal": 0.2,
    "restHeal": 0.2
  },
  "c14": {
    "prep": -0.2,
    "cdRate": 0.2
  },
  "c15": {
    "detect": 0.2,
    "woundedDetect": 0.2
  },
  "c16": {
    "craftTime": -0.2,
    "searchLoot": 0.2
  },
  "c17": {
    "poisonChance": 0.2,
    "poisonVsDamage": 0.2
  },
  "c18": {
    "moveTime": -0.2,
    "afterMoveDamage": 0.2
  },
  "c19": {
    "killHeal": 4,
    "killSp": 5
  },
  "c20": {
    "detect": 0.2,
    "hit": 0.2,
    "skillHit": 0.2
  },
  "c21": {
    "prep": -0.2,
    "moveTime": -0.2
  },
  "c22": {
    "hit": 0.2,
    "crit": 0.2
  },
  "c23": {
    "taken": -0.2,
    "lowDef": 4
  },
  "c24": {
    "lowDef": 3,
    "lowHpDamage": 0.2
  },
  "c25": {
    "crit": 0.2,
    "searchLoot": 0.2
  },
  "c26": {
    "restHeal": 0.2,
    "statusChance": 0.2
  },
  "c27": {
    "crit": 0.2,
    "randomSkill": true
  },
  "c28": {
    "incomingStatusDuration": -0.2,
    "taken": -0.2
  },
  "c29": {
    "skillSpFlat": 1,
    "incomingStatusDuration": -0.2
  },
  "c30": {
    "detect": 0.2,
    "profGain": 0.2
  },
  "c31": {
    "damage": 0.2,
    "defFlat": 2
  },
  "c32": {
    "heal": 0.2,
    "poisonChance": 0.2
  },
  "c33": {
    "lowHpDamage": 0.2,
    "detect": 0.2
  },
  "c34": {
    "taken": -0.2,
    "chainPerHit": 0.2,
    "chainMax": 0.8
  },
  "c35": {
    "incomingStatusDuration": -0.2,
    "skillHit": 0.2
  },
  "c36": {
    "conceal": 0.2,
    "quietDamage": 0.2
  },
  "c37": {
    "revive": 1
  },
  "c38": {
    "hit": 0.2,
    "crit": 0.2,
    "damage": 0.2
  },
  "c39": {
    "damage": 0.2,
    "taken": 0.2
  },
  "c40": {
    "fearChance": 0.2,
    "statusDuration": 0.2
  },
  "c41": {
    "incomingStatusDuration": -0.2,
    "lowDef": 2
  },
  "c42": {
    "detect": 0.2,
    "statusChance": 0.2
  },
  "c43": {
    "poisonChance": 0.2,
    "poisonVsDamage": 0.2
  },
  "c44": {
    "damage": 0.2,
    "taken": -0.2,
    "prep": 0.2
  },
  "c45": {
    "sleepChance": 0.2,
    "statusDuration": 0.2
  },
  "c46": {
    "conceal": 0.2,
    "confusionChance": 0.2
  },
  "c47": {
    "moveTime": -0.2,
    "moveSp": 1,
    "afterMoveHit": 0.2
  },
  "c48": {
    "bindChance": 0.2,
    "statusDuration": 0.2
  },
  "c49": {
    "killHeal": 8,
    "heal": 0.2
  },
  "c50": {
    "restSp": 0.2,
    "incomingStatusDuration": -0.2
  },
  "c51": {
    "profGain": 0.2,
    "statusChance": 0.2
  },
  "c52": {
    "invincible": true
  }
};
const COMBAT_SKILL_DEFS={
  "c01": {"mult": 1.5, "delayMult": 2, "bindMult": 2.5, "cd": 60, "sp": 12},
  "c02": {
    "mult": 0.9,
    "cd": 52,
    "sp": 11,
    "statuses": [
      [
        "confusion",
        0.55,
        10
      ],
      [
        "silence",
        0.3,
        10
      ]
    ]
  },
  "c03": {
    "mult": 0.7,
    "cd": 48,
    "sp": 10,
    "heal": 14
  },
  "c04": {
    "mult": 1.15,
    "lowHpMult": 1.3,
    "cd": 50,
    "sp": 12
  },
  "c05": {
    "mult": 1.1,
    "cd": 52,
    "sp": 11,
    "hit": 0.15,
    "mark": 30
  },
  "c06": {
    "mult": 1.25,
    "cd": 46,
    "sp": 12,
    "hit": 0.2
  },
  "c07": {
    "mult": 0.9,
    "cd": 54,
    "sp": 10,
    "statuses": [
      [
        "silence",
        0.6,
        10
      ]
    ]
  },
  "c08": {
    "mult": 1,
    "cd": 50,
    "sp": 11,
    "restoreSp": 6,
    "statuses": [
      [
        "slow",
        0.4,
        10
      ]
    ]
  },
  "c09": {
    "mult": 0.95,
    "cd": 48,
    "sp": 10,
    "statuses": [
      [
        "confusion",
        0.5,
        10
      ]
    ]
  },
  "c10": {
    "mult": 1,
    "cd": 50,
    "sp": 10,
    "timeScale": true
  },
  "c11": {
    "mult": 1.3,
    "cd": 54,
    "sp": 13,
    "statuses": [
      [
        "slow",
        0.45,
        10
      ]
    ]
  },
  "c12": {
    "mult": 1.15,
    "cd": 50,
    "sp": 11,
    "statuses": [
      [
        "bleed",
        0.45,
        null
      ]
    ]
  },
  "c13": {
    "mult": 0.6,
    "cd": 45,
    "sp": 10,
    "heal": 20
  },
  "c14": {
    "mult": 0.95,
    "cd": 48,
    "sp": 10,
    "statuses": [
      [
        "actionDelay",
        0.55,
        10
      ]
    ]
  },
  "c15": {
    "mult": 1.2,
    "cd": 55,
    "sp": 12,
    "statuses": [
      [
        "fear",
        0.45,
        5
      ]
    ]
  },
  "c16": {
    "mult": 1.05,
    "cd": 47,
    "sp": 10,
    "randomStatus": true
  },
  "c17": {
    "mult": 1,
    "cd": 52,
    "sp": 11,
    "forcePoison": 2
  },
  "c18": {
    "mult": 1.35,
    "cd": 58,
    "sp": 14,
    "hit": 0.15
  },
  "c19": {
    "mult": 1.25,
    "cd": 52,
    "sp": 12,
    "statuses": [
      [
        "bleed",
        0.4,
        null
      ]
    ],
    "killHeal": 6
  },
  "c20": {
    "mult": 1.55,
    "cd": 72,
    "sp": 16,
    "hit": 0.2
  },
  "c21": {
    "mult": 1.2,
    "cd": 44,
    "sp": 11,
    "crit": 0.2,
    "prep": 0.82
  },
  "c22": {
    "mult": 1.25,
    "cd": 56,
    "sp": 13,
    "statuses": [
      [
        "actionDelay",
        0.35,
        10
      ]
    ]
  },
  "c23": {
    "mult": 0.8,
    "cd": 52,
    "sp": 10,
    "heal": 8,
    "tempGuard": 0.2,
    "tempGuardDuration": 8
  },
  "c24": {
    "mult": 1.2,
    "lowHpMult": 1.4,
    "cd": 50,
    "sp": 12
  },
  "c25": {
    "multMin": 0.9,
    "multMax": 1.45,
    "cd": 46,
    "sp": 10,
    "crit": 0.15
  },
  "c26": {
    "mult": 1.05,
    "cd": 52,
    "sp": 11,
    "statuses": [
      [
        "bind",
        0.45,
        5
      ]
    ]
  },
  "c27": {
    "multMin": 0.85,
    "multMax": 1.45,
    "cd": 48,
    "sp": 11,
    "randomControl": 0.25
  },
  "c28": {
    "mult": 0.9,
    "cd": 58,
    "sp": 12,
    "statuses": [
      [
        "bind",
        0.55,
        5
      ],
      [
        "silence",
        0.35,
        10
      ]
    ]
  },
  "c29": {
    "mult": 1.05,
    "cd": 48,
    "sp": 10,
    "drainSp": 10
  },
  "c30": {
    "mult": 1.1,
    "cd": 50,
    "sp": 11,
    "defIgnore": 0.15
  },
  "c31": {
    "mult": 1.3,
    "cd": 54,
    "sp": 13,
    "statuses": [
      [
        "bleed",
        0.35,
        null
      ]
    ]
  },
  "c32": {
    "mult": 1,
    "cd": 50,
    "sp": 11,
    "statuses": [
      [
        "poison",
        0.45,
        8
      ],
      [
        "slow",
        0.3,
        10
      ]
    ]
  },
  "c33": {
    "mult": 1.35,
    "cd": 50,
    "sp": 10,
    "selfDamage": 4
  },
  "c34": {
    "mult": 1.2,
    "cd": 50,
    "sp": 11,
    "statuses": [
      [
        "actionDelay",
        0.35,
        10
      ]
    ]
  },
  "c35": {
    "mult": 1,
    "cd": 48,
    "sp": 10,
    "dispelOne": true,
    "dispelBonus": 0.15
  },
  "c36": {
    "mult": 1.45,
    "cd": 60,
    "sp": 13,
    "quietBonus": 0.2
  },
  "c37": {
    "mult": 1.25,
    "lowHpMult": 1.45,
    "cd": 56,
    "sp": 13
  },
  "c38": {
    "mult": 1.4,
    "cd": 58,
    "sp": 14,
    "hit": 0.15,
    "crit": 0.2
  },
  "c39": {
    "mult": 1.5,
    "cd": 58,
    "sp": 12,
    "selfDamage": 6
  },
  "c40": {
    "mult": 1,
    "cd": 58,
    "sp": 12,
    "statuses": [
      [
        "fear",
        1,
        5
      ]
    ]
  },
  "c41": {
    "mult": 1.15,
    "cd": 52,
    "sp": 12,
    "doubleRandomStatus": true
  },
  "c42": {
    "mult": 1.1,
    "cd": 56,
    "sp": 12,
    "statuses": [
      [
        "bind",
        0.45,
        5
      ],
      [
        "fear",
        0.35,
        5
      ]
    ]
  },
  "c43": {
    "mult": 1.05,
    "cd": 60,
    "sp": 13,
    "forcePoison": 3
  },
  "c44": {
    "mult": 1.5,
    "cd": 62,
    "sp": 15,
    "hit": 0.15,
    "prep": 1.2
  },
  "c45": {
    "mult": 0.85,
    "cd": 60,
    "sp": 12,
    "statuses": [
      [
        "sleep",
        0.65,
        10
      ]
    ]
  },
  "c46": {
    "mult": 0.95,
    "cd": 54,
    "sp": 11,
    "statuses": [
      [
        "confusion",
        0.65,
        10
      ]
    ]
  },
  "c47": {
    "mult": 1.35,
    "cd": 52,
    "sp": 12,
    "hit": 0.2,
    "freeMove": true
  },
  "c48": {
    "mult": 1.05,
    "cd": 60,
    "sp": 12,
    "statuses": [
      [
        "bind",
        1,
        5
      ]
    ]
  },
  "c49": {
    "mult": 1.3,
    "cd": 58,
    "sp": 13,
    "lifesteal": 0.2
  },
  "c50": {
    "mult": 1.15,
    "cd": 50,
    "sp": 11,
    "restoreSp": 5,
    "statuses": [
      [
        "slow",
        0.4,
        10
      ]
    ]
  },
  "c51": {
    "multMin": 1.1,
    "multMax": 1.35,
    "cd": 50,
    "sp": 11,
    "randomControl": 0.3
  },
  "c52": {
    "mult": 1,
    "cd": 0,
    "sp": 0,
    "execute": true
  }
};
const ACTION_SKILL_DEFS={
  "c01": {"cd": 45, "time": 1, "garden": true, "gardenStatusChance": 1},
  "c02": {
    "cd": 48,
    "time": 0.8,
    "tempFx": {
      "conceal": 0.2
    },
    "duration": 18,
    "nextDetect": 0.2
  },
  "c03": {
    "cd": 50,
    "time": 1,
    "heal": 12,
    "cleanse": [
      "poison",
      "bleed"
    ],
    "cleanseCount": 1
  },
  "c04": {
    "cd": 52,
    "time": 1,
    "tempFx": {
      "defFlat": 3
    },
    "duration": 20,
    "nextSkillSpDiscount": 2
  },
  "c05": {
    "cd": 48,
    "time": 0.8,
    "nextDetect": 0.18,
    "tempFx": {
      "detect": 0.2
    },
    "duration": 25
  },
  "c06": {
    "cd": 42,
    "time": 0.7,
    "nextMoveFree": true,
    "tempFx": {
      "moveTime": -0.2
    },
    "duration": 12
  },
  "c07": {
    "cd": 44,
    "time": 0.8,
    "sp": 12,
    "nextDetect": 0.2
  },
  "c08": {
    "cd": 46,
    "time": 0.9,
    "sp": 10,
    "tempFx": {
      "statusChance": 0.15
    },
    "duration": 20
  },
  "c09": {
    "cd": 50,
    "time": 0.8,
    "tempFx": {
      "conceal": 0.15
    },
    "duration": 20
  },
  "c10": {
    "cd": 46,
    "time": 0.8,
    "sp": 8,
    "tempFx": {
      "crit": 0.15
    },
    "duration": 20
  },
  "c11": {
    "cd": 44,
    "time": 0.8,
    "tempFx": {
      "moveSp": 2
    },
    "duration": 12,
    "nextDamage": 0.15
  },
  "c12": {
    "cd": 50,
    "time": 1.1,
    "trap": true,
    "nextHit": 0.2
  },
  "c13": {
    "cd": 48,
    "time": 1,
    "heal": 16,
    "cleanseSpecific": {
      "bleed": 2
    }
  },
  "c14": {
    "cd": 55,
    "time": 0.7,
    "reduceCombatCd": 12,
    "refundActionCd": 6
  },
  "c15": {
    "cd": 46,
    "time": 0.8,
    "nextDetect": 0.2,
    "tempFx": {
      "woundedDetect": 0.2
    },
    "duration": 20
  },
  "c16": {
    "cd": 50,
    "time": 1.2,
    "material": "iron",
    "materialQty": 1,
    "nextCraftTimeMult": 0.8
  },
  "c17": {
    "cd": 50,
    "time": 1,
    "consumable": "antidote",
    "tempFx": {
      "poisonChance": 0.2
    },
    "duration": 20
  },
  "c18": {
    "cd": 44,
    "time": 0.7,
    "nextMoveFree": true,
    "nextDamage": 0.2
  },
  "c19": {
    "cd": 48,
    "time": 1,
    "corpseHeal": 15,
    "noCorpseSp": 8
  },
  "c20": {
    "cd": 52,
    "time": 0.8,
    "nextDetect": 0.25,
    "nextHit": 0.2
  },
  "c21": {
    "cd": 42,
    "time": 0.7,
    "sp": 8,
    "tempFx": {
      "prep": -0.2
    },
    "duration": 16
  },
  "c22": {
    "cd": 46,
    "time": 0.8,
    "tempFx": {
      "hit": 0.15,
      "detect": 0.2
    },
    "duration": 20
  },
  "c23": {
    "cd": 52,
    "time": 0.9,
    "tempFx": {
      "taken": -0.2
    },
    "duration": 20
  },
  "c24": {
    "cd": 48,
    "time": 0.9,
    "heal": 8,
    "tempFx": {
      "lowDef": 4
    },
    "duration": 20
  },
  "c25": {
    "cd": 44,
    "time": 0.7,
    "luckAction": true
  },
  "c26": {
    "cd": 46,
    "time": 0.9,
    "heal": 6,
    "tempFx": {
      "statusChance": 0.15
    },
    "duration": 18
  },
  "c27": {
    "cd": 50,
    "time": 0.7,
    "sp": 14,
    "nextDamage": 0.2,
    "skillOnlyDamage": true
  },
  "c28": {
    "cd": 54,
    "time": 0.9,
    "tempFx": {
      "incomingStatusDuration": -0.2,
      "conceal": 0.15
    },
    "duration": 20
  },
  "c29": {
    "cd": 44,
    "time": 0.7,
    "sp": 10,
    "nextSkillSpDiscount": 3
  },
  "c30": {
    "cd": 50,
    "time": 0.8,
    "tempFx": {
      "profGain": 0.25,
      "detect": 0.15
    },
    "duration": 25
  },
  "c31": {
    "cd": 50,
    "time": 1.1,
    "randomMetal": true,
    "tempFx": {
      "defFlat": 2
    },
    "duration": 18
  },
  "c32": {
    "cd": 48,
    "time": 1,
    "material": "medicine",
    "materialQty": 1,
    "heal": 6
  },
  "c33": {
    "cd": 46,
    "time": 0.8,
    "selfDamage": 5,
    "nextSearch": 0.18,
    "nextDamage": 0.2
  },
  "c34": {
    "cd": 50,
    "time": 0.8,
    "tempFx": {
      "taken": -0.15
    },
    "duration": 20,
    "nextHit": 0.15
  },
  "c35": {
    "cd": 48,
    "time": 0.8,
    "cleanseAny": 1,
    "tempFx": {
      "incomingStatusDuration": -0.15
    },
    "duration": 18
  },
  "c36": {
    "cd": 52,
    "time": 0.7,
    "tempFx": {
      "conceal": 0.18
    },
    "duration": 20,
    "nextDamage": 0.2
  },
  "c37": {
    "cd": 55,
    "time": 1,
    "heal": 8,
    "healIfRevUsed": 8
  },
  "c38": {
    "cd": 46,
    "time": 0.7,
    "tempFx": {
      "hit": 0.15,
      "crit": 0.15
    },
    "duration": 18
  },
  "c39": {
    "cd": 46,
    "time": 0.7,
    "selfDamage": 4,
    "tempFx": {
      "damage": 0.2
    },
    "duration": 18
  },
  "c40": {
    "cd": 50,
    "time": 0.8,
    "tempFx": {
      "detect": 0.2
    },
    "duration": 20,
    "nextStatus": {
      "fear": 0.2
    }
  },
  "c41": {
    "cd": 48,
    "time": 0.9,
    "heal": 8,
    "tempFx": {
      "incomingStatusDuration": -0.15
    },
    "duration": 18
  },
  "c42": {
    "cd": 48,
    "time": 0.8,
    "nextDetect": 0.2,
    "tempFx": {
      "statusChance": 0.15
    },
    "duration": 18
  },
  "c43": {
    "cd": 50,
    "time": 1,
    "material": "toxin",
    "materialQty": 1,
    "tempFx": {
      "poisonChance": 0.2
    },
    "duration": 20
  },
  "c44": {
    "cd": 52,
    "time": 0.8,
    "tempFx": {
      "taken": -0.2,
      "moveTime": 0.2
    },
    "duration": 18
  },
  "c45": {
    "cd": 50,
    "time": 0.8,
    "sp": 10,
    "tempFx": {
      "sleepChance": 0.2
    },
    "duration": 20
  },
  "c46": {
    "cd": 48,
    "time": 0.8,
    "tempFx": {
      "conceal": 0.2
    },
    "duration": 20,
    "nextStatus": {
      "confusion": 0.2
    }
  },
  "c47": {
    "cd": 42,
    "time": 0.7,
    "nextMoveFree": true,
    "tempFx": {
      "moveTime": -0.2
    },
    "duration": 15
  },
  "c48": {
    "cd": 50,
    "time": 0.8,
    "tempFx": {
      "bindChance": 0.2
    },
    "duration": 20,
    "nextHit": 0.15
  },
  "c49": {
    "cd": 54,
    "time": 1,
    "consumeCorpse": true,
    "corpseHeal": 18,
    "noCorpseHeal": 6
  },
  "c50": {
    "cd": 48,
    "time": 0.9,
    "heal": 6,
    "sp": 10,
    "cleanseAny": 1
  },
  "c51": {
    "cd": 50,
    "time": 0.8,
    "sp": 12,
    "tempFx": {
      "profGain": 0.3,
      "statusChance": 0.15
    },
    "duration": 25
  },
  "c52": {
    "cd": 0,
    "time": 0.5,
    "selfDebuffs": true
  }
};

const NAMED_GEAR_FX=NAMED_GEAR_EFFECTS;

// Replace, never add to the retired character effects.
for(const [id,c] of Object.entries(REWORK_CONFIG)){PASSIVE_FX[id]=id==="c37"?{revive:true}:{};COMBAT_SKILL_DEFS[id]={mult:id==="c51"?1.2:1.5,sp:12,cd:c.combatCd,rework:true};ACTION_SKILL_DEFS[id]={cd:c.cd,time:c.time,rework:true};}


return {PASSIVE_FX,COMBAT_SKILL_DEFS,ACTION_SKILL_DEFS,NAMED_GEAR_FX};
})();
__modules["src/match_engine.js"]=(()=>{
const {createNamedGearSystem}=__modules["src/named_gear_runtime.js"];
const {appendStatusNotice}=__modules["src/status_notices.js"];
const {createReworkSystem,REWORK_CONFIG,reworkState}=__modules["src/character_reworks.js"];
const {rememberEnemy,rememberIncoming,pruneEnemyTraces}=__modules["src/enemy_contacts.js"];
const {updateRegionRestrictions,isRegionLocked}=__modules["src/region_restrictions.js"];
const {uniqueMaterialExists,isUniqueMaterial}=__modules["src/unique_materials.js"];
const {equipmentSalvage,offerSearchConsumable,offerEquipment}=__modules["src/inventory_ops.js"];
const { CHARACTER_BY_ID, ADJACENCY, movementProfile }=__modules["src/game_data.js"];
const { ITEMS, POOLS, WILD_TEMPLATES, ENCOUNTER_EVENTS }=__modules["src/offline_content.js"];
const { PASSIVE_FX, COMBAT_SKILL_DEFS, ACTION_SKILL_DEFS, NAMED_GEAR_FX }=__modules["src/skill_defs.js"];

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const nowSec=(match,now=Date.now())=>Math.max(0,(now-match.startedAt)/1000);
const item=id=>ITEMS[id]||null;
function invincible(p){return !!PASSIVE_FX[p?.charId]?.invincible}
function damagePlayer(p,amount){const damage=invincible(p)?0:Math.max(0,Number(amount)||0);p.hp-=damage;return damage}
const STATUS_DEFS={
  poison:{duration:8,max:3},bleed:{duration:null,max:5},slow:{duration:10,max:2},bind:{duration:5,max:1},
  sleep:{duration:10,max:1},fear:{duration:5,max:1},confusion:{duration:10,max:1},silence:{duration:10,max:1},actionDelay:{duration:10,max:1}
};
const REWORK_STATUS_DEFS={timeStop:{duration:2,max:1},awe:{duration:10,max:1},reverseAmp:{duration:8,max:1},fragrance:{duration:10,max:1},talisman:{duration:15,max:1},starTarget:{duration:30,max:1},domination:{duration:10,max:1},suggestion:{duration:15,max:1},chainMark:{duration:15,max:1}
};
const char=p=>CHARACTER_BY_ID.get(p.charId)||CHARACTER_BY_ID.get("c01");
const namedGear=createNamedGearSystem({apply:applyStatus,fx:combinedFx,maxHp,heal:healPlayer,sp:recoverSp,name:id=>item(id)?.n||id,description:id=>item(id)?.effectText||'',isFood:id=>!!item(id)?.sat&&item(id)?.kind==='food'});
const reworks=createReworkSystem({
 gearAbsorb:(m,p,d,n)=>namedGear.absorb(m,p,d,n),gearHit:(m,p,t,skill,hit,n)=>namedGear.hit(m,p,t,skill,hit,n),gearKill:(m,p,t,n)=>namedGear.kill(m,p,t,n),status,skillName:(p,key)=>char(p)[key],fx:combinedFx,maxHp,heal:healPlayer,sp:recoverSp,apply:applyStatus,notice:recordCombatNotice,
 known:(m,p,t,n,exact)=>{if(!t?.playerId)return;if(exact)rememberEnemy(p,{id:t.playerId,name:t.playerName,kind:'player',source:'encounter',hp:Math.max(0,t.hp),maxHp:maxHp(t,m,n),alive:t.alive},n);else rememberIncoming(p,t,t.playerName,n,'trace');},
 locked:isRegionLocked,adjacency:ADJACENCY,kill:killPlayer,wildDeath:()=>{},prof:gainProf,bleed:triggerBleedAction,
 noise:recordNoise,cleanse:removeAnyStatus,damage:damagePlayer,invincible,environmentDeath,removeStacks:removeStatusStacks,
 wildName:w=>wildTemplate(w)?.n||w.id,firstCorpse:firstCorpseInRegion,isFood:id=>!!item(id)?.sat&&!['water'].includes(id)
});
function healPlayer(p,amount,m,n=Date.now(),allowLight=true){
 const f=combinedFx(p,m,n),value=Math.max(0,amount)*(1+(f.heal||0)),before=p.hp;
 p.hp=clamp(p.hp+value,0,maxHp(p,m,n));reworks.healObserved(p,p.hp-before,m,n,allowLight);return p.hp-before;
}
function reworkSkillPrep(p,n){const r=reworkState(p);if(p.charId==='c04'&&r.mode==='rail')return 1.5;if(['c05','c20','c44'].includes(p.charId))return p.charId==='c05'?1.2:1.5;if(p.charId==='c37'&&r.mode==='sword')return 1.2;return .65;}
function reworkSkillCost(p,base,fx,n){return REWORK_CONFIG[p.charId]?(reworks.live(p,'freeSpell',n)?0:base*(1+(fx.allSp||0))):base;}
function reworkAIChoice(m,p,n){const cfg=REWORK_CONFIG[p.charId];if(!cfg)return {};let choice=cfg.choices[0];if(p.charId==='c04')choice=reworkState(p).mode==='blade'?'rail':'blade';if(p.charId==='c08')choice=p.hp<p.maxHp*.5?'life':'earth';if(p.charId==='c41')choice=p.hp<p.maxHp*.5?'regen':'shell';if(p.charId==='c50')choice=Object.keys(p.statuses||{}).length?'cleanse':'cycle';return {choice,};}
function reworkCombat(m,p,t,skill,n){
 if(!t?.alive||t.region!==p.region)return {ok:false,error:'target_lost'};
 if(status(t,'timeStop',n))return {ok:false,error:'target_time_stopped'};
 const f=combinedFx(p,m,n),base=COMBAT_SKILL_DEFS[p.charId],cost=reworkSkillCost(p,Math.max(0,(base.sp??12)*((p.eq||[]).includes("focus")?.95:1)*(1+(f.skillSp||0))-(f.skillSpFlat||0)-(p.nextSkillSpDiscount||0)),f,n);
 if(skill){if(status(p,'silence',n))return {ok:false,error:'silenced'};if((p.cdCUntil||0)>n)return {ok:false,error:'skill_cooldown'};if(p.sp<cost)return {ok:false,error:'not_enough_sp'};p.sp-=cost;p.nextSkillSpDiscount=0;p.cdCUntil=n+base.cd/Math.max(.25,1+(f.cdRate||0))*1000;p.cdCDuration=(p.cdCUntil-n)/1000;reworks.consume(p,'freeSpell',n);}
 const quietReady=n-(p.lastAttackAt||0)>=10000,ctx=attackContext(m,p,t,skill,n);ctx.quietReady=quietReady;
 const spec=skill?reworks.skillSpec(m,p,t,n):(namedGear.attackProfile(p)||{mult:1,rows:[],hits:1});spec.hits??=1;if(skill){spec.legacySkillBonus=p.nextSkillDamageBonus||0;}
 if(!skill&&p.charId==='c36')reworks.consume(p,'invisible',n);
 const volley={sourceId:p.playerId,targetId:t.playerId||t.id,region:p.region,skill,spec,ctx,remaining:spec.hits,index:0,total:0,hit:false,at:n};
 const result=reworkStrike(m,volley,n);
 if(volley.remaining>0){(m.reworkStrikes??=[]).push(volley);}
 const bleedDamage=triggerBleedAction(m,p,n);
 if(!t.playerId&&t.alive&&p.alive&&volley.remaining===0)result.counter=wildCounter(m,p,t,n);
 return {...result,bleedDamage,volley:spec.hits>1};
}
function reworkStrike(m,v,n){
 const p=m.players.find(p=>p.playerId===v.sourceId),t=[...m.players,...(m.wilds||[])].find(t=>(t.playerId||t.id)===v.targetId),s=v.spec;
 if(!p?.alive||!t?.alive||p.region!==v.region||t.region!==v.region||isRegionLocked(m,v.region)||status(t,'timeStop',n)){v.remaining=0;if(p&&t)reworks.afterSkill(m,p,t,s,v.hit,v.total,false,n);return {ok:false,error:'target_lost'};}
 const f=combinedFx(p,m,n),bonus=v.ctx.hitBonus+(v.skill?(s.hit||0):0)+reworks.hitBonus(m,p,t,v.skill,n);
 const hit=hitRoll(p,v.skill,bonus,m,n);let d=0,killed=false,drop=null,death=null;
 if(hit){
  const raw=t.playerId?skillDamageVsPlayer(m,p,t,s,n):skillDamageVsWild(m,p,t,s,n);
  if(v.skill&&s.legacySkillBonus){p.nextSkillDamageBonus=0;}
  d=(raw*s.mult+(s.flat||0)*(t.playerId?100/(100+def(t,m,n)):100/(100+wildTemplate(t).def)))/s.hits;
  if(v.skill)d*=1+(s.damageBonus||0)+(s.legacySkillBonus||0)+(f.skillDamage||0);else{d*=1+(f.basicDamage||0);if(Math.random()<clamp(.05+(f.crit||0)+(v.ctx.actionCritBonus||0),0,.5))d*=1.4;}
  d=modifyAttackDamage(m,p,t,d,v.ctx,n)*reworks.damageMult(m,p,t,v.skill,n,v.ctx);
  if(t.playerId)d*=Math.max(.4/Math.max(.01,incomingMult(t,m,n)),reworks.reduction(t,p,m,n));
  if(!t.playerId&&t.guardReady){t.guardReady=false;d*=.8;}
  d=reworks.takeDirect(m,t,p,Math.max(1,Math.round(d)),n);if(d>0)wakeOnDamage(t,n);
  v.total+=Math.min(Math.max(0,(t.hp||0)+d),d);v.hit=true;gainProf(p,1.5,m,n);
  reworks.afterDirect(m,p,t,v.skill,true,d,n);
  if((p.eq||[]).includes("toxin_kit")&&Math.random()<clamp(.06+(f.statusChance||0),0,.95))applyStatus(t,"poison",1,8,p.playerId,n,p,m,"독성 키트 · 공격 적중");
  applyOnHitStatuses(m,p,t,n);
  if(t.playerId){recordBattle(m,p,t,n);if(t.hp<=0){death=killPlayer(m,p,t,n);killed=!!death?.killed;}}
  else if(t.hp<=0){t.alive=false;t.hp=0;killed=true;const wt=wildTemplate(t);drop=pick(wt.drop);if(!addItem(p,drop)){if(item(drop)?.t==='e')offerEquipment(m,p,drop);else if(item(drop)?.t==='c')offerSearchConsumable(m,p,drop);}if(wt.skill==='supply_cache')for(let i=0;i<2;i++){const x=pick(wt.drop);if(!addItem(p,x)){if(item(x)?.t==='e')offerEquipment(m,p,x);else if(item(x)?.t==='c')offerSearchConsumable(m,p,x);}}}
  if(killed){reworks.killed(m,p,t,n);const kfx=combinedFx(p,m,n);if(kfx.killHeal)healPlayer(p,kfx.killHeal,m,n);if(kfx.killSp)recoverSp(p,kfx.killSp,m,n);}
 }else{gainProf(p,.5,m,n);reworks.afterDirect(m,p,t,v.skill,false,0,n);}
 recordCombatNotice(m,p,t,d,v.skill?'전투 스킬':'일반 공격',n,hit);
 v.index++;v.remaining--;v.at=n+200;
 if(killed)v.remaining=0;
 if(v.remaining===0&&v.skill)reworks.afterSkill(m,p,t,s,v.hit,v.total,killed,n);
 if(!v.skill){for(const k of ['aimOnce','armHit'])reworks.consume(p,k,n);if(p.charId==='c15')reworks.consume(p,'heard',n);}
 const counter=s.hits>1&&v.remaining===0&&!t.playerId&&t.alive&&p.alive?wildCounter(m,p,t,n):undefined;
 return {ok:true,hit,damage:d,killed,death,drop,dispelled:!!s.dispelled,...(counter!==undefined?{counter}:{})};
}
function processReworkStrikes(m,n){
 const pending=m.reworkStrikes||[];m.reworkStrikes=[];
 for(const v of pending){while(v.remaining>0&&v.at<=n)reworkStrike(m,v,v.at);if(v.remaining>0)m.reworkStrikes.push(v);}
}
const SPECIAL_ROUTE_REGION={
  special_01:"estate",special_02:"city",special_03:"church",special_04:"mgmt_lab",
  special_05:"mgmt_training",special_06:"mgmt_training",special_07:"mgmt_admin",special_08:"church",
  special_09:"evil_quarters",special_10:"city",special_11:"factory",special_12:"church",
  special_13:"mgmt_training",special_14:"estate",special_15:"mgmt_training",special_16:"estate",
  special_17:"evil_training",special_18:"mgmt_training",special_19:"evil_training",special_20:"estate",
  special_21:"mgmt_training",special_22:"estate",special_23:"factory",special_24:"factory",
  special_25:"church",special_26:"estate",special_27:"mgmt_lab",special_28:"evil_training",
  special_29:"evil_quarters",special_30:"evil_training",special_31:"city",special_32:"mgmt_lab",
  special_33:"church",special_34:"mgmt_lab",special_35:"evil_training",special_36:"evil_quarters",
  special_37:"evil_quarters",special_38:"city",special_39:"evil_training",special_40:"mgmt_lab",
  special_41:"city"
};
const SPECIAL_OWNER_CHAR={
  special_01:"c01",special_02:"c02",special_03:"c03",special_04:"c04",special_05:"c05",special_06:"c06",
  special_07:"c07",special_08:"c08",special_09:"c09",special_10:"c10",special_11:"c11",special_12:"c12",
  special_13:"c13",special_14:"c14",special_15:"c15",special_16:"c16",special_17:"c17",special_18:"c18",
  special_19:"c19",special_20:"c20",special_21:"c21",special_22:"c22",special_23:"c23",special_24:"c24",
  special_25:"c25",special_26:"c26",special_27:"c27",
  special_28:"c37",special_29:"c38",special_30:"c39",special_31:"c40",special_32:"c41",special_33:"c42",
  special_34:"c43",special_35:"c44",special_36:"c45",special_37:"c46",special_38:"c47",special_39:"c48",
  special_40:"c49",special_41:"c50"
};
function linkedSpecialForChar(charId){return Object.keys(SPECIAL_OWNER_CHAR).find(id=>SPECIAL_OWNER_CHAR[id]===charId)||null}

function isSpecialMaterial(id){return /^special_\d{2}$/.test(id)&&!!item(id)}
function initUniqueSpecials(){
  const out={};for(let i=1;i<=41;i++){const id="special_"+String(i).padStart(2,"0");out[id]={state:isUniqueMaterial(id)?"unspawned":"repeatable",holderId:null,region:null}}return out
}
function specialState(match,id){return match.uniqueSpecials?.[id]||null}
function specialAvailable(match,id){return !isUniqueMaterial(id)||specialState(match,id)?.state==="unspawned"}
function grantSpecial(match,p,id){
  if(!isUniqueMaterial(id)){p.mat[id]=(p.mat[id]||0)+1;const state=specialState(match,id);if(state)Object.assign(state,{state:"repeatable",holderId:null,region:null});return true}
  const s=specialState(match,id);if(!s||s.state!=="unspawned"||uniqueMaterialExists(match,id))return false;
  p.mat[id]=(p.mat[id]||0)+1;s.state="held";s.holderId=p.playerId;s.region=null;return true
}
function pickupGroundSpecial(match,p,id){
  const s=specialState(match,id);if(!s||s.state!=="ground"||s.region!==p.region||(isUniqueMaterial(id)&&uniqueMaterialExists(match,id)))return false;
  if(!isUniqueMaterial(id)){p.mat[id]=(p.mat[id]||0)+1;s.state="repeatable";s.region=null;s.holderId=null;return true}
  p.mat[id]=(p.mat[id]||0)+1;s.state="held";s.holderId=p.playerId;s.region=null;return true
}
function dropSpecialsFromPlayer(match,p,region=p.region){
  for(const[id,n]of Object.entries(p.mat||{})){if(!isUniqueMaterial(id)||n<=0)continue;p.mat[id]=0;const s=specialState(match,id);if(s&&s.state!=="consumed"){s.state="ground";s.holderId=null;s.region=region}}
}
function markSpecialConsumed(match,id){
  if(!isUniqueMaterial(id)){const state=specialState(match,id);if(state)Object.assign(state,{state:"repeatable",holderId:null,region:null});return}const s=specialState(match,id);if(s){s.state="consumed";s.holderId=null;s.region=null}
}
function groundSpecialsInRegion(match,region){return Object.entries(match.uniqueSpecials||{}).filter(([,s])=>s.state==="ground"&&s.region===region).map(([id])=>id)}
function regionSpecialCandidates(match,region){return Object.entries(SPECIAL_ROUTE_REGION).filter(([id,r])=>r===region&&specialAvailable(match,id)).map(([id])=>id)}
function findItemIdByExactName(name){return Object.keys(ITEMS).find(id=>ITEMS[id]?.n===name)||null}


function noiseSpec(level){
  if(level==="높음"||level==="큼")return{level:"높음",detect:.12,duration:20};
  if(level==="중간")return{level:"중간",detect:.06,duration:12};
  if(level==="낮음")return{level:"낮음",detect:.03,duration:7};
  return null;
}
function recordNoise(match,p,level,source,now=Date.now()){
  if(p.charId==="c36"&&reworks.live(p,"invisible",now)&&String(source).includes("이동"))return;
  const spec=noiseSpec(level);if(!spec)return null;
  match.noises??=[];
  const row={id:"noise_"+p.playerId+"_"+now,playerId:p.playerId,playerName:p.playerName,region:p.region,level:spec.level,detect:spec.detect,source,createdAt:now,expiresAt:now+spec.duration*1000};
  match.noises.push(row);
  match.noises=match.noises.filter(x=>x.expiresAt>now).slice(-40);
  return row;
}
function eventNoiseLevel(ev,text){
  if(/소음 없음/.test(text))return null;
  if(/소음 큼/.test(text))return"높음";
  if(/소음 중간/.test(text))return"중간";
  if(/소음 낮음/.test(text))return"낮음";
  return ["높음","중간","낮음"].includes(ev?.noise)?ev.noise:null;
}
function activeNoiseFor(match,p,now=Date.now()){
  return (match.noises||[]).filter(x=>x.playerId===p.playerId&&x.region===p.region&&x.expiresAt>now).sort((a,b)=>b.detect-a.detect)[0]||null;
}
function nearbyNoiseFor(match,p,now=Date.now()){
  const adjacent=new Set(ADJACENCY[p.region]||[]);
  return (match.noises||[]).filter(x=>x.playerId!==p.playerId&&x.expiresAt>now&&(x.region===p.region||adjacent.has(x.region))).sort((a,b)=>b.createdAt-a.createdAt).slice(0,6).map(x=>({...x,regionName:regionName(x.region)}));
}
function tempFx(p,match,now=Date.now()){
  const out={};
  p.tempEffects=(p.tempEffects||[]).filter(e=>e?.until>now);
  for(const e of p.tempEffects)for(const[k,v]of Object.entries(e.fx||{}))if(typeof v==="number")out[k]=(out[k]||0)+v;
  return out;
}
function gardenSources(match,region,now){
 const g=match.regionGardens?.[region];return (g?.sources|| (g?[g]:[])).filter(x=>x.until>now);
}
function enemyGarden(match,p,now){return gardenSources(match,p.region,now).filter(x=>x.ownerId!==p.playerId).sort((a,b)=>b.until-a.until)[0]||null}
function gardenAuras(match,p,now){
 const enemy=enemyGarden(match,p,now),own=PASSIVE_FX[p.charId]?.gardenSearchLoot?gardenSources(match,p.region,now).sort((a,b)=>b.until-a.until)[0]:null;
 const row=g=>({stacks:1,startedAt:g.installedAt,until:g.until,durationMs:g.until-g.installedAt});
 return {statuses:enemy?{doll:{...row(enemy),sourceId:enemy.ownerId}}:{},buffs:own?{gardenPassive:{...row(own),name:char(p).passive}}:{}};
}
function refreshGardens(match,now){
 for(const [region,g] of Object.entries(match.regionGardens||{})){
  const sources=gardenSources(match,region,now);
  if(!sources.length){delete match.regionGardens[region];continue}
  if(g.sources){g.sources=sources;g.until=Math.max(...sources.map(x=>x.until))}
 }
}
function combinedFx(p,match,now=Date.now()){
  const out={...(PASSIVE_FX[p.charId]||{})};
  if(match.regionGardens?.[p.region]?.until>now){
    out.searchLoot=(out.searchLoot||0)+(out.gardenSearchLoot||0);
    out.restHeal=(out.restHeal||0)+(out.gardenRestHeal||0);
    out.restSp=(out.restSp||0)+(out.gardenRestSp||0);
  }
  for(const[k,v]of Object.entries(tempFx(p,match,now)))out[k]=(out[k]||0)+v;
  for(const id of new Set(p.eq||[])){
    const it=item(id);if(!it)continue;
    const named=NAMED_GEAR_FX[id];
    if(named)for(const[k,v]of Object.entries(named))if(typeof v==="number")out[k]=(out[k]||0)+v;
    if(id==="toxin_kit"||id==="synergy_03"){}
    if(id==="propulsion"||id==="synergy_04"){out.moveSp=(out.moveSp||0)+1}
    if(id==="plate"||id==="synergy_05"){out.lowDef=(out.lowDef||0)+4}
    if(id==="spell_amp"||id==="synergy_07"){out.statusChance=(out.statusChance||0)+.03}
    if(id==="accel"||id==="synergy_08"){}
    if(id==="focus"||id==="synergy_12"){out.delayResist=(out.delayResist||0)+.10}
  }
  for(const[k,v]of Object.entries(reworks.effects(p,match,now)))out[k]=(out[k]||0)+v;
  return out;
}
function maxHp(p,match,now=Date.now()){return Math.max(1,p.maxHp+(tempFx(p,match,now).maxHpFlat||0))}
function equipmentAtk(p){return (p.eq||[]).reduce((s,id)=>s+(item(id)?.atk||0),0)}
function equipmentDef(p){return (p.eq||[]).reduce((s,id)=>s+(item(id)?.def||0),0)}
function atk(p,match,now=Date.now()){
  let v=char(p).baseAtk+equipmentAtk(p),fx=combinedFx(p,match,now);
  if(fx.timeAtk&&fx.timeAtkEvery)v+=Math.min(fx.timeAtkCap??Infinity,Math.floor(nowSec(match,now)/fx.timeAtkEvery)*fx.timeAtk);
  return v*(1+(fx.atkPct||0))*(enemyGarden(match,p,now)?.9:1);
}
function def(p,match,now=Date.now()){
  let v=char(p).baseDef+equipmentDef(p);
  const fx=combinedFx(p,match,now);
  v+=fx.defFlat||0;
  if(p.hp/maxHp(p,match,now)<.5)v+=fx.lowDef||0;
  return Math.max(0,v)*(1+(fx.defPct||0))*(enemyGarden(match,p,now)?.9:1);
}
function incomingMult(p,match,now=Date.now()){
  const fx=combinedFx(p,match,now);
  let m=1+(fx.damageTaken||0)+(fx.taken||0);
  if((p.eq||[]).includes("plate")&&p.hp/maxHp(p,match,now)>=.5)m*=.97;
  if(p.tempGuardUntil>now)m*=1-(p.tempGuardRate||0);
  return Math.max(.4,m);
}
function addTemp(p,fx,seconds,now=Date.now()){(p.tempEffects??=[]).push({fx:{...fx},until:now+seconds*1000})}
function scheduleDelayedFx(p,delaySeconds,fx,durationSeconds,now=Date.now()){
  (p.delayedEffects??=[]).push({at:now+delaySeconds*1000,fx:{...fx},duration:durationSeconds});
}
function processDelayedEffects(p,now=Date.now()){
  const remain=[];
  for(const e of p.delayedEffects||[]){
    if(e.at<=now)addTemp(p,e.fx,e.duration||10,now);
    else remain.push(e);
  }
  p.delayedEffects=remain;
}
function foodRepeatMultiplier(p,id,it,now=Date.now()){
  if(it?.kind!=="food")return 1;
  if(p.lastFoodId===id&&now-(p.lastFoodAt||0)<=20000)p.foodRepeatCount=Math.min(2,(p.foodRepeatCount||0)+1);
  else p.foodRepeatCount=0;
  p.lastFoodId=id;p.lastFoodAt=now;
  return p.foodRepeatCount===0 ? 1 : p.foodRepeatCount===1 ? .85 : .70;
}
function removeStatusStacks(p,id,n){
  const s=p.statuses?.[id];if(!s)return 0;
  const removed=Math.min(n,s.stacks||1);s.stacks=(s.stacks||1)-removed;
  if(s.owners){let left=removed;for(const key of Object.keys(s.owners)){const v=Math.min(left,s.owners[key]);s.owners[key]-=v;left-=v;if(!s.owners[key])delete s.owners[key];if(left<=0)break;}}
  if(s.stacks<=0)delete p.statuses[id];
  return removed;
}
function recoverSp(p,amount,match,now=Date.now()){
  const mult=Math.max(.25,1+(combinedFx(p,match,now).spRecovery||0));
  const gained=Math.max(0,amount)*mult;p.sp=clamp(p.sp+gained,0,p.maxSp);return gained;
}
function owned(p,id){
  const it=item(id);if(!it)return 0;
  if(it.t==="m")return p.mat?.[id]||0;
  if(it.t==="c")return p.con?.[id]||0;
  return (p.eq||[]).filter(x=>x===id).length;
}
function addItem(p,id,n=1){
  const it=item(id);if(!it||isSpecialMaterial(id))return false;
  if(it.t==="m"){p.mat[id]=(p.mat[id]||0)+n;return true}
  if(it.t==="c"){
    const distinct=Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0);
    if((p.con[id]||0)<=0&&distinct.length>=3)return false;
    p.con[id]=(p.con[id]||0)+n;return true
  }
  if(p.eq.length+n>3)return false;
  for(let i=0;i<n;i++)p.eq.push(id)
  return true
}
function consumeItem(p,id,n=1){
  const it=item(id);if(!it||owned(p,id)<n)return false;
  if(it.t==="m"){p.mat[id]-=n;if(p.mat[id]<=0)delete p.mat[id];return true}
  if(it.t==="c"){p.con[id]-=n;if(p.con[id]<=0)delete p.con[id];return true}
  for(let i=0;i<n;i++){const ix=p.eq.indexOf(id);if(ix<0)return false;p.eq.splice(ix,1)}
  return true
}
function canCraft(p,id){const r=item(id)?.r;return !!r&&Object.entries(r).every(([k,v])=>owned(p,k)>=v)}
function craftRemainingEquipment(p,id){
  const remaining=(p.eq||[]).map((id,index)=>({id,index}));
  for(const [part,n] of Object.entries(item(id)?.r||{}))if(item(part)?.t==="e")for(let i=0;i<n;i++){const ix=remaining.findIndex(x=>x.id===part);if(ix>=0)remaining.splice(ix,1)}
  return remaining;
}
function canReceiveCraftOutput(p,id,payload={}){
  const it=item(id);if(!it)return false;
  if(it.t==="e"){const rest=craftRemainingEquipment(p,id);return rest.length<3||(Number.isInteger(payload.replaceIndex)&&rest.some(x=>x.index===payload.replaceIndex&&x.id===payload.replaceId))}
  if(it.t!=="c")return true;
  if((p.con?.[id]||0)>0)return true;
  return Object.keys(p.con||{}).filter(k=>(p.con[k]||0)-(item(k)?.t==="c"?(it.r?.[k]||0):0)>0).length<3;
}

function craftItem(match,p,id,payload={}){
  const it=item(id);if(!it||!canCraft(p,id))return {ok:false,error:"recipe_missing"};
  if(!canReceiveCraftOutput(p,id,payload))return {ok:false,error:it.t==="e"?"equipment_full":"inventory_full"};
  const rest=it.t==="e"?craftRemainingEquipment(p,id):[];
  const discarded=rest.length>=3?rest.find(x=>x.index===payload.replaceIndex):null;
  for(const[k,v]of Object.entries(it.r)){if(!consumeItem(p,k,v))return {ok:false,error:"recipe_race"};if(isSpecialMaterial(k)&&(p.mat[k]||0)<=0)markSpecialConsumed(match,k)}
  if(discarded)p.eq.splice(rest.findIndex(x=>x.index===discarded.index),1);
  if(!addItem(p,id,1))return {ok:false,error:"inventory_full"};
  if(it.t==="e"&&it.weaponType){match.craftStats??={};match.craftStats[it.weaponType]=(match.craftStats[it.weaponType]||0)+1}
  return {ok:true,itemId:id,itemName:it.n,...(discarded?{discarded:discarded.id}:{})};
}
function status(p,id,now=Date.now()){const s=p.statuses?.[id];return s&&s.stacks>0&&(s.until===null||s.until>now)?s:null}
function applyStatus(p,id,stacks=1,duration=null,sourceId=null,now=Date.now(),source=null,match=null,cause=null){
  p.statuses??={};const defn=STATUS_DEFS[id]||REWORK_STATUS_DEFS[id];if(!defn)return false;
  if((p.statusImmunity?.[id]||0)>now)return false;
  const targetFx=match?combinedFx(p,match,now):{};
  if(id==="poison"&&p.charId==="c17")return false;
  if(id==="bind"&&source?.charId==="c48"&&(p.edenBindImmune?.[sourceId]||0)>now)return false;
  const resist=clamp((targetFx.statusResist||0)+(id==="actionDelay"?(targetFx.delayResist||0):0),0,1);
  if(resist>0&&Math.random()<resist)return false;
  let dur=["poison","timeStop","awe","reverseAmp","fragrance","talisman","starTarget","domination","suggestion","chainMark"].includes(id)?(duration??defn.duration):defn.duration;
  if(["slow","actionDelay"].includes(id)&&p.charId==="c11")dur*=.75;
  if(source&&match&&["slow","bind","sleep","fear","confusion","silence","actionDelay"].includes(id)){
    if((source.eq||[]).includes("spell_amp"))dur*=1.06;
    dur*=1+(combinedFx(source,match,now).statusDuration||0);
  }
  if(targetFx.incomingStatusDuration)dur*=Math.max(.5,1+targetFx.incomingStatusDuration);
  if(id==="poison"&&(p.eq||[]).includes("detox"))dur*=.80;
  const old=p.statuses[id],wasActive=!!status(p,id,now);
  if(id==="bind"&&old?.until>now){
    old.until=Math.min(now+dur*1000,old.until+1000);
    old.startedAt=now;old.durationMs=old.until-now;
    if(sourceId!=null)old.sourceId=sourceId;
    recordStatusApplication(match,p,id,sourceId,source,now,cause);
    return true;
  }
  p.statuses[id]={stacks:clamp((old&&old.stacks>0&&(old.until===null||old.until>now)?old.stacks:0)+stacks,1,defn.max),until:id==="bleed"?null:now+dur*1000,startedAt:now,durationMs:id==="bleed"?null:dur*1000,sourceId};
  if(id==="poison"){
    const owners=old&&old.until>now?{...(old.owners||{[old.sourceId]:old.stacks})}:{};owners[sourceId]=(owners[sourceId]||0)+stacks;
    let excess=Object.values(owners).reduce((a,b)=>a+b,0)-p.statuses[id].stacks;
    for(const key of Object.keys(owners))if(key!==String(sourceId)&&excess>0){const cut=Math.min(excess,owners[key]);owners[key]-=cut;excess-=cut;if(!owners[key])delete owners[key];}
    if(excess>0)owners[sourceId]-=excess;p.statuses[id].owners=owners;
  }
  if(id==="bind"&&source?.charId==="c48"){p.edenBindImmune??={};p.edenBindImmune[sourceId]=p.statuses[id].until+10000;}
  if(id==="timeStop")p.statuses[id].name="시간정지";
  recordStatusApplication(match,p,id,sourceId,source,now,cause);
  if(source&&match&&!(id==="sleep"&&wasActive))reworks.afterApplied(match,source,p,id,now);
  return true;
}
function recordStatusApplication(m,p,id,sourceId,source,n,cause){
 if(!p?.playerId)return;
 const from=source||(sourceId===p.playerId?p:m?.players?.find(q=>q.playerId===sourceId)||m?.wilds?.find(q=>q.id===sourceId));
 const sourceName=from?.playerName||(from?.templateId?wildTemplate(from)?.n:null)||(sourceId?'알 수 없는 대상':'환경');
 const reason=cause||(from?.templateId?('반격 · '+(wildTemplate(from)?.skillText||sourceName)):from?.playerId&&from.playerId===p.playerId?char(from).action:from?.playerId?'공격 적중 효과':'환경·이벤트 효과');
 appendStatusNotice(p,{statusId:id,sourceId:sourceId||from?.playerId||from?.id||null,sourceName,cause:reason,at:n,stacks:p.statuses?.[id]?.stacks||1});
}
function notifyGardenDoll(m,p,n){
 const garden=enemyGarden(m,p,n);if(garden&&p.dollNoticeRegion!==p.region)recordStatusApplication(m,p,'doll',garden.ownerId,null,n,'정원 설치 · 적 정원 지역 진입');
 if(garden)p.dollNoticeRegion=p.region;else if(p.dollNoticeRegion)delete p.dollNoticeRegion;
}
function wakeOnDamage(p,now=Date.now()){
  if(status(p,"sleep",now)){
    delete p.statuses.sleep;p.statusImmunity??={};p.statusImmunity.sleep=now+12000;
    return true;
  }
  return false;
}
function recordDeathSource(match,victim,source,now,cause){
  if(victim.deathSource)return;
  if(typeof source==='string')source=match.players.find(x=>x.playerId===source)||(match.wilds||[]).find(x=>x.id===source);
  victim.deathSource={kind:source?.playerId?'player':source?.id?'wild':'environment',id:source?.playerId||source?.id||null,
    name:source?.playerName||(source?.templateId?wildTemplate(source)?.n:null)||null,cause,at:now};
}
function awardStatusKill(match,victim,sourceId,now,cause){
  if(invincible(victim)){victim.hp=Math.max(1,victim.hp);return {immune:true}}
  const killer=match.players.find(x=>x.playerId===sourceId&&x!==victim&&x.alive);
  const fx=PASSIVE_FX[victim.charId]||{};
  if(fx.revive&&!victim.rev){victim.rev=true;victim.hp=Math.min(18,maxHp(victim,match,now));victim.statuses={};return {revived:true,killerId:killer?.playerId||null}}
  recordDeathSource(match,victim,sourceId,now,cause);
  victim.alive=false;victim.encounter=null;victim.pendingAction=null;
  if(killer){
    killer.kills++;
    const linked=linkedSpecialForChar(victim.charId);
    if(linked&&specialAvailable(match,linked))grantSpecial(match,killer,linked);
    const kfx=combinedFx(killer,match,now);
    if(kfx.killHeal)healPlayer(killer,kfx.killHeal,match,now);
    if(kfx.killSp)recoverSp(killer,kfx.killSp,match,now);
  }
  createDeathCorpse(match,victim,now);
  if(killer)reworks.killed(match,killer,victim,now);
  return {killed:true,killerId:killer?.playerId||null};
}
function cleanseExpired(p,now){
  for(const[id,s]of Object.entries(p.statuses||{})){
    if(!s||s.stacks<=0||(s.until!==null&&s.until<=now)){delete p.statuses[id];continue}
    // Active legacy timed bleeds migrate to count-based persistence.
    if(id==='bleed'){s.until=null;s.stacks=Math.min(5,s.stacks)}
  }
  p.tempEffects=(p.tempEffects||[]).filter(e=>e?.until>now);
}
function updateSatiety(match,p,now){
  const elapsed=Math.max(0,now-(p.lastSatietyAt||match.startedAt));
  const ticks=Math.floor(elapsed/20000);
  if(ticks>0){p.satiety=clamp((p.satiety??100)-ticks*5*(p.charId==="c49"?1.25:1),0,100);p.lastSatietyAt=(p.lastSatietyAt||match.startedAt)+ticks*20000}
}
function applyStatusTicks(match,p,now){
  p.nextStatusTick??=match.startedAt;
  while(p.alive&&p.nextStatusTick+2000<=now){
    p.nextStatusTick+=2000;
    const poison=p.statuses?.poison;
    if(poison?.until>p.nextStatusTick){
      const damage=damagePlayer(p,Math.max(1,Math.round(maxHp(p,match,p.nextStatusTick)*.02*Object.entries(poison.owners||{[poison.sourceId]:poison.stacks||1}).reduce((sum,[id,count])=>sum+count*(match.players.find(q=>q.playerId===id)?.charId==="c43"?1.25:1),0))));
      recordCombatNotice(match,poison.sourceId,p,damage,'독',p.nextStatusTick);
      if(damage>0)wakeOnDamage(p,p.nextStatusTick);
      if(p.hp<=0){awardStatusKill(match,p,poison.sourceId,p.nextStatusTick,"독");break}
    }
  }
}
function updatePassiveTime(match,now=Date.now()){
  if(match.phase==="finished"||now<match.startedAt)return;
  updateRegionRestrictions(match,now);
  refreshGardens(match,now);
  reworks.tick(match,now);
  for(const player of match.players)namedGear.tick(player);
  processReworkStrikes(match,now);
  for(const w of match.wilds||[])if(w.statuses){applyWildStatusTicks(match,w,now);cleanseExpired(w,now);}
  for(const p of match.players){
    const oldType=p.charId==='c07'?'단말':p.charId==='c38'?'단검':null,newType=p.charId==='c07'?'총':'검';
    if(oldType&&(p.proficiency?.[oldType]||0)>(p.proficiency?.[newType]||0))p.proficiency[newType]=p.proficiency[oldType];
    if(!p.alive)continue;
    const activeNoises=(match.noises||[]).filter(x=>x.expiresAt>now);
    if(activeNoises.length||p.heardNoiseIds?.length){
    p.heardNoiseIds=(p.heardNoiseIds||[]).filter(id=>activeNoises.some(x=>x.id===id));
    for(const x of activeNoises)if(x.playerId!==p.playerId&&x.region===p.region&&!p.heardNoiseIds.includes(x.id)){
      rememberIncoming(p,{playerId:x.playerId},x.playerName,x.createdAt,"noise");reworks.heard(match,p,{playerId:x.playerId},x.createdAt);p.heardNoiseIds.push(x.id);
    }
    }
    notifyGardenDoll(match,p,now);
    processDelayedEffects(p,now);cleanseExpired(p,now);updateSatiety(match,p,now);applyStatusTicks(match,p,now);
    p.hp=Math.min(p.hp,maxHp(p,match,now));
  }
  match.noises=(match.noises||[]).filter(x=>x.expiresAt>now);
  match.elapsed=Math.floor(nowSec(match,now));
}
function initWorld(match){
  match.regionRestrictions={round:0,locked:[],final:false,nextAt:180};
  let seq=1;match.wilds=[];
  for(const t of WILD_TEMPLATES)for(const region of t.regions)match.wilds.push({id:"w"+seq++,templateId:t.id,region,hp:t.hp,alive:true,guardReady:t.skill==="guard"});
  match.regionGardens={};match.eventPity={};match.lastEventId=null;match.corpses=[];match.worldLog=[];match.regionTraps={};match.noises=[];match.battleLog=[];match.craftStats={};match.uniqueSpecials=initUniqueSpecials();
}
function wildTemplate(w){return WILD_TEMPLATES.find(x=>x.id===w.templateId)}
function playerById(match,id){return match.players.find(p=>p.playerId===id)}
function encounterTarget(match,p){
  const e=p.encounter;if(!e)return null;
  if(e.kind==="player"){const t=playerById(match,e.targetId);return t?.alive&&t.region===p.region?{kind:"player",obj:t}:null}
  const w=match.wilds.find(x=>x.id===e.wildId);return w?.alive&&w.region===p.region?{kind:"wild",obj:w}:null
}
function activeWeaponType(p){
  let best=null,bestAtk=-1;
  for(const id of p.eq||[]){const it=item(id);if(!it?.weaponType)continue;const score=it.atk||0;if(score>bestAtk){best=it;bestAtk=score}}
  return best?.weaponType||"맨손";
}
function profHit(p){
  const xp=p.proficiency?.[activeWeaponType(p)]||0;
  return xp>=160 ? .14 : xp>=115 ? .12 : xp>=80 ? .10 : xp>=55 ? .08 : xp>=35 ? .06 : xp>=20 ? .04 : xp>=10 ? .02 : 0;
}
function gainProf(p,n,match,now=Date.now()){
  if(!p.alive||n<=0)return;
  const type=activeWeaponType(p),mult=Math.max(.25,1+(PASSIVE_FX[p.charId]?.profGain||0)+(tempFx(p,match,now).profGain||0));
  p.proficiency[type]=(p.proficiency[type]||0)+n*mult;
}
function detectionPenalty(target,match,now){
  let pen=combinedFx(target,match,now).conceal||0;
  if((target.eq||[]).includes("camo_mask"))pen+=.07;
  if((target.detoxStealthUntil||0)>now)pen+=.03;
  return pen;
}
function detectionBonus(seeker,target,match,now){
  let add=(combinedFx(seeker,match,now).detect||0)+(seeker.nextDetectBonus||0);
  add+=activeNoiseFor(match,target,now)?.detect||0;
  if((seeker.eq||[]).includes("trace")&&target.hp<maxHp(target,match,now))add+=.08;
  if(target.hp<maxHp(target,match,now))add+=combinedFx(seeker,match,now).woundedDetect||0;
  return add;
}
function onTargetDetected(seeker,target,match,now){
  const tid=target.playerId;
  if((seeker.eq||[]).includes("aim_terminal")){
    seeker.trackingMarks??={};
    seeker.trackingMarks[tid]=now+24000;
  }
  if((seeker.eq||[]).includes("trace")){
    seeker.redetectReady=seeker.lastDetectedTarget===tid;
    seeker.lastDetectedTarget=tid;
  }
  if((seeker.eq||[]).includes("detox")&&status(target,"poison",now))seeker.detoxStealthUntil=now+20000;
}
function triggerBleedAction(match,p,now){
  const s=status(p,"bleed",now);if(!s||!p.alive)return 0;
  const d=invincible(p)?0:2*s.stacks;s.stacks--;if(s.stacks<=0)delete p.statuses.bleed;else s.until=null;
  damagePlayer(p,d);recordCombatNotice(match,s.sourceId,p,d,'출혈',now);if(d>0)wakeOnDamage(p,now);
  if(p.hp<=0)awardStatusKill(match,p,s.sourceId,now,"출혈");
  return d;
}
function attackContext(match,p,target,skill,now){
  const fx=combinedFx(p,match,now),tid=target.playerId||target.id||null;
  const quietReady=((p.eq||[]).includes("camo_mask")||fx.quietDamage)&&now-(p.lastAttackAt||0)>=8000;
  const gear=namedGear.prepare(match,p,target,skill,now);
  let hitBonus=gear.hit+(p.nextHitBonus||0)+(skill?(fx.skillHit||0):0);
  if((p.eq||[]).includes("aim_terminal")&&tid&&(p.trackingMarks?.[tid]||0)>now)hitBonus+=.05;
  if((p.eq||[]).includes("propulsion")&&p.moveHitReady&&now-(p.lastMoveAt||0)<=8000)hitBonus+=.04;
  if((p.eq||[]).includes("trace")&&p.redetectReady&&p.lastDetectedTarget===tid)hitBonus+=.04;
  if(p.moveHitReady&&now-(p.lastMoveAt||0)<=8000)hitBonus+=fx.afterMoveHit||0;
  const ctx={gearBonus:gear.bonus,tid,quietReady,movedRecently:now-(p.lastMoveAt||0)<=8000,hitBonus,actionDamageBonus:p.nextDamageBonus||0,skillDamageBonus:0,actionCritBonus:p.nextCritBonus||0};
  p.nextHitBonus=0;p.nextDamageBonus=0;p.nextCritBonus=0;p.lastAttackAt=now;
  if(p.moveHitReady)p.moveHitReady=false;if(p.redetectReady)p.redetectReady=false;
  return ctx;
}
function modifyAttackDamage(match,p,target,d,ctx,now){
  const fx=combinedFx(p,match,now);
  if(p.attackChainTarget===ctx.tid)p.attackChainHits=(p.attackChainHits||0)+1;else{p.attackChainTarget=ctx.tid;p.attackChainHits=1}
  if(p.namedChainTarget===ctx.tid)p.namedChainHits=(p.namedChainHits||0)+1;else{p.namedChainTarget=ctx.tid;p.namedChainHits=1}
  let mult=1+(fx.damage||0)+(ctx.actionDamageBonus||0)+(ctx.gearBonus||0);
  if(ctx.quietReady&&(p.eq||[]).includes("camo_mask"))mult*=1.04;
  if(ctx.quietReady&&fx.quietDamage)mult*=1+fx.quietDamage;
  if((p.eq||[]).includes("toxin_kit")&&status(target,"poison",now))mult*=1.03;
  if(status(target,"poison",now)&&fx.poisonVsDamage)mult*=1+fx.poisonVsDamage;
  const anyStatus=Object.keys(target.statuses||{}).some(id=>!!status(target,id,now));
  if(anyStatus&&fx.statusTargetDamage)mult*=1+fx.statusTargetDamage;
  if(ctx.movedRecently&&fx.afterMoveDamage)mult*=1+fx.afterMoveDamage;
  if(p.hp/maxHp(p,match,now)<.4&&fx.lowHpDamage)mult*=1+fx.lowHpDamage;
  if((p.eq||[]).includes("accel")&&p.attackChainHits>=3){mult*=1.03;p.attackChainHits=0}
  if(fx.thirdHit&&p.namedChainHits%3===0)mult*=1+fx.thirdHit;
  if(fx.chainPerHit)mult*=1+Math.min(fx.chainMax||fx.chainPerHit,Math.max(0,p.namedChainHits-1)*fx.chainPerHit);
  if(fx.extraChance&&Math.random()<fx.extraChance)mult*=1+(fx.extraRatio||0);
  return Math.max(1,Math.round(d*mult));
}
function applyOnHitStatuses(match,p,target,now){
  const fx=combinedFx(p,match,now),one=p.nextStatusBonus||{};
  const chance=(key,base)=>clamp(base+(one[key]||0)+(fx.statusChance||0),0,.95);
  for(const[key,id]of [["poison","poison"],["fear","fear"],["slow","slow"],["confusion","confusion"],["bleed","bleed"],["sleep","sleep"],["bind","bind"]]){
    const base=fx[key+"Chance"]||0;if(base&&Math.random()<chance(key,base))applyStatus(target,id,1,id==="poison"?8:id==="bleed"?10:id==="slow"?6:id==="bind"?2.5:id==="sleep"?3:5,p.playerId,now,p,match,((p.eq||[]).filter(e=>NAMED_GEAR_FX[e]?.[key+"Chance"]).map(e=>item(e)?.n||e).join(" · ")||char(p).passive)+" · 공격 적중 효과");
  }
  p.nextStatusBonus={};
}
function hitRoll(p,skill,bonus,match,now){
  let chance=.80+profHit(p)+bonus;
  if(status(p,"fear",now))chance-=.10;if(status(p,"confusion",now))chance-=.10;
  chance+=combinedFx(p,match,now).hit||0;
  return Math.random()<clamp(chance,.55,.95);
}
function baseDamage(a,b,match,now){
  return Math.max(1,Math.round(atk(a,match,now)*100/(100+def(b,match,now))*incomingMult(b,match,now)));
}
function wildDamage(a,w,match,now){
  const t=wildTemplate(w);let wa=t.atk;if(t.skill==="berserk"&&w.hp/t.hp<=.4)wa*=1.25;
  wa*=1+(reworks.effects(w,match,now).atkPct||0);
  if(enemyGarden(match,w,now))wa*=.9;
  return Math.max(1,Math.round(wa*100/(100+def(a,match,now))*incomingMult(a,match,now)));
}
function createDeathCorpse(match,p,now){
  const reservedEquipment=[p.pendingPickup,...(p.pickupQueue||[])].filter(x=>x?.kind==="equipment").map(x=>x.id);
  p.pendingPickup=null;p.pickupQueue=[];
  p.diedAt??=now;p.finishRank??=match.players.filter(x=>x.alive).length+1;
  dropSpecialsFromPlayer(match,p,p.region);
  const corpse={id:"corpse_"+p.playerId+"_"+now,name:p.playerName,region:p.region,eq:[...p.eq,...reservedEquipment],mat:Object.fromEntries(Object.entries(p.mat||{}).filter(([id,n])=>n>0&&!isUniqueMaterial(id))),con:{...p.con},expiresAt:now+75000};
  match.corpses.push(corpse);p.eq=[];p.mat={};p.con={};return corpse;
}
function environmentDeath(match,p,now,forced=false,source=null,cause="환경 피해"){
  if(!p.alive)return false;
  if(invincible(p)){p.hp=Math.max(1,p.hp);return false}
  const fx=PASSIVE_FX[p.charId]||{};
  if(!forced&&fx.revive&&!p.rev){p.rev=true;p.hp=Math.min(18,maxHp(p,match,now));p.statuses={};return false}
  recordDeathSource(match,p,source,now,cause);
  p.alive=false;p.encounter=null;p.pendingAction=null;createDeathCorpse(match,p,now);return true;
}
function killPlayer(match,a,b,now,force=false){
  if(invincible(b)){b.hp=Math.max(1,b.hp);return {immune:true}}
  const fx=PASSIVE_FX[b.charId]||{};
  if(!force&&fx.revive&&!b.rev){b.rev=true;b.hp=Math.min(18,maxHp(b,match,now));b.statuses={};return {revived:true}}
  recordDeathSource(match,b,a,now,"전투");
  b.alive=false;b.encounter=null;b.pendingAction=null;a.kills++;
  const linked=linkedSpecialForChar(b.charId);
  if(linked&&specialAvailable(match,linked)&&a.alive)grantSpecial(match,a,linked);
  createDeathCorpse(match,b,now);
  namedGear.kill(match,a,b,now);
  return {killed:true}
}
function recordCombatNotice(match,source,target,damage,kind,now,hit=true){
  if(!(damage>0)&&hit)return;
  if(typeof source==='string')source=match.players.find(p=>p.playerId===source)||(match.wilds||[]).find(w=>w.id===source);
  const label=x=>x?.playerName||(x?.templateId?wildTemplate(x)?.n:null)||'알 수 없는 대상';
  if(target?.playerId&&source&&source.region===target.region)rememberIncoming(target,source,label(source),now);
  match.combatNoticeSeq=(match.combatNoticeSeq||0)+1;
  (match.combatNotices??=[]).push({id:match.combatNoticeSeq,at:now,sourceId:source?.playerId||source?.id||null,
    targetId:target?.playerId||target?.id||null,sourceName:label(source),targetName:label(target),damage,kind,hit});
  match.combatNotices=match.combatNotices.slice(-100);
}
function wildCounter(match,p,w,now){
  if(!p.alive||!w.alive||status(w,"sleep",now)||status(w,"timeStop",now))return 0;
  const bleeding=status(w,"bleed",now);if(bleeding){w.hp-=2*bleeding.stacks;bleeding.stacks--;if(bleeding.stacks<=0)delete w.statuses.bleed;if(w.hp<=0){finishWildStatusDeath(match,w,bleeding.sourceId,now);return 0;}}
  const t=wildTemplate(w),d=reworks.takeDirect(match,p,w,wildDamage(p,w,match,now)*reworks.reduction(p,w,match,now),now);recordCombatNotice(match,w,p,d,'반격',now);if(d>0)wakeOnDamage(p,now);
  if(t.skill==="bite_bleed"&&Math.random()<.20)applyStatus(p,"bleed",1,10,w.id,now,null,match);
  else if(t.skill==="harass"&&Math.random()<.25)p.nextHitBonus=(p.nextHitBonus||0)-.06;
  else if(t.skill==="scan_delay"&&Math.random()<.20)applyStatus(p,"actionDelay",1,3,w.id,now,null,match);
  else if(t.skill==="emp"&&Math.random()<.20)applyStatus(p,"silence",1,3,w.id,now,null,match);
  else if(t.skill==="toxic"&&Math.random()<.30)applyStatus(p,"poison",1,8,w.id,now,null,match);
  else if(t.skill==="chimera_status"&&Math.random()<.30)applyStatus(p,pick(["poison","bleed","slow"]),1,null,w.id,now,null,match);
  else if(t.skill==="phantom_fear"&&Math.random()<.25)applyStatus(p,"fear",1,5,w.id,now,null,match);
  else if(t.skill==="pilfer"&&Math.random()<.20)p.sp=Math.max(0,p.sp-5);
  else if(t.skill==="mana_bite"&&Math.random()<.20)p.sp=Math.max(0,p.sp-8);
  if(p.hp<=0)environmentDeath(match,p,now,false,w,"반격");
  return d;
}
function finishWildStatusDeath(m,w,sourceId,n){
 if(!w.alive)return;w.alive=false;w.hp=0;const p=m.players.find(p=>p.playerId===sourceId&&p.alive);if(!p)return;
 const wt=wildTemplate(w),id=pick(wt.drop);if(!addItem(p,id)){if(item(id)?.t==='e')offerEquipment(m,p,id);else if(item(id)?.t==='c')offerSearchConsumable(m,p,id);}reworks.killed(m,p,w,n);
 const f=combinedFx(p,m,n);if(f.killHeal)healPlayer(p,f.killHeal,m,n);if(f.killSp)recoverSp(p,f.killSp,m,n);
}
function applyWildStatusTicks(m,w,n){
 if(!w.alive)return;w.nextStatusTick??=m.startedAt;const poison=w.statuses?.poison;
 while(w.alive&&w.nextStatusTick+2000<=n){w.nextStatusTick+=2000;if(poison?.until>w.nextStatusTick&&(poison.startedAt??m.startedAt)<=w.nextStatusTick){const wt=wildTemplate(w),count=Object.entries(poison.owners||{[poison.sourceId]:poison.stacks||1}).reduce((sum,[id,c])=>sum+c*(m.players.find(p=>p.playerId===id)?.charId==='c43'?1.25:1),0),d=Math.max(1,Math.round(wt.hp*.02*count));w.hp-=d;wakeOnDamage(w,w.nextStatusTick);recordCombatNotice(m,poison.sourceId,w,d,'독',w.nextStatusTick);if(w.hp<=0)finishWildStatusDeath(m,w,poison.sourceId,w.nextStatusTick);}}
}
function clearOneNegativeStatus(p,now=Date.now()){
  for(const id of Object.keys(p.statuses||{})){if(status(p,id,now)){delete p.statuses[id];return true}}
  return false;
}
function applySkillSelfEffects(match,p,sd,damageDealt=0,killed=false,now=Date.now()){
  const fx=combinedFx(p,match,now);
  if(sd.heal)healPlayer(p,sd.heal,match,now);
  if(sd.restoreSp)recoverSp(p,sd.restoreSp,match,now);
  if(sd.selfDamage){damagePlayer(p,sd.selfDamage);if(p.hp<=0)environmentDeath(match,p,now,false,null,"스킬 반동")}
  if(sd.freeMove)p.nextMoveFree=true;
  if(sd.lifesteal&&damageDealt>0)healPlayer(p,damageDealt*sd.lifesteal,match,now);
  if(sd.killHeal&&killed)healPlayer(p,sd.killHeal,match,now);
  if(sd.tempGuard){p.tempGuardUntil=now+(sd.tempGuardDuration||8)*1000;p.tempGuardRate=sd.tempGuard}
}
function skillDamageVsPlayer(match,p,t,sd,now){
  const ignore=sd.defIgnore||0,d=Math.max(0,def(t,match,now)*(1-ignore));
  return Math.max(1,atk(p,match,now)*100/(100+d)*incomingMult(t,match,now));
}
function skillDamageVsWild(match,p,w,sd,now){
  const wt=wildTemplate(w),ignore=sd.defIgnore||0,d=Math.max(0,wt.def*(enemyGarden(match,w,now)?.9:1)*(1-ignore));
  return Math.max(1,atk(p,match,now)*100/(100+d));
}
function attackPlayer(match,p,t,skill=false,now=Date.now()){
  if(REWORK_CONFIG[p.charId]||!skill&&namedGear.attackProfile(p))return reworkCombat(match,p,t,skill,now);
  const sd=COMBAT_SKILL_DEFS[p.charId]||{mult:1.08,sp:12,cd:55};
  const ctx=attackContext(match,p,t,skill,now);
  let spCost=0,bonus=ctx.hitBonus,mult=1;
  if(skill){
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    const fx=combinedFx(p,match,now);
    spCost=Math.max(0,(sd.sp??12)*((p.eq||[]).includes("focus") ? .95 : 1)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0));
    if(p.sp<spCost)return {ok:false,error:"not_enough_sp"};
    p.sp-=spCost;p.nextSkillSpDiscount=0;p.cdCUntil=now+((sd.cd??55)/Math.max(.25,1+(fx.cdRate||0)))*1000;p.cdCDuration=(p.cdCUntil-now)/1000;bonus+=sd.hit||0;
    mult=sd.multMin!=null?sd.multMin+Math.random()*(sd.multMax-sd.multMin):(sd.mult??1.08);
    if(sd.lowHpMult!=null&&p.hp/maxHp(p,match,now)<.5)mult=sd.lowHpMult;
    if(sd.bindMult&&status(t,"bind",now))mult=sd.bindMult;
    else if(sd.delayMult&&status(t,"actionDelay",now))mult=sd.delayMult;
    if(sd.timeScale)mult*=1+Math.min(.20,Math.floor(nowSec(match,now)/120)*.05);
  }
  if(!(skill&&sd.execute)&&!hitRoll(p,skill,bonus,match,now)){
    recordCombatNotice(match,p,t,0,skill?'전투 스킬':'일반 공격',now,false);
    reworks.afterDirect(match,p,t,skill,false,0,now);gainProf(p,.5,match,now);p.attackChainTarget=t.playerId;p.attackChainHits=0;
    if(skill)applySkillSelfEffects(match,p,sd,0,false,now);
    const bleedDamage=triggerBleedAction(match,p,now);
    return {ok:true,hit:false,damage:0,bleedDamage};
  }

  const fx=combinedFx(p,match,now);
  let d=(skill?skillDamageVsPlayer(match,p,t,sd,now):baseDamage(p,t,match,now))*mult;
  if(skill){ctx.skillDamageBonus=p.nextSkillDamageBonus||0;p.nextSkillDamageBonus=0;d*=1+(fx.skillDamage||0)+ctx.skillDamageBonus}
  if(skill&&sd.quietBonus&&ctx.quietReady)d*=1+sd.quietBonus;
  let dispelled=false;
  if(skill&&sd.dispelOne){dispelled=clearOneNegativeStatus(t,now);if(dispelled)d*=1+(sd.dispelBonus||0)}
  const canSkillCrit=!skill||!!sd.crit;
  const crit=canSkillCrit&&Math.random()<clamp(.05+(skill?(sd.crit||0):0)+(fx.crit||0)+(ctx.actionCritBonus||0),0,.5);
  if(crit)d*=1.4;
  d=modifyAttackDamage(match,p,t,d,ctx,now);
  if(skill&&sd.execute)d=t.hp;d=(skill&&sd.execute)?damagePlayer(t,d):reworks.takeDirect(match,t,p,d*reworks.reduction(t,p,match,now),now);recordCombatNotice(match,p,t,d,skill?'전투 스킬':'일반 공격',now);if(d>0)wakeOnDamage(t,now);reworks.afterDirect(match,p,t,skill,true,d,now);recordBattle(match,p,t,now);gainProf(p,1.5,match,now);

  if(skill){
    for(const row of sd.statuses||[]){
      const[id,chance,dur,stacks=1]=row,finalChance=clamp(chance+(fx.statusChance||0),0,.95);
      if(Math.random()<finalChance)applyStatus(t,id,stacks,dur||null,p.playerId,now,p,match,char(p).combat);
    }
    if(sd.forcePoison)applyStatus(t,"poison",sd.forcePoison,8,p.playerId,now,p,match,char(p).combat);
    if(sd.randomStatus&&Math.random()<clamp(.35+(fx.statusChance||0),0,.95))applyStatus(t,pick(["poison","bleed","slow"]),1,null,p.playerId,now,p,match,char(p).combat);
    if(sd.doubleRandomStatus)for(const id of pick([["poison","bleed"],["poison","slow"],["bleed","slow"]]))if(Math.random()<clamp(.50+(fx.statusChance||0),0,.95))applyStatus(t,id,1,null,p.playerId,now,p,match,char(p).combat);
    if(sd.randomControl&&Math.random()<clamp(sd.randomControl+(fx.statusChance||0),0,.95))applyStatus(t,pick(["slow","bind","fear","confusion","silence"]),1,null,p.playerId,now,p,match,char(p).combat);
    if(sd.drainSp)t.sp=Math.max(0,t.sp-sd.drainSp);
    if(sd.mark){p.trackingMarks??={};p.trackingMarks[t.playerId]=now+sd.mark*1000}
  }

  if((p.eq||[]).includes("toxin_kit")&&Math.random()<clamp(.06+(combinedFx(p,match,now).statusChance||0),0,.95))applyStatus(t,"poison",1,8,p.playerId,now,p,match,"독성 키트 · 공격 적중");
  applyOnHitStatuses(match,p,t,now);
  const death=t.hp<=0?killPlayer(match,p,t,now,!!(skill&&sd.execute)):null,killed=!!death?.killed;
  if(skill)applySkillSelfEffects(match,p,sd,d,killed,now);
  if(killed){
    const kfx=combinedFx(p,match,now);
    if(kfx.killHeal)healPlayer(p,kfx.killHeal,match,now);
    if(kfx.killSp)recoverSp(p,kfx.killSp,match,now);
  }
  const bleedDamage=triggerBleedAction(match,p,now);
  return {ok:true,hit:true,crit,damage:d,death,dispelled,bleedDamage};
}
function attackWild(match,p,w,skill=false,now=Date.now()){
  if(REWORK_CONFIG[p.charId]||!skill&&namedGear.attackProfile(p))return reworkCombat(match,p,w,skill,now);
  const t=wildTemplate(w),sd=COMBAT_SKILL_DEFS[p.charId]||{mult:1.08,sp:12,cd:55};
  const ctx=attackContext(match,p,w,skill,now);
  let spCost=0,bonus=ctx.hitBonus,mult=1;
  if(skill){
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    const fx=combinedFx(p,match,now);
    spCost=Math.max(0,(sd.sp??12)*((p.eq||[]).includes("focus") ? .95 : 1)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0));
    if(p.sp<spCost)return {ok:false,error:"not_enough_sp"};
    p.sp-=spCost;p.nextSkillSpDiscount=0;p.cdCUntil=now+((sd.cd??55)/Math.max(.25,1+(fx.cdRate||0)))*1000;p.cdCDuration=(p.cdCUntil-now)/1000;bonus+=sd.hit||0;
    mult=sd.multMin!=null?sd.multMin+Math.random()*(sd.multMax-sd.multMin):(sd.mult??1.08);
    if(sd.lowHpMult!=null&&p.hp/maxHp(p,match,now)<.5)mult=sd.lowHpMult;
    if(sd.bindMult&&status(w,"bind",now))mult=sd.bindMult;
    else if(sd.delayMult&&status(w,"actionDelay",now))mult=sd.delayMult;
    if(sd.timeScale)mult*=1+Math.min(.20,Math.floor(nowSec(match,now)/120)*.05);
  }
  if(!(skill&&sd.execute)&&!hitRoll(p,skill,bonus,match,now)){
    reworks.afterDirect(match,p,w,skill,false,0,now);recordCombatNotice(match,p,w,0,skill?'전투 스킬':'일반 공격',now,false);
    gainProf(p,.5,match,now);p.attackChainTarget=w.id;p.attackChainHits=0;
    if(skill)applySkillSelfEffects(match,p,sd,0,false,now);
    const bleedDamage=triggerBleedAction(match,p,now);
    return {ok:true,hit:false,damage:0,counter:wildCounter(match,p,w,now),bleedDamage};
  }

  const fx=combinedFx(p,match,now);
  let d=(skill?skillDamageVsWild(match,p,w,sd,now):Math.max(1,atk(p,match,now)*100/(100+t.def*(enemyGarden(match,w,now)?.9:1))))*mult;
  if(skill){ctx.skillDamageBonus=p.nextSkillDamageBonus||0;p.nextSkillDamageBonus=0;d*=1+(fx.skillDamage||0)+ctx.skillDamageBonus}
  if(skill&&sd.quietBonus&&ctx.quietReady)d*=1+sd.quietBonus;
  const canSkillCrit=!skill||!!sd.crit;
  const crit=canSkillCrit&&Math.random()<clamp(.05+(skill?(sd.crit||0):0)+(fx.crit||0)+(ctx.actionCritBonus||0),0,.5);
  if(crit)d*=1.4;
  d=modifyAttackDamage(match,p,w,d,ctx,now);
  if(t.skill==="guard"&&w.guardReady){w.guardReady=false;d=Math.max(1,Math.round(d*.8))}
  if(skill&&sd.execute)d=w.hp;
  w.hp-=d;reworks.afterDirect(match,p,w,skill,true,d,now);if(d>0)wakeOnDamage(w,now);recordCombatNotice(match,p,w,d,skill?'전투 스킬':'일반 공격',now);gainProf(p,1.5,match,now);

  let drop=null,extra=[],killed=false;
  if(w.hp<=0){
    reworks.killed(match,p,w,now);killed=true;w.alive=false;w.hp=0;drop=pick(t.drop);if(!addItem(p,drop)&&item(drop)?.t==="e")offerEquipment(match,p,drop);
    if(t.skill==="supply_cache")for(let i=0;i<2;i++){const x=pick(t.drop);if(addItem(p,x)||(item(x)?.t==="e"&&offerEquipment(match,p,x)))extra.push(x)}
    const kfx=combinedFx(p,match,now);
    if(kfx.killHeal)healPlayer(p,kfx.killHeal,match,now);
    if(kfx.killSp)recoverSp(p,kfx.killSp,match,now);
  }
  if(skill)applySkillSelfEffects(match,p,sd,d,killed,now);
  const bleedDamage=triggerBleedAction(match,p,now);
  const counter=w.alive&&p.alive?wildCounter(match,p,w,now):0;
  return {ok:true,hit:true,crit,damage:d,killed,drop,extra,counter,bleedDamage};
}
function hasEquippedWeaponType(p,type){return (p.eq||[]).some(id=>item(id)?.weaponType===type)}
function hasTool(p){return hasEquippedWeaponType(p,"도구")}
function hasTerminal(p){return hasEquippedWeaponType(p,"단말")}
function metalMaterialKinds(p){return ["iron","steel","alloy","silver","wire"].filter(id=>(p.mat?.[id]||0)>0).length}
function eventEligibleForPlayer(e,p){
  const cond=e?.condition||"";
  if(cond==="금속 재료 2종 이상 보유")return metalMaterialKinds(p)>=2;
  return true;
}
function eventChoiceAvailability(e,p,index){
  const choice=e?.choices?.[index];if(!choice)return{available:false,reason:"선택지 없음"};
  const text=(choice.label||"")+" "+(choice.result||"");
  if(/도구 보유 시/.test(text)||/도구로/.test(choice.label||"")){
    if(!hasTool(p))return{available:false,reason:"도구 장비 필요"};
  }
  if(/정밀부품 1개 소비/.test(text)){
    if((p.mat?.precision||0)<1)return{available:false,reason:"정밀부품 1개 필요"};
  }
  if(/단말 태그 보유 시/.test(text)||/단말로/.test(choice.label||"")){
    if(!hasTerminal(p))return{available:false,reason:"단말 장비 필요"};
  }
  if(e.id==="E048"&&index===0&&!hasTool(p)&&(p.mat?.electronics||0)<1)return{available:false,reason:"도구 또는 전자부품 필요"};
  if(e.id==="E078"&&index===0&&!hasTool(p)&&(p.mat?.precision||0)<1)return{available:false,reason:"도구 또는 정밀부품 필요"};
  return{available:true,reason:""};
}
function consumeEventChoiceCost(e,p,index){
  const choice=e?.choices?.[index],text=choice?.result||"";
  if(/정밀부품 1개 소비/.test(text))consumeItem(p,"precision",1);
}
function searchResult(match,p,now){
  p.sp=Math.max(0,p.sp-3*(1+(combinedFx(p,match,now).allSp||0)));
  const mods=cleanupEventMods(p,now),regionBoost=mods.regionEventBoosts[p.region]?.bonus||0;
  const eventChance=Math.min(.20,.05+(match.eventPity[p.region]||0)+regionBoost);
  if(Math.random()<eventChance){
    let pool=ENCOUNTER_EVENTS.filter(e=>e.region===p.region&&e.id!==match.lastEventId&&eventEligibleForPlayer(e,p));
    const normal=pool.filter(e=>e.condition!=="매우 낮은 확률"),rare=pool.filter(e=>e.condition==="매우 낮은 확률");
    if(rare.length&&Math.random()<.12)pool=rare;else if(normal.length)pool=normal;
    if(pool.length){
      const specialBoost=mods.nextSpecialEventBoost||0;
      const specialRegional=mods.regionSpecialEventBoosts[p.region]?.bonus||0;
      const e=weightedPick(pool,x=>{
        let w=1+(mods.eventWeights[x.id]?.bonus||0)+(x.type?.includes("특수")?(specialBoost+specialRegional):0);
        if(x.id==="E002"&&specialState(match,"special_01")?.state==="unspawned")w+=.75;
        return w
      });
      mods.nextSpecialEventBoost=0;if(mods.eventWeights[e.id]?.oneShot)delete mods.eventWeights[e.id];match.lastEventId=e.id;match.eventPity[p.region]=0;p.pendingEvent=e.id;return {kind:"event",event:e}
    }
  } else match.eventPity[p.region]=(match.eventPity[p.region]||0)+.007;
  const ground=groundSpecialsInRegion(match,p.region);
  if(ground.length&&Math.random()<.35){const id=pick(ground);if(pickupGroundSpecial(match,p,id))return {kind:"special",itemId:id,itemName:item(id)?.n||id,source:"ground"}}
  const regional=regionSpecialCandidates(match,p.region);
  const specialChance=clamp(.035+(mods.regionSpecialBoosts[p.region]?.bonus||0)+(mods.nextSpecialChanceBonus||0),0,.95);
  if(regional.length){mods.nextSpecialChanceBonus=0}
  if(regional.length&&Math.random()<specialChance){const id=pick(regional);if(grantSpecial(match,p,id))return {kind:"special",itemId:id,itemName:item(id)?.n||id,source:"search"}}
  const humans=match.players.filter(x=>x!==p&&x.alive&&x.region===p.region);
  if(humans.length){
    const t=pick(humans),detectChance=clamp(.70+detectionBonus(p,t,match,now)-detectionPenalty(t,match,now),.10,.95);
    if(Math.random()<detectChance){
      p.nextDetectBonus=0;
      const trap=match.regionTraps?.[p.region];
      if(trap&&trap.until>now&&trap.ownerId===p.playerId){p.nextHitBonus=(p.nextHitBonus||0)+(trap.hitBonus||0);delete match.regionTraps[p.region]}
      onTargetDetected(p,t,match,now);
      p.encounter={kind:"player",targetId:t.playerId};
      return {kind:"player",target:{playerId:t.playerId,playerName:t.playerName,charId:t.charId,hp:t.hp,maxHp:t.maxHp}};
    }
  }
  const wilds=match.wilds.filter(w=>w.alive&&w.region===p.region&&nowSec(match,now)>=wildTemplate(w).after);
  if(wilds.length&&Math.random()<.50){const w=pick(wilds),t=wildTemplate(w);p.encounter={kind:"wild",wildId:w.id};return {kind:"wild",target:{wildId:w.id,name:t.n,hp:w.hp,maxHp:t.hp,skillText:t.skillText}}}
  const corpse=match.corpses.find(c=>c.region===p.region&&c.expiresAt>now&&(c.eq.length||Object.keys(c.mat).length||Object.keys(c.con).length));
  if(corpse&&Math.random()<.08)return {kind:"corpse",corpse};
  const pool=POOLS[p.region]||[],fx=combinedFx(p,match,now);
  const itemChance=clamp(.90+(fx.searchLoot||0)+(p.nextSearchLootBonus||0),.20,.99);
  p.nextSearchLootBonus=0;
  if(pool.length&&Math.random()<itemChance){
    const boost=mods.regionLootBoosts[p.region];
    const weaponMat=new Set(["iron","steel","alloy","wire","wood","stick","gunpowder","leather","rubber"]);
    const medMagic=new Set(["medicine","toxin","mana_ink","mana_fiber","mana_stone","crystal"]);
    const id=boost?weightedPick(pool,x=>1+(boost.kind==="weapon"&&weaponMat.has(x)?boost.bonus:boost.kind==="medmagic"&&medMagic.has(x)?boost.bonus:0)):pick(pool);
    if(addItem(p,id))return {kind:"item",itemId:id,itemName:item(id)?.n||id};
    if(item(id)?.t==="e"&&offerEquipment(match,p,id))return {kind:"pending_pickup",itemId:id,itemName:item(id).n};
    if(item(id)?.t==="c"&&offerSearchConsumable(match,p,id))return {kind:"pending_pickup",itemId:id,itemName:item(id).n}
  }
  return {kind:"nothing"};
}
function useConsumable(match,p,id,now){
  const it=item(id);if(!it||it.t!=="c"||owned(p,id)<=0)return {ok:false,error:"item_missing"};
  if(id==="carbonara_mint_fish"&&p.charId!=="c49"){
    consumeItem(p,id,1);if(!invincible(p))p.hp=0;environmentDeath(match,p,now,true,null,it.n+" 섭취");
    return {ok:true,itemId:id,itemName:it.n,special:invincible(p)?"무적으로 즉사 무효":"아바돈 이외의 캐릭터 섭취 시 즉사",dead:!p.alive};
  }
  const inCombat=!!p.encounter,combat=inCombat?(it.combatEff??.75):1,repeat=foodRepeatMultiplier(p,id,it,now);
  const fx=combinedFx(p,match,now),recoveryMult=(p.eq||[]).includes("recovery")?1.08:1,healMult=repeat*combat*recoveryMult*(1+(fx.heal||0)),spMult=repeat*combat;
  if(it.consumableBuff)addTemp(p,it.consumableBuff.fx,it.consumableBuff.duration,now);
  if(it.heal)healPlayer(p,it.heal*repeat*combat*recoveryMult*(1+(fx.itemHeal||0)),match,now);
  if(it.sp)recoverSp(p,it.sp*spMult,match,now);
  if(it.sat)p.satiety=clamp(p.satiety+it.sat,0,100);

  if(id==="energy_drink")addTemp(p,{moveSp:1},25,now);
  else if(id==="coffee")addTemp(p,{searchTime:-.05},30,now);
  else if(id==="strong_coffee"){addTemp(p,{actionTime:-.04},30,now);scheduleDelayedFx(p,30,{spRecovery:-.10},20,now)}
  else if(id==="chocolate")addTemp(p,{moveTime:-.05},15,now);
  else if(id==="grilled_meat")addTemp(p,{maxHpFlat:8},30,now);
  else if(id==="warm_soup"){
    for(const sid of["fear","confusion"]){const s=p.statuses?.[sid];if(s&&s.until>now)s.until=now+(s.until-now)*.8}
  }else if(id==="antidote"){
    removeStatusStacks(p,"poison",2);const s=p.statuses?.poison;if(s&&s.until>now)s.until=now+(s.until-now)*.5;
  }else if(id==="bandage")removeStatusStacks(p,"bleed",2);

  if(id==="mint_choco_fish"){
    if(p.charId==="c49")p.satiety=100;
    if(p.charId==="c13"){
      consumeItem(p,id,1);environmentDeath(match,p,now,false,null,it.n+" 섭취");
      return {ok:true,itemId:id,itemName:it.n,special:"하쿠 특수 반응",dead:!p.alive};
    }
  }
  if(id==="carbonara_mint_fish"&&p.charId==="c49"){
    p.hp=maxHp(p,match,now);p.sp=p.maxSp;p.satiety=100;consumeItem(p,id,1);
    p.eq=[];reworkState(p).resources.feast=3;
    if(inCombat)p.encounter=null;
    return {ok:true,itemId:id,itemName:it.n,special:"아바돈 특수 반응"};
  }

  consumeItem(p,id,1);
  if(inCombat){const target=encounterTarget(match,p);if(target?.kind==="wild"&&p.alive)wildCounter(match,p,target.obj,now);p.encounter=null}
  return {ok:true,itemId:id,itemName:it.n,repeatMultiplier:repeat,combatMultiplier:combat};
}
function firstCorpseInRegion(match,p,now){return (match.corpses||[]).find(c=>c.region===p.region&&c.expiresAt>now)}
function removeAnyStatus(p,n=1,now=Date.now()){
  let removed=0;
  for(const id of Object.keys(p.statuses||{})){if(removed>=n)break;const s=status(p,id,now);if(s){delete p.statuses[id];removed++}}
  return removed;
}
function charAction(match,p,now,payload={}){
  if(REWORK_CONFIG[p.charId])return reworks.action(match,p,payload,now);
  const d=ACTION_SKILL_DEFS[p.charId];if(!d)return {ok:false,error:"action_missing"};
  if((p.cdAUntil||0)>now)return {ok:false,error:"action_cooldown"};
  p.cdAUntil=now+((d.cd??45)/Math.max(.25,1+(combinedFx(p,match,now).cdRate||0)))*1000;p.cdADuration=(p.cdAUntil-now)/1000;

  let gardenResult;
  if(d.garden){
    match.regionGardens??={};
    const sources=gardenSources(match,p.region,now).filter(x=>x.ownerId!==p.playerId);sources.push({installedAt:now,until:now+30000,ownerId:p.playerId});
    match.regionGardens[p.region]={installedAt:now,until:Math.max(...sources.map(x=>x.until)),ownerId:p.playerId,sources};
    const targets=[...match.players,...(match.wilds||[])].filter(q=>q!==p&&q.alive&&q.region===p.region);
    const detected=[];
    for(const q of targets){
      let affected=false,bound=false;
      for(const id of ["bind","actionDelay"]){
        const applied=Math.random()<clamp(d.gardenStatusChance??1,0,1)&&applyStatus(q,id,1,null,p.playerId,now,p,match,char(p).action);
        affected=applied||affected;if(id==="bind")bound=applied;
      }
      if(affected&&q.playerId){
        if(bound)detected.push({playerId:q.playerId,name:q.playerName});
        onTargetDetected(p,q,match,now);
        rememberEnemy(p,{id:q.playerId,name:q.playerName,kind:"player",source:"encounter",hp:Math.max(0,q.hp),maxHp:maxHp(q,match,now),alive:q.alive},now);
      }
    }
    if(detected.length){
      p.gardenDetectionSeq=(p.gardenDetectionSeq||0)+1;
      (p.gardenDetectionNotices??=[]).push({id:p.gardenDetectionSeq,region:p.region,targets:detected,at:now});
      p.gardenDetectionNotices=p.gardenDetectionNotices.slice(-16);
    }
    gardenResult={region:p.region,affected:targets.length};
  }
  if(d.selfDebuffs){
    p.statusImmunity??={};
    for(const id of ["poison","bleed","slow","bind","sleep","fear","confusion","silence","actionDelay"]){delete p.statusImmunity[id];applyStatus(p,id,1,null,p.playerId,now,null,match,char(p).action)}
  }
  if(d.heal)healPlayer(p,d.heal,match,now);
  if(d.sp)recoverSp(p,d.sp,match,now);
  if(d.selfDamage){damagePlayer(p,d.selfDamage);if(p.hp<=0){environmentDeath(match,p,now,false,null,"스킬 반동");return {ok:true,selfDeath:!p.alive}}}
  if(d.tempFx)addTemp(p,d.tempFx,d.duration||20,now);
  if(d.nextDetect)p.nextDetectBonus=(p.nextDetectBonus||0)+d.nextDetect;
  if(d.nextSearch)p.nextSearchLootBonus=(p.nextSearchLootBonus||0)+d.nextSearch;
  if(d.nextHit)p.nextHitBonus=(p.nextHitBonus||0)+d.nextHit;
  if(d.nextDamage){
    if(d.skillOnlyDamage)p.nextSkillDamageBonus=(p.nextSkillDamageBonus||0)+d.nextDamage;
    else p.nextDamageBonus=(p.nextDamageBonus||0)+d.nextDamage;
  }
  if(d.nextCrit)p.nextCritBonus=(p.nextCritBonus||0)+d.nextCrit;
  if(d.nextStatus)p.nextStatusBonus={...(p.nextStatusBonus||{}),...d.nextStatus};
  if(d.nextSkillSpDiscount)p.nextSkillSpDiscount=Math.max(p.nextSkillSpDiscount||0,d.nextSkillSpDiscount);
  if(d.nextCraftTimeMult)p.nextCraftTimeMult=Math.min(p.nextCraftTimeMult||1,d.nextCraftTimeMult);
  if(d.nextMoveFree)p.nextMoveFree=true;

  if(d.cleanseAny)removeAnyStatus(p,d.cleanseAny,now);
  if(d.cleanse){
    let n=d.cleanseCount||1;
    for(const id of d.cleanse){if(n<=0)break;const s=status(p,id,now);if(s){delete p.statuses[id];n--}}
  }
  if(d.cleanseSpecific)for(const[id,n]of Object.entries(d.cleanseSpecific))removeStatusStacks(p,id,n);

  if(d.material){if(isSpecialMaterial(d.material))grantSpecial(match,p,d.material);else addItem(p,d.material,d.materialQty||1)}
  if(d.consumable)addItem(p,d.consumable,1);
  if(d.randomMetal){const id=Math.random()<.65?"iron":"steel";p.mat[id]=(p.mat[id]||0)+1}

  if(d.corpseHeal||d.consumeCorpse){
    const corpse=firstCorpseInRegion(match,p,now);
    if(corpse){
      healPlayer(p,(d.corpseHeal||0),match,now);
      if(d.consumeCorpse)match.corpses.splice(match.corpses.indexOf(corpse),1);
    }else{
      if(d.noCorpseSp)recoverSp(p,d.noCorpseSp,match,now);
      if(d.noCorpseHeal)healPlayer(p,d.noCorpseHeal,match,now);
    }
  }

  if(d.healIfRevUsed&&p.rev)healPlayer(p,d.healIfRevUsed,match,now);
  if(d.reduceCombatCd)p.cdCUntil=Math.max(now,(p.cdCUntil||now)-d.reduceCombatCd*1000);
  if(d.refundActionCd)p.cdAUntil=Math.max(now,p.cdAUntil-d.refundActionCd*1000);
  if(d.luckAction){
    const r=Math.random();
    if(r<.34)healPlayer(p,10,match,now);
    else if(r<.67)recoverSp(p,12,match,now);
    else p.nextCritBonus=(p.nextCritBonus||0)+.20;
  }
  if(d.trap){
    match.regionTraps??={};
    match.regionTraps[p.region]={ownerId:p.playerId,until:now+45000,hitBonus:d.nextHit||.20};
  }
  return {ok:true,...(gardenResult?{garden:gardenResult}:{})};
}
function normalizedFxText(it){
  if(!it?.fx)return "";
  if(typeof it.fx==="string")return it.fx.toLowerCase();
  try{return JSON.stringify(it.fx).toLowerCase()}catch{return ""}
}
function characterGearTags(p){
  const ch=char(p),tags=new Set([ch.preferredWeapon]);
  const fx=PASSIVE_FX[p.charId]||{},sd=COMBAT_SKILL_DEFS[p.charId]||{},ad=ACTION_SKILL_DEFS[p.charId]||{};
  if((fx.statusChance||fx.poisonChance||fx.fearChance||fx.sleepChance||fx.bindChance)||(sd.statuses?.length||sd.forcePoison||sd.randomControl))tags.add("상태");
  if((fx.detect||fx.woundedDetect)||(ad.nextDetect||ad.tempFx?.detect))tags.add("탐지");
  if(fx.conceal||ad.tempFx?.conceal)tags.add("은신");
  if((fx.moveTime||fx.moveSp||fx.afterMoveHit||fx.afterMoveDamage)||(ad.nextMoveFree||ad.tempFx?.moveTime))tags.add("기동");
  if((fx.heal||fx.restHeal)||sd.heal||sd.lifesteal||ad.heal)tags.add("회복");
  if((fx.taken||fx.lowDef||fx.defFlat)||sd.tempGuard||ad.tempFx?.taken||ad.tempFx?.defFlat)tags.add("방어");
  if((fx.crit||fx.prep||fx.damage)||sd.crit||(sd.mult??1)<1.1)tags.add("연타");
  return tags
}
function recommendedGearScore(p,id,it){
  if(!p||!it||it.t!=="e")return-999;
  let s=0;const ch=char(p),tags=characterGearTags(p),fx=normalizedFxText(it);
  if(it.weaponType===ch.preferredWeapon)s+=50;
  else if(it.weaponType&&["검","단검","창","둔기","낫","권갑","활","총","투척무기","중량무기","특수무기","마도구","마법서"].includes(it.weaponType))s-=8;
  if(it.tier==="최종")s+=20;else if(it.tier==="준최종")s+=15;else if(it.tier==="희귀 시너지")s+=12;else if(it.tier==="희귀")s+=7;else if(it.tier==="고급")s+=3;
  if(tags.has("탐지")&&(fx.includes("tracking")||id==="aim_terminal"||id==="trace"))s+=16;
  if(tags.has("은신")&&(fx.includes("stealth")||id==="camo_mask"||id==="evasion"))s+=16;
  if(tags.has("상태")&&(fx.includes("poison")||fx.includes("control")||["spell_amp","toxin_kit","focus","detox"].includes(id)))s+=16;
  if(tags.has("기동")&&(fx.includes("mobility")||["propulsion","evasion"].includes(id)))s+=16;
  if(tags.has("회복")&&(fx.includes("sustain")||id==="recovery"))s+=16;
  if(tags.has("방어")&&(fx.includes("bruiser")||id==="plate"||(it.def||0)>=20))s+=13;
  if(tags.has("연타")&&(fx.includes("rapid")||id==="accel"))s+=13;
  if((it.atk||0)>0)s+=Math.min(12,it.atk*.45);
  if((it.def||0)>0)s+=Math.min(10,it.def*.22);
  return s
}
function recommendedReason(p,id,it){
  const ch=char(p),parts=[],tags=characterGearTags(p),fx=normalizedFxText(it);
  if(it.weaponType===ch.preferredWeapon)parts.push("선호 "+ch.preferredWeapon);
  if(tags.has("탐지")&&(fx.includes("tracking")||id==="aim_terminal"||id==="trace"))parts.push("탐지 시너지");
  if(tags.has("은신")&&(fx.includes("stealth")||id==="camo_mask"||id==="evasion"))parts.push("은신 시너지");
  if(tags.has("상태")&&(fx.includes("poison")||fx.includes("control")||["spell_amp","toxin_kit","focus","detox"].includes(id)))parts.push("상태이상 시너지");
  if(tags.has("기동")&&(fx.includes("mobility")||["propulsion","evasion"].includes(id)))parts.push("기동 시너지");
  if(tags.has("회복")&&(fx.includes("sustain")||id==="recovery"))parts.push("회복 시너지");
  if(tags.has("방어")&&(fx.includes("bruiser")||id==="plate"))parts.push("방어 시너지");
  if(tags.has("연타")&&(fx.includes("rapid")||id==="accel"))parts.push("공격 템포 시너지");
  return parts.length?parts.join(" · "):"기본 능력치 효율"
}
function recipeProgress(p,it){
  if(!it?.r)return{ready:false,have:0,need:0,missing:[]};
  let have=0,need=0;const missing=[];
  for(const[id,n]of Object.entries(it.r)){
    const count=owned(p,id);need+=n;have+=Math.min(n,count);
    if(count<n)missing.push({id,name:item(id)?.n||id,need:n,have:count,missing:n-count});
  }
  return{ready:missing.length===0,have,need,missing};
}
function recommendedCrafts(p,limit=12){
  return Object.entries(ITEMS)
    .filter(([,it])=>it?.t==="e"&&it.r)
    .map(([id,it])=>{
      const score=recommendedGearScore(p,id,it),progress=recipeProgress(p,it);
      return{id,name:it.n,tier:it.tier||"",atk:it.atk||0,def:it.def||0,score,reason:recommendedReason(p,id,it),ready:progress.ready,have:progress.have,need:progress.need,missing:progress.missing}
    })
    .filter(x=>x.score>=18)
    .sort((a,b)=>(Number(b.ready)-Number(a.ready))||(b.score-a.score)||((b.have/Math.max(1,b.need))-(a.have/Math.max(1,a.need))))
    .slice(0,limit)
}
function ensureIntel(p){
  p.intel??={playerTraces:[],specialCandidates:[],materialHints:[],eventHints:[]};
  for(const k of["playerTraces","specialCandidates","materialHints","eventHints"])p.intel[k]??=[];
  return p.intel;
}
function pushIntel(list,row,max=6){
  list.unshift(row);
  if(list.length>max)list.length=max;
}
function regionName(id){
  const map={city:"텅 빈 도심",estate:"저택",church:"교회",factory:"폐공장",mgmt_lobby:"관리국 로비",mgmt_admin:"관리국 행정실",mgmt_director:"관리국장실",mgmt_cafeteria:"관리국 식당",mgmt_lab:"관리국 연구실",mgmt_training:"관리국 훈련실",evil_reception:"악의 조직 접견실",evil_quarters:"악의 조직 숙소",evil_training:"악의 조직 훈련실"};
  return map[id]||id;
}
function recordPlayerTraceIntel(match,p,now){
  const candidates=match.players.filter(x=>x!==p&&x.alive&&!((ensureEventMods(x).traceHiddenUntil||0)>now));
  if(!candidates.length)return null;
  const target=pick(candidates),row={kind:"player_trace",playerId:target.playerId,name:target.playerName,region:target.region,regionName:regionName(target.region),at:now};
  pushIntel(ensureIntel(p).playerTraces,row);
  if(target.region===p.region)rememberIncoming(p,target,target.playerName,now,"trace");
  return row;
}
function recordSpecialCandidateIntel(match,p,now){
  const ids=[...groundSpecialsInRegion(match,p.region),...regionSpecialCandidates(match,p.region)];
  const unique=[...new Set(ids)].slice(0,6),row={kind:"special_candidates",region:p.region,regionName:regionName(p.region),items:unique.map(id=>({id,name:item(id)?.n||id,state:specialState(match,id)?.state||"unknown"})),at:now};
  pushIntel(ensureIntel(p).specialCandidates,row);return row;
}
function materialTargetRegions(ids){
  const wanted=new Set(ids);return Object.entries(POOLS).filter(([,pool])=>pool.some(id=>wanted.has(id))).map(([region,pool])=>({region,regionName:regionName(region),hits:pool.filter(id=>wanted.has(id))})).sort((a,b)=>b.hits.length-a.hits.length).slice(0,5)
}
function recordMaterialHintIntel(p,now){
  const rec=recommendedCrafts(p,4).find(x=>!x.ready&&x.missing?.length);
  if(!rec)return null;
  const ids=rec.missing.map(x=>x.id),row={kind:"material_hint",targetId:rec.id,targetName:rec.name,regions:materialTargetRegions(ids),at:now};
  pushIntel(ensureIntel(p).materialHints,row);return row;
}
function publicPlayer(match,p,now=Date.now(),advance=true){
  if(advance)updatePassiveTime(match,now);else p={...p,intel:p.intel?{...p.intel}:undefined};ensureIntel(p);
  const aura=gardenAuras(match,p,now),rw=reworks.view(match,p,now);
  return {...p,...rw,statuses:{...p.statuses,...aura.statuses},buffs:{...aura.buffs,...rw.reworkBuffs,...namedGear.view(match,p,now)},inGarden:(match.regionGardens?.[p.region]?.until||0)>now,enemyContacts:p.enemyContacts?.[p.region]||[],nearbyNoise:nearbyNoiseFor(match,p,now),maxHp:maxHp(p,match,now),atk:atk(p,match,now),def:def(p,match,now),cdC:Math.max(0,((p.cdCUntil||0)-now)/1000),cdA:Math.max(0,((p.cdAUntil||0)-now)/1000),
    inventory:{eq:(p.eq||[]).map(id=>({id,...item(id),salvage:equipmentSalvage(id)})),mat:Object.entries(p.mat||{}).filter(([,n])=>n>0).map(([id,n])=>({id,count:n,name:item(id)?.n||id})),con:Object.entries(p.con||{}).filter(([,n])=>n>0).map(([id,n])=>({id,count:n,...item(id)}))}
  };
}
function actionDuration(match,p,type,payload={},now=Date.now()){
  const fx=combinedFx(p,match,now);let sec=1;
  if(type==="search"){const mods=cleanupEventMods(p,now);sec=mods.instantSearchRegion===p.region ? .08 : Math.max(.8,1.5*(1+(fx.searchTime||0)))}
  else if(type==="rest")sec=3;
  else if(type==="craft")sec=Math.max(.8,1.8*(1+(fx.craftTime||0))*(p.nextCraftTimeMult||1));
  else if(type==="use_item")sec=item(payload.id)?.useTime??1.2;
  else if(type==="attack")sec=Math.max(.65,1.15*((p.eq||[]).includes("accel") ? .96 : 1)*(1+(fx.prep||0)));
  else if(type==="skill")sec=Math.max(.65,1*(COMBAT_SKILL_DEFS[p.charId]?.prep||1));
  else if(type==="flee")sec=Math.max(.7,1.5*((p.eq||[]).includes("evasion") ? .95 : 1)*(1+(fx.fleePrep||0)));
  else if(type==="char_action")sec=ACTION_SKILL_DEFS[p.charId]?.time??.8;
  else if(type==="loot_corpse"){
    const qty=Math.max(1,Math.floor(payload.qty||1));
    sec=payload.kind==="eq"?1.2:payload.kind==="con" ? .9:Math.min(1.5,.65+.12*Math.max(0,qty-1));
  }
  sec*=Math.max(.65,1+(combinedFx(p,match,now).actionTime||0));
  if(type==="skill"&&REWORK_CONFIG[p.charId])sec=reworkSkillPrep(p,now)*(1+(fx.skillPrep||0))*(p.charId==="c21"?1+(fx.prep||0):1);
  if(type==="char_action"&&p.charId==="c18"&&now-match.startedAt>=780000)sec=2;
  if(type==="remove_object")sec=(match.reworkObjects||[]).find(o=>o.id===payload.objectId)?.kind==="avatar"||(match.reworkObjects||[]).find(o=>o.id===payload.objectId)?.kind==="trap"?2:3;
  if(type==="skill"&&status(p,"domination",now))sec*=1.25;
  if(status(p,"actionDelay",now))sec*=1.25;
  return sec;
}
function validateAction(match,p,type,payload={},now=Date.now()){
  if(now<match.startedAt)return {ok:false,error:"match_starting"};
  updatePassiveTime(match,now);
  if(p?.encounter&&!encounterTarget(match,p))p.encounter=null;
  if(!p?.alive)return {ok:false,error:"player_not_active"};if(p.pendingAction)return {ok:false,error:"action_in_progress"};if(status(p,"sleep",now))return {ok:false,error:"asleep"};if(status(p,"timeStop",now))return {ok:false,error:"time_stopped"};
  if(p.pendingPickup)return {ok:false,error:"pickup_choice_required"};
  if(p.pendingEvent)return {ok:false,error:"event_choice_required"};
  if(type!=="attack"&&type!=="skill"&&type!=="flee"&&p.encounter&&type!=="use_item"&&type!=="char_action")return {ok:false,error:"encounter_in_progress"};
  if(type==="remove_object"){if(!(match.reworkObjects||[]).some(o=>o.id===payload.objectId&&o.ownerId!==p.playerId&&o.region===p.region&&o.until>now))return {ok:false,error:"object_missing"};return {ok:true}}
  if(type==="skill"&&p.charId==="c39"&&p.hp<=5)return {ok:false,error:"not_enough_hp"};
  if(type==="skill"&&status(encounterTarget(match,p)?.obj||{},"timeStop",now))return {ok:false,error:"target_time_stopped"};
  if(type==="attack"&&status(encounterTarget(match,p)?.obj||{},"timeStop",now))return {ok:false,error:"target_time_stopped"};
  if(type==="move"){if(isRegionLocked(match,payload.to))return {ok:false,error:"region_locked"};if(status(p,"bind",now))return {ok:false,error:"bound"};if(!ADJACENCY[p.region]?.includes(payload.to))return {ok:false,error:"invalid_move"};const mv=movementProfile(p.region,payload.to),cost=(p.nextMoveFree||reworks.live(p,"freeMove",now))?0:Math.max(0,(mv.spCost-(combinedFx(p,match,now).moveSp||0))*(1+(combinedFx(p,match,now).allSp||0)));if(p.sp<cost)return {ok:false,error:"not_enough_sp"};return {ok:true,meta:{...mv,spCost:cost}}}
  if(type==="search"&&p.sp<3*(1+(combinedFx(p,match,now).allSp||0)))return {ok:false,error:"not_enough_sp"};
  if(type==="craft"){if(!canCraft(p,payload.id))return {ok:false,error:"cannot_craft"};if(!canReceiveCraftOutput(p,payload.id,payload))return {ok:false,error:item(payload.id)?.t==="e"?"equipment_full":"inventory_full"}}
  if(type==="use_item"&&owned(p,payload.id)<=0)return {ok:false,error:"item_missing"};
  if(type==="loot_corpse"){
    const corpse=match.corpses.find(x=>x.id===payload.corpseId&&x.region===p.region&&x.expiresAt>now);
    if(!corpse)return {ok:false,error:"corpse_missing"};
    if(!["mat","con","eq"].includes(payload.kind)||!item(payload.id))return {ok:false,error:"invalid_loot"};
    if(payload.kind==="mat"&&(corpse.mat?.[payload.id]||0)<=0)return {ok:false,error:"loot_missing"};
    if(payload.kind==="con"){
      if((corpse.con?.[payload.id]||0)<=0)return {ok:false,error:"loot_missing"};
      const kinds=Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0);
      if((p.con[payload.id]||0)<=0&&kinds.length>=3)return {ok:false,error:"inventory_full"};
    }
    if(payload.kind==="eq"){
      if(!corpse.eq?.includes(payload.id))return {ok:false,error:"loot_missing"};
      if((p.eq||[]).length>=3&&p.pickupChoices===false&&!payload.replace)return {ok:false,error:"equipment_full"};
    }
  }
  if(["attack","skill","flee"].includes(type)&&!encounterTarget(match,p))return {ok:false,error:"no_encounter"};
  if(type==="skill"){
    const sd=COMBAT_SKILL_DEFS[p.charId]||{sp:12,cd:55};
    const fx=combinedFx(p,match,now),cost=reworkSkillCost(p,Math.max(0,(sd.sp??12)*((p.eq||[]).includes("focus") ? .95 : 1)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0)),fx,now);
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    if(p.sp<cost)return {ok:false,error:"not_enough_sp"};
  }
  if(type==="char_action"){
    const d=ACTION_SKILL_DEFS[p.charId];if(!d)return {ok:false,error:"action_missing"};
    if((p.cdAUntil||0)>now)return {ok:false,error:"action_cooldown"};
    const rv=reworks.validate(match,p,payload,now);if(rv&&!rv.ok)return rv;
  }
  if(type==="flee"&&status(p,"bind",now))return {ok:false,error:"bound"};
  return {ok:true};
}
function beginServerAction(match,p,type,payload={},now=Date.now()){
  const requestedType=type;
  if(p&&['attack','skill'].includes(type)&&status(p,'confusion',now)){
    type=Math.random()<.5?'attack':'skill';
    if(type==='skill'&&(p.cdCUntil||0)>now)type='attack';
  }
  const v=validateAction(match,p,type,payload,now);if(!v.ok)return v;
    let duration=actionDuration(match,p,type,payload,now),meta=v.meta||{};
  if(type==="move"){const slow=status(p,"slow",now)?.stacks||0,fx=combinedFx(p,match,now);const slowMult=slow>=2?1.50:slow===1?1.25:1;duration=(meta.durationMs/1000)*slowMult*(status(p,"fear",now)?.8:1)*(1+(fx.moveTime||0))*Math.max(.65,1+(fx.actionTime||0));if(status(p,"actionDelay",now))duration*=1.25}
  if(type==="flee"){const slow=status(p,"slow",now)?.stacks||0;duration*=slow>=2?1.50:slow===1?1.25:1;if(status(p,"fear",now))duration*=.80}
  if(type==="skill"&&status(p,"domination",now))delete p.statuses.domination;
  if(type==="skill"&&p.charId==="c44")reworkState(p).timed.heavyPrep={until:now+duration*1000,startedAt:now,durationMs:duration*1000};
  p.pendingAction={type,payload,startedAt:now,completeAt:now+duration*1000,meta:{...meta,...(requestedType!==type?{requestedType}: {})}};
  return {ok:true,action:p.pendingAction};
}
function completeAction(match,p,now=Date.now()){
  updateRegionRestrictions(match,now);
  const a=p.pendingAction;if(!a||a.completeAt>now)return null;
  reworks.tick(match,now);
  if(!p.alive){p.pendingAction=null;return {ok:false,error:"player_not_active",type:a.type}}
  if(status(p,"timeStop",now))return null;
  const before={hp:p.hp,region:p.region};
  if(a.type==="move"&&(isRegionLocked(match,a.payload?.to)||status(p,"bind",now))){p.pendingAction=null;return {ok:false,error:"move_blocked"};}
  p.pendingAction=null;
  const type=a.type,x=a.payload||{},observed=encounterTarget(match,p),actionRegion=p.region;let result={ok:true,type};
  if(type==="move"){p.region=x.to;p.sp=Math.max(0,p.sp-(a.meta?.spCost||0));p.lastMoveAt=now;const fx=combinedFx(p,match,now);p.moveHitReady=(p.eq||[]).includes("propulsion")||!!(fx.afterMoveHit||fx.afterMoveDamage);p.nextMoveFree=false;p.encounter=null;for(const q of match.players)if(q!==p&&q.encounter?.kind==="player"&&q.encounter.targetId===p.playerId)q.encounter=null;result.to=x.to;result.bleedDamage=triggerBleedAction(match,p,now)}
  else if(type==="search"){const mods=cleanupEventMods(p,now);if(mods.instantSearchRegion===p.region)mods.instantSearchRegion=null;result={...result,...searchResult(match,p,now)};}
  else if(type==="event_choice"){p.pendingEvent=x.eventId;result={...result,...resolveEventChoice(match,p,x.index,now)}}
  else if(type==="rest"){const fx=combinedFx(p,match,now),recoveryMult=(p.eq||[]).includes("recovery")?1.05:1;healPlayer(p,5*recoveryMult*(1+(fx.restHeal||0)),match,now);recoverSp(p,12*(1+(fx.restSp||0)),match,now)}
  else if(type==="craft"){result={...result,...craftItem(match,p,x.id,x)};p.nextCraftTimeMult=1}
  else if(type==="use_item")result={...result,...useConsumable(match,p,x.id,now)}
  else if(type==="attack"){const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,false,now):attackWild(match,p,t.obj,false,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="skill"){if(p.charId==="c35")reworkState(p).dispelKey=x.dispelKey||null;const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,true,now):attackWild(match,p,t.obj,true,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="flee"){result.success=true;p.encounter=null;if((p.eq||[]).includes("evasion"))p.nextMoveFree=true}
  else if(type==="char_action")result={...result,...charAction(match,p,now,x)};
  else if(type==="loot_corpse")result={...result,...lootCorpse(match,p,x.corpseId,x.kind,x.id,x.qty||1,!!x.replace,now)};
  if(type==="remove_object"){const o=(match.reworkObjects||[]).find(o=>o.id===x.objectId&&o.region===p.region&&o.until>now&&o.ownerId!==p.playerId);if(o)o.until=now;else result={ok:false,error:"object_missing"};}
  reworks.afterComplete(match,p,type,x,result,now,before);
  if(result?.ok)namedGear.action(match,p,type,now,x);
  match.corpses=(match.corpses||[]).filter(c=>c.expiresAt>now);
  match.updatedAt=now;updatePassiveTime(match,now);
  const seen=encounterTarget(match,p)||observed;
  if(seen&&seen.obj.region===p.region){
    const target=seen.obj,template=seen.kind==='wild'?wildTemplate(target):null;
    rememberEnemy(p,{id:target.playerId||target.id,name:target.playerName||template?.n||'알 수 없는 대상',kind:seen.kind,source:'encounter',hp:Math.max(0,target.hp),maxHp:seen.kind==='wild'?template.hp:maxHp(target,match,now),alive:target.alive},now);
  }
  if(type==='search'&&p.region===actionRegion)pruneEnemyTraces(match,p,now);
  return result;
}
function ensureEventMods(p){
  p.eventMods??={eventWeights:{},regionEventBoosts:{},regionSpecialEventBoosts:{},regionSpecialBoosts:{},regionLootBoosts:{},nextSpecialChanceBonus:0,nextSpecialEventBoost:0,instantSearchRegion:null,traceHiddenUntil:0,nextCraftFilter:null,nextEventSuccess:null,hazardReductionUntil:0};
  return p.eventMods;
}
function weightedPick(rows,weightFn){
  let total=0;const weighted=rows.map(x=>{const w=Math.max(.001,weightFn(x));total+=w;return[x,w]});
  let r=Math.random()*total;for(const[x,w]of weighted){r-=w;if(r<=0)return x}return rows[rows.length-1];
}
function cleanupEventMods(p,now){
  const m=ensureEventMods(p);
  for(const map of [m.eventWeights,m.regionEventBoosts,m.regionSpecialEventBoosts,m.regionSpecialBoosts,m.regionLootBoosts])for(const[k,v]of Object.entries(map))if(v?.until&&v.until<=now)delete map[k];
  if((m.traceHiddenUntil||0)<=now)m.traceHiddenUntil=0;
  return m;
}
function recordBattle(match,a,b,now){
  match.battleLog??=[];
  match.battleLog.unshift({at:now,region:a.region,aId:a.playerId,bId:b?.playerId||null});
  match.battleLog=match.battleLog.filter(x=>x.at>now-120000).slice(0,40);
}
function gearTierRank(t){return t==="최종"?5:t==="준최종"?4:t==="희귀 시너지"?3:t==="희귀"?2:t==="고급"?1:0}
function recordAdvancedEventIntel(match,p,text,now){
  const intel=ensureIntel(p);
  if(/무작위 플레이어 1명의 장비 등급 범위 확인/.test(text)){
    const targets=match.players.filter(x=>x!==p&&x.alive&&!((ensureEventMods(x).traceHiddenUntil||0)>now));
    const t=targets.length?pick(targets):null;if(t){
      const tiers=(t.eq||[]).map(id=>item(id)?.tier||"일반"),max=tiers.sort((a,b)=>gearTierRank(b)-gearTierRank(a))[0]||"무장 없음";
      pushIntel(intel.eventHints,{kind:"gear_grade",name:t.playerName,value:max,at:now});
    }
  }
  if(/금속 장비 보유자 존재 여부 탐지/.test(text)){
    const mgmt=new Set(["mgmt_lobby","mgmt_admin","mgmt_director","mgmt_cafeteria","mgmt_lab","mgmt_training"]);
    const found=match.players.some(x=>x!==p&&x.alive&&mgmt.has(x.region)&&(x.eq||[]).some(id=>/철|강철|합금|금속/.test(item(id)?.n||"")));
    pushIntel(intel.eventHints,{kind:"metal_holder",name:"관리국 금속 장비 탐지",value:found?"존재":"미탐지",at:now});
  }
  if(/최근.*전투.*층|최근 관리국 전투 흔적 공개/.test(text)){
    const mgmt=new Set(["mgmt_lobby","mgmt_admin","mgmt_director","mgmt_cafeteria","mgmt_lab","mgmt_training"]);
    const row=(match.battleLog||[]).find(x=>x.at>now-120000&&mgmt.has(x.region));
    pushIntel(intel.eventHints,{kind:"battle_trace",name:"최근 관리국 전투",value:row?regionName(row.region):"최근 흔적 없음",at:now});
  }
  if(/현재 가장 많이 제작된 무기 태그 공개/.test(text)){
    const entries=Object.entries(match.craftStats||{}).sort((a,b)=>b[1]-a[1]);
    pushIntel(intel.eventHints,{kind:"craft_meta",name:"가장 많이 제작된 무기",value:entries[0]?.[0]||"기록 없음",at:now});
  }
}
function eventGenericMaterialPool(){return Object.keys(ITEMS).filter(id=>ITEMS[id]?.t==="m"&&!isSpecialMaterial(id))}
function eventConsumablePool(){return Object.keys(ITEMS).filter(id=>ITEMS[id]?.t==="c")}
function eventAwardItem(match,p,id,count=1){
  if(!id||!item(id))return 0;let got=0;
  for(let i=0;i<count;i++){
    const it=item(id);
    if(isSpecialMaterial(id)){if(grantSpecial(match,p,id))got++;break}
    if(it.t==="m"||it.t==="c"){if(addItem(p,id))got++}
    else if(addItem(p,id))got++;
    else if(offerEquipment(match,p,id))got++;
  }
  return got;
}
function eventAwardEquipmentType(match,p,type){
  const rows=Object.entries(ITEMS).filter(([id,it])=>it?.t==="e"&&it.weaponType===type&&["고급","희귀"].includes(it.tier));
  if(!rows.length)return 0;
  rows.sort((a,b)=>(b[1].tier==="희귀"?1:0)-(a[1].tier==="희귀"?1:0));
  const rare=rows.filter(([,it])=>it.tier==="희귀"),pool=rare.length?rare:rows;
  return eventAwardItem(match,p,pick(pool)[0],1);
}
function eventAwardGeneric(match,p,kind,count=1){
  const mats=eventGenericMaterialPool(),cons=eventConsumablePool(),eq=Object.keys(ITEMS).filter(id=>ITEMS[id]?.t==="e");let pool=[];
  if(kind==="material")pool=mats;
  else if(kind==="high_material")pool=mats.filter(id=>["steel","alloy","precision","mana_stone","crystal","silver","machine"].includes(id));
  else if(kind==="medicine")pool=cons.filter(id=>item(id)?.kind==="medicine");
  else if(kind==="food")pool=cons.filter(id=>["food","drink"].includes(item(id)?.kind));
  else if(kind==="high_food")pool=cons.filter(id=>["food","drink"].includes(item(id)?.kind)&&["고급","희귀"].includes(item(id)?.tier));
  else if(kind==="electronic")pool=mats.filter(id=>["electronics","battery","precision","machine"].includes(id));
  else if(kind==="metal")pool=mats.filter(id=>["iron","steel","alloy","silver","wire"].includes(id));
  else if(kind==="magic")pool=mats.filter(id=>["mana_ink","mana_fiber","mana_stone","crystal"].includes(id));
  else if(kind==="accessory")pool=["silver","crystal","mana_stone","mana_ink"].filter(id=>item(id));
  else if(kind==="high_reward")pool=[...eq.filter(id=>["희귀","희귀 시너지"].includes(item(id)?.tier)),...cons.filter(id=>["고급","희귀"].includes(item(id)?.tier)),...mats.filter(id=>["steel","alloy","precision","mana_stone","crystal","silver"].includes(id))];
  else pool=mats.length?mats:cons;
  let got=0;for(let i=0;i<count&&pool.length;i++)got+=eventAwardItem(match,p,pick(pool),1);return got;
}
function eventExtractCount(text,def=1){
  const m=text.match(/(\d+)~(\d+)개/);if(m)return Math.floor(+m[1]+Math.random()*(+m[2]-+m[1]+1));
  const n=text.match(/(\d+)개/);return n?+n[1]:def;
}
function eventSpecialCandidates(ev,text){
  const all=(ev.special||"").split("/").map(x=>x.trim()).filter(Boolean).map(findItemIdByExactName).filter(Boolean);
  const named=all.filter(id=>text.includes(item(id)?.n||""));
  if(named.length)return named;
  if(!/다음/.test(text)&&/(?:특수재료 )?(?:판정률|획득률).*?(?:상승|증가)/.test(text))return all;
  return [];
}
function eventRewardClauses(text){
  return (text||"").split("/").map(x=>x.trim()).filter(Boolean);
}
function clauseExactRewards(clause){
  const rows=Object.entries(ITEMS).filter(([id,it])=>!isSpecialMaterial(id)&&it?.n&&clause.includes(it.n));
  if(/수프/.test(clause)&&!rows.some(([id])=>id==="warm_soup")&&ITEMS.warm_soup)rows.push(["warm_soup",ITEMS.warm_soup]);
  return rows.sort((a,b)=>b[1].n.length-a[1].n.length);
}
function awardExactClause(match,p,clause,rewards,summary){
  let exact=clauseExactRewards(clause);if(!exact.length)return 0;
  const kept=[];
  for(const row of exact){if(!kept.some(([,it])=>it.n.includes(row[1].n)||row[1].n.includes(it.n)))kept.push(row)}
  exact=kept;
  const explicit=/\d+(?:~\d+)?개/.test(clause),count=eventExtractCount(clause,1);
  let rows=exact;
  if(/또는|중\s*\d|중 하나/.test(clause))rows=[pick(exact)];
  else if(explicit&&/·/.test(clause)&&!/\+/.test(clause)&&exact.length>1){
    rows=[...exact].sort(()=>Math.random()-.5).slice(0,Math.min(count,exact.length));
  }
  let got=0;
  for(const[id,it]of rows){
    const qty=(rows.length===1?Math.min(count,3):1),n=eventAwardItem(match,p,id,qty);
    if(n){got+=n;rewards.push(...Array(n).fill(id));summary.push(it.n+" 획득")}
  }
  return got;
}
function awardGenericClause(match,p,clause,e,index,rewards,summary){
  const count=Math.min(eventExtractCount(clause,1),4);
  const award=(kind,n=count,label=null)=>{const got=eventAwardGeneric(match,p,kind,n);if(got)summary.push(label||"보상 "+got+"개");return got};
  if(/일반재료 또는 음식/.test(clause)){const kind=Math.random()<.5?"material":"food";return award(kind,count,kind==="material"?"재료 획득":"음식 획득")}
  if(/금속·기계 재료/.test(clause)){let got=0;for(let j=0;j<count;j++)got+=eventAwardGeneric(match,p,Math.random()<.5?"metal":"electronic",1);if(got)summary.push("금속·기계 재료 획득");return got}
  if(/고급 전자재료/.test(clause))return award("electronic",count,"고급 전자재료 획득");
  if(/고급재료/.test(clause))return award("high_material",count,"고급재료 획득");
  if(/일반재료|일반 재료|재료 \d|재료 \d+개/.test(clause))return award("material",count,"재료 획득");
  if(/약품/.test(clause))return award("medicine",Math.min(count,2),"약품 획득");
  if(/고급 ?요리/.test(clause))return award("high_food",Math.min(count,2),"고급 음식 획득");
  if(/음식|음료|디저트|식량|일반 식사 소모품|고기·|우유|달걀|채소|쌀·|감자|소금·|기름|설탕/.test(clause))return award("food",Math.min(count,3),"음식 획득");
  if(/마력재료/.test(clause))return award("magic",Math.min(count,2),"마력재료 획득");
  if(/장신구/.test(clause))return award("accessory",Math.min(count,2),"장신구 재료 획득");
  if(/고급보상|가치 높은 보상/.test(clause))return award("high_reward",Math.min(count,3),"고급 보상 획득");
  if(/^보상 \d+개/.test(clause))return award("high_material",count,"보상 획득");
  const typeMatch=clause.match(/(검|활|낫|도구) 계열 고급 (?:아이템|무기)/);
  if(typeMatch){const got=eventAwardEquipmentType(match,p,typeMatch[1]);if(got)summary.push(typeMatch[1]+" 계열 장비 획득");return got}
  if(/투척재료/.test(clause))return award("material",count,"투척 재료 획득");
  if(/안전 획득/.test(clause)&&e.id==="E022"&&index===1)return award("material",3,"안전 보상 획득");
  return 0;
}
function handleCompositeEventReward(match,p,e,index,text,rewards,summary){
  const add=(kind,n=1,label="보상 획득")=>{let got=0;for(let i=0;i<n;i++)got+=eventAwardGeneric(match,p,kind,1);if(got)summary.push(label);return got};
  if(e.id==="E005"&&index===2){const n=Math.min(eventExtractCount(text,1),2);for(let i=0;i<n;i++)add(pick(["food","material","electronic"]),1,"트렁크 보상 획득");return true}
  if(e.id==="E007"&&index===0){for(let i=0;i<2;i++)add(Math.random()<.5?"accessory":"magic",1,"장신구·마력재료 획득");return true}
  if(e.id==="E008"&&index===2){add("material",1,"장신구 계열 일반재료 획득");return true}
  if(e.id==="E011"&&index===1){const pool=["silver","crystal"];if(Math.random()<.34)add("accessory",1,"장신구 재료 획득");else eventAwardItem(match,p,pick(pool),1);return true}
  if(e.id==="E017"&&index===1){add(Math.random()<.5?"accessory":"magic",1,"장신구/마력재료 획득");return true}
  if(e.id==="E016"&&index===2){add("food",1,"식량 획득");add("medicine",1,"의약품 획득");return true}
  if(e.id==="E025"&&index===0){add(Math.random()<.5?"accessory":"food",1,"분실물 보상 획득");return true}
  if(e.id==="E025"&&index===2){for(let i=0;i<2;i++)add(Math.random()<.5?"accessory":"electronic",1,"분실물 보상 획득");return true}
  if(e.id==="E026"&&index===0){add("food",1,"음식 획득");add("medicine",1,"약품 획득");return true}
  if(e.id==="E026"&&index===1){if(Math.random()<.55)add("high_food",1,"고급 소모품 획득");else add("food",1,"소모품 획득");return true}
  if(e.id==="E037"&&index===0){add("accessory",1,"장신구 재료 획득");eventAwardItem(match,p,"coffee",1);return true}
  if(e.id==="E038"&&index===0){const n=Math.min(eventExtractCount(text,2),3);for(let i=0;i<n;i++){const r=Math.random();if(r<.34)eventAwardItem(match,p,"silver",1);else if(r<.67)eventAwardItem(match,p,"alloy",1);else add("accessory",1,"금고 보상 획득")}return true}
  if(e.id==="E041"&&index===0){eventAwardItem(match,p,"chocolate",1);add("food",1,"케이크 대체 음식 획득");return true}
  if(e.id==="E041"&&index===1){eventAwardItem(match,p,"cloth",1);add("accessory",1,"장신구 재료 획득");return true}
  if(e.id==="E041"&&index===2){add("food",2,"음식 2개 획득");add("material",1,"재료 1개 획득");return true}
  if(e.id==="E042"&&index===0){if(Math.random()<.5)eventAwardItem(match,p,"silver",1);else add("accessory",1,"장신구 재료 획득");return true}
  if(e.id==="E044"&&index===0){if(Math.random()<.18)eventAwardItem(match,p,"mint_choco_fish",1);else add("food",1,"디저트 획득");return true}
  if(e.id==="E045"&&index===1){add("food",3,"식재료 3개 획득");return true}
  if(e.id==="E047"){add("food",2,"식재료 2개 획득");return true}
  if(e.id==="E048"&&index===0){
    const ownedMats=Object.entries(p.mat||{}).filter(([id,n])=>n>0&&!isSpecialMaterial(id));let left=2;
    for(const[id,n]of ownedMats){const take=Math.min(left,n);if(take){consumeItem(p,id,take);left-=take}if(left<=0)break}
    if(left===0)add("high_food",1,"고급요리 획득");else summary.push("변환 재료 부족");
    return true
  }
  if(e.id==="E048"&&index===2){
    if(Math.random()>=.20)add("high_food",1,"고급요리 획득");
    else{const row=Object.entries(p.mat||{}).find(([id,n])=>n>0&&!isSpecialMaterial(id));if(row)consumeItem(p,row[0],1);summary.push("조리 실패")}
    return true
  }
  if(e.id==="E061"&&index===0){for(let i=0;i<2;i++){const r=Math.random();if(r<.34)eventAwardItem(match,p,"mana_stone",1);else add(r<.67?"medicine":"food",1,"보급품 획득")}return true}
  if(e.id==="E067"&&index===1){add("food",1,"회복 음료 획득");add("accessory",1,"장신구 재료 획득");return true}
  if(e.id==="E069"&&index===2){eventAwardItem(match,p,"precision",1);add("accessory",1,"장신구 재료 획득");return true}
  if(e.id==="E078"&&index===1){if(Math.random()<.5)eventAwardItem(match,p,"alloy",1);else add("high_material",2,"고급재료 2개 획득");return true}
  return false;
}
function processEventRewardClauses(match,p,e,index,clauses,rewards,summary){
  for(const clause of clauses){
    if(/소비|실패 시|확률|판정|시간|소음|위험 없음|즉시 종료|지속시간|피발견률|탐색시간|행동속도|가중치|추천 지역|흔적|표시|공개|보정|성공률|함정 무효|판정률|상태이상|중독|독성 상태|공포|혼란|수면|HP\s*[+-]|SP\s*[+-]|포만도\s*\+/.test(clause)){
      // Exact item rewards can coexist with risk/modifier text, so still allow exact matches.
      awardExactClause(match,p,clause,rewards,summary);
      continue;
    }
    if(awardExactClause(match,p,clause,rewards,summary))continue;
    awardGenericClause(match,p,clause,e,index,rewards,summary);
  }
}

// Timed choices use the same persisted action deadlines and alarms as other actions.
function beginEventChoice(match,p,index,now=Date.now()){
  if(now<match.startedAt)return {ok:false,error:"match_starting"};
  updatePassiveTime(match,now);
  if(match.phase!=="playing"||!p?.alive)return {ok:false,error:"player_not_active"};
  if(p.pendingAction)return {ok:false,error:"action_in_progress"};
  if(status(p,"sleep",now))return {ok:false,error:"asleep"};
  const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);if(!e)return {ok:false,error:"no_event"};
  const choice=e.choices?.[index];if(!choice)return {ok:false,error:"invalid_choice"};
  const availability=eventChoiceAvailability(e,p,index);if(!availability.available)return {ok:false,error:"event_choice_unavailable",reason:availability.reason};
  const seconds=+(choice.result?.match(/시간 \+(\d+)초/)?.[1]||0);
  if(!seconds)return resolveEventChoice(match,p,index,now);
  p.pendingEvent=null;
  p.pendingAction={type:"event_choice",payload:{eventId:e.id,index},startedAt:now,completeAt:now+seconds*1000,meta:{region:p.region}};
  return {ok:true,queued:true,action:p.pendingAction};
}
// Apply rewards/costs only on completion; cancelled choices leave inventory intact.
function resolveEventChoice(match,p,index,now=Date.now()){
  updateRegionRestrictions(match,now);
  const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);if(!e)return {ok:false,error:"no_event"};
  const choice=e.choices?.[index];if(!choice)return {ok:false,error:"invalid_choice"};
  const availability=eventChoiceAvailability(e,p,index);if(!availability.available)return {ok:false,error:"event_choice_unavailable",reason:availability.reason};
  consumeEventChoiceCost(e,p,index);
  p.pendingEvent=null;const text=choice.result||"",rewardText=text.split("/").filter(part=>!/소비/.test(part)).join(" / "),rewards=[],summary=[];

  const tm=text.match(/시간 \+(\d+)초/);
  if(tm)summary.push("진행 시간 "+tm[1]+"초")

  // Resolve percentage-gated HP damage first and remember those text spans so they are not also applied unconditionally.
  const probabilisticHpSpans=[];
  const eventModsBefore=cleanupEventMods(p,now),successMod=eventModsBefore.nextEventSuccess&&e.name.includes(eventModsBefore.nextEventSuccess.keyword)?eventModsBefore.nextEventSuccess:null;
  const hazardReduce=(eventModsBefore.hazardReductionUntil||0)>now ? .25 : 0;
  for(const m of text.matchAll(/(\d+)%[^/]*?HP\s*-\s*(\d+)/g)){
    probabilisticHpSpans.push([m.index,m.index+m[0].length]);
    const risk=clamp(+m[1]/100-(successMod?.bonus||0)-hazardReduce,0,1);
    if(Math.random()<risk){
      const d=damagePlayer(p,+m[2]);p.hp=Math.max(0,p.hp);summary.push("확률 피해 HP -"+d);
    }else summary.push("위험 판정 회피");
  }
  const overlapsProbHp=(idx,len)=>probabilisticHpSpans.some(([a,b])=>idx<b&&idx+len>a);
  for(const m of text.matchAll(/HP\s*([+-])\s*(\d+)/g)){
    if(overlapsProbHp(m.index,m[0].length))continue;
    if(/가능/.test(text.slice(Math.max(0,m.index-8),m.index+m[0].length+8))&&Math.random()>=.50)continue;
    const n=+m[2]*(m[1]==="-"?-1:1);if(n>=0)healPlayer(p,n,match,now);else{damagePlayer(p,-n);p.hp=Math.max(0,p.hp)}summary.push("HP "+(n>=0?"+":"")+n);
  }
  for(const m of text.matchAll(/SP\s*([+-])\s*(\d+)/g)){
    const n=+m[2]*(m[1]==="-"?-1:1);p.sp=clamp(p.sp+n,0,p.maxSp);summary.push("SP "+(n>=0?"+":"")+n);
  }
  if(p.hp<=0)environmentDeath(match,p,now,false,null,e.name+" 이벤트");

  if(/독성 상태|중독/.test(text)){
    const pm=text.match(/(\d+)%[^/]*(?:독성 상태|중독)/);
    if(!pm||Math.random()<+pm[1]/100)applyStatus(p,"poison",1,8,null,now,null,match,"특수 이벤트: "+e.name+" / "+choice.label);
  }
  for(const[ko,id]of[["혼란","confusion"],["공포","fear"],["수면","sleep"]]){
    const m=text.match(new RegExp(ko+"\\s*(\\d+)초"));
    if(m){
      const prefix=text.slice(Math.max(0,(m.index||0)-18),m.index||0),pm=prefix.match(/(\d+)%[^%]*$/);
      if(!pm||Math.random()<+pm[1]/100)applyStatus(p,id,1,+m[1],null,now,null,match,"특수 이벤트: "+e.name+" / "+choice.label);
    }
  }

  if(/독(?:\/출혈)? 지속시간 50% 감소/.test(text)){const s=status(p,'poison',now);if(s)s.until=now+(s.until-now)*.5}
  if(/공포·혼란 지속시간 -20%/.test(text))for(const id of["fear","confusion"]){const s=p.statuses?.[id];if(s&&s.until>now)s.until=now+(s.until-now)*.8}
  if(/피발견률 -5% 30초/.test(text))addTemp(p,{conceal:.05},30,now);
  if(/탐색시간 -5%/.test(text))addTemp(p,{searchTime:-.05},30,now);
  if(/행동속도 \+4%/.test(text))addTemp(p,{actionTime:-.04},30,now);

  const specials=eventSpecialCandidates(e,text);let specialSucceeded=false,specialAttempted=false;
  if(specials.length){
    specialAttempted=true;
    const guaranteed=!/판정|확률/.test(text),boost=/크게 상승|상승|증가/.test(text),mods0=cleanupEventMods(p,now);
    const chance=clamp((guaranteed ? 1 : (boost ? .78 : .55))+(mods0.nextSpecialChanceBonus||0),0,1);mods0.nextSpecialChanceBonus=0;
    if(Math.random()<chance){
      const valid=specials.filter(id=>specialAvailable(match,id));
      if(valid.length){
        const id=pick(valid);if(eventAwardItem(match,p,id,1)){rewards.push(id);summary.push("특수재료 획득");specialSucceeded=true}
      }else{eventAwardGeneric(match,p,"material",2);summary.push("특수재료 대체 보상");specialSucceeded=true}
    }else summary.push("특수재료 판정 실패");
  }

  const clauses=eventRewardClauses(text),normalClauses=clauses.filter(x=>!/^실패 시/.test(x)&&!/소비/.test(x));
  const compositeHandled=handleCompositeEventReward(match,p,e,index,text,rewards,summary);
  if(!compositeHandled)processEventRewardClauses(match,p,e,index,normalClauses,rewards,summary);
  if(specialAttempted&&!specialSucceeded){
    const failClauses=clauses.filter(x=>/^실패 시/.test(x)).map(x=>x.replace(/^실패 시\s*/,""));
    processEventRewardClauses(match,p,e,index,failClauses,rewards,summary);
  }

  if(/희귀 약품 확률/.test(text)&&Math.random()<.35)eventAwardItem(match,p,"advanced_first_aid",1);
  if(/고급장신구 재료 확률/.test(text)&&Math.random()<.40)eventAwardGeneric(match,p,"accessory",1);
  if(/특수보상 확률 낮음/.test(text)&&Math.random()<.20)eventAwardGeneric(match,p,"high_reward",1);

  if(/다음.*제작시간 -50%/.test(text))p.nextCraftTimeMult=Math.min(p.nextCraftTimeMult||1,.5);
  if(/다음.*제작시간 -20%/.test(text))p.nextCraftTimeMult=Math.min(p.nextCraftTimeMult||1,.8);
  if(/피발견률 \+10% 20초/.test(text))addTemp(p,{conceal:-.10},20,now);
  if(/다음.*피발견률 -5%/.test(text))addTemp(p,{conceal:.05},30,now);
  const mods=cleanupEventMods(p,now);
  let mmod;
  if((mmod=text.match(/(\d+)초 동안 해당 이벤트 재등장 가중치 \+(\d+)%/))){mods.eventWeights[e.id]={bonus:+mmod[2]/100,until:now+(+mmod[1])*1000}}
  if(/특수 이벤트 발견 \+1회 보정/.test(text))mods.nextSpecialEventBoost=Math.max(mods.nextSpecialEventBoost||0,.35);
  if((mmod=text.match(/다음 특수재료 판정 \+(\d+)%/)))mods.nextSpecialChanceBonus=Math.max(mods.nextSpecialChanceBonus||0,+mmod[1]/100);
  if(/특수재료 판정률 소폭 감소/.test(text))mods.nextSpecialChanceBonus=Math.min(mods.nextSpecialChanceBonus||0,-.15);
  if(/특수재료 획득률 크게 상승|판정률 증가|특수재료 판정 상승/.test(text))mods.nextSpecialChanceBonus=Math.max(mods.nextSpecialChanceBonus||0,.25);
  if((mmod=text.match(/(\d+)초간 간부 숙소 특수이벤트 \+(\d+)%/)))mods.regionSpecialEventBoosts.evil_quarters={bonus:+mmod[2]/100,until:now+(+mmod[1])*1000};
  if((mmod=text.match(/(\d+)초간 악의조직 훈련장 특수이벤트 \+(\d+)%/)))mods.regionSpecialEventBoosts.evil_training={bonus:+mmod[2]/100,until:now+(+mmod[1])*1000};
  if(/다음 온실 이벤트 특수재료 확률 \+30%/.test(text))mods.regionSpecialBoosts.estate={bonus:.30,until:now+60000};
  if(/다음 마도 이벤트 가중치 \+/.test(text))mods.nextSpecialEventBoost=Math.max(mods.nextSpecialEventBoost||0,.20);
  if(/다음 구내식당 특수음식 이벤트 확률 \+50%/.test(text))mods.eventWeights.E045={bonus:.50,oneShot:true};
  if(/무작위 외부 지역 하나의 이벤트 가중치/.test(text)){
    const external=["city","estate","church","factory"],r=pick(external);mods.regionEventBoosts[r]={bonus:.25,until:now+60000};
  }
  if(/60초간 관리국 훈련장 무기재료 드롭 가중치 \+20%/.test(text))mods.regionLootBoosts.mgmt_training={kind:"weapon",bonus:.20,until:now+60000};
  if(/60초간 연구실 약품·마도 드롭 가중치 \+20%/.test(text))mods.regionLootBoosts.mgmt_lab={kind:"medmagic",bonus:.20,until:now+60000};
  if(/다음 금고 이벤트 성공률 \+30%/.test(text))mods.nextEventSuccess={keyword:"금고",bonus:.30};
  if(/다음 통로 이벤트 성공률 상승/.test(text))mods.nextEventSuccess={keyword:"통로",bonus:.25};
  if(/최면 계열 이벤트 위험 감소/.test(text))mods.hazardReductionUntil=now+60000;
  if(/다음 행정실 탐색 1회 즉시 완료/.test(text))mods.instantSearchRegion="mgmt_admin";
  if(/자신의 정보 흔적 감소|최근 관리국 흔적 제거|흔적을 남기지 않음/.test(text))mods.traceHiddenUntil=Math.max(mods.traceHiddenUntil||0,now+30000);
  if(/25초간 상태이상 지속 -5%/.test(text))addTemp(p,{incomingStatusDuration:-.05},25,now);
  if((mmod=text.match(/이후 SP회복 -(\d+)% (\d+)초/)))addTemp(p,{spRecovery:-(+mmod[1]/100)},+mmod[2],now);
  if((mmod=text.match(/포만도 \+(\d+)/)))p.satiety=clamp((p.satiety??100)+(+mmod[1]),0,100);
  if(/출혈 (?:지속시간|중첩) 50% 감소/.test(text)){const s=status(p,'bleed',now);if(s)removeStatusStacks(p,'bleed',Math.ceil(s.stacks*.5))}
  if((mmod=text.match(/(\d+)% 상태이상/))&&Math.random()<+mmod[1]/100)applyStatus(p,pick(["poison","bleed","slow","fear","confusion"]),1,null,null,now,null,match,"특수 이벤트: "+e.name+" / "+choice.label);
  if((mmod=text.match(/(\d+)% 혼란(?!\s*\d)/))&&Math.random()<+mmod[1]/100)applyStatus(p,"confusion",1,5,null,now,null,match,"특수 이벤트: "+e.name+" / "+choice.label);
  recordAdvancedEventIntel(match,p,text,now);

  if(/다른 플레이어.*흔적|최근.*플레이어 흔적|출입 흔적|최근.*방문 플레이어/.test(text)){
    const row=recordPlayerTraceIntel(match,p,now);summary.push(row?"플레이어 흔적 획득":"플레이어 흔적 없음");
  }
  if(/특수재료 후보 공개|특수재료 후보|특수 이벤트.*보정/.test(text)){
    const row=recordSpecialCandidateIntel(match,p,now);summary.push(row?.items?.length?"특수재료 후보 확인":"특수재료 후보 없음");
  }
  if(/추천 지역 표시|재료 카테고리.*추천 지역/.test(text)){
    const row=recordMaterialHintIntel(p,now);summary.push(row?.regions?.length?"추천 파밍 지역 확인":"추천 지역 정보 없음");
  }
  if(/다음 이벤트 종류 미리 확인/.test(text)){
    const candidates=ENCOUNTER_EVENTS.filter(x=>x.region===p.region&&x.id!==e.id);
    const next=candidates.length?pick(candidates):null;
    if(next){pushIntel(ensureIntel(p).eventHints,{kind:"event_hint",region:p.region,eventId:next.id,name:next.name,type:next.type,at:now});summary.push("다음 이벤트 정보 획득")}
  }
  if(successMod)eventModsBefore.nextEventSuccess=null;
  const noiseLevel=eventNoiseLevel(e,text);
  if(noiseLevel){recordNoise(match,p,noiseLevel,e.id,now);summary.push("소음 "+noiseLevel+" 발생")}
  if(!summary.length)summary.push("이벤트 효과 적용");

  return {ok:true,eventId:e.id,choiceIndex:index,text,rewards,summary:summary.join(" · "),elapsed:match.elapsed};
}
function lootEquipScore(id){const it=item(id);return (it?.atk||0)+(it?.def||0)*.8+(it?.tier==="최종"?30:it?.tier==="준최종"?20:it?.tier==="희귀 시너지"?14:it?.tier==="희귀"?8:0)}
function removeCorpseIfEmpty(match,corpse){
  if(!corpse)return false;
  const empty=!corpse.eq.length&&!Object.values(corpse.mat||{}).some(n=>n>0)&&!Object.values(corpse.con||{}).some(n=>n>0);
  if(!empty)return false;
  const i=match.corpses.indexOf(corpse);if(i>=0)match.corpses.splice(i,1);return true;
}
function lootCorpse(match,p,corpseId,kind,id,qty=1,replace=false,now=Date.now()){
  const corpse=match.corpses.find(x=>x.id===corpseId&&x.region===p.region&&x.expiresAt>now);
  if(!corpse)return {ok:false,error:"corpse_missing"};
  const it=item(id);if(!it)return {ok:false,error:"invalid_loot"};
  qty=Math.max(1,Math.floor(qty||1));
  if(kind==="mat"){
    const have=corpse.mat[id]||0;if(have<=0)return {ok:false,error:"loot_missing"};
    const n=Math.min(qty,have);p.mat[id]=(p.mat[id]||0)+n;corpse.mat[id]-=n;if(corpse.mat[id]<=0)delete corpse.mat[id];
    removeCorpseIfEmpty(match,corpse);return {ok:true,n,itemId:id};
  }
  if(kind==="con"){
    const have=corpse.con[id]||0;if(have<=0)return {ok:false,error:"loot_missing"};
    const kinds=Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0);
    if((p.con[id]||0)<=0&&kinds.length>=3)return {ok:false,error:"inventory_full"};
    const n=Math.min(qty,have);p.con[id]=(p.con[id]||0)+n;corpse.con[id]-=n;if(corpse.con[id]<=0)delete corpse.con[id];
    removeCorpseIfEmpty(match,corpse);return {ok:true,n,itemId:id};
  }
  if(kind==="eq"){
    const ix=corpse.eq.indexOf(id);if(ix<0)return {ok:false,error:"loot_missing"};
    if(p.eq.length>=3){
      if(!p.isAI){
        if(!offerEquipment(match,p,id))return {ok:false,error:"equipment_full"};
        corpse.eq.splice(ix,1);removeCorpseIfEmpty(match,corpse);return {ok:true,n:1,itemId:id,pendingPickup:true};
      }
      if(!replace)return {ok:false,error:"equipment_full"};
      let worst=0,worstScore=Infinity;
      for(let i=0;i<p.eq.length;i++){const score=lootEquipScore(p.eq[i]);if(score<worstScore){worstScore=score;worst=i}}
      const old=p.eq[worst];p.eq.splice(worst,1,id);corpse.eq.splice(ix,1,old);
      return {ok:true,n:1,itemId:id,replaced:old};
    }
    p.eq.push(id);corpse.eq.splice(ix,1);removeCorpseIfEmpty(match,corpse);return {ok:true,n:1,itemId:id};
  }
  return {ok:false,error:"invalid_loot"};
}


function aiHpRatio(match,p,now){return p.hp/Math.max(1,maxHp(p,match,now))}
function aiSpRatio(p){return p.sp/Math.max(1,p.maxSp)}
function aiHasBadStatus(p,now){return ["poison","bleed","fear","confusion","slow"].some(id=>status(p,id,now))}
function aiCanConsume(p,id){
  return !(id==='carbonara_mint_fish'&&p.charId!=='c49')&&!(id==='mint_choco_fish'&&p.charId==='c13');
}
function aiBestRecovery(match,p,now){
  const hpMissing=Math.max(0,maxHp(p,match,now)-p.hp),spMissing=Math.max(0,p.maxSp-p.sp);
  const needsHp=aiHpRatio(match,p,now)<.48,needsSp=aiSpRatio(p)<.35,needsFood=p.satiety<30;
  const score=id=>{
    const it=item(id);if(!it||!aiCanConsume(p,id))return 0;
    if(id==='antidote'&&status(p,'poison',now))return 100;
    if(id==='bandage'&&status(p,'bleed',now))return 100;
    if(id==='carbonara_mint_fish'&&p.charId==='c49')return needsHp||needsSp||needsFood?80:0;
    return (needsHp?Math.min(hpMissing,it.heal||0):0)+(needsSp?Math.min(spMissing,it.sp||0)*1.2:0)+(needsFood?Math.min(100-p.satiety,it.sat||0)*.5:0);
  };
  return Object.keys(p.con||{}).filter(id=>p.con[id]>0&&score(id)>0).sort((a,b)=>score(b)-score(a))[0]||null;
}
function aiChooseCraft(p){
  const recommendedReady=recommendedCrafts(p,12).filter(x=>x.ready);
  if(recommendedReady.length)return recommendedReady[0].id;
  const craftables=Object.keys(ITEMS).filter(id=>canCraft(p,id));
  if(!craftables.length)return null;
  const score=id=>{
    const it=item(id);let s=(it?.atk||0)+(it?.def||0)*.8;
    if(it?.t==="c")s=(it.heal||0)*.6+(it.sp||0)*.3;
    if(it?.t==="m")s=.1;
    if(it?.tier==="최종")s+=50;else if(it?.tier==="준최종")s+=28;else if(it?.tier==="희귀 시너지")s+=18;else if(it?.tier==="희귀")s+=10;
    return s
  };
  return craftables.sort((x,y)=>score(y)-score(x))[0]
}
function sameRegion(match,region){return match.players.filter(x=>x.alive&&x.region===region)}
function aiMoveChoice(match,p){
  const opts=(ADJACENCY[p.region]||[]).filter(id=>!isRegionLocked(match,id));if(!opts.length)return null;
  const targetRec=recommendedCrafts(p,4).find(x=>!x.ready&&x.missing?.length);
  const wanted=new Set(targetRec?.missing?.map(x=>x.id)||[]);
  let best=opts[0],bestScore=-Infinity;
  for(const r of opts){
    let s=Math.random()*.2,pool=POOLS[r]||[];
    const wantedHits=pool.filter(id=>wanted.has(id)).length;
    if(wantedHits)s+=wantedHits*(p.ai==="craft" ? .42 : .22);
    if(p.ai==="craft")s+=pool.filter(id=>item(id)?.t==="m").length*.04;
    if(p.ai==="safe")s-=sameRegion(match,r).length*.25;
    if(p.ai==="aggro")s+=sameRegion(match,r).length*.18;
    if(r==="city")s+=.05;
    if(s>bestScore){bestScore=s;best=r}
  }
  return best
}
function aiSkillUtility(match,p,target,now){
  const d=COMBAT_SKILL_DEFS[p.charId]||{},cost=Math.max(0,(d.sp??12)-(p.nextSkillSpDiscount||0));
  if((p.cdCUntil||0)>now||p.sp<cost||status(p,"silence",now)||status(p,"sleep",now))return-99;
  let score=.35,mult=d.multMax??d.mult??1.08;
  if(mult>=1.3)score+=.35;
  if(d.statuses?.length||d.forcePoison||d.randomControl||d.randomStatus||d.doubleRandomStatus)score+=.35;
  if(d.heal&&aiHpRatio(match,p,now)<.60)score+=.50;
  if(d.lifesteal&&aiHpRatio(match,p,now)<.60)score+=.45;
  if(d.drainSp&&target.kind==="player"&&aiSpRatio(target.obj)>.35)score+=.20;
  if(target.kind==="player"&&target.obj.hp/Math.max(1,maxHp(target.obj,match,now))<.35)score+=.55;
  if(target.kind==="wild"&&target.obj.hp/Math.max(1,wildTemplate(target.obj).hp)<.35)score+=.30;
  if(aiSpRatio(p)<.25)score-=.55;
  if(p.ai==="aggro")score+=.25;
  if(p.ai==="safe"&&aiSpRatio(p)<.45)score-=.20;
  return score
}
function aiShouldAvoidFight(match,p,target,now){
  if(target.kind==="wild")return aiHpRatio(match,p,now)<.22&&target.obj.hp/Math.max(1,wildTemplate(target.obj).hp)>.45;
  const t=target.obj,ownPower=atk(p,match,now)+def(p,match,now)*.7+(p.hp/maxHp(p,match,now)*100)*.12;
  const foePower=atk(t,match,now)+def(t,match,now)*.7+(t.hp/maxHp(t,match,now)*100)*.12;
  let threshold=p.ai==="aggro" ? .62 : p.ai==="safe" ? .92 : .78;
  if(aiHpRatio(match,p,now)<.28)threshold+=.25;
  return ownPower<foePower*threshold
}
function aiActionUtility(match,p,now){
  if((p.cdAUntil||0)>now||p.encounter||status(p,"sleep",now))return 0;
  if(REWORK_CONFIG[p.charId])return reworks.validate(match,p,reworkAIChoice(match,p,now),now)?.ok?1.1:0;
  const d=ACTION_SKILL_DEFS[p.charId]||{};let score=.10;
  if(d.garden)return gardenSources(match,p.region,now).some(g=>g.ownerId===p.playerId)?0:1.2;
  if(d.heal)score+=Math.max(0,1-aiHpRatio(match,p,now))*(d.heal/8);
  if(d.sp)score+=Math.max(0,1-aiSpRatio(p))*(d.sp/10);
  if((d.cleanse||d.cleanseAny||d.cleanseSpecific)&&aiHasBadStatus(p,now))score+=1.2;
  if(d.material||d.randomMetal||d.consumable)score+=p.ai==="craft" ? .65 : .22;
  if(d.nextDetect||d.tempFx?.detect)score+=p.ai==="aggro" ? .55 : .25;
  if(d.nextMoveFree||d.tempFx?.moveTime||d.tempFx?.moveSp)score+=aiSpRatio(p)<.35 ? .65 : .20;
  if(d.reduceCombatCd&&(p.cdCUntil||0)>now+10000)score+=.65;
  if(d.selfDamage&&aiHpRatio(match,p,now)<.35)score-=1.5;
  return score
}
function aiShouldUseAction(match,p,now){const u=aiActionUtility(match,p,now);return u>1.05||(u>.55&&Math.random()<.40)}
function aiLootChoice(match,p,now){
  const corpse=(match.corpses||[]).find(c=>c.region===p.region&&c.expiresAt>now&&(c.eq.length||Object.keys(c.mat).length||Object.keys(c.con).length));
  if(!corpse)return null;
  const mats=Object.entries(corpse.mat||{}).filter(([,n])=>n>0);
  if(mats.length){const[id,n]=mats[0];return{corpseId:corpse.id,kind:"mat",id,qty:n,replace:false}}
  const consumables=Object.entries(corpse.con||{}).filter(([,n])=>n>0).sort((a,b)=>(item(b[0])?.heal||0)-(item(a[0])?.heal||0));
  for(const[id,n]of consumables){
    const kinds=Object.keys(p.con||{}).filter(k=>(p.con[k]||0)>0);
    if((p.con[id]||0)>0||kinds.length<3)return{corpseId:corpse.id,kind:"con",id,qty:n,replace:false}
  }
  const gearValue=id=>lootEquipScore(id)+Math.max(0,recommendedGearScore(p,id,item(id))*.35);
  const best=[...(corpse.eq||[])].sort((a,b)=>gearValue(b)-gearValue(a))[0];
  if(best){
    if(p.eq.length<3)return{corpseId:corpse.id,kind:"eq",id:best,qty:1,replace:false};
    const worst=Math.min(...p.eq.map(gearValue));
    if(gearValue(best)>worst+2)return{corpseId:corpse.id,kind:"eq",id:best,qty:1,replace:true};
  }
  return null;
}
function aiQueue(match,p,type,payload,now){
  const r=beginServerAction(match,p,type,payload||{},now);
  return !!r.ok;
}
function aiChooseEncounterCommand(match,p,target,now){
  if(!target)return null;
  if(aiShouldAvoidFight(match,p,target,now))return{type:"flee",payload:{}};
  const skillScore=aiSkillUtility(match,p,target,now);
  const useSkill=target.kind==="player"?(skillScore>.85||(skillScore>.45&&Math.random()<.45)):(skillScore>.90||(skillScore>.50&&Math.random()<.35));
  return{type:useSkill?"skill":"attack",payload:{}};
}
function runAIStep(match,p,now=Date.now()){
  if(!p?.isAI||!p.alive||p.pendingAction||status(p,"sleep",now))return false;
  if(status(p,"actionDelay",now)&&Math.random()<.25)return false;
  if(p.encounter&&!encounterTarget(match,p))p.encounter=null;

  if(p.pendingEvent){
    const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);
    if(e?.choices?.length){
      const available=e.choices.map((_,i)=>i).filter(i=>eventChoiceAvailability(e,p,i).available);
      if(available.length)beginEventChoice(match,p,pick(available),now);
      else p.pendingEvent=null;
    }else p.pendingEvent=null;
    return true;
  }

  const recovery=aiBestRecovery(match,p,now);
  if(recovery&&aiQueue(match,p,'use_item',{id:recovery},now))return true;

  if(p.encounter){
    if((REWORK_CONFIG[p.charId]||ACTION_SKILL_DEFS[p.charId]?.garden)&&(p.cdAUntil||0)<=now&&Math.random()<.4){const x=reworkAIChoice(match,p,now);if((reworks.validate(match,p,x,now)?.ok??true)&&aiQueue(match,p,"char_action",x,now))return true;}
    const cmd=aiChooseEncounterCommand(match,p,encounterTarget(match,p),now);
    if(cmd&&aiQueue(match,p,cmd.type,cmd.payload,now))return true;
    return cmd&&cmd.type!=='attack'?aiQueue(match,p,'attack',{},now):false;
  }

  if((match.corpses||[]).some(c=>c.region===p.region&&c.expiresAt>now)&&Math.random()<(p.ai==="craft" ? .28 : .16)){
    const loot=aiLootChoice(match,p,now);
    if(loot&&aiQueue(match,p,"loot_corpse",loot,now))return true;
  }

  if(aiSpRatio(p)<.25||aiHpRatio(match,p,now)<.40){
    if(aiQueue(match,p,'rest',{},now))return true;
  }

  if(aiShouldUseAction(match,p,now)){
    if(aiQueue(match,p,"char_action",reworkAIChoice(match,p,now),now))return true;
  }

  const craftId=aiChooseCraft(p);
  if(craftId&&((p.ai==="craft"&&Math.random()<.65)||Math.random()<.18)){
    if(aiQueue(match,p,"craft",{id:craftId},now))return true;
  }

  const crowded=sameRegion(match,p.region).length-1;
  if(!status(p,"bind",now)&&p.ai==="safe"&&crowded>0&&aiHpRatio(match,p,now)<.65){
    const to=aiMoveChoice(match,p);
    if(to&&aiQueue(match,p,"move",{to},now))return true;
  }

  let searchChance=.58;
  if(p.ai==="aggro")searchChance=.76;
  if(p.ai==="craft")searchChance=.68;
  if(p.ai==="safe"&&aiHpRatio(match,p,now)<.45)searchChance=.38;
  if(p.sp>=3&&Math.random()<searchChance){
    if(aiQueue(match,p,"search",{},now))return true;
  }

  if(!status(p,"bind",now)){
    const to=aiMoveChoice(match,p);
    if(to&&aiQueue(match,p,"move",{to},now))return true;
  }
  return false;
}
function runAITick(match,now=Date.now()){
  if(now<match.startedAt)return false;
  updatePassiveTime(match,now);let changed=false;
  for(const p of match.players){
    if(!p.isAI||!p.alive)continue;
    if(Math.random()<.34)changed=runAIStep(match,p,now)||changed;
  }
  match.nextAiTickAt=now+1000;
  if(changed)match.updatedAt=now;
  return changed
}


return {STATUS_DEFS,applyStatus,updatePassiveTime,initWorld,eventChoiceAvailability,recommendedCrafts,publicPlayer,actionDuration,validateAction,beginServerAction,completeAction,beginEventChoice,resolveEventChoice,lootCorpse,runAIStep,runAITick};
})();
__modules["src/version.js"]=(()=>{
const GAME_VERSION="0.10.5-online";
const PHASE="3A";
const PROTOCOL_VERSION=14;
const BUILD_LABEL=`v${GAME_VERSION} · Phase ${PHASE}`;


return {GAME_VERSION,PHASE,PROTOCOL_VERSION,BUILD_LABEL};
})();
__modules["src/room.js"]=(()=>{
const {isUniqueMaterial}=__modules["src/unique_materials.js"];
const {updateRegionRestrictions,nextRegionLockAt}=__modules["src/region_restrictions.js"];
const {normalizeRoomSettings,roomSettings,humanCapacity,plannedAICount}=__modules["src/room_settings.js"];
const {inventoryOperation}=__modules["src/inventory_ops.js"];
const {STATE_DELTA_FEATURE,stateDiff,substantivePatch,compactSnapshot}=__modules["src/state_transport.js"];
const {settleMatch,playerResult}=__modules["src/match_result.js"];
const { DurableObject }=__modules["cloudflare:workers"];
const { MAX_HUMANS, json, parseJsonMessage, safeText, send }=__modules["src/protocol.js"];
const { ADJACENCY, CHARACTERS, REGIONS, createAIPlayer, createServerPlayer, isValidCharacter, isValidRegion }=__modules["src/game_data.js"];
const { ITEMS, WILD_TEMPLATES, ENCOUNTER_EVENTS }=__modules["src/offline_content.js"];
const { beginServerAction, completeAction, eventChoiceAvailability, initWorld, lootCorpse, publicPlayer, recommendedCrafts, beginEventChoice, runAITick, updatePassiveTime }=__modules["src/match_engine.js"];
const { BUILD_LABEL, GAME_VERSION, PHASE, PROTOCOL_VERSION }=__modules["src/version.js"];

const ROOM_META_KEY="room_meta",MATCH_KEY="match_state";
const DIRECTORY_KEY="room_directory_v1",DIRECTORY_NAME="__MASODO_ROOM_DIRECTORY__";
const EMPTY_ROOM_TTL_MS=10*60*1000,RECONNECT_GRACE_MS=2*60*1000,ACTIVE_DIRECTORY_TTL_MS=6*60*60*1000;

async function sha256Hex(value){
  const bytes=new TextEncoder().encode(String(value||""));
  const digest=await crypto.subtle.digest("SHA-256",bytes);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

class GameRoom extends DurableObject{
  constructor(ctx,env){
    super(ctx,env);this.env=env;this.sessions=new Map();this.sentStates=new WeakMap();this.recipeCache=new Map();
    for(const ws of this.ctx.getWebSockets()){const a=ws.deserializeAttachment();if(a?.sessionId)this.sessions.set(ws,a)}
    this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping","pong"));
  }
  async getMeta(){const value=(await this.ctx.storage.get(ROOM_META_KEY))||null;this.metaJson=JSON.stringify(value);return value}
  async saveMeta(v){const json=JSON.stringify(v);if(json===this.metaJson)return;await this.ctx.storage.put(ROOM_META_KEY,v);this.metaJson=json}
  async getMatch(){
    const v=(await this.ctx.storage.get(MATCH_KEY))||null;this.matchJson=JSON.stringify(v);
    if(v){
      if(!v.eventCatalog||JSON.stringify(v.eventCatalog)===JSON.stringify(ENCOUNTER_EVENTS))v.eventCatalog=ENCOUNTER_EVENTS;
      if(!v.wildTemplates||JSON.stringify(v.wildTemplates)===JSON.stringify(WILD_TEMPLATES))v.wildTemplates=WILD_TEMPLATES;
    }
    return v;
  }
  async saveMatch(v){
    settleMatch(v);const stored={...v};
    if(v.eventCatalog===ENCOUNTER_EVENTS)delete stored.eventCatalog;
    if(v.wildTemplates===WILD_TEMPLATES)delete stored.wildTemplates;
    stored.definitionVersion=GAME_VERSION;
    const json=JSON.stringify(stored);
    if(json!==this.matchJson){await this.ctx.storage.put(MATCH_KEY,stored);this.matchJson=json}
    if(v.phase==="finished"){const meta=await this.getMeta();if(meta&&meta.phase!=="finished"){meta.phase="finished";await this.saveMeta(meta);await this.updateDirectory(meta)}}
  }
  joinedSessions(){return[...this.sessions.values()].filter(s=>s.joined).sort((a,b)=>(a.joinedAt||0)-(b.joinedAt||0))}
  reconnectRecords(meta){return Array.isArray(meta?.reconnectRecords)?meta.reconnectRecords:[]}
  connectedPlayers(meta){return this.joinedSessions().map(s=>({sessionId:s.sessionId,playerName:s.playerName,charId:s.charId,startRegion:s.startRegion||"city",ready:!!s.ready,joinedAt:s.joinedAt,host:meta.hostSessionId===s.sessionId}))}
  activeReservedCount(meta,now=Date.now()){return this.reconnectRecords(meta).filter(r=>!r.disconnectedAt||now-r.disconnectedAt<RECONNECT_GRACE_MS).length}
  roomState(meta){
    const players=this.connectedPlayers(meta);
    return{code:meta.code,...roomSettings(meta),plannedAiCount:plannedAICount(meta,players.length),phase:meta.phase||"lobby",createdAt:meta.createdAt,maxHumans:humanCapacity(meta),players,humanCount:players.length,reservedCount:this.activeReservedCount(meta),allReady:players.length>=1&&players.every(p=>p.ready),hostSessionId:meta.hostSessionId||null,emptySince:meta.emptySince||null,protocolVersion:PROTOCOL_VERSION,serverVersion:GAME_VERSION,buildLabel:BUILD_LABEL,phaseLabel:PHASE}
  }
  broadcast(type,payload={}){for(const ws of this.sessions.keys())send(ws,type,payload)}
  async directoryStub(){return this.env.ROOMS.getByName(DIRECTORY_NAME)}
  async updateDirectory(meta){
    if(!meta?.code||meta.code===DIRECTORY_NAME)return;
    const state=this.roomState(meta),expiresAt=state.humanCount===0?(meta.emptySince||Date.now())+EMPTY_ROOM_TTL_MS:Date.now()+ACTIVE_DIRECTORY_TTL_MS;
    const stub=await this.directoryStub();
    await stub.fetch("https://directory.internal/directory/upsert",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({
      code:state.code,name:state.name,aiMode:state.aiMode,aiCount:state.aiCount,phase:state.phase,createdAt:state.createdAt,humanCount:state.humanCount,reservedCount:state.reservedCount,maxHumans:state.maxHumans,allReady:state.allReady,expiresAt,updatedAt:Date.now()
    })});
  }
  async removeFromDirectory(code){
    if(!code||code===DIRECTORY_NAME)return;
    const stub=await this.directoryStub();
    await stub.fetch("https://directory.internal/directory/remove",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({code})});
  }
  async handleDirectoryRequest(request,path){
    if(path==="/directory/list"&&request.method==="GET"){
      const now=Date.now(),directory=(await this.ctx.storage.get(DIRECTORY_KEY))||{};let changed=false;
      for(const[code,entry]of Object.entries(directory)){if(!entry||entry.expiresAt<=now){delete directory[code];changed=true}}
      if(changed)await this.ctx.storage.put(DIRECTORY_KEY,directory);
      const rooms=Object.values(directory).sort((a,b)=>(b.humanCount-a.humanCount)||(b.updatedAt-a.updatedAt));
      return json({ok:true,rooms,updatedAt:now});
    }
    if(path==="/directory/upsert"&&request.method==="POST"){
      const body=await request.json().catch(()=>({})),code=safeText(body.code,8,"").toUpperCase();
      if(!code)return json({ok:false,error:"invalid_room"},400);
      const directory=(await this.ctx.storage.get(DIRECTORY_KEY))||{};
      directory[code]={code,...roomSettings(body),phase:safeText(body.phase,20,"lobby"),createdAt:Number(body.createdAt)||Date.now(),humanCount:Math.max(0,Number(body.humanCount)||0),reservedCount:Math.max(0,Number(body.reservedCount)||0),maxHumans:Math.max(1,Number(body.maxHumans)||MAX_HUMANS),allReady:!!body.allReady,updatedAt:Number(body.updatedAt)||Date.now(),expiresAt:Number(body.expiresAt)||Date.now()+EMPTY_ROOM_TTL_MS};
      await this.ctx.storage.put(DIRECTORY_KEY,directory);return json({ok:true});
    }
    if(path==="/directory/remove"&&request.method==="POST"){
      const body=await request.json().catch(()=>({})),code=safeText(body.code,8,"").toUpperCase(),directory=(await this.ctx.storage.get(DIRECTORY_KEY))||{};
      if(code&&directory[code]){delete directory[code];await this.ctx.storage.put(DIRECTORY_KEY,directory)}
      return json({ok:true});
    }
    return json({ok:false,error:"directory_not_found"},404);
  }
  async broadcastRoomState(meta){this.broadcast("room_state",{room:this.roomState(meta)});await this.updateDirectory(meta)}
  matchPlayerForSession(match,sid){return match?.players?.find(p=>p.sessionId===sid)||null}
  recipeView(p){
    const key=JSON.stringify([p.charId,p.eq,p.mat,p.con]),cached=this.recipeCache.get(p.playerId);
    if(cached?.key===key)return cached.value;
    const value={recommendations:recommendedCrafts(p,12),craftable:Object.entries(ITEMS).filter(([,it])=>it?.r&&Object.entries(it.r).every(([k,n])=>{
      const src=ITEMS[k];return (src?.t==="m"?(p.mat[k]||0):src?.t==="c"?(p.con[k]||0):(p.eq||[]).filter(x=>x===k).length)>=n;
    })).slice(0,80).map(([id,it])=>({id,name:it.n,t:it.t,tier:it.tier||"",atk:it.atk||0,def:it.def||0,r:it.r}))};
    this.recipeCache.set(p.playerId,{key,value});return value;
  }
  snapshot(match,sid,now=Date.now()){
    const self=this.matchPlayerForSession(match,sid);
    const others=match.players.filter(p=>p.sessionId!==sid).map(p=>({playerId:p.playerId,playerName:p.playerName,charId:p.charId,alive:p.alive,kills:p.kills,isAI:!!p.isAI}));
    const encounter=self?.encounter?(()=>{
      if(self.encounter.kind==="player"){const t=match.players.find(p=>p.playerId===self.encounter.targetId);return t?.alive&&t.region===self.region?{kind:"player",targetId:t.playerId,name:t.playerName,charId:t.charId,hp:t.hp,maxHp:t.maxHp}:null}
      const w=match.wilds.find(x=>x.id===self.encounter.wildId);if(!w?.alive||w.region!==self.region)return null;
      const t=(match.wildTemplates||[]).find(x=>x.id===w.templateId);return{kind:"wild",wildId:w.id,name:t?.n||w.templateId,hp:w.hp,maxHp:t?.hp||w.hp,skillText:t?.skillText||""}
    })():null;
    return{introPending:now<match.startedAt,reworkRegions:(match.reworkObjects||[]).filter(o=>o.kind==="mist").map(o=>({region:o.region,until:o.until})),regionGardens:match.regionGardens||{},regionRestrictions:match.regionRestrictions,combatNoticeSeq:match.combatNoticeSeq||0,combatNotices:(match.combatNotices||[]).filter(e=>e.sourceId===self?.playerId||e.targetId===self?.playerId),result:playerResult(match,self,now),matchId:match.matchId,phase:match.phase,createdAt:match.createdAt,startedAt:match.startedAt,serverNow:now,elapsed:match.phase==="playing"?Math.max(0,Math.floor((now-match.startedAt)/1000)):(match.elapsed||0),self:self?publicPlayer(match,self,now,false):null,others,aliveCount:match.players.filter(p=>p.alive).length,regions:REGIONS,adjacency:ADJACENCY,encounter,
      pendingEvent:self?.pendingEvent?(()=>{
        const e=match.eventCatalog.find(e=>e.id===self.pendingEvent);if(!e)return null;
        return {...e,choices:(e.choices||[]).map((choice,index)=>({...choice,...eventChoiceAvailability(e,self,index)}))}
      })():null,
      aiCount:match.players.filter(p=>p.isAI).length,
      corpses:(match.corpses||[]).filter(c=>c.region===self?.region&&c.expiresAt>now),
      specialRouteStates:Object.fromEntries(Object.entries(match.uniqueSpecials||{}).map(([id,s])=>[id,{state:isUniqueMaterial(id)?s.state:"repeatable",...(s.state==="ground"&&isUniqueMaterial(id)?{region:s.region}:{})}])),
      ...(self?this.recipeView(self):{recommendations:[],craftable:[]})}
  }
  sendMatchState(ws,match,{force=false,now=Date.now()}={}){
    const session=this.sessions.get(ws)||ws.deserializeAttachment();if(!session?.joined)return;
    const snapshot=this.snapshot(match,session.sessionId,now);
    if(!session.deltaState){send(ws,"match_state",{match:snapshot});return}
    const state=compactSnapshot(snapshot),previous=this.sentStates.get(ws);
    if(force||!previous||previous.state.matchId!==state.matchId){
      const revision=(previous?.revision||0)+1;
      if(send(ws,"match_state",{match:state,stateRevision:revision,itemCatalog:ITEMS}))this.sentStates.set(ws,{state,revision});
      return;
    }
    const events=state.combatNotices.filter(e=>e.id>(previous.state.combatNoticeSeq||0));
    const before={...previous.state,combatNotices:[]},after={...state,combatNotices:[]},patch=stateDiff(before,after);
    if(!substantivePatch(patch)&&!events.length)return;
    const revision=previous.revision+1;
    if(send(ws,"match_delta",{baseRevision:previous.revision,stateRevision:revision,patch,combatNotices:events}))this.sentStates.set(ws,{state,revision});
  }
  broadcastMatchState(match){const now=Date.now();for(const ws of this.sessions.keys())this.sendMatchState(ws,match,{now})}

  async scheduleNextAlarm(match,meta=null){
    const now=Date.now(),times=[];
    if(this.joinedSessions().length>0&&match){
      if(match.phase==="playing"&&match.startedAt>now)times.push(match.startedAt);
      times.push(...Object.values(match.regionGardens||{}).flatMap(g=>(g.sources||[g]).map(x=>x.until)));
      times.push(...match.players.map(p=>p.pendingAction?.completeAt).filter(Number.isFinite));
      times.push(...(match.reworkStrikes||[]).map(v=>v.at));
      for(const o of match.reworkObjects||[]){times.push(o.until);if(o.matureAt>now&&!o.bloomed)times.push(o.matureAt);}
      for(const p of match.players.filter(p=>p.alive)){
        for(const st of Object.values(p.statuses||{}))if(st.until>now)times.push(st.until);
        if(p.statuses?.poison?.until>now)times.push((p.nextStatusTick||now)+2000);
        for(const st of Object.values(p.rework?.timed||{})){if(st.until>now)times.push(st.until);if(st.nextTick>now&&st.nextTick<=st.until)times.push(st.nextTick);}
        const rw=p.rework;if(rw?.resources?.attention&&rw.lastPvp)times.push(Math.max(rw.lastPvp+25000,(rw.attentionDecayAt||0)+5000));
        if(p.charId==="c05"&&rw?.resources?.charge)times.push((rw.lastFight||now)+15001);
        if(p.charId==="c23"&&rw?.resources?.will)times.push((rw.lastPvp||now)+20001);
      }
      if(match.phase==="playing"){const lockAt=nextRegionLockAt(match);if(lockAt!==null)times.push(lockAt)}
      if(match.phase==="playing"&&match.players.some(p=>p.isAI&&p.alive)){
        if(!Number.isFinite(match.nextAiTickAt)||match.nextAiTickAt<now)match.nextAiTickAt=now+1000;
        times.push(match.nextAiTickAt);
      }
    }
    if(meta?.emptySince)times.push(meta.emptySince+EMPTY_ROOM_TTL_MS);
    for(const r of this.reconnectRecords(meta))if(r.disconnectedAt)times.push(r.disconnectedAt+RECONNECT_GRACE_MS);
    const future=times.filter(Number.isFinite).map(t=>Math.max(now+250,t));
    const current=await this.ctx.storage.getAlarm();
    if(future.length){const next=Math.min(...future);if(current!==next&&!(current>now&&current<next))await this.ctx.storage.setAlarm(next)}
    else if(current!==null)await this.ctx.storage.deleteAlarm();
  }
  async completeDueActions(match,now=Date.now(),{defer=false}={}){
    if(now<match.startedAt)return false;
    const introChanged=match.introCompleted===false;if(introChanged)match.introCompleted=true;
    const passiveView=()=>JSON.stringify([match.combatNoticeSeq,match.players.map(p=>[p.hp,p.sp,p.satiety,p.alive,p.statuses,p.statusNoticeSeq,p.dollNoticeRegion,p.tempEffects,p.delayedEffects,p.enemyContacts,p.heardNoiseIds,p.rework,p.gearState,p.reworkPause]),match.noises,match.regionGardens,match.reworkObjects,match.reworkStrikes]);
    const before=passiveView();
    let changed=updateRegionRestrictions(match,now)||introChanged;
    for(const p of match.players){
      if(!p.pendingAction||p.pendingAction.completeAt>now)continue;
      const result=completeAction(match,p,now);changed=true;
      const ws=[...this.sessions.entries()].find(([,s])=>s.sessionId===p.sessionId)?.[0];
      if(ws)send(ws,result?.type==="event_choice"?"event_result":"action_result",{result});
    }
    updatePassiveTime(match,now);
    changed ||= before!==passiveView();
    if(changed){match.updatedAt=now;if(!defer){await this.saveMatch(match);this.broadcastMatchState(match)}}
    return changed;
  }
  async alarm(){
    const meta=await this.getMeta();if(!meta)return;
    const now=Date.now();meta.reconnectRecords=this.reconnectRecords(meta).filter(r=>!r.disconnectedAt||now-r.disconnectedAt<RECONNECT_GRACE_MS);
    if(this.joinedSessions().length===0){
      meta.emptySince||=now;
      if(now-meta.emptySince>=EMPTY_ROOM_TTL_MS){await this.removeFromDirectory(meta.code);await this.ctx.storage.deleteAll();return}
      await this.saveMeta(meta);await this.updateDirectory(meta);await this.scheduleNextAlarm(null,meta);return;
    }
    if(meta.emptySince){delete meta.emptySince;await this.saveMeta(meta)}
    const m=await this.getMatch();
    if(!m||m.phase!=="playing"){await this.saveMeta(meta);await this.updateDirectory(meta);await this.scheduleNextAlarm(null,meta);return}
    let changed=await this.completeDueActions(m,now,{defer:true}),ticked=false;
    changed=settleMatch(m)||changed;
    if(m.phase==="playing"&&now>=m.startedAt&&m.players.some(p=>p.isAI&&p.alive)&&(m.nextAiTickAt||0)<=now){changed=runAITick(m,now)||changed;ticked=true}
    if(changed||ticked)await this.saveMatch(m);
    if(changed)this.broadcastMatchState(m);
    meta.phase=m.phase;await this.saveMeta(meta);await this.scheduleNextAlarm(m,meta)
  }

  async fetch(request){
    const url=new URL(request.url),path=url.pathname;
    if(path.startsWith("/directory/"))return this.handleDirectoryRequest(request,path);
    if(path==="/init"&&request.method==="POST"){
      const body=await request.json().catch(()=>({})),existing=await this.getMeta();
      if(existing)return json({ok:false,reason:"exists",room:this.roomState(existing)},409);
      const parsed=normalizeRoomSettings(body);if(!parsed.ok)return json(parsed,400);
      const meta={...parsed.settings,code:safeText(body.code,8,"ROOM"),createdAt:Date.now(),phase:"lobby",hostSessionId:null,emptySince:Date.now(),reconnectRecords:[]};await this.saveMeta(meta);await this.updateDirectory(meta);await this.scheduleNextAlarm(null,meta);return json({ok:true,room:this.roomState(meta)},201)
    }
    const meta=await this.getMeta();if(!meta)return json({ok:false,error:"room_not_found"},404);
    if(path==="/status"&&request.method==="GET"){const m=await this.getMatch();return json({ok:true,room:this.roomState(meta),matchPhase:m?.phase||null})}
    if(path==="/ws"){
      const up=request.headers.get("Upgrade");if(!up||up.toLowerCase()!=="websocket")return json({ok:false,error:"websocket_required"},426);
      const pair=new WebSocketPair(),[client,server]=Object.values(pair);this.ctx.acceptWebSocket(server);
      const session={sessionId:crypto.randomUUID(),joined:false,playerName:"Player",charId:"c01",startRegion:"city",ready:false,joinedAt:Date.now()};
      server.serializeAttachment(session);this.sessions.set(server,session);
      send(server,"connected",{sessionId:session.sessionId,room:this.roomState(meta),build:{version:GAME_VERSION,buildLabel:BUILD_LABEL,phase:PHASE,protocolVersion:PROTOCOL_VERSION},catalog:{characters:CHARACTERS.map(c=>({id:c.id,name:c.name,arch:c.arch})),regions:REGIONS}});
      return new Response(null,{status:101,webSocket:client})
    }
    return json({ok:false,error:"not_found"},404)
  }

  async webSocketMessage(ws,message){
    const msg=parseJsonMessage(message),session=this.sessions.get(ws)||ws.deserializeAttachment(),meta=await this.getMeta();
    if(!msg||!session||!meta){send(ws,"error",{error:"invalid_message"});return}
    if(msg.type==="hello"){
      const now=Date.now(),token=safeText(msg.reconnectToken,180,""),legacyResume=safeText(msg.resumeSessionId,80,"");
      let records=this.reconnectRecords(meta).filter(r=>!r.disconnectedAt||now-r.disconnectedAt<RECONNECT_GRACE_MS),record=null,reconnectToken=token,resumed=false;
      if(token){const hash=await sha256Hex(token);record=records.find(r=>r.tokenHash===hash)||null}
      let m=null,p=null;
      if(meta.phase!=="lobby"){
        m=await this.getMatch();
        if(record)p=this.matchPlayerForSession(m,record.sessionId);
        if(!p&&legacyResume){p=this.matchPlayerForSession(m,legacyResume);if(p){record=records.find(r=>r.sessionId===legacyResume)||null}}
        if(!m||!p){send(ws,"error",{error:"resume_required"});return}
      }
      if(record){
        session.sessionId=record.sessionId;session.playerName=record.playerName;session.charId=record.charId;session.startRegion=record.startRegion||"city";session.ready=!!record.ready;session.joinedAt=record.joinedAt||now;resumed=true;record.disconnectedAt=null;
      }else if(meta.phase==="lobby"){
        if(this.connectedPlayers(meta).length>=humanCapacity(meta)){send(ws,"error",{error:"room_full"});ws.close(4001,"Room full");return}
        reconnectToken=crypto.randomUUID()+crypto.randomUUID();
        session.playerName=safeText(msg.playerName,20,"Player");session.charId=isValidCharacter(msg.charId)?msg.charId:"c01";session.startRegion=isValidRegion(msg.startRegion)?msg.startRegion:"city";session.ready=false;session.joinedAt=now;
        record={sessionId:session.sessionId,tokenHash:await sha256Hex(reconnectToken),playerName:session.playerName,charId:session.charId,startRegion:session.startRegion,ready:false,joinedAt:session.joinedAt,disconnectedAt:null};records.push(record);
      }else{
        reconnectToken=crypto.randomUUID()+crypto.randomUUID();
        record={sessionId:p.sessionId,tokenHash:await sha256Hex(reconnectToken),playerName:p.playerName,charId:p.charId,startRegion:p.region,ready:true,joinedAt:now,disconnectedAt:null};records.push(record);
        session.sessionId=p.sessionId;session.playerName=p.playerName;session.charId=p.charId;session.startRegion=p.region;session.ready=true;session.joinedAt=now;resumed=true;
      }
      for(const[other,os]of this.sessions.entries())if(other!==ws&&os?.sessionId===session.sessionId){this.sessions.delete(other);try{other.close(4002,"Session resumed elsewhere")}catch{}}
      session.deltaState=Array.isArray(msg.features)&&msg.features.includes(STATE_DELTA_FEATURE);
      session.pickupChoices=Array.isArray(msg.features)&&msg.features.includes("inventory_choice_v1");
      if(p){p.pickupChoices=session.pickupChoices}
      session.joined=true;ws.serializeAttachment(session);this.sessions.set(ws,session);
      record.playerName=session.playerName;record.charId=session.charId;record.startRegion=session.startRegion;record.ready=!!session.ready;record.disconnectedAt=null;
      meta.reconnectRecords=records;if(meta.emptySince)delete meta.emptySince;if(!meta.hostSessionId)meta.hostSessionId=session.sessionId;await this.saveMeta(meta);
      send(ws,"hello_ok",{sessionId:session.sessionId,reconnectToken,resumed,reconnected:resumed,host:meta.hostSessionId===session.sessionId});
      if(meta.phase!=="lobby"){const changed=await this.completeDueActions(m,now,{defer:true});await this.saveMatch(m);this.sendMatchState(ws,m,{force:true});if(changed)for(const other of this.sessions.keys())if(other!==ws)this.sendMatchState(other,m,{now});meta.phase=m.phase;await this.updateDirectory(meta);await this.scheduleNextAlarm(m,meta)}else await this.broadcastRoomState(meta);
      return
    }
    if(!session.joined){send(ws,"error",{error:"hello_required"});return}
    if(msg.type==='leave_room'||msg.type==='delete_room'){
      if(msg.type==='delete_room'&&meta.hostSessionId!==session.sessionId){send(ws,'error',{error:'host_only'});return}
      if(meta.phase==='playing'){send(ws,'error',{error:'match_already_started'});return}
      if(msg.type==='delete_room'){
        const peers=[...this.sessions.keys()];
        await this.removeFromDirectory(meta.code);await this.ctx.storage.deleteAlarm();await this.ctx.storage.deleteAll();
        this.metaJson=null;this.matchJson=null;this.recipeCache.clear();this.sessions.clear();
        for(const peer of peers){const a=peer.deserializeAttachment?.();if(a)peer.serializeAttachment({...a,joined:false});send(peer,'room_deleted',{code:meta.code});try{peer.close(1000,'room deleted')}catch{}}
      }else{
        session.joined=false;ws.serializeAttachment(session);this.sessions.delete(ws);
        meta.reconnectRecords=this.reconnectRecords(meta).filter(r=>r.sessionId!==session.sessionId);
        if(meta.hostSessionId===session.sessionId)meta.hostSessionId=this.joinedSessions()[0]?.sessionId||null;
        if(!this.joinedSessions().length){await this.removeFromDirectory(meta.code);await this.ctx.storage.deleteAlarm();await this.ctx.storage.deleteAll();this.metaJson=null;this.matchJson=null;this.recipeCache.clear()}
        else{await this.saveMeta(meta);await this.broadcastRoomState(meta);await this.scheduleNextAlarm(await this.getMatch(),meta)}
        send(ws,'room_left',{code:meta.code});try{ws.close(1000,'room left')}catch{}
      }
      return;
    }
    if(msg.type==="set_ready"){if(meta.phase!=="lobby"){send(ws,"error",{error:"match_already_started"});return}session.ready=!!msg.ready;const rr=this.reconnectRecords(meta).find(r=>r.sessionId===session.sessionId);if(rr)rr.ready=session.ready;await this.saveMeta(meta);ws.serializeAttachment(session);this.sessions.set(ws,session);await this.broadcastRoomState(meta);return}
    if(msg.type==="set_character"){if(meta.phase!=="lobby"||!isValidCharacter(msg.charId)){send(ws,"error",{error:"invalid_character"});return}session.charId=msg.charId;session.ready=false;const rr=this.reconnectRecords(meta).find(r=>r.sessionId===session.sessionId);if(rr){rr.charId=session.charId;rr.ready=false}await this.saveMeta(meta);ws.serializeAttachment(session);this.sessions.set(ws,session);await this.broadcastRoomState(meta);return}
    if(msg.type==="set_start_region"){if(meta.phase!=="lobby"||!isValidRegion(msg.region)){send(ws,"error",{error:"invalid_region"});return}session.startRegion=msg.region;session.ready=false;const rr=this.reconnectRecords(meta).find(r=>r.sessionId===session.sessionId);if(rr){rr.startRegion=session.startRegion;rr.ready=false}await this.saveMeta(meta);ws.serializeAttachment(session);this.sessions.set(ws,session);await this.broadcastRoomState(meta);return}
    if(msg.type==="request_start"){
      const room=this.roomState(meta);if(meta.hostSessionId!==session.sessionId){send(ws,"error",{error:"host_only"});return}if(!room.allReady){send(ws,"error",{error:"not_all_ready"});return}if(meta.phase!=="lobby"){send(ws,"error",{error:"already_started"});return}
      const humans=this.joinedSessions(),players=humans.map((s,i)=>({...createServerPlayer(s,i),pickupChoices:!!s.pickupChoices}));
      const profiles=["balanced","craft","aggro","safe"],aiCharacters=CHARACTERS.filter(c=>!c.testOnly);
      const targetCompetitors=players.length+plannedAICount(meta,players.length);
      while(players.length<targetCompetitors){
        const c=aiCharacters[Math.floor(Math.random()*aiCharacters.length)];
        const r=REGIONS[Math.floor(Math.random()*REGIONS.length)];
        players.push(createAIPlayer(players.length,c.id,r.id,profiles[Math.floor(Math.random()*profiles.length)]));
      }
      this.recipeCache.clear();
      const startNow=Date.now();
      const match={matchId:crypto.randomUUID(),roomName:roomSettings(meta).name,aiSettings:roomSettings(meta),phase:"playing",createdAt:startNow,startedAt:startNow+5000,introCompleted:false,updatedAt:startNow,players,nextAiTickAt:startNow+6000};
      for(const p of match.players){p.tempEffects=[];p.statusImmunity={};p.cdCUntil=0;p.cdAUntil=0;p.lastSatietyAt=match.startedAt;p.nextStatusTick=match.startedAt}
      match.wildTemplates=WILD_TEMPLATES;match.eventCatalog=ENCOUNTER_EVENTS;initWorld(match);
      meta.phase="playing";meta.startedAt=match.startedAt;await Promise.all([this.saveMeta(meta),this.saveMatch(match)]);await this.scheduleNextAlarm(match,meta);await this.updateDirectory(meta);this.broadcast("match_started",{matchId:match.matchId,serverNow:Date.now(),competitors:match.players.length,aiCount:match.players.filter(p=>p.isAI).length});this.broadcastMatchState(match);return
    }
    if(msg.type==="request_state"){const m=await this.getMatch();if(!m){send(ws,"error",{error:"match_not_started"});return}const changed=await this.completeDueActions(m,Date.now(),{defer:true});if(changed){await this.saveMatch(m);this.broadcastMatchState(m)}this.sendMatchState(ws,m,{force:true});return}
    if(msg.type==="command_inventory"){
      const m=await this.getMatch();if(!m){send(ws,"inventory_result",{result:{ok:false,error:"match_not_playing"}});return}
      if(Date.now()<m.startedAt){send(ws,"inventory_result",{result:{ok:false,error:"match_starting"}});return}
      const changed=await this.completeDueActions(m,Date.now(),{defer:true});settleMatch(m);
      const p=this.matchPlayerForSession(m,session.sessionId),result=inventoryOperation(m,p,msg);
      if(result.ok){updatePassiveTime(m,Date.now());m.updatedAt=Date.now()}
      if(result.ok||changed||m.phase!=="playing")await this.saveMatch(m);
      send(ws,"inventory_result",{result});
      if(result.ok||changed||m.phase!=="playing")this.broadcastMatchState(m);
      return;
    }
    if(msg.type==="chat"){const text=safeText(msg.text,120,"");if(text)this.broadcast("chat",{from:session.sessionId,playerName:session.playerName,text,at:Date.now()});return}

    const commandMap={command_remove_object:"remove_object",command_move:"move",command_search:"search",command_rest:"rest",command_craft:"craft",command_use_item:"use_item",command_attack:"attack",command_skill:"skill",command_flee:"flee",command_char_action:"char_action",command_loot_corpse:"loot_corpse"};
    if(commandMap[msg.type]){
      const m=await this.getMatch();if(!m||m.phase!=="playing"){send(ws,"error",{error:"match_not_playing"});return}
      const dueChanged=await this.completeDueActions(m,Date.now(),{defer:true});settleMatch(m);if(m.phase!=="playing"){await this.saveMatch(m);send(ws,"error",{error:"match_not_playing"});this.broadcastMatchState(m);return}const p=this.matchPlayerForSession(m,session.sessionId);const type=commandMap[msg.type],payload={to:msg.to,id:msg.id};
      if(type==="char_action")Object.assign(payload,{choice:msg.choice,targetId:msg.targetId,region:msg.region,words:msg.words,dispelKey:msg.dispelKey});
      if(type==="remove_object")payload.objectId=msg.objectId;
      if(type==="skill")payload.dispelKey=msg.dispelKey;
      if(type==="craft"){payload.replaceIndex=msg.replaceIndex;payload.replaceId=msg.replaceId}
      if(type==="loot_corpse"){payload.corpseId=msg.corpseId;payload.kind=msg.kind;payload.qty=msg.qty;payload.replace=!!msg.replace}
      const r=beginServerAction(m,p,type,payload,Date.now());if(!r.ok){if(dueChanged||r.error==="no_encounter"){await this.saveMatch(m);this.broadcastMatchState(m)}send(ws,"error",{error:r.error});return}
      await this.saveMatch(m);await this.scheduleNextAlarm(m,meta);send(ws,"action_accepted",{action:r.action});this.broadcastMatchState(m);return
    }
    if(msg.type==="event_choice"){
      const m=await this.getMatch(),p=this.matchPlayerForSession(m,session.sessionId);if(!m||!p){send(ws,"error",{error:"match_not_playing"});return}
      const changed=await this.completeDueActions(m,Date.now(),{defer:true});const r=beginEventChoice(m,p,Number(msg.index),Date.now());if(!r.ok){if(changed){await this.saveMatch(m);this.broadcastMatchState(m)}await this.scheduleNextAlarm(m,meta);send(ws,"error",{error:r.error,reason:r.reason||""});return}await this.saveMatch(m);await this.scheduleNextAlarm(m,meta);if(r.queued)send(ws,"action_accepted",{action:r.action});else send(ws,"event_result",{result:r});this.broadcastMatchState(m);return
    }
    send(ws,"error",{error:"unknown_message_type",received:msg.type})
  }

  async markDisconnected(ws){
    const ss=this.sessions.get(ws)||ws.deserializeAttachment();this.sessions.delete(ws);const meta=await this.getMeta();if(!meta)return;
    const now=Date.now(),record=this.reconnectRecords(meta).find(r=>r.sessionId===ss?.sessionId);if(record&&!this.joinedSessions().some(x=>x.sessionId===ss.sessionId))record.disconnectedAt=now;
    if(meta.phase==="lobby"&&meta.hostSessionId===ss?.sessionId)meta.hostSessionId=this.joinedSessions()[0]?.sessionId||null;
    if(this.joinedSessions().length===0)meta.emptySince||=now;
    await this.saveMeta(meta);await this.broadcastRoomState(meta);await this.scheduleNextAlarm(await this.getMatch(),meta);
  }
  async webSocketClose(ws,code,reason){await this.markDisconnected(ws);try{ws.close(code,reason)}catch{}}
  async webSocketError(ws){await this.markDisconnected(ws)}
}


return {GameRoom};
})();
__modules["src/offline_session.js"]=(()=>{
const {GameRoom}=__modules["src/room.js"];
const {CHARACTERS,REGIONS,isValidCharacter,isValidRegion}=__modules["src/game_data.js"];
const {ITEMS}=__modules["src/offline_content.js"];
const {normalizeRoomSettings}=__modules["src/room_settings.js"];
const {GAME_VERSION,BUILD_LABEL,PHASE,PROTOCOL_VERSION}=__modules["src/version.js"];
const SAVE_KEY='masodo-offline-session-v1';
class OfflineSession{
 constructor(adapter){
  this.adapter=adapter;this.timer=null;this.alarmAt=null;this.queue=Promise.resolve();this.running=false;this.data=new Map();
  try{const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');if(saved?.schema===1&&saved.data)this.data=new Map(Object.entries(saved.data))}catch{}
  const copy=v=>v===undefined?undefined:structuredClone(v),persist=()=>{try{localStorage.setItem(SAVE_KEY,JSON.stringify({schema:1,version:GAME_VERSION,data:Object.fromEntries(this.data)}))}catch{}};
  this.ws={readyState:1,attachment:null,deserializeAttachment:()=>this.ws.attachment,serializeAttachment:v=>this.ws.attachment=copy(v),send:s=>{if(this.running)this.receive(JSON.parse(s))},close:()=>this.stop()};
  this.ctx={getWebSockets:()=>[],setWebSocketAutoResponse(){},storage:{get:async k=>copy(this.data.get(k)),put:async(k,v)=>{this.data.set(k,copy(v));persist()},getAlarm:async()=>this.alarmAt,setAlarm:async at=>{this.alarmAt=at;this.schedule()},deleteAlarm:async()=>{this.alarmAt=null;this.schedule()},deleteAll:async()=>{this.data.clear();persist()}}};
  // Directory bookkeeping stays entirely in memory; no Request, fetch or WebSocket is opened.
  this.room=new GameRoom(this.ctx,{ROOMS:{getByName:()=>({fetch:async()=>({ok:true,json:async()=>({ok:true})})})}});
 }
 receive(msg){
  if(msg.type==='room_left'||msg.type==='room_deleted'){this.stop();this.alarmAt=null;this.adapter.endRoomConnection()}
  if(msg.type==='match_state'){this.adapter.lastMatch=msg.match;this.adapter.networkState=msg.match;this.adapter.stateRevision=0}
  this.adapter.emit(msg.type,msg);this.adapter.emit('*',msg);
 }
 async catalog(){const catalog={characters:CHARACTERS,regions:REGIONS,items:ITEMS};this.adapter.catalog=catalog;this.adapter.itemCatalog=ITEMS;this.adapter.build={version:GAME_VERSION,buildLabel:BUILD_LABEL+' · 오프라인',phase:PHASE,protocolVersion:PROTOCOL_VERSION};this.adapter.emit('catalog',catalog);this.adapter.emit('build',this.adapter.build);return catalog}
 async list(){const meta=await this.room.getMeta();return{ok:true,rooms:meta?[this.room.roomState(meta)]:[]}}
 async create(settings={}){await this.queue;const checked=normalizeRoomSettings(settings);if(!checked.ok)throw Error(checked.error);this.stop();this.alarmAt=null;this.room.sessions.clear();this.data.clear();this.room.metaJson=null;this.room.matchJson=null;this.room.recipeCache.clear();const meta={code:'LOCAL',phase:'lobby',createdAt:Date.now(),...checked.settings,hostSessionId:'offline-player',reconnectRecords:[]};await this.room.saveMeta(meta);return{ok:true,code:'LOCAL',room:this.room.roomState(meta)}}
 async status(){const meta=await this.room.getMeta();if(!meta)throw Error('room_not_found');return{ok:true,room:this.room.roomState(meta)}}
 async connect(code,options={}){
  await this.queue;const meta=await this.room.getMeta();if(!meta||code!=='LOCAL')throw Error('room_not_found');
  const match=await this.room.getMatch(),existing=match?.players.find(p=>p.sessionId==='offline-player');
  const session={sessionId:'offline-player',joined:true,joinedAt:meta.createdAt,ready:!!existing,playerName:existing?.playerName||String(options.playerName||'user').slice(0,20),charId:existing?.charId||(isValidCharacter(options.charId)?options.charId:'c01'),startRegion:existing?.region||(isValidRegion(options.startRegion)?options.startRegion:'city'),deltaState:false,pickupChoices:true};
  this.ws.attachment=session;this.room.sessions.set(this.ws,session);meta.hostSessionId=session.sessionId;meta.reconnectRecords=[{...session,disconnectedAt:null}];await this.room.saveMeta(meta);
  this.running=true;this.ws.readyState=1;this.adapter.ws=this.ws;this.adapter.roomCode='LOCAL';this.adapter.sessionId=session.sessionId;this.adapter.manualClose=false;
  this.receive({type:'connected',build:this.adapter.build,offline:true});this.receive({type:'hello_ok',sessionId:session.sessionId,host:true,resumed:!!existing});
  if(match){await this.room.completeDueActions(match,Date.now(),{defer:true});await this.room.saveMatch(match);this.room.sendMatchState(this.ws,match,{force:true});await this.room.scheduleNextAlarm(match,meta);this.schedule()}else this.receive({type:'room_state',room:this.room.roomState(meta)});
  return this.adapter;
 }
 send(type,payload){if(!this.running)return false;this.enqueue(()=>this.room.webSocketMessage(this.ws,JSON.stringify({type,...payload})));return true}
 enqueue(fn){this.queue=this.queue.then(fn).catch(error=>this.receive({type:'error',error:String(error.message||error)}));return this.queue}
 schedule(){if(this.timer!==null)clearTimeout(this.timer);this.timer=null;if(!this.running||this.alarmAt===null)return;this.timer=setTimeout(()=>{this.timer=null;this.alarmAt=null;this.enqueue(()=>this.room.alarm()).then(()=>this.schedule())},Math.max(0,this.alarmAt-Date.now()))}
 async abandon(){
  this.stop();await this.queue;this.stop();this.alarmAt=null;
  this.room.sessions.clear();this.room.metaJson=null;this.room.matchJson=null;this.room.recipeCache.clear();this.ws.attachment=null;
  await this.ctx.storage.deleteAll();
  try{localStorage.removeItem?.(SAVE_KEY)}catch{}
 }
 stop(){this.running=false;if(this.timer!==null)clearTimeout(this.timer);this.timer=null;this.ws.readyState=3;if(this.adapter.ws===this.ws)this.adapter.ws=null}
}
function installOfflineMode(adapter){
 let local=null;const original={};
 for(const method of ['loadCatalog','listRooms','createRoom','roomStatus','connect','send','close'])original[method]=adapter[method].bind(adapter);
 adapter.offline=false;
 adapter.useOffline=()=>{original.close();adapter.offline=true;local??=new OfflineSession(adapter);return local};
 adapter.useOnline=()=>{local?.stop();adapter.offline=false};
 adapter.loadCatalog=(...args)=>adapter.offline?local.catalog():original.loadCatalog(...args);
 adapter.listRooms=(...args)=>adapter.offline?local.list():original.listRooms(...args);
 adapter.createRoom=(...args)=>adapter.offline?local.create(...args):original.createRoom(...args);
 adapter.roomStatus=(...args)=>adapter.offline?local.status(...args):original.roomStatus(...args);
 adapter.connect=(...args)=>adapter.offline?local.connect(...args):original.connect(...args);
 adapter.send=(type,payload={})=>adapter.offline?local.send(type,payload):original.send(type,payload);
 adapter.leaveGame=async()=>{
  if(adapter.offline)await local.abandon();else original.close();
  adapter.manualClose=true;adapter.roomCode=null;adapter.sessionId=null;adapter.lastMatch=null;adapter.networkState=null;adapter.stateRevision=0;
 };
 adapter.close=(...args)=>{if(adapter.offline){local.stop();adapter.manualClose=true}else original.close(...args)};
 return adapter;
}


return {OfflineSession,installOfflineMode};
})();
__modules["src/tutorial_practice.js"]=(()=>{
// Isolated lesson fixtures; all gameplay actions use the production engine.
// No adapter, room storage, timers, fetch, WebSocket or global RNG overrides.
const {CHARACTERS,REGIONS,ADJACENCY,createServerPlayer}=__modules["src/game_data.js"];
const {ITEMS,ENCOUNTER_EVENTS,WILD_TEMPLATES}=__modules["src/offline_content.js"];
const {initWorld,beginServerAction,completeAction,beginEventChoice,applyStatus,publicPlayer,updatePassiveTime}=__modules["src/match_engine.js"];
const {inventoryOperation,offerSearchConsumable,offerEquipment}=__modules["src/inventory_ops.js"];
const {rememberIncoming,rememberEnemy,pruneEnemyTraces}=__modules["src/enemy_contacts.js"];
const {updateRegionRestrictions}=__modules["src/region_restrictions.js"];
const {REWORK_CONFIG,REWORK_LABELS}=__modules["src/character_reworks.js"];
class TutorialPractice{
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

return {TutorialPractice};
})();
return {...__modules["src/offline_session.js"],...__modules["src/tutorial_practice.js"]};
})();
export const installOfflineMode=OfflineRuntime.installOfflineMode;
export const OfflineSession=OfflineRuntime.OfflineSession;
export const TutorialPractice=OfflineRuntime.TutorialPractice;
