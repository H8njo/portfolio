import Link from "next/link";
import { getAllCases } from "@/lib/cases";
import type { CaseEntry } from "@/lib/cases.schema";
import { Eyebrow, Badge, Tag } from "@/components/hoonjo/components";
import { CaseMetrics } from "@/components/case-metrics";

export const metadata = {
  title: "블로그 — 작업과 케이스 스터디 · hoonjo",
};

const CONTAINER = { maxWidth: 1040, margin: "0 auto", padding: "0 24px" } as const;
const SECTION_Y = "clamp(56px, 9vw, 96px)";

// featured 케이스 — 홈 플래그십과 같은 결의 큰 종이 카드 + 임팩트 스트립.
function FeaturedCase({ entry }: { entry: CaseEntry }) {
  const { slug, frontmatter } = entry;
  const cta = frontmatter.demo ? "라이브 데모 보기" : "케이스 열기";
  return (
    <Link
      href={`/work/${slug}`}
      className="hoonjo-work-card"
      style={{
        display: "block", marginTop: 40, background: "var(--paper)", border: "1px solid var(--line)",
        borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-soft)", overflow: "hidden", textDecoration: "none",
      }}
    >
      <div style={{ padding: "clamp(24px, 3.2vw, 34px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <Badge variant="green" dot>FEATURED · 창의적 해결</Badge>
        </div>
        <h2 className="hoonjo-work-title" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.16, color: "var(--text)", margin: "18px 0 0", textWrap: "balance", transition: "color 150ms ease" }}>
          {frontmatter.title}
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 16.5, lineHeight: 1.65, color: "var(--text-secondary)", margin: "16px 0 0", maxWidth: "58ch" }}>
          {frontmatter.summary}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
          {frontmatter.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
      {frontmatter.metrics.length > 0 && (
        <div style={{ padding: "clamp(18px, 2.4vw, 24px) clamp(24px, 3.2vw, 34px)", background: "var(--cloud)", borderTop: "1px solid var(--line)" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>Impact · 측정 결과</div>
          <CaseMetrics metrics={frontmatter.metrics} variant="strip" />
        </div>
      )}
      <div style={{ padding: "14px clamp(24px, 3.2vw, 34px)", borderTop: "1px dashed var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-faint)" }}>01 · FEATURED</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: "var(--blue-deep)" }}>
          {cta} <span className="hoonjo-work-arrow" aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

// 나머지 케이스 — 스캔용 에디토리얼 행. 번호 · 제목/요약/태그/수치 · 화살표.
function CaseRow({ entry, no }: { entry: CaseEntry; no: string }) {
  const { slug, frontmatter } = entry;
  return (
    <Link
      href={`/work/${slug}`}
      className="hoonjo-work-row"
      style={{
        display: "grid", gridTemplateColumns: "40px 1fr auto", alignItems: "start", gap: 20,
        padding: "22px 20px", borderRadius: "var(--radius-md)", textDecoration: "none",
      }}
    >
      <span className="hoonjo-work-row-no" style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 13, color: "var(--text-faint)", paddingTop: 3 }}>{no}</span>
      <div style={{ minWidth: 0 }}>
        <h3 className="hoonjo-work-title" style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.25, color: "var(--text)", margin: 0, transition: "color 150ms ease" }}>
          {frontmatter.title}
        </h3>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--text-muted)", margin: "8px 0 0", maxWidth: "62ch" }}>
          {frontmatter.summary}
        </p>
        {frontmatter.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
            {frontmatter.tags.map((t) => (
              <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-secondary)", border: "1px solid var(--line)", borderRadius: "var(--radius-xs)", padding: "3px 8px", whiteSpace: "nowrap" }}>{t}</span>
            ))}
          </div>
        )}
        {(frontmatter.metrics.length > 0 || frontmatter.demo) && (
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 18px", marginTop: 10 }}>
            {frontmatter.metrics.slice(0, 2).map((m) => (
              <span key={m.label} style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", fontSize: 12.5, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                {m.label} <span style={{ color: "var(--text)", fontWeight: 500 }}>{m.value}</span>
              </span>
            ))}
            {frontmatter.demo && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.04em", color: "var(--green-deep)", whiteSpace: "nowrap" }}>
                <span className="hoonjo-live-dot" aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
                라이브 데모
              </span>
            )}
          </div>
        )}
      </div>
      <span className="hoonjo-work-arrow" aria-hidden style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--text-faint)", paddingTop: 3 }}>→</span>
    </Link>
  );
}

export default function WorkIndex() {
  const cases = getAllCases();
  const featured = cases.find((c) => c.frontmatter.featured) ?? null;
  const rest = cases.filter((c) => c !== featured);

  return (
    <section style={{ ...CONTAINER, padding: `${SECTION_Y} 24px` }}>
      <header>
        <Eyebrow tone="blue">ALL WORK · 블로그</Eyebrow>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px, 4.4vw, 46px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--text)", margin: "18px 0 0", maxWidth: "20ch" }}>
          작업과 케이스 스터디
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.6, color: "var(--text-secondary)", margin: "18px 0 0", maxWidth: "52ch" }}>
          문제 한 장씩 — 실제 화면, 측정된 결과, 그리고 전체 글.{" "}
          <span style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums", color: "var(--text-muted)" }}>총 {cases.length}개.</span>
        </p>
      </header>

      {cases.length === 0 ? (
        <div style={{ marginTop: 40 }}>
          <p style={{ color: "var(--text-muted)" }}>아직 공개된 케이스가 없어요. 곧 추가됩니다.</p>
          <Link href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--blue-deep)" }}>
            연락하기 <span aria-hidden>→</span>
          </Link>
        </div>
      ) : (
        <>
          {featured && <FeaturedCase entry={featured} />}

          {rest.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>더 많은 작업</span>
                <span aria-hidden style={{ flex: 1, height: 1, background: "var(--line)" }} />
              </div>
              <div style={{ borderTop: "1px solid var(--line)" }}>
                {rest.map((entry, i) => (
                  <div key={entry.slug} style={i > 0 ? { borderTop: "1px solid var(--line)" } : undefined}>
                    <CaseRow entry={entry} no={String(i + (featured ? 2 : 1)).padStart(2, "0")} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 56, fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)" }}>
        <span aria-hidden>←</span> 홈으로
      </Link>
    </section>
  );
}
