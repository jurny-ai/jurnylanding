"use client";

import { useRef, useState } from "react";
import { ChevronDown, Quote, Repeat, Search, Smartphone } from "lucide-react";
import Reveal from "@/components/Reveal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StorefrontMock, { MOCK_H, type StorefrontScreen } from "@/components/mocks/StorefrontMock";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Cohort = {
  id: string;
  name: string;
  short: string;
  icon: typeof Smartphone;
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

/** The section's title block, above the tabs. */
function SectionHeading({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">Diagnose drop-off</p>
      {/* Both halves of the old title block in one line: the leak analytics can
          see, then the cohort behind it that only the model can name. */}
      <h2 className="max-w-5xl text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl">
        Analytics tells you a step leaks. See exactly which cohort gives up there, and why.
      </h2>
    </div>
  );
}

/** The panel's two columns: the wireframe on the left, the read-out on the right.
 *  The tab row borrows the same template and sits in the first cell, so its edges
 *  land on the wireframe's rather than running the width of the whole section. */
const PANEL_COLUMNS = "grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]";

/** The evidence for one cohort: the screen it fails on, the diagnosis, the quote. */
function CohortPanel({ cohort, windowH = WINDOW_H }: { cohort: Cohort; windowH?: number }) {
  const { offset, markerPct } = windowFor(cohort, windowH);
  return (
    <div className={PANEL_COLUMNS}>
      <div className="border border-border bg-card p-3">
        <StorefrontMock screen={cohort.screen} windowH={windowH} windowOffset={offset} className="border-0">
          <FrictionMarker cohort={cohort} y={markerPct} windowH={windowH} />
        </StorefrontMock>
      </div>

      {/* Both cards grow to split the screenshot's height between them and centre
          their own copy, so the column has no gap in the middle and no dead run
          at the bottom, whatever the diagnosis wraps to. */}
      <div className="grid content-center gap-4">
        <div className="border border-destructive-foreground/25 bg-card p-5 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-destructive-foreground">
            Where it breaks
          </p>
          <p className="mt-2 text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
            {cohort.markerLabel}
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/65 sm:text-lg">{cohort.diagnosis}</p>
        </div>

        <blockquote className="border border-primary/25 bg-primary/[0.04] p-5 sm:p-7">
          <Quote className="mb-4 h-6 w-6 text-primary" />
          <p className="text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
            {cohort.quote}
          </p>
          <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/45 sm:text-sm">
            {cohort.name}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

/** The cohorts as tabs across the top, read at the reader's pace: the panel
 *  below swaps on click, and nothing about the section is driven by scroll. */
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
        {/* A phone gets a dropdown: the buttons wrap to three lines at 390px wide
            and push the evidence they belong to off the screen. The menu carries
            the same face as those buttons, so a cohort is picked from the same
            information either way, rather than from a name in a system picker. */}
        <div className="sm:hidden">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/45">Cohort</p>
          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2.5 border border-foreground/20 bg-card px-4 py-2.5 text-left shadow-[0_2px_0_0_rgba(28,35,76,0.16)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 data-[state=open]:border-primary/50"
              >
                <active.icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight text-foreground">
                  {active.short}
                </span>
                <span className="shrink-0 text-sm font-semibold tabular-nums tracking-tight text-foreground/45">
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
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight">
                      {cohort.short}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-sm font-semibold tabular-nums tracking-tight",
                        selected ? "text-highlight" : "text-foreground/45"
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

        {/* Buttons rather than a grid of tiles, so the control reads as something
            to press instead of a set of stat cards competing with the evidence
            below. They share the panel's column template and split the first cell
            evenly, so the block starts and ends on the wireframe's edges. */}
        <Reveal asChild>
          <div className={cn(PANEL_COLUMNS, "hidden sm:grid")}>
            <div
              role="tablist"
              aria-label="Customer cohorts"
              className="grid grid-cols-3 gap-2"
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
                      // Raised off the ground and pressed back down on click: the
                      // theme has no corner radius to lean on, so the shadow and
                      // the travel are what say this is a control and not a chip.
                      "flex items-center gap-2 border px-4 py-2.5 text-left text-sm font-bold tracking-tight",
                      "shadow-[0_2px_0_0_rgba(28,35,76,0.16)] transition-[transform,box-shadow,background-color,border-color] duration-150",
                      "hover:-translate-y-px hover:shadow-[0_4px_0_0_rgba(28,35,76,0.2)]",
                      "active:translate-y-[2px] active:shadow-none",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-foreground/20 bg-card text-foreground hover:border-primary/50"
                    )}
                  >
                    <Icon
                      className={cn("h-4 w-4 shrink-0", selected ? "text-highlight" : "text-primary")}
                      strokeWidth={2}
                    />
                    <span className="min-w-0 flex-1 truncate">{cohort.short}</span>
                    <span
                      className={cn(
                        "shrink-0 tabular-nums",
                        selected ? "text-highlight" : "text-foreground/45"
                      )}
                    >
                      {cohort.completion}%
                    </span>
                  </button>
                );
              })}
            </div>
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
  return (
    <section
      id="cohort-friction"
      className="scroll-mt-14 border-b border-border bg-secondary/55 py-10 sm:scroll-mt-16 sm:py-12"
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

      <Reveal className="container mx-auto px-4 sm:px-6">
        <SectionHeading className="mx-auto mb-6 max-w-7xl" />
      </Reveal>
      <TabbedCohorts />
    </section>
  );
}
