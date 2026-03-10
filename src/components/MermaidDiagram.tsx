"use client";

import { useEffect, useId, useRef } from "react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const renderDiagram = async () => {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
        },
      });

      const { svg } = await mermaid.render(`mermaid-${id}`, chart);
      if (isMounted && containerRef.current) {
        containerRef.current.innerHTML = svg;
        const renderedSvg = containerRef.current.querySelector("svg");
        if (renderedSvg) {
          // Expand the viewport to the true rendered bounds so long labels are not clipped.
          const bbox = renderedSvg.getBBox();
          const padding = 24;
          const width = Math.ceil(bbox.width + padding * 2);
          const height = Math.ceil(bbox.height + padding * 2);
          const x = Math.floor(bbox.x - padding);
          const y = Math.floor(bbox.y - padding);

          renderedSvg.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
          renderedSvg.setAttribute("width", `${width}`);
          renderedSvg.setAttribute("height", `${height}`);
          renderedSvg.setAttribute("preserveAspectRatio", "xMinYMin meet");

          renderedSvg.style.maxWidth = "none";
          renderedSvg.style.width = "max-content";
          renderedSvg.style.height = "auto";
          renderedSvg.style.overflow = "visible";
          renderedSvg.style.display = "block";
        }
      }
    };

    void renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto overflow-y-hidden bg-background rounded-xl border border-border p-4"
      aria-label="Flowchart diagram"
    />
  );
}
