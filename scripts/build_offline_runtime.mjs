import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
export function buildOfflineRuntime(root=process.cwd()){
 const modules=new Map(),visiting=new Set();
 function visit(rel){
  if(modules.has(rel))return;if(visiting.has(rel))throw Error('offline module cycle: '+rel);visiting.add(rel);
  let source=fs.readFileSync(path.join(root,rel),'utf8');
  source=source.replace(/^import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["'];?/gm,(_,names,target)=>{const resolved=target==='cloudflare:workers'?target:path.posix.normalize(path.posix.join(path.posix.dirname(rel),target));if(resolved!=='cloudflare:workers')visit(resolved);return 'const {'+names+'}=__modules['+JSON.stringify(resolved)+'];'});
  const exports=[...source.matchAll(/export\s+(?:async\s+)?(?:const|let|function|class)\s+(\w+)/g)].map(x=>x[1]);source=source.replace(/\bexport\s+/g,'');
  if(/^import\s/m.test(source))throw Error('unhandled import: '+rel);
  modules.set(rel,'__modules['+JSON.stringify(rel)+']=(()=>{\n'+source+'\nreturn {'+exports.join(',')+'};\n})();');visiting.delete(rel);
 }
 visit('src/offline_session.js');
 const text='// Generated from the current authoritative game modules. No runtime downloads.\nconst OfflineRuntime=(()=>{\nclass DurableObject{constructor(ctx){this.ctx=ctx}}\nclass WebSocketRequestResponsePair{}\nconst __modules={"cloudflare:workers":{DurableObject}};\n'+[...modules.values()].join('\n')+'\nreturn __modules["src/offline_session.js"];\n})();\nexport const installOfflineMode=OfflineRuntime.installOfflineMode;\nexport const OfflineSession=OfflineRuntime.OfflineSession;\n';
 fs.writeFileSync(path.join(root,'public/offline_runtime.js'),text);return text;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log('Built offline runtime:',Buffer.byteLength(buildOfflineRuntime()));
