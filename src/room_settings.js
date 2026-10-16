import {MAX_HUMANS} from './protocol.js';
export const MAX_COMPETITORS=11;
export function normalizeRoomSettings(body={}){
 if(!body||typeof body!=='object'||Array.isArray(body))return {ok:false,error:'invalid_room_settings'};
 const name=String(body.name??'').replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,32)||'생존게임 방';
 const aiMode=body.aiMode??'fill';
 if(!['fill','none','fixed'].includes(aiMode))return {ok:false,error:'invalid_ai_mode'};
 const aiCount=aiMode==='fixed'?body.aiCount:0;
 if(!Number.isInteger(aiCount)||aiCount<0||aiCount>10)return {ok:false,error:'invalid_ai_count'};
 return {ok:true,settings:{name,aiMode,aiCount}};
}
export function roomSettings(meta){return normalizeRoomSettings(meta).settings||normalizeRoomSettings().settings}
export function humanCapacity(meta){const s=roomSettings(meta);return Math.min(MAX_HUMANS,MAX_COMPETITORS-(s.aiMode==='fixed'?s.aiCount:0))}
export function plannedAICount(meta,humans){const s=roomSettings(meta);return s.aiMode==='fill'?Math.max(0,MAX_COMPETITORS-humans):s.aiMode==='fixed'?s.aiCount:0}
