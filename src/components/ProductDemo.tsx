"use client";

import { useState } from "react";

type DropOff = { segment: string; loss: number; worst?: boolean };
type Variant = { label: string; name: string; badge: string };

type BaseSegment = {
  id: string;
  label: string;
  personas: string[];
};

type FunnelSegment = BaseSegment & {
  kind: "funnel";
  question: string;
  moreQuestions: string[];
  dropStep: string;
  dropOffs: DropOff[];
};

type ABSegment = BaseSegment & {
  kind: "abtest";
  variants: Variant[];
};

type Segment = FunnelSegment | ABSegment;

const SEGMENTS: Segment[] = [
  {
    id: "ecommerce",
    label: "Ecommerce",
    kind: "abtest",
    variants: [
      { label: "A", name: "Control", badge: "bg-primary/10 text-primary-glow ring-1 ring-primary/20" },
      { label: "B", name: "One-click pay", badge: "bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20" },
      { label: "C", name: "Simplified layout", badge: "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20" },
    ],
    personas: ["High ATV buyer", "Comparison shopper", "New user"],
  },
  {
    id: "saas",
    label: "D2C SaaS",
    kind: "funnel",
    question: "Why do trials never activate?",
    moreQuestions: ["Where does onboarding stall?", "Which step blocks setup?"],
    personas: ["Solo founder", "Ops manager", "Free-trial user"],
    dropStep: "Workspace setup",
    dropOffs: [
      { segment: "Free-trial user", loss: 44, worst: true },
      { segment: "Ops manager", loss: 15 },
      { segment: "Solo founder", loss: 9 },
    ],
  },
];

function VariantsCard({ segment }: { segment: ABSegment }) {
  return (
    <div className="rounded-2xl bg-card shadow-[0_12px_32px_rgba(35,38,85,0.06)] px-5 py-4">
      <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-bold mb-3">Variants in test</div>
      <div className="space-y-2.5">
        {segment.variants.map((v) => (
          <div key={v.label} className="flex items-center gap-3">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${v.badge}`}>
              {v.label}
            </span>
            <span className="text-sm font-semibold text-foreground/80">{v.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionCard({ segment }: { segment: FunnelSegment }) {
  const words = segment.question.split(" ");
  const lastWord = words.pop();
  const rest = words.join(" ");

  return (
    <div className="space-y-2">
      <div className="relative rounded-2xl bg-card shadow-[0_12px_32px_rgba(35,38,85,0.06)] px-5 py-4">
        <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-bold mb-2">Your product question</div>
        <p className="text-base font-semibold text-foreground/85 leading-snug">
          {rest ? `${rest} ` : ""}
          {/* Keep the caret glued to the last word so it never wraps to its own line */}
          <span className="whitespace-nowrap">
            {lastWord}
            <span className="inline-block w-0.5 h-4 bg-primary-glow ml-1 align-middle animate-pulse" />
          </span>
        </p>
      </div>
      {segment.moreQuestions.map((q, i) => (
        <div
          key={q}
          className="rounded-xl bg-card/60 px-4 py-2.5"
          style={{ opacity: 0.55 - i * 0.2 }}
        >
          <p className="text-sm font-medium text-foreground/60 leading-snug">{q}</p>
        </div>
      ))}
    </div>
  );
}

function PersonaChip({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-card shadow-sm px-3.5 py-2 whitespace-nowrap">
      <span className="w-2 h-2 rounded-full bg-primary-glow animate-pulse" />
      <span className="text-sm font-semibold text-foreground/70">{name}</span>
    </div>
  );
}

function ConvergenceCard() {
  return (
    <div className="rounded-2xl bg-card shadow-[0_12px_32px_rgba(35,38,85,0.06)] px-5 py-4">
      <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-bold mb-2">Jurny converges the test</div>
      <p className="text-base font-bold text-foreground mb-3">
        Significance in <span className="text-primary-glow">~1 week</span>, not 3-6
      </p>

      <div className="relative">
        <svg
          viewBox="0 0 280 168"
          className="w-full h-auto"
          role="img"
          aria-label="Statistical confidence rising to the 95% significance threshold over time, reached in about one week with Jurny versus three to six weeks running the test alone"
        >
          {/* 95% significance threshold */}
          <line x1="12" y1="34" x2="272" y2="34" stroke="currentColor" className="text-foreground/25" strokeWidth="1" strokeDasharray="4 4" />
          {/* axes */}
          <line x1="12" y1="34" x2="12" y2="146" stroke="currentColor" className="text-foreground/15" strokeWidth="1" />
          <line x1="12" y1="146" x2="272" y2="146" stroke="currentColor" className="text-foreground/15" strokeWidth="1" />

          {/* Test alone: slow to converge */}
          <path
            d="M14,144 C90,140 152,120 232,40 C246,30 260,25 270,23"
            fill="none"
            className="text-foreground/25"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{ animation: "draw-line 1.8s 0.5s ease-out both" }}
          />
          {/* With Jurny: converges fast */}
          <path
            d="M14,144 C42,126 64,54 94,38 C132,20 200,17 270,16"
            fill="none"
            className="text-primary-glow"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{ animation: "draw-line 1.4s 0.15s ease-out both" }}
          />

          {/* threshold-crossing markers */}
          <circle cx="232" cy="34" r="3.5" className="text-foreground/35" fill="currentColor" />
          <circle cx="94" cy="34" r="3.5" className="text-primary-glow" fill="currentColor" />
        </svg>
        <span className="absolute right-1 top-0.5 text-[10px] font-semibold text-foreground/35">95% significance</span>
        <span className="absolute bottom-1 right-1 text-[9px] uppercase tracking-widest text-foreground/30">time</span>
      </div>

      {/* legend */}
      <div className="mt-2 flex items-center justify-between text-[11px]">
        <span className="flex items-center gap-1.5 font-semibold text-primary-glow">
          <span className="h-2 w-2 rounded-full bg-primary-glow" /> With Jurny · ~1 wk
        </span>
        <span className="flex items-center gap-1.5 font-medium text-foreground/45">
          <span className="h-2 w-2 rounded-full bg-foreground/30" /> Test alone · 3-6 wks
        </span>
      </div>
    </div>
  );
}

function ResultCard({ segment }: { segment: FunnelSegment }) {
  const maxLoss = Math.max(...segment.dropOffs.map((d) => d.loss));

  return (
    <div className="rounded-2xl bg-card shadow-[0_12px_32px_rgba(35,38,85,0.06)] px-5 py-4">
      <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/40 font-bold mb-2">Jurny finds</div>
      <p className="text-base font-bold text-foreground mb-3">
        Biggest drop-off at <span className="text-red-500">{segment.dropStep}</span>
      </p>
      <div className="space-y-3">
        {segment.dropOffs.map((item, i) => (
          <div key={item.segment}>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`text-sm font-semibold truncate ${item.worst ? "text-foreground" : "text-foreground/55"}`}>
                {item.segment}
              </span>
              <span className={`text-sm font-bold shrink-0 ${item.worst ? "text-red-500" : "text-foreground/45"}`}>
                -{item.loss}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-foreground/10 overflow-hidden">
              <div
                className={`h-full rounded-full origin-left ${item.worst ? "bg-red-400/90" : "bg-primary/40"}`}
                style={{
                  width: `${(item.loss / maxLoss) * 100}%`,
                  animation: `bar-grow 0.9s ${i * 0.15}s cubic-bezier(0.22, 1, 0.36, 1) both`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Animated dots traveling along the session paths */
function FlowCanvas({ personas }: { personas: string[] }) {
  const paths = [
    "M0,120 C70,120 90,42 200,42 C310,42 330,120 400,120",
    "M0,120 C130,120 270,120 400,120",
    "M0,120 C70,120 90,198 200,198 C310,198 330,120 400,120",
  ];
  const timing = [
    { dur: 3.6, begin: 0 },
    { dur: 4.2, begin: 0.9 },
    { dur: 3.9, begin: 1.7 },
  ];
  const DOTS_PER_PATH = 2;

  return (
    <div className="relative flex-1 h-60 text-primary-glow">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 240"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {paths.map((d) => (
          <path key={d} d={d} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
        ))}
        {paths.flatMap((d, i) =>
          Array.from({ length: DOTS_PER_PATH }, (_, k) => {
            // Spread the dots evenly along each path with negative offsets so they
            // are already in flight when the animation starts.
            const dur = `${timing[i].dur}s`;
            const begin = `${(timing[i].begin - (timing[i].dur * k) / DOTS_PER_PATH).toFixed(2)}s`;
            return (
              <circle key={`${i}-${k}`} r="4" fill="currentColor">
                <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={d} />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.12;0.88;1"
                  dur={dur}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })
        )}
      </svg>

      {/* Persona chips pinned to each path's apex */}
      <div className="absolute left-1/2 top-[17.5%] -translate-x-1/2 -translate-y-1/2">
        <PersonaChip name={personas[0]} />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <PersonaChip name={personas[1]} />
      </div>
      <div className="absolute left-1/2 top-[82.5%] -translate-x-1/2 -translate-y-1/2">
        <PersonaChip name={personas[2]} />
      </div>
    </div>
  );
}

function VerticalFlow() {
  return (
    <div className="flex flex-col items-center gap-1.5 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary-glow"
          style={{ animation: `flow-pulse 1.6s ${i * 0.25}s ease-in-out infinite` }}
        />
      ))}
    </div>
  );
}

function FlowVisual({ segment }: { segment: Segment }) {
  const prompt =
    segment.kind === "abtest" ? <VariantsCard segment={segment} /> : <QuestionCard segment={segment} />;
  const result =
    segment.kind === "abtest" ? <ConvergenceCard /> : <ResultCard segment={segment} />;

  return (
    <>
      {/* Desktop: one continuous flow */}
      <div className="hidden lg:flex items-center gap-4">
        <div className="w-72 shrink-0 relative z-10">
          {prompt}
        </div>
        <FlowCanvas personas={segment.personas} />
        <div className="w-80 shrink-0 relative z-10">
          {result}
        </div>
      </div>

      {/* Mobile: stacked flow */}
      <div className="lg:hidden">
        <div className="max-w-md mx-auto">
          {prompt}
          <VerticalFlow />
          <div className="flex flex-wrap justify-center gap-2">
            {segment.personas.map((name) => (
              <PersonaChip key={name} name={name} />
            ))}
          </div>
          <VerticalFlow />
          {result}
        </div>
      </div>
    </>
  );
}

const ProductDemo = () => {
  const [activeId, setActiveId] = useState(SEGMENTS[0].id);
  const activeSegment = SEGMENTS.find((s) => s.id === activeId) ?? SEGMENTS[0];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-gradient-to-b from-background via-secondary to-background scroll-mt-14 sm:scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight mb-3">
                How It Works
              </h2>
              <p className="text-base sm:text-lg text-foreground/50">
                Understand what breaks your funnel before it costs you revenue.
              </p>
            </div>

            {/* Segment toggle */}
            <div className="flex gap-2">
              {SEGMENTS.map((segment) => {
                const isActive = activeId === segment.id;
                return (
                  <button
                    key={segment.id}
                    onClick={() => setActiveId(segment.id)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-[0_8px_22px_rgba(117,88,232,0.25)]"
                        : "bg-card/70 text-foreground/55 hover:bg-card hover:text-foreground"
                    }`}
                  >
                    {segment.label}
                  </button>
                );
              })}
            </div>

            <div key={activeSegment.id} className="pt-6 sm:pt-8 animate-flow-in">
              <FlowVisual segment={activeSegment} />
            </div>

          </div>
        </div>
      </div>
      <style>{`
        @keyframes bar-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes flow-pulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes flow-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes draw-line {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }

        .animate-flow-in { animation: flow-in 0.5s 0.1s ease-out both; }
      `}</style>
    </section>
  );
};

export default ProductDemo;
