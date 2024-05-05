// ----- react-icons -----
import { FiSearch } from "react-icons/fi";

const Hero: React.FC = () => {
  return (
    <div className="max-w-[1000px] w-full flex flex-col items-center">
      {/* <p className="text-2xl md:text-4xl text-center font-bold mb-2">
        Find your dream job now
      </p> */}
      {/* <p className="mb-8 text-xl font-medium">Find your dream job now</p> */}

      <form className="relative w-full xl:max-w-full hidden sm:flex rounded-full shadow-1">
        <input
          type="text"
          placeholder="Enter skills / companies / designations"
          className="w-full p-4 rounded-[50px] focus:outline-none placeholder:text-slate-500 focus:placeholder:text-transparent border-[3px] border-blue-100"
        />
        <button className="absolute bg-blue-600 top-[11px] right-[11px] px-[0.5rem] border-none outline-none hover:bg-blue-500  text-white h-[40px] w-[40px] rounded-full">
          <FiSearch className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl" />
        </button>
      </form>
    </div>
  );
};

export default Hero;
