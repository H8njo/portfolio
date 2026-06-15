import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllCases, getCaseBySlug } from "@/lib/cases";
import { FeaturedDemo } from "@/components/demos/featured-demo";
import { BlackholeDemo } from "@/components/demos/blackhole-demo";
import RangeEditorDemo from "@/components/demos/range-editor-demo";

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
  // fenced 코드블록: shiki가 다크 배경+토큰색을 inline으로 넣고, 여기선 박스(테두리·둥금·스크롤)만.
  // 항상 다크라 라이트/다크 양쪽에서 대비가 높다.
  pre: (p: React.ComponentProps<"pre">) => (
    <pre
      className="font-mono my-5 overflow-x-auto rounded-lg border border-hairline p-4 text-[13.5px] leading-7"
      {...p}
    />
  ),
  // 인라인 코드는 globals.css(:not(pre) > code)가 옅은 칩으로, 블록 코드는 pre+shiki가 스타일.
  code: (p: React.ComponentProps<"code">) => <code {...p} />,
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
          <p className="text-gray-1 text-sm">
            탭으로 column-pager의 실제 동작을 확인해 보세요 — 긴 카드 슬라이스, 컬럼 수 변경, 재배치 애니메이션.
          </p>
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

      {frontmatter.demo === "range-editor" && (
        <section aria-label="라이브 데모" className="mt-10">
          <h2 className="font-display font-semibold text-xl tracking-tight mb-1">라이브 데모</h2>
          <p className="text-gray-1 text-sm">
            단어를 클릭(시작) → 다시 클릭(끝)으로 범위를 잡아 보세요. 끝을 먼저 찍어도{" "}
            <code>[min, max]</code>로 정규화됩니다.
          </p>
          <RangeEditorDemo />
        </section>
      )}

      <div className="mt-10">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  { theme: "github-dark", keepBackground: true, defaultLang: "txt" },
                ],
              ],
            },
          }}
        />
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
