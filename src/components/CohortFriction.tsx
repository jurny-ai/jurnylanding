"use client";

import { useRef, useState } from "react";
import { Gift, Layers3, Quote, Repeat, Search, Smartphone } from "lucide-react";
import Reveal from "@/components/Reveal";
import StorefrontMock, { MOCK_H, type StorefrontScreen } from "@/components/mocks/StorefrontMock";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Cohort = {
  id: string;
  name: string;
  short: string;
  icon: typeof Gift;
  /** Share of this cohort that reaches a completed order. */
  completion: number;
  screen: StorefrontScreen;
  /** Marker position as a percentage of the mock frame. */
  marker: { x: number; y: number; side: "left" | "right" };
  markerLabel: string;
  diagnosis: string;
  quote: string;
};

const COHORTS: Cohort[] = [
  {
    id: "first-time-mobile",
    name: "First time mobile buyer",
    short: "First time mobile",
    icon: Smartphone,
    completion: 24,
    screen: "checkout",
    marker: { x: 50, y: 49.9, side: "right" }, // checkout address block
    markerLabel: "Address fields clear",
    diagnosis:
      "The address block resets when the autofill dropdown is dismissed. They retype it once, hit the same reset, and leave.",
    quote: "I have filled this in twice already. I will just order it on my laptop later.",
  },
  {
    id: "returning-subscriber",
    name: "Returning subscriber",
    short: "Returning subscriber",
    icon: Repeat,
    completion: 71,
    screen: "cart",
    marker: { x: 50, y: 56.4, side: "right" }, // cart discount code field
    markerLabel: "Hunting for a code that is automatic",
    diagnosis:
      "Their subscriber discount only lands at checkout, so the cart shows full price. They stop to look for a code that does not exist.",
    quote: "It says $163. I get twenty percent off, so where is it?",
  },
  {
    id: "gift-buyer",
    name: "Gift buyer",
    short: "Gift buyer",
    icon: Gift,
    completion: 33,
    screen: "cart",
    marker: { x: 50, y: 81.9, side: "left" }, // cart checkout button
    markerLabel: "No gift option before payment",
    diagnosis:
      "There is no gift note and no way to hide the receipt. They leave the cart to find a gift option and do not come back.",
    quote: "I cannot send this to my sister with the price printed in the box.",
  },
  {
    id: "bundler",
    name: "High order value bundler",
    short: "Bundler",
    icon: Layers3,
    completion: 46,
    screen: "pdp",
    marker: { x: 50, y: 82.4, side: "left" }, // complete the look row
    markerLabel: "One item at a time",
    diagnosis:
      "They want the full set, but each item has to be added separately and every add returns them to the top of the page.",
    quote: "Three trips back to the same page to buy three things that were shown together.",
  },
  {
    id: "comparison-shopper",
    name: "Price comparison shopper",
    short: "Comparison shopper",
    icon: Search,
    completion: 19,
    screen: "pdp",
    marker: { x: 84.1, y: 38.8, side: "left" }, // the sold out XL chip
    markerLabel: "Discounted size is the sold out one",
    diagnosis:
      "The twenty percent badge pulls them in, then the size they wear is out of stock with no back in stock option. They price check a competitor instead.",
    quote: "The deal is only on the sizes I do not wear.",
  },
];

/** Height of the window onto each screen, in the mock's intrinsic pixels. The
 *  screenshots are evidence for the diagnosis beside them, not the subject of
 *  the section, so each shows the part that fails rather than the whole page. */
const WINDOW_H = 430;

/** Scrolls the window so the cohort's friction point sits mid-frame, clamped so
 *  it never runs past either end of the page. Derived rather than hand-set, so
 *  the marker and the crop cannot drift apart. */
function windowFor(cohort: Cohort) {
  const pageH = MOCK_H[cohort.screen];
  const markerY = (cohort.marker.y / 100) * pageH;
  const offset = Math.min(Math.max(markerY - WINDOW_H / 2, 0), Math.max(pageH - WINDOW_H, 0));
  return { offset, markerPct: ((markerY - offset) / WINDOW_H) * 100 };
}

function FrictionMarker({ cohort, y }: { cohort: Cohort; y: number }) {
  const { x, side } = cohort.marker;
  return (
    <div className="pointer-events-none absolute inset-0">
      <span
        className="friction-ring absolute block rounded-full border-2 border-destructive-foreground"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          height: "16%",
          aspectRatio: "1",
          transform: "translate(-50%, -50%)",
          animation: "friction-pulse 2.4s ease-out infinite",
        }}
      />
      {/* Anchored to the marker's edge rather than centred on it, so a marker
          near the frame edge pushes its label inward instead of off the page. */}
      <span
        className="absolute max-w-[46%] bg-destructive-foreground px-2 py-1 text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-white"
        style={{
          // The ring is 16% of the frame height wide, so its edge sits half that
          // off centre. Expressed against height because the frame is a window.
          left:
            side === "right"
              ? `calc(${x}% + (16% * ${WINDOW_H} / ${680}) / 2 + 8px)`
              : `calc(${x}% - (16% * ${WINDOW_H} / ${680}) / 2 - 8px)`,
          top: `${y}%`,
          transform: side === "right" ? "translateY(-50%)" : "translate(-100%, -50%)",
        }}
      >
        {cohort.markerLabel}
      </span>
    </div>
  );
}

export default function CohortFriction() {
  const [activeId, setActiveId] = useState(COHORTS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = COHORTS.find((cohort) => cohort.id === activeId) ?? COHORTS[0];

  const select = (cohort: Cohort) => {
    setActiveId(cohort.id);
    track("cohort_selected", { cohort: cohort.id });
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + COHORTS.length) % COHORTS.length;
    select(COHORTS[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="cohort-friction"
      className="scroll-mt-14 border-b border-border bg-secondary/55 py-14 sm:scroll-mt-16 sm:py-20"
    >
      <style>{`
        @keyframes friction-pulse {
          0%   { box-shadow: 0 0 0 0 hsl(var(--destructive-foreground) / 0.35); }
          70%  { box-shadow: 0 0 0 14px hsl(var(--destructive-foreground) / 0); }
          100% { box-shadow: 0 0 0 0 hsl(var(--destructive-foreground) / 0); }
        }
        @keyframes cohort-in {
          from { opacity: 0; transform: translate3d(0, 10px, 0); }
          to   { opacity: 1; transform: none; }
        }
        .cohort-panel { animation: cohort-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .cohort-panel, .friction-ring { animation: none !important; }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Individual model
              </p>
              <h2 className="max-w-3xl text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-foreground sm:text-5xl">
                See exactly where each cohort gives up.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-foreground/60 sm:text-lg lg:justify-self-end">
              Analytics tells you a step leaks. The individual model tells you who leaked, and why.
            </p>
          </Reveal>

          {/* Cohorts run across the top, so the evidence below gets the full width
              instead of losing 320px of it to a left rail. */}
          <Reveal asChild>
            <div
              role="tablist"
              aria-label="Customer cohorts"
              className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
            >
              {COHORTS.map((cohort, i) => {
                const Icon = cohort.icon;
                const selected = cohort.id === activeId;
                return (
                  <button
                    key={cohort.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`cohort-tab-${cohort.id}`}
                    aria-selected={selected}
                    aria-controls="cohort-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(cohort)}
                    onKeyDown={(event) => onKeyDown(event, i)}
                    className={cn(
                      "flex items-center gap-2 border p-2 text-left transition-all sm:flex-col sm:items-start sm:gap-3 sm:p-4",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/45 hover:bg-secondary"
                    )}
                  >
                    <span className="flex min-w-0 flex-1 items-center gap-1.5 sm:w-full sm:flex-none sm:gap-2">
                      <Icon
                        className={cn("h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4", selected ? "text-highlight" : "text-primary")}
                        strokeWidth={2}
                      />
                      <span className="min-w-0 flex-1 truncate text-[11px] font-semibold tracking-tight sm:text-xs">
                        {cohort.short}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-baseline gap-2 sm:w-full sm:justify-between">
                      <span
                        className={cn(
                          "text-sm font-semibold tabular-nums tracking-tight sm:text-2xl",
                          selected ? "text-highlight" : "text-foreground"
                        )}
                      >
                        {cohort.completion}%
                      </span>
                      <span
                        className={cn(
                          "hidden text-[10px] font-semibold uppercase tracking-[0.12em] sm:inline",
                          selected ? "text-white/55" : "text-foreground/40"
                        )}
                      >
                        complete
                      </span>
                    </span>
                    <span className={cn("hidden h-1 w-full sm:block", selected ? "bg-white/20" : "bg-foreground/10")}>
                      <span
                        className={cn("block h-full", selected ? "bg-highlight" : "bg-primary/50")}
                        style={{ width: `${cohort.completion}%` }}
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <div
            key={activeId}
            id="cohort-panel"
            role="tabpanel"
            aria-labelledby={`cohort-tab-${activeId}`}
            className="cohort-panel"
          >
            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div className="border border-border bg-card p-3">
                <StorefrontMock
                  screen={active.screen}
                  windowH={WINDOW_H}
                  windowOffset={windowFor(active).offset}
                  className="border-0"
                >
                  <FrictionMarker cohort={active} y={windowFor(active).markerPct} />
                </StorefrontMock>
              </div>

              <div className="flex flex-col gap-4">
                <div className="border border-destructive-foreground/25 bg-card p-5 sm:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-destructive-foreground">
                    Where it breaks
                  </p>
                  <p className="mt-2 text-xl font-medium leading-snug tracking-tight text-foreground sm:text-2xl">
                    {active.markerLabel}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60">{active.diagnosis}</p>
                </div>

                <blockquote className="border border-primary/25 bg-primary/[0.04] p-5 sm:p-6">
                  <Quote className="mb-3 h-5 w-5 text-primary" />
                  <p className="text-base italic leading-relaxed text-foreground/80 sm:text-lg">{active.quote}</p>
                  <footer className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/40">
                    {active.name}
                  </footer>
                </blockquote>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
