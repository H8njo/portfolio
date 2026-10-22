"use client";

import { useState, type ReactNode } from 'react';
import { Tag } from './components';
import { profile, education } from './content';
import type { ExpCompany } from './content';
import {
  tossPlaceResumeSummary,
  tossPlaceResumePaymentAndRuntime,
  tossPlaceResumeAbstractionAndSDK,
  tossPlaceResumeProactiveAndOps,
  tossPlaceResumeSkills,
  tossPlaceResumeExperience,
  tossPlaceResumeSide,
  tossPlaceDeepDiveQA,
} from './toss-place-content';

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
          <a className="font-hj-serif text-[13px] text-hj-muted hover:text-hj-fg no-underline" href="/resume/toss">
            토스증권 이력서 보기
          </a>
        </div>
        <span className="font-hj-mono text-[12px] tracking-[0.1em] uppercase text-hj-muted max-[720px]:hidden">{tab}</span>
        <button type="button" className="font-hj-serif text-[13px] font-semibold text-white bg-[#0064FF] border-0 rounded-hj-button px-4 py-[9px] cursor-pointer transition-colors duration-150 hover:bg-[#0052cc]" onClick={() => window.print()}>
          인쇄 · PDF 저장
        </button>
      </header>
      <article className="max-w-[820px] mx-auto my-8 bg-hj-paper border border-hj-line rounded-hj-lg shadow-hj-soft p-[clamp(28px,5vw,56px)] print:max-w-none print:m-0 print:border-0 print:rounded-none print:shadow-none print:p-[14mm_13mm]">{children}</article>
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
          <li key={it.at} className="grid grid-cols-[165px_1fr] gap-3 items-baseline break-inside-avoid max-[720px]:grid-cols-1 max-[720px]:gap-0.5">
            <span className="font-hj-mono text-[11.5px] font-medium text-[#0064FF] pt-[2px]">{it.at}</span>
            <span className="font-hj-serif text-[13px] leading-[1.5] text-hj-fg-secondary">{it.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── 10초 핵심 임팩트 4대 카드 (토스플레이스 JD 정밀 매핑) ── */
function ExecutiveImpactGrid() {
  const cards = [
    {
      category: '결제 무결성 & 가설 검증',
      badge: '데이터 유실 0건',
      title: '지불하는 제품의 결제 퍼널 최적화',
      desc: 'Mixpanel 퍼널 분석으로 마찰을 줄이는 가설을 검증하고, 브라우저 단 0.1초 즉시 견적 산출과 PG/장바구니 완벽 연동',
    },
    {
      category: '복잡한 도메인의 단순 추상화',
      badge: 'npm 오픈소스 배포',
      title: 'A4 다단 레이아웃 분할 엔진 (column-pager)',
      desc: '사내외 2년 미해결 난제를 [순수 계산/DOM 측정/선언적 렌더] 3계층으로 분리, 49개 Vitest 단위 테스트로 검증된 오픈소스화',
    },
    {
      category: '현장 병목 발굴 & 백오피스 혁신',
      badge: '검수량 8배 폭증',
      title: '현장 문제 발굴 B2B 초고속 콘솔 (Delta2)',
      desc: '검수 실무자의 반복 노가다를 직접 관찰해 AST 일괄 교정 마법봉과 5단계 단축키 큐를 갖춘 독립 SPA 자발적 기획·구현',
    },
    {
      category: '시스템 런타임 안정성 & 대시보드',
      badge: 'TTI 488배 가속',
      title: '대용량 뷰어 가속 & 59개 메타데이터 Table',
      desc: '캔버스 메모리 즉시 회수로 저사양 디바이스 브라우저 충돌을 차단하고, 컬럼 정의 1벌로 59개 관리자 화면을 2인으로 양산',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 my-4 print:my-3 print:gap-2 max-[640px]:grid-cols-1 break-inside-avoid">
      {cards.map((c) => (
        <div key={c.category} className="p-3 bg-[#f5f8ff] border border-[#d6e4ff] rounded-hj-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-1 text-[10px] font-hj-mono text-hj-muted mb-1">
              <span>{c.category}</span>
              <span className="text-[#0064FF] font-semibold bg-white border border-[#b3ccff] px-1.5 py-0.2 rounded-hj-xs">{c.badge}</span>
            </div>
            <div className="font-hj-serif text-[13px] font-bold text-hj-fg tracking-[-0.01em]">{c.title}</div>
            <div className="font-hj-serif text-[11px] leading-[1.4] text-hj-fg-secondary mt-1">{c.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TossPlaceResumeHeader() {
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
            <a href={`mailto:${profile.email}`} className="text-[#0064FF]">{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="text-[#0064FF]">{profile.githubHandle}</a>
            <a href={profile.portfolio} target="_blank" rel="noreferrer" className="text-[#0064FF]">{profile.portfolioLabel}</a>
            <a href={profile.blog} target="_blank" rel="noreferrer" className="text-[#0064FF]">{profile.blogLabel}</a>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} alt={profile.nameKo} className="flex-none w-[96px] h-[116px] object-cover object-[center_22%] rounded-hj-lg border border-hj-line" />
      </div>

      <ExecutiveImpactGrid />

      <div className="mt-3 flex flex-col gap-1.5 max-w-[72ch]">
        {tossPlaceResumeSummary.filter((line) => line.kind !== 'lead').map((line, i) => {
          if (line.kind === 'close') {
            const m = line.t.match(/^(.*?토스플레이스에서),\s*(.*)$/);
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
          const sizeCls = line.kind === 'hook' ? 'text-[15.5px]' : 'text-[13px]';
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

function TossPlaceResumeSkills() {
  return (
    <div className="flex flex-col gap-3.5">
      {tossPlaceResumeSkills.map((s) => (
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
  if (head.includes('3계층 아키텍처') || head.includes('column-pager')) return { label: '케이스 스터디: 다단 레이아웃 엔진', href: '/work/column-count-layout' };
  if (head.includes('Delta2')) return { label: '케이스 스터디: Delta2 초고속 검수', href: '/work/delta2' };
  if (head.includes('디자인 시스템')) return { label: '케이스 스터디: 디자인 시스템 & 코드젠', href: '/work/design-system' };
  if (head.includes('300p')) return { label: '케이스 스터디: 대용량 PDF 488배 가속', href: '/work/pdf-memory' };
  if (head.includes('위저드') || head.includes('주문제작')) return { label: '케이스 스터디: 주문제작 단일폼 전환', href: '/work/pod-order-flow' };
  if (head.includes('Playground')) return { label: '케이스 스터디: PDF Playground', href: '/work/pdf-playground' };
  if (head.includes('에러 핸들링')) return { label: '케이스 스터디: 계층형 에러 아키텍처', href: '/work/frontend-error-handling' };
  if (head.includes('DDD')) return { label: '케이스 스터디: 프론트엔드 DDD 제거', href: '/work/frontend-ddd-removal' };
  if (head.includes('59개 화면')) return { label: '케이스 스터디: 59개 메타데이터 화면', href: '/work/security-portal' };
  if (head.includes('ML')) return { label: '케이스 스터디: KISTI AI 관제', href: '/work/security-ai' };
  if (head.includes('EDR') || head.includes('BFF')) return { label: '케이스 스터디: BFF 보안 경계', href: '/work/edr-portal' };
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
              <span aria-hidden className="w-[5px] h-[5px] mt-[7px] rounded-[1px] bg-[#0064FF] rotate-45 flex-none" />
              <div>
                <div className="flex items-baseline justify-between gap-2 flex-wrap break-after-avoid">
                  <span className="font-hj-serif text-[14.5px] font-semibold leading-[1.45] text-hj-fg">{h.head}</span>
                  {caseLink && (
                    <a
                      href={caseLink.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-hj-mono text-[11px] text-[#0064FF] no-underline hover:underline print:hidden"
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

function TossPlaceSideProject({ p, first }: { p: (typeof tossPlaceResumeSide)[number]; first?: boolean }) {
  return (
    <section className={`break-inside-avoid ${first ? '' : 'pt-4 border-t border-hj-line'}`}>
      <div className="flex items-baseline gap-2.5 flex-wrap">
        <h3 className="font-hj-serif text-[16px] font-semibold tracking-[-0.01em] text-hj-fg">{p.name}</h3>
        <span className="font-hj-mono text-[11.5px] text-hj-muted">{p.meta}</span>
        {p.repo && <a href={p.repo} target="_blank" rel="noreferrer" className="font-hj-mono text-[11.5px] text-[#0064FF]">github ↗</a>}
        {'caseUrl' in p && p.caseUrl && (
          <a href={p.caseUrl as string} target="_blank" rel="noreferrer" className="font-hj-mono text-[11.5px] text-[#0064FF] print:hidden">
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

/* ── 웹 전용: 토스플레이스 채용 딥다이브 Q&A 모달/섹션 ── */
function TossPlaceDeepDiveQASection() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="mt-12 p-6 bg-[#f5f8ff] border-2 border-[#0064FF]/30 rounded-hj-lg print:hidden">
      <div className="flex items-center justify-between gap-3 flex-wrap pb-3 border-b border-[#0064FF]/20">
        <div className="flex items-center gap-2">
          <span className="text-[18px]">💳</span>
          <h3 className="font-hj-serif text-[15.5px] font-bold text-[#0052cc]">
            토스플레이스(Toss Place) 직무 딥다이브 & 사전 인터뷰 가이드
          </h3>
        </div>
        <span className="font-hj-mono text-[11px] text-hj-muted bg-white border border-[#0064FF]/20 rounded-hj-xs px-2 py-0.5">
          지원서 작성 및 인터뷰 대비용 핵심 답변
        </span>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {tossPlaceDeepDiveQA.map((item, idx) => {
          const fullText = `[질문: ${item.q}]\n\n${item.a}`;
          const isCopied = copiedIndex === idx;

          return (
            <div key={idx} className="bg-white border border-[#0064FF]/15 rounded-hj-md p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-hj-serif text-[13.5px] font-bold text-hj-fg leading-[1.4]">
                  Q{idx + 1}. {item.q}
                </h4>
                <button
                  type="button"
                  onClick={() => handleCopy(fullText, idx)}
                  className="font-hj-mono text-[11px] font-semibold text-[#0064FF] hover:bg-[#0064FF]/10 border border-[#0064FF]/30 rounded px-2 py-1 flex-none cursor-pointer transition-colors"
                >
                  {isCopied ? '복사 완료 ✓' : '답변 복사'}
                </button>
              </div>
              <p className="font-hj-serif text-[12.5px] leading-[1.65] text-hj-fg-secondary mt-2.5 whitespace-pre-line bg-[#fbfdff] p-3 rounded border border-hj-line/50">
                {item.a}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TossPlaceResume() {
  return (
    <DocShell tab="이력서 · 토스플레이스">
      <TossPlaceResumeHeader />
      <DocSection label="결제 무결성 & 런타임 안정성 · 피크타임 무중단 & 제로 결함"><ClaimSection data={tossPlaceResumePaymentAndRuntime} /></DocSection>
      <DocSection label="도메인 3계층 추상화 & B2B SDK · 포스 플러그인 생태계 확장"><ClaimSection data={tossPlaceResumeAbstractionAndSDK} /></DocSection>
      <DocSection label="주도적 현장 병목 관찰 · 사장님 & 파트너스 고밀도 백오피스 혁신"><ClaimSection data={tossPlaceResumeProactiveAndOps} /></DocSection>
      <DocSection label="경력 기술" flow>
        <div className="flex flex-col gap-2">
          {tossPlaceResumeExperience.map((c, i) => (
            <ExperienceBlock key={c.company} c={c} first={i === 0} />
          ))}
        </div>
      </DocSection>
      <DocSection label="사이드 프로젝트 & 오픈소스" flow>
        <div className="flex flex-col gap-4">
          {tossPlaceResumeSide.map((p, i) => (
            <TossPlaceSideProject key={p.name} p={p} first={i === 0} />
          ))}
        </div>
      </DocSection>
      <DocSection label="핵심 역량" flow breakBefore><TossPlaceResumeSkills /></DocSection>
      <DocSection label="학력 · 교육"><Education /></DocSection>
      
      {/* 웹 전용 딥다이브 가이드 */}
      <TossPlaceDeepDiveQASection />
    </DocShell>
  );
}
