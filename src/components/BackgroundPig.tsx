import heroPig from "@/assets/hero-pig.png";

const BackgroundPig = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
      <img src={heroPig} alt="" className="w-[600px] md:w-[800px] lg:w-[900px] opacity-15 select-none" />
    </div>
  );
};

export default BackgroundPig;
