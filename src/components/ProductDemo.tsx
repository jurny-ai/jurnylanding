import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

const ProductDemo = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              See It In Action
            </h2>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Persona Creation Column */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">Persona Creation</h3>
              </div>
              
              {/* Persona UI Mockup */}
              <Card className="p-4 bg-muted/20 border h-24 flex flex-col justify-center">
                <h4 className="text-sm font-semibold text-foreground mb-2">Persona: Jen, 28</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">Dog owner looking for a durable toy for her energetic pitbull. Jen is always on the move and does a lot of shopping in between commitments...</p>
              </Card>
            </div>

            {/* Behavioral Analysis Column */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">Behavioral Analysis</h3>
              </div>
              
              {/* Abandon Goal UI Mockup */}
              <Card className="p-4 bg-muted/30 border h-24 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">12</div>
                  <div className="text-sm font-medium">Abandon goal</div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">I am short for time and 12 steps is more than how much I have patience for. I expected to be able to quickly understand the durability of the dog toy in limited clicks.</p>
              </Card>
            </div>

            {/* Actionable Insights Column */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">Actionable Insights</h3>
              </div>
              
              {/* Main Failure Message UI Mockup */}
              <Card className="p-4 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800 h-24">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold">✗</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-red-800 dark:text-red-200">Goal Failed - Purchase Abandoned</h4>
                    <p className="text-xs text-red-600 dark:text-red-300 line-clamp-1">Jen was not able to understand the durability of the dog toy in limited steps due to a complicated product comparison view.</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-red-200 dark:border-red-800">
                  <span className="text-xs text-red-600 dark:text-red-300 font-medium hover:text-red-500 transition-colors flex items-center gap-1">
                    View Analysis & Suggestions
                    <ChevronDown className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDemo;