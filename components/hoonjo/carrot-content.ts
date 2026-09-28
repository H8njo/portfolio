import type { ExpCompany } from './content';

/* =========================================================================
   당근(Daangn) 로컬 잡스 — 레슨/과외 팀 맞춤형 이력서 콘텐츠 (서류 합격 극대화 버전)
   - 타겟: Software Engineer, Frontend - 로컬 잡스 (레슨/과외 팀)
   - 핵심 전략:
     1. [도메인 핏 & 인앱 웹뷰] 슬링(ORZO) '모바일·태블릿 인앱 웹뷰 튜터 플랫폼' 명시
     2. [가설 기반 퍼널 실험] 북아이피스(Solvook) 'Mixpanel 퍼널 이탈 분석 및 단일폼 가설 검증' (결제 연동)
     3. [AI 하네스 & 코드리뷰 문화] 도메인별 CLAUDE.md 분할(컨텍스트 최적화) + PR 리뷰 스킬 제작·공유
     4. [우대조건 100% 충족] Apollo GraphQL 실무 3년, AI 에이전트 유틸리티(afk) 단독 개발
   ========================================================================= */

/* ── 1페이지 상단: 당근 로컬잡스(레슨/과외) 맞춤 4대 핵심 엔지니어링 임팩트 ── */
export const carrotExecutiveImpact = [
  {
    metric: '488배 가속',
    sub: 'TTI 10분 30초 → 1.3초',
    title: '모바일·웹뷰 튜터 뷰어 최적화',
    desc: '슬링(ORZO) 튜터 수업 플랫폼의 인앱 웹뷰 환경에서 온디맨드 청크 렌더링 및 메모리 즉시 회수로 수업 인터랙션 안정화',
    tag: '튜터 플랫폼 & 인앱 웹뷰',
  },
  {
    metric: '데이터 유실 0건',
    sub: '퍼널 이탈 개선 & 실시간 견적',
    title: '주문 퍼널 가설 검증 및 결제 단일화',
    desc: 'Mixpanel 퍼널 이탈 분석 기반으로 단계 마찰을 줄이는 가설을 수립하고, RHF 단일폼 전환 및 전사 결제 인프라 연동',
    tag: '가설 검증 & 결제 퍼널',
  },
  {
    metric: '컨텍스트 & 속도 최적화',
    sub: '다각도 리뷰 문화 정착',
    title: '도메인별 CLAUDE.md & PR 리뷰 스킬',
    desc: '도메인별 CLAUDE.md 분할로 AI 토큰 최적화 및 문서 탐색 가속, 리뷰어별 검토 관점을 관리하는 PR 리뷰 스킬 구축·공유',
    tag: 'AI 하네스 & 리뷰 문화',
  },
  {
    metric: '검수량 8배 폭증',
    sub: '하루 1,000건 → 8,000건',
    title: '초고속 검수 콘솔 자발적 기획 (Delta2)',
    desc: '작업자 동선 병목을 직접 발굴해 AST 원클릭 일괄 교정 및 5단계 단축키 큐 SPA 구축 (단순 반복 수작업 100% 제거)',
    tag: '0 to 1 빌더 & 생산성',
  },
];

/* ── 1페이지: 프로필 요약 (당근 레슨/과외 맞춤형 가치 제안) ── */
export const carrotResumeSummary: {
  t: string;
  kind: 'lead' | 'hook' | 'body' | 'close';
}[] = [
  { t: '7년차 시니어 프론트엔드 엔지니어', kind: 'lead' },
  {
    t: '모바일·태블릿 인앱 웹뷰 환경에서의 튜터 수업 관리 플랫폼(ORZO) 도메인 경험과 마켓플레이스 결제 퍼널 최적화, 그리고 도메인별 CLAUDE.md 분할과 PR 리뷰 스킬 제작을 통한 팀 AI 워크플로우 혁신으로 비즈니스 임팩트를 만들어 온 7년차 프론트엔드 엔지니어 조영훈입니다. 주어진 스펙 구현에 머무르지 않고 데이터와 사용자의 실제 여정을 먼저 관찰하여 가설을 세우고 끝까지 검증합니다.',
    kind: 'hook',
  },
  {
    t: '사양서(Spec) 기반 AI 개발 하네스와 Apollo GraphQL, 선언적 UI 아키텍처를 바탕으로 제품의 기민한 출시와 높은 완성도를 동시에 확보합니다. 동네 이웃과 선생님이 서로를 믿고 배움으로 연결되는 따뜻한 로컬 마켓플레이스를 당근 레슨/과외 팀과 함께 만들어가겠습니다.',
    kind: 'close',
  },
];

/* ── 핵심 기술 역량 (당근 JD 요구 스택 100% 매칭) ── */
export const carrotResumeSkills: { label: string; items: string[] }[] = [
  {
    label: '코어 & 프레임워크',
    items: [
      'React 18/19',
      'TypeScript',
      '모바일 인앱 웹뷰 (In-App WebView)',
      'Next.js (App / Pages)',
      '웹 접근성 (WAI-ARIA)',
    ],
  },
  {
    label: 'AI 에이전트 & 엔지니어링 문화',
    items: [
      '도메인별 CLAUDE.md 컨텍스트 최적화',
      'PR 리뷰 자동화 스킬 제작 & 챕터 공유',
      '사양서(Spec) 기반 AI 코딩 파이프라인',
      'afk (AI 완료 감지 macOS 유틸리티 개발)',
    ],
  },
  {
    label: '데이터 & API 계층',
    items: [
      'Apollo GraphQL 클라이언트',
      'TanStack Query',
      'Zustand',
      'SWR',
      'BFF 아키텍처 (NestJS)',
    ],
  },
  {
    label: '결제 & 마켓플레이스 퍼널',
    items: [
      'Mixpanel 퍼널 이탈 분석 & 가설 검증',
      'React Hook Form 선언적 단일폼',
      '공통 결제 인프라 연동',
      '클라이언트 단 즉시 파싱 (0.1초)',
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
      '대용량 청크 & 가상화 렌더링',
      'Canvas 2D 메모리 라이프사이클 최적화',
      'Vitest 단위 테스트 자동화 (49개 테스트)',
      'Turborepo (모노레포)',
    ],
  },
];

/* ── 경력 기술서 (도메인 핏, 퍼널 실험, AI 워크플로우 중심) ── */
export const carrotResumeExperience: ExpCompany[] = [
  {
    period: '2024.08 — 2026.08',
    company: 'Bookips',
    product: 'Solvook · 교육 콘텐츠 마켓플레이스',
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
        head: '주문 퍼널 이탈(Drop-off) 분석 기반 단일폼 통합 및 전사 결제 연동',
        points: [
          '기존 3단계 주문 과정의 퍼널 이탈 지점을 Mixpanel로 분석하여, "입력 단계 마찰을 줄이면 결제 전환율이 오를 것"이라는 가설을 수립하고 React Hook Form 기반 단일 선언적 폼으로 전면 개편',
          '브라우저 단 PDF 즉시 파싱 로직을 자체 구현해 실시간(0.1초) 견적을 산출하고, 로컬 스토리지 영속화로 인증 이동 시 폼 데이터 유실 0건 달성',
        ],
        results: [
          '퍼널 이탈 개선 & 결제 전환 가설 검증',
          '인증 이동 시 폼 데이터 유실 0건',
          '클라이언트 PDF 0.1초 즉시 견적 산출',
        ],
      },
      {
        head: '도메인별 CLAUDE.md 분할 및 PR 리뷰 스킬 구축 (팀 AI 워크플로우)',
        points: [
          '프로젝트 폴더 단위로 도메인 사양서(CLAUDE.md)를 분할 구성하여 AI 에이전트의 불필요한 컨텍스트 토큰을 최적화하고 관련 문서 탐색 속도 대폭 개선',
          '리뷰어별 중점 검토 관점(보안, 성능, 접근성, 아키텍처)을 관리하는 PR 리뷰 자동화 스킬을 직접 제작·공유하여 코드 리뷰 일관성 확보 및 다각도 검토 문화 정착',
        ],
        results: [
          '도메인별 CLAUDE.md 컨텍스트 최적화',
          'PR 리뷰 자동화 스킬 제작 & 전사 공유',
          '다각도 검토 문화 및 리뷰 일관성 확보',
        ],
      },
      {
        head: '사내 초고속 검수 콘솔 기획 및 개발 — 일 검수량 8배 폭증 (Delta2)',
        points: [
          '교재 검수 실무자의 작업 동선 병목을 분석하여 AST 기반 일괄 자동 교정 및 5단계 단축키 큐를 갖춘 전용 SPA 자발적 기획·구현',
          '단순 복사·붙여넣기 수작업을 시스템으로 완전 제거하여 일일 검수량 8배(1,000건 → 8,000건) 폭증 및 내부 운영 생산성 혁신',
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
        head: '모바일·태블릿 인앱 웹뷰(In-App WebView) 환경 튜터 뷰어 조작 대기 488배 가속',
        points: [
          '모바일·태블릿 인앱 웹뷰 환경에서 선생님과 학생이 대용량 교재를 실시간 동기화하며 탐색할 수 있도록 가시 영역 우선 청크 온디맨드 렌더링으로 전면 재설계',
          '초기 조작 대기(TTI)를 1.3초로 고정하고, 캔버스 메모리 즉시 회수 라이프사이클로 저사양 기기 탭 충돌 원천 차단',
        ],
        results: [
          '모바일/태블릿 인앱 웹뷰 최적화',
          'TTI 10분 30초 → 1.3초 (488배 가속)',
          '메모리 즉시 회수로 브라우저 충돌 방지',
        ],
      },
      {
        head: '계층형 에러 핸들링 모듈 설계 및 사내 세미나 전파',
        points: [
          '화면마다 산발적이던 예외 처리를 시스템 전역 알림과 사용자 재시도 영역으로 분리한 2계층 모듈 구축 및 사내 표준화',
          '클라이언트 토큰 인증 방식을 서버 세션 쿠키 및 SSR 인증 가드로 전환해 보안 취약점 선제 차단',
        ],
        results: [
          '2계층 에러 핸들링 전사 표준화',
          '서버 세션 기반 안전한 인증 체계 구축',
        ],
      },
      {
        head: '프론트엔드 과적용 DDD 5단 레이어 제거 및 데이터 흐름 단순화',
        points: [
          '단순 필드 수정에도 5개 계층을 거쳐야 했던 복잡한 DDD 구조의 문제점을 공유하고, SWR과 화면 훅 중심으로 단순화 제안 및 리팩토링',
          '불필요한 보일러플레이트 코드를 대폭 제거하여 기능 개발 속도 향상 및 신규 입사자 온보딩 기간 단축',
        ],
        results: [
          '보일러플레이트 코드 대폭 축소',
          '기능 구현 속도 및 온보딩 개선',
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
        head: 'Apollo GraphQL 기반 컬럼 메타데이터 정의 1벌로 59개 화면 양산 (법무부)',
        points: [
          '컬럼 속성 정의 하나로 Apollo GraphQL 쿼리 연동, 목록·검색·정렬·엑셀·권한을 자동 구성하는 선언적 Table 엔진 개발',
          '라우트 설정과 메뉴 트리 및 RBAC 권한 키가 자동 연동되도록 설계하여 2인 개발로 59개 보안 화면을 결함 없이 안정 구축',
        ],
        results: [
          'Apollo GraphQL 선언적 아키텍처',
          '2인 개발로 59개 대규모 화면 구축',
        ],
      },
      {
        head: '비개발자 분석가를 위한 5단계 머신러닝(ML) 학습 마법사 개발 (KISTI 관제)',
        points: [
          '보안 분석가가 브라우저에서 직접 AI 모델을 학습·검증·배포할 수 있도록 URL 상태 머신 기반 5단계 마법사 GUI 구현',
          '프론트엔드 UI부터 NestJS 백엔드, 네트워크 패킷 전처리 파이프라인까지 풀스택 주도로 전사 최대 프로젝트 성공적 납품',
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

/* ── 3페이지: 오픈소스 & 사이드 프로젝트 (AI 에이전트 & 핵심 역량) ── */
export const carrotResumeSide = [
  {
    name: 'afk',
    meta: 'macOS 유틸리티 · 단독 개발 · Homebrew 배포',
    what: 'AI 코딩 에이전트의 긴 작업 대기 시간을 해소하고 완료 즉시 작업 창 포커스를 자동 전환해 주는 macOS 메뉴바 앱.',
    points: [
      'Claude Code 등 AI 에이전트 백그라운드 프로세스 종료를 감지하여 작업 화면으로 즉시 자동 포커싱, 도메인별 CLAUDE.md 사양서 및 PR 리뷰 스킬과 함께 0 to 1 AI 워크플로우 완성',
    ],
    stack: ['Swift', 'SwiftUI', 'SPM', 'Homebrew', 'Claude Code'],
    repo: 'https://github.com/H8njo/afk',
    caseUrl: '/work/afk',
  },
  {
    name: 'column-pager',
    meta: '오픈소스 · npm 배포 · MIT',
    what: '브라우저 CSS 한계를 극복하고 웹 콘텐츠를 고정 규격 A4 다단 페이지로 자동 분할하는 순수 레이아웃 엔진.',
    points: [
      'DOM 좌표 실측과 3계층 아키텍처로 설계해 2년 난제를 해결하고, 49개 단위 테스트를 갖춘 독립 npm 패키지로 일반화',
    ],
    stack: ['TypeScript', 'React', 'Vitest', 'semantic-release'],
    repo: 'https://github.com/H8njo/column-pager',
    caseUrl: '/work/column-count-layout',
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
];
