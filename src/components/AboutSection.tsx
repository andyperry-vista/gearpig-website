import { Button } from "./ui/button";
import mascotImg from "@/assets/gearpig-mascot.png";

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src={mascotImg} 
              alt="GearPig Mascot" 
              className="w-full max-w-md mx-auto animate-[neon-edge-glow_3s_ease-in-out_infinite]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              MORE THAN JUST <span className="text-secondary">GEAR</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              GearPig isn't just a brand; it's a statement. Born from the underground and forged in neon, we create premium gear for men who aren't afraid to embrace their primal side.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Whether you're into leather, rubber, sports gear, or just want to look good while being bad, we've got you covered. Our products are designed for durability, comfort, and maximum impact.
            </p>
            <Button className="bg-secondary hover:bg-secondary/90 text-black font-bold text-lg px-8 py-6 rounded-none">
              READ OUR STORY
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
