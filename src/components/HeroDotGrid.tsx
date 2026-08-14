"use client";

import { useEffect, useRef } from "react";

/**
 * A halftone-style field of dots painted onto a canvas, confined to its nearest
 * positioned ancestor (mount inside a `relative` section). Dots sit on an even
 * grid; a large-scale value-noise field varies each dot's resting opacity and
 * size, so the visible dots gather into a few separated cloud-like groups over
 * a mostly bare background.
 *
 * As the cursor moves through the field, nearby dots brighten toward full
 * opacity (re-lighting each time the cursor passes over them) and then fade back
 * to their resting opacity. They are also given a very slight physical nudge
 * away from the cursor, springing back once it leaves.
 *
 * Every dot is redrawn each frame, but dots that are invisible, cool, and at
 * rest are skipped, keeping the draw count down.
 *
 * Renders nothing for touch/no-hover pointers or when the user has requested
 * reduced motion.
 */
const SPACING = 5; // px between grid dots
const JITTER = 0; // 0 = dots sit on a perfect grid (no scatter)
const DOT_MIN = 0.4; // px, dot radius in the sparsest patches
const DOT_MAX = 1.5; // px, dot radius in the densest patches
const BASE_OPACITY_MAX = 0.15; // resting opacity of the densest texture dots
const NOISE_A = 200; // coarse noise cell size (px) — the cloud groups (smaller = more groups)
const NOISE_B = 85; // fine noise cell size (px) — breaks the groups up
const NOISE_A_WEIGHT = 0.6; // balance of coarse groups vs. fine break-up
const GROUP_LO = 0.44; // noise below this → bare background (no dots)
const GROUP_HI = 0.7; // noise above this → full-strength group
const DOT_HSL = "0, 0%, 100%"; // white

// Interaction.
const CURSOR_RADIUS = 60; // px — reach of the cursor's brighten + nudge
const GLOW_MAX = 1; // opacity a dot reaches right under the cursor
const GLOW_FADE = 0.94; // brightness retained per frame after the cursor leaves (higher = longer tail)
const PUSH_STRENGTH = 0.16; // per-frame nudge acceleration at the cursor's center
const SPRING_K = 0.05; // pull back toward home (stiffness)
const DAMPING = 0.86; // velocity retained per frame (< 1; lower = settles faster)
const MAX_DISP = 8; // px — clamp how far a dot can travel

const smooth = (t: number) => t * t * (3 - 2 * t);
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const HeroDotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const noHover = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (noHover || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let count = 0;
    let width = 0;
    let height = 0;
    // Per-dot state.
    let homeX = new Float32Array(0);
    let homeY = new Float32Array(0);
    let dx = new Float32Array(0); // displacement from home
    let dy = new Float32Array(0);
    let vx = new Float32Array(0); // velocity
    let vy = new Float32Array(0);
    let heat = new Float32Array(0); // 0..1 brightness from the cursor
    let baseA = new Float32Array(0); // resting opacity
    let sizes = new Float32Array(0);
    const mouse = { x: -9999, y: -9999, active: false };

    // Build a smooth value-noise sampler over the current canvas size.
    const makeNoise = (cell: number) => {
      const gc = Math.ceil(width / cell) + 2;
      const gr = Math.ceil(height / cell) + 2;
      const lat = new Float32Array(gc * gr);
      for (let i = 0; i < lat.length; i++) lat[i] = Math.random();
      return (x: number, y: number) => {
        const fx = x / cell;
        const fy = y / cell;
        const x0 = Math.floor(fx);
        const y0 = Math.floor(fy);
        const tx = smooth(fx - x0);
        const ty = smooth(fy - y0);
        const v00 = lat[y0 * gc + x0];
        const v10 = lat[y0 * gc + x0 + 1];
        const v01 = lat[(y0 + 1) * gc + x0];
        const v11 = lat[(y0 + 1) * gc + x0 + 1];
        return (v00 * (1 - tx) + v10 * tx) * (1 - ty) + (v01 * (1 - tx) + v11 * tx) * ty;
      };
    };

    const setup = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.floor(width / SPACING);
      const rows = Math.floor(height / SPACING);
      const offsetX = (width - (cols - 1) * SPACING) / 2;
      const offsetY = (height - (rows - 1) * SPACING) / 2;
      count = cols * rows;
      homeX = new Float32Array(count);
      homeY = new Float32Array(count);
      dx = new Float32Array(count);
      dy = new Float32Array(count);
      vx = new Float32Array(count);
      vy = new Float32Array(count);
      heat = new Float32Array(count);
      baseA = new Float32Array(count);
      sizes = new Float32Array(count);

      const noiseA = makeNoise(NOISE_A);
      const noiseB = makeNoise(NOISE_B);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const px = offsetX + c * SPACING + (Math.random() - 0.5) * 2 * JITTER * SPACING;
          const py = offsetY + r * SPACING + (Math.random() - 0.5) * 2 * JITTER * SPACING;
          homeX[idx] = px;
          homeY[idx] = py;
          const raw = NOISE_A_WEIGHT * noiseA(px, py) + (1 - NOISE_A_WEIGHT) * noiseB(px, py);
          const field = smoothstep(GROUP_LO, GROUP_HI, raw);
          sizes[idx] = DOT_MIN + (DOT_MAX - DOT_MIN) * field;
          baseA[idx] = field * BASE_OPACITY_MAX;
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `hsl(${DOT_HSL})`;
      const r2 = CURSOR_RADIUS * CURSOR_RADIUS;

      for (let idx = 0; idx < count; idx++) {
        let ddx = dx[idx];
        let ddy = dy[idx];
        let dvx = vx[idx];
        let dvy = vy[idx];
        let h = heat[idx] * GLOW_FADE; // cool down a little each frame

        // Cursor interaction: brighten + a slight nudge away.
        if (mouse.active) {
          const rx = homeX[idx] + ddx - mouse.x;
          const ry = homeY[idx] + ddy - mouse.y;
          const d2 = rx * rx + ry * ry;
          if (d2 < r2 && d2 > 0.01) {
            const dist = Math.sqrt(d2);
            const prox = 1 - dist / CURSOR_RADIUS;
            if (prox > h) h = prox; // re-lights each time the cursor passes over
            const f = (PUSH_STRENGTH * prox) / dist;
            dvx += rx * f;
            dvy += ry * f;
          }
        }
        heat[idx] = h;

        // Spring back toward home, with damping.
        dvx = (dvx - SPRING_K * ddx) * DAMPING;
        dvy = (dvy - SPRING_K * ddy) * DAMPING;
        ddx += dvx;
        ddy += dvy;
        const mag = Math.hypot(ddx, ddy);
        if (mag > MAX_DISP) {
          const s = MAX_DISP / mag;
          ddx *= s;
          ddy *= s;
        }
        dx[idx] = ddx;
        dy[idx] = ddy;
        vx[idx] = dvx;
        vy[idx] = dvy;

        // Brightness is the cursor glow or the resting opacity, whichever is more.
        const glow = h * GLOW_MAX;
        const alpha = baseA[idx] > glow ? baseA[idx] : glow;
        if (alpha < 0.012) continue;

        // Grow toward the full group-dot size when lit, so hovering a bare gap
        // looks the same as hovering a group (not just tiny specks).
        const radius = sizes[idx] + (DOT_MAX - sizes[idx]) * h;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(homeX[idx] + ddx, homeY[idx] + ddy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    setup();
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setup);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-0" />;
};

export default HeroDotGrid;
