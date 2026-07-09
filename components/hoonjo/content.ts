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
  role: '7년차 프론트엔드 엔지니어',
  since: '2019',
  email: 'jaiemf@gmail.com',
  github: 'https://github.com/H8njo',
  githubHandle: 'github.com/H8njo',
  tagline: ['안 되던 화면을', '되게 만듭니다.'],
  lead: '성능, 복잡한 상태, 까다로운 렌더링\n: 직접 측정하고, 끝까지 동작하게.',
  heroTags: ['성능 최적화', '대용량 렌더링', '복잡한 상태', 'Canvas / WebGL'],
};

/* Hero featured-impact strip — the strongest real before→after pairs. */
export const impact = {
  lead: '반복을 구조로, 결과를 숫자로.',
  stats: [
    { k: '같은 모양 화면 59개', before: '화면마다 코딩', after: '정의 하나로' },
    { k: '페이지네이션 엔진', before: '사내 전용', after: 'npm 공개' },
    { k: '탐지 모델 학습', before: '직접 코딩', after: 'GUI 5단계' },
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
    { label: '환불 문의', after: '대폭 감소', gain: '2년 이어지던 불량 환불' },
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
    '재사용성을 확보한 덕에 후속 저작 도구, 나아가 AI 문제 생성 서비스(현재 메인 매출의 한 축)로 이어졌다 — 그즈음 매출이 전년의 약 150%가 됐다.',
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
        label: '내 커밋 · 프론트 개발',
        after: '696',
        unit: '/1,299',
        gain: '약 2년',
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
      { label: '역할', after: '코드오너', gain: '모든 PR 리뷰·머지·릴리스' },
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

export type CaseLink = { label: string; href: string };
export type Timeline = {
  period: string;
  role: string;
  org: string;
  /* 역할 아래에 붙는 성장·범위 신호 — 직급을 지어내지 않고 실제 오너십만
     표기(디자인 시스템 코드오너 / 미들·시니어 / 프론트 주저자). */
  scope?: string;
  description: string;
  tags: string[];
  current?: boolean;
  /* 해당 시기의 대표 케이스로 유입 — /work/[slug] 상세 글로 연결. */
  cases?: CaseLink[];
};

export const timeline: Timeline[] = [
  {
    period: '2024 — 현재',
    role: 'Frontend Engineer',
    org: '@Bookips',
    scope: '디자인 시스템 코드오너',
    description:
      '교육 콘텐츠 플랫폼 쏠북(Solvook). 메인 서비스 엑스퍼트의 A4 다단 조판 난제를 풀어 사내 엔진을 오픈소스(column-pager · npm·MIT)로 공개하고,\n그 엔진을 축으로 콘텐츠 저작툴을 새 프로젝트로 단독 구축(1,682커밋). 저작툴에서 파생된 쏠북패스 출시로 메인 매출까지 이어졌다. 공용 디자인 시스템 공동 메인테이너.',
    tags: ['Next.js', 'TypeScript', 'Canvas', 'OSS'],
    current: true,
    cases: [
      { label: 'column-pager 오픈소스', href: '/work/column-count-layout' },
      { label: '저작툴 본문 에디터', href: '/work/problem-editor' },
      { label: '디자인 시스템 자동화', href: '/work/design-system' },
    ],
  },
  {
    period: '2023 — 2024',
    role: 'Frontend Engineer',
    org: '@Sling',
    scope: '미들·시니어',
    description:
      '튜터용 수업 관리 앱 ORZO. 300페이지 교재 PDF의 첫 조작까지를\n639,000ms → 1,310ms(약 488배)로 줄이고, OOM 없는 메모리 바운드 렌더링으로 재설계했다.',
    tags: ['Next.js', 'PDF', '성능', '메모리'],
    cases: [{ label: 'PDF 메모리 최적화', href: '/work/pdf-memory' }],
  },
  {
    period: '2020 — 2023',
    role: 'Frontend Engineer · Fullstack',
    org: '@Zipida',
    scope: '보안관제 프론트 주저자',
    description:
      '정부·기업 보안관제 SI를 프론트 주저자(696커밋)로 이끌었다. 법무부 포털은 컬럼 정의 1벌로 59개 화면을 양산했고,\nKISTI는 코드 없이 탐지 ML을 학습시키는 마법사로, 현대오토에버 EDR은 이중 데이터소스·NestJS BFF로 설계했다.',
    tags: ['React', 'GraphQL', 'NestJS', 'RBAC'],
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
    description:
      'PHP 예약 시스템에서 시작해 React로 전환하며 컴포넌트 분리·반응형 설계 기반을 익혔습니다.',
    tags: ['React', 'PHP', '반응형'],
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
  { t: '7년차 프론트엔드 엔지니어', kind: 'lead' },
  { t: '남들이 막힌 화면을 직접 측정해 되게 만듭니다.', kind: 'hook' },
  {
    t: '성능 · 대용량 렌더링 · 복잡한 상태를 풀고, 반복을 재사용 가능한 구조·라이브러리로.',
    kind: 'body',
  },
  {
    t: '보안관제 SI 풀스택부터 교육 플랫폼 사내 엔진 오픈소스화까지 : 도메인이 바뀌어도 문제를 구조로 푸는 방식은 같습니다.',
    kind: 'close',
  },
];

/* 텍스트 뭉치가 아니라 뱃지로 스캔되게 항목을 배열로 둔다. */
export const resumeSkills: { label: string; items: string[] }[] = [
  {
    label: '렌더링 · 성능',
    items: [
      'Canvas 2D / WebGL',
      '측정-우선 PDF 조판',
      '대용량 가상화',
      '메모리 바운드 처리',
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
    label: '주요 스택',
    items: [
      'TypeScript',
      'React 18/19',
      'Next.js',
      'NestJS',
      'Vite / Rollup',
      'semantic-release',
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
    role: '프론트엔드 엔지니어',
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
          '2년 이어지던 인쇄 불량 환불 문의 해소',
        ],
      },
      {
        head: '콘텐츠 제작 도구 프론트엔드 단독 개발 (Solvook Creator)',
        points: [
          '지문 분석·워크북·변형문제를 편집해 출판물 수준 PDF로 출력하는 제작 도구',
          '가변 높이 아이템을 청크(30개) 단위로 측정해 다단 페이지로 조판',
          '7종 데코레이터(밑줄·화살표·메모…)를 discriminated union으로 타입세이프 모델링',
        ],
        results: ['프론트 단독', '1,682 커밋 (전체의 95%)', '기능 10개'],
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
        head: '공용 디자인 시스템 공동 메인테이너 (@bookips/sds)',
        points: [
          'single/multi Select를 하나의 판별 유니온 API로 통합 — 오용은 컴파일 타임 차단',
          'Figma SVG를 svgr 코드젠으로 자동 컴포넌트화 (아이콘 160개)',
          'push 전 type-check·빌드 게이트로 릴리스 품질 관리',
        ],
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
        head: '대용량 교재 PDF를 브라우저에서 OOM 없이 렌더 (ORZO Class)',
        points: [
          '전체 페이지 자동 선택 시 메모리 폭증을 청크 처리 + page.cleanup()으로 고정',
          'gate 제거 → 캐시 우선 온디맨드 렌더로 전환',
          '대용량 문서 첫 렌더 안정화 (메모리-정확도 트레이드오프 설계)',
        ],
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
    product: '정부·기업 보안관제 SI · 풀스택',
    role: '프론트엔드 개발 · 풀스택',
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
        head: '컬럼 정의 1벌로 59개 화면을 양산 (법무부 보안관제 포털)',
        points: [
          'Table 컴포넌트 1개가 컬럼 메타에서 목록·검색·정렬·엑셀·모달폼·권한 생성',
          '라우트 정의 1벌 → 메뉴·권한트리·체크키 동시 파생 (RBAC)',
          '정형 CRUD는 GraphQL, 통계·레거시 보안 데이터는 raw SQL로 분리',
        ],
        results: [
          '프론트 개발',
          '59개 화면 재사용',
          '696 / 1,299 커밋',
          '약 2년',
        ],
      },
      {
        head: '코드 없이 탐지 ML을 학습시키는 마법사 (KISTI AI 관제) · 풀스택',
        points: [
          'crawl·feature·train 5단계 학습 파이프라인을 URL-as-state + immer 상태머신으로 구현',
          'react-awesome-query-builder로 Elasticsearch bool 쿼리를 GUI 조립',
          '패킷 payload(HEX)를 디코딩 → 엔트로피 → TCP flag 추출해 ML 특징으로 변환',
        ],
        results: [
          '풀스택 기여 54%',
          '비개발자용 5단계 GUI 학습',
          'NestJS·Prisma+Knex',
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
          '통일부 6,000건 클라 → 서버사이드 페이징 전환',
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
    stack: ['React', 'PHP', 'MySQL', 'jQuery'],
    highlights: [
      {
        head: '펜션 예약 시스템 단독 개발 → React 전환',
        points: [
          '가격 엔진·예약 UI·관리자·엑셀·SMS까지 예약 도메인 전체 단독 구현 (PHP·그누보드)',
          'React 전환으로 컴포넌트 분리·반응형 설계 기반 습득',
        ],
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
  desc: '어떤 React 화면이든 인쇄물처럼 “고정 크기 페이지”로 자동 분할하는 도구.\n페이지 나누기(레이아웃 계산)만 책임지고 PDF 변환 등은 사용처에 위임해 가볍게 유지.',
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
