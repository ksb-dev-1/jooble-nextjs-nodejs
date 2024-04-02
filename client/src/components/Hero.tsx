import Image from "next/image";
import svg from "../../public/job-search-icon.svg";

// react-icons
import { FiSearch } from "react-icons/fi";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between">
        <div className="relative h-[200px] w-[200px] hidden md:block">
          <Image src={svg} alt="icon" fill priority />
        </div>
        <span className="h-[150px] w-[1px] bg-white mx-8 hidden md:block"></span>
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold text-2xl text-white">
            One of the best job portal for you to explore
          </p>
          <p className="font-normal lg:font-semibold text-lg text-white mt-2">
            Find your dream job now
          </p>
        </div>
      </div>

      <form className="relative mt-4 w-full xl:w-[1100px] flex justify-center">
        <input
          type="text"
          placeholder="Enter skills / companies / designations"
          className="w-full xl:w-[1100px] p-4 pl-12 rounded-[50px] text-blue-500 focus:outline-none focus:placeholder:text-transparent"
        />
        <FiSearch className="absolute top-[17px] left-[12px] text-[var(--gray-3)] text-2xl" />
        <button className="absolute bg-blue-500 top-[8.25px] right-[8.25px] rounded-[50px] px-[2rem] py-[0.5rem] border-none outline-none font-semibold hover:bg-blue-400">
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
