import type { Metadata } from "next";
import { TossPlaceResume } from "@/components/hoonjo/toss-place-docs";

export const metadata: Metadata = {
  title: "조영훈 — 이력서 (토스플레이스)",
  description: "토스플레이스 Frontend Developer 지원용 맞춤 이력서 (POS, 결제 안정성, 런타임 제어, B2B 대시보드)",
};

// 토스플레이스(Toss Place) 지원 맞춤 이력서
export default function TossPlaceResumePage() {
  return (
    <div className="hoonjo">
      <TossPlaceResume />
    </div>
  );
}
