import "../hoonjo.css";
import { Nav, Contact } from "@/components/hoonjo/sections";

// /work(블로그) 서브트리 크롬 — 홈과 "완전히 같은" .hoonjo 시스템을 쓴다.
// 예전엔 base element 규칙(:is(h1..h5), p, a …)이 본문 Tailwind 유틸을 이겨
// 블로그 콘텐츠를 깨뜨렸기에 .hoonjo로 Nav만 감싸고 main은 구 스타일로 뒀지만,
// 이제 main/상세 본문 자체를 .hoonjo 프리미티브 + .hoonjo-md로 다시 짰으므로
// 그 충돌이 사라졌다. 그래서 홈(page.tsx)과 동일하게 페이지 전체를 .hoonjo로
// 감싼다 — 캔버스 틴트·토큰·sticky Nav·잉크 슬랩 푸터(Contact)까지 한 시스템.
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hoonjo hoonjo-work">
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Contact />
    </div>
  );
}
