"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, GitBranch, Globe, Map } from "lucide-react";
import { ResponsiveContainer, Sankey } from "recharts";

const sankeyData = {
  nodes: [
    { name: "AI SDR Landing\n100% (52)" },
    { name: "Pricing + ROI\n46% (24)" },
    { name: "Outbound Use Cases\n35% (18)" },
    { name: "Drop-off\n19% (10)" },
    { name: "Start Trial Form\n29% (15)" },
    { name: "Book Demo Form\n31% (16)" },
    { name: "Drop-off\n21% (11)" },
    { name: "Workspace Created\n19% (10)" },
    { name: "Demo Confirmed\n17% (9)" },
    { name: "Drop-off\n13% (7)" },
  ],
  links: [
    { source: 0, target: 1, value: 24 },
    { source: 0, target: 2, value: 18 },
    { source: 0, target: 3, value: 10 },
    { source: 1, target: 4, value: 10 },
    { source: 1, target: 5, value: 9 },
    { source: 1, target: 6, value: 5 },
    { source: 2, target: 4, value: 5 },
    { source: 2, target: 5, value: 7 },
    { source: 2, target: 6, value: 6 },
    { source: 4, target: 7, value: 10 },
    { source: 4, target: 9, value: 5 },
    { source: 5, target: 8, value: 9 },
    { source: 5, target: 9, value: 7 },
  ],
};

function isDropoffNode(name: string) {
  return name.toLowerCase().startsWith("drop-off");
}

function isSuccessNode(name: string) {
  return name.startsWith("Workspace Created") || name.startsWith("Demo Confirmed");
}

function getNodeFill(name: string) {
  if (isDropoffNode(name)) return "rgba(239, 68, 68, 0.72)";
  if (isSuccessNode(name)) return "rgba(74, 222, 128, 0.82)";
  return "rgba(163, 171, 182, 0.9)";
}

function getLinkStroke(targetName: string) {
  if (isSuccessNode(targetName)) return "rgba(134, 239, 172, 0.78)";
  if (isDropoffNode(targetName)) return "rgba(252, 165, 165, 0.58)";
  return "rgba(196, 205, 222, 0.5)";
}

function wrapText(text: string, maxChars: number) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function formatLegendLabel(name: string) {
  const [title = "", detail = ""] = name.split("\n");
  return detail ? `${title} - ${detail}` : title;
}

function SankeyNode(props: any) {
  const { x, y, width, height, payload, containerWidth, isMobile } = props;
  const name = payload?.name ?? "";
  const fill = getNodeFill(name);
  const [title = "", detail = ""] = name.split("\n");

  if (isMobile) {
    return <rect x={x} y={y} width={width} height={height} rx={2} fill={fill} stroke="rgba(255,255,255,0.22)" />;
  }

  const forceInward = x > containerWidth * 0.7;
  const textAnchor = forceInward ? "end" : "start";
  const wrappedTitle = wrapText(title, textAnchor === "end" ? 12 : 14);
  const lines = detail ? [...wrappedTitle, detail] : wrappedTitle;
  const textX = textAnchor === "start" ? x + width + 6 : x - 6;
  const lineHeight = 12;
  const textStartY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2;

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={2} fill={fill} stroke="rgba(255,255,255,0.22)" />
      <text x={textX} y={textStartY} textAnchor={textAnchor} dominantBaseline="middle" fontSize={10.5} fill="currentColor" opacity={0.82}>
        {lines.map((line: string, idx: number) => (
          <tspan key={`${line}-${idx}`} x={textX} dy={idx === 0 ? 0 : lineHeight} fontWeight={idx === 0 ? 600 : 400}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function SankeyLink(props: any) {
  const { sourceX, targetX, sourceY, targetY, sourceControlX, targetControlX, linkWidth, payload } = props;
  const targetName = payload?.target?.name ?? "";
  const isDropoff = isDropoffNode(targetName);
  const stroke = getLinkStroke(targetName);

  return (
    <path
      d={`M${sourceX},${sourceY}C${sourceControlX},${sourceY} ${targetControlX},${targetY} ${targetX},${targetY}`}
      fill="none"
      stroke={stroke}
      strokeWidth={Math.max(linkWidth, 1)}
      strokeOpacity={isDropoff ? 0.85 : 0.95}
    />
  );
}

function FlowDiscoveryPanel() {
  const discoveredPaths = [
    "AI SDR Landing -> Outbound Use Cases -> Book Demo Form -> Demo Confirmed",
    "AI SDR Landing -> Pricing + ROI -> Start Trial Form -> Workspace Created",
  ];

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-card border border-primary/15 p-4 sm:p-7 space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-primary-glow" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">Flow Discovery</div>
          </div>
        </div>
        <div className="px-2 py-1 rounded bg-primary/10 text-primary-glow text-[10px] uppercase tracking-widest font-bold">
          Running
        </div>
      </div>

      <div className="rounded-xl bg-background p-3 sm:p-4 border border-primary/10 space-y-3">
        <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold">Starting URL</div>
        <div className="h-10 rounded-lg bg-secondary border border-border px-3 flex items-center">
          <span className="text-xs sm:text-sm text-foreground/70 font-mono truncate">https://acme-ai-sales.com</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Pages scanned", value: "34" },
            { label: "Flows mapped", value: "12" },
            { label: "Persona variants", value: "6" },
          ].map((item) => (
            <div key={item.label} className="rounded-lg bg-secondary px-3 py-2 text-center">
              <div className="text-sm font-bold text-foreground">{item.value}</div>
              <div className="text-[10px] text-foreground/45">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-secondary p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Map className="w-3.5 h-3.5 text-primary-glow" />
            <span className="text-[11px] font-semibold text-foreground/70">Discovered User Paths</span>
          </div>
          <div className="space-y-1.5">
            {discoveredPaths.map((path) => (
              <div key={path} className="flex items-center gap-2">
                <GitBranch className="w-3 h-3 text-primary-glow/80 shrink-0" />
                <span className="text-[11px] text-foreground/60 truncate">{path}</span>
              </div>
            ))}
            <div className="pl-5 text-[11px] text-foreground/45 font-medium italic">... and more discovered user paths</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsPanel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-card border border-primary/15 p-4 sm:p-7 space-y-4">
      <div className="rounded-xl sm:rounded-2xl bg-[#f3f4f6] p-3 sm:p-5 border border-primary/10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-foreground">User Flow</div>
          <span className="text-[10px] uppercase tracking-widest text-primary-glow font-bold">Live map</span>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={sankeyData}
              nodePadding={isMobile ? 22 : 18}
              nodeWidth={12}
              margin={isMobile ? { top: 12, right: 24, bottom: 16, left: 8 } : { top: 12, right: 56, bottom: 16, left: 14 }}
              linkCurvature={0.52}
              node={<SankeyNode isMobile={isMobile} />}
              link={<SankeyLink />}
            />
          </ResponsiveContainer>
        </div>
        {isMobile ? (
          <div className="mt-3 rounded-lg border border-primary/10 bg-background/80 p-2.5">
            <div className="text-[10px] uppercase tracking-[0.16em] text-foreground/45 font-bold mb-2">Flow Legend</div>
            <div className="grid grid-cols-1 gap-1.5">
              {sankeyData.nodes.map((node, idx) => (
                <div key={`${node.name}-${idx}`} className="flex items-center gap-2 text-[11px] text-foreground/70">
                  <span className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: getNodeFill(node.name) }} />
                  <span className="leading-tight">{formatLegendLabel(node.name)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="grid grid-cols-4 gap-1 text-[10px] text-foreground/45 mt-1 px-1">
          <span>Step 1</span>
          <span>Step 2</span>
          <span>Step 3</span>
          <span className="text-right">Step 4</span>
        </div>
      </div>
    </div>
  );
}

function DropoffRootCausesPanel() {
  const dropoffReasons = [
    { reason: "Onboarding form feels too long on first interaction", impact: "11 users affected" },
    { reason: "Primary CTA copy is unclear at key decision points", impact: "10 users affected" },
    { reason: "Mobile layout pushes proof points below the fold", impact: "7 users affected" },
  ];

  return (
    <div className="rounded-xl sm:rounded-2xl bg-background p-3 sm:p-5 space-y-3 border border-primary/10 mt-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-foreground mb-1">Drop-offs and Root Causes</div>
        </div>
        <span className="shrink-0 px-2 py-1 rounded bg-red-500/10 text-red-500 text-[10px] font-bold">Top blockers</span>
      </div>

      <div className="space-y-2">
        {dropoffReasons.map((item) => (
          <div key={item.reason} className="flex items-center justify-between text-xs rounded-lg bg-secondary px-3 py-2">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary-glow shrink-0" />
              <span className="text-foreground/70 truncate">{item.reason}</span>
            </div>
            <span className="text-foreground/45 shrink-0">{item.impact}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end">
        <div className="flex items-center text-xs font-semibold text-primary cursor-pointer">
          Open journey replay <ArrowUpRight className="ml-1 w-3 h-3" />
        </div>
      </div>
    </div>
  );
}

const ProductDemo = () => {
  return (
    <section id="how-it-works" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-secondary rounded-3xl p-4 sm:p-8 md:p-12">

            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                How It Works
              </h2>
            </div>

            {/* Step 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-center mb-8">
              <FlowDiscoveryPanel />
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">Enter One URL</h3>
                <p className="text-foreground/55 leading-relaxed">
                  Whether it is a Figma prototype, Lovable link, or a live URL, Jurny launches autonomous agents modeled on your user personas and continuously tests every key path as your product evolves.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 items-center">
              <div className="lg:order-last">
                <ResultsPanel />
              </div>
              <div className="lg:order-first">
                <h3 className="text-2xl font-bold text-foreground mb-4 leading-tight">See Every Journey in a Visual Flow</h3>
                <p className="text-foreground/55 leading-relaxed">
                  You get a visual map of where users drop off, the likely causes, and clear suggestions to improve satisfaction, decrease churn, and increase task completion.
                </p>
                <DropoffRootCausesPanel />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
