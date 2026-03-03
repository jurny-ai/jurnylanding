import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/components/Providers";
import "@/index.css";

export const metadata: Metadata = {
  title: "jurny.ai — Synthetic Users to Reveal Customer Friction, Product Gaps & Revenue Leaks",
  description:
    "jurny.ai deploys AI-powered synthetic users to simulate real behavior on your product before launch. Discover customer friction, product gaps, revenue leaks, and churn risks at scale.",
  metadataBase: new URL("https://usejurny.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "jurny.ai — AI-Powered Synthetic User Simulation",
    description:
      "Deploy synthetic users to simulate real behavior on your website or app. Reveal customer friction, product gaps, and revenue leaks before real users ever touch your product.",
    url: "https://usejurny.com",
    siteName: "jurny.ai",
    type: "website",
    images: ["/lovable-uploads/560e781d-c4c7-4e51-819a-b21fc0746540.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jurny_ai",
    title: "jurny.ai — Synthetic Users to Validate UX Decisions",
    description:
      "Simulate how real users will behave before they ever touch your product. AI-powered personas reveal friction, gaps, and revenue leaks at scale.",
    images: ["/lovable-uploads/560e781d-c4c7-4e51-819a-b21fc0746540.png"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "jurny.ai",
    url: "https://usejurny.com",
    description:
      "AI-powered synthetic user simulation platform. Deploy targeted personas, simulate user behaviors at scale, and discover actionable insights to improve user journeys.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Book a demo",
    },
    creator: {
      "@type": "Organization",
      name: "jurny.ai",
      url: "https://usejurny.com",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/lovable-uploads/560e781d-c4c7-4e51-819a-b21fc0746540.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "7b48e4fec28849afa9831da11d311388"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
