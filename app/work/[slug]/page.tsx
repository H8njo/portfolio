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

export function generateStaticParams() {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getCaseBySlug(slug);
  if (!entry) return { title: "Not found — hoonjo" };
  return { title: `${entry.frontmatter.title} — hoonjo`, description: entry.frontmatter.summary };
}

// MDX 본문은 .hoonjo-md CSS(app/globals.css)가 통째로 스타일한다 — 마크다운이
// 생성한 태그엔 className을 못 붙이므로 유틸이 아니라 스코프 CSS로 스타일한다.
// 여기선 native 태그가 아닌 이미지(캡션)만 커스터마이즈한다.
// 페이지 크롬(헤더·데모·네비)은 Tailwind hj-* 유틸(theme.css 토큰)로 짠다.
// (.hoonjo 베이스 규칙은 globals.css @layer base라 유틸이 자연히 이겨 `!` 불필요.)
// remark는 홀로 있는 이미지를 <p>로 감싼다. 그런데 img 컴포넌트가 <figure>/<figcaption>을
// 그리므로 <p><figure>…</figure></p>가 되어 하이드레이션 에러가 난다(<p>는 블록 요소를 못 품음).
// 이미지 하나만 든 <p>를 벗겨 figure가 최상위로 오게 한다. (rehype-unwrap-images 동작을 인라인으로)
type HastNode = { type: string; tagName?: string; value?: string; children?: HastNode[] };
function rehypeUnwrapImages() {
  const isBlank = (n: HastNode) => n.type === "text" && !n.value?.trim();
  return (tree: HastNode) => {
    const walk = (node: HastNode) => {
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (child.type === "element" && child.tagName === "p") {
          const meaningful = child.children?.filter((c) => !isBlank(c)) ?? [];
          if (meaningful.length === 1 && meaningful[0].tagName === "img") {
            return meaningful; // <p> 벗기고 <img>만 올린다
          }
        }
        return [child];
      });
      node.children.forEach(walk);
    };
    walk(tree);
  };
}

const mdxComponents = {
  img: ({ alt, ...p }: React.ComponentProps<"img">) => (
    <figure className="mt-[26px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-full rounded-hj-md border border-hj-line" alt={alt} {...p} />
      {alt && (
        <figcaption className="mt-[10px] text-center font-hj-mono text-[12px] text-hj-muted">{alt}</figcaption>
      )}
    </figure>
  ),
};

// 라이브 데모 블록 — 종이 카드에 담아 홈 카드와 같은 결로.
function DemoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label="라이브 데모" className="mt-10">
      <div className="mb-[14px] flex items-center gap-[10px]">
        <span aria-hidden className="h-2 w-2 rounded-full bg-hj-green animate-hj-pulse" />
        <span className="font-hj-mono text-[12px] font-medium uppercase tracking-[0.1em] text-hj-green-deep">라이브 데모</span>
      </div>
      <p className="max-w-[52ch] font-hj-serif text-[15px] leading-[1.6] text-hj-fg-secondary">{title}</p>
      <div className="mt-[18px] overflow-hidden rounded-hj-lg border border-hj-line bg-hj-paper p-[clamp(16px,2.4vw,24px)] shadow-hj-soft">
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
    <article className="mx-auto max-w-[760px] px-6 py-[clamp(40px,7vw,72px)]">
      <Link href="/work" className="inline-flex items-center gap-[7px] font-hj-mono text-[13px] text-hj-muted">
        <span aria-hidden>←</span> 블로그
      </Link>

      <header className="mt-7">
        <div className="flex flex-wrap gap-2">
          {frontmatter.featured && <Badge variant="green" dot>FEATURED</Badge>}
          {frontmatter.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
        <h1 className="mt-5 text-balance font-hj-serif text-[clamp(28px,4.4vw,44px)] font-semibold leading-[1.12] tracking-[-0.03em] text-hj-fg">
          {frontmatter.title}
        </h1>
        <p className="mt-[18px] max-w-[54ch] font-hj-serif text-[18px] leading-[1.6] text-hj-fg-secondary">
          {frontmatter.summary}
        </p>
      </header>

      {frontmatter.metrics.length > 0 && (
        <div className="mt-8">
          <div className="mb-[14px] font-hj-mono text-[11px] font-medium uppercase tracking-[0.1em] text-hj-muted">Impact · 측정 결과</div>
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
      {!frontmatter.demo && frontmatter.demoUrl && (
        <DemoBlock title="브라우저에 담을 수 없는 데스크톱 앱이라, 실제 코드와 설치는 GitHub 저장소에서 직접 확인하세요.">
          <a
            href={frontmatter.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 font-hj-mono text-[14px] font-medium text-hj-blue-deep no-underline"
          >
            <span aria-hidden className="text-[15px]">↗</span>
            GitHub 저장소 열기
            <span aria-hidden className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
          </a>
        </DemoBlock>
      )}

      <div className="hoonjo-md mt-2">
        <MDXRemote
          source={entry.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [
                rehypeUnwrapImages,
                [rehypePrettyCode, { theme: "github-dark", keepBackground: true, defaultLang: "txt" }],
              ],
            },
          }}
        />
      </div>

      {/* 다음 케이스 던지기 — 종이 카드로 끌림 구조 (hover는 group으로) */}
      <nav aria-label="케이스 이동" className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-hj-line pt-8">
        <Link href="/" className="inline-flex items-center gap-[7px] font-hj-mono text-[13px] text-hj-muted">
          <span aria-hidden>←</span> 홈
        </Link>
        {next && next.slug !== slug && (
          <Link
            href={`/work/${next.slug}`}
            className="group block max-w-[420px] rounded-hj-lg border border-hj-line bg-hj-paper px-5 py-4 text-right no-underline shadow-hj-soft transition-[border-color,box-shadow] duration-150 hover:border-hj-blue-line hover:shadow-hj-soft-lg"
          >
            <span className="block font-hj-mono text-[11px] uppercase tracking-[0.1em] text-hj-muted">다음 케이스</span>
            <span className="mt-1.5 inline-flex items-center gap-2 font-hj-serif text-[17px] font-semibold tracking-[-0.015em] text-hj-fg transition-colors duration-150 group-hover:text-hj-blue-deep">
              {next.frontmatter.title}{" "}
              <span aria-hidden className="inline-block transition-transform duration-150 group-hover:translate-x-1 group-hover:text-hj-blue-deep">→</span>
            </span>
          </Link>
        )}
      </nav>
    </article>
  );
}
