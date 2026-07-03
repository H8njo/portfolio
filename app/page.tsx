import type { Metadata } from "next";
import "./hoonjo.css";
import { MainPortfolio } from "@/components/hoonjo/sections";

export const metadata: Metadata = {
  title: "조영훈 — Frontend Engineer",
};

// 메인 포트폴리오 (Vite 원본 포팅). 모든 인터랙션은 .hoonjo 서브트리의
// 클라이언트 컴포넌트(sections)가 담당하고, 이 서버 페이지는 메타데이터만 얹는다.
export default function Home() {
  return (
    <div className="hoonjo">
      <MainPortfolio />
    </div>
  );
}
