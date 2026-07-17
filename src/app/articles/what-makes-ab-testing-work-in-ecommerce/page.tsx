import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title:
    "What Actually Makes A/B Testing Work in E-Commerce (And What Quietly Breaks It) — jurny",
  description:
    "Lessons from months of conversations with people who run experimentation programs: what makes a test worth running, what makes it worth trusting, and the failure modes that quietly break both.",
  openGraph: {
    title:
      "What Actually Makes A/B Testing Work in E-Commerce (And What Quietly Breaks It)",
    description:
      "Lessons from months of conversations with people who run experimentation programs: what makes a test worth running, what makes it worth trusting, and the failure modes that quietly break both.",
    type: "article",
  },
};

export default function AbTestingEcommercePage() {
  return (
    <BlogLayout
      title="What Actually Makes A/B Testing Work in E-Commerce (And What Quietly Breaks It)"
      author={{ name: "Vidushi Somani", photo: "/vidushi-somani.png" }}
      date="July 16, 2026"
    >
      <p className="text-foreground/90 leading-relaxed">
        I&apos;ve spent a good chunk of the past several months talking to people who run
        experimentation programs. I went in curious about one narrow question: what actually makes
        a test worth running, and what makes a test worth trusting once it&apos;s done. I came out
        with a much broader picture of how differently &ldquo;A/B testing&rdquo; looks depending on
        who&apos;s doing it, and I thought it was worth writing down.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        The mechanics are the same everywhere: control, variant, statistical significance. But
        whether a program actually works has almost nothing to do with the mechanics. It comes down
        to resourcing, discipline, and what a team has the judgment to <em>not</em> test. A lot of
        what separates the good programs from the rest, really, is how fast they can converge on an
        answer without cutting corners to get there. Here&apos;s what I learned.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">
        First, Some Context for What &ldquo;Good&rdquo; Even Means
      </h2>
      <p className="text-foreground/90 leading-relaxed">
        Before comparing notes, it helped to know the baseline. Industry benchmarks converge on a
        range: roughly 20 to 36% of e-commerce A/B tests reach statistical significance as a win,
        another chunk land as significant losses, and the largest share, often 40% or more, are
        simply inconclusive.
      </p>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm border border-border rounded-md">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border">
                Outcome
              </th>
              <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border">
                Share of tests
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="px-4 py-3 border-b border-border">Win (stat-sig)</td>
              <td className="px-4 py-3 border-b border-border">~20&ndash;36%</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">Loss (stat-sig)</td>
              <td className="px-4 py-3 border-b border-border">~25&ndash;35%</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Inconclusive</td>
              <td className="px-4 py-3">~40%+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-foreground/90 leading-relaxed">
        Everyone I talked to landed right in that range, and one of them said something that stuck
        with me: &ldquo;the best programs are winning 30% or 40%.&rdquo; If you&apos;re assuming
        your program should be winning 60 to 70% of the time, you&apos;re measuring against a
        fantasy, not a benchmark.
      </p>

      <blockquote className="border-t-2 border-foreground border-b border-border py-7 my-10 not-italic">
        <p className="text-xl md:text-2xl font-serif font-bold leading-snug text-foreground">
          &ldquo;The best programs are winning{" "}
          <span className="text-primary not-italic">30% or 40%</span>.&rdquo;
        </p>
      </blockquote>

      <p className="text-foreground/90 leading-relaxed">
        Convergence time follows a similar shape, and it&apos;s just as easy to misjudge:
      </p>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm border border-border rounded-md">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border">
                Where the test runs
              </th>
              <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border">
                Typical time to converge
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="px-4 py-3 border-b border-border">Homepage / high-traffic pages</td>
              <td className="px-4 py-3 border-b border-border">~1&ndash;2 weeks</td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">Mid-funnel (PDP, listings)</td>
              <td className="px-4 py-3 border-b border-border">~2&ndash;4 weeks</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Checkout / basket</td>
              <td className="px-4 py-3">~4&ndash;6 weeks</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-foreground/90 leading-relaxed">
        The further down the funnel, the less traffic hits it, and the longer it takes to converge,
        which is exactly why so many teams described rationing their test slots for checkout and
        basket experiments instead of running them freely.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Those durations assume real e-commerce traffic. Drop below a few thousand visitors a month,
        and it stretches much further; niche or B2B sites with a few hundred visitors and a handful
        of conversions a month can end up running a single test for three to six months just to
        reach significance, and by then the season, the campaign, or the market has usually shifted
        enough to contaminate the result anyway. Most of the guidance I found agrees on the same
        rule of thumb: if reaching your sample size would take more than six weeks, the test
        probably isn&apos;t worth running as a classic A/B test at all. At that point, it&apos;s
        usually better to test a much bigger change, pool traffic across similar pages, or just
        ship the change and measure before and after.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">
        What the People Running Successful Programs Actually Do
      </h2>

      <h3 className="text-lg font-bold text-foreground mb-3 mt-10">
        1. Pick one north-star metric before they look at anything
      </h3>
      <p className="text-foreground/90 leading-relaxed">
        One director optimizes for revenue per visitor (RPV), which is the combination of
        conversion rate and average order value, specifically because conversion alone can lie to
        you. A change that lowers conversion but raises average order value enough to offset it is
        a net win, and a program anchored only to conversion will kill it by mistake. The tradeoff
        is that RPV needs a much bigger sample to reach significance, so smaller-traffic teams
        often fall back to conversion, or even just &ldquo;did we move traffic further into the
        funnel,&rdquo; as a secondary metric.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        A PM at a marketplace runs the same logic with gross transaction value as the top-line
        number, decomposed into conversion and AOV as the causal drivers underneath it.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        What struck me wasn&apos;t which metric they picked. It was that they all picked it{" "}
        <em>before</em> the test ran, not after seeing which framing made the result look better.
      </p>

      <h3 className="text-lg font-bold text-foreground mb-3 mt-10">
        2. Commit to a significance threshold in advance, and actually stop there
      </h3>
      <p className="text-foreground/90 leading-relaxed">
        Nobody I talked to sticks rigidly to 95% confidence, and one director made a case I
        hadn&apos;t heard before: requiring 95% every time is actually &ldquo;a bad idea,&rdquo;
        because the gap between 80% confidence in a week and 95% confidence in a month is three
        extra weeks you could&apos;ve spent running three other tests. For low-risk changes, that
        tradeoff favors shipping faster at lower confidence. For anything with real downside risk
        to the customer, it&apos;s worth the extra weeks.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        The part that matters: that threshold gets decided <em>before</em> the test starts, never
        renegotiated once the test starts winning. The biggest source of bias I heard about, over
        and over, wasn&apos;t a bad hypothesis, it was a team watching a test trend positive early
        and deciding, mid-run, that 80% is good enough this time because they&apos;re excited.
        Plenty of tests that look like winners in week one flip to losers or go flat by week four.
        Calling a test early because you like where it&apos;s headed is peeking with extra steps,
        and it inflates your false-positive rate just the same. It doesn&apos;t actually get you to
        convergence any faster, it just fakes it.
      </p>

      <h3 className="text-lg font-bold text-foreground mb-3 mt-10">
        3. Have a real theory of what <em>not</em> to test
      </h3>
      <p className="text-foreground/90 leading-relaxed">
        This is the part most &ldquo;how to run experiments&rdquo; advice skips entirely. One
        team&apos;s filter for what doesn&apos;t earn an A/B test slot comes down to three things:
        not enough capacity (engineering, UX, or analysis) to run it properly, not enough traffic
        to hit significance in a reasonable window, or the change is too small to plausibly move
        the metric they&apos;re tracking. All three are really capacity problems wearing different
        masks.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Another director described a similar filter, but organized around change size: full A/B
        tests get reserved for substantial changes, like a navigation rebuild or a major product
        page redesign, while smaller decisions get made directionally, sometimes without formal
        testing at all, because running a rigorous test on a minor tweak just doesn&apos;t pay for
        itself.
      </p>

      <h3 className="text-lg font-bold text-foreground mb-3 mt-10">
        4. Research comes before the test, not instead of it
      </h3>
      <p className="text-foreground/90 leading-relaxed">
        Every single person described the same two-stage shape: qualitative research first (user
        testing, moderated sessions, walking someone through a prototype) to narrow down which of
        several plausible directions to pursue, and only then an A/B test to validate the one or
        two survivors at scale. One director explained it well: if there are 15 valid ways to
        redesign a navigation, you can&apos;t A/B test all 15. You user test your way down to two,
        then test those.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Research is really just an earlier, cheaper convergence step. It narrows the option set
        before you spend real traffic finding the answer. Experimentation then validates the
        survivor. Skipping straight to a test on an idea nobody&apos;s sanity-checked is how you
        end up running experiments that were never going to teach you anything.
      </p>

      <h3 className="text-lg font-bold text-foreground mb-3 mt-10">
        5. Measure the program, not just each test
      </h3>
      <p className="text-foreground/90 leading-relaxed">
        One thing I hadn&apos;t thought about before this: the director I mentioned earlier
        measures the <em>program</em>, not individual tests. So the net revenue impact across
        everything run, wins minus losses, and velocity, meaning is there ever a day with no
        experiment live. Whether any single test wins or loses is almost beside the point at that
        level. A program that &ldquo;saves&rdquo; the business from a bad idea leadership wanted to
        ship anyway is doing its job even when the raw win rate looks unimpressive. He called those
        saves, not losses, which is a distinction I liked.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">
        The Ways It Quietly Goes Wrong
      </h2>
      <p className="text-foreground/90 leading-relaxed">
        <strong className="text-foreground font-medium">Peeking, and calling it early.</strong>{" "}
        Already touched on this, but it deserves its own line because it&apos;s the single most
        common failure mode I heard about, across every conversation and in the broader research:
        checking results before the pre-registered sample size is reached, and acting on what you
        see anyway. It inflates the false-positive rate from a nominal 5% up toward 20 to 30%, and
        it&apos;s driven less by not knowing the stats than by the very human urge to keep watching
        something you already believe is working.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        <strong className="text-foreground font-medium">Sample ratio mismatch.</strong> Nobody
        brought this up unprompted, but it&apos;s worth knowing about: your control and variant
        groups end up split 55/45 instead of 50/50 because of a bucketing bug, a redirect issue, or
        logging that misses one variant more than the other. Research puts the incidence around 6
        to 10% of experiments even at strict detection thresholds, and even a fraction of a
        percentage point of imbalance can invalidate a result outright, because it means
        randomization, the entire foundation the statistics rest on, didn&apos;t happen the way you
        assumed. The more mature programs run automated checks for this on every test, before
        anyone looks at the topline number.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        <strong className="text-foreground font-medium">
          Metrics that drift from the hypothesis.
        </strong>{" "}
        If the metric you decide the test on isn&apos;t the metric the hypothesis was actually
        about, you get a technically-significant result that doesn&apos;t answer the question you
        set out to ask.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        <strong className="text-foreground font-medium">Underpowered tests.</strong> Running a test
        without first calculating the sample size needed to detect a meaningful effect is common
        enough that some estimates put a large share of tests in this bucket. An underpowered test
        reporting a &ldquo;winner&rdquo; often doesn&apos;t reproduce at full traffic.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        <strong className="text-foreground font-medium">
          Confirmation bias wearing a &ldquo;directional insight&rdquo; costume.
        </strong>{" "}
        A familiar pattern: a VP pushing back with &ldquo;we all know this is better, why do we
        have to test it?&rdquo;, and then it loses. That instinct is exactly why experimentation
        programs exist, and it&apos;s also the instinct that quietly erodes them when leadership
        routes around the process for their own pet ideas.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">
        The Pattern Underneath All of It
      </h2>
      <p className="text-foreground/90 leading-relaxed">
        Line these programs up and the real variable isn&apos;t sophistication, it&apos;s headcount
        relative to traffic and margin, which in practice means how fast each team can converge on
        a decision:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-foreground/90 leading-relaxed">
        <li>
          <strong className="text-foreground font-medium">High-margin, lower-traffic:</strong> one
          analyst, one to three tests a month, every test earns its slot, and each one takes a
          while to converge simply because the traffic isn&apos;t there.
        </li>
        <li>
          <strong className="text-foreground font-medium">
            High-volume, thin research bandwidth:
          </strong>{" "}
          millions of sessions, but a UXR team that can run maybe a handful of formal studies a
          year, so most smaller calls lean on historical pattern-matching instead of fresh
          research.
        </li>
        <li>
          <strong className="text-foreground font-medium">
            Resource-constrained and reactive:
          </strong>{" "}
          friction gets found mostly by someone noticing a conversion dip and working backward, not
          by a dedicated team proactively hunting for it.
        </li>
        <li>
          <strong className="text-foreground font-medium">
            Scaled and structurally different:
          </strong>{" "}
          enough traffic that convergence itself is cheap, so the real question shifts from
          &ldquo;can we detect an effect&rdquo; to &ldquo;how do we avoid becoming an org that
          needs an A/B test to make every decision&rdquo;.
        </li>
      </ul>
      <p className="text-foreground/90 leading-relaxed">
        None of these teams are doing it wrong. Each is optimizing for the constraint that actually
        binds for them. The mistake would be importing someone else&apos;s cadence, trying to run a
        high-volume competitor&apos;s dozens-a-month pace with a premium brand&apos;s traffic, or
        trying to match a large marketplace&apos;s rollout sophistication without its engineering
        depth.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">
        What I Kept Hearing, Unprompted
      </h2>
      <p className="text-foreground/90 leading-relaxed">
        Nearly everyone wanted the same thing: a cheaper, faster signal before committing real
        traffic to a test. To be able to push validation earlier and cheaper, save real A/B tests
        for ideas that already cleared a lower bar. Underneath that, what they actually wanted was
        to converge faster, without needing more traffic to do it.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        That&apos;s the gap we built Jurny around. Everyone already had a version of this instinct,
        but each workaround still cost something. User testing panels are slow and expensive to run
        repeatedly, dogfooding only surfaces your own employees&apos; blind spots, and synthetic
        tools that don&apos;t actually walk a site step by step still can&apos;t tell you{" "}
        <em>why</em> something didn&apos;t work.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Jurny is our way of closing that gap directly: synthetic users that navigate a real site or
        prototype with a persona and a goal, no scripted steps, and come back with the reasoning
        behind where they dropped off, not just that they did. The point is to gate out the ideas
        that were never going to win before they take up a testing slot, so the tests you do run
        converge faster, and the traffic you have goes toward ideas that already cleared a real
        bar.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Not a replacement for the A/B test. A way to get to the answer faster without needing more
        traffic to do it.
      </p>

      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground leading-snug italic">
          Benchmark figures on win rates and test duration are drawn from published 2025&ndash;2026
          A/B testing industry studies (DRIP, Visionary, ConversionTeam, VWO&apos;s State of
          Optimization survey).
        </p>
      </div>
    </BlogLayout>
  );
}
