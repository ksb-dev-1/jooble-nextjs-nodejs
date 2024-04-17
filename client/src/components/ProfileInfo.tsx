"use client";

import Image from "next/image";
import Link from "next/link";

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
    <div className="flex flex-col xl:flex-row">
      <div className="flex flex-col md:flex-row items-center justify-center">
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

        <div className="md:ml-8 mt-4 md:mt-0">
          <p className="font-semibold text-center md:text-start sm:text-xl">
            <span>
              {first_name.charAt(0).toUpperCase() + first_name.substring(1)}{" "}
            </span>
            <span>
              {last_name.charAt(0).toUpperCase() + last_name.substring(1)}
            </span>
          </p>
          <p className="text-center md:text-start text-xs sm:text-base">
            <span className="text-sm">Profile last updated - </span>
            <span className="inline-block text-xs font-medium">
              {moment(last_updated).format("Do MMM, YYYY")}
            </span>
          </p>

          <span className="inline-block w-full h-[0.5px] bg-slate-300 my-4"></span>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex flex-col items-center sm:block">
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

            <span className="hidden sm:inline-block h-[50px] w-[0.5px] bg-slate-300 mx-8"></span>

            <div className="mt-4 sm:mt-0 flex flex-col items-center sm:block">
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
      </div>

      <div className="flex flex-col flex-grow xl:ml-8 mt-8 xl:mt-0">
        <div className="w-[100%]">
          <input
            type="file"
            id="image"
            accept="image/*"
            name="image"
            className="hidden"
            //onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="relative cursor-pointer h-[100px] px-4 w-full border border-dashed border-blue-600 rounded-[25px] overflow-hidden flex flex-col items-center justify-center"
            //onMouseOver={() => setOnHoverImage(true)}
            //onMouseLeave={() => setOnHoverImage(false)}
          >
            {/* {onHoverImage && (
                  <FaUpload className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl text-slate-300" />
                )}
                {!onHoverImage && !values.image && (
                  <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-8xl text-slate-300" />
                )} */}
            {/* {values.image && !onHoverImage && (
                  <Image
                    src={values.image}
                    alt="pic"
                    width={100}
                    height={100}
                  />
                )} */}
            <p className="text-blue-600">Upload Resume</p>
            <p className="text-sm mt-2 text-center">
              Supported Formats: doc, docx, rtf, pdf, upto 2 MB
            </p>
          </label>
        </div>
        <Link
          href="/pages/edit-profile"
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 h-[40px] rounded-[25px] mt-4"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
