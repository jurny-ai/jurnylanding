"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    question: "Does this replace live A/B testing?",
    answer:
      "No. Jurny runs before the test, not instead of it. It scores every variant in hours so you put live traffic behind the two with a real chance, and the live test still confirms the winner.",
  },
  {
    question: "How accurate is a directional prediction?",
    answer:
      "Directional means Jurny calls which variant wins and roughly how far apart they are, not an exact conversion rate. We calibrate against tests you have already run, so you can see how the model performed on your own history before you rely on it for the next one.",
  },
  {
    question: "What is the difference between population and individual modeling?",
    answer:
      "The population layer captures how your whole customer base behaves, including segment sizes, behavioral distributions, and price sensitivity. That is what predicts an experiment. The individual layer is one customer with memory, constraints, and intent. That is what explains why a specific cohort dropped off.",
  },
  {
    question: "What data do you need to build the model?",
    answer:
      "Whatever you already have. Interviews, support tickets, reviews, session notes, and survey verbatims on the qualitative side, plus funnel analytics, session replay, order history, and past experiment results on the quantitative side. More evidence sharpens the model, but you do not need all of it to start.",
  },
  {
    question: "Where do the cohorts come from?",
    answer:
      "Your own data. Jurny derives cohorts from the behavior in your evidence rather than from a stock persona library, and you can add the segments your team already reports on so the findings line up with how you talk about customers.",
  },
  {
    question: "Does Jurny actually use the product, or just analyze screens?",
    answer:
      "It uses the product. Each synthetic user clicks through prototypes, staging builds, or the live site to pursue a real goal, and every finding comes with the replayable session that produced it.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-14 sm:py-20 bg-background scroll-mt-14 sm:scroll-mt-16" aria-labelledby="faq-title">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div>
            <Reveal className="mb-8 sm:mb-12">
              <h2
                id="faq-title"
                className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight"
              >
                Frequently asked questions
              </h2>
            </Reveal>

            <Reveal delay={100} className="border border-border bg-secondary px-3 py-1 sm:px-7 sm:py-4">
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
