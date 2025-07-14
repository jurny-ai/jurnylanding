import { Card } from "@/components/ui/card";

const ProductDemo = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              See It In Action
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
              How Behavioral Testing Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch how we create personas, simulate real user behavior, and generate actionable insights to improve your product
            </p>
          </div>

          {/* Unique stepped layout */}
          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-24 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Step 1 - Persona Creation */}
              <div className="relative">
                <div className="lg:transform lg:-translate-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      01
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Persona Creation</h3>
                      <p className="text-sm text-muted-foreground">Define your target users</p>
                    </div>
                  </div>
                  
                  <Card className="p-6 bg-gradient-to-br from-blue-50/50 to-blue-100/30 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">J</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Jen, 28</h4>
                        <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">Dog Owner • Busy Professional</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Looking for a durable toy for her energetic pitbull. Always on the move and does shopping between commitments...
                    </p>
                  </Card>
                </div>
              </div>

              {/* Step 2 - Real Time Simulation */}
              <div className="relative">
                <div className="lg:transform lg:translate-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      02
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Real Time Simulation</h3>
                      <p className="text-sm text-muted-foreground">Track user journey</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="p-4 bg-gradient-to-br from-amber-50/50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-800 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white text-xs flex items-center justify-center font-bold">11</div>
                        <div className="text-sm font-semibold text-foreground">Navigate to comparison</div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Comparing dog toys to find the most durable option. The interface shows a poorly organized comparison matrix...
                      </p>
                    </Card>
                    
                    <Card className="p-4 bg-gradient-to-br from-red-50/50 to-red-100/30 dark:from-red-950/30 dark:to-red-900/20 border-red-200 dark:border-red-800 shadow-md">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-xs flex items-center justify-center font-bold">12</div>
                        <div className="text-sm font-semibold text-red-700 dark:text-red-300">Abandon goal</div>
                      </div>
                      <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">
                        Short on time - 12 steps exceeds patience threshold for quick durability assessment...
                      </p>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Step 3 - Actionable Insights */}
              <div className="relative">
                <div className="lg:transform lg:-translate-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                      03
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Actionable Insights</h3>
                      <p className="text-sm text-muted-foreground">Get specific recommendations</p>
                    </div>
                  </div>
                  
                  <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/50 dark:to-red-900/30 border-red-200 dark:border-red-800 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-lg font-bold">✗</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Goal Failed - Purchase Abandoned</h4>
                        <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed mb-4">
                          Jen couldn't understand toy durability quickly due to complicated comparison interface.
                        </p>
                        <div className="bg-red-100 dark:bg-red-900/50 rounded-lg p-3 border border-red-200 dark:border-red-700">
                          <button className="text-sm text-red-800 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100 font-semibold transition-colors">
                            🔍 View Analysis & Suggestions
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;