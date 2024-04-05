"use client";

import { useState, FormEvent, ChangeEvent, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- recat-icons -----
import { BiSolidUserCircle } from "react-icons/bi";
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
        <div className="border border-slate-300 rounded p-4 flex flex-col items-center">
          <p className="mb-2">We've sent you a link to your email account.</p>
          <p>Please check to verify.</p>
        </div>
      ) : (
        <>
          <p className="font-bold text-xl sm:text-2xl mb-8 text-center">
            Register for a <span className="text-blue-600">Jooble</span> account
          </p>
          <form
            onSubmit={handleRegister}
            className="max-w-[400px] w-[100%] border border-slate-300 rounded-[var(--radius-3)] p-4 sm:p-8"
          >
            <div className="w-[100%] flex items-center justify-center">
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
                className="relative cursor-pointer block w-[100px] h-[100px] rounded-full overflow-hidden border border-slate-300"
                onMouseOver={() => setOnHoverImage(true)}
                onMouseLeave={() => setOnHoverImage(false)}
              >
                {onHoverImage && (
                  <FaUpload className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-slate-300" />
                )}
                {!onHoverImage && !values.image && (
                  <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-slate-300" />
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

            <div className="relative">
              <input
                type="text"
                name="name"
                className="border border-slate-300 rounded mt-4 p-2 pl-8 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
                onChange={handleChange}
                placeholder="Name"
              />
              <FaRegUser className="absolute top-1/2 left-[8px] text-slate-400" />
            </div>
            <div className="relative">
              <input
                type="email"
                name="email"
                className="border border-slate-300 rounded mt-4 p-2 pl-8 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
                onChange={handleChange}
                placeholder="Email"
              />
              <MdOutlineEmail className="absolute top-1/2 left-[8px] text-slate-400" />
            </div>
            <div className="relative">
              <input
                type="password"
                name="password"
                className="border border-slate-300 rounded mt-4 p-2 pl-8 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
                onChange={handleChange}
                placeholder="Enter Password"
              />
              <RiLockPasswordLine className="absolute top-1/2 left-[8px] text-slate-400" />
            </div>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                className="border border-slate-300 rounded mt-4 p-2 pl-8 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              <RiLockPasswordLine className="absolute top-1/2 left-[8px] text-slate-400" />
            </div>

            <button
              type="submit"
              className="h-[42px] rounded mt-4 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
            >
              {isLoading ? <div className="loader-1"></div> : "Register"}
            </button>
            <p className="mt-4">
              <span>Already have an account? </span>
              <Link href="/pages/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
