"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ColumnPager } from "column-pager";
import { LayoutGroup, motion } from "framer-motion";

// renderItem 콜백 인자(라이브러리 RenderItemInfo의 사용 부분만).
type ItemInfo = { id?: string; sliced: boolean; pageNumber: number; children: ReactNode };

// 시그니처 라이브 데모 — ~/Projects/column-pager의 Storybook 예제를 탭으로 옮겨온 것.
// 룩도 스토리북과 동일하게: 회색 배경 위 흰 페이지 시트(PageSheet 기본 bg-white),
// Sample 헤더/푸터, 그리고 라이브러리 ui/Card와 같은 카드(번호 → 파란 타이틀 → 회색 본문).
// (Card/CARDS 헬퍼는 패키지로 export되지 않아 자체 재현. NDA 무관 더미 데이터.)

type CardDatum = { number: number; title: string; lines: string[] };

const CARDS: CardDatum[] = [
  { number: 1, title: "다항식의 연산", lines: ["다음 식을 간단히 하시오.", "전개 후 동류항을 정리하는 과정에서 부호에 주의한다.", "결과를 표준형으로 나타낸다."] },
  { number: 2, title: "함수의 극한", lines: ["x가 한없이 커질 때 함숫값의 거동을 관찰한다.", "좌극한과 우극한이 일치하는지 확인한다."] },
  { number: 3, title: "확률과 통계", lines: ["주머니에서 공을 꺼내는 사건의 확률을 구하라.", "복원과 비복원에 따라 표본공간이 달라진다.", "조건부확률로 다시 따져 본다."] },
  { number: 4, title: "기하 — 벡터", lines: ["두 벡터의 내적으로 사잇각을 구하라.", "성분 계산 후 크기로 나누어 코사인 값을 얻는다."] },
  { number: 5, title: "수열의 합", lines: ["시그마의 성질로 식을 분해한다.", "부분합의 규칙을 찾아 일반항을 추정한다."] },
  { number: 6, title: "미분계수", lines: ["평균변화율의 극한으로 정의한다.", "접선의 기울기로 해석한다.", "도함수와의 관계를 확인한다."] },
  { number: 7, title: "정적분", lines: ["구간을 나눠 넓이로 해석한다.", "치환으로 식을 단순화한다."] },
  { number: 8, title: "삼각함수", lines: ["단위원 위에서 값을 읽는다.", "주기와 대칭을 이용해 식을 정리한다."] },
];

// 한 컬럼 높이를 확실히 넘겨 여러 컬럼·페이지로 슬라이스되도록 충분히 긴 카드.
const TALL_CARD: CardDatum = {
  number: 9,
  title: "긴 지문 — 독해",
  lines: [
    "다음 글을 읽고 물음에 답하시오. 이 지문은 의도적으로 길게 작성되어 한 컬럼의 높이를 넘긴다.",
    "단락이 길어지면 순진한 CSS 멀티컬럼은 글을 컬럼 경계에서 잘라 읽기를 망가뜨린다.",
    "column-pager는 같은 상황에서 조각을 자연스럽게 다음 컬럼으로 이어 붙여 잘림 없이 흐르게 한다.",
    "측정은 실제 브라우저 레이아웃에 의존한다. 폰트가 로드되고 줌이 바뀌어도 같은 결과를 내도록 정수배 보정을 둔다.",
    "긴 지문일수록 이 차이가 뚜렷하다. 마지막 줄까지 잘리지 않고 다음 컬럼으로 흐르는지 확인해 보라.",
    "글의 구조를 먼저 잡는다. 도입에서 화제를 제시하고, 전개에서 근거를 쌓고, 결론에서 주장을 분명히 한다.",
    "문장과 문장 사이의 논리적 연결을 표시어로 파악한다. 그러나, 따라서, 예를 들어 같은 말에 주목한다.",
    "지시어가 무엇을 가리키는지 앞 문장에서 되짚는다. 대명사의 선행사를 놓치면 의미가 흔들린다.",
    "필자의 태도가 긍정인지 비판인지, 객관적 서술인지 주관적 평가인지 구분한다.",
    "예시는 주장을 뒷받침하기 위한 장치다. 예시 자체가 아니라 그것이 받치는 주장을 읽어야 한다.",
    "한 단락의 중심 문장을 찾고, 나머지를 그 문장에 대한 부연으로 묶어 본다.",
    "어휘의 사전적 의미와 문맥적 의미가 다를 수 있다. 문맥이 항상 우선한다.",
    "글 전체를 한 문장으로 요약해 본다. 요약이 막히면 아직 구조를 못 잡은 것이다.",
    "이 카드는 한 컬럼에 다 들어가지 않으므로 여러 컬럼과 페이지에 걸쳐 슬라이스되어 표현된다.",
    "조각의 경계에서 글자가 잘리지 않고 줄 단위로 자연스럽게 이어지는 것이 핵심이다.",
    "바로 이 지점이, 사내외 여러 사람이 시도했다가 멈췄던 부분이다.",
  ],
};

// 스토리북 ui/Card와 동일 스타일: 번호(파란 모노) → 파란 볼드 타이틀 → 회색 본문.
function Card({ number, title, lines }: CardDatum) {
  return (
    <article className="flex flex-col gap-2.5 rounded-2xl bg-gray-100 p-6">
      <span className="font-mono text-xs font-medium tracking-wider text-blue-600">
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="text-xl font-bold leading-tight text-blue-600">{title}</h3>
      <div className="flex flex-col gap-1.5">
        {lines.map((l, i) => (
          <p key={i} className="text-[13px] leading-relaxed text-gray-500">
            {l}
          </p>
        ))}
      </div>
    </article>
  );
}

// 스토리북 SampleHeader / SampleFooter 재현.
const Header = ({ pageNumber }: { pageNumber: number }) => (
  <div className="flex h-10 items-center justify-between border-b border-gray-300 px-4">
    <span className="text-sm font-medium text-gray-700">Sample Document</span>
    <span className="text-sm text-gray-400">Page {pageNumber}</span>
  </div>
);
const Footer = ({ pageNumber }: { pageNumber: number }) => (
  <div className="flex h-[30px] items-center justify-center border-t border-gray-300">
    <span className="text-xs text-gray-400">- {pageNumber} -</span>
  </div>
);

const PAGE_HEIGHT = 600;

type DemoProps = { onReady: () => void };

// 공통 prop — header/footer/onPagesGenerated를 모든 탭에 동일하게.
const common = (onReady: () => void) =>
  ({
    pageHeight: PAGE_HEIGHT,
    columnGap: 32,
    itemGap: 16,
    bodyClassName: "px-6 py-5",
    header: Header,
    footer: Footer,
    onPagesGenerated: onReady,
  }) as const;

// ── 탭별 데모 ──────────────────────────────────────────────

function TwoColumns({ onReady }: DemoProps) {
  return (
    <ColumnPager {...common(onReady)} columnCount={2} showDividers>
      {CARDS.map((c) => (
        <Card key={c.number} {...c} />
      ))}
    </ColumnPager>
  );
}

function TallSlice({ onReady }: DemoProps) {
  return (
    <ColumnPager {...common(onReady)} columnCount={2} showDividers>
      <Card {...CARDS[0]} />
      {/* 컬럼 높이를 넘는 긴 카드 → 여러 컬럼·페이지로 잘려 이어진다 */}
      <Card {...TALL_CARD} />
      <Card {...CARDS[1]} />
      <Card {...CARDS[2]} />
    </ColumnPager>
  );
}

function DynamicColumns({ onReady }: DemoProps) {
  return (
    <ColumnPager {...common(onReady)} columnCount={1} showDividers>
      {CARDS.slice(0, 2).map((c) => (
        <Card key={c.number} {...c} />
      ))}
      <ColumnPager.PageBreak changeColumnCountTo={2} />
      {CARDS.slice(2, 8).map((c) => (
        <Card key={c.number} {...c} />
      ))}
      <ColumnPager.PageBreak changeColumnCountTo={3} />
      {CARDS.map((c) => (
        <Card key={`b-${c.number}`} {...c} />
      ))}
    </ColumnPager>
  );
}

function AnimatedReorder({ onReady }: DemoProps) {
  const [order, setOrder] = useState<CardDatum[]>(() => CARDS);

  const move = (num: number, dir: -1 | 1) =>
    setOrder((prev) => {
      const i = prev.findIndex((c) => c.number === num);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = prev.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const arrow =
    "flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white text-sm shadow " +
    "transition hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <LayoutGroup>
      <ColumnPager
        {...common(onReady)}
        columnCount={2}
        showDividers
        clipOverflow={false}
        renderItem={({ id, sliced, pageNumber, children }: ItemInfo) => {
          if (!id || sliced) return children;
          const index = order.findIndex((c) => String(c.number) === id);
          return (
            <motion.div
              layout
              layoutId={`${id}-p${pageNumber}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "tween", duration: 0.4 }}
              className="relative"
            >
              <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                <button type="button" aria-label="위로" className={arrow} disabled={index <= 0} onClick={() => move(Number(id), -1)}>
                  ↑
                </button>
                <button type="button" aria-label="아래로" className={arrow} disabled={index >= order.length - 1} onClick={() => move(Number(id), 1)}>
                  ↓
                </button>
              </div>
              {children}
            </motion.div>
          );
        }}
      >
        {order.map((c) => (
          <Card key={c.number} {...c} />
        ))}
      </ColumnPager>
    </LayoutGroup>
  );
}

// ── 탭 셸 ──────────────────────────────────────────────────

const TABS = [
  { key: "slice", label: "긴 카드 슬라이스", render: TallSlice, note: "한 컬럼 높이를 넘는 긴 카드(09)가 잘리지 않고 다음 컬럼·페이지로 이어진다 — 모두가 실패했던 지점." },
  { key: "two", label: "2컬럼", render: TwoColumns, note: "여러 카드가 컬럼을 채우다 넘치면 다음 컬럼·페이지로 흐른다." },
  { key: "dynamic", label: "컬럼 수 변경", render: DynamicColumns, note: "PageBreak로 페이지마다 컬럼 수를 1 → 2 → 3으로 바꾼다." },
  { key: "reorder", label: "순서 변경 (v1.1)", render: AnimatedReorder, note: "↑↓로 카드를 옮기면 재배치가 애니메이션된다. 라이브러리는 framer-motion에 의존하지 않고 renderItem 훅만 노출한다." },
] as const;

export default function ColumnPagerDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("slice");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
  }, [tab]);

  const active = TABS.find((t) => t.key === tab) ?? TABS[0];
  const Demo = active.render;

  return (
    <div className="mt-6">
      {/* 탭 바 */}
      <div role="tablist" aria-label="column-pager 예제" className="flex flex-wrap gap-2 font-mono text-xs mb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded border transition-colors ${
              tab === t.key ? "border-accent text-accent" : "border-hairline text-gray-1 hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 무대 — 스토리북처럼 회색 배경 위 흰 페이지 시트. 높이 제한 + 스크롤로 컨테인. */}
      <div className="rounded-lg border border-hairline overflow-hidden">
        <div
          className="max-h-[640px] overflow-y-auto bg-[#b6b6b6] p-5 transition-opacity duration-500"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <Demo key={tab} onReady={() => setReady(true)} />
        </div>
      </div>

      <p className="font-mono text-[11px] text-gray-2 mt-3">{active.note}</p>
    </div>
  );
}
