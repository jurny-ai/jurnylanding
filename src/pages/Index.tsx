import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductDemo from "@/components/ProductDemo";
import Footer from "@/components/Footer";
import PathfindingBackground from "@/components/PathfindingBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <PathfindingBackground /> */}
      <Header />
      <Hero />
      <ProductDemo />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
