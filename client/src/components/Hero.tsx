import Image from "next/image";
import Link from "next/link";
import JobSearch from "../../public/job-search-icon.svg";

// ----- react-icons -----
import { FiSearch } from "react-icons/fi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";

const Hero: React.FC = () => {
  return (
    <div className="max-w-[1100px] w-[100%]">
      <p className="text-white font-semibold text-xl sm:text-2xl lg:text-4xl mb-8">
        Find your dream job now
      </p>

      <form className="relative w-full xl:max-w-[1100px]">
        <input
          type="text"
          placeholder="Enter skills / companies / designations"
          className="w-full p-2 sm:p-4 pl-4 sm:pl-12 rounded-[50px] focus:outline-none placeholder:text-xs placeholder:font-sans sm:placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent font-sans"
        />
        <FiSearch className="absolute top-[17px] left-[12px] text-[var(--gray-3)] text-2xl hidden sm:block" />
        <button className="absolute bg-blue-600 top-[8.25px] right-[8.25px] px-[2rem] py-[0.5rem] border-none outline-none hover:bg-blue-500 rounded-[50px] text-white hidden sm:block">
          Search
        </button>
        <button className="absolute bg-blue-600 top-[4.25px] right-[4.25px] px-[0.5rem] py-[0.5rem] border-none outline-none hover:bg-blue-500 rounded-[50px] text-white block sm:hidden">
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

export default Hero;
