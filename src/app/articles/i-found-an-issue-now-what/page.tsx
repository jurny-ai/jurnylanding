import type { Metadata } from "next";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";
import SimpleFlowDiagram from "@/components/SimpleFlowDiagram";

export const metadata: Metadata = {
  title: "How to Debug with Cursor for Non Technical Folks — jurny.ai",
  description:
    "A practical guide for non technical folks using Cursor to understand code, isolate problems, and ship their first fix.",
  openGraph: {
    title: "How to Debug with Cursor for Non Technical Folks",
    description:
      "A practical guide for non technical folks using Cursor to understand code, isolate problems, and ship their first fix.",
    type: "article",
  },
};

export default function IFoundAIssueNowWhatPage() {
  return (
    <BlogLayout
      title="How to Debug with Cursor for Non Technical Folks"
      subtitle="Identify where the problem is and how to fix it using Cursor."
      author={{ name: "Sidd Adatrao", photo: "/sidd-adatrao.png" }}
      date="March 10, 2026"
    >
      <p className="text-foreground/90 leading-relaxed">
        Your company has just introduced Cursor agents for non technical people to make changes to
        the codebase or propose fixes. That&apos;s great! You know the product, you talk to the users,
        you look at all the data, you know when things are wrong, and finally, now you can fix it.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        That was Cursor&apos;s pitch to your boss anyway. In theory they are right. After this guide
        let&apos;s get you to your first PR.
      </p>
      <p className="text-foreground/90 leading-relaxed">
        If this is your first time touching technical workflows, you may also like{" "}
        <Link
          href="/articles/usability-testing-problems"
          className="text-primary underline underline-offset-4"
        >
          The Biggest Problems With Usability Testing Today
        </Link>
        . You can also jump to the{" "}
        <Link href="/#how-it-works" className="text-primary underline underline-offset-4">
          home page How It Works section on how Jurny AI helps find issues early
        </Link>
        .
      </p>

      <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Step One: Understanding The Lay of The Land
        </h2>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Whenever I set out to grapple with a section of code I don&apos;t remember, pushed by
          someone else, or written by AI, I just want to know what&apos;s happening.
        </p>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Oftentimes, I ask Cursor to build me a mind map of what&apos;s going on.
        </p>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Now it&apos;s important to articulate what you actually want as if its a person.
        </p>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Just saying, &ldquo;show me a flow chart of this codebase&rdquo; will lead you everywhere till
          you realize you are nowhere. Don&apos;t be lazy.
        </p>
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 mb-4">
          <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-2">
            Prompt that works
          </p>
          <p className="text-sm text-foreground/95 leading-relaxed">
            &ldquo;Create a diagram of how the graph representing the revenue estimates is rendering. I
            want to understand the input source what pre-processing is happening and how it&apos;s being
            converted into a graph&rdquo;
          </p>
        </div>
        <p className="text-foreground/90 leading-relaxed mb-4">
          I&apos;ve found the most success when I understand the inputs and the outputs before diving
          into anything in between, it helps me frame the problem and keeps it from getting out of
          hand.
        </p>
        <SimpleFlowDiagram
          steps={[
            "User selects date range and filters",
            "Revenue API endpoint",
            "Fetch data from DB or cache",
            "Raw transaction rows",
            "Preprocessing: cleanup, normalization, grouping, aggregation",
            "Chart payload labels + series",
            "Frontend chart renders graph + tooltips",
          ]}
        />
      </section>

      <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Step Two: Identify Where and What the Problem Is, Really
        </h2>
        <p className="text-foreground/90 leading-relaxed mb-4">
          You already know the problem right? No. You come into this exercise knowing the downstream
          undesired outcome of an underlying technical issue or mistake. It&apos;s now time to go hunting.
        </p>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Zeroing in on a problem is about shrinking the input/output bounding box. Logically, we
          want to keep breaking down the amount of code, transactions, and concepts within which
          the technical issue is.
        </p>
        <p className="text-foreground/90 leading-relaxed mb-4">
          When working with existing codebases hooked up to a humongous system, running quick tests
          can be extremely hard to set up without a sandbox, luckily AI
          can help you with that.
        </p>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Start from your nearest input, the first place from which your problem could start
          existing from. Or if this helps, the farthest place you have ruled out where the problem
          could have started.
        </p>
        <div className="rounded-xl bg-background border border-border p-4 md:p-5 mb-4 space-y-4">
          <p className="text-sm font-semibold text-foreground/80">
            Sliding input/output window in action
          </p>
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Type this prompt — Window 1 (Flowchart stage: Retrieval + Grouping)
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Show me sample input and output for data retrieval and grouping only. Do not calculate
              averages yet.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/40 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Window 1 Response (checks out)
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed mb-2">
              Sample grouped input:
            </p>
            <pre className="bg-background border border-border rounded-md p-3 overflow-x-auto text-xs text-foreground/80 mb-3">
              <code>{`[
  { "month": "Jan", "revenue": 12000 },
  { "month": "Mar", "revenue": 18000 }
]`}</code>
            </pre>
            <p className="text-sm text-foreground/90 leading-relaxed mb-2">
              Grouped output:
            </p>
            <pre className="bg-background border border-border rounded-md p-3 overflow-x-auto text-xs text-foreground/80">
              <code>{`{
  "groupedMonths": ["Jan", "Mar"],
  "groupedRevenue": [12000, 18000]
}`}</code>
            </pre>
          </div>
          <div className="rounded-lg border border-primary/30 bg-primary/10 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Type this prompt — Window 2 (Flowchart stage: Preprocessing + Aggregation)
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Now show sample input and output for the averaging step using that grouped data.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/40 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
              Window 2 Response (issue appears)
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed mb-2">
              Sample averaging input:
            </p>
            <pre className="bg-background border border-border rounded-md p-3 overflow-x-auto text-xs text-foreground/80 mb-3">
              <code>{`{
  "groupedMonths": ["Jan", "Mar"],
  "groupedRevenue": [12000, 18000]
}`}</code>
            </pre>
            <p className="text-sm text-foreground/90 leading-relaxed mb-2">
              Averaging output:
            </p>
            <pre className="bg-background border border-border rounded-md p-3 overflow-x-auto text-xs text-foreground/80">
              <code>{`Total revenue: 30000
Months considered: 3
Average monthly revenue: 10000`}</code>
            </pre>
            <p className="text-xs mt-2">
              <span className="inline-block rounded px-2 py-1 bg-destructive/15 text-red-300 font-medium">
                Highlight: Only Jan and Mar are reported, but the average is divided by 3 months.
              </span>
            </p>
          </div>
        </div>
        <p className="text-foreground/90 leading-relaxed">
          Now understand the inputs and verify the outputs at each window. In this example, window 1
          checks out, and window 2 does not.
        </p>
        <p className="text-foreground/90 leading-relaxed">
          In this case, window 2 is where the violation appears, so you stop sliding and focus your
          fix there. If both windows had checked out, you would move to the next flowchart stage and
          repeat the same input/output check.
        </p>
      </section>

      <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
        <h2 className="text-xl font-bold text-foreground mb-4">Step Three: Fix the Violation</h2>
        <p className="text-foreground/90 leading-relaxed mb-4">
          Now that we have translated an undesired downstream effect of an underlying technical
          issue, we need to fix it. This can vary greatly based on the kind of issue you found.
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-foreground/90">
          <li>
            UX issue. I often tackle UX issues by giving two sources of context. Once I have zeroed
            in on the code section that is problematic, I usually copy that code into my cursor
            chat context along with a screenshot and an explanation of what I think is wrong.
          </li>
          <li>
            A backend data issue. Copy the relevant code section or use words that it explained to
            you in the previous steps of finding the problem to describe what the violation is.
          </li>
          <li>
            A structural issue. These I would hold off on in for the sake of this document, I will
            make another post about how to go about redesigns with AI and link below when it&apos;s out.
          </li>
        </ol>
        <div className="rounded-xl bg-background border border-border p-4 md:p-5 mt-4 space-y-3">
          <p className="text-sm font-semibold text-foreground/80">
            If chat feels daunting, use this to learn how to talk about the code
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90 text-sm">
            <li>Get the exact function names and data fields so your fix request is precise.</li>
            <li>Ask for variable names, component names, and where each value is read and changed.</li>
            <li>Use the same terms Cursor uses when describing what should change.</li>
          </ul>
          <pre className="bg-secondary/40 border border-border rounded-md p-3 overflow-x-auto text-xs text-foreground/85">
            <code>{`Prompt 1:
"In this code section, list the exact function names in execution order.
For each function, include:
- parameter names
- return variable names
- state variables read/written
- file path"

Prompt 2:
"List the React component names involved in this flow (parent to child).
For each component, show:
- props it receives (exact prop names)
- local state variable names
- callback/function names it calls"

Prompt 3:
"Build a step-by-step flow for this section only:
Component -> function -> variable mutation -> output.
Use exact symbol names from the code."

Prompt 4:
"Rewrite this fix request using exact code vocabulary from this file.
Mention function names, variable names, and component names explicitly:
[paste your plain-English fix request]."`}</code>
          </pre>
        </div>
      </section>
    </BlogLayout>
  );
}
