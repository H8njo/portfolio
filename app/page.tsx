// 랜딩 골격 (T1). 실제 수치·케이스는 NDA 공개범위 확정(T0) 후 교체.
// 큐레이션 목록(T8)·featured 데모(T4)는 후속 태스크에서 채움.

export default function Home() {
  return (
    <div className="max-w-[1080px] mx-auto px-8">
      {/* HERO — placeholder metric until T0(NDA) cleared */}
      <section className="pt-24 pb-16 border-b border-hairline">
        <p className="font-mono text-sm text-accent mb-6">
          {/* TODO(T0): 실제 수치로 교체 (NDA 공개범위 확정 후) */}
          // 대용량 PDF 초기 로딩 개선
        </p>
        <div className="font-mono font-medium tracking-tight leading-none text-[clamp(2.4rem,7vw,5.2rem)]">
          <span className="text-gray-2">000,000ms</span>{" "}
          <span className="text-gray-2">→</span>{" "}
          <span className="text-accent">0,000ms</span>
        </div>
        <h1 className="font-display font-semibold tracking-tight leading-snug mt-8 max-w-[760px] text-[clamp(1.4rem,3vw,2.1rem)]">
          측정 가능한 임팩트로 어려운 프론트엔드 문제를 푸는 7년차 개발자.
        </h1>
        <p className="text-gray-1 mt-4 max-w-[560px] text-[17px]">
          성능, 복잡한 상태, 까다로운 렌더링. 남들이 멈춘 곳에서 구조를 찾습니다.
        </p>
      </section>

      {/* FEATURED slot (T4: column-pager 데모) */}
      <section aria-label="Featured" className="py-16 border-b border-hairline">
        <p className="font-mono text-xs text-gray-2 uppercase tracking-widest">
          Featured — 창의적 해결
        </p>
        <p className="text-gray-1 mt-4">{/* TODO(T4): featured 케이스 + column-pager 라이브 데모 */}곧 추가됩니다.</p>
      </section>

      {/* 큐레이션 목록 slot (T8) */}
      <section aria-label="Selected Work" className="py-16 border-b border-hairline">
        <div className="flex items-baseline gap-3 font-mono text-xs text-gray-2 uppercase tracking-widest">
          Selected Work
          <span className="flex-1 h-px bg-hairline" />
        </div>
        <p className="text-gray-1 mt-6">{/* TODO(T8): 큐레이션 4~6 책자 카드 */}준비 중입니다.</p>
        <a href="/work" className="inline-block mt-6 text-accent text-sm hover:underline underline-offset-4">
          전체 작업 보기 →
        </a>
      </section>

      {/* ABOUT (T8) */}
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
