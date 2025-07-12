import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Brain, Play, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload Your Design",
    description: "Import your wireframes, prototypes, or live websites. SyntheticUX supports all major design tools and formats."
  },
  {
    step: "02", 
    icon: Brain,
    title: "Define User Personas",
    description: "Specify your target demographics, goals, and behavioral characteristics. Our AI will generate realistic synthetic users."
  },
  {
    step: "03",
    icon: Play,
    title: "Run Simulations",
    description: "Watch as synthetic users navigate your design, making decisions and providing detailed thought processes along the way."
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Analyze Results",
    description: "Get comprehensive reports with actionable insights, usability issues, and recommendations for improvement."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How SyntheticUX Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get from design to insights in four simple steps. No complex setup, no recruiting users, no scheduling sessions.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Step card */}
                <div className="flex-1 w-full">
                  <Card className="p-8 hover:shadow-elegant transition-all duration-300 bg-gradient-to-br from-background to-muted/20">
                    <CardContent className="p-0">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                            <step.icon className="h-8 w-8 text-primary-foreground" />
                          </div>
                          <div className="text-3xl font-bold text-primary/20">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Arrow connector (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block flex-shrink-0">
                    <div className={`w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center ${index % 2 === 1 ? 'rotate-180' : ''}`}>
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90">
              work with us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;