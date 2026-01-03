import { ArrowUpRight, User, Play, AlertTriangle } from "lucide-react";

const ProductDemo = () => {
  return (
    <section className="py-12 bg-background relative overflow-hidden">
      {/* Subtle background glow - purple family */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Persona Card */}
            <div className="p-8 rounded-3xl bg-card dark:bg-[#1a1b26] border border-border dark:border-white/5 shadow-2xl space-y-6 transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-glow" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground dark:text-white">Persona Creation</div>
                  <div className="text-xs text-foreground/60 dark:text-white/40 uppercase tracking-widest">Step 01</div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted dark:bg-white/5 border border-border dark:border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-glow border border-border dark:border-white/10 shadow-lg flex-shrink-0" />
                  <div className="text-base font-bold text-foreground dark:text-white">Jen, 28</div>
                </div>
                <p className="text-sm text-foreground/60 dark:text-white/40 leading-relaxed font-light">
                  Dog owner looking for durable toys. Jen is always on the move and shops between commitments.
                </p>
              </div>
            </div>

            {/* Simulation Card */}
            <div className="p-8 rounded-3xl bg-card dark:bg-[#1a1b26] border border-border dark:border-white/5 shadow-2xl space-y-6 transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground dark:text-white">Real-time Simulation</div>
                  <div className="text-xs text-foreground/60 dark:text-white/40 uppercase tracking-widest">Step 02</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-muted dark:bg-white/5 border-l-2 border-primary-glow space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-foreground dark:text-white">Action 11</span>
                    <span className="text-[11px] text-foreground/60 dark:text-white/40">Product Page</span>
                  </div>
                  <p className="text-xs text-foreground/70 dark:text-white/60 font-light">Click comparison matrix...</p>
                </div>
                <div className="p-4 rounded-xl bg-muted dark:bg-white/5 border-l-2 border-indigo-400 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-400">Action 12</span>
                    <span className="text-[11px] text-foreground/60 dark:text-white/40">In-progress</span>
                  </div>
                  <p className="text-xs text-foreground/70 dark:text-white/60 font-light">Scroll to find actual review text</p>
                </div>
              </div>
            </div>

            {/* Insights Card */}
            <div className="p-8 rounded-3xl bg-card dark:bg-[#1a1b26] border border-border dark:border-white/5 shadow-2xl space-y-6 transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground dark:text-white">Actionable Insights</div>
                  <div className="text-xs text-foreground/60 dark:text-white/40 uppercase tracking-widest">Step 03</div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-4">
                <div className="text-xs font-bold text-primary-glow uppercase tracking-widest">Analysis Found</div>
                <p className="text-sm text-foreground/80 dark:text-white/80 leading-relaxed">
                  Users faced friction in learning about reviews due to poor navigation.
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center text-xs font-bold text-foreground dark:text-white group cursor-pointer w-fit">
                    View full analysis <ArrowUpRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="flex items-center text-xs font-bold text-foreground dark:text-white group cursor-pointer w-fit">
                    View session replay <ArrowUpRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
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
