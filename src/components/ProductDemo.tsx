import { Users, MessageCircle, BarChart3, ArrowUpRight, Play } from "lucide-react";

const ProductDemo = () => {
  return (
    <section className="py-12 bg-background relative overflow-hidden">
      {/* Subtle background glow - purple family */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-6 max-w-xl leading-tight">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Run Simulation (Chat + Integrations + Support) */}
            <div className="p-8 rounded-3xl bg-card dark:bg-[#1a1b26] border border-border dark:border-white/10 shadow-2xl space-y-6 transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary-glow" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground dark:text-white">Run Simulation</div>
                  <div className="text-xs text-foreground/60 dark:text-white/60 uppercase tracking-widest">Step 01</div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Chat Interface */}
                <div className="p-6 rounded-2xl bg-muted dark:bg-white/10 border border-border dark:border-white/10">
                  <div className="flex items-start gap-3">
                    {/* Slack-style Avatar */}
                    <div className="w-9 h-9 rounded bg-[#3F0E40] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-xs">J</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-foreground dark:text-white">Jurny</span>
                        <span className="bg-foreground/10 text-foreground/60 dark:bg-white/10 dark:text-white/70 px-1 rounded-[3px] text-[10px] font-medium tracking-wide">APP</span>
                        <span className="text-xs text-muted-foreground dark:text-white/50">10:23 AM</span>
                      </div>
                      <div className="text-sm text-foreground/90 dark:text-white/90 leading-relaxed">
                        <span className="text-primary dark:text-primary-glow hover:underline cursor-pointer font-medium">@jurny</span> Test if 20 researchers can filter for "Phase 3" clinical trials in the dashboard
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-foreground/60 dark:text-white/50 italic pt-4 pl-[48px]">
                    Automatically creates Persona Flavors
                  </p>
                </div>

                {/* Integrations & Support */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted dark:bg-white/10 border-l-2 border-primary-glow space-y-2 h-full">
                    <div className="text-xs font-bold text-foreground dark:text-white">Integration</div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <img src="/slack.png" alt="Slack" className="h-6 w-6 object-contain" />
                      <img src="/teams.png" alt="Microsoft Teams" className="h-6 w-6 object-contain" />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted dark:bg-white/10 border-l-2 border-indigo-400 space-y-2 h-full">
                    <div className="text-xs font-bold text-foreground dark:text-white">Support</div>
                    <div className="text-xs text-foreground/60 dark:text-white/60">
                      Figma Prototypes, Sandbox Links & Live URLs
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Get Results (Insights) */}
            <div className="p-8 rounded-3xl bg-card dark:bg-[#1a1b26] border border-border dark:border-white/10 shadow-2xl space-y-6 transition-all duration-300 hover:border-primary/50 dark:hover:border-primary/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground dark:text-white">Get Results</div>
                  <div className="text-xs text-foreground/60 dark:text-white/60 uppercase tracking-widest">Step 02</div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Insight 1 */}
                <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="text-sm font-bold text-foreground dark:text-white leading-snug mb-1">
                        Filter Visibility Issue
                      </div>
                      <p className="text-xs text-foreground/80 dark:text-white/90 leading-relaxed">
                        Users struggled to locate the "Phase 3" filter on mobile due to the collapsed menu.
                      </p>
                    </div>
                    <div className="shrink-0 px-2 py-1 rounded bg-primary/20 dark:bg-primary/30 text-primary dark:text-white text-[10px] font-bold border border-transparent dark:border-primary/40">
                      HIGH
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-foreground/60 dark:text-white/80">
                      <span className="font-medium text-foreground dark:text-white">12/20</span> simulations affected
                    </div>
                    <div className="flex items-center text-xs font-bold text-primary dark:text-primary-glow cursor-pointer group hover:underline">
                      Watch session replay 
                      <ArrowUpRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Insight 2 */}
                <div className="p-6 rounded-2xl bg-muted dark:bg-white/10 border border-border dark:border-white/10 space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="text-sm font-bold text-foreground dark:text-white leading-snug mb-1">
                        Terminology Confusion
                      </div>
                      <p className="text-xs text-foreground/70 dark:text-white/70 leading-relaxed">
                        Researchers hesitated when selecting "Trial Phase", often looking for "Study Status" instead.
                      </p>
                    </div>
                    <div className="shrink-0 px-2 py-1 rounded bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-[10px] font-bold">
                      MED
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-foreground/60 dark:text-white/70">
                      <span className="font-medium text-foreground dark:text-white">7/20</span> simulations affected
                    </div>
                    <div className="flex items-center text-xs font-bold text-foreground dark:text-white cursor-pointer group hover:text-primary transition-colors">
                      Watch session replay 
                      <ArrowUpRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
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
