"use client";

import { useEffect, useRef, useState } from "react";
import { Blackhole } from "black-hole-effect";

// 임베드용 contained 블랙홀 데모.
// 풀스크린이 아니라 고정 비율 박스(높이 ~420px, width 100%) 안에서 부모 컨테이너에 맞춰 렌더.
// 전체화면 버튼은 박스를 requestFullscreen 하고, 컴포넌트의 ResizeObserver가 화면을 채운다.
// 임베드 perf를 위해 numStars를 3,500으로 낮춤. 배경은 외부 Unsplash 이미지 유지.
export default function BlackholeContained() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = () => {
    containerRef.current?.requestFullscreen?.().catch(() => {});
  };

  // Esc 등으로 빠져나오는 것도 fullscreenchange로 자연스럽게 반영.
  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return (
    <div className="mt-6 overflow-hidden rounded border border-hairline bg-black">
      <div
        ref={containerRef}
        className="relative w-full bg-black"
        style={{ height: isFullscreen ? "100%" : 420 }}
      >
        <Blackhole
          numStars={3500}
          cameraSpeed={0.3}
          radius={500}
          animation={false}
          brightnessRange={{ min: 0.8, max: 1.0 }}
          backgroundImageUrl="https://images.unsplash.com/photo-1516331138075-f3adc1e149cd?q=80&w=2708&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        {/* 전체화면 토글. 캔버스 클릭(블랙홀 이동)을 가로채지 않도록 작은 버튼만. */}
        <button
          type="button"
          onClick={enterFullscreen}
          className="absolute right-2 top-2 z-10 rounded border border-hairline/60 bg-black/40 px-2 py-1 font-mono text-[11px] text-gray-2 backdrop-blur transition-colors hover:text-white"
        >
          ⛶ 전체화면
        </button>
      </div>
      <p className="px-4 py-2 font-mono text-[11px] text-gray-2">
        클릭하면 블랙홀이 그쪽으로 천천히 따라옵니다. raw WebGL 1.0 · GLSL.
      </p>
    </div>
  );
}
