// ----- react-icons -----
import { FiSearch } from "react-icons/fi";

const Hero: React.FC = () => {
  return (
    <div className="max-w-[1000px] w-full flex flex-col items-center">
      <p className="text-2xl md:text-3xl text-center font-bold mb-2">
        One of the best job portal for you to explore
      </p>
      <p className="mb-8 text-xl font-medium">Find your dream job now</p>

      <form className="relative w-full xl:max-w-full hidden sm:flex rounded-full shadow-1">
        <input
          type="text"
          placeholder="Enter skills / companies / designations"
          className="w-full p-2 sm:p-6 pl-4 sm:pl-14 rounded-[50px] focus:outline-none placeholder:text-slate-500 focus:placeholder:text-transparent"
        />
        <FiSearch className="absolute top-[25px] left-[22px] text-[var(--gray-3)] text-2xl hidden sm:block" />
        <button className="absolute bg-blue-600 top-[16.25px] right-[17.25px] py-[0.5rem] w-[88.91px] text-center border-none outline-none hover:bg-blue-500 rounded-[50px] text-white">
          Search
        </button>
        <button className="absolute bg-blue-600 top-[12.25px] right-[12.25px] px-[0.5rem] py-[0.5rem] border-none outline-none hover:bg-blue-500 rounded-[50px] text-white block sm:hidden">
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

export default Hero;
