import { Check, ArrowRight } from "lucide-react";

function ReworkVisual() {
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-xs">
      <div className="flex items-center gap-2.5 bg-red-500/10 rounded-xl px-3 py-2.5">
        <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
        <div className="h-1.5 flex-1 bg-red-400/40 rounded-full" />
        <span className="text-[10px] text-red-400 font-mono flex-shrink-0">build error</span>
      </div>
      <div className="flex items-center gap-2.5 bg-primary/10 rounded-xl px-3 py-2.5">
        <Check className="w-3 h-3 text-primary-glow flex-shrink-0" />
        <div className="h-1.5 flex-1 bg-primary/40 rounded-full" />
        <span className="text-[10px] text-primary-glow font-mono flex-shrink-0">validated early</span>
      </div>
      <div className="text-center pt-1">
        <span className="text-3xl font-bold text-foreground">↓ 40%</span>
        <p className="text-xs text-foreground/40 mt-0.5">rework cycles per sprint</p>
      </div>
    </div>
  );
}

function BehaviorVisual() {
  const personas = [
    { name: "Jen", label: "Impatient", color: "bg-primary/10 text-primary-glow" },
    { name: "Raj", label: "Methodical", color: "bg-blue-500/10 text-blue-400" },
    { name: "Sam", label: "Skeptical",  color: "bg-purple-500/10 text-purple-400" },
  ];
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      {personas.map((p, i) => (
        <div key={i} className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 ${p.color}`}>
          <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-foreground">{p.name[0]}</span>
          </div>
          <span className="text-xs font-semibold flex-1">{p.name}</span>
          <span className="text-[10px] font-medium opacity-70">{p.label}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

function LaunchVisual() {
  const items = ["Onboarding flow", "Core user journey", "Error states", "Mobile experience"];
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5 text-primary-glow" />
          </div>
          <span className="text-xs text-foreground/70">{item}</span>
        </div>
      ))}
      <div className="mt-2 space-y-1">
        <div className="flex justify-between text-[10px] text-foreground/40">
          <span>Pre-launch confidence</span>
          <span>94%</span>
        </div>
        <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full w-[94%]" />
        </div>
      </div>
    </div>
  );
}

function OptimizeVisual() {
  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <div className="flex-1 bg-foreground/5 rounded-2xl p-4 text-center">
        <div className="text-[10px] text-foreground/40 uppercase tracking-widest mb-1">Before</div>
        <div className="text-2xl font-bold text-foreground/50">5.2%</div>
        <div className="text-[10px] text-foreground/30 mt-0.5">conversion</div>
      </div>
      <ArrowRight className="w-4 h-4 text-foreground/20 flex-shrink-0" />
      <div className="flex-1 bg-primary/10 rounded-2xl p-4 text-center border border-primary/20">
        <div className="text-[10px] text-primary-glow uppercase tracking-widest mb-1">After</div>
        <div className="text-2xl font-bold text-primary-glow">8.7%</div>
        <div className="text-[10px] text-primary/50 mt-0.5">+67% lift</div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Predict Behavior",
    description: "Understand exactly what your users could do before they do it, giving you actionable insights to improve flows.",
    visual: <BehaviorVisual />,
    panelBg: "bg-accent/40",
  },
  {
    title: "Reduce Rework",
    description: "Validate design decisions early to drastically reduce engineering cycles and prevent costly code rework.",
    visual: <ReworkVisual />,
    panelBg: "bg-primary/5",
  },
  {
    title: "Launch with Confidence",
    description: "Launch faster and with more confidence by identifying usability risks in pre-production.",
    visual: <LaunchVisual />,
    panelBg: "bg-primary/5",
  },
  {
    title: "Optimize Outcomes",
    description: "A/B test instantly to drive higher completion rates and significantly reduce customer friction.",
    visual: <OptimizeVisual />,
    panelBg: "bg-accent/40",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-secondary rounded-3xl p-4 sm:p-8 md:p-12">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-xl leading-tight">
                Ship the Right Product, Faster
              </h2>
              <p className="text-base sm:text-lg text-foreground/50 max-w-xl font-light">
                Empower your product team to validate decisions instantly, reducing risk and engineering waste.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <div key={i} className="rounded-2xl sm:rounded-3xl bg-card border border-primary/15 overflow-hidden flex flex-col group">
                  <div className={`${feature.panelBg} flex items-center justify-center p-6 sm:p-10 min-h-[180px] sm:min-h-[200px] transition-all duration-300`}>
                    {feature.visual}
                  </div>
                  <div className="p-5 sm:p-7">
                    <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">
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
