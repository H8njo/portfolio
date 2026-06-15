import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className="max-w-[680px] mx-auto px-8 py-32 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="font-display font-semibold text-3xl tracking-tight mt-3">
        없는 페이지예요
      </h1>
      <p className="text-gray-1 mt-3">
        주소가 바뀌었거나 아직 준비 중인 케이스일 수 있어요.
      </p>
      <div className="mt-8 flex justify-center gap-6 font-mono text-sm">
        <Link href="/" className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4">
          <LuArrowLeft aria-hidden className="size-3.5" /> 홈으로
        </Link>
        <Link href="/work" className="text-accent hover:underline underline-offset-4">
          전체 작업 보기
        </Link>
      </div>
    </div>
  );
}
