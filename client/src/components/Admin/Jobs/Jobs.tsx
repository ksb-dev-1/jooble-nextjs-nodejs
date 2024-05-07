// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";

const Jobs = () => {
  return (
    <>
      <div
        className="bg-white rounded-[var(--r1)] p-4 sm:p-8 custom-shadow-1"
        id="skills"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="font-bold mr-2">Jobs</p>

            <span className="text-blue-600 hover:text-blue-500 text-xl cursor-pointer">
              <BiSolidEdit />
            </span>
          </div>

          <p className="text-blue-600 font-medium cursor-pointer">Add</p>
        </div>
      </div>
    </>
  );
};

export default Jobs;
