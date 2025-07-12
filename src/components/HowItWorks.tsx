import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Brain, Play, BarChart3, ArrowRight } from "lucide-react";
const steps = [{
  step: "01",
  icon: Upload,
  title: "Upload Your Design",
  description: "Import your wireframes, prototypes, or live websites. SyntheticUX supports all major design tools and formats."
}, {
  step: "02",
  icon: Brain,
  title: "Define User Personas",
  description: "Specify your target demographics, goals, and behavioral characteristics. Our AI will generate realistic synthetic users."
}, {
  step: "03",
  icon: Play,
  title: "Run Simulations",
  description: "Watch as synthetic users navigate your design, making decisions and providing detailed thought processes along the way."
}, {
  step: "04",
  icon: BarChart3,
  title: "Analyze Results",
  description: "Get comprehensive reports with actionable insights, usability issues, and recommendations for improvement."
}];
const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get actionable user insights in four simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">{step.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-muted-foreground/50 absolute top-8 -right-3 hidden lg:block" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            work with us
          </Button>
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;