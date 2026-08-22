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
      className="scroll-mt-14 bg-background py-7 sm:scroll-mt-16 sm:py-9"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Each claim breaks after the leading phrase rather than wrapping
              where it happens to run out of column, so the three opening
              phrases land on one line across the page and every qualifier
              starts at the same height underneath. A hairline rule separates
              the columns; on mobile, where they stack, it turns horizontal. */}
          <Reveal asChild>
            <div className="grid sm:grid-cols-3">
              {GAINS.map((gain, i) => (
                <p
                  key={gain.accent}
                  className={`flex flex-col items-center gap-2.5 px-4 text-center ${
                    i > 0 ? "mt-6 border-t border-border pt-6 sm:mt-0 sm:border-l sm:border-t-0 sm:pt-0" : ""
                  }`}
                >
                  <span className="border-2 border-highlight px-2.5 py-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
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
