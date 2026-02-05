import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, MousePointer2, CheckCircle2, Globe } from "lucide-react";

const DashboardVisualization = () => {
  const [phase, setPhase] = useState<'url' | 'sim'>('url');
  const [urlText, setUrlText] = useState('');
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const urlIndexRef = useRef(0);
  const timersRef = useRef<{
    timer?: NodeJS.Timeout;
    typeInterval?: NodeJS.Timeout;
    cycleTimer?: NodeJS.Timeout;
  }>({});
  
  const urls = [
    "crunchdogfood.com",
    "ibank.com",
    "lastmiledelivery.com",
    "jakeslogistics.ai"
  ];

  const siteContent = [
    {
      title: "Premium Crunch Blend",
      desc: "Organic, grain-free dog food for active breeds.",
      btn1: "Add to Cart",
      btn2: "Reviews",
      accent: "from-orange-500/20 to-primary/20"
    },
    {
      title: "My Checking Account",
      desc: "Manage your assets with real-time fraud detection.",
      btn1: "Transfer",
      btn2: "Statements",
      accent: "from-emerald-500/20 to-blue-500/20"
    },
    {
      title: "Shipment #88291-B",
      desc: "In transit: Expected delivery today by 5:00 PM.",
      btn1: "Reschedule",
      btn2: "Track Live",
      accent: "from-blue-500/20 to-indigo-500/20"
    },
    {
      title: "Covered Truck Delivery",
      desc: "One week guarenteed delivery",
      btn1: "Schedule",
      btn2: "View Logs",
      accent: "from-purple-500/20 to-primary-glow/20"
    }
  ];

  useEffect(() => {
    const startCycle = () => {
      // Phase 1: URL Entry
      setPhase('url');
      setUrlText('');
      
      const currentUrl = urls[urlIndexRef.current];
      // REMOVED: setCurrentUrlIndex(urlIndexRef.current); - Header will update later
      
      // Type URL
      let charIndex = 0;
      clearInterval(timersRef.current.typeInterval);
      timersRef.current.typeInterval = setInterval(() => {
        if (charIndex <= currentUrl.length) {
          setUrlText(currentUrl.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(timersRef.current.typeInterval);
          
          // Wait a bit, then transition to sim
          clearTimeout(timersRef.current.timer);
          timersRef.current.timer = setTimeout(() => {
            setPhase('sim');
            // Update header URL only when simulation starts
            setCurrentUrlIndex(urlIndexRef.current);
            // Increment ref for next cycle
            urlIndexRef.current = (urlIndexRef.current + 1) % urls.length;
          }, 800);
        }
      }, 180);

      // Total cycle length: 16s
      clearTimeout(timersRef.current.cycleTimer);
      timersRef.current.cycleTimer = setTimeout(() => {
        startCycle();
      }, 16000);
    };

    startCycle();

    return () => {
      clearInterval(timersRef.current.typeInterval);
      clearTimeout(timersRef.current.timer);
      clearTimeout(timersRef.current.cycleTimer);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col justify-start pt-0">
      {/* Background Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Reorganized Bento Layout */}
      <div className="relative w-full max-w-[560px] mx-auto flex flex-col gap-4">
        
        {/* Row 1: Unified Persona Card */}
        <div className="w-full animate-float" style={{ animationDelay: '0s' }}>
          <div className="p-6 rounded-3xl bg-card/90 backdrop-blur-xl border border-border shadow-xl flex justify-between items-center gap-4">
            <div className="text-xs uppercase tracking-[0.2em] text-foreground/60 font-bold vertical-text border-r border-border pr-4 hidden sm:block">
              Active Personas
            </div>
            
            <div className="flex-1 flex justify-around items-center">
              {[
                { name: 'Jen, 28', quality: 'Impatient', grad: 'from-primary to-primary-glow', color: 'text-primary-glow', bg: 'bg-primary/10' },
                { name: 'Randall, 55', quality: 'Skeptical', grad: 'from-indigo-500 to-blue-400', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { name: 'Marcus, 34', quality: 'Methodical', grad: 'from-purple-500 to-pink-400', color: 'text-purple-400', bg: 'bg-purple-500/10' }
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center text-center px-2 group">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${p.grad} border border-border shadow-lg mb-2 transition-transform duration-300 group-hover:scale-110`} />
                  <div className="text-base font-bold text-foreground mb-0.5">{p.name.split(',')[0]}</div>
                  <div className={`text-xs ${p.color} font-bold uppercase tracking-widest ${p.bg} px-1.5 py-1 rounded-full`}>{p.quality}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Enhanced Browser Simulation with Entry Phase */}
        <div className="w-full h-[240px] animate-float" style={{ animationDelay: '0.2s' }}>
          <div className="relative p-0 rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-2xl h-full overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-muted">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/40" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                <div className="w-2 h-2 rounded-full bg-green-500/40" />
              </div>
              <div className="ml-4 px-3 py-1 rounded-full bg-muted text-xs text-foreground/70 font-mono flex items-center gap-2">
                {phase === 'sim' ? (
                  <>
                    <span className="w-1 h-1 rounded-full bg-primary-glow animate-pulse" />
                    {urls[currentUrlIndex]}
                  </>
                ) : (
                  <span className="opacity-20 uppercase tracking-widest text-[10px]">jurny.com</span>
                )}
              </div>
              <div className="ml-auto">
                <div className="px-2 py-0.5 rounded-full bg-primary/20 border border-primary/20 text-xs text-primary-glow font-bold uppercase">
                  {phase === 'url' ? 'Ready' : 'Parallel Sim'}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="relative h-[calc(100%-44px)] overflow-hidden">
              {/* Phase 1: URL Entry UI */}
              <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center p-8 transition-all duration-700 ${
                phase === 'url' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}>
                <div className="w-full max-sm px-4 space-y-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="w-full h-12 bg-muted border border-border rounded-xl flex items-center px-12 text-base text-foreground/80 font-mono overflow-hidden">
                      {urlText}
                      <span className="w-1 h-4 bg-primary-glow ml-1 animate-pulse" />
                    </div>
                    {urlText === '' && (
                      <div className="absolute left-12 top-1/2 -translate-y-1/2 text-foreground/40 text-base font-mono">
                        website to test
                      </div>
                    )}
                  </div>
                  
                  <button className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group">
                    Start Simulation
                    <div className="w-4 h-4 rounded-full bg-primary-foreground/20 flex items-center justify-center group-active:scale-90 transition-transform">
                      <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-ping" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Phase 2: Browser Simulation */}
              <div className={`absolute inset-0 transition-all duration-1000 ${
                phase === 'sim' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <div className="p-8 relative h-full bg-gradient-to-b from-transparent to-primary/5">
                  <div className="flex gap-6">
                    {/* Visual Placeholder */}
                    <div className="w-24 h-24 rounded-2xl bg-muted border border-border flex-shrink-0 animate-pulse overflow-hidden relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${siteContent[currentUrlIndex].accent} opacity-50`} />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      {/* Dynamic Title */}
                      <div className="h-4 flex items-center">
                        <span className="text-sm font-bold text-foreground/90 tracking-tight">
                          {siteContent[currentUrlIndex].title}
                        </span>
                      </div>
                      
                      {/* Dynamic Description */}
                      <div className="space-y-1.5">
                        <div className="text-xs text-foreground/60 leading-tight font-light line-clamp-2">
                          {siteContent[currentUrlIndex].desc}
                        </div>
                      </div>

                      {/* Dynamic Buttons */}
                      <div className="flex gap-2 pt-2">
                        <div className="w-24 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center relative overflow-hidden group/btn-cart">
                          <span className="text-xs text-foreground/70 font-bold">{siteContent[currentUrlIndex].btn1}</span>
                          <div className="absolute inset-0 bg-primary-glow/20 animate-ui-click-ripple opacity-0" />
                        </div>
                        <div className="w-24 h-8 rounded-lg bg-muted border border-border flex items-center justify-center relative overflow-hidden group/btn-details">
                          <span className="text-xs text-foreground/60 font-bold">{siteContent[currentUrlIndex].btn2}</span>
                          <div className="absolute inset-0 bg-blue-500/10 animate-ui-click-ripple-2 opacity-0" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form elements underneath */}
                  <div className="mt-6 space-y-3">
                    <div className="h-1.5 w-24 bg-muted rounded-full" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-7 rounded-lg bg-muted border border-border" />
                      <div className="h-7 rounded-lg bg-muted border border-border" />
                    </div>
                  </div>

                  {/* Multiple Cursors */}
                  <div key={phase} className="absolute inset-0 pointer-events-none">
                    {/* Jen */}
                    <div className="absolute animate-cursor-jen top-0 left-0 z-20">
                      <div className="relative">
                        <MousePointer2 className="w-5 h-5 text-primary-glow drop-shadow-lg fill-primary/20" />
                        <div className="absolute -top-4 -right-2 px-1.5 py-0.5 rounded-md bg-primary-glow text-xs text-primary-foreground font-bold whitespace-nowrap shadow-lg">Jen</div>
                        <div className="absolute top-0 left-0 w-8 h-8 -translate-x-1/4 -translate-y-1/4 rounded-full border border-primary-glow/50 scale-0 animate-ui-click-jen" />
                      </div>
                    </div>

                    {/* Randall */}
                    <div className="absolute animate-cursor-randall top-0 left-0 z-10">
                      <div className="relative">
                        <MousePointer2 className="w-5 h-5 text-blue-400 drop-shadow-lg fill-blue-500/20" />
                        <div className="absolute -top-4 -right-2 px-1.5 py-0.5 rounded-md bg-blue-500 text-xs text-white font-bold whitespace-nowrap shadow-lg">Randall</div>
                        <div className="absolute top-0 left-0 w-8 h-8 -translate-x-1/4 -translate-y-1/4 rounded-full border border-blue-400/50 scale-0 animate-ui-click-randall" />
                      </div>
                    </div>

                    {/* Marcus */}
                    <div className="absolute animate-cursor-marcus top-0 left-0 z-0">
                      <div className="relative">
                        <MousePointer2 className="w-5 h-5 text-purple-400 drop-shadow-lg fill-purple-500/20" />
                        <div className="absolute -top-4 -right-2 px-1.5 py-0.5 rounded-md bg-purple-500 text-xs text-white font-bold whitespace-nowrap shadow-lg">Marcus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Stats stuff underneath */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 h-fit animate-float" style={{ animationDelay: '0.4s' }}>
            <div className="p-4 sm:p-6 rounded-3xl bg-card/90 backdrop-blur-xl border border-border shadow-xl h-full space-y-4">
              <div>
                <div className="text-[10px] sm:text-xs uppercase tracking-widest text-foreground/60 font-bold mb-3">
                  Completion Rate
                </div>
                
                <div className="flex items-center gap-3 sm:gap-6">
                  <div className="relative w-10 h-10 sm:w-16 sm:h-16 flex-shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-foreground/10" />
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="175.9" strokeDashoffset={175.9 * (1 - 0.94)} className="text-primary-glow transition-all duration-1000" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-[10px] sm:text-sm font-bold text-foreground">94%</span>
                  </div>
                  
                <div className="flex-1 space-y-1 sm:space-y-2">
                  {[
                    { label: 'Onboarding', done: true },
                    { label: 'Nav Logic', done: true },
                    { label: 'Form Fill', done: false }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-2 h-2 sm:w-3 sm:h-3 ${step.done ? 'text-primary-glow' : 'text-foreground/30'}`} />
                      <span className={`text-[8px] sm:text-xs ${step.done ? 'text-foreground/80' : 'text-foreground/60'}`}>{step.label}</span>
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-6 h-fit animate-float" style={{ animationDelay: '0.6s' }}>
            <div className="p-4 sm:p-6 rounded-3xl bg-card/90 backdrop-blur-xl border border-border shadow-xl overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest text-primary-glow font-bold">Conversion Rate</div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mt-1">24.8%</div>
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
        
        /* Cursors on 16s cycle - Simplified subtle movement */
        @keyframes cursor-jen {
          0%, 24% { transform: translate(450px, 150px); opacity: 0; }
          26% { opacity: 1; }
          32% { transform: translate(200px, 57px); } /* Move directly to Primary Button */
          35% { transform: translate(200px, 57px) scale(0.8); } /* Click */
          37% { transform: translate(200px, 57px) scale(1); }
          44% { transform: translate(240px, 80px); opacity: 0; } /* Subtle drift exit */
          100% { transform: translate(240px, 80px); opacity: 0; }
        }
        
        @keyframes cursor-randall {
          0%, 28% { transform: translate(400px, 50px); opacity: 0; }
          30% { opacity: 1; transform: translate(400px, 50px); }
          45% { transform: translate(150px, 60px); } /* Single drift point near image */
          65% { transform: translate(304px, 57px); } /* Move to Secondary Button */
          68% { transform: translate(304px, 57px) scale(0.9); } /* Click */
          70% { transform: translate(304px, 57px) scale(1); }
          82% { transform: translate(350px, 100px); opacity: 0; } /* Exit */
          100% { transform: translate(350px, 100px); opacity: 0; }
        }

        @keyframes cursor-marcus {
          0%, 32% { transform: translate(50px, 150px); opacity: 0; }
          34% { opacity: 1; transform: translate(30px, 20px); }
          55% { transform: translate(180px, 25px); } /* Scan title across */
          75% { transform: translate(60px, 130px); } /* Move down to form area */
          92% { transform: translate(120px, 200px); opacity: 0; } /* Exit */
          100% { transform: translate(120px, 200px); opacity: 0; }
        }

        @keyframes ui-click-jen {
          34% { transform: scale(0); opacity: 0; }
          35% { transform: scale(1); opacity: 1; }
          41% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes ui-click-randall {
          67% { transform: scale(0); opacity: 0; }
          68% { transform: scale(1); opacity: 1; }
          74% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes ui-click-ripple {
          35% { opacity: 1; transform: scale(1); }
          43% { opacity: 0; transform: scale(1.5); }
        }
        @keyframes ui-click-ripple-2 {
          68% { opacity: 1; transform: scale(1); }
          76% { opacity: 0; transform: scale(1.5); }
        }

        .animate-cursor-jen { animation: cursor-jen 16s ease-in-out infinite; }
        .animate-cursor-randall { animation: cursor-randall 16s ease-in-out infinite; }
        .animate-cursor-marcus { animation: cursor-marcus 16s ease-in-out infinite; }
        .animate-ui-click-jen { animation: ui-click-jen 16s ease-in-out infinite; }
        .animate-ui-click-randall { animation: ui-click-randall 16s ease-in-out infinite; }
        .animate-ui-click-ripple { animation: ui-click-ripple 16s ease-in-out infinite; }
        .animate-ui-click-ripple-2 { animation: ui-click-ripple-2 16s ease-in-out infinite; }
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
