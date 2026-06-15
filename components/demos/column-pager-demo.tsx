"use client";

import { useEffect, useState } from "react";
import { ColumnPager } from "column-pager";
import { LayoutGroup, motion } from "framer-motion";

// 시그니처 라이브 데모 — ~/Projects/column-pager의 Storybook 예제들을 탭으로 옮겨온 것.
// (라이브러리의 Card/CARDS 헬퍼는 패키지로 export되지 않아 여기선 자체 더미 카드로 재현한다.
//  NDA 무관 일반 "문제지" 더미 데이터.)

type CardDatum = { number: number; title: string; lines: string[] };

const CARDS: CardDatum[] = [
  { number: 1, title: "다항식의 연산", lines: ["다음 식을 간단히 하시오.", "전개 후 동류항을 정리하는 과정에서 부호에 주의한다."] },
  { number: 2, title: "함수의 극한", lines: ["x가 한없이 커질 때 함숫값의 거동을 관찰한다.", "좌극한과 우극한이 일치하는지 확인한다."] },
  { number: 3, title: "확률과 통계", lines: ["주머니에서 공을 꺼내는 사건의 확률을 구하라.", "복원·비복원에 따라 표본공간이 달라진다."] },
  { number: 4, title: "기하 — 벡터", lines: ["두 벡터의 내적으로 사잇각을 구하라.", "성분 계산 후 크기로 나누어 코사인 값을 얻는다."] },
  { number: 5, title: "수열의 합", lines: ["시그마의 성질로 식을 분해한다.", "부분합의 규칙을 찾는다."] },
  { number: 6, title: "미분계수", lines: ["평균변화율의 극한으로 정의한다.", "접선의 기울기로 해석한다."] },
  { number: 7, title: "정적분", lines: ["구간을 나눠 넓이로 해석한다.", "치환으로 식을 단순화한다."] },
  { number: 8, title: "삼각함수", lines: ["단위원 위에서 값을 읽는다.", "주기와 대칭을 이용한다."] },
];

const TALL_CARD: CardDatum = {
  number: 9,
  title: "긴 지문 — 독해",
  lines: [
    "다음 글을 읽고 물음에 답하시오. 이 지문은 의도적으로 길게 작성되어 한 컬럼 높이를 넘긴다.",
    "단락이 길어지면 순진한 CSS 멀티컬럼은 글을 컬럼 경계에서 잘라 읽기를 망가뜨린다.",
    "column-pager는 같은 상황에서 조각을 자연스럽게 다음 컬럼으로 이어 붙여 잘림 없이 흐르게 한다.",
    "측정은 실제 브라우저 레이아웃에 의존하므로, 폰트가 로드되고 줌이 바뀌어도 같은 결과를 내도록 정수배 보정을 둔다.",
    "긴 지문일수록 이 차이가 뚜렷하다. 마지막 줄까지 잘리지 않고 다음 컬럼으로 흐르는지 확인해 보라.",
    "이 카드는 여러 컬럼·페이지에 걸쳐 슬라이스되어 표현된다.",
  ],
};

function Card({ number, title, lines }: CardDatum) {
  return (
    <article className="break-inside-avoid">
      <div className="font-mono text-xs text-accent">{number}.</div>
      <h4 className="font-display font-medium text-[14px] mt-0.5">{title}</h4>
      {lines.map((l, i) => (
        <p key={i} className="text-[12.5px] text-ink/75 leading-relaxed mt-1">
          {l}
        </p>
      ))}
    </article>
  );
}

const Footer = ({ pageNumber }: { pageNumber: number }) => (
  <div className="h-6 flex items-center justify-center font-mono text-[10px] text-gray-2">
    — {pageNumber} —
  </div>
);

const PAGE_HEIGHT = 340;

type DemoProps = { onReady: () => void };

// 공통 prop을 매 데모에 펼쳐 넣는다. onPagesGenerated로 측정 완료를 알린다(FOUC 게이트).
const common = (onReady: () => void) =>
  ({
    pageHeight: PAGE_HEIGHT,
    columnGap: 28,
    itemGap: 14,
    bodyClassName: "p-4",
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
      {/* 컬럼 높이를 넘는 긴 카드 → 여러 컬럼으로 잘려 이어진다 */}
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
      {CARDS.slice(2, 6).map((c) => (
        <Card key={c.number} {...c} />
      ))}
      <ColumnPager.PageBreak changeColumnCountTo={3} />
      {CARDS.slice(0, 6).map((c) => (
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
    "flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-[11px] " +
    "transition hover:opacity-90 disabled:opacity-25 disabled:cursor-not-allowed";

  return (
    <LayoutGroup>
      <ColumnPager
        {...common(onReady)}
        columnCount={2}
        showDividers
        clipOverflow={false}
        renderItem={({ id, sliced, pageNumber, children }) => {
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
              <div className="absolute top-1 right-1 z-10 flex flex-col gap-1">
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
  { key: "slice", label: "긴 카드 슬라이스", render: TallSlice, note: "한 컬럼 높이를 넘는 긴 카드(9번)가 잘리지 않고 다음 컬럼으로 이어진다 — 모두가 실패했던 지점." },
  { key: "two", label: "2컬럼", render: TwoColumns, note: "여러 카드가 컬럼을 채우다 넘치면 다음 컬럼·페이지로 흐른다." },
  { key: "dynamic", label: "컬럼 수 변경", render: DynamicColumns, note: "PageBreak로 페이지마다 컬럼 수를 1 → 2 → 3으로 바꾼다." },
  { key: "reorder", label: "순서 변경 (v1.1)", render: AnimatedReorder, note: "↑↓로 카드를 옮기면 재배치가 애니메이션된다. 라이브러리는 framer-motion에 의존하지 않고 renderItem 훅만 노출한다." },
] as const;

export default function ColumnPagerDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("slice");
  const [ready, setReady] = useState(false);

  // 탭 바뀌면 진입 게이트 리셋 (측정 전 FOUC 차단)
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

      {/* 데모 무대 — 페이지가 세로로 쌓이므로 높이 제한 + 스크롤로 컨테인 */}
      <div className="rounded-lg border border-hairline bg-surface overflow-hidden">
        <div
          className="max-h-[520px] overflow-y-auto bg-ink/3 p-3 transition-opacity duration-500"
          style={{ opacity: ready ? 1 : 0 }}
        >
          {/* key=tab으로 탭 전환 시 remount */}
          <Demo key={tab} onReady={() => setReady(true)} />
        </div>
      </div>

      <p className="font-mono text-[11px] text-gray-2 mt-3">{active.note}</p>
    </div>
  );
}
