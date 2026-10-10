import { json, randomRoomCode, safeRoomCode } from "./protocol.js";
import { CHARACTERS, REGIONS } from "./game_data.js";
export { GameRoom } from "./room.js";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type",
};

function withCors(response) {
  const h = new Headers(response.headers);
  for (const [k, v] of Object.entries(corsHeaders)) h.set(k, v);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers: h });
}

async function getRoomStub(env, code) {
  return env.ROOMS.getByName(code);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

    if (url.pathname === "/api/health") {
      return withCors(json({ ok: true, service: "masodo-survival-server", phase: "2C", protocolVersion: 4 }));
    }

    if (url.pathname === "/api/catalog" && request.method === "GET") {
      return withCors(json({
        ok: true,
        characters: CHARACTERS.map(c => ({
          id: c.id, name: c.name, arch: c.arch, baseHp: c.baseHp, baseSp: c.baseSp,
          baseAtk: c.baseAtk, baseDef: c.baseDef, preferredWeapon: c.preferredWeapon,
          passive: c.passive, combat: c.combat, action: c.action
        })),
        regions: REGIONS
      }));
    }

    if (url.pathname === "/api/room/create" && request.method === "POST") {
      for (let attempt = 0; attempt < 8; attempt++) {
        const code = randomRoomCode();
        const stub = await getRoomStub(env, code);
        const result = await stub.fetch("https://room.internal/init", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ code }),
        });
        if (result.status === 201) {
          const data = await result.json();
          return withCors(json({ ok: true, code, room: data.room }, 201));
        }
      }
      return withCors(json({ ok: false, error: "room_code_generation_failed" }, 503));
    }

    const roomMatch = url.pathname.match(/^\/api\/room\/([A-Za-z0-9]{1,8})\/(status|ws)$/);
    if (roomMatch) {
      const code = safeRoomCode(roomMatch[1]);
      const action = roomMatch[2];
      if (!code) return withCors(json({ ok: false, error: "invalid_room_code" }, 400));

      const stub = await getRoomStub(env, code);
      const internalUrl = new URL(request.url);
      internalUrl.pathname = action === "ws" ? "/ws" : "/status";
      const response = await stub.fetch(new Request(internalUrl.toString(), request));
      if (response.status === 101) return response;
      return withCors(response);
    }

    if (url.pathname.startsWith("/api/")) return withCors(json({ ok: false, error: "api_not_found" }, 404));
    return env.ASSETS.fetch(request);
  },
};
