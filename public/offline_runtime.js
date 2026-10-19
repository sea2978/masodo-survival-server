// Generated from the current authoritative game modules. No runtime downloads.
const OfflineRuntime=(()=>{
class DurableObject{constructor(ctx){this.ctx=ctx}}
class WebSocketRequestResponsePair{}
const __modules={"cloudflare:workers":{DurableObject}};
__modules["src/offline_content.js"]=(()=>{
// Generated from public/offline.html v0.6.4. Keep this server copy authoritative for online matches.
const ITEMS={"iron":{"n":"철조각","t":"m","tier":"일반"},"glass":{"n":"유리조각","t":"m","tier":"일반"},"rubber":{"n":"고무","t":"m","tier":"일반"},"wire":{"n":"철사","t":"m","tier":"일반"},"battery":{"n":"배터리","t":"m","tier":"일반"},"electronics":{"n":"전자부품","t":"m","tier":"일반"},"cloth":{"n":"질긴 천","t":"m","tier":"일반"},"medicine":{"n":"약품","t":"c","heal":22,"tier":"일반","kind":"medicine","useTime":1.2,"combatEff":0.85},"water":{"n":"생수","t":"c","sp":12,"effectText":"SP +12 · 포만도 +5","tier":"일반","kind":"drink","sat":5,"useTime":1.2,"combatEff":0.75},"bread":{"n":"빵","t":"c","heal":10,"effectText":"HP +10 · 포만도 +15","tier":"일반","kind":"food","sat":15,"useTime":1.2,"combatEff":0.75},"canned":{"n":"통조림","t":"c","heal":14,"effectText":"HP +14 · 포만도 +18","kind":"food","sat":18,"useTime":1.2,"combatEff":0.75},"chocolate":{"n":"초콜릿","t":"c","sp":10,"effectText":"SP +10 · 포만도 +10 · 15초간 이동속도 +5%","tier":"일반","kind":"food","sat":10,"useTime":1.2,"combatEff":0.75},"silver":{"n":"은괴","t":"m","tier":"일반"},"crystal":{"n":"수정","t":"m","tier":"일반"},"mana_ink":{"n":"마력잉크","t":"m","tier":"일반"},"mana_fiber":{"n":"마력섬유","t":"m","tier":"일반"},"leather":{"n":"가죽","t":"m","tier":"일반"},"precision":{"n":"정밀부품","t":"m","tier":"일반"},"mana_stone":{"n":"마력석","t":"m","tier":"일반"},"steel":{"n":"강철판","t":"m","tier":"일반"},"alloy":{"n":"특수합금","t":"m","tier":"일반"},"machine":{"n":"기계부품","t":"m","tier":"일반"},"toxin":{"n":"독성물질","t":"m","tier":"일반"},"wood":{"n":"강화목재","t":"m","tier":"일반"},"stick":{"n":"나무막대","t":"m","tier":"일반"},"gunpowder":{"n":"화약","t":"m","tier":"일반"},"aim_terminal":{"n":"전술 조준 단말","t":"e","def":18,"r":{"electronics":1,"precision":1,"battery":1},"fx":"tracking","tier":"희귀 시너지","effectText":"탐지한 적을 20초 표식(장비 보정으로 24초) · 표식 대상 첫 공격 명중률 +5% · 추적 정보 지속시간 +20%","weaponType":"단말"},"camo_mask":{"n":"저소음 위장 마스크","t":"e","def":19,"r":{"cloth":1,"mana_fiber":1},"fx":"stealth","tier":"희귀 시너지","effectText":"적에게 탐지될 확률 -7% · 8초 이상 공격하지 않았다면 다음 첫 적중 피해 +4%"},"toxin_kit":{"n":"독성 투여 키트","t":"e","def":17,"r":{"toxin":1,"medicine":1},"fx":"poison","tier":"희귀 시너지","effectText":"공격 적중 시 독 부여 확률 +6% · 독 상태 대상에게 주는 피해 +3%","weaponType":"도구"},"propulsion":{"n":"경량 추진 하네스","t":"e","def":18,"r":{"battery":1,"rubber":1,"machine":1},"fx":"mobility","tier":"희귀 시너지","effectText":"지역 이동 SP 소모 -1 · 이동 후 8초 이내 첫 공격 명중률 +4%"},"plate":{"n":"충격 흡수 플레이트","t":"e","def":22,"r":{"steel":1,"rubber":1},"fx":"bruiser","tier":"희귀 시너지","effectText":"HP 50% 이상일 때 받는 전투 피해 -3% · HP 50% 미만일 때 방어력 +4"},"recovery":{"n":"응급 회복 모듈","t":"e","def":18,"r":{"medicine":1,"mana_fiber":1},"fx":"sustain","tier":"희귀 시너지","effectText":"음식/약품 HP 회복량 +8% · 비전투 회복 효과 +5%"},"spell_amp":{"n":"술식 증폭 장신구","t":"e","def":18,"r":{"mana_stone":1,"crystal":1},"fx":"control","tier":"희귀 시너지","effectText":"가하는 상태이상 지속시간 +6% · 상태이상 부여 확률 +3%","weaponType":"장신구"},"accel":{"n":"반응 가속 모듈","t":"e","def":17,"r":{"precision":1,"battery":1},"fx":"rapid","tier":"희귀 시너지","effectText":"일반 공격 준비시간 -4% · 같은 대상을 연속 3회 적중하면 3번째 피해 +3%","weaponType":"단말"},"trace":{"n":"추적용 흔적 분석기","t":"e","def":17,"r":{"precision":1,"electronics":1},"fx":"tracking","tier":"희귀 시너지","effectText":"부상당한 적 탐지 확률 +8% · 같은 대상을 다시 탐지했을 때 첫 공격 명중률 +4%","weaponType":"단말"},"detox":{"n":"해독 방호 마스크","t":"e","def":20,"r":{"mana_fiber":1,"medicine":1},"fx":"poison","tier":"희귀 시너지","effectText":"받는 독 지속시간 -20% · 독 상태 적을 발견하면 20초간 자신이 탐지될 확률 -3%"},"evasion":{"n":"전술 회피 장치","t":"e","def":17,"r":{"precision":1,"rubber":1},"fx":"mobility","tier":"희귀 시너지","effectText":"도주 준비시간 -5% · 도주 성공 후 다음 지역 이동 SP 소모 0"},"focus":{"n":"집중 유지 부적","t":"e","def":17,"r":{"mana_ink":1,"mana_fiber":1},"fx":"control","tier":"희귀 시너지","effectText":"전투 스킬 SP 소모 -5% · 행동지연 저항 +10%","weaponType":"장신구"},"blade":{"n":"강화검","t":"e","atk":18,"r":{"steel":1,"rubber":1},"def":0,"tier":"희귀","weaponType":"검"},"spear":{"n":"강화창","t":"e","atk":18,"r":{"steel":1,"stick":1},"def":0,"tier":"희귀","weaponType":"창"},"bow":{"n":"강화활","t":"e","atk":17,"r":{"wood":1,"wire":1},"def":0,"tier":"희귀","weaponType":"활"},"gun":{"n":"강화총","t":"e","atk":19,"r":{"machine":1,"gunpowder":1},"def":0,"tier":"희귀","weaponType":"총"},"gauntlet":{"n":"강화권갑","t":"e","atk":16,"r":{"steel":1,"leather":1},"def":3,"tier":"희귀","weaponType":"권갑"},"ceramic":{"n":"세라믹","t":"m","tier":"일반"},"energy_drink":{"n":"에너지드링크","t":"c","sp":22,"effectText":"SP +22 · 포만도 +10 · 25초간 지역 이동 SP 소모 -1","tier":"고급","kind":"drink","sat":10,"useTime":1.2,"combatEff":0.75},"coffee":{"n":"커피","t":"c","sp":18,"effectText":"SP +18 · 포만도 +8 · 30초간 탐색 시간 -5%","tier":"고급","kind":"drink","sat":8,"useTime":1.2,"combatEff":0.75},"strong_coffee":{"n":"진한 커피","t":"c","sp":25,"effectText":"SP +25 · 포만도 +10 · 30초간 행동속도 +4% · 종료 후 20초 SP회복 -10%","tier":"희귀","kind":"drink","sat":10,"useTime":1.2,"combatEff":0.75,"r":{"coffee":2}},"sandwich":{"n":"샌드위치","t":"c","heal":12,"sp":12,"effectText":"HP +12 · SP +12 · 포만도 +20","tier":"고급","kind":"food","sat":20,"useTime":1.2,"combatEff":0.75,"r":{"bread":1,"canned":1}},"grilled_meat":{"n":"구운 고기","t":"c","heal":18,"effectText":"HP +18 · 포만도 +25 · 30초간 최대 HP +8","tier":"고급","kind":"food","sat":25,"useTime":1.2,"combatEff":0.75},"warm_soup":{"n":"따뜻한 수프","t":"c","heal":18,"effectText":"HP +18 · 포만도 +20 · 공포/혼란 지속시간 -20%","tier":"고급","kind":"food","sat":20,"useTime":1.2,"combatEff":0.75,"r":{"canned":1,"water":1}},"first_aid":{"n":"응급약","t":"c","heal":22,"effectText":"HP +22 · 전투 중 회복효율 85%","tier":"고급","kind":"medicine","useTime":1.2,"combatEff":0.85},"advanced_first_aid":{"n":"고급응급약","t":"c","heal":30,"effectText":"HP +30 · 전투 중 회복효율 80% · 사용시간 1.4초","tier":"희귀","kind":"medicine","useTime":1.4,"combatEff":0.8},"antidote":{"n":"해독제","t":"c","effectText":"독 2스택 제거 · 남은 독 지속시간 절반","tier":"고급","kind":"medicine","useTime":1.2,"combatEff":1},"bandage":{"n":"붕대","t":"c","heal":8,"effectText":"HP +8 · 출혈 2스택 제거","tier":"일반","kind":"medicine","useTime":1.2,"combatEff":0.85},"mint_choco_fish":{"n":"민트초코 붕어빵","t":"c","heal":16,"sp":8,"effectText":"HP +16 · SP +8 · 포만도 +20 · 하쿠/아바돈 특수 반응","tier":"희귀","kind":"food","sat":20,"useTime":1.2,"combatEff":0.75},"carbonara_mint_fish":{"n":"카르보나라 파스타 민트초코 붕어빵(성심담 에디션)","t":"c","heal":18,"sp":12,"effectText":"아바돈: HP·SP·포만도 최대 + 모든 아이템 소실 · 아바돈 이외: 섭취 시 즉사","tier":"희귀","kind":"food","sat":25,"useTime":1.2,"combatEff":0.75},"basic_sword":{"n":"검","t":"e","atk":8,"def":0,"r":{"iron":1,"stick":1},"tier":"고급","category":"무기","weaponType":"검"},"basic_dagger":{"n":"단검","t":"e","atk":7,"def":0,"r":{"iron":1,"rubber":1},"tier":"고급","category":"무기","weaponType":"단검"},"basic_spear":{"n":"창","t":"e","atk":8,"def":0,"r":{"stick":1,"iron":1},"tier":"고급","category":"무기","weaponType":"창"},"basic_blunt":{"n":"둔기","t":"e","atk":9,"def":0,"r":{"iron":1,"wood":1},"tier":"고급","category":"무기","weaponType":"둔기"},"basic_scythe":{"n":"낫","t":"e","atk":8,"def":0,"r":{"iron":1,"stick":1},"tier":"고급","category":"무기","weaponType":"낫"},"basic_gauntlet":{"n":"권갑","t":"e","atk":7,"def":2,"r":{"leather":1,"iron":1},"tier":"고급","category":"무기","weaponType":"권갑"},"basic_bow":{"n":"활","t":"e","atk":7,"def":0,"r":{"wood":1,"wire":1},"tier":"고급","category":"무기","weaponType":"활"},"basic_gun":{"n":"총","t":"e","atk":9,"def":0,"r":{"iron":1,"gunpowder":1},"tier":"고급","category":"무기","weaponType":"총"},"basic_throw":{"n":"투척무기","t":"e","atk":7,"def":0,"r":{"iron":1,"cloth":1},"tier":"고급","category":"무기","weaponType":"투척무기"},"basic_heavy":{"n":"중량무기","t":"e","atk":10,"def":0,"r":{"steel":1,"wood":1},"tier":"고급","category":"무기","weaponType":"중량무기"},"basic_special":{"n":"특수무기","t":"e","atk":8,"def":1,"r":{"machine":1,"iron":1},"tier":"고급","category":"무기","weaponType":"특수무기"},"basic_magic":{"n":"마도구","t":"e","atk":4,"def":4,"r":{"mana_stone":1,"stick":1},"tier":"고급","category":"장비","weaponType":"마도구"},"basic_grimoire":{"n":"마법서","t":"e","atk":3,"def":5,"r":{"mana_ink":1,"cloth":1},"tier":"고급","category":"장비","weaponType":"마법서"},"basic_terminal":{"n":"단말","t":"e","atk":2,"def":6,"r":{"electronics":1,"battery":1},"tier":"고급","category":"장비","weaponType":"단말"},"basic_mask":{"n":"가면","t":"e","atk":0,"def":7,"r":{"cloth":1,"glass":1},"tier":"고급","category":"장비"},"basic_accessory":{"n":"장신구","t":"e","atk":1,"def":6,"r":{"silver":1,"crystal":1},"tier":"고급","category":"장비"},"basic_tool":{"n":"도구","t":"e","atk":2,"def":5,"r":{"machine":1,"rubber":1},"tier":"고급","category":"장비","weaponType":"도구"},"basic_armament":{"n":"병기","t":"e","atk":3,"def":8,"r":{"steel":1,"machine":1},"tier":"고급","category":"장비","weaponType":"병기"},"rare_dagger":{"n":"강화단검","t":"e","atk":17,"def":0,"r":{"basic_dagger":1,"alloy":1},"tier":"희귀","weaponType":"단검"},"rare_blunt":{"n":"강화둔기","t":"e","atk":19,"def":0,"r":{"basic_blunt":1,"alloy":1},"tier":"희귀","weaponType":"둔기"},"rare_scythe":{"n":"강화낫","t":"e","atk":18,"def":0,"r":{"basic_scythe":1,"alloy":1},"tier":"희귀","weaponType":"낫"},"rare_throw":{"n":"강화투척무기","t":"e","atk":17,"def":0,"r":{"basic_throw":1,"alloy":1},"tier":"희귀","weaponType":"투척무기"},"rare_heavy":{"n":"강화중량무기","t":"e","atk":21,"def":0,"r":{"basic_heavy":1,"alloy":1},"tier":"희귀","weaponType":"중량무기"},"rare_special":{"n":"강화특수무기","t":"e","atk":18,"def":2,"r":{"basic_special":1,"alloy":1},"tier":"희귀","weaponType":"특수무기"},"rare_magic":{"n":"강화마도구","t":"e","atk":10,"def":8,"r":{"basic_magic":1,"alloy":1},"tier":"희귀","weaponType":"마도구"},"rare_grimoire":{"n":"고위마법서","t":"e","atk":9,"def":10,"r":{"basic_grimoire":1,"alloy":1},"tier":"희귀","weaponType":"마법서"},"rare_terminal":{"n":"강화단말","t":"e","atk":6,"def":12,"r":{"basic_terminal":1,"alloy":1},"tier":"희귀","weaponType":"단말"},"rare_mask":{"n":"주술가면","t":"e","atk":2,"def":13,"r":{"basic_mask":1,"alloy":1},"tier":"희귀"},"rare_accessory":{"n":"고급장신구","t":"e","atk":4,"def":12,"r":{"basic_accessory":1,"alloy":1},"tier":"희귀"},"rare_tool":{"n":"특수도구","t":"e","atk":6,"def":10,"r":{"basic_tool":1,"alloy":1},"tier":"희귀","weaponType":"도구"},"rare_armament":{"n":"강화병기","t":"e","atk":8,"def":14,"r":{"basic_armament":1,"alloy":1},"tier":"희귀","weaponType":"병기"},"special_01":{"n":"백색 양산살","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_02":{"n":"자수정 피어싱 조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_03":{"n":"성흔이 새겨진 철편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_04":{"n":"아레스 나노코어","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_05":{"n":"흑색 대검 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_06":{"n":"은빛 레이피어 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_07":{"n":"해킹 단말 칩","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_08":{"n":"성창의 금빛 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_09":{"n":"무언의 가면 조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_10":{"n":"아이돌 마이크 코어","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_11":{"n":"청해의 닻사슬","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_12":{"n":"여우 문양 부적지","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_13":{"n":"백은 칼날 조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_14":{"n":"고장 난 회중시계 부품","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_15":{"n":"검붉은 검편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_16":{"n":"마력이 밴 붓털","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_17":{"n":"당문 암기편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_18":{"n":"기사창 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_19":{"n":"검은 낫날 조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_20":{"n":"정밀 활시위","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_21":{"n":"리볼버 실린더","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_22":{"n":"별 장식 결정","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_23":{"n":"기사검 장갑판","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_24":{"n":"주황색 건틀릿 코어","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_25":{"n":"성화 부채살","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_26":{"n":"마력이 깃든 꽃잎","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_27":{"n":"마법서의 백지 페이지","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_28":{"n":"붉은 대검 파편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_29":{"n":"월광 비수편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_30":{"n":"미노타우로스 건틀릿 편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_31":{"n":"장산범의 털가죽","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_32":{"n":"키메라 조직 샘플","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_33":{"n":"청룡의 비늘","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_34":{"n":"독사의 허물","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_35":{"n":"기사장의 갑주편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_36":{"n":"몽마의 뿔조각","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_37":{"n":"마술사의 금속 카드","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_38":{"n":"하피의 깃털","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_39":{"n":"붉은 검집 장식","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_40":{"n":"탐식 기관 조직","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"special_41":{"n":"심해 촉수편","t":"m","tier":"특수","effectText":"캐릭터 연계 특수재료 · 최종/준최종 장비 제작에 사용"},"near_final_01":{"n":"벨리트라의 혀 피어싱","t":"e","atk":12,"def":8,"r":{"rare_accessory":1,"special_02":1},"tier":"준최종","effectText":"명중률 +2% · 치명타 확률 +2%","weaponType":"장신구"},"near_final_02":{"n":"페더파일의 마도 단말","t":"e","atk":5,"def":16,"r":{"rare_terminal":1,"special_07":1},"tier":"준최종","effectText":"플레이어 탐지 확률 +6%","weaponType":"단말"},"near_final_03":{"n":"헤드라의 가면","t":"e","atk":5,"def":16,"r":{"rare_mask":1,"special_09":1},"tier":"준최종","effectText":"자신이 탐지될 확률 -5%"},"near_final_04":{"n":"아이리스의 스테이지 마이크","t":"e","atk":12,"def":8,"r":{"rare_special":1,"special_10":1},"tier":"준최종","effectText":"전투 스킬 SP 소모 -2","weaponType":"특수무기"},"near_final_05":{"n":"키츠네의 고헤이","t":"e","atk":12,"def":8,"r":{"rare_magic":1,"special_12":1},"tier":"준최종","effectText":"상태이상 부여 확률 +4%","weaponType":"마도구"},"near_final_06":{"n":"몽트르의 회중시계","t":"e","atk":12,"def":8,"r":{"rare_accessory":1,"special_14":1},"tier":"준최종","effectText":"공격 준비시간 -3% · 이동시간 -3%","weaponType":"장신구"},"near_final_07":{"n":"우시아의 마도붓","t":"e","atk":12,"def":8,"r":{"rare_magic":1,"special_16":1},"tier":"준최종","effectText":"일반 탐색의 아이템 발견 확률 +5%","weaponType":"마도구"},"near_final_08":{"n":"티에스의 리볼버","t":"e","atk":12,"def":8,"r":{"gun":1,"special_21":1},"tier":"준최종","effectText":"치명타 확률 +3%","weaponType":"총"},"near_final_09":{"n":"유니온의 별봉","t":"e","atk":12,"def":8,"r":{"rare_magic":1,"special_22":1},"tier":"준최종","effectText":"전투 스킬 피해 +5%","weaponType":"마도구"},"near_final_10":{"n":"제니아의 성화부채","t":"e","atk":12,"def":8,"r":{"rare_magic":1,"special_25":1},"tier":"준최종","effectText":"가하는 제어 상태 지속시간 +5%","weaponType":"마도구"},"near_final_11":{"n":"이본느의 마법 꽃다발","t":"e","atk":12,"def":8,"r":{"rare_accessory":1,"special_26":1},"tier":"준최종","effectText":"소비 아이템 HP 회복 +5% · 휴식 HP 회복 +5%","weaponType":"마도구"},"near_final_12":{"n":"영령의 귀면","t":"e","atk":12,"def":8,"r":{"rare_mask":1,"special_31":1},"tier":"준최종","effectText":"공격 적중 시 6% 확률로 공포 5초"},"near_final_13":{"n":"샤를노아의 생체개조 도구","t":"e","atk":12,"def":16,"r":{"rare_tool":1,"special_32":1},"tier":"준최종","effectText":"소비 아이템 HP 회복 +5%","weaponType":"도구"},"near_final_14":{"n":"시즈쿠의 독극물 키트","t":"e","atk":12,"def":8,"r":{"rare_tool":1,"special_34":1},"tier":"준최종","effectText":"공격 적중 시 독 부여 +8% · 독 상태 대상 피해 +2%","weaponType":"도구"},"near_final_15":{"n":"메리앤의 마각 장식","t":"e","atk":5,"def":16,"r":{"rare_accessory":1,"special_36":1},"tier":"준최종","effectText":"휴식 SP 회복 +15%","weaponType":"장신구"},"near_final_16":{"n":"아브락사스의 하피 발톱","t":"e","atk":12,"def":8,"r":{"rare_special":1,"special_38":1},"tier":"준최종","effectText":"이동시간 -4% · 이동 후 8초 내 첫 공격 명중 +5%","weaponType":"특수무기"},"near_final_17":{"n":"아바돈의 포식구","t":"e","atk":12,"def":8,"r":{"rare_special":1,"special_40":1},"tier":"준최종","effectText":"적 처치 시 HP 6 회복 · 소비 아이템 HP 회복 +6%","weaponType":"특수무기"},"final_01":{"n":"앨리스의 백양산","t":"e","atk":30,"def":12,"r":{"rare_special":1,"special_01":1},"tier":"최종","effectText":"자신이 탐지될 확률 -4% · 8초 이상 비공격 후 다음 첫 적중 피해 +8%","weaponType":"특수무기"},"final_02":{"n":"크리스티나의 성철퇴","t":"e","atk":30,"def":12,"r":{"rare_blunt":1,"special_03":1},"tier":"최종","effectText":"전투 스킬 피해 +8% · 상태이상 대상에게 주는 피해 +4%","weaponType":"둔기"},"final_03":{"n":"기갑슈트 아레스","t":"e","atk":16,"def":28,"r":{"rare_armament":1,"special_04":1},"tier":"최종","effectText":"받는 전투 피해 -5% · HP 50% 미만 방어력 +6 · 이동 SP 소모 -1","weaponType":"병기"},"final_04":{"n":"에클레르의 흑색 대검","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_05":1},"tier":"최종","effectText":"같은 대상 연속 적중마다 피해 +2% (최대 +6%)","weaponType":"중량무기"},"final_05":{"n":"에클레어의 레이피어","t":"e","atk":30,"def":12,"r":{"blade":1,"special_06":1},"tier":"최종","effectText":"명중률 +5% · 공격 준비시간 -6% · 치명타 확률 +2%","weaponType":"검"},"final_06":{"n":"가브리엘의 성창","t":"e","atk":30,"def":12,"r":{"spear":1,"special_08":1},"tier":"최종","effectText":"전투 스킬 명중률 +4% · 전투 스킬 피해 +7%","weaponType":"창"},"final_07":{"n":"제니퍼의 대형 닻","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_11":1},"tier":"최종","effectText":"피해 +4% · 공격 적중 시 12% 확률로 둔화","weaponType":"중량무기"},"final_08":{"n":"라퓌셀의 백은 카타나","t":"e","atk":30,"def":12,"r":{"blade":1,"special_13":1},"tier":"최종","effectText":"공격 준비시간 -4% · 적 처치 시 HP 10 회복","weaponType":"검"},"final_09":{"n":"녹투아의 마검","t":"e","atk":30,"def":12,"r":{"blade":1,"special_15":1},"tier":"최종","effectText":"치명타 확률 +5% · 전투 스킬 피해 +4%","weaponType":"검"},"final_10":{"n":"파벨의 암기함","t":"e","atk":30,"def":12,"r":{"rare_throw":1,"special_17":1},"tier":"최종","effectText":"공격 적중 시 독 부여 +12% · 독 상태 대상 피해 +5%","weaponType":"투척무기"},"final_11":{"n":"키호테의 기사창","t":"e","atk":30,"def":12,"r":{"spear":1,"special_18":1},"tier":"최종","effectText":"이동 후 8초 내 첫 공격 명중 +8% / 피해 +8%","weaponType":"창"},"final_12":{"n":"리퍼의 대낫","t":"e","atk":30,"def":12,"r":{"rare_scythe":1,"special_19":1},"tier":"최종","effectText":"적 처치 시 HP 8 / SP 10 회복","weaponType":"낫"},"final_13":{"n":"스카디의 장궁","t":"e","atk":30,"def":12,"r":{"bow":1,"special_20":1},"tier":"최종","effectText":"플레이어 탐지 확률 +12% · 명중률 +5%","weaponType":"활"},"final_14":{"n":"베로니카의 양날대검","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_23":1},"tier":"최종","effectText":"주는 피해 +8% · 공격 준비시간 +5%","weaponType":"중량무기"},"final_15":{"n":"휘트니의 건틀릿","t":"e","atk":30,"def":12,"r":{"gauntlet":1,"special_24":1},"tier":"최종","effectText":"공격 준비시간 -10% · 같은 대상 3번째 적중 피해 +6%","weaponType":"권갑"},"final_16":{"n":"제타의 마법서","t":"e","atk":16,"def":28,"r":{"rare_grimoire":1,"special_27":1},"tier":"최종","effectText":"전투 스킬 SP 소모 -3 · 전투 스킬 피해 +7% · 상태이상 부여 확률 +3%","weaponType":"마법서"},"final_17":{"n":"네라뷸의 대검","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_28":1},"tier":"최종","effectText":"주는 피해 +5% · HP 40% 미만일 때 추가 피해 +7%","weaponType":"중량무기"},"final_18":{"n":"하나린의 비수","t":"e","atk":30,"def":12,"r":{"rare_dagger":1,"special_29":1},"tier":"최종","effectText":"자신이 탐지될 확률 -7% · 8초 이상 비공격 후 다음 첫 적중 피해 +12%","weaponType":"단검"},"final_19":{"n":"엠마의 전투 건틀릿","t":"e","atk":30,"def":12,"r":{"gauntlet":1,"special_30":1},"tier":"최종","effectText":"주는 피해 +3% · 치명타 확률 +6%","weaponType":"권갑"},"final_20":{"n":"나리 옌의 여의주","t":"e","atk":16,"def":28,"r":{"rare_magic":1,"special_33":1},"tier":"최종","effectText":"상태이상 부여 확률 +5% · 가하는 제어 지속시간 +10% · 받는 상태 지속시간 -10%","weaponType":"마도구"},"final_21":{"n":"릴리아의 기사 대검","t":"e","atk":30,"def":12,"r":{"rare_heavy":1,"special_35":1},"tier":"최종","effectText":"주는 피해 +9% · 공격 준비시간 +7%","weaponType":"중량무기"},"final_22":{"n":"량아 레하의 금속 카드","t":"e","atk":30,"def":12,"r":{"rare_throw":1,"special_37":1},"tier":"최종","effectText":"명중률 +4% · 공격 적중 시 10% 확률로 혼란","weaponType":"투척무기"},"final_23":{"n":"에덴의 전투검","t":"e","atk":30,"def":12,"r":{"blade":1,"special_39":1},"tier":"최종","effectText":"주는 피해 +4% · 공격 적중 시 10% 확률로 출혈","weaponType":"검"},"final_24":{"n":"천소의 팔완 촉수장치","t":"e","atk":30,"def":12,"r":{"rare_special":1,"special_41":1},"tier":"최종","effectText":"공격 적중 시 15% 확률로 추가타(기존 피해의 35%)","weaponType":"특수무기"},"wet_bread":{"n":"물에 젖은 빵","t":"c","tier":"고급","kind":"food","heal":12,"sp":14,"sat":22,"useTime":1.2,"combatEff":0.75,"r":{"bread":1,"water":1},"effectText":"HP +12 · SP +14 · 포만도 +22"},"chocolate_bread":{"n":"초콜릿 빵","t":"c","tier":"고급","kind":"food","heal":16,"sp":16,"sat":28,"useTime":1.2,"combatEff":0.75,"r":{"bread":1,"chocolate":1},"effectText":"HP +16 · SP +16 · 포만도 +28 · 20초간 이동시간 -5%","consumableBuff":{"fx":{"moveTime":-0.05},"duration":20}},"hearty_meal":{"n":"든든한 식사","t":"c","tier":"희귀","kind":"food","heal":40,"sp":20,"sat":40,"useTime":1.6,"combatEff":0.75,"r":{"sandwich":1,"warm_soup":1},"effectText":"HP +40 · SP +20 · 포만도 +40 · 40초간 최대 HP +12","consumableBuff":{"fx":{"maxHpFlat":12},"duration":40}}};
const POOLS={"city":["iron","glass","rubber","wire","battery","electronics","cloth","medicine","water","bread","canned","chocolate"],"estate":["silver","crystal","mana_ink","mana_fiber","cloth","leather","precision","chocolate"],"church":["silver","mana_stone","crystal","medicine","mana_ink","cloth","bread","water"],"factory":["iron","steel","alloy","machine","precision","wire","rubber","water","canned"],"mgmt_lobby":["iron","electronics","battery","cloth","glass","water","bread"],"mgmt_admin":["electronics","battery","precision","wire","machine"],"mgmt_director":["silver","crystal","mana_fiber","precision","leather","chocolate"],"mgmt_cafeteria":["bread","medicine","water","canned","chocolate"],"mgmt_lab":["medicine","toxin","electronics","precision","mana_stone","crystal","mana_ink","mana_fiber"],"mgmt_training":["iron","steel","wood","stick","leather","gunpowder","rubber"],"evil_reception":["mana_stone","crystal","cloth","iron","medicine","water","canned"],"evil_quarters":["silver","leather","mana_fiber","precision","mana_ink","chocolate"],"evil_training":["steel","alloy","wood","machine","gunpowder","toxin","rubber"]};
const WILD_TEMPLATES=[{"id":"wild_dog","n":"들개","hp":32,"atk":8,"def":4,"after":0,"regions":["city","estate"],"drop":["leather"],"skill":"bite_bleed","skillText":"물어뜯기: 반격 적중 시 20% 확률로 출혈"},{"id":"wild_crows","n":"까마귀 떼","hp":28,"atk":7,"def":2,"after":0,"regions":["city","church","estate"],"drop":["cloth","mana_fiber"],"skill":"harass","skillText":"난무: 25% 확률로 다음 공격 명중 -6%"},{"id":"wild_training_drone","n":"관리국 훈련 드론","hp":38,"atk":9,"def":7,"after":30,"regions":["mgmt_lobby","mgmt_training"],"drop":["electronics","machine"],"skill":"scan_delay","skillText":"전투 스캔: 20% 확률로 행동지연 10초"},{"id":"wild_scrap_drone","n":"폐기 전투 드론","hp":52,"atk":11,"def":11,"after":120,"regions":["factory","mgmt_lab"],"drop":["precision","battery"],"skill":"emp","skillText":"EMP: 20% 확률로 침묵 10초"},{"id":"wild_automaton","n":"폭주 오토마톤","hp":72,"atk":13,"def":18,"after":180,"regions":["factory","evil_training"],"drop":["steel","alloy"],"skill":"berserk","skillText":"과열: HP 40% 이하에서 공격력 25% 증가"},{"id":"wild_slime","n":"실험체 슬라임","hp":34,"atk":7,"def":3,"after":60,"regions":["mgmt_lab"],"drop":["medicine","toxin"],"skill":"toxic","skillText":"점액: 30% 확률로 독 1중첩"},{"id":"wild_chimera","n":"키메라","hp":78,"atk":14,"def":10,"after":300,"regions":["mgmt_lab","evil_training"],"drop":["toxin","mana_fiber"],"skill":"chimera_status","skillText":"불안정 변이: 30% 확률로 독/출혈/둔화 중 하나"},{"id":"wild_goblin","n":"고블린","hp":44,"atk":9,"def":6,"after":60,"regions":["city","factory","evil_reception"],"drop":["canned","iron","leather"],"skill":"pilfer","skillText":"약탈: 반격 적중 시 20% 확률로 SP 5 추가 감소"},{"id":"wild_jangsan","n":"장산범 잔영","hp":58,"atk":11,"def":8,"after":150,"regions":["estate","evil_quarters","church"],"drop":["mana_fiber","crystal"],"skill":"phantom_fear","skillText":"환청: 25% 확률로 공포 5초"},{"id":"wild_beast","n":"마수","hp":68,"atk":12,"def":12,"after":180,"regions":["church","estate","evil_reception"],"drop":["mana_stone","crystal","leather"],"skill":"mana_bite","skillText":"마력 포식: 반격 시 20% 확률로 SP 8 감소"},{"id":"wild_armored","n":"갑주 마물","hp":86,"atk":14,"def":22,"after":360,"regions":["evil_training","mgmt_training"],"drop":["steel","alloy"],"skill":"guard","skillText":"갑주: 첫 피격 피해 20% 감소"},{"id":"wild_supply_golem","n":"보급 수송 골렘","hp":92,"atk":10,"def":16,"after":240,"regions":["city","factory","mgmt_lobby","evil_reception"],"drop":["alloy","precision","battery","mana_stone"],"skill":"supply_cache","skillText":"보급 코어: 처치 시 추가 재료 2개 드롭"}];
const OFFLINE_RULES={"maxTime":900,"zoneTimes":[180,330,480,630,750]};
const ENCOUNTER_EVENTS=[{"id":"E001","region":"city","name":"버려진 보급품","type":"보급","condition":"일반 탐색","choices":[{"label":"바로 연다","result":"시간 +1초 / 일반재료 또는 음식 2~4개 / 15% 함정으로 HP -8"},{"label":"함정을 조사한다","result":"시간 +4초 / 함정 무효 / 일반재료 2~3개 + 고급재료 확률"},{"label":"표시만 해둔다","result":"즉시 종료 / 60초 동안 해당 이벤트 재등장 가중치 +50%"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"도심 대표 보급 이벤트"},{"id":"E002","region":"city","name":"우산꽂이의 흰 양산","type":"특수재료","condition":"백색 양산살이 아직 라운드에 존재하지 않을 때 우선","choices":[{"label":"살대를 분해한다","result":"백색 양산살 판정 / 실패 시 철조각+질긴 천"},{"label":"천부터 조사한다","result":"마력섬유 또는 질긴 천 / 특수재료 판정률 소폭 감소"},{"label":"그대로 둔다","result":"이벤트 종료 / 이후 같은 지역에서 특수이벤트 누적 +1"}],"special":"백색 양산살","noise":"낮음","rewardGrade":"특수","repeat":"라운드 1개","note":"이미 존재하면 보상은 마력섬유+질긴 천으로 대체"},{"id":"E003","region":"city","name":"골목의 거대한 깃털","type":"추적","condition":"일반 탐색","choices":[{"label":"바람의 흔적을 따라간다","result":"시간 +5초 / 하피의 깃털 판정 / 실패 시 마력섬유"},{"label":"깃털만 챙긴다","result":"질긴 천 또는 마력섬유 1개"},{"label":"주변을 살핀다","result":"다른 플레이어 흔적 탐지 + 이벤트 보상 포기"}],"special":"하피의 깃털","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"아브락사스 연계"},{"id":"E004","region":"city","name":"깨진 약국 셔터","type":"선택 보상","condition":"약품/도구 태그 보유 시 조건부 선택 활성","choices":[{"label":"강제로 들어간다","result":"시간 +3초 / 약품 2~3개 / 소음 큼"},{"label":"도구로 연다","result":"도구 보유 시 시간 +2초 / 약품 2개 + 희귀 약품 확률"},{"label":"포기한다","result":"위험 없음"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"도심 회복 보급"},{"id":"E005","region":"city","name":"버려진 승용차","type":"분해","condition":"일반 탐색","choices":[{"label":"배터리를 뜯는다","result":"배터리 1~2개 / 시간 +3초"},{"label":"엔진룸을 분해한다","result":"기계부품 또는 정밀부품 / 10% HP -6"},{"label":"트렁크를 연다","result":"음식/잡화/전자부품 중 1~2개"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"범용 파밍"},{"id":"E006","region":"city","name":"닫힌 무인점포","type":"보급","condition":"일반 탐색","choices":[{"label":"유리를 깨고 들어간다","result":"음식/음료 2~3개 / 소음 큼"},{"label":"뒷문을 찾는다","result":"시간 +5초 / 음식 2개 / 소음 없음"},{"label":"자판기만 조사한다","result":"생수·에너지드링크·초콜릿 중 1~2개"}],"special":"","noise":"높음","rewardGrade":"중","repeat":"반복 가능","note":"소모품 보충"},{"id":"E007","region":"estate","name":"잠겨 있는 인형방","type":"고급 보상","condition":"일반 탐색","choices":[{"label":"문을 강제로 연다","result":"HP -6 / 장신구·마력재료 2개"},{"label":"열쇠를 찾는다","result":"시간 +6초 / 안전하게 고급재료 2개"},{"label":"문틈만 조사한다","result":"저택 내 다음 이벤트 종류 미리 확인"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"고급재료 집중"},{"id":"E008","region":"estate","name":"멈춘 골동품 시계","type":"특수재료","condition":"정밀부품 보유 시 조건부 강화","choices":[{"label":"분해한다","result":"정밀부품 1개 + 고장 난 회중시계 부품 판정"},{"label":"정밀부품으로 수리한다","result":"정밀부품 1개 소비 / 특수재료 획득률 크게 상승"},{"label":"그대로 챙긴다","result":"장신구 계열 일반재료"}],"special":"고장 난 회중시계 부품","noise":"없음","rewardGrade":"특수","repeat":"반복 가능","note":"몽트르 연계"},{"id":"E009","region":"estate","name":"온실의 이상한 꽃","type":"특수재료","condition":"일반 탐색","choices":[{"label":"꽃잎만 채취한다","result":"마력이 깃든 꽃잎 판정 / 실패 시 약품 또는 마력섬유"},{"label":"뿌리째 뽑는다","result":"보상 2개 / 25% 독성 상태 8초"},{"label":"관찰한다","result":"다음 온실 이벤트 특수재료 확률 +30%"}],"special":"마력이 깃든 꽃잎","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"이본느 연계"},{"id":"E010","region":"estate","name":"오래된 활 보관함","type":"특수재료","condition":"일반 탐색","choices":[{"label":"활시위를 살핀다","result":"정밀 활시위 판정"},{"label":"목재를 분해한다","result":"강화목재 1~2개"},{"label":"통째로 가져간다","result":"활 계열 고급 아이템 확률"}],"special":"정밀 활시위","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"스카디 연계"},{"id":"E011","region":"estate","name":"비밀 서재","type":"정보","condition":"일반 탐색","choices":[{"label":"마도 서적을 읽는다","result":"특수 이벤트 발견 +1회 보정 / 마력잉크"},{"label":"값나가는 책을 챙긴다","result":"은괴·수정·장신구 재료 중 1개"},{"label":"숨겨진 서랍을 찾는다","result":"시간 +5초 / 고급장신구 재료 확률"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"정보+재료"},{"id":"E012","region":"estate","name":"디저트 카트","type":"음식","condition":"일반 탐색","choices":[{"label":"케이크를 먹는다","result":"HP +18 / 포만도 +25"},{"label":"포장한다","result":"케이크 소모품 1개 획득"},{"label":"홍차를 마신다","result":"SP +14 / 25초간 상태이상 지속 -5%"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"회복 루트"},{"id":"E013","region":"church","name":"금이 간 성유물함","type":"특수재료","condition":"일반 탐색","choices":[{"label":"기도문을 읽고 연다","result":"성흔이 새겨진 철편 또는 성창의 금빛 파편 판정"},{"label":"강제로 연다","result":"시간 +2초 / HP -5 / 은괴+마력석"},{"label":"마력 반응을 조사한다","result":"시간 +4초 / 다음 특수재료 판정 +25%"}],"special":"성흔이 새겨진 철편 / 성창의 금빛 파편","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"두 특수재료 중 하나"},{"id":"E014","region":"church","name":"버려진 부적 묶음","type":"특수재료","condition":"일반 탐색","choices":[{"label":"깨끗한 부적지를 고른다","result":"여우 문양 부적지 판정"},{"label":"전부 챙긴다","result":"마력잉크+질긴 천 / 낮은 확률 혼란 10초"},{"label":"태워 반응을 본다","result":"마력석 1개 / 다음 마도 이벤트 가중치 +20%"}],"special":"여우 문양 부적지","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"키츠네 연계"},{"id":"E015","region":"church","name":"비늘이 붙은 석상","type":"특수재료","condition":"비/번개 계열 환경 이벤트가 활성화되면 확률 상승","choices":[{"label":"비늘을 떼어낸다","result":"청룡의 비늘 판정"},{"label":"물을 끼얹는다","result":"시간 +3초 / 판정률 증가"},{"label":"석상 아래를 조사한다","result":"수정 또는 마력석"}],"special":"청룡의 비늘","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"나리 옌 연계"},{"id":"E016","region":"church","name":"구호물자 창고","type":"보급","condition":"일반 탐색","choices":[{"label":"식량 상자를 연다","result":"빵·수프·생수 2~3개"},{"label":"의약품 상자를 연다","result":"약품 1~2개"},{"label":"둘 다 뒤진다","result":"시간 +5초 / 위 둘에서 1개씩"}],"special":"","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"회복 중심"},{"id":"E017","region":"church","name":"고해실의 속삭임","type":"정보/위험","condition":"일반 탐색","choices":[{"label":"끝까지 듣는다","result":"다른 플레이어 한 명의 최근 지역 흔적 획득 / SP -5"},{"label":"문을 연다","result":"장신구 또는 마력재료 / 10% 공포 6초"},{"label":"무시한다","result":"이벤트 종료"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"정보전"},{"id":"E018","region":"church","name":"봉사자용 주방","type":"음식","condition":"일반 탐색","choices":[{"label":"수프를 데운다","result":"따뜻한 수프 획득"},{"label":"빵을 챙긴다","result":"빵 2개"},{"label":"약초차를 끓인다","result":"SP +10 / 공포·혼란 지속시간 -20%"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"안정적인 회복"},{"id":"E019","region":"factory","name":"멈춘 생산라인","type":"고급 재료","condition":"일반 탐색","choices":[{"label":"전원을 넣는다","result":"금속·기계 재료 3개 / 20% 폭주로 HP -10"},{"label":"수동 분해한다","result":"시간 +6초 / 금속·기계 재료 2개 확정"},{"label":"핵심부만 뜯는다","result":"특수합금 또는 정밀부품"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"고위험 고보상"},{"id":"E020","region":"factory","name":"잠긴 정비함","type":"고급 재료","condition":"도구 보유 시 강화","choices":[{"label":"비틀어 연다","result":"철조각+기계부품 / 10% 손상 HP -5"},{"label":"도구로 연다","result":"시간 +2초 / 정밀부품+고무"},{"label":"그대로 들고 간다","result":"도구 계열 고급 아이템 판정"}],"special":"","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"도구 시너지"},{"id":"E021","region":"factory","name":"부서진 대형 장비","type":"특수재료","condition":"일반 탐색","choices":[{"label":"제어코어를 해체한다","result":"아레스 나노코어 또는 주황색 건틀릿 코어 판정"},{"label":"장갑판을 뜯는다","result":"기사검 장갑판 판정 / 실패 시 강철판"},{"label":"외장만 분해한다","result":"강철판+특수합금"}],"special":"아레스 나노코어 / 기사검 장갑판 / 주황색 건틀릿 코어","noise":"높음","rewardGrade":"특수","repeat":"반복 가능","note":"기계계 특수재료 허브"},{"id":"E022","region":"factory","name":"압축기 사이의 상자","type":"위험 보급","condition":"일반 탐색","choices":[{"label":"빠르게 꺼낸다","result":"일반재료 3개 / 20% HP -8"},{"label":"기계를 멈춘다","result":"시간 +4초 / 안전 획득"},{"label":"버린다","result":"위험 없음"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"시간 대 위험 선택"},{"id":"E023","region":"factory","name":"용접 작업대","type":"제작 보조","condition":"금속 재료 2종 이상 보유","choices":[{"label":"즉석 가공한다","result":"다음 금속계 제작시간 -50%"},{"label":"부품을 챙긴다","result":"철사+철조각"},{"label":"불꽃을 크게 낸다","result":"특수합금 1개 / 소음 큼"}],"special":"","noise":"높음","rewardGrade":"중","repeat":"반복 가능","note":"제작 템포 지원"},{"id":"E024","region":"factory","name":"노동자 휴게실","type":"음식","condition":"일반 탐색","choices":[{"label":"자판기를 뒤진다","result":"생수·에너지드링크 중 1~2개"},{"label":"사물함을 연다","result":"통조림 또는 초콜릿"},{"label":"의자에서 쉰다","result":"SP +18 / 시간 +5초"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"폐공장 유지력"},{"id":"E025","region":"mgmt_lobby","name":"반납되지 않은 분실물함","type":"보급","condition":"일반 탐색","choices":[{"label":"장신구 칸을 본다","result":"장신구 재료 또는 소모품"},{"label":"전자기기 칸을 본다","result":"배터리·전자부품"},{"label":"전부 뒤진다","result":"시간 +4초 / 위 둘 중 2개"}],"special":"","noise":"낮음","rewardGrade":"중","repeat":"반복 가능","note":"초반 안정 보급"},{"id":"E026","region":"mgmt_lobby","name":"비상 보급 캐비닛","type":"보급","condition":"일반 탐색","choices":[{"label":"강제로 연다","result":"음식+약품 / 소음 중간"},{"label":"단말로 해제한다","result":"단말 태그 보유 시 고급 소모품 확률"},{"label":"봉인 스티커만 뜯는다","result":"일반재료 1개 / 빠름"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"관리국 진입 보급"},{"id":"E027","region":"mgmt_lobby","name":"방문객 안내 키오스크","type":"정보","condition":"일반 탐색","choices":[{"label":"지도 기록을 본다","result":"관리국 내 플레이어 흔적 한 번 탐지"},{"label":"부품을 뜯는다","result":"전자부품+배터리"},{"label":"로그를 삭제한다","result":"자신의 최근 관리국 흔적 제거"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"관리국 정보전"},{"id":"E028","region":"mgmt_lobby","name":"보안 검색대","type":"위험/정보","condition":"일반 탐색","choices":[{"label":"검색 장치를 켠다","result":"같은 관리국 내부의 금속 장비 보유자 존재 여부 탐지"},{"label":"분해한다","result":"기계부품+전자부품"},{"label":"우회한다","result":"이벤트 종료"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"감지형"},{"id":"E029","region":"mgmt_lobby","name":"자동판매기 고장","type":"음식","condition":"일반 탐색","choices":[{"label":"두드린다","result":"음료 1개 / 10% 소음"},{"label":"동전을 찾는다","result":"시간 +3초 / 음료 2개"},{"label":"분해한다","result":"배터리+철조각"}],"special":"","noise":"낮음","rewardGrade":"중","repeat":"반복 가능","note":"소모품"},{"id":"E030","region":"mgmt_lobby","name":"버려진 민원 서류","type":"정보","condition":"일반 탐색","choices":[{"label":"읽는다","result":"무작위 외부 지역 하나의 이벤트 가중치 +25% 60초"},{"label":"종이만 챙긴다","result":"마력잉크/질긴 천 대체재 판정"},{"label":"버린다","result":"이벤트 종료"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"다음 동선 유도"},{"id":"E031","region":"mgmt_admin","name":"켜져 있는 단말기","type":"특수재료/정보","condition":"일반 탐색","choices":[{"label":"검색한다","result":"다음 특수 이벤트 지역 힌트"},{"label":"해킹한다","result":"해킹 단말 칩 판정 / 실패 시 소음"},{"label":"전원부를 뜯는다","result":"전자부품+배터리"}],"special":"해킹 단말 칩","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"페더파일 연계"},{"id":"E032","region":"mgmt_admin","name":"미처 처리되지 않은 물자 요청서","type":"정보","condition":"일반 탐색","choices":[{"label":"훈련 물자 문서를 읽는다","result":"60초간 관리국 훈련장 무기재료 드롭 가중치 +20%"},{"label":"연구 물자 문서를 읽는다","result":"60초간 연구실 약품·마도 드롭 가중치 +20%"},{"label":"보급 문서를 찢어 챙긴다","result":"일반 재료 1개"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"지역 가중치 변동"},{"id":"E033","region":"mgmt_admin","name":"잠긴 서류 캐비닛","type":"보급","condition":"정밀부품 또는 도구 보유 시 강화","choices":[{"label":"자물쇠를 뜯는다","result":"정밀부품 또는 전자부품 / 소음"},{"label":"도구로 연다","result":"시간 +3초 / 고급 전자재료 2개"},{"label":"무시한다","result":"이벤트 종료"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"전자 제작"},{"id":"E034","region":"mgmt_admin","name":"야근자의 책상","type":"음식","condition":"일반 탐색","choices":[{"label":"커피를 마신다","result":"SP +18 / 30초 탐색시간 -5%"},{"label":"간식을 챙긴다","result":"초콜릿 또는 빵"},{"label":"서랍을 뒤진다","result":"배터리·전자부품 중 1개"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"행정실 유지력"},{"id":"E035","region":"mgmt_admin","name":"오작동하는 프린터","type":"재료","condition":"일반 탐색","choices":[{"label":"토너를 빼낸다","result":"마력잉크 대체재 1개 판정"},{"label":"기판을 뜯는다","result":"전자부품"},{"label":"수리한다","result":"시간 +4초 / 다음 행정실 탐색 1회 즉시 완료"}],"special":"","noise":"낮음","rewardGrade":"중","repeat":"반복 가능","note":"작은 템포 보상"},{"id":"E036","region":"mgmt_admin","name":"내부 메신저 기록","type":"정보","condition":"단말 태그 보유 시 강화","choices":[{"label":"최근 대화를 읽는다","result":"관리국 내 최근 전투 발생 층 표시"},{"label":"검색어로 찾는다","result":"특정 재료 카테고리의 추천 지역 표시"},{"label":"로그아웃한다","result":"자신의 정보 흔적 감소"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"정보 전문"},{"id":"E037","region":"mgmt_director","name":"잠긴 개인 서랍","type":"보급","condition":"일반 탐색","choices":[{"label":"자물쇠를 연다","result":"장신구 재료+커피"},{"label":"힘으로 뜯는다","result":"시간 짧음 / 소음 중간 / 고급재료 1개"},{"label":"그대로 둔다","result":"위험 없음"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"고급 보급"},{"id":"E038","region":"mgmt_director","name":"국장실 비상금고","type":"고위험 보상","condition":"일반 탐색","choices":[{"label":"비밀번호를 추측한다","result":"시간 +8초 / 은괴·특수합금·고급장신구 재료 2~3개"},{"label":"강제로 연다","result":"시간 +4초 / 소음 큼 / HP -5 가능 / 보상 3개"},{"label":"위치를 기억한다","result":"다음 금고 이벤트 성공률 +30%"}],"special":"","noise":"높음","rewardGrade":"특수","repeat":"반복 가능","note":"고급 보상 핵심"},{"id":"E039","region":"mgmt_director","name":"비서용 커피 스테이션","type":"음식","condition":"일반 탐색","choices":[{"label":"진한 커피를 만든다","result":"SP +25 / 30초 행동속도 +4% / 이후 SP회복 -10% 20초"},{"label":"일반 커피를 챙긴다","result":"커피 1개"},{"label":"각설탕만 챙긴다","result":"설탕 2개"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"버프 음식"},{"id":"E040","region":"mgmt_director","name":"파쇄되지 않은 기밀문서","type":"정보","condition":"일반 탐색","choices":[{"label":"읽는다","result":"무작위 플레이어 1명의 장비 등급 범위 확인"},{"label":"파쇄한다","result":"자신의 다음 피발견률 -5% 30초"},{"label":"종이만 챙긴다","result":"마력잉크 대체재 판정"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"정보전"},{"id":"E041","region":"mgmt_director","name":"고급 선물 바구니","type":"음식/보급","condition":"일반 탐색","choices":[{"label":"과자를 챙긴다","result":"초콜릿+케이크"},{"label":"포장재를 뜯는다","result":"질긴 천+장신구 재료"},{"label":"전부 챙긴다","result":"시간 +4초 / 음식 2개+재료 1개"}],"special":"","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"복합 보상"},{"id":"E042","region":"mgmt_director","name":"낡은 훈장 진열장","type":"장신구","condition":"일반 탐색","choices":[{"label":"훈장을 분해한다","result":"은괴 또는 장신구 재료"},{"label":"유리만 깬다","result":"유리조각+은괴 가능 / 소음"},{"label":"감정한다","result":"시간 +3초 / 가치 높은 보상만 획득"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"장신구 파밍"},{"id":"E043","region":"mgmt_cafeteria","name":"오늘의 남은 식사","type":"음식","condition":"일반 탐색","choices":[{"label":"바로 먹는다","result":"HP +16 / SP +8 / 포만도 +20"},{"label":"포장한다","result":"일반 식사 소모품 1개"},{"label":"재조리한다","result":"시간 +4초 / 고급 요리 1개"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"구내식당 핵심"},{"id":"E044","region":"mgmt_cafeteria","name":"냉장고 깊숙한 곳","type":"특수 음식","condition":"일반 탐색","choices":[{"label":"냉동칸을 뒤진다","result":"민트초코 붕어빵 낮은 확률 / 그 외 디저트"},{"label":"냉장칸을 뒤진다","result":"고기·우유·달걀·채소 2개"},{"label":"문을 닫는다","result":"이벤트 종료"}],"special":"","noise":"없음","rewardGrade":"특수","repeat":"반복 가능","note":"민트초코 붕어빵 등장"},{"id":"E045","region":"mgmt_cafeteria","name":"이상한 한정 메뉴","type":"특수 음식","condition":"매우 낮은 확률","choices":[{"label":"주문표대로 만든다","result":"카르보나라 파스타 민트초코 붕어빵(성심담 에디션) 획득"},{"label":"재료만 챙긴다","result":"고기+우유+빵"},{"label":"레시피를 외운다","result":"다음 구내식당 특수음식 이벤트 확률 +50%"}],"special":"","noise":"낮음","rewardGrade":"특수","repeat":"희귀 반복","note":"아바돈 특수반응 음식"},{"id":"E046","region":"mgmt_cafeteria","name":"남은 디저트 트레이","type":"음식","condition":"일반 탐색","choices":[{"label":"케이크를 챙긴다","result":"케이크 1개"},{"label":"초콜릿을 챙긴다","result":"초콜릿 1~2개"},{"label":"전부 먹는다","result":"HP +10 / SP +15 / 포만도 +25"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"빠른 회복"},{"id":"E047","region":"mgmt_cafeteria","name":"주방 창고","type":"음식 재료","condition":"일반 탐색","choices":[{"label":"탄수화물 상자","result":"쌀·감자·빵 중 2개"},{"label":"단백질 상자","result":"고기·달걀·우유 중 2개"},{"label":"조미료 상자","result":"소금·기름·설탕 중 2개"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"요리 빌드 핵심"},{"id":"E048","region":"mgmt_cafeteria","name":"고장난 자동조리기","type":"선택 보상","condition":"도구 또는 전자부품 보유 시 강화","choices":[{"label":"수리한다","result":"재료 2개를 무작위 고급요리로 변환"},{"label":"부품을 뜯는다","result":"전자부품+기계부품"},{"label":"강제로 돌린다","result":"고급요리 확률 / 20% 실패로 재료 소실"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"음식 제작 가속"},{"id":"E049","region":"mgmt_lab","name":"폐기 예정 실험 샘플","type":"특수재료","condition":"일반 탐색","choices":[{"label":"안전장비를 착용한다","result":"시간 +4초 / 키메라 조직 샘플·독사의 허물·탐식 기관 조직 중 판정"},{"label":"맨손으로 채취한다","result":"빠름 / 판정률 상승 / 25% 상태이상"},{"label":"폐기한다","result":"약품 1개 획득"}],"special":"키메라 조직 샘플 / 독사의 허물 / 탐식 기관 조직","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"생체 특수재료"},{"id":"E050","region":"mgmt_lab","name":"깨진 마법서 보관함","type":"특수재료","condition":"일반 탐색","choices":[{"label":"낱장을 모은다","result":"마법서의 백지 페이지 판정"},{"label":"잉크만 회수한다","result":"마력잉크 1~2개"},{"label":"봉인을 조사한다","result":"다음 마도 이벤트 가중치 +25%"}],"special":"마법서의 백지 페이지","noise":"없음","rewardGrade":"특수","repeat":"반복 가능","note":"제타 연계"},{"id":"E051","region":"mgmt_lab","name":"오염된 약품 선반","type":"약품","condition":"일반 탐색","choices":[{"label":"정상 라벨만 고른다","result":"약품 2개"},{"label":"전부 챙긴다","result":"약품+독성물질 / 20% 중독"},{"label":"성분을 분석한다","result":"시간 +3초 / 희귀 약품 확률"}],"special":"","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"독/회복"},{"id":"E052","region":"mgmt_lab","name":"격리된 마력 결정","type":"마도","condition":"일반 탐색","choices":[{"label":"차폐를 해제한다","result":"마력석+수정 / 소음 중간"},{"label":"조심스럽게 채취한다","result":"시간 +5초 / 마력석 2개"},{"label":"관찰만 한다","result":"다음 마도 제작 효과 +5% 1회"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"마도 제작"},{"id":"E053","region":"mgmt_lab","name":"실험 단말 로그","type":"정보","condition":"단말 태그 보유 시 강화","choices":[{"label":"최근 실험 기록","result":"현재 연구실 특수재료 후보 공개"},{"label":"보안 로그","result":"최근 연구실 방문 플레이어 흔적 확인"},{"label":"부품 회수","result":"정밀부품+전자부품"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"정보"},{"id":"E054","region":"mgmt_lab","name":"응급 세척 장치","type":"회복","condition":"상태이상 보유 시 우선 가치 상승","choices":[{"label":"전신 세척","result":"독 지속시간 50% 감소 · 출혈 중첩 50% 감소 / 시간 +4초"},{"label":"의약품만 챙긴다","result":"약품 1개"},{"label":"장치를 분해한다","result":"기계부품+고무"}],"special":"","noise":"낮음","rewardGrade":"중","repeat":"반복 가능","note":"상태이상 대응"},{"id":"E055","region":"mgmt_training","name":"부서진 검 훈련대","type":"특수재료","condition":"일반 탐색","choices":[{"label":"대검 부품을 찾는다","result":"흑색 대검 파편 또는 검붉은 검편 판정"},{"label":"세검 부품을 찾는다","result":"은빛 레이피어 파편 또는 백은 칼날 조각 판정"},{"label":"철만 회수한다","result":"철조각+강철판"}],"special":"흑색 대검 파편 / 검붉은 검편 / 은빛 레이피어 파편 / 백은 칼날 조각","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"검 계열"},{"id":"E056","region":"mgmt_training","name":"창 훈련대","type":"특수재료","condition":"일반 탐색","choices":[{"label":"창날을 조사한다","result":"기사창 파편 판정"},{"label":"장식 파편을 찾는다","result":"성창의 금빛 파편 보조 판정"},{"label":"목재를 회수한다","result":"강화목재+나무막대"}],"special":"기사창 파편","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"창 계열"},{"id":"E057","region":"mgmt_training","name":"사격장 잔해","type":"특수재료","condition":"일반 탐색","choices":[{"label":"리볼버 부품을 찾는다","result":"리볼버 실린더 판정"},{"label":"탄약을 회수한다","result":"화약 1~2개"},{"label":"표적장치를 뜯는다","result":"정밀부품+전자부품"}],"special":"리볼버 실린더","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"총 계열"},{"id":"E058","region":"mgmt_training","name":"훈련용 갑주 더미","type":"고급 재료","condition":"일반 탐색","choices":[{"label":"장갑판을 뜯는다","result":"강철판+특수합금"},{"label":"관절을 분해한다","result":"정밀부품+고무"},{"label":"통째로 넘어뜨린다","result":"재료 3개 / 소음 큼"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"방어 장비"},{"id":"E059","region":"mgmt_training","name":"탄약 보관함","type":"보급","condition":"일반 탐색","choices":[{"label":"안전하게 연다","result":"화약+기계부품"},{"label":"강제로 연다","result":"화약 2개 / 소음 큼"},{"label":"잠금장치만 뜯는다","result":"정밀부품 1개"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"총기 제작"},{"id":"E060","region":"mgmt_training","name":"훈련 기록 단말","type":"정보","condition":"일반 탐색","choices":[{"label":"무기 기록 확인","result":"현재 가장 많이 제작된 무기 태그 공개"},{"label":"대련 기록 확인","result":"최근 관리국 전투 흔적 공개"},{"label":"부품 회수","result":"전자부품+배터리"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"메타 정보"},{"id":"E061","region":"evil_reception","name":"놓고 간 선물상자","type":"위험 보급","condition":"일반 탐색","choices":[{"label":"바로 연다","result":"마력석·약품·소모품 2개 / 20% 함정"},{"label":"거리 두고 파괴한다","result":"일반재료 2개 / 특수보상 확률 낮음"},{"label":"함정을 해제한다","result":"시간 +5초 / 고급보상 2개"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"악의조직 입구 대표"},{"id":"E062","region":"evil_reception","name":"낙서 가득한 작전 지도","type":"정보","condition":"일반 탐색","choices":[{"label":"숙소 표시를 본다","result":"60초간 간부 숙소 특수이벤트 +25%"},{"label":"훈련장 표시를 본다","result":"60초간 악의조직 훈련장 특수이벤트 +25%"},{"label":"지도를 찢어 챙긴다","result":"질긴 천 대체재+마력잉크"}],"special":"","noise":"없음","rewardGrade":"상","repeat":"반복 가능","note":"동선 선택"},{"id":"E063","region":"evil_reception","name":"수상한 환영 명패","type":"마도","condition":"일반 탐색","choices":[{"label":"만진다","result":"수정 또는 마력석 / 15% 혼란"},{"label":"부순다","result":"마력석 1개 / 소음"},{"label":"관찰한다","result":"다음 환술/최면 계열 이벤트 위험 감소"}],"special":"","noise":"중간","rewardGrade":"중","repeat":"반복 가능","note":"영령/량아 분위기"},{"id":"E064","region":"evil_reception","name":"접객용 간식대","type":"음식","condition":"일반 탐색","choices":[{"label":"간식을 먹는다","result":"HP +10 / SP +8"},{"label":"포장한다","result":"초콜릿 또는 통조림"},{"label":"음료만 마신다","result":"SP +14"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"보급"},{"id":"E065","region":"evil_reception","name":"부서진 감시 카메라","type":"정보/재료","condition":"일반 탐색","choices":[{"label":"기록을 복구한다","result":"최근 접견실 출입 흔적 확인"},{"label":"부품을 뜯는다","result":"전자부품+정밀부품"},{"label":"카메라를 다른 방향으로 돌린다","result":"자신의 피발견률 -5% 30초"}],"special":"","noise":"없음","rewardGrade":"중","repeat":"반복 가능","note":"정보"},{"id":"E066","region":"evil_reception","name":"붉은 천막 뒤 통로","type":"위험 탐색","condition":"일반 탐색","choices":[{"label":"안쪽까지 들어간다","result":"고급재료 2~3개 / 20% 적대 NPC 조우"},{"label":"입구만 뒤진다","result":"일반재료 1~2개"},{"label":"표식을 남긴다","result":"다음 통로 이벤트 성공률 상승"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"NPC 연계 예정"},{"id":"E067","region":"evil_quarters","name":"하나린의 방","type":"특수재료","condition":"랜덤 간부방 이벤트","choices":[{"label":"검집을 조사한다","result":"월광 비수편 판정"},{"label":"차 도구를 뒤진다","result":"회복 음료+장신구 재료"},{"label":"조용히 나온다","result":"흔적을 남기지 않음"}],"special":"월광 비수편","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"하나린"},{"id":"E068","region":"evil_quarters","name":"메리앤의 방","type":"특수재료","condition":"랜덤 간부방 이벤트","choices":[{"label":"베개 주변을 찾는다","result":"몽마의 뿔조각 판정"},{"label":"사탕을 챙긴다","result":"사탕/초콜릿 2개"},{"label":"잠깐 눕는다","result":"SP +20 / 15% 수면 10초"}],"special":"몽마의 뿔조각","noise":"없음","rewardGrade":"특수","repeat":"반복 가능","note":"메리앤"},{"id":"E069","region":"evil_quarters","name":"량아 레하의 방","type":"특수재료","condition":"랜덤 간부방 이벤트","choices":[{"label":"금속 카드를 집는다","result":"마술사의 금속 카드 판정 / 최면 함정 가능"},{"label":"거울을 먼저 가린다","result":"시간 +3초 / 함정 무효 / 판정률 상승"},{"label":"마술도구만 챙긴다","result":"정밀부품+장신구 재료"}],"special":"마술사의 금속 카드","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"량아 레하"},{"id":"E070","region":"evil_quarters","name":"영령의 흔적","type":"특수재료","condition":"랜덤 간부방 이벤트","choices":[{"label":"털가죽 조각을 찾는다","result":"장산범의 털가죽 판정"},{"label":"냄새를 따라간다","result":"특수재료 판정 상승 / 피발견률 +10% 20초"},{"label":"문을 닫는다","result":"위험 없음"}],"special":"장산범의 털가죽","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"영령"},{"id":"E071","region":"evil_quarters","name":"아바돈의 식량 더미","type":"특수재료/음식","condition":"랜덤 간부방 이벤트","choices":[{"label":"이상한 조직을 조사한다","result":"탐식 기관 조직 보조 판정"},{"label":"먹을 만한 것만 챙긴다","result":"음식 2개"},{"label":"전부 뒤진다","result":"음식 3개 / 15% 상태이상"}],"special":"탐식 기관 조직","noise":"낮음","rewardGrade":"상","repeat":"반복 가능","note":"아바돈"},{"id":"E072","region":"evil_quarters","name":"간부 공용 보관함","type":"고급 보급","condition":"일반 탐색","choices":[{"label":"무기 칸","result":"특수합금·정밀부품"},{"label":"장신구 칸","result":"은괴·마력섬유"},{"label":"소모품 칸","result":"에너지드링크·초콜릿"}],"special":"","noise":"중간","rewardGrade":"상","repeat":"반복 가능","note":"숙소 공용"},{"id":"E073","region":"evil_training","name":"피 묻은 건틀릿 더미","type":"특수재료","condition":"일반 탐색","choices":[{"label":"가장 큰 조각을 찾는다","result":"미노타우로스 건틀릿 편 판정"},{"label":"금속만 회수한다","result":"특수합금+강철판"},{"label":"고무 패드를 뜯는다","result":"고무+가죽"}],"special":"미노타우로스 건틀릿 편","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"엠마"},{"id":"E074","region":"evil_training","name":"기사 훈련 갑주","type":"특수재료","condition":"일반 탐색","choices":[{"label":"흉갑을 분해한다","result":"기사장의 갑주편 판정"},{"label":"검집을 조사한다","result":"붉은 검집 장식 판정"},{"label":"철판만 뜯는다","result":"강철판 2개"}],"special":"기사장의 갑주편 / 붉은 검집 장식","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"릴리아/에덴"},{"id":"E075","region":"evil_training","name":"붉은 대검 거치대","type":"특수재료","condition":"일반 탐색","choices":[{"label":"대검 잔해를 찾는다","result":"붉은 대검 파편 판정"},{"label":"강철 프레임을 뜯는다","result":"강철판+특수합금"},{"label":"훈련용 검을 챙긴다","result":"검 계열 고급 무기 확률"}],"special":"붉은 대검 파편","noise":"중간","rewardGrade":"특수","repeat":"반복 가능","note":"네라뷸"},{"id":"E076","region":"evil_training","name":"암기 훈련 표적","type":"특수재료","condition":"일반 탐색","choices":[{"label":"박힌 암기를 뽑는다","result":"당문 암기편 판정"},{"label":"표적 뒤를 조사한다","result":"독성물질+질긴 천"},{"label":"전부 떼어낸다","result":"투척재료 2개 / 시간 +4초"}],"special":"당문 암기편","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"파벨"},{"id":"E077","region":"evil_training","name":"부러진 대낫","type":"특수재료","condition":"일반 탐색","choices":[{"label":"날을 분해한다","result":"검은 낫날 조각 판정"},{"label":"자루를 뜯는다","result":"강화목재+철조각"},{"label":"통째로 가져간다","result":"낫 계열 고급 무기 확률"}],"special":"검은 낫날 조각","noise":"낮음","rewardGrade":"특수","repeat":"반복 가능","note":"리퍼"},{"id":"E078","region":"evil_training","name":"개조 실험대","type":"고위험 제작","condition":"도구/정밀부품 보유 시 강화","choices":[{"label":"안전하게 개조한다","result":"다음 장비 제작시간 -50%"},{"label":"출력을 올린다","result":"특수합금 또는 고급재료 2개 / 20% HP -8"},{"label":"부품만 챙긴다","result":"정밀부품+기계부품"}],"special":"","noise":"높음","rewardGrade":"상","repeat":"반복 가능","note":"후반 제작 가속"}];
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
__modules["src/game_data.js"]=(()=>{
// Server-side core data synchronized from public/offline.html v0.6.4.
const CHARACTERS=[{"id":"c01","name":"서노리","passive":"모형정원의 주인","combat":"정원 재현","action":"정원 설치","arch":"zone","baseHp":100,"baseSp":112,"baseAtk":7.6,"baseDef":2,"preferredWeapon":"특수무기","startProf":20,"passiveEffectText":"정원 지역에서 탐색 아이템 발견률 +30% · 휴식 HP/SP 회복 +35%","combatEffectText":"피해 150% · 행동지연 대상 200% · 속박 대상 250%(우선) · 재사용 60초","actionEffectText":"현재 지역을 30초간 정원으로 변경 · 지역 내 적에게 인형(공격력/방어력 -10%, 중복 불가) · 설치 시 지역 내 모든 적에게 속박 5초 및 행동지연 10초 각각 기본 100% 확률로 부여(상대 저항 적용) · 디버프 부여 시 적 캐릭터 발견"},{"id":"c02","name":"이하령","passive":"거짓부렁","combat":"허언","action":"거짓 흔적","arch":"control","baseHp":102,"baseSp":116,"baseAtk":8,"baseDef":2,"preferredWeapon":"마도구","startProf":10,"passiveEffectText":"자신이 탐지될 확률 -20% · 공격 적중 시 20% 확률로 혼란 부여","combatEffectText":"피해 90% · 55% 혼란 10초 · 30% 침묵 10초","actionEffectText":"18초간 피탐지 -20% · 다음 플레이어 탐지 +20%"},{"id":"c03","name":"라헬","passive":"신성력","combat":"성역","action":"축복","arch":"sustain","baseHp":106,"baseSp":118,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"둔기","startProf":20,"passiveEffectText":"소비 아이템 HP 회복 +20% · 받는 상태이상 지속시간 -20%","combatEffectText":"피해 70% · 자신 HP 14 회복","actionEffectText":"HP 12 회복 · 독/출혈 중 1개 제거"},{"id":"c04","name":"유채원","passive":"나노머신 적응","combat":"전투 프로토콜","action":"장비 스캔","arch":"adaptive","baseHp":106,"baseSp":104,"baseAtk":8.1,"baseDef":3,"preferredWeapon":"병기","startProf":35,"passiveEffectText":"받는 전투 피해 -20% · HP 40% 미만일 때 주는 피해 +20%","combatEffectText":"피해 115% · HP 50% 미만이면 130%","actionEffectText":"20초간 방어 +3 · 다음 전투스킬 SP -2"},{"id":"c05","name":"레이안","passive":"흑색괴뢰","combat":"감각공유: 포착","action":"괴뢰 탐색","arch":"mark","baseHp":100,"baseSp":108,"baseAtk":8.3,"baseDef":2,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"플레이어 탐지 확률 +20% · 명중률 +20%","combatEffectText":"피해 110% · 대상을 30초 추적 표식 · 명중 +15%","actionEffectText":"다음 플레이어 탐지 +18% · 25초간 플레이어 탐지 +20%"},{"id":"c06","name":"레이아","passive":"백색섬뢰","combat":"섬광 돌진","action":"감각공유: 추적","arch":"mobility","baseHp":99,"baseSp":106,"baseAtk":8.4,"baseDef":2,"preferredWeapon":"검","startProf":35,"passiveEffectText":"이동시간 -20% · 이동 후 8초 내 첫 공격 명중 +20%","combatEffectText":"피해 125% · 명중 +20%","actionEffectText":"다음 지역 이동 SP 0 · 12초간 이동시간 -20%"},{"id":"c07","name":"이시아","passive":"아바타","combat":"접속 방해","action":"원격 접속","arch":"scout","baseHp":98,"baseSp":120,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"단말","startProf":20,"passiveEffectText":"플레이어 탐지 확률 +20% · 전투스킬 SP 소모 -1","combatEffectText":"피해 90% · 60% 침묵 10초","actionEffectText":"SP 12 회복 · 다음 플레이어 탐지 +20%"},{"id":"c08","name":"정수아","passive":"정령술","combat":"정령 소환","action":"정령 탐문","arch":"utility","baseHp":98,"baseSp":118,"baseAtk":7.6,"baseDef":2,"preferredWeapon":"창","startProf":20,"passiveEffectText":"가하는 제어 상태 지속시간 +20% · 휴식 SP 회복 +20%","combatEffectText":"피해 100% · 40% 둔화 · 자신 SP 6 회복","actionEffectText":"SP 10 회복 · 20초간 상태이상 부여율 +15%"},{"id":"c09","name":"박다희","passive":"모발 은폐","combat":"시야 봉쇄","action":"모발 감지","arch":"stealth","baseHp":100,"baseSp":114,"baseAtk":8.4,"baseDef":1,"preferredWeapon":"마도구","startProf":10,"passiveEffectText":"자신이 탐지될 확률 -20%","combatEffectText":"피해 95% · 50% 혼란 10초","actionEffectText":"20초간 피탐지 -15%"},{"id":"c10","name":"민하율","passive":"뷰어쉽","combat":"라이브 스테이지","action":"팬서비스","arch":"growth","baseHp":98,"baseSp":116,"baseAtk":7.6,"baseDef":1,"preferredWeapon":"특수무기","startProf":10,"passiveEffectText":"120초마다 기본 공격력 +0.5 (최대 +3)","combatEffectText":"피해 100% + 경기 120초마다 5% 증가(최대 20%)","actionEffectText":"SP 8 회복 · 20초간 치명타 +15%"},{"id":"c11","name":"남이비","passive":"하얀물결","combat":"닻 투척","action":"닻 고정","arch":"brawl","baseHp":102,"baseSp":98,"baseAtk":8,"baseDef":3,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"주는 피해 +20% · 이동 SP 소모 -1","combatEffectText":"피해 130% · 45% 둔화 10초","actionEffectText":"12초간 이동 SP -2 · 다음 공격 피해 +15%"},{"id":"c12","name":"유여울","passive":"여우불","combat":"부적 폭발","action":"부적진 설치","arch":"trap","baseHp":100,"baseSp":116,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"상태이상 부여 확률 +20% · 공격 적중 시 20% 확률로 둔화","combatEffectText":"피해 115% · 45% 출혈 1중첩","actionEffectText":"현재 지역에 부적진 설치 · 다음 플레이어 탐지 시 명중 +20%"},{"id":"c13","name":"하쿠","passive":"치유의 빛","combat":"응급 치유","action":"치료 준비","arch":"sustain","baseHp":106,"baseSp":120,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"검","startProf":20,"passiveEffectText":"소비 아이템 HP 회복 +20% · 휴식 HP 회복 +20%","combatEffectText":"피해 60% · 자신 HP 20 회복","actionEffectText":"HP 16 회복 · 출혈 2중첩 제거"},{"id":"c14","name":"윤가람","passive":"스톱워치","combat":"시간 지연","action":"시간 측정","arch":"tempo","baseHp":98,"baseSp":110,"baseAtk":8.3,"baseDef":1,"preferredWeapon":"장신구","startProf":20,"passiveEffectText":"일반 공격 준비시간 -20% · 스킬 재사용 대기시간 감소 속도 +20%","combatEffectText":"피해 95% · 55% 행동지연 10초","actionEffectText":"전투스킬 CD 12초 감소 · 추가행동 CD 6초 환급"},{"id":"c15","name":"하 린","passive":"초감각","combat":"감각 폭주","action":"흔적 청취","arch":"track","baseHp":100,"baseSp":108,"baseAtk":8,"baseDef":2,"preferredWeapon":"검","startProf":35,"passiveEffectText":"플레이어 탐지 확률 +20% · 부상당한 적 추가 탐지 +20%","combatEffectText":"피해 120% · 45% 공포 5초","actionEffectText":"다음 플레이어 탐지 +20% · 20초간 부상자 탐지 +20%"},{"id":"c16","name":"양서희","passive":"묘화실체","combat":"전투 묘화","action":"대체 묘화","arch":"craft","baseHp":100,"baseSp":118,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"마도구","startProf":10,"passiveEffectText":"제작시간 -20% · 탐색 아이템 발견률 +20%","combatEffectText":"피해 105% · 35% 확률로 독/출혈/둔화 중 하나","actionEffectText":"철조각 1개 획득 · 다음 제작시간 -20%"},{"id":"c17","name":"당소하","passive":"독공","combat":"비전 독살","action":"독 조제","arch":"poison","baseHp":100,"baseSp":118,"baseAtk":8.2,"baseDef":1,"preferredWeapon":"투척무기","startProf":35,"passiveEffectText":"공격 적중 시 독 부여 +20% · 독 상태 대상 피해 +20%","combatEffectText":"피해 100% · 독 2중첩 확정","actionEffectText":"해독제 1개 생성 시도 · 20초간 독 부여율 +20%"},{"id":"c18","name":"이유진","passive":"로시난테","combat":"초월기동 돌격","action":"초월기동","arch":"mobility","baseHp":101,"baseSp":106,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"창","startProf":35,"passiveEffectText":"이동시간 -20% · 이동 후 8초 내 첫 공격 피해 +20%","combatEffectText":"피해 135% · 명중 +15%","actionEffectText":"다음 이동 SP 0 · 이동 후 첫 공격 피해 +20%"},{"id":"c19","name":"그림","passive":"혼령주술","combat":"혼령 베기","action":"혼령 수확","arch":"corpse","baseHp":101,"baseSp":110,"baseAtk":8.1,"baseDef":2,"preferredWeapon":"낫","startProf":35,"passiveEffectText":"적 처치 시 HP 4 / SP 5 회복","combatEffectText":"피해 125% · 40% 출혈 · 처치 시 추가 HP 6","actionEffectText":"현재 지역 시체가 있으면 HP 15 회복 · 없으면 SP 8 회복"},{"id":"c20","name":"하츠","passive":"천리안","combat":"저격","action":"관측","arch":"sniper","baseHp":95,"baseSp":108,"baseAtk":8.3,"baseDef":1,"preferredWeapon":"활","startProf":35,"passiveEffectText":"플레이어 탐지 +20% · 명중 +20% · 전투스킬 명중 +20%","combatEffectText":"피해 155% · 명중 +20% · 재사용 72초","actionEffectText":"다음 플레이어 탐지 +25% · 다음 공격 명중 +20%"},{"id":"c21","name":"란한서","passive":"가속","combat":"오버클럭","action":"퀵로드","arch":"tempo","baseHp":98,"baseSp":110,"baseAtk":8.2,"baseDef":1,"preferredWeapon":"총","startProf":35,"passiveEffectText":"공격 준비시간 -20% · 이동시간 -20%","combatEffectText":"피해 120% · 준비시간 짧음 · 치명타 +20%","actionEffectText":"SP 8 회복 · 16초간 공격 준비시간 -20%"},{"id":"c22","name":"임루나","passive":"슈팅스타","combat":"별의 낙하","action":"별빛 추적","arch":"mark","baseHp":100,"baseSp":108,"baseAtk":8,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"명중률 +20% · 치명타 확률 +20%","combatEffectText":"피해 125% · 35% 행동지연","actionEffectText":"20초간 명중 +15% · 플레이어 탐지 +20%"},{"id":"c23","name":"서유라","passive":"의지의 방패","combat":"방패 전개","action":"방어 자세","arch":"bruiser","baseHp":108,"baseSp":100,"baseAtk":7.8,"baseDef":4,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"받는 전투 피해 -20% · HP 50% 미만 방어력 +4","combatEffectText":"피해 80% · 자신 HP 8 회복 · 8초간 받는 피해 -20%","actionEffectText":"20초간 받는 전투 피해 -20%"},{"id":"c24","name":"나세라","passive":"부분증강","combat":"강제 증강","action":"증강 재조정","arch":"adaptive","baseHp":104,"baseSp":104,"baseAtk":8,"baseDef":3,"preferredWeapon":"권갑","startProf":35,"passiveEffectText":"HP 50% 미만 방어력 +3 · HP 40% 미만 피해 +20%","combatEffectText":"피해 120% · HP 50% 미만이면 140%","actionEffectText":"HP 8 회복 · 20초간 저체력 방어 보정 +4"},{"id":"c25","name":"케르테","passive":"천운","combat":"행운 편향","action":"길조 확인","arch":"luck","baseHp":100,"baseSp":116,"baseAtk":8.3,"baseDef":1,"preferredWeapon":"마도구","startProf":10,"passiveEffectText":"치명타 확률 +20% · 탐색 아이템 발견률 +20%","combatEffectText":"피해 90~145% 무작위 · 치명타 +15%","actionEffectText":"무작위: HP 10 / SP 12 / 다음 치명타 +20% 중 하나"},{"id":"c26","name":"이 연","passive":"식물조작","combat":"덩굴 급속성장","action":"씨앗 심기","arch":"zone","baseHp":101,"baseSp":112,"baseAtk":7.8,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"휴식 HP 회복 +20% · 상태이상 부여 확률 +20%","combatEffectText":"피해 105% · 45% 속박","actionEffectText":"HP 6 회복 · 18초간 상태이상 부여율 +15%"},{"id":"c27","name":"백유설","passive":"랜덤 캐스트","combat":"무작위 주문","action":"페이지 넘기기","arch":"random","baseHp":98,"baseSp":122,"baseAtk":8.4,"baseDef":1,"preferredWeapon":"마법서","startProf":20,"passiveEffectText":"전투스킬 위력 계수가 매 사용마다 변동 · 치명타 확률 +20%","combatEffectText":"피해 85~145% 무작위 · 무작위 상태이상 25%","actionEffectText":"SP 14 회복 · 다음 전투스킬 피해 +20%"},{"id":"c28","name":"권세림","passive":"절대영역","combat":"영역 봉쇄","action":"영역 지정","arch":"control","baseHp":102,"baseSp":116,"baseAtk":7.8,"baseDef":3,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"받는 상태이상 지속시간 -20% · 받는 전투 피해 -20%","combatEffectText":"피해 90% · 55% 속박 · 35% 침묵","actionEffectText":"20초간 받는 상태이상 지속시간 -20% · 피탐지 -15%"},{"id":"c29","name":"비비","passive":"계약 조항","combat":"계약 집행","action":"조항 변경","arch":"predict","baseHp":102,"baseSp":116,"baseAtk":8.3,"baseDef":2,"preferredWeapon":"투척무기","startProf":20,"passiveEffectText":"전투스킬 SP 소모 -1 · 받는 상태이상 지속시간 -20%","combatEffectText":"피해 105% · 대상 SP 10 감소","actionEffectText":"SP 10 회복 · 다음 전투스킬 SP -3"},{"id":"c30","name":"하와","passive":"완전기억","combat":"전투 분석","action":"기록 대조","arch":"analysis","baseHp":102,"baseSp":116,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"단말","startProf":20,"passiveEffectText":"플레이어 탐지 +20% · 숙련도 획득량 +20%","combatEffectText":"피해 110% · 대상 현재 방어의 15% 무시","actionEffectText":"25초간 숙련도 획득 +25% · 플레이어 탐지 +15%"},{"id":"c31","name":"김예화","passive":"메탈리카","combat":"금속 변형","action":"금속 재성형","arch":"metal","baseHp":104,"baseSp":104,"baseAtk":8,"baseDef":3,"preferredWeapon":"병기","startProf":35,"passiveEffectText":"주는 피해 +20% · 기본 방어력 +2","combatEffectText":"피해 130% · 35% 출혈","actionEffectText":"철조각 또는 강철판 1개 획득 · 18초간 방어 +2"},{"id":"c32","name":"이아엘","passive":"식물 연금","combat":"연금 독무","action":"즉석 조제","arch":"alchemy","baseHp":102,"baseSp":118,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"도구","startProf":20,"passiveEffectText":"소비 아이템 HP 회복 +20% · 공격 적중 시 독 부여 +20%","combatEffectText":"피해 100% · 45% 독 · 30% 둔화","actionEffectText":"약품 1개 획득 · HP 6 회복"},{"id":"c33","name":"나루","passive":"재액의 징조","combat":"재액 전가","action":"위험 탐색","arch":"risk","baseHp":100,"baseSp":108,"baseAtk":8,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"HP 40% 미만 피해 +20% · 플레이어 탐지 +20%","combatEffectText":"피해 135% · 자신도 HP 4 소모","actionEffectText":"HP 5 소모 · 다음 탐색 아이템 발견률 +18% · 다음 공격 피해 +20%"},{"id":"c34","name":"린","passive":"방향 학습","combat":"벡터 반전","action":"벡터 가속","arch":"counter","baseHp":100,"baseSp":108,"baseAtk":8,"baseDef":2,"preferredWeapon":"특수무기","startProf":35,"passiveEffectText":"받는 전투 피해 -20% · 같은 대상 연속 적중마다 피해 +20% (최대 +80%)","combatEffectText":"피해 120% · 35% 행동지연","actionEffectText":"20초간 받는 피해 -15% · 다음 공격 명중 +15%"},{"id":"c35","name":"엘린","passive":"술식 해석","combat":"파훼","action":"사전 분석","arch":"dispel","baseHp":102,"baseSp":118,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"받는 상태이상 지속시간 -20% · 전투스킬 명중 +20%","combatEffectText":"피해 100% · 대상의 상태이상 1개 제거 후 제거 시 피해 +15%","actionEffectText":"자신의 상태이상 1개 제거 · 18초간 상태이상 저항 +15%"},{"id":"c36","name":"리금애","passive":"불가시화","combat":"암습","action":"광학 소거","arch":"assassin","baseHp":94,"baseSp":106,"baseAtk":8.7,"baseDef":1,"preferredWeapon":"단검","startProf":35,"passiveEffectText":"자신이 탐지될 확률 -20% · 8초 비공격 후 첫 적중 피해 +20%","combatEffectText":"피해 145% · 8초 이상 비공격 상태였다면 추가 +20%","actionEffectText":"20초간 피탐지 -18% · 다음 공격 피해 +20%"},{"id":"c37","name":"네라뷸","passive":"윤회전생","combat":"전생의 전투기억","action":"기억 회상","arch":"revive","baseHp":100,"baseSp":112,"baseAtk":8.2,"baseDef":3,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"경기당 1회 치명 피해를 받으면 HP 18로 부활","combatEffectText":"피해 125% · HP 40% 미만이면 145%","actionEffectText":"HP 8 회복 · 이미 부활을 소모했다면 추가 HP 8 회복"},{"id":"c38","name":"하나린","passive":"검성","combat":"월광 기습","action":"결투 준비","arch":"duel","baseHp":98,"baseSp":106,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"단검","startProf":35,"passiveEffectText":"명중 +20% · 치명타 +20% · 주는 피해 +20%","combatEffectText":"피해 140% · 명중 +15% · 치명타 +20%","actionEffectText":"18초간 명중 +15% · 치명타 +15%"},{"id":"c39","name":"엠마","passive":"증폭","combat":"과부하","action":"출력 충전","arch":"brute","baseHp":104,"baseSp":98,"baseAtk":8,"baseDef":3,"preferredWeapon":"권갑","startProf":35,"passiveEffectText":"주는 피해 +20% · 받는 전투 피해 +20%","combatEffectText":"피해 150% · 자신 HP 6 소모","actionEffectText":"HP 4 소모 · 18초간 주는 피해 +20%"},{"id":"c40","name":"영령","passive":"환술","combat":"장산범의 울음","action":"환영 흔적","arch":"fear","baseHp":101,"baseSp":118,"baseAtk":7.9,"baseDef":2,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"공격 적중 시 공포 부여 +20% · 가하는 제어 지속시간 +20%","combatEffectText":"피해 100% · 공포 확정 5초","actionEffectText":"20초간 플레이어 탐지 +20% · 다음 공격 공포 부여 +20%"},{"id":"c41","name":"샤를노아","passive":"키메라 적응","combat":"강제변이","action":"조직 채취","arch":"status","baseHp":104,"baseSp":112,"baseAtk":7.8,"baseDef":3,"preferredWeapon":"도구","startProf":20,"passiveEffectText":"받는 상태이상 지속시간 -20% · HP 50% 미만 방어력 +2","combatEffectText":"피해 115% · 독/출혈/둔화 중 2개를 각각 50%","actionEffectText":"HP 8 회복 · 18초간 받는 상태이상 지속시간 -15%"},{"id":"c42","name":"나리 옌","passive":"용안","combat":"청룡의 압박","action":"용안 관찰","arch":"control","baseHp":100,"baseSp":116,"baseAtk":7.6,"baseDef":2,"preferredWeapon":"마도구","startProf":35,"passiveEffectText":"플레이어 탐지 +20% · 상태이상 부여 확률 +20%","combatEffectText":"피해 110% · 45% 속박 · 35% 공포","actionEffectText":"다음 플레이어 탐지 +20% · 18초간 상태이상 부여율 +15%"},{"id":"c43","name":"시즈쿠","passive":"요르문간드","combat":"맹독 주입","action":"독극물 농축","arch":"poison","baseHp":100,"baseSp":118,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"도구","startProf":35,"passiveEffectText":"공격 적중 시 독 부여 +20% · 독 상태 대상 피해 +20%","combatEffectText":"피해 105% · 독 3중첩 확정","actionEffectText":"독성물질 1개 획득 · 20초간 독 부여율 +20%"},{"id":"c44","name":"릴리아","passive":"괴력","combat":"기사장의 일격","action":"중량 자세","arch":"tank","baseHp":112,"baseSp":96,"baseAtk":7.2,"baseDef":5,"preferredWeapon":"중량무기","startProf":35,"passiveEffectText":"주는 피해 +20% · 받는 전투 피해 -20% · 공격 준비시간 +20%","combatEffectText":"피해 150% · 준비시간 +20% · 명중 +15%","actionEffectText":"18초간 받는 피해 -20% · 이동시간 +20%"},{"id":"c45","name":"메리앤","passive":"꿈구름","combat":"악몽 유도","action":"몽마의 안개","arch":"sleep","baseHp":100,"baseSp":120,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"마도구","startProf":20,"passiveEffectText":"공격 적중 시 수면 부여 +20% · 가하는 제어 지속시간 +20%","combatEffectText":"피해 85% · 65% 수면 10초","actionEffectText":"SP 10 회복 · 20초간 수면 부여율 +20%"},{"id":"c46","name":"량아 레하","passive":"미스디렉션","combat":"최면 유도","action":"암시 심기","arch":"deception","baseHp":100,"baseSp":120,"baseAtk":8.1,"baseDef":1,"preferredWeapon":"투척무기","startProf":20,"passiveEffectText":"자신이 탐지될 확률 -20% · 공격 적중 시 혼란 부여 +20%","combatEffectText":"피해 95% · 65% 혼란 10초","actionEffectText":"20초간 피탐지 -20% · 다음 공격 혼란 부여 +20%"},{"id":"c47","name":"아브락사스","passive":"이상향","combat":"하피 급습","action":"비상","arch":"mobility","baseHp":99,"baseSp":106,"baseAtk":8.2,"baseDef":2,"preferredWeapon":"특수무기","startProf":35,"passiveEffectText":"이동시간 -20% · 이동 SP -1 · 이동 후 첫 공격 명중 +20%","combatEffectText":"피해 135% · 명중 +20% · 사용 후 다음 이동 SP 0","actionEffectText":"다음 이동 SP 0 · 15초간 이동시간 -20%"},{"id":"c48","name":"에덴","passive":"붉은 사슬","combat":"사슬 구속","action":"사슬 표식","arch":"bind","baseHp":100,"baseSp":112,"baseAtk":7.7,"baseDef":3,"preferredWeapon":"검","startProf":35,"passiveEffectText":"공격 적중 시 속박 부여 +20% · 가하는 제어 지속시간 +20%","combatEffectText":"피해 105% · 속박 확정 2.5초","actionEffectText":"20초간 속박 부여율 +20% · 다음 공격 명중 +15%"},{"id":"c49","name":"아바돈","passive":"벨제부브","combat":"폭식 충동","action":"포식","arch":"devour","baseHp":102,"baseSp":96,"baseAtk":7.8,"baseDef":3,"preferredWeapon":"특수무기","startProf":35,"passiveEffectText":"적 처치 시 HP 8 회복 · 소비 아이템 HP 회복 +20%","combatEffectText":"피해 130% · 준 피해의 20%만큼 HP 회복","actionEffectText":"현재 지역 시체가 있으면 HP 18 회복, 시체 1개 소모 · 없으면 HP 6 회복"},{"id":"c50","name":"천소","passive":"운디네의 순환","combat":"수형변환","action":"수류 이동","arch":"utility","baseHp":98,"baseSp":118,"baseAtk":7.5,"baseDef":2,"preferredWeapon":"특수무기","startProf":20,"passiveEffectText":"휴식 SP 회복 +20% · 받는 상태이상 지속시간 -20%","combatEffectText":"피해 115% · 40% 둔화 · 사용 후 SP 5 회복","actionEffectText":"HP 6 / SP 10 회복 · 상태이상 1개 제거"},{"id":"c51","name":"백은설","passive":"마법어 수집","combat":"즉흥 영창","action":"마법어 정리","arch":"keyword","baseHp":98,"baseSp":122,"baseAtk":8.3,"baseDef":1,"preferredWeapon":"마법서","startProf":20,"passiveEffectText":"숙련도 획득량 +20% · 상태이상 부여 확률 +20%","combatEffectText":"피해 110~135% 무작위 · 30% 확률로 무작위 제어 상태","actionEffectText":"SP 12 회복 · 25초간 숙련도 획득 +30% · 상태이상 부여율 +15%"},{"id":"c52","name":"{user}","passive":"테스트 캐릭터","combat":"테스트 스킬: 상대 즉사","action":"테스트 스킬: 모든 디버프","arch":"test","baseHp":100,"baseSp":100,"baseAtk":8,"baseDef":2,"preferredWeapon":"특수무기","startProf":20,"testOnly":true,"passiveEffectText":"무적 · 전투·독·출혈·환경 피해 및 즉사 면역","combatEffectText":"조우한 상대 즉사 · 명중 판정 및 부활 무시 · 무적 대상 제외","actionEffectText":"모든 디버프 9종을 자신에게 각각 1중첩 부여"}];
const REGIONS=[{"id":"city","name":"텅 빈 도심"},{"id":"estate","name":"서노리의 저택"},{"id":"church","name":"교회"},{"id":"factory","name":"폐공장"},{"id":"mgmt_lobby","name":"관리국 1층 로비"},{"id":"mgmt_admin","name":"관리국 2층 행정실"},{"id":"mgmt_director","name":"관리국 3층 비서실&국장실"},{"id":"mgmt_cafeteria","name":"관리국 지하1층 구내식당"},{"id":"mgmt_lab","name":"관리국 지하3층 연구실"},{"id":"mgmt_training","name":"관리국 지하5층 훈련장"},{"id":"evil_reception","name":"악의조직 접견실"},{"id":"evil_quarters","name":"악의조직 간부 개인숙소 층"},{"id":"evil_training","name":"악의조직 훈련장"}];
const EDGES=[["city","estate"],["city","church"],["city","factory"],["city","mgmt_lobby"],["city","evil_reception"],["estate","church"],["factory","evil_reception"],["evil_reception","evil_quarters"],["evil_reception","evil_training"],["evil_quarters","evil_training"],["mgmt_lobby","mgmt_admin"],["mgmt_lobby","mgmt_director"],["mgmt_lobby","mgmt_cafeteria"],["mgmt_lobby","mgmt_lab"],["mgmt_lobby","mgmt_training"],["mgmt_admin","mgmt_director"],["mgmt_admin","mgmt_cafeteria"],["mgmt_admin","mgmt_lab"],["mgmt_admin","mgmt_training"],["mgmt_director","mgmt_cafeteria"],["mgmt_director","mgmt_lab"],["mgmt_director","mgmt_training"],["mgmt_cafeteria","mgmt_lab"],["mgmt_cafeteria","mgmt_training"],["mgmt_lab","mgmt_training"]];

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
  return{playerId:`p${index+1}`,sessionId:session.sessionId,playerName:session.playerName,charId:c.id,region,maxHp:c.baseHp,maxSp:c.baseSp,hp:c.baseHp,sp:c.baseSp,satiety:100,alive:true,kills:0,eq:[],mat:{},con:{},statuses:{},proficiency,encounter:null,pendingAction:null,rev:false,isAI:false,ai:null,lastFoodId:null,lastFoodAt:0,foodRepeatCount:0,delayedEffects:[],lastAttackAt:0,lastMoveAt:0,moveHitReady:false,attackChainTarget:null,attackChainHits:0,namedChainTarget:null,namedChainHits:0,nextHitBonus:0,nextDamageBonus:0,nextSkillDamageBonus:0,nextCritBonus:0,nextDetectBonus:0,nextSearchLootBonus:0,nextSkillSpDiscount:0,nextCraftTimeMult:1,nextStatusBonus:{},tempGuardUntil:0,tempGuardRate:0,lastDetectedTarget:null,redetectReady:false,trackingMarks:{},detoxStealthUntil:0};
}

function createAIPlayer(index,charId,region,profile="balanced"){
  const c=CHARACTER_BY_ID.get(charId)||CHARACTERS[0],proficiency={};
  if(c.preferredWeapon)proficiency[c.preferredWeapon]=c.startProf||0;
  return{playerId:`p${index+1}`,sessionId:null,playerName:c.name,charId:c.id,region:isValidRegion(region)?region:"city",maxHp:c.baseHp,maxSp:c.baseSp,hp:c.baseHp,sp:c.baseSp,satiety:100,alive:true,kills:0,eq:[],mat:{},con:{},statuses:{},proficiency,encounter:null,pendingAction:null,rev:false,isAI:true,ai:profile,lastFoodId:null,lastFoodAt:0,foodRepeatCount:0,delayedEffects:[],lastAttackAt:0,lastMoveAt:0,moveHitReady:false,attackChainTarget:null,attackChainHits:0,namedChainTarget:null,namedChainHits:0,nextHitBonus:0,nextDamageBonus:0,nextSkillDamageBonus:0,nextCritBonus:0,nextDetectBonus:0,nextSearchLootBonus:0,nextSkillSpDiscount:0,nextCraftTimeMult:1,nextStatusBonus:{},tempGuardUntil:0,tempGuardRate:0,lastDetectedTarget:null,redetectReady:false,trackingMarks:{},detoxStealthUntil:0};
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
  const fields=['playerId','playerName','charId','region','maxHp','maxSp','hp','sp','satiety','alive','kills','statuses','buffs','proficiency','pendingAction','pendingPickup','enemyContacts','enemyTraceSeq','enemyTraceNotices','gardenDetectionSeq','gardenDetectionNotices','rev','isAI','intel','nearbyNoise','atk','def','cdC','cdA','cdCUntil','cdAUntil','cdCDuration','cdADuration','tempEffects','inventory','diedAt','finishRank','deathSource'];
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

const NAMED_GEAR_FX={
  near_final_01:{hit:.02,crit:.02},
  near_final_02:{detect:.06},
  near_final_03:{conceal:.05},
  near_final_04:{skillSpFlat:2},
  near_final_05:{statusChance:.04},
  near_final_06:{prep:-.03,moveTime:-.03},
  near_final_07:{searchLoot:.05},
  near_final_08:{crit:.03},
  near_final_09:{skillDamage:.05},
  near_final_10:{statusDuration:.05},
  near_final_11:{heal:.05,restHeal:.05},
  near_final_12:{fearChance:.06},
  near_final_13:{heal:.05},
  near_final_14:{poisonChance:.08,poisonVsDamage:.02},
  near_final_15:{restSp:.15},
  near_final_16:{moveTime:-.04,afterMoveHit:.05},
  near_final_17:{killHeal:6,heal:.06},

  final_01:{conceal:.04,quietDamage:.08},
  final_02:{skillDamage:.08,statusTargetDamage:.04},
  final_03:{taken:-.05,lowDef:6,moveSp:1},
  final_04:{chainPerHit:.02,chainMax:.06},
  final_05:{hit:.05,prep:-.06,crit:.02},
  final_06:{skillHit:.04,skillDamage:.07},
  final_07:{damage:.04,slowChance:.12},
  final_08:{prep:-.04,killHeal:10},
  final_09:{crit:.05,skillDamage:.04},
  final_10:{poisonChance:.12,poisonVsDamage:.05},
  final_11:{afterMoveHit:.08,afterMoveDamage:.08},
  final_12:{killHeal:8,killSp:10},
  final_13:{detect:.12,hit:.05},
  final_14:{damage:.08,prep:.05},
  final_15:{prep:-.10,thirdHit:.06},
  final_16:{skillSpFlat:3,skillDamage:.07,statusChance:.03},
  final_17:{damage:.05,lowHpDamage:.07},
  final_18:{conceal:.07,quietDamage:.12},
  final_19:{damage:.03,crit:.06},
  final_20:{statusChance:.05,statusDuration:.10,incomingStatusDuration:-.10},
  final_21:{damage:.09,prep:.07},
  final_22:{hit:.04,confusionChance:.10},
  final_23:{damage:.04,bleedChance:.10},
  final_24:{extraChance:.15,extraRatio:.35}
};

return {PASSIVE_FX,COMBAT_SKILL_DEFS,ACTION_SKILL_DEFS,NAMED_GEAR_FX};
})();
__modules["src/match_engine.js"]=(()=>{
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
const char=p=>CHARACTER_BY_ID.get(p.charId)||CHARACTER_BY_ID.get("c01");
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
  for(const id of p.eq||[]){
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
  return out;
}
function maxHp(p,match,now=Date.now()){return Math.max(1,p.maxHp+(tempFx(p,match,now).maxHpFlat||0))}
function equipmentAtk(p){return (p.eq||[]).reduce((s,id)=>s+(item(id)?.atk||0),0)}
function equipmentDef(p){return (p.eq||[]).reduce((s,id)=>s+(item(id)?.def||0),0)}
function atk(p,match,now=Date.now()){
  let v=char(p).baseAtk+equipmentAtk(p),fx=combinedFx(p,match,now);
  if(fx.timeAtk&&fx.timeAtkEvery)v+=Math.min(fx.timeAtkCap??Infinity,Math.floor(nowSec(match,now)/fx.timeAtkEvery)*fx.timeAtk);
  return v*(enemyGarden(match,p,now)?.9:1);
}
function def(p,match,now=Date.now()){
  let v=char(p).baseDef+equipmentDef(p);
  const fx=combinedFx(p,match,now);
  v+=fx.defFlat||0;
  if(p.hp/maxHp(p,match,now)<.5)v+=fx.lowDef||0;
  return Math.max(0,v)*(enemyGarden(match,p,now)?.9:1);
}
function incomingMult(p,match,now=Date.now()){
  const fx=combinedFx(p,match,now);
  let m=1+(fx.damageTaken||0)+(fx.taken||0);
  if((p.eq||[]).includes("plate")&&p.hp/maxHp(p,match,now)>=.5)m*=.97;
  if(p.tempGuardUntil>now)m*=1-(p.tempGuardRate||0);
  return Math.max(.25,m);
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
function applyStatus(p,id,stacks=1,duration=null,sourceId=null,now=Date.now(),source=null,match=null){
  p.statuses??={};const defn=STATUS_DEFS[id];if(!defn)return false;
  if((p.statusImmunity?.[id]||0)>now)return false;
  const targetFx=match?combinedFx(p,match,now):{};
  const resist=clamp((targetFx.statusResist||0)+(id==="actionDelay"?(targetFx.delayResist||0):0),0,1);
  if(resist>0&&Math.random()<resist)return false;
  let dur=id==="poison"?(duration??defn.duration):defn.duration;
  if(source&&match&&["slow","bind","sleep","fear","confusion","silence","actionDelay"].includes(id)){
    if((source.eq||[]).includes("spell_amp"))dur*=1.06;
    dur*=1+(combinedFx(source,match,now).statusDuration||0);
  }
  if(targetFx.incomingStatusDuration)dur*=Math.max(.5,1+targetFx.incomingStatusDuration);
  if(id==="poison"&&(p.eq||[]).includes("detox"))dur*=.80;
  const old=p.statuses[id];
  if(id==="bind"&&old?.until>now){
    old.until=Math.min(now+dur*1000,old.until+1000);
    old.startedAt=now;old.durationMs=old.until-now;
    if(sourceId!=null)old.sourceId=sourceId;
    return true;
  }
  p.statuses[id]={stacks:clamp((old&&old.stacks>0&&(old.until===null||old.until>now)?old.stacks:0)+stacks,1,defn.max),until:id==="bleed"?null:now+dur*1000,startedAt:now,durationMs:id==="bleed"?null:dur*1000,sourceId};
  return true;
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
    if(kfx.killHeal)killer.hp=clamp(killer.hp+kfx.killHeal,0,maxHp(killer,match,now));
    if(kfx.killSp)recoverSp(killer,kfx.killSp,match,now);
  }
  createDeathCorpse(match,victim,now);
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
  if(ticks>0){p.satiety=clamp((p.satiety??100)-ticks*5,0,100);p.lastSatietyAt=(p.lastSatietyAt||match.startedAt)+ticks*20000}
}
function applyStatusTicks(match,p,now){
  p.nextStatusTick??=match.startedAt;
  while(p.alive&&p.nextStatusTick+2000<=now){
    p.nextStatusTick+=2000;
    const poison=p.statuses?.poison;
    if(poison?.until>p.nextStatusTick){
      const damage=damagePlayer(p,Math.max(1,Math.round(maxHp(p,match,p.nextStatusTick)*.02*(poison.stacks||1))));
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
  for(const w of match.wilds||[])if(w.statuses)cleanseExpired(w,now);
  for(const p of match.players){
    if(!p.alive)continue;
    const activeNoises=(match.noises||[]).filter(x=>x.expiresAt>now);
    if(activeNoises.length||p.heardNoiseIds?.length){
    p.heardNoiseIds=(p.heardNoiseIds||[]).filter(id=>activeNoises.some(x=>x.id===id));
    for(const x of activeNoises)if(x.playerId!==p.playerId&&x.region===p.region&&!p.heardNoiseIds.includes(x.id)){
      rememberIncoming(p,{playerId:x.playerId},x.playerName,x.createdAt,"noise");p.heardNoiseIds.push(x.id);
    }
    }
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
  let hitBonus=(p.nextHitBonus||0)+(skill?(fx.skillHit||0):0);
  if((p.eq||[]).includes("aim_terminal")&&tid&&(p.trackingMarks?.[tid]||0)>now)hitBonus+=.05;
  if((p.eq||[]).includes("propulsion")&&p.moveHitReady&&now-(p.lastMoveAt||0)<=8000)hitBonus+=.04;
  if((p.eq||[]).includes("trace")&&p.redetectReady&&p.lastDetectedTarget===tid)hitBonus+=.04;
  if(p.moveHitReady&&now-(p.lastMoveAt||0)<=8000)hitBonus+=fx.afterMoveHit||0;
  const ctx={tid,quietReady,movedRecently:now-(p.lastMoveAt||0)<=8000,hitBonus,actionDamageBonus:p.nextDamageBonus||0,skillDamageBonus:0,actionCritBonus:p.nextCritBonus||0};
  p.nextHitBonus=0;p.nextDamageBonus=0;p.nextCritBonus=0;p.lastAttackAt=now;
  if(p.moveHitReady)p.moveHitReady=false;if(p.redetectReady)p.redetectReady=false;
  return ctx;
}
function modifyAttackDamage(match,p,target,d,ctx,now){
  const fx=combinedFx(p,match,now);
  if(p.attackChainTarget===ctx.tid)p.attackChainHits=(p.attackChainHits||0)+1;else{p.attackChainTarget=ctx.tid;p.attackChainHits=1}
  if(p.namedChainTarget===ctx.tid)p.namedChainHits=(p.namedChainHits||0)+1;else{p.namedChainTarget=ctx.tid;p.namedChainHits=1}
  let mult=1+(fx.damage||0)+(ctx.actionDamageBonus||0);
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
    const base=fx[key+"Chance"]||0;if(base&&Math.random()<chance(key,base))applyStatus(target,id,1,id==="poison"?8:id==="bleed"?10:id==="slow"?6:id==="bind"?2.5:id==="sleep"?3:5,p.playerId,now,p,match);
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
  if(!p.alive||!w.alive)return 0;
  const t=wildTemplate(w),d=damagePlayer(p,wildDamage(p,w,match,now));recordCombatNotice(match,w,p,d,'반격',now);if(d>0)wakeOnDamage(p,now);
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
function clearOneNegativeStatus(p,now=Date.now()){
  for(const id of Object.keys(p.statuses||{})){if(status(p,id,now)){delete p.statuses[id];return true}}
  return false;
}
function applySkillSelfEffects(match,p,sd,damageDealt=0,killed=false,now=Date.now()){
  const fx=combinedFx(p,match,now);
  if(sd.heal)p.hp=clamp(p.hp+sd.heal,0,maxHp(p,match,now));
  if(sd.restoreSp)recoverSp(p,sd.restoreSp,match,now);
  if(sd.selfDamage){damagePlayer(p,sd.selfDamage);if(p.hp<=0)environmentDeath(match,p,now,false,null,"스킬 반동")}
  if(sd.freeMove)p.nextMoveFree=true;
  if(sd.lifesteal&&damageDealt>0)p.hp=clamp(p.hp+damageDealt*sd.lifesteal,0,maxHp(p,match,now));
  if(sd.killHeal&&killed)p.hp=clamp(p.hp+sd.killHeal,0,maxHp(p,match,now));
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
    gainProf(p,.5,match,now);p.attackChainTarget=t.playerId;p.attackChainHits=0;
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
  if(skill&&sd.execute)d=t.hp;d=damagePlayer(t,d);recordCombatNotice(match,p,t,d,skill?'전투 스킬':'일반 공격',now);if(d>0)wakeOnDamage(t,now);recordBattle(match,p,t,now);gainProf(p,1.5,match,now);

  if(skill){
    for(const row of sd.statuses||[]){
      const[id,chance,dur,stacks=1]=row,finalChance=clamp(chance+(fx.statusChance||0),0,.95);
      if(Math.random()<finalChance)applyStatus(t,id,stacks,dur||null,p.playerId,now,p,match);
    }
    if(sd.forcePoison)applyStatus(t,"poison",sd.forcePoison,8,p.playerId,now,p,match);
    if(sd.randomStatus&&Math.random()<clamp(.35+(fx.statusChance||0),0,.95))applyStatus(t,pick(["poison","bleed","slow"]),1,null,p.playerId,now,p,match);
    if(sd.doubleRandomStatus)for(const id of pick([["poison","bleed"],["poison","slow"],["bleed","slow"]]))if(Math.random()<clamp(.50+(fx.statusChance||0),0,.95))applyStatus(t,id,1,null,p.playerId,now,p,match);
    if(sd.randomControl&&Math.random()<clamp(sd.randomControl+(fx.statusChance||0),0,.95))applyStatus(t,pick(["slow","bind","fear","confusion","silence"]),1,null,p.playerId,now,p,match);
    if(sd.drainSp)t.sp=Math.max(0,t.sp-sd.drainSp);
    if(sd.mark){p.trackingMarks??={};p.trackingMarks[t.playerId]=now+sd.mark*1000}
  }

  if((p.eq||[]).includes("toxin_kit")&&Math.random()<clamp(.06+(combinedFx(p,match,now).statusChance||0),0,.95))applyStatus(t,"poison",1,8,p.playerId,now,p,match);
  applyOnHitStatuses(match,p,t,now);
  const death=t.hp<=0?killPlayer(match,p,t,now,!!(skill&&sd.execute)):null,killed=!!death?.killed;
  if(skill)applySkillSelfEffects(match,p,sd,d,killed,now);
  if(killed){
    const kfx=combinedFx(p,match,now);
    if(kfx.killHeal)p.hp=clamp(p.hp+kfx.killHeal,0,maxHp(p,match,now));
    if(kfx.killSp)recoverSp(p,kfx.killSp,match,now);
  }
  const bleedDamage=triggerBleedAction(match,p,now);
  return {ok:true,hit:true,crit,damage:d,death,dispelled,bleedDamage};
}
function attackWild(match,p,w,skill=false,now=Date.now()){
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
    recordCombatNotice(match,p,w,0,skill?'전투 스킬':'일반 공격',now,false);
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
  w.hp-=d;recordCombatNotice(match,p,w,d,skill?'전투 스킬':'일반 공격',now);gainProf(p,1.5,match,now);

  let drop=null,extra=[],killed=false;
  if(w.hp<=0){
    killed=true;w.alive=false;w.hp=0;drop=pick(t.drop);if(!addItem(p,drop)&&item(drop)?.t==="e")offerEquipment(match,p,drop);
    if(t.skill==="supply_cache")for(let i=0;i<2;i++){const x=pick(t.drop);if(addItem(p,x)||(item(x)?.t==="e"&&offerEquipment(match,p,x)))extra.push(x)}
    const kfx=combinedFx(p,match,now);
    if(kfx.killHeal)p.hp=clamp(p.hp+kfx.killHeal,0,maxHp(p,match,now));
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
  p.sp=Math.max(0,p.sp-3);
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
  if(it.heal)p.hp=clamp(p.hp+it.heal*healMult,0,maxHp(p,match,now));
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
    dropSpecialsFromPlayer(match,p,p.region);p.eq=[];
    for(const mid of Object.keys(p.mat||{}))if(!isSpecialMaterial(mid))delete p.mat[mid];
    p.con={};
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
function charAction(match,p,now){
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
        const applied=Math.random()<clamp(d.gardenStatusChance??1,0,1)&&applyStatus(q,id,1,null,p.playerId,now,p,match);
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
    for(const id of Object.keys(STATUS_DEFS)){delete p.statusImmunity[id];applyStatus(p,id,1,null,p.playerId,now,null,match)}
  }
  if(d.heal)p.hp=clamp(p.hp+d.heal,0,maxHp(p,match,now));
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
      p.hp=clamp(p.hp+(d.corpseHeal||0),0,maxHp(p,match,now));
      if(d.consumeCorpse)match.corpses.splice(match.corpses.indexOf(corpse),1);
    }else{
      if(d.noCorpseSp)recoverSp(p,d.noCorpseSp,match,now);
      if(d.noCorpseHeal)p.hp=clamp(p.hp+d.noCorpseHeal,0,maxHp(p,match,now));
    }
  }

  if(d.healIfRevUsed&&p.rev)p.hp=clamp(p.hp+d.healIfRevUsed,0,maxHp(p,match,now));
  if(d.reduceCombatCd)p.cdCUntil=Math.max(now,(p.cdCUntil||now)-d.reduceCombatCd*1000);
  if(d.refundActionCd)p.cdAUntil=Math.max(now,p.cdAUntil-d.refundActionCd*1000);
  if(d.luckAction){
    const r=Math.random();
    if(r<.34)p.hp=clamp(p.hp+10,0,maxHp(p,match,now));
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
  const aura=gardenAuras(match,p,now);
  return {...p,statuses:{...p.statuses,...aura.statuses},buffs:aura.buffs,inGarden:(match.regionGardens?.[p.region]?.until||0)>now,enemyContacts:p.enemyContacts?.[p.region]||[],nearbyNoise:nearbyNoiseFor(match,p,now),maxHp:maxHp(p,match,now),atk:atk(p,match,now),def:def(p,match,now),cdC:Math.max(0,((p.cdCUntil||0)-now)/1000),cdA:Math.max(0,((p.cdAUntil||0)-now)/1000),
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
  if(status(p,"actionDelay",now))sec*=1.25;
  return sec;
}
function validateAction(match,p,type,payload={},now=Date.now()){
  if(now<match.startedAt)return {ok:false,error:"match_starting"};
  updatePassiveTime(match,now);
  if(p?.encounter&&!encounterTarget(match,p))p.encounter=null;
  if(!p?.alive)return {ok:false,error:"player_not_active"};if(p.pendingAction)return {ok:false,error:"action_in_progress"};if(status(p,"sleep",now))return {ok:false,error:"asleep"};
  if(p.pendingPickup)return {ok:false,error:"pickup_choice_required"};
  if(p.pendingEvent)return {ok:false,error:"event_choice_required"};
  if(type!=="attack"&&type!=="skill"&&type!=="flee"&&p.encounter&&type!=="use_item")return {ok:false,error:"encounter_in_progress"};
  if(type==="move"){if(isRegionLocked(match,payload.to))return {ok:false,error:"region_locked"};if(status(p,"bind",now))return {ok:false,error:"bound"};if(!ADJACENCY[p.region]?.includes(payload.to))return {ok:false,error:"invalid_move"};const mv=movementProfile(p.region,payload.to),cost=p.nextMoveFree?0:Math.max(0,mv.spCost-(combinedFx(p,match,now).moveSp||0));if(p.sp<cost)return {ok:false,error:"not_enough_sp"};return {ok:true,meta:{...mv,spCost:cost}}}
  if(type==="search"&&p.sp<3)return {ok:false,error:"not_enough_sp"};
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
    const fx=combinedFx(p,match,now),cost=Math.max(0,(sd.sp??12)*((p.eq||[]).includes("focus") ? .95 : 1)*(1+(fx.skillSp||0))-(fx.skillSpFlat||0)-(p.nextSkillSpDiscount||0));
    if(status(p,"silence",now))return {ok:false,error:"silenced"};
    if((p.cdCUntil||0)>now)return {ok:false,error:"skill_cooldown"};
    if(p.sp<cost)return {ok:false,error:"not_enough_sp"};
  }
  if(type==="char_action"){
    const d=ACTION_SKILL_DEFS[p.charId];if(!d)return {ok:false,error:"action_missing"};
    if((p.cdAUntil||0)>now)return {ok:false,error:"action_cooldown"};
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
  p.pendingAction={type,payload,startedAt:now,completeAt:now+duration*1000,meta:{...meta,...(requestedType!==type?{requestedType}: {})}};
  return {ok:true,action:p.pendingAction};
}
function completeAction(match,p,now=Date.now()){
  updateRegionRestrictions(match,now);
  const a=p.pendingAction;if(!a||a.completeAt>now)return null;
  if(!p.alive){p.pendingAction=null;return {ok:false,error:"player_not_active",type:a.type}}
  p.pendingAction=null;
  const type=a.type,x=a.payload||{},observed=encounterTarget(match,p),actionRegion=p.region;let result={ok:true,type};
  if(type==="move"){p.region=x.to;p.sp=Math.max(0,p.sp-(a.meta?.spCost||0));p.lastMoveAt=now;const fx=combinedFx(p,match,now);p.moveHitReady=(p.eq||[]).includes("propulsion")||!!(fx.afterMoveHit||fx.afterMoveDamage);p.nextMoveFree=false;p.encounter=null;for(const q of match.players)if(q!==p&&q.encounter?.kind==="player"&&q.encounter.targetId===p.playerId)q.encounter=null;result.to=x.to;result.bleedDamage=triggerBleedAction(match,p,now)}
  else if(type==="search"){const mods=cleanupEventMods(p,now);if(mods.instantSearchRegion===p.region)mods.instantSearchRegion=null;result={...result,...searchResult(match,p,now)};}
  else if(type==="event_choice"){p.pendingEvent=x.eventId;result={...result,...resolveEventChoice(match,p,x.index,now)}}
  else if(type==="rest"){const fx=combinedFx(p,match,now),recoveryMult=(p.eq||[]).includes("recovery")?1.05:1;p.hp=clamp(p.hp+5*recoveryMult*(1+(fx.restHeal||0)),0,maxHp(p,match,now));recoverSp(p,12*(1+(fx.restSp||0)),match,now)}
  else if(type==="craft"){result={...result,...craftItem(match,p,x.id,x)};p.nextCraftTimeMult=1}
  else if(type==="use_item")result={...result,...useConsumable(match,p,x.id,now)}
  else if(type==="attack"){const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,false,now):attackWild(match,p,t.obj,false,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="skill"){const t=encounterTarget(match,p);result=t?(t.kind==="player"?attackPlayer(match,p,t.obj,true,now):attackWild(match,p,t.obj,true,now)):{ok:false,error:"target_lost"};p.encounter=null}
  else if(type==="flee"){result.success=true;p.encounter=null;if((p.eq||[]).includes("evasion"))p.nextMoveFree=true}
  else if(type==="char_action")result={...result,...charAction(match,p,now)};
  else if(type==="loot_corpse")result={...result,...lootCorpse(match,p,x.corpseId,x.kind,x.id,x.qty||1,!!x.replace,now)};
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
    const n=+m[2]*(m[1]==="-"?-1:1);if(n>=0)p.hp=clamp(p.hp+n,0,maxHp(p,match,now));else{damagePlayer(p,-n);p.hp=Math.max(0,p.hp)}summary.push("HP "+(n>=0?"+":"")+n);
  }
  for(const m of text.matchAll(/SP\s*([+-])\s*(\d+)/g)){
    const n=+m[2]*(m[1]==="-"?-1:1);p.sp=clamp(p.sp+n,0,p.maxSp);summary.push("SP "+(n>=0?"+":"")+n);
  }
  if(p.hp<=0)environmentDeath(match,p,now,false,null,e.name+" 이벤트");

  if(/독성 상태|중독/.test(text)){
    const pm=text.match(/(\d+)%[^/]*(?:독성 상태|중독)/);
    if(!pm||Math.random()<+pm[1]/100)applyStatus(p,"poison",1,8,null,now,null,match);
  }
  for(const[ko,id]of[["혼란","confusion"],["공포","fear"],["수면","sleep"]]){
    const m=text.match(new RegExp(ko+"\\s*(\\d+)초"));
    if(m){
      const prefix=text.slice(Math.max(0,(m.index||0)-18),m.index||0),pm=prefix.match(/(\d+)%[^%]*$/);
      if(!pm||Math.random()<+pm[1]/100)applyStatus(p,id,1,+m[1],null,now,null,match);
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
  if((mmod=text.match(/(\d+)% 상태이상/))&&Math.random()<+mmod[1]/100)applyStatus(p,pick(["poison","bleed","slow","fear","confusion"]),1,null,null,now,null,match);
  if((mmod=text.match(/(\d+)% 혼란(?!\s*\d)/))&&Math.random()<+mmod[1]/100)applyStatus(p,"confusion",1,5,null,now,null,match);
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
function aiBestHeal(p){
  const ids=Object.keys(p.con||{}).filter(id=>(p.con[id]||0)>0);
  if((p.statuses?.poison?.stacks||0)>0&&ids.includes("antidote"))return"antidote";
  if((p.statuses?.bleed?.stacks||0)>0&&ids.includes("bandage"))return"bandage";
  return ids.filter(id=>item(id)?.heal).sort((a,b)=>(item(b)?.heal||0)-(item(a)?.heal||0))[0]||null
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
  const d=ACTION_SKILL_DEFS[p.charId]||{};let score=.10;
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

  if(p.pendingEvent){
    const e=ENCOUNTER_EVENTS.find(x=>x.id===p.pendingEvent);
    if(e?.choices?.length){
      const available=e.choices.map((_,i)=>i).filter(i=>eventChoiceAvailability(e,p,i).available);
      if(available.length)beginEventChoice(match,p,pick(available),now);
      else p.pendingEvent=null;
    }else p.pendingEvent=null;
    return true;
  }

  if(p.encounter){
    const cmd=aiChooseEncounterCommand(match,p,encounterTarget(match,p),now);
    return cmd?aiQueue(match,p,cmd.type,cmd.payload,now):false;
  }

  if((match.corpses||[]).some(c=>c.region===p.region&&c.expiresAt>now)&&Math.random()<(p.ai==="craft" ? .28 : .16)){
    const loot=aiLootChoice(match,p,now);
    if(loot&&aiQueue(match,p,"loot_corpse",loot,now))return true;
  }

  const heal=aiBestHeal(p);
  if(heal&&(aiHpRatio(match,p,now)<.48||aiHasBadStatus(p,now))){
    if(aiQueue(match,p,"use_item",{id:heal},now))return true;
  }

  if(aiShouldUseAction(match,p,now)){
    if(aiQueue(match,p,"char_action",{},now))return true;
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
const GAME_VERSION="0.8.45-online";
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
    return{introPending:now<match.startedAt,regionGardens:match.regionGardens||{},regionRestrictions:match.regionRestrictions,combatNoticeSeq:match.combatNoticeSeq||0,combatNotices:(match.combatNotices||[]).filter(e=>e.sourceId===self?.playerId||e.targetId===self?.playerId),result:playerResult(match,self,now),matchId:match.matchId,phase:match.phase,createdAt:match.createdAt,startedAt:match.startedAt,serverNow:now,elapsed:match.phase==="playing"?Math.max(0,Math.floor((now-match.startedAt)/1000)):(match.elapsed||0),self:self?publicPlayer(match,self,now,false):null,others,aliveCount:match.players.filter(p=>p.alive).length,regions:REGIONS,adjacency:ADJACENCY,encounter,
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
    const passiveView=()=>JSON.stringify([match.combatNoticeSeq,match.players.map(p=>[p.hp,p.sp,p.satiety,p.alive,p.statuses,p.tempEffects,p.delayedEffects,p.enemyContacts,p.heardNoiseIds]),match.noises,match.regionGardens]);
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

    const commandMap={command_move:"move",command_search:"search",command_rest:"rest",command_craft:"craft",command_use_item:"use_item",command_attack:"attack",command_skill:"skill",command_flee:"flee",command_char_action:"char_action",command_loot_corpse:"loot_corpse"};
    if(commandMap[msg.type]){
      const m=await this.getMatch();if(!m||m.phase!=="playing"){send(ws,"error",{error:"match_not_playing"});return}
      const dueChanged=await this.completeDueActions(m,Date.now(),{defer:true});settleMatch(m);if(m.phase!=="playing"){await this.saveMatch(m);send(ws,"error",{error:"match_not_playing"});this.broadcastMatchState(m);return}const p=this.matchPlayerForSession(m,session.sessionId);const type=commandMap[msg.type],payload={to:msg.to,id:msg.id};
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
 adapter.close=(...args)=>{if(adapter.offline){local.stop();adapter.manualClose=true}else original.close(...args)};
 return adapter;
}

return {OfflineSession,installOfflineMode};
})();
return __modules["src/offline_session.js"];
})();
export const installOfflineMode=OfflineRuntime.installOfflineMode;
export const OfflineSession=OfflineRuntime.OfflineSession;
