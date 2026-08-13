"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardVisualization from "@/components/DashboardVisualization";
import QualificationFlow from "@/components/QualificationFlow";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

const Hero = () => {
  const [qualificationOpen, setQualificationOpen] = useState(false);

  const openQualification = () => {
    track("qualification_started", { location: "hero" });
    setQualificationOpen(true);
  };

  return (
    <section id="top" className="relative overflow-hidden bg-primary pt-16 text-primary-foreground sm:pt-[4.5rem] scroll-mt-14 sm:scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative max-w-7xl mx-auto overflow-hidden px-4 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

            {/* Left Column: Text Content */}
            <Reveal className="text-left max-w-3xl">
              {/* Logo + AI Badge */}
              <a
                href="https://www.unusual.vc/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("badge_clicked", { badge: "unusual_ventures" })}
                className="mb-7 inline-flex max-w-full cursor-pointer flex-wrap items-center gap-2 border border-highlight bg-highlight px-4 py-2 text-highlight-foreground transition-colors hover:bg-highlight/85 sm:gap-3 sm:px-5"
              >
                <img src="/unusual-ventures.png" alt="Unusual Ventures Logo" className="h-2.5 sm:h-3 opacity-80 shrink-0" />
                <div className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.2em] font-bold text-foreground">
                  Backed by Unusual Ventures
                </span>
              </a>

              {/* Main headline */}
              <h1 className="mb-5 text-[2.65rem] font-medium leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.7rem]">
                One user model. Every product decision.
              </h1>

              {/* Subheadline */}
              <p className="mb-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-xl sm:mb-10">
                Turn unstructured customer data into one model you can use to ask questions, run A/B tests, and simulate real customer journeys.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-start">
                <Button size="lg" className="h-auto w-full justify-center rounded-none border border-white bg-white px-8 py-4 text-sm font-bold text-primary hover:bg-white/90 sm:w-auto" asChild>
                  <a href="https://calendly.com/jurny-ai/new-meeting" onClick={() => track("cta_clicked", { location: "hero", label: "Book a Demo" })}>
                    Book a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-auto w-full justify-center rounded-none border-highlight bg-highlight px-8 py-4 text-sm font-bold text-highlight-foreground hover:bg-highlight/85 hover:text-highlight-foreground sm:w-auto"
                  onClick={openQualification}
                >
                  Try for free
                </Button>
              </div>
            </Reveal>

            {/* Right Column: Product visualization */}
            <Reveal delay={150} className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
              <DashboardVisualization />
            </Reveal>

          </div>

        </div>
      </div>
      <QualificationFlow open={qualificationOpen} onOpenChange={setQualificationOpen} />
    </section>
  );
};

export default Hero;
