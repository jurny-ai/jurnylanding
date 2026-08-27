import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Podcast Episodes — jurny",
  description:
    "Conversations with product leaders on AI, enterprise product, and building fast, from the Jurny YouTube channel.",
  openGraph: {
    title: "Podcast Episodes — jurny",
    description:
      "Conversations with product leaders on AI, enterprise product, and building fast, from the Jurny YouTube channel.",
    type: "website",
  },
};

const VIDEOS: { id: string; title: string; description: string }[] = [
  {
    id: "DUiauck8Tp0",
    title:
      "Wayfair Product Leader on AI, Customer Centricity, Speed vs Quality, and Rethinking MVPs",
    description:
      "A Product Lead of Global Supplier Technology at Wayfair, discusses how AI is changing collaboration between PMs, designers, and engineers by speeding up repeatable tasks while leaving core competencies and complex technical/design work to each function. He explains how his teams use rapid prototyping and tools like Cursor to validate workflows with users in real time, improving recent launches and supplier satisfaction, and emphasizes that customer centricity is critical. He describes balancing supplier and customer needs through strong customer signals and storytelling, and shares leadership principles: deeply understanding customer pain points, eliminating waste, and using product reviews and detailed product teardowns. He outlines how to balance shipping fast with protecting trust and long-term architecture, advocates dogfooding and learning from support tickets, offers a hot take that MVPs are often defined by delivery constraints rather than customer value, and advises early-career PMs to seek strong mentors and managers.",
  },
  {
    id: "xbc3sBq4GQ4",
    title:
      "Navigating Product Management for Enterprise AI: From PoC to Scale, Agents, and the Future of AI",
    description:
      "A Microsoft Principal GPM managing AI infrastructure, discusses enterprise GenAI adoption, noting that moving from zero to proof of concept is fast but scaling is slower because organizations must deploy cautiously to create real business value without disrupting operations. He’s surprised by how universally and rapidly GenAI is spreading and by the dramatic generational leaps in frontier models, while warning that responsible AI considerations are still not mainstream. Goswami explains the trade-offs between using increasingly capable frontier models versus customizing or distilling models for efficiency, and highlights that agentic applications raise the importance of CPUs, networking, and data access alongside GPUs. In rapid-fire answers, he calls hallucination a model problem, predicts “job titles” disappear first, favors horizontal platforms, and says prompt engineering is overrated. He also outlines AI product management as balancing automation, augmentation, and when not to use AI.",
  },
  {
    id: "SUmtoAHp62A",
    title:
      "Atlassian Product Leader on Standalone vs Ecosystem, Enterprise PM, and Building with AI",
    description:
      "A GPM at Atlassian with experience at Microsoft and startups, discusses how successful standalone products often evolve into platforms and ecosystems through extensibility, APIs, partners, and clear investment areas. He explains balancing enterprise customer requests with broader patterns using public feedback channels and an enterprise voice-of-customer loop, and emphasizes probing the “why” behind requests (e.g., permissions vs governance outcomes). Williamson covers product-led growth, supporting champions while meeting enterprise governance, and managing differing industry needs. He outlines maintaining quality while moving fast via smaller iterative releases, experimentation, and different rollout approaches for high-risk enterprise features. He stresses PMs must combine quantitative data with direct customer empathy, understand slower enterprise adoption dynamics, and develop deep domain context to use AI effectively, focusing on value and collaborative team workflows over token consumption.",
  },
];

export default function VideosPage() {
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
                Podcast Episodes
              </h1>
              <p className="text-muted-foreground text-lg">
                Conversations with product leaders on AI, enterprise product, and building fast.
              </p>
            </header>

            <div className="space-y-16">
              {VIDEOS.map(({ id, title, description }) => (
                <article key={id}>
                  <div className="aspect-video w-full overflow-hidden rounded-md border border-border bg-secondary/30">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${id}`}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-foreground leading-snug">
                    {title}
                  </h2>
                  <p className="mt-2 text-foreground/70 leading-relaxed">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
