// Remember observations, never query an enemy's current state when displaying history.
export function rememberEnemy(player,contact,at){
 if(!player?.playerId||!contact?.id||contact.id===player.playerId)return;
 const book=player.enemyContacts??={};
 const rows=book[player.region]??=[];
 const index=rows.findIndex(row=>row.id===contact.id);
 if(index>=0){
  if(contact.source==='incoming')return;
  rows[index]={...contact,at,region:player.region};
 }else rows.unshift({...contact,at,region:player.region});
 book[player.region]=rows.slice(0,32);
}
export function rememberIncoming(player,source,name,at){
 const id=source?.playerId||source?.id;if(!id)return;
 rememberEnemy(player,{id,name,kind:source.playerId?'player':'wild',source:'incoming',hp:null,maxHp:null,alive:null},at);
}
export function pruneEnemyTraces(match,player,at){
 const rows=player.enemyContacts?.[player.region]||[];
 const disappeared=rows.filter(row=>{
  const target=(row.kind==='wild'?match.wilds:match.players)?.find(x=>(x.playerId||x.id)===row.id);
  return !target?.alive||target.region!==player.region;
 });
 if(!disappeared.length)return;
 const ids=new Set(disappeared.map(x=>x.id));
 player.enemyContacts[player.region]=rows.filter(x=>!ids.has(x.id));
 for(const row of disappeared){
  player.enemyTraceSeq=(player.enemyTraceSeq||0)+1;
  (player.enemyTraceNotices??=[]).push({id:player.enemyTraceSeq,targetId:row.id,name:row.name,region:player.region,at});
 }
 player.enemyTraceNotices=player.enemyTraceNotices.slice(-32);
}
