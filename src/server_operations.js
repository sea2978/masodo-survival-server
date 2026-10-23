import {json} from "./protocol.js";
export const OPERATIONS_NAME="__MASODO_OPERATIONS__";
export function operatingWindow(now=Date.now()){
 const shifted=new Date(now+9*3600000),midnight=Date.UTC(shifted.getUTCFullYear(),shifted.getUTCMonth(),shifted.getUTCDate())-9*3600000;
 const opensAt=midnight+17.5*3600000,closesAt=midnight+24*3600000;
 return {open:now>=opensAt&&now<closesAt,opensAt,closesAt,nextOpenAt:now<opensAt?opensAt:opensAt+86400000};
}
export function operationStatus(env,usage=null,now=Date.now()){
 const window=operatingWindow(now),day=new Date(now).toISOString().slice(0,10),schedule=env.OPERATING_HOURS_ENABLED==='true',guard=env.QUOTA_GUARD_ENABLED==='true';
 let reason=null;
 if(schedule&&!window.open)reason='outside_operating_hours';
 if(guard){
  if(usage?.day===day&&usage.blocked)reason='quota_exhausted';
  else if(!usage||usage.day!==day||now-usage.checkedAt>10*60000)reason='usage_unavailable';
 }
 const messages={outside_operating_hours:'현재 운영 시간이 아닙니다. 서버는 한국 시간 매일 17:30~24:00에 열립니다.',quota_exhausted:'오늘의 서버 사용량이 보호 기준 80%에 도달하여 운영을 종료했습니다. 다음 운영 시간에 다시 접속해 주세요.',usage_unavailable:'서버 사용량을 확인하지 못해 접속을 잠시 중단했습니다. 관리자 확인 후 다시 열립니다.'};
 return {open:!reason,reason,message:messages[reason]||'',schedule:'매일 17:30~24:00 (한국 시간)',nextOpenAt:window.nextOpenAt,closesAt:schedule?window.closesAt:null,serverNow:now,quotaCheckedAt:usage?.checkedAt||null};
}
export async function readOperationStatus(env){
 if(env.QUOTA_GUARD_ENABLED!=='true')return operationStatus(env);
 const response=await env.ROOMS.getByName(OPERATIONS_NAME).fetch('https://operations.internal/operations/status');
 if(!response.ok)throw Error('operations_unavailable');
 return response.json();
}
export async function pollUsage(env,fetcher=fetch,now=Date.now()){
 if(!env.CF_ACCOUNT_ID||!env.CF_ANALYTICS_TOKEN)throw Error('usage_credentials_missing');
 const day=new Date(now).toISOString().slice(0,10),start=day+'T00:00:00Z',end=new Date(now).toISOString();
 const filter=`{datetime_geq:${JSON.stringify(start)},datetime_leq:${JSON.stringify(end)}}`;
 // Raw DO invocation counts deliberately overestimate billable WebSocket requests.
 // Do not divide all invocations by 20: HTTP/RPC/alarms are billed individually.
 const query=`{viewer{accounts(filter:{accountTag:${JSON.stringify(env.CF_ACCOUNT_ID)}}){workers:workersInvocationsAdaptive(limit:1,filter:${filter}){sum{requests}} objects:durableObjectsInvocationsAdaptiveGroups(limit:1,filter:${filter}){sum{requests}}}}}`;
 const response=await fetcher('https://api.cloudflare.com/client/v4/graphql',{method:'POST',headers:{authorization:'Bearer '+env.CF_ANALYTICS_TOKEN,'content-type':'application/json'},body:JSON.stringify({query}),signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error('usage_http_'+response.status);
 const result=await response.json(),account=result.data?.viewer?.accounts?.[0];
 if(result.errors?.length||!account||!Array.isArray(account.workers)||!Array.isArray(account.objects))throw Error('usage_query_failed');
 const sum=rows=>rows.reduce((n,r)=>{const v=r.sum?.requests;if(!Number.isFinite(v)||v<0)throw Error('invalid_usage');return n+v},0);
 const workers=sum(account.workers),objects=sum(account.objects);
 return {day,checkedAt:now,workers,objects,blocked:workers>=80000||objects>=80000};
}
export async function refreshUsage(env){
 if(env.QUOTA_GUARD_ENABLED!=='true')return;
 const stub=env.ROOMS.getByName(OPERATIONS_NAME);
 let usage;try{usage=await pollUsage(env)}catch(error){console.error('Usage monitoring unavailable:',error.message);usage={failed:true}}
 await stub.fetch('https://operations.internal/operations/update',{method:'POST',body:JSON.stringify(usage)});
}
export async function handleOperations(room,request,path){
 if(path==='/operations/status')return json(operationStatus(room.env,await room.ctx.storage.get('usage')));
 if(path!=='/operations/update'||request.method!=='POST')return json({ok:false},404);
 const incoming=await request.json(),previous=await room.ctx.storage.get('usage');
 if(!incoming.failed){incoming.blocked=!!incoming.blocked||(previous?.day===incoming.day&&previous.blocked===true);await room.ctx.storage.put('usage',incoming)}
 const status=operationStatus(room.env,incoming.failed?previous:incoming);
 if(!status.open){
  const directory=room.env.ROOMS.getByName('__MASODO_ROOM_DIRECTORY__');
  const response=await directory.fetch('https://directory.internal/directory/list'),data=await response.json();
  const outcomes=await Promise.allSettled((data.rooms||[]).map(r=>room.env.ROOMS.getByName(r.code).fetch('https://room.internal/operations/close',{method:'POST',body:JSON.stringify(status)})));
  if(outcomes.some(r=>r.status==='rejected'))console.error('Some room shutdowns will retry at the next scheduled check');
 }
 return json({ok:true,status});
}
