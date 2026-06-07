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
- [x] **T1.1** — 폰트 self-host(next/font/local), CDN @import 제거. 완료.
- [x] **T6(부분)** — count-up, OG 이미지·메타, 파비콘. 완료.

## Post-deploy 검증 (Vercel 프리뷰에서)
- [ ] **Lighthouse 실측** — 로컬 샌드박스 Perf 점수 신뢰 불가(FCP 11s = 측정 노이즈). Vercel 배포 후 실제 네트워크에서 4개 항목 측정. 목표 90+.
- [ ] **CLS 튜닝** — Pretendard swap에서 CLS 발생(로컬 0.224). 실측 후 필요하면 size-adjusted 폴백 지정 or preload 전략 조정.
- [ ] **Pretendard 서브셋** — 2MB 가변 woff2가 LCP에 영향 크면 `woff2-dynamic-subset`(unicode-range)으로 교체 검토. 실측 기반 결정.
