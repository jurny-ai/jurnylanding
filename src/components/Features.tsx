import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Zap, BarChart3, Users, Shield, Clock, RefreshCw, ArrowLeft, ArrowRight, RotateCcw, Lock } from "lucide-react";
import ProductDemo from "@/components/ProductDemo";
const features = [{
  icon: Zap,
  title: "Instant Insights",
  description: "Gain real-time insights as synthetic users surface UX pain points and improvement areas."
}, {
  icon: Users,
  title: "Diverse User Base",
  description: "Generate users across demographics and skill levels for comprehensive testing."
}, {
  icon: Clock,
  title: "Save Time & Money",
  description: "Cut research time from weeks to hours and reduce user testing costs by up to 80%."
}, {
  icon: RefreshCw,
  title: "Iterative Testing",
  description: "Rapidly A/B test design variations and prototypes with consistent personas for reliable results."
}];
const Features = () => {
  return <section id="features" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">AI Personas, Human-Grade Feedback</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to conduct comprehensive user research with AI-powered synthetic users.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border bg-background/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>)}
          </div>
          
          {/* Dog Page Simulation with Browser Chrome */}
          
        </div>
      </div>
    </section>;
};
export default Features;