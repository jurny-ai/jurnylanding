import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Zap, BarChart3, Users, Shield, Clock, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Insights",
    description: "Get real-time feedback and analysis as synthetic users interact with your designs, identifying pain points and areas for improvement."
  },
  {
    icon: Users,
    title: "Diverse User Base",
    description: "Generate users from different demographics, technical skill levels, and cultural backgrounds for comprehensive testing."
  },
  {
    icon: Clock,
    title: "Save Time & Money",
    description: "Reduce research timelines from weeks to hours while cutting traditional user testing costs by up to 80%."
  },
  {
    icon: RefreshCw,
    title: "Iterative Testing",
    description: "Rapidly test multiple design variations and prototypes with consistent user personas for reliable A/B testing results."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Usability Made Comprehensive and Scalable
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to conduct comprehensive user research with AI-powered synthetic users.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border bg-background/50 backdrop-blur-sm">
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
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;