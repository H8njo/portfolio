import type { Metadata } from "next";
import { CarrotResume } from "@/components/hoonjo/carrot-docs";

export const metadata: Metadata = {
  title: "조영훈 — 이력서 (당근 · 로컬잡스 레슨/과외)",
  description: "당근 로컬잡스(레슨/과외 팀) 프론트엔드 엔지니어 지원용 맞춤 이력서",
};

// 당근 로컬잡스(레슨/과외 팀) 프론트엔드 엔지니어 지원용 맞춤 이력서
export default function CarrotResumePage() {
  return (
    <div className="hoonjo">
      <CarrotResume />
    </div>
  );
}
