import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllCases, getCaseBySlug } from "@/lib/cases";
import { FeaturedDemo } from "@/components/demos/featured-demo";
import { BlackholeDemo } from "@/components/demos/blackhole-demo";
import RangeEditorDemo from "@/components/demos/range-editor-demo";
import { Tag, Badge } from "@/components/hoonjo/components";
import { CaseMetrics } from "@/components/case-metrics";

const CONTAINER = { maxWidth: 760, margin: "0 auto", padding: "0 24px" } as const;
const SECTION_TOP = "clamp(40px, 7vw, 72px)";

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCaseBySlug(slug);
  if (!entry) return { title: "Not found — hoonjo" };
  return { title: `${entry.frontmatter.title} — hoonjo`, description: entry.frontmatter.summary };
}

// MDX 본문은 .hoonjo-md CSS(app/hoonjo.css)가 통째로 스타일한다 — 홈의 글 본문과
// 동일한 시스템. 여기선 native 태그가 아닌 이미지(캡션)만 커스터마이즈한다.
const mdxComponents = {
  img: ({ alt, ...p }: React.ComponentProps<"img">) => (
    <figure style={{ margin: "26px 0 0" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img style={{ width: "100%", borderRadius: "var(--radius-md)", border: "1px solid var(--line)" }} alt={alt} {...p} />
      {alt && (
        <figcaption style={{ marginTop: 10, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{alt}</figcaption>
      )}
    </figure>
  ),
};

// 라이브 데모 블록 — 종이 카드에 담아 홈 카드와 같은 결로.
function DemoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label="라이브 데모" style={{ marginTop: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span className="hoonjo-live-dot" aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--green-deep)" }}>라이브 데모</span>
      </div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)", margin: 0, maxWidth: "52ch" }}>{title}</p>
      <div style={{ marginTop: 18, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-soft)", padding: "clamp(16px, 2.4vw, 24px)", overflow: "hidden" }}>
        {children}
      </div>
    </section>
  );
}

export default async function CaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCaseBySlug(slug);
  if (!entry) notFound();

  const all = getAllCases();
  const idx = all.findIndex((c) => c.slug === slug);
  const next = all[(idx + 1) % all.length];
  const { frontmatter } = entry;

  return (
    <article style={{ ...CONTAINER, padding: `${SECTION_TOP} 24px` }}>
      <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)" }}>
        <span aria-hidden>←</span> 블로그
      </Link>

      <header style={{ marginTop: 28 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {frontmatter.featured && <Badge variant="green" dot>FEATURED</Badge>}
          {frontmatter.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 4.4vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.12, color: "var(--text)", margin: "20px 0 0", textWrap: "balance" }}>
          {frontmatter.title}
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.6, color: "var(--text-secondary)", margin: "18px 0 0", maxWidth: "54ch" }}>
          {frontmatter.summary}
        </p>
      </header>

      {frontmatter.metrics.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>Impact · 측정 결과</div>
          <CaseMetrics metrics={frontmatter.metrics} variant="grid" />
        </div>
      )}

      {frontmatter.demo === "column-pager" && (
        <DemoBlock title="탭으로 column-pager의 실제 동작을 확인해 보세요 — 긴 카드 슬라이스, 2컬럼, 컬럼 수 변경, 데이터 수정.">
          <FeaturedDemo />
        </DemoBlock>
      )}
      {frontmatter.demo === "blackhole" && (
        <DemoBlock title="셰이더가 브라우저에서 실시간으로 도는 모습입니다. 클릭해 보세요.">
          <BlackholeDemo />
        </DemoBlock>
      )}
      {frontmatter.demo === "range-editor" && (
        <DemoBlock title="단어를 클릭(시작) → 다시 클릭(끝)으로 범위를 잡아 보세요. 끝을 먼저 찍어도 [min, max]로 정규화됩니다.">
          <RangeEditorDemo />
        </DemoBlock>
      )}

      <div className="hoonjo-md" style={{ marginTop: 8 }}>
        <MDXRemote
          source={entry.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [rehypePrettyCode, { theme: "github-dark", keepBackground: true, defaultLang: "txt" }],
              ],
            },
          }}
        />
      </div>

      {/* 다음 케이스 던지기 — 종이 카드로 끌림 구조 */}
      <nav aria-label="케이스 이동" style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-muted)" }}>
          <span aria-hidden>←</span> 홈
        </Link>
        {next && next.slug !== slug && (
          <Link href={`/work/${next.slug}`} className="hoonjo-work-card" style={{ display: "block", textAlign: "right", maxWidth: 420, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-soft)", padding: "16px 20px", textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", display: "block" }}>다음 케이스</span>
            <span className="hoonjo-work-title" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 6, fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em", color: "var(--text)", transition: "color 150ms ease" }}>
              {next.frontmatter.title} <span className="hoonjo-work-arrow" aria-hidden>→</span>
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
