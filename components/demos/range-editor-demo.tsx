"use client";

import { useMemo, useState } from "react";

// 본문 에디터 케이스의 "클릭-클릭 범위 선택"을 lorem ipsum으로 재현한 독립 데모.
// (회사 코드 복사 아님 — 상태머신 idle→anchor→selected + [min,max] 정규화, 개념만 새로 구현.)

const PASSAGE =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
const WORDS = PASSAGE.split(" ");

// 선택 상태머신: idle → anchor(첫 클릭) → selected(둘째 클릭).
type Stage = "idle" | "anchor" | "selected";

export default function RangeEditorDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [anchor, setAnchor] = useState<number | null>(null);
  const [range, setRange] = useState<{ start: number; end: number } | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const onWordClick = (i: number) => {
    if (stage === "anchor") {
      // 끝을 먼저 찍어도(역방향) 항상 [min,max]로 정규화 — 이게 케이스의 핵심.
      setRange({ start: Math.min(anchor!, i), end: Math.max(anchor!, i) });
      setStage("selected");
      setHover(null);
    } else {
      // idle 또는 selected → 새 선택 시작.
      setAnchor(i);
      setStage("anchor");
      setRange(null);
    }
  };

  const reset = () => {
    setStage("idle");
    setAnchor(null);
    setRange(null);
    setHover(null);
  };

  // 호버 미리보기 (anchor 단계에서만).
  const preview = useMemo(() => {
    if (stage !== "anchor" || anchor === null || hover === null || hover === anchor)
      return null;
    return { start: Math.min(anchor, hover), end: Math.max(anchor, hover) };
  }, [stage, anchor, hover]);

  const active = range ?? preview;
  const inRange = (i: number) => (active ? i >= active.start && i <= active.end : false);

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-hj-line bg-hj-paper">
      {/* 헤더 */}
      <div className="border-b border-hj-line bg-hj-fg/3 px-4 py-2.5 font-hj-mono text-[11px] text-hj-muted">
        본문 미리보기 · 단어를 클릭(시작) → 다시 클릭(끝)
      </div>

      {/* 지문 */}
      <p
        className="px-5 py-6 text-[15px] leading-[2.6]"
        onMouseLeave={() => setHover(null)}
      >
        {WORDS.map((w, i) => (
          <span key={i}>
            <span
              onClick={() => onWordClick(i)}
              onMouseEnter={() => setHover(i)}
              className={`cursor-pointer rounded px-1 py-0.5 transition-colors ${
                inRange(i)
                  ? "bg-hj-blue/20 ring-1 ring-hj-blue/40"
                  : "hover:bg-hj-fg/6"
              } ${anchor === i && stage === "anchor" ? "ring-1 ring-hj-blue" : ""}`}
            >
              {w}
            </span>{" "}
          </span>
        ))}
      </p>

      {/* 풋터 — 선택 결과 읽기 */}
      <div className="flex items-center justify-between gap-3 border-t border-hj-line bg-hj-fg/3 px-4 py-2.5 font-hj-mono text-[11px]">
        <span className="text-hj-fg/80">
          {stage === "idle" && <span className="text-hj-faint">시작 단어를 클릭하세요</span>}
          {stage === "anchor" && <span className="text-hj-blue">끝 단어를 클릭하세요…</span>}
          {stage === "selected" && range && (
            <>
              범위 <span className="text-hj-blue">[{range.start}, {range.end}]</span>
              <span className="text-hj-faint">
                {" "}· {range.end - range.start + 1}단어 · 끝을 먼저 찍어도 [min, max]로 정규화
              </span>
            </>
          )}
        </span>
        <button
          type="button"
          onClick={reset}
          className="shrink-0 rounded border border-hj-line px-2 py-1 text-hj-fg/70 transition-colors hover:bg-hj-fg/6"
        >
          초기화
        </button>
      </div>
    </div>
  );
}
