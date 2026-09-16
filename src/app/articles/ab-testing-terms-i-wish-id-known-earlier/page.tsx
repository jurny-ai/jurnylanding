import type { Metadata } from "next";
import BlogLayout from "@/components/BlogLayout";

export const metadata: Metadata = {
  title:
    "Terms I Wish I’d Known Earlier: 8 A/B Testing Concepts for People Who Already Run Tests | jurny",
  description:
    "False positive risk, peeking, sample ratio mismatch, CUPED, and four other concepts that decide whether your A/B test win is real, explained for teams who already run experiments.",
  openGraph: {
    title:
      "Terms I Wish I’d Known Earlier: 8 A/B Testing Concepts for People Who Already Run Tests",
    description:
      "False positive risk, peeking, sample ratio mismatch, CUPED, and four other concepts that decide whether your A/B test win is real, explained for teams who already run experiments.",
    type: "article",
  },
};

function Cite({ id, label }: { id: string; label: string }) {
  return (
    <sup className="text-xs font-medium">
      <a href={`#${id}`} className="text-primary no-underline hover:underline">
        {label}
      </a>
    </sup>
  );
}

function ConceptHeading({
  n,
  id,
  children,
}: {
  n: number;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="flex items-center gap-3 mb-4 mt-14 scroll-mt-24">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary font-bold text-base">
        {n}
      </span>
      <h2 className="text-xl font-bold text-foreground">{children}</h2>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md border border-border bg-secondary/20 p-4 text-center">
      <p className="text-2xl md:text-3xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground mt-1 leading-snug">{label}</p>
    </div>
  );
}

export default function AbTestingConceptsPage() {
  return (
    <BlogLayout
      title="Terms I Wish I’d Known Earlier: 8 A/B Testing Concepts for People Who Already Run Tests"
      subtitle="The hard part of A/B testing isn’t the tooling. It’s a handful of concepts that decide whether your “win” is real or a story you told yourself."
      author={{ name: "Vidushi Somani", photo: "/vidushi-somani.png" }}
      date="September 16, 2026"
    >
      <p className="text-foreground/90 leading-relaxed">
        I never thought my stats major would become useful. Here we are. The more I dig into
        experimentation, the more I find these ideas genuinely interesting, and the more I see
        smart teams trip over the same few of them. These are the eight I&apos;ve learned the most
        from, and the ones I wish I&apos;d known earlier.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-10">
        <Stat value="22%" label={"of “significant” results are false positives at typical settings"} />
        <Stat value="64%" label="chance of a false win after checking 20 segments" />
        <Stat value="6%" label="of experiments show a sample ratio mismatch" />
        <Stat value="65%" label="faster time-to-significance using CUPED" />
      </div>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm border border-border rounded-md">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border">
                Concept
              </th>
              <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border">
                What it protects you from
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="px-4 py-3 border-b border-border">
                <a href="#false-positive-risk" className="text-primary hover:text-primary/80 underline">
                  1. False Positive Risk
                </a>
              </td>
              <td className="px-4 py-3 border-b border-border">
                A &ldquo;significant&rdquo; result that&apos;s actually noise
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">
                <a href="#power-mde" className="text-primary hover:text-primary/80 underline">
                  2. Power &amp; MDE
                </a>
              </td>
              <td className="px-4 py-3 border-b border-border">
                Testing a change too small for your traffic to detect
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">
                <a href="#peeking" className="text-primary hover:text-primary/80 underline">
                  3. Peeking
                </a>
              </td>
              <td className="px-4 py-3 border-b border-border">
                Inflating your error rate by watching too closely
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">
                <a href="#multiple-comparisons" className="text-primary hover:text-primary/80 underline">
                  4. Multiple Comparisons
                </a>
              </td>
              <td className="px-4 py-3 border-b border-border">
                Manufacturing a &ldquo;win&rdquo; by slicing into segments
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">
                <a href="#srm" className="text-primary hover:text-primary/80 underline">
                  5. Sample Ratio Mismatch
                </a>
              </td>
              <td className="px-4 py-3 border-b border-border">
                A broken pipeline invalidating the whole test
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">
                <a href="#oec" className="text-primary hover:text-primary/80 underline">
                  6. OEC
                </a>
              </td>
              <td className="px-4 py-3 border-b border-border">
                Optimizing a metric that quietly loses you money
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 border-b border-border">
                <a href="#cuped" className="text-primary hover:text-primary/80 underline">
                  7. CUPED
                </a>
              </td>
              <td className="px-4 py-3 border-b border-border">
                Wasting traffic you could&apos;ve turned into statistical power
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">
                <a href="#winners-curse" className="text-primary hover:text-primary/80 underline">
                  8. Winner&apos;s Curse
                </a>
              </td>
              <td className="px-4 py-3">Trusting a reported lift that won&apos;t hold up</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ConceptHeading n={1} id="false-positive-risk">
        False Positive Risk
      </ConceptHeading>
      <p className="text-foreground/90 leading-relaxed">
        A p-value of 0.05 doesn&apos;t mean there&apos;s a 5% chance your result is wrong. The
        number that matters is False Positive Risk: given a significant result, how likely is it
        that nothing actually happened? It depends on how often your ideas work. With 95%
        confidence, 80% power, and a 10% success rate,{" "}
        <strong className="text-primary font-semibold">22%</strong> of significant results are
        false positives <Cite id="src-1" label="[1]" />.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Now the real world. In practice, almost no program holds to 95% consistently. Many drop to
        80% to learn faster, and the confidence level you actually run at changes the odds a lot:
      </p>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm border border-border rounded-md">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left font-semibold text-foreground px-4 py-3 border-b border-border">
                Confidence you run at
              </th>
              <th className="text-right font-semibold text-foreground px-4 py-3 border-b border-border">
                False Positive Risk
              </th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            <tr>
              <td className="px-4 py-3 border-b border-border">95%</td>
              <td className="px-4 py-3 border-b border-border text-right">
                22% <Cite id="src-1" label="[1]" />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">80%</td>
              <td className="px-4 py-3 text-right font-semibold text-primary">
                ~49% <Cite id="calc-a" label="[A]" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-foreground/90 leading-relaxed">
        At 80% confidence, roughly half your &ldquo;wins&rdquo; are noise. Loosening the threshold
        can be a fine trade-off to learn faster, but make it knowingly.
      </p>

      <ConceptHeading n={2} id="power-mde">
        Statistical Power and Minimum Detectable Effect (MDE)
      </ConceptHeading>
      <p className="text-foreground/90 leading-relaxed">
        Power is your chance of catching a real effect. MDE is the smallest effect your test can
        detect. Most teams set MDE backwards: they pick whatever makes the test length tolerable.
        Underpowered tests don&apos;t just miss real effects; the &ldquo;wins&rdquo; they do find
        are badly inflated. At 10% power, a significant result can overstate the true effect about{" "}
        <strong className="text-primary font-semibold">3.5x</strong> <Cite id="src-2" label="[2]" />.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Traffic is the ceiling nobody can hire their way past. One team with high order values and
        low conversion told me they can only run one to three tests a month. Even at Amazon scale,
        tests need one to two weeks, and much longer for narrow customer groups. If a change is too
        small to detect with your traffic, testing it just burns a slot. Decide your MDE from
        business value first, then check whether your traffic can support it.
      </p>

      <ConceptHeading n={3} id="peeking">
        Peeking
      </ConceptHeading>
      <p className="text-foreground/90 leading-relaxed">
        Checking your dashboard daily and stopping the moment you hit significance feels diligent.
        It&apos;s self-sabotage. Every look is another chance for noise to cross the line, so your
        real false-positive rate climbs far past the 5% you signed up for. Check 20 times and it
        can reach <strong className="text-primary font-semibold">40%</strong> or more{" "}
        <Cite id="src-3" label="[3]" />.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        The rule is simple: set the sample size, duration, and stopping rule before launch, and
        don&apos;t change course because of an early lead. If you need to watch continuously, use
        sequential testing, which is built for it. Otherwise, wait and look once.
      </p>

      <ConceptHeading n={4} id="multiple-comparisons">
        Multiple Comparisons (and Slicing Results After the Fact)
      </ConceptHeading>
      <p className="text-foreground/90 leading-relaxed">
        This is the one I hear about most. The test comes back flat overall, so the team slices it:
        mobile, new users, loyalty members, signed-in. Mobile shows a lift. Ship it for mobile?
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Not yet. Check 20 segments at 95% confidence and you have a{" "}
        <strong className="text-primary font-semibold">64%</strong> chance of at least one false
        win <Cite id="calc-b" label="[B]" />. The test was also sized for all traffic, not for that
        segment. The fix: treat a segment result as a hypothesis, then resize the test and rerun it
        for that segment.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        The demand is real, though. Plenty of large retailers can only see topline conversion and
        have no idea which customers drove a result. Segment insight is valuable. It just
        isn&apos;t evidence until it&apos;s rerun.
      </p>

      <ConceptHeading n={5} id="srm">
        Sample Ratio Mismatch (SRM)
      </ConceptHeading>
      <p className="text-foreground/90 leading-relaxed">
        You planned a 50/50 split and got 52/48. It feels fine, but it isn&apos;t. SRM means your
        traffic split doesn&apos;t match the plan, which almost always points to a broken pipeline:
        bucketing, redirects, bot filtering, or logging. About{" "}
        <strong className="text-primary font-semibold">6%</strong> of Microsoft&apos;s experiments
        show SRM, and LinkedIn has reported around 10% for some experiment types{" "}
        <Cite id="src-4" label="[4]" />.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Pair this with Twyman&apos;s Law: any result that looks surprising is usually wrong. When a
        test posts a giant lift, check SRM before you celebrate. If the check fails, you don&apos;t
        interpret the result. You find the bug.
      </p>

      <ConceptHeading n={6} id="oec">
        Overall Evaluation Criterion (OEC)
      </ConceptHeading>
      <p className="text-foreground/90 leading-relaxed">
        Your OEC is the single metric that defines success, and it should predict long-term value,
        not short-term clicks. The trap I hear about most is
        conversion rate. Conversion can rise while average order value falls, and you&apos;ve lost
        money on a &ldquo;winning&rdquo; test. That&apos;s why strong programs treat revenue per
        visitor as the primary metric, and fall back to conversion or funnel progress only when
        traffic can&apos;t support revenue per visitor&apos;s higher variance.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Pick your OEC and a few guardrail metrics before launch. Otherwise you&apos;ll optimize a
        local number and quietly hurt the business.
      </p>

      <ConceptHeading n={7} id="cuped">
        CUPED (Variance Reduction)
      </ConceptHeading>
      <p className="text-foreground/90 leading-relaxed">
        If traffic is your constraint, and for most teams it is, this is the most useful technique
        people underuse. CUPED uses each user&apos;s behavior before the experiment to strip out
        predictable noise. Eppo reports it lets teams finish experiments up to{" "}
        <strong className="text-primary font-semibold">65%</strong> faster{" "}
        <Cite id="src-5" label="[5]" />.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        The limit: it only works for users with history. It won&apos;t help much on a flow built
        for first-time visitors. For returning-user surfaces, it&apos;s close to free statistical
        power.
      </p>

      <ConceptHeading n={8} id="winners-curse">
        Winner&apos;s Curse (and Why Wins Shrink)
      </ConceptHeading>
      <p className="text-foreground/90 leading-relaxed">
        The variant that wins overstates its true impact. To clear the significance bar it needed a
        real effect and some lucky noise, and the luck doesn&apos;t ship. The curse is worst in
        underpowered tests, and some teams now shrink reported lifts to correct for it.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        Then novelty wears off. Users react to change itself, and that bump fades. Microsoft
        researchers watched a redesigned button draw{" "}
        <strong className="text-primary font-semibold">28%</strong> more clicks at launch, then saw
        the lift shrink day after day as users got used to it <Cite id="src-6" label="[6]" />.
        Behavior also keeps shifting after a winner ships, and few teams can afford to keep
        monitoring it.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        The result: your quarterly wins won&apos;t add up to what shows in the business. The most
        mature programs don&apos;t manage to win rate at all. They measure revenue actually
        attributed to tests, plus the &ldquo;saves&rdquo;: losing ideas that never reached
        customers.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">The Pattern</h2>
      <p className="text-foreground/90 leading-relaxed">
        Every concept here says the same thing: the dashboard number is evidence, not truth, and
        weaker evidence than we&apos;d like. The best experimenters I&apos;ve met aren&apos;t the
        ones with the fanciest stats. They&apos;ve been burned by each of these once and built the
        habit to avoid it.
      </p>

      <blockquote className="border-t-2 border-foreground border-b border-border py-7 my-10 not-italic">
        <p className="text-xl md:text-2xl font-serif font-bold leading-snug text-foreground">
          The dashboard number is <span className="text-primary not-italic">evidence, not truth</span>,
          and weaker evidence than we&apos;d like.
        </p>
      </blockquote>

      <p className="text-foreground/90 leading-relaxed">
        Lately I&apos;ve been interested in what happens before a test goes live: using synthetic
        users to catch obvious losers early, so scarce traffic goes to ideas that deserve it. It
        doesn&apos;t replace a live test. But when win rates sit around 10&ndash;20%{" "}
        <Cite id="src-7" label="[7]" /> and traffic is the ceiling, deciding what earns a test slot
        matters more than ever.
      </p>

      <h2 className="text-xl font-bold text-foreground mb-4 mt-12">Sources</h2>
      <ol className="list-decimal pl-6 space-y-4 text-foreground/90 leading-relaxed">
        <li id="src-1">
          Kohavi, R., Deng, A., &amp; Vermeer, L. (2022).{" "}
          <em>A/B Testing Intuition Busters: Common Misunderstandings in Online Controlled Experiments.</em>{" "}
          KDD &apos;22.
          <br />
          <span className="text-sm text-muted-foreground">
            False Positive Risk figures, published success rates.
          </span>
        </li>
        <li id="src-2">
          <em>Statistically significant results from low-power analyses: A comedy of errors</em>{" "}
          (2026). ScienceDirect.
        </li>
        <li id="src-3">
          Statsig. <em>Sequential testing: How to peek at A/B test results without ruining
          validity.</em>
        </li>
        <li id="src-4">
          GrowthBook. <em>Sample Ratio Mismatch (SRM): Types, Causes, and How to Identify.</em>
        </li>
        <li id="src-5">
          Eppo. <em>CUPED and CUPED++: Bending time in experimentation.</em>
        </li>
        <li id="src-6">
          Sadeghi, S., et al. (2022).{" "}
          <em>Novelty and Primacy: A Long-Term Estimator for Online Experiments.</em> Technometrics.
        </li>
        <li id="src-7">
          Kohavi, R. <em>Ronny Kohavi on teaching A/B testing at scale.</em> Substack interview.
        </li>
      </ol>

      <div className="mt-16 pt-8 border-t border-border">
        <p className="text-[11px] font-bold uppercase tracking-widest text-foreground/45 mb-4">
          Author&apos;s calculations
        </p>
        <ul className="list-none space-y-3 text-sm text-muted-foreground leading-relaxed">
          <li id="calc-a">
            <strong className="text-foreground/70">[A]</strong> False Positive Risk at 80%
            confidence: the formula from <Cite id="src-1" label="[1]" />, with a 10% success rate
            and the higher power 80% confidence gives at the same sample size (about 93%). Result:
            roughly 49%.
          </li>
          <li id="calc-b">
            <strong className="text-foreground/70">[B]</strong> Chance of at least one false
            positive across 20 independent segment checks at 95% confidence: 1 &minus; 0.95
            <sup>20</sup> &asymp; 64%.
          </li>
        </ul>
      </div>
    </BlogLayout>
  );
}
