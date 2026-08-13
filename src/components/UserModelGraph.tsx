"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SVG_EDGES,
  SVG_NODES,
  TONES,
  VIEW_H,
  VIEW_W,
  band,
  clamp01,
  easeInOut,
  toRgb,
  type ToneName,
} from "@/lib/model-graph-layout";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/**
 * The user model graph.
 *
 * Renders as flat SVG first, which is what the static export ships and what a
 * reader without JavaScript, without WebGL, or with reduced motion keeps. Once
 * mounted it lazy-loads the WebGL renderer and cross-fades to it, so the three.js
 * bundle never lands in the first-load payload. Both renderers draw the same
 * deterministic layout from lib/model-graph-layout, so the swap is invisible
 * apart from the depth appearing.
 */
const ModelGraphGL = dynamic(() => import("@/components/ModelGraphGL"), { ssr: false });

interface UserModelGraphProps {
  /** 0 -> 1 across the four stages. Ignored in ambient mode. */
  progress?: number;
  mode?: "sequence" | "ambient";
  tone?: ToneName;
  className?: string;
  /** Opt out of WebGL, for the stacked frames that are meant to be still. */
  flat?: boolean;
  /** Crop to a sub-region of the layout, "x y w h". The narrow stacked cards use
   *  this so the dots fill the frame instead of floating in a wide letterbox. */
  viewBox?: string;
}

export default function UserModelGraph({
  progress = 0,
  mode = "sequence",
  tone = "surface",
  className,
  flat = false,
  viewBox,
}: UserModelGraphProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [glReady, setGlReady] = useState(false);

  useEffect(() => setMounted(true), []);

  const useGl = mounted && !flat && !reducedMotion;

  return (
    // The aspect ratio gives the box a height when a caller drops it into
    // auto-height flow, like the hero panel. Callers that size it themselves
    // (the pipeline passes `absolute inset-0`) make both dimensions definite,
    // and CSS then ignores the ratio.
    <div
      className={cn("relative h-full w-full", className)}
      style={{ aspectRatio: viewBox ? viewBox.split(' ').slice(2).join(' / ') : `${VIEW_W} / ${VIEW_H}` }}
    >
      <FlatGraph
        progress={progress}
        mode={mode}
        tone={tone}
        viewBox={viewBox}
        // Held at full opacity until WebGL has actually drawn a frame, so a slow
        // chunk load or a failed context never leaves an empty box.
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          glReady ? "opacity-0" : "opacity-100"
        )}
      />
      {useGl && (
        <ModelGraphGL
          progress={progress}
          mode={mode}
          tone={tone}
          className="absolute inset-0"
          onReady={() => setGlReady(true)}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function FlatGraph({
  progress,
  mode,
  tone,
  className,
  viewBox,
}: {
  progress: number;
  mode: "sequence" | "ambient";
  tone: ToneName;
  className?: string;
  viewBox?: string;
}) {
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const edgeRefs = useRef<(SVGLineElement | null)[]>([]);
  const edgeGroup = useRef<SVGGElement>(null);
  const colors = TONES[tone];
  const ambient = mode === "ambient";
  const count = SVG_NODES.length;

  // The dot and edge markup never changes, only its attributes. Memoising it
  // lets React bail out of the subtree while scroll drives the attribute writes
  // imperatively below, so a scroll frame touches the DOM and nothing else.
  const marks = useMemo(
    () => ({
      edges: SVG_EDGES.map(([from, to], i) => (
        <line
          key={`e-${i}`}
          ref={(el) => {
            edgeRefs.current[i] = el;
          }}
          x1={SVG_NODES[from].layouts[1].x}
          y1={SVG_NODES[from].layouts[1].y}
          x2={SVG_NODES[to].layouts[1].x}
          y2={SVG_NODES[to].layouts[1].y}
          stroke={colors.edge}
          strokeWidth={1}
        />
      )),
      nodes: SVG_NODES.map((node, i) => (
        <circle
          key={`n-${i}`}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          cx={node.layouts[ambient ? 1 : 3].x}
          cy={node.layouts[ambient ? 1 : 3].y}
          r={node.size * 2.2}
          fill={node.qual ? colors.qual : colors.quant}
          style={
            ambient
              ? ({
                  "--dx": `${node.drift.dx}px`,
                  "--dy": `${node.drift.dy}px`,
                  animation: `umg-drift ${node.drift.dur}s ease-in-out ${node.drift.delay}s infinite alternate`,
                } as React.CSSProperties)
              : undefined
          }
        />
      )),
    }),
    [ambient, colors.edge, colors.qual, colors.quant]
  );

  useEffect(() => {
    if (ambient) return;

    const s = clamp01(progress) * 3;
    const index = Math.min(2, Math.floor(s));
    const t = easeInOut(clamp01(s - index));
    const heat = band(progress, 0.7, 1);

    const density = toRgb(colors.density);
    const qualRgb = toRgb(colors.qual);
    const quantRgb = toRgb(colors.quant);

    for (let i = 0; i < count; i++) {
      const el = nodeRefs.current[i];
      if (!el) continue;

      const node = SVG_NODES[i];
      const a = node.layouts[index];
      const b = node.layouts[index + 1];
      const x = a.x + (b.x - a.x) * t;
      const y = a.y + (b.y - a.y) * t;

      el.setAttribute("cx", x.toFixed(2));
      el.setAttribute("cy", y.toFixed(2));
      // Dots swell and soften on the last stage so overlapping marks pool into
      // density rather than reading as a scatter of individual points.
      el.setAttribute("r", (node.size * 2.2 * (1 + heat * 1.5)).toFixed(2));
      el.setAttribute("opacity", (0.85 - heat * 0.58).toFixed(3));

      const base = node.qual ? qualRgb : quantRgb;
      el.setAttribute(
        "fill",
        heat === 0
          ? node.qual
            ? colors.qual
            : colors.quant
          : `rgb(${base.map((v, k) => Math.round(v + (density[k] - v) * heat)).join(",")})`
      );
    }

    const edgeOpacity = Math.min(band(progress, 0.14, 0.34), 1 - band(progress, 0.42, 0.56));
    if (edgeGroup.current) {
      edgeGroup.current.setAttribute("opacity", Math.max(0, edgeOpacity * 0.4).toFixed(3));
    }

    if (edgeOpacity <= 0) return;

    for (let i = 0; i < SVG_EDGES.length; i++) {
      const el = edgeRefs.current[i];
      if (!el) continue;

      const [from, to] = SVG_EDGES[i];
      for (const [node, xAttr, yAttr] of [
        [SVG_NODES[from], "x1", "y1"],
        [SVG_NODES[to], "x2", "y2"],
      ] as const) {
        const a = node.layouts[index];
        const b = node.layouts[index + 1];
        el.setAttribute(xAttr, (a.x + (b.x - a.x) * t).toFixed(2));
        el.setAttribute(yAttr, (a.y + (b.y - a.y) * t).toFixed(2));
      }
    }
  }, [progress, ambient, count, colors.density, colors.qual, colors.quant]);

  return (
    <svg
      viewBox={viewBox ?? `0 0 ${VIEW_W} ${VIEW_H}`}
      className={cn("umg-root h-full w-full", className)}
      role="img"
      aria-label="Your customer data converging into one connected user model, splitting into synthetic users, and resolving into click density across two page variants."
    >
      <style>{`
        @keyframes umg-drift {
          from { transform: translate(0, 0); }
          to   { transform: translate(var(--dx), var(--dy)); }
        }
        @keyframes umg-edge-breathe {
          0%, 100% { opacity: 0.16; }
          50%      { opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .umg-root circle, .umg-root g { animation: none !important; }
        }
      `}</style>

      <g
        ref={edgeGroup}
        opacity={ambient ? undefined : 0}
        style={ambient ? { animation: "umg-edge-breathe 9s ease-in-out infinite" } : undefined}
      >
        {marks.edges}
      </g>
      {marks.nodes}
    </svg>
  );
}
