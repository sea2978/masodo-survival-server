from pathlib import Path
s=Path('public/index.html').read_text()
css=s.split('/* Tutorial surface is scoped;',1)[1].split('</style>',1)[0]
assert '#tutorialPanel .tutorial-lesson{overflow:auto' in css
assert 'grid-template-columns:158px minmax(0,1fr)' in css
assert 'grid-template-rows:62px minmax(0,1fr)' in css
assert 'height:calc(100dvh - 16px)' in css
for w,h in [(320,568),(390,844),(640,360),(844,390),(1280,720)]:
 dialog_w=min(1120,.96*w) if w>1400 else w-16
 if h<=500 and w>h:lesson_w=dialog_w-20-158-8;lesson_h=h-16-20-60
 else:lesson_w=dialog_w-20-8;lesson_h=h-16-20-70-62-8
 assert lesson_w>=220 and lesson_h>=220,(w,h,lesson_w,lesson_h)
 assert 34+64+6<lesson_w-82-16,(w,h,'vital meter space')
 print(w,h,'lesson bounds',round(lesson_w),round(lesson_h))
print('PASS: scoped tutorial CSS and viewport geometry; these checks do not assert real browser appearance')
