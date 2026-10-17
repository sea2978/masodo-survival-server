// Complete baselines on join/resync, ordered per-connection patches afterwards.
export const STATE_DELTA_FEATURE='state_delta_v1';
const plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
export function stateDiff(before,after,path=[],set=[],remove=[]){
  if(plain(before)&&plain(after)){
    for(const key of Object.keys(before))if(!(key in after))remove.push([...path,key]);
    for(const key of Object.keys(after)){
      if(!(key in before))set.push([[...path,key],after[key]]);
      else stateDiff(before[key],after[key],[...path,key],set,remove);
    }
  }else if(JSON.stringify(before)!==JSON.stringify(after))set.push([path,after]);
  return {set,remove};
}
export function substantivePatch(patch){
  const clock=p=>p.length===1&&['serverNow','elapsed','combatNoticeSeq'].includes(p[0])||p.length===2&&p[0]==='self'&&['cdC','cdA'].includes(p[1]);
  return patch.remove.some(p=>!clock(p))||patch.set.some(([p])=>!clock(p));
}
export function compactSnapshot(snapshot){
  // Clients already receive the versioned catalog with the complete baseline.
  const fields=['playerId','playerName','charId','region','maxHp','maxSp','hp','sp','satiety','alive','kills','statuses','proficiency','pendingAction','pendingPickup','enemyContacts','rev','isAI','intel','nearbyNoise','atk','def','cdC','cdA','cdCUntil','cdAUntil','cdCDuration','cdADuration','tempEffects','inventory','diedAt','finishRank'];
  const s={...snapshot,self:snapshot.self?Object.fromEntries(fields.filter(k=>k in snapshot.self).map(k=>[k,snapshot.self[k]])):null};
  if(s.self?.inventory){const inv=s.self.inventory;s.self.inventory={eq:inv.eq.map(x=>({id:x.id,salvage:x.salvage})),mat:inv.mat.map(x=>({id:x.id,count:x.count})),con:inv.con.map(x=>({id:x.id,count:x.count}))}}
  return JSON.parse(JSON.stringify(s));
}
