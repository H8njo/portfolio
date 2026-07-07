'use client';

import { useEffect, useRef, useState } from 'react';
import { Blackhole } from 'black-hole-effect';
import { LuMaximize } from 'react-icons/lu';

const BG_URL =
  'https://images.unsplash.com/photo-1516331138075-f3adc1e149cd?q=80&w=2708&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

// 임베드용 contained 블랙홀 데모.
// 고정 비율 박스(높이 ~420px, width 100%)에서 부모 컨테이너에 맞춰 렌더.
// 컨트롤: 별 개수 슬라이더(디바운스 remount), 배경 이미지 토글, 전체화면.
export default function BlackholeContained() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [useImage, setUseImage] = useState(true);

  // 슬라이더 즉시값 vs 적용값. 드래그 중 매 틱 remount를 막으려 디바운스.
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

  useEffect(() => {
    const t = setTimeout(() => setAppliedStars(stars), 250);
    return () => clearTimeout(t);
  }, [stars]);

  return (
    <div className="mt-6 overflow-hidden rounded border border-hj-line bg-black">
      <div
        ref={containerRef}
        className="relative w-full bg-black"
        style={{ height: isFullscreen ? '100%' : 420 }}
      >
        {/* key가 전체화면/별개수/이미지에 바뀌어 새 설정으로 remount */}
        <Blackhole
          key={`${isFullscreen ? 'fs' : 'box'}-${appliedStars}-${useImage ? 'img' : 'plain'}`}
          numStars={appliedStars}
          cameraSpeed={0.3}
          radius={500}
          animation={false}
          brightnessRange={{ min: 0.8, max: 1.0 }}
          backgroundImageUrl={useImage ? BG_URL : undefined}
        />

        {/* 컨트롤 (좌하단, 작게). 캔버스 클릭 영역과 안 겹치게 코너에. */}
        <div className="absolute bottom-2 left-2 z-10 flex items-center gap-3 rounded border border-hj-line/60 bg-black/40 px-2 py-1 font-hj-mono text-[11px] text-hj-faint backdrop-blur">
          <label className="flex items-center gap-2">
            <span className="whitespace-nowrap">별 {stars.toLocaleString()}</span>
            <input
              type="range"
              min={500}
              max={10000}
              step={500}
              value={stars}
              onChange={(e) => setStars(Number(e.target.value))}
              aria-label="별 개수"
              className="h-1 w-24 cursor-pointer accent-hj-blue"
            />
          </label>
          <span className="text-hj-line">|</span>
          <label className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap">
            <input
              type="checkbox"
              checked={useImage}
              onChange={(e) => setUseImage(e.target.checked)}
              className="cursor-pointer accent-hj-blue"
            />
            배경 이미지
          </label>
        </div>

        {/* 전체화면 토글 (우상단). */}
        <button
          type="button"
          onClick={enterFullscreen}
          className="absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded border border-hj-line/60 bg-black/40 px-2 py-1 font-hj-mono text-[11px] text-hj-faint backdrop-blur transition-colors hover:text-white"
        >
          <LuMaximize aria-hidden className="size-3" /> 전체화면
        </button>
      </div>
      <p className="px-4 py-2 font-hj-mono text-[11px] text-hj-faint">
        클릭하면 블랙홀이 그쪽으로 천천히 따라옵니다. raw WebGL 1.0 · GLSL.
      </p>
    </div>
  );
}
