import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Brand */}
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/bb454a78-d8c4-4776-aa28-246c06947dfc.png" 
                alt="Jurny Logo" 
                className="h-6 opacity-80"
              />
            </div>

            {/* Centered Description Text */}
            <div className="flex-1 text-center">
              <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
                The future of product validation through autonomous synthetic user simulation.
              </p>
            </div>

            {/* Work with Us Button */}
            <div className="flex items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-4 h-auto text-sm font-bold transition-all duration-300 shadow-xl shadow-primary/20" asChild>
              <a href="https://calendly.com/syntheticjurny-ai/new-meeting">
                Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-border text-center text-foreground/40 text-base">
            © 2026 Jurny AI, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
