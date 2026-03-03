import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductDemo from "@/components/ProductDemo";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import ScrollTracker from "@/components/ScrollTracker";

const ROICalculator = dynamic(() => import("@/components/ROICalculator"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ProductDemo />
      <ROICalculator />
      <Features />
      <Footer />
      <ScrollTracker />
    </div>
  );
}
