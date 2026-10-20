import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const html=fs.readFileSync('public/index.html','utf8'),nodes=new Map(),listeners={};
const $=id=>{if(!nodes.has(id))nodes.set(id,{style:{},setAttribute(k,v){this[k]=v},contains:target=>target===nodes.get('#loginMascotButton')});return nodes.get(id)};
const ctx={$ ,document:{addEventListener:(k,fn)=>listeners[k]=fn},Image:class{naturalWidth=448;naturalHeight=725;set src(value){this.url=value;queueMicrotask(()=>this.onload())}},assetUrl:x=>x,Map,Promise};vm.createContext(ctx);
vm.runInContext(html.match(/const EXTRA_CHARACTER_IMAGES=.*;/)[0]+'\n'+html.match(/const spriteImageCache=new Map\(\);[\s\S]*?\nfunction setUserCharacterSprite/)[0].replace(/\nfunction setUserCharacterSprite$/,''),ctx);
for(const id of ['c34','c35'])for(const emotion of ['neutral','angry','closed_eyes','happy','contempt','sad','embarrassed','base']){
 const canvas={style:{},setAttribute(){},getContext:()=>({drawImage(image,...args){canvas.image=image;canvas.args=args}})},fallback={style:{}};ctx.canvas=canvas;ctx.fallback=fallback;
 vm.runInContext(`setExtraCharacterSprite(canvas,fallback,'${id}','테스트','standing','${emotion}')`,ctx);await new Promise(r=>setImmediate(r));assert.equal(canvas.style.display,'block');assert(canvas.image.url.includes('/transformed/'));assert.equal(canvas.height,725);
}
vm.runInContext(html.slice(html.indexOf('{const mascot=$(\'#loginMascot\')'),html.indexOf("$('#loginForm').onsubmit=")),ctx);
const button=$('#loginMascotButton'),bubble=$('#loginMascotBubble');button.onpointerenter();assert(!bubble.hidden);button.onpointerleave();assert(bubble.hidden);button.onclick();assert(!bubble.hidden);button.onpointerleave();assert(!bubble.hidden);button.onclick();assert(bubble.hidden);button.onfocus();assert(!bubble.hidden);listeners.keydown({key:'Escape'});assert(bubble.hidden);button.onclick();listeners.pointerdown({target:{}});assert(bubble.hidden);
assert(html.includes('적 캐릭터 AI를 수정하고 린이랑 엘린 이미지도 추가했어요! 화와는...지피티가 안된다해서...'));assert(/type="button" class="mascot-button"/.test(html));
console.log('PASS: 린·엘린 expression rendering; hover, focus, click pin, second click, outside click and Escape mascot dismissal');
