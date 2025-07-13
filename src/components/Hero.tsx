import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, ArrowRight, Target, Brain, Users, TrendingUp, Monitor, Star, Heart, ShoppingCart, Bone, User } from "lucide-react";
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-subtle pt-20 pb-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/5 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        {/* Logo in top left */}
        <div className="absolute top-0 left-4">
          <img 
            src="/lovable-uploads/a29bf3c3-2ec0-4c59-9014-a6ff4a4b268d.png" 
            alt="Jurny Logo" 
            className="h-12 w-auto"
          />
        </div>
        
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
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed text-center">Define targeted personas, simulate behaviors at scale, optimize UX gaps</p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-elegant group">
              Talk with Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
                    <div className="flex-1 text-center text-sm text-muted-foreground">JurnyAI Dashboard - User Simulation</div>
                  </div>

                  {/* Product Demo Interface */}
                  <div className="relative rounded-b-lg overflow-hidden bg-background">
                    <div className="p-4 space-y-4">
                      {/* Summary Section */}
                      <div className="p-4 rounded-lg border bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                              ✓
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">Goal Successfully Completed</h3>
                              <p className="text-xs text-green-600 dark:text-green-300">Sarah found and purchased a durable dog toy that meets her criteria</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-800 dark:text-green-200">12</div>
                            <div className="text-xs text-green-600 dark:text-green-300">Total Steps</div>
                          </div>
                        </div>
                      </div>

                      {/* Persona & Goal Section */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg border bg-muted/20 space-y-2">
                          <h3 className="text-sm font-semibold text-foreground">Persona: Sarah, 28</h3>
                          <p className="text-xs text-muted-foreground">Dog owner looking for durable, safe toys that will keep her energetic Golden Retriever entertained and engaged.</p>
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
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer"></div>
              </div>
              
              {/* URL Bar */}
              <div className="flex-1 mx-4">
                <div className="bg-background border border-border/50 rounded-md px-3 py-1 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">https://</span>
                  <span className="text-xs font-medium">rogerspets.com</span>
                </div>
              </div>
              
              {/* Browser Menu */}
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 hover:bg-muted rounded cursor-pointer flex items-center justify-center">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                </div>
                <div className="w-4 h-4 hover:bg-muted rounded cursor-pointer flex items-center justify-center">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                </div>
                <div className="w-4 h-4 hover:bg-muted rounded cursor-pointer flex items-center justify-center">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Website Header */}
          <div className="flex items-center justify-between border-b border-border/30 p-3" style={{backgroundColor: 'hsl(var(--pet-background))'}}>
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-sm" style={{backgroundColor: 'hsl(var(--pet-primary))'}}></div>
              <div className="h-3 w-16 rounded" style={{backgroundColor: 'hsl(var(--pet-muted))'}}></div>
              <div className="text-xs font-medium" style={{color: 'hsl(var(--pet-secondary))'}}>Roger's Pet Store</div>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4" style={{color: 'hsl(var(--pet-accent))'}} />
              <ShoppingCart className="h-4 w-4" style={{color: 'hsl(var(--pet-secondary))'}} />
              <div className="h-6 w-16 rounded-sm flex items-center justify-center" style={{backgroundColor: 'hsl(var(--pet-primary))'}}>
                <span className="text-xs text-white font-medium">Login</span>
              </div>
            </div>
          </div>
          
          {/* Product Page Content */}
          <div className="p-4 grid grid-cols-2 gap-4" style={{backgroundColor: 'hsl(var(--pet-background))'}}>
            {/* Left Side - Product Image */}
            <div className="space-y-3">
              <div className="h-32 rounded-lg flex items-center justify-center border relative" style={{backgroundColor: 'hsl(var(--pet-card))', borderColor: 'hsl(var(--pet-muted))'}}>
                <Bone className="h-16 w-16" style={{color: 'hsl(var(--pet-secondary))'}} />
                <Heart className="absolute top-2 right-2 h-4 w-4" style={{color: 'hsl(var(--pet-accent))'}} />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded border" style={{backgroundColor: 'hsl(var(--pet-muted))', borderColor: 'hsl(var(--pet-muted))'}}></div>
                <div className="h-8 w-8 rounded border-2" style={{backgroundColor: 'hsl(var(--pet-primary) / 0.2)', borderColor: 'hsl(var(--pet-primary))'}}></div>
                <div className="h-8 w-8 rounded border" style={{backgroundColor: 'hsl(var(--pet-muted))', borderColor: 'hsl(var(--pet-muted))'}}></div>
              </div>
            </div>
            
            {/* Right Side - Product Details */}
            <div className="space-y-3">
              <div>
                <div className="mb-2">
                  <div className="h-3 w-32 bg-muted-foreground/30 rounded"></div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                  <div className="h-2 w-8 bg-muted-foreground/30 rounded ml-1"></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-12 rounded" style={{backgroundColor: 'hsl(var(--pet-primary))'}}></div>
                <div className="h-3 w-10 rounded line-through" style={{backgroundColor: 'hsl(var(--pet-muted))'}}></div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-28 rounded" style={{backgroundColor: 'hsl(var(--pet-muted))'}}></div>
                <div className="h-2 w-24 rounded" style={{backgroundColor: 'hsl(var(--pet-muted))'}}></div>
                <div className="h-2 w-20 rounded" style={{backgroundColor: 'hsl(var(--pet-muted))'}}></div>
                <div className="h-2 w-32 rounded" style={{backgroundColor: 'hsl(var(--pet-muted))'}}></div>
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-8 w-20 rounded border flex items-center justify-center" style={{backgroundColor: 'hsl(var(--pet-card))', borderColor: 'hsl(var(--pet-muted))'}}>
                  <div className="h-2 w-8 rounded" style={{backgroundColor: 'hsl(var(--pet-muted))'}}></div>
                </div>
                <div className="h-8 w-24 rounded flex items-center justify-center gap-1" style={{backgroundColor: 'hsl(var(--pet-secondary))'}}>
                  <ShoppingCart className="h-3 w-3 text-white" />
                  <div className="h-2 w-10 bg-white/60 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="px-4 pb-4 border-t border-border/30 pt-3">
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
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">9</div>
                              <div className="text-sm font-medium">Compare Materials</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Examines the rubber material vs. the rope toy that frayed quickly.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">10</div>
                              <div className="text-sm font-medium">Check Reviews</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Reads customer reviews focusing on durability and safety feedback.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/30 border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">11</div>
                              <div className="text-sm font-medium">Price Comparison</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Confirms better value than the $18 rope toy that lasted only 2 weeks.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">12</div>
                              <div className="text-sm font-medium">Add to Cart</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Confident this will outlast previous purchase, proceeds to checkout.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

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

              <div className="absolute -right-48 bottom-1/3 hidden lg:block">
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

              <div className="absolute -left-48 bottom-1/4 hidden lg:block">
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