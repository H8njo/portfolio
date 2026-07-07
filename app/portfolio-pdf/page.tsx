import type { Metadata } from "next";
import { PortfolioPdf } from "@/components/hoonjo/docs";

export const metadata: Metadata = {
  title: "조영훈 — 포트폴리오",
};

// 포트폴리오 PDF (인쇄→PDF 문서). 포트폴리오 전체를 문서 형태로.
export default function PortfolioPdfPage() {
  return (
    <div className="hoonjo">
      <PortfolioPdf />
    </div>
  );
}
