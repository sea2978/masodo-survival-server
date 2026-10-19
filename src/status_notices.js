// Receiver-private, persisted event stream. Never infer applications from snapshots.
export const STATUS_NAMES={poison:'독',bleed:'출혈',slow:'둔화',bind:'속박',sleep:'수면',fear:'공포',confusion:'혼란',silence:'침묵',actionDelay:'행동지연',doll:'인형',timeStop:'시간정지',awe:'용의 위압',reverseAmp:'역증폭',fragrance:'이상향의 향기',talisman:'부적 표식',starTarget:'집착 대상',domination:'지배',suggestion:'암시',chainMark:'사슬 표식'};
export function appendStatusNotice(target,{statusId,sourceId=null,sourceName='환경',cause='환경 효과',at,stacks=1}){
 if(!target?.playerId)return;
 target.statusNoticeSeq=(target.statusNoticeSeq||0)+1;
 const row={id:target.statusNoticeSeq,at,statusId,statusName:STATUS_NAMES[statusId]||statusId,sourceId,sourceName,cause,stacks};
 (target.statusNotices??=[]).push(row);target.statusNotices=target.statusNotices.slice(-64);return row;
}
