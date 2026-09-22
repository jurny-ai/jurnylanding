import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "A More Human-Like AI Focus Group Isn’t Necessarily a Better One | jurny",
  description:
    "A synthetic population can look and sound like real people while still predicting the wrong outcome.",
  openGraph: {
    title: "A More Human-Like AI Focus Group Isn’t Necessarily a Better One",
    description:
      "Matching the variety of human behavior is not the same as predicting what people will do.",
    type: "article",
  },
};

const matchedDistribution = [16, 31, 54, 82, 100, 82, 54, 31, 16];

function Distribution({ muted = false }: { muted?: boolean }) {
  return (
    <div className="flex h-20 items-end gap-1 border-b border-foreground/25" aria-hidden="true">
      {matchedDistribution.map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={`min-w-0 flex-1 ${muted ? "bg-foreground/30" : "bg-primary/75"}`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

export default function HumanLikeAiFocusGroupPage() {
  return (
    <BlogLayout
      title="A More Human-Like AI Focus Group Isn’t Necessarily a Better One"
      subtitle="Matching the variety of human behavior is not the same as predicting what people will do."
      author={{ name: "Sidd Adatrao", photo: "/sidd-adatrao.png" }}
      date="September 21, 2026"
    >
      <p className="text-xl leading-relaxed text-foreground">
        Most evaluations of synthetic users begin by inspecting the users themselves. Do they sound
        distinct? Do they express believable motivations? Does the group contain a realistic range
        of needs and preferences?
      </p>

      <p className="leading-relaxed text-foreground/90">
        Those checks tell us whether the simulation represents the kinds of people we expected to
        see. They do not tell us whether those simulated people react correctly when price, copy,
        design, or context changes.
      </p>

      <p className="leading-relaxed text-foreground/90">
        That second question requires a different comparison. We need to measure the path from user
        type to observed action, not just the distribution of user types.
      </p>

      <h2 className="mb-4 mt-12 text-xl font-bold text-foreground">
        A simulation has to get two things right
      </h2>

      <p className="leading-relaxed text-foreground/90">
        Imagine dividing customers into a few broad groups: bargain hunters, convenience shoppers,
        loyal customers, and cautious first-time buyers.
      </p>

      <p className="leading-relaxed text-foreground/90">
        To predict the overall result, a simulation needs to know two things:
      </p>

      <ol className="space-y-5 pl-6 text-foreground/90">
        <li className="pl-2 leading-relaxed">
          <strong className="font-semibold text-foreground">How common each group is.</strong> What
          share of the real population consists of bargain hunters, loyal customers, or cautious new
          buyers?
        </li>
        <li className="pl-2 leading-relaxed">
          <strong className="font-semibold text-foreground">How each group actually behaves.</strong>{" "}
          When shown the same offer, how likely is each group to choose it?
        </li>
      </ol>

      <p className="leading-relaxed text-foreground/90">
        Persona diversity mainly helps with the first problem. It can make the simulated population
        contain a more realistic mix of people. But the final prediction also depends on the second
        problem: whether the agents make decisions the way their real counterparts do.
      </p>

      <div className="my-10 border border-border bg-secondary/30 px-5 py-6 sm:px-7">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          The simple version
        </p>
        <p className="m-0 font-serif text-lg font-bold leading-relaxed text-foreground sm:text-xl">
          Overall prediction = each group&apos;s share × how that group behaves
        </p>
      </div>

      <p className="leading-relaxed text-foreground/90">
        Getting the group shares right is not enough. If the model gets the behavior of those groups
        wrong, the final answer can still be wrong.
      </p>

      <figure className="my-10 border border-border bg-card p-5 sm:p-7">
        <div className="mb-7">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Simple example
          </p>
          <h3 className="m-0 text-lg font-bold text-foreground">
            The same population mix can produce opposite predictions
          </h3>
        </div>

        <div className="grid gap-7 sm:grid-cols-2">
          <section aria-labelledby="human-distribution-title">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h4 id="human-distribution-title" className="m-0 text-sm font-semibold text-foreground">
                Real customers
              </h4>
              <span className="text-xs text-muted-foreground">Population mix</span>
            </div>
            <Distribution />
          </section>

          <section aria-labelledby="simulated-distribution-title">
            <div className="mb-4 flex items-baseline justify-between gap-3">
              <h4 id="simulated-distribution-title" className="m-0 text-sm font-semibold text-foreground">
                Simulated customers
              </h4>
              <span className="text-xs text-muted-foreground">Same population mix</span>
            </div>
            <Distribution muted />
          </section>
        </div>

        <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
          <div className="bg-secondary/45 p-4">
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              What real customers do
            </p>
            <div className="mt-3 h-2 bg-border">
              <div className="h-full w-[70%] bg-primary" />
            </div>
            <p className="mb-0 mt-2 text-sm font-bold text-foreground">70% choose A</p>
          </div>
          <div className="bg-secondary/45 p-4">
            <p className="m-0 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              What the simulation predicts
            </p>
            <div className="mt-3 h-2 bg-border">
              <div className="h-full w-[30%] bg-foreground/45" />
            </div>
            <p className="mb-0 mt-2 text-sm font-bold text-foreground">30% choose A</p>
          </div>
        </div>
      </figure>

      <h2 className="mb-4 mt-12 text-xl font-bold text-foreground">
        Where prediction error can hide
      </h2>

      <p className="leading-relaxed text-foreground/90">
        A real-to-simulated comparison should identify which part of the prediction process is
        failing. There are at least three distinct sources of error.
      </p>

      <div className="my-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
        <section className="bg-card p-5 sm:p-6">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Population error
          </p>
          <h3 className="mb-3 mt-0 text-lg font-bold text-foreground">The mix is wrong</h3>
          <p className="m-0 text-sm leading-relaxed text-foreground/75">
            The simulation contains too many users of one kind and too few of another. Even accurate
            individual decisions will aggregate to the wrong result.
          </p>
        </section>
        <section className="bg-card p-5 sm:p-6">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Response error
          </p>
          <h3 className="mb-3 mt-0 text-lg font-bold text-foreground">The reactions are wrong</h3>
          <p className="m-0 text-sm leading-relaxed text-foreground/75">
            The population mix is correct, but simulated users respond differently from comparable
            real users when shown the same thing.
          </p>
        </section>
        <section className="bg-card p-5 sm:p-6">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Context error
          </p>
          <h3 className="mb-3 mt-0 text-lg font-bold text-foreground">The sensitivity is wrong</h3>
          <p className="m-0 text-sm leading-relaxed text-foreground/75">
            Real behavior changes with device, order, prior experience, or framing. The simulation
            may react too much, too little, or in the wrong direction.
          </p>
        </section>
      </div>

      <h2 className="mb-4 mt-12 text-xl font-bold text-foreground">
        A better real-to-simulated comparison
      </h2>

      <p className="leading-relaxed text-foreground/90">
        The cleanest evaluation is a matched study. Real and simulated users should receive the same
        task, the same information, and the same set of choices. The comparison should preserve the
        conditions that could affect the result, including presentation order, device, price, and
        prior context.
      </p>

      <ol className="space-y-6 pl-6 text-foreground/90">
        <li className="pl-2 leading-relaxed">
          <strong className="font-semibold text-foreground">Define the prediction first.</strong>{" "}
          Decide whether the simulator is predicting a choice rate, a ranking, a winning variant,
          retention, or something else. Score the output the product decision will actually use.
        </li>
        <li className="pl-2 leading-relaxed">
          <strong className="font-semibold text-foreground">Match the inputs.</strong> Show real and
          simulated users the same stimulus under the same randomized conditions. Otherwise a
          difference in outcomes may be caused by the setup rather than the simulation.
        </li>
        <li className="pl-2 leading-relaxed">
          <strong className="font-semibold text-foreground">Compare within groups.</strong> Measure
          whether bargain hunters, new customers, or other meaningful groups respond like their real
          counterparts. An accurate overall number can hide offsetting segment errors.
        </li>
        <li className="pl-2 leading-relaxed">
          <strong className="font-semibold text-foreground">Rebuild the total using real weights.</strong>{" "}
          Combine the simulated group-level predictions using the observed size of each real group.
          This isolates response error from errors in the simulated population mix.
        </li>
        <li className="pl-2 leading-relaxed">
          <strong className="font-semibold text-foreground">Evaluate on held-out outcomes.</strong>{" "}
          Data used to create, prompt, select, or tune the personas should not also be used to claim
          predictive performance.
        </li>
      </ol>

      <h2 className="mb-4 mt-12 text-xl font-bold text-foreground">What to report</h2>

      <div className="my-8 overflow-x-auto">
        <table className="w-full min-w-[620px] border border-border text-sm">
          <thead>
            <tr className="bg-secondary/50">
              <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                Measure
              </th>
              <th className="border-b border-border px-4 py-3 text-left font-semibold text-foreground">
                What it reveals
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="border-b border-border px-4 py-3 font-medium">Outcome error</td>
              <td className="border-b border-border px-4 py-3">
                How far the simulated choice or conversion rate is from the real rate.
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-4 py-3 font-medium">Calibration</td>
              <td className="border-b border-border px-4 py-3">
                Whether events predicted at 70% actually occur about 70% of the time.
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-4 py-3 font-medium">Segment error</td>
              <td className="border-b border-border px-4 py-3">
                Which customer groups are predicted well and which are being averaged away.
              </td>
            </tr>
            <tr>
              <td className="border-b border-border px-4 py-3 font-medium">Decision accuracy</td>
              <td className="border-b border-border px-4 py-3">
                Whether the simulation selects the real winner or produces the correct ranking.
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Decision regret</td>
              <td className="px-4 py-3">
                The value lost by following the simulation instead of the best real-world option.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="leading-relaxed text-foreground/90">
        Every result should be shown beside a simple baseline, such as the overall historical rate,
        one generic agent, or the current decision process. A complex persona population is useful
        only when it improves the decision beyond what the simpler method already provides.
      </p>

      <p className="leading-relaxed text-foreground/90">
        This evaluation produces a more useful diagnosis than a single similarity score. It tells us
        whether the simulated population has the wrong composition, the wrong response patterns, or
        the wrong sensitivity to context. More importantly, it shows which failure matters for the
        decision being made.
      </p>
    </BlogLayout>
  );
}
