import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const Footer = () => {
  return <footer className="bg-foreground/5 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Brand */}
            <div className="inline-flex items-center gap-2">
              <img src="/lovable-uploads/560e781d-c4c7-4e51-819a-b21fc0746540.png" alt="Jurny Logo" className="h-6 w-auto" />
              
            </div>

            {/* Work with Us Button */}
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-elegant group" asChild>
              <a href="mailto:syntheticjurny.ai@gmail.com">
                Work with Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          
        </div>
      </div>
    </footer>;
};
export default Footer;