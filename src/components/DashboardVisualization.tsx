"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipboardList, Laptop, MousePointerClick, ShoppingBag, Sparkles } from "lucide-react";

const scenarios = [
  {
    id: "ecommerce",
    label: "Ecommerce",
    title: "Product selection",
    person: "Commuter shopper",
    images: [
      "/simulation/ecommerce-step-1-catalog.png",
      "/simulation/ecommerce-step-2-product.png",
      "/simulation/ecommerce-step-3-reviews.png",
    ],
    imageAlt: "Synthetic user reviewing an ecommerce product selection flow on a phone while riding a bus",
    imageWidth: 1536,
    imageHeight: 1024,
    imagePosition: "object-center",
    accent: "#7558e8",
    softAccent: "bg-violet-500/10",
    lines: [
      "These lavender sneakers catch my eye, but I cannot tell which card is selected.",
      "Nice product page. Now I am hunting for size guidance before I choose.",
      "Reviews are here. I am scanning for comfort issues before risking the purchase.",
    ],
    traits: ["Commuter", "Comparison mindset", "Cost sensitive"],
    interaction: "touch",
    interactionClassName: "left-[62%] top-[33%] h-[45%] w-[22%]",
    touchPoints: [
      [
        { left: "50%", top: "18%" },
        { left: "48%", top: "52%" },
      ],
      [
        { left: "32%", top: "44%" },
        { left: "62%", top: "80%" },
      ],
      [
        { left: "26%", top: "52%" },
        { left: "54%", top: "72%" },
      ],
    ],
  },
  {
    id: "saas",
    label: "D2C",
    title: "Activation flow",
    person: "Operations lead",
    images: [
      "/simulation/dtc-step-1-setup.png",
      "/simulation/dtc-step-2-progress.png",
      "/simulation/dtc-step-3-ready.png",
    ],
    imageAlt: "Older woman reviewing a D2C SaaS activation dashboard at an office cubicle",
    imageWidth: 1672,
    imageHeight: 941,
    imagePosition: "object-center",
    accent: "#5577e6",
    softAccent: "bg-blue-500/10",
    lines: [
      "CampaignPilot gives me a checklist, but I am not sure which step matters first.",
      "Some items are complete. I am trying to spot what is blocking launch.",
      "This looks ready, but I still want a final preview before I publish.",
    ],
    traits: ["Operations lead", "Repeat user", "Anxious"],
    interaction: "click",
    interactionClassName: "left-[43%] top-[17%] h-[49%] w-[43%]",
    clickPaths: [
      { startLeft: "72%", startTop: "18%", endLeft: "18%", endTop: "22%" },
      { startLeft: "72%", startTop: "24%", endLeft: "42%", endTop: "48%" },
      { startLeft: "22%", startTop: "32%", endLeft: "76%", endTop: "78%" },
    ],
  },
  {
    id: "onboarding",
    label: "Onboarding",
    title: "Tablet onboarding",
    person: "At-home user",
    images: [
      "/simulation/onboarding-step-1-profile.png",
      "/simulation/onboarding-step-2-preferences.png",
      "/simulation/onboarding-step-3-confirm.png",
    ],
    imageAlt: "Black woman reviewing an account setup modal on a tablet from a living room couch",
    imageWidth: 1536,
    imageHeight: 1024,
    imagePosition: "object-center",
    accent: "#3b9b7a",
    softAccent: "bg-emerald-500/10",
    lines: [
      "Profile setup looks simple, but I am wondering why these details are needed.",
      "The preference cards feel optional. I need to know what choosing one changes.",
      "Everything is checked. I would finish if I knew I could edit this later.",
    ],
    traits: ["Tech hesitant", "Patient", "Mistrusting of healthcare"],
    interaction: "touch",
    interactionClassName: "left-[58%] top-[20%] h-[50%] w-[31%]",
    touchPoints: [
      [
        { left: "38%", top: "48%" },
        { left: "40%", top: "64%" },
      ],
      [
        { left: "28%", top: "58%" },
        { left: "70%", top: "58%" },
      ],
      [
        { left: "80%", top: "70%" },
        { left: "24%", top: "82%" },
      ],
    ],
  },
];

type Scenario = (typeof scenarios)[number];
const PLAYBACK_MS = 4200;

function InteractionOverlay({ scenario, lineIndex }: { scenario: Scenario; lineIndex: number }) {
  const isTouch = scenario.interaction === "touch";
  const touchPoints = isTouch
    ? scenario.touchPoints?.[lineIndex] ?? [{ left: "45%", top: "54%" }]
    : [];
  const clickPath = scenario.interaction === "click"
    ? scenario.clickPaths?.[lineIndex] ?? {
        startLeft: "24%",
        startTop: "24%",
        endLeft: "62%",
        endTop: "62%",
      }
    : null;

  return (
    <div className={`pointer-events-none absolute overflow-hidden rounded-3xl ${scenario.interactionClassName}`}>
      {isTouch ? (
        <>
          {touchPoints.map((point, index) => (
            <span
              key={`${point.left}-${point.top}`}
              className="absolute animate-touch-pressure rounded-full border border-white/80 bg-white/25 shadow-[0_0_24px_rgba(117,88,232,0.35)]"
              style={{
                height: index === 0 ? 36 : 30,
                width: index === 0 ? 36 : 30,
                left: point.left,
                top: point.top,
                animationDuration: `${PLAYBACK_MS}ms`,
                animationDelay: `${Math.round(index * PLAYBACK_MS * 0.3)}ms`, //testing 0.2, 0.3, was 0.38
              }}
            />
          ))}
        </>
      ) : (
        <>
          {clickPath && (
            <MousePointerClick
              className="absolute h-5 w-5 fill-primary/15 text-primary drop-shadow-sm"
              style={{
                animation: `cursor-travel ${PLAYBACK_MS}ms ease-in-out infinite`,
                ["--cursor-start-left" as string]: clickPath.startLeft,
                ["--cursor-start-top" as string]: clickPath.startTop,
                ["--cursor-end-left" as string]: clickPath.endLeft,
                ["--cursor-end-top" as string]: clickPath.endTop,
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

function GeneratedSimulationScene({
  scenario,
  lineIndex,
}: {
  scenario: Scenario;
  lineIndex: number;
}) {
  // Lock every scenario to the D2C tab's aspect ratio so all pictures render
  // at the same size; images with a different native ratio get cropped to fill.
  const aspectRatio = "1672 / 941";

  return (
    <div>
      <div className="relative">
        <div className="relative overflow-hidden rounded-[0.6rem] bg-[#eef1fb]">
          <div
            className="relative mx-auto w-full max-w-full"
            style={{ aspectRatio }}
          >
            {scenario.images.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === lineIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image}
                  alt={scenario.imageAlt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className={`h-full w-full object-cover ${scenario.imagePosition}`}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/25" />
            <InteractionOverlay scenario={scenario} lineIndex={lineIndex} />
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-4 z-20 sm:inset-x-6 sm:bottom-6">
          <div className="flex h-[72px] items-center gap-4 rounded-2xl border border-white/65 bg-white/65 px-5 py-4 text-sm font-medium leading-snug text-foreground/82 shadow-[0_18px_42px_rgba(35,38,85,0.14)] backdrop-blur-md">
            <span className="flex h-8 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {lineIndex + 1}/3
            </span>
            <span>{scenario.lines[lineIndex]}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 px-1">
        {scenario.traits.map((trait, index) => (
          <div
            key={trait}
            className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground/60 shadow-sm"
          >
            {index === 0 && <Sparkles className="h-4 w-4 text-primary" />}
            {trait}
          </div>
        ))}
      </div>
    </div>
  );
}

const DashboardVisualization = () => {
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [lineIndex, setLineIndex] = useState(0);
  const activeIndex = Math.max(
    scenarios.findIndex((scenario) => scenario.id === activeId),
    0,
  );
  const activeScenario = scenarios[activeIndex];

  const ScenarioIcon = ({ scenario, active }: { scenario: Scenario; active: boolean }) => {
    const icon = scenario.id === 'ecommerce' ? (
      <ShoppingBag className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
    ) : scenario.id === 'saas' ? (
      <Laptop className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
    ) : scenario.id === 'onboarding' ? (
      <ClipboardList className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
    ) : null;

    return (
      <div className={`hidden sm:flex h-7 w-7 shrink-0 items-center justify-center rounded-lg sm:h-8 sm:w-8 ${active ? scenario.softAccent : "bg-secondary"}`}>
        {icon}
      </div>
    );
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLineIndex((current) => {
        if (current < activeScenario.lines.length - 1) {
          return current + 1;
        }

        setActiveId(scenarios[(activeIndex + 1) % scenarios.length].id);
        return 0;
      });
    }, PLAYBACK_MS);

    return () => window.clearInterval(interval);
  }, [activeIndex, activeScenario.lines.length]);

  return (
    <div className="w-full max-w-[600px] overflow-hidden rounded-[0.75rem]">
      <div className="rounded-[0.75rem] bg-secondary p-2.5 shadow-[0_24px_70px_rgba(35,38,85,0.08)] sm:p-4">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {scenarios.map((scenario) => {
            const active = scenario.id === activeScenario.id;

            return (
              <button
                key={scenario.id}
                onClick={() => {
                  setActiveId(scenario.id);
                  setLineIndex(0);
                }}
                className={`min-w-0 rounded-2xl border px-2 py-2.5 sm:text-left transition-all sm:px-3 sm:py-3 ${
                  active
                    ? "border-primary/30 bg-card shadow-sm"
                    : "border-transparent bg-background/50 hover:bg-card"
                }`}
              >
                <div className="flex min-w-0 items-center justify-center gap-1.5 sm:justify-start sm:gap-2">
                  <ScenarioIcon scenario={scenario} active={active} />
                  <div className="min-w-0 truncate text-[11px] font-bold text-foreground sm:text-sm">
                    {scenario.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-3">
          <GeneratedSimulationScene scenario={activeScenario} lineIndex={lineIndex} />
        </div>
      </div>
      <style>{`
        @keyframes touch-pressure {
          0%, 100% { opacity: 0; transform: scale(0.45); }
          18%, 48% { opacity: 0.9; transform: scale(1); }
          64% { opacity: 0; transform: scale(1.5); }
        }

        @keyframes cursor-travel {
          0% {
            left: var(--cursor-start-left);
            top: var(--cursor-start-top);
            opacity: 0;
            transform: translate(-8px, -8px) scale(0.96);
          }
          18% {
            opacity: 0.85;
          }
          48%, 62% {
            left: var(--cursor-end-left);
            top: var(--cursor-end-top);
            opacity: 1;
            transform: translate(0, 0) scale(0.9);
          }
          82%, 100% {
            left: var(--cursor-end-left);
            top: var(--cursor-end-top);
            opacity: 0;
            transform: translate(4px, 4px) scale(1);
          }
        }

        .animate-touch-pressure { animation: touch-pressure 4.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default DashboardVisualization;
