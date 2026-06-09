import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCases, getCaseBySlug } from "@/lib/cases";
import { FeaturedDemo } from "@/components/demos/featured-demo";
import { BlackholeDemo } from "@/components/demos/blackhole-demo";

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCaseBySlug(slug);
  if (!entry) return { title: "Not found — hoonjo" };
  return { title: `${entry.frontmatter.title} — hoonjo`, description: entry.frontmatter.summary };
}

// MDX 본문 스타일 (DESIGN.md 톤)
const mdxComponents = {
  h2: (p: React.ComponentProps<"h2">) => (
    <h2 className="font-display font-semibold text-xl tracking-tight mt-12 mb-3" {...p} />
  ),
  p: (p: React.ComponentProps<"p">) => <p className="text-ink/90 my-4" {...p} />,
  ul: (p: React.ComponentProps<"ul">) => <ul className="list-disc pl-5 my-4 text-ink/90" {...p} />,
  // fenced 코드블록: <pre>에 박스 스타일. 가로 스크롤·모노·작은 글씨.
  pre: (p: React.ComponentProps<"pre">) => (
    <pre
      className="my-5 overflow-x-auto rounded-lg border border-hairline bg-surface p-4 font-mono text-[13px] leading-relaxed"
      {...p}
    />
  ),
  // 인라인 code는 accent pill, 블록 code(language-*)는 pre가 스타일하므로 plain.
  code: ({ className, ...p }: React.ComponentProps<"code">) => {
    const isBlock = typeof className === "string" && className.startsWith("language-");
    if (isBlock) return <code className={`${className} font-mono`} {...p} />;
    return (
      <code
        className="font-mono text-[0.9em] rounded bg-hairline/50 px-1.5 py-0.5 text-accent"
        {...p}
      />
    );
  },
  a: (p: React.ComponentProps<"a">) => (
    <a className="text-accent underline underline-offset-4" {...p} />
  ),
};

export default async function CaseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCaseBySlug(slug);
  if (!entry) notFound();

  const all = getAllCases();
  const idx = all.findIndex((c) => c.slug === slug);
  const next = all[(idx + 1) % all.length];
  const { frontmatter, content } = entry;

  return (
    <article className="max-w-[680px] mx-auto px-5 sm:px-8 py-20">
      <div className="font-mono text-xs text-gray-2 flex flex-wrap gap-x-3">
        {frontmatter.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <h1 className="font-display font-semibold text-[clamp(1.8rem,4vw,2.6rem)] tracking-tight leading-tight mt-4">
        {frontmatter.title}
      </h1>
      <p className="text-gray-1 mt-3 text-[17px]">{frontmatter.summary}</p>

      {frontmatter.metrics.length > 0 && (
        <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-hairline py-6">
          {frontmatter.metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-xs text-gray-2">{m.label}</dt>
              <dd className="font-mono text-lg text-accent mt-1">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {/* 라이브 데모 — 데모 보유 케이스만, 상세에서 전체 무대로 작동 */}
      {frontmatter.demo === "column-pager" && (
        <section aria-label="라이브 데모" className="mt-10">
          <h2 className="font-display font-semibold text-xl tracking-tight mb-1">라이브 데모</h2>
          <p className="text-gray-1 text-sm">직접 토글하며 "남들 방법 vs 내 방법"을 비교해 보세요.</p>
          <FeaturedDemo />
        </section>
      )}

      {frontmatter.demo === "blackhole" && (
        <section aria-label="라이브 데모" className="mt-10">
          <h2 className="font-display font-semibold text-xl tracking-tight mb-1">라이브 데모</h2>
          <p className="text-gray-1 text-sm">셰이더가 브라우저에서 실시간으로 도는 모습입니다. 클릭해 보세요.</p>
          <BlackholeDemo />
        </section>
      )}

      <div className="mt-10">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {/* 다음 케이스 던지기 (Pass 3 끌림 구조) */}
      <nav className="mt-16 pt-8 border-t border-hairline flex items-center justify-between" aria-label="케이스 이동">
        <Link href="/" className="font-mono text-sm text-gray-1 hover:text-accent">
          ← 홈
        </Link>
        {next && next.slug !== slug && (
          <Link href={`/work/${next.slug}`} className="text-right group">
            <span className="font-mono text-xs text-gray-2 block">다음 케이스</span>
            <span className="font-display font-medium group-hover:text-accent transition-colors">
              {next.frontmatter.title} →
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
