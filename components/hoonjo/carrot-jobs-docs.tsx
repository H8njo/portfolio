"use client";

import { useState, type ReactNode } from 'react';
import { Tag } from './components';
import { profile, education } from './content';
import type { ExpCompany } from './content';
import {
  carrotJobsExecutiveImpact,
  carrotJobsResumeSummary,
  carrotJobsResumeSkills,
  carrotJobsResumeExperience,
  carrotJobsResumeSide,
  carrotJobsPreScreeningAnswers,
} from './carrot-jobs-content';

const portrait = '/hoonjo/portrait.jpg';

/* ---- shared shell ------------------------------------------------------- */
function DocShell({ tab, children }: { tab: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-hj-cloud [print-color-adjust:exact] [-webkit-print-color-adjust:exact] print:bg-white print:min-h-0">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 h-14 px-5 bg-[rgba(255,255,255,0.85)] backdrop-blur-[10px] backdrop-saturate-[1.8] border-b border-hj-line print:hidden">
        <div className="flex items-center gap-4">
          <a className="inline-flex items-center gap-[7px] font-hj-serif text-[14px] text-hj-fg-secondary no-underline transition-colors duration-150 hover:text-hj-fg" href="/">
            <span aria-hidden className="font-hj-mono">←</span> 포트폴리오로
          </a>
          <span className="text-hj-line">|</span>
          <a className="font-hj-serif text-[13px] text-hj-muted hover:text-hj-fg no-underline" href="/resume/carrot">
            레슨/과외팀 이력서 보기
          </a>
        </div>
        <span className="font-hj-mono text-[12px] tracking-[0.1em] uppercase text-hj-muted max-[720px]:hidden">{tab}</span>
        <button type="button" className="font-hj-serif text-[13px] font-semibold text-white bg-hj-blue border-0 rounded-hj-button px-4 py-[9px] cursor-pointer transition-colors duration-150 hover:bg-hj-blue-hover" onClick={() => window.print()}>
          인쇄 · PDF 저장
        </button>
      </header>
      <article className="max-w-[820px] mx-auto my-10 bg-hj-paper border border-hj-line rounded-hj-lg shadow-hj-soft p-[clamp(32px,5vw,60px)] print:max-w-none print:m-0 print:border-0 print:rounded-none print:shadow-none print:p-[12mm_13mm]">{children}</article>
    </div>
  );
}

function DocSection({ label, flow, breakBefore, children }: { label: string; flow?: boolean; breakBefore?: boolean; children: ReactNode }) {
  const topPad = breakBefore ? 'print:pt-[7mm]' : 'print:pt-[8px]';
  return (
    <section
      style={breakBefore ? { breakBefore: 'page', pageBreakBefore: 'always' } : undefined}
      className={`mt-[36px] print:mt-0 ${topPad} ${flow ? '' : 'break-inside-avoid'} ${breakBefore ? 'print:break-before-page' : ''}`}
    >
      <h2 className="font-hj-mono text-[11px] tracking-[0.12em] uppercase text-hj-muted mt-0 mb-3.5 pb-2 print:mb-1.5 print:pb-1 border-b border-hj-line break-after-avoid">{label}</h2>
      {children}
    </section>
  );
}

/* ── 1페이지: 당근 로컬 잡스 맞춤 4대 핵심 엔지니어링 임팩트 ── */
function ExecutiveImpactGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 my-4 print:my-2.5 print:gap-2 max-[600px]:grid-cols-1">
      {carrotJobsExecutiveImpact.map((item) => (
        <div key={item.title} className="p-3 bg-hj-cloud border border-hj-line rounded-hj-md flex flex-col justify-between break-inside-avoid print:p-2.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-hj-mono text-[10px] font-semibold tracking-[0.08em] text-hj-muted uppercase">{item.tag}</div>
              <div className="font-hj-serif text-[16.5px] font-bold text-hj-fg tracking-[-0.01em] mt-0.5">{item.metric}</div>
            </div>
            <span className="font-hj-mono text-[9.5px] font-medium text-hj-blue-deep bg-white border border-hj-line rounded-hj-xs px-1.5 py-0.5 whitespace-nowrap self-start">
              {item.sub}
            </span>
          </div>
          <div className="mt-1.5">
            <h4 className="font-hj-serif text-[12.5px] font-semibold text-hj-fg">{item.title}</h4>
            <p className="font-hj-serif text-[11.5px] leading-[1.4] text-hj-fg-secondary mt-0.5">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 1페이지: 프로필 헤더 + 요약 ── */
function CarrotJobsResumeHeader() {
  return (
    <header className="pb-5 border-b-2 border-hj-fg break-inside-avoid print:pb-3.5">
      <div className="flex gap-[18px] items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <h1 className="font-hj-serif text-[26px] font-bold tracking-[-0.02em] text-hj-fg">{profile.nameKo}</h1>
            <span className="font-hj-mono text-[12px] text-hj-muted">{profile.name}</span>
          </div>
          <div className="font-hj-serif text-[14px] font-medium text-hj-fg-secondary mt-1">{profile.role} · 웹 프론트엔드</div>
          <div className="flex flex-wrap gap-x-[16px] gap-y-1 mt-1.5 font-hj-mono text-[11px] text-hj-muted">
            <a href={`mailto:${profile.email}`} className="text-hj-blue-deep">{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.githubHandle}</a>
            <a href={profile.portfolio} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.portfolioLabel}</a>
            <a href={profile.blog} target="_blank" rel="noreferrer" className="text-hj-blue-deep">{profile.blogLabel}</a>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} alt={profile.nameKo} className="flex-none w-[76px] h-[92px] object-cover object-[center_22%] rounded-hj-lg border border-hj-line" />
      </div>

      {/* 1페이지 메인 훅: 4대 핵심 임팩트 */}
      <ExecutiveImpactGrid />

      {/* 압축 요약문 */}
      <div className="mt-3.5 flex flex-col gap-1.5">
        {carrotJobsResumeSummary.filter((line) => line.kind !== 'lead').map((line, i) => {
          if (line.kind === 'close') {
            return (
              <p key={i} className="font-hj-serif text-[12px] leading-[1.5] text-hj-fg font-medium mt-0.5">
                {line.t}
              </p>
            );
          }
          const sizeCls = line.kind === 'hook' ? 'text-[12.8px]' : 'text-[12px]';
          const weightCls = line.kind === 'hook' ? 'font-semibold' : 'font-normal';
          const colorCls = line.kind === 'hook' ? 'text-hj-fg' : 'text-hj-fg-secondary';
          return (
            <p key={i} className={`font-hj-serif leading-[1.5] ${sizeCls} ${weightCls} ${colorCls}`}>{line.t}</p>
          );
        })}
      </div>
    </header>
  );
}

function CarrotJobsResumeSkills() {
  return (
    <div className="grid grid-cols-1 gap-3.5 print:grid-cols-2 print:gap-x-5 print:gap-y-1">
      {carrotJobsResumeSkills.map((s) => (
        <div key={s.label} className="break-inside-avoid">
          <div className="font-hj-serif text-[11px] font-semibold text-hj-fg mb-1">{s.label}</div>
          <div className="flex flex-wrap gap-1">
            {s.items.map((it) => <Tag key={it}>{it}</Tag>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function getCaseLink(head: string): { label: string; href: string } | null {
  if (head.includes('Delta2') || head.includes('검수 콘솔')) return { label: '케이스: Delta2 초고속 검수', href: '/work/delta2' };
  if (head.includes('디자인 시스템')) return { label: '케이스: 디자인 시스템 & 코드젠', href: '/work/design-system' };
  if (head.includes('column-pager')) return { label: '케이스: 다단 레이아웃 엔진', href: '/work/column-count-layout' };
  if (head.includes('위저드') || head.includes('주문제작') || head.includes('퍼널') || head.includes('단일폼') || head.includes('지불')) return { label: '케이스: 주문 퍼널 단일폼 전환', href: '/work/pod-order-flow' };
  if (head.includes('CLAUDE.md') || head.includes('PR 리뷰') || head.includes('하네스') || head.includes('린트')) return { label: '케이스: 컨벤션 & 리뷰 툴링', href: '/work/expert-conventions' };
  if (head.includes('300p') || head.includes('튜터 뷰어')) return { label: '케이스: 대용량 PDF 488배 가속', href: '/work/pdf-memory' };
  if (head.includes('에러 핸들링')) return { label: '케이스: 계층형 에러 아키텍처', href: '/work/frontend-error-handling' };
  if (head.includes('DDD')) return { label: '케이스: 프론트엔드 DDD 제거', href: '/work/frontend-ddd-removal' };
  if (head.includes('59개 화면') || head.includes('GraphQL')) return { label: '케이스: 59개 메타데이터 화면', href: '/work/security-portal' };
  if (head.includes('ML')) return { label: '케이스: KISTI AI 관제', href: '/work/security-ai' };
  if (head.includes('EDR') || head.includes('BFF')) return { label: '케이스: BFF 보안 경계', href: '/work/edr-portal' };
  return null;
}

function ExperienceBlock({ c, first = false }: { c: ExpCompany; first?: boolean }) {
  const isCompact = c.highlights.length <= 1;
  return (
    <section className={`${first ? 'pt-1' : 'pt-7 mt-7 border-t border-hj-line print:pt-3.5 print:mt-3'} ${isCompact ? 'break-inside-avoid print:break-inside-avoid' : ''}`}>
      <div className="break-inside-avoid break-after-avoid print:break-after-avoid">
        <div className={`flex items-center gap-2 font-hj-mono text-[11.5px] font-medium ${c.current ? 'text-hj-green-deep' : 'text-hj-muted'}`}>
          {c.current && <span aria-hidden className="w-[6px] h-[6px] rounded-[1px] rotate-45 bg-hj-green flex-none" />}
          {c.period}
        </div>
        <div className="flex items-baseline gap-2 flex-wrap mt-0.5">
          <h3 className="font-hj-serif text-[16.5px] font-semibold tracking-[-0.01em] text-hj-fg">{c.company}</h3>
          <span className="font-hj-serif text-[11.5px] text-hj-muted">{c.product}</span>
        </div>
        <div className="font-hj-serif text-[11.5px] font-medium text-hj-fg-secondary mt-0.5">{c.role}</div>
        <div className="flex flex-wrap gap-1 mt-1.5 print:mt-1">
          {c.stack.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
      <ul className="list-none mt-4 p-0 flex flex-col gap-5 print:mt-2 print:gap-2.5">
        {c.highlights.map((h, hIdx) => {
          const caseLink = getCaseLink(h.head);
          return (
            <li key={h.head} className={`grid grid-cols-[auto_1fr] gap-2.5 break-inside-avoid print:pt-[1px] ${hIdx === 0 ? 'break-before-avoid print:break-before-avoid' : ''}`}>
              <span aria-hidden className="w-[4.5px] h-[4.5px] mt-[6px] rounded-[1px] bg-hj-blue rotate-45 flex-none" />
              <div>
                <div className="flex items-baseline justify-between gap-2 flex-wrap break-after-avoid">
                  <span className="font-hj-serif text-[13px] font-semibold leading-[1.35] text-hj-fg">{h.head}</span>
                  {caseLink && (
                    <a
                      href={caseLink.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-hj-mono text-[10px] text-hj-blue-deep no-underline hover:underline whitespace-nowrap print:hidden"
                    >
                      {caseLink.label} ↗
                    </a>
                  )}
                </div>
                <ul className="list-none m-0 p-0 mt-1.5 flex flex-col gap-1 print:mt-1 print:gap-0.5">
                  {h.points.map((pt, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-1.5 font-hj-serif text-[11.5px] leading-[1.48] print:leading-[1.42] text-hj-fg-secondary">
                      <span aria-hidden className="text-hj-faint select-none">–</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                {h.results && h.results.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 print:mt-1 break-inside-avoid">
                    <span className="inline-flex items-center gap-1 font-hj-mono text-[9px] font-semibold tracking-[0.12em] uppercase text-hj-green-deep">
                      <span aria-hidden className="w-[4px] h-[4px] rotate-45 bg-hj-green flex-none" />
                      성과
                    </span>
                    {h.results.map((r) => (
                      <span key={r} className="font-hj-serif text-[10.5px] font-semibold text-hj-fg bg-hj-cloud border border-hj-line rounded-hj-xs px-1.5 py-0.5 leading-[1.2]">{r}</span>
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

function CarrotJobsSideProject({ p, first }: { p: (typeof carrotJobsResumeSide)[number]; first?: boolean }) {
  return (
    <section className={`break-inside-avoid ${first ? 'pt-1' : 'pt-4 print:pt-1.5 border-t border-hj-line'}`}>
      <div className="flex items-baseline gap-2 flex-wrap">
        <h3 className="font-hj-serif text-[13.5px] font-semibold tracking-[-0.01em] text-hj-fg">{p.name}</h3>
        <span className="font-hj-mono text-[10px] text-hj-muted">{p.meta}</span>
        {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="font-hj-mono text-[10px] text-hj-blue-deep">github ↗</a>}
        {'caseUrl' in p && p.caseUrl && (
          <a href={p.caseUrl as string} target="_blank" rel="noreferrer" className="font-hj-mono text-[10px] text-hj-blue-deep print:hidden">
            케이스 스터디 ↗
          </a>
        )}
      </div>
      <p className="font-hj-serif text-[11.5px] font-medium leading-[1.4] text-hj-fg mt-1 print:mt-0.5">{p.what}</p>
      <ul className="list-none m-0 p-0 mt-1 flex flex-col gap-0.5 print:mt-0.5">
        {p.points.map((pt, i) => (
          <li key={i} className="grid grid-cols-[auto_1fr] gap-1.5 font-hj-serif text-[11.2px] leading-[1.4] text-hj-fg-secondary">
            <span aria-hidden className="text-hj-faint">–</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1 mt-2 print:mt-0.5">
        {p.stack.map((s) => <Tag key={s}>{s}</Tag>)}
      </div>
    </section>
  );
}

function Education() {
  return (
    <div className="flex flex-col gap-3 print:gap-1">
      {education.map((e) => (
        <div key={e.school} className="grid grid-cols-[120px_1fr] gap-3 print:gap-1 break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-0.5">
          <div className="font-hj-mono text-[11px] text-hj-muted pt-0.5">{e.period}</div>
          <div>
            <div className="font-hj-serif text-[12.5px] font-semibold text-hj-fg">{e.school}</div>
            <div className="font-hj-serif text-[11.2px] text-hj-fg-secondary mt-[1px]">{e.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── 🥕 웹 전용: 당근 로컬잡스 서류 사전 질문 3문항 답변 가이드 모달/블록 ── */
function PreScreeningAnswersSection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="mt-12 p-6 bg-[#fffaf5] border-2 border-[#ff6f0f]/30 rounded-hj-lg print:hidden">
      <div className="flex items-center justify-between gap-3 flex-wrap pb-3 border-b border-[#ff6f0f]/20">
        <div className="flex items-center gap-2">
          <span className="text-[18px]">🥕</span>
          <h3 className="font-hj-serif text-[15px] font-bold text-[#d85800]">
            당근 로컬 잡스 서류 전형 필수 3대 사전 질문 모범 답변
          </h3>
        </div>
        <span className="font-hj-mono text-[11px] text-hj-muted bg-white border border-[#ff6f0f]/20 rounded-hj-xs px-2 py-0.5">
          지원서 제출 폼에 바로 복사하여 활용하세요
        </span>
      </div>

      <div className="flex flex-col gap-6 mt-5">
        {carrotJobsPreScreeningAnswers.map((item, idx) => {
          const fullText = `[질문: ${item.question}]\n\n${item.paragraphs.join('\n\n')}`;
          const isCopied = copiedIndex === idx;

          return (
            <div key={item.questionNumber} className="bg-white border border-[#ff6f0f]/15 rounded-hj-md p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-hj-mono text-[12px] font-bold text-[#ff6f0f] bg-[#fff5ee] rounded px-1.5 py-0.5">
                    Q{item.questionNumber}
                  </span>
                  <h4 className="font-hj-serif text-[13.5px] font-bold text-hj-fg">
                    {item.question}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(item.paragraphs.join('\n\n'), idx)}
                  className={`font-hj-mono text-[11px] font-medium px-2.5 py-1 rounded transition-colors flex-none ${
                    isCopied
                      ? 'bg-hj-green text-white'
                      : 'bg-[#fff5ee] text-[#d85800] hover:bg-[#ffe8d6] border border-[#ff6f0f]/30'
                  }`}
                >
                  {isCopied ? '✓ 복사 완료' : '답변 복사'}
                </button>
              </div>

              <div className="mt-2 text-[11.5px] font-hj-serif font-medium text-[#d85800] bg-[#fffaf5] px-2.5 py-1.5 rounded">
                💡 핵심 포인트: {item.summary}
              </div>

              <div className="mt-3 flex flex-col gap-2 font-hj-serif text-[12px] leading-[1.55] text-hj-fg-secondary whitespace-pre-line">
                {item.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="m-0">{p}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CarrotJobsResume() {
  const bookipsExp = carrotJobsResumeExperience.filter((c) => c.company === 'Bookips');
  const pastAllExp = carrotJobsResumeExperience.filter((c) => c.company !== 'Bookips');

  return (
    <DocShell tab="이력서 · 당근 (로컬 잡스)">
      {/* ── Page 1: 10초 장악 프로필 & 4대 임팩트 & 주력 경력 (Bookips) ── */}
      <section className="break-inside-avoid">
        <CarrotJobsResumeHeader />
      </section>

      {/* ── Page 1 연속: 주력 마켓플레이스 & 결제 — (주)북아이피스 ── */}
      <DocSection label="경력 기술서 · (주)북아이피스 (Bookips)" flow>
        <div className="flex flex-col gap-2">
          {bookipsExp.map((c, i) => (
            <ExperienceBlock key={c.company} c={c} first={i === 0} />
          ))}
        </div>
      </DocSection>

      {/* ── Page 2: 튜터 플랫폼 & 엔터프라이즈 — 슬링, 지피다, 옐로오투오 ── */}
      <DocSection label="경력 기술서 · 주식회사슬링 · 주식회사지피다 · 옐로오투오" breakBefore flow>
        <div className="flex flex-col gap-2">
          {pastAllExp.map((c, i) => (
            <ExperienceBlock key={c.company} c={c} first={i === 0} />
          ))}
        </div>
      </DocSection>

      {/* ── Page 3: AI 에이전트 & 오픈소스 & 기술 역량 & 학력 ── */}
      <DocSection label="오픈소스 & 사이드 프로젝트 (AI 에이전트 & 하네스)" breakBefore flow>
        <div className="flex flex-col gap-4 print:gap-2">
          {carrotJobsResumeSide.map((p, i) => (
            <CarrotJobsSideProject key={p.name} p={p} first={i === 0} />
          ))}
        </div>
      </DocSection>

      <DocSection label="전문 기술 역량 상세 (당근 로컬잡스 맞춤 스택)" flow><CarrotJobsResumeSkills /></DocSection>
      <DocSection label="학력 · 교육" flow><Education /></DocSection>

      {/* ── 웹 전용: 당근 로컬잡스 서류 사전 질문 3문항 답변 가이드 ── */}
      <PreScreeningAnswersSection />
    </DocShell>
  );
}
