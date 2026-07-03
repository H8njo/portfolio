import "../hoonjo.css";
import { Nav } from "@/components/hoonjo/sections";
import { SiteFooter } from "@/components/site-footer";

// /work(블로그) 서브트리 크롬. 홈과 "같은 헤더"를 쓰기 위해 포팅한 .hoonjo Nav를
// 쓴다. 단, .hoonjo의 base element 규칙(:is(h1..h5) line-height:1·margin:0, p{margin:0},
// a 파랑 링크, code/pre …)이 specificity 0,1,1로 본문 Tailwind 유틸(0,1,0)을 이겨
// 블로그 콘텐츠 타이포·간격을 깨뜨렸다. 그래서 .hoonjo는 Nav만 감싸고(토큰·반응형
// 규칙 확보), 래퍼에 display:contents를 줘 박스를 없앤다 — base 규칙은 Nav에만 닿고,
// sticky Nav의 컨테이닝 블록은 body가 되어 전체 스크롤 동안 붙는다. main·footer는
// .hoonjo 밖이라 구 "문제지 책자"(globals.css) 스타일 그대로 렌더된다.
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <div className="hoonjo" style={{ display: "contents" }}>
        <Nav />
      </div>
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
