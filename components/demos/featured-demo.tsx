"use client";

import dynamic from "next/dynamic";

// column-pager는 브라우저 측정 기반(SSR 시 폭 0이면 보류) → ssr:false로 클라이언트 전용 로드.
// ssr:false는 클라이언트 컴포넌트 안에서만 허용되므로 이 래퍼가 필요.
const ColumnPagerDemo = dynamic(() => import("@/components/demos/column-pager-demo"), {
  ssr: false,
  loading: () => (
    <div className="mt-6 border border-dashed border-hj-line rounded-hj-sm p-6 text-center font-hj-mono text-xs text-hj-faint">
      데모 불러오는 중…
    </div>
  ),
});

export function FeaturedDemo() {
  return <ColumnPagerDemo />;
}
