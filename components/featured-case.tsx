import Link from "next/link";
import type { CaseEntry } from "@/lib/cases.schema";

// 랜딩 featured 슬롯 — 가장 강한 케이스를 크게. 라이브 데모(T4)는 demoSlot으로 주입.
export function FeaturedCase({ entry, demoSlot }: { entry: CaseEntry; demoSlot?: React.ReactNode }) {
  const { slug, frontmatter } = entry;

  return (
    <div className="border-[1.5px] border-accent rounded-[4px] bg-surface px-8 py-9 sm:px-11 sm:py-10">
      <span className="inline-block font-mono text-[11px] text-white bg-accent rounded px-2.5 py-1 tracking-wide">
        FEATURED — 창의적 해결
      </span>
      <div className="flex items-baseline justify-between font-mono text-xs text-gray-2 mt-5">
        <span className="text-accent">PROBLEM 01</span>
        <span>{frontmatter.tags.join(" · ")}</span>
      </div>
      <h3 className="font-display font-semibold text-2xl sm:text-[27px] tracking-tight mt-2">
        {frontmatter.title}
      </h3>
      <p className="text-gray-1 mt-2.5 max-w-[60ch]">{frontmatter.summary}</p>

      {/* 라이브 데모 슬롯 (T4: column-pager 2열) */}
      {demoSlot ?? (
        <div className="mt-6 border border-dashed border-hairline rounded p-6 text-center font-mono text-xs text-gray-2">
          ▶ 라이브 데모 (T4에서 구현)
        </div>
      )}

      {frontmatter.metrics.length > 0 && (
        <div className="font-mono text-sm mt-5 flex flex-wrap gap-x-6 gap-y-1">
          {frontmatter.metrics.map((m) => (
            <span key={m.label} className="text-ink">
              {m.label} <span className="text-accent">{m.value}</span>
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/work/${slug}`}
        className="inline-block mt-6 font-mono text-sm text-accent hover:underline underline-offset-4"
      >
        케이스 자세히 →
      </Link>
    </div>
  );
}
