import {REGIONS} from './game_data.js';
export const SAFE_PASSAGES=['city','mgmt_lobby','evil_reception'];
export const LOCK_INTERVAL=180,FINAL_CITY_TIME=780;
const elapsed=(m,now)=>Math.max(0,(now-m.startedAt+(m.timeOffsetMs||0))/1000);
export function isRegionLocked(match,id){return (match.regionRestrictions?.locked||[]).includes(id)}
export function nextRegionLockAt(match){
 const next=match.regionRestrictions?match.regionRestrictions.nextAt:LOCK_INTERVAL;
 return next===null?null:match.startedAt-(match.timeOffsetMs||0)+next*1000;
}
export function updateRegionRestrictions(match,now=Date.now()){
 if(match.phase==='finished')return false;
 const seconds=elapsed(match,now),final=seconds>=FINAL_CITY_TIME,round=final?5:Math.floor(seconds/LOCK_INTERVAL);
 const before=match.regionRestrictions;
 if(before?.round===round)return false;
 const candidates=REGIONS.map(r=>r.id).filter(id=>!SAFE_PASSAGES.includes(id)&&!(before?.locked||[]).includes(id));
 const locked=[];
 if(final)locked.push(...REGIONS.filter(r=>r.id!=='city').map(r=>r.id));
 else if(round>0)while(locked.length<2&&candidates.length){const index=Math.floor(Math.random()*candidates.length);locked.push(candidates.splice(index,1)[0])}
 match.regionRestrictions={round,locked,final,nextAt:final?null:Math.min((round+1)*LOCK_INTERVAL,FINAL_CITY_TIME)};
 const moved=new Set();
 for(const p of match.players||[]){
  if(final||locked.includes(p.region)){
   p.region='city';p.pendingAction=null;p.pendingEvent=null;p.encounter=null;moved.add(p.playerId);
  }else if(p.pendingAction?.type==='move'&&locked.includes(p.pendingAction.payload?.to))p.pendingAction=null;
 }
 for(const p of match.players||[])if(p.encounter?.kind==='player'&&moved.has(p.encounter.targetId))p.encounter=null;
 return true;
}
