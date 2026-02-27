import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroPig from "@/assets/hero-pig.png";
import logoFull from "@/assets/logo-full.png";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50" />
      
      {/* Background Pig Image */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <img src={heroPig} alt="" className="w-[600px] md:w-[800px] lg:w-[900px] opacity-15 select-none" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <img
            src={logoFull}
            alt="GearPig Logo"
            className="h-64 w-auto mx-auto mb-8 drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]" />

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            UNLEASH YOUR <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">INNER PIG</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Premium gear, apparel, and toys for the bold. Express yourself with our exclusive collection designed for the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-none font-bold tracking-wider shadow-[0_0_20px_rgba(255,0,255,0.3)] hover:shadow-[0_0_30px_rgba(255,0,255,0.5)] transition-all">
              SHOP NEW ARRIVALS
            </Button>
            <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 text-lg px-8 py-6 rounded-none font-bold tracking-wider">
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