'use client';

import { useEffect, useRef, useState } from 'react';
import { Blackhole } from 'black-hole-effect';

// 임베드용 contained 블랙홀 데모.
// 고정 비율 박스(높이 ~420px, width 100%)에서 부모 컨테이너에 맞춰 렌더.
// 전체화면 버튼 + 별 개수 슬라이더(디바운스 후 remount로 재생성).
export default function BlackholeContained() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 슬라이더 즉시값(stars) vs 적용값(appliedStars). 드래그 중 매 틱 remount를 막으려 디바운스.
  const [stars, setStars] = useState(3500);
  const [appliedStars, setAppliedStars] = useState(3500);

  const enterFullscreen = () => {
    containerRef.current?.requestFullscreen?.().catch(() => {});
  };

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  // 슬라이더가 멈추면(250ms) 적용 → Blackhole이 새 별 개수로 remount.
  useEffect(() => {
    const t = setTimeout(() => setAppliedStars(stars), 250);
    return () => clearTimeout(t);
  }, [stars]);

  return (
    <div className="mt-6 overflow-hidden rounded border border-hairline bg-black">
      <div
        ref={containerRef}
        className="relative w-full bg-black"
        style={{ height: isFullscreen ? '100%' : 420 }}
      >
        {/* key가 전체화면/별개수에 바뀌어 Blackhole이 새 크기·별 수로 remount */}
        <Blackhole
          key={`${isFullscreen ? 'fs' : 'box'}-${appliedStars}`}
          numStars={appliedStars}
          cameraSpeed={0.3}
          radius={500}
          animation={false}
          brightnessRange={{ min: 0.8, max: 1.0 }}
          backgroundImageUrl="https://images.unsplash.com/photo-1516331138075-f3adc1e149cd?q=80&w=2708&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        {/* 별 개수 슬라이더 (좌하단, 작게). 캔버스 클릭 영역과 안 겹치게 코너에. */}
        <label className="absolute bottom-2 left-2 z-10 flex items-center gap-2 rounded border border-hairline/60 bg-black/40 px-2 py-1 font-mono text-[11px] text-gray-2 backdrop-blur">
          <span className="whitespace-nowrap">별 {stars.toLocaleString()}</span>
          <input
            type="range"
            min={500}
            max={10000}
            step={500}
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            aria-label="별 개수"
            className="h-1 w-24 cursor-pointer accent-accent"
          />
        </label>

        {/* 전체화면 토글 (우상단). */}
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
