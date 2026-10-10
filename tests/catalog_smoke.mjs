import { GAME_VERSION, PHASE, PROTOCOL_VERSION, BUILD_LABEL } from "../src/version.js";
import assert from "node:assert/strict";
import { CHARACTERS, REGIONS } from "../src/game_data.js";
assert.equal(CHARACTERS.length,51);
assert.equal(REGIONS.length,13);
assert.ok(CHARACTERS.some(c=>c.id==="c51"));
assert.ok(REGIONS.some(r=>r.id==="evil_training"));
console.log("catalog smoke ok", {characters:CHARACTERS.length,regions:REGIONS.length});

assert.equal(GAME_VERSION,"0.7.0-online-alpha");
assert.equal(PHASE,"2K");
assert.equal(PROTOCOL_VERSION,5);
assert.ok(BUILD_LABEL.includes("Phase 2K"));
