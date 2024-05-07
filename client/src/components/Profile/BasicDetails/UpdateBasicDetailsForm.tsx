"use client";

import {
  useState,
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
// ----- redux
import { useUpdateProfileMutation } from "@/redux/slices/userApi";
import { useDispatch } from "react-redux";
import { userApi } from "@/redux/slices/userApi";
// ----- common -----
import CancelSaveButtons from "../common/CancelSaveButtons";

import AvailableToJoin from "./AvailableToJoin";

interface UserValues {
  image: string;
  name: string;
  email: string;
  country: string;
  city: string;
  mobile_no: string;
  available_to_join: string;
}

interface UserProps {
  values: UserValues;
  setValues: Dispatch<SetStateAction<UserValues>>;
}

export interface AvailableToJoinProps extends UserProps {
  available_to_join: string;
}

const available_to_join_arr = ["15 days", "1 month", "2 months", "3 months"];

const UpdateBasicDetailsForm = forwardRef<HTMLDivElement, UserProps>(
  ({ values, setValues }, ref) => {
    const [onHoverImage, setOnHoverImage] = useState(false);

    const updateBasicDetailsFormRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);

    const dispatch = useDispatch();

    const [editProfile, { isLoading, isError }] = useUpdateProfileMutation();

    useImperativeHandle(
      ref,
      () => updateBasicDetailsFormRef.current as HTMLDivElement
    );

    const handleImageChange = async (e: any) => {
      const base64Image = await convertToBase64(e.target.files[0]);
      setValues({ ...values, image: base64Image });
    };

    const handleValuesChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };

    // ----- Hide basic details form -----
    const hideUpdateBasicDetailsForm = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (
        (updateBasicDetailsFormRef.current &&
          closeBtnRef.current &&
          closeBtnRef.current.contains(e.target as Node)) ||
        (updateBasicDetailsFormRef.current &&
          cancelBtnRef.current &&
          cancelBtnRef.current.contains(e.target as Node))
      ) {
        updateBasicDetailsFormRef.current.style.opacity = "0";
        setTimeout(() => {
          updateBasicDetailsFormRef.current!.style.transform = "scale(0)";
        }, 300);
      }
    };

    // ----- Handle basic details form -----
    const handleUpdateBasicDetailsForm = async (e: FormEvent) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("image", values.image);
      formData.append("available_to_join", values.available_to_join);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("country", values.country);
      formData.append("city", values.city);
      formData.append("mobile_no", values.mobile_no);

      try {
        const res = await editProfile(formData).unwrap();

        if (res.msg) {
          dispatch(userApi.util.invalidateTags([{ type: "Basic" }]));
          toast.success("Profile updated successfully");

          if (updateBasicDetailsFormRef.current) {
            updateBasicDetailsFormRef.current.style.opacity = "0";
            setTimeout(() => {
              updateBasicDetailsFormRef.current!.style.transform = "scale(0)";
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

    return (
      <div
        ref={updateBasicDetailsFormRef}
        className="fixed z-30 scale-0 opacity-0 w-full top-0 left-0 right-0 bottom-0 flex justify-center min-h-full px-4 bg-[rgba(0,0,0,0.85)] transition-opacity duration-300 pt-[4.5rem] pb-[4rem] overflow-y-auto"
      >
        <div className="relative h-fit rounded-[var(--r1)] p-8 sm:p-16 w-full sm:w-[600px] bg-white">
          <button
            ref={closeBtnRef}
            onClick={hideUpdateBasicDetailsForm}
            className="absolute top-2 right-2 bg-[tomato] cursor-pointer rounded-full h-[40px] w-[40px] hover:bg-[#ff856f]"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
              <IoMdClose />
            </span>
          </button>
          <p className="font-bold text-xl mb-8 mt-2 sm:mt-0">Basic Details</p>

          <form onSubmit={handleUpdateBasicDetailsForm}>
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
                className="relative cursor-pointer block w-[100px] sm:w-[125px] h-[100px] sm:h-[125px] rounded-[var(--r2)] overflow-hidden custom-border-1"
                onMouseOver={() => setOnHoverImage(true)}
                onMouseLeave={() => setOnHoverImage(false)}
              >
                {onHoverImage && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white rounded-[var(--r2)] w-[5.65rem] sm:w-[7rem] h-[5.65rem] sm:h-[7rem] flex flex-col items-center justify-center">
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
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </label>
            </div>

            <div className="flex-grow box-border mt-4">
              <label htmlFor="name" className="inline-block mb-1 font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={values.name}
                className="custom-border-1 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] "
                onChange={handleValuesChange}
              />
            </div>

            <div className="flex-grow box-border mt-4">
              <label
                htmlFor="country"
                className="inline-block mb-1 font-medium"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                name="country"
                value={values.country}
                className="custom-border-1 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] "
                onChange={handleValuesChange}
              />
            </div>

            <div className="flex-grow box-border mt-4">
              <label htmlFor="city" className="inline-block mb-1 font-medium">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={values.city}
                className="custom-border-1 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] "
                onChange={handleValuesChange}
              />
            </div>

            <div className="flex-grow box-border mt-4">
              <label
                htmlFor="mobile_no"
                className="inline-block mb-1 font-medium"
              >
                Mobile
              </label>
              <input
                id="mobile_no"
                type="text"
                name="mobile_no"
                value={values.mobile_no}
                className="custom-border-1 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] "
                onChange={handleValuesChange}
              />
            </div>

            {/* ----- Availability to join ----- */}
            <div className="flex flex-col mt-8 rounded-[var(--r2)]">
              <p className="font-semibold">Available to join</p>
              <p className="text-slate-500 ">
                Lets recruiters know your availability to join
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {available_to_join_arr.map((available_to_join) => (
                  <AvailableToJoin
                    key={available_to_join}
                    available_to_join={available_to_join}
                    values={values}
                    setValues={setValues}
                  />
                ))}
              </div>
            </div>

            {/* ----- Cancel & Save buttons ----- */}
            <CancelSaveButtons
              cancelBtnRef={cancelBtnRef}
              fn={hideUpdateBasicDetailsForm}
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>
    );
  }
);

export default UpdateBasicDetailsForm;
