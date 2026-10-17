// Remember observations, never query an enemy's current state when displaying history.
export function rememberEnemy(player,contact,at){
 if(!player?.playerId||!contact?.id||contact.id===player.playerId)return;
 const book=player.enemyContacts??={};
 const rows=book[player.region]??=[];
 const index=rows.findIndex(row=>row.id===contact.id);
 if(index>=0)rows.splice(index,1);
 rows.unshift({...contact,at,region:player.region});
 book[player.region]=rows.slice(0,32);
}
export function rememberIncoming(player,source,name,at){
 const id=source?.playerId||source?.id;if(!id)return;
 rememberEnemy(player,{id,name,kind:source.playerId?'player':'wild',source:'incoming',hp:null,maxHp:null,alive:null},at);
}
