import React from 'react';
import { ArrowUpRight, MousePointer2, CheckCircle2 } from "lucide-react";

const DashboardVisualization = () => {
  return (
    <div className="relative w-full flex flex-col justify-start pt-0">
      {/* Background Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Reorganized Bento Layout */}
      <div className="relative w-full max-w-[560px] flex flex-col gap-4">
        
        {/* Row 1: Unified Persona Card */}
        <div className="w-full animate-float" style={{ animationDelay: '0s' }}>
          <div className="p-6 rounded-3xl bg-[#1a1b26]/90 backdrop-blur-xl border border-white/10 shadow-xl flex justify-between items-center gap-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold vertical-text border-r border-white/5 pr-4 hidden sm:block">
              Active Personas
            </div>
            
            <div className="flex-1 flex justify-around items-center">
              {[
                { name: 'Jen, 28', quality: 'Fast-Paced', grad: 'from-primary to-primary-glow', color: 'text-primary-glow', bg: 'bg-primary/10' },
                { name: 'Randall, 55', quality: 'Skeptical', grad: 'from-indigo-500 to-blue-400', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { name: 'Marcus, 34', quality: 'Methodical', grad: 'from-purple-500 to-pink-400', color: 'text-purple-400', bg: 'bg-purple-500/10' }
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center px-2 group">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${p.grad} border border-white/10 shadow-lg mb-2 transition-transform duration-300 group-hover:scale-110`} />
                  <div className="text-[14px] font-bold text-white mb-0.5">{p.name.split(',')[0]}</div>
                  <div className={`text-[8px] ${p.color} font-bold uppercase tracking-widest ${p.bg} px-1.5 py-1 rounded-full`}>{p.quality}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Enhanced Browser Simulation with Multiple Cursors */}
        <div className="w-full h-[240px] animate-float" style={{ animationDelay: '0.2s' }}>
          <div className="relative p-0 rounded-3xl bg-[#1a1b26]/95 backdrop-blur-xl border border-white/10 shadow-2xl h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/40" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                <div className="w-2 h-2 rounded-full bg-green-500/40" />
              </div>
              <div className="ml-4 px-3 py-1 rounded-full bg-white/5 text-[8px] text-white/60 font-mono flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary-glow animate-pulse" />
                multi_persona_sim_v2
              </div>
              <div className="ml-auto">
                <div className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/20 text-[8px] text-primary-glow font-bold uppercase">Parallel Testing</div>
              </div>
            </div>

            {/* Simulated UI Content */}
            <div className="p-8 relative h-[calc(100%-44px)] bg-gradient-to-b from-transparent to-primary/5">
              <div className="flex gap-6">
                {/* Product Image Placeholder */}
                <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0 animate-pulse" />
                
                <div className="flex-1 space-y-3">
                  <div className="h-3 w-32 bg-white/10 rounded-full" />
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-white/5 rounded-full" />
                    <div className="h-1.5 w-5/6 bg-white/5 rounded-full" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="w-20 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center relative overflow-hidden group/btn-cart">
                      <span className="text-[9px] text-white/60 font-bold group-active/btn-cart:scale-95 transition-transform">Add to Cart</span>
                      <div className="absolute inset-0 bg-primary-glow/20 animate-ui-click-ripple opacity-0" />
                    </div>
                    <div className="w-20 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group/btn-details">
                      <span className="text-[9px] text-white/40 font-bold group-active/btn-details:scale-95 transition-transform">Details</span>
                      <div className="absolute inset-0 bg-blue-500/10 animate-ui-click-ripple-2 opacity-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form elements underneath */}
              <div className="mt-6 space-y-3">
                <div className="h-1.5 w-24 bg-white/5 rounded-full" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-7 rounded-lg bg-white/5 border border-white/5" />
                  <div className="h-7 rounded-lg bg-white/5 border border-white/5" />
                </div>
              </div>

              {/* Multiple Cursors - Behavioral Movement */}
              {/* Jen: Fast, Jittery, Impulsive */}
              <div className="absolute pointer-events-none animate-cursor-jen top-0 left-0 z-20">
                <div className="relative">
                  <MousePointer2 className="w-5 h-5 text-primary-glow drop-shadow-lg fill-primary/20" />
                  <div className="absolute -top-4 -right-2 px-1.5 py-0.5 rounded-md bg-primary-glow text-[9px] text-white font-bold whitespace-nowrap shadow-lg">Jen</div>
                  <div className="absolute top-0 left-0 w-8 h-8 -translate-x-1/4 -translate-y-1/4 rounded-full border border-primary-glow/50 scale-0 animate-ui-click-jen" />
                </div>
              </div>

              {/* Randall: Slow, Drifting, Hover-heavy */}
              <div className="absolute pointer-events-none animate-cursor-randall top-0 left-0 z-10">
                <div className="relative">
                  <MousePointer2 className="w-5 h-5 text-blue-400 drop-shadow-lg fill-blue-500/20" />
                  <div className="absolute -top-4 -right-2 px-1.5 py-0.5 rounded-md bg-blue-500 text-[9px] text-white font-bold whitespace-nowrap shadow-lg">Randall</div>
                  <div className="absolute top-0 left-0 w-8 h-8 -translate-x-1/4 -translate-y-1/4 rounded-full border border-blue-400/50 scale-0 animate-ui-click-randall" />
                </div>
              </div>

              {/* Marcus: Grid-like, Linear, Methodical */}
              <div className="absolute pointer-events-none animate-cursor-marcus top-0 left-0 z-0">
                <div className="relative">
                  <MousePointer2 className="w-5 h-5 text-purple-400 drop-shadow-lg fill-purple-500/20" />
                  <div className="absolute -top-4 -right-2 px-1.5 py-0.5 rounded-md bg-purple-500 text-[9px] text-white font-bold whitespace-nowrap shadow-lg">Marcus</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Stats stuff underneath */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 h-fit animate-float" style={{ animationDelay: '0.4s' }}>
            <div className="p-6 rounded-3xl bg-[#1a1b26]/90 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-primary-glow font-bold">Conversion Rate</div>
                  <div className="text-2xl font-bold text-white mt-1">+24.8%</div>
                </div>
                <div className="p-1.5 rounded-full bg-primary/20">
                  <ArrowUpRight className="w-3 h-3 text-primary-glow" />
                </div>
              </div>
              <div className="h-12 w-full">
                <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none" className="overflow-visible">
                  <path d="M0,38 Q20,35 40,36 T80,15 T100,8" fill="none" stroke="hsl(var(--primary-glow))" strokeWidth="2.5" strokeLinecap="round" className="animate-draw-path" />
                  <path d="M0,38 Q20,35 40,36 T80,15 T100,8 L100,40 L0,40 Z" fill="url(#grad-stats)" className="opacity-10" />
                  <defs>
                    <linearGradient id="grad-stats" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary-glow))" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="col-span-6 h-fit animate-float" style={{ animationDelay: '0.6s' }}>
            <div className="p-6 rounded-3xl bg-[#1a1b26]/90 backdrop-blur-xl border border-white/10 shadow-xl h-full space-y-4">
              <div>
                <div className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-3 flex items-center justify-between">
                  Task Completion Rate
                  <span className="text-primary-glow font-bold">Current Run</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - 0.94)} className="text-primary-glow transition-all duration-1000" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-[12px] font-bold text-white">94%</span>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {[
                      { label: 'Checkout', done: true },
                      { label: 'Nav Logic', done: true },
                      { label: 'Form Fill', done: false }
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className={`w-3 h-3 ${step.done ? 'text-primary-glow' : 'text-white/20'}`} />
                        <span className={`text-[9px] ${step.done ? 'text-white/80' : 'text-white/40'}`}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes draw-path {
          from { stroke-dasharray: 0 200; }
          to { stroke-dasharray: 200 200; }
        }
        
        /* Jen: Fast, High Velocity, Over-shoot Jitter */
        @keyframes cursor-jen {
          0% { transform: translate(450px, 150px); opacity: 0; }
          5% { opacity: 1; }
          12% { transform: translate(175px, 50px); } /* Sudden dash towards button area */
          15% { transform: translate(192px, 57px); } /* Snap to Add to Cart */
          17% { transform: translate(192px, 57px) scale(0.85); } /* Fast Click */
          20% { transform: translate(192px, 57px) scale(1); }
          25% { transform: translate(300px, 200px); opacity: 0; }
          100% { transform: translate(300px, 200px); opacity: 0; }
        }
        
        /* Randall: Slow, Curvilinear, Deliberate Hover */
        @keyframes cursor-randall {
          0% { transform: translate(400px, 50px); opacity: 0; }
          20% { opacity: 0; }
          25% { opacity: 1; transform: translate(400px, 50px); }
          40% { transform: translate(100px, 40px); } /* Drifts to image */
          50% { transform: translate(110px, 50px); } /* Subtle hover movement */
          65% { transform: translate(280px, 57px); } /* Drifts to Details */
          70% { transform: translate(275px, 52px); } /* Hover hesitation */
          75% { transform: translate(280px, 57px) scale(0.9); } /* Deliberate Click */
          80% { transform: translate(280px, 57px) scale(1); }
          90% { transform: translate(450px, 200px); opacity: 0; }
          100% { transform: translate(450px, 200px); opacity: 0; }
        }

        /* Marcus: Linear, Grid-like, Pause-heavy */
        @keyframes cursor-marcus {
          0% { transform: translate(50px, 150px); opacity: 0; }
          45% { opacity: 0; }
          50% { opacity: 1; transform: translate(30px, 10px); } /* Start of title */
          60% { transform: translate(150px, 10px); } /* Scan title right */
          65% { transform: translate(150px, 30px); } /* Move down to subtext */
          75% { transform: translate(30px, 30px); } /* Scan subtext left */
          80% { transform: translate(30px, 110px); } /* Move down to form */
          90% { transform: translate(150px, 110px); } /* Scan form right */
          100% { transform: translate(150px, 110px); opacity: 0; }
        }

        @keyframes ui-click-jen {
          16% { transform: scale(0); opacity: 0; }
          17% { transform: scale(1); opacity: 1; }
          24% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes ui-click-randall {
          74% { transform: scale(0); opacity: 0; }
          75% { transform: scale(1); opacity: 1; }
          82% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes ui-click-ripple {
          17% { opacity: 1; transform: scale(1); }
          29% { opacity: 0; transform: scale(1.5); }
        }
        @keyframes ui-click-ripple-2 {
          75% { opacity: 1; transform: scale(1); }
          87% { opacity: 0; transform: scale(1.5); }
        }

        .animate-cursor-jen { animation: cursor-jen 10s ease-in-out infinite; }
        .animate-cursor-randall { animation: cursor-randall 10s ease-in-out infinite; }
        .animate-cursor-marcus { animation: cursor-marcus 10s ease-in-out infinite; }
        .animate-ui-click-jen { animation: ui-click-jen 10s ease-in-out infinite; }
        .animate-ui-click-randall { animation: ui-click-randall 10s ease-in-out infinite; }
        .animate-ui-click-ripple { animation: ui-click-ripple 10s ease-in-out infinite; }
        .animate-ui-click-ripple-2 { animation: ui-click-ripple-2 10s ease-in-out infinite; }
        .animate-draw-path { animation: draw-path 3s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default DashboardVisualization;
