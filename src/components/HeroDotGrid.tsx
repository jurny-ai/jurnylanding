"use client";

import { useEffect, useRef } from "react";

/**
 * A field of dots painted onto a canvas, confined to its nearest positioned
 * ancestor (mount inside a `relative` section). Dots start from an even grid
 * but each is jittered off its cell (and given a slightly random size) so the
 * field keeps an ordered grid feel while softening the rigid lattice that would
 * otherwise create a moiré illusion.
 *
 * Every dot is invisible until the cursor passes near it. Dots under the cursor
 * light up brightest and biggest, then fade to a faint level that lingers while
 * gently shrinking — leaving a shooting-star trail along the path the cursor
 * just took before it fades out.
 *
 * Renders nothing for touch/no-hover pointers or when the user has requested
 * reduced motion.
 */
const SPACING = 5; // px between grid cells (before jitter)
const JITTER = 0.25; // how far a dot can drift off its cell, as a fraction of SPACING
const DOT_MIN = 0.7; // px, smallest base dot radius
const DOT_MAX = 1.3; // px, largest base dot radius
const SIZE_FLOOR = 0.5; // trail dots keep at least this fraction of their base size
const REVEAL_RADIUS = 55; // px around the cursor that lights up (the "star")
const TRAIL_THRESHOLD = 0.4; // above this a dot is the bright head; below, the trail
const HEAD_FADE = 0.85; // fast decay for the bright head (~0.3s)
const TRAIL_FADE = 0.985; // slow decay for the lingering trail (~4s) — longer tail
const DOT_HSL = "75.08, 85.65%, 59.02%"; // brand lime (--highlight)

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

    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let offsetY = 0;
    let width = 0;
    let height = 0;
    // Per-dot state, indexed r * cols + c.
    let intensities = new Float32Array(0);
    let posX = new Float32Array(0); // jittered pixel position
    let posY = new Float32Array(0);
    let sizes = new Float32Array(0);
    const mouse = { x: -9999, y: -9999, active: false };

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
      cols = Math.floor(width / SPACING);
      rows = Math.floor(height / SPACING);
      offsetX = (width - (cols - 1) * SPACING) / 2;
      offsetY = (height - (rows - 1) * SPACING) / 2;
      const count = cols * rows;
      intensities = new Float32Array(count);
      posX = new Float32Array(count);
      posY = new Float32Array(count);
      sizes = new Float32Array(count);
      // Freeze a random jitter + size per dot so the field is stable but not gridded.
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          posX[idx] = offsetX + c * SPACING + (Math.random() - 0.5) * 2 * JITTER * SPACING;
          posY[idx] = offsetY + r * SPACING + (Math.random() - 0.5) * 2 * JITTER * SPACING;
          sizes[idx] = DOT_MIN + Math.random() * (DOT_MAX - DOT_MIN);
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
      // Light up dots within reach of the cursor (brightest at the center). The
      // cell scan is padded by the jitter range so drifted dots aren't missed.
      if (mouse.active) {
        const pad = REVEAL_RADIUS + JITTER * SPACING;
        const minCol = Math.max(0, Math.floor((mouse.x - pad - offsetX) / SPACING));
        const maxCol = Math.min(cols - 1, Math.ceil((mouse.x + pad - offsetX) / SPACING));
        const minRow = Math.max(0, Math.floor((mouse.y - pad - offsetY) / SPACING));
        const maxRow = Math.min(rows - 1, Math.ceil((mouse.y + pad - offsetY) / SPACING));
        for (let r = minRow; r <= maxRow; r++) {
          for (let c = minCol; c <= maxCol; c++) {
            const idx = r * cols + c;
            const dist = Math.hypot(posX[idx] - mouse.x, posY[idx] - mouse.y);
            if (dist < REVEAL_RADIUS) {
              const v = 1 - dist / REVEAL_RADIUS;
              if (v > intensities[idx]) intensities[idx] = v;
            }
          }
        }
      }

      // Draw lit dots. Brightness scales fully with intensity; size only tapers
      // down to SIZE_FLOOR, so the tail stays visible instead of vanishing.
      ctx.clearRect(0, 0, width, height);
      const count = intensities.length;
      for (let idx = 0; idx < count; idx++) {
        const v = intensities[idx];
        if (v <= 0.01) {
          intensities[idx] = 0;
          continue;
        }
        const radius = sizes[idx] * (SIZE_FLOOR + (1 - SIZE_FLOOR) * v);
        ctx.beginPath();
        ctx.arc(posX[idx], posY[idx], radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${DOT_HSL}, ${v})`;
        ctx.fill();
        intensities[idx] = v > TRAIL_THRESHOLD ? v * HEAD_FADE : v * TRAIL_FADE;
      }
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

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-10" />;
};

export default HeroDotGrid;
