"use client";

import { Slot } from "@radix-ui/react-slot";
import { useEffect, useRef, useState } from "react";

type RevealDirection = "up" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in milliseconds, applied as a transition delay. */
  delay?: number;
  direction?: RevealDirection;
  /** Merge the reveal onto the child element instead of rendering a wrapper div. */
  asChild?: boolean;
}

const Reveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  asChild = false,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Older browsers and any environment without the observer just show content.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      className={className}
      data-reveal={direction}
      data-visible={visible ? "true" : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
};

export default Reveal;
