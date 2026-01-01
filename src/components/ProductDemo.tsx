import { ArrowUpRight, User, Play, AlertTriangle } from "lucide-react";

const ProductDemo = () => {
  return (
    <section className="py-12 bg-[#0f1110] relative overflow-hidden">
      {/* Subtle background glow - purple family */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Persona Card */}
            <div className="p-8 rounded-3xl bg-[#1a1b26] border border-white/5 shadow-2xl space-y-6 transition-all duration-300 hover:border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-glow" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Persona Creation</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Step 01</div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-glow border border-white/10 shadow-lg flex-shrink-0" />
                  <div className="text-sm font-bold text-white">Jen, 28</div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed font-light">
                  Dog owner looking for durable toys. Jen is always on the move and shops between commitments.
                </p>
              </div>
            </div>

            {/* Simulation Card */}
            <div className="p-8 rounded-3xl bg-[#1a1b26] border border-white/5 shadow-2xl space-y-6 transition-all duration-300 hover:border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Real-time Simulation</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Step 02</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/5 border-l-2 border-primary-glow space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white">Action 11</span>
                    <span className="text-[9px] text-white/40">Product Page</span>
                  </div>
                  <p className="text-[11px] text-white/60 font-light">Clicks comparison matrix...</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border-l-2 border-indigo-400 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white text-indigo-400">Action 12</span>
                    <span className="text-[9px] text-white/40">In-progress</span>
                  </div>
                  <p className="text-[11px] text-white/60 font-light">Simulating user patience and goals.</p>
                </div>
              </div>
            </div>

            {/* Insights Card */}
            <div className="p-8 rounded-3xl bg-[#1a1b26] border border-white/5 shadow-2xl space-y-6 transition-all duration-300 hover:border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Actionable Insights</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">Step 03</div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-4">
                <div className="text-[10px] font-bold text-primary-glow uppercase tracking-widest">Analysis Found</div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Deep learning identified friction in the checkout flow during high-intensity sessions.
                </p>
                <div className="flex items-center text-[10px] font-bold text-white group cursor-pointer">
                  View full analysis <ArrowUpRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
