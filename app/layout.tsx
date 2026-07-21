import type { Metadata } from "next";
import { pretendard, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://h8njo.vercel.app"),
  title: "조영훈 — Frontend Engineer",
  description: "PDF 첫 조작을 약 10분 30초에서 1.3초로, 컬럼 정의 한 벌로 화면 59개를 찍어낸 7년차 프론트엔드 엔지니어.",
  openGraph: {
    title: "조영훈 — Frontend Engineer",
    description: "PDF 첫 조작을 약 10분 30초에서 1.3초로, 컬럼 정의 한 벌로 화면 59개를 찍어낸 7년차 프론트엔드 엔지니어.",
    type: "website",
    siteName: "조영훈 · 포트폴리오",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "조영훈 — Frontend Engineer",
    description: "PDF 첫 조작을 약 10분 30초에서 1.3초로, 컬럼 정의 한 벌로 화면 59개를 찍어낸 7년차 프론트엔드 엔지니어.",
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
