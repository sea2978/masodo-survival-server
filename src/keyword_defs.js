// One uniform draw from eight words. Duplicate words count toward the total cap.
export const KEYWORD_LIMIT=10;
export const KEYWORDS=[
 {id:'tracking',name:'추적',good:true,description:'마법탄 명중률 +20%p / 중첩'},
 {id:'amplify',name:'증폭',good:true,description:'마법탄 피해 +20% / 중첩'},
 {id:'piercing',name:'관통',good:true,description:'대상 방어력 20% 무시 / 중첩 (최대 100%)'},
 {id:'healing',name:'회복',good:true,description:'발사 시 자신의 HP 5 회복 / 중첩'},
 {id:'vigor',name:'활력',good:true,description:'발사 시 자신의 SP 3 회복 / 중첩'},
 {id:'scatter',name:'산란',good:false,description:'마법탄 명중률 −20%p / 중첩'},
 {id:'weakness',name:'쇠약',good:false,description:'마법탄 피해 −20% / 중첩 (기본 위력의 최소 20%)'},
 {id:'recoil',name:'반동',good:false,description:'발사 시 자신에게 HP 5 반동 피해 / 중첩'}
];
export const KEYWORD_BY_ID=Object.fromEntries(KEYWORDS.map(x=>[x.id,x]));
export function keywordCounts(words){const counts={};for(const id of words||[])if(KEYWORD_BY_ID[id])counts[id]=(counts[id]||0)+1;return counts;}
export function keywordView(words){const counts=keywordCounts(words);return KEYWORDS.filter(x=>counts[x.id]).map(x=>({...x,count:counts[x.id]}));}
