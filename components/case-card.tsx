import Link from "next/link";
import type { CaseEntry } from "@/lib/cases.schema";

// "문제 한 장" 카드 — 정적, SSR. /work 인덱스와 (후속) 랜딩 큐레이션에서 재사용.
export function CaseCard({ entry, index }: { entry: CaseEntry; index: number }) {
  const { slug, frontmatter } = entry;
  const no = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/work/${slug}`}
      className="group relative block border border-hairline rounded-[4px] bg-surface px-11 py-10 transition-colors hover:border-accent"
    >
      <div className="flex items-baseline justify-between font-mono text-xs text-gray-2 mb-6">
        <span className="text-accent">PROBLEM {no}</span>
        <span>{frontmatter.tags.join(" · ")}</span>
      </div>
      <h3 className="font-display font-semibold text-2xl tracking-tight transition-colors group-hover:text-accent">
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
      <div className="mt-6 pt-3.5 border-t border-dashed border-hairline flex justify-between font-mono text-[11px] text-gray-2">
        <span>page {no}</span>
        <span className="text-accent">자세히 →</span>
      </div>
    </Link>
  );
}
