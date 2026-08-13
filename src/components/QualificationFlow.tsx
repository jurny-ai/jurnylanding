"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarCheck2, Check, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { track } from "@/lib/analytics";

const CALENDLY_URL = "https://calendly.com/jurny-ai/new-meeting";
const ONBOARDING_URL = "https://dashboard.usejurny.com/get-started";

const questions = [
  {
    id: "longestTest",
    title: "What was the longest A/B test you ran this quarter?",
    description: "For comparison, Jurny reaches A/B test convergence in only 1 day.",
    options: ["Less than 1 week", "1–2 weeks", "3–4 weeks", "More than 1 month"],
  },
  {
    id: "testFrequency",
    title: "How often does your team run A/B tests?",
    description: "Choose the closest answer.",
    options: ["Every week", "A few times a month", "A few times a quarter", "Rarely or never"],
  },
] as const;

type Answers = Partial<Record<(typeof questions)[number]["id"], string>>;

const qualifyingFrequencies = new Set(["Every week", "A few times a month"]);
const qualifyingTestLengths = new Set(["3–4 weeks", "More than 1 month"]);

const qualifies = (answers: Answers) =>
  qualifyingFrequencies.has(answers.testFrequency ?? "") &&
  qualifyingTestLengths.has(answers.longestTest ?? "");

type QualificationFlowProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function QualificationFlow({ open, onOpenChange }: QualificationFlowProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const complete = step === questions.length;
  const question = questions[Math.min(step, questions.length - 1)];
  const answer = answers[question.id];
  const isQualified = qualifies(answers);

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) window.setTimeout(reset, 200);
  };

  const selectAnswer = (option: string) => {
    const nextAnswers = { ...answers, [question.id]: option };
    setAnswers(nextAnswers);
    track("qualification_answered", { question: question.id, answer: option });

    if (step === questions.length - 1) {
      track("qualification_completed", { ...nextAnswers, qualified: qualifies(nextAnswers) });
    }
    setStep((current) => current + 1);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-none border-primary/20 p-0 shadow-2xl">
        <div className="h-1.5 bg-secondary">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${complete ? 100 : ((step + 1) / questions.length) * 100}%` }}
          />
        </div>

        {complete && isQualified ? (
          <div className="px-6 py-10 text-center sm:px-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-highlight text-highlight-foreground">
              <CalendarCheck2 className="h-7 w-7" />
            </div>
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle className="text-2xl font-semibold tracking-tight">Your team is a strong fit for Jurny.</DialogTitle>
              <DialogDescription className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-foreground/55">
                We work best with ecommerce teams running A/B tests at least monthly, where experiments take three weeks or longer to converge.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button className="h-12 rounded-none font-bold" asChild>
                <a
                  href={CALENDLY_URL}
                  onClick={() => track("cta_clicked", { location: "qualification_complete", label: "Choose a time", ...answers })}
                >
                  Choose a time
                </a>
              </Button>
              <Button variant="outline" className="h-12 rounded-none font-bold" asChild>
                <a
                  href={ONBOARDING_URL}
                  onClick={() => track("cta_clicked", { location: "qualification_complete", label: "Try for free", ...answers })}
                >
                  Try for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        ) : complete ? (
          <div className="px-6 py-10 text-center sm:px-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-secondary text-foreground/55">
              <Clock3 className="h-7 w-7" />
            </div>
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle className="text-2xl font-semibold tracking-tight">Jurny may not be the right fit yet.</DialogTitle>
              <DialogDescription className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-foreground/55">
                Our current focus is ecommerce teams running A/B tests at least monthly, with experiments that take three weeks or longer to converge.
              </DialogDescription>
            </DialogHeader>
            <Button
              type="button"
              variant="secondary"
              className="mt-7 h-12 w-full rounded-none font-bold"
              onClick={() => handleOpenChange(false)}
            >
              Got it
            </Button>
          </div>
        ) : (
          <div className="px-6 pb-7 pt-6 sm:px-8 sm:pb-8">
            <DialogHeader>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Question {step + 1} of {questions.length}</p>
              <DialogTitle className="pt-2 text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                {question.title}
              </DialogTitle>
              <DialogDescription className="pt-1 text-foreground/50">{question.description}</DialogDescription>
            </DialogHeader>

            <div className="mt-6 grid gap-2.5" role="radiogroup" aria-label={question.title}>
              {question.options.map((option) => {
                const selected = answer === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => selectAnswer(option)}
                    className={`flex min-h-12 items-center justify-between border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                      selected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background text-foreground/70 hover:border-primary/35 hover:bg-secondary/60"
                    }`}
                  >
                    {option}
                    <span className={`ml-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-foreground/20"}`}>
                      {selected && <Check className="h-3 w-3" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {step > 0 && (
              <Button
                type="button"
                variant="ghost"
                className="mt-6 rounded-none"
                onClick={() => setStep((current) => current - 1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
