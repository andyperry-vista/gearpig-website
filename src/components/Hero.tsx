import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroPig from "@/assets/hero-pig.png";
import logoFull from "@/assets/logo-full.png";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="relative inline-block">
            {/* Pink glow - left side */}
            <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-[radial-gradient(circle,hsl(191_100%_50%/0.5)_0%,transparent_70%)] blur-2xl animate-[glow-blue_2s_ease-in-out_infinite]" />
            {/* Pink glow - right side */}
            <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-[radial-gradient(circle,hsl(334_100%_50%/0.5)_0%,transparent_70%)] blur-2xl animate-[glow-pink_2s_ease-in-out_infinite_1s]" />
            <img
              src={logoFull}
              alt="GearPig Logo"
              className="relative z-10 h-[32rem] w-auto mx-auto mb-8 drop-shadow-[0_0_15px_hsl(334_100%_50%/0.5)]" />
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight neon-heading">
            UNLEASH YOUR <span className="text-primary">INNER PIG</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Premium gear, apparel, and toys for the bold. Express yourself with our exclusive collection designed for the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-lg font-bold tracking-wider shadow-[0_0_20px_hsl(334_100%_50%/0.3)] hover:shadow-[0_0_30px_hsl(334_100%_50%/0.5)] transition-all">
              SHOP NEW ARRIVALS
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6 rounded-lg font-bold tracking-wider">
              VIEW COLLECTIONS
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
      </div>
    </div>);

};

export default Hero;