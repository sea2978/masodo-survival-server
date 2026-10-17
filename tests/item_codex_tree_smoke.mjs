import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {ITEMS} from '../src/offline_content.js';
import {CHARACTERS} from '../src/game_data.js';
const source=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),els=new Map();
const element=()=>({value:'',textContent:'',innerHTML:'',scrollTop:0,querySelector(){return null},querySelectorAll(selector){const attribute=selector.slice(1,-1),regex=new RegExp(attribute+'="([^"]+)"','g');const nodes=[...this.innerHTML.matchAll(regex)].map(m=>({dataset:{[attribute==='data-codex-category'?'codexCategory':'codexSelect']:m[1]},onclick:null}));(this.nodes??={})[attribute]=nodes;return nodes}});
const $=id=>{if(!els.has(id))els.set(id,element());return els.get(id)};
const ctx={$,net:{catalog:{items:ITEMS,characters:CHARACTERS}},D:{items:ITEMS},escapeRoomText:x=>String(x).replaceAll('<','&lt;'),me:()=>null};vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf('function craftStatsText('),source.indexOf('function nextUpgradeItems(')),ctx);
vm.runInContext(source.slice(source.indexOf("let itemCodexCategory="),source.indexOf('function renderCharacterCodex(')),ctx);
ctx.renderItemCodex();let html=$('#itemCodexList').innerHTML;for(const label of ['전체','무기','장비','소모품','재료'])assert(html.includes('>'+label+'</button>'));
for(const category of ['weapon','armor','consumable','material']){
 vm.runInContext('itemCodexCategory='+JSON.stringify(category),ctx);ctx.renderItemCodex();html=$('#itemCodexList').innerHTML;
 const grid=html.split('<div class="item-codex-grid">')[1].split('</div>')[0];for(const [,id]of grid.matchAll(/data-codex-select="([^"]+)"/g))assert(ctx.craftCategoryMatch(id,ITEMS[id],category),category+':'+id);
}
vm.runInContext("itemCodexCategory='all';itemCodexSelected='final_22'",ctx);ctx.renderItemCodex();html=$('#itemCodexList').innerHTML;
assert(html.includes('량아 레하의 금속 카드'));assert(html.includes('마술사의 금속 카드'));assert(html.includes('data-codex-select="rare_throw"'));assert(html.includes('제작 트리'));assert(html.includes('상위 아이템'));
const tree=ctx.codexRecipeTree(ITEMS,'final_22');assert(tree.includes('special_37'));for(const part of Object.keys(ITEMS.rare_throw.r))assert(tree.includes('data-codex-select="'+part+'"'));
const counted=ctx.codexRecipeTree({a:{n:'A',r:{b:2}},b:{n:'B',r:{c:3}},c:{n:'C'}},'a');assert(counted.includes('C ×6'));assert(ctx.codexRecipeTree({a:{n:'A',r:{a:1}}},'a').length<500,'cycles must stop');
$('#itemCodexSearch').value='마술사의';ctx.renderItemCodex();html=$('#itemCodexList').innerHTML;assert(html.includes('data-codex-select="final_22"'),'material shows direct upgrades');
$('#itemCodexList').nodes['data-codex-select'].find(b=>b.dataset.codexSelect==='final_22').onclick();assert.equal($('#itemCodexSearch').value,'');assert($('#itemCodexList').innerHTML.includes('<h3>량아 레하의 금속 카드</h3>'));
$('#itemCodexList').nodes['data-codex-select'].find(b=>b.dataset.codexSelect==='rare_throw').onclick();assert($('#itemCodexList').innerHTML.includes('<h3>'+ITEMS.rare_throw.n+'</h3>'));
$('#itemCodexSearch').value='zzzznonexistent';ctx.renderItemCodex();assert($('#itemCodexList').innerHTML.includes('검색 결과가 없습니다.'));
// Character values remain stable codes on the wire, while their visible labels use names.
ctx.charInfo=id=>CHARACTERS.find(c=>c.id===id);vm.runInContext(source.slice(source.indexOf('function characterName('),source.indexOf('function charInfo(')),ctx);assert.equal(ctx.characterName('c46'),'량아 레하');assert(!ctx.characterName('missing').includes('missing'));
ctx.rname=x=>x;vm.runInContext(source.slice(source.indexOf('function aiSettingText('),source.indexOf('let roomEntryBusy=')),ctx);ctx.renderRoom({name:'QA',code:'ABCDEF',humanCount:1,maxHumans:10,players:[{playerName:'QA',charId:'c46',startRegion:'city'}]});assert($('#roomState').innerHTML.includes('량아 레하'));assert(!$('#roomState').innerHTML.includes('c46'));
assert(source.includes('value="${c.id}">${escapeRoomText(c.name)}</option>'));assert(!source.includes('${c.id} · ${c.name}</option>'));
console.log('PASS: shared crafting categories, recursive ingredient quantities/cycle guard, upgrade links/search, character names in room/settings with unchanged network IDs (DOM mocks)');
