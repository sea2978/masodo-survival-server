export class MasodoNetworkAdapter {
  constructor(baseUrl = location.origin) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.ws = null;
    this.listeners = new Map();
    this.roomCode = null;
    this.sessionId = null;
    this.lastMatch = null;
    this.catalog = null;
  }

  on(type, fn) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(fn);
    return () => this.listeners.get(type)?.delete(fn);
  }

  emit(type, payload) {
    for (const fn of this.listeners.get(type) || []) fn(payload);
  }

  async loadCatalog() {
    const res = await fetch(`${this.baseUrl}/api/catalog`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "catalog_load_failed");
    this.catalog = { characters: data.characters || [], regions: data.regions || [] };
    this.emit("catalog", this.catalog);
    return this.catalog;
  }

  async createRoom() {
    const res = await fetch(`${this.baseUrl}/api/room/create`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "room_create_failed");
    return data;
  }

  async roomStatus(code) {
    const res = await fetch(`${this.baseUrl}/api/room/${encodeURIComponent(code)}/status`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "room_status_failed");
    return data;
  }

  async connect(code, { playerName = "Player", charId = "c01", startRegion = "city" } = {}) {
    this.close();
    this.roomCode = String(code).trim().toUpperCase();
    const wsBase = this.baseUrl.replace(/^http:/, "ws:").replace(/^https:/, "wss:");
    const ws = new WebSocket(`${wsBase}/api/room/${encodeURIComponent(this.roomCode)}/ws`);
    this.ws = ws;

    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("websocket_timeout")), 10000);
      ws.addEventListener("open", () => { clearTimeout(timer); resolve(); }, { once: true });
      ws.addEventListener("error", () => { clearTimeout(timer); reject(new Error("websocket_error")); }, { once: true });
    });

    ws.addEventListener("message", (event) => {
      if (event.data === "pong") { this.emit("pong", {}); return; }
      try {
        const msg = JSON.parse(event.data);
        if (msg.sessionId) this.sessionId = msg.sessionId;
        if (msg.catalog) this.catalog = msg.catalog;
        if (msg.match) this.lastMatch = msg.match;
        this.emit(msg.type || "message", msg);
        this.emit("*", msg);
      } catch {
        this.emit("raw", event.data);
      }
    });

    ws.addEventListener("close", (event) => {
      this.emit("close", { code: event.code, reason: event.reason });
    });

    this.send("hello", { playerName, charId, startRegion });
    return this;
  }

  send(type, payload = {}) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return false;
    this.ws.send(JSON.stringify({ type, ...payload }));
    return true;
  }

  setReady(ready) { return this.send("set_ready", { ready: !!ready }); }
  setCharacter(charId) { return this.send("set_character", { charId }); }
  setStartRegion(region) { return this.send("set_start_region", { region }); }
  requestStart() { return this.send("request_start"); }
  requestState() { return this.send("request_state"); }
  move(to) { return this.send("command_move", { to }); }
  search() { return this.send("command_search"); }
  rest() { return this.send("command_rest"); }
  craft(id) { return this.send("command_craft", { id }); }
  useItem(id) { return this.send("command_use_item", { id }); }
  attack() { return this.send("command_attack"); }
  skill() { return this.send("command_skill"); }
  flee() { return this.send("command_flee"); }
  charAction() { return this.send("command_char_action"); }
  eventChoice(index) { return this.send("event_choice", { index }); }
  lootCorpse(corpseId, kind, id) { return this.send("loot_corpse", { corpseId, kind, id }); }
  chat(text) { return this.send("chat", { text }); }
  ping() { if (this.ws?.readyState === WebSocket.OPEN) this.ws.send("ping"); }

  close() {
    try { this.ws?.close(1000, "client close"); } catch {}
    this.ws = null;
  }
}
