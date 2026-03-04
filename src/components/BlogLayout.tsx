import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

interface BlogLayoutProps {
  title: string;
  subtitle?: string;
  author: {
    name: string;
    photo: string;
  };
  date: string;
  children: React.ReactNode;
}

export default function BlogLayout({
  title,
  subtitle,
  author,
  date,
  children,
}: BlogLayoutProps) {
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
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                {title}
              </h1>
              {subtitle && (
                <p className="text-muted-foreground text-lg mb-6">{subtitle}</p>
              )}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                  <img
                    src={author.photo}
                    alt={author.name}
                    width={48}
                    height={48}
                    className="block h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Written by</span>
                  <span className="text-sm font-medium text-foreground">{author.name}</span>
                  <span className="text-xs text-muted-foreground">{date}</span>
                </div>
              </div>
            </header>

            <div className="prose prose-lg max-w-none space-y-8 text-foreground">
              {children}
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
