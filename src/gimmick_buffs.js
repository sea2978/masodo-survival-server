import {keywordView,KEYWORD_LIMIT} from './keyword_defs.js';
// Snapshot-only metadata: never changes the authoritative resource or equipment.
const resources={
 c05:['charge','흑뢰',3,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +30%p. 보유 중 공격력 +20%. 15초간 전투하지 않으면 사라집니다.'],
 c06:['spark','섬뢰',2,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +30%p. 소모 시 명중률 +20%p. 유지시간이 끝나면 사라집니다.'],
 c10:['attention','주목',3,'보유 중 공격력 +20%, 3중첩이면 +35%. 전투 스킬 피해 계수는 중첩당 +20%p. 비전투 시 감소합니다.'],
 c13:['light','빛',3,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +15%p, HP 5 회복.'],
 c16:['paint','물감',3,'3중첩이면 아이템 발견률 +25%p. 작품 제작에 1개, 전투 스킬에 최대 2개 소모하여 개당 피해 계수 +25%p.'],
 c18:['momentum','기세',2,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +30%p. 유지시간이 끝나면 사라집니다.'],
 c19:['soul','혼령',3,'보유 중 SP 소모 −20%. 전투 스킬에 최대 2개를 소모하여 개당 피해 계수 +25%p, 공포 확률 +30%p.'],
 c21:['gear','가속 기어',5,'기어에 따라 행동 준비·이동시간이 줄고 SP 소모가 증가합니다. 전투 스킬 피해 계수는 기어당 +15%p이며 사용 시 1단계 감소합니다.'],
 c22:['star','별',2,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +25%p.'],
 c23:['will','의지',0,'전투 스킬의 추가 피해로 소모. 20초간 전투하지 않으면 사라집니다.'],
 c25:['luck','운',3,'보유 중 아이템 발견률 +25%p. 길조에 1개, 전투 스킬에 최대 2개 소모하여 개당 피해 계수 +30%p.'],
 c31:['shard','파편',3,'보유 중 방어력 +25%. 전투 스킬에 전부 소모하여 중첩당 피해 계수 +25%p. 2개 이상이면 출혈 2중첩 부여를 시도합니다.'],
 c33:['calamity','재액',3,'2중첩 이상이면 받는 직접 피해 −20%. 전투 스킬에 전부 소모하여 중첩당 피해 계수 +25%p. 3중첩이면 혼란 부여를 시도합니다.'],
 c39:['amp','증폭',3,'보유 중 공격력 +20%. 3중첩이면 받는 직접 피해 +20%. 전투 스킬에 전부 소모하여 중첩당 피해 계수 +30%p.'],
 c49:['feast','포식',3,'전투 스킬에 전부 소모하여 중첩당 피해 계수 +20%p.'],
 c50:['flow','수류',2,'보유 중 휴식 SP 회복 +30%. 추가행동·전투 스킬을 강화할 때 1개 소모합니다.']
};
const modes={
 c04:{blade:['블레이드','공격력 +25%. 전투 스킬 피해 180%.'],rail:['레일건','전투 스킬 피해 160%, 방어력 25% 무시.'],boost:['부스터','이동시간 −25%. 전투 스킬 피해 140%, 사용 후 다음 이동 강화.']},
 c08:{earth:['대지','방어력 +25%. 전투 스킬 피해 130%, 속박 기본 확률 80%.'],wind:['바람','이동시간 −25%. 전투 스킬 피해 160%, 명중률 +20%p.'],life:['생명','휴식 HP·SP 회복 +30%. 전투 스킬 피해 120%, HP 15 회복.']},
 c09:{attack:['공격형','일반 공격 강화. 전투 스킬 피해 150%.'],defense:['방어형','받는 직접 피해 −25%. 전투 스킬 피해 120%, HP 10 회복.']},
 c24:{arms:['팔 증강','공격력 +25%. 전투 스킬 기본 피해 180%.'],legs:['다리 증강','이동시간 −25%. 전투 스킬 기본 피해 150%, 둔화 기본 확률 80%.']},
 c29:{card:['카드 계약','전투 스킬 명중률 +20%p, 기본 피해 190%.'],wall:['방벽 계약','보호막 효과 +25%. 전투 스킬 기본 피해 160%, 남은 보호막 유지시간 연장.']},
 c37:{sword:['대검','다음 전투 스킬 피해 220% 단타. 사용 후 마력 난사로 돌아갑니다.'],barrage:['마력 난사','전투 스킬은 3연타로 발사됩니다.']}
};
export function gimmickBuffs(p,r,{maxHp=p.maxHp,players=[]}={}){
 const out={},entry=(id,name,description,stacks=1,maxStacks=1,extra={})=>out[id]={name,description,stacks,maxStacks,until:null,permanent:true,category:'resource',...extra};
 const def=resources[p.charId];if(def){const[k,name,max,description]=def,v=r.resources?.[k]||(k==='gear'?1:0);if(v>0)entry('rw_resource_'+k,name,description,v,k==='will'?Math.round(maxHp*.2*10)/10:max);}
 const mode=modes[p.charId]?.[r.mode];if(mode)entry('rw_mode',mode[0],mode[1],1,1,{category:'mode',stackLabel:'장착',retention:'전환할 때까지 유지'});
 if(p.charId==='c51')for(const word of keywordView(r.keywords))entry('rw_keyword_'+word.id,'키워드: '+word.name,word.description+'. 마법탄 발사 시 모두 적용하고 소모합니다.',word.count,KEYWORD_LIMIT,{category:'keyword',keywordId:word.id,good:word.good,retention:'발사 전까지 보관'});
 if(p.charId==='c30')for(const[id,record]of Object.entries(r.records||{}))if(record.count>0)entry('rw_record_'+id,'관측 기록 · '+(players.find(x=>x.playerId===id)?.playerName||'대상'),'기록한 대상에 대한 방어력 무시: 중첩당 10%. 2중첩 이상이면 해당 대상에 대한 명중률 +20%p.',record.count,3);
 return out;
}
