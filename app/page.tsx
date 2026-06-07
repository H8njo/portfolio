// 랜딩 (T8). 큐레이션 목록·featured는 데이터 레이어(lib/cases)에서.
// 실제 수치/케이스 본문은 NDA(T0) 후 교체. column-pager 라이브 데모는 T4.

import Link from "next/link";
import { getAllCases } from "@/lib/cases";
import { CaseCard } from "@/components/case-card";

const CURATED_LIMIT = 6;

export default function Home() {
  // 리스트 하나. 정렬상 featured가 맨 위 → CaseCard가 자동 강조.
  const curated = getAllCases().slice(0, CURATED_LIMIT);

  return (
    <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
      {/* HERO — 타입 중심 에디토리얼. 가짜 수치 대신 정직한 포지셔닝 + 아래 FEATURED가 증거. */}
      <section className="pt-24 pb-16 border-b border-hairline">
        <p className="font-mono text-sm text-gray-2 mb-6 tracking-wide">
          FRONTEND ENGINEER <span className="text-accent">— 7 YEARS</span>
        </p>
        <h1 className="font-display font-semibold tracking-tight leading-[1.12] max-w-[15ch] text-[clamp(2.2rem,6vw,4.2rem)]">
          측정 가능한 임팩트로 어려운 프론트엔드 문제를 푸는 개발자.
        </h1>
        <p className="text-gray-1 mt-6 max-w-[560px] text-[17px]">
          성능, 복잡한 상태, 까다로운 렌더링. 남들이 멈춘 곳에서 구조를 찾습니다.
          최근엔 브라우저가 못 하는 문제지 조판을 직접 만들어 오픈소스로 공개했습니다.
        </p>
      </section>

      {/* SELECTED WORK — 리스트 하나 (featured 항목은 맨 위에서 자동 강조 + 데모 미끼) */}
      <section aria-label="Selected Work" className="py-16 border-b border-hairline">
        <div className="flex items-baseline gap-3 font-mono text-xs text-gray-2 uppercase tracking-widest">
          Selected Work
          <span className="flex-1 h-px bg-hairline" />
        </div>
        {curated.length === 0 ? (
          <div className="mt-6">
            <p className="text-gray-1">케이스를 정리해 곧 올릴 예정이에요.</p>
            <a href="#contact" className="inline-block mt-3 text-accent text-sm hover:underline underline-offset-4">
              먼저 자세히 듣고 싶으시면 연락 주세요 →
            </a>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-6">
            {curated.map((entry, i) => (
              <CaseCard key={entry.slug} entry={entry} index={i} />
            ))}
          </div>
        )}
        <Link href="/work" className="inline-block mt-8 text-accent text-sm hover:underline underline-offset-4">
          전체 작업 보기 →
        </Link>
      </section>

      {/* ABOUT */}
      <section id="about" aria-label="About" className="py-16 border-b border-hairline scroll-mt-[80px]">
        <div className="flex items-baseline gap-3 font-mono text-xs text-gray-2 uppercase tracking-widest">
          About
          <span className="flex-1 h-px bg-hairline" />
        </div>
        <p className="text-gray-1 mt-6 max-w-[680px]">{/* TODO: About 본문 (사용자 작성) */}준비 중입니다.</p>
      </section>

      {/* CONTACT — 개인 이메일 + GitHub + LinkedIn (현 직장 도메인 금지) */}
      <section id="contact" aria-label="Contact" className="py-16 scroll-mt-[80px]">
        <div className="flex items-baseline gap-3 font-mono text-xs text-gray-2 uppercase tracking-widest">
          Contact
          <span className="flex-1 h-px bg-hairline" />
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
          {/* TODO(T0): 개인 이메일 주소로 교체 */}
          <li><a className="text-accent hover:underline underline-offset-4" href="mailto:TODO@example.com">Email</a></li>
          <li><a className="text-accent hover:underline underline-offset-4" href="https://github.com/H8njo" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a className="text-accent hover:underline underline-offset-4" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </section>
    </div>
  );
}
