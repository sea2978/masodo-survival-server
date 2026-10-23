import { GAME_VERSION, PHASE, PROTOCOL_VERSION, BUILD_LABEL } from "../src/version.js";
import assert from "node:assert/strict";
import { CHARACTERS, REGIONS } from "../src/game_data.js";
assert.equal(CHARACTERS.length,52);
assert.equal(REGIONS.length,13);
assert.ok(CHARACTERS.some(c=>c.id==="c51"));
assert.ok(REGIONS.some(r=>r.id==="evil_training"));
console.log("catalog smoke ok", {characters:CHARACTERS.length,regions:REGIONS.length});

assert.equal(GAME_VERSION,"1.0.0");
assert.equal(PHASE,"3A");
assert.equal(PROTOCOL_VERSION,14);
assert.equal(BUILD_LABEL,"정식 출시 v1.0.0");


