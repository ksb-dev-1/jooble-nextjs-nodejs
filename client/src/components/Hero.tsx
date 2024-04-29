// ----- react-icons -----
import { FiSearch } from "react-icons/fi";

const Hero: React.FC = () => {
  return (
    <div className="max-w-[1000px] w-full flex flex-col items-center">
      <p className="text-2xl md:text-4xl text-center font-bold mb-2">
        One of the best job portal for you to explore
      </p>
      <p className="mb-8 text-xl font-medium">Find your dream job now</p>

      <form className="relative w-full xl:max-w-full hidden sm:flex rounded-full shadow-1">
        <input
          type="text"
          placeholder="Enter skills / companies / designations"
          className="w-full p-2 sm:p-4 pl-4 sm:pl-14 rounded-[50px] focus:outline-none placeholder:text-slate-500 focus:placeholder:text-transparent"
        />
        <FiSearch className="absolute top-[17px] left-[22px] text-[var(--gray-3)] text-2xl hidden sm:block" />
        {/* <button className="absolute bg-blue-600 top-[calc(16.25px-0.25rem)] right-[calc(17.25px-0.25rem)] py-[0.75rem] w-[88.91px] text-center border-none outline-none hover:bg-blue-500 rounded-[50px] text-white">
          Search
        </button> */}
        <button className="absolute bg-blue-600 top-[7.75px] right-[7.75px] px-[0.5rem] py-[0.5rem] border-none outline-none hover:bg-blue-500 rounded-[50px] text-white">
          <FiSearch className="text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default Hero;
