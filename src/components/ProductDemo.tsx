import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
const ProductDemo = () => {
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!api) return;

    // Auto-scroll every 4 seconds
    const autoScroll = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Go back to first slide
      }
    }, 4000);
    return () => clearInterval(autoScroll);
  }, [api]);
  return <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            
          </div>

          {/* Auto-scroll Carousel */}
          <Carousel setApi={setApi} opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent>
              {/* Persona Creation Slide */}
              <CarouselItem>
                <div className="text-center space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Persona Creation</h3>
                  <div className="max-w-md mx-auto">
                    <Card className="p-4 bg-muted/20 border">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Persona: Jen, 28</h4>
                      <p className="text-xs text-muted-foreground">Dog owner looking for a durable toy for her energetic pitbull. Jen is always on the move and does a lot of shopping in between commitments...</p>
                    </Card>
                  </div>
                </div>
              </CarouselItem>

              {/* Behavioral Analysis Slide */}
              <CarouselItem>
                <div className="text-center space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Behavioral Analysis</h3>
                  <div className="max-w-md mx-auto">
                    <Card className="p-4 bg-muted/30 border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">12</div>
                        <div className="text-sm font-medium">Abandon goal</div>
                      </div>
                      <p className="text-xs text-muted-foreground">I am short for time and 12 steps is more than how much I have patience for. I expected to be able to quickly understand the durability of the dog toy in limited clicks.</p>
                    </Card>
                  </div>
                </div>
              </CarouselItem>

              {/* Actionable Insights Slide */}
              <CarouselItem>
                <div className="text-center space-y-6">
                  <h3 className="text-xl font-bold text-foreground">Actionable Insights</h3>
                  <div className="max-w-md mx-auto">
                    <Card className="p-4 bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold">✗</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-red-800 dark:text-red-200">Goal Failed - Purchase Abandoned</h4>
                          <p className="text-xs text-red-600 dark:text-red-300">Jen was not able to understand the durability of the dog toy in limited steps due to a complicated product comparison view.</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-red-200 dark:border-red-700">
                        <button className="text-xs text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200 font-medium">
                          View Analysis & Suggestions
                        </button>
                      </div>
                    </Card>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2].map(index => <button key={index} className="w-2 h-2 rounded-full bg-muted-foreground/30 transition-colors" onClick={() => api?.scrollTo(index)} />)}
            </div>
          </Carousel>
        </div>
      </div>
    </section>;
};
export default ProductDemo;