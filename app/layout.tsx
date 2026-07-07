import type { Metadata } from "next";
import { pretendard, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  // TODO(T0): 실제 도메인으로 교체
  metadataBase: new URL("https://hoonjo.dev"),
  title: "hoonjo — Frontend Engineer",
  description: "측정 가능한 임팩트로 어려운 프론트엔드 문제를 푸는 7년차 개발자.",
  openGraph: {
    title: "hoonjo — Frontend Engineer",
    description: "측정 가능한 임팩트로 어려운 프론트엔드 문제를 푸는 7년차 개발자.",
    type: "website",
    siteName: "hoonjo.dev",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "hoonjo — Frontend Engineer",
    description: "측정 가능한 임팩트로 어려운 프론트엔드 문제를 푸는 7년차 개발자.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* 페이지가 각자 크롬(내비/푸터)을 소유한다: 메인 포트폴리오·이력서·PDF는
            .hoonjo 서브트리가 자체 Nav/Contact를 렌더하고, /work는 app/work/layout.tsx가
            자체 크롬을 붙인다. 라이트 전용(DESIGN.md) — 다크 토글 없음. */}
        {children}
      </body>
    </html>
  );
}
