import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

/** Variants pre-screened against the population model before traffic is spent. */
function PrescreenVisual() {
  const variants = [
    { label: "A", kept: false },
    { label: "B", kept: true },
    { label: "C", kept: false },
    { label: "D", kept: true },
    { label: "E", kept: false },
  ];

  return (
    <div className="flex w-full max-w-xs flex-col gap-3.5">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/40">5 variants</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Top 2 go live</span>
        </div>
        <div className="flex items-center gap-1.5">
          {variants.map((variant) => (
            <div
              key={variant.label}
              className={`flex h-9 flex-1 items-center justify-center text-xs font-bold ${
                variant.kept
                  ? "bg-highlight text-highlight-foreground"
                  : "bg-foreground/5 text-foreground/25 line-through"
              }`}
            >
              {variant.label}
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] leading-snug text-foreground/40">
          The model prunes the losers before you spend a single session on them
        </p>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-primary/10 pt-3">
        {[
          { label: "Test alone", width: "100%", time: "3-6 wks", tone: "bg-foreground/25", text: "text-foreground/45" },
          { label: "With Jurny", width: "28%", time: "~1 wk", tone: "bg-primary/70", text: "text-primary" },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-16 flex-shrink-0 text-[10px] font-medium text-foreground/55">{row.label}</span>
            <div className="h-3 flex-1 overflow-hidden bg-foreground/5">
              <div className={`h-full ${row.tone}`} style={{ width: row.width }} />
            </div>
            <span className={`w-12 flex-shrink-0 text-right font-mono text-[10px] ${row.text}`}>{row.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Cohorts ranked by the revenue their friction is holding back. */
function UnrealizedRevenueVisual() {
  const rows = [
    { name: "Gift buyers", share: 100, lead: true },
    { name: "Bundlers", share: 68 },
    { name: "Lapsed customers", share: 41 },
    { name: "Comparison shoppers", share: 24 },
  ];

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/40">
        Blocked revenue by cohort
      </p>
      {rows.map((row) => (
        <div key={row.name} className="flex items-center gap-2.5">
          <span className="w-[104px] flex-shrink-0 truncate text-[11px] font-medium text-foreground/60">
            {row.name}
          </span>
          <div className="h-4 flex-1 overflow-hidden bg-foreground/5">
            <div
              className={`h-full ${row.lead ? "bg-highlight" : "bg-primary/45"}`}
              style={{ width: `${row.share}%` }}
            />
          </div>
        </div>
      ))}
      <p className="mt-1 text-[11px] leading-snug text-foreground/40">
        Whole segments nobody built a flow for, not edge cases
      </p>
    </div>
  );
}

/** One cohort, two treatments, one clear answer. */
function PersonalizationVisual() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/40">
        Returning subscribers
      </p>
      {[
        { label: "Generic promo banner", lift: "+0.4%", width: "12%", tone: "bg-foreground/25" },
        { label: "Member price in cart", lift: "+6.1%", width: "84%", tone: "bg-primary/70" },
      ].map((row) => (
        <div key={row.label}>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[11px] font-medium text-foreground/60">{row.label}</span>
            <span className="font-mono text-[10px] text-foreground/50">{row.lift}</span>
          </div>
          <div className="h-3 overflow-hidden bg-foreground/5">
            <div className={`h-full ${row.tone}`} style={{ width: row.width }} />
          </div>
        </div>
      ))}
      <p className="mt-0.5 text-[11px] leading-snug text-foreground/40">
        Knowing where a cohort stalls makes the treatment obvious
      </p>
    </div>
  );
}

/** Build weeks not spent on variants that were never going to win. */
function EngineeringTimeVisual() {
  return (
    <div className="flex w-full max-w-xs items-center gap-3">
      <div className="flex-1 border border-border bg-foreground/5 p-4 text-center">
        <div className="mb-1 text-[10px] uppercase tracking-widest text-foreground/40">Before</div>
        <div className="text-2xl font-bold text-foreground/50">5</div>
        <div className="mt-0.5 text-[10px] text-foreground/30">variants built and instrumented</div>
      </div>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-foreground/20" />
      <div className="flex-1 border border-primary/30 bg-primary/10 p-4 text-center">
        <div className="mb-1 text-[10px] uppercase tracking-widest text-primary">After</div>
        <div className="text-2xl font-bold text-primary">2</div>
        <div className="mt-0.5 text-[10px] text-primary/60">the two worth shipping</div>
      </div>
    </div>
  );
}

const outcomes = [
  {
    title: "More conversion from the same traffic",
    description:
      "Every variant gets scored against the population model first, so the experiments you run are the ones with a real chance and they reach significance on less traffic.",
    visual: <PrescreenVisual />,
  },
  {
    title: "Revenue you are not capturing yet",
    description:
      "Cohort-level analysis surfaces the customers your flows were never designed for. Gift buyers and bundlers are usually a segment, not an edge case.",
    visual: <UnrealizedRevenueVisual />,
  },
  {
    title: "Personalization that pays for itself",
    description:
      "Once you know which cohort stalls at which step and why, the treatment is obvious. Personalize against evidence instead of a guess about who someone is.",
    visual: <PersonalizationVisual />,
  },
  {
    title: "Time back for your team",
    description:
      "Stop building and instrumenting variants the model can already tell you are flat, and diagnose drop-offs without recruiting, scheduling, or waiting on next quarter's study.",
    visual: <EngineeringTimeVisual />,
  },
];

const Outcomes = () => {
  return (
    <section
      id="features"
      className="scroll-mt-14 border-b border-border bg-background py-14 sm:scroll-mt-16 sm:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8 sm:mb-12">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Where the lift comes from
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {outcomes.map((outcome, i) => (
              <Reveal key={outcome.title} asChild delay={(i % 2) * 120}>
                <div className="group flex h-full flex-col overflow-hidden border border-border bg-card">
                  <div className="flex min-h-[180px] items-center justify-center bg-secondary p-6 sm:min-h-[200px] sm:p-10">
                    {outcome.visual}
                  </div>
                  <div className="p-5 sm:p-7">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">{outcome.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/55">{outcome.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
