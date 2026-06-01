"use client";

import { Button } from "@/components/ui/button";
import DashboardVisualization from "@/components/DashboardVisualization";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

const Hero = () => {
  return (
    <section id="top" className="relative min-h-0 lg:min-h-[600px] flex items-center overflow-hidden bg-background pt-20 sm:pt-24 pb-4 sm:pb-6 scroll-mt-14 sm:scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-24 items-start">
          
          {/* Left Column: Text Content */}
          <div className="text-left max-w-3xl pt-2 sm:pt-4">
            {/* Logo + AI Badge */}
            <a
              href="https://www.unusual.vc/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("badge_clicked", { badge: "unusual_ventures" })}
              className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-secondary mb-6 sm:mb-8 hover:bg-foreground/8 transition-colors cursor-pointer max-w-full"
            >
              <img src="/unusual-ventures.png" alt="Unusual Ventures Logo" className="h-2.5 sm:h-3 opacity-80 shrink-0" />
              <div className="w-1 h-1 bg-primary-glow rounded-full animate-pulse shrink-0" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.2em] font-bold text-foreground/60">
                Backed by Unusual Ventures
              </span>
            </a>

            {/* Main headline */}
            <h1 className="text-[1.75rem] leading-[1.12] sm:text-5xl md:text-7xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
              Agentic user testing
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              to reveal
              <br />
              <span className="bg-gradient-to-r from-primary-glow to-indigo-400 bg-clip-text text-transparent inline-block py-0.5 pr-1 sm:py-1 sm:pr-2">
                consumer friction
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-foreground/60 mb-8 sm:mb-10 leading-relaxed font-light max-w-lg">
              Jurny deploys AI agents that act like your users, continuously testing your product to surface usability issues, bugs, and fixes.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start mb-8 sm:mb-12">
              <Button size="lg" className="w-full sm:w-auto justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 h-auto text-sm font-bold transition-all duration-300" asChild>
                <a href="https://calendly.com/jurny-ai/new-meeting" onClick={() => track("cta_clicked", { location: "hero", label: "Book a Demo" })}>
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

                  {/* Right Column: Visualization */}
                  <div className="relative mx-auto w-full max-w-[560px] px-0 pt-2 sm:pt-4 lg:ml-auto">
                    <DashboardVisualization />
                  </div>

        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
