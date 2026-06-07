"use client";

import { useEffect, useState } from "react";
import { ColumnPager } from "column-pager";

// 시그니처 라이브 데모 (T4). NDA 무관 더미 "문제" 데이터로 column-pager 동작 시연.
// "남들 방법(잘림) vs 내 방법(해결)" 토글.

type Problem = { id: number; no: string; title: string; body: string };

const PROBLEMS: Problem[] = [
  { id: 1, no: "1", title: "다항식의 연산", body: "다음 식을 간단히 하시오. 보기를 읽고 알맞은 것을 고르면, 전개 후 동류항을 정리하는 과정에서 부호에 주의해야 한다." },
  { id: 2, no: "2", title: "함수의 극한", body: "x가 한없이 커질 때 함숫값의 변화를 관찰하라. 그래프의 점근 거동을 근거로 극한값을 추정하고, 좌극한과 우극한이 일치하는지 확인한다." },
  { id: 3, no: "3", title: "긴 지문 — 독해", body: "다음 글을 읽고 물음에 답하시오. 이 지문은 의도적으로 길게 작성되어 한 컬럼 높이를 넘긴다. 단락이 길어지면 순진한 CSS 멀티컬럼은 글을 컬럼 경계에서 잘라 읽기를 망가뜨린다. column-pager는 같은 상황에서 조각을 자연스럽게 다음 컬럼으로 이어 붙여 잘림 없이 흐르게 한다. 바로 이 지점이 모두가 실패했던 부분이다." },
  { id: 4, no: "4", title: "확률과 통계", body: "주머니에서 공을 꺼내는 사건의 확률을 구하라. 복원/비복원 여부에 따라 표본공간이 달라진다." },
  { id: 5, no: "5", title: "기하 — 벡터", body: "두 벡터의 내적을 이용해 사잇각을 구하라. 성분 계산 후 크기로 나누어 코사인 값을 얻는다." },
];

function ProblemCard({ p }: { p: Problem }) {
  return (
    <article className="mb-4 break-inside-avoid">
      <div className="font-mono text-xs text-accent">{p.no}.</div>
      <h4 className="font-display font-medium text-[15px] mt-0.5">{p.title}</h4>
      <p className="text-[13px] text-ink/80 leading-relaxed mt-1">{p.body}</p>
    </article>
  );
}

const PAGE_HEIGHT = 380;

export default function ColumnPagerDemo() {
  const [mode, setMode] = useState<"theirs" | "mine">("mine");
  const [ready, setReady] = useState(false);
  const [columnCount, setColumnCount] = useState(2);

  // 모바일 1열 폴백 (Pass 6)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setColumnCount(mq.matches ? 1 : 2);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="mt-6">
      {/* 토글 */}
      <div role="tablist" aria-label="레이아웃 비교" className="flex gap-2 font-mono text-xs mb-3">
        <button
          role="tab"
          aria-selected={mode === "theirs"}
          onClick={() => setMode("theirs")}
          className={`px-3 py-1.5 rounded border transition-colors ${mode === "theirs" ? "border-accent text-accent" : "border-hairline text-gray-1 hover:text-ink"}`}
        >
          남들 방법 (잘림)
        </button>
        <button
          role="tab"
          aria-selected={mode === "mine"}
          onClick={() => setMode("mine")}
          className={`px-3 py-1.5 rounded border transition-colors ${mode === "mine" ? "border-accent text-accent" : "border-hairline text-gray-1 hover:text-ink"}`}
        >
          내 방법 (column-pager)
        </button>
      </div>

      {mode === "theirs" ? (
        // 순진한 CSS 멀티컬럼: 고정 높이 + overflow로 컬럼 경계에서 글이 잘린다.
        <div className="relative border border-hairline rounded bg-surface overflow-hidden" style={{ height: PAGE_HEIGHT }}>
          <div className="p-4" style={{ columnCount, columnGap: "2rem", height: PAGE_HEIGHT }}>
            {PROBLEMS.map((p) => (
              <ProblemCard key={p.id} p={p} />
            ))}
          </div>
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
          <span className="absolute bottom-2 right-3 font-mono text-[11px] text-red-500">↑ 문제가 경계에서 잘림</span>
        </div>
      ) : (
        // column-pager: onPagesGenerated 완료 신호에 진입 애니메이션 게이트 (FOUC 차단)
        <div
          className="border border-hairline rounded bg-surface overflow-hidden transition-opacity duration-500"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <ColumnPager
            columnCount={columnCount}
            pageHeight={PAGE_HEIGHT}
            showDividers
            footer={({ pageNumber }) => (
              <div className="h-6 text-center font-mono text-[11px] text-gray-2">— {pageNumber} —</div>
            )}
            onPagesGenerated={() => setReady(true)}
          >
            {PROBLEMS.map((p) => (
              <ProblemCard key={p.id} p={p} />
            ))}
          </ColumnPager>
        </div>
      )}

      <p className="font-mono text-[11px] text-gray-2 mt-3">
        {mode === "mine"
          ? "긴 지문(3번)이 컬럼 경계를 넘어도 잘리지 않고 다음 컬럼으로 이어집니다."
          : "고정 높이 멀티컬럼에서는 긴 지문이 경계에서 잘려 읽을 수 없습니다."}
      </p>
    </div>
  );
}
