import { DurableObject } from "cloudflare:workers";
import { MAX_HUMANS, json, parseJsonMessage, safeText, send } from "./protocol.js";

const ROOM_META_KEY = "room_meta";

export class GameRoom extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.sessions = new Map();

    for (const ws of this.ctx.getWebSockets()) {
      const attachment = ws.deserializeAttachment();
      if (attachment?.sessionId) this.sessions.set(ws, attachment);
    }

    this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong"));
  }

  async getMeta() {
    return (await this.ctx.storage.get(ROOM_META_KEY)) || null;
  }

  async saveMeta(meta) {
    await this.ctx.storage.put(ROOM_META_KEY, meta);
  }

  connectedPlayers() {
    return [...this.sessions.values()]
      .filter((s) => s.joined)
      .map((s) => ({
        sessionId: s.sessionId,
        playerName: s.playerName,
        charId: s.charId,
        ready: !!s.ready,
        joinedAt: s.joinedAt,
      }));
  }

  roomState(meta) {
    const players = this.connectedPlayers();
    return {
      code: meta.code,
      phase: meta.phase || "lobby",
      createdAt: meta.createdAt,
      maxHumans: MAX_HUMANS,
      players,
      humanCount: players.length,
      allReady: players.length >= 2 && players.every((p) => p.ready),
      protocolVersion: 1,
    };
  }

  broadcast(type, payload = {}) {
    for (const ws of this.sessions.keys()) send(ws, type, payload);
  }

  async broadcastRoomState(meta) {
    this.broadcast("room_state", { room: this.roomState(meta) });
  }

  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/init" && request.method === "POST") {
      const body = await request.json().catch(() => ({}));
      const existing = await this.getMeta();
      if (existing) return json({ ok: false, reason: "exists", room: this.roomState(existing) }, 409);

      const meta = {
        code: safeText(body.code, 8, "ROOM"),
        createdAt: Date.now(),
        phase: "lobby",
      };
      await this.saveMeta(meta);
      return json({ ok: true, room: this.roomState(meta) }, 201);
    }

    const meta = await this.getMeta();
    if (!meta) return json({ ok: false, error: "room_not_found" }, 404);

    if (path === "/status" && request.method === "GET") return json({ ok: true, room: this.roomState(meta) });

    if (path === "/ws") {
      const upgrade = request.headers.get("Upgrade");
      if (!upgrade || upgrade.toLowerCase() !== "websocket") return json({ ok: false, error: "websocket_required" }, 426);
      if (this.connectedPlayers().length >= MAX_HUMANS) return json({ ok: false, error: "room_full" }, 409);

      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);
      this.ctx.acceptWebSocket(server);

      const session = {
        sessionId: crypto.randomUUID(),
        joined: false,
        playerName: "Player",
        charId: "c01",
        ready: false,
        joinedAt: Date.now(),
      };

      server.serializeAttachment(session);
      this.sessions.set(server, session);
      send(server, "connected", { sessionId: session.sessionId, room: this.roomState(meta) });
      return new Response(null, { status: 101, webSocket: client });
    }

    return json({ ok: false, error: "not_found" }, 404);
  }

  async webSocketMessage(ws, message) {
    const msg = parseJsonMessage(message);
    const session = this.sessions.get(ws) || ws.deserializeAttachment();
    const meta = await this.getMeta();

    if (!msg || !session || !meta) {
      send(ws, "error", { error: "invalid_message" });
      return;
    }

    if (msg.type === "hello") {
      if (!session.joined && this.connectedPlayers().length >= MAX_HUMANS) {
        send(ws, "error", { error: "room_full" });
        ws.close(4001, "Room full");
        return;
      }
      session.joined = true;
      session.playerName = safeText(msg.playerName, 20, "Player");
      session.charId = safeText(msg.charId, 8, "c01");
      session.ready = false;
      session.joinedAt ||= Date.now();
      ws.serializeAttachment(session);
      this.sessions.set(ws, session);
      send(ws, "hello_ok", { sessionId: session.sessionId });
      await this.broadcastRoomState(meta);
      return;
    }

    if (!session.joined) {
      send(ws, "error", { error: "hello_required" });
      return;
    }

    if (msg.type === "set_ready") {
      session.ready = !!msg.ready;
      ws.serializeAttachment(session);
      this.sessions.set(ws, session);
      await this.broadcastRoomState(meta);
      return;
    }

    if (msg.type === "set_character") {
      if (meta.phase !== "lobby") {
        send(ws, "error", { error: "match_already_started" });
        return;
      }
      session.charId = safeText(msg.charId, 8, session.charId);
      session.ready = false;
      ws.serializeAttachment(session);
      this.sessions.set(ws, session);
      await this.broadcastRoomState(meta);
      return;
    }

    if (msg.type === "request_start") {
      const room = this.roomState(meta);
      if (!room.allReady) {
        send(ws, "error", { error: "not_all_ready" });
        return;
      }
      if (meta.phase !== "lobby") {
        send(ws, "error", { error: "already_started" });
        return;
      }
      meta.phase = "starting";
      meta.startedAt = Date.now();
      await this.saveMeta(meta);
      this.broadcast("match_start_pending", {
        room: this.roomState(meta),
        note: "Phase 2 will move the authoritative match engine into the Durable Object.",
      });
      return;
    }

    if (msg.type === "chat") {
      const text = safeText(msg.text, 120, "");
      if (!text) return;
      this.broadcast("chat", {
        from: session.sessionId,
        playerName: session.playerName,
        text,
        at: Date.now(),
      });
      return;
    }

    send(ws, "error", { error: "unknown_message_type", received: msg.type });
  }

  async webSocketClose(ws, code, reason) {
    this.sessions.delete(ws);
    try { ws.close(code, reason); } catch {}
    const meta = await this.getMeta();
    if (meta) await this.broadcastRoomState(meta);
  }

  async webSocketError(ws) {
    this.sessions.delete(ws);
    const meta = await this.getMeta();
    if (meta) await this.broadcastRoomState(meta);
  }
}
