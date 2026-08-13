"use client";

import { useEffect, useState } from "react";

/**
 * Matches a media query after mount. Always starts `false` so the server render
 * and the first client render agree, then flips once the real value is known.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True once we know the viewport is wide enough for the pinned scroll sequence. */
export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
