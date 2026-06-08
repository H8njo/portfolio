"use client";

import Blackhole from "./blackhole/index";

// 임베드용 contained 블랙홀 데모.
// 풀스크린이 아니라 고정 비율 박스(높이 ~420px, width 100%) 안에서 부모 컨테이너에 맞춰 렌더.
// 임베드 perf를 위해 numStars를 3,500으로 낮춤. 배경은 외부 Unsplash 이미지 유지.
export default function BlackholeContained() {
  return (
    <div className="mt-6 overflow-hidden rounded border border-hairline bg-black">
      <div className="relative w-full" style={{ height: 420 }}>
        <Blackhole
          numStars={3500}
          cameraSpeed={0.3}
          radius={500}
          animation={false}
          brightnessRange={{ min: 0.8, max: 1.0 }}
          backgroundImageUrl="https://images.unsplash.com/photo-1516331138075-f3adc1e149cd?q=80&w=2708&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <p className="px-4 py-2 font-mono text-[11px] text-gray-2">
        클릭하면 블랙홀이 그쪽으로 천천히 따라옵니다. raw WebGL 1.0 · GLSL.
      </p>
    </div>
  );
}
