import assert from "node:assert/strict";
import fs from "node:fs";
import { CHARACTERS, REGIONS } from "../src/game_data.js";
import { ITEMS } from "../src/offline_content.js";
import { NAMED_GEAR_FX } from "../src/skill_defs.js";
import { GAME_VERSION, PHASE, PROTOCOL_VERSION } from "../src/version.js";
import { INTENTIONAL_SOURCE_GAPS } from "../src/audit_manifest.js";

const index=fs.readFileSync(new URL("../public/index.html",import.meta.url),"utf8");
const adapter=fs.readFileSync(new URL("../public/network_adapter.js",import.meta.url),"utf8");
const room=fs.readFileSync(new URL("../src/room.js",import.meta.url),"utf8");
const api=fs.readFileSync(new URL("../src/index.js",import.meta.url),"utf8");

assert.equal(CHARACTERS.length,51);
assert.equal(REGIONS.length,13);
assert.match(index,/net\.catalog\.characters\.map/);
assert.match(index,/id="char"/);
assert.match(index,/id="lobbyScreen"/);
assert.match(index,/id="gameScreen"/);
assert.match(index,/showLobby\(\)/);
assert.match(index,/showGame\(\)/);
assert.match(index,/id="buildBadge"/);
assert.match(index,/gameBuildLabel/);
assert.match(api,/CHARACTERS\.map/);
assert.match(api,/version:\s*GAME_VERSION/);
assert.match(api,/protocolVersion:\s*PROTOCOL_VERSION/);
assert.ok(api.includes('"/api/rooms"'));
assert.ok(room.includes("EMPTY_ROOM_TTL_MS"));
assert.ok(room.includes("deleteAll()"));
assert.ok(room.includes("reconnectToken"));
assert.ok(adapter.includes("listRooms()"));
assert.ok(adapter.includes("sessionStorage.setItem"));
assert.ok(!index.includes("setInterval(()=>{if(net.ws?.readyState===WebSocket.OPEN&&M)net.requestState()},2000)"));

assert.match(room,/while\(players\.length<11\)/);
for(const token of [
  'command_move:"move"','command_search:"search"','command_rest:"rest"','command_craft:"craft"',
  'command_use_item:"use_item"','command_attack:"attack"','command_skill:"skill"','command_flee:"flee"',
  'command_char_action:"char_action"','command_loot_corpse:"loot_corpse"'
]) assert.ok(room.includes(token),"missing server command mapping "+token);
assert.ok(room.includes("resumeSessionId"));
assert.ok(room.includes("resumed:true") || room.includes("reconnected:resumed"));
assert.ok(adapter.includes("sessionStorage.setItem"));
assert.ok(adapter.includes("resumeSessionId"));
assert.ok(adapter.includes("reconnectTimer"));

for(const method of ["move(","search(","rest(","craft(","useItem(","attack(","skill(","flee(","charAction(","eventChoice(","lootCorpse("]){
  assert.ok(adapter.includes(method),"missing client method "+method);
}

const synergyIds=["aim_terminal","camo_mask","toxin_kit","propulsion","plate","recovery","spell_amp","accel","trace","detox","evasion","focus"];
for(const id of synergyIds)assert.ok(ITEMS[id],"missing synergy item "+id);
for(const id of Object.keys(NAMED_GEAR_FX))assert.ok(ITEMS[id],"named gear FX without item: "+id);
assert.equal(Object.keys(NAMED_GEAR_FX).length,41);

assert.equal(GAME_VERSION,"0.8.9-online-alpha");
assert.equal(PHASE,"3A");
assert.equal(PROTOCOL_VERSION,13);
assert.equal(INTENTIONAL_SOURCE_GAPS.length,3);

console.log("client/server/static audit ok",{characters:CHARACTERS.length,namedGear:Object.keys(NAMED_GEAR_FX).length,version:GAME_VERSION});
