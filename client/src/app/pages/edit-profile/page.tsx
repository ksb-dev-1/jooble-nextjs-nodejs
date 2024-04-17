"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import Image from "next/image";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- recat-icons -----
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaUpload } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
// ----- redux
import { useRegisterMutation } from "@/redux/slices/authApi";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const EditProfilePage: React.FC = () => {
  // const availableToJoinRef = useRef<HTMLDivElement>(null);
  // const availableToJoinModalRef = useRef<HTMLDivElement>(null);
  // const downIconRef = useRef<HTMLSpanElement>(null);

  const [values, setValues] = useState({
    image: "",
    first_name: "",
    last_name: "",
    location: "",
    mobile_no: "",
    available_to_join: "",
    password: "",
    confirmPassword: "",
  });

  const [onHoverImage, setOnHoverImage] = useState(false);
  const [available, setAvailable] = useState(true);

  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", values.image);
    if (values.available_to_join) {
      formData.append("available_to_join", values.available_to_join);
    }
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("location", values.location);
    formData.append("mobile_no", values.mobile_no);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);

    try {
      const res = await register(formData).unwrap();

      isError && toast.error(res.data.msg);
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

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

  // const showModal = () => {
  //   if (downIconRef.current && availableToJoinModalRef.current) {
  //     downIconRef.current.style.transform = "rotate(180deg)";
  //     availableToJoinModalRef.current.style.transform = "scale(1)";
  //     availableToJoinModalRef.current.style.opacity = "1";
  //   }
  // };

  // const hideModal = () => {
  //   if (downIconRef.current && availableToJoinModalRef.current) {
  //     downIconRef.current.style.transform = "rotate(0deg)";
  //     availableToJoinModalRef.current.style.transform = "scale(0)";
  //     availableToJoinModalRef.current.style.opacity = "0";
  //   }
  // };

  return (
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center min-h-[calc(100vh-4.5rem)] px-4 sm:px-0 pt-[8.5rem] pb-[4rem]">
      <div className="max-w-[500px] w-[100%] rounded p-4 sm:p-8 bg-white shadow-1">
        <p className="font-bold text-lg sm:text-2xl mb-8 text-center">
          Update your <span className="text-blue-600">Jooble</span> profile
        </p>

        <form onSubmit={handleRegister}>
          <div className="flex items-center justify-center">
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
              className="relative cursor-pointer block w-[75px] sm:w-[100px] h-[75px] sm:h-[100px] rounded-full overflow-hidden border border-slate-400"
              onMouseOver={() => setOnHoverImage(true)}
              onMouseLeave={() => setOnHoverImage(false)}
            >
              {onHoverImage && (
                <FaUpload className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl text-slate-300" />
              )}
              {!onHoverImage && !values.image && (
                <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-8xl text-slate-300" />
              )}
              {values.image && !onHoverImage && (
                <Image src={values.image} alt="pic" width={100} height={100} />
              )}
            </label>
          </div>

          <div className="flex items-center justify-center my-8">
            <div
              className="flex items-center cursor-pointer mr-4"
              onClick={() => {
                setAvailable(true);
                setValues({ ...values, available_to_join: "available" });
              }}
            >
              {available ? (
                <span className="h-[17.5px] w-[17.5px] border border-blue-600 bg-blue-600 mr-2 rounded-full"></span>
              ) : (
                <span className="h-[17.5px] w-[17.5px] border border-slate-400 mr-2 rounded-full"></span>
              )}
              <span className="text-sm">Available</span>
            </div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                setAvailable(false);
                setValues({ ...values, available_to_join: "not available" });
              }}
            >
              {!available ? (
                <span className="h-[17.5px] w-[17.5px] border border-blue-600 bg-blue-600 mr-2 rounded-full"></span>
              ) : (
                <span className="h-[17.5px] w-[17.5px] border border-slate-400 mr-2 rounded-full"></span>
              )}
              <span className="text-sm">Not Available</span>
            </div>
          </div>

          {/* <div
              className="relative w-[150.1px]"
              onMouseOver={showModal}
              onMouseLeave={hideModal}
            >
              <div
                ref={availableToJoinRef}
                className="flex items-center justify-center border border-slate-400 rounded py-[0.625rem] sm:py-3 w-full cursor-pointer text-sm text-center"
              >
                Not Available{" "}
                <span ref={downIconRef} className="ml-4">
                  <BsChevronDown />
                </span>
              </div>
              <div
                ref={availableToJoinModalRef}
                className="absolute top-[100%] border border-slate-400 rounded p-2 w-full bg-white opacity-0 transition-opacity duration-300"
              >
                <p
                  className="hover:bg-slate-100 rounded px-4 py-2 cursor-pointer text-sm"
                  onClick={hideModal}
                >
                  Available
                </p>
                <p
                  className="hover:bg-slate-100 rounded px-4 py-2 cursor-pointer text-sm"
                  onClick={hideModal}
                >
                  Not Available
                </p>
              </div>
            </div> */}

          <div className="flex items-center justify-between w-[calc(100%-0.5rem)] box-border">
            <div className="max-w-[50%] box-border">
              <input
                type="text"
                name="first_name"
                className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent mr-2 w-[100%]"
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div className="max-w-[50%] box-border">
              <input
                type="text"
                name="last_name"
                className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent ml-2 w-[100%]"
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-[calc(100%-0.5rem)] box-border mt-4">
            <div className="max-w-[50%] box-border">
              <input
                type="text"
                name="location"
                className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent mr-2 w-[100%]"
                onChange={handleChange}
                placeholder="Location"
              />
            </div>
            <div className="max-w-[50%] box-border">
              <input
                type="text"
                name="mobile_no"
                className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent ml-2 w-[100%]"
                onChange={handleChange}
                placeholder="Mobile"
              />
            </div>
          </div>

          <span className="w-full h-[0.5px] inline-block bg-slate-300"></span>

          {/* <div className="relative mt-4">
            <input
              type="email"
              name="email"
              className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 w-[100%] placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent"
              onChange={handleChange}
              placeholder="Email"
            />
          </div> */}

          <div className="flex items-center justify-between w-[calc(100%-0.5rem)] box-border mt-4 ">
            <div className="max-w-[50%] box-border">
              <input
                type="password"
                name="password"
                className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent mr-2 w-[100%]"
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="max-w-[50%] box-border">
              <input
                type="password"
                name="confirmPassword"
                className="border border-slate-400 rounded p-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent ml-2 w-[100%]"
                onChange={handleChange}
                placeholder="Confirm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="h-[41.6px] sm:h-[49.6px] rounded mt-4 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
          >
            {isLoading ? <div className="loader-1"></div> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
