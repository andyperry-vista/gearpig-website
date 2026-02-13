import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import AgeVerification from "@/components/AgeVerification";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AgeVerification />
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
