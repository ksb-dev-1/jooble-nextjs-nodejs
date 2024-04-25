"use client";

import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import Image from "next/image";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- recat-icons -----
import { BiSolidUserCircle } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { FaUpload } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";
// ----- redux
import { useEditProfileMutation } from "@/redux/slices/userApi";
import { useDispatch } from "react-redux";
import { userApi } from "@/redux/slices/userApi";

interface UserProps {
  //user: User;
  values: {
    image: string;
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    state: string;
    city: string;
    mobile_no: string;
    available_to_join: string;
    password: string;
    confirmPassword: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      image: string;
      first_name: string;
      last_name: string;
      email: string;
      country: string;
      state: string;
      city: string;
      mobile_no: string;
      available_to_join: string;
      password: string;
      confirmPassword: string;
    }>
  >;
}

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const BasicDetailsForm = forwardRef<HTMLDivElement, UserProps>(
  ({ values, setValues }, ref) => {
    const editFormContainerRef = useRef<HTMLDivElement>(null);
    const editFormRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLDivElement>(null);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(
      ref,
      () => editFormContainerRef.current as HTMLDivElement
    );

    // ----- Hide edit form -----
    const hideEditForm = (e: any) => {
      if (
        (editFormContainerRef.current &&
          closeBtnRef.current &&
          closeBtnRef.current.contains(e.target as Node)) ||
        (editFormContainerRef.current &&
          cancelBtnRef.current &&
          cancelBtnRef.current.contains(e.target as Node))
      ) {
        editFormContainerRef.current.style.opacity = "0";
        setTimeout(() => {
          editFormContainerRef.current!.style.transform = "scale(0)";
        }, 300);
      }
    };

    const [onHoverImage, setOnHoverImage] = useState(false);
    const [editProfile, { isLoading, isError }] = useEditProfileMutation();
    const dispatch = useDispatch();

    // ----- Handle form edit -----
    const handleEditProfile = async (e: FormEvent) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("image", values.image);
      formData.append("available_to_join", values.available_to_join);
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("country", values.country);
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("mobile_no", values.mobile_no);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      try {
        const res = await editProfile(formData).unwrap();

        if (res.msg) {
          dispatch(userApi.util.invalidateTags([{ type: "Basic" }]));
          toast.success("Profile updated successfully");

          if (editFormContainerRef.current) {
            editFormContainerRef.current.style.opacity = "0";
            setTimeout(() => {
              editFormContainerRef.current!.style.transform = "scale(0)";
            }, 300);
          }
        }

        isError && toast.error(res.data.msg);
      } catch (err) {
        const error = err as ErrorProps;
        toast.error(error?.data?.msg);
      }
    };

    // ----- convert image to base64 -----
    const convertToBase64 = (image: any): Promise<string> => {
      return new Promise((resolve, reject) => {
        if (!(image instanceof Blob)) {
          reject(new Error("Input is not a Blob"));
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Failed to convert image to base64"));
          }
        };

        reader.onerror = (error) => {
          reject(error);
        };
      });
    };

    const handleImageChange = async (e: any) => {
      const base64Image = await convertToBase64(e.target.files[0]);
      setValues({ ...values, image: base64Image });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
      <div
        ref={editFormContainerRef}
        className="z-30 scale-0 opacity-0 absolute w-full top-0 left-0 right-0 bottom-0 flex justify-center min-h-full px-4 bg-[rgba(0,0,0,0.85)] transition-opacity duration-300 pt-[4.5rem] pb-[4rem]"
        //className="parent"
      >
        <div
          ref={editFormRef}
          className="relative h-fit rounded-[var(--r1)] p-4 sm:p-8 md:p-16 bg-white shadow-1"
        >
          <div
            ref={closeBtnRef}
            onClick={(e: any) => hideEditForm(e)}
            className="absolute top-2 right-2 bg-[tomato] cursor-pointer rounded-[var(--r1)] h-[40px] w-[40px] hover:bg-[#ff856f]"
          >
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white"
              onClick={(e: any) => hideEditForm(e)}
            >
              <IoMdClose />
            </span>
          </div>
          <p className="font-bold text-xl mb-8 mt-2 sm:mt-0">Basic Details</p>

          <form onSubmit={handleEditProfile}>
            <div>
              <input
                type="file"
                id="image"
                accept="image/*"
                name="image"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image"
                className="relative cursor-pointer block w-[100px] sm:w-[125px] h-[100px] sm:h-[125px] rounded-full overflow-hidden border border-slate-300"
                onMouseOver={() => setOnHoverImage(true)}
                onMouseLeave={() => setOnHoverImage(false)}
              >
                {onHoverImage && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white rounded-full w-[5.65rem] sm:w-[7rem] h-[5.65rem] sm:h-[7rem] flex flex-col items-center justify-center">
                    <FaUpload className="sm:text-xl mb-1 sm" />
                    <span className="text-[0.6rem] sm:text-xs font-medium">
                      Upload
                    </span>
                  </div>
                )}
                {!onHoverImage && !values.image && (
                  <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[110px] sm:text-[135px] text-slate-300" />
                )}
                {values.image && !onHoverImage && (
                  <Image
                    src={values.image}
                    alt="pic"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </label>
            </div>

            <div className="flex-grow box-border mt-4">
              <label
                htmlFor="first_name"
                className="inline-block mb-1 font-semibold "
              >
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={values.first_name}
                className="border border-slate-300 rounded-[var(--r1)] px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] "
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>

            <div className="flex-grow box-border mt-4">
              <label
                htmlFor="last_name"
                className="inline-block mb-1 font-semibold "
              >
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={values.last_name}
                className="border border-slate-300 rounded-[var(--r1)] px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] "
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>

            <div className="flex-grow box-border mt-4">
              <label
                htmlFor="country"
                className="inline-block mb-1 font-semibold "
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                name="country"
                value={values.country}
                className="border border-slate-300 rounded-[var(--r1)] px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] "
                onChange={handleChange}
                placeholder="country"
              />
            </div>

            <div className="flex-grow box-border mt-4">
              <label
                htmlFor="city"
                className="inline-block mb-1 font-semibold "
              >
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={values.city}
                className="border border-slate-300 rounded-[var(--r1)] px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] "
                onChange={handleChange}
                placeholder="Mobile"
              />
            </div>

            <div className="flex-grow box-border mt-4">
              <label
                htmlFor="mobile_no"
                className="inline-block mb-1 font-semibold "
              >
                Mobile
              </label>
              <input
                id="mobile_no"
                type="text"
                name="mobile_no"
                value={values.mobile_no}
                className="border border-slate-300 rounded-[var(--r1)] px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] "
                onChange={handleChange}
                placeholder="Mobile"
              />
            </div>

            <div className="flex flex-col mt-8 rounded-[var(--r1)]">
              <p className="font-bold ">Available to join</p>
              <p className="text-slate-500 ">
                Lets recruiters know your availability to join
              </p>
              <div className="flex items-center flex-wrap mt-4 rounded-[var(--r1)]">
                {values.available_to_join === "less than 15 days" ? (
                  <span className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 cursor-pointer bg-slate-200 hover:bg-slate-300  flex items-center justify-center mr-2 mb-2">
                    <FaLessThan className="mr-1 text-[0.65rem] " />
                    15 Days
                  </span>
                ) : (
                  <span
                    className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 cursor-pointer flex items-center justify-center hover:bg-slate-100 mr-2 mb-2"
                    onClick={(e: any) =>
                      setValues({
                        ...values,
                        available_to_join: "less than 15 days",
                      })
                    }
                  >
                    <FaLessThan className="mr-1 text-slate-500 text-[0.65rem]" />
                    15 Days
                  </span>
                )}
                {values.available_to_join === "15 days" ? (
                  <span className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 text-center cursor-pointer bg-slate-200 hover:bg-slate-300  mr-2 mb-2">
                    15 Days
                  </span>
                ) : (
                  <span
                    className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 text-center cursor-pointer hover:bg-slate-100 mr-2 mb-2"
                    onClick={(e: any) =>
                      setValues({
                        ...values,
                        available_to_join: "15 days",
                      })
                    }
                  >
                    15 Days
                  </span>
                )}
                {values.available_to_join === "1 month" ? (
                  <span className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 text-center cursor-pointer bg-slate-200 hover:bg-slate-300  mr-2 mb-2">
                    1 Month
                  </span>
                ) : (
                  <span
                    className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 text-center cursor-pointer hover:bg-slate-100 mr-2 mb-2"
                    onClick={(e: any) =>
                      setValues({
                        ...values,
                        available_to_join: "1 month",
                      })
                    }
                  >
                    1 Month
                  </span>
                )}
                {values.available_to_join === "2 months" ? (
                  <span className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 text-center cursor-pointer bg-slate-200 hover:bg-slate-300  mr-2 mb-2">
                    2 Months
                  </span>
                ) : (
                  <span
                    className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 text-center cursor-pointer hover:bg-slate-100 mr-2 mb-2"
                    onClick={(e: any) =>
                      setValues({
                        ...values,
                        available_to_join: "2 months",
                      })
                    }
                  >
                    2 Months
                  </span>
                )}
                {values.available_to_join === "3 months" ? (
                  <span className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 text-center cursor-pointer bg-slate-200 hover:bg-slate-300  mr-2 mb-2">
                    3 Months
                  </span>
                ) : (
                  <span
                    className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 text-center cursor-pointer hover:bg-slate-100 mr-2 mb-2"
                    onClick={(e: any) =>
                      setValues({
                        ...values,
                        available_to_join: "3 months",
                      })
                    }
                  >
                    3 Months
                  </span>
                )}
                {values.available_to_join === "more than 3 months" ? (
                  <span className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 cursor-pointer bg-slate-200 hover:bg-slate-300  flex items-center justify-center mr-2 mb-2">
                    <FaGreaterThan className="mr-1 text-[0.65rem] " />3 Months
                  </span>
                ) : (
                  <span
                    className=" py-1 sm:py-2 px-2 sm:px-4 rounded-[var(--r1)] border border-slate-300 cursor-pointer flex items-center justify-center hover:bg-slate-100 mr-2 mb-2"
                    onClick={(e: any) =>
                      setValues({
                        ...values,
                        available_to_join: "more than 3 months",
                      })
                    }
                  >
                    <FaGreaterThan className="mr-1 text-slate-500 text-[0.65rem]" />
                    3 Months
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end mt-8">
              <button
                ref={cancelBtnRef}
                type="button"
                onClick={hideEditForm}
                className="h-[40px] px-4 border border-blue-600 hover:bg-[#f8f8f8] rounded-[var(--r1)] text-blue-600 font-medium flex items-center justify-center cursor-pointer "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="h-[40px] px-4 bg-blue-600 hover:bg-blue-500 rounded-[var(--r1)] border border-blue-600 text-white flex items-center justify-center w-[90.9px] ml-2 "
              >
                {isLoading ? <div className="loader-1"></div> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
);

export default BasicDetailsForm;