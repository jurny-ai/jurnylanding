"use client";

import Reveal from "@/components/Reveal";

const proofCards = [
  {
    title: "rage clicks",
    metric: "-53%",
    context: "D2C education platform with 30,000 users",
  },
  {
    title: "to A/B test convergence",
    metric: "1 day",
    context: "Large enterprise ecommerce company",
    // The quote itself lives in the JSX below: it carries an emphasised span
    // that a plain string in this table cannot.
    quoted: true,
  },
];

const Results = () => {
  return (
    <section id="results" className="bg-background pb-8 pt-8 sm:pb-10 sm:pt-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px border border-border bg-border lg:grid-cols-[0.82fr_1.18fr]">
            {proofCards.map((card, i) => {
              if (!card.quoted) {
                return (
                  <Reveal key={card.title} asChild delay={i * 120}>
                    <div className="flex min-h-[190px] flex-col justify-center bg-secondary p-6 text-left sm:p-7">
                      <div>
                        <p className="text-6xl font-medium tracking-[-0.05em] text-primary sm:text-7xl">
                          {card.metric}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                          {card.title}
                        </h3>
                        <p className="mt-1.5 text-base font-medium text-foreground/60">{card.context}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              }

              return (
                <Reveal key={card.title} asChild delay={i * 120}>
                  <div className="grid min-h-[190px] bg-secondary p-6 text-left sm:p-7 xl:grid-cols-[1fr_auto_0.72fr] xl:items-center xl:gap-8">
                    <div>
                      <blockquote className="text-xl font-normal leading-snug tracking-tight text-foreground sm:text-2xl">
                        Reduced a 1.25-month experiment cycle to a{" "}
                        <span className="text-primary">single day with Jurny</span>.
                      </blockquote>
                    </div>

                    <div className="my-4 h-px bg-border xl:my-0 xl:h-28 xl:w-px" />

                    <div className="xl:pl-2">
                      <p className="text-6xl font-semibold tracking-tight text-primary sm:text-7xl">
                        {card.metric}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-base font-medium text-foreground/60">{card.context}</p>
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
