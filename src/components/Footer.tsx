import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#0f1110] border-t border-white/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <img 
                src="/lovable-uploads/bb454a78-d8c4-4776-aa28-246c06947dfc.png" 
                alt="Jurny Logo" 
                className="h-6 brightness-0 invert opacity-80"
              />
              <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
                The future of UX research through autonomous synthetic user simulation.
              </p>
            </div>

            {/* Work with Us Button */}
            <div className="flex flex-col items-center md:items-end gap-6">
              <Button size="lg" className="bg-white hover:bg-white/90 text-black rounded-full px-8 py-4 h-auto text-sm font-bold transition-all" asChild>
              <a href="mailto:vidushi@usejurny.com">
                Talk with Us
                  <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/5 text-center text-white/20 text-xs">
            © 2026 Jurny AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
