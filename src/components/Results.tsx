"use client";

import Reveal from "@/components/Reveal";

const proofCards = [
  {
    eyebrow: "Behavioral friction",
    title: "rage clicks",
    metric: "-53%",
    context: "D2C education platform with 30,000 users",
  },
  {
    eyebrow: "Experiment velocity",
    title: "to A/B test convergence",
    metric: "1 day",
    context: "Large enterprise ecommerce company",
    quote: "Reduced a 1.25-month experiment cycle to a single day with Jurny.",
  },
];

const Results = () => {
  return (
    <section id="results" className="border-b border-border bg-background pb-12 pt-10 sm:pb-14 sm:pt-14">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px border border-border bg-border lg:grid-cols-[0.82fr_1.18fr]">
            {proofCards.map((card, i) => {
              if (!card.quote) {
                return (
                  <Reveal key={card.title} asChild delay={i * 120}>
                    <div className="flex min-h-[270px] flex-col justify-between bg-secondary p-6 text-left sm:p-8">
                      <p className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-primary">
                        {card.eyebrow}
                      </p>

                      <div>
                        <p className="text-6xl font-medium tracking-[-0.05em] text-primary sm:text-7xl">
                          {card.metric}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-base font-medium text-foreground/60">{card.context}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              }

              return (
                <Reveal key={card.title} asChild delay={i * 120}>
                  <div className="grid min-h-[270px] bg-secondary p-6 text-left sm:p-8 xl:grid-cols-[1fr_auto_0.72fr] xl:items-center xl:gap-8">
                    <div>
                      <p className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-primary">
                        {card.eyebrow}
                      </p>

                      <blockquote className="text-xl font-normal leading-snug tracking-tight text-foreground sm:text-2xl">
                        Reduced a 1.25-month experiment cycle to a{" "}
                        <span className="text-primary">single day with Jurny</span>.
                      </blockquote>
                    </div>

                    <div className="my-5 h-px bg-border xl:my-0 xl:h-36 xl:w-px" />

                    <div className="xl:pl-2">
                      <p className="text-6xl font-semibold tracking-tight text-primary sm:text-7xl">
                        {card.metric}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-base font-medium text-foreground/60">{card.context}</p>
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
