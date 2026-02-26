import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductDemo from "@/components/ProductDemo";
import ROICalculator from "@/components/ROICalculator";
import Footer from "@/components/Footer";
import PathfindingBackground from "@/components/PathfindingBackground";
import { track } from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 100];

const Index = () => {
  const reached = useRef(new Set<number>());

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      const pct = Math.round((scrolled / total) * 100);
      for (const milestone of SCROLL_MILESTONES) {
        if (pct >= milestone && !reached.current.has(milestone)) {
          reached.current.add(milestone);
          track("scroll_depth", { depth: `${milestone}%` });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* <PathfindingBackground /> */}
      <Header />
      <Hero />
      <ProductDemo />
      <ROICalculator />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
