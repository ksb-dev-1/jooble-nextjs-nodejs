"use client";

import { useState, useEffect, useRef } from "react";
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
// ----- components -----
import EditProfileForm from "./EditProfileForm";

interface UserProps {
  user: User;
}

const ProfileInfo: React.FC<UserProps> = ({ user }) => {
  const {
    image,
    first_name,
    last_name,
    email,
    country,
    state,
    city,
    mobile_no,
    last_updated,
    available_to_join,
  } = user;

  const [values, setValues] = useState({
    image: user.image,
    available_to_join: user.available_to_join,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    country: user.country,
    state: user.state,
    city: user.city,
    mobile_no: user.mobile_no,
    password: "",
    confirmPassword: "",
  });

  const setValuesFn = () => {
    setValues({
      ...values,
      image: user.image,
      available_to_join: user.available_to_join,
      first_name: user.first_name,
      last_name: user.last_name,
      country: user.country,
      state: user.state,
      city: user.city,
      mobile_no: user.mobile_no,
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    setValuesFn();
  }, [user]);

  const editFormContainerRef = useRef<HTMLDivElement>(null);

  const showEditForm = () => {
    if (editFormContainerRef.current) {
      editFormContainerRef.current.style.transform = "scale(1)";
      editFormContainerRef.current.style.opacity = "1";
      setValuesFn();
    }
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="relative w-[100px] md:w-[150px] h-[100px] md:h-[150px] border border-slate-300 rounded-full overflow-hidden ">
            {user.image ? (
              <Image
                src={image}
                alt="profile"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            ) : (
              <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[110px] md:text-[165px] text-slate-300" />
            )}
          </div>

          <div className="md:ml-8 mt-4 md:mt-0">
            <p className="font-bold text-center md:text-start sm:text-xl">
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
                  <IoLocationOutline />
                  <div className="text-sm ml-2">
                    {!country && !state && !city && <span>Not provided</span>}
                    <span>
                      {city &&
                        city.charAt(0).toUpperCase() +
                          city.substring(1) +
                          " , "}
                    </span>
                    <span>
                      {state &&
                        state.charAt(0).toUpperCase() +
                          state.substring(1) +
                          ", "}
                    </span>
                    <span>
                      {country &&
                        country.charAt(0).toUpperCase() + country.substring(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <MdOutlineEventAvailable />
                  <span className="text-sm ml-2">
                    {available_to_join.charAt(0).toUpperCase() +
                      available_to_join.substring(1)}
                  </span>
                </div>
              </div>

              <span className="hidden sm:inline-block h-[50px] w-[0.5px] bg-slate-300 mx-8"></span>

              <div className="flex flex-col items-center sm:block">
                <div className="mt-4 sm:mt-0 flex items-center">
                  <HiOutlineMail />
                  <span className="text-sm ml-2">{email}</span>
                  <FaCheckCircle className="ml-2 text-green-600" />
                </div>
                <div className="flex items-center mt-4">
                  <FiPhone />
                  <span className="text-sm ml-2">
                    {mobile_no ? mobile_no : "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow xl:ml-8 mt-8 xl:mt-0 bg-blue-50 p-4 rounded-[25px]">
          <div className="w-[100%]">
            <input
              type="file"
              id="resume"
              accept="image/*"
              name="resume"
              className="hidden"
              //onChange={handleImageChange}
            />
            <label
              htmlFor="resume"
              className="relative p-4 bg-white cursor-pointer px-4 w-full border border-dashed hover:bg-slate-100 border-blue-600 rounded-[25px] overflow-hidden flex flex-col items-center 
              justify-center"
            >
              <p className="text-blue-600">Upload Resume</p>
              <p className="text-sm mt-2 text-center">
                Supported Formats: doc, docx, rtf, pdf, upto 2 MB
              </p>
            </label>
          </div>
          <button
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-[25px] mt-2"
            onClick={showEditForm}
          >
            Edit
          </button>
        </div>
      </div>

      <EditProfileForm
        ref={editFormContainerRef}
        //user={user}
        values={values}
        setValues={setValues}
      />
    </>
  );
};

export default ProfileInfo;
