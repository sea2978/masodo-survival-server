# 마소도 Cloudflare 멀티플레이 서버 — Phase 2P

현재 기준은 Cloudflare Workers + SQLite-backed Durable Objects 기반 **서버 권위형 온라인 버전**입니다.

## 현재 구현됨
- 51명 캐릭터 카탈로그와 시작 지역 선택
- 최대 인간 플레이어 10명 + AI 충원 경기
- 서버 권위형 MatchState / 이동 / 탐색 / 제작 / 전투 / 상태이상 / 소모품
- 캐릭터 패시브 / 전투 스킬 / 추가 행동
- 야생 적 / 이벤트 / 시체 / 루팅 / 추천 제작
- 서버 저장 및 경기 중 재접속
- WebSocket Hibernation API
- 공개 방 목록 `GET /api/rooms`
- 로비/경기 재접속 토큰
- 마지막 접속자가 나간 방은 10분 후 자동 삭제
- 사람이 한 명도 없는 경기에서는 1초 AI alarm 루프를 중지
- 클라이언트의 2초 `request_state` 폴링 제거
- 기존 Offline Alpha 0.6.4는 `/offline.html`에 보존

## 요청량 관련
이전 빌드는 시작된 방에서 모든 사람이 나가도 AI tick용 Durable Object alarm이 약 1초 간격으로 계속 예약될 수 있었습니다.
현재 빌드는 접속한 사람이 0명이 되면 경기 tick을 멈추고, 방 정리용 alarm만 남깁니다. 빈 방은 10분 뒤 저장소와 방 목록에서 제거됩니다.

## 재접속
브라우저는 방별 재접속 토큰을 `localStorage`에 저장합니다. 새로고침/일시적 연결 해제 뒤 같은 방에 들어오면 기존 세션/경기 플레이어로 복귀합니다. 기존 배포에서 만들어진 실행 중 경기와의 호환을 위해 이전 `sessionStorage` 세션 ID도 한시적으로 fallback으로 받습니다.

## 테스트
`npm test`는 엔진, 카탈로그, 전체 패리티, 모든 전투 스킬/추가 행동/소모품/이벤트 선택지, 제작 preflight, 추천, 이벤트 조건, 동시성, 패시브와 Phase 2O/2P 감사 스위트를 실행합니다.

부하/장시간 시뮬레이션은 기본 `npm test`에 넣지 않습니다.

## API
- `GET /api/health`
- `GET /api/catalog`
- `GET /api/rooms`
- `POST /api/room/create`
- `GET /api/room/{CODE}/status`
- `WS /api/room/{CODE}/ws`

## 이미지
`public/assets/images/` 아래에 PNG/WebP를 추가할 수 있습니다. 이미지 리소스 추가는 Durable Object 경기 로직과 독립적입니다.

## 배포
```bash
npm install
npx wrangler login
npm test
npm run deploy
```

## 보안
Cloudflare Global API Key나 비밀번호를 HTML/JS에 넣지 않습니다.

## 정식 개발 작업본

알파 전용 방 생성 코드와 테스트 서버 고정 연결은 사용하지 않습니다. 웹에서는 현재 접속한 서버 주소가 기본 입력되며, 단일 HTML에서는 서버 주소를 입력해 연결합니다. 지역 제한, 준최종 반복 획득·제작, 장비 보상 선택, 정보 갱신, 모바일 조우 배치 등 적용된 기능과 수정사항은 유지합니다.

시작 시 플레이어명과 서버 주소를 입력해 접속한 뒤, 로비의 빠른대전·방 목록·아이템 도감·캐릭터 도감·플레이어 세팅 팝업을 사용합니다. 빠른대전은 참가 가능한 방을 찾고, 없으면 방을 만든 뒤 준비 상태로 전환합니다. 경기 시작은 방장이 진행합니다.
