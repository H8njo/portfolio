import type { CaseMetric } from "@/lib/cases.schema";

// 케이스 지표 표시 — 홈의 MetricTable/MetricRow는 "1,310ms" 같은 짧은 숫자용이라
// 값에 white-space:nowrap이 걸려 있다. 케이스 frontmatter 지표는 "사내 v1 → v2 →
// npm 패키지"처럼 긴 텍스트가 흔해 그대로 쓰면 잘린다. 그래서 같은 계측 톤(mono·
// tabular-nums·라벨 대문자)을 유지하되 값이 줄바꿈되는 전용 표시를 쓴다.
//   variant "grid"  = 테두리 박스 (상세 페이지)
//   variant "strip" = 세로 구분선 (인덱스 featured 카드의 cloud 임팩트 밴드)

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
  letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)",
};
const valueStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums",
  fontSize: 18, fontWeight: 600, lineHeight: 1.35, color: "var(--text)",
  letterSpacing: "-0.005em", marginTop: 10, textWrap: "pretty",
};

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
      <div className="hoonjo-metric-row" style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 0 }}>
        {metrics.map((m, i) => (
          <div key={m.label} style={{ paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? "1px solid var(--line)" : "none", minWidth: 0 }}>
            <div style={labelStyle}>{m.label}</div>
            <div style={valueStyle}>{m.value}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="hoonjo-case-metric-grid"
      style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--paper)" }}
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          style={{
            padding: "18px 20px", minWidth: 0,
            borderRight: (i + 1) % cols === 0 ? "none" : "1px solid var(--line)",
            borderTop: i >= cols ? "1px solid var(--line)" : "none",
          }}
        >
          <div style={labelStyle}>{m.label}</div>
          <div style={valueStyle}>{m.value}</div>
        </div>
      ))}
    </div>
  );
}
