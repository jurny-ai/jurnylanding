import Reveal from "@/components/Reveal";

/**
 * A single static strip rather than a card row: three advisors is too few to
 * fill a section, and the credentials read fastest as one line high on the
 * page, while the reader is still deciding whether to trust us.
 */
const ADVISORS = [
  { name: "Shrenik Shah", role: "Head of Product", company: "Wayfair" },
  { name: "Sumita Daga", role: "Director", company: "Walmart" },
  { name: "Will Guyeskey", role: "Director of Digital", company: "GoPro" },
];

const Advisors = () => {
  return (
    <section id="advisors" className="scroll-mt-14 border-y border-border bg-background py-6 sm:scroll-mt-16 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal asChild>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center lg:flex-row lg:justify-center lg:gap-10">
            <p className="shrink-0 text-sm font-bold uppercase tracking-[0.14em] text-primary">
              Advised by
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3">
              {ADVISORS.map((advisor, i) => (
                <div key={advisor.company} className="flex items-center gap-6">
                  {i > 0 && (
                    <span aria-hidden className="hidden h-1.5 w-1.5 shrink-0 bg-highlight sm:block" />
                  )}
                  <span className="text-lg font-medium tracking-tight text-foreground/70 sm:text-xl">
                    <span className="font-semibold text-foreground">{advisor.name}</span>
                    {", "}
                    {advisor.role}, {advisor.company}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Advisors;
