import type { Metadata } from "next";
import { TossResume } from "@/components/hoonjo/toss-docs";

export const metadata: Metadata = {
  title: "조영훈 — 이력서 (토스증권)",
  description: "토스증권 Frontend Developer 지원용 맞춤 이력서",
};

// 토스커뮤니티 지원용 맞춤 이력서
export default function TossResumePage() {
  return (
    <div className="hoonjo">
      <TossResume />
    </div>
  );
}
