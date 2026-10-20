import {equipmentKind,itemClassLabel,itemClassIcon} from '../src/item_classification.js';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {ITEMS} from '../src/offline_content.js';
import {CHARACTERS} from '../src/game_data.js';
const source=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8'),els=new Map();
const element=()=>({value:'',textContent:'',innerHTML:'',scrollTop:0,querySelector(selector){if(selector!=='.item-codex-grid')return null;return this.grid??={scrollTop:0}},querySelectorAll(selector){const attribute=selector.slice(1,-1),regex=new RegExp(attribute+'="([^"]+)"','g');const nodes=[...this.innerHTML.matchAll(regex)].map(m=>({dataset:{[attribute==='data-codex-category'?'codexCategory':'codexSelect']:m[1]},onclick:null}));(this.nodes??={})[attribute]=nodes;return nodes}});
const $=id=>{if(!els.has(id))els.set(id,element());return els.get(id)};
const ctx={favoriteItems:[],equipmentKind,itemClassLabel,itemClassIcon,$,net:{catalog:{items:ITEMS,characters:CHARACTERS}},D:{items:ITEMS},escapeRoomText:x=>String(x).replaceAll('<','&lt;'),me:()=>null};vm.createContext(ctx);
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
$('#itemCodexSearch').value='마술사의';ctx.renderItemCodex(true);html=$('#itemCodexList').innerHTML;assert(html.includes('data-codex-select="final_22"'),'material shows direct upgrades');
$('#itemCodexList').nodes['data-codex-select'].find(b=>b.dataset.codexSelect==='final_22').onclick();assert.equal($('#itemCodexSearch').value,'마술사의');assert($('#itemCodexList').innerHTML.includes('<h3>량아 레하의 금속 카드</h3>'));
$('#itemCodexList').nodes['data-codex-select'].find(b=>b.dataset.codexSelect==='rare_throw').onclick();assert($('#itemCodexList').innerHTML.includes('<h3>'+ITEMS.rare_throw.n+'</h3>'));
$('#itemCodexSearch').value='';vm.runInContext("itemCodexCategory='weapon'",ctx);ctx.renderItemCodex(true);
const root=$('#itemCodexList');root.querySelector('.item-codex-grid').scrollTop=240;
root.nodes['data-codex-select'][1].onclick();assert.equal(vm.runInContext('itemCodexCategory',ctx),'weapon');assert.equal(root.querySelector('.item-codex-grid').scrollTop,240);assert(root.innerHTML.includes('craft-cat active" data-codex-category="weapon'));
$('#itemCodexSearch').value='zzzznonexistent';ctx.renderItemCodex(true);assert($('#itemCodexList').innerHTML.includes('검색 결과가 없습니다.'));
// Character values remain stable codes on the wire, while their visible labels use names.
ctx.charInfo=id=>CHARACTERS.find(c=>c.id===id);vm.runInContext(source.slice(source.indexOf('function characterName('),source.indexOf('function charInfo(')),ctx);assert.equal(ctx.characterName('c46'),'량아 레하');assert(!ctx.characterName('missing').includes('missing'));
ctx.rname=x=>x;vm.runInContext(source.slice(source.indexOf('function aiSettingText('),source.indexOf('let roomEntryBusy=')),ctx);ctx.renderRoom({name:'QA',code:'ABCDEF',humanCount:1,maxHumans:10,players:[{playerName:'QA',charId:'c46',startRegion:'city'}]});assert($('#roomState').innerHTML.includes('량아 레하'));assert(!$('#roomState').innerHTML.includes('c46'));
assert(source.includes('value="${c.id}">${escapeRoomText(c.name)}</option>'));assert(!source.includes('${c.id} · ${c.name}</option>'));
console.log('PASS: shared crafting categories, recursive ingredient quantities/cycle guard, upgrade links/search, character names in room/settings with unchanged network IDs (DOM mocks)');
// Regression: attack+defense gear appeared in both categories; utility gear with ATK was labelled a weapon.
$('#itemCodexSearch').value='';
const expectedWeapon=['gauntlet','basic_gauntlet','rare_magic','final_01','final_16','final_20','final_22'];
const expectedEquipment=['basic_mask','rare_mask','near_final_12','near_final_01','near_final_06','near_final_15','basic_accessory','basic_terminal','aim_terminal','basic_tool','toxin_kit','near_final_13','near_final_14','basic_armament','final_03'];
for(const [ids,category,label,icon]of [[expectedWeapon,'weapon','무기','W'],[expectedEquipment,'armor','장비','E']])for(const id of ids){assert.equal(ctx.craftCategoryMatch(id,ITEMS[id],category),true,id);assert.equal(ctx.craftCategoryMatch(id,ITEMS[id],category==='weapon'?'armor':'weapon'),false,id);assert.equal(itemClassLabel(ITEMS[id]),label);assert.equal(itemClassIcon(ITEMS[id]),icon);vm.runInContext('itemCodexCategory='+JSON.stringify(category)+';itemCodexSelected='+JSON.stringify(id),ctx);ctx.renderItemCodex();assert($('#itemCodexList').innerHTML.includes(ITEMS[id].n));assert($('#itemCodexList').innerHTML.includes(' · '+label));}
let weapons=0,equipment=0;
for(const [id,it]of Object.entries(ITEMS)){const w=ctx.craftCategoryMatch(id,it,'weapon'),e=ctx.craftCategoryMatch(id,it,'armor');assert(!(w&&e),id+' has overlapping categories');if(it.t==='e'){assert(['weapon','equipment'].includes(it.equipKind),id+' lacks explicit metadata');assert(w!==e,id+' is missing from wearable categories');assert.equal(equipmentKind({...it,atk:999,def:999}),it.equipKind,'stat bonuses must never change kind');w?weapons++:equipment++;}else assert(!w&&!e,id+' is not a wearable');}
console.log('PASS: all '+weapons+' weapons and '+equipment+' equipment items are explicitly typed, mutually exclusive and unaffected by stat bonuses; named counterexamples render correctly in the actual codex (DOM mocks)');
