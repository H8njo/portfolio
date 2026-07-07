"use client";

import { Button, Tag, Badge, Eyebrow, MetricRow } from './components';
import { Gallery } from './Lightbox';
import { flagship as f } from './content';

const TAGS = ['TypeScript', 'React 18/19', '측정-우선 레이아웃', 'semantic-release'];

/* Flagship project card — concise on the main page, image-forward (real
   column-pager PDF output), with the full write-up linked out to the site. */
export function Flagship() {
  return (
    <article id={f.id} className="mt-5 scroll-mt-[84px] bg-hj-paper border border-hj-line rounded-hj-xl shadow-hj-soft overflow-hidden">
      <div className="grid grid-cols-[1.04fr_1.06fr] max-[900px]:grid-cols-1">
        <div className="p-[clamp(24px,3.4vw,36px)] border-r border-hj-line max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-hj-line">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Eyebrow tone="blue">{f.eyebrow}</Eyebrow>
            <Badge variant="outline">{f.company}</Badge>
            <Badge variant="green" dot>{f.badge}</Badge>
          </div>
          <h3 className="mt-4 font-hj-serif text-[clamp(24px,2.7vw,32px)] font-semibold tracking-[-0.02em] leading-[1.12] text-hj-fg">{f.title}</h3>
          <p className="mt-4 max-w-[48ch] font-hj-serif text-[15.5px] leading-[1.65] text-hj-fg-secondary whitespace-pre-line">{f.oneLiner}</p>
          <p className="mt-3 max-w-[48ch] font-hj-serif text-[14.5px] leading-[1.6] text-hj-muted">
            긴 본문이 안 잘리게 — 같은 문제를 <b className="text-hj-fg-secondary font-semibold">세 번</b> 풀며 도달한 3세대 엔진.
          </p>
          <div className="flex flex-wrap gap-2 mt-[22px]">
            {TAGS.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="outline" as="a" href={f.postUrl} iconRight="→">전체 글 읽기</Button>
            <Button variant="text" as="a" href={f.link.href} target="_blank" rel="noreferrer">GitHub ↗</Button>
          </div>
        </div>
        <div className="p-[clamp(24px,3.4vw,36px)] bg-hj-cloud flex flex-col justify-center">
          <Gallery images={f.images} />
        </div>
      </div>
      <div className="px-[clamp(24px,3.4vw,36px)] py-[clamp(20px,2.8vw,30px)] bg-hj-cloud border-t border-hj-line">
        <div className="font-hj-mono text-[11px] tracking-[0.1em] uppercase text-hj-muted mb-4">Impact · 측정 결과</div>
        <MetricRow stats={f.results} />
      </div>
    </article>
  );
}
