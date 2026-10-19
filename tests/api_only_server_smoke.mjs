import {GAME_VERSION} from '../src/version.js';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),config=JSON.parse(fs.readFileSync(new URL('wrangler.jsonc',root),'utf8'));
assert.equal(config.assets.directory,'./server-public');assert.deepEqual(config.assets.run_worker_first,['/api/*']);assert.equal(config.assets.not_found_handling,'404-page');assert(!config.assets.binding);
assert.deepEqual(fs.readdirSync(new URL('server-public/',root)),['404.html']);
const fallback=fs.readFileSync(new URL('server-public/404.html',root),'utf8');assert(!/<script|<img|<canvas|https?:/i.test(fallback));
let source=fs.readFileSync(new URL('src/index.js',root),'utf8').replace('export { GameRoom } from "./room.js";','');
source=source.replace(/from "\.\/([^\"]+)"/g,(_,p)=>'from '+JSON.stringify(new URL('src/'+p,root).href));
const worker=(await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).default;
const calls=[];const env={ROOMS:{getByName(name){return {async fetch(input,options){const req=input instanceof Request?input:new Request(input,options);calls.push({name,url:req.url,method:req.method,upgrade:req.headers.get('upgrade')});if(req.url.endsWith('/init'))return new Response(JSON.stringify({room:{code:'QA'}}),{status:201});return new Response(JSON.stringify({ok:true,rooms:[]}));}}}}};
const request=(path,options)=>worker.fetch(new Request('https://game.example'+path,options),env);
for(const path of ['/','/index.html','/offline.html','/MasodoSurvival.html','/network_adapter.js','/assets/images/standing/row0.webp','/assets/images/original/c01/neutral.png']){const res=await request(path);assert.equal(res.status,404,path);assert(!((await res.text()).includes('<canvas')))}
assert.equal(calls.length,0,'web/image requests must never access game rooms');
for(const path of ['/api/health','/api/catalog?clientVersion='+GAME_VERSION]){const res=await request(path);assert.equal(res.status,200);assert.equal(res.headers.get('access-control-allow-origin'),'*');const data=await res.json();assert(data.ok);if(path.startsWith('/api/catalog')){assert.equal(data.characters.length,52);assert(data.items)}}
assert.equal((await request('/api/catalog',{method:'OPTIONS',headers:{origin:'null'}})).status,204);
assert.equal((await request('/api/rooms')).status,200);assert(calls.at(-1).url.endsWith('/directory/list'));
assert.equal((await request('/api/room/create',{method:'POST',headers:{'content-type':'application/json',origin:'null'},body:JSON.stringify({name:'API test',aiMode:'none'})})).status,201);
await request('/api/room/ABC123/status');assert(calls.at(-1).url.endsWith('/status'));
await request('/api/room/ABC123/ws',{headers:{upgrade:'websocket'}});assert(calls.at(-1).url.endsWith('/ws'));assert.equal(calls.at(-1).upgrade,'websocket');
assert.equal((await request('/api/unknown')).status,404);
console.log('PASS: deploy contains only static 404, no game/image asset binding; direct web/image routes do not touch rooms; standalone CORS/catalog/list/create/status/WebSocket routing preserved (request/stub integration)');
