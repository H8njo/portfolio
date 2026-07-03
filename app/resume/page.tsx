import type { Metadata } from "next";
import "../hoonjo.css";
import { Resume } from "@/components/hoonjo/docs";

export const metadata: Metadata = {
  title: "조영훈 — 이력서",
};

// 이력서 (인쇄→PDF 문서). 회사 단위로 읽는 CV.
export default function ResumePage() {
  return (
    <div className="hoonjo">
      <Resume />
    </div>
  );
}
