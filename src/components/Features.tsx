import { Zap, Users, Clock, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Insights",
    description: "Gain real-time insights as synthetic users surface UX pain points and improvement areas."
  }, 
  {
    icon: Users,
    title: "Diverse User Base",
    description: "Generate users across demographics and skill levels for comprehensive testing."
  }, 
  {
    icon: Clock,
    title: "Save Time & Money",
    description: "Cut research time from weeks to hours and reduce user testing costs by up to 80%."
  }, 
  {
    icon: RefreshCw,
    title: "Iterative Testing",
    description: "Rapidly A/B test design variations and prototypes with consistent personas."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-12 bg-[#0f1110]">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary-glow font-bold mb-4">Core Engine</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-xl leading-tight">
              AI Personas, Human-Grade Feedback
            </h2>
            <p className="text-lg text-white/40 max-w-xl font-light">
              Everything you need to conduct comprehensive user research with AI-powered synthetic users.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary-glow" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">
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
