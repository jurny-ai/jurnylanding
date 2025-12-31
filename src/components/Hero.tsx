import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DashboardVisualization from "./DashboardVisualization";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0f1110] pt-20 pb-10">
      {/* Background Glows for the whole section - consistent purple family */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Text Content */}
          <div className="text-left max-w-2xl pt-4">
            {/* Logo + AI Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <img src="/lovable-uploads/bb454a78-d8c4-4776-aa28-246c06947dfc.png" alt="Jurny Logo" className="h-5 md:h-6 brightness-0 invert opacity-80" />
              <div className="w-1 h-1 bg-primary-glow rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">Backed by Unusual Ventures</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
              Identify <br />
              <span className="bg-gradient-to-r from-primary-glow to-indigo-400 bg-clip-text text-transparent">product gaps</span> <br />
              before your <br />
              customers do
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed font-light max-w-lg">
              Define targeted personas and simulate real behavior at scale across critical user journeys
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-4 h-auto text-sm font-bold transition-all duration-300 shadow-xl shadow-primary/20 border border-white/10" asChild>
                <a href="https://calendly.com/syntheticjurny-ai/new-meeting">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Stats row integrated into left column bottom */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-white/5">
              {[
                { label: 'Conversion', val: '+24%' },
                { label: 'Retention', val: '+18%' },
                { label: 'Insights', val: 'Real-time' },
                { label: 'Time Saved', val: '80%' }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl font-bold text-white">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visualization */}
          <div className="relative pt-4 lg:ml-auto w-full max-w-[560px]">
            <DashboardVisualization />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
