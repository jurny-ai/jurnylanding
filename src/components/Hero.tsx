"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import QualificationFlow from "@/components/QualificationFlow";
import HeroDotGrid from "@/components/HeroDotGrid";
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
    <section
      id="top"
      className="relative overflow-hidden bg-primary pt-16 text-primary-foreground scroll-mt-14 sm:pt-[4.5rem] sm:scroll-mt-16"
    >
      <HeroDotGrid />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <Reveal className="mx-auto flex max-w-5xl flex-col items-center">
            <a
              href="https://www.unusual.vc/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("badge_clicked", { badge: "unusual_ventures" })}
              className="mb-8 inline-flex max-w-full cursor-pointer items-center border border-white bg-white px-4 py-2 text-muted-foreground transition-colors hover:bg-white/90 sm:px-5"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:text-[10px] sm:tracking-[0.2em]">
                Backed by Unusual Ventures
              </span>
            </a>

            <h1 className="mb-6 text-[2.25rem] font-medium leading-[0.96] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.5rem]">
              Your customers on demand
            </h1>

            <p className="mb-9 max-w-3xl text-lg font-semibold leading-snug text-highlight sm:mb-11 sm:text-2xl">
              Simulate real users to see what wins and who&apos;s struggling, before it costs you a conversion
            </p>

            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <Button
                size="lg"
                className="h-auto w-full justify-center rounded-none border border-white bg-white px-8 py-4 text-sm font-bold text-primary hover:bg-white/90 sm:w-auto"
                asChild
              >
                <a
                  href="https://calendly.com/jurny-ai/new-meeting"
                  onClick={() => track("cta_clicked", { location: "hero", label: "Book a Demo" })}
                >
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
        </div>
      </div>
      <QualificationFlow open={qualificationOpen} onOpenChange={setQualificationOpen} />
    </section>
  );
};

export default Hero;
