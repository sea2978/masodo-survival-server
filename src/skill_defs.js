import {NAMED_GEAR_EFFECTS} from "./named_gear.js";
import {REWORK_CONFIG} from "./character_reworks.js";
// Extracted verbatim from the v0.6.4 offline build.
export const PASSIVE_FX={
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
export const COMBAT_SKILL_DEFS={
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
export const ACTION_SKILL_DEFS={
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

export const NAMED_GEAR_FX=NAMED_GEAR_EFFECTS;

// Replace, never add to the retired character effects.
for(const [id,c] of Object.entries(REWORK_CONFIG)){PASSIVE_FX[id]=id==="c37"?{revive:true}:{};COMBAT_SKILL_DEFS[id]={mult:id==="c51"?1.2:1.5,sp:12,cd:c.combatCd,rework:true};ACTION_SKILL_DEFS[id]={cd:c.cd,time:c.time,rework:true};}
