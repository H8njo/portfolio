import { ImageResponse } from "next/og";

// 링크 공유 미리보기 카드. 한글 글리프 이슈 회피 위해 영문 카피 사용.
export const alt = "hoonjo — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f8ff",
          color: "#18191c",
          padding: 80,
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 30, color: "#3182f6" }}>h8njo.vercel.app</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: -2,
              maxWidth: 980,
              lineHeight: 1.15,
            }}
          >
            <div>Solving hard frontend problems</div>
            <div style={{ color: "#3182f6" }}>with measurable impact.</div>
          </div>
          <div style={{ fontSize: 32, color: "#6b6e76" }}>
            Performance · complex state · tricky rendering
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#6b6e76" }}>7-year Frontend Engineer</div>
      </div>
    ),
    { ...size },
  );
}
