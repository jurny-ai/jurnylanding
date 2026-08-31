import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title: "Do Personas Improve LLM Predictions of A/B Test Winners? | jurny",
  description:
    "An exploratory test on historical Upworthy headline experiments: does a population of evidence-grounded personas predict A/B winners more accurately than a single “typical” user prompt?",
  openGraph: {
    title: "Do Personas Improve LLM Predictions of A/B Test Winners?",
    description:
      "An exploratory test on historical Upworthy headline experiments: does a population of evidence-grounded personas predict A/B winners more accurately than a single “typical” user prompt?",
    type: "article",
  },
};

export default function PersonasVsTypicalUserPage() {
  return (
    <BlogLayout
      title="Do Personas Improve LLM Predictions of A/B Test Winners?"
      author={{ name: "Sidd Adatrao", photo: "/sidd-adatrao.png" }}
      date="August 28, 2026"
    >
      <p className="text-foreground/90 leading-relaxed">
        The value of pre-validating A/B tests is clear. Jurny predicts each test before it launches,
        so you skip the likely losers and spend those slots on new ideas instead. Say it catches half
        of the losers up front, for a team running 50 tests a year at a 20% win rate, with $1M in
        added revenue per winner:
      </p>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm border border-border rounded-md">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border" />
              <th className="text-right font-semibold text-foreground px-4 py-3 border-b border-border">
                Today
              </th>
              <th className="text-right font-semibold text-foreground px-4 py-3 border-b border-border">
                With pre-validation
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="px-4 py-3 border-b border-border">Tests run per year</td>
              <td className="px-4 py-3 border-b border-border text-right">50</td>
              <td className="px-4 py-3 border-b border-border text-right">50 + 20 reclaimed slots</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">Win rate</td>
              <td className="px-4 py-3 border-b border-border text-right">20%</td>
              <td className="px-4 py-3 border-b border-border text-right">20%</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">Winners</td>
              <td className="px-4 py-3 border-b border-border text-right">10</td>
              <td className="px-4 py-3 border-b border-border text-right">14</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Revenue added</td>
              <td className="px-4 py-3 text-right font-semibold">$10M</td>
              <td className="px-4 py-3 text-right font-semibold text-primary">$14M</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-foreground/90 leading-relaxed">
        The big question is whether the technology can actually deliver. Our fundamental thesis is
        simple: personas matter.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        We create synthetic users in three stages: population creation, calibration, and behavior.
        This article looks specifically at step one, creation. The goal of this experiment is to
        explore the effect of data-backed user agents as a means to predict behavior, using
        historical headline experiments from the{" "}
        <a
          href="https://www.nature.com/articles/s41597-021-00934-7"
          className="text-primary hover:text-primary/80 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Upworthy Research Archive
        </a>
        .
      </p>
      <p className="text-foreground/90 leading-relaxed">
        To be clear about scope: this is not a test built to maximize accuracy. We are only isolating
        the effect of personas, so the setup is deliberately simple rather than exhaustive. None of
        the numbers below should be read as the best this approach can do; they are a floor from a
        single, uncalibrated stage of the full process.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">The data we used</h2>
      <p className="text-foreground/90 leading-relaxed">
        The Upworthy archive is a set of randomized headline experiments, with impressions and
        clicks recorded per arm. Before running any predictions, we built a clean headline cohort:
        each test&apos;s two highest-impression packages.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        From the earliest 250 tests, we kept the 83 with a statistically significant historical
        winner (pooled two-proportion{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">|z| &ge; 1.96</code>). A winner
        from a low-traffic or inconclusive test isn&apos;t a reliable label.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        One real pair from the set looks like this:
      </p>

      <div className="my-8">
        <div className="rounded-md border border-border bg-secondary/20 p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45 mb-3">
            The A/B pair
          </p>
          <div className="space-y-2 text-foreground/90">
            <p className="flex gap-3">
              <span className="mt-0.5 shrink-0 rounded bg-secondary px-1.5 text-xs font-bold text-foreground/60">
                A
              </span>
              What Would An Honest Coca-Cola Commercial Look Like?
            </p>
            <p className="flex gap-3">
              <span className="mt-0.5 shrink-0 rounded bg-secondary px-1.5 text-xs font-bold text-foreground/60">
                B
              </span>
              The Brutally Honest Coca-Cola Commercial You&apos;ll Never See On Air
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">The two approaches</h2>

      <h3 className="text-lg font-bold text-foreground mb-3 mt-10">
        1. The control: just asking the AI
      </h3>
      <p className="text-foreground/90 leading-relaxed">
        Our baseline is the obvious thing you would do today: ask the model directly. We showed each
        headline to Qwen3-8B separately and asked it to predict the CTR of a &ldquo;typical Upworthy
        user.&rdquo; We collected 10 estimates per headline, averaged them, and predicted that the
        headline with the higher CTR would win.
      </p>

      <h3 className="text-lg font-bold text-foreground mb-3 mt-10">
        2. Jurny: a population of 100 persona agents
      </h3>
      <p className="text-foreground/90 leading-relaxed">
        We created 100 synthetic audience members using public data from the same era as an
        outcome-blind prior. The target was U.S. adult Facebook news consumers in 2013.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        The population preserved published Pew marginal distributions for attributes including:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-foreground/90 leading-relaxed">
        <li>age, gender, income, education, and race/ethnicity;</li>
        <li>political identification and primary device;</li>
        <li>frequency of clicking and sharing news links;</li>
        <li>incidental versus intentional news exposure;</li>
        <li>reasons for following news and clicking links; and</li>
        <li>categories of news encountered regularly.</li>
      </ul>
      <p className="text-foreground/90 leading-relaxed">
        Pew did not publish respondent-level joint records. We therefore converted each published
        marginal into exact quotas and combined fields using a fixed seeded permutation.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        For each A/B test, every persona saw both headlines and chose the one they were more likely
        to open. We presented the pair in both orders to reduce position bias, then averaged the
        order-corrected preference signal across all 100 equally weighted personas.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Both approaches used Qwen3-8B at temperature 0.7.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">A concrete example</h2>
      <p className="text-foreground/90 leading-relaxed">
        Take the Coca-Cola pair shown above. Here is what each approach was actually asked about it.
      </p>

      <div className="my-8 space-y-4">
        <div className="rounded-md border border-border bg-secondary/20 p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45 mb-2">
            Control: just asking the AI
          </p>
          <p className="text-foreground/80 italic leading-relaxed">
            Each headline is shown on its own: &ldquo;Predict the CTR that a typical Upworthy-era
            Facebook user would exhibit when shown it in their feed.&rdquo; The higher predicted CTR
            wins.
          </p>
        </div>

        <div className="rounded-md border border-border bg-secondary/20 p-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45 mb-2">
            Jurny: persona population
          </p>
          <p className="text-foreground/80 italic leading-relaxed">
            Each of the 100 personas, given its own profile, sees both headlines: &ldquo;As this
            specific visitor, which headline would you open?&rdquo; The winner is whichever
            headline the population prefers overall.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">What happened</h2>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm border border-border rounded-md">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border">
                Method
              </th>
              <th className="text-right font-semibold text-foreground px-4 py-3 border-b border-border">
                Directional accuracy
              </th>
              <th className="text-right font-semibold text-foreground px-4 py-3 border-b border-border">
                Question-winner recall
              </th>
              <th className="text-right font-semibold text-foreground px-4 py-3 border-b border-border">
                Balanced accuracy
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="px-4 py-3 border-b border-border">Just asking the AI (control)</td>
              <td className="px-4 py-3 border-b border-border text-right">44.6%</td>
              <td className="px-4 py-3 border-b border-border text-right">44.8%</td>
              <td className="px-4 py-3 border-b border-border text-right">44.6%</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">Jurny: 100 Pew-grounded agents</td>
              <td className="px-4 py-3 border-b border-border text-right font-semibold text-primary">
                68.7%
              </td>
              <td className="px-4 py-3 border-b border-border text-right font-semibold text-primary">
                82.8%
              </td>
              <td className="px-4 py-3 border-b border-border text-right font-semibold text-primary">
                71.9%
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Difference</td>
              <td className="px-4 py-3 text-right font-semibold">+24.1 pts</td>
              <td className="px-4 py-3 text-right font-semibold">+37.9 pts</td>
              <td className="px-4 py-3 text-right font-semibold">+27.3 pts</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-foreground/90 leading-relaxed">
        The persona population was correct on 29 tests that the typical-user baseline missed. The
        reverse happened on nine tests. In a paired exact McNemar test, that difference produced{" "}
        <code className="rounded bg-secondary px-1.5 py-0.5 text-sm">p = 0.0017</code>.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">What this indicates</h2>
      <p className="text-foreground/90 leading-relaxed">
        This is encouraging evidence that replacing one generic aggregate-user prompt with a
        heterogeneous, evidence-grounded population can materially change an LLM&apos;s A/B
        predictions. Across these 83 tests, the population also produced
        substantially better directional and balanced accuracy.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        And this is only the first stage. We intentionally did not calibrate the population.
        Selecting or re-weighting personas against a subset of these tests is step two, calibration,
        and modeling how each persona actually behaves is step three. Layering those two stages on
        top of raw population creation produces substantially larger gains than what we report here,
        so the numbers above are best read as a lower bound on what the full process can do.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">The takeaway</h2>

      <blockquote className="border-t-2 border-foreground border-b border-border py-7 my-10 not-italic">
        <p className="text-xl md:text-2xl font-serif font-bold leading-snug text-foreground">
          A public-data-grounded persona population produced much better predictions than
          a single &ldquo;typical user&rdquo; prompt on this set of 83 significant historical tests.
        </p>
      </blockquote>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">Sources</h2>
      <ul className="list-disc pl-6 space-y-3 text-foreground/90 leading-relaxed">
        <li>
          <a
            href="https://www.nature.com/articles/s41597-021-00934-7"
            className="text-primary hover:text-primary/80 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Upworthy Research Archive paper
          </a>
        </li>
        <li>
          <a
            href="https://osf.io/jd64p/"
            className="text-primary hover:text-primary/80 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upworthy archive on OSF
          </a>
        </li>
        <li>
          <a
            href="https://assets.pewresearch.org/wp-content/uploads/sites/13/2013/10/facebook_news_10-24-2013.pdf"
            className="text-primary hover:text-primary/80 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pew: The Role of News on Facebook
          </a>
        </li>
      </ul>
    </BlogLayout>
  );
}
