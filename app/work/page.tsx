import Link from "next/link";
import { getAllCases } from "@/lib/cases";
import type { CaseEntry } from "@/lib/cases.schema";
import { Eyebrow, Badge } from "@/components/hoonjo/components";
import { CaseMetrics } from "@/components/case-metrics";

export const metadata = {
  title: "블로그 — 작업과 케이스 스터디 · hoonjo",
};

// 기술스택 칩 — near-white 배경에 묻히던 걸 옅은 fog 채움 + 굵은 line 테두리로
// 또렷하게. 라이브 데모 뱃지와 같은 높이(24px = h-6)로 한 줄에 정렬된다.
const TAG_CHIP =
  "inline-flex items-center h-6 px-[9px] font-hj-mono text-[12px] leading-none text-hj-fg-secondary bg-hj-fog border border-hj-steel rounded-hj-xs whitespace-nowrap";

// 라이브 데모 뱃지 — 데모 보유 케이스를 초록으로 또렷하게 표시(기존 흐린 점 대체).
function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 h-6 px-[9px] font-hj-mono text-[11.5px] font-semibold tracking-[0.03em] leading-none uppercase text-hj-green-deep bg-hj-green-soft border border-hj-green-line rounded-hj-xs whitespace-nowrap">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hj-green animate-hj-pulse" />
      LIVE DEMO
    </span>
  );
}

// featured 케이스 — 홈 플래그십과 같은 결의 큰 종이 카드 + 임팩트 스트립.
function FeaturedCase({ entry }: { entry: CaseEntry }) {
  const { slug, frontmatter } = entry;
  const hasDemo = !!(frontmatter.demo || frontmatter.demoUrl);
  const cta = hasDemo ? "라이브 데모 보기" : "케이스 열기";
  return (
    <Link
      href={`/work/${slug}`}
      className="group mt-10 block overflow-hidden rounded-hj-xl border border-hj-line bg-hj-paper shadow-hj-soft no-underline transition-[border-color,box-shadow] duration-150 hover:border-hj-blue-line hover:shadow-hj-soft-lg"
    >
      <div className="p-[clamp(24px,3.2vw,34px)]">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="green" dot>FEATURED · 창의적 해결</Badge>
        </div>
        <h2 className="mt-[18px] text-balance font-hj-serif text-[clamp(26px,3vw,34px)] font-semibold leading-[1.16] tracking-[-0.02em] text-hj-fg transition-colors duration-150 group-hover:text-hj-blue-deep">
          {frontmatter.title}
        </h2>
        <p className="mt-4 max-w-[58ch] font-hj-serif text-[16.5px] leading-[1.65] text-hj-fg-secondary">
          {frontmatter.summary}
        </p>
        <div className="mt-[22px] flex flex-wrap gap-2">
          {hasDemo && <DemoBadge />}
          {frontmatter.tags.filter((t) => !/^라이브\s*데모$/.test(t)).map((t) => (
            <span key={t} className={TAG_CHIP}>{t}</span>
          ))}
        </div>
      </div>
      {frontmatter.metrics.length > 0 && (
        <div className="border-t border-hj-line bg-hj-cloud px-[clamp(24px,3.2vw,34px)] py-[clamp(14px,2vw,18px)]">
          <div className="mb-2.5 font-hj-mono text-[11px] uppercase tracking-[0.1em] text-hj-muted">Impact · 측정 결과</div>
          <CaseMetrics metrics={frontmatter.metrics} variant="strip" />
        </div>
      )}
      <div className="flex items-center justify-between gap-4 border-t border-dashed border-hj-line px-[clamp(24px,3.2vw,34px)] py-3.5">
        <span className="font-hj-mono text-[11px] font-medium uppercase tracking-[0.12em] text-hj-faint">01 · FEATURED</span>
        <span className="inline-flex items-center gap-2 font-hj-mono text-[13px] font-medium text-hj-blue-deep">
          {cta} <span aria-hidden className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

// 나머지 케이스 — 스캔용 에디토리얼 행. 번호 · 제목/요약/태그/수치 · 화살표.
// 행 hover: flat 행이 흰 카드로 뜨고(shadow), 왼쪽에 파란 "구조선"(::before)이 자라며,
// 번호·제목·화살표가 파랗게. 640px 이하에선 1열로 접히고 번호를 맨 위로, 화살표 숨김.
function CaseRow({ entry, no }: { entry: CaseEntry; no: string }) {
  const { slug, frontmatter } = entry;
  const hasDemo = !!(frontmatter.demo || frontmatter.demoUrl);
  return (
    <Link
      href={`/work/${slug}`}
      className="group relative grid grid-cols-[40px_1fr_auto] items-start gap-5 rounded-hj-md p-[22px_20px] no-underline transition-[background,box-shadow] duration-150 hover:bg-hj-paper hover:shadow-hj-soft before:absolute before:left-0 before:top-3.5 before:bottom-3.5 before:w-0.5 before:rounded-[2px] before:bg-hj-blue before:origin-center before:scale-y-0 before:transition-transform before:duration-200 before:ease-[cubic-bezier(0.4,0,0.2,1)] before:content-[''] group-hover:before:scale-y-100 max-[640px]:grid-cols-1 max-[640px]:gap-2"
    >
      <span className="pt-[3px] font-hj-mono text-[13px] tabular-nums text-hj-faint transition-colors duration-150 group-hover:text-hj-blue max-[640px]:order-first">{no}</span>
      <div className="min-w-0">
        <h3 className="font-hj-serif text-[20px] font-semibold leading-[1.25] tracking-[-0.015em] text-hj-fg transition-colors duration-150 group-hover:text-hj-blue-deep">
          {frontmatter.title}
        </h3>
        <p className="mt-2 max-w-[62ch] font-hj-serif text-[15px] leading-[1.6] text-hj-muted">
          {frontmatter.summary}
        </p>
        {(hasDemo || frontmatter.tags.length > 0) && (
          <div className="mt-3.5 flex flex-wrap gap-2">
            {hasDemo && <DemoBadge />}
            {frontmatter.tags.map((t) => (
              <span key={t} className={TAG_CHIP}>{t}</span>
            ))}
          </div>
        )}
        {frontmatter.metrics.length > 0 && (
          <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-hj-line pt-3.5">
            <span className="self-center font-hj-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-hj-faint">IMPACT</span>
            {frontmatter.metrics.slice(0, 2).map((m) => (
              <span key={m.label} className="inline-flex items-baseline gap-2 font-hj-mono tabular-nums whitespace-nowrap">
                <span className="text-[11px] text-hj-muted">{m.label}</span>
                <span className="text-[14.5px] font-bold tracking-[-0.01em] text-hj-blue">{m.value}</span>
              </span>
            ))}
          </div>
        )}
      </div>
      <span aria-hidden className="pt-[3px] font-hj-mono text-[15px] text-hj-faint transition-transform duration-150 group-hover:translate-x-1 group-hover:text-hj-blue max-[640px]:hidden">→</span>
    </Link>
  );
}

export default function WorkIndex() {
  const cases = getAllCases();
  const featured = cases.find((c) => c.frontmatter.featured) ?? null;
  const rest = cases.filter((c) => c !== featured);

  return (
    <section className="mx-auto max-w-[1040px] px-6 py-[clamp(56px,9vw,96px)]">
      <header>
        <Eyebrow tone="blue">ALL WORK · 블로그</Eyebrow>
        <h1 className="mt-[18px] max-w-[20ch] font-hj-serif text-[clamp(30px,4.4vw,46px)] font-semibold leading-[1.08] tracking-[-0.03em] text-hj-fg">
          작업과 케이스 스터디
        </h1>
        <p className="mt-[18px] max-w-[52ch] font-hj-serif text-[18px] leading-[1.6] text-hj-fg-secondary">
          문제 한 장씩 — 실제 화면, 측정된 결과, 그리고 전체 글.{" "}
          <span className="font-hj-mono tabular-nums text-hj-muted">총 {cases.length}개.</span>
        </p>
      </header>

      {cases.length === 0 ? (
        <div className="mt-10">
          <p className="text-hj-muted">아직 공개된 케이스가 없어요. 곧 추가됩니다.</p>
          <Link href="/#contact" className="mt-3 inline-flex items-center gap-1.5 font-hj-mono text-[14px] text-hj-blue-deep">
            연락하기 <span aria-hidden>→</span>
          </Link>
        </div>
      ) : (
        <>
          {featured && <FeaturedCase entry={featured} />}

          {rest.length > 0 && (
            <div className="mt-10">
              <div className="mb-1 flex items-center gap-3">
                <span className="font-hj-mono text-[11px] font-medium uppercase tracking-[0.14em] text-hj-muted">더 많은 작업</span>
                <span aria-hidden className="h-px flex-1 bg-hj-line" />
              </div>
              <div className="border-t border-hj-line">
                {rest.map((entry, i) => (
                  <div key={entry.slug} className={i > 0 ? "border-t border-hj-line" : undefined}>
                    <CaseRow entry={entry} no={String(i + (featured ? 2 : 1)).padStart(2, "0")} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Link href="/" className="mt-14 inline-flex items-center gap-2 font-hj-mono text-[13px] text-hj-muted">
        <span aria-hidden>←</span> 홈으로
      </Link>
    </section>
  );
}
