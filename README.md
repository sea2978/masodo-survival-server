# 마소도 Cloudflare 멀티플레이 서버 — Phase 1

현재 단계는 Cloudflare Workers + Durable Objects 기반 멀티플레이 골격입니다.

## 구현됨
- Workers API 라우터
- SQLite-backed Durable Object `GameRoom`
- WebSocket Hibernation API
- 6자리 방 코드 생성
- 방 상태 조회
- 최대 인간 플레이어 10명
- 플레이어 이름 / 캐릭터 코드
- Ready 상태 동기화
- 모든 Ready 상태에서 시작 요청
- 간단 채팅 프로토콜
- 정적 HTML/JS/이미지 배포 구조
- 기존 Offline Alpha 0.6.4를 `/offline.html`로 보존
- `network_adapter.js` 분리

## 아직 서버로 옮기지 않은 것
Phase 1에서는 실제 경기 판정 엔진은 아직 클라이언트 0.6.4에 있습니다.
다음 단계에서 MatchState, 캐릭터/아이템 데이터, 탐색/이동/제작, 전투/상태이상/소모품, AI, 시체/특수재료, 서버 tick, 재접속 snapshot을 서버 권위형으로 이동합니다.

## 이미지 추가
이미지는 지금 없어도 됩니다. `public/assets/images/` 아래에 나중에 PNG/WebP 등을 넣고 HTML에서 경로만 연결하면 됩니다. 이미지 추가는 Durable Object 게임방 서버 구조와 독립적입니다.

## 최초 배포
```bash
npm install
npx wrangler login
npm run deploy
```

## 테스트
1. 배포 주소를 브라우저 창 두 개에서 엽니다.
2. 첫 창에서 방 생성.
3. 생성된 코드를 두 창 모두 입력.
4. 각기 다른 이름으로 접속.
5. Ready ON.
6. 두 플레이어가 모두 Ready면 시작 요청.

현재 시작 요청은 실제 경기를 시작하지 않고 `match_start_pending`을 브로드캐스트합니다. 이 지점이 Phase 2 서버 권위형 Match Engine 이식 지점입니다.

## API
- `GET /api/health`
- `POST /api/room/create`
- `GET /api/room/{CODE}/status`
- `WS /api/room/{CODE}/ws`

## 보안
Cloudflare Global API Key나 비밀번호를 HTML/JS에 넣지 마세요.
