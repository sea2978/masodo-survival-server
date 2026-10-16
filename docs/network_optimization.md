# Network optimization — 0.8.8 / protocol 12

The server negotiates `state_delta_v1` in `hello`. Existing clients retain complete `match_state` responses. New clients receive a complete baseline and item definitions, then ordered `match_delta` patches. A revision mismatch requests a complete baseline once. Reconnects and Durable Object hibernation always restore a complete baseline. Neither polling nor additional heartbeat loops are introduced.

Only changed views are sent. Absolute cooldown deadlines are authoritative; the client animates cooldowns and elapsed time locally. Combat notifications are sent as new event IDs to the relevant source and target. Inventory IDs/counts reuse the baseline catalog. Recommendations are cached until the character or inventory changes. Snapshot construction no longer advances world time once per recipient.

Action completion and the AI slot share one immediate match write. Unchanged room metadata and redundant alarm reservations are skipped. Static event/wild definitions are omitted from normal match persistence and hydrated from the worker bundle; custom definitions remain stored. AI cadence and action durations remain unchanged. Persistence is not delayed for batching.

## Controlled comparison

The real GameRoom methods ran against mocked Durable Object storage and sockets: 10 connected humans plus one AI, one human rest action, completion after four seconds, fixed random `.99` so the AI skips its decision. Initial synchronization/migration is excluded from the action rows. Bytes are uncompressed serialized JSON, not billed requests or real network measurements.

| Operation | Before | After |
| --- | ---: | ---: |
| Rest acceptance + completion: outgoing messages | 22 | 4 |
| Rest acceptance + completion: outgoing bytes | 187,259 | 595 |
| Rest acceptance + completion: storage puts | 4 | 2 |
| Idle AI slot: storage puts | 2 | 1 |
| Three unchanged schedule checks: setAlarm calls | 3 | 0 |
| Stored match JSON after completion | 58,129 B | 16,576 B |
| First synchronization: outgoing bytes to ten clients | 93,493 | 368,263 |

The larger initial baseline includes all item definitions and is an intentional startup tradeoff. Reconnect and hibernation repeat this baseline. Combat, global events, inventory contents, legacy clients and reconnect frequency change the actual savings. This is not a full real-player round or a Cloudflare billing estimate. Incoming player commands are unchanged; outgoing fan-out is the main reduction.

Run `npm run test:network` for baseline/delta restoration, malformed/gapped patch recovery, inventory metadata, poison source/victim notifications, finish results, reconnect during action completion, legacy compatibility, static definition persistence and hibernation. Run `node tests/network_benchmark.mjs` for current metrics. Supply an absolute path to the previous revision's `src/room.js` as its argument for before/after metrics; its relative imports are loaded from this revision's unchanged game modules.
