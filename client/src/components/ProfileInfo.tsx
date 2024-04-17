"use client";

import Image from "next/image";

// ----- moment -----
import moment from "moment";
// ----- react-icons -----
import { BiSolidUserCircle } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

interface UserProps {
  user: User;
}

const ProfileInfo: React.FC<UserProps> = ({ user }) => {
  const {
    first_name,
    last_name,
    email,
    mobile_no,
    last_updated,
    available_to_join,
  } = user;

  return (
    <div className="flex flex-col sm:flex-row items-start">
      <div className="relative w-[150px] h-[150px] border border-slate-300 rounded-full overflow-hidden ">
        {user.image ? (
          <Image
            src={user.image}
            alt="profile"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        ) : (
          <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[140px] text-slate-300" />
        )}
      </div>

      <div className="ml-8">
        <p className="font-semibold text-center sm:text-start sm:text-xl">
          <span>
            {first_name.charAt(0).toUpperCase() + first_name.substring(1)}{" "}
          </span>
          <span>
            {last_name.charAt(0).toUpperCase() + last_name.substring(1)}
          </span>
        </p>
        <p className="text-center sm:text-start text-xs sm:text-base">
          <span className="text-sm">Profile last updated - </span>
          <span className="inline-block text-xs font-medium">
            {moment(last_updated).format("Do MMM, YYYY")}
          </span>
        </p>

        <span className="inline-block w-full h-[0.5px] bg-slate-300 my-4"></span>

        <div className="flex items-center">
          <div>
            <div className="flex items-center">
              <HiOutlineMail />
              <span className="text-sm ml-2">{user.email}</span>
              <FaCheckCircle className="ml-2 text-green-600" />
            </div>
            <div className="flex items-center mt-4">
              <FiPhone />
              <span className="text-sm ml-2">
                {user.mobile_no ? user.mobile_no : "Not provided"}
              </span>
            </div>
          </div>

          <span className="inline-block h-[50px] w-[0.5px] bg-slate-300 mx-8"></span>

          <div>
            <div className="flex items-center">
              <IoLocationOutline />
              <span className="text-sm ml-2">
                {user.location ? user.location : "Not provided"}
              </span>
            </div>
            <div className="flex items-center mt-4">
              <MdOutlineEventAvailable />
              <span className="text-sm ml-2">
                {available_to_join.charAt(0).toUpperCase() +
                  available_to_join.substring(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div>Options</div> */}
    </div>
  );
};

export default ProfileInfo;
