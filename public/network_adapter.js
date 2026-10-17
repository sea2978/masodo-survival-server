export class MasodoNetworkAdapter {
  constructor(baseUrl = location.origin) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.ws = null;
    this.listeners = new Map();
    this.roomCode = null;
    this.sessionId = null;
    this.lastMatch = null;
    this.networkState=null;this.stateRevision=0;this.itemCatalog={};this.resyncPending=false;
    this.catalog = null;
    this.build = null;
    this.connectOptions = null;
    this.manualClose = false;
    this.connectionEpoch = 0;
    this.reconnectTimer = null;
    this.reconnectAttempts = 0;
    this.reconnectChannels = new Map();
  }

  on(type, fn) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(fn);
    return () => this.listeners.get(type)?.delete(fn);
  }

  emit(type, payload) {
    for (const fn of this.listeners.get(type) || []) fn(payload);
  }

  tokenKey(code) { return `masodo-reconnect-${String(code || "").trim().toUpperCase()}`; }

  ensureReconnectChannel(code) {
    const roomCode = String(code || "").trim().toUpperCase();
    if (!roomCode || typeof BroadcastChannel === "undefined") return null;
    if (this.reconnectChannels.has(roomCode)) return this.reconnectChannels.get(roomCode);
    const channel = new BroadcastChannel(`masodo-reconnect-claim-${roomCode}`);
    channel.addEventListener("message", event => {
      const msg = event.data || {};
      if (msg.type !== "probe" || !msg.token) return;
      let current = null;
      try { current = sessionStorage.getItem(this.tokenKey(roomCode)); } catch {}
      if (current && current === msg.token) {
        channel.postMessage({ type:"in_use", token:current });
      }
    });
    this.reconnectChannels.set(roomCode, channel);
    return channel;
  }

  async getReconnectToken(code) {
    // sessionStorage keeps refresh reconnects tab-local. A duplicated tab can
    // inherit sessionStorage, so additionally probe active same-room tabs.
    const roomCode = String(code || "").trim().toUpperCase();
    let token = null;
    try { token = sessionStorage.getItem(this.tokenKey(roomCode)) || null; } catch { return null; }
    if (!token) return null;
    const channel = this.ensureReconnectChannel(roomCode);
    if (!channel) return token;

    const inUse = await new Promise(resolve => {
      let settled = false;
      const finish = value => { if (settled) return; settled = true; channel.removeEventListener("message", onMessage); resolve(value); };
      const onMessage = event => {
        const msg = event.data || {};
        if (msg.type === "in_use" && msg.token === token) finish(true);
      };
      channel.addEventListener("message", onMessage);
      channel.postMessage({ type:"probe", token });
      setTimeout(() => finish(false), 120);
    });

    if (!inUse) return token;
    try {
      sessionStorage.removeItem(this.tokenKey(roomCode));
      sessionStorage.removeItem(`masodo-session-${roomCode}`);
    } catch {}
    return null;
  }

  saveReconnectToken(code, token) {
    if (!token) return;
    const roomCode = String(code || "").trim().toUpperCase();
    try { sessionStorage.setItem(this.tokenKey(roomCode), token); } catch {}
    this.ensureReconnectChannel(roomCode);
  }

  mergeCatalog(incoming) {
    if (!incoming) return this.catalog;
    const previous = this.catalog || { characters: [], regions: [] };
    const previousById = new Map((previous.characters || []).map(c => [c.id, c]));
    const characters = (incoming.characters || []).map(c => ({ ...(previousById.get(c.id) || {}), ...c }));
    this.catalog = {
      characters: characters.length ? characters : (previous.characters || []),
      regions: (incoming.regions || []).length ? incoming.regions : (previous.regions || []),
      items: incoming.items || previous.items || {}
    };
    return this.catalog;
  }

  decodeMatch(state){
    const match={...state,self:state.self?{...state.self}:null},inv=state.self?.inventory;
    if(inv){const item=id=>this.itemCatalog[id]||{};match.self.inventory={eq:inv.eq.map(x=>({...item(x.id),...x})),mat:inv.mat.map(x=>({name:item(x.id).n||x.id,...x})),con:inv.con.map(x=>({...item(x.id),...x}))}}
    return match;
  }
  acceptStateMessage(msg){
    if(msg.type==='match_state'){
      if(msg.itemCatalog)this.itemCatalog=msg.itemCatalog;
      this.networkState=msg.match;this.stateRevision=msg.stateRevision||0;this.resyncPending=false;
      const match=msg.stateRevision?this.decodeMatch(msg.match):msg.match;
      this.lastMatch=match;return {...msg,match};
    }
    if(msg.type!=='match_delta')return msg;
    if(this.resyncPending)return null;
    if(!this.networkState||msg.baseRevision!==this.stateRevision||msg.stateRevision!==this.stateRevision+1){
      this.resyncPending=true;this.requestState();return null;
    }
    const state=JSON.parse(JSON.stringify(this.networkState));
    const target=path=>{if(!Array.isArray(path)||!path.length||path.some(k=>typeof k!=='string'||['__proto__','prototype','constructor'].includes(k)))throw Error('invalid_state_path');let at=state;for(const k of path.slice(0,-1)){if(!at[k]||typeof at[k]!=='object')at[k]={};at=at[k]}return [at,path.at(-1)]};
    try{
      for(const path of msg.patch.remove){const [at,key]=target(path);delete at[key]}
      for(const [path,value]of msg.patch.set){const [at,key]=target(path);at[key]=value}
      state.combatNotices=[...(state.combatNotices||[]),...(msg.combatNotices||[])].slice(-100);
      this.networkState=state;this.stateRevision=msg.stateRevision;
      const match=this.decodeMatch(state);this.lastMatch=match;
      return {type:'match_state',match,stateRevision:msg.stateRevision};
    }catch{this.resyncPending=true;this.requestState();return null}
  }

  async listRooms() {
    const res = await fetch(`${this.baseUrl}/api/rooms`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "room_list_failed");
    return data;
  }

  async loadCatalog() {
    const res = await fetch(`${this.baseUrl}/api/catalog`, { cache: "no-store" });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "catalog_load_failed");
    this.catalog = { characters: data.characters || [], regions: data.regions || [], items:data.items || {} };
    this.itemCatalog=data.items || {};
    this.build = { version:data.version, buildLabel:data.buildLabel, phase:data.phase, protocolVersion:data.protocolVersion };
    this.emit("catalog", this.catalog);
    this.emit("build", this.build);
    return this.catalog;
  }

  async createRoom(settings = {}) {
    const res = await fetch(`${this.baseUrl}/api/room/create`, { method: "POST", headers:{"content-type":"application/json"},body:JSON.stringify(settings) });
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

  scheduleReconnect() {
    if(this.manualClose||this.reconnectTimer||!this.roomCode||!this.connectOptions)return;
    const delay=Math.min(30000,1500*(2**Math.min(this.reconnectAttempts,5)));
    this.reconnectAttempts++;
    this.emit('reconnect_scheduled',{attempt:this.reconnectAttempts,delay});
    this.reconnectTimer=setTimeout(()=>{
      this.reconnectTimer=null;
      if(this.manualClose)return;
      this.emit('reconnecting',{attempt:this.reconnectAttempts});
      this.connect(this.roomCode,this.connectOptions).catch(error=>{if(!this.reconnectTimer&&!this.manualClose){this.emit("reconnect_error",{error:String(error.message||error)});this.scheduleReconnect()}});
    },delay);
  }

  async connect(code, { playerName = "Player", charId = "c01", startRegion = "city" } = {}) {
    const epoch=++this.connectionEpoch;
    const roomCode = String(code).trim().toUpperCase();
    const storageKey = `masodo-session-${roomCode}`;
    const reconnectToken = await this.getReconnectToken(roomCode);
    if(epoch!==this.connectionEpoch)return this;
    const resumeSessionId = reconnectToken ? (this.sessionId || sessionStorage.getItem(storageKey) || null) : null;
    if (this.ws) { const old=this.ws; this.ws=null; try { old.close(1000,"reconnect"); } catch {} }
    if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer=null; }
    this.manualClose = false;
    this.networkState=null;this.stateRevision=0;this.resyncPending=false;
    this.roomCode = roomCode;
    this.connectOptions = { playerName, charId, startRegion };
    const wsBase = this.baseUrl.replace(/^http:/, "ws:").replace(/^https:/, "wss:");
    const ws = new WebSocket(`${wsBase}/api/room/${encodeURIComponent(this.roomCode)}/ws`);
    this.ws = ws;

    try {
      await new Promise((resolve,reject)=>{
        const timer=setTimeout(()=>finish(new Error('websocket_timeout')),10000);
        const onOpen=()=>finish(),onError=()=>finish(new Error('websocket_error')),onClose=()=>finish(new Error('websocket_closed'));
        const finish=error=>{clearTimeout(timer);ws.removeEventListener('open',onOpen);ws.removeEventListener('error',onError);ws.removeEventListener('close',onClose);error?reject(error):resolve()};
        ws.addEventListener('open',onOpen);ws.addEventListener('error',onError);ws.addEventListener('close',onClose);
      });
    }catch(error){
      if(this.ws===ws){this.ws=null;try{ws.close()}catch{};this.emit('reconnect_error',{error:String(error.message||error)});this.scheduleReconnect()}
      throw error;
    }
    if(this.ws!==ws||this.manualClose){try{ws.close()}catch{};return this}
    let handshakeTimer=setTimeout(()=>{if(this.ws===ws)ws.close(4000,'session_timeout')},10000);

    ws.addEventListener("message", (event) => {
      if(this.ws!==ws)return;
      if (event.data === "pong") { this.emit("pong", {}); return; }
      try {
        let msg=JSON.parse(event.data);
        msg=this.acceptStateMessage(msg);if(!msg)return;
        if (msg.sessionId && msg.type === "hello_ok") {
          clearTimeout(handshakeTimer);handshakeTimer=null;
          this.sessionId = msg.sessionId;
          this.reconnectAttempts = 0;
          try { sessionStorage.setItem(storageKey, msg.sessionId); } catch {}
          if (msg.reconnectToken) this.saveReconnectToken(this.roomCode, msg.reconnectToken);
        }
        if (msg.catalog) this.mergeCatalog(msg.catalog);
        if (msg.build) this.build = msg.build;
        if (msg.match) this.lastMatch = msg.match;
        this.emit(msg.type || "message", msg);
        this.emit("*", msg);
      } catch {
        this.emit("raw", event.data);
      }
    });

    ws.addEventListener("close", (event) => {
      clearTimeout(handshakeTimer);
      if (this.ws !== ws) return;
      this.ws = null;
      this.emit("close", { code: event.code, reason: event.reason });
      clearTimeout(handshakeTimer);
      this.scheduleReconnect();
    });

    this.send("hello", { playerName, charId, startRegion, reconnectToken, resumeSessionId, features:["state_delta_v1","inventory_choice_v1"] });
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
  craft(id, replacement = {}) { return this.send("command_craft", { id, ...replacement }); }
  inventoryOperation(payload) { return this.send("command_inventory", payload); }
  useItem(id) { return this.send("command_use_item", { id }); }
  attack() { return this.send("command_attack"); }
  skill() { return this.send("command_skill"); }
  flee() { return this.send("command_flee"); }
  charAction() { return this.send("command_char_action"); }
  eventChoice(index) { return this.send("event_choice", { index }); }
  lootCorpse(corpseId, kind, id, qty = 1, replace = false) { return this.send("command_loot_corpse", { corpseId, kind, id, qty, replace }); }
  chat(text) { return this.send("chat", { text }); }
  ping() { if (this.ws?.readyState === WebSocket.OPEN) this.ws.send("ping"); }

  close() {
    this.connectionEpoch++;
    this.manualClose = true;
    if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer=null; }
    const ws=this.ws;this.ws=null;
    try { ws?.close(1000, "client close"); } catch {}
  }
}
