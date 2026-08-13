"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * How far a tall element has travelled through the viewport, 0 when its top
 * reaches the top of the screen and 1 when its bottom does. Reads are gated
 * behind a single rAF so a fast scroll never queues more than one layout read.
 */
export function useScrollProgress(ref: RefObject<HTMLElement>, enabled = true) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) {
        setProgress(0);
        return;
      }
      const raw = -rect.top / travel;
      setProgress(raw < 0 ? 0 : raw > 1 ? 1 : raw);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref, enabled]);

  return enabled ? progress : 0;
}
