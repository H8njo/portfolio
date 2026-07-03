"use client";

import { useEffect, useRef } from 'react';

/* A real, live gravitational-lensing render — not a CSS mockup. Faithful to
   Hoonjo's actual webgl-black-hole project: a Canvas 2D starfield is uploaded
   as a WebGL texture, and a fragment shader warps the UVs around the black
   hole centre (rotation by distance + falloff) so the background bends like
   light under gravity. Black disk = event horizon, blue rim = photon ring.

   Static starfield (uploaded once) + animated lensing swirl. Honors
   prefers-reduced-motion (renders one still frame). Falls back to a static
   Canvas 2D starfield if WebGL is unavailable. Self-contained. */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() { v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_image;
uniform float u_time;
uniform float u_aspect;
const vec2 C = vec2(0.5, 0.46);
void main() {
  vec2 p = v_uv - C;
  p.x *= u_aspect;
  float d = length(p);
  float pull = 0.020 / (d * d + 0.0022);
  float falloff = smoothstep(0.42, 0.0, d);
  float ang = pull * falloff * 0.05 + u_time * 0.04 * falloff;
  float s = sin(ang), c = cos(ang);
  vec2 rp = vec2(p.x * c - p.y * s, p.x * s + p.y * c);
  rp *= 1.0 - falloff * 0.12;
  rp.x /= u_aspect;
  vec3 col = texture2D(u_image, C + rp).rgb;
  float horizon = smoothstep(0.082, 0.070, d);
  col = mix(col, vec3(0.0), horizon);
  float ring = smoothstep(0.115, 0.082, d) - smoothstep(0.082, 0.066, d);
  col += vec3(0.21, 0.53, 0.98) * ring * 1.5;
  gl_FragColor = vec4(col, 1.0);
}
`;

/* Procedural starfield onto an offscreen 2D canvas — this canvas becomes the
   shader's texture (and the fallback image). Dimensions are device pixels. */
function paintStarfield(c: HTMLCanvasElement, w: number, h: number) {
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  if (!ctx) return;
  ctx.fillStyle = '#0b0c0e';
  ctx.fillRect(0, 0, w, h);
  const neb = ctx.createRadialGradient(w * 0.5, h * 0.46, 0, w * 0.5, h * 0.46, Math.max(w, h) * 0.62);
  neb.addColorStop(0, 'rgba(49,130,246,0.12)');
  neb.addColorStop(1, 'rgba(11,12,14,0)');
  ctx.fillStyle = neb;
  ctx.fillRect(0, 0, w, h);
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
  for (let i = 0; i < 8200; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = Math.random();
    const size = (r < 0.86 ? 0.7 : r < 0.97 ? 1.2 : 1.9) * dpr;
    const a = 0.32 + Math.random() * 0.6;
    ctx.fillStyle = r < 0.92 ? `rgba(255,255,255,${a})` : `rgba(160,196,250,${a})`;
    ctx.fillRect(x, y, size, size);
  }
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement!;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const star = document.createElement('canvas');

    let raf = 0;
    let disposed = false;
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false, preserveDrawingBuffer: true }) as WebGLRenderingContext | null;

    /* ---- Fallback: static starfield, no shader ---- */
    if (!gl) {
      const render2d = () => {
        const w = Math.max(1, Math.round(parent.clientWidth * dpr));
        const h = Math.max(1, Math.round(parent.clientHeight * dpr));
        canvas.width = w; canvas.height = h;
        paintStarfield(canvas, w, h);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.beginPath();
          ctx.arc(w * 0.5, h * 0.46, Math.min(w, h) * 0.11, 0, Math.PI * 2);
          ctx.fillStyle = '#000';
          ctx.fill();
          ctx.lineWidth = 2 * dpr;
          ctx.strokeStyle = 'rgba(49,130,246,0.7)';
          ctx.stroke();
        }
      };
      render2d();
      const ro = new ResizeObserver(render2d);
      ro.observe(parent);
      return () => ro.disconnect();
    }

    /* ---- WebGL pipeline ---- */
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uAspect = gl.getUniformLocation(prog, 'u_aspect');
    const uImage = gl.getUniformLocation(prog, 'u_image');
    gl.uniform1i(uImage, 0);

    const resize = () => {
      const w = Math.max(1, Math.round(parent.clientWidth * dpr));
      const h = Math.max(1, Math.round(parent.clientHeight * dpr));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform1f(uAspect, w / h);
      paintStarfield(star, w, h);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, star);
    };

    const draw = (t: number) => {
      if (disposed) return;
      gl.uniform1f(uTime, reduce ? 0 : t / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);
    if (reduce) draw(0);
    else raf = requestAnimationFrame(draw);

    return () => {
      // Note: do NOT loseContext() here — React StrictMode runs
      // setup→cleanup→setup on the same canvas, and a lost context can't be
      // re-acquired, leaving a black panel. Just free this run's resources.
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} aria-label="중력렌즈 실시간 렌더" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />;
}
