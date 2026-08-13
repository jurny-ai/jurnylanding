import {
  ArrowRight,
  BrainCircuit,
  FileText,
  FlaskConical,
  MessageSquareText,
  MousePointerClick,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const sourceTypes = ["Research docs", "Support tickets", "Session notes", "Analytics"];

const actions = [
  { label: "Ask questions", icon: MessageSquareText },
  { label: "Run A/B tests", icon: FlaskConical },
  { label: "Simulate web journeys", icon: MousePointerClick },
];

export default function InfrastructureFlow() {
  return (
    <section id="infrastructure" className="scroll-mt-14 border-b border-border bg-background py-14 sm:scroll-mt-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Synthetic user infrastructure
              </p>
              <h2 className="max-w-xl text-3xl font-medium leading-[1.02] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                One model of your users. Every way to learn from it.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-foreground/60 sm:text-lg lg:justify-self-end">
              Jurny turns fragmented customer knowledge into a living synthetic user model your team can use across research, experimentation, and product validation.
            </p>
          </Reveal>

          <div className="grid border-l border-t border-border lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <Reveal asChild>
              <article className="min-h-[290px] border-b border-r border-border bg-secondary p-6 sm:p-8">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">01</span>
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">Bring your user data together</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                  Connect the unstructured evidence already spread across your company.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {sourceTypes.map((source) => (
                    <span key={source} className="border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground/65">
                      {source}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>

            <div className="hidden items-center justify-center border-b border-r border-border bg-background px-3 lg:flex" aria-hidden="true">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>

            <Reveal asChild delay={100}>
              <article className="min-h-[290px] border-b border-r border-border bg-primary p-6 text-primary-foreground sm:p-8">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-bold text-highlight">02</span>
                  <BrainCircuit className="h-6 w-6 text-highlight" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">Build one synthetic user model</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Jurny synthesizes behavior, motivations, preferences, and friction into one consistent representation of your customer.
                </p>
                <div className="mt-7 border border-white/30 bg-white/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">Unified customer model</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="h-3 w-3 bg-highlight" />
                    <span className="text-sm font-semibold">Grounded in your real user evidence</span>
                  </div>
                </div>
              </article>
            </Reveal>

            <div className="hidden items-center justify-center border-b border-r border-border bg-background px-3 lg:flex" aria-hidden="true">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>

            <Reveal asChild delay={200}>
              <article className="min-h-[290px] border-b border-r border-border bg-secondary p-6 sm:p-8">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">03</span>
                  <FlaskConical className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">Put the model to work</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                  Get answers and validate decisions without waiting weeks for live traffic or another research cycle.
                </p>
                <div className="mt-6 grid gap-2">
                  {actions.map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-3 border border-border bg-card px-3 py-2.5">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground/75">{label}</span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
