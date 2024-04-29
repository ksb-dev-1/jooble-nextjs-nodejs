// ----- react-icons -----
import { FiSearch } from "react-icons/fi";

//components;
import Hero from "@/components/Hero";

const Home: React.FC = () => {
  return (
    <section className="min-h-[calc(100vh-4.5rem)] h-full">
      <div className="w-full mt-[8.5rem] px-4 sm:px-8 py-4 sm:py-16 xl:px-0 hidden sm:flex justify-center">
        <Hero />
      </div>

      <div className="max-w-[1280px] w-[100%] mx-auto">Home</div>
    </section>
  );
};

export default Home;
