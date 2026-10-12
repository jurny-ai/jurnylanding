import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support | Jurny",
  description:
    "Get help with Jurny account access, onboarding, data preparation, custom models, simulations, technical issues, and billing.",
  alternates: { canonical: "/support" },
};

const SUPPORT_EMAIL = "support@usejurny.com";
const SECURITY_EMAIL = "security@usejurny.com";

const helpTopics = [
  "Account access and onboarding",
  "Preparing and submitting data",
  "Custom model setup and configuration",
  "Running simulations and reviewing results",
  "Technical issues and unexpected platform behavior",
  "Billing and service questions",
];

const reportDetails = [
  "Your name, company, and account email",
  "A short description of the issue",
  "The project or simulation affected, if applicable",
  "When the issue occurred, including your time zone",
  "Relevant screenshots or error messages",
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 pt-24 sm:pt-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>

            <header className="border-b border-border pb-10 sm:pb-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Support
              </p>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                Need help with Jurny?
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-foreground/65 sm:text-lg sm:leading-8">
                Contact us at{" "}
                <a
                  className="font-medium text-primary underline-offset-4 hover:underline"
                  href={`mailto:${SUPPORT_EMAIL}`}
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                or reach out to your designated Jurny contact.
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Jurny support request")}`}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Email support
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </header>

            <div className="grid gap-x-14 lg:grid-cols-2">
              <section className="border-b border-border py-10 sm:py-12 lg:border-r lg:pr-14">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">01</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                  What we can help with
                </h2>
                <ul className="mt-6 space-y-3 text-[15px] leading-7 text-foreground/70 sm:text-base">
                  {helpTopics.map((topic) => (
                    <li key={topic} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-primary" aria-hidden="true" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="border-b border-border py-10 sm:py-12">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">02</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                  Reporting an issue
                </h2>
                <p className="mt-5 text-[15px] leading-7 text-foreground/70 sm:text-base">
                  To help us investigate, include:
                </p>
                <ul className="mt-4 space-y-3 text-[15px] leading-7 text-foreground/70 sm:text-base">
                  {reportDetails.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-primary" aria-hidden="true" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-l-2 border-primary pl-4 text-sm leading-6 text-foreground/65">
                  Do not include passwords, API keys, or sensitive customer data in your message. If
                  we need additional data to investigate, we will coordinate an appropriate transfer
                  method.
                </p>
              </section>
            </div>

            <section className="grid gap-7 border-b border-border py-10 sm:py-12 lg:grid-cols-[48px_minmax(0,1fr)] lg:gap-8">
              <div className="flex h-12 w-12 items-center justify-center border border-border bg-secondary/50 text-primary">
                <ShieldCheck className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">03</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                  Security and privacy
                </h2>
                <p className="mt-4 max-w-3xl text-[15px] leading-7 text-foreground/70 sm:text-base">
                  To report suspected unauthorized access, a security concern, or a privacy-related
                  request, email{" "}
                  <a
                    className="font-medium text-primary underline-offset-4 hover:underline"
                    href={`mailto:${SECURITY_EMAIL}?subject=${encodeURIComponent("Security or Privacy")}`}
                  >
                    {SECURITY_EMAIL}
                  </a>{" "}
                  with “Security” or “Privacy” in the subject line. Include a brief description and a
                  way to contact you.
                </p>
              </div>
            </section>

            <section className="grid gap-5 py-10 sm:py-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">04</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
                  Support availability
                </h2>
              </div>
              <p className="text-[15px] leading-7 text-foreground/70 sm:text-base lg:pt-7">
                Support coverage and any response-time commitments are governed by your
                organization’s agreement with Jurny. Contact your designated Jurny representative
                with questions about your support arrangements.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
