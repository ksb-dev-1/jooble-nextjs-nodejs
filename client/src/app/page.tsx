//components;
import Hero from "@/components/Hero";

const Home: React.FC = () => {
  return (
    <section className="min-h-[calc(100vh-4rem)]">
      <div className="w-full bg-blue-600 mt-[64px] p-4 sm:p-8 xl:px-0 text-white flex justify-center">
        <Hero />
      </div>
      <div className="max-w-[1100px] w-[100%] mx-auto">Home</div>
    </section>
  );
};

export default Home;
