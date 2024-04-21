// ----- react-icons -----
import { FiSearch } from "react-icons/fi";

const Hero: React.FC = () => {
  return (
    <div className="max-w-[1100px] w-[100%] flex flex-col items-center">
      <p className="text-white text-3xl text-center mb-8 font-semibold">
        Find your dream job now
      </p>

      <form className="relative w-full xl:max-w-[1100px] hidden sm:flex rounded-full">
        <input
          type="text"
          placeholder="Enter skills / companies / designations"
          className="w-full p-2 sm:p-4 pl-4 sm:pl-12 rounded-[25px] focus:outline-none placeholder:text-xs placeholder:font-sans sm:placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent font-sans"
        />
        <FiSearch className="absolute top-[17px] left-[12px] text-[var(--gray-3)] text-2xl hidden sm:block" />
        <button className="absolute bg-blue-600 top-[8.25px] right-[8.25px] py-[0.5rem] w-[88.91px] text-center border-none outline-none hover:bg-blue-500 rounded-[25px] text-white">
          Search
        </button>
        <button className="absolute bg-blue-600 top-[4.25px] right-[4.25px] px-[0.5rem] py-[0.5rem] border-none outline-none hover:bg-blue-500 rounded-[25px] text-white block sm:hidden">
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

export default Hero;
