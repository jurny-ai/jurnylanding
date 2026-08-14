"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import PhoneMock from "@/components/mocks/PhoneMock";
import HeatmapOverlay from "@/components/HeatmapOverlay";
import UserModelGraph from "@/components/UserModelGraph";
import { AGENT_ANCHORS, PANELS, VIEW_H, VIEW_W, easeInOut } from "@/lib/model-graph-layout";
import { JOURNEY } from "@/lib/variant-clicks";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    n: "01",
    title: "All your customer data, in one place",
  },
  {
    n: "02",
    title: "One user model, two layers",
  },
  {
    n: "03",
    title: "Synthetic users with traits and goals",
  },
  {
    n: "04",
    title: "They use your site the way people do",
  },
];

/* The two clouds the data converges from. */
const QUAL_SOURCES = ["Interviews", "Support tickets", "Reviews", "Session notes", "Survey verbatims"];
const QUANT_SOURCES = ["Funnel analytics", "Session replay", "Order history", "Cohort retention", "Price tests"];

const AGENTS = [
  { name: "First time buyer", traits: "Mobile · Price sensitive", scenario: "Has a 15% code from an email, comparing three brands." },
  { name: "Returning subscriber", traits: "Desktop · Loyal", scenario: "Reordering the same size, expects the member price." },
  { name: "Gift buyer", traits: "Mobile · In a hurry", scenario: "Buying for someone else, needs it before Friday." },
  { name: "Bundler", traits: "Desktop · High intent", scenario: "Wants the full set in a single order." },
  { name: "Comparison shopper", traits: "Mobile · Skeptical", scenario: "Two tabs open, waiting on a better discount." },
  { name: "Lapsed customer", traits: "Desktop · Cautious", scenario: "Last ordered 14 months ago, starting from an empty cart." },
];

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const band = (v: number, from: number, to: number) => clamp01((v - from) / (to - from));
/** Ramps up over [inA, inB] and back down over [outA, outB]. */
const window2 = (v: number, inA: number, inB: number, outA: number, outB: number) =>
  Math.min(band(v, inA, inB), 1 - band(v, outA, outB));

/** Half the gap between two journey panels, for placing the connector. */
const PANEL_GAP_HALF = (PANELS[1].x - (PANELS[0].x + PANELS[0].w)) / 2;

const pctX = (x: number) => `${(x / VIEW_W) * 100}%`;
const pctY = (y: number) => `${(y / VIEW_H) * 100}%`;

/** A crop of the layout, in viewBox units: x, y, width, height. */
type Box = [number, number, number, number];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Pans and zooms between two crops rather than sliding four numbers
 *  independently, because centre and size are what the eye actually tracks. */
const lerpBox = (a: Box, b: Box, t: number): Box => {
  const w = lerp(a[2], b[2], t);
  const h = lerp(a[3], b[3], t);
  return [
    lerp(a[0] + a[2] / 2, b[0] + b[2] / 2, t) - w / 2,
    lerp(a[1] + a[3] / 2, b[1] + b[3] / 2, t) - h / 2,
    w,
    h,
  ];
};

/** Position within a crop, as a percentage of it. The same idiom as pctX/pctY,
 *  for the crops that move. */
const boxRect = (view: Box, rect: { x: number; y: number; w: number; h: number }) => ({
  left: `${((rect.x - view[0]) / view[2]) * 100}%`,
  top: `${((rect.y - view[1]) / view[3]) * 100}%`,
  width: `${(rect.w / view[2]) * 100}%`,
  height: `${(rect.h / view[3]) * 100}%`,
});

/**
 * The rendered size of an element.
 *
 * Both pinned sequences size their canvas from the room the rest of the layout
 * leaves behind. Measuring that beats hand-counting the chrome above and below
 * it, which silently goes stale whenever the type scale changes or a heading
 * wraps to another line at some viewport width nobody checked.
 */
function useBoxSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return size;
}

function scrollToStage(ref: RefObject<HTMLElement>, index: number) {
  const node = ref.current;
  if (!node) return;

  const rect = node.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  const sequenceTop = window.scrollY + rect.top;
  const progress = index / (STAGES.length - 1);

  window.scrollTo({
    top: sequenceTop + travel * progress,
    behavior: "smooth",
  });
}

function SourceCloud({ align, title, chips }: { align: "left" | "right"; title: string; chips: string[] }) {
  return (
    <div
      className={cn("absolute top-[4%] max-w-[30%]", align === "left" ? "left-[2%]" : "right-[2%] text-right")}
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">{title}</p>
      <div className={cn("mt-2 flex flex-wrap gap-1.5", align === "right" && "justify-end")}>
        {chips.map((chip) => (
          <span key={chip} className="border border-border bg-card px-2 py-1 text-[11px] font-semibold text-foreground/60">
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

function LayerCallout({
  align,
  title,
  body,
}: {
  align: "left" | "right";
  title: string;
  body: string;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-[3%] max-w-[27%] border border-border bg-card p-3",
        align === "left" ? "left-[2%]" : "right-[2%]"
      )}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{title}</p>
      <p className="mt-1.5 text-xs leading-snug text-foreground/60">{body}</p>
    </div>
  );
}

/**
 * One frame of the sequence. The pinned desktop version drives `progress` from
 * scroll; the fallback renders four of these at fixed progress values, so both
 * paths show exactly the same artwork.
 */
/* Crops for the stacked cards, one per stage, framing just that stage's content.
   Without these the narrow card shows the whole 1000x440 canvas and the dots sit
   in a letterbox with margins on every side. Each is sized to the stage's actual
   extent; see the layouts in lib/model-graph-layout. */
const STACKED_VIEWBOX = ["105 28 790 380", "180 66 640 308", "116 33 768 369"];

/* Union of the scatter, graph and agent extents. The mobile sequence holds this
   one frame across the first three stages so the cloud animates rather than
   cutting between crops. */
const MOBILE_VIEW_START: Box = [95, 45, 810, 345];

/* Stage 4 travels out of that framing and into the first journey panel, so the
   dots pooling into click density land on a screen big enough to read on a
   phone. The pad is what keeps the mock off the edges of its slot. */
const MOBILE_VIEW_PAD = 22;
const MOBILE_VIEW_END: Box = [
  PANELS[0].x - MOBILE_VIEW_PAD,
  PANELS[0].y - MOBILE_VIEW_PAD,
  PANELS[0].w + MOBILE_VIEW_PAD * 2,
  PANELS[0].h + MOBILE_VIEW_PAD * 2,
];

function StageCanvas({ progress, overlays = true }: { progress: number; overlays?: boolean }) {
  const sources = 1 - band(progress, 0.08, 0.2);
  const layers = window2(progress, 0.26, 0.36, 0.44, 0.52);
  const agents = window2(progress, 0.52, 0.62, 0.72, 0.78);
  const panels = band(progress, 0.76, 0.86);

  // On the stacked path the wide three-phone composition is unreadable, so
  // stage 4 shows one screen at a legible size and StageDetail lists all three.
  // Stage index the stacked cards render at, from the exact progress values they
  // are given: 0, 1/3, 2/3, 1. Threshold comparisons mis-bin those endpoints.
  const stackedStage = Math.round(progress * 3);

  if (!overlays && stackedStage === 3) {
    return (
      <div className="mx-auto w-full max-w-[220px]">
        <PhoneMock screen={JOURNEY[0].screen} className="ring-1 ring-foreground/15">
          <HeatmapOverlay points={JOURNEY[0].clicks} />
        </PhoneMock>
      </div>
    );
  }

  if (!overlays) {
    return (
      <UserModelGraph
        progress={progress}
        flat
        viewBox={STACKED_VIEWBOX[stackedStage]}
        className="w-full"
      />
    );
  }

  return (
    // Width-driven only. Adding a definite height here would make CSS drop the
    // aspect-ratio, and the overlays below are positioned as percentages of a
    // box that has to stay exactly VIEW_W by VIEW_H or they detach from the dots.
    <div className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
      {/* One buying journey, screen by screen, with the clicks that happened on
          each. Rendered before the graph on purpose: these are the pages being
          used, so the pooled points have to paint on top of them. The points land
          on the real buttons because each panel rect and its mock frame are the
          same rectangle and both read their coordinates from lib/variant-clicks.
          Phones, because that is how a D2C storefront is actually used. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: overlays ? panels : 0,
          visibility: !overlays || panels < 0.01 ? "hidden" : undefined,
        }}
      >
        {PANELS.map((panel, i) => (
          <div key={i}>
            <div
              className="absolute flex items-baseline gap-2"
              style={{ left: pctX(panel.x), top: pctY(panel.y - 30) }}
            >
              <span className="text-[11px] font-bold tabular-nums text-primary">0{i + 1}</span>
              <span className="text-sm font-semibold tracking-tight text-foreground">{JOURNEY[i].step}</span>
            </div>

            <div
              className="absolute"
              style={{
                left: pctX(panel.x),
                top: pctY(panel.y),
                width: pctX(panel.w),
                height: pctY(panel.h),
              }}
            >
              <PhoneMock
                screen={JOURNEY[i].screen}
                className="h-full ring-1 ring-foreground/15"
              />
            </div>

            {i < PANELS.length - 1 && (
              <ArrowRight
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-primary/50"
                style={{
                  left: pctX(panel.x + panel.w + PANEL_GAP_HALF),
                  top: pctY(panel.y + panel.h / 2),
                }}
              />
            )}
          </div>
        ))}
      </div>

      <UserModelGraph progress={progress} flat={!overlays} className="absolute inset-0" />

      {/* The overlays are absolutely positioned at percentages of a wide canvas.
          They only hold up at the pinned size, so narrow layouts drop them and
          render the same content as flowing text instead. See StageDetail. */}
      {!overlays ? null : (
        <>
          <div
            className="absolute inset-0"
            style={{ opacity: sources, visibility: sources < 0.01 ? "hidden" : undefined }}
          >
            <SourceCloud align="left" title="Qualitative" chips={QUAL_SOURCES} />
            <SourceCloud align="right" title="Quantitative" chips={QUANT_SOURCES} />
          </div>

          <div
            className="absolute inset-0"
            style={{ opacity: layers, visibility: layers < 0.01 ? "hidden" : undefined }}
          >
            <LayerCallout
              align="left"
              title="Population layer"
              body="Segment sizes, behavioral distributions, price elasticity. This is what predicts a test."
            />
            <LayerCallout
              align="right"
              title="Individual layer"
              body="One customer with memory, constraints, and intent. This is what explains a drop-off."
            />
          </div>

          <div
            className="absolute inset-0"
            style={{ opacity: agents, visibility: agents < 0.01 ? "hidden" : undefined }}
          >
            {AGENTS.map((agent, i) => (
              <div
                key={agent.name}
                className="absolute w-[22%] -translate-x-1/2 border border-border bg-card p-2.5"
                style={{ left: pctX(AGENT_ANCHORS[i].x), top: pctY(AGENT_ANCHORS[i].y + 44) }}
              >
                <p className="text-xs font-semibold leading-tight tracking-tight text-foreground">{agent.name}</p>
                <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-primary">{agent.traits}</p>
                <p className="mt-1.5 text-[11px] leading-snug text-foreground/55">{agent.scenario}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** The overlay content from one stage, laid out as ordinary flowing markup for
 *  the stacked path where absolute percentage positioning would collapse. */
function StageDetail({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { title: "Qualitative", chips: QUAL_SOURCES },
          { title: "Quantitative", chips: QUANT_SOURCES },
        ].map((group) => (
          <div key={group.title}>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground/45">{group.title}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {group.chips.map((chip) => (
                <span
                  key={chip}
                  className="border border-border bg-secondary px-2 py-1 text-xs font-semibold text-foreground/60"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          {
            title: "Population layer",
            body: "Segment sizes, behavioral distributions, price elasticity. This is what predicts a test.",
          },
          {
            title: "Individual layer",
            body: "One customer with memory, constraints, and intent. This is what explains a drop-off.",
          },
        ].map((layer) => (
          <div key={layer.title} className="border border-border bg-secondary p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{layer.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">{layer.body}</p>
          </div>
        ))}
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {AGENTS.map((agent) => (
          <div key={agent.name} className="border border-border bg-secondary p-3">
            <p className="text-sm font-semibold tracking-tight text-foreground">{agent.name}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">{agent.traits}</p>
            <p className="mt-1.5 text-xs leading-snug text-foreground/55">{agent.scenario}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {JOURNEY.map((step, i) => (
        <div key={step.step} className="border border-border bg-secondary p-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">0{i + 1}</p>
          <p className="mt-1 text-sm font-semibold tracking-tight text-foreground">{step.step}</p>
          <p className="mt-1.5 text-xs leading-snug text-foreground/55">
            {step.clicks.length} click clusters recorded
          </p>
        </div>
      ))}
    </div>
  );
}

function StageRail({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-4">
        {STAGES.map((stage, i) => (
          <button
            type="button"
            key={stage.n}
            onClick={() => onSelect(i)}
            aria-current={i === active ? "step" : undefined}
            className={cn(
              "border-t-2 pt-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background",
              i === active ? "border-primary" : "border-border"
            )}
          >
            <p
              className={cn(
                "text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-300",
                i === active ? "text-primary" : "text-foreground/30"
              )}
            >
              {stage.n}
            </p>
            <p
              className={cn(
                "mt-1 text-base font-semibold leading-snug tracking-tight transition-colors duration-300",
                i === active ? "text-foreground" : "text-foreground/35"
              )}
            >
              {stage.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Compact per-stage detail for the pinned mobile sequence. The desktop
 *  StageDetail is too tall for a phone viewport once the canvas takes its share,
 *  so this shows the same content trimmed to what fits. */
function MobileStageDetail({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      // Two labelled columns, not one pooled list. The point of this stage is
      // that both kinds of evidence go in, which an unlabelled run of chips
      // does not say: it just reads as a list of sources.
      <div className="grid grid-cols-2 gap-3">
        {[
          { title: "Qualitative", chips: QUAL_SOURCES.slice(0, 3) },
          { title: "Quantitative", chips: QUANT_SOURCES.slice(0, 3) },
        ].map((group) => (
          <div key={group.title}>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground/45">
              {group.title}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {group.chips.map((chip) => (
                <span
                  key={chip}
                  className="border border-border bg-secondary px-2 py-1 text-[11px] font-semibold text-foreground/60"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (stage === 1) {
    return (
      <div className="grid gap-2">
        {[
          { title: "Population layer", body: "Segment sizes and behavioral distributions. This predicts a test." },
          { title: "Individual layer", body: "One customer with memory and intent. This explains a drop-off." },
        ].map((layer) => (
          <div key={layer.title} className="border border-border bg-secondary p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{layer.title}</p>
            <p className="mt-1 text-[11px] leading-snug text-foreground/60">{layer.body}</p>
          </div>
        ))}
      </div>
    );
  }

  if (stage === 2) {
    return (
      // One line per user rather than a stacked card. Three of these set the
      // height of the whole detail block, and the name and its traits read fine
      // side by side at this width.
      <div className="grid gap-1.5">
        {AGENTS.slice(0, 3).map((agent) => (
          <div
            key={agent.name}
            className="flex items-baseline justify-between gap-2 border border-border bg-secondary px-2.5 py-1.5"
          >
            <p className="text-xs font-semibold tracking-tight text-foreground">{agent.name}</p>
            <p className="text-right text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
              {agent.traits}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {JOURNEY.map((step, i) => (
        <div key={step.step} className="border border-border bg-secondary p-2.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">0{i + 1}</p>
          <p className="mt-1 text-[11px] font-semibold leading-tight tracking-tight text-foreground">{step.step}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * The same four-stage sequence, composed for a phone.
 *
 * The desktop version pins a wide canvas and hangs cards on it at percentage
 * coordinates, which does not survive a 390px viewport. This keeps the pinning
 * and the scroll-driven cloud, but stacks title, canvas and detail vertically.
 *
 * Every band of this layout holds one size for the whole scroll. The title and
 * the detail each stack all four stages in a single grid cell and cross-fade
 * between them, so both are as tall as their longest stage at every moment, and
 * the canvas between them keeps one box rather than being resized from above and
 * below as the copy changes. What moves is the artwork inside that box.
 */
function MobileSequence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapRef);
  const slot = useBoxSize(slotRef);
  const active = Math.min(3, Math.floor(progress * 4 + 0.001));

  // Stage 4 as one continuous move instead of a cut to a static screenshot. The
  // dots finish pooling into their three panel clusters in the wide framing
  // first; only then does the crop travel into the first panel, and the cloud
  // fades over that travel so the two clusters being left behind dissolve rather
  // than streak off the edge. The phone grows in under the dots still landing on
  // it, and the heatmap resolves last, out of the density they had pooled into.
  // Everything lands a little before the end of the scroll, so the finished
  // frame gets a beat of its own rather than completing on the last pixel.
  const zoom = easeInOut(band(progress, 0.84, 0.97));
  const view = lerpBox(MOBILE_VIEW_START, MOBILE_VIEW_END, zoom);
  const cloud = 1 - band(progress, 0.86, 0.95);
  const phone = band(progress, 0.86, 0.94);
  const heat = band(progress, 0.9, 0.98);

  // An SVG letterboxes its crop inside whatever box it is given, so the crop gets
  // a box of its own aspect, centred in the slot. Everything hung on the canvas
  // is then placed in percentages of that box, the way the desktop overlays are.
  const scale = slot.w && slot.h ? Math.min(slot.w / view[2], slot.h / view[3]) : 0;

  return (
    <div ref={wrapRef} className="relative h-[340vh]">
      <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col px-4 pb-6 pt-5">
        <div className="shrink-0">
          <div className="flex items-center gap-1.5">
            {STAGES.map((stage, i) => (
              <button
                type="button"
                key={stage.n}
                onClick={() => scrollToStage(wrapRef, i)}
                aria-label={`Go to step ${i + 1}: ${stage.title}`}
                aria-current={i === active ? "step" : undefined}
                className="flex flex-1 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span
                  className={cn(
                    "h-0.5 w-full transition-colors duration-300",
                    i <= active ? "bg-primary" : "bg-border"
                  )}
                />
              </button>
            ))}
          </div>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
            {STAGES[active].n} / 04
          </p>
          <div className="mt-1 grid">
            {STAGES.map((stage, i) => (
              <p
                key={stage.n}
                aria-hidden={i !== active}
                className={cn(
                  "col-start-1 row-start-1 text-lg font-semibold leading-snug tracking-tight text-foreground transition-opacity duration-300",
                  i !== active && "pointer-events-none"
                )}
                style={{ opacity: i === active ? 1 : 0 }}
              >
                {stage.title}
              </p>
            ))}
          </div>
        </div>

        {/* w-full and min-h-0 flex-1 make both of the slot's dimensions come from
            the column rather than from what is inside it, so measuring it to size
            the canvas cannot feed back into its own size. */}
        <div ref={slotRef} className="relative my-4 flex min-h-0 w-full flex-1 items-center justify-center">
          {/* Before the first measurement lands, fall back to the width-driven
              box. At the wide framing that is the same box the measurement
              produces, so the swap on the next frame is invisible. */}
          <div
            className="relative"
            style={
              scale
                ? { width: view[2] * scale, height: view[3] * scale }
                : { width: "100%", aspectRatio: `${view[2]} / ${view[3]}` }
            }
          >
            <div
              className="absolute inset-0"
              style={{ opacity: cloud, visibility: cloud < 0.01 ? "hidden" : undefined }}
            >
              <UserModelGraph
                progress={progress}
                flat
                viewBox={view.join(" ")}
                className="absolute inset-0"
              />
            </div>

            <div
              className="absolute"
              style={{
                ...boxRect(view, PANELS[0]),
                opacity: phone,
                visibility: phone < 0.01 ? "hidden" : undefined,
              }}
            >
              <PhoneMock screen={JOURNEY[0].screen} className="h-full ring-1 ring-foreground/15">
                <div className="absolute inset-0" style={{ opacity: heat }}>
                  <HeatmapOverlay points={JOURNEY[0].clicks} />
                </div>
              </PhoneMock>
            </div>
          </div>
        </div>

        {/* The cell is as tall as the longest stage, so the shorter ones leave
            slack. items-end spends that slack above the text instead of below
            it, which puts every stage's last line the same distance off the
            bottom of the screen and hides the slack next to the canvas.

            MobileStageDetail branches on position in STAGES, so these stay in
            step with the titles above only as long as that order is the order. */}
        <div className="grid shrink-0 items-end">
          {STAGES.map((stage, i) => (
            <div
              key={stage.n}
              aria-hidden={i !== active}
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-300",
                i !== active && "pointer-events-none"
              )}
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <MobileStageDetail stage={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PinnedSequence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapRef);
  const active = progress < 0.24 ? 0 : progress < 0.48 ? 1 : progress < 0.74 ? 2 : 3;

  // The canvas takes its height from its width, so the width has to be capped to
  // whatever leaves the derived height fitting the space the stage rail leaves
  // behind. Measuring the slot cannot feed back into its own size: it is a
  // min-h-0 flex-1 child of a fixed-height column, so its height is the leftover
  // space no matter how wide the canvas inside it is.
  const slotRef = useRef<HTMLDivElement>(null);
  const slot = useBoxSize(slotRef);

  return (
    <div ref={wrapRef} className="relative h-[360vh]">
      <div className="sticky top-0 flex h-screen flex-col pb-6 pt-16">
        <div className="container mx-auto shrink-0 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <StageRail active={active} onSelect={(index) => scrollToStage(wrapRef, index)} />
          </div>
        </div>
        <div ref={slotRef} className="container mx-auto mt-3 min-h-0 flex-1 px-4 sm:px-6">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
            {/* The wide aspect is what lets the canvas run the full column width
                on a roomy viewport; a shorter slot narrows it from both sides
                rather than clipping it. The calc is only the value for the first
                frame, before the measurement lands. */}
            <div
              className="w-full"
              style={{
                maxWidth: slot.h
                  ? `${slot.h * (VIEW_W / VIEW_H)}px`
                  : `calc((100vh - 190px) * ${VIEW_W / VIEW_H})`,
              }}
            >
              <StageCanvas progress={progress} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** No pinning: the same four frames, stacked and read at the reader's pace. */
function StackedStages() {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
        {STAGES.map((stage, i) => (
          <Reveal key={stage.n} asChild delay={(i % 2) * 100}>
            <article className="flex h-full flex-col border border-border bg-card">
              <div className="border-b border-border bg-secondary/60 p-3">
                <StageCanvas progress={i / (STAGES.length - 1)} overlays={false} />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{stage.n}</p>
                <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground">{stage.title}</h3>
                <div className="mt-5">
                  <StageDetail index={i} />
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function ModelPipeline() {
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  // Server and first client render both take the stacked path, so the static
  // export always ships a complete, readable section. A pinned sequence is an
  // upgrade applied after mount, when motion is welcome: the wide composition on
  // desktop, a phone-shaped one below it. Reduced motion keeps the stacked cards,
  // since pinning is the thing that setting is asking us not to do.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pinned = mounted && !reducedMotion;

  return (
    <section id="model" className="scroll-mt-14 border-b border-border bg-background pb-14 pt-8 sm:scroll-mt-16 sm:pb-20 sm:pt-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Under the hood
            </p>
            <h2 className="max-w-4xl text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-foreground sm:text-5xl">
              How our model works.
            </h2>
          </Reveal>
        </div>
      </div>

      {!pinned ? <StackedStages /> : isDesktop ? <PinnedSequence /> : <MobileSequence />}
    </section>
  );
}
