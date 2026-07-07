# Design System — hoonjo portfolio

> **현행 기준(2026-07-03~):** `/`, `/resume`, `/portfolio-pdf`, **`/work`(+`/work/[slug]`)** 전부 **`.hoonjo` 시스템**이 정식 기준이다.
> 값의 원본(single source of truth)은 [components/hoonjo/](components/hoonjo/) + [app/hoonjo.css](app/hoonjo.css)(스코프 토큰).
> 구 "문제지 책자" 디자인은 폐기됨(2026-07-03 `/work` 이관 완료).

## Product Context
- **What this is:** 7년차 프론트엔드 개발자의 이직용 포트폴리오 사이트.
- **Who it's for:** 채용 결정권자(FE 리드) + FE 구성원 + HR. 30~90초 안에 "어려운 FE 문제를 푸는 사람"인지 판단.
- **Space/industry:** 개발자 퍼스널 포트폴리오. 피어: Linear, Vercel 문서, Brittany Chiang.
- **Project type:** 케이스 스터디 중심 정적 사이트 (Next.js).
- **Memorable thing (북극성):** "측정 가능한 임팩트로 어려운 프론트엔드 문제를 푸는 사람." 모든 디자인 결정은 이걸 강화한다.

## Aesthetic Direction
- **Direction:** Editorial Minimal + "측정 도구(instrument)" 톤 — 엔지니어의 정밀한 실험 노트.
- **Decoration level:** intentional (헤어라인·블루프린트 그리드·부드러운 그림자로 절제된 구조감. 스큐어모픽 X).
- **Mood:** 차분, 자신감, 정밀. 과한 애니메이션·장식 금지(= 주니어 신호).
- **Light-only:** 다크 토글 없음. 대신 닫는 밴드(오픈소스·Contact)를 **"잉크 슬랩"**(near-black) 면으로 깔아 대비를 만든다 — 다크 테마가 아니라 섹션 대비 장치.
- **Signature:**
  1. **before → after 임팩트 스트립** — 히어로/케이스마다 "구 상태(취소선) → 신 상태(굵게)"로 성과를 수치화.
  2. **살아있는 렌더** — 사이드 프로젝트에 **실시간 WebGL 블랙홀**(중력렌즈 셰이더)이 실제로 돈다. column-count 트릭은 `/work/[slug]`의 라이브 column-pager 데모로.
  3. **mono 수치** — JetBrains Mono + `tabular-nums`로 수치를 그래픽 요소화("측정하는 엔지니어").
- **원리:** "조용한 껍데기, 시끄러운 방들" — 랜딩은 절제, 디테일/데모에서 터뜨림.
- **Reference sites:** Linear, Vercel docs, Brittany Chiang.

## Typography
- **Display/Hero (한·영):** **Pretendard** 600, 강조는 800(예: 히어로 "되게"). *(구 General Sans 폐기 — 한·영 통일과 신뢰감 우선. 개성은 weight 대비 600↔800로.)*
- **Body / UI (한·영):** Pretendard 400/500.
- **Metric·mono·code:** **JetBrains Mono** 400~600. 수치는 `font-variant-numeric: tabular-nums`, 라벨은 대문자 + `letter-spacing: 0.08~0.14em`.
- **Loading:** Pretendard = 자체 호스팅(next/font, `--font-pretendard`). JetBrains Mono = Google Fonts. *(구 jsdelivr Pretendard CDN은 404로 폐기.)*
- **Scale (clamp):** 히어로 H1 `clamp(30px,4.4vw,52px)` / 섹션 H2 40 / 케이스 H3 30~32 / H4 21 / body 15~19 / mono 라벨 11~13. letter-spacing 디스플레이 −0.035em. line-height 본문 1.6, 헤딩 1.1.

## Color
- **Approach:** near-white 캔버스 + **trust-blue(1차) + green(2차)**. 액센트는 링크·CTA·핵심 수치·상태에만 작게. 색은 헤어라인으로 면을 나눈다(회색 면 채움 X).
- **Blue — 구조/액션 (1차):** `#3182f6` / hover `#2174ea` / deep `#1b64da` / bright `#7daffa` / soft `#eaf2fe` / line `#c5dcfb`. *(구 Cobalt #2348FF 대체.)*
- **Green — 증명/라이브/featured (2차):** `#16a563` / deep `#157346` / bright `#43c98a` / soft `#e6f5ec` / line `#b6e3c8`. 섹션 번호·"현재" 마커·featured 뱃지·상태 점·수치 상승분에만.
- **Surface:** canvas `#f4f8ff`(홈·문서 페이지 바탕 — 흰 카드가 떠 보이게 살짝 쿨 틴트), paper `#ffffff`, cloud `#fcfdfe`(/work 서브트리 바탕), fog `#f6f8fa`, steel `#c2c8d1`, hairline `#e9ecf1`.
- **Ink slab (닫는 밴드):** ink `#18191c`, ink-soft `#232428`, ink-deep `#0b0c0e`. on-ink `#f5f6f8`, on-ink-muted `#a4a7b0`.
- **Text ramp:** text `#18191c` / secondary `#3a3c42` / muted `#6b6e76` / faint `#9a9da6`. (명도 단계로 위계, 불투명도 안 낮춤.)
- **Semantic:** positive = green-deep `#157346`, warn `#9a6312`, danger `#b3262b` (soft `#f8e7e6`). *(faint 메타 텍스트는 `#868992` — WCAG large-text 3:1 확보.)*

## Spacing
- **Base unit:** 8px
- **Density:** spacious (에디토리얼 여백)
- **Scale:** 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 128
- **섹션 리듬:** `clamp(56px, 9vw, 96px)` (모바일 56 → 데스크톱 96, 미디어쿼리 없이).
- **읽기 폭:** 본문 46~52ch, 컨테이너 1200px.

## Layout
- **Approach:** hybrid — 랜딩=에디토리얼 카드(세로 흐름), 문서(/resume·/portfolio-pdf)=인쇄용 시트, /work=홈과 같은 `.hoonjo` 캔버스(인덱스=플래그십 카드+행 리스트, 상세=캔버스 위 에디토리얼).
- **Container:** max-width **1200px**, 좌우 패딩 24px.
- **Cards:** paper + 1px hairline + `shadow-soft (0 2px 10px rgba(17,18,22,.06))`. 히어로엔 옅은 블루프린트 그리드 배경.
- **Border radius:** xs 2 / sm 4 / md 8 / lg 12 / **xl 16(카드)** / button 10 / tag(xs~sm) / pill 9999. *(구 카드 4px 폐기 — 일관된 스케일 사용, 단 전 요소 동일 버블 라운드는 금지.)*
- **Responsive:** 다단 그리드는 ≤900px에서 1열로 접힘, nav→버거. **모바일(≤900px) 히어로 인물 사진은 숨김** — 좁은 화면에선 헤드라인·가치 제안·CTA를 첫 화면에 먼저 보여준다.
- **Mobile-first 필수:** 리크루터 폰 스크리닝. 첫 화면에 가치 제안·CTA가 보이게.

## Motion
- **Approach:** minimal-functional + **"살아있는 렌더" 한 방**.
- **결정적 한 방:** 실시간 WebGL 블랙홀(항상 렌더), `/work/[slug]` column-pager 라이브 데모.
- **나머지:** live-dot 펄스(2.4s), nav·링크 hover 색/배경 전환, 인페이지 스무스 스크롤.
- **Easing:** enter ease-out / exit ease-in / move ease-in-out. **Duration:** micro 120ms / short 150ms / medium 250~400ms.
- **`prefers-reduced-motion` 존중:** 블랙홀은 정지 1프레임, 펄스 off.

## Anti-patterns (금지)
- 보라/바이올렛 그라데이션, 아이콘 3열 카드 그리드, 센터 정렬 일색, 전 요소 동일 버블 라운드, 그라데이션 CTA, 스톡 사진 히어로, system-ui를 본문/디스플레이 폰트로, 스큐어모픽 종이 그림자, 과한 애니메이션.
- 액센트 남용(파랑·초록은 뷰포트당 소수). 회색 면으로 영역 나누기(헤어라인으로).

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-05 | 초기 디자인 시스템 생성 | /design-consultation. Editorial Minimal + instrument 톤, 문제지 책자 스크롤 시그니처. |
| 2026-06-05 | 목록을 column-count 2열 → 문제지 책자 세로 1열로 변경 | 스캔성·모바일 우위, 스큐어모픽 리스크 회피. column-count는 라이브 데모로. |
| 2026-06-07 | 랜딩 리스트-우선 + 데모를 상세로 이전 | 채용자는 리스트 훑고 클릭. 랜딩 임베드 데모는 이탈 리스크. |
| 2026-07-03 | **`.hoonjo` 디자인을 정식 기준으로 채택** (`/`, `/resume`, `/portfolio-pdf`) | 독립 Vite 빌드에서 포팅. 완성도·일관성이 더 높다고 판단. 구 시스템 대비: 디스플레이 폰트 Pretendard(General Sans 폐기), 액센트 blue+green 2색, 카드 radius 12~16px, mono는 JetBrains, **라이트 전용**(다크 토글 제거·잉크 슬랩으로 대체). `/work`는 구 "문제지 책자" 유지, 추후 이관. |
| 2026-07-03 | 모바일(≤900px) 히어로 인물 사진 숨김 | 인라인 max-width로 풀폭 렌더돼 첫 화면을 사진이 먹고 헤드라인이 접힘 아래로 밀림. 좁은 화면에선 가치 제안 우선 → `display:none`. |
| 2026-07-03 | **`/work`(+`/work/[slug]`)를 `.hoonjo` 시스템으로 리뉴얼** (구 "문제지 책자" 폐기) | 홈과 톤이 달라 다른 사이트처럼 보였다. 레이아웃 전체를 홈과 같은 `.hoonjo` 루트(캔버스 틴트·sticky Nav·잉크 슬랩 Contact 푸터)로 감싸고, 본문을 Tailwind 유틸 대신 `.hoonjo` 프리미티브 + `.hoonjo-md`로 재작성 → 예전 base-rule 충돌(display:contents 우회)이 사라짐. 인덱스=플래그십 카드+행 리스트, 상세=에디토리얼(헤더·지표 그리드·라이브 데모 카드·다음 케이스). 구 `components/case-card.tsx` 삭제. |
| 2026-07-03 | 케이스 지표에 전용 `CaseMetrics` 컴포넌트 도입 | 홈 `MetricTable/MetricRow`는 "1,310ms"류 짧은 숫자용이라 값에 `white-space:nowrap`이 걸려, 케이스 frontmatter의 긴 텍스트 지표("사내 v1 → v2 → npm 패키지")가 잘렸다. 같은 계측 톤(mono·tabular-nums)을 유지하되 값이 줄바꿈되는 grid/strip 변형으로 대체. |
