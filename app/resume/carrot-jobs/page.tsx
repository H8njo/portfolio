import type { Metadata } from "next";
import { CarrotJobsResume } from "@/components/hoonjo/carrot-jobs-docs";

export const metadata: Metadata = {
  title: "조영훈 — 이력서 (당근 · 로컬 잡스)",
  description: "당근 로컬 잡스(일자리/당근알바) 프론트엔드 엔지니어 지원용 맞춤 이력서 및 서류 사전 질문 답변",
};

// 당근 로컬 잡스(일자리/당근알바) 프론트엔드 엔지니어 지원용 맞춤 이력서
export default function CarrotJobsResumePage() {
  return (
    <div className="hoonjo">
      <CarrotJobsResume />
    </div>
  );
}
