"use client";

import { useState, FormEvent, ChangeEvent, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- recat-icons -----
import { BiSolidUserCircle } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaUpload } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
// ----- redux
import { useRegisterMutation } from "@/redux/slices/authApi";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const RegisterPage: React.FC = () => {
  const [values, setValues] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [onHoverImage, setOnHoverImage] = useState(false);
  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("name", values.name);
    formData.append("email", values.email);
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

  return (
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0">
      {isSuccess ? (
        <div className="border border-slate-400 rounded p-4 flex flex-col items-center">
          <p className="mb-2">We've sent you a link to your email account.</p>
          <p>Please check to verify.</p>
        </div>
      ) : (
        <>
          <p className="font-bold text-xl sm:text-3xl mb-8 text-center">
            Register for a <span className="text-blue-600">Jooble</span> account
          </p>
          <div className="max-w-[500px] w-[100%] border border-slate-400 rounded-[var(--radius-3)] p-4 sm:p-8">
            <form onSubmit={handleRegister}>
              <div className="w-[100%] flex items-center justify-center mb-4 sm:mb-8">
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
                    <Image
                      src={values.image}
                      alt="pic"
                      width={100}
                      height={100}
                    />
                  )}
                </label>
              </div>

              <div className="flex items-center justify-between w-[calc(100%-0.5rem)] box-border">
                <div className="max-w-[50%] box-border">
                  <input
                    type="text"
                    name="name"
                    className="border border-slate-400 rounded p-4 py-3 focus:outline-blue-600 focus:placeholder:text-transparent mr-2 w-[100%]"
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                  {/* <FaRegUser className="absolute top-[1rem] left-[12px] text-slate-400 text-xl" /> */}
                </div>
                <div className="max-w-[50%] box-border">
                  <input
                    type="text"
                    name="name"
                    className="border border-slate-400 rounded p-4 py-3 focus:outline-blue-600 focus:placeholder:text-transparent ml-2 w-[100%]"
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                  {/* <FaRegUser className="absolute top-[1rem] left-[12px] text-slate-400 text-xl" /> */}
                </div>
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="border border-slate-400 rounded mt-4 p-4 py-3 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
                  onChange={handleChange}
                  placeholder="Email Address"
                />
                {/* <AiOutlineMail className="absolute top-1/2 left-[12px] text-slate-400 text-xl" /> */}
              </div>

              <div className="flex items-center justify-between w-[calc(100%-0.5rem)] box-border">
                <div className="max-w-[50%] box-border">
                  <input
                    type="password"
                    name="password"
                    className="border border-slate-400 rounded mt-4 p-4 py-3 focus:outline-blue-600 focus:placeholder:text-transparent mr-2 w-[100%]"
                    onChange={handleChange}
                    placeholder="Enter Password"
                  />
                  {/* <MdPassword className="absolute top-1/2 left-[12px] text-slate-400 text-xl" /> */}
                </div>
                <div className="max-w-[50%] box-border">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="border border-slate-400 rounded mt-4 p-4 py-3 focus:outline-blue-600 focus:placeholder:text-transparent ml-2 w-[100%]"
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                  {/* <MdPassword className="absolute top-1/2 left-[12px] text-slate-400 text-xl" /> */}
                </div>
              </div>

              <button
                type="submit"
                className="h-[49.6px] rounded mt-4 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
              >
                {isLoading ? <div className="loader-1"></div> : "Register"}
              </button>
              <p className="mt-2">
                <span>Already have an account? </span>
                <Link href="/pages/login" className="text-blue-600">
                  Login
                </Link>
              </p>
              <div className="relative bg-slate-400 w-full h-[0.5px] my-8">
                <span className="absolute bg-white top-[-14px] left-[calc(50%-(17.63px+0.5rem))] px-4 text-lg">
                  Or
                </span>
              </div>
              <button
                type="submit"
                className="h-[49.6px] rounded p-2 w-full border border-slate-400 hover:bg-slate-100 flex items-center justify-center"
              >
                <FcGoogle className="text-2xl mr-2" />
                <span>Login with Google</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
