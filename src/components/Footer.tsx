import { Users } from "lucide-react";
const Footer = () => {
  return <footer className="bg-foreground/5 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">JurnyAI</span>
              </div>
              
            </div>

            {/* Product */}
            

            {/* Company */}
            

            {/* Support */}
            
          </div>

          
        </div>
      </div>
    </footer>;
};
export default Footer;