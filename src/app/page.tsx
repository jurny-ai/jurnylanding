import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Results from "@/components/Results";
import ModelPipeline from "@/components/ModelPipeline";
import VariantPrediction from "@/components/VariantPrediction";
import CohortFriction from "@/components/CohortFriction";
import Outcomes from "@/components/Outcomes";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollTracker from "@/components/ScrollTracker";

export default function Home() {
  return (
    // overflow-x-clip, not overflow-x-hidden: `hidden` on one axis forces the
    // other axis to `auto`, which makes this div a scroll container and stops
    // the pinned sequence in ModelPipeline from ever sticking. `clip` contains
    // the same overflow without creating a scrollport.
    <div className="min-h-screen bg-background overflow-x-clip">
      <Header />
      <Hero />
      <Results />
      <Outcomes />
      <VariantPrediction />
      <CohortFriction />
      <ModelPipeline />
      <FAQ />
      <Footer />
      <ScrollTracker />
    </div>
  );
}
