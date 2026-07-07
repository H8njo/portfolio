"use client";

import { useEffect } from "react";
import { LuArrowLeft } from "react-icons/lu";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // TODO: 실제 배포 시 에러 리포팅 연동(선택)
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-[680px] mx-auto px-8 py-32 text-center">
      <p className="font-hj-mono text-sm text-hj-blue">오류</p>
      <h1 className="font-hj-serif font-semibold text-3xl tracking-tight mt-3">
        잠시 문제가 생겼어요
      </h1>
      <p className="text-hj-muted mt-3">다시 시도하거나 홈으로 돌아가 주세요.</p>
      <div className="mt-8 flex justify-center gap-6 font-hj-mono text-sm">
        <button onClick={reset} className="text-hj-blue hover:underline underline-offset-4">
          다시 시도
        </button>
        <a href="/" className="inline-flex items-center gap-1 text-hj-blue hover:underline underline-offset-4">
          <LuArrowLeft aria-hidden className="size-3.5" /> 홈으로
        </a>
      </div>
    </div>
  );
}
