# Engineering Plan — hoonjo portfolio

/plan-eng-review 산출. 2026-06-07 (외부검증 반영본). 콘텐츠(케이스 글)는 사용자가 직접 작성 — v1은 기능/디자인 골격 + 글쓰기를 명시 scope에 포함.

## 0. ★ NDA 게이트 (착수 전 최우선)
모든 케이스가 현 직장(교육/문제지 서비스) 업무. **퍼블릭 레포 + 실제 수치(639,000ms→1,310ms 등) = NDA 노출 리스크.** 코드 한 줄 전에 확정:
- 공개 가능 수치/스크린샷 범위 확인. 막히면 상대 표현("10분→1초")·익명 케이스로 전환.
- 레포 퍼블릭 여부 재고(프라이빗 + Vercel 배포만으로도 충분). 회사 코드는 절대 미포함.
- column-pager는 본인 오픈소스라 공개 OK (분리된 자산).

## 1. Stack (확정)
- Next.js (App Router) + TypeScript + **Tailwind v4**(column-pager가 v4 기반 — `@source` 지시문으로 `node_modules/column-pager/dist/**` 스캔) + Radix Primitives
- 콘텐츠: `next-mdx-remote/rsc` + `gray-matter`
- 폰트: `next/font` 자체 호스팅(General Sans, Pretendard, Geist Mono) — CLS 방지
- 다크모드: `next-themes`
- 시그니처 데모: `column-pager`(본인 npm, **node>=22.14 → Vercel Node 버전 핀 필요**)
- PDF: 이력서=정적 커밋 / 온디맨드 데모=puppeteer-core+@sparticuz/chromium(버전쌍 핀)
- 배포: Vercel(빌드 Node 핀), main 푸시 자동 배포

## 2. 핵심 아키텍처 결정 (리뷰+외부검증 확정)

### 2.1 column-pager = featured 데모 1곳에만 (DESIGN.md 결정 유지)
외부검증 반영: `columnCount=1`은 일반 카드와 시각적으로 구분 안 됨 → 비가시 시그니처. ssr:false 비용(목록 늦게 등장, LCP 묶임)만 떠안음. 그래서:
- **랜딩 "문제지 책자 스크롤" 목록 = 서버 렌더 정적 1열 카드.** "문제 한 장" 느낌(페이지 번호·구분선·여백)은 CSS로. column-pager 미사용 → FOUC·LCP·모순 전부 소거.
- **column-pager = featured 케이스 라이브 데모(2열)에만** `dynamic(() => ..., { ssr: false })`. 큰 요소 멀티컬럼 분할/이어붙이기를 여기서 터뜨림. above-the-fold 아니고 인터랙션 기대 영역이라 마운트 지연이 자연스러움.
- 데모 진입: `onPagesGenerated` 콜백에 fade/slide-in 게이트(타이머 아님). 데모 영역은 첫 화면이 아니라 LCP 영향 없음.
- **모바일**: 데모는 좁은 폭에서 `columnCount=1` 폴백.

### 2.2 PDF — 이력서는 정적, 온디맨드 데모는 디리스크
- **이력서/포트폴리오 PDF = 로컬에서 1회 생성해 `public/`에 정적 커밋.** 빌드타임 puppeteer 폐기(Vercel 빌드 컨테이너 Chromium 미보장 → 배포 깨질 SPOF). 이력서는 빌드마다 안 바뀜.
- **온디맨드 "파이프라인 데모"(사용자 요청 유지):** `/api/pdf` Node runtime. 디리스크 필수:
  - `puppeteer-core` ↔ `@sparticuz/chromium` **버전쌍 핀**(Chromium 버전 호환).
  - Vercel **플랜/`maxDuration` 명시**(Hobby 10초 상한 주의 — 콜드스타트+렌더가 초과하면 데모 실패).
  - **레이트리밋 + 화이트리스트 더미 입력**(남용/비용 차단).
  - **폴백:** 람다 실패/타임아웃 시 사전생성한 before/after 결과 PDF 노출(데모가 죽지 않음).

### 2.3 [시너지] ColumnPager → HTML → puppeteer → PDF
ColumnPager의 `onPagesGenerated(pages, html)`가 렌더된 outerHTML 방출 → puppeteer PDF 입력. 사용자 실무 파이프라인(HTML→puppeteer→PDF)과 동일 구조 → 데모가 "라이브러리+PDF 파이프라인"을 한 흐름으로 증명.

## 3. 데이터 플로우
```
[빌드/서버]
 MDX 케이스 파일(content/cases/*.mdx)
   │  gray-matter frontmatter (title, slug, featured, metrics[], tags[])
   ▼  schema 검증(실패 시 빌드 에러)
 getAllCases() ──► 랜딩 정적 1열 카드 목록(서버 렌더, SSR)
   │                └─ featured=true → featured 슬롯
   ▼
 /work/[slug] (RSC, next-mdx-remote/rsc) ─ generateStaticParams
   └─ featured 케이스 상세에 라이브 데모 슬롯

[클라이언트 — featured 데모만]
 ColumnPager(columnCount=2, dynamic ssr:false)
   더미 문제 데이터 ──► pageHeight ──► 멀티컬럼 분할/이어붙이기
   onPagesGenerated ──► 진입 애니메이션 + (옵션) HTML → /api/pdf
   "남들 방법(잘림) vs 내 방법(해결)" 토글 / 모바일 1열 폴백

[PDF]
 이력서: 로컬 생성 → public/hoonjo-resume.pdf (정적, 런타임 0)
 데모: /api/pdf ─ rate-limit ─ puppeteer-core+chromium ─ PDF (실패 시 정적 폴백)
```

## 4. 라우트 / 파일 구조
```
app/
  layout.tsx            # 폰트, next-themes Provider, 메타/OG, sticky nav
  page.tsx              # 랜딩: 히어로 + featured + 큐레이션 4~6 + About 섹션 (전부 SSR)
  work/page.tsx         # 전체 작업 인덱스 (모든 케이스 나열)
  work/[slug]/page.tsx  # 케이스 상세 (generateStaticParams, 홈+다음케이스)
  api/pdf/route.ts      # 온디맨드 데모(rate-limit, 화이트리스트, Node runtime, maxDuration)
  globals.css
components/
  hero.tsx              # PDF 488배 수치 (Geist Mono, count-up)
  booklet-list.tsx      # 서버 컴포넌트, 정적 1열 "문제 한 장" 카드
  case-card.tsx         # page no, 떡밥, stat (CSS로 책자 느낌)
  featured-case.tsx     # featured 슬롯
  theme-toggle.tsx      # 'use client', next-themes
  demos/column-pager-demo.tsx  # 'use client', dynamic 대상, 2열, 모바일 1열 폴백
  demos/pdf-pipeline-demo.tsx  # 온디맨드 트리거 + 정적 폴백
content/cases/*.mdx     # 케이스 글 (사용자 작성)
lib/cases.ts            # getAllCases / getCaseBySlug (gray-matter)
lib/cases.schema.ts     # frontmatter 타입 + 런타임 검증
lib/rate-limit.ts       # /api/pdf 토큰버킷
scripts/                # (빌드타임 PDF 폐기 — 이력서는 정적 커밋)
```
디자인 토큰: DESIGN.md 값을 Tailwind v4 theme 한 곳에 정의(DRY), 하드코딩 hex 금지.

## 5. 빌드 순서 (1인, 순차)
0. **NDA 게이트** — 공개 범위 확정(코드 전).
1. **P1 셸 + 모바일 기반**: Next 스캐폴드, Node 핀, 폰트, Tailwind v4 토큰, next-themes 토글, **반응형 기준(mobile-first)부터**.
2. **P2 콘텐츠 파이프**: lib/cases + schema, 더미 케이스 1~2, /work/[slug].
3. **P3 랜딩**: 히어로(count-up) + 정적 책자 카드 목록 + featured 슬롯.
4. **P4 시그니처 데모**: column-pager-demo(2열, ssr:false, onPagesGenerated 진입, 모바일 1열).
5. **P5 PDF**: 이력서 정적 커밋 + /api/pdf 온디맨드(버전핀·rate-limit·폴백) + pdf-pipeline-demo.
6. **P6 마감**: Lighthouse 90+, OG, 배포.
7. **케이스 글쓰기(병행, 최우선 산출물)** — 488배/column-count 케이스를 설득력 있게. *골격보다 이게 성패를 가름.*

## 6. 테스트 (핵심 경로 집중 — 골격 단계라 100% 강박 배제)
```
[+] lib/cases.ts          [★★★] frontmatter 정상/누락/featured 정렬, getCaseBySlug 404
[+] lib/cases.schema.ts   [★★★] 잘못된 frontmatter → 빌드 에러
[+] theme-toggle          [→E2E] 토글 hydration mismatch 없음, 새로고침 유지
[+] column-pager-demo     [→E2E] onPagesGenerated 후 진입 애니메이션·2열 분할, 모바일 1열 폴백
[+] api/pdf               [★★★] 화이트리스트 외 400, 레이트리밋 429, 실패 시 정적 폴백
정적 카드 목록/히어로: 서버 렌더 → 스냅샷/접근성 체크면 충분(과한 단위테스트 배제).
프레임워크: Vitest(단위) + Playwright(데모/토글/pdf E2E).
```

## 7. 실패 모드
| codepath | 실패 | 테스트 | 핸들링 | 사용자 경험 |
|---|---|---|---|---|
| column-pager-demo | 측정 지연/큰 콘텐츠 | E2E | onPagesGenerated 게이트 진입 | 데모 영역 잠깐 비고 fade-in (LCP 영향 없음) |
| /api/pdf | Chromium 콜드스타트 타임아웃(Hobby 10s) | 단위 | maxDuration + try/catch + **정적 폴백** | 폴백 PDF 노출(데모 안 죽음) |
| /api/pdf | 대량요청 DoS | 단위(429) | 레이트리밋 | 429 안내 |
| cases.schema | frontmatter 누락 | 단위 | 빌드 에러 | 빌드 차단 |
**critical gap 없음** (정적 폴백으로 PDF 데모 SPOF 제거).

## 8. NOT in scope
- 케이스 글 본문은 사용자 작성(단, scope에 명시 — §5.7).
- 빌드타임 PDF 생성(폐기 — 정적 커밋).
- 랜딩 목록 ColumnPager(폐기 — 정적 카드).
- 블로그/CMS, i18n, 애널리틱스, 인증/DB — v2.
- worktree 병렬화(1인·6태스크라 불필요, 순차).

## 9. What already exists (재사용)
- **column-pager**(본인 npm): 멀티컬럼 페이지네이션 재구현 금지, 의존성으로 사용. featured 데모 핵심.
- DESIGN.md: 토큰 단일 소스(이 플랜은 DESIGN.md 결정과 일치하도록 복귀).
- 사용자 puppeteer→PDF 실무 경험: PDF 파이프라인 설계 기반.

## Design Spec (plan-design-review, 2026-06-07)

### IA — 3층 구조 (Pass 1)
- **랜딩(/):** 히어로(488배) → featured(column-count) → **큐레이션 4~6개** → About 섹션. "전체 작업 보기 →" 링크로 /work.
- **/work:** 전체 케이스 인덱스(다 나열 OK). 문제지 책자 카드 스타일 재사용.
- **/work/[slug]:** 개별 상세, 하단 "홈 + 다음 케이스".
- **sticky 상단 nav:** Work / About / Contact + 테마 토글. 스크롤 길어도 상시 접근. 연락처는 nav+푸터.
- 큐레이션 = "깊이>넓이" 시니어 신호.

### 상태(states) (Pass 2)
| 기능 | 로딩 | 빈 | 에러 | 성공 |
|---|---|---|---|---|
| 큐레이션 목록 | SSR 없음 | "준비 중" + 연락 CTA | — | 카드 표시 |
| /work 인덱스 | SSR 없음 | "곧 추가됩니다" + 홈 | — | 전체 나열 |
| column-pager 데모 | onPagesGenerated 게이트 | 더미 상시 | 측정 실패 → 정적 폴백 | 진입 애니메이션 |
| PDF 데모 | "HTML→Chromium→PDF" 진행 단계 인디케이터 | — | 타임아웃/429 → 사전생성 PDF 폴백 | 다운로드/미리보기 |
| 케이스 상세 | SSG | — | 404 "없는 케이스+홈" | 본문 |
- 빈 상태는 기능: v1 콘텐츠 미완 시 따뜻한 "준비 중 + 연락" 표시.
- PDF 데모: 진행 단계가 곧 파이프라인 시연, 실패 시 정적 폴백으로 절대 안 죽음.

### 감정 아크 (Pass 3)
진입(488배 호기심)→featured("AI도 못 푼?")→데모("진짜 되네")→큐레이션("깊이")→상세("같이 일하고싶다")→다음케이스("더 볼까). 각 단계가 끌림 포인트로 받쳐짐.

### 반응형 & 접근성 (Pass 6)
- 뷰포트: 모바일(<640) 데모 1열 폴백·nav 축약·히어로 clamp 축소 / 태블릿·데스크탑 책자 폭 확장.
- 키보드·SR: `<nav>` landmark, 스킵 링크, 가시 포커스 링, 토글·데모 키보드 조작, 카드 링크 시맨틱.
- 터치타깃 44px. 대비: accent #2348FF on #FAFAF8 ≈5:1(링크), 다크 #6B86FF on #0C0D0F 양호, 본문 ink 4.5:1+.
- **모션 접근성:** `prefers-reduced-motion` 존중 → count-up은 최종값 즉시, 진입 애니메이션 즉시 표시, fade-up 생략, 기능적 전환만 유지.

### 미해결 → 결정 (Pass 7)
- **연락 수단(확정):** 개인 이메일(회사 도메인 hoonjo@bookips.com **금지**) + GitHub(H8njo) + LinkedIn. → 개인 이메일 주소 준비 필요(T0와 함께).
- 콘텐츠성 미정(사용자 작성): About 톤, featured 데모 더미(시험지 느낌 텍스트), /work 정렬(featured→최신 권장).

### 디자인 추가 태스크
- [ ] **T8 (P1)** — nav/IA — sticky nav + 스킵링크 + 랜딩 큐레이션 4~6 + /work 인덱스 + About 섹션
- [ ] **T9 (P1)** — states — 빈/에러/로딩 상태 표 구현(따뜻한 빈 상태, PDF 진행 단계, 404)
- [ ] **T10 (P1)** — a11y/responsive — 뷰포트별 레이아웃, 키보드/포커스/ARIA, 44px, 대비, prefers-reduced-motion

## Implementation Tasks
- [ ] **T0 (P1, 게이트)** — NDA — 공개 가능 수치/스크린샷 범위 확정, 레포 공개 여부 결정
  - Surfaced by: 외부검증 #6(b) — 메모리 NDA 리스크가 플랜에 누락이었음
  - Verify: 공개 가능 항목 목록화, 막힌 건 상대표현/익명화 규칙 결정
- [x] **T1 (P1)** — shell — Next 15 + TS + Tailwind v4 토큰(DESIGN.md) + next-themes(라이트/다크) + Geist Mono(next/font) + Pretendard·General Sans(CDN) + sticky nav + 스킵링크 + focus-visible + prefers-reduced-motion + 랜딩/work 골격. 빌드·타입·렌더 검증 완료. (T8 nav·섹션, T10 a11y 기반 일부 선반영)
  - Files: app/layout.tsx, globals.css, tailwind(v4 @source), components/theme-toggle.tsx
  - Verify: 라이트/다크 토글, 모바일 레이아웃, Lighthouse 기본 100
- [x] **T2 (P1)** — content — lib/cases + cases.schema(런타임 검증) + next-mdx-remote/rsc + /work 인덱스 + /work/[slug] SSG + CaseCard + 더미 케이스 2개. 빌드(7페이지)·렌더·404 검증.
- [ ] **T3 (P1, human:~2.5h / CC:~18min)** — landing — 히어로(count-up) + **정적 1열 책자 카드** + featured 슬롯
  - Surfaced by: 외부검증 #1·#2 — 목록은 정적 카드
  - Verify: 서버 렌더 HTML에 카드 포함, 모바일 1열
- [ ] **T4 (P1, human:~3h / CC:~25min)** — demo — column-pager-demo(2열, ssr:false, onPagesGenerated 진입, 모바일 1열) + "남들 vs 내 방법" 토글
  - Verify: Playwright 2열 분할, FOUC 없음, 모바일 폴백
- [ ] **T5 (P2, human:~3h / CC:~25min)** — pdf — 이력서 정적 커밋 + /api/pdf(버전핀·rate-limit·정적 폴백) + pdf-pipeline-demo
  - Surfaced by: 외부검증 #3·#4 — 빌드타임 폐기, 람다 디리스크
  - Files: public/hoonjo-resume.pdf, app/api/pdf/route.ts, lib/rate-limit.ts, components/demos/pdf-pipeline-demo.tsx
  - Verify: 429/400 단위, 폴백 동작
- [ ] **T6 (P2, human:~2h / CC:~15min)** — polish — OG 메타, Lighthouse 90+ 검증(전 항목)
- [ ] **T7 (병행, 최우선)** — content-writing — featured(column-count) + PDF 488배 케이스 글 작성
  - Surfaced by: 외부검증 #6 — 성패의 핵심, scope에 포함
