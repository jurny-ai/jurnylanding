import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Every visual in this section is a different chart form on purpose: a scatter
 * field, a proportional treemap, a slope, and a radial. The section above this
 * one is already a grid of bordered cards, so nothing here gets a chassis. The
 * charts carry the explanation, so the prose stays to one line.
 */

/** Variants plotted against the bar they have to clear before traffic is spent. */
function PredictedLiftScatter() {
  const variants = [
    { label: "A", x: 8, lift: 22 },
    { label: "B", x: 30, lift: 74, kept: true },
    { label: "C", x: 51, lift: 39 },
    { label: "D", x: 72, lift: 90, kept: true },
    { label: "E", x: 92, lift: 12 },
  ];
  const threshold = 62;

  return (
    <figure className="w-full">
      <figcaption className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-foreground/40">
        Predicted lift
      </figcaption>

      <div className="relative h-36 w-full border-b border-l border-border sm:h-40">
        <div className="absolute inset-x-0 top-0 bg-primary/[0.07]" style={{ height: `${100 - threshold}%` }} />

        <div
          className="absolute inset-x-0 border-t border-dashed border-primary/45"
          style={{ bottom: `${threshold}%` }}
        />

        {variants.map((variant) => (
          <div
            key={variant.label}
            className="absolute translate-y-1/2"
            style={{ left: `${variant.x}%`, bottom: `${variant.lift}%` }}
          >
            {variant.kept ? (
              <div className="flex h-7 w-7 -translate-x-1/2 items-center justify-center bg-primary text-[11px] font-bold text-primary-foreground">
                {variant.label}
              </div>
            ) : (
              <div className="flex -translate-x-1/2 flex-col items-center gap-1">
                <div className="h-3 w-3 bg-foreground/25" />
                <span className="text-[10px] font-medium text-foreground/30">{variant.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}

/** Cohorts sized by the revenue their friction is holding back. */
function BlockedRevenueTreemap() {
  return (
    <figure className="w-full">
      <div className="flex h-40 w-full gap-1 sm:h-44">
        <div className="flex flex-[1.45] flex-col justify-between bg-primary p-3 sm:p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-highlight">Largest</span>
          <span className="text-sm font-semibold leading-tight tracking-tight text-primary-foreground sm:text-base">
            Gift buyers
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-[1.6] items-end bg-primary/50 p-3">
            <span className="text-[11px] font-semibold leading-tight text-primary-foreground sm:text-xs">
              Bundlers
            </span>
          </div>

          <div className="flex flex-1 gap-1">
            <div className="flex flex-[1.7] items-end bg-primary/25 p-2">
              <span className="text-[10px] font-medium leading-tight text-foreground/65">Lapsed</span>
            </div>
            <div className="flex flex-1 items-end bg-primary/10 p-2">
              <span className="text-[10px] font-medium leading-tight text-foreground/50">Compare</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

/** One cohort, two treatments, the gap between them. */
function TreatmentSlope() {
  return (
    <figure className="w-full">
      {/* Wide, short viewBox: the svg scales with the column, so a taller box
          would stretch this row well past the other three. */}
      <svg
        viewBox="0 0 340 116"
        className="h-auto w-full"
        role="img"
        aria-label="Generic promo banner lifts 0.4 percent, member price in cart lifts 6.1 percent"
      >
        <line x1="16" y1="92" x2="324" y2="92" stroke="hsl(var(--foreground))" strokeOpacity="0.12" strokeDasharray="3 4" />

        <line x1="292" y1="92" x2="292" y2="30" stroke="hsl(var(--primary))" strokeOpacity="0.3" strokeDasharray="3 4" />
        <text x="282" y="70" textAnchor="end" fill="hsl(var(--primary))" fontSize="11" fontWeight="600">
          +5.7 pts
        </text>

        <polygon points="52,84 292,30 292,92 52,92" fill="hsl(var(--primary))" fillOpacity="0.08" />
        <line x1="52" y1="84" x2="292" y2="30" stroke="hsl(var(--primary))" strokeWidth="2.5" />

        <rect x="45" y="77" width="14" height="14" fill="hsl(var(--foreground))" fillOpacity="0.3" />
        <text x="52" y="70" textAnchor="middle" fill="hsl(var(--foreground))" fillOpacity="0.45" fontSize="12" fontWeight="600">
          +0.4%
        </text>
        <text x="16" y="110" fill="hsl(var(--foreground))" fillOpacity="0.55" fontSize="11">
          Generic promo
        </text>

        <rect x="284" y="22" width="16" height="16" fill="hsl(var(--primary))" />
        <rect x="280" y="18" width="24" height="24" fill="none" stroke="hsl(var(--highlight))" strokeWidth="2" />
        <text x="292" y="13" textAnchor="middle" fill="hsl(var(--primary))" fontSize="14" fontWeight="700">
          +6.1%
        </text>
        <text x="324" y="110" textAnchor="end" fill="hsl(var(--foreground))" fillOpacity="0.55" fontSize="11">
          Member price in cart
        </text>
      </svg>
    </figure>
  );
}

/** Share of the build queue the model closes out before anyone opens an editor. */
function BuildEffortRing() {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const skipped = 0.6;

  const key = [
    { label: "5 scoped", tone: "bg-primary/15" },
    { label: "2 built", tone: "bg-primary" },
    { label: "3 pruned", tone: "bg-primary/40" },
  ];

  return (
    <figure className="w-full">
      {/* The ring has an intrinsic size, so it centers in its column rather than
          stretching to fill it the way the other three charts do. */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
        <div className="relative h-36 w-36 flex-shrink-0 sm:h-40 sm:w-40">
          <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.12" strokeWidth="16" />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="16"
              strokeDasharray={`${circumference * skipped} ${circumference}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-semibold tracking-tight text-primary sm:text-3xl">60%</span>
            <span className="text-[11px] leading-tight text-foreground/40">never built</span>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          {key.map((row) => (
            <li key={row.label} className="flex items-center gap-2.5">
              <span className={cn("h-2.5 w-2.5 flex-shrink-0", row.tone)} />
              <span className="text-xs font-medium text-foreground/60">{row.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

const outcomes = [
  {
    title: "More conversion from the same traffic",
    description: "Variants get scored before launch, so the tests you run reach significance on less traffic.",
    visual: <PredictedLiftScatter />,
  },
  {
    title: "Revenue you are not capturing yet",
    description: "Cohort analysis surfaces the customers your flows were never designed for.",
    visual: <BlockedRevenueTreemap />,
  },
  {
    title: "Personalization that pays for itself",
    description: "Once you know where a cohort stalls, the right treatment is obvious.",
    visual: <TreatmentSlope />,
  },
  {
    title: "Time back for your team",
    description: "Stop building and instrumenting the variants the model already knows are flat.",
    visual: <BuildEffortRing />,
  },
];

const Outcomes = () => {
  return (
    // The last row carries its own bottom padding, so the section closes tighter than it opens.
    <section
      id="features"
      className="scroll-mt-14 border-b border-border bg-secondary/50 pb-5 pt-12 sm:scroll-mt-16 sm:pb-7 sm:pt-16"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-3 sm:mb-4">
            <h2 className="max-w-2xl text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-foreground sm:text-5xl">
              Where the gains come from
            </h2>
          </Reveal>

          <div className="divide-y divide-border border-t border-border">
            {outcomes.map((outcome, i) => {
              // Alternating sides keep the eye moving instead of settling into a column.
              const flipped = i % 2 === 1;

              return (
                <Reveal key={outcome.title} asChild delay={40}>
                  <div className="grid items-center gap-5 py-7 lg:grid-cols-2 lg:gap-10 lg:py-9">
                    <div className={cn("lg:pr-4", flipped ? "lg:order-2 lg:pl-4 lg:pr-0" : "lg:order-1")}>
                      <span className="block font-mono text-3xl font-semibold leading-none tracking-tight text-primary/20 sm:text-4xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2.5 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
                        {outcome.title}
                      </h3>
                      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-foreground/55">
                        {outcome.description}
                      </p>
                    </div>

                    <div className={cn("w-full", flipped ? "lg:order-1" : "lg:order-2")}>{outcome.visual}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
