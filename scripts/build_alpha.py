from pathlib import Path
import re,sys,zipfile
source=Path(sys.argv[1]);out=Path(sys.argv[2]);s=source.read_text()
s,n=re.subn(r'(?:<label for="serverAddress">[^<]*</label>)?<input id="serverAddress"[^>]*>', '', s);assert n==1
s=s.replace("if(!$('#serverAddress').value)$('#serverAddress').value='https://masodo-survival-server.cheonbung.workers.dev';",'')
a=s.index(" try{url=new URL($('#serverAddress').value.trim());");b=s.index('\n button.disabled=true;',a)
s=s[:a]+" url=new URL('https://masodo-survival-server.alphacheonbung.workers.dev/');\n if(mobileScreenQuery.matches)void enterMobileFullscreen();"+s[b:]
s=s.replace('서버 주소를 입력하고 연결해 주세요.','플레이어명을 입력하고 알파 서버에 접속해 주세요.').replace('플레이어명과 서버 주소를 확인하고 접속하세요.','플레이어명을 확인하고 알파 서버에 접속하세요.').replace('주소와 연결 상태를 확인해 주세요.','연결 상태를 확인해 주세요.')
s=s.replace("try{\n  net.useOffline();", "try{\n  if(mobileScreenQuery.matches)void enterMobileFullscreen();\n  net.useOffline();")
css='''
/* Alpha mobile lobby: fill the viewport and respect device safe areas. */
@media(pointer:coarse) and (max-width:1400px){
 #lobbyScreen{width:100%;height:100dvh;box-sizing:border-box;padding:max(8px,env(safe-area-inset-top)) max(10px,env(safe-area-inset-right)) max(8px,env(safe-area-inset-bottom)) max(10px,env(safe-area-inset-left));gap:8px}
 #lobbyScreen .lobby-header{padding-right:96px;gap:8px}
 #lobbyScreen .lobby-menu{width:100%;box-sizing:border-box;align-content:center;gap:8px}
 #lobbyScreen .lobby-menu button{min-height:76px;padding:12px}
 #lobbyScreen .lobby-menu b{font-size:18px;margin-bottom:6px}
 .lobby-popup,#createRoomPanel{box-sizing:border-box;max-height:calc(100dvh - 16px);max-width:calc(100vw - 16px)}
}
@media(pointer:coarse) and (max-width:1400px) and (orientation:landscape){
 #lobbyScreen .lobby-menu{grid-template-columns:repeat(5,minmax(0,1fr))}
 #lobbyScreen .lobby-header h1{font-size:20px}
 #lobbyScreen .lobby-build .muted{display:none}
}
@media(pointer:coarse) and (max-width:1400px) and (orientation:portrait){
 #lobbyScreen .lobby-menu{grid-template-columns:repeat(2,minmax(0,1fr));align-content:start}
}
'''
s=s.replace('</style></head>',css+'</style></head>',1)
s=s.replace('<title>','<title>알파 테스트 · ',1)
assert '$('+"'#serverAddress'"+')' not in s
out.write_text(s)
with zipfile.ZipFile(out.with_suffix('.zip'),'w',zipfile.ZIP_DEFLATED,compresslevel=1)as z:z.write(out,out.name)
with zipfile.ZipFile(out.with_suffix('.zip'))as z:assert z.testzip() is None
print('Built alpha HTML and ZIP:',out)
