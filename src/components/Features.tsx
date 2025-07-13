import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target, Zap, BarChart3, Users, Shield, Clock, RefreshCw, ArrowLeft, ArrowRight, RotateCcw, Lock } from "lucide-react";
import ProductDemo from "@/components/ProductDemo";
const features = [{
  icon: Zap,
  title: "Instant Insights",
  description: "Get real-time feedback and analysis as synthetic users interact with your designs, identifying pain points and areas for improvement."
}, {
  icon: Users,
  title: "Diverse User Base",
  description: "Generate users from different demographics, technical skill levels, and cultural backgrounds for comprehensive testing."
}, {
  icon: Clock,
  title: "Save Time & Money",
  description: "Reduce research timelines from weeks to hours while cutting traditional user testing costs by up to 80%."
}, {
  icon: RefreshCw,
  title: "Iterative Testing",
  description: "Rapidly test multiple design variations and prototypes with consistent user personas for reliable A/B testing results."
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
          <div className="mt-20">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">See SyntheticUX in Action</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch how our AI personas interact with real websites to uncover insights.
              </p>
            </div>
            
            {/* Browser Window */}
            <div className="max-w-5xl mx-auto bg-background rounded-lg shadow-elegant overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-muted border-b">
                {/* Browser window controls */}
                <div className="flex items-center justify-between p-3 border-b border-border/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">PetToys.com - Chrome</div>
                  <div className="w-12"></div>
                </div>
                
                {/* Browser navigation bar */}
                <div className="flex items-center gap-3 p-2 px-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <ArrowLeft className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  {/* URL bar */}
                  <div className="flex-1 flex items-center bg-background rounded-md border px-3 py-1">
                    <Lock className="h-3 w-3 text-green-600 mr-2" />
                    <span className="text-xs text-muted-foreground">https://</span>
                    <span className="text-xs font-medium">pettoys.com</span>
                    <span className="text-xs text-muted-foreground">/shop/dog-toys</span>
                  </div>
                  
                  <div className="w-8"></div>
                </div>
              </div>

              {/* Page Content - ProductDemo without its own section wrapper */}
              <div className="bg-background">
                <ProductDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default Features;