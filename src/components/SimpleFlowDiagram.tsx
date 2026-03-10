interface SimpleFlowDiagramProps {
  steps: string[];
}

export default function SimpleFlowDiagram({ steps }: SimpleFlowDiagramProps) {
  return (
    <div className="rounded-xl bg-background border border-border p-6 md:p-8">
      <div className="flex flex-col items-center">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div key={`${step}-${index}`} className="flex flex-col items-center">
              <div className="w-[320px] max-w-[90vw] rounded-lg border border-border bg-secondary/40 px-5 py-4 text-center text-sm md:text-base text-foreground leading-relaxed">
                {step}
              </div>
              {!isLast && (
                <div className="h-10 w-px bg-border/80 relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-muted-foreground text-xs">
                    ▼
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
