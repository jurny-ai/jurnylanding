import { ArrowRight, HelpCircle } from "lucide-react";

function ABTestVisual() {
  const variants = [
    { label: "A", kept: false },
    { label: "B", kept: true },
    { label: "C", kept: false },
    { label: "D", kept: true },
    { label: "E", kept: false },
  ];
  return (
    <div className="flex flex-col gap-3.5 w-full max-w-xs">
      {/* Pre-screening: many variants pruned to the strongest */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-semibold">5 variants</span>
          <span className="text-[10px] uppercase tracking-widest text-primary-glow font-semibold">Top 2 go live</span>
        </div>
        <div className="flex items-center gap-1.5">
          {variants.map((v, i) => (
            <div
              key={i}
              className={`flex h-9 flex-1 items-center justify-center rounded-lg text-xs font-bold ${
                v.kept
                  ? "bg-primary/15 text-primary-glow ring-1 ring-primary/30"
                  : "bg-foreground/5 text-foreground/25 line-through"
              }`}
            >
              {v.label}
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-foreground/40 leading-snug">Jurny prunes the losers before you spend traffic</p>
      </div>

      {/* Convergence: less traffic to reach significance */}
      <div className="flex flex-col gap-1.5 border-t border-primary/10 pt-3">
        <div className="flex items-center gap-2">
          <span className="w-16 text-[10px] text-foreground/55 font-medium flex-shrink-0">Test alone</span>
          <div className="flex-1 h-3 rounded-md bg-foreground/5 overflow-hidden">
            <div className="h-full rounded-md bg-red-400/70" style={{ width: "100%" }} />
          </div>
          <span className="text-[10px] text-red-400 font-mono flex-shrink-0 w-12 text-right">3-6 wks</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-16 text-[10px] text-foreground/55 font-medium flex-shrink-0">With Jurny</span>
          <div className="flex-1 h-3 rounded-md bg-foreground/5 overflow-hidden">
            <div className="h-full rounded-md bg-primary/60" style={{ width: "28%" }} />
          </div>
          <span className="text-[10px] text-primary-glow font-mono flex-shrink-0 w-12 text-right">~1 wk</span>
        </div>
        <p className="mt-0.5 text-[11px] text-foreground/40 leading-snug">Fewer, stronger variants reach significance sooner</p>
      </div>
    </div>
  );
}

function BehaviorVisual() {
  const personas = [
    { name: "High-ATV buyer", coverage: "Representative", color: "bg-primary/10 text-primary-glow" },
    { name: "Enterprise admin", coverage: "Accurately modeled", color: "bg-blue-500/10 text-blue-400" },
    { name: "New user", coverage: "Representative", color: "bg-purple-500/10 text-purple-400" },
  ];
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      {personas.map((p, i) => (
        <div key={i} className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 ${p.color}`}>
          <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-foreground">{i + 1}</span>
          </div>
          <span className="text-xs font-semibold flex-1">{p.name}</span>
          <span className="text-[10px] font-medium opacity-70">{p.coverage}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

function DiagnoseVisual() {
  const stages = [
    { label: "Cart", rate: 100 },
    { label: "Checkout", rate: 58 },
    { label: "Payment", rate: 21, drop: true },
  ];
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      {stages.map((stage, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span className="w-16 text-[11px] text-foreground/60 font-medium flex-shrink-0">{stage.label}</span>
          <div className="flex-1 h-4 rounded-md bg-foreground/5 overflow-hidden">
            <div
              className={`h-full rounded-md ${stage.drop ? "bg-red-400/80" : "bg-primary/60"}`}
              style={{ width: `${stage.rate}%` }}
            />
          </div>
          <span className={`text-[10px] font-bold flex-shrink-0 w-8 text-right ${stage.drop ? "text-red-500" : "text-foreground/50"}`}>
            {stage.rate}%
          </span>
        </div>
      ))}
      <div className="flex items-start gap-2 mt-1 bg-foreground/5 rounded-xl px-3 py-2">
        <HelpCircle className="w-3.5 h-3.5 text-primary-glow flex-shrink-0 mt-0.5" />
        <span className="text-[11px] text-foreground/70 leading-snug">
          <span className="font-semibold text-foreground">Why:</span> session resets after the legal link opens a new tab
        </span>
      </div>
    </div>
  );
}

function OptimizeVisual() {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <div className="flex-1 bg-foreground/5 rounded-2xl p-4 text-center">
        <div className="text-[10px] text-foreground/40 uppercase tracking-widest mb-1">Before</div>
        <div className="text-2xl font-bold text-foreground/50">8</div>
        <div className="text-[10px] text-foreground/30 mt-0.5">customer reported UX issues</div>
      </div>
      <ArrowRight className="w-4 h-4 text-foreground/20 flex-shrink-0" />
      <div className="flex-1 bg-primary/10 rounded-2xl p-4 text-center border border-primary/20">
        <div className="text-[10px] text-primary-glow uppercase tracking-widest mb-1">After</div>
        <div className="text-2xl font-bold text-primary-glow">0</div>
        <div className="text-[10px] text-primary/50 mt-0.5">issues escaped to customers</div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Accurate Coverage of High-Value Customers",
    description: "Jurny models accurate, representative personas of the customers who matter most, so you validate journeys the way your highest-value users actually behave.",
    visual: <BehaviorVisual />,
    panelBg: "bg-accent/60",
  },
  {
    title: "Make Your A/B Tests Converge Faster",
    description: "Jurny pre-screens your variants in minutes and prunes the losers before they go live, so the experiments you do run reach significance with less traffic and far less waiting.",
    visual: <ABTestVisual />,
    panelBg: "bg-secondary",
  },
  {
    title: "Diagnose Drop-Offs and Friction",
    description: "When you can see users dropping off but don't understand why, Jurny pinpoints the failing step and the friction behind it in real journey context.",
    visual: <DiagnoseVisual />,
    panelBg: "bg-secondary",
  },
  {
    title: "Build Trust in Every Release",
    description: "Turn each release into a confidence moment by preventing customer-reported usability issues from reaching production.",
    visual: <OptimizeVisual />,
    panelBg: "bg-accent/60",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-14 sm:py-20 bg-background scroll-mt-14 sm:scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div>
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
                Why Teams Choose Jurny
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="rounded-3xl bg-card shadow-[0_10px_40px_rgba(35,38,85,0.06)] overflow-hidden flex flex-col group">
                  <div className={`${feature.panelBg} flex items-center justify-center p-6 sm:p-10 min-h-[180px] sm:min-h-[200px] transition-all duration-300`}>
                    {feature.visual}
                  </div>
                  <div className="p-5 sm:p-7">
                    <h3 className="text-lg font-semibold text-foreground mb-2 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-foreground/55 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
