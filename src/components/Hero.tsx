import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, ArrowRight, Target, Brain, Users, TrendingUp, Monitor } from "lucide-react";
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-subtle pt-20 pb-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/50 border border-accent-foreground/20 rounded-full px-4 py-2 mb-8">
            <Brain className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">
              AI-Powered User Research
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Deploy{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Synthetic Users
            </span>{" "}
            to Validate UX Decisions
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">Generate realistic user personas with detailed behavioral patterns, preferences, and decision-making processes. Evaluate your user interfaces with AI-powered users before launching to real customers.</p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-elegant group">
              Talk with Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
          </div>

          {/* Product Demo */}
          <div className="max-w-7xl mx-auto mt-16">
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

                  {/* Product Demo Interface */}
                  <div className="relative rounded-b-lg overflow-hidden bg-background">
                    <div className="p-6 space-y-6">
                      {/* Persona & Goal Section */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                          <h3 className="text-sm font-semibold text-foreground">Persona: Jeff, 34</h3>
                          <p className="text-xs text-muted-foreground">Mid-career professional looking for quality furniture that fits his modern apartment aesthetic and budget.</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                          <h3 className="text-sm font-semibold text-foreground">Goal</h3>
                          <p className="text-xs text-muted-foreground">Find and purchase a credenza under $800 that matches existing decor and has good storage capacity.</p>
                        </div>
                      </div>

                      {/* Website Preview */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-foreground">Current Page</h3>
                        <div className="relative rounded-lg overflow-hidden border">
                          <img 
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop" 
                            alt="Furniture website showing credenza products" 
                            className="w-full h-40 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                      </div>

                      {/* User Journey Steps */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-foreground">Simulation Steps</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</div>
                              <div className="text-sm font-medium">Browse Categories</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Jeff immediately navigates to the furniture section, showing familiarity with e-commerce sites.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</div>
                              <div className="text-sm font-medium">Search Product</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Uses specific terminology "credenza furniture" demonstrating product knowledge.</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</div>
                              <div className="text-sm font-medium">Filter Results</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Applies price filter ($500-$800) and material preferences, showing budget consciousness.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">4</div>
                              <div className="text-sm font-medium">Review Details</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Carefully reads reviews and checks dimensions, indicating high purchase intent.</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">5</div>
                              <div className="text-sm font-medium">Compare Options</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Opens multiple tabs to compare similar products, showing thorough research behavior.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">6</div>
                              <div className="text-sm font-medium">Add to Cart</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Selects preferred option and proceeds to checkout after final dimension check.</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Actionable Insights</h4>
                      <p className="text-xs text-muted-foreground">Clear recommendations for improvement</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="absolute -left-4 bottom-1/4 hidden lg:block">
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
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;