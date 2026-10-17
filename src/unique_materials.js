import {ITEMS} from './offline_content.js';
const finalMaterials=new Set(Object.values(ITEMS).filter(it=>it.tier==='최종').flatMap(it=>Object.keys(it.r||{})).filter(id=>/^special_\d{2}$/.test(id)));
export const isUniqueMaterial=id=>finalMaterials.has(id);
// A material embedded in a crafted item is still the same unique world resource.
function contains(id,material,seen=new Set()){
 if(id===material)return true;
 if(seen.has(id))return false;seen.add(id);
 return Object.keys(ITEMS[id]?.r||{}).some(part=>contains(part,material,new Set(seen)));
}
export function uniqueMaterialExists(match,id,ignorePlayer=null,ignoreIndex=-1){
 for(const p of [...(match.players||[]),...(match.corpses||[])]){
  if((p.mat?.[id]||0)>0)return true;
  if([p.pendingPickup,...(p.pickupQueue||[])].some(x=>x&&contains(x.id,id)))return true;
  if((p.eq||[]).some((eq,index)=>!(p===ignorePlayer&&index===ignoreIndex)&&contains(eq,id)))return true;
 }
 return false;
}
