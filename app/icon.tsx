import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// 파비콘 — 코발트 바탕에 흰 "h".
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2348FF",
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "monospace",
          borderRadius: 6,
        }}
      >
        h
      </div>
    ),
    { ...size },
  );
}
