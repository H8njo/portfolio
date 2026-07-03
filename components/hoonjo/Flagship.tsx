"use client";

import { Button, Tag, Badge, Eyebrow, MetricRow } from './components';
import { Gallery } from './Lightbox';
import { flagship as f } from './content';

const TAGS = ['TypeScript', 'React 18/19', '측정-우선 레이아웃', 'semantic-release'];

/* Flagship project card — concise on the main page, image-forward (real
   column-pager PDF output), with the full write-up linked out to the site. */
export function Flagship() {
  return (
    <article id={f.id} style={{ marginTop: 20, scrollMarginTop: 84, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-soft)', overflow: 'hidden' }}>
      <div className="hoonjo-case-grid" style={{ display: 'grid', gridTemplateColumns: '1.04fr 1.06fr' }}>
        <div style={{ padding: 'clamp(24px, 3.4vw, 36px)', borderRight: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Eyebrow tone="blue">{f.eyebrow}</Eyebrow>
            <Badge variant="outline">{f.company}</Badge>
            <Badge variant="green" dot>{f.badge}</Badge>
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 2.7vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.12, color: 'var(--text)', margin: '16px 0 0' }}>{f.title}</h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-secondary)', margin: '16px 0 0', maxWidth: '48ch', whiteSpace: 'pre-line' }}>{f.oneLiner}</p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: '12px 0 0', maxWidth: '48ch' }}>
            긴 본문이 안 잘리게 — 같은 문제를 <b style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>세 번</b> 풀며 도달한 3세대 엔진.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
            {TAGS.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
            <Button variant="outline" as="a" href={f.postUrl} target="_blank" rel="noreferrer" iconRight="↗">전체 글 읽기</Button>
            <Button variant="text" as="a" href={f.link.href} target="_blank" rel="noreferrer">GitHub ↗</Button>
          </div>
        </div>
        <div style={{ padding: 'clamp(24px, 3.4vw, 36px)', background: 'var(--cloud)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Gallery images={f.images} />
        </div>
      </div>
      <div style={{ padding: 'clamp(20px, 2.8vw, 30px) clamp(24px, 3.4vw, 36px)', background: 'var(--cloud)', borderTop: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Impact · 측정 결과</div>
        <MetricRow stats={f.results} />
      </div>
    </article>
  );
}
