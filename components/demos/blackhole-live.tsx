"use client";

import { Blackhole } from "black-hole-effect";

// 홈 Work 섹션의 라이브 블랙홀 — 손으로 짜뒀던 임시 셰이더(components/hoonjo/BlackHole)
// 대신 실제 배포한 패키지(black-hole-effect · github:H8njo/webgl-black-hole)를 렌더한다.
// 컴포넌트가 부모를 h-full로 채우고 렌더 중 window에 접근하므로, 부모(sections)에서
// next/dynamic ssr:false로 로드한다(데모와 동일 패턴).
export default function BlackholeLive() {
  return (
    <Blackhole
      numStars={3500}
      cameraSpeed={0.3}
      radius={500}
      animation
      brightnessRange={{ min: 0.8, max: 1.0 }}
    />
  );
}
