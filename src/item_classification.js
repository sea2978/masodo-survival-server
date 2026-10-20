// A stat bonus does not decide whether an item is a weapon or wearable equipment.
export const WEAPON_ITEM_TYPES=['검','단검','창','둔기','낫','권갑','활','총','투척무기','중량무기','특수무기','마도구','마법서'];
export function equipmentKind(it){
 if(it?.t!=='e')return null;
 if(it.equipKind==='weapon'||it.equipKind==='equipment')return it.equipKind;
 return WEAPON_ITEM_TYPES.includes(it.weaponType)?'weapon':'equipment';
}
export function itemClassLabel(it){return it?.t==='m'?'재료':it?.t==='c'?'소모품':equipmentKind(it)==='weapon'?'무기':equipmentKind(it)==='equipment'?'장비':'기타';}
export function itemClassIcon(it){return it?.t==='m'?'M':it?.t==='c'?'C':equipmentKind(it)==='weapon'?'W':equipmentKind(it)==='equipment'?'E':'I';}
