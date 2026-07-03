"use client";

import type { ReactNode } from 'react';
import type { Metric } from './components';
import { Tag, MetricRow } from './components';
import { profile, timeline, capabilities, flagship, cases, blackHole, impact, oss, resumeSummary, resumeSkills, resumeExperience, education } from './content';
import type { ProjImage, ExpCompany } from './content';
import { BlackHole } from './BlackHole';
const portrait = '/hoonjo/portrait.jpg';

/* Print-to-PDF documents served at /d/<slug>/{resume,portfolio-pdf}.
   이력서 is a CV (page 1) + the projects in detail on a second print page;
   포트폴리오 PDF is the whole portfolio in document form, so the PDF alone reads
   as the full portfolio. All copy comes from content.ts so nothing drifts. */

/* ---- shared shell ------------------------------------------------------- */
function DocShell({ tab, children }: { tab: string; children: ReactNode }) {
  return (
    <div className="hoonjo-doc">
      <header className="hoonjo-doc-bar">
        <a className="hoonjo-doc-back" href="/">
          <span aria-hidden style={{ fontFamily: 'var(--font-mono)' }}>←</span> 포트폴리오로
        </a>
        <span className="hoonjo-doc-tab">{tab}</span>
        <button type="button" className="hoonjo-doc-print" onClick={() => window.print()}>
          인쇄 · PDF 저장
        </button>
      </header>
      <article className="hoonjo-doc-sheet">{children}</article>
    </div>
  );
}

function DocHeader({ tagline, summary }: { tagline?: string; summary?: string }) {
  return (
    <header className="hoonjo-doc-head" style={{ paddingBottom: 24, borderBottom: '2px solid var(--text)', display: 'flex', gap: 26, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>{profile.nameKo}</h1>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)' }}>{profile.name}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-secondary)', marginTop: 8 }}>{profile.role}</div>
        {tagline && <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text)', marginTop: 14 }}>{tagline}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)' }}>
          <a href={`mailto:${profile.email}`} style={{ color: 'var(--blue-deep)' }}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: 'var(--blue-deep)' }}>{profile.githubHandle}</a>
        </div>
        {summary && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)', margin: '16px 0 0', maxWidth: '62ch' }}>{summary}</p>}
      </div>
      <img className="hoonjo-doc-photo" src={portrait} alt={profile.nameKo} style={{ flex: 'none', width: 116, height: 138, objectFit: 'cover', objectPosition: 'center 22%', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)' }} />
    </header>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{children}</div>;
}

function DocSection({ label, breakPage, children }: { label: string; breakPage?: boolean; children: ReactNode }) {
  return (
    <section className={`hoonjo-doc-section${breakPage ? ' hoonjo-doc-break' : ''}`} style={{ marginTop: 26, ...(breakPage ? { breakBefore: 'page' } : null) }}>
      <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 14px', paddingBottom: 8, borderBottom: '1px solid var(--line)' }}>{label}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: 'flex', gap: 9, fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
          <span aria-hidden style={{ flex: 'none', width: 4, height: 4, marginTop: 8, borderRadius: 1, background: 'var(--steel)', transform: 'rotate(45deg)' }} />
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
    <section className="hoonjo-doc-section" style={{ paddingTop: 22, borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text)', margin: 0 }}>{p.title}</h3>
        {p.company && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)' }}>{p.company}</span>}
      </div>
      {withImages && p.images && p.images.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(p.images.length, 3)}, 1fr)`, gap: 10, marginTop: 16 }}>
          {p.images.map((im, i) => (
            <img key={i} src={im.src} alt={im.alt} style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--line)' }} />
          ))}
        </div>
      )}
      {withImages && (!p.images || p.images.length === 0) && p.code && (
        <div style={{ marginTop: 16, background: 'var(--ink)', border: '1px solid var(--ink-soft)', borderRadius: 'var(--radius-md)', padding: '18px 20px', overflowX: 'auto' }}>
          {p.code.lines.split('\n').map((ln, i) => {
            const t = ln.trim();
            const color = t.startsWith('//') ? 'var(--on-ink-muted)' : t.startsWith('$') ? 'var(--blue-bright)' : 'var(--on-ink)';
            return <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8, color, whiteSpace: 'pre', minHeight: '1.3em' }}>{ln || ' '}</div>;
          })}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--on-ink-muted)', marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(246,244,238,0.14)' }}>{p.code.caption}</div>
        </div>
      )}
      <div className="hoonjo-doc-ps" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 16 }}>
        <div><SectionLabel>Problem</SectionLabel><div style={{ marginTop: 9 }}><Bullets items={p.problem} /></div></div>
        <div><SectionLabel>Structure</SectionLabel><div style={{ marginTop: 9 }}><Bullets items={p.structure} /></div></div>
      </div>
      <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
        <SectionLabel>Impact</SectionLabel>
        <div style={{ marginTop: 14 }}><MetricRow stats={p.metrics} /></div>
      </div>
      {withImages && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
          {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}
    </section>
  );
}

function CareerList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {timeline.map((t) => (
        <div key={t.org} className="hoonjo-doc-row" style={{ display: 'grid', gridTemplateColumns: '98px 1fr', gap: 18 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)', paddingTop: 2 }}>{t.period}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15.5, fontWeight: 600, color: 'var(--text)' }}>{t.role}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--text-muted)' }}>· {t.org}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-secondary)', margin: '6px 0 0', whiteSpace: 'pre-line' }}>{t.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <div className="hoonjo-doc-skills" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 22 }}>
      {capabilities.map((c) => (
        <div key={c.label}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 600, color: 'var(--text)' }}>{c.label}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {c.skills.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- 이력서 전용 파트 ---------------------------------------------------- */
/* 포트폴리오 PDF와 확실히 구분되는, "회사 위주"로 읽는 CV 헤더.
   포트폴리오의 큰 세리프 태그라인 대신 요약 문단·연락처를 담아 문서처럼 읽힌다. */
function ResumeHeader() {
  return (
    <header style={{ paddingBottom: 24, borderBottom: '2px solid var(--text)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--blue-deep)' }}>이력서 · Résumé</div>
      <div style={{ display: 'flex', gap: 26, alignItems: 'flex-start', marginTop: 14 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>{profile.nameKo}</h1>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)' }}>{profile.name}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15.5, color: 'var(--text-secondary)', marginTop: 7 }}>{profile.role}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
            <a href={`mailto:${profile.email}`} style={{ color: 'var(--blue-deep)' }}>{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: 'var(--blue-deep)' }}>{profile.githubHandle}</a>
            <a href="https://h8njo.vercel.app" target="_blank" rel="noreferrer" style={{ color: 'var(--blue-deep)' }}>h8njo.vercel.app</a>
          </div>
        </div>
        <img src={portrait} alt={profile.nameKo} style={{ flex: 'none', width: 104, height: 124, objectFit: 'cover', objectPosition: 'center 22%', borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)' }} />
      </div>
      <div style={{ margin: '18px 0 0', display: 'flex', flexDirection: 'column', gap: 7, maxWidth: '72ch' }}>
        {resumeSummary.map((line, i) => {
          if (line.kind === 'close') {
            const [pre, post] = line.t.split(' : ');
            return (
              <p key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, margin: '5px 0 0' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>{pre}</span>
                <span style={{ color: 'var(--blue-deep)', fontFamily: 'var(--font-mono)', margin: '0 10px' }}>→</span>
                <span style={{ color: 'var(--text)', fontWeight: 600 }}>{post}</span>
              </p>
            );
          }
          return (
            <p key={i} style={{
              fontFamily: 'var(--font-sans)',
              lineHeight: 1.5,
              margin: 0,
              marginTop: line.kind === 'hook' ? 3 : 0,
              fontSize: line.kind === 'lead' ? 18 : line.kind === 'hook' ? 15.5 : 14,
              fontWeight: line.kind === 'lead' ? 700 : line.kind === 'body' ? 400 : 600,
              letterSpacing: line.kind === 'lead' ? '-0.01em' : undefined,
              color: line.kind === 'body' ? 'var(--text-secondary)' : 'var(--text)',
            }}>{line.t}</p>
          );
        })}
      </div>
    </header>
  );
}

function ResumeSkills() {
  return (
    <div className="hoonjo-doc-skills" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 30px' }}>
      {resumeSkills.map((s) => (
        <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '132px 1fr', gap: 14, alignItems: 'start' }} className="hoonjo-doc-row">
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600, color: 'var(--text)', paddingTop: 3 }}>{s.label}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {s.items.map((it) => <Tag key={it}>{it}</Tag>)}
          </div>
        </div>
      ))}
    </div>
  );
}

/* 회사 하나 = 기간(왼쪽) + 회사/제품/역할 헤더 + 스택 + 성과 불릿(오른쪽).
   first면 위 구분선을 뺀다 — 섹션 제목 밑줄과 겹쳐 이중선이 되는 걸 막기 위해. */
function ExperienceBlock({ c, first = false }: { c: ExpCompany; first?: boolean }) {
  return (
    <section className="hoonjo-exp" style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 22, paddingTop: first ? 4 : 22, borderTop: first ? 'none' : '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 500, color: c.current ? 'var(--green-deep)' : 'var(--text-muted)', paddingTop: 3 }}>
        {c.current && <span aria-hidden style={{ width: 7, height: 7, borderRadius: 1, transform: 'rotate(45deg)', background: 'var(--green)', flex: 'none' }} />}
        {c.period}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 21, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text)', margin: 0 }}>{c.company}</h3>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--text-muted)' }}>{c.product}</span>
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 4 }}>{c.role}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
          {c.stack.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
        <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
          {c.highlights.map((h) => (
            <li key={h.head} className="hoonjo-exp-hl" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 10 }}>
              <span aria-hidden style={{ width: 5, height: 5, marginTop: 7, borderRadius: 1, background: 'var(--blue)', transform: 'rotate(45deg)', flex: 'none' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 600, lineHeight: 1.45, color: 'var(--text)' }}>{h.head}</div>
                <ul style={{ listStyle: 'none', margin: '6px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {h.points.map((pt, i) => (
                    <li key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                      <span aria-hidden style={{ color: 'var(--text-faint)' }}>–</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                {h.results && h.results.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '7px 8px', marginTop: 10 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-deep)' }}>
                      <span aria-hidden style={{ width: 5, height: 5, transform: 'rotate(45deg)', background: 'var(--green)', flex: 'none' }} />
                      성과
                    </span>
                    {h.results.map((r) => (
                      <span key={r} style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 600, color: 'var(--text)', background: 'var(--cloud)', border: '1px solid var(--line)', borderRadius: 'var(--radius-xs)', padding: '4px 10px', lineHeight: 1.35 }}>{r}</span>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {education.map((e) => (
        <div key={e.school} className="hoonjo-doc-row" style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 22 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--text-muted)', paddingTop: 2 }}>{e.period}</div>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 600, color: 'var(--text)' }}>{e.school}</div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', marginTop: 3 }}>{e.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---- 이력서: 회사 위주로 읽는 CV (포트폴리오 PDF와 구분되는 문서) --------- */
export function Resume() {
  return (
    <DocShell tab="이력서">
      <ResumeHeader />
      <DocSection label="핵심 역량"><ResumeSkills /></DocSection>
      <DocSection label="학력 · 교육"><Education /></DocSection>
      {/* 경력을 2개 페이지 그룹으로 나눠, 인쇄 시 각 페이지가 위쪽 여백(cushion)을
          갖고 아래는 자연 여백이 남도록 — 회사 블록은 페이지 중간에서 잘리지 않는다. */}
      <DocSection label="경력 기술" breakPage>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ExperienceBlock c={resumeExperience[0]} first />
          <ExperienceBlock c={resumeExperience[1]} />
        </div>
      </DocSection>
      <section className="hoonjo-doc-section hoonjo-doc-break" style={{ marginTop: 8, breakBefore: 'page' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--text-secondary)', margin: '-4px 0 12px' }}>{impact.lead}</div>
        <div className="hoonjo-doc-skills" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: 'var(--ink)', border: '1px solid var(--ink-soft)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {impact.stats.map((s, i) => (
            <div key={s.k} style={{ padding: '18px 22px', borderRight: i < impact.stats.length - 1 ? '1px solid rgba(246,244,238,0.14)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--on-ink-muted)' }}>{s.k}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--on-ink-muted)', textDecoration: 'line-through', textDecorationColor: 'rgba(246,244,238,0.45)', marginTop: 16 }}>{s.before}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'var(--blue-bright)' }}>→</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 23, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--on-ink)' }}>{s.after}</span>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection label="경력"><CareerList /></DocSection>

      {/* 프로젝트는 각자 한 페이지 — 이어지는 페이지도 위쪽 여백(cushion)을 갖게
          두 번째부터 페이지를 새로 시작한다(첫 프로젝트는 섹션 제목과 같은 페이지). */}
      <DocSection label="대표 프로젝트" breakPage>
        <ProjectBlock p={PROJECTS[0]} withImages />
        {PROJECTS.slice(1).map((p) => (
          <div key={p.title} className="hoonjo-doc-break" style={{ breakBefore: 'page', marginTop: 32 }}>
            <ProjectBlock p={p} withImages />
          </div>
        ))}
      </DocSection>

      <DocSection label="사이드 프로젝트" breakPage>
        <div className="hoonjo-doc-ps" style={{ display: 'grid', gridTemplateColumns: '1fr 0.82fr', gap: 24, alignItems: 'stretch' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 600, color: 'var(--text)', margin: 0 }}>{blackHole.title.join(' ')}</h3>
              <a href={blackHole.repo} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--blue-deep)' }}>github ↗</a>
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '10px 0 0' }}>{blackHole.body}</p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 16 }}>
              {blackHole.stats.map(([k, v]) => (
                <div key={k}><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{k} · </span><span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{v}</span></div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
              {blackHole.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: 216, background: 'var(--ink-deep)', border: '1px solid var(--ink-soft)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <BlackHole />
            <span style={{ position: 'absolute', top: 12, right: 12, display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--on-ink)', background: 'rgba(12,11,8,0.5)', border: '1px solid rgba(246,244,238,0.18)', borderRadius: 'var(--radius-pill)', padding: '4px 9px' }}>
              <span aria-hidden style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-bright)' }} />
              실시간 렌더
            </span>
          </div>
        </div>
      </DocSection>

      {/* 오픈소스 + 전문 영역은 한 페이지로 묶고, 페이지 위쪽 여백도 갖게 새 페이지에서 시작 */}
      <div className="hoonjo-doc-break" style={{ breakBefore: 'page', breakInside: 'avoid' }}>
      <DocSection label="오픈소스">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{oss.repo}</span>
          <a href={oss.href} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'var(--blue-deep)' }}>github ↗</a>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '8px 0 0', whiteSpace: 'pre-line' }}>{oss.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {oss.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </DocSection>

        <DocSection label="전문 영역"><Skills /></DocSection>
      </div>
    </DocShell>
  );
}
