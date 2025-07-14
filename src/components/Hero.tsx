import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, ArrowRight, Target, Brain, Users, TrendingUp, Monitor, Star, Heart, ShoppingCart, Bone, User, ChevronDown } from "lucide-react";
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-subtle pt-8 pb-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo + AI Badge Combined */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-primary/10 border border-primary/20 backdrop-blur-sm">
              <img src="/lovable-uploads/bb454a78-d8c4-4776-aa28-246c06947dfc.png" alt="Jurny Logo" className="h-6 md:h-7" />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">AI-Powered User Simulation</span>
            </div>
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
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-center">Define targeted personas, simulate behaviors at scale, and discover actionable insights to improve user jurnys through data-driven decisions</p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-elegant group" asChild>
              <a href="mailto:syntheticjurny.ai@gmail.com">
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="shadow-elegant group" asChild>
              
            </Button>
          </div>

          {/* Product Demo */}
          <div className="max-w-5xl mx-auto mt-16">
            {/* Demo screenshot */}
            <div className="relative">
              <Card className="p-4 bg-gradient-to-br from-background to-muted/30 border shadow-elegant">
                <div className="relative">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 mb-4 p-3 bg-muted rounded-t-lg border-b">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-sm text-muted-foreground">jurny.ai Dashboard - User Simulation</div>
                  </div>

                  {/* Product Demo Interface */}
                  <div className="relative rounded-b-lg overflow-hidden bg-background">
                    <div className="p-4 space-y-4">
                      {/* Summary Section */}
                      <div className="p-4 rounded-lg border bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800 space-y-3">
                        {/* Main failure message */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold">✗</span>
                          </div>
                          <div className="text-left">
                            <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">Goal Failed - Purchase Abandoned</h3>
                            <p className="text-xs text-red-600 dark:text-red-300">Jen was not able to understand the durability of the dog toy in limited steps due to a complicated product comparison view.</p>
                          </div>
                        </div>
                        
                        {/* Steps counter section */}
                        <div className="flex items-center justify-between pt-2 border-t border-red-200 dark:border-red-800">
                          <span className="text-xs text-red-600 dark:text-red-300 font-medium hover:text-red-500 transition-colors flex items-center gap-1">
                            View Analysis & Suggestions
                            <ChevronDown className="h-3 w-3" />
                          </span>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-800 dark:text-red-200">12</div>
                            <div className="text-xs text-red-600 dark:text-red-300">Steps Taken</div>
                          </div>
                        </div>
                      </div>

                      {/* Persona & Goal Section */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                          <h3 className="text-sm font-semibold text-foreground">Persona: Jen, 28</h3>
                          <p className="text-xs text-muted-foreground">Dog owner looking for a durable toy for her energetic pitbull. Jen is always on the move and does a lot of shopping in between commitments...</p>
                        </div>
                        <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                          <h3 className="text-sm font-semibold text-foreground">Goal</h3>
                          <p className="text-xs text-muted-foreground">Find a high-quality chew toy under $25 that's safer and more durable than her previous rope toy purchase.</p>
                        </div>
                      </div>

                      {/* Website Preview */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-foreground">Current Page</h3>
        {/* Product Page Interface */}
        <div className="bg-background rounded-lg min-h-64 border border-border overflow-hidden">
          {/* Header */}
          {/* Browser Header */}
          <div className="bg-muted/40 border-b border-border/30 p-2">
            <div className="flex items-center justify-between">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              {/* URL Bar */}
              <div className="flex-1 mx-2 md:mx-4">
                <div className="bg-background border border-border/50 rounded-md px-2 md:px-3 py-1 flex items-center gap-1 md:gap-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium truncate">rogerspets.com</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Website Header */}
          <div className="flex items-center justify-between border-b border-border/30 p-2 md:p-3" style={{
                          backgroundColor: 'hsl(var(--pet-background))'
                        }}>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 md:h-4 md:w-4 rounded-sm" style={{
                              backgroundColor: 'hsl(var(--pet-primary))'
                            }}></div>
              <div className="text-xs font-medium" style={{
                              color: 'hsl(var(--pet-secondary))'
                            }}>Roger's Pet Store</div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" style={{
                              color: 'hsl(var(--pet-secondary))'
                            }} />
            </div>
          </div>
          
          {/* Product Page Content */}
          <div className="p-3 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4" style={{
                          backgroundColor: 'hsl(var(--pet-background))'
                        }}>
            {/* Product Image & Details Combined on Mobile */}
            <div className="md:space-y-3">
              <div className="h-24 md:h-32 rounded-lg flex items-center justify-center border relative mb-3" style={{
                              backgroundColor: 'hsl(var(--pet-card))',
                              borderColor: 'hsl(var(--pet-muted))'
                            }}>
                <Bone className="h-12 w-12 md:h-16 md:w-16" style={{
                                color: 'hsl(var(--pet-secondary))'
                              }} />
                <Heart className="absolute top-2 right-2 h-3 w-3 md:h-4 md:w-4" style={{
                                color: 'hsl(var(--pet-accent))'
                              }} />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-2 md:space-y-3">
              <div>
                <div className="mb-2">
                  <div className="h-3 w-24 md:w-32 bg-muted-foreground/30 rounded"></div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-2 w-2 md:h-3 md:w-3 fill-yellow-400 text-yellow-400" />)}
                  <div className="h-2 w-6 md:w-8 bg-muted-foreground/30 rounded ml-1"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-8 md:h-4 md:w-12 rounded" style={{
                                backgroundColor: 'hsl(var(--pet-primary))'
                              }}></div>
                <div className="h-2 w-6 md:h-3 md:w-10 rounded line-through" style={{
                                backgroundColor: 'hsl(var(--pet-muted))'
                              }}></div>
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 md:h-8 md:w-24 rounded flex items-center justify-center gap-1" style={{
                                backgroundColor: 'hsl(var(--pet-secondary))'
                              }}>
                  <ShoppingCart className="h-2 w-2 md:h-3 md:w-3 text-white" />
                  <div className="h-1 w-6 md:h-2 md:w-10 bg-white/60 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section - Hidden on mobile for simplicity */}
          <div className="hidden md:block px-4 pb-4 border-t border-border/30 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-16 bg-muted-foreground/30 rounded"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <div className="h-2 w-12 bg-muted-foreground/30 rounded"></div>
                </div>
                <div className="h-2 w-20 bg-muted-foreground/20 rounded"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <div className="h-2 w-12 bg-muted-foreground/30 rounded"></div>
                </div>
                <div className="h-2 w-18 bg-muted-foreground/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
                      </div>

                      {/* User Journey Steps */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-foreground">Simulation Steps</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">9</div>
                              <div className="text-sm font-medium">click "dumbbell dog toy"</div>
                            </div>
                            <p className="text-xs text-muted-foreground text-left">This dog toy looks durable which would suit my pitbull</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">10</div>
                              <div className="text-sm font-medium">scroll down</div>
                            </div>
                            <p className="text-xs text-muted-foreground text-left">Scrolling down may help me find product specifications. I want to see if this product would be durable enough</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">11</div>
                              <div className="text-sm font-medium"> Analyze Product Comparison View</div>
                            </div>
                            <p className="text-xs text-muted-foreground text-left">I see a product comparison matrix with a lot of information. It is organized poorly and is hard to analyze quickly.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">12</div>
                              <div className="text-sm font-medium">Abandon goal</div>
                            </div>
                            <p className="text-xs text-muted-foreground text-left">I am short for time and 12 steps is more than how much I have patience for. I expected to be able to quickly understand the durability of the dog toy in limited clicks. </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Actionable Insights Overlay */}
              <div className="absolute -right-48 top-16 hidden lg:block">
                <Card className="p-4 bg-background shadow-elegant border-2 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Actionable Insights</h4>
                      <p className="text-xs text-muted-foreground font-medium">Clear recommendations for improvement</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Floating feature callouts */}
              <div className="absolute -left-48 top-1/3 hidden lg:block">
                <Card className="p-4 bg-background shadow-elegant border-2 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Persona Creation</h4>
                      <p className="text-xs text-muted-foreground font-medium">AI generates realistic user profiles</p>
                    </div>
                  </div>
                </Card>
              </div>


              <div className="absolute -right-48 bottom-1/4 hidden lg:block">
                <Card className="p-4 bg-background shadow-elegant border-2 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Behavioral Analysis</h4>
                      <p className="text-xs text-muted-foreground font-medium">Deep insights into user decisions</p>
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