"use client";

import { GitBranch, Globe, Map, Wrench } from "lucide-react";

function FlowDiscoveryPanel() {
  const discoveredPaths = [
    "Sign up -> Verify identity -> Complete onboarding -> Add payment method",
    "Trial start -> Invite teammate -> Configure workspace -> Publish first workflow",
  ];

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-card border border-primary/15 p-4 sm:p-7 space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-primary-glow" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">Workflow Discovery</div>
          </div>
        </div>
        <div className="px-2 py-1 rounded bg-primary/10 text-primary-glow text-[10px] uppercase tracking-widest font-bold">
          Running
        </div>
      </div>

      <div className="rounded-xl bg-background p-3 sm:p-4 border border-primary/10 space-y-3">
        <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold">Platform Access</div>
        <div className="h-10 rounded-lg bg-secondary border border-border px-3 flex items-center">
          <span className="text-xs sm:text-sm text-foreground/70 font-mono truncate">https://app.acme-platform.com</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Journeys run", value: "42" },
            { label: "Workflows covered", value: "11" },
            { label: "Persona variants", value: "8" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-secondary px-3 py-2 text-center">
              <div className="text-sm font-bold text-foreground">{item.value}</div>
              <div className="text-[10px] text-foreground/45">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-secondary p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Map className="w-3.5 h-3.5 text-primary-glow" />
            <span className="text-[11px] font-semibold text-foreground/70">Discovered End-to-End Journeys</span>
          </div>
          <div className="space-y-1.5">
            {discoveredPaths.map((path) => (
              <div key={path} className="flex items-center gap-2">
                <GitBranch className="w-3 h-3 text-primary-glow/80 shrink-0" />
                <span className="text-[11px] text-foreground/60 truncate">{path}</span>
              </div>
            ))}
            <div className="pl-5 text-[11px] text-foreground/45 font-medium italic">... and more journeys running continuously</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const INTEGRATIONS = [
  { name: "Linear", logo: "/integrations/linear.png", logoClass: "max-h-full max-w-full object-contain" },
  { name: "Jira", logo: "/integrations/jira.png", logoClass: "max-h-full max-w-full object-contain" },
  { name: "GitHub Issues", logo: "/integrations/github-issues.png", logoClass: "max-h-full max-w-full object-contain scale-125" },
] as const;

function ResultsPanel() {
  const insights = [
    {
      persona: "Less technical user",
      problem: "Identity verification fails after document upload.",
      context: "Happens after a successful file upload when the user returns to continue onboarding.",
      fix: "Persist verification state and auto-resume from the next step.",
    },
    {
      persona: "Trust-sensitive buyer",
      problem: "Payment page loses confidence after legal link opens a new tab.",
      context: "Session timeout modal appears on return, causing drop-off before completion.",
      fix: "Extend session timeout and keep checkout state while legal docs are reviewed.",
    },
    {
      persona: "Busy ops manager",
      problem: "Workflow publish button remains disabled after teammate invite.",
      context: "Blocking validation is hidden below the fold on smaller laptop viewports.",
      fix: "Surface blocking validation inline near the CTA and auto-scroll to issue.",
    },
  ];

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-card border border-primary/15 p-4 sm:p-7 space-y-4">
      <div className="rounded-xl sm:rounded-2xl bg-[#f3f4f6] p-3 sm:p-5 border border-primary/10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-foreground">Journey Insights</div>
          <span className="text-[10px] uppercase tracking-widest text-primary-glow font-bold">In context</span>
        </div>

        <div className="space-y-3">
          <div className="space-y-2.5">
            {insights.map((insight) => (
              <div key={insight.problem} className="rounded-lg border border-border bg-background p-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary-glow bg-primary/10 px-2 py-1 rounded">
                    {insight.persona}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-3">
                  <div className="h-20 rounded-md bg-[#eceff3] border border-border overflow-hidden">
                    <div className="h-3.5 border-b border-border/80 bg-[#e3e7ed] flex items-center gap-1 px-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                    </div>
                    <div className="p-2 space-y-1.5">
                      <div className="h-2 w-2/3 rounded bg-foreground/20" />
                      <div className="h-1.5 w-full rounded bg-foreground/15" />
                      <div className="h-1.5 w-5/6 rounded bg-foreground/15" />
                      <div className="pt-1 flex gap-1.5">
                        <div className="h-4 w-10 rounded bg-primary/25 border border-primary/25" />
                        <div className="h-4 w-8 rounded bg-foreground/10 border border-border/60" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-xs font-semibold text-foreground">{insight.problem}</div>
                    <div className="text-[11px] text-foreground/60">{insight.context}</div>
                    <div className="flex items-start gap-1.5 text-[11px] text-foreground/70">
                      <Wrench className="w-3.5 h-3.5 text-primary-glow mt-0.5 shrink-0" />
                      <span>{insight.fix}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/60 pt-3 mt-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/45 text-center mb-2">
              Insights auto-created in
            </p>
            <div className="grid grid-cols-3 w-fit mx-auto justify-items-center gap-2">
              {INTEGRATIONS.map((integration) => (
                <div key={integration.name} className="flex w-14 sm:w-16 flex-col items-center gap-1">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-md bg-white border border-border/50 shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex items-center justify-center p-1">
                    <img
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      className={integration.logoClass}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductDemo = () => {
  return (
    <section id="how-it-works" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-secondary rounded-3xl p-4 sm:p-8 md:p-12">

            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                How It Works
              </h2>
            </div>

            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-center mb-8">
              <div className="order-2 lg:order-1">
                <FlowDiscoveryPanel />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">Give Access Once, Get Continuous Testing</h3>
                <p className="text-foreground/55 leading-relaxed">
                  Our user agents continuously test your product across core workflows with every new feature and every push. End-to-end journeys keep running as the product changes, so issues surface in real task context before they reach customers.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-center">
              <div className="order-2 lg:order-last w-full">
                <ResultsPanel />
              </div>
              <div className="order-1 lg:order-first">
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">Understand Issues in Real Journey Context</h3>
                <p className="text-foreground/55 leading-relaxed">
                  Every finding ties to a persona, the exact failing step, and concrete fix guidance to surface the drop-offs across market segments that functional tests miss.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
