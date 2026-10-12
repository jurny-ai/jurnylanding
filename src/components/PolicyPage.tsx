import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export type PolicySection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: PolicySection[];
};

export default function PolicyPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: PolicyPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20 pt-24 sm:pt-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/"
              className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>

            <header className="max-w-3xl border-b border-border pb-10 sm:pb-12">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {eyebrow}
              </p>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-foreground/65 sm:text-lg sm:leading-8">
                {description}
              </p>
              <p className="mt-5 text-sm text-muted-foreground">Last updated: {updated}</p>
            </header>

            <div className="grid gap-12 pt-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
              <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="On this page">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-foreground/45">
                  On this page
                </p>
                <nav>
                  <ol className="space-y-1 border-l border-border">
                    {sections.map((section, index) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block py-1.5 pl-4 text-sm leading-5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {index + 1}. {section.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <article className="min-w-0 max-w-3xl">
                {sections.map((section, index) => (
                  <section
                    id={section.id}
                    key={section.id}
                    className="scroll-mt-24 border-b border-border py-9 first:pt-0 last:border-0 last:pb-0"
                  >
                    <div className="mb-4 flex items-baseline gap-3">
                      <span className="text-xs font-bold tabular-nums text-primary" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">
                        {section.title}
                      </h2>
                    </div>
                    <div className="space-y-4 text-[15px] leading-7 text-foreground/70 sm:text-base">
                      {section.content}
                    </div>
                  </section>
                ))}
              </article>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
