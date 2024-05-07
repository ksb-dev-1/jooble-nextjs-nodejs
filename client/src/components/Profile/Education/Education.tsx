// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";

const Education: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-white rounded-[var(--r1)] p-4 sm:p-8 custom-border-1 mt-4 sm:mt-8">
      <div className="flex items-center">
        <p className="font-bold mr-2">Education</p>

        <span className="text-blue-600 hover:text-blue-500 text-xl cursor-pointer">
          <BiSolidEdit />
        </span>
      </div>
      <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
    </div>
  );
};

export default Education;
