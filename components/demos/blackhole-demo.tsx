"use client";

import dynamic from "next/dynamic";

// WebGL 데모는 window/document에 접근하므로 클라이언트 전용 로드(ssr:false).
// ssr:false는 클라이언트 컴포넌트 안에서만 허용되므로 이 래퍼가 필요.
const BlackholeContained = dynamic(
  () => import("@/components/demos/blackhole-contained"),
  {
    ssr: false,
    loading: () => (
      <div className="mt-6 border border-dashed border-hairline rounded p-6 text-center font-mono text-xs text-gray-2">
        데모 불러오는 중…
      </div>
    ),
  }
);

export function BlackholeDemo() {
  return <BlackholeContained />;
}
