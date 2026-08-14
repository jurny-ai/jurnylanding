import Reveal from "@/components/Reveal";
import StorefrontMock from "@/components/mocks/StorefrontMock";
import HeatmapOverlay, { HeatmapLegend } from "@/components/HeatmapOverlay";
import { VARIANT_A_VIEWPORT_CLICKS, VARIANT_B_VIEWPORT_CLICKS } from "@/lib/variant-clicks";
import { cn } from "@/lib/utils";

const VARIANTS = [
  {
    id: "a" as const,
    tag: "Control",
    name: "Gallery first, single add to cart",
    points: VARIANT_A_VIEWPORT_CLICKS,
    stats: [
      { label: "Add to cart", value: "4.1%" },
      { label: "Reached buy box", value: "62%" },
      { label: "Started checkout", value: "2.8%" },
    ],
  },
  {
    id: "b" as const,
    tag: "Variant B",
    name: "Express pay above the fold, sticky bar",
    winner: true,
    points: VARIANT_B_VIEWPORT_CLICKS,
    stats: [
      { label: "Add to cart", value: "5.2%" },
      { label: "Reached buy box", value: "88%" },
      { label: "Started checkout", value: "3.9%" },
    ],
  },
];

const VERDICT = [
  { label: "Lift on add to cart", value: "+27%" },
  { label: "Variants eliminated", value: "3 of 5" },
  { label: "Time to the call", value: "4 hours" },
];

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
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
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
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-highlight">
                    Predicted winner
                  </p>
                  <p className="mt-1.5 text-2xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-3xl">
                    Variant B, express pay above the fold
                  </p>
                </div>

                <dl className="grid gap-px border border-white/20 bg-white/20 sm:grid-cols-3">
                  {VERDICT.map((item) => (
                    <div key={item.label} className="bg-primary px-4 py-4">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
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

          {/* The evidence: where the synthetic users actually clicked. */}
          <Reveal delay={80} className="mt-4 grid gap-4 lg:grid-cols-2">
            {VARIANTS.map((variant) => (
              <div
                key={variant.id}
                className={cn(
                  "flex flex-col border bg-card",
                  variant.winner ? "border-primary" : "border-border"
                )}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-4 py-3">
                  <span
                    className={cn(
                      "px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
                      variant.winner
                        ? "bg-primary text-primary-foreground"
                        : "bg-foreground/[0.07] text-foreground/55"
                    )}
                  >
                    {variant.tag}
                  </span>
                  <span className="text-sm font-semibold tracking-tight text-foreground">{variant.name}</span>
                  {variant.winner && (
                    <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                      <span className="h-1.5 w-1.5 bg-highlight" />
                      Winner
                    </span>
                  )}
                </div>

                <StorefrontMock screen="pdp" variant={variant.id} crop="viewport" chrome={false} className="border-0">
                  <HeatmapOverlay points={variant.points} />
                </StorefrontMock>

                <dl className="grid grid-cols-3 border-t border-border">
                  {variant.stats.map((stat, i) => (
                    <div key={stat.label} className={cn("px-4 py-3", i > 0 && "border-l border-border")}>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/40">
                        {stat.label}
                      </dt>
                      <dd className="mt-1 text-lg font-semibold tracking-tight text-foreground">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </Reveal>

          <Reveal delay={120} className="mt-4">
            <HeatmapLegend />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
