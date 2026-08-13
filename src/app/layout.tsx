import type { Metadata } from "next";
import Script from "next/script";
import Providers from "@/components/Providers";
import "@/index.css";

export const metadata: Metadata = {
  title: "Predict Your A/B Tests and Find Cohort Friction",
  description:
    "Jurny builds one model of your D2C customers from the customer data you already have, then runs synthetic users through your site. Get a directional call on every variant, and see exactly where each cohort gets stuck.",
  metadataBase: new URL("https://usejurny.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Predict Your A/B Tests and Find Cohort Friction",
    description:
      "One user model built from the customer data you already have. Synthetic users predict which variant wins before you spend traffic, and show which cohort stalls at which step.",
    url: "https://usejurny.com",
    siteName: "jurny",
    type: "website",
    images: ["/lovable-uploads/560e781d-c4c7-4e51-819a-b21fc0746540.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jurny_ai",
    title: "Predict Your A/B Tests and Find Cohort Friction",
    description:
      "Synthetic users drawn from one model of your customers. Call the winning variant before you spend traffic, and see which cohort stalls at which step.",
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
      "User model infrastructure for D2C teams. Jurny builds one model of your customers from qualitative and quantitative evidence, then runs synthetic users through your site to predict A/B test outcomes and diagnose cohort-level friction.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/lovable-uploads/560e781d-c4c7-4e51-819a-b21fc0746540.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Without JS the scroll reveal never fires, so show its content outright. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "7b48e4fec28849afa9831da11d311388"}'
          strategy="afterInteractive"
        />
        <Script id="apollo-io-website-tracker" strategy="afterInteractive">
          {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"6a3d923d97fd1700106e7ff9"})},
document.head.appendChild(o)}initApollo();`}
        </Script>
      </body>
    </html>
  );
}
