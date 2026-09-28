"use client";

import type { ReactNode } from 'react';
import { Tag } from './components';
import { profile, education } from './content';
import type { ExpCompany } from './content';
import {
  tossResumeSummary,
  tossResumeAbstraction,
  tossResumePerformance,
  tossResumeProactive,
  tossResumeSkills,
  tossResumeExperience,
  tossResumeSide,
} from './toss-content';

const portrait = '/hoonjo/portrait.jpg';

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

function DocSection({ label, flow, breakBefore, children }: { label: string; flow?: boolean; breakBefore?: boolean; children: ReactNode }) {
  const topPad = breakBefore ? 'print:pt-[14mm]' : 'print:pt-[18px]';
  return (
    <section className={`mt-[22px] print:mt-0 ${topPad} ${flow ? '' : 'break-inside-avoid'} ${breakBefore ? 'print:break-before-page' : ''}`}>
      <h2 className="font-hj-mono text-[11.5px] tracking-[0.12em] uppercase text-hj-muted mt-0 mb-2.5 pb-1.5 border-b border-hj-line break-after-avoid">{label}</h2>
      {children}
    </section>
  );
}

function ClaimSection({ data }: { data: { claim: string; items: { at: string; t: string }[] } }) {
  return (
    <div>
      <p className="font-hj-serif text-[13.5px] font-semibold leading-[1.45] text-hj-fg max-w-[74ch]">{data.claim}</p>
      <ul className="list-none m-0 p-0 mt-2 flex flex-col gap-2">
        {data.items.map((it) => (
          <li key={it.at} className="grid grid-cols-[160px_1fr] gap-3 items-baseline break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-0.5">
            <span className="font-hj-mono text-[11.5px] font-medium text-hj-blue-deep pt-[2px]">{it.at}</span>
            <span className="font-hj-serif text-[13px] leading-[1.5] text-hj-fg-secondary">{it.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TossResumeHeader() {
  return (
    <header className="pb-4 border-b-2 border-hj-fg break-inside-avoid">
      <div className="flex gap-[26px] items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="font-hj-serif text-[30px] font-bold tracking-[-0.02em] text-hj-fg">{profile.nameKo}</h1>
            <span className="font-hj-mono text-[13px] text-hj-muted">{profile.name}</span>
          </div>
          <div className="font-hj-serif text-[15px] font-medium text-hj-fg-secondary mt-1">{profile.role} · Frontend Developer</div>
          <div className="flex flex-wrap gap-x-[18px] gap-y-1 mt-2.5 font-hj-mono text-[11.5px] text-hj-muted">
            <a href={`mailto:${profile.email}`} className="text-hj-blue-deep">{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.githubHandle}</a>
            <a href={profile.portfolio} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.portfolioLabel}</a>
            <a href={profile.blog} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.blogLabel}</a>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} alt={profile.nameKo} className="flex-none w-[96px] h-[116px] object-cover object-[center_22%] rounded-hj-lg border border-hj-line" />
      </div>
      <div className="mt-3 flex flex-col gap-1.5 max-w-[72ch]">
        {tossResumeSummary.filter((line) => line.kind !== 'lead').map((line, i) => {
          if (line.kind === 'close') {
            const m = line.t.match(/^(.*?토스증권에서),\s*(.*)$/);
            if (m) {
              const [, pre, post] = m;
              return (
                <p key={i} className="font-hj-serif text-[13.5px] leading-[1.5] mt-1">
                  <span className="text-hj-fg-secondary font-normal">{pre}, </span>
                  <span className="text-hj-fg font-semibold">{post}</span>
                </p>
              );
            }
            return (
              <p key={i} className="font-hj-serif text-[13.5px] leading-[1.5] mt-1">
                <span className="text-hj-fg font-medium">{line.t}</span>
              </p>
            );
          }
          const sizeCls = line.kind === 'hook' ? 'text-[16px]' : 'text-[13.5px]';
          const weightCls = line.kind === 'body' ? 'font-normal' : 'font-bold';
          const colorCls = line.kind === 'body' ? 'text-hj-fg-secondary' : 'text-hj-fg';
          return (
            <p key={i} className={`font-hj-serif leading-[1.45] ${line.kind === 'hook' ? 'tracking-[-0.01em]' : ''} ${sizeCls} ${weightCls} ${colorCls}`}>{line.t}</p>
          );
        })}
      </div>
    </header>
  );
}

function TossResumeSkills() {
  return (
    <div className="flex flex-col gap-3.5">
      {tossResumeSkills.map((s) => (
        <div key={s.label} className="grid grid-cols-[150px_1fr] gap-3.5 items-start break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-1">
          <div className="font-hj-serif text-[13.5px] font-semibold text-hj-fg pt-0.5 break-keep">{s.label}</div>
          <div className="flex flex-wrap gap-1.5">
            {s.items.map((it) => <Tag key={it}>{it}</Tag>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function getCaseLink(head: string): { label: string; href: string } | null {
  if (head.includes('3계층 아키텍처')) return { label: '케이스 스터디: 다단 레이아웃 엔진', href: '/work/column-count-layout' };
  if (head.includes('column-pager')) return { label: '케이스 스터디: 다단 레이아웃 엔진', href: '/work/column-count-layout' };
  if (head.includes('Delta2')) return { label: '케이스 스터디: Delta2 초고속 검수', href: '/work/delta2' };
  if (head.includes('디자인 시스템')) return { label: '케이스 스터디: 디자인 시스템 & 코드젠', href: '/work/design-system' };
  if (head.includes('300p')) return { label: '케이스 스터디: 대용량 PDF 488배 가속', href: '/work/pdf-memory' };
  if (head.includes('위저드')) return { label: '케이스 스터디: 주문제작 단일폼 전환', href: '/work/pod-order-flow' };
  if (head.includes('Playground')) return { label: '케이스 스터디: PDF Playground', href: '/work/pdf-playground' };
  if (head.includes('에러 핸들링')) return { label: '케이스 스터디: 계층형 에러 아키텍처', href: '/work/frontend-error-handling' };
  if (head.includes('DDD')) return { label: '케이스 스터디: 프론트엔드 DDD 제거', href: '/work/frontend-ddd-removal' };
  if (head.includes('59개 화면')) return { label: '케이스 스터디: 59개 메타데이터 화면', href: '/work/security-portal' };
  if (head.includes('ML')) return { label: '케이스 스터디: KISTI AI 관제', href: '/work/security-ai' };
  if (head.includes('EDR')) return { label: '케이스 스터디: BFF 보안 경계', href: '/work/edr-portal' };
  if (head.includes('줄 지도')) return { label: '케이스 스터디: 문장분석 실측 에디터', href: '/work/problem-editor' };
  return null;
}

function ExperienceBlock({ c, first = false }: { c: ExpCompany; first?: boolean }) {
  return (
    <section className={`${first ? 'pt-1' : 'pt-[22px] border-t border-hj-line'}`}>
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
      <ul className="list-none mt-3.5 p-0 flex flex-col gap-[11px] print:gap-0">
        {c.highlights.map((h) => {
          const caseLink = getCaseLink(h.head);
          return (
            <li key={h.head} className="grid grid-cols-[auto_1fr] gap-2.5 break-inside-avoid print:pt-[14px]">
              <span aria-hidden className="w-[5px] h-[5px] mt-[7px] rounded-[1px] bg-hj-blue rotate-45 flex-none" />
              <div>
                <div className="flex items-baseline justify-between gap-2 flex-wrap break-after-avoid">
                  <span className="font-hj-serif text-[14.5px] font-semibold leading-[1.45] text-hj-fg">{h.head}</span>
                  {caseLink && (
                    <a
                      href={caseLink.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-hj-mono text-[11px] text-hj-blue-deep no-underline hover:underline print:hidden"
                    >
                      {caseLink.label} ↗
                    </a>
                  )}
                </div>
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
          );
        })}
      </ul>
    </section>
  );
}

function TossSideProject({ p, first }: { p: (typeof tossResumeSide)[number]; first?: boolean }) {
  return (
    <section className={`break-inside-avoid ${first ? '' : 'pt-4 border-t border-hj-line'}`}>
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <h3 className="font-hj-serif text-[16px] font-semibold tracking-[-0.01em] text-hj-fg">{p.name}</h3>
        <span className="font-hj-mono text-[11.5px] text-hj-muted">{p.meta}</span>
        {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="font-hj-mono text-[11.5px] text-hj-blue-deep">github ↗</a>}
        {'caseUrl' in p && p.caseUrl && (
          <a href={p.caseUrl as string} target="_blank" rel="noreferrer" className="font-hj-mono text-[11.5px] text-hj-blue-deep print:hidden">
            케이스 스터디 ↗
          </a>
        )}
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

export function TossResume() {
  return (
    <DocShell tab="이력서 · 토스증권">
      <TossResumeHeader />
      <DocSection label="아키텍처 추상화 · 복잡한 문제의 단순화"><ClaimSection data={tossResumeAbstraction} /></DocSection>
      <DocSection label="렌더링 성능 최적화 · 실시간성 & 메모리 제어"><ClaimSection data={tossResumePerformance} /></DocSection>
      <DocSection label="주도적 문제 정의 · 백오피스 & 비즈니스 임팩트"><ClaimSection data={tossResumeProactive} /></DocSection>
      <DocSection label="경력 기술" flow>
        <div className="flex flex-col gap-2">
          {tossResumeExperience.map((c, i) => (
            <ExperienceBlock key={c.company} c={c} first={i === 0} />
          ))}
        </div>
      </DocSection>
      <DocSection label="사이드 프로젝트 & 오픈소스" flow>
        <div className="flex flex-col gap-4">
          {tossResumeSide.map((p, i) => (
            <TossSideProject key={p.name} p={p} first={i === 0} />
          ))}
        </div>
      </DocSection>
      <DocSection label="핵심 역량" flow breakBefore><TossResumeSkills /></DocSection>
      <DocSection label="학력 · 교육"><Education /></DocSection>
    </DocShell>
  );
}

