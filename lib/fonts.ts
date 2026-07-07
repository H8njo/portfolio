import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

// 자체 호스팅 (T1.1) — CDN @import 제거로 렌더 블로킹 해소.
// Pretendard 가변 woff2는 ~2MB(한글 포함)라 preload:false로 비동기 로드(swap 폴백).
export const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
  preload: false,
});

// 계측 보이스 (DESIGN.md). 구 CDN @import(hoonjo.css) + Geist Mono 대체.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
