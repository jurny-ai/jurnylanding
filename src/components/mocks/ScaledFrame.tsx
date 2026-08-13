"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScaledFrameProps {
  /** Intrinsic size the children are laid out at, in CSS pixels. */
  width: number;
  /** Frame height, which sets the aspect ratio and what gets clipped. */
  height: number;
  /** Height the children lay out at, when it differs from the frame height,
   *  i.e. when the frame is a window onto a taller page. Defaults to `height`. */
  contentHeight?: number;
  /** Scroll position of that window, in intrinsic pixels. */
  offsetY?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Renders fixed-size markup scaled to fill its container.
 *
 * The mocks are built at one intrinsic size so their internal proportions never
 * reflow. That is what lets a heatmap address them in percentages and still land
 * on the right button at every breakpoint.
 *
 * Measured rather than computed in CSS: `transform: scale(calc(100cqw / 680))`
 * looks tempting but is invalid, because that expression resolves to a length
 * and `scale()` takes a number, so the transform is dropped and the mock renders
 * at full size inside a smaller box. useLayoutEffect runs before paint, so there
 * is no flash of an unscaled frame after hydration.
 */
export default function ScaledFrame({
  width,
  height,
  contentHeight = height,
  offsetY = 0,
  className,
  children,
}: ScaledFrameProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    const measure = () => {
      const w = node.clientWidth;
      if (w > 0) setScale(w / width);
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={hostRef}
      className={cn("scaled-frame relative w-full overflow-hidden", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="scaled-frame__inner absolute left-0 origin-top-left"
        style={{ width, height: contentHeight, top: -offsetY * scale, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
