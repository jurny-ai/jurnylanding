"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Gift, Layers3, Quote, Repeat, Search, Smartphone } from "lucide-react";
import Reveal from "@/components/Reveal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StorefrontMock, { MOCK_H, type StorefrontScreen } from "@/components/mocks/StorefrontMock";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
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

/** A taller window for the pinned frame, which has a whole viewport to fill and
 *  looks thin at the stacked layout's crop. */
const PINNED_WINDOW_H = 560;

/** Scrolls the window so the cohort's friction point sits mid-frame, clamped so
 *  it never runs past either end of the page. Derived rather than hand-set, so
 *  the marker and the crop cannot drift apart. */
function windowFor(cohort: Cohort, windowH: number) {
  const pageH = MOCK_H[cohort.screen];
  const markerY = (cohort.marker.y / 100) * pageH;
  const offset = Math.min(Math.max(markerY - windowH / 2, 0), Math.max(pageH - windowH, 0));
  return { offset, markerPct: ((markerY - offset) / windowH) * 100 };
}

function FrictionMarker({ cohort, y, windowH }: { cohort: Cohort; y: number; windowH: number }) {
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
              ? `calc(${x}% + (16% * ${windowH} / ${680}) / 2 + 8px)`
              : `calc(${x}% - (16% * ${windowH} / ${680}) / 2 - 8px)`,
          top: `${y}%`,
          transform: side === "right" ? "translateY(-50%)" : "translate(-100%, -50%)",
        }}
      >
        {cohort.markerLabel}
      </span>
    </div>
  );
}

/** The section's title block. Sits above the tabs when the section scrolls
 *  normally, and inside the pinned frame when it does not. */
function SectionHeading({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={className}>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">Individual model</p>
      {/* Both halves of the old title block in one line: the leak analytics can
          see, then the cohort behind it that only the model can name. */}
      <h2
        className={cn(
          "max-w-5xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground",
          compact ? "text-3xl sm:text-4xl" : "text-3xl sm:text-5xl"
        )}
      >
        Analytics tells you a step leaks. See exactly which cohort gives up there, and why.
      </h2>
    </div>
  );
}

/** The evidence for one cohort: the screen it fails on, the diagnosis, the quote. */
function CohortPanel({
  cohort,
  compact = false,
  windowH = WINDOW_H,
}: {
  cohort: Cohort;
  compact?: boolean;
  windowH?: number;
}) {
  const { offset, markerPct } = windowFor(cohort, windowH);
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div className="border border-border bg-card p-3">
        <StorefrontMock screen={cohort.screen} windowH={windowH} windowOffset={offset} className="border-0">
          <FrictionMarker cohort={cohort} y={markerPct} windowH={windowH} />
        </StorefrontMock>
      </div>

      {/* Both cards grow to split the screenshot's height between them and centre
          their own copy, so the column has no gap in the middle and no dead run
          at the bottom, whatever the diagnosis wraps to. */}
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            "flex flex-1 flex-col justify-center border border-destructive-foreground/25 bg-card",
            compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
          )}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-destructive-foreground">
            Where it breaks
          </p>
          <p
            className={cn(
              "mt-2 font-medium leading-snug tracking-tight text-foreground",
              compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            )}
          >
            {cohort.markerLabel}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60">{cohort.diagnosis}</p>
        </div>

        <blockquote
          className={cn(
            "flex flex-1 flex-col justify-center border border-primary/25 bg-primary/[0.04]",
            compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
          )}
        >
          <Quote className="mb-3 h-5 w-5 text-primary" />
          <p
            className={cn(
              "italic leading-relaxed text-foreground/80",
              compact ? "text-base" : "text-base sm:text-lg"
            )}
          >
            {cohort.quote}
          </p>
          <footer className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/40">
            {cohort.name}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

/**
 * The cohorts pinned to the left of their own evidence.
 *
 * The wrapper is five viewports tall and the frame inside it is sticky, so a
 * scroll through the section walks the rail one cohort at a time. The active
 * cohort is derived from scroll position alone: the rail buttons scroll the page
 * rather than setting state, so there is only ever one thing deciding what shows.
 */
function PinnedCohorts() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapRef);
  const railRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.min(COHORTS.length - 1, Math.floor(progress * COHORTS.length));
  const active = COHORTS[index];

  /** Parks the page mid-segment for a cohort, so it is not sitting on a boundary
   *  where the next flick of the wheel swaps it out. */
  const scrollTo = (i: number) => {
    const node = wrapRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    if (travel <= 0) return;
    const top = rect.top + window.scrollY + ((i + 0.5) / COHORTS.length) * travel;
    window.scrollTo({ top, behavior: "auto" });
  };

  const onKeyDown = (event: React.KeyboardEvent, i: number) => {
    const delta =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? -1
          : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (i + delta + COHORTS.length) % COHORTS.length;
    scrollTo(next);
    railRefs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div ref={wrapRef} className="relative h-[500vh]">
      {/* The heading rides inside the pinned frame rather than scrolling away
          above it, so the viewport holds the whole argument at once instead of a
          band of empty ground over the evidence. */}
      <div className="sticky top-0 flex h-screen flex-col justify-center pb-10 pt-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* The screenshot's height follows its width, so the whole frame is
              capped by the height left over after the heading and the padding:
              every 1px of panel height costs about 2px of row width, and the
              rail plus the gap add a fixed 260px on the left. Without the cap a
              short viewport would push the quote past the bottom of the frame.
              Heading and row share the cap so their edges stay on one line. */}
          <div
            className="mx-auto flex flex-col gap-7"
            style={{
              maxWidth: `min(80rem, calc((100vh - 285px) * 2 + 260px))`,
            }}
          >
            <SectionHeading compact />

            <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(200px,236px)_minmax(0,1fr)]">
              {/* Stretched to the evidence beside it, and the buttons split that
                height evenly, so the rail starts and ends on the same lines as
                the panel. */}
              <div
                role="tablist"
                aria-label="Customer cohorts"
                aria-orientation="vertical"
                className="flex flex-col gap-2"
              >
                {COHORTS.map((cohort, i) => {
                  const Icon = cohort.icon;
                  const selected = i === index;
                  return (
                    <button
                      key={cohort.id}
                      ref={(el) => {
                        railRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      id={`cohort-tab-${cohort.id}`}
                      aria-selected={selected}
                      aria-controls="cohort-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => {
                        scrollTo(i);
                        track("cohort_selected", { cohort: cohort.id });
                      }}
                      onKeyDown={(event) => onKeyDown(event, i)}
                      className={cn(
                        "flex w-full flex-1 items-center gap-2.5 border px-3 py-2.5 text-left transition-all duration-300",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-primary/45 hover:bg-secondary"
                      )}
                    >
                      <Icon
                        className={cn("h-4 w-4 shrink-0", selected ? "text-highlight" : "text-primary")}
                        strokeWidth={2}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold tracking-tight">
                          {cohort.short}
                        </span>
                        <span
                          className={cn(
                            "mt-1.5 block h-1 w-full",
                            selected ? "bg-white/20" : "bg-foreground/10"
                          )}
                        >
                          <span
                            className={cn("block h-full", selected ? "bg-highlight" : "bg-primary/50")}
                            style={{ width: `${cohort.completion}%` }}
                          />
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-base font-semibold tabular-nums tracking-tight",
                          selected ? "text-highlight" : "text-foreground"
                        )}
                      >
                        {cohort.completion}%
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                key={active.id}
                id="cohort-panel"
                role="tabpanel"
                aria-labelledby={`cohort-tab-${active.id}`}
                className="cohort-panel"
              >
                <CohortPanel cohort={active} compact windowH={PINNED_WINDOW_H} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** No pinning: the cohorts as tabs across the top, read at the reader's pace.
 *  A left rail does not fit a phone, and pinning is the thing reduced motion is
 *  asking us not to do, so both cases land here. */
function TabbedCohorts() {
  const [activeId, setActiveId] = useState(COHORTS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="container mx-auto px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* A phone gets a dropdown: five tiles at 390px wide push the evidence
            they belong to off the screen. The menu carries the same face as the
            desktop rail, so a cohort is picked from the same information either
            way, rather than from a name in a system picker. */}
        <div className="sm:hidden">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">Cohort</p>
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2.5 border border-border bg-card px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=open]:border-primary/45"
              >
                <active.icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold tracking-tight text-foreground">
                    {active.short}
                  </span>
                  <span className="mt-1.5 block h-1 w-full bg-foreground/10">
                    <span
                      className="block h-full bg-primary"
                      style={{ width: `${active.completion}%` }}
                    />
                  </span>
                </span>
                <span className="shrink-0 text-base font-semibold tabular-nums tracking-tight text-foreground">
                  {active.completion}%
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-primary transition-transform duration-200",
                    menuOpen && "rotate-180"
                  )}
                  strokeWidth={2}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-none border-border bg-card p-1"
            >
              {COHORTS.map((cohort) => {
                const Icon = cohort.icon;
                const selected = cohort.id === activeId;
                return (
                  <DropdownMenuItem
                    key={cohort.id}
                    onSelect={() => select(cohort)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-none px-2.5 py-2.5",
                      selected
                        ? "bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                        : "focus:bg-secondary"
                    )}
                  >
                    <Icon
                      className={cn("h-4 w-4 shrink-0", selected ? "text-highlight" : "text-primary")}
                      strokeWidth={2}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold tracking-tight">
                        {cohort.short}
                      </span>
                      <span
                        className={cn(
                          "mt-1.5 block h-1 w-full",
                          selected ? "bg-white/20" : "bg-foreground/10"
                        )}
                      >
                        <span
                          className={cn("block h-full", selected ? "bg-highlight" : "bg-primary/50")}
                          style={{ width: `${cohort.completion}%` }}
                        />
                      </span>
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-base font-semibold tabular-nums tracking-tight",
                        selected ? "text-highlight" : "text-foreground"
                      )}
                    >
                      {cohort.completion}%
                    </span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Reveal asChild>
          <div
            role="tablist"
            aria-label="Customer cohorts"
            className="hidden gap-2 sm:grid sm:grid-cols-3 lg:grid-cols-5"
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
                    "flex flex-col items-start gap-3 border p-4 text-left transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:-translate-y-0.5 hover:border-primary/45 hover:bg-secondary"
                  )}
                >
                  <span className="flex w-full items-center gap-2">
                    <Icon
                      className={cn("h-4 w-4 shrink-0", selected ? "text-highlight" : "text-primary")}
                      strokeWidth={2}
                    />
                    <span className="min-w-0 flex-1 truncate text-xs font-semibold tracking-tight">
                      {cohort.short}
                    </span>
                  </span>
                  <span className="flex w-full items-baseline justify-between gap-2">
                    <span
                      className={cn(
                        "text-2xl font-semibold tabular-nums tracking-tight",
                        selected ? "text-highlight" : "text-foreground"
                      )}
                    >
                      {cohort.completion}%
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-[0.12em]",
                        selected ? "text-white/55" : "text-foreground/40"
                      )}
                    >
                      complete
                    </span>
                  </span>
                  <span className={cn("h-1 w-full", selected ? "bg-white/20" : "bg-foreground/10")}>
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
          className="cohort-panel mt-4"
        >
          <CohortPanel cohort={active} />
        </div>
      </div>
    </div>
  );
}

export default function CohortFriction() {
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();
  // Server and first client render both take the tabbed path, so the static
  // export ships a complete section. The pinned rail is an upgrade applied after
  // mount, on a viewport wide enough to hold it.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pinned = mounted && isDesktop && !reducedMotion;

  return (
    // The pinned frame carries its own vertical rhythm, so the section drops its
    // padding there rather than opening a gap the pinning cannot fill.
    <section
      id="cohort-friction"
      className={cn(
        "scroll-mt-14 border-b border-border bg-secondary/55 sm:scroll-mt-16",
        pinned ? "py-0" : "py-14 sm:py-20"
      )}
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

      {pinned ? (
        <PinnedCohorts />
      ) : (
        <>
          <Reveal className="container mx-auto px-4 sm:px-6">
            <SectionHeading className="mx-auto mb-8 max-w-7xl" />
          </Reveal>
          <TabbedCohorts />
        </>
      )}
    </section>
  );
}
