"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // TODO: 실제 배포 시 에러 리포팅 연동(선택)
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[680px] mx-auto px-8 py-32 text-center">
      <p className="font-mono text-sm text-accent">오류</p>
      <h1 className="font-display font-semibold text-3xl tracking-tight mt-3">
        잠시 문제가 생겼어요
      </h1>
      <p className="text-gray-1 mt-3">다시 시도하거나 홈으로 돌아가 주세요.</p>
      <div className="mt-8 flex justify-center gap-6 font-mono text-sm">
        <button onClick={reset} className="text-accent hover:underline underline-offset-4">
          다시 시도
        </button>
        <a href="/" className="text-accent hover:underline underline-offset-4">
          ← 홈으로
        </a>
      </div>
    </div>
  );
}
