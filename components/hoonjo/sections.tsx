"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import {
  Button, Tag, Badge, Eyebrow, SectionHeader, BlueprintGrid, MetricRow, TimelineItem,
} from './components';
import type { WorkCase } from './content';
import { profile, impact, cases, blackHole, timeline, capabilities, oss } from './content';
import { Flagship } from './Flagship';
import { Gallery } from './Lightbox';

// 라이브 블랙홀 — 실제 black-hole-effect 패키지. window 접근이 렌더 중 일어나 ssr:false.
const BlackholeLive = dynamic(() => import('@/components/demos/blackhole-live'), { ssr: false, loading: () => null });
const portrait = '/hoonjo/portrait.jpg';

/* Layout rhythm — container 1200px, section padding 96px desktop → 56px mobile
   (no media query, via clamp). Shared as class strings. */
const CONTAINER = 'mx-auto max-w-[1200px] px-6';
const SECTION_PY = 'py-[clamp(56px,9vw,96px)]';

/* in-page anchor with smooth scroll (kept in JS so we don't leak a global
   `html { scroll-behavior }` rule) */
function scrollTo(e: React.MouseEvent, id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---- Nav ---------------------------------------------------------------- */
const NAV_LINKS: [string, string][] = [['프로젝트', 'work'], ['경력', 'career'], ['전문 영역', 'stack'], ['오픈소스', 'oss']];
const NAV_ROUTES: { label: string; href: string; external?: boolean }[] = [
  { label: '블로그', href: '/work' },
];

const NAV_LINK_CLS =
  'font-hj-serif text-[15px] text-hj-fg-secondary px-3 py-2.5 no-underline rounded-hj-md transition-colors duration-150 hover:text-hj-fg hover:bg-hj-cloud';
const NAV_MOBILE_CLS =
  'block font-hj-serif text-[18px] text-hj-fg py-3.5 border-b border-hj-line no-underline';

export function Nav() {
  const [open, setOpen] = useState(false);
  const onHome = usePathname() === '/';
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  return (
    <header className="sticky top-0 z-40 bg-[rgba(255,255,255,0.82)] backdrop-blur-[10px] backdrop-saturate-[1.8] border-b border-hj-line">
      <div className={`${CONTAINER} h-16 flex items-center justify-between`}>
        <a href={onHome ? '#top' : '/'} onClick={onHome ? (e) => scrollTo(e, 'top') : undefined} className="inline-flex items-center gap-[9px] no-underline">
          <span aria-hidden className="w-[9px] h-[9px] bg-hj-blue rotate-45 rounded-[1px]" />
          <span className="font-hj-serif text-[21px] font-semibold text-hj-fg tracking-[-0.01em]">{profile.name}</span>
          <span className="font-hj-mono text-[11px] text-hj-muted tracking-[0.06em] ml-0.5 mt-0.5">FE·7Y</span>
        </a>
        <nav className="flex items-center gap-1 max-[900px]:hidden">
          {NAV_LINKS.map(([label, id]) => (
            <a key={id} href={sectionHref(id)} onClick={onHome ? (e) => scrollTo(e, id) : undefined} className={NAV_LINK_CLS}>{label}</a>
          ))}
          {NAV_ROUTES.map(({ label, href, external }) => (
            <a key={href} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className={NAV_LINK_CLS}>
              {label}{external && <span aria-hidden className="font-hj-mono text-[12px] ml-1">↗</span>}
            </a>
          ))}
          <span className="w-px h-[22px] bg-hj-line mx-2.5" />
          <Button variant="primary" size="sm" as="a" href={onHome ? '#contact' : '/#contact'} onClick={onHome ? (e: React.MouseEvent) => scrollTo(e, 'contact') : undefined}>연락하기</Button>
        </nav>
        <button aria-label="메뉴" onClick={() => setOpen((o) => !o)} className="hidden max-[900px]:inline-flex w-11 h-11 border border-hj-line bg-hj-paper rounded-hj-sm cursor-pointer items-center justify-center">
          <span className="font-hj-mono text-[13px] text-hj-fg">{open ? '✕' : '≡'}</span>
        </button>
      </div>
      {open && (
        <div className="border-t border-hj-line bg-hj-canvas px-6 pt-3 pb-5">
          {NAV_LINKS.map(([label, id]) => (
            <a key={id} href={sectionHref(id)} onClick={onHome ? (e) => { scrollTo(e, id); setOpen(false); } : () => setOpen(false)} className={NAV_MOBILE_CLS}>{label}</a>
          ))}
          {NAV_ROUTES.map(({ label, href, external }) => (
            <a key={href} href={href} onClick={() => setOpen(false)} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className={NAV_MOBILE_CLS}>
              {label}{external && <span aria-hidden className="font-hj-mono text-[13px] ml-1.5">↗</span>}
            </a>
          ))}
          <div className="mt-4">
            <Button variant="primary" as="a" href={onHome ? '#contact' : '/#contact'} onClick={onHome ? (e: React.MouseEvent) => { scrollTo(e, 'contact'); setOpen(false); } : () => setOpen(false)} style={{ width: '100%' }}>연락하기</Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---- Hero portrait ------------------------------------------------------ */
function Portrait() {
  return (
    <div className="relative w-full max-w-[360px] aspect-[4/5] justify-self-end rounded-hj-xl overflow-hidden bg-hj-cloud border border-hj-line shadow-hj-soft max-[900px]:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={portrait} alt={profile.nameKo} className="w-full h-full object-cover object-[center_32%]" />
    </div>
  );
}

/* ---- Hero --------------------------------------------------------------- */
export function Hero() {
  return (
    <section id="top">
      <BlueprintGrid cell={80} intensity="soft" style={{ backgroundColor: 'var(--color-hj-cloud)', borderBottom: '1px solid var(--color-hj-line)' }}>
        <div className={`${CONTAINER} pt-[clamp(56px,9vw,96px)] relative`}>
          <div className="grid grid-cols-[1fr_clamp(260px,32%,360px)] gap-[clamp(20px,2.4vw,36px)] items-center max-[900px]:grid-cols-1 max-[900px]:gap-7">
            <div>
              <Eyebrow tone="blue">FRONTEND ENGINEER · 7 YEARS</Eyebrow>
              <h1 className="mt-[26px] font-hj-serif font-semibold text-[clamp(30px,4.4vw,52px)] leading-[1.1] tracking-[-0.035em] text-hj-fg">
                {profile.tagline[0]} <span className="font-extrabold">{profile.tagline[1]}</span> {profile.tagline[2]}
              </h1>
              <p className="mt-7 max-w-[46ch] font-hj-serif text-[clamp(16px,2vw,19px)] leading-[1.6] text-hj-fg-secondary whitespace-pre-line">
                {profile.role}. {profile.lead}
              </p>
              <div className="flex flex-wrap gap-3 mt-[34px]">
                <Button variant="primary" as="a" href="#work" iconRight="→" onClick={(e: React.MouseEvent) => scrollTo(e, 'work')}>작업 보기</Button>
                <Button variant="outline-ink" as="a" href="#oss" onClick={(e: React.MouseEvent) => scrollTo(e, 'oss')}>오픈소스</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-[30px]">
                {profile.heroTags.map((t) => <Tag key={t} variant="ghost">{t}</Tag>)}
              </div>
            </div>
            <Portrait />
          </div>
        </div>

        <div className={`${CONTAINER} mt-16 pb-16`}>
          <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] bg-hj-paper border border-hj-line rounded-hj-lg shadow-hj-soft overflow-hidden max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            <div className="px-6 py-[22px] border-r border-hj-line flex flex-col justify-center max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-hj-line">
              <div className="font-hj-serif text-[21px] font-semibold tracking-[-0.01em] text-hj-fg leading-[1.4] whitespace-pre-line">{impact.lead}</div>
            </div>
            {impact.stats.map((s, i) => (
              <div key={s.k} className={`px-6 py-[22px] ${i < 2 ? 'border-r border-hj-line' : ''} max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-hj-line max-[560px]:border-b max-[560px]:border-hj-line`}>
                {/* scope label (context) */}
                <div className="font-hj-mono text-[11px] tracking-[0.06em] uppercase text-hj-muted">{s.k}</div>
                {/* old state — de-emphasized, small + faint + strikethrough */}
                <div className="mt-3 font-hj-mono text-[12px] text-hj-faint line-through decoration-hj-steel">{s.before}</div>
                {/* payoff — the point of the whole strip. big, bold, ink; a small muted
                    connector arrow leads the eye from the struck-through old state. */}
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span aria-hidden className="font-hj-mono text-[13px] text-hj-faint">→</span>
                  <span className="font-hj-mono tabular-nums text-[24px] font-bold text-hj-fg tracking-[-0.02em] leading-[1.1]">{s.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlueprintGrid>
    </section>
  );
}

/* ---- Work --------------------------------------------------------------- */
function Field({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mt-[22px]">
      <div className="font-hj-mono text-[11px] tracking-[0.1em] uppercase text-hj-muted mb-[11px]">{label}</div>
      <ul className="list-none m-0 p-0 flex flex-col gap-2 max-w-[50ch]">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2.5 font-hj-serif text-[15px] leading-[1.5] text-hj-fg-secondary">
            <span aria-hidden className="flex-none w-[5px] h-[5px] mt-2 rounded-[1px] bg-hj-steel rotate-45" />
            <span className="whitespace-pre-line">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseHeader({ c }: { c: WorkCase }) {
  return (
    <>
      <div className="flex items-center gap-2.5 flex-wrap">
        <Eyebrow tone="blue">{c.eyebrow}</Eyebrow>
        {c.company && <Badge variant="outline">{c.company}</Badge>}
        {c.badge && <Badge variant={c.badge.variant} dot>{c.badge.label}</Badge>}
      </div>
      <h3 className="mt-4 font-hj-serif text-[clamp(23px,2.5vw,30px)] font-semibold tracking-[-0.015em] leading-[1.12] text-hj-fg">{c.title}</h3>
      <Field label="Problem" items={c.problem} />
      <Field label="Structure" items={c.structure} />
      <div className="flex flex-wrap gap-2 mt-[22px]">
        {c.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
      <div className="flex flex-wrap gap-3 mt-6">
        <Button variant="outline" as="a" href={c.postUrl} iconRight="→">전체 글 읽기</Button>
        {c.link && <Button variant="text" as="a" href={c.link.href} target="_blank" rel="noreferrer">{c.link.label}</Button>}
      </div>
    </>
  );
}

function ImpactStrip({ c }: { c: WorkCase }) {
  return (
    <div className="px-[clamp(24px,3.4vw,36px)] py-[clamp(20px,2.8vw,30px)] bg-hj-cloud border-t border-hj-line">
      <div className="font-hj-mono text-[11px] tracking-[0.1em] uppercase text-hj-muted mb-4">Impact · 측정 결과</div>
      <MetricRow stats={c.metrics} />
      {c.metricsNote && <p className="font-hj-serif text-[12.5px] leading-[1.5] text-hj-muted mt-4">{c.metricsNote}</p>}
    </div>
  );
}

function CodePanel({ code }: { code: { caption: string; lines: string } }) {
  return (
    <div className="flex flex-col min-w-0 w-full">
      <div className="font-hj-mono text-[13.5px] leading-[1.95] bg-hj-ink border border-hj-ink-soft rounded-hj-md p-[clamp(26px,3vw,34px)] overflow-x-auto">
        {code.lines.split('\n').map((ln, i) => {
          const t = ln.trim();
          const color = t.startsWith('//') ? 'text-hj-on-ink-muted' : t.startsWith('$') ? 'text-hj-blue-bright' : 'text-hj-on-ink';
          return <div key={i} className={`${color} whitespace-pre min-h-[1.4em]`}>{ln || ' '}</div>;
        })}
      </div>
      <div className="font-hj-mono text-[11px] text-hj-muted mt-3.5">{code.caption}</div>
    </div>
  );
}

function CaseCard({ c }: { c: WorkCase }) {
  const hasImages = !!(c.images && c.images.length);
  const hasVisual = hasImages || !!c.code;
  return (
    <article id={c.id} className="mt-5 scroll-mt-[84px] bg-hj-paper border border-hj-line rounded-hj-xl shadow-hj-soft overflow-hidden">
      <div className={`grid ${hasVisual ? 'grid-cols-[1.04fr_1.06fr] max-[900px]:grid-cols-1' : 'grid-cols-1'}`}>
        <div className={`p-[clamp(24px,3.4vw,36px)] ${hasVisual ? 'border-r border-hj-line max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-hj-line' : ''}`}>
          <CaseHeader c={c} />
        </div>
        {hasVisual && (
          <div className="p-[clamp(24px,3.4vw,36px)] bg-hj-cloud flex flex-col justify-center">
            {hasImages ? <Gallery images={c.images!} /> : c.code ? <CodePanel code={c.code} /> : null}
          </div>
        )}
      </div>
      <ImpactStrip c={c} />
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className={`${CONTAINER} ${SECTION_PY}`}>
      <SectionHeader index={1} eyebrow="SELECTED WORK" title="문제를 구조로, 구조를 숫자로" lead="실제 화면, 측정된 결과, 그리고 “전체 글 읽기”." />
      <Flagship />
      <div>
        {cases.map((c) => <CaseCard key={c.title} c={c} />)}
      </div>

      {/* Black-hole side project — live WebGL render */}
      <article id={blackHole.id} className="mt-6 scroll-mt-[84px] grid grid-cols-[1fr_0.9fr] bg-hj-paper border border-hj-line rounded-hj-xl shadow-hj-soft overflow-hidden max-[900px]:grid-cols-1">
        <div className="p-[clamp(24px,4vw,40px)] flex flex-col justify-center">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Eyebrow tone="blue">{blackHole.eyebrow}</Eyebrow>
            <Badge variant="outline">{blackHole.company}</Badge>
          </div>
          <h3 className="mt-4 font-hj-serif text-[clamp(24px,2.6vw,30px)] font-semibold tracking-[-0.015em] leading-[1.18] text-hj-fg text-balance">
            {blackHole.title[0]}<br className="max-[560px]:hidden" /> {blackHole.title[1]}
          </h3>
          <p className="mt-[18px] max-w-[46ch] font-hj-serif text-[15.5px] leading-[1.65] text-hj-fg-secondary">{blackHole.body}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {blackHole.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
          <div className="flex flex-wrap gap-3 mt-[26px]">
            <Button variant="outline" as="a" href={blackHole.postUrl} iconRight="→">전체 글 읽기</Button>
            <Button variant="text" as="a" href={blackHole.repo} target="_blank" rel="noreferrer">GitHub ↗</Button>
          </div>
        </div>
        <div className="bg-hj-ink-deep relative min-h-[clamp(300px,42vw,380px)] overflow-hidden">
          <div className="absolute inset-0"><BlackholeLive /></div>
          <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-[7px] font-hj-mono text-[11px] tracking-[0.06em] uppercase text-hj-on-ink bg-[rgba(12,11,8,0.5)] border border-[rgba(246,244,238,0.18)] rounded-hj-pill px-[11px] py-[5px] backdrop-blur-[4px]">
            <span aria-hidden className="w-[7px] h-[7px] rounded-full bg-hj-green-bright animate-hj-pulse" />
            실시간 렌더
          </span>
          <div className="absolute inset-x-0 bottom-0 p-[18px] flex gap-[18px] justify-between border-t border-[rgba(246,244,238,0.12)] bg-[rgba(12,11,8,0.5)] backdrop-blur-[4px]">
            {blackHole.stats.map(([k, v]) => (
              <div key={k}>
                <div className="font-hj-mono text-[10px] tracking-[0.08em] uppercase text-hj-on-ink-muted whitespace-nowrap">{k}</div>
                <div className="font-hj-mono text-[14px] font-semibold text-hj-on-ink mt-1 whitespace-nowrap">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <a href="/work" className="flex items-center justify-center gap-2.5 mt-5 p-[22px] border border-dashed border-hj-steel rounded-hj-lg no-underline font-hj-serif text-[15px] font-medium text-hj-blue-deep transition-[background,border-color] duration-150 hover:bg-hj-cloud hover:border-hj-blue-line">
        더 많은 작업과 자세한 글 — 블로그에서 보기 <span className="font-hj-mono">→</span>
      </a>
    </section>
  );
}

/* ---- Career ------------------------------------------------------------- */
export function Career() {
  return (
    <section id="career" className="bg-hj-cloud border-y border-hj-line">
      <div className={`${CONTAINER} ${SECTION_PY}`}>
        <SectionHeader index={2} eyebrow="CAREER" title="7년, 네 곳을 거쳤습니다" lead="첫 직장 PHP부터 정부 보안관제, 교육 플랫폼까지." />
        <div className="mt-12 border-l border-hj-steel pl-[33px]">
          {timeline.map((t, i) => (
            <TimelineItem key={t.org} {...t} style={i === timeline.length - 1 ? { paddingBottom: 0 } : undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Expertise ---------------------------------------------------------- */
export function Expertise() {
  return (
    <section id="stack" className="bg-hj-cloud border-b border-hj-line">
      <div className={`${CONTAINER} ${SECTION_PY}`}>
        <SectionHeader index={3} eyebrow="EXPERTISE" title="어디서 강한가" lead="렌더링·성능, 시스템 설계, 복잡한 상태 — 각 강점은 증명한 작업으로 이어집니다." />
        <div className="grid grid-cols-3 gap-7 mt-12 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
          {capabilities.map((c) => (
            <div key={c.label} className="pt-[18px] border-t-2 border-hj-fg">
              <div className="font-hj-serif text-[19px] font-semibold tracking-[-0.01em] text-hj-fg">{c.label}</div>
              <div className="flex flex-wrap gap-x-2.5 gap-y-2 mt-4">
                {c.skills.map((s) => (
                  <span key={s} className="font-hj-mono text-[13px] text-hj-fg-secondary bg-hj-fog border border-hj-steel rounded-hj-xs px-2.5 py-1.5 leading-none whitespace-nowrap">{s}</span>
                ))}
              </div>
              <div className="mt-[18px] pt-3.5 border-t border-hj-line">
                <div className="font-hj-mono text-[10.5px] tracking-[0.1em] uppercase text-hj-muted">증명한 작업</div>
                <div className="mt-2 leading-[1.7]">
                  {c.proof.map((p, i) => (
                    <span key={p.target}>
                      <a
                        href={`#${p.target}`}
                        onClick={(e) => scrollTo(e, p.target)}
                        className="font-hj-serif text-[14px] font-medium text-hj-blue-deep no-underline border-b border-hj-blue-line pb-px cursor-pointer transition-colors duration-150 hover:border-hj-blue"
                      >
                        {p.label}
                      </a>
                      {i < c.proof.length - 1 && <span className="text-hj-faint mx-[7px]">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- OpenSource --------------------------------------------------------- */
function InkStat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="font-hj-mono text-[10.5px] tracking-[0.1em] uppercase text-hj-on-ink-muted whitespace-nowrap">{k}</div>
      <div className="font-hj-mono text-[16px] font-semibold text-hj-on-ink mt-[5px] whitespace-nowrap">{v}</div>
    </div>
  );
}

export function OpenSource() {
  return (
    <section id="oss" className="bg-hj-ink relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-50 bg-[linear-gradient(rgba(49,130,246,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(49,130,246,0.10)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className={`relative ${CONTAINER} ${SECTION_PY}`}>
        <SectionHeader index={4} eyebrow="OPEN SOURCE" onInk title="사내 도구를, 누구나 쓰게" lead="설치 한 줄로 붙고, 릴리스는 자동화 — 결정적 테스트로 회귀를 막는 패키지." />
        <div className="mt-12 bg-hj-ink-soft border border-[rgba(246,244,238,0.16)] rounded-hj-xl overflow-hidden">
          <div className="grid grid-cols-[1.2fr_1fr] max-[900px]:grid-cols-1">
            <div className="p-[clamp(24px,4vw,36px)] border-r border-[rgba(246,244,238,0.12)] max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:border-[rgba(246,244,238,0.12)]">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-hj-mono text-[17px] text-hj-on-ink font-medium">
                  H8njo<span className="text-hj-on-ink-muted">/</span>column-pager
                </span>
                <Badge variant="ink" dot>MIT</Badge>
              </div>
              <p className="mt-4 font-hj-serif text-[15.5px] leading-[1.65] text-hj-on-ink-muted whitespace-pre-line">{oss.desc}</p>
              <div className="flex flex-wrap gap-2 mt-[22px]">
                {oss.tags.map((t) => (
                  <span key={t} className="font-hj-mono text-[12px] text-hj-on-ink-muted border border-[rgba(246,244,238,0.18)] rounded-hj-xs px-[9px] py-1 whitespace-nowrap">{t}</span>
                ))}
              </div>
              <div className="mt-7">
                <Button variant="primary" as="a" href={oss.href} target="_blank" rel="noreferrer" iconRight="→">GitHub에서 보기</Button>
              </div>
            </div>
            <div className="p-[clamp(24px,4vw,36px)] flex flex-col justify-center gap-7">
              <div className="font-hj-mono text-[13px] leading-[1.7] text-hj-on-ink bg-hj-ink-deep border border-[rgba(246,244,238,0.12)] rounded-hj-md px-[18px] py-4 overflow-x-auto">
                <div className="text-hj-on-ink-muted"><span className="text-hj-blue-bright">$</span> {oss.install}</div>
                <div className="mt-2.5">
                  <span className="text-[#c792ea]">import</span> {'{ ColumnPager }'} <span className="text-[#c792ea]">from</span> <span className="text-[#a5d6a7]">'column-pager'</span>
                </div>
              </div>
              <div className="flex gap-7 flex-wrap">
                {oss.stats.map(([k, v]) => <InkStat key={k} k={k} v={v} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Contact ------------------------------------------------------------ */
export function Contact() {
  return (
    <footer id="contact" className="bg-hj-ink border-t border-[rgba(246,244,238,0.16)]">
      <div className={`${CONTAINER} pt-[clamp(56px,9vw,96px)]`}>
        <Eyebrow tone="onInk">CONTACT</Eyebrow>
        <h2 className="mt-[22px] font-hj-serif font-semibold text-[clamp(28px,4vw,50px)] leading-[1.1] tracking-[-0.035em] text-hj-on-ink">
          어려운 화면이 있다면, <span className="font-extrabold">구조부터 같이 봅니다.</span>
        </h2>
        <p className="mt-6 font-hj-serif text-[18px] leading-[1.6] text-hj-on-ink-muted">
          성능, 복잡한 상태, 까다로운 렌더링 — 측정 가능한 결과가 필요한 일에 연락 주세요.
        </p>
        <div className="flex flex-wrap gap-3 mt-9">
          <Button variant="primary" as="a" href={`mailto:${profile.email}`} iconRight="→">메일 보내기</Button>
          {([['이력서', 'resume'], ['포트폴리오 PDF', 'portfolio-pdf']] as [string, string][]).map(([label, sub]) => (
            <Button key={sub} variant="ink" as="a" href={`/${sub}`} style={{ border: '1px solid rgba(246,244,238,0.28)', background: 'transparent', color: 'var(--color-hj-on-ink)' }}>{label}</Button>
          ))}
        </div>

        <div className="h-px bg-[rgba(246,244,238,0.14)] mt-[72px]" />
        <div className="flex justify-between items-center flex-wrap gap-4 pt-7 pb-10 max-[560px]:flex-col max-[560px]:items-start">
          <div className="flex items-center gap-[9px]">
            <span aria-hidden className="w-2 h-2 bg-hj-blue-bright rotate-45 rounded-[1px]" />
            <span className="font-hj-serif text-[18px] font-semibold text-hj-on-ink">{profile.name}</span>
            <span className="font-hj-mono text-[12px] text-hj-on-ink-muted ml-1.5">· {profile.nameKo} · © 2026</span>
          </div>
          <div className="flex gap-[22px]">
            {([['GitHub', profile.github], ['Email', `mailto:${profile.email}`]] as [string, string][]).map(([l, h]) => (
              <a key={l} href={h} target={l === 'GitHub' ? '_blank' : undefined} rel="noreferrer" className="font-hj-mono text-[13px] text-hj-on-ink-muted no-underline tracking-[0.02em] transition-colors duration-150 hover:text-hj-on-ink">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---- Compose the main portfolio page ------------------------------------ */
export function MainPortfolio() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Career />
        <Expertise />
        <OpenSource />
      </main>
      <Contact />
    </>
  );
}
