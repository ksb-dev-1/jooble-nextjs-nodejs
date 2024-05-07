// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";

const WorkMode = () => {
  return (
    <>
      <div
        className="mt-4 sm:mt-8 bg-white rounded-[var(--r1)] p-4 sm:p-8 custom-border-1"
        id="skills"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="font-bold mr-2">Work Mode</p>

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

export default WorkMode;
