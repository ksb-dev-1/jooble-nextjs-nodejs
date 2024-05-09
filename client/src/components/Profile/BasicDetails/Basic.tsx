"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ----- moment -----
import moment from "moment";
// ----- react-icons -----
import { BiSolidUserCircle } from "react-icons/bi";
import { BiSolidEdit } from "react-icons/bi";
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

const Basic: React.FC = () => {
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
        <div className="relative max-w-[1280px] w-full rounded-[var(--r1)] mb-4 sm:mb-8 flex min-h-[250px] custom-shadow-1 bg-white">
          <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[var(--r1)]">
            {data?.user.image && (
              <Image
                src={data.user.image}
                alt="profile"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-[var(--r1)]"
              />
            )}

            {data?.user.image ? (
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[var(--r1)] bg-[rgba(20,20,20,0.9)] flex items-center p-4 sm:p-8">
                <span className="absolute bottom-4 right-4 inline-block text-xs text-white">
                  {moment(
                    data?.user.last_updated ? data.user.last_updated : ""
                  ).format("Do MMM, YYYY")}
                </span>
                <div
                  className="absolute top-4 right-4 h-[30px] w-[30px] rounded-full bg-white hover:bg-slate-100 text-black cursor-pointer"
                  onClick={showUpdateBasicDetailsForm}
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <BiSolidEdit />
                  </span>
                </div>
                <div className="relative w-[150px] h-[150px] border-[3px] border-white rounded-full overflow-hidden">
                  <Image
                    src={data.user.image}
                    alt="profile"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="text-white ml-8">
                  <p className="font-bold">
                    {data?.user.name ? data.user.name : ""}
                  </p>
                  <span className="inline-block w-full h-[0.5px] bg-white my-2"></span>
                  <div>
                    <div className="flex items-center w-max">
                      <HiOutlineMail />
                      <span className="ml-2">
                        {data?.user.email ? data.user.email : ""}
                      </span>
                      <FaCheckCircle className="ml-2 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <IoLocationOutline />
                    <div className="ml-2 w-max">
                      {data?.user && !data.user.country && !data.user.city && (
                        <span>Not provided</span>
                      )}
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
                        ? data.user.available_to_join.charAt(0).toUpperCase() +
                          data.user.available_to_join.substring(1)
                        : ""}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center w-max">
                    <FiPhone />
                    <span className="ml-2">
                      {data?.user.mobile_no
                        ? data.user.mobile_no
                        : "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[var(--r1)] bg-white flex items-center p-4 sm:p-8">
                <span className="absolute top-4 left-4 inline-block font-semibold text-xs text-black">
                  {moment(
                    data?.user.last_updated ? data.user.last_updated : ""
                  ).format("Do MMM, YYYY")}
                </span>
                <div
                  className="absolute top-4 right-4 h-[30px] w-[30px] rounded-full bg-blue-600 hover:bg-blue-500  text-white cursor-pointer"
                  onClick={showUpdateBasicDetailsForm}
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <BiSolidEdit />
                  </span>
                </div>
                <div className="relative w-[150px] h-[150px] border-[3px] border-slate-300 rounded-full overflow-hidden">
                  <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[110px] md:text-[165px] text-slate-300" />
                </div>
                <div className="text-black ml-8">
                  <div>
                    <div className="flex items-center w-max">
                      <HiOutlineMail />
                      <span className="ml-2">
                        {data?.user.email ? data.user.email : ""}
                      </span>
                      <FaCheckCircle className="ml-2 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <IoLocationOutline />
                    <div className="ml-2 w-max">
                      {data?.user && !data.user.country && !data.user.city && (
                        <span>Not provided</span>
                      )}
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
                        ? data.user.available_to_join.charAt(0).toUpperCase() +
                          data.user.available_to_join.substring(1)
                        : ""}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center w-max">
                    <FiPhone />
                    <span className="ml-2">
                      {data?.user.mobile_no
                        ? data.user.mobile_no
                        : "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <UpdateBasicDetailsForm
            ref={editFormContainerRef}
            values={values}
            setValues={setValues}
          />
        </div>
      )}
    </>
  );
};

export default Basic;
