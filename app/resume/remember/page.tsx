import type { Metadata } from "next";
import { RememberResume } from "@/components/hoonjo/remember-docs";

export const metadata: Metadata = {
  title: "조영훈 — 이력서 (리멤버)",
  description: "리멤버 웹 프론트엔드 엔지니어 지원용 이력서",
};

// 리멤버 웹 프론트엔드 엔지니어 지원용 맞춤 이력서
export default function RememberResumePage() {
  return (
    <div className="hoonjo">
      <RememberResume />
    </div>
  );
}

