"use client";

import { cn } from "@/lib/utils";

/**
 * Sequential click-density ramp: one hue, light to dark.
 *
 * Derived from the brand purple (--primary, hue 231) and validated as an ordinal
 * ramp: lightness is monotone, every adjacent step clears a 0.06 lightness gap,
 * the light end holds 2.15:1 against white, and hue spread is 7 degrees. Do not
 * mix a second hue into this ramp; density is magnitude, and magnitude gets one
 * hue. The lime highlight appears only as the discrete peak marker below.
 */
export const DENSITY_RAMP = ["#a3aee8", "#7b8ade", "#5468d4", "#3145b8", "#1f2f88"] as const;

export interface HeatPoint {
  /** Position as a percentage of the frame. */
  x: number;
  y: number;
  /** Click density, 0 to 1. Picks the ramp step. */
  w: number;
  /** Blob radius as a percentage of frame width. */
  r?: number;
  /** Marks the strongest cluster on the frame. */
  peak?: boolean;
}

function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function stepFor(weight: number) {
  const i = Math.round(weight * (DENSITY_RAMP.length - 1));
  return DENSITY_RAMP[Math.min(DENSITY_RAMP.length - 1, Math.max(0, i))];
}

interface HeatmapOverlayProps {
  points: HeatPoint[];
  className?: string;
}

export default function HeatmapOverlay({ points, className }: HeatmapOverlayProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {points.map((point, i) => {
        const color = stepFor(point.w);
        const radius = point.r ?? 9 + point.w * 7;
        return (
          <span
            key={i}
            className="absolute block rounded-full"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${radius * 2}%`,
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
              mixBlendMode: "multiply",
              background: `radial-gradient(circle, ${withAlpha(color, 0.62)} 0%, ${withAlpha(
                color,
                0.34
              )} 42%, ${withAlpha(color, 0)} 72%)`,
            }}
          />
        );
      })}

      {points
        .filter((point) => point.peak)
        .map((point, i) => (
          <span
            key={`peak-${i}`}
            className="absolute block rounded-full"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: "5.5%",
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
              border: "2px solid hsl(var(--highlight))",
              boxShadow: "0 0 0 1.5px hsl(var(--foreground) / 0.35)",
            }}
          />
        ))}
    </div>
  );
}

/** The label every illustrative figure on the page carries. */
export function SampleOutputPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-border bg-card px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/50",
        className
      )}
    >
      <span className="h-1.5 w-1.5 bg-highlight" />
      Sample output
    </span>
  );
}
