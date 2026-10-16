# Room creation settings (0.8.10 / protocol 14)

The lobby's Create button opens a settings dialog. The room name is trimmed, limited to 32 characters and defaults to `생존게임 방`. Names render as escaped text in the room list and current-room panel. Creating still automatically joins the new room.

AI modes:
- `fill` (default): fill to 11 competitors at match start; up to 10 human players.
- `none`: no AI; up to 10 human players. A lone player can practice without instantly winning; death ends that session.
- `fixed`: exactly 0–10 AI. Human capacity is `min(10, 11 - AI count)`, reserving the AI seats rather than silently lowering the requested AI count.

The public creation API and the room's initializer both validate settings. Room metadata, directory entries and match creation retain them. Existing rooms and clients posting an empty creation body keep the previous fill-to-11 default. No AI alarm is scheduled when no AI is present; timed player actions still schedule completion alarms normally.

`npm run test:room-settings` covers API validation, adapter payloads, persistent metadata/directory entries, old-client defaults, fill/none/fixed counts, reserved human seats, reload and solo practice/death/action completion.
