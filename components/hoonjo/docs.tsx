"use client";

import type { ReactNode } from 'react';
import type { Metric } from './components';
import { Tag, MetricRow } from './components';
import { profile, timeline, capabilities, flagship, cases, blackHole, sideProjects, impact, oss, resumeSummary, resumeOwnership, resumeLeadership, resumeSkills, resumeExperience, education } from './content';
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

/* `flow` = 여러 페이지에 걸쳐 흐를 수 있는 긴 섹션(경력·대표 프로젝트). 짧은
   섹션은 기본값(break-inside:avoid)으로 한 페이지에 묶는다. 라벨엔 break-after:avoid
   를 걸어 섹션 제목이 페이지 맨 아래에 홀로 남지 않게 한다.
   `breakBefore` = 이 섹션을 무조건 새 페이지에서 시작(페이지 하단에서 잘리는 걸 방지). */
function DocSection({ label, flow, breakBefore, children }: { label: string; flow?: boolean; breakBefore?: boolean; children: ReactNode }) {
  return (
    <section className={`mt-[26px] ${flow ? '' : 'break-inside-avoid'} ${breakBefore ? 'print:break-before-page print:pt-[2mm]' : ''}`}>
      <h2 className="font-hj-mono text-[12px] tracking-[0.12em] uppercase text-hj-muted mt-0 mb-3.5 pb-2 border-b border-hj-line break-after-avoid">{label}</h2>
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

/* ---- supporting projects (3 cases; flagship handled by FlagshipBlock) --- */
type Project = { title: string; company?: string; problem: string[]; structure: string[]; metrics: Metric[]; tags: string[]; images?: ProjImage[]; code?: { caption: string; lines: string } };

const PROJECTS: Project[] = cases.map((c): Project => ({
  title: c.title, company: c.company, problem: c.problem, structure: c.structure,
  metrics: c.metrics, tags: c.tags, images: c.images, code: c.code,
}));

/* 프로젝트 시각 자료 — 실제 화면(최대 3장) 또는 코드 패널. 인쇄에서 쪼개지지 않게 묶는다. */
function ProjectVisual({ p, cols = 3 }: { p: Project; cols?: number }) {
  if (p.images && p.images.length > 0) {
    return (
      <div className="grid gap-2.5 mt-4 break-inside-avoid" style={{ gridTemplateColumns: `repeat(${Math.min(p.images.length, cols)}, 1fr)` }}>
        {p.images.map((im, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={im.src} alt={im.alt} className="w-full aspect-[4/3] object-cover rounded-hj-md border border-hj-line" />
        ))}
      </div>
    );
  }
  if (p.code) {
    return (
      <div className="mt-4 bg-hj-ink border border-hj-ink-soft rounded-hj-md px-5 py-[18px] overflow-x-auto break-inside-avoid">
        {p.code.lines.split('\n').map((ln, i) => {
          const t = ln.trim();
          const color = t.startsWith('//') ? 'text-hj-on-ink-muted' : t.startsWith('$') ? 'text-hj-blue-bright' : 'text-hj-on-ink';
          return <div key={i} className={`font-hj-mono text-[12px] leading-[1.8] whitespace-pre min-h-[1.3em] ${color}`}>{ln || ' '}</div>;
        })}
        <div className="font-hj-mono text-[10.5px] text-hj-on-ink-muted mt-3 pt-2.5 border-t border-[rgba(246,244,238,0.14)]">{p.code.caption}</div>
      </div>
    );
  }
  return null;
}

/* 지원 케이스 — 제목·시각자료 / Problem·Structure / Impact·태그. 강제 페이지 분할 없이
   흐르되 각 덩어리(제목+시각자료, P·S 그리드, Impact)는 안 쪼개지게 묶는다. */
function ProjectBlock({ p }: { p: Project }) {
  return (
    <section className="pt-[22px] border-t border-hj-line">
      <div className="break-inside-avoid break-after-avoid">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <h3 className="font-hj-serif text-[20px] font-semibold tracking-[-0.01em] text-hj-fg">{p.title}</h3>
          {p.company && <span className="font-hj-mono text-[12.5px] text-hj-muted">{p.company}</span>}
        </div>
        <ProjectVisual p={p} />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4 break-inside-avoid max-[720px]:grid-cols-1">
        <div><SectionLabel>Problem</SectionLabel><div className="mt-[9px]"><Bullets items={p.problem} /></div></div>
        <div><SectionLabel>Structure</SectionLabel><div className="mt-[9px]"><Bullets items={p.structure} /></div></div>
      </div>
      <div className="mt-[18px] pt-4 border-t border-hj-line break-inside-avoid">
        <SectionLabel>Impact</SectionLabel>
        <div className="mt-3.5"><MetricRow stats={p.metrics} /></div>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </section>
  );
}

/* ---- Flagship — the anchor: full "다섯 번 시도 → 세대 진화 → 정직한 한계" story,
   ported from the /work 게시물 목소리. 오픈소스(column-pager) 사실을 여기 흡수해
   별도 섹션 중복을 없앤다. */
const FLAGSHIP_TAGS = ['TypeScript', 'React 18/19', '측정-우선 레이아웃', 'semantic-release', 'MIT'];

function FlagshipBlock() {
  return (
    <section className="pt-[22px] border-t-2 border-hj-fg">
      {/* 헤더 + 훅 + 실제 PDF 출력 2장 — 붙어 있게 */}
      <div className="break-inside-avoid break-after-avoid">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <h3 className="font-hj-serif text-[22px] font-bold tracking-[-0.015em] text-hj-fg">{flagship.title}</h3>
          <span className="font-hj-mono text-[12.5px] text-hj-muted">{flagship.company}</span>
          <span className="inline-flex items-center gap-1.5 font-hj-mono text-[10.5px] font-semibold tracking-[0.08em] uppercase text-hj-green-deep bg-hj-green-soft border border-hj-green-line rounded-hj-xs px-2 py-[3px]">
            <span aria-hidden className="w-[5px] h-[5px] rotate-45 bg-hj-green flex-none" />
            {flagship.badge}
          </span>
        </div>
        <p className="mt-2.5 max-w-[64ch] font-hj-serif text-[14px] leading-[1.6] text-hj-fg-secondary">{flagship.hook}</p>
        <div className="grid grid-cols-2 gap-2.5 mt-4">
          {flagship.images.map((im, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={im.src} alt={im.alt} className="w-full aspect-[4/3] object-cover rounded-hj-md border border-hj-line" />
          ))}
        </div>
      </div>

      {/* 다섯 번의 시도 — 시그니처 서사. 각 시도는 안 쪼개지게. */}
      <div className="mt-5 break-inside-avoid">
        <SectionLabel>다섯 번의 시도</SectionLabel>
        <ol className="list-none m-0 p-0 mt-3 flex flex-col gap-2.5">
          {flagship.attempts.map((a) => (
            <li key={a.n} className="grid grid-cols-[26px_1fr] gap-2.5 break-inside-avoid">
              <span className={`font-hj-mono text-[12px] font-semibold pt-[1px] ${a.win ? 'text-hj-green-deep' : 'text-hj-faint'}`}>{a.n}</span>
              <div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-hj-serif text-[13.5px] font-semibold leading-[1.4] text-hj-fg">{a.head}</span>
                  {a.win && <span className="font-hj-mono text-[9.5px] font-semibold tracking-[0.12em] uppercase text-hj-green-deep bg-hj-green-soft border border-hj-green-line rounded-hj-xs px-1.5 py-[1px]">정답</span>}
                </div>
                <p className="font-hj-serif text-[12.5px] leading-[1.55] text-hj-muted mt-1">{a.miss}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-3.5 max-w-[68ch] font-hj-serif text-[12.5px] leading-[1.6] text-hj-fg-secondary border-l-2 border-hj-blue-line pl-3">{flagship.insight}</p>
      </div>

      {/* 세대 진화 v1→v2→v3 */}
      <div className="mt-5 break-inside-avoid">
        <SectionLabel>한 번에 끝나지 않았다 · 세대 진화</SectionLabel>
        <div className="grid grid-cols-3 gap-2.5 mt-3 max-[720px]:grid-cols-1">
          {flagship.generations.map(([v, where, what]) => (
            <div key={v} className="border border-hj-line rounded-hj-md p-3">
              <div className="font-hj-mono text-[12px] font-semibold text-hj-blue-deep">{v}</div>
              <div className="font-hj-serif text-[12.5px] font-semibold text-hj-fg mt-1">{where}</div>
              <div className="font-hj-serif text-[11.5px] leading-[1.5] text-hj-muted mt-1">{what}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact + 정직한 한계 + 오픈소스 흡수 */}
      <div className="mt-5 pt-4 border-t border-hj-line break-inside-avoid">
        <SectionLabel>Impact</SectionLabel>
        <div className="mt-3.5"><MetricRow stats={flagship.results} /></div>
        <p className="mt-4 max-w-[68ch] font-hj-serif text-[12.5px] leading-[1.55] text-hj-muted">{flagship.resultNote}</p>
        <p className="mt-2.5 max-w-[68ch] font-hj-serif text-[12.5px] leading-[1.55] text-hj-muted border-l-2 border-hj-line pl-3">
          <span className="font-hj-mono text-[9.5px] font-semibold tracking-[0.14em] uppercase text-hj-faint mr-1.5">한계</span>
          {flagship.honesty}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-2">
          <span className="font-hj-mono text-[12px] text-hj-fg-secondary"><span className="text-hj-blue-deep">$</span> {oss.install}</span>
          <a href={flagship.link.href} target="_blank" rel="noreferrer" className="font-hj-mono text-[12px] text-hj-blue-deep">{flagship.link.label} ↗</a>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {FLAGSHIP_TAGS.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
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
            <a href={profile.portfolio} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.portfolioLabel}</a>
            <a href={profile.blog} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.blogLabel}</a>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} alt={profile.nameKo} className="flex-none w-[104px] h-[124px] object-cover object-[center_22%] rounded-hj-lg border border-hj-line" />
      </div>
      {/* lead("7년차 …")는 위 role 서브타이틀과 중복이라 렌더에서 뺀다 — hook을 굵은
          첫 줄로 승격해 요약이 곧바로 강점으로 시작하게 한다. */}
      <div className="mt-[18px] flex flex-col gap-[7px] max-w-[72ch]">
        {resumeSummary.filter((line) => line.kind !== 'lead').map((line, i) => {
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
          const sizeCls = line.kind === 'hook' ? 'text-[18px]' : 'text-[14px]';
          const weightCls = line.kind === 'body' ? 'font-normal' : 'font-bold';
          const colorCls = line.kind === 'body' ? 'text-hj-fg-secondary' : 'text-hj-fg';
          return (
            <p key={i} className={`font-hj-serif leading-[1.5] ${line.kind === 'hook' ? 'tracking-[-0.01em]' : ''} ${sizeCls} ${weightCls} ${colorCls}`}>{line.t}</p>
          );
        })}
      </div>
    </header>
  );
}

function ClaimSection({ data }: { data: { claim: string; items: { at: string; t: string }[] } }) {
  return (
    <div>
      <p className="font-hj-serif text-[14px] font-semibold leading-[1.5] text-hj-fg max-w-[74ch]">{data.claim}</p>
      <ul className="list-none m-0 p-0 mt-[14px] flex flex-col gap-2.5">
        {data.items.map((it) => (
          <li key={it.at} className="grid grid-cols-[140px_1fr] gap-3.5 items-baseline break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-0.5">
            <span className="font-hj-mono text-[12px] font-medium text-hj-blue-deep pt-[2px]">{it.at}</span>
            <span className="font-hj-serif text-[13.5px] leading-[1.55] text-hj-fg-secondary">{it.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResumeSkills() {
  return (
    <div className="grid grid-cols-2 gap-x-[30px] gap-y-[18px] max-[720px]:grid-cols-1">
      {resumeSkills.map((s) => (
        <div key={s.label} className="grid grid-cols-[132px_1fr] gap-3.5 items-start break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-1">
          <div className="font-hj-serif text-[13.5px] font-semibold text-hj-fg pt-[3px] break-keep">{s.label}</div>
          <div className="flex flex-wrap gap-1.5">
            {s.items.map((it) => <Tag key={it}>{it}</Tag>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 회사 하나 = 기간+회사 헤더(붙어 있어야 함) + 성과 하이라이트(각각은 안 쪼개지되,
   회사 블록 전체는 여러 페이지에 걸쳐 흐를 수 있음). 인쇄 신뢰성을 위해 기간을 왼쪽
   레일 그리드로 고정하지 않고 헤더 클러스터로 묶는다 — 긴 회사(하이라이트 4개)가 페이지
   경계를 넘어도 그리드 행이 쪼개지지 않는다. 하이라이트는 172px 들여써 헤더 정렬을 맞춘다. */
function ExperienceBlock({ c, first = false }: { c: ExpCompany; first?: boolean }) {
  return (
    // 회사 블록은 페이지에 걸쳐 흐르게 둔다(break-inside-avoid로 통째 묶으면 큰 회사가
    // 남은 공간에 안 들어가 통째로 다음 장으로 밀려 하단에 빈 공간이 크게 남는다).
    // 하이라이트도 통째로 묶지 않는다 — 항목 하나가 페이지 끝에 안 들어가면 통째로 다음 장으로
    // 점프해 하단에 빈 공간이 생기기 때문(브라우저 인쇄의 A4+기본여백에서 특히 잦다).
    // 대신 글머리(bullet) 단위로만 쪼개지게 하고, 제목은 break-after-avoid로 첫 내용과 붙여
    // 페이지 하단에 홀로 남지 않게 한다 — 회사도 항목도 흐르며 페이지를 자연스럽게 채운다.
    <section className={`${first ? 'pt-1' : 'pt-[22px] border-t border-hj-line'}`}>
      {/* 헤더 클러스터 — 기간을 왼쪽 레일에 두지 않고 회사명 위 한 줄로 쌓아 세로 1열로 둔다.
          break-inside-avoid로 기간+회사+역할+스택은 한 덩어리(안 쪼개짐)로 묶고, 하이라이트는
          그 아래 같은 열에 들여쓰기 없이 흐른다 — 회사 블록은 페이지 경계를 자연스럽게 넘는다. */}
      <div className="break-inside-avoid">
        <div className={`flex items-center gap-2 font-hj-mono text-[13px] font-medium ${c.current ? 'text-hj-green-deep' : 'text-hj-muted'}`}>
          {c.current && <span aria-hidden className="w-[7px] h-[7px] rounded-[1px] rotate-45 bg-hj-green flex-none" />}
          {c.period}
        </div>
        <div className="flex items-baseline gap-2.5 flex-wrap mt-1.5">
          <h3 className="font-hj-serif text-[21px] font-semibold tracking-[-0.01em] text-hj-fg">{c.company}</h3>
          <span className="font-hj-serif text-[13.5px] text-hj-muted">{c.product}</span>
        </div>
        <div className="font-hj-serif text-[13.5px] font-medium text-hj-fg-secondary mt-1">{c.role}</div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {c.stack.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
      {/* 각 성과 항목은 break-inside-avoid로 통째 유지 → 페이지 상단엔 항상 온전한 항목이 와서
          print:pt(상단 간격)가 확실히 먹고, 안 들어가 다음 장으로 밀리면 이전 페이지 하단에
          자연스러운 여백이 남는다. @page margin:0(머리글/바닥글 없음)에서 페이지 넘김 위/아래
          간격을 얻는 방법. print:gap-0으로 화면 gap과 print 간격(pt)이 겹치지 않게 한다. */}
      <ul className="list-none mt-3.5 p-0 flex flex-col gap-[11px] print:gap-0">
        {c.highlights.map((h) => (
          <li key={h.head} className="grid grid-cols-[auto_1fr] gap-2.5 break-inside-avoid print:pt-[14px]">
            <span aria-hidden className="w-[5px] h-[5px] mt-[7px] rounded-[1px] bg-hj-blue rotate-45 flex-none" />
            <div>
              <div className="font-hj-serif text-[14.5px] font-semibold leading-[1.45] text-hj-fg break-after-avoid">{h.head}</div>
              <ul className="list-none mt-1.5 p-0 flex flex-col gap-[3px]">
                {h.points.map((pt, i) => (
                  <li key={i} className="grid grid-cols-[auto_1fr] gap-2 font-hj-serif text-[13.5px] leading-[1.55] text-hj-fg-secondary break-inside-avoid">
                    <span aria-hidden className="text-hj-faint">–</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              {h.results && h.results.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-[7px] mt-2.5 break-inside-avoid">
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

/* 이력서용 사이드 프로젝트 — Obsidian 커리어 볼트 기준. 제목=프로젝트명, 그 아래
   "무엇인지" 한 줄 + 실제로 한 일 불릿 + 스택. 왼쪽 레일 없이 전체폭(경력 하이라이트와
   같은 대시 불릿 리듬). loa-map-generator는 samra-mansang 불릿에 흡수. */
type ResumeSide = { name: string; meta: string; what: string; points: string[]; stack: string[]; repo?: string };
const RESUME_SIDE: ResumeSide[] = [
  {
    name: 'samra-mansang',
    meta: '풀스택 · 178커밋 · 단독',
    what: '로스트아크 업적 추적·관리 + 공략 위키 웹 서비스 (Next.js·NestJS 모노레포).',
    points: [
      'OCR로 업적 데이터를 일괄 등록하고, Leaflet 맵에 위치 마커·추가요청, TipTap 공략 위키까지 풀스택 단독 구현',
      'PC 화면을 캡처해 WebRTC로 폰에 맵 데이터를 실시간 전송하는 게임 컴패니언 — 차별 기능',
      '맵 타일은 직접 만든 OpenCV 도구 loa-map-generator로 지형만 추출 (flood-fill 세그멘테이션 — "안쪽 말고 바깥을 지운다")',
    ],
    stack: ['Next.js', 'NestJS · Prisma', 'Leaflet', 'WebRTC', 'OpenCV'],
  },
  {
    name: 'afk',
    meta: 'macOS 유틸 · 단독 · Homebrew 배포',
    what: 'Claude Code 작업 상태를 감지해 앱 포커스를 자동 전환하는 macOS 메뉴바 앱.',
    points: [
      'AI가 작업하는 동안 break 앱(Safari·YouTube)으로 전환하고, 끝나면 알림·자동 복귀로 코딩 앱에 돌아온다',
      'Xcode 없이 Command Line Tools + SPM만으로 SwiftUI(MenuBarExtra) 앱을 빌드, Homebrew Tap으로 배포',
      '서명 없는 앱의 알림 제약을 borderless NSWindow + .screenSaver 레벨 플로팅 배너로 우회',
    ],
    stack: ['Swift', 'SwiftUI', 'SPM', 'Homebrew'],
    repo: 'https://github.com/H8njo/afk',
  },
  {
    name: 'webgl-black-hole',
    meta: '그래픽스 · 단독',
    what: 'WebGL 프래그먼트 셰이더로 블랙홀 중력렌즈 왜곡을 실시간 렌더링하는 그래픽스 프로젝트.',
    points: [
      'Canvas 2D로 별 8,000~10,000개를 절차 생성해 매 프레임 텍스처로 업로드하는 2-레이어 합성',
      '종횡비 보정 → 거리 → radius falloff → UV 회전 왜곡까지 셰이더 한 장에 직접 작성 (그래픽 라이브러리 없이)',
    ],
    stack: ['WebGL 1.0', 'GLSL', 'Canvas 2D', 'React'],
    repo: 'https://github.com/H8njo/webgl-black-hole',
  },
];

/* 이력서 사이드 프로젝트 항목 — 제목(프로젝트명)+메타+무엇인지 한 줄+한 일 불릿+스택.
   경력 하이라이트와 같은 대시 불릿, 왼쪽 레일 없이 전체폭. */
function ResumeSideProject({ p, first }: { p: ResumeSide; first?: boolean }) {
  return (
    <section className={`break-inside-avoid ${first ? '' : 'pt-4 border-t border-hj-line'}`}>
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <h3 className="font-hj-serif text-[16px] font-semibold tracking-[-0.01em] text-hj-fg">{p.name}</h3>
        <span className="font-hj-mono text-[11.5px] text-hj-muted">{p.meta}</span>
        {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="font-hj-mono text-[11.5px] text-hj-blue-deep">github ↗</a>}
      </div>
      <p className="font-hj-serif text-[13.5px] font-medium leading-[1.55] text-hj-fg mt-1.5">{p.what}</p>
      <ul className="list-none m-0 p-0 mt-2 flex flex-col gap-1">
        {p.points.map((pt, i) => (
          <li key={i} className="grid grid-cols-[auto_1fr] gap-2 font-hj-serif text-[13px] leading-[1.55] text-hj-fg-secondary">
            <span aria-hidden className="text-hj-faint">–</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
      </div>
    </section>
  );
}

/* ---- 이력서: 회사 위주로 읽는 CV --------------------------------------- */
/* 위계 순서: 요약 → 경력 → 역량 → 학력. 7년차 시니어이므로 경력이 1순위 — 첫 페이지가
   경력으로 시작하고, 학력(2012~2013)은 맨 뒤로. 강제 페이지 분할 없이 흐르게 두되
   회사/하이라이트 단위만 안 쪼개지게 해 빈 페이지를 없앤다. */
export function Resume() {
  return (
    <DocShell tab="이력서">
      <ResumeHeader />
      <DocSection label="주도성 · 제품 오너십"><ClaimSection data={resumeOwnership} /></DocSection>
      <DocSection label="팀 리딩 · 개발 문화"><ClaimSection data={resumeLeadership} /></DocSection>
      <DocSection label="경력 기술" flow breakBefore>
        <div className="flex flex-col gap-2">
          {resumeExperience.map((c, i) => (
            <ExperienceBlock key={c.company} c={c} first={i === 0} />
          ))}
        </div>
      </DocSection>
      <DocSection label="사이드 프로젝트" flow>
        <div className="flex flex-col gap-4">
          {RESUME_SIDE.map((p, i) => <ResumeSideProject key={p.name} p={p} first={i === 0} />)}
        </div>
      </DocSection>
      <DocSection label="핵심 역량" flow><ResumeSkills /></DocSection>
      <DocSection label="학력 · 교육"><Education /></DocSection>
    </DocShell>
  );
}

/* 사이드 프로젝트 카드 — 라이브 렌더가 없는 개인 프로젝트(사만·afk)용. note는
   접힌 곁가지(사만의 loa-map-generator 등)를 헤어라인 인용으로 흘린다. */
function SideProjectCard({ p }: { p: (typeof sideProjects)[number] }) {
  return (
    <div className="border border-hj-line rounded-hj-lg p-[18px] break-inside-avoid flex flex-col">
      <div className="font-hj-mono text-[10.5px] tracking-[0.1em] uppercase text-hj-muted">{p.label}</div>
      <div className="flex items-baseline gap-2 flex-wrap mt-2">
        <h3 className="font-hj-serif text-[16px] font-semibold tracking-[-0.01em] leading-[1.25] text-hj-fg">{p.title}</h3>
        {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="font-hj-mono text-[11px] text-hj-blue-deep whitespace-nowrap">github ↗</a>}
      </div>
      <p className="font-hj-serif text-[13px] leading-[1.55] text-hj-fg-secondary mt-2 max-w-[62ch]">{p.body}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
        {p.stats.map(([k, v]) => (
          <div key={k}><span className="font-hj-mono text-[10.5px] text-hj-muted">{k} · </span><span className="font-hj-mono text-[12.5px] font-semibold text-hj-fg">{v}</span></div>
        ))}
      </div>
      {p.note && (
        <p className="font-hj-serif text-[12px] leading-[1.5] text-hj-muted mt-3 border-l-2 border-hj-line pl-2.5 max-w-[64ch]">{p.note}</p>
      )}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  );
}

/* ---- 포트폴리오 PDF: the whole portfolio as one document ----------------- */
/* 정보 구조는 홈과 같은 순서: Hero → 대표 임팩트 → 대표 프로젝트(플래그십 먼저) →
   사이드 → 경력 → 전문 영역. 강제 페이지 분할 없이 흐르게 조판해 빈 페이지를 없앤다
   (— 측정-우선 조판이 문서 자체로 증명되게). 오픈소스는 플래그십에 흡수. */
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

      {/* 경력 개요를 임팩트 바로 뒤에 둬 1페이지를 "정체성"으로 채우고, 대표 프로젝트가
          다음 페이지를 깨끗이 시작하게 한다(빈 페이지 방지 + 정체성→깊이 흐름). */}
      <DocSection label="경력"><CareerList /></DocSection>

      <DocSection label="대표 프로젝트" flow>
        <FlagshipBlock />
        {PROJECTS.map((p) => <ProjectBlock key={p.title} p={p} />)}
      </DocSection>

      <DocSection label="사이드 프로젝트" flow>
        {/* 블랙홀 — 라이브 WebGL 렌더가 있는 대표 사이드 프로젝트 */}
        <div className="grid grid-cols-[1fr_0.82fr] gap-6 items-stretch break-inside-avoid max-[720px]:grid-cols-1">
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
        {/* 그 외 개인 프로젝트 — 사만(+loa-map-generator), afk */}
        <div className="grid grid-cols-2 gap-4 mt-5 max-[720px]:grid-cols-1">
          {sideProjects.map((p) => <SideProjectCard key={p.title} p={p} />)}
        </div>
      </DocSection>

      <DocSection label="전문 영역"><Skills /></DocSection>
    </DocShell>
  );
}
