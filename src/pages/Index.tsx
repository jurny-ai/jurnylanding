import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RotateCcw, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted p-4">
      {/* Browser Window */}
      <div className="max-w-7xl mx-auto bg-background rounded-lg shadow-lg overflow-hidden">
        {/* Browser Chrome */}
        <div className="bg-muted border-b">
          {/* Browser window controls */}
          <div className="flex items-center justify-between p-3 border-b border-border/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-muted-foreground">PetToys.com - Chrome</div>
            <div className="w-12"></div>
          </div>
          
          {/* Browser navigation bar */}
          <div className="flex items-center gap-3 p-2 px-3">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <ArrowLeft className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <ArrowRight className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>
            
            {/* URL bar */}
            <div className="flex-1 flex items-center bg-background rounded-md border px-3 py-1">
              <Lock className="h-3 w-3 text-green-600 mr-2" />
              <span className="text-xs text-muted-foreground">https://</span>
              <span className="text-xs font-medium">pettoys.com</span>
              <span className="text-xs text-muted-foreground">/shop/dog-toys</span>
            </div>
            
            <div className="w-8"></div>
          </div>
        </div>

        {/* Page Content */}
        <div className="min-h-screen bg-background">
          <Header />
          <Hero />
          <Features />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
