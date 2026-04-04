"use client";

import { Button } from "@/components/ui/button";
import DashboardVisualization from "@/components/DashboardVisualization";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

const Hero = () => {
  return (
    <section className="relative min-h-0 lg:min-h-[780px] flex items-center overflow-hidden bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
          
          {/* Left Column: Text Content */}
          <div className="text-left max-w-3xl pt-4">
            {/* Logo + AI Badge */}
            <a
              href="https://www.unusual.vc/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("badge_clicked", { badge: "unusual_ventures" })}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary mb-8 hover:bg-foreground/8 transition-colors cursor-pointer"
            >
              <img src="/unusual-ventures.png" alt="Unusual Ventures Logo" className="h-2.5 md:h-3 opacity-80" />
              <div className="w-1 h-1 bg-primary-glow rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/60">Backed by Unusual Ventures</span>
            </a>

            {/* Main headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Autonomous usability testing <br />
              to reveal <br />
              <span className="bg-gradient-to-r from-primary-glow to-indigo-400 bg-clip-text text-transparent inline-block py-1 pr-2">
                customer friction
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-foreground/60 mb-10 leading-relaxed font-light max-w-lg">
              Jurny deploys AI agents that act like your users, continuously testing your product to surface usability issues, bugs, and fixes.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 h-auto text-sm font-bold transition-all duration-300" asChild>
                <a href="https://calendly.com/jurny-ai/new-meeting" onClick={() => track("cta_clicked", { location: "hero", label: "Book a Demo" })}>
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

                  {/* Right Column: Visualization */}
                  <div className="relative pt-4 mx-auto lg:ml-auto w-full max-w-[560px]">
                    <DashboardVisualization />
                  </div>

        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
