import {uniqueMaterialExists,isUniqueMaterial} from "./unique_materials.js";
import {ITEMS} from './offline_content.js';
export function equipmentSalvage(id){
 const it=ITEMS[id];return it?.t==='e'&&it.r?Object.entries(it.r).map(([id,count])=>({id,count,name:ITEMS[id].n,t:ITEMS[id].t})):[];
}
export function offerSearchConsumable(match,p,id,count=1){
 if(p.isAI||p.pickupChoices===false||p.pendingPickup)return false;
 match.pickupSeq=(match.pickupSeq||0)+1;
 p.pendingPickup={token:p.playerId+':'+match.pickupSeq,id,count,name:ITEMS[id].n};return true;
}
export function offerEquipment(match,p,id,count=1){
 if(p.isAI||p.pickupChoices===false)return false;
 for(let i=0;i<count;i++){
  match.pickupSeq=(match.pickupSeq||0)+1;
  const reward={token:p.playerId+':'+match.pickupSeq,id,count:1,name:ITEMS[id].n,kind:'equipment'};
  if(p.pendingPickup)(p.pickupQueue??=[]).push(reward);else p.pendingPickup=reward;
 }
 return true;
}
function advancePickup(p){p.pendingPickup=p.pickupQueue?.shift()||null}
export function inventoryOperation(match,p,msg){
 if(match?.phase!=='playing'||!p?.alive)return {ok:false,error:'player_not_active'};
 if(p.pendingAction)return {ok:false,error:'action_in_progress'};
 const mode=msg.mode;
 if(mode==='resolve_pickup'){
  const pickup=p.pendingPickup;if(!pickup||msg.token!==pickup.token)return {ok:false,error:'pickup_missing'};
  if(msg.choice==='discard'){advancePickup(p);return {ok:true,mode,discarded:true,itemId:pickup.id}}
  if(msg.choice!=='replace')return {ok:false,error:'invalid_inventory_choice'};
  if(pickup.kind==='equipment'){
   let discarded=null;
   if(p.eq.length>=3){
    if(!Number.isInteger(msg.replaceIndex)||msg.replaceIndex<0||msg.replaceIndex>=p.eq.length||p.eq[msg.replaceIndex]!==msg.replaceId)return {ok:false,error:'replacement_missing'};
    discarded={id:p.eq[msg.replaceIndex],count:1};p.eq.splice(msg.replaceIndex,1);
   }
   p.eq.push(pickup.id);advancePickup(p);return {ok:true,mode,itemId:pickup.id,count:1,discarded};
  }
  const existing=Object.keys(p.con).filter(id=>p.con[id]>0),merges=(p.con[pickup.id]||0)>0;
  if(!merges&&existing.length>=3&&(!existing.includes(msg.replaceId)||msg.replaceId===pickup.id))return {ok:false,error:'replacement_missing'};
  let discarded=null;
  if(!merges&&existing.length>=3){discarded={id:msg.replaceId,count:p.con[msg.replaceId]};delete p.con[msg.replaceId]}
  p.con[pickup.id]=(p.con[pickup.id]||0)+pickup.count;advancePickup(p);
  return {ok:true,mode,itemId:pickup.id,count:pickup.count,discarded};
 }
 if(p.pendingPickup)return {ok:false,error:'pickup_choice_required'};
 if(mode==='drop_consumable'){
  if(ITEMS[msg.id]?.t!=='c'||!(p.con[msg.id]>0))return {ok:false,error:'item_missing'};
  const count=p.con[msg.id];delete p.con[msg.id];return {ok:true,mode,itemId:msg.id,count};
 }
 if(!['drop_equipment','dismantle_equipment'].includes(mode))return {ok:false,error:'invalid_inventory_choice'};
 if(!Number.isInteger(msg.index)||msg.index<0||p.eq[msg.index]!==msg.id)return {ok:false,error:'item_missing'};
 const rewards=mode==='dismantle_equipment'?equipmentSalvage(msg.id):[];
 if(mode==='dismantle_equipment'&&!rewards.length)return {ok:false,error:'cannot_dismantle'};
 const eqCount=p.eq.length-1+rewards.filter(x=>x.t==='e').reduce((n,x)=>n+x.count,0);
 if(eqCount>3)return {ok:false,error:'equipment_full'};
 const cons=new Set(Object.keys(p.con).filter(id=>p.con[id]>0));for(const x of rewards)if(x.t==='c')cons.add(x.id);
 if(cons.size>3)return {ok:false,error:'inventory_full'};
 for(const x of rewards)if(isUniqueMaterial(x.id)&&(match.uniqueSpecials?.[x.id]?.state!=='consumed'||uniqueMaterialExists(match,x.id,p,msg.index)))return {ok:false,error:'special_already_exists'};
 p.eq.splice(msg.index,1);
 for(const x of rewards){
  if(x.t==='e')for(let i=0;i<x.count;i++)p.eq.push(x.id);
  else{const bag=x.t==='c'?p.con:p.mat;bag[x.id]=(bag[x.id]||0)+x.count}
  if(isUniqueMaterial(x.id))Object.assign(match.uniqueSpecials[x.id],{state:'held',holderId:p.playerId,region:null});
 }
 return {ok:true,mode,itemId:msg.id,rewards};
}
