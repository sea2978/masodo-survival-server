import assert from 'node:assert/strict';
import {ACTION_SKILL_DEFS as A,COMBAT_SKILL_DEFS as C} from '../src/skill_defs.js';
import {REWORK_CONFIG} from '../src/character_reworks.js';
import {CHARACTERS} from '../src/game_data.js';
assert.equal(CHARACTERS.length,52);assert.equal(Object.keys(REWORK_CONFIG).length,50);
for(const c of CHARACTERS){for(const key of ['passiveEffectText','actionEffectText','combatEffectText'])assert(c[key]?.length>5,c.id+key);if(REWORK_CONFIG[c.id]){assert.equal(A[c.id].rework,true);assert.equal(C[c.id].rework,true);assert.equal(A[c.id].cd,REWORK_CONFIG[c.id].cd);assert.equal(C[c.id].cd,REWORK_CONFIG[c.id].combatCd);assert(c.reworkVersion===1);}}
assert.equal(C.c01.mult,1.5);assert.equal(C.c01.bindMult,2.5);assert.equal(C.c01.cd,60);assert(A.c01.garden);assert.equal(A.c01.cd,45);assert.equal(C.c52.execute,true);
// The approved plan deliberately has 10%-per-record stacks, and small resource counts.
assert(CHARACTERS.find(c=>c.id==='c30').combatEffectText.includes('최대 30%'));
console.log('PASS: all approved skill/catalog replacements, cooldowns, preserved garden/test skills, intentional per-record exception');
