import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";

const VERDICT = [
  { label: "Lift on add to cart", value: "+27%" },
  { label: "Variants eliminated", value: "11 of 12" },
  { label: "Time to the call", value: "4 hours" },
];

/* Same team time spent in both columns — the constant that makes the
   comparison fair. What changes is how many of those tests you actually get
   a result on: live traffic can only carry a couple at a time, so most ideas
   never got their turn. */
const COMPARISON = {
  timeframe: "Same team, same time spent.",
  before: {
    label: "Before",
    count: "50",
    body: "Capped by how much live traffic you could risk.",
  },
  withJurny: {
    label: "With Jurny",
    count: "75",
    body: "No cap. Live traffic is only spent on the winners.",
  },
};

export default function VariantPrediction() {
  return (
    <section
      id="ab-prediction"
      className="scroll-mt-14 border-b border-border bg-background py-14 sm:scroll-mt-16 sm:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Pre-screen experiments
              </p>
              <h2 className="max-w-3xl text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-foreground sm:text-5xl">
                Know which variant wins before you spend traffic on it.
              </h2>
            </div>
          </Reveal>

          {/* The call leads. Everything under it is the evidence for it. */}
          <Reveal asChild>
            <div className="border border-primary bg-primary text-primary-foreground">
              <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-highlight">
                    Predicted winner
                  </p>
                  <p className="mt-1.5 text-2xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-3xl">
                    Variant B, sticky add-to-cart bar
                  </p>
                </div>

                <dl className="grid gap-px border border-white/20 bg-white/20 sm:grid-cols-3">
                  {VERDICT.map((item) => (
                    <div key={item.label} className="bg-primary px-4 py-4">
                      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-white/60">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-xl font-semibold tracking-tight text-highlight sm:text-2xl">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>

          {/* The evidence: same time and team on both sides, so the only
              thing that moves is how many ideas actually get a real result. */}
          <Reveal delay={80} asChild>
            <div className="mt-8 flex flex-col items-center text-center">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground/40">
                {COMPARISON.timeframe}
              </p>

              <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-foreground/40">
                    {COMPARISON.before.label}
                  </p>
                  <p className="mt-1.5 text-6xl font-medium tracking-tight text-foreground/70">
                    {COMPARISON.before.count}
                  </p>
                  <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-foreground/55">
                    {COMPARISON.before.body}
                  </p>
                </div>

                <ArrowRight className="h-6 w-6 shrink-0 rotate-90 text-primary/40 sm:rotate-0" />

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
                    {COMPARISON.withJurny.label}
                  </p>
                  <p className="mt-1.5 text-6xl font-medium tracking-tight text-primary">
                    {COMPARISON.withJurny.count}
                  </p>
                  <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-foreground/65">
                    {COMPARISON.withJurny.body}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
