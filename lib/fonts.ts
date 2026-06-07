import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

// 자체 호스팅 (T1.1) — CDN @import 제거로 렌더 블로킹 해소.
// Pretendard 가변 woff2는 ~2MB(한글 포함)라 preload:false로 비동기 로드(swap 폴백).
export const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
  preload: false,
});

// General Sans는 라틴 서브셋이라 가벼움 → preload.
export const generalSans = localFont({
  src: [
    { path: "../fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
