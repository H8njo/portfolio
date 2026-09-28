import type { ExpCompany } from './content';

/* =========================================================================
   리멤버(Remember) 웹 프론트엔드 맞춤형 이력서 콘텐츠 (간결 & 호기심 유발 압축판)
   - 핵심 전략:
     1. 장황한 세부 구현 나열 축소 → '어떻게 풀었지?' 궁금증을 유도하는 트리거 키워드 배치
     2. 3중 중복(제목-본문-배지) 제거 → [핵심 문제 및 솔루션 1줄] + [임팩트 1줄]로 압축
     3. 세부 구현 내역은 케이스 스터디 링크 및 면접 질문 유도로 이관
   ========================================================================= */

/* ── 1페이지 상단: 4대 핵심 엔지니어링 임팩트 (10초 시선 장악) ── */
export const rememberExecutiveImpact = [
  {
    metric: '검수량 8배 폭증',
    sub: '하루 1,000건 → 8,000건',
    title: 'Delta2 초고속 검수 콘솔',
    desc: '작업자 병목을 분석해 AST 기반 일괄 교정 및 5단계 단축키 큐를 갖춘 전용 SPA 자발적 기획·개발',
    tag: '생산성 혁신',
  },
  {
    metric: '인쇄 환불 0건',
    sub: '2년 난제 완전 종결',
    title: 'A4 다단 분할 엔진 (column-pager)',
    desc: '브라우저 CSS 한계로 2년간 방치된 인쇄 잘림 결함을 순수 좌표 실측 알고리즘으로 해결 및 npm 배포',
    tag: '오픈소스 배포',
  },
  {
    metric: '488배 가속',
    sub: 'TTI 10분 30초 → 1.3초',
    title: '300p 대용량 PDF 최적화',
    desc: '온디맨드 청크 렌더링 및 캔버스 메모리 즉시 회수 라이프사이클 설계로 브라우저 탭 충돌 차단',
    tag: '렌더링 성능',
  },
  {
    metric: '59개 화면 양산',
    sub: '메타데이터 정의 1벌',
    title: '법무부 보안관제 포털 Table 엔진',
    desc: '선언적 메타데이터 하나로 목록·검색·정렬·권한을 자동 구성하는 공통 엔진 설계 (2인 개발)',
    tag: '아키텍처 추상화',
  },
];

/* ── 1페이지: 프로필 요약 ── */
export const rememberResumeSummary: {
  t: string;
  kind: 'lead' | 'hook' | 'body' | 'close';
}[] = [
  { t: '7년차 시니어 프론트엔드 엔지니어', kind: 'lead' },
  {
    t: '사용자의 실제 업무와 도메인 병목을 관찰하고, 빠른 실행과 집요한 엔지니어링으로 측정 가능한 비즈니스 성과를 만드는 7년차 프론트엔드 엔지니어입니다. 외부 라이브러리에 안주하지 않고 브라우저 렌더링 파이프라인과 순수 알고리즘을 파고들어 2년 묵은 결함을 해결하고, 반복 업무를 시스템으로 자동화합니다.',
    kind: 'hook',
  },
  {
    t: '사양서 기반 AI 엔지니어링 워크플로를 주도하여 제품 딜리버리 속도를 극대화하며, 함께 일하는 동료들의 개발 경험과 제품 완성도를 함께 끌어올리는 데 집중합니다.',
    kind: 'close',
  },
];

/* ── 기술 역량 (핵심 강점 위주 정돈) ── */
export const rememberResumeSkills: { label: string; items: string[] }[] = [
  {
    label: '코어 & 프레임워크',
    items: [
      'TypeScript',
      'React 18/19',
      'Next.js (App / Pages)',
      'Vite',
      '웹 접근성 (WAI-ARIA)',
    ],
  },
  {
    label: '상태 관리 & 데이터',
    items: [
      'TanStack Query',
      'Zustand',
      'SWR',
      'URL-as-state',
      '상태 머신',
    ],
  },
  {
    label: '디자인 시스템 & UI',
    items: [
      'Radix UI 헤드리스',
      'Tailwind CSS',
      'CVA 판별 유니온',
      'svgr 코드젠 자동화',
      'Storybook',
    ],
  },
  {
    label: '엔지니어링 & 성능',
    items: [
      '가상화 & 청크 렌더링',
      '메모리 누수 / Canvas 2D 최적화',
      'WebGL / GLSL',
      'Vitest 단위 테스트',
      'Turborepo',
    ],
  },
  {
    label: '데이터 & 분석',
    items: [
      'Mixpanel 행동 퍼널 계측',
      '타입 안전 이벤트 로깅',
      'Sentry 에러 모니터링',
      'Google Analytics',
    ],
  },
  {
    label: '협업 & 인프라',
    items: [
      'BFF 프록시 보안 경계 (NestJS)',
      'GraphQL / REST API',
      'SSR 세션 인증 가드',
      'GitHub Actions · semantic-release',
    ],
  },
  {
    label: 'AI 엔지니어링',
    items: [
      '사양서(Spec) 기반 AI 코딩 파이프라인',
      '도메인 규칙 표준화 (CLAUDE.md)',
      '사내 개발 자동화 도구 제작',
    ],
  },
];

/* ── 경력 기술서 (호기심 유발 2줄 압축 및 성과 정돈) ── */
export const rememberResumeExperience: ExpCompany[] = [
  {
    period: '2024.08 — 2026.08',
    company: 'Bookips',
    product: 'Solvook · 교육 콘텐츠 플랫폼',
    role: '시니어 프론트엔드 엔지니어',
    stack: [
      'Next.js',
      'React 19',
      'TypeScript',
      'Zustand',
      'TanStack Query',
      'Radix UI',
      'Tailwind CSS',
      'Vite',
    ],
    highlights: [
      {
        head: '사내 초고속 검수 콘솔 개발 (Delta2)',
        points: [
          '작업자 동선 병목을 분석해 AST 기반 일괄 자동 교정과 5단계 단축키 큐를 갖춘 전용 SPA 자발적 기획·구현',
          '수작업 복사·붙여넣기를 시스템으로 완전 제거하여 일일 검수량 8배 폭증 (1,000건 → 8,000건)',
        ],
        results: [
          '일일 검수량 8배 폭증 (1,000건 → 8,000건)',
          '수작업 복사·붙여넣기 100% 제거',
        ],
      },
      {
        head: 'A4 다단 레이아웃 분할 엔진 개발 및 오픈소스 배포 (column-pager)',
        points: [
          '브라우저 CSS 다단 분할 한계로 2년간 지속된 인쇄 잘림 결함을 좌표 실측 기반 3계층 엔진으로 해결',
          '49개 단위 테스트를 갖춘 독립 npm 패키지로 배포하여 일 4건의 인쇄 환불을 0건으로 종결하고, 주력 매출 제품(쏠북패스) 런칭 기반 마련',
        ],
        results: [
          '인쇄 불량 환불 문의 0건 종결',
          '독립 npm 오픈소스 배포 (테스트 49개)',
          '주력 제품(쏠북패스) 런칭 기반',
        ],
      },
      {
        head: '공용 디자인 시스템 재설계 및 메인테이너 운영',
        points: [
          'Radix 헤드리스 프리미티브와 판별 유니온 API로 잘못된 속성 조합을 컴파일 타임에 선제 차단하고 WAI-ARIA 웹 접근성 기본 내장',
          'SVG 코드젠 파이프라인 구축으로 160개 아이콘 수기 등록을 즉시화하고, CI/CD 기반 자동 릴리스 운영',
        ],
        results: [
          '웹 접근성(WAI-ARIA) 기본 보장',
          '160개 아이콘 등록 공수 즉시화',
        ],
      },
      {
        head: '주문제작 위저드 폼 개발 및 전사 피드백 단축',
        points: [
          '복잡한 3단계 마법사를 단일 폼으로 통합하고, 브라우저 단 PDF 즉시 파싱으로 실시간 견적 산출 및 폼 데이터 유실 0건 달성',
          '전 구간 퍼널 행동 계측(Mixpanel) 구축 및 실시간 PDF 뷰어 도구 자체 개발로 피드백 루프 10분 → 1초 단축',
        ],
        results: [
          '클라이언트 PDF 0.1초 즉시 견적 산출',
          '피드백 루프 10분 → 1초 단축',
        ],
      },
    ],
  },
  {
    period: '2023.11 — 2024.02',
    company: 'Sling',
    product: 'ORZO · 튜터 수업 관리 플랫폼',
    role: '프론트엔드 엔지니어 (미들·시니어)',
    stack: ['Next.js', 'TypeScript', 'SWR', 'Firebase', 'antd', 'Turborepo'],
    highlights: [
      {
        head: '300p 대용량 PDF 첫 조작 대기 10분 30초 → 1.3초 단축 (488배 가속)',
        points: [
          '문서 일괄 렌더링 방식을 가시 영역 우선 청크 온디맨드 렌더링 구조로 전면 재설계',
          '초기 조작 대기(TTI)를 1.3초로 고정하고, 캔버스 메모리 즉시 회수 라이프사이클로 저사양 기기 탭 충돌 원천 차단',
        ],
        results: [
          'TTI 10분 30초 → 1.3초 (488배 가속)',
          '메모리 즉시 회수로 브라우저 충돌 방지',
        ],
      },
      {
        head: '계층형 에러 핸들링 모듈 설계 및 사내 세미나 발표',
        points: [
          '산발적이던 예외 처리를 시스템 전역 알림과 사용자 재시도 영역으로 분리한 2계층 모듈 구축 및 사내 표준화',
          '클라이언트 토큰 인증 방식을 서버 세션 쿠키 및 SSR 인증 가드로 전환해 보안 취약점 선제 차단',
        ],
        results: [
          '2계층 에러 핸들링 전사 표준화',
          '서버 세션 기반 보안 인증 체계 구축',
        ],
      },
      {
        head: '프론트엔드 과적용 DDD 5단 레이어 제거 및 단순화',
        points: [
          '단순 필드 수정에도 5개 계층을 거쳐야 했던 복잡한 DDD 구조의 문제점을 공유하고, SWR과 화면 훅 중심으로 단순화 제안',
          '불필요한 보일러플레이트 코드를 대폭 제거하여 기능 개발 속도 향상 및 신규 입사자 온보딩 비용 단축',
        ],
        results: [
          '보일러플레이트 코드 대폭 축소',
          '기능 개발 속도 및 온보딩 개선',
        ],
      },
    ],
  },
  {
    period: '2020.05 — 2023.03',
    company: 'Zipida',
    product: '정부·기업 보안관제 포털 SI',
    role: '프론트 주도 → 풀스택 기술 리드',
    stack: [
      'React',
      'Apollo GraphQL',
      'NestJS',
      'Elasticsearch',
      'PostgreSQL',
      'MongoDB',
    ],
    highlights: [
      {
        head: '컬럼 메타데이터 정의 1벌로 59개 화면 양산 (법무부)',
        points: [
          '컬럼 속성 정의 하나로 목록·검색·정렬·엑셀·권한을 자동 구성하는 선언적 Table 엔진 개발',
          '라우트 설정과 메뉴 트리 및 RBAC 권한 키가 자동 연동되도록 설계하여 2인 개발로 59개 보안 화면 안정 구축',
        ],
        results: [
          '메타데이터 기반 59개 화면 자동 생성',
          '2인 개발로 대규모 도메인 안정 구축',
        ],
      },
      {
        head: '비개발자 분석가를 위한 5단계 머신러닝(ML) 학습 마법사 개발 (KISTI 관제)',
        points: [
          '보안 분석가가 브라우저에서 직접 AI 모델을 학습·배포할 수 있도록 URL 상태 머신 기반 5단계 마법사 GUI 구현',
          '프론트엔드 UI부터 NestJS 백엔드, 네트워크 패킷 전처리 파이프라인까지 풀스택 주도로 전사 최대 프로젝트 완수',
        ],
        results: [
          '비개발자 전용 ML 학습 GUI 구현',
          '전사 최대 규모 프로젝트 성공적 완수',
        ],
      },
      {
        head: 'BFF 보안 경계 구축 및 다중 API 병렬 집계 (현대오토에버 EDR)',
        points: [
          'NestJS BFF 프록시 계층으로 민감 토큰을 보안 격리하고, 10여 개 API 요청을 서버에서 병렬 집계해 응답 속도 최적화',
          '초기 스타트업(5인→30인) 성장기에 기술 리드를 맡아 타 팀의 개발 병목을 해소하고 총 14개 프로젝트 완수',
        ],
        results: [
          '민감 토큰 노출 원천 차단 (보안 격리)',
          '14개 프로젝트 완수 및 기술 리드 수행',
        ],
      },
    ],
  },
  {
    period: '2019.01 — 2020.01',
    company: '옐로오투오',
    product: '웹 에이전시',
    role: '프론트엔드 엔지니어',
    stack: ['React', 'JavaScript', 'PHP', 'MySQL'],
    highlights: [
      {
        head: '다양한 예약 시스템 단독 개발 및 React 컴포넌트 전환',
        points: [
          '공간 대여 및 체육시설 예약 서비스의 요금 계산 로직, 실시간 예약 캘린더, 관리자 정산 기능을 단독으로 설계·구현',
          '기존 템플릿 환경에서 모던 React 컴포넌트 구조로 전환하며 컴포넌트 재사용성과 반응형 웹 설계 기반 정립',
        ],
        results: [
          '예약 및 정산 코어 시스템 단독 개발',
          'React 컴포넌트 아키텍처 전환',
        ],
      },
    ],
  },
];

/* ── 3페이지: 오픈소스 & 사이드 프로젝트 (호기심 유발 & 중복 제거) ── */
export const rememberResumeSide = [
  {
    name: 'column-pager',
    meta: '오픈소스 · npm 배포 · MIT',
    what: '브라우저 CSS 한계를 극복하고 웹 콘텐츠를 고정 규격 A4 다단 페이지로 자동 분할하는 순수 레이아웃 엔진.',
    points: [
      'DOM 좌표 실측과 3계층 아키텍처로 설계해 사내 결함을 해결하고, 49개 단위 테스트를 갖춘 독립 npm 패키지로 일반화',
    ],
    stack: ['TypeScript', 'React', 'Vitest', 'semantic-release'],
    repo: 'https://github.com/H8njo/column-pager',
    caseUrl: '/work/column-count-layout',
  },
  {
    name: 'afk',
    meta: 'macOS 유틸리티 · 단독 개발 · Homebrew 배포',
    what: 'AI 코딩 도구의 작업 완료 상태를 감지해 브라우저나 편집기로 포커스를 자동 전환하는 macOS 메뉴바 앱.',
    points: [
      '장시간 AI 에이전트 작업 대기 중 프로세스 종료를 감지하여 작업 화면으로 즉시 자동 포커싱 (Swift/SPM 빌드)',
    ],
    stack: ['Swift', 'SwiftUI', 'SPM', 'Homebrew', 'Claude Code'],
    repo: 'https://github.com/H8njo/afk',
    caseUrl: '/work/afk',
  },
  {
    name: 'webgl-black-hole',
    meta: '그래픽스 · 단독 개발',
    what: 'WebGL 셰이더로 블랙홀의 중력렌즈 왜곡 효과를 브라우저에서 실시간 렌더링하는 순수 그래픽스 프로젝트.',
    points: [
      '외부 3D 라이브러리 없이 순수 GLSL 셰이더로 수천 개 별의 빛 굴절과 시공간 왜곡을 브라우저 60fps로 실시간 연산',
    ],
    stack: ['WebGL', 'GLSL', 'Canvas 2D', 'TypeScript'],
    repo: 'https://github.com/H8njo/webgl-black-hole',
    caseUrl: '/work/webgl-blackhole',
  },
  {
    name: 'samra-mansang',
    meta: '풀스택 웹 서비스 · 단독 개발',
    what: '대규모 게임 데이터(업적 2,222개) 추적·관리 및 공략 위키 웹 서비스 (Next.js·NestJS 풀스택).',
    points: [
      '대용량 맵 타일 뷰어 에셋 용량을 96% 최적화(268MB→10.7MB)하고, OCR 데이터 추출 파이프라인까지 1인 단독 개발',
    ],
    stack: ['Next.js', 'NestJS · Prisma', 'Leaflet', 'OCR', 'WebRTC'],
    caseUrl: '/work/samra-mansang',
  },
];
