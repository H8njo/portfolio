import Link from "next/link";
import { getAllCases } from "@/lib/cases";
import { CaseCard } from "@/components/case-card";

export const metadata = {
  title: "Work — hoonjo",
};

// 전체 작업 인덱스 (Pass 1 IA: /work). 모든 케이스 나열.
export default function WorkIndex() {
  const cases = getAllCases();

  return (
    <div className="max-w-[820px] mx-auto px-8 py-20">
      <h1 className="font-display font-semibold text-3xl tracking-tight">Work</h1>
      <p className="text-gray-1 mt-3">문제 한 장씩. {cases.length}개 케이스.</p>

      {cases.length === 0 ? (
        <div className="mt-10">
          <p className="text-gray-1">아직 공개된 케이스가 없어요. 곧 추가됩니다.</p>
          <Link href="/#contact" className="inline-block mt-3 text-accent text-sm hover:underline underline-offset-4">
            연락하기 →
          </Link>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-7">
          {cases.map((entry, i) => (
            <CaseCard key={entry.slug} entry={entry} index={i} />
          ))}
        </div>
      )}

      <Link href="/" className="inline-block mt-12 text-accent text-sm hover:underline underline-offset-4">
        ← 홈으로
      </Link>
    </div>
  );
}
