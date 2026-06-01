"use client";

import { CheckCircle2, MousePointerClick } from "lucide-react";

const proofCards = [
  {
    eyebrow: "Behavioral friction",
    title: "Reduced rage clicks",
    metric: "53%",
    context: "Consumer SaaS with 30,000 monthly users",
    icon: MousePointerClick,
  },
  {
    eyebrow: "Product feedback",
    title: "Issues accepted",
    metric: "30",
    context: "D2C SaaS company",
    quote:
      "Jurny found bugs we would have missed and helped us prioritize fixes that directly protect our funnel.",
    icon: CheckCircle2,
  },
];

const Results = () => {
  return (
    <section id="results" className="bg-background py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1fr_2fr]">
          {proofCards.map((card) => {
            const Icon = card.icon;

            if (!card.quote) {
              return (
                <div
                  key={card.title}
                  className="flex min-h-[280px] flex-col rounded-2xl border border-primary/20 bg-[linear-gradient(145deg,hsl(var(--secondary))_0%,rgba(117,88,232,0.10)_100%)] p-5 text-left shadow-[0_18px_52px_rgba(117,88,232,0.08)] sm:rounded-3xl sm:p-6"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                      {card.eyebrow}
                    </p>
                  </div>

                  <div>
                    <p className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                      {card.metric}
                    </p>
                    <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-foreground/55">{card.context}</p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={card.title}
                className="grid min-h-[280px] rounded-2xl border border-primary/20 bg-[linear-gradient(145deg,rgba(117,88,232,0.12)_0%,hsl(var(--secondary))_55%,rgba(85,119,230,0.08)_100%)] p-5 text-left shadow-[0_18px_52px_rgba(117,88,232,0.1)] sm:rounded-3xl sm:p-6 xl:grid-cols-[1fr_auto_0.72fr] xl:items-start xl:gap-6"
              >
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                        {card.eyebrow}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-xl font-normal leading-snug tracking-tight text-foreground sm:text-2xl">
                    &ldquo;Jurny found bugs we would have missed and helped us prioritize fixes that directly{" "}
                    <span className="text-primary">protect our funnel</span>.&rdquo;
                  </blockquote>
                </div>

                <div className="my-5 h-px bg-primary/15 xl:my-0 xl:h-32 xl:w-px" />

                <div className="xl:pl-2">
                  <p className="text-6xl font-bold tracking-tight text-primary sm:text-7xl">
                    {card.metric}
                  </p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-foreground/55">{card.context}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Results;
