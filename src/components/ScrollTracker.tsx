"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 100];

export default function ScrollTracker() {
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

  return null;
}
