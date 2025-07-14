import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Users, Target, TrendingUp } from "lucide-react";
const ProductDemo = () => {
  return (
    <section id="demo" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
          </div>

          {/* Feature columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <Monitor className="w-16 h-16 mx-auto text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Real-Time Monitoring</h3>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <Users className="w-16 h-16 mx-auto text-primary" />
              </div>
              <h3 className="text-lg font-semibold">User Analytics</h3>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <Target className="w-16 h-16 mx-auto text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Goal Tracking</h3>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <TrendingUp className="w-16 h-16 mx-auto text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Performance Insights</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDemo;