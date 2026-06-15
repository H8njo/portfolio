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

const L1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.";
const L2 = "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.";
const L3 = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

const CARDS: CardDatum[] = [
  { number: 1, title: "Lorem ipsum dolor", lines: [L1, L2] },
  { number: 2, title: "Consectetur elit", lines: [L3, L1] },
  { number: 3, title: "Sed do eiusmod", lines: [L2, L3, L1] },
  { number: 4, title: "Tempor incididunt", lines: [L1, L2] },
  { number: 5, title: "Ut labore dolore", lines: [L3, L2] },
  { number: 6, title: "Magna aliqua enim", lines: [L1, L3, L2] },
  { number: 7, title: "Quis nostrud", lines: [L2, L1] },
  { number: 8, title: "Ullamco laboris", lines: [L3, L1] },
];

// 한 컬럼 높이를 확실히 넘겨 여러 컬럼·페이지로 슬라이스되도록 충분히 긴 카드.
const TALL_CARD: CardDatum = {
  number: 9,
  title: "Excepteur sint occaecat",
  lines: [L1, L2, L3, L1, L2, L3, L1, L2, L3, L1, L2, L3, L1, L2, L3, L1, L2, L3],
};

// 스토리북 ui/Card와 동일 스타일: 번호(파란 모노) → 파란 볼드 타이틀 → 회색 본문.
function Card({ number, title, lines }: CardDatum) {
  return (
    <article className="flex flex-col gap-1.5 rounded-xl bg-gray-100 p-4">
      <span className="font-mono text-[10px] font-medium tracking-wider text-blue-600">
        {String(number).padStart(2, "0")}
      </span>
      <h3 className="text-[15px] font-bold leading-snug text-blue-600">{title}</h3>
      <div className="flex flex-col gap-1">
        {lines.map((l, i) => (
          <p key={i} className="text-[11.5px] leading-relaxed text-gray-500">
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
