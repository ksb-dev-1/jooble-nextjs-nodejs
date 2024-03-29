import Image from "next/image";
import JobSearch from "../../public/job-search-3.svg";

// react-icons
import { FiSearch } from "react-icons/fi";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div className="relative h-[150px] w-[250px]">
          <Image src={JobSearch} alt="job-search" fill priority />
        </div>
        <span className="h-[150px] w-[1px] bg-[var(--white-1)] mx-8"></span>
        <div>
          <p className="font-semibold text-xl sm:text-3xl text-[var(--white-1)]">
            Find your dream job now
          </p>
          <p className="sm:font-semibold text-[var(--white-1)] mt-2">
            One of the best job portal for you to explore
          </p>
        </div>
      </div>
      <form className="relative mt-8 w-full lg:w-[900px] flex justify-center">
        <input
          type="text"
          placeholder="Enter skills / companies / designations"
          className="w-full lg:w-[900px] p-4 pl-12 rounded-[50px] text-[var(--gray-4)] focus:outline-none focus:placeholder:text-transparent"
        />
        <FiSearch className="absolute top-[17px] left-[12px] text-[var(--gray-3)] text-2xl" />
        <button className="absolute bg-[var(--blue-2)] top-[4px] right-[4px] rounded-[50px] px-[2rem] py-[0.75rem] border-none outline-none font-semibold hover:bg-[var(--blue-1)]">
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
