"use client";

import type { ReactNode } from 'react';
import type { Metric } from './components';
import { Tag, MetricRow } from './components';
import { profile, timeline, capabilities, flagship, cases, blackHole, impact, oss, resumeSummary, resumeSkills, resumeExperience, education } from './content';
import type { ProjImage, ExpCompany } from './content';
import { BlackHole } from './BlackHole';
const portrait = '/hoonjo/portrait.jpg';

/* Print-to-PDF documents (/resume, /portfolio-pdf). Built with hj-* utilities;
   print behavior via `print:` variants. The only irreducible print CSS lives in
   globals.css: `@page { margin: 0 }`. print-color-adjust:exact on the doc root
   inherits to descendants so fills/colors survive the printed PDF. All copy comes
   from content.ts so nothing drifts. */

/* ---- shared shell ------------------------------------------------------- */
function DocShell({ tab, children }: { tab: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-hj-cloud [print-color-adjust:exact] [-webkit-print-color-adjust:exact] print:bg-white print:min-h-0">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 h-14 px-5 bg-[rgba(255,255,255,0.85)] backdrop-blur-[10px] backdrop-saturate-[1.8] border-b border-hj-line print:hidden">
        <a className="inline-flex items-center gap-[7px] font-hj-serif text-[14px] text-hj-fg-secondary no-underline transition-colors duration-150 hover:text-hj-fg" href="/">
          <span aria-hidden className="font-hj-mono">←</span> 포트폴리오로
        </a>
        <span className="font-hj-mono text-[12px] tracking-[0.1em] uppercase text-hj-muted max-[720px]:hidden">{tab}</span>
        <button type="button" className="font-hj-serif text-[13px] font-semibold text-white bg-hj-blue border-0 rounded-hj-button px-4 py-[9px] cursor-pointer transition-colors duration-150 hover:bg-hj-blue-hover" onClick={() => window.print()}>
          인쇄 · PDF 저장
        </button>
      </header>
      <article className="max-w-[820px] mx-auto my-8 bg-hj-paper border border-hj-line rounded-hj-lg shadow-hj-soft p-[clamp(28px,5vw,56px)] print:max-w-none print:m-0 print:border-0 print:rounded-none print:shadow-none print:p-[16mm_14mm]">{children}</article>
    </div>
  );
}

function DocHeader({ tagline, summary }: { tagline?: string; summary?: string }) {
  return (
    <header className="pb-6 border-b-2 border-hj-fg flex gap-[26px] items-start break-inside-avoid">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="font-hj-serif text-[34px] font-bold tracking-[-0.02em] text-hj-fg">{profile.nameKo}</h1>
          <span className="font-hj-mono text-[14px] text-hj-muted">{profile.name}</span>
        </div>
        <div className="font-hj-serif text-[16px] text-hj-fg-secondary mt-2">{profile.role}</div>
        {tagline && <div className="font-hj-serif text-[22px] font-semibold tracking-[-0.01em] text-hj-fg mt-3.5">{tagline}</div>}
        <div className="flex flex-wrap gap-x-[18px] gap-y-1 mt-3.5 font-hj-mono text-[12.5px] text-hj-muted">
          <a href={`mailto:${profile.email}`} className="text-hj-blue-deep">{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.githubHandle}</a>
        </div>
        {summary && <p className="font-hj-serif text-[14.5px] leading-[1.6] text-hj-fg-secondary mt-4 max-w-[62ch]">{summary}</p>}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={portrait} alt={profile.nameKo} className="flex-none w-[116px] h-[138px] object-cover object-[center_22%] rounded-hj-lg border border-hj-line break-inside-avoid" />
    </header>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="font-hj-mono text-[11px] tracking-[0.1em] uppercase text-hj-muted">{children}</div>;
}

function DocSection({ label, breakPage, children }: { label: string; breakPage?: boolean; children: ReactNode }) {
  return (
    <section className={`mt-[26px] break-inside-avoid ${breakPage ? '[break-before:page] print:pt-[14mm]' : ''}`}>
      <h2 className="font-hj-mono text-[12px] tracking-[0.12em] uppercase text-hj-muted mt-0 mb-3.5 pb-2 border-b border-hj-line">{label}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-[9px] font-hj-serif text-[14px] leading-[1.5] text-hj-fg-secondary whitespace-pre-line">
          <span aria-hidden className="flex-none w-1 h-1 mt-2 rounded-[1px] bg-hj-steel rotate-45" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---- project data (bullet-friendly, reused from content) ---------------- */
type Project = { title: string; company?: string; problem: string[]; structure: string[]; metrics: Metric[]; tags: string[]; images?: ProjImage[]; code?: { caption: string; lines: string } };

const FLAGSHIP_PROBLEM = [
  'A4 2단 레이아웃에서 한 칸 높이를 넘는 긴 카드(긴 본문)를 기존 구현이 처리 못 함',
  '인쇄물이라 문장이 잘리면 그대로 불량품\n— 2년 가까이 환불 문의',
  '여러 명이 붙었지만 다들 같은 벽에서 멈춤',
];
const FLAGSHIP_STRUCTURE = [
  '앱에서 분리 → 순수 코어 / 측정 / 렌더 3계층으로 클린 재설계',
  '망한 시도를 버리지 않고 각도만 바꿔 합친 3세대 엔진',
  '결정적 테스트 49개로 측정부를 교체 가능하게 추상화',
];

const PROJECTS: Project[] = [
  { title: flagship.title, company: flagship.company, problem: FLAGSHIP_PROBLEM, structure: FLAGSHIP_STRUCTURE, metrics: flagship.results, tags: ['TypeScript', 'React 18/19', '측정-우선 레이아웃', 'semantic-release'], images: flagship.images },
  ...cases.map((c): Project => ({ title: c.title, company: c.company, problem: c.problem, structure: c.structure, metrics: c.metrics, tags: c.tags, images: c.images, code: c.code })),
];

function ProjectBlock({ p, withImages = false }: { p: Project; withImages?: boolean }) {
  return (
    <section className="pt-[22px] border-t border-hj-line break-inside-avoid">
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <h3 className="font-hj-serif text-[20px] font-semibold tracking-[-0.01em] text-hj-fg">{p.title}</h3>
        {p.company && <span className="font-hj-mono text-[12.5px] text-hj-muted">{p.company}</span>}
      </div>
      {withImages && p.images && p.images.length > 0 && (
        <div className="grid gap-2.5 mt-4" style={{ gridTemplateColumns: `repeat(${Math.min(p.images.length, 3)}, 1fr)` }}>
          {p.images.map((im, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={im.src} alt={im.alt} className="w-full aspect-[4/3] object-cover rounded-hj-md border border-hj-line break-inside-avoid" />
          ))}
        </div>
      )}
      {withImages && (!p.images || p.images.length === 0) && p.code && (
        <div className="mt-4 bg-hj-ink border border-hj-ink-soft rounded-hj-md px-5 py-[18px] overflow-x-auto">
          {p.code.lines.split('\n').map((ln, i) => {
            const t = ln.trim();
            const color = t.startsWith('//') ? 'text-hj-on-ink-muted' : t.startsWith('$') ? 'text-hj-blue-bright' : 'text-hj-on-ink';
            return <div key={i} className={`font-hj-mono text-[12px] leading-[1.8] whitespace-pre min-h-[1.3em] ${color}`}>{ln || ' '}</div>;
          })}
          <div className="font-hj-mono text-[10.5px] text-hj-on-ink-muted mt-3 pt-2.5 border-t border-[rgba(246,244,238,0.14)]">{p.code.caption}</div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-6 mt-4 max-[720px]:grid-cols-1">
        <div><SectionLabel>Problem</SectionLabel><div className="mt-[9px]"><Bullets items={p.problem} /></div></div>
        <div><SectionLabel>Structure</SectionLabel><div className="mt-[9px]"><Bullets items={p.structure} /></div></div>
      </div>
      <div className="mt-[18px] pt-4 border-t border-hj-line">
        <SectionLabel>Impact</SectionLabel>
        <div className="mt-3.5"><MetricRow stats={p.metrics} /></div>
      </div>
      {withImages && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}
    </section>
  );
}

function CareerList() {
  return (
    <div className="flex flex-col gap-3">
      {timeline.map((t) => (
        <div key={t.org} className="grid grid-cols-[98px_1fr] gap-[18px] break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-1">
          <div className="font-hj-mono text-[12.5px] text-hj-muted pt-0.5">{t.period}</div>
          <div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-hj-serif text-[15.5px] font-semibold text-hj-fg">{t.role}</span>
              <span className="font-hj-serif text-[13.5px] text-hj-muted">· {t.org}</span>
            </div>
            <p className="font-hj-serif text-[13.5px] leading-[1.6] text-hj-fg-secondary mt-1.5 whitespace-pre-line">{t.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <div className="grid grid-cols-3 gap-[22px] max-[720px]:grid-cols-1">
      {capabilities.map((c) => (
        <div key={c.label}>
          <div className="font-hj-serif text-[14.5px] font-semibold text-hj-fg">{c.label}</div>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {c.skills.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- 이력서 전용 파트 ---------------------------------------------------- */
function ResumeHeader() {
  return (
    <header className="pb-6 border-b-2 border-hj-fg break-inside-avoid">
      <div className="font-hj-mono text-[11px] tracking-[0.16em] uppercase text-hj-blue-deep">이력서 · Résumé</div>
      <div className="flex gap-[26px] items-start mt-3.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="font-hj-serif text-[32px] font-bold tracking-[-0.02em] text-hj-fg">{profile.nameKo}</h1>
            <span className="font-hj-mono text-[14px] text-hj-muted">{profile.name}</span>
          </div>
          <div className="font-hj-serif text-[15.5px] text-hj-fg-secondary mt-[7px]">{profile.role}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 font-hj-mono text-[12.5px]">
            <a href={`mailto:${profile.email}`} className="text-hj-blue-deep">{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.githubHandle}</a>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} alt={profile.nameKo} className="flex-none w-[104px] h-[124px] object-cover object-[center_22%] rounded-hj-lg border border-hj-line" />
      </div>
      <div className="mt-[18px] flex flex-col gap-[7px] max-w-[72ch]">
        {resumeSummary.map((line, i) => {
          if (line.kind === 'close') {
            const [pre, post] = line.t.split(' : ');
            return (
              <p key={i} className="font-hj-serif text-[14.5px] leading-[1.55] mt-[5px]">
                <span className="text-hj-fg-secondary font-normal">{pre}</span>
                <span className="text-hj-blue-deep font-hj-mono mx-2.5">→</span>
                <span className="text-hj-fg font-semibold">{post}</span>
              </p>
            );
          }
          const sizeCls = line.kind === 'lead' ? 'text-[18px]' : line.kind === 'hook' ? 'text-[15.5px]' : 'text-[14px]';
          const weightCls = line.kind === 'lead' ? 'font-bold' : line.kind === 'body' ? 'font-normal' : 'font-semibold';
          const colorCls = line.kind === 'body' ? 'text-hj-fg-secondary' : 'text-hj-fg';
          return (
            <p key={i} className={`font-hj-serif leading-[1.5] ${line.kind === 'hook' ? 'mt-[3px]' : ''} ${line.kind === 'lead' ? 'tracking-[-0.01em]' : ''} ${sizeCls} ${weightCls} ${colorCls}`}>{line.t}</p>
          );
        })}
      </div>
    </header>
  );
}

function ResumeSkills() {
  return (
    <div className="grid grid-cols-2 gap-x-[30px] gap-y-[18px] max-[720px]:grid-cols-1">
      {resumeSkills.map((s) => (
        <div key={s.label} className="grid grid-cols-[132px_1fr] gap-3.5 items-start break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-1">
          <div className="font-hj-serif text-[13.5px] font-semibold text-hj-fg pt-[3px]">{s.label}</div>
          <div className="flex flex-wrap gap-1.5">
            {s.items.map((it) => <Tag key={it}>{it}</Tag>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 회사 하나 = 기간(왼쪽) + 회사/제품/역할 헤더 + 스택 + 성과 불릿(오른쪽). */
function ExperienceBlock({ c, first = false }: { c: ExpCompany; first?: boolean }) {
  return (
    <section className={`grid grid-cols-[150px_1fr] gap-[22px] break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-2 ${first ? 'pt-1' : 'pt-[22px] border-t border-hj-line'}`}>
      <div className={`flex items-center gap-2 font-hj-mono text-[13px] font-medium pt-[3px] ${c.current ? 'text-hj-green-deep' : 'text-hj-muted'}`}>
        {c.current && <span aria-hidden className="w-[7px] h-[7px] rounded-[1px] rotate-45 bg-hj-green flex-none" />}
        {c.period}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <h3 className="font-hj-serif text-[21px] font-semibold tracking-[-0.01em] text-hj-fg">{c.company}</h3>
          <span className="font-hj-serif text-[13.5px] text-hj-muted">{c.product}</span>
        </div>
        <div className="font-hj-serif text-[13.5px] font-medium text-hj-fg-secondary mt-1">{c.role}</div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {c.stack.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
        <ul className="list-none mt-3.5 p-0 flex flex-col gap-[11px]">
          {c.highlights.map((h) => (
            <li key={h.head} className="grid grid-cols-[auto_1fr] gap-2.5 break-inside-avoid">
              <span aria-hidden className="w-[5px] h-[5px] mt-[7px] rounded-[1px] bg-hj-blue rotate-45 flex-none" />
              <div>
                <div className="font-hj-serif text-[14.5px] font-semibold leading-[1.45] text-hj-fg">{h.head}</div>
                <ul className="list-none mt-1.5 p-0 flex flex-col gap-[3px]">
                  {h.points.map((pt, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-2 font-hj-serif text-[13.5px] leading-[1.55] text-hj-fg-secondary">
                      <span aria-hidden className="text-hj-faint">–</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                {h.results && h.results.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-[7px] mt-2.5">
                    <span className="inline-flex items-center gap-1.5 font-hj-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase text-hj-green-deep">
                      <span aria-hidden className="w-[5px] h-[5px] rotate-45 bg-hj-green flex-none" />
                      성과
                    </span>
                    {h.results.map((r) => (
                      <span key={r} className="font-hj-serif text-[12.5px] font-semibold text-hj-fg bg-hj-cloud border border-hj-line rounded-hj-xs px-2.5 py-1 leading-[1.35]">{r}</span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Education() {
  return (
    <div className="flex flex-col gap-3.5">
      {education.map((e) => (
        <div key={e.school} className="grid grid-cols-[150px_1fr] gap-[22px] break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-1">
          <div className="font-hj-mono text-[12.5px] text-hj-muted pt-0.5">{e.period}</div>
          <div>
            <div className="font-hj-serif text-[14.5px] font-semibold text-hj-fg">{e.school}</div>
            <div className="font-hj-serif text-[13px] text-hj-fg-secondary mt-[3px]">{e.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- 이력서: 회사 위주로 읽는 CV --------------------------------------- */
export function Resume() {
  return (
    <DocShell tab="이력서">
      <ResumeHeader />
      <DocSection label="핵심 역량"><ResumeSkills /></DocSection>
      <DocSection label="학력 · 교육"><Education /></DocSection>
      <DocSection label="경력 기술" breakPage>
        <div className="flex flex-col gap-2">
          <ExperienceBlock c={resumeExperience[0]} first />
          <ExperienceBlock c={resumeExperience[1]} />
        </div>
      </DocSection>
      <section className="mt-2 [break-before:page] print:pt-[14mm] break-inside-avoid">
        <div className="flex flex-col gap-2">
          {resumeExperience.slice(2).map((c) => <ExperienceBlock key={c.company} c={c} />)}
        </div>
      </section>
    </DocShell>
  );
}

/* ---- 포트폴리오 PDF: the whole portfolio as one document ----------------- */
export function PortfolioPdf() {
  return (
    <DocShell tab="포트폴리오 PDF">
      <DocHeader tagline="안 되던 화면을 되게 만듭니다." summary={profile.lead.replace(/\n/g, ' ')} />

      <DocSection label="대표 임팩트">
        <div className="font-hj-serif text-[14.5px] text-hj-fg-secondary -mt-1 mb-3">{impact.lead}</div>
        <div className="grid grid-cols-3 bg-hj-ink border border-hj-ink-soft rounded-hj-lg overflow-hidden max-[720px]:grid-cols-1">
          {impact.stats.map((s, i) => (
            <div key={s.k} className={`px-[22px] py-[18px] ${i < impact.stats.length - 1 ? 'border-r border-[rgba(246,244,238,0.14)]' : ''}`}>
              <div className="font-hj-mono text-[10.5px] tracking-[0.1em] uppercase text-hj-on-ink-muted">{s.k}</div>
              <div className="font-hj-mono text-[13px] text-hj-on-ink-muted line-through decoration-[rgba(246,244,238,0.45)] mt-4">{s.before}</div>
              <div className="flex items-baseline gap-[9px] mt-1.5">
                <span className="font-hj-mono text-[15px] text-hj-blue-bright">→</span>
                <span className="font-hj-serif text-[23px] font-bold tracking-[-0.01em] text-hj-on-ink">{s.after}</span>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection label="경력"><CareerList /></DocSection>

      <DocSection label="대표 프로젝트" breakPage>
        <ProjectBlock p={PROJECTS[0]} withImages />
        {PROJECTS.slice(1).map((p) => (
          <div key={p.title} className="[break-before:page] print:pt-[14mm] mt-8">
            <ProjectBlock p={p} withImages />
          </div>
        ))}
      </DocSection>

      <DocSection label="사이드 프로젝트" breakPage>
        <div className="grid grid-cols-[1fr_0.82fr] gap-6 items-stretch max-[720px]:grid-cols-1">
          <div>
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <h3 className="font-hj-serif text-[19px] font-semibold text-hj-fg">{blackHole.title.join(' ')}</h3>
              <a href={blackHole.repo} target="_blank" rel="noreferrer" className="font-hj-mono text-[12px] text-hj-blue-deep">github ↗</a>
            </div>
            <p className="font-hj-serif text-[13.5px] leading-[1.55] text-hj-fg-secondary mt-2.5">{blackHole.body}</p>
            <div className="flex gap-5 flex-wrap mt-4">
              {blackHole.stats.map(([k, v]) => (
                <div key={k}><span className="font-hj-mono text-[11px] text-hj-muted">{k} · </span><span className="font-hj-mono text-[13px] font-semibold text-hj-fg">{v}</span></div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {blackHole.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
          <div className="relative min-h-[216px] bg-hj-ink-deep border border-hj-ink-soft rounded-hj-md overflow-hidden">
            <BlackHole />
            <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 font-hj-mono text-[9.5px] tracking-[0.06em] uppercase text-hj-on-ink bg-[rgba(12,11,8,0.5)] border border-[rgba(246,244,238,0.18)] rounded-hj-pill px-[9px] py-1">
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-hj-green-bright" />
              실시간 렌더
            </span>
          </div>
        </div>
      </DocSection>

      <div className="[break-before:page] print:pt-[14mm] [break-inside:avoid]">
        <DocSection label="오픈소스">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="font-hj-mono text-[15px] font-medium text-hj-fg">{oss.repo}</span>
            <a href={oss.href} target="_blank" rel="noreferrer" className="font-hj-mono text-[12.5px] text-hj-blue-deep">github ↗</a>
          </div>
          <p className="font-hj-serif text-[13.5px] leading-[1.55] text-hj-fg-secondary mt-2 whitespace-pre-line">{oss.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {oss.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </DocSection>

        <DocSection label="전문 영역"><Skills /></DocSection>
      </div>
    </DocShell>
  );
}
