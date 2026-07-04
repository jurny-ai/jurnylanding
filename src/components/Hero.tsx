"use client";

import { Button } from "@/components/ui/button";
import DashboardVisualization from "@/components/DashboardVisualization";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-secondary to-background pt-16 sm:pt-[4.5rem] pb-4 sm:pb-6 scroll-mt-14 sm:scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative max-w-7xl mx-auto overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-secondary via-background to-background px-4 py-6 sm:px-8 sm:py-8 lg:px-12">

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

            {/* Left Column: Text Content */}
            <div className="text-left max-w-3xl">
              {/* Logo + AI Badge */}
              <a
                href="https://www.unusual.vc/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("badge_clicked", { badge: "unusual_ventures" })}
                className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-card/70 backdrop-blur-sm mb-6 sm:mb-8 hover:bg-card transition-colors cursor-pointer max-w-full"
              >
                <img src="/unusual-ventures.png" alt="Unusual Ventures Logo" className="h-2.5 sm:h-3 opacity-80 shrink-0" />
                <div className="w-1 h-1 bg-primary-glow rounded-full animate-pulse shrink-0" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.2em] font-bold text-foreground/60">
                  Backed by Unusual Ventures
                </span>
              </a>

              {/* Main headline */}
              <h1 className="text-[2rem] leading-[1.08] sm:text-5xl md:text-6xl font-semibold text-foreground mb-4 sm:mb-6 tracking-tight">
                Agentic user testing to reveal consumer friction.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-foreground/60 mb-8 sm:mb-10 leading-relaxed max-w-lg">
                Your users as AI agents, using your product every day to catch usability issues, bugs, and drop-offs.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start">
                <Button size="lg" className="w-full sm:w-auto justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 h-auto text-sm font-bold transition-all duration-300" asChild>
                  <a href="https://calendly.com/jurny-ai/new-meeting" onClick={() => track("cta_clicked", { location: "hero", label: "Book a Demo" })}>
                    Book a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column: Visualization over the mounds */}
            <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
              <DashboardVisualization />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
