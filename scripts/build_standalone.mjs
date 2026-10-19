import fs from "node:fs";
import{buildOfflineRuntime}from"./build_offline_runtime.mjs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const indexPath = path.join(publicDir, "index.html");
const adapterPath = path.join(publicDir, "network_adapter.js");
const outputPath = path.join(publicDir, "MasodoSurvival.html");

let html = fs.readFileSync(indexPath, "utf8");
const offlineRuntime=buildOfflineRuntime(root).replace(/export const /g,"const ");
html=html.replace('import{installOfflineMode}from"./offline_runtime.js";',offlineRuntime);
const intro=fs.readFileSync(path.join(publicDir,"match_intro.js"),"utf8").replace("export class MatchIntro","class MatchIntro");
html=html.replace('import{MatchIntro}from"./match_intro.js";',intro);
const debuffs=fs.readFileSync(path.join(publicDir,"debuff_hud.js"),"utf8").replace("export class DebuffHud","class DebuffHud");
html=html.replace('import{DebuffHud}from"./debuff_hud.js";',debuffs);
const reactions=fs.readFileSync(path.join(publicDir,'portrait_reactions.js'),'utf8').replace(/^export\s+class/gm,'class');
const expressions=fs.readFileSync(path.join(publicDir,'portrait_expressions.js'),'utf8').replace(/^export\s+const/m,'const');
html=html.replace('import{PortraitReactions,EnemyExitReaction}from"./portrait_reactions.js";',reactions).replace('import{PORTRAIT_EXPRESSIONS}from"./portrait_expressions.js";',expressions);
let adapter = fs.readFileSync(adapterPath, "utf8").replace(/^export\s+class\s+MasodoNetworkAdapter/m, "class MasodoNetworkAdapter");

function dataUrl(rel) {
  const full = path.join(publicDir, rel.replace(/^\//, ""));
  const buf = fs.readFileSync(full);
  const ext = path.extname(full).toLowerCase();
  const mime = ext === ".webp" ? "image/webp" : ext === ".png" ? "image/png" : "application/octet-stream";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

for(const file of ['Neutral','Angry','Closed','Happy','Contempt','Sad','Embarrassed','Base','Profile']){const rel='/assets/images/user/'+file+'.png';html=html.split(rel).join(dataUrl(rel))}

const bgNames = [
  "city","estate","church","factory",
  "mgmt_lobby","mgmt_admin","mgmt_director","mgmt_cafeteria","mgmt_lab","mgmt_training",
  "evil_reception","evil_quarters","evil_training"
];

for (const name of bgNames) {
  const rel = `/assets/images/backgrounds/${name}.webp`;
  html = html.split(rel).join(dataUrl(rel));
}

for(const emotion of ['angry','closed_eyes','happy','contempt'])for(let row=0;row<6;row++){
 const rel=`/assets/images/expressions/${emotion}/row${row}.webp`;html=html.split(rel).join(dataUrl(rel));
}

const standingRows = Array.from({length:6}, (_,i)=>dataUrl(`/assets/images/standing/row${i}.webp`));
const profileRows = Array.from({length:6}, (_,i)=>dataUrl(`/assets/images/profile/row${i}.webp`));
const embeddedRows = { standing: standingRows, profile: profileRows };

html = html.replace('import{MasodoNetworkAdapter}from"./network_adapter.js";', adapter+'\n');

html = html.replace(
  /const SPRITE_ROWS=\{[\s\S]*?\};\nconst STANDING_SPRITES=/,
  `const SPRITE_ROWS=${JSON.stringify(embeddedRows)};\nconst STANDING_SPRITES=`
);

html = html.replace(
  '<a href="/offline.html">오프라인 빌드</a>',
  '<span class="muted">단일 HTML 클라이언트 · 서버 데이터 통신만 사용</span>'
);

html = html.replace(
  "<title>마소도 서바이벌 · 버전 확인 중</title>",
  "<title>마소도 서바이벌 · 단일 HTML 클라이언트</title>"
);

// Every dependency is bundled above, so local clients need no module loader.
html=html.replace('<script type="module">','<script>');
fs.writeFileSync(outputPath, html);
console.log(`Built ${outputPath}: ${(fs.statSync(outputPath).size/1024/1024).toFixed(1)} MiB`);
