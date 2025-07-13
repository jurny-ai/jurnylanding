import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Brain, Play, BarChart3, ArrowRight } from "lucide-react";
const steps = [{
  step: "01",
  icon: Upload,
  title: "Upload Your Design",
  description: "Click 'Upload Design' and import your wireframes or prototypes. Support for Figma, Sketch, and live website URLs."
}, {
  step: "02",
  icon: Brain,
  title: "Define User Personas",
  description: "Click 'Add Persona' to create target users. Set demographics like 'Tech-savvy millennial' or 'Budget-conscious parent'."
}, {
  step: "03",
  icon: Play,
  title: "Run Simulations",
  description: "Click 'Start Test' and watch synthetic users navigate your design. See them click buttons, read reviews, and make purchases."
}, {
  step: "04",
  icon: BarChart3,
  title: "Analyze Results",
  description: "Click 'View Report' to see heatmaps, conversion rates, and user feedback. Export insights as PDF or share with your team."
}];
const HowItWorks = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with SyntheticUX in four simple steps and revolutionize your design process
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={step.step} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">
                  {step.step}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground mx-auto hidden lg:block" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg">work with us</Button>
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;