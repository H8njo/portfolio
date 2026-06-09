"use client";

import { useMemo, useState } from "react";

// 본문 에디터 케이스의 인터랙션을 lorem ipsum으로 재현한 독립 데모.
// (회사 코드 복사 아님 — 클릭-클릭 범위 선택 + [min,max] 정규화 + 단어에 결합된
//  데코레이터 + 미리보기↔폼 양방향, 이 개념만 새로 구현했다.)

const PASSAGE =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";
const WORDS = PASSAGE.split(" ");

type DecoType = "underline" | "box" | "highlight" | "memo";

type Deco = {
  id: number;
  type: DecoType;
  start: number; // 항상 <= end (생성 시 [min,max] 정규화)
  end: number;
};

const TYPE_META: Record<DecoType, { label: string; color: string }> = {
  underline: { label: "밑줄", color: "#2348ff" },
  box: { label: "박스", color: "#0f766e" },
  highlight: { label: "강조", color: "#b45309" },
  memo: { label: "메모", color: "#be185d" },
};

// 선택 상태머신: idle → anchor(첫 클릭) → selected(둘째 클릭).
type Stage = "idle" | "anchor" | "selected";

export default function RangeEditorDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [anchor, setAnchor] = useState<number | null>(null);
  const [range, setRange] = useState<{ start: number; end: number } | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [type, setType] = useState<DecoType>("underline");
  const [decos, setDecos] = useState<Deco[]>([
    { id: 1, type: "highlight", start: 2, end: 4 },
  ]);
  const [nextId, setNextId] = useState(2);

  // 클릭 한 방의 상태 전이 — 회사 코드의 useCharacterRangeSelection을 개념만 따왔다.
  const onWordClick = (i: number) => {
    if (stage === "idle") {
      setAnchor(i);
      setStage("anchor");
      setRange(null);
    } else if (stage === "anchor") {
      // 끝을 먼저 찍어도(역방향) 항상 [min,max]로 정규화 — 이게 케이스의 핵심.
      const start = Math.min(anchor!, i);
      const end = Math.max(anchor!, i);
      setRange({ start, end });
      setStage("selected");
      setHover(null);
    } else {
      // selected에서 다시 클릭하면 새 선택 시작.
      setAnchor(i);
      setStage("anchor");
      setRange(null);
    }
  };

  // 호버 미리보기 범위 (anchor 단계에서만).
  const preview = useMemo(() => {
    if (stage !== "anchor" || anchor === null || hover === null || hover === anchor)
      return null;
    return { start: Math.min(anchor, hover), end: Math.max(anchor, hover) };
  }, [stage, anchor, hover]);

  const apply = () => {
    if (!range) return;
    setDecos((d) => [...d, { id: nextId, type, start: range.start, end: range.end }]);
    setNextId((n) => n + 1);
    reset();
  };

  const reset = () => {
    setStage("idle");
    setAnchor(null);
    setRange(null);
    setHover(null);
  };

  const removeDeco = (id: number) => setDecos((d) => d.filter((x) => x.id !== id));

  // 단어 하나가 어떤 데코레이터들에 속하는지 → 인라인 스타일로 합성.
  const wordStyle = (i: number): React.CSSProperties => {
    const s: React.CSSProperties = {};
    for (const d of decos) {
      if (i < d.start || i > d.end) continue;
      const c = TYPE_META[d.type].color;
      if (d.type === "underline") s.borderBottom = `2px solid ${c}`;
      if (d.type === "highlight") s.background = `${c}22`;
      if (d.type === "box") {
        s.boxShadow = `inset 0 0 0 1.5px ${c}`;
        s.borderRadius = 3;
      }
    }
    return s;
  };

  const inActive = (i: number) => {
    const r = range ?? preview;
    return r ? i >= r.start && i <= r.end : false;
  };

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_240px]">
      {/* 미리보기 패널 */}
      <div className="rounded-lg border border-hairline p-4" onMouseLeave={() => setHover(null)}>
        <div className="mb-3 font-mono text-[11px] text-gray-2">
          미리보기 — 단어를 클릭(시작) → 다시 클릭(끝)
        </div>
        <p className="leading-[2.4] text-[15px]">
          {WORDS.map((w, i) => {
            const hasMemo = decos.some((d) => d.type === "memo" && d.start === i);
            return (
              <span key={i} className="relative">
                {hasMemo && (
                  <span
                    className="absolute -top-3 left-1 font-mono text-[9px]"
                    style={{ color: TYPE_META.memo.color }}
                  >
                    ✎
                  </span>
                )}
                <span
                  onClick={() => onWordClick(i)}
                  onMouseEnter={() => setHover(i)}
                  style={wordStyle(i)}
                  className={`cursor-pointer px-0.5 py-px transition-colors ${
                    inActive(i) ? "bg-accent/25 ring-1 ring-accent/40" : "hover:bg-hairline"
                  } ${anchor === i && stage === "anchor" ? "ring-1 ring-accent" : ""}`}
                >
                  {w}
                </span>{" "}
              </span>
            );
          })}
        </p>
      </div>

      {/* 폼 패널 — 미리보기와 양방향으로 묶인 쪽 */}
      <div className="rounded-lg border border-hairline p-4 font-mono text-xs">
        <div className="mb-2 text-gray-2">편집 폼</div>

        <div className="mb-3 text-ink/80">
          {stage === "idle" && <span className="text-gray-2">시작 단어를 클릭하세요</span>}
          {stage === "anchor" && <span className="text-accent">끝 단어를 클릭하세요…</span>}
          {stage === "selected" && range && (
            <span>
              범위 <span className="text-accent">[{range.start}, {range.end}]</span>
              <span className="text-gray-2"> · {range.end - range.start + 1}단어</span>
            </span>
          )}
        </div>

        <div className="mb-2 text-gray-2">종류</div>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {(Object.keys(TYPE_META) as DecoType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded px-2 py-1 transition-colors ${
                type === t ? "text-paper" : "border border-hairline text-ink/70 hover:bg-hairline"
              }`}
              style={type === t ? { background: TYPE_META[t].color } : undefined}
            >
              {TYPE_META[t].label}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={apply}
            disabled={!range}
            className="flex-1 rounded bg-accent px-2 py-1.5 text-paper transition-opacity disabled:opacity-30"
          >
            적용
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded border border-hairline px-2 py-1.5 text-ink/70 hover:bg-hairline"
          >
            취소
          </button>
        </div>

        {decos.length > 0 && (
          <ul className="mt-4 space-y-1 border-t border-hairline pt-3">
            {decos.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: TYPE_META[d.type].color }}
                  />
                  {TYPE_META[d.type].label} [{d.start},{d.end}]
                </span>
                <button
                  type="button"
                  onClick={() => removeDeco(d.id)}
                  className="text-gray-2 hover:text-ink"
                  aria-label="삭제"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
