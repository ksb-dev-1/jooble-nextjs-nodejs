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
// ----- redux -----
import { useGetCurrentUserQuery } from "@/redux/slices/userApi";
// ----- components -----
import UpdateBasicDetailsForm from "./UpdateBasicDetailsForm";
// ----- skeletons -----
import BasicDetailsSkeleton from "@/skeletons/BasicDetailsSkeleton";

const BasicDetails: React.FC = () => {
  const { data, isFetching, isSuccess } = useGetCurrentUserQuery();

  const [values, setValues] = useState({
    image: "",
    available_to_join: "",
    name: "",
    email: "",
    country: "",
    city: "",
    mobile_no: "",
  });

  const setValuesFn = () => {
    setValues({
      ...values,
      image: data?.user.image || "",
      available_to_join: data?.user.available_to_join || "",
      name: data?.user.name || "",
      email: data?.user.email || "",
      country: data?.user.country || "",
      city: data?.user.city || "",
      mobile_no: data?.user.mobile_no || "",
    });
  };

  useEffect(() => {
    data?.user && setValuesFn();
  }, [data?.user]);

  const editFormContainerRef = useRef<HTMLDivElement>(null);

  const showUpdateBasicDetailsForm = () => {
    if (editFormContainerRef.current) {
      editFormContainerRef.current.style.transform = "scale(1)";
      editFormContainerRef.current.style.opacity = "1";
      setValuesFn();
    }
  };

  return (
    <>
      {isFetching && <BasicDetailsSkeleton />}
      {isSuccess && (
        <>
          <div className="flex flex-col xl:flex-row">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="relative w-[150px] h-[165.5px] border border-slate-300 rounded-[var(--r2)] overflow-hidden ">
                {data?.user.image ? (
                  <Image
                    src={data.user.image}
                    alt="profile"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[110px] md:text-[165px] text-slate-300" />
                )}
              </div>

              <div className="md:ml-8 mt-4 md:mt-0">
                <p className="font-bold text-center md:text-start text-xl">
                  <span>{data?.user.name ? data.user.name : ""} </span>
                </p>
                <p className="text-center md:text-start">
                  <span className="text-slate-500">
                    Profile last updated -{" "}
                  </span>
                  <span className="inline-block font-semibold text-sm">
                    {moment(
                      data?.user.last_updated ? data.user.last_updated : ""
                    ).format("Do MMM, YYYY")}
                  </span>
                </p>

                <span className="inline-block w-full h-[0.5px] bg-slate-300 my-4"></span>

                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="flex flex-col items-center sm:block">
                    <div className="flex items-center">
                      <IoLocationOutline />
                      <div className="ml-2 w-max">
                        {data?.user &&
                          !data.user.country &&
                          !data.user.city && <span>Not provided</span>}
                        <span>
                          {data?.user.city
                            ? data.user.city.charAt(0).toUpperCase() +
                              data.user.city.substring(1) +
                              ", "
                            : ""}
                        </span>
                        <span>
                          {data?.user.country
                            ? data.user.country.toUpperCase()
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 w-max">
                      <MdOutlineEventAvailable />
                      <span className="ml-2">
                        {data?.user.available_to_join
                          ? data.user.available_to_join
                              .charAt(0)
                              .toUpperCase() +
                            data.user.available_to_join.substring(1)
                          : ""}
                      </span>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block h-[75px] w-[0.5px] bg-slate-300 mx-8"></span>

                  <div className="flex flex-col items-center sm:block">
                    <div className="mt-4 sm:mt-0 flex items-center w-max">
                      <FiPhone />
                      <span className="ml-2">
                        {data?.user.mobile_no
                          ? data.user.mobile_no
                          : "Not provided"}
                      </span>
                    </div>
                    <div className="flex items-center mt-4 w-max">
                      <HiOutlineMail />
                      <span className="ml-2">
                        {data?.user.email ? data.user.email : ""}
                      </span>
                      <FaCheckCircle className="ml-2 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-grow xl:ml-8 mt-8 xl:mt-0">
              <div className="max-w-full flex-grow border border-dashed border-blue-600 rounded-[var(--r2)] hover:bg-slate-100">
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
                  className="relative p-4 cursor-pointer w-full overflow-hidden flex flex-col items-center 
              justify-center"
                >
                  <p className="text-blue-600 text-base">Upload Resume</p>
                  <p className="mt-2 text-center">
                    Supported Formats: doc, docx, rtf, pdf, upto 2 MB
                  </p>
                </label>
              </div>
              <button
                className="text-center h-[41.6px] bg-blue-600 hover:bg-blue-500 text-white px-4 rounded-[var(--r2)] mt-4"
                onClick={showUpdateBasicDetailsForm}
              >
                Edit
              </button>
            </div>
          </div>

          <UpdateBasicDetailsForm
            ref={editFormContainerRef}
            values={values}
            setValues={setValues}
          />
        </>
      )}
    </>
  );
};

export default BasicDetails;
