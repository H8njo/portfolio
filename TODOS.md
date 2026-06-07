# TODOS

## Parked
- [ ] **T5 — PDF 파이프라인** (사용자 결정: 사이트 구축 후로 보류)
  - 이력서 PDF 정적 커밋(`public/`) + 온디맨드 `/api/pdf`(puppeteer-core + @sparticuz/chromium, 버전쌍 핀, rate-limit, 진행 단계 표시, 실패 시 정적 폴백) + `pdf-pipeline-demo`.
  - 시너지: ColumnPager `onPagesGenerated`의 outerHTML → puppeteer 입력.
  - 참고: PLAN.md §2.2 / §2.3, 외부검증 #3·#4.

## User-owned (병행)
- [ ] **T0 — NDA 게이트**: 공개 가능 수치/스크린샷 범위 확정, 레포 공개 여부, 개인 이메일 주소.
- [ ] **T7 — 케이스 글 작성**: featured(column-count) + PDF 케이스를 5단락(문제→트레이드오프→접근→수치→회고)으로. 성패의 핵심.

## Polish
- [ ] **T1.1** — Pretendard·General Sans CDN → `next/font/local` 자체 호스팅(CLS 제거).
- [ ] **T6** — 히어로 수치 count-up, OG 메타, Lighthouse 90+ 전 항목 검증.
