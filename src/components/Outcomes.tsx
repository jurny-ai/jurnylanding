import Reveal from "@/components/Reveal";

/**
 * The three outcome claims and nothing else: no heading, no chassis, no
 * supporting line. An earlier version argued each claim with its own chart,
 * which meant illustrating results the two demo sections below already show
 * with real screens. The claims still need saying up front; the evidence for
 * them belongs to those sections.
 */
const GAINS = [
  { accent: "More conversions", rest: "from the traffic you already have" },
  { accent: "Revenue", rest: "hiding in the cohorts that drop off" },
  { accent: "More ideas", rest: "tested per quarter, without extra build time" },
];

const Outcomes = () => {
  return (
    <section
      id="features"
      className="scroll-mt-14 border-b border-border bg-background py-7 sm:scroll-mt-16 sm:py-9"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Each claim breaks after the outlined phrase rather than wrapping
              where it happens to run out of column, so the three lime marks
              land on one line across the page and every qualifier starts at
              the same height underneath. */}
          <Reveal asChild>
            <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
              {GAINS.map((gain) => (
                <p key={gain.accent} className="flex flex-col items-center gap-2.5 text-center">
                  <span className="border-2 border-highlight bg-highlight/10 px-2.5 py-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {gain.accent}
                  </span>
                  <span className="text-xl font-medium leading-snug tracking-tight text-foreground/70 sm:text-2xl">
                    {gain.rest}
                  </span>
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
