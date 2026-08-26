<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# insta-auto — 인스타그램 캐러셀 자동 게시

1인 뷰티샵 원장 교육을 하는 속눈썹 아티스트의 계정을 위한 시스템.
캐러셀을 미리 만들어 큐에 쌓아두면 **매일 오전 8시(한국)에 하나씩 자동으로 올라간다.**

목표는 두 가지다. 국내에서는 "이 사람한테 배우고 싶다"는 신뢰를 만들고,
해외 계정에는 "한국에서 유명한 속눈썹 아티스트"로 읽히게 하는 것.
그래서 모든 슬라이드에 영문(`en`)을 병기한다.

## 구조

```
content/brand.ts    색·글자 크기·여백. 무드보드 결과가 들어갈 자리
content/posts.ts    캐러셀 콘텐츠 큐  ← 원장님이 직접 고치는 파일
lib/slides.tsx      슬라이드 한 장을 그리는 JSX (satori라 flexbox만 된다)
lib/og-font.ts      한글 폰트 서브셋 로더 (ownertype에서 가져옴)
lib/queue.ts        며칠에 무엇이 나갈지 계산
lib/instagram.ts    Graph API 3단계 게시
app/page.tsx        미리보기 — 피드 그리드 + 캐러셀 전체
app/api/slide/…     슬라이드 → PNG (인스타가 가져갈 공개 주소)
app/api/cron/…      매일 한 번 깨어나 오늘 글을 올린다
vercel.json         cron: "0 23 * * *" = UTC 23시 = 한국 오전 8시
```

## 설계상 지켜야 할 것

**게시 상태를 저장하지 않는다.** `QUEUE_START_DATE`로부터 며칠째인지로 순서를 정한다.
덕분에 미리보기에서 며칠에 무엇이 나가는지 미리 볼 수 있고, 재배포해도 순서가 안 흔들린다.
대신 **이미 나간 글의 순서를 바꾸면 안 된다.** 앞에 끼워 넣으면 뒤가 전부 하루씩 밀린다.

**이미지는 우리가 올리지 않고 인스타가 가지러 온다.** 그래서 슬라이드 주소는 로그인 없이
열리는 https여야 한다. localhost로는 절대 게시되지 않는다. 배포 후에만 실제 게시가 된다.

**캐러셀은 최대 10장, 첫 장 비율로 나머지가 잘린다.** 전부 4:5(1080×1350)로 통일돼 있다.
4:5는 피드에서 세로로 가장 크게 잡히고 글도 많이 들어간다.

**슬라이드는 satori로 그린다.** flexbox만 되고 grid는 무시된다. 자식이 둘 이상인 요소에는
`display:flex`를 반드시 준다. 줄바꿈은 `whiteSpace: "pre-line"`이 있어야 먹는다.

**4:5 판에 글이 적으면 가운데가 휑해진다.** 그래서 레이아웃이 위/가운데/아래 세 칸이고,
가운데 칸이 남는 공간을 전부 먹는다. 표지만 아래쪽 정렬로 잡지처럼 앉혔다.

## 연결에 필요한 것 (아직 안 됨)

게시가 실제로 되려면 환경변수 두 개가 필요하다. 넣기 전까지 cron은
"인스타 연결 전입니다"를 돌려주고 아무것도 올리지 않는다 — 앱이 죽지는 않는다.

```
IG_USER_ID        인스타 프로페셔널 계정의 숫자 ID
IG_ACCESS_TOKEN   장기 액세스 토큰
QUEUE_START_DATE  첫 글이 나갈 날 (기본 2026-09-01)
CRON_SECRET       cron 주소를 아무나 못 부르게 (Vercel이 자동으로 넣어준다)
SITE_URL          배포 도메인. 안 넣으면 Vercel이 준 도메인을 쓴다
```

받으려면 선행 조건이 있다:

1. 인스타 계정을 **프로페셔널(비즈니스/크리에이터)** 로 전환
2. **페이스북 페이지**를 만들어 인스타 계정과 연결
3. Meta 개발자 앱 생성 → `instagram_business_content_publish` 권한
4. 장기 토큰 발급 (60일마다 갱신 필요 — 갱신 자동화는 아직 안 만들었다)

## 아직 안 된 것

- **무드보드** — 참고 계정 리스트를 아직 못 받았다. 받으면 계정별로 피드 구성·색감·표지
  문구 스타일을 뜯어 `content/brand.ts`에 반영한다. 지금 색은 방향만 보고 잡은 초안이다.
- **계정 정보** — `content/brand.ts`의 `handle`이 `@your_account`인 채로 있다.
- **사진 배경** — 지금은 글자만 있다. 표지 위쪽 빈 공간은 시술 사진이 들어갈 자리다.
- **토큰 자동 갱신** — 60일마다 사람이 갱신해야 한다.
- **콘텐츠 3개뿐** — 매일 나가면 사흘이면 마른다. 20~30개는 있어야 한다.

## 명령어

```
npm run dev        미리보기 (http://localhost:3000)
npm run build      배포 빌드
npm run typecheck  타입 검사
```

로컬에서 게시 흐름만 확인하려면 `curl localhost:3000/api/cron/publish`.
이미지 주소가 localhost라 실제 게시는 실패하고, 어디까지 가는지만 볼 수 있다.
