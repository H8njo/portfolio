import "../hoonjo.css";
import { Nav } from "@/components/hoonjo/sections";
import { SiteFooter } from "@/components/site-footer";

// /work(블로그) 서브트리 크롬. 홈과 "같은 헤더"를 쓰기 위해 포팅한 .hoonjo Nav를
// 사용한다. Nav의 스코프 토큰·반응형 규칙(.hoonjo .hoonjo-nav-links)과 sticky
// 컨테이닝 블록이 .hoonjo 조상에 의존하므로 서브트리 전체를 .hoonjo로 감싼다.
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="hoonjo">
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <Nav />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
