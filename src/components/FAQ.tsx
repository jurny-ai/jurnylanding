"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can Jurny catch problems during the design process?",
    answer:
      "Yes. Jurny can evaluate prototypes and staging builds before launch, helping teams validate product decisions while changes are still low-cost.",
  },
  {
    question: "How deep does a Jurny run go?",
    answer:
      "Jurny is closer to a user testing session than a surface-level scan. Each synthetic user follows a goal through the product, producing findings based on journey-level behavior.",
  },
  {
    question: "As the app changes, does Jurny act like a new or returning user?",
    answer:
      "Both. Jurny can simulate first-time users or returning users with retained context across sessions.",
  },
  {
    question: "How frequently can teams run Jurny?",
    answer:
      "As needed. Teams typically run Jurny when workflows change, before release milestones, or when a product decision needs validation.",
  },
  {
    question: "What can Jurny test?",
    answer:
      "Jurny can test prototypes, dev links, staging builds, and live products, with runs focused on the workflows that matter most.",
  },
  {
    question: "What does a product team get back?",
    answer:
      "Teams receive prioritized findings, voice-of-customer style feedback, replayable evidence, and recommendations for product, design, or engineering work.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-12 sm:py-16 bg-background scroll-mt-14 sm:scroll-mt-16" aria-labelledby="faq-title">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-secondary rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12">
            <div className="mb-8 sm:mb-12">
              <h2
                id="faq-title"
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight"
              >
                FAQ
              </h2>
            </div>

            <div className="rounded-2xl sm:rounded-3xl bg-card border border-primary/15 px-3 py-1 sm:px-7 sm:py-4">
              <Accordion type="single" collapsible>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger className="text-left text-sm font-semibold leading-snug text-foreground hover:no-underline py-4 sm:text-lg sm:py-4 [&>svg]:shrink-0">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pr-2 sm:pr-8 text-sm leading-relaxed text-foreground/65 sm:text-base pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
