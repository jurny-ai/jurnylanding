"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { track } from "@/lib/analytics";
import QualificationFlow from "@/components/QualificationFlow";

const SECTION_LINKS = [
  { label: "A/B prediction", id: "ab-prediction" },
  { label: "Cohort friction", id: "cohort-friction" },
  { label: "How it works", id: "model" },
  { label: "FAQ", id: "faq" },
] as const;

const ARTICLE_LINKS: {
  href: string;
  label: string;
  description: string;
  isNew?: boolean;
}[] = [
  {
    href: "/articles/what-makes-ab-testing-work-in-ecommerce",
    label: "What Actually Makes A/B Testing Work in E-Commerce",
    description:
      "What separates experimentation programs that work from the ones that quietly break.",
    isNew: true,
  },
  {
    href: "/articles/designing-synthetic-personas-llm-user-simulations",
    label: "Synthetic Personas for LLM User Simulations",
    description:
      "How to design personas that make LLM user simulations behave like real users.",
  },
  {
    href: "/articles/usability-testing-problems",
    label: "The Biggest Problems With Usability Testing Today",
    description:
      "Five reasons usability testing gets skipped, and how autonomous testing fixes them.",
  },
];

const VIDEO_LINKS: {
  href: string;
  label: string;
  description: string;
}[] = [
  {
    href: "/videos",
    label: "Podcast episodes",
    description:
      "Conversations with product leaders on AI, enterprise product, and building fast.",
  },
];

const DASHBOARD_SIGNIN_URL = "https://dashboard.usejurny.com";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [qualificationOpen, setQualificationOpen] = useState(false);

  const openQualification = (location: "header" | "header_mobile") => {
    track("qualification_started", { location });
    setMenuOpen(false);
    setQualificationOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    track("nav_section_clicked", { section: sectionId });
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!isHome) return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (navigation?.type === "reload") {
      history.replaceState(null, "", window.location.pathname);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    const el = document.getElementById(hash);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [isHome, pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 text-foreground backdrop-blur-md">
      <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex shrink-0 items-center">
          <img
            src="/lovable-uploads/bb454a78-d8c4-4776-aa28-246c06947dfc.png"
            alt="Jurny Logo"
            className="h-7 sm:h-8"
          />
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-2">
          <ul className="hidden md:flex items-center gap-0.5 mr-1">
            {SECTION_LINKS.map(({ label, id }) => (
              <li key={id}>
                {isHome ? (
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="px-2.5 lg:px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    href={`/#${id}`}
                    className="px-2.5 lg:px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-1 px-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-foreground"
                >
                  Resources
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[340px] p-2">
                <p className="px-3 pt-1.5 pb-2 text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                  From the blog
                </p>
                {ARTICLE_LINKS.map(({ href, label, description, isNew }) => (
                  <DropdownMenuItem
                    key={href}
                    asChild
                    className="flex flex-col items-start gap-1 rounded-lg px-3 py-2.5 cursor-pointer focus:bg-secondary"
                  >
                    <Link href={href}>
                      <span className="flex w-full items-start gap-2">
                        <span
                          className={`text-sm font-medium leading-snug ${
                            pathname === href ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {label}
                        </span>
                        {isNew && (
                          <span className="ml-auto mt-0.5 shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                            New
                          </span>
                        )}
                      </span>
                      <span className="text-xs leading-snug text-muted-foreground">
                        {description}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <p className="px-3 pt-3 pb-2 text-[11px] font-bold uppercase tracking-widest text-foreground/45 border-t border-border mt-2">
                  Watch
                </p>
                {VIDEO_LINKS.map(({ href, label, description }) => (
                  <DropdownMenuItem
                    key={href}
                    asChild
                    className="flex flex-col items-start gap-1 rounded-lg px-3 py-2.5 cursor-pointer focus:bg-secondary"
                  >
                    <Link href={href}>
                      <span
                        className={`text-sm font-medium leading-snug ${
                          pathname === href ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {label}
                      </span>
                      <span className="text-xs leading-snug text-muted-foreground">
                        {description}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 rounded-none border-border bg-transparent px-5 text-sm font-bold text-foreground/70 hover:bg-secondary hover:text-foreground md:inline-flex"
            asChild
          >
            <a
              href={DASHBOARD_SIGNIN_URL}
              onClick={() => track("cta_clicked", { location: "header", label: "Sign In" })}
            >
              Sign In
            </a>
          </Button>

          <Button
            size="sm"
            className="hidden h-9 rounded-none bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/90 md:inline-flex"
            onClick={() => openQualification("header")}
          >
            Try for free
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-foreground/80 hover:bg-secondary hover:text-foreground md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-[320px] flex flex-col p-0">
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-border text-left">
                <SheetTitle className="text-lg font-bold">Menu</SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                <p className="px-2 mb-2 text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                  Explore
                </p>
                <nav className="flex flex-col gap-0.5">
                  {SECTION_LINKS.map(({ label, id }) =>
                    isHome ? (
                      <button
                        key={id}
                        type="button"
                        onClick={() => scrollToSection(id)}
                        className="w-full text-left px-3 py-3.5 text-base font-medium text-foreground rounded-xl hover:bg-secondary transition-colors"
                      >
                        {label}
                      </button>
                    ) : (
                      <SheetClose key={id} asChild>
                        <Link
                          href={`/#${id}`}
                          className="block px-3 py-3.5 text-base font-medium text-foreground rounded-xl hover:bg-secondary transition-colors"
                        >
                          {label}
                        </Link>
                      </SheetClose>
                    )
                  )}
                </nav>

                <p className="px-2 mt-6 mb-2 text-[11px] font-bold uppercase tracking-widest text-foreground/45">
                  Resources
                </p>
                <nav className="flex flex-col gap-0.5">
                  {ARTICLE_LINKS.map(({ href, label, description, isNew }) => (
                    <SheetClose key={href} asChild>
                      <Link
                        href={href}
                        className="block px-3 py-3 rounded-xl hover:bg-secondary transition-colors"
                      >
                        <span className="flex items-start gap-2">
                          <span className="text-sm font-medium leading-snug text-foreground">
                            {label}
                          </span>
                          {isNew && (
                            <span className="ml-auto mt-0.5 shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                              New
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                          {description}
                        </span>
                      </Link>
                    </SheetClose>
                  ))}
                  {VIDEO_LINKS.map(({ href, label, description }) => (
                    <SheetClose key={href} asChild>
                      <Link
                        href={href}
                        className="block px-3 py-3 rounded-xl hover:bg-secondary transition-colors"
                      >
                        <span className="text-sm font-medium leading-snug text-foreground">
                          {label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                          {description}
                        </span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>

              <div className="p-4 border-t border-border bg-background flex flex-col gap-2">
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-none h-12 text-sm font-bold"
                    asChild
                  >
                    <a
                      href={DASHBOARD_SIGNIN_URL}
                      onClick={() => track("cta_clicked", { location: "header_mobile", label: "Sign In" })}
                    >
                      Sign In
                    </a>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    className="w-full rounded-none bg-primary h-12 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                    onClick={() => openQualification("header_mobile")}
                  >
                    Try for free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
      <QualificationFlow open={qualificationOpen} onOpenChange={setQualificationOpen} />
    </header>
  );
};

export default Header;
