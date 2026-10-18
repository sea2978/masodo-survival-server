from pathlib import Path
import re
source=Path(__file__).resolve().parents[1]/'public'/'index.html'
css=source.read_text().split('/* Mobile encounter layout:',1)[1].split('/* Login and popup-based lobby. */',1)[0].split('</style>',1)[0]
css='/* Mobile encounter layout:'+css
assert css.startswith('/* Mobile encounter layout:')
assert css.count('@media')==1 and '(pointer:coarse)' in css and '(orientation:landscape)' in css
rules={selector.strip():body for selector,body in re.findall(r'([^{}]+)\{([^{}]*)\}',css)}
enemy=rules['#gameScreen .enemy-standing-slot'];pane=rules['#gameScreen #game.encounter-layer']
assert 'left:0' in enemy and 'right:0' in enemy and 'justify-content:center' in enemy
assert 'left:50%' in rules['#gameScreen .visual-stage'] and 'top:auto' in rules['#gameScreen .visual-stage']
assert 'top:auto' in pane and 'bottom:max(6px' in pane and 'transform:translateX(-50%)' in pane
assert 'overflow:auto' in pane and 'overscroll-behavior:contain' in pane
assert rules['body.game-active #toastStack .top-toast:not(:last-child)'].strip()=='display:none'
assert 'font-size:11px' in rules['body.game-active #toastStack .top-toast-main']
assert 'min-height:34px' in rules['#gameScreen #game .event-choice button']
# Bounds from the CSS length expressions, including the existing side HUDs.
for w,h in [(640,360),(740,360),(780,360),(844,390),(915,412),(1024,600),(1280,720)]:
 clamp=lambda a,b,c:max(a,min(b,c))
 left=clamp(132,.23*w,210);right=clamp(158,.26*w,230);diameter=clamp(44,.13*h,64)
 pane_width=min(420,w-left-right-28);pane_left=(w-pane_width)/2;pane_right=(w+pane_width)/2;pane_height=min(.34*h,2*diameter+16);pane_bottom=h-6
 inventory_bottom=h-(2*diameter+24)
 assert abs((pane_left+pane_right)/2-w/2)<.001
 assert pane_right-pane_left>=240,(w,h,'choice width')
 assert pane_bottom-pane_height>=inventory_bottom,(w,h,'inventory overlap')
 assert pane_right<=w-6-(2*diameter+6),(w,h,'action overlap')
 image_width=min(.38*w,300)
 for actual_info_height in [50,pane_height]:
  image_height=min(.68*h,420,h-actual_info_height-70)
  assert image_height>min(.34*h,160)*1.4
  assert image_width>min(.24*w,150)*1.5
  image_bottom=h-12;image_top=image_bottom-image_height
  assert image_top>=52,(w,h,'top bar overlap')
  assert image_bottom>h-actual_info_height-6,(w,h,'info must overlay image')
  assert image_bottom>h/2,(w,h,'image bottom is not in lower half')
 assert min(200,w-left-right-28)>=150,(w,h,'toast too narrow')
 print(f'{w}x{h}: bottom panel {pane_right-pane_left:.0f}x{pane_height:.0f}, centered lower encounter group and compact toast within bounds')
html=source.read_text()
assert 'class="event-choices"' in html and 'class="event-choice"' in html
assert "querySelectorAll('[data-event]')" in html
assert "message.textContent='서버 연결됨'" in html
assert "message.textContent='서버 연결 성공: '+url.origin" not in html
print('PASS: CSS rules and geometry checks only; real mobile/browser layout has not been asserted')

# Final mobile-only overrides stack bars below the unchanged bust and overlap encounter art.
mobile=html.split('/* Mobile player bars below portrait;',1)[1].split('</style>',1)[0]
assert 'grid-template-columns:minmax(0,1fr)' in mobile
assert '#gameScreen .player-hud{width:var(--bust-width)}' in mobile
assert '#gameScreen .visual-stage{bottom:max(12px,env(safe-area-inset-bottom))}' in mobile
assert mobile.count('@media(pointer:coarse)')==2
for w,h in [(640,360),(844,390),(915,412),(1280,720)]:
 bust=max(144,min(.22*w,176));portrait_h=bust*563/700
 bars_and_stats=3*21+2*4+5+24
 assert portrait_h+bars_and_stats<h-60,(w,h,'stacked player HUD fits below top bar')
print('PASS: mobile bars below bust, HUD within viewport, information overlaps enemy; desktop selectors unchanged')
