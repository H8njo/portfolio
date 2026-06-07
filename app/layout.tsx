import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

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
    <html lang="ko" suppressHydrationWarning className={geistMono.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a href="#main" className="skip-link">
            본문으로 건너뛰기
          </a>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
