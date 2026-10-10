import assert from "node:assert/strict";
import { CHARACTERS } from "../src/game_data.js";
import { ITEMS, WILD_TEMPLATES, ENCOUNTER_EVENTS } from "../src/offline_content.js";
import { PASSIVE_FX, COMBAT_SKILL_DEFS, ACTION_SKILL_DEFS, NAMED_GEAR_FX } from "../src/skill_defs.js";
import { INTENTIONAL_SOURCE_GAPS } from "../src/audit_manifest.js";

assert.equal(CHARACTERS.length,51);
assert.equal(Object.keys(PASSIVE_FX).length,51);
assert.equal(Object.keys(COMBAT_SKILL_DEFS).length,51);
assert.equal(Object.keys(ACTION_SKILL_DEFS).length,51);
for(const c of CHARACTERS){
  assert.ok(PASSIVE_FX[c.id],`missing passive: ${c.id}`);
  assert.ok(COMBAT_SKILL_DEFS[c.id],`missing combat skill: ${c.id}`);
  assert.ok(ACTION_SKILL_DEFS[c.id],`missing action skill: ${c.id}`);
}

const passiveKeys=new Set(["searchLoot","restHeal","conceal","confusionChance","heal","incomingStatusDuration","taken","lowHpDamage","detect","hit","moveTime","afterMoveHit","skillSpFlat","statusDuration","restSp","timeAtk","timeAtkEvery","timeAtkCap","damage","moveSp","statusChance","slowChance","poisonChance","poisonVsDamage","afterMoveDamage","killHeal","killSp","skillHit","prep","crit","lowDef","randomSkill","profGain","defFlat","chainPerHit","chainMax","revive","fearChance","sleepChance","bindChance","cdRate","craftTime","quietDamage","woundedDetect"]);
const combatKeys=new Set(["mult","cd","sp","hit","statuses","heal","lowHpMult","restoreSp","timeScale","crit","prep","multMin","multMax","randomStatus","forcePoison","killHeal","tempGuard","tempGuardDuration","randomControl","doubleRandomStatus","drainSp","defIgnore","selfDamage","dispelOne","dispelBonus","quietBonus","freeMove","lifesteal","mark"]);
const actionKeys=new Set(["cd","time","heal","tempFx","duration","nextDetect","sp","nextMoveFree","nextSkillSpDiscount","trap","nextHit","cleanse","cleanseCount","cleanseSpecific","material","materialQty","consumable","nextCraftTimeMult","nextDamage","corpseHeal","noCorpseSp","reduceCombatCd","refundActionCd","luckAction","skillOnlyDamage","nextSearch","cleanseAny","healIfRevUsed","randomMetal","selfDamage","nextStatus","consumeCorpse","noCorpseHeal"]);
const gearKeys=new Set(["hit","crit","detect","conceal","skillSpFlat","statusChance","prep","moveTime","searchLoot","skillDamage","statusDuration","heal","restHeal","fearChance","poisonChance","poisonVsDamage","restSp","afterMoveHit","killHeal","taken","lowDef","moveSp","chainPerHit","chainMax","damage","slowChance","afterMoveDamage","killSp","lowHpDamage","thirdHit","incomingStatusDuration","confusionChance","bleedChance","extraChance","extraRatio","statusTargetDamage","quietDamage","skillHit"]);

for(const [id,row] of Object.entries(PASSIVE_FX))for(const k of Object.keys(row))assert.ok(passiveKeys.has(k),`unreviewed passive key ${id}.${k}`);
for(const [id,row] of Object.entries(COMBAT_SKILL_DEFS))for(const k of Object.keys(row))assert.ok(combatKeys.has(k),`unreviewed combat key ${id}.${k}`);
for(const [id,row] of Object.entries(ACTION_SKILL_DEFS))for(const k of Object.keys(row))assert.ok(actionKeys.has(k),`unreviewed action key ${id}.${k}`);
const tempFxKeys=new Set(["searchLoot","conceal","defFlat","detect","statusChance","moveTime","moveSp","crit","woundedDetect","prep","taken","incomingStatusDuration","profGain","damage","hit","sleepChance","bindChance","poisonChance","lowDef"]);
for(const [id,row] of Object.entries(ACTION_SKILL_DEFS))for(const k of Object.keys(row.tempFx||{}))assert.ok(tempFxKeys.has(k),`unreviewed action tempFx key ${id}.${k}`);
for(const [id,row] of Object.entries(NAMED_GEAR_FX))for(const k of Object.keys(row))assert.ok(gearKeys.has(k),`unreviewed gear key ${id}.${k}`);

assert.equal(WILD_TEMPLATES.length,12);
const wildSkills=new Set(["bite_bleed","harass","scan_delay","emp","berserk","toxic","chimera_status","pilfer","phantom_fear","mana_bite","guard","supply_cache"]);
for(const w of WILD_TEMPLATES)assert.ok(wildSkills.has(w.skill),`unreviewed wild skill: ${w.skill}`);

assert.equal(ENCOUNTER_EVENTS.length,78);
const knownConditions=new Set(["일반 탐색","백색 양산살이 아직 라운드에 존재하지 않을 때 우선","약품/도구 태그 보유 시 조건부 선택 활성","정밀부품 보유 시 조건부 강화","비/번개 계열 환경 이벤트가 활성화되면 확률 상승","도구 보유 시 강화","금속 재료 2종 이상 보유","정밀부품 또는 도구 보유 시 강화","단말 태그 보유 시 강화","매우 낮은 확률","도구 또는 전자부품 보유 시 강화","상태이상 보유 시 우선 가치 상승","랜덤 간부방 이벤트","도구/정밀부품 보유 시 강화"]);
for(const e of ENCOUNTER_EVENTS)assert.ok(knownConditions.has(e.condition),`unreviewed event condition: ${e.id} ${e.condition}`);
assert.equal(INTENTIONAL_SOURCE_GAPS.length,3);
assert.deepEqual(new Set(INTENTIONAL_SOURCE_GAPS.map(x=>x.id)),new Set(["E015_ENVIRONMENT_BONUS","E052_MAGIC_CRAFT_EFFECT","E066_HOSTILE_NPC"]));
for(const e of ENCOUNTER_EVENTS){
  assert.ok(e.id&&e.region&&e.name&&Array.isArray(e.choices)&&e.choices.length===3,`malformed event ${e.id}`);
  for(const ch of e.choices)assert.ok(ch.label&&typeof ch.result==="string",`malformed choice ${e.id}`);
  for(const name of (e.special||"").split("/").map(x=>x.trim()).filter(Boolean)){
    assert.ok(Object.values(ITEMS).some(it=>it.n===name),`event special missing from item DB: ${e.id} ${name}`);
  }
}

// Every result clause is assigned to an audited semantic family.
// This is deliberately broad: it catches newly introduced wording that would otherwise bypass the parser unnoticed.
const semanticFamilies=[
  /시간|빠름|즉시 종료|이벤트 종료|위험 없음|함정 무효/,
  /HP|SP|포만도|독|출혈|둔화|속박|수면|공포|혼란|침묵|상태이상|피발견률|탐색시간|행동속도/,
  /재료|철|강철|합금|고무|가죽|배터리|전자|기계|정밀|화약|수정|마력|천|목재|나무|약품|음식|음료|디저트|식사|요리|빵|수프|생수|에너지드링크|커피|초콜릿|통조림|고기|우유|달걀|채소|쌀|감자|소금|기름|설탕|보상|아이템|무기|장신구|케이크|사탕|잡화|유리|은괴|위 둘|안전 획득/,
  /판정|확률|가중치|성공률|보정|드롭|발견|특수이벤트|특수 이벤트|즉시 완료|제작 효과/,
  /흔적|표시|공개|확인|탐지|추천 지역|정보/,
  /소음|함정|적대 NPC|실패|환술|최면|위험 감소/
];
const unclassified=[];
for(const e of ENCOUNTER_EVENTS)for(const [idx,ch] of e.choices.entries())for(const clause of ch.result.split("/").map(x=>x.trim()).filter(Boolean)){
  if(!semanticFamilies.some(re=>re.test(clause)))unclassified.push(`${e.id}.${idx+1}: ${clause}`);
}
assert.deepEqual(unclassified,[],`unclassified event clauses:\n${unclassified.join("\n")}`);

assert.equal(Object.keys(NAMED_GEAR_FX).filter(x=>x.startsWith("near_final_")).length,17);
assert.equal(Object.keys(NAMED_GEAR_FX).filter(x=>x.startsWith("final_")).length,24);

console.log("full parity audit ok",{
  characters:CHARACTERS.length,
  passives:Object.keys(PASSIVE_FX).length,
  combatSkills:Object.keys(COMBAT_SKILL_DEFS).length,
  actionSkills:Object.keys(ACTION_SKILL_DEFS).length,
  namedGear:Object.keys(NAMED_GEAR_FX).length,
  wilds:WILD_TEMPLATES.length,
  events:ENCOUNTER_EVENTS.length
});
