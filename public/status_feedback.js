// Both full snapshots and deltas retain stable receiver-local event IDs.
export function notifyStatusFeedback(match,previous,toast){
 const p=match.self;if(!p||!previous)return;
 const groups=new Map();
 for(const row of p.statusNotices||[]){
  if(row.id<=(previous.statusSeq||0))continue;
  const key=JSON.stringify([row.at,row.sourceId,row.sourceName,row.cause]);
  if(!groups.has(key))groups.set(key,{...row,rows:new Map()});groups.get(key).rows.set(row.statusId,row);
 }
 for(const group of groups.values()){
  const names=[...group.rows.values()].map(row=>row.statusName+(row.stacks>1?' '+row.stacks+'중첩':'')).join(' · ');
  const source=group.sourceName+(group.sourceId===p.playerId?' (자신)':'');
  toast('디버프 받음',source+' → '+names,'원인: '+group.cause,'combat',4000);
 }
 for(const row of p.rework?.keywordNotices||[]){
  if(row.id<=(previous.keywordSeq||0))continue;
  toast(row.good?'이로운 키워드':'부정적 키워드',row.name+' 획득 · '+row.total+'/10',row.description,row.good?'item':'combat',4000);
 }
}
