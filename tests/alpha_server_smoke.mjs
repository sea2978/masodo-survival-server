import fs from 'node:fs';import assert from 'node:assert/strict';
let src=fs.readFileSync(new URL('../src/index.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace(/^export \{.*;\n/gm,'').replace('export default','return');
const worker=new Function('json','randomRoomCode','normalizeRoomSettings',src)((x,status=200)=>Response.json(x,{status}),()=> 'ABC123',x=>({ok:true,settings:x}));
let calls=0;const env={ROOMS:{getByName(){calls++;return{fetch:async()=>Response.json({room:{name:'test'}},{status:201})}}}};
for(const code of [undefined,'wrong','cjsthroRhffla','cjsthRhfflsek']){calls=0;const r=await worker.fetch(new Request('https://masodo-survival-server.alphacheonbung.workers.dev/api/room/create',{method:'POST',body:JSON.stringify({name:'test',alphaCode:code})}),env);assert.equal(r.status,code==='cjsthRhfflsek'?201:403);assert.equal(calls,code==='cjsthRhfflsek'?1:0)}
const r=await worker.fetch(new Request('https://masodo-survival-server.cheonbung.workers.dev/api/room/create',{method:'POST',body:'{}'}),env);assert.equal(r.status,201);
console.log('PASS: alpha missing/wrong/obsolete code blocked before room allocation; exact new code succeeds; official creation unchanged');
