import {loadRoom,createHarness} from './room_test_harness.mjs';
const After=await loadRoom();const baseline=process.argv[2];const Before=baseline?await loadRoom(baseline):null;
const savedNow=Date.now,savedRandom=Math.random;let now=1700000000000;Date.now=()=>now;Math.random=()=>.99;
async function measure(Room,delta){
 now=1700000000000;const h=createHarness(Room,{delta,now});
 h.room.broadcastMatchState(await h.room.getMatch());const initial={...h.metrics};
 await h.room.saveMatch(await h.room.getMatch());await h.room.scheduleNextAlarm(await h.room.getMatch(),await h.room.getMeta());h.resetMetrics();
 await h.room.webSocketMessage(h.sockets[0],JSON.stringify({type:'command_rest'}));const command={...h.metrics};
 h.resetMetrics();now+=4000;await h.fireAlarm();const completion={...h.metrics};
 h.resetMetrics();now+=1000;await h.fireAlarm();const idle={...h.metrics};
 h.resetMetrics();for(let i=0;i<3;i++)await h.room.scheduleNextAlarm(await h.room.getMatch(),await h.room.getMeta());const scheduling={...h.metrics};
 return {initial,command,completion,idle,scheduling,matchStorageBytes:Buffer.byteLength(JSON.stringify(h.data.get('match_state')))};
}
try{console.log(JSON.stringify({fixture:'10 humans + 1 AI; one rest command and completion, same deterministic clock, AI decision skipped (random=.99); uncompressed JSON bytes; in-memory Durable Object/WebSocket mocks, not production billing',...(Before?{before:await measure(Before,false)}:{}),after:await measure(After,true)},null,2))}finally{Date.now=savedNow;Math.random=savedRandom}
