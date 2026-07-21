import type { Metric } from './components';

/* Assets live in /public/hoonjo (served from the site root) rather than being
   ESM-imported - Next serves them as static files, so these are plain URLs. */
const mojImg = '/hoonjo/moj-portal.png';
const moj2 = '/hoonjo/moj-2.jpg';
const moj3 = '/hoonjo/moj-3.png';
const kistiImg = '/hoonjo/kisti-ml.png';
const kisti2 = '/hoonjo/kisti-2.jpg';
const kisti3 = '/hoonjo/kisti-3.png';
const colpager1 = '/hoonjo/colpager-1.jpg';
const colpager2 = '/hoonjo/colpager-2.jpg';

export type ProjImage = { src: string; alt: string };

/* All copy + data for the Hoonjo portfolio, grounded in his real résumé and
   his own project write-ups. Numbers are his actual figures — no invented
   metrics. Company convention: "@회사" marks the employer; the product/client
   (쏠북, ORZO, 법무부…) is named in prose so the two never blur. */

export const profile = {
  name: 'Hoonjo',
  nameKo: '조영훈',
  role: '7년차 시니어 프론트엔드 엔지니어',
  since: '2019',
  email: 'jaiemf@gmail.com',
  github: 'https://github.com/H8njo',
  githubHandle: 'github.com/H8njo',
  portfolio: 'https://h8njo.vercel.app',
  portfolioLabel: '포트폴리오 · h8njo.vercel.app',
  blog: 'https://h8njo.vercel.app/work',
  blogLabel: '블로그 · h8njo.vercel.app/work',
  tagline: ['안 되던 화면을 측정해서', '되게', '만듭니다.'],
  lead: '성능, 복잡한 상태, 까다로운 렌더링 — 직접 측정하고, 끝까지 동작하게 만듭니다.',
  heroTags: ['성능 최적화', '대용량 렌더링', '복잡한 상태', 'Canvas / WebGL'],
};

/* Hero featured-impact strip — the strongest real before→after pairs. */
export const impact = {
  lead: '반복을 구조로, 결과를 숫자로.',
  stats: [
    { k: 'PDF 첫 조작 (300p)', before: '약 10분 30초', after: '1.3초' },
    { k: '같은 모양 화면 59개', before: '화면마다 코딩', after: '정의 하나로' },
    { k: '페이지네이션 엔진', before: '사내 전용', after: 'npm 공개' },
  ] as { k: string; before: string; after: string }[],
};

/* ── Flagship: the column-pager story (own dedicated section) ───────────── */
export const flagship = {
  id: 'work-column-pager',
  eyebrow: 'FLAGSHIP · OPEN SOURCE',
  company: '@Bookips',
  badge: 'npm 배포 · MIT',
  title: '사내 페이지네이션 엔진 → 오픈소스',
  oneLiner:
    '인쇄물처럼 “고정 크기 페이지”로 자동 분할하는 엔진.\n사내 제작 도구 → npm 패키지.',
  // /work 게시물의 훅과 동일 — 포트폴리오 PDF 플래그십의 첫 줄로 쓴다(단일 출처).
  hook:
    '프리랜서도 사내 FE도 못 풀어 2년째 환불 문의가 이어지던 문제. 다섯 번 갈아엎고, 실패한 방식을 응용해 풀었다.',
  problem:
    '교육 콘텐츠 편집기에서 문제들을 A4 두 칸(2단) 레이아웃으로 배치해야 했는데, 기존 구현은 한 칸 높이를 넘는 긴 카드(긴 본문)를 처리하지 못했다. 만든 문제지는 인쇄돼 학생에게 가는 거라, 문장이 중간에 잘리면 그대로 불량품 — 주력 서비스에서 2년 가까이 환불 문의가 이어졌다. 여러 명이 붙었지만 다들 같은 벽에서 멈췄다.',
  attempts: [
    {
      n: '01',
      head: '긴 카드를 이미지로 캡처해 잘라내기',
      miss: '픽셀 단위로 자르니 글자가 중간에 깨졌다. 줄 간격을 감지하려니 이미지 연산이 너무 무거웠다.',
    },
    {
      n: '02',
      head: 'CSS column-count에 통째로 맡기기',
      miss: '다음 페이지로 넘길 방법이 없어 페이지마다 전체를 렌더 → 카드 1,000개 × 10p = 1만 개 렌더로 화면이 멈췄다.',
    },
    {
      n: '03',
      head: '높이 측정 + 잘린 지점 직접 탐지',
      miss: '이진 탐색으로도 연산이 무거웠고, 카드 여백 탓에 “진짜 마지막 글자”를 정확히 못 짚었다.',
    },
    {
      n: '04',
      head: '1번의 줄 자르기를 2번으로 메우기',
      miss: '긴 카드가 있는 페이지에만 column-count. 짧은 카드까지 다음 페이지에 복제해야 해, 페이지가 늘수록 비효율적이었다.',
    },
    {
      n: '05',
      head: '카드마다 column-count:1 + 클립 + 복제',
      miss: '정답. 잘린 조각만 다음 열에 복제하고 translateX로 이어 붙였다. 짧은 카드는 그대로 둔다.',
      win: true,
    },
  ],
  insight:
    '새로 발명한 게 아니라, 망한 시도를 버리지 않고 각도만 바꿔 합쳤다 — 1번이 실패한 “자연스러운 줄 자르기”를 2번의 column-count가 공짜로 해준다는 걸, 카드 단위 크롭 도구로만 끌어 썼다.',
  generations: [
    ['v1', '쏠북 문제 에디터', '다섯 번을 거쳐, 도메인에 박힌 채 동작한 원형'],
    ['v2', '쏠북 다른 제품', '임의 콘텐츠로 일반화. 핵심 훅이 210줄까지 비대'],
    [
      'v3',
      'npm · column-pager',
      '앱에서 분리 → 순수 코어 / 측정 / 렌더 3계층 재설계',
    ],
  ] as [string, string, string][],
  results: [
    { label: '인쇄 불량 환불', after: '하루 4건 → 주 2건', gain: '2년 이어지던 반복 문의' },
    {
      label: '100장 재배치',
      after: '55–66',
      unit: 'ms',
      gain: '변경 없는 항목은 재측정 생략',
    },
    {
      label: '결정적 테스트',
      after: '49',
      unit: '개',
      gain: '측정부를 교체 가능하게 추상화',
    },
  ] as Metric[],
  resultNote:
    '재사용 가능한 코어로 분리한 덕에, 이 엔진이 후속 저작 도구와 AI 문제 생성 서비스(현재 메인 매출의 한 축)의 기반 기술이 됐다.',
  honesty:
    '표처럼 중간에서 쪼개면 안 되는 요소, 페이지를 넘는 카드 이동의 미세한 끊김은 아직 못 푼 한계로 문서에 그대로 적어뒀다. 못 푼 걸 안 푼 척하지 않는 게 라이브러리 쓰는 사람한테 정직한 거라고 본다.',
  images: [
    { src: colpager1, alt: 'column-pager 결과 — 본문분석 PDF 자동 조판' },
    { src: colpager2, alt: 'column-pager 결과 — 변형문제 PDF 자동 조판' },
  ] as ProjImage[],
  postUrl: '/work/column-count-layout',
  link: {
    label: 'GitHub · H8njo/column-pager',
    href: 'https://github.com/H8njo/column-pager',
  },
};

export type WorkCase = {
  id: string;
  eyebrow: string;
  company?: string;
  badge?: { variant: 'positive' | 'blue' | 'ink'; label: string };
  title: string;
  problem: string[];
  structure: string[];
  tags: string[];
  metrics: Metric[];
  metricsNote?: string;
  images?: ProjImage[];
  code?: { caption: string; lines: string };
  postUrl?: string;
  link?: { label: string; href: string };
};

export const cases: WorkCase[] = [
  {
    id: 'work-portal',
    eyebrow: 'SYSTEM DESIGN',
    company: '@Zipida · 법무부',
    title: '컬럼 정의 1벌로 찍어낸 59개 화면',
    problem: [
      '정부 보안관제 관리자 포털',
      '목록·검색·페이징·CRUD 동일 패턴 100+ 화면',
      '화면별 수작업 → 2인 유지보수 불가',
      '같은 버그를 100곳에 복제하는 구조',
    ],
    structure: [
      '컬럼 메타데이터(정의)와 렌더링(엔진) 분리',
      'Table 1개가 목록·검색·정렬·엑셀·폼·권한 생성',
      '라우트 정의 1벌 → 메뉴·권한트리·체크키 동시 파생',
      '추상화 누수는 주석으로 드러내 관리',
    ],
    tags: ['React', 'GraphQL', '메타데이터 구동', 'RBAC', 'Fullstack'],
    metrics: [
      {
        label: '화면 양산 · 1벌 정의',
        after: '59',
        unit: '개',
        gain: '두 명이 도메인 100여 개',
      },
      {
        label: '신규 CRUD 화면',
        after: '정의 + 쿼리',
        gain: '버그도 한 곳에서 수정',
      },
      {
        label: '프론트 개발',
        after: '단독 라인',
        gain: '약 2년 · 도메인 100여 개',
      },
    ],
    metricsNote:
      '이 Table 컴포넌트는 이후 다른 프로젝트에서도 컬럼 배열만 교체해 재사용.',
    images: [
      { src: mojImg, alt: '법무부 보안관제 포털 — 일간 보고서' },
      { src: moj2, alt: '법무부 보안관제 포털 — 근무·업무 일정' },
      { src: moj3, alt: '법무부 보안관제 포털 — 목록 화면' },
    ],
    postUrl: '/work/security-portal',
  },
  {
    id: 'work-design-system',
    eyebrow: 'LIBRARY · DX',
    company: '@Bookips',
    title: '아이콘 드롭으로 디자인 시스템 자동화',
    problem: [
      '여러 제품이 공유할 UI·접근성 필요',
      '기존 Select — Radix 단일 위에 multi 흉내, 선택 상태·체크박스·aria 부재',
      '아이콘 160개 SVG를 손으로 컴포넌트 이관 (사고 대기)',
    ],
    structure: [
      'Select — API 1개, 내부 두 엔진\n(single=Radix 래핑, multi=Popover 직접 구현)',
      'discriminated union — 오용 시 컴파일에서 차단',
      '폴더에 SVG 드롭 → 코드젠으로 타입까지 자동 생성',
      'push 전 type-check + 빌드 강제 게이트',
    ],
    tags: ['Radix', 'Tailwind · CVA', '코드젠', 'Storybook', 'Rollup/Vite'],
    metrics: [
      {
        label: 'multi-select',
        after: '일급 모델',
        gain: '우회 → 체크박스·aria 정상',
      },
      {
        label: '아이콘 추가',
        after: '폴더 드롭',
        gain: '손으로 쓰던 export 0',
      },
      { label: '역할', after: '공동 메인테이너', gain: '릴리스·PR 리뷰 공동 운영' },
    ],
    code: {
      caption: 'API는 하나, 잘못 쓰면 컴파일에서 막힌다',
      lines: [
        '// Select — 하나의 API, 내부는 두 엔진',
        'type Single = { multiple?: false; value?: string }',
        'type Multi  = { multiple: true;  value: string[] }',
        'type SelectV2Props = Single | Multi',
        '',
        '// 아이콘: 폴더에 SVG 드롭 → 타입까지 자동 생성',
        '$ pnpm generate   // 160개 export, 손작업 0',
      ].join('\n'),
    },
    postUrl: '/work/design-system',
  },
  {
    id: 'work-ml',
    eyebrow: 'COMPLEX STATE · FULLSTACK',
    company: '@Zipida · KISTI',
    title: '코드 없이 탐지 모델을 학습시키는 마법사',
    problem: [
      '분석가가 코드 없이 탐지 ML 학습 — 5단계 마법사',
      '단계 왕복·새로고침·딥링크 사용',
      '앞 단계 변경 시 뒤 단계 무효화 필요',
      '수분~수시간 비동기 학습 — 진행 상태 표시',
    ],
    structure: [
      '현재 단계 — React state 아닌 URL 단일 소스\n(새로고침·뒤로가기·딥링크 무료 동작)',
      '데이터 — useImmerReducer, 완료·무효화 규칙을 리듀서에 명시',
      '비동기 학습 5×4 상태를 progress로 추적',
      'Java/Python 이종 워커 큐 현황까지 한 화면',
    ],
    tags: [
      '상태머신',
      'URL-as-state',
      'immer',
      'NestJS · Celery',
      'Elasticsearch',
    ],
    metrics: [
      {
        label: '모델 학습',
        after: '5단계 GUI',
        gain: '코드 없이 1건 학습·배포',
      },
      {
        label: '파이프라인 상태',
        after: '5×4',
        unit: '추적',
        gain: '멈춤/진행 구분',
      },
      {
        label: 'ES 기간 필터 버그',
        after: 'should→must',
        gain: '무시되던 필터 정상화',
      },
    ],
    metricsNote:
      '시작할 땐 ML 지식이 없어, 화면을 제대로 짜려고 crawl→feature→train 파이프라인까지 직접 익혔다.',
    images: [
      { src: kistiImg, alt: 'KISTI AI 관제 — 학습 특징 설정' },
      { src: kisti2, alt: 'KISTI AI 관제 — 모델 테스트' },
      { src: kisti3, alt: 'KISTI AI 관제 — 페이로드 특징 추가' },
    ],
    postUrl: '/work/security-ai',
  },
];

/* Black-hole side project — ink panel with a real live WebGL render. */
export const blackHole = {
  id: 'work-blackhole',
  eyebrow: 'SIDE PROJECT · GRAPHICS',
  company: '개인 프로젝트',
  title: ['빛이 휘는 블랙홀을', '셰이더로 직접 구현'],
  body: '중력이 빛을 휘게 하는 효과를 그래픽 라이브러리 없이 직접 구현. Canvas 별 수천 개 위에 WebGL 셰이더로 빛의 굴절을 표현.',
  aside: '옆 화면은 지금 브라우저에서 실시간으로 도는 결과입니다.',
  tags: ['WebGL', 'GLSL 셰이더', 'Canvas 2D', '좌표 수학'],
  stats: [
    ['별 개수', '8,000+'],
    ['렌더', '실시간 · WebGL'],
    ['외부 라이브러리', '없음'],
  ] as [string, string][],
  repo: 'https://github.com/H8njo/webgl-black-hole',
  postUrl: '/work/webgl-blackhole',
};

/* 그 외 사이드 프로젝트 — 블랙홀(위, 라이브 렌더)과 함께 "혼자 만든 것들" 묶음.
   수치는 /work 게시물·커리어 볼트 실측값. loa-map-generator(OpenCV 지형 추출 도구,
   H8njo/loa-map-generator)는 삼라만상 맵 타일의 출처라 그 카드에 note로 흡수한다. */
export const sideProjects: {
  title: string;
  label: string;
  body: string;
  stats: [string, string][];
  tags: string[];
  note?: string;
  repo?: string;
  postUrl?: string;
}[] = [
  {
    title: '게임 업적 2,222개를 OCR로 읽는 풀스택 서비스',
    label: '개인 프로젝트 · 로스트아크',
    body: '"다음에 뭘 해야 가장 빠를까"를 데이터로 답하려고 혼자 만든 서비스. 업적 2,222개의 달성 경로를 그래프 최적화로 추천하고, 게임 화면을 OCR로 읽어 진행도를 자동 동기화. 프론트·백엔드·데이터 시딩까지 단독.',
    stats: [
      ['업적 데이터', '2,222개'],
      ['맵 타일 최적화', '268MB → 10.7MB'],
      ['맵 뷰어', '208개'],
    ],
    tags: ['Next.js', 'NestJS · Prisma', 'OCR', '그래프 최적화'],
    note: '월드맵 208장은 직접 만든 OpenCV 도구 loa-map-generator로 지형만 오려냈다 — "안쪽을 찾지 말고 바깥을 지우자"는 flood-fill 세그멘테이션.',
    postUrl: '/work/samra-mansang',
  },
  {
    title: 'AI 기다리는 시간에 딴짓하려 만든 맥 메뉴바 앱',
    label: '개인 프로젝트 · macOS',
    body: 'Claude Code 작업 상태를 감지해 시작하면 딴 앱, 끝나면 터미널로 자동 전환. 웹만 하던 내가 Xcode 없이 SPM만으로 네이티브 앱을 배포까지 끌고 갔다.',
    stats: [
      ['빌드', 'Xcode 없이 SPM'],
      ['배포', 'Homebrew Tap'],
      ['규모', '단독 개발'],
    ],
    tags: ['Swift', 'SwiftUI', 'macOS'],
    note: '제일 오래 데인 건 언어가 아니라 “서명 안 된 앱”이라는 OS 벽 — 알림창을 직접 그려 넘었다.',
    repo: 'https://github.com/H8njo/afk',
    postUrl: '/work/afk',
  },
];

export type CaseLink = { label: string; href: string };
export type Timeline = {
  period: string;
  role: string;
  org: string;
  /* 역할 아래에 붙는 성장·범위 신호 — 직급을 지어내지 않고 실제 오너십만
     표기(디자인 시스템 코드오너 / 미들·시니어 / 프론트 주저자). */
  scope?: string;
  description: string;
  /* description(한 줄 리드) 아래에 붙는 성과 항목 — 한 문장에 몰아넣지 않고
     "어떤 걸 했는지"가 스캔되게 줄 단위로 쪼갠다. 없으면 description만 보인다. */
  lines?: string[];
  tags: string[];
  current?: boolean;
  /* 해당 시기의 대표 케이스로 유입 — /work/[slug] 상세 글로 연결. */
  cases?: CaseLink[];
};

export const timeline: Timeline[] = [
  {
    period: '2024 — 현재',
    role: 'Senior Frontend Engineer',
    org: '@Bookips',
    scope: '디자인 시스템 · PDF 레이아웃 렌더러 핵심 개발자',
    description: '교육 콘텐츠 플랫폼 쏠북(Solvook)의 프론트엔드.',
    lines: [
      '메인 서비스 엑스퍼트에서 문제·지문을 인쇄물처럼 **A4 다단 자동 조판하는 난제 해결**',
      '그 페이지네이션 엔진을 앱에서 분리해 **오픈소스로 공개** — column-pager (npm · MIT)',
      '이 엔진을 축으로 **콘텐츠 저작툴을 새 프로젝트로 단독 구축** (프론트 아키텍처 단독 소유)',
      '저작툴을 기반으로 파생된 **쏠북패스 출시 — 회사 메인 매출 제품의 프론트 담당**',
      '공용 **디자인 시스템(@bookips/sds) 공동 메인테이너** — 릴리스·PR 리뷰 공동 운영',
      '룰도 없던 코드베이스를 **상태관리(XState→Zustand)·컨벤션·강제 게이트·오류 모니터링까지 표준화**하고, 그 표준을 형제 서비스로 확산',
    ],
    tags: ['Zustand', 'TanStack Query', 'Radix · CVA', 'svgr 코드젠', 'semantic-release'],
    current: true,
    cases: [
      { label: 'column-pager 오픈소스', href: '/work/column-count-layout' },
      { label: '저작툴 본문 에디터', href: '/work/problem-editor' },
      { label: '디자인 시스템 자동화', href: '/work/design-system' },
      { label: '코드베이스 표준화', href: '/work/expert-conventions' },
    ],
  },
  {
    period: '2023 — 2024',
    role: 'Frontend Engineer',
    org: '@Sling',
    scope: '미들·시니어',
    description: '튜터용 수업 관리 앱 ORZO의 프론트엔드.',
    lines: [
      '300페이지 교재 PDF의 첫 조작 대기를 **약 10분 30초 → 1.3초로 단축** — 전 페이지 선렌더를 온디맨드 + 청크 렌더로 재설계',
      '전체 페이지 자동선택 시 터지던 메모리를 청크 처리 + page.cleanup() + 온디맨드 렌더로 **OOM 없이 제어** (메모리·정확도 트레이드오프 설계)',
      '인증 모델을 인메모리 토큰 → **서버 발급 세션 쿠키 + SSR 가드로 전환**, 서버 로그아웃(refresh token revoke)까지',
    ],
    tags: ['PDF.js', 'SWR', 'Firebase Auth', 'Turborepo'],
    cases: [{ label: 'PDF 메모리 최적화', href: '/work/pdf-memory' }],
  },
  {
    period: '2020 — 2023',
    role: 'Frontend → Tech Lead',
    org: '@Zipida',
    scope: '프론트 주도 → 풀스택 기술 리드',
    description: '정부·기업 보안관제 SI 2년 11개월. 5명이던 회사가 30명대로 크는 동안, 프론트로 시작해 기술 리드 역할을 맡았다.',
    lines: [
      '**2년 11개월간 약 14개** 보안관제·포털 프로젝트를 기획 미팅부터 디자인·개발·배포·유지보수까지 전 과정으로 (프론트 주도)',
      '법무부 포털: Table 컴포넌트 하나가 컬럼 정의 메타에서 목록·검색·정렬·엑셀·폼 생성 — **정의 1벌로 59개 화면 양산**, 라우트 정의에서 메뉴·권한트리 동시 파생(RBAC)',
      'KISTI AI 관제(전사 최대 규모 프로젝트): **코드 없이 탐지 ML을 학습·배포하는 5단계 마법사**를 URL-as-state·immer 상태머신으로 풀스택 구현',
      '현대오토에버 EDR: 비밀번호·권한 필터를 **NestJS BFF 프록시에서 통제**, 정형=PostgreSQL·가변=MongoDB **이중 DB 설계**',
      '그 외 문체부 관제 포털·사이버 훈련 CTF·통일부 서버사이드 페이징 등 보안관제 프로젝트 다수',
      '회사가 5명 → 30명대로 크는 동안 다른 팀의 막힌 프로젝트까지 들어가 함께 풀며 **기술 리드로 성장**, 유지보수로 고객사 재계약까지 연결',
    ],
    tags: ['Apollo GraphQL', 'NestJS', 'Elasticsearch', 'immer 상태머신', 'RBAC'],
    cases: [
      { label: '59개 화면 포털', href: '/work/security-portal' },
      { label: 'ML 학습 마법사', href: '/work/security-ai' },
      { label: 'EDR 포털', href: '/work/edr-portal' },
    ],
  },
  {
    period: '2019 — 2020',
    role: 'Frontend Engineer',
    org: '@옐로오투오',
    description: '클라이언트 사이트 주문을 받아 개발하는 웹 에이전시.',
    lines: [
      '그누보드 등 기존 템플릿 위에 프로젝트별 요구사항을 구현',
      '사이트 성격에 맞춘 **커스텀 플러그인 제작** (예: 펜션 홈페이지 → 예약 플러그인)',
      'PHP 예약 시스템에서 시작해 **React로 전환**, 컴포넌트 분리·반응형 설계 기반 습득',
    ],
    tags: ['그누보드5', 'PHP 플러그인', 'jQuery', 'React 전환'],
  },
];

/* Expertise — a capability map; each strength links to the work that proves it
   (proof items scroll to the matching work-* anchor). */
export type ProofLink = { label: string; target: string };
export const capabilities: {
  label: string;
  skills: string[];
  proof: ProofLink[];
}[] = [
  {
    label: '렌더링 · 성능',
    skills: [
      'Canvas 2D / WebGL',
      '측정-우선 레이아웃',
      '대용량 가상화',
      '메모리 바운드 처리',
    ],
    proof: [
      { label: 'column-pager', target: 'work-column-pager' },
      { label: '블랙홀', target: 'work-blackhole' },
    ],
  },
  {
    label: '시스템 설계 · 추상화',
    skills: [
      '메타데이터 구동 UI',
      '디자인 시스템 / 라이브러리',
      'RBAC',
      'API 타입 설계',
    ],
    proof: [
      { label: '59개 화면 포털', target: 'work-portal' },
      { label: '디자인 시스템 자동화', target: 'work-design-system' },
    ],
  },
  {
    label: '복잡한 상태 · 풀스택',
    skills: [
      '상태머신 / URL-as-state',
      'NestJS BFF',
      'GraphQL · 이중 데이터소스',
      '비동기 파이프라인',
    ],
    proof: [
      { label: 'ML 학습 마법사', target: 'work-ml' },
      { label: '보안 포털', target: 'work-portal' },
    ],
  },
];

/* ── 이력서 전용 데이터 ────────────────────────────────────────────────────
   포트폴리오 PDF가 "프로젝트별" 시각 문서라면, 이력서는 "회사별"로 읽는 문서다.
   경력을 회사 단위로 묶고 각 회사 아래 성과를 불릿으로 정리 — 스캔이 쉽고,
   포트폴리오와 겹치지 않게 학력까지 담는다. 수치는 Obsidian 커리어 볼트에서
   추출한 실측값(커밋·화면 수 등)만 쓴다. */

/* 짧고 강약이 있는 줄로 — 역할(lead) · 한 줄 강점(hook) · 마무리(close)에
   시선이 걸리고, 세부는 가볍게 받친다. 긴 문장으로 접히지 않게 짧게 끊는다. */
export const resumeSummary: {
  t: string;
  kind: 'lead' | 'hook' | 'body' | 'close';
}[] = [
  { t: '7년차 시니어 프론트엔드 엔지니어', kind: 'lead' },
  { t: '안 되던 화면을 측정해서 되게 만듭니다.', kind: 'hook' },
  {
    t: 'PDF 첫 조작을 약 10분 30초 → 1.3초로 · 컬럼 정의 1벌로 59개 화면 · 사내 페이지네이션 엔진 npm(MIT) 오픈소스화.',
    kind: 'body',
  },
  {
    t: '성능 · 대용량 렌더링 · 복잡한 상태를 풀고, 반복되는 문제는 재사용 구조와 라이브러리로 단순하게 만듭니다.',
    kind: 'body',
  },
  {
    t: '레거시는 최신 스택으로 점진 이관하고, ML·Elasticsearch·WebGL처럼 모르던 스택도 실무에서 학습해 출시까지 갑니다.',
    kind: 'body',
  },
  {
    t: '보안관제 SI 풀스택부터 교육 플랫폼 사내 엔진 오픈소스화까지 — 도메인이 바뀌어도 문제를 구조로 푸는 방식은 같습니다.',
    kind: 'close',
  },
];

/* 주도성 · 제품 오너십 — PO·기획자 공백을 메우고 사용자 목소리로 재설계한 패턴을
   회사별 한 줄 증거로. 상세는 경력 하이라이트에 있고, 여기선 "일회성이 아닌 방식"임을 못 박는다. */
export const resumeOwnership: {
  claim: string;
  items: { at: string; t: string }[];
} = {
  claim: '주어진 개발에 그치지 않고 — PO·기획자 공백을 스스로 메우며 제품을 주도, 사용자 목소리로 문제를 발견해 재설계한 경험 다수.',
  items: [
    { at: 'Solvook Creator', t: 'PO 공백 시 제품 결정을 대행 — 검수자(사용자) 피드백을 직접 듣고, JSON 구조를 외워야 하던 검수 화면을 마우스만으로 검수·수정·삭제·추가하는 GUI로 전면 재설계. 신규 검수자 온보딩 비용 제거' },
    { at: '본문분석 에디터', t: '기획자 공백 시 인터랙션 설계부터 개발까지 주도 — 드래그 대신 클릭-클릭 범위 선택 같은 UX 결정을 직접' },
    { at: 'Zipida', t: '프론트로 합류해 회사 5 → 30명 성장기에 기술 리드로, 막히던 타 팀 프로젝트까지 지원' },
  ],
};

/* 팀 리딩 · 개발 문화 — '주도성'이 제품 각도라면 이건 사람·조직 각도.
   관리가 아니라 동료가 더 잘 일하도록 지원한 리더십, 협업 방식·문화 개선, 조직 확산. */
export const resumeLeadership: {
  claim: string;
  items: { at: string; t: string }[];
} = {
  claim: '관리보다, 동료가 더 잘 일하도록 지원하는 쪽 — 협업 방식과 개발 문화를 구조로 개선하고 조직으로 확산.',
  items: [
    { at: '기술 리딩', t: 'Zipida에서 기술 리드로 — 막히던 타 팀 프로젝트까지 들어가 함께 해결하고, 코드 리뷰로 동료의 막힘을 풀어줬다' },
    { at: '스터디 · 컨벤션', t: '팀 컨벤션을 함께 정하고 코드 레벨을 맞추는 스터디를 주도 — 리팩토링이 필요한 시점엔 스터디로 팀 전체가 같은 패턴으로 정리하도록 이끌었다' },
    { at: '협업 · 문화', t: 'PR 템플릿·CODEOWNERS·컨벤션·git 게이트(lint·type-check·test)로 "누가 와도 같은 규율", async·상태 끌어올리기·네이밍 등 팀 관행을 정리해 문서로 공유' },
    { at: '조직 확산', t: '룰 없던 코드베이스를 표준화해 형제 서비스로 전파 / 공용 디자인 시스템 공동 메인테이너(릴리스·PR 리뷰 공동 운영)' },
    { at: '기술 의사결정', t: '조직의 스택 방향을 이끌어 — MUI를 Radix + Tailwind v2로 다시 짜고, 일부 화면에 오버킬로 얹혀 있던 XState를 걷어내 feature별 작은 store(Zustand)로 통일 (형식 상태머신이 필요한 자리는 URL + reducer로 별도 설계)' },
  ],
};

/* 텍스트 뭉치가 아니라 뱃지로 스캔되게 항목을 배열로 둔다. */
export const resumeSkills: { label: string; items: string[] }[] = [
  {
    label: '렌더링 · 성능',
    items: [
      'Canvas 2D / WebGL',
      '측정-우선 PDF 조판',
      '대용량 가상화',
      '메모리 바운드 처리',
      '접근성 — 키보드·aria·포커스',
    ],
  },
  {
    label: '시스템 설계 · 추상화',
    items: [
      '메타데이터 구동 UI',
      '디자인 시스템 / 라이브러리',
      'RBAC 권한',
      '타입 안전 API 설계',
    ],
  },
  {
    label: '복잡한 상태 · 풀스택',
    items: [
      '상태머신 / URL-as-state',
      'NestJS BFF',
      'GraphQL · 이중 데이터소스',
      '비동기 파이프라인',
    ],
  },
  {
    label: '레거시 현대화 · 점진 이관',
    items: [
      'MUI → Radix + Tailwind v2',
      'XState → Zustand',
      '위저드 → React Hook Form',
      'PHP → React',
    ],
  },
  {
    label: '주요 스택',
    items: [
      'TypeScript',
      'React 18/19',
      'Next.js · SSR/SSG',
      'NestJS',
      'Turborepo (모노레포)',
      'Vite / Rollup',
      'Vitest · Storybook 시각회귀',
      'semantic-release · git 품질 게이트',
    ],
  },
];

/* 성과는 문장이 아니라 불릿 포인트로 — 한눈에 스캔되게.
   results는 임팩트 수치라 숨기지 않고 칩으로 강조한다. */
export type ExpHighlight = {
  head: string;
  points: string[];
  results?: string[];
};
export type ExpCompany = {
  period: string;
  company: string;
  product: string;
  role: string;
  current?: boolean;
  stack: string[];
  highlights: ExpHighlight[];
};

export const resumeExperience: ExpCompany[] = [
  {
    period: '2024 — 현재',
    company: 'Bookips',
    product: 'Solvook · 교육 콘텐츠 플랫폼',
    role: '시니어 프론트엔드 엔지니어',
    current: true,
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Zustand',
      'TanStack Query',
      'Tailwind',
      'Vite',
    ],
    highlights: [
      {
        head: '사내 페이지네이션 엔진을 오픈소스로 공개 — column-pager (npm · MIT)',
        points: [
          'A4 다단(2단) 자동 조판 로직을 순수 코어 / 측정 / 렌더 3계층으로 재설계',
          '같은 문제를 세 번 푼 3세대 엔진 — 검증된 측정 로직은 이식, 아키텍처만 전면 재설계',
          '앱에서 분리해 독립 npm 패키지로 배포',
        ],
        results: [
          '단독 개발',
          '결정적 테스트 49개',
          'semantic-release 자동 배포',
          '인쇄 불량 환불 문의 하루 평균 4건 → 주 2건',
        ],
      },
      {
        head: '콘텐츠 제작 도구 프론트엔드 단독 개발 (Solvook Creator)',
        points: [
          '지문 분석·워크북·변형문제를 편집해 출판물 수준 PDF로 출력하는 제작 도구',
          'JSON 편집에 의존하던 검수 화면을 마우스만으로 검수·수정·삭제·추가하는 GUI 시스템으로 재설계',
          '가변 높이 아이템을 청크(30개) 단위로 측정해 다단 페이지 조판, 7종 데코레이터를 discriminated union으로 타입세이프 모델링',
        ],
        results: ['저작도구 프론트 아키텍처 단독 설계·소유', 'JSON 암기 → 마우스 GUI 검수'],
      },
      {
        head: '시험지 제작 스튜디오 페이징·PDF (Solvook Expert)',
        points: [
          'A4 2단 자동 페이징에서 “측정 DOM == 표시 DOM” 불변식 확립',
          '888×1256 고정 픽셀 + transform:scale로 화면 미리보기 = 서버 PDF 픽셀 일치',
          'column-pager 엔진의 최초 발원지',
        ],
      },
      {
        head: 'MUI 기반 v1을 Radix + Tailwind v2로 재설계 (공용 디자인 시스템 @bookips/sds 공동 메인테이너)',
        points: [
          'v1(MUI): 개발자가 Figma만 보고 수동으로 맞추던 구조 — 실제 개발에 필요한 기능·커스터마이징·확장성 부족',
          'v2 근거 — 제각각인 디자인·인터랙션 요구를 라이브러리와 싸우지 않고 흡수하려면 마크업·스타일 소유권이 필수. 헤드리스(Radix)로 접근성·키보드·포커스는 공짜로 얻고, Tailwind + CVA로 디자인 토큰·variant는 선언적으로 — 커스터마이징 100%, 확장은 컴포넌트 교체 없이',
          'single/multi Select를 하나의 판별 유니온 API로 통합 — 오용은 컴파일 타임 차단',
          'Figma SVG를 svgr 코드젠으로 자동 컴포넌트화(아이콘 160개), push 전 type-check·빌드 게이트로 릴리스 관리',
        ],
        results: ['MUI → Radix + Tailwind 재설계', '공동 메인테이너 · 릴리스 관리'],
      },
      {
        head: '룰 없던 코드베이스 표준화 — 상태관리·컨벤션·오류 모니터링으로 안정적 서비스 기반 구축',
        points: [
          '섞여 있던 XState를 걷어내고 Zustand로 통일 — 복잡한 상태를 feature별 작은 store로 분리',
          'ESLint·Prettier 룰 + git 훅(pre-commit lint·type-check / pre-push test)으로 규칙을 기계가 강제',
          '컴포넌트 UpperPascalCase·Radix 헤드리스+Tailwind 컨벤션 정립, PR 템플릿·CODEOWNERS 도입',
          'Sentry 오류 모니터링 도입 — 안 보이던 프로덕션 버그 추적, 미사용 라이브러리·데드코드 정리',
        ],
        results: ['첫 커밋이 ESLint 설정', '동일 표준을 형제 서비스로 확산'],
      },
    ],
  },
  {
    period: '2023 — 2024',
    company: 'Sling',
    product: 'ORZO · 튜터 수업 관리',
    role: '프론트엔드 엔지니어 (미들·시니어)',
    stack: ['Next.js', 'TypeScript', 'SWR', 'Firebase', 'antd', 'Turborepo'],
    highlights: [
      {
        head: '300p 교재 PDF 첫 조작 약 10분 30초 → 1.3초 (약 488배) — 전 페이지 선렌더 구조 재설계 (ORZO Class)',
        points: [
          '전체 페이지를 미리 그리던 구조 → 온디맨드 + 백그라운드 청크 렌더로 전환, 첫 조작 대기를 페이지 수에 비례하지 않게',
          '자동 선택 시 메모리 폭증을 청크 처리 + page.cleanup()으로 peak 메모리를 청크 크기에 고정',
          '대용량 문서 첫 렌더 안정화 (메모리-정확도 트레이드오프 설계)',
        ],
        results: ['첫 조작 10분 30초 → 1.3초', 'peak 메모리 고정'],
      },
      {
        head: '프론트엔드에 과적용된 DDD 레이어를 걷어내자고 제안·주도',
        points: [
          '백엔드 DDD를 프론트에 그대로 포팅한 구조 — 도메인 모델은 Firestore 스키마를 베낀 빈(anemic) 타입, DTO↔도메인 매퍼는 같은 필드를 거의 1:1로 옮기는 보일러플레이트',
          '한 개념(Problem)이 domain/model · domain/service · repositories(firestore·algolia·functions) · data-transfers · service로 흩어져, 필드 하나 바꿔도 여러 겹을 동시에 수정 — 실질 이득 없이 변경·온보딩 비용만',
          '프론트의 본질은 fetch·캐시·렌더라 판단해 레이어를 걷어내고, 타입 스키마 + 데이터 패칭(SWR)에 직접 얹어 단순화 — 로직은 feature 옆 함수·훅으로 콜로케이션',
        ],
        results: ['DDD 레이어 제거 주도', '변경·온보딩 비용 감소'],
      },
      {
        head: '인증 모델 전환 · 팀 개발 관행 개선 (ORZO Admin)',
        points: [
          '클라 인메모리 ID 토큰 → 서버 발급 Firebase 세션 쿠키 + SSR 인증 가드',
          '서버 로그아웃(refresh token revoke)으로 보안·SSR 정합성 확보',
          'async/await·상태 끌어올리기·네이밍 등 팀 개발 관행 정리·공유',
        ],
      },
    ],
  },
  {
    period: '2020 — 2023',
    company: 'Zipida',
    product: '정부·기업 보안관제 SI',
    role: '프론트 주도 → 풀스택 기술 리드',
    stack: [
      'React',
      'Apollo GraphQL',
      'NestJS',
      'Strapi',
      'Elasticsearch',
      'Redux',
    ],
    highlights: [
      {
        head: '보안관제·포털 14개 프로젝트 전 과정 (회사 주 수입 라인)',
        points: [
          '2년 11개월간 약 14개 프로젝트를 기획 미팅부터 디자인·개발·배포·유지보수까지 전 과정으로',
          '회사 주 수입원인 보안관제·포털 시스템을 맡고, 유지보수로 고객사 관계·재계약까지 연결',
        ],
        results: ['약 14개 프로젝트', '2년 11개월', '전 과정 오너십'],
      },
      {
        head: '컬럼 정의 1벌로 59개 화면을 양산 (법무부 보안관제 포털)',
        points: [
          'Table 컴포넌트 1개가 컬럼 메타에서 목록·검색·정렬·엑셀·모달폼·권한 생성',
          '라우트 정의 1벌 → 메뉴·권한트리·체크키 동시 파생 (RBAC)',
          '정형 CRUD는 GraphQL, 통계·레거시 보안 데이터는 raw SQL로 분리',
        ],
        results: [
          '프론트 개발',
          '59개 화면 재사용',
          '약 2년',
        ],
      },
      {
        head: '코드 없이 탐지 ML을 학습시키는 마법사 (KISTI AI 관제) · 풀스택 — 전사 최대 규모 프로젝트',
        points: [
          'crawl·feature·train 5단계 학습 파이프라인을 URL-as-state + immer 상태머신으로 구현',
          'react-awesome-query-builder로 Elasticsearch bool 쿼리를 GUI 조립',
          '패킷 payload(HEX)를 디코딩 → 엔트로피 → TCP flag 추출해 ML 특징으로 변환',
        ],
        results: [
          '비개발자용 5단계 GUI 학습',
          '프론트 + 백 설계·구현',
        ],
      },
      {
        head: '현대오토에버 EDR 포털 · 풀스택 (BFF 보안 경계)',
        points: [
          '비밀번호 해시·파일명 인코딩·권한 필터를 NestJS BFF 프록시에서 통제 (프론트는 평문 비밀번호 미접근)',
          '조회 전용 정형 데이터 = PostgreSQL / 가변 스키마 = MongoDB 이중 DB 전략',
        ],
      },
      {
        head: '그 외 보안관제·풀스택 프로젝트',
        points: [
          '문체부 내·외부 관제 포털 (CommonPage CRUD 엔진 · 4층 RBAC · 30분 유휴 자동 로그아웃)',
          '사이버 훈련 CTF 동적 점수 ledger (Go gRPC·Redis)',
          '통일부 포털: 데이터 규모가 커지자 6,000건 클라이언트 페이징 → 서버사이드 페이징으로 처리 구조 전환',
          'COVID-19 추적 RN 앱 (커스텀 Redux 미들웨어·지도 시각화), Rittal B2B 커머스 (react-snap SSR·GA 대시보드)',
        ],
      },
    ],
  },
  {
    period: '2019 — 2020',
    company: '옐로오투오',
    product: '웹 에이전시',
    role: '프론트엔드',
    stack: ['React', 'PHP', '그누보드', 'MySQL', 'jQuery', 'Shell Script'],
    highlights: [
      {
        head: '다수의 예약 시스템 단독 개발 (공간대여·축구장·펜션 등)',
        points: [
          '도메인마다 가격 엔진·예약 UI·관리자·엑셀·SMS까지 예약 흐름 전체를 단독 구현',
          'PHP·그누보드로 시작해 React로 전환 — 컴포넌트 분리·반응형 설계 기반 습득',
        ],
        results: ['예약 도메인 단독', '공간·축구장·펜션 등 다수'],
      },
      {
        head: '홈페이지 특성에 맞춘 커스텀 플러그인 개발',
        points: [
          '그누보드 등 기존 템플릿 위에, 사이트 성격에 맞는 기능을 플러그인으로 제작 (예: 펜션 홈페이지용 예약 플러그인)',
          '프로젝트마다 다른 요구를 재사용 가능한 플러그인 단위로 분리',
        ],
      },
      {
        head: '어드민에서 DB 필드를 직접 확장 (그누보드 여분필드 연동)',
        points: [
          '그누보드 여분필드(추가 DB 컬럼) 확장을 개발자 개입 없이 어드민 화면에서 처리하도록, DB 테이블 조작을 UI에 연동',
          '필드 추가·수정을 운영자가 직접 — 요구가 바뀔 때마다 스키마를 코드로 손대던 반복 제거',
        ],
        results: ['운영자 셀프 필드 확장', 'DB 스키마 조작 UI 연동'],
      },
      {
        head: 'SFTP 수동 배포를 쉘 스크립트로 자동화',
        points: [
          '파일을 SFTP로 일일이 올리던 배포를, 빌드·업로드를 한 번에 처리하는 쉘 스크립트로 자동화',
          '반복 작업과 사람 실수(누락 파일·잘못된 경로) 제거, 배포 시간 단축',
        ],
        results: ['수동 업로드 → 스크립트 1회 실행'],
      },
    ],
  },
];

export const education: { school: string; period: string; detail: string }[] = [
  {
    school: '스마트워킹 ICT 솔루션 개발자 과정',
    period: '2013',
    detail: 'Java · Spring Framework 기반 웹 통합 교육 (국비지원)',
  },
  {
    school: '상일미디어고등학교',
    period: '2012 — 2014',
    detail: '스마트 소프트웨어 학과',
  },
];

export const oss = {
  repo: 'H8njo/column-pager',
  desc: '페이지 나누기(레이아웃 계산) 하나만 책임지는 작은 코어.\nPDF·저장 등 나머지는 사용처에 위임해, 어떤 React 화면에도 가볍게 얹힌다.',
  tags: ['TypeScript', 'React 18/19', 'Tree-shakeable'],
  install: 'npm i column-pager',
  importLine: "import { ColumnPager } from 'column-pager'",
  stats: [
    ['결정적 테스트', '49개'],
    ['릴리스', 'semantic-release'],
    ['라이선스', 'MIT'],
  ] as [string, string][],
  href: 'https://github.com/H8njo/column-pager',
};
