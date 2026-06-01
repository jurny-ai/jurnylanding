import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductDemo from "@/components/ProductDemo";
import Features from "@/components/Features";
import ROICalculator from "@/components/ROICalculator";
import Results from "@/components/Results";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollTracker from "@/components/ScrollTracker";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <Hero />
      <Results />
      <ProductDemo />
      <Features />
      <ROICalculator />
      <FAQ />
      <Footer />
      <ScrollTracker />
    </div>
  );
}
