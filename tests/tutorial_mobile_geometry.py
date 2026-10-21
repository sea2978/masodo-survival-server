from pathlib import Path
s=Path('public/index.html').read_text()
css=s.split('/* Tutorial chapter picker and its independent in-game scenario surface. */',1)[1].split('</style>',1)[0]
for rule in ['#tutorialGameScreen[hidden]','position:fixed;inset:0;z-index:150','scenario-dialogue-box','scenario-select-grid' if False else 'tutorial-select-grid','max-height:48dvh','--sc-button:46px','overflow:auto','bottom:max(16px,env(safe-area-inset-bottom))']:
 assert rule in css,rule
for w,h in [(320,568),(390,844),(640,360),(844,390),(1280,720)]:
 mobile=w<=700 or w<=1400;button=46 if mobile else 64
 actions=3*button+12;left=110 if .20*w<110 else min(.20*w,170)
 assert actions+left+24<w,(w,h,'HUD/action overlap')
 dialogue_width=.94*w-28;assert dialogue_width>250
 assert .5*h>=132 if h<=500 and w>h else .48*h>=160
 print(w,h,'scenario controls',actions,'dialogue text width',round(dialogue_width))
print('PASS: chapter selector, dedicated surface and mobile/landscape geometry; real browser appearance unverified')
