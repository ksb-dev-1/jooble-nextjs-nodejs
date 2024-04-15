import Image from "next/image";
import Link from "next/link";
import svg from "../../public/job-search-icon.svg";

// ----- react-icons -----
import { FiSearch } from "react-icons/fi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center border border-dashed border-white max-w-[1100px] w-[100%] rounded p-4 lg:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-center">
        <div className="relative h-[150px] sm:h-[200px] lg:h-[250px] w-[150px] sm:w-[200px] lg:w-[250px] rounded-full border border-dashed border-white mb-4 sm:mb-0 sm:mr-4 lg:mr-8">
          <div className="absolute h-[75px] sm:h-[100px] lg:h-[150px] w-[75px] sm:w-[100px] lg:w-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image src={svg} alt="icon" fill priority />
          </div>
        </div>
        {/* <span className="h-[150px] w-[1px] bg-white mx-8 hidden sm:block"></span> */}
        <div className="flex flex-col items-center sm:items-start">
          <p className="sm:text-xl md:text-2xl lg:text-3xl text-white text-center sm:text-start">
            One of the best job portal for you to explore
          </p>
          <Link
            href="/pages/jobs"
            className="text-xs sm:text-base md:text-lg lg:text-xl text-white mt-8 flex items-center border border-dashed border-white rounded-[50px] px-8 py-4 hover:tracking-wide transition-all"
          >
            Find your dream job now
            <HiArrowLongRight className="ml-2 mt-1 text-xl" />
          </Link>
        </div>
      </div>

      <form className="relative mt-8 w-full xl:max-w-[1100px] hidden sm:flex justify-center">
        <input
          type="text"
          placeholder="Enter skills / companies / designations"
          className="w-full xl:max-w-[calc(1100px-4rem)] p-4 pl-12 rounded-[50px] text-blue-600 focus:outline-none focus:placeholder:text-transparent"
        />
        <FiSearch className="absolute top-[17px] left-[12px] text-[var(--gray-3)] text-2xl" />
        <button className="absolute bg-blue-600 top-[8.25px] right-[8.25px] rounded-[50px] px-[2rem] py-[0.5rem] border-none outline-none font-semibold hover:bg-blue-500">
          Search
        </button>
      </form>
    </div>
  );
};

export default Hero;
