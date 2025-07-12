import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Users, Target, TrendingUp } from "lucide-react";
const ProductDemo = () => {
  return <section id="demo" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See SyntheticUX in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch as our AI creates detailed user personas that interact with your designs, 
              providing actionable insights for better user experiences.
            </p>
          </div>

          {/* Demo screenshot */}
          <div className="relative">
            <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border shadow-elegant">
              <div className="relative">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-t-lg border-b">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-muted-foreground">JurnyAI Dashboard - User Simulation</div>
                </div>

                {/* Screenshot */}
                <div className="relative rounded-b-lg overflow-hidden">
                  <img src="/lovable-uploads/a7d3d606-8bf6-4de7-b8a7-0dfd57725a1e.png" alt="SyntheticUX user simulation showing Jeff shopping for a credenza with detailed behavioral analysis" className="w-full h-auto shadow-lg" />
                  
                  {/* Overlay with highlights */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </Card>

            {/* Floating feature callouts */}
            <div className="absolute -left-4 top-1/4 hidden lg:block">
              <Card className="p-4 bg-background shadow-glow border max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Persona Creation</h4>
                    <p className="text-xs text-muted-foreground">AI generates realistic user profiles</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="absolute -right-4 top-1/3 hidden lg:block">
              <Card className="p-4 bg-background shadow-glow border max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Behavioral Analysis</h4>
                    <p className="text-xs text-muted-foreground">Deep insights into user decisions</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="absolute -left-4 bottom-1/4 hidden lg:block">
              <Card className="p-4 bg-background shadow-glow border max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Actionable Insights</h4>
                    <p className="text-xs text-muted-foreground">Clear recommendations for improvement</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Call to action */}
          
        </div>
      </div>
    </section>;
};
export default ProductDemo;