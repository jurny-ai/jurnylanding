import { ArrowUpRight } from "lucide-react";

function SimulationPanel() {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-card border border-primary/15 p-4 sm:p-7 space-y-4 sm:space-y-5">
      {/* Slack-style message */}
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded bg-[#3F0E40] flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-white font-bold text-xs">J</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-foreground">Jurny</span>
            <span className="bg-foreground/10 text-foreground/50 px-1.5 py-0.5 rounded text-[10px] font-medium">APP</span>
            <span className="text-xs text-foreground/30">10:23 AM</span>
          </div>
          <div className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
            <span className="text-primary font-medium">@jurny</span> Test if 20 researchers can filter for &ldquo;Phase 3&rdquo; clinical trials in the dashboard
          </div>
        </div>
      </div>

      {/* Persona chips */}
      <div className="flex flex-wrap gap-2 pl-0 sm:pl-11">
        {[
          { name: "Jen, 28", trait: "Impatient", color: "bg-violet-500/10 text-violet-600 border-violet-500/20" },
          { name: "Randall, 55", trait: "Skeptical", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
          { name: "Marcus, 34", trait: "Methodical", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
          { name: "+17 more", trait: null, color: "bg-foreground/5 text-foreground/35 border-foreground/10" },
        ].map((p, i) => (
          <div key={i} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${p.color}`}>
            {p.name}
            {p.trait && <span className="opacity-60">· {p.trait}</span>}
          </div>
        ))}
      </div>

      {/* Integrations */}
      <div className="flex gap-2 pt-1 flex-wrap">
        {["Slack", "Teams", "Figma · Sandbox · Live URLs"].map((label, i) => (
          <div key={i} className="flex items-center gap-2 bg-background rounded-xl px-3 py-2">
            {i === 0 && <img src="/slack.png" alt="Slack" className="h-4 w-4 object-contain opacity-60" />}
            {i === 1 && <img src="/teams.png" alt="Teams" className="h-4 w-4 object-contain opacity-60" />}
            <span className="text-[11px] text-foreground/45">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsPanel() {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-card border border-primary/15 p-4 sm:p-7 space-y-3">
      <div className="rounded-xl sm:rounded-2xl bg-background p-3 sm:p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-foreground mb-1">Filter Visibility Issue</div>
            <p className="text-xs text-foreground/55 leading-relaxed">
              Users struggled to locate the "Phase 3" filter on mobile due to the collapsed menu.
            </p>
          </div>
          <span className="shrink-0 px-2 py-1 rounded bg-red-500/10 text-red-500 text-[10px] font-bold">HIGH</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground/35"><span className="text-foreground/60 font-medium">12/20</span> simulations affected</span>
          <div className="flex items-center text-xs font-semibold text-primary cursor-pointer">
            Watch replay <ArrowUpRight className="ml-1 w-3 h-3" />
          </div>
        </div>
      </div>

      <div className="rounded-xl sm:rounded-2xl bg-background p-3 sm:p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-foreground mb-1">Terminology Confusion</div>
            <p className="text-xs text-foreground/55 leading-relaxed">
              Researchers hesitated on "Trial Phase", often looking for "Study Status" instead.
            </p>
          </div>
          <span className="shrink-0 px-2 py-1 rounded bg-yellow-500/10 text-yellow-600 text-[10px] font-bold">MED</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-foreground/35"><span className="text-foreground/60 font-medium">7/20</span> simulations affected</span>
          <div className="flex items-center text-xs font-semibold text-foreground/40 cursor-pointer">
            Watch replay <ArrowUpRight className="ml-1 w-3 h-3" />
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
              <SimulationPanel />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">Run a Simulation</h3>
                <p className="text-foreground/55 leading-relaxed">
                  Drop in a URL, Figma prototype, or sandbox link. Jurny spins up synthetic users with distinct behaviors and runs them through your product in parallel — no scheduling, no recruiting.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-center">
              <div className="lg:order-last">
                <ResultsPanel />
              </div>
              <div className="lg:order-first">
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">Get Actionable Results</h3>
                <p className="text-foreground/55 leading-relaxed">
                  Jurny surfaces exactly where users got confused, dropped off, or misread your UI — prioritized by severity and backed by session replays you can share instantly.
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
