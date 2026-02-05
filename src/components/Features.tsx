import { Zap, Users, Clock, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Reduce Rework",
    description: "Validate design decisions early to drastically reduce engineering cycles and prevent costly code rework."
  }, 
  {
    icon: Users,
    title: "Predict Behavior",
    description: "Understand exactly what your users could do before they do it, giving you actionable insights to improve flows."
  }, 
  {
    icon: Clock,
    title: "Launch with Confidence",
    description: "Launch faster and with more confidence by identifying usability risks in pre-production."
  }, 
  {
    icon: RefreshCw,
    title: "Optimize Outcomes",
    description: "A/B test instantly to drive higher completion rates and significantly reduce customer friction."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-primary-glow font-bold mb-4">Core Engine</div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 max-w-xl leading-tight">
              Ship the Right Product, Faster
            </h2>
            <p className="text-lg text-foreground/60 max-w-xl font-light">
              Empower your product team to validate decisions instantly, reducing risk and engineering waste.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary-glow" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-base text-foreground/60 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
