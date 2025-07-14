import { Card } from "@/components/ui/card";
import { ArrowRight, User, Play, AlertTriangle } from "lucide-react";
const ProductDemo = () => {
  return <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See How It Works
            </h2>
            
          </div>

          {/* Workflow visualization */}
          <div className="relative">
            {/* Connection lines */}
            <div className="hidden lg:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 -translate-y-1/2" />
            <div className="hidden lg:block absolute top-1/2 left-1/3 w-3 h-3 bg-primary rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="hidden lg:block absolute top-1/2 right-1/3 w-3 h-3 bg-primary rounded-full -translate-y-1/2 translate-x-1/2" />
            
            {/* Three workflow steps */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Persona Creation Column */}
              <Card className="p-8 bg-primary/5 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative group">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/15 rounded-2xl mb-4 group-hover:bg-primary/25 transition-colors">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Persona Creation</h3>
                    <p className="text-sm text-foreground/70">AI generates realistic user personas</p>
                  </div>
                  
                  {/* Persona UI Mockup */}
                  <Card className="p-6 bg-background/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-primary/40">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Jen, 28</h4>
                        <div className="w-8 h-1 bg-primary/30 rounded-full mt-1" />
                      </div>
                    </div>
                    <p className="text-xs text-foreground/60 leading-relaxed">Dog owner looking for a durable toy for her energetic pitbull. Jen is always on the move and does a lot of shopping in between commitments</p>
                    <div className="mt-4 flex gap-2">
                      <div className="w-2 h-2 bg-primary/40 rounded-full" />
                      <div className="w-2 h-2 bg-primary/30 rounded-full" />
                      <div className="w-2 h-2 bg-primary/20 rounded-full" />
                    </div>
                  </Card>
                </div>
              </Card>

              {/* Real Time Simulation Column */}
              <Card className="p-8 bg-primary/5 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative group">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/15 rounded-2xl mb-4 group-hover:bg-primary/25 transition-colors">
                      <Play className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Real Time Simulation</h3>
                    <p className="text-sm text-foreground/70">Watch personas interact with your site</p>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Step 11 UI Mockup */}
                    <Card className="p-4 bg-background/80 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary/60" />
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold flex-shrink-0">
                          11
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground mb-1">C product comparison</div>
                          <div className="w-12 h-1 bg-primary/30 rounded-full" />
                        </div>
                      </div>
                      <p className="text-xs text-foreground/60 leading-relaxed ml-10">The interface shows a comparison matrix that is organized poorly and is hard to analyze quickly...</p>
                    </Card>
                    
                    {/* Step 12 UI Mockup */}
                    <Card className="p-4 bg-background/80 backdrop-blur-sm border-primary/30 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary/40" />
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-primary/70 text-primary-foreground text-xs flex items-center justify-center font-semibold flex-shrink-0">
                          12
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground mb-1">Abandon goal</div>
                          <div className="w-8 h-1 bg-primary/20 rounded-full" />
                        </div>
                      </div>
                      <p className="text-xs text-foreground/60 leading-relaxed ml-10">
                        I am short for time and 12 steps is more than I have patience for...
                      </p>
                    </Card>
                  </div>
                </div>
              </Card>

              {/* Actionable Insights Column */}
              <Card className="p-8 bg-primary/5 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative group">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 dark:bg-red-950/50 rounded-2xl mb-4 group-hover:bg-red-100 dark:group-hover:bg-red-950/70 transition-colors">
                      <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Actionable Insights</h3>
                    <p className="text-sm text-foreground/70">Get precise failure analysis</p>
                  </div>
                  
                  {/* Main Failure Message UI Mockup */}
                  <Card className="p-6 bg-red-50/80 dark:bg-red-950/30 backdrop-blur-sm border-red-200/60 dark:border-red-800/60 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600" />
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-sm font-bold">✗</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
                          Goal Failed - Purchase Abandoned
                        </h4>
                        <p className="text-xs text-red-600 dark:text-red-300 leading-relaxed">
                          Jen was not able to understand the durability of the dog toy in limited steps due to a complicated product comparison view.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-red-200/60 dark:border-red-700/60">
                      <button className="inline-flex items-center gap-2 text-xs text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 font-medium transition-colors group">
                        View Analysis & Suggestions
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </Card>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ProductDemo;