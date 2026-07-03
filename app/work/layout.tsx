import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

// /work 서브트리 전용 크롬. 루트 레이아웃에서 SiteNav/SiteFooter를 걷어냈으므로
// (메인 포트폴리오는 자체 Nav·Contact footer를 가짐) 기존 케이스 페이지의
// 내비게이션은 여기서 유지한다.
export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
