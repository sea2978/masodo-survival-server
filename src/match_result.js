// Resolve results once on the server; retain elimination records across reconnects.
export function settleMatch(match,now=Date.now()){
  if(match.phase!=="playing"||match.players.length<2)return false;
  const alive=match.players.filter(p=>p.alive);
  for(const p of match.players){
    if(!p.alive){p.diedAt??=now;p.finishRank??=alive.length+1}
  }
  if(alive.length>1)return false;
  match.phase="finished";match.endedAt=now;match.elapsed=Math.max(0,Math.floor((now-match.startedAt)/1000));
  match.winnerId=alive[0]?.playerId||null;
  for(const p of match.players){p.pendingAction=null;p.encounter=null;p.pendingEvent=null;p.pendingPickup=null}
  return true;
}
export function playerResult(match,p,now=Date.now()){
  if(!p||p.alive&&match.phase!=="finished")return null;
  const won=p.alive&&match.winnerId===p.playerId;
  const end=p.alive?(match.endedAt||now):(p.diedAt||now);
  return {outcome:won?"victory":p.alive?"finished":"defeat",rank:won?1:(p.finishRank||null),
    total:match.players.length,kills:p.kills||0,survivalSeconds:Math.max(0,Math.floor((end-match.startedAt)/1000)),
    region:p.region,endedAt:end};
}
