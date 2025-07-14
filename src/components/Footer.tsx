import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const Footer = () => {
  return <footer className="bg-foreground/5 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Brand */}
            <div className="inline-flex items-center gap-2">
              <img 
                src="/lovable-uploads/bb454a78-d8c4-4776-aa28-246c06947dfc.png" 
                alt="Jurny Logo" 
                className="h-6 md:h-7"
              />
              
            </div>

            {/* Work with Us Button */}
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-elegant group" asChild>
              <a href="mailto:syntheticjurny.ai@gmail.com">
                Talk with Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          
        </div>
      </div>
    </footer>;
};
export default Footer;