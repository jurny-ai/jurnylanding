import { Button } from "@/components/ui/button";
import { Users, Menu, X } from "lucide-react";
import { useState } from "react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold">JurnyAI Dashboard - User Simulation</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">Simulations</Button>
          <Button variant="ghost">Analytics</Button>
          <Button>Sign In</Button>
        </nav>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <Button variant="ghost" className="justify-start">Dashboard</Button>
            <Button variant="ghost" className="justify-start">Simulations</Button>
            <Button variant="ghost" className="justify-start">Analytics</Button>
            <Button className="justify-start">Sign In</Button>
          </nav>
        </div>
      )}
    </header>;
};
export default Header;