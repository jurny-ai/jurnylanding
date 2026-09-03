"use client";

import { MousePointerClick, Timer } from "lucide-react";
import Reveal from "@/components/Reveal";

const proofCards = [
  {
    eyebrow: "Behavioral friction",
    title: "Reduced rage clicks",
    metric: "53%",
    context: "D2C education platform with 30,000 users",
    icon: MousePointerClick,
  },
  {
    eyebrow: "Experiment velocity",
    title: "to A/B test convergence",
    metric: "1 day",
    context: "Large enterprise ecommerce company",
    quote: "Reduced a 1.25-month experiment cycle to a single day with Jurny.",
    icon: Timer,
  },
];

const Results = () => {
  return (
    <section id="results" className="border-b border-border bg-background pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <Reveal asChild>
            <h2 className="mb-12 max-w-3xl text-left text-xl font-medium leading-snug tracking-tight text-foreground/65 sm:text-2xl">
              Built for teams moving beyond slow, traffic-heavy experiments.
              <br />
              Real conversion insights, surfaced in days instead of weeks.
            </h2>
          </Reveal>

          <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
            {proofCards.map((card, i) => {
              const Icon = card.icon;

              if (!card.quote) {
                return (
                  <Reveal key={card.title} asChild delay={i * 120}>
                    <div className="flex min-h-[280px] flex-col justify-center border border-border bg-secondary p-6 text-left sm:p-8">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center bg-highlight text-highlight-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                          {card.eyebrow}
                        </p>
                      </div>

                      <div>
                        <p className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
                          +{card.metric}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-foreground/55">{card.context}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              }

              return (
                <Reveal key={card.title} asChild delay={i * 120}>
                  <div className="grid min-h-[280px] border border-border bg-secondary p-6 text-left sm:p-8 xl:grid-cols-[1fr_auto_0.72fr] xl:items-center xl:gap-6">
                    <div>
                      <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center bg-highlight text-highlight-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                          {card.eyebrow}
                        </p>
                      </div>

                      <blockquote className="text-xl font-normal leading-snug tracking-tight text-foreground sm:text-2xl">
                        Reduced a 1.25-month experiment cycle to a{" "}
                        <span className="text-primary">single day with Jurny</span>.
                      </blockquote>
                    </div>

                    <div className="my-5 h-px bg-primary/15 xl:my-0 xl:h-32 xl:w-px" />

                    <div className="xl:pl-2">
                      <p className="text-6xl font-semibold tracking-tight text-primary sm:text-7xl">
                        {card.metric}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-foreground/55">{card.context}</p>
                    </div>
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

export default Results;
