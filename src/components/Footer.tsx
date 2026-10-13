"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import { track } from "@/lib/analytics";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 text-center md:text-left">
            {/* Brand */}
            <div className="flex items-center justify-center gap-4">
              <img
                src="/lovable-uploads/bb454a78-d8c4-4776-aa28-246c06947dfc.png"
                alt="Jurny Logo"
                className="h-6 opacity-80"
              />
            </div>

            {/* Centered Description Text */}
            <div className="flex-1 md:text-center">
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg">
                One user model. Predict your tests, find customer friction.
              </p>
            </div>

            {/* Work with Us Button */}
            <div className="flex items-center w-full sm:w-auto justify-center">
              <Button size="lg" className="h-auto w-full justify-center rounded-none bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90 sm:w-auto" asChild>
              <a href="https://calendly.com/jurny-ai/new-meeting" onClick={() => track("cta_clicked", { location: "footer", label: "Get Started" })}>
                Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            </div>
          </Reveal>

          <nav
            aria-label="Contact emails"
            className="mt-8 flex flex-col items-center gap-2 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8"
          >
            {[
              ["Support", "support@usejurny.com"],
              ["Privacy", "privacy@usejurny.com"],
              ["Security", "security@usejurny.com"],
            ].map(([label, email]) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="inline-flex min-h-11 flex-wrap items-center justify-center gap-x-2 text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => track("nav_footer_clicked", { label: `${label} email` })}
              >
                <span className="font-medium">{label}:</span>
                <span>{email}</span>
              </a>
            ))}
          </nav>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-6 text-sm text-foreground/40 sm:mt-16 sm:flex-row sm:justify-between sm:pt-8">
            <span>© 2026 Jurny AI, Inc. All rights reserved.</span>
            <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {[
                ["Careers", "/careers"],
                ["Support", "/support"],
                ["Privacy", "/privacy"],
                ["Subprocessors", "/privacy#subprocessors"],
                ["Terms", "/terms"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="font-medium text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => track("nav_footer_clicked", { label })}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
