// Extracted verbatim from the v0.6.4 offline build.
export const PASSIVE_FX={
  "c01": {
    "searchLoot": 0.2,
    "restHeal": 0.2
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
    "taken": 0.03
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
    "prep": 0.04
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
  }
};
export const COMBAT_SKILL_DEFS={
  c01:{mult:1.05,cd:58,sp:12,hit:0,statuses:[['bind',.35,2.5],['slow',.55,6]]},
  c02:{mult:.90,cd:52,sp:11,statuses:[['confusion',.55,5],['silence',.30,3]]},
  c03:{mult:.70,cd:48,sp:10,heal:14},
  c04:{mult:1.15,lowHpMult:1.30,cd:50,sp:12},
  c05:{mult:1.10,cd:52,sp:11,hit:.05,mark:30},
  c06:{mult:1.25,cd:46,sp:12,hit:.08},
  c07:{mult:.90,cd:54,sp:10,statuses:[['silence',.60,3]]},
  c08:{mult:1.00,cd:50,sp:11,restoreSp:6,statuses:[['slow',.40,6]]},
  c09:{mult:.95,cd:48,sp:10,statuses:[['confusion',.50,5]]},
  c10:{mult:1.00,cd:50,sp:10,timeScale:true},
  c11:{mult:1.30,cd:54,sp:13,statuses:[['slow',.45,6]]},
  c12:{mult:1.15,cd:50,sp:11,statuses:[['bleed',.45,10]]},
  c13:{mult:.60,cd:45,sp:10,heal:20},
  c14:{mult:.95,cd:48,sp:10,statuses:[['actionDelay',.55,3]]},
  c15:{mult:1.20,cd:55,sp:12,statuses:[['fear',.45,5]]},
  c16:{mult:1.05,cd:47,sp:10,randomStatus:true},
  c17:{mult:1.00,cd:52,sp:11,forcePoison:2},
  c18:{mult:1.35,cd:58,sp:14,hit:.06},
  c19:{mult:1.25,cd:52,sp:12,statuses:[['bleed',.40,10]],killHeal:6},
  c20:{mult:1.55,cd:72,sp:16,hit:.12},
  c21:{mult:1.20,cd:44,sp:11,crit:.08,prep:.82},
  c22:{mult:1.25,cd:56,sp:13,statuses:[['actionDelay',.35,3]]},
  c23:{mult:.80,cd:52,sp:10,heal:8,tempGuard:.08,tempGuardDuration:8},
  c24:{mult:1.20,lowHpMult:1.40,cd:50,sp:12},
  c25:{multMin:.90,multMax:1.45,cd:46,sp:10,crit:.06},
  c26:{mult:1.05,cd:52,sp:11,statuses:[['bind',.45,2.5]]},
  c27:{multMin:.85,multMax:1.45,cd:48,sp:11,randomControl:.25},
  c28:{mult:.90,cd:58,sp:12,statuses:[['bind',.55,2.5],['silence',.35,3]]},
  c29:{mult:1.05,cd:48,sp:10,drainSp:10},
  c30:{mult:1.10,cd:50,sp:11,defIgnore:.15},
  c31:{mult:1.30,cd:54,sp:13,statuses:[['bleed',.35,10]]},
  c32:{mult:1.00,cd:50,sp:11,statuses:[['poison',.45,8],['slow',.30,6]]},
  c33:{mult:1.35,cd:50,sp:10,selfDamage:4},
  c34:{mult:1.20,cd:50,sp:11,statuses:[['actionDelay',.35,3]]},
  c35:{mult:1.00,cd:48,sp:10,dispelOne:true,dispelBonus:.15},
  c36:{mult:1.45,cd:60,sp:13,quietBonus:.10},
  c37:{mult:1.25,lowHpMult:1.45,cd:56,sp:13},
  c38:{mult:1.40,cd:58,sp:14,hit:.06,crit:.10},
  c39:{mult:1.50,cd:58,sp:12,selfDamage:6},
  c40:{mult:1.00,cd:58,sp:12,statuses:[['fear',1,5]]},
  c41:{mult:1.15,cd:52,sp:12,doubleRandomStatus:true},
  c42:{mult:1.10,cd:56,sp:12,statuses:[['bind',.45,2.5],['fear',.35,5]]},
  c43:{mult:1.05,cd:60,sp:13,forcePoison:3},
  c44:{mult:1.50,cd:62,sp:15,hit:.04,prep:1.10},
  c45:{mult:.85,cd:60,sp:12,statuses:[['sleep',.65,3]]},
  c46:{mult:.95,cd:54,sp:11,statuses:[['confusion',.65,5]]},
  c47:{mult:1.35,cd:52,sp:12,hit:.08,freeMove:true},
  c48:{mult:1.05,cd:60,sp:12,statuses:[['bind',1,2.5]]},
  c49:{mult:1.30,cd:58,sp:13,lifesteal:.20},
  c50:{mult:1.15,cd:50,sp:11,restoreSp:5,statuses:[['slow',.40,6]]},
  c51:{multMin:1.10,multMax:1.35,cd:50,sp:11,randomControl:.30}
};
export const ACTION_SKILL_DEFS={
  c01:{cd:45,time:1.0,heal:6,tempFx:{searchLoot:.08},duration:18},
  c02:{cd:48,time:.8,tempFx:{conceal:.10},duration:18,nextDetect:.08},
  c03:{cd:50,time:1.0,heal:12,cleanse:['poison','bleed'],cleanseCount:1},
  c04:{cd:52,time:1.0,tempFx:{defFlat:3},duration:20,nextSkillSpDiscount:2},
  c05:{cd:48,time:.8,nextDetect:.18,tempFx:{detect:.08},duration:25},
  c06:{cd:42,time:.7,nextMoveFree:true,tempFx:{moveTime:-.08},duration:12},
  c07:{cd:44,time:.8,sp:12,nextDetect:.12},
  c08:{cd:46,time:.9,sp:10,tempFx:{statusChance:.05},duration:20},
  c09:{cd:50,time:.8,tempFx:{conceal:.15},duration:20},
  c10:{cd:46,time:.8,sp:8,tempFx:{crit:.04},duration:20},
  c11:{cd:44,time:.8,tempFx:{moveSp:2},duration:12,nextDamage:.06},
  c12:{cd:50,time:1.1,trap:true,nextHit:.08},
  c13:{cd:48,time:1.0,heal:16,cleanseSpecific:{bleed:2}},
  c14:{cd:55,time:.7,reduceCombatCd:12,refundActionCd:6},
  c15:{cd:46,time:.8,nextDetect:.20,tempFx:{woundedDetect:.08},duration:20},
  c16:{cd:50,time:1.2,material:'iron',materialQty:1,nextCraftTimeMult:.80},
  c17:{cd:50,time:1.0,consumable:'antidote',tempFx:{poisonChance:.08},duration:20},
  c18:{cd:44,time:.7,nextMoveFree:true,nextDamage:.08},
  c19:{cd:48,time:1.0,corpseHeal:15,noCorpseSp:8},
  c20:{cd:52,time:.8,nextDetect:.25,nextHit:.10},
  c21:{cd:42,time:.7,sp:8,tempFx:{prep:-.10},duration:16},
  c22:{cd:46,time:.8,tempFx:{hit:.05,detect:.08},duration:20},
  c23:{cd:52,time:.9,tempFx:{taken:-.08},duration:20},
  c24:{cd:48,time:.9,heal:8,tempFx:{lowDef:4},duration:20},
  c25:{cd:44,time:.7,luckAction:true},
  c26:{cd:46,time:.9,heal:6,tempFx:{statusChance:.05},duration:18},
  c27:{cd:50,time:.7,sp:14,nextDamage:.10,skillOnlyDamage:true},
  c28:{cd:54,time:.9,tempFx:{incomingStatusDuration:-.20,conceal:.05},duration:20},
  c29:{cd:44,time:.7,sp:10,nextSkillSpDiscount:3},
  c30:{cd:50,time:.8,tempFx:{profGain:.25,detect:.06},duration:25},
  c31:{cd:50,time:1.1,randomMetal:true,tempFx:{defFlat:2},duration:18},
  c32:{cd:48,time:1.0,material:'medicine',materialQty:1,heal:6},
  c33:{cd:46,time:.8,selfDamage:5,nextSearch:.18,nextDamage:.10},
  c34:{cd:50,time:.8,tempFx:{taken:-.05},duration:20,nextHit:.05},
  c35:{cd:48,time:.8,cleanseAny:1,tempFx:{incomingStatusDuration:-.15},duration:18},
  c36:{cd:52,time:.7,tempFx:{conceal:.18},duration:20,nextDamage:.10},
  c37:{cd:55,time:1.0,heal:8,healIfRevUsed:8},
  c38:{cd:46,time:.7,tempFx:{hit:.06,crit:.06},duration:18},
  c39:{cd:46,time:.7,selfDamage:4,tempFx:{damage:.10},duration:18},
  c40:{cd:50,time:.8,tempFx:{detect:.10},duration:20,nextStatus:{fear:.12}},
  c41:{cd:48,time:.9,heal:8,tempFx:{incomingStatusDuration:-.15},duration:18},
  c42:{cd:48,time:.8,nextDetect:.20,tempFx:{statusChance:.06},duration:18},
  c43:{cd:50,time:1.0,material:'toxin',materialQty:1,tempFx:{poisonChance:.10},duration:20},
  c44:{cd:52,time:.8,tempFx:{taken:-.10,moveTime:.05},duration:18},
  c45:{cd:50,time:.8,sp:10,tempFx:{sleepChance:.10},duration:20},
  c46:{cd:48,time:.8,tempFx:{conceal:.10},duration:20,nextStatus:{confusion:.12}},
  c47:{cd:42,time:.7,nextMoveFree:true,tempFx:{moveTime:-.10},duration:15},
  c48:{cd:50,time:.8,tempFx:{bindChance:.10},duration:20,nextHit:.05},
  c49:{cd:54,time:1.0,consumeCorpse:true,corpseHeal:18,noCorpseHeal:6},
  c50:{cd:48,time:.9,heal:6,sp:10,cleanseAny:1},
  c51:{cd:50,time:.8,sp:12,tempFx:{profGain:.30,statusChance:.04},duration:25}
};

export const NAMED_GEAR_FX={
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
