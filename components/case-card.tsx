import Link from "next/link";
import type { CaseEntry } from "@/lib/cases.schema";

// "문제 한 장" 카드 — 정적, SSR. /work 인덱스 + 랜딩 리스트 공용.
// featured 항목은 자동으로 강조(배지·액센트 테두리·큰 제목) + 데모 미끼로 클릭률↑.
export function CaseCard({ entry, index }: { entry: CaseEntry; index: number }) {
  const { slug, frontmatter } = entry;
  const boosted = frontmatter.featured;
  const no = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/work/${slug}`}
      className={`group relative block rounded-[4px] bg-surface transition-colors hover:border-accent ${
        boosted
          ? "border-[1.5px] border-accent px-8 py-9 sm:px-11 sm:py-10"
          : "border border-hairline px-8 py-7 sm:px-11"
      }`}
    >
      {boosted && (
        <span className="inline-block font-mono text-[11px] text-white bg-accent rounded px-2.5 py-1 tracking-wide mb-4">
          FEATURED — 창의적 해결
        </span>
      )}
      <div className="flex items-baseline justify-between font-mono text-xs text-gray-2">
        <span className="text-accent">PROBLEM {no}</span>
        <span>{frontmatter.tags.join(" · ")}</span>
      </div>
      <h3
        className={`font-display font-semibold tracking-tight mt-2 transition-colors group-hover:text-accent ${
          boosted ? "text-2xl sm:text-[27px]" : "text-xl"
        }`}
      >
        {frontmatter.title}
      </h3>
      <p className="text-gray-1 mt-2.5 max-w-[60ch]">{frontmatter.summary}</p>

      {frontmatter.metrics.length > 0 && (
        <div className="font-mono text-sm mt-5 flex flex-wrap gap-x-6 gap-y-1">
          {frontmatter.metrics.map((m) => (
            <span key={m.label} className="text-ink">
              {m.label} <span className="text-accent">{m.value}</span>
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 pt-3.5 border-t border-dashed border-hairline flex justify-between items-center font-mono text-[11px] text-gray-2">
        <span>page {no}</span>
        {/* 데모 보유 케이스는 미끼로 클릭 유도 (데모는 상세 페이지에서 작동) */}
        <span className="text-accent inline-flex items-center gap-1.5">
          {frontmatter.demo ? (
            <>
              <svg viewBox="0 0 10 10" aria-hidden="true" className="h-2.5 w-2.5 fill-current">
                <path d="M2 1.5v7l6-3.5z" />
              </svg>
              라이브 데모 보기 →
            </>
          ) : (
            "자세히 →"
          )}
        </span>
      </div>
    </Link>
  );
}
