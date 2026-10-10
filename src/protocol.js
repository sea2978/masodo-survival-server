export const MAX_HUMANS = 10;
export const ROOM_CODE_LENGTH = 6;
export const ROOM_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

export function safeRoomCode(value) {
  return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, ROOM_CODE_LENGTH);
}

export function randomRoomCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(ROOM_CODE_LENGTH));
  let out = "";
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) out += ROOM_CODE_ALPHABET[bytes[i] % ROOM_CODE_ALPHABET.length];
  return out;
}

export function safeText(value, max = 32, fallback = "") {
  const s = String(value ?? fallback).trim().slice(0, max);
  return s || fallback;
}

export function parseJsonMessage(message) {
  try {
    const text = typeof message === "string" ? message : new TextDecoder().decode(message);
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function send(ws, type, payload = {}) {
  try {
    ws.send(JSON.stringify({ type, ...payload }));
    return true;
  } catch {
    return false;
  }
}
