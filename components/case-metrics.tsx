import type { CaseMetric } from "@/lib/cases.schema";

// 케이스 지표 표시 — 홈의 MetricTable/MetricRow는 "1,310ms" 같은 짧은 숫자용이라
// 값에 white-space:nowrap이 걸려 있다. 케이스 frontmatter 지표는 "사내 v1 → v2 →
// npm 패키지"처럼 긴 텍스트가 흔해 그대로 쓰면 잘린다. 그래서 같은 계측 톤(mono·
// tabular-nums·라벨 대문자)을 유지하되 값이 줄바꿈되는 전용 표시를 쓴다.
//   variant "grid"  = 테두리 박스 (상세 페이지)
//   variant "strip" = 세로 구분선 (인덱스 featured 카드의 cloud 임팩트 밴드)
// 라벨·값 처리(초록 증명 점 · payoff 값 split)는 /work 리스트 IMPACT와 동일하게 맞춘다.

const LABEL =
  "flex items-center gap-1.5 font-hj-mono text-[11px] font-medium uppercase leading-[1.4] tracking-[0.06em] text-hj-fg-secondary";
// 값은 잉크(검정) bold — 홈 MetricRow와 동일. 임팩트 스트립은 사이트 시그니처라
// 전 라우트에서 같은 색이어야 한다. 액센트(파랑)는 링크·CTA·상태에만(DESIGN.md).
const VALUE_BASE = "font-hj-mono tabular-nums font-semibold text-hj-fg tracking-[-0.005em] text-pretty";

// 지표 라벨 — 초록 "증명" 점(DESIGN.md: 초록=증명·수치·상태점) + 진한 라벨.
function MetricLabel({ children }: { children: string }) {
  return (
    <div className={LABEL}>
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-hj-green" />
      {children}
    </div>
  );
}

// 지표 값 — "옛값 → 새값" 꼴이면 payoff-dominant(옛값 취소선·faint, 화살표 faint,
// 새값 bold ink). 화살표가 없거나 2조각이 아니면(예: v1 → v2 → npm) 그냥 bold.
function MetricValue({ value, size }: { value: string; size: "strip" | "grid" }) {
  const afterSize = size === "grid" ? "text-[18px]" : "text-[16px]";
  const mt = size === "grid" ? "mt-2" : "mt-1.5";
  const parts = value.split("→");
  if (parts.length === 2) {
    const [before, after] = parts.map((s) => s.trim());
    const small = size === "grid" ? "text-[13px]" : "text-[12px]";
    return (
      <div className={`${mt} flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-hj-mono tabular-nums`}>
        <span className={`${small} text-hj-faint line-through decoration-hj-steel`}>{before}</span>
        <span aria-hidden className={`${small} text-hj-faint`}>→</span>
        <span className={`${afterSize} font-bold text-hj-fg tracking-[-0.01em]`}>{after}</span>
      </div>
    );
  }
  return (
    <div className={`${mt} ${VALUE_BASE} ${afterSize} ${size === "grid" ? "leading-[1.3]" : "leading-[1.25]"}`}>{value}</div>
  );
}

export function CaseMetrics({
  metrics,
  variant = "grid",
  columns,
}: {
  metrics: CaseMetric[];
  variant?: "grid" | "strip";
  columns?: number;
}) {
  if (metrics.length === 0) return null;
  const cols = columns ?? Math.min(metrics.length, variant === "grid" ? 2 : 3);

  if (variant === "strip") {
    return (
      <div className="grid gap-0 max-[560px]:grid-cols-1!" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`min-w-0 ${i > 0 ? "pl-6 border-l border-hj-line max-[560px]:pl-0 max-[560px]:border-l-0 max-[560px]:pt-3.5 max-[560px]:mt-3.5 max-[560px]:border-t max-[560px]:border-hj-line" : ""}`}
          >
            <MetricLabel>{m.label}</MetricLabel>
            <MetricValue value={m.value} size="strip" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid border border-hj-line rounded-hj-lg overflow-hidden bg-hj-paper max-[560px]:grid-cols-1!"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={`px-5 py-[18px] min-w-0 ${(i + 1) % cols === 0 ? "" : "border-r border-hj-line"} ${i >= cols ? "border-t border-hj-line" : ""} max-[560px]:border-r-0 ${i > 0 ? "max-[560px]:border-t max-[560px]:border-hj-line" : "max-[560px]:border-t-0"}`}
        >
          <MetricLabel>{m.label}</MetricLabel>
          <MetricValue value={m.value} size="grid" />
        </div>
      ))}
    </div>
  );
}
