import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Target, Brain } from "lucide-react";
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-subtle pt-20 pb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/50 border border-accent-foreground/20 rounded-full px-4 py-2 mb-8">
            <Brain className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">
              AI-Powered User Research
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Create{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Synthetic Users
            </span>{" "}
            for Directed UX Insights
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Generate realistic user personas with detailed behavioral patterns, preferences, and decision-making processes. 
            Test your designs with AI-powered users before launching to real customers.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-elegant group">
              Talk with Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">10,000+</div>
              <div className="text-sm text-muted-foreground">Synthetic Users Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">50%</div>
              <div className="text-sm text-muted-foreground">Faster Research</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;