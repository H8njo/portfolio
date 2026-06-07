# Design System — hoonjo portfolio

## Product Context
- **What this is:** 7년차 프론트엔드 개발자의 이직용 포트폴리오 사이트.
- **Who it's for:** 채용 결정권자(FE 리드) + FE 구성원 + HR. 30~90초 안에 "어려운 FE 문제를 푸는 사람"인지 판단.
- **Space/industry:** 개발자 퍼스널 포트폴리오. 피어: Linear, Vercel 문서, Brittany Chiang.
- **Project type:** 케이스 스터디 중심 정적 사이트 (Next.js).
- **Memorable thing (북극성):** "측정 가능한 임팩트로 어려운 프론트엔드 문제를 푸는 사람." 모든 디자인 결정은 이걸 강화한다.

## Aesthetic Direction
- **Direction:** Editorial Minimal + "측정 도구(instrument)" 톤 — 엔지니어의 정밀한 실험 노트.
- **Decoration level:** intentional (헤어라인 그리드·페이지 구분선으로 절제된 구조감. 스큐어모픽 X).
- **Mood:** 차분, 자신감, 정밀. 과한 애니메이션·장식 금지(= 주니어 신호).
- **Signature:** 작업 목록을 "문제지 책자 스크롤"로 — 세로 1열, 각 케이스가 "문제 한 장"(모노 페이지 번호, 페이지 헤더 라인, 점선 풋터). column-count 2열 트릭은 케이스 02 디테일의 라이브 데모로.
- **원리:** "조용한 껍데기, 시끄러운 방들" — 랜딩은 절제, 디테일 페이지에서 데모로 터뜨림.
- **Reference sites:** Linear, Vercel docs, Brittany Chiang.

## Typography
- **Display/Hero (영문):** General Sans (600) — 깔끔하지만 개성 있는 그로테스크. Inter/Space Grotesk 등 수렴 폰트 회피. (Fontshare)
- **Body / UI (한·영):** Pretendard — 한글 신뢰감, FE 업계 표준. (jsdelivr CDN)
- **Metric/수치 전용:** Geist Mono (500) — 수치를 그래픽 요소로. "측정하는 엔지니어" 시그니처. (Google Fonts)
- **Code:** Geist Mono / JetBrains Mono.
- **Loading:** Pretendard `cdn.jsdelivr.net/gh/orioncactus/pretendard`, General Sans `api.fontshare.com`, Geist Mono Google Fonts. (배포 시 self-host 검토)
- **Scale:** Hero metric clamp(2.4rem, 7vw, 5.2rem) / H1 clamp(1.4rem, 3vw, 2.1rem) / H3 24px / body 16~17px / mono 13~14px. line-height 본문 1.7.

## Color
- **Approach:** restrained — 무채색 + 포인트 1색. 액센트는 링크·hover·핵심 수치에만, 면적 작게.
- **Ink (text):** #0B0B0C (light) / #F2F2F0 (dark)
- **Paper (bg):** #FAFAF8 (light) / #0C0D0F (dark)
- **Surface:** #FFFFFF (light) / #15171A (dark)
- **Accent (Cobalt):** #2348FF (light) / #6B86FF (dark)
- **Neutrals:** Gray-1 #6B6B6E, Gray-2 #9A9A9D, Hairline rgba(ink, 0.12~0.14)
- **Semantic:** success #1A8F5C, warning #B7791F, error #D03A3A, info = accent
- **Dark mode:** 토글 제공. 다크에서 액센트 채도/명도 약간 올림(#6B86FF).

## Spacing
- **Base unit:** 8px
- **Density:** spacious (에디토리얼 여백)
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64)
- **읽기 폭:** 본문 ~680px, 책자 영역 ~820px.

## Layout
- **Approach:** hybrid — 랜딩/목록은 문제지 책자(세로 1열 카드), 디테일은 grid-disciplined.
- **Grid:** 콘텐츠 max-width 1080px(전체), 820px(책자), 680px(읽기).
- **Border radius:** 카드 4px(종이 느낌), 버튼 8px, 태그 999px. (버블 라운드 금지)
- **Mobile-first 필수:** 리크루터 폰 스크리닝. 책자 카드는 모바일에서 패딩 축소·1열 유지.

## Motion
- **Approach:** minimal-functional + 결정적 한 방 1개.
- **결정적 한 방:** 히어로 수치 count-up 1회, 케이스 02 column-count 라이브 데모.
- **나머지:** scroll fade-up 1회, hover 시 제목 액센트·밑줄 reveal.
- **Easing:** enter ease-out / exit ease-in / move ease-in-out.
- **Duration:** micro 50-100ms / short 150-250ms / medium 250-400ms.

## Anti-patterns (금지)
- 보라/바이올렛 그라데이션, 아이콘 3열 카드 그리드, 센터 정렬 일색, 전 요소 버블 라운드, 그라데이션 CTA, 스톡 사진 히어로, system-ui를 본문/디스플레이 폰트로, 스큐어모픽 A4 종이 그림자, 과한 애니메이션.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-05 | 초기 디자인 시스템 생성 | /design-consultation. Editorial Minimal + instrument 톤, 문제지 책자 스크롤 시그니처. 리서치(2026 트렌드: 미니멀 수렴 → 구조적 차별화) 기반. |
| 2026-06-05 | 목록을 column-count 2열 → 문제지 책자 세로 1열로 변경 | 스캔성·모바일 우위, 스큐어모픽 리스크 회피. column-count는 라이브 데모로. |
| 2026-06-05 | column-count 케이스를 시그니처 강점으로 격상 | "AI·동료 FE가 못 푼 걸 창의적 발상으로 해결" = 단일 최강 차별점. AI 시대에 "AI가 못 하는 사고" 신호로 프레이밍. featured 배치 + 데모에서 "남들 방법 vs 내 방법" 대비. |
