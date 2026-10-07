import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Careers | jurny",
  description:
    "Join Jurny and build the user model. We're hiring ML researchers to push the frontier of finetuning and human-likeness in user simulation.",
  openGraph: {
    title: "Careers | jurny",
    description:
      "Join Jurny and build the user model. We're hiring ML researchers to push the frontier of finetuning and human-likeness in user simulation.",
    type: "website",
  },
};

const APPLY_EMAIL = "careers@usejurny.com";

type Role = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
};

const ROLES: Role[] = [
  {
    slug: "founding-ml-researcher-finetuning",
    title: "Founding ML Researcher, Finetuning",
    team: "Research",
    location: "San Francisco / Remote",
    type: "Full-time",
    summary:
      "Own the finetuning stack behind Jurny's user model. You'll design the training pipelines, data curation, and post-training methods that turn frontier base models into faithful simulators of real user behavior.",
    responsibilities: [
      "Lead the design and execution of our supervised and reinforcement finetuning pipelines end to end.",
      "Build data curation, filtering, and synthetic-data strategies that improve model fidelity on real user behavior.",
      "Run rigorous evaluations and ablations to understand what actually moves prediction quality.",
      "Set the technical direction for post-training as one of the first research hires.",
    ],
  },
  {
    slug: "ml-researcher-human-likeness",
    title: "ML Researcher, Human Likeness",
    team: "Research",
    location: "San Francisco / Remote",
    type: "Full-time",
    summary:
      "Make simulated users feel human. You'll research the behavioral realism of our user model, how it hesitates, gets confused, drops off, and decides, so predictions match how real people actually behave.",
    responsibilities: [
      "Define and build evaluations for behavioral realism and human-likeness of simulated users.",
      "Research modeling approaches for persona grounding, intent, and realistic friction and drop-off.",
      "Partner with the finetuning team to translate behavioral objectives into training signals.",
      "Turn messy human-behavior data into benchmarks the whole team can optimize against.",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                Careers
              </h1>
              <p className="text-muted-foreground text-lg">
                We're building the user model: one model that predicts your tests and finds
                customer friction. If pushing the frontier of user simulation sounds like your
                kind of problem, we'd love to hear from you.
              </p>
            </header>

            <div className="space-y-8">
              {ROLES.map((role) => (
                <article
                  key={role.slug}
                  className="rounded-md border border-border bg-secondary/20 p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-bold uppercase tracking-wide text-primary">
                      {role.team}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {role.location}
                    </span>
                    <span>{role.type}</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-foreground leading-snug">
                    {role.title}
                  </h2>
                  <p className="mt-3 text-foreground/70 leading-relaxed">{role.summary}</p>

                  <div className="mt-6">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-foreground/45 mb-3">
                      What you'll do
                    </h3>
                    <ul className="space-y-2">
                      {role.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-sm text-foreground/70 leading-relaxed"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <a
                      href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
                        `Application: ${role.title}`
                      )}`}
                      className="inline-flex items-center gap-2 rounded-none bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
                    >
                      Apply for this role
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-md border border-border bg-secondary/20 p-6 sm:p-8 text-center">
              <p className="text-foreground/70 leading-relaxed">
                Don't see the right role? We're always looking for exceptional people. Reach out at{" "}
                <a
                  href={`mailto:${APPLY_EMAIL}`}
                  className="font-medium text-primary hover:underline"
                >
                  {APPLY_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
