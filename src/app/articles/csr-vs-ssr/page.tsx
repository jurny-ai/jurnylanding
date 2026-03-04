import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Your Website Looks Amazing. Can Anyone Actually Find It? — jurny.ai",
  description:
    "Client-side rendered sites are invisible to Google and ChatGPT crawlers. Learn the difference between CSR and SSR, when each matters, and how Next.js lets you use both.",
  openGraph: {
    title: "Your Website Looks Amazing. Can Anyone Actually Find It?",
    description:
      "Client-side rendered sites are invisible to Google and ChatGPT crawlers. Learn the difference between CSR and SSR, when each matters, and how Next.js lets you use both.",
    type: "article",
  },
};

export default function CsrVsSsrPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Your Website Looks Amazing. Can Anyone Actually Find It?
              </h1>
            </header>

            <div className="prose prose-lg max-w-none space-y-8 text-foreground">
              <p className="text-foreground/90 leading-relaxed">
                Every few hours I am reminded of just how cool it is that we can generate code based on a few prompts. More than anything, it&rsquo;s given me so much time back. Things that would have taken hours of research, tinkering, and frankly failing, now don&rsquo;t need my in-depth focus. They kind of just happen.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                And then, a few moments later, I am reminded they kind of <strong>DON&rsquo;T</strong> just happen.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                Scrolling through Reddit, X, and LinkedIn is like walking through a modern art museum filled with micro animations, scrolling that takes me into a new world, and art made from binary. This is great. I want you to keep bringing life to their designs. However, you need to do so in a way that allows your work to be seen and discovered.
              </p>

              {/* What is CSR */}
              <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  What is Client Side Rendering (CSR)?
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  Client-side rendering sends an almost empty HTML file with JavaScript to the browser. When your website loads, it runs that JavaScript in real time on the visitor&rsquo;s machine.
                </p>

                <p className="text-sm font-semibold text-foreground/70 mb-2">What the browser actually receives first:</p>
                <pre className="bg-background rounded-xl border border-border p-4 overflow-x-auto text-sm text-foreground/80 mb-6">
                  <code>{`<!DOCTYPE html>
<html>
  <head>
    <title>My Cool Site</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="/static/js/main.abc123.js"></script>
  </body>
</html>`}</code>
                </pre>

                <p className="text-sm font-semibold text-foreground/70 mb-2">Common Frameworks</p>
                <ul className="list-disc pl-6 space-y-1 text-foreground/90 mb-4">
                  <li>Vite + React</li>
                </ul>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                  <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                    <p className="text-sm font-semibold text-primary mb-2">When CSR is the right call</p>
                    <ul className="list-disc pl-4 space-y-1 text-foreground/90 text-sm">
                      <li>SaaS dashboards and account pages</li>
                      <li>Highly interactive UI and complex animations</li>
                      <li>Apps behind a login where SEO doesn&rsquo;t matter</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4">
                    <p className="text-sm font-semibold text-destructive-foreground mb-2">When CSR will hurt you</p>
                    <ul className="list-disc pl-4 space-y-1 text-foreground/90 text-sm">
                      <li>SEO-focused landing pages</li>
                      <li>Pages benefited by being searched by AI</li>
                      <li>Content-heavy sites (blogs, docs, marketing)</li>
                      <li>Any situation where fast first-load is critical</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* The Problem */}
              <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  The Problem Often Overlooked
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  Here&rsquo;s what&rsquo;s actually happening when Google or ChatGPT crawlers visit your CSR landing page:
                </p>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  Google&rsquo;s web crawler arrives. It downloads an empty HTML shell. It sees one <code className="bg-background px-1.5 py-0.5 rounded text-sm border border-border">&lt;div id=&quot;root&quot;&gt;</code> and a script tag. It has no idea what your product does, who it&rsquo;s for, or why anyone should care.
                </p>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  This is becoming increasingly important. New research indicates that <strong>ChatGPT referral traffic is converting at 31% better than regular organic traffic.</strong> AI-referred visitors have strong intent, but only if they can actually be matched with information about your site.
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  You can try this on your own. If you have a website that is client-side rendered, try clicking &ldquo;temporary chat&rdquo; on ChatGPT, enabling the web browser tool, and asking ChatGPT what your site does. It will struggle.
                </p>
              </section>

              {/* What is SSR */}
              <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  What is Server Side Rendering (SSR)?
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  Server-side rendering does the work before the page ever reaches the visitor. When someone requests your page, the server builds the full HTML with content, headlines, copy, and structure.
                </p>

                <p className="text-sm font-semibold text-foreground/70 mb-2">What the browser actually receives:</p>
                <pre className="bg-background rounded-xl border border-border p-4 overflow-x-auto text-sm text-foreground/80 mb-6">
                  <code>{`<!DOCTYPE html>
<html>
  <head>
    <title>My Cool Site</title>
  </head>
  <body>
    <div id="root">
      <h1>Welcome to My Cool Site</h1>
      <p>This content was rendered on the server.</p>
    </div>
    <script src="/static/js/main.abc123.js"></script>
  </body>
</html>`}</code>
                </pre>

                <p className="text-foreground/90 leading-relaxed mb-4">
                  Google and ChatGPT crawlers can now see the full content immediately and can start to index your page.
                </p>

                <p className="text-sm font-semibold text-foreground/70 mb-2">Common Frameworks</p>
                <ul className="list-disc pl-6 space-y-1 text-foreground/90 mb-4">
                  <li>Next.js</li>
                  <li>Nuxt</li>
                  <li>Astro</li>
                  <li>Remix</li>
                </ul>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                  <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                    <p className="text-sm font-semibold text-primary mb-2">When SSR is the right call</p>
                    <ul className="list-disc pl-4 space-y-1 text-foreground/90 text-sm">
                      <li>SEO-focused landing pages</li>
                      <li>Content sites (blogs, docs, marketing pages)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-4">
                    <p className="text-sm font-semibold text-destructive-foreground mb-2">When SSR may not be ideal</p>
                    <ul className="list-disc pl-4 space-y-1 text-foreground/90 text-sm">
                      <li>Highly interactive apps with frequent state updates</li>
                      <li>When added server complexity or hosting cost is a concern</li>
                      <li>If every route requires a round-trip, page transitions can feel slower</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Next.js lets you mix both */}
              <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Next.js Lets You Mix Both
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  Use SSR for the parts of the website that matter for SEO&mdash;both traditional and AI based. Then use CSR for animations or interactive pieces. The flow:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-foreground/90 mb-2">
                  <li>Server sends full HTML that is content rich</li>
                  <li>Browser loads with relevant content immediately</li>
                  <li>JavaScript runs animations, interactions, and dynamic elements</li>
                </ol>
              </section>

              {/* Tools table */}
              <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  The Tools You&rsquo;re Using and What They Default To
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  If you&rsquo;re using AI tools to scaffold your projects, here&rsquo;s what&rsquo;s happening under the hood:
                </p>
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-2 font-semibold text-foreground">Tool</th>
                        <th className="text-left py-2 px-2 font-semibold text-foreground">Default Rendering</th>
                        <th className="text-left py-2 px-2 font-semibold text-foreground">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground/80">
                      <tr className="border-b border-border/50">
                        <td className="py-2 px-2">v0 + Vercel</td>
                        <td className="py-2 px-2">SSR (Next.js)</td>
                        <td className="py-2 px-2">Landing pages</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 px-2">Bolt</td>
                        <td className="py-2 px-2">CSR (Vite + React)</td>
                        <td className="py-2 px-2">Apps, dashboards</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 px-2">Lovable</td>
                        <td className="py-2 px-2">CSR (React)</td>
                        <td className="py-2 px-2">Apps, dashboards</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-2 px-2">Cursor + Vite</td>
                        <td className="py-2 px-2">CSR (Vite + React)</td>
                        <td className="py-2 px-2">Apps, dashboards</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2">Cursor + Next.js</td>
                        <td className="py-2 px-2">SSR</td>
                        <td className="py-2 px-2">Landing pages</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* What to ask */}
              <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  What to Actually Ask Your Cursor, Codex, or Claude
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  When you&rsquo;re starting a landing page project, be explicit. Drop this into your initial prompt:
                </p>
                <blockquote className="border-l-4 border-primary/40 pl-4 py-2 bg-primary/5 rounded-r-xl text-foreground/80 italic text-sm leading-relaxed mb-4">
                  &ldquo;Use Next.js App Router project. The landing page should be server-side rendered. Only use client components where interactivity or animation is specifically needed.&rdquo;
                </blockquote>
                <p className="text-foreground/90 leading-relaxed">
                  That one instruction will save you from rebuilding later.
                </p>
              </section>

              {/* Takeaway */}
              <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  The Takeaway
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  There&rsquo;s constant debates on how CSR pages actually work in a SEO context. I&rsquo;ve seen people argue that CSR is totally fine for Google but just takes some extra time to index. Others say that no matter how long, it never does as good of a job.
                </p>
                <p className="text-foreground/90 leading-relaxed">
                  From my own testing, it seems to really matter for AI web search from ChatGPT or Claude. For most basic use cases, I would suggest to start with Next.js until you find a reason to do something else.
                </p>
              </section>

              {/* Resources */}
              <section className="rounded-2xl bg-secondary/50 border border-border p-6 md:p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  Resources
                </h2>
                <p className="text-foreground/90 leading-relaxed mb-4">
                  If you&rsquo;re building with a CSR tool like Lovable and want to improve your SEO without migrating frameworks, Lovable has published a thorough guide covering sitemaps, meta tags, structured data, Open Graph images, GEO for AI crawlers, and performance tuning:
                </p>
                <a
                  href="https://docs.lovable.dev/tips-tricks/seo-geo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-background border border-border px-5 py-4 hover:border-primary/40 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Implement SEO and GEO Best Practices</p>
                    <p className="text-xs text-foreground/50 mt-0.5">docs.lovable.dev</p>
                  </div>
                  <svg className="w-4 h-4 text-foreground/30 group-hover:text-primary transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                </a>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
