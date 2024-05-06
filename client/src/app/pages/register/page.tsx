"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- recat-icons -----
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
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
    confirm_password: "",
  });

  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirm_password", values.confirm_password);

    try {
      const res = await register(formData).unwrap();

      isError && toast.error(res.data.msg);
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleGoogleAuth = () => {
    window.open("http://localhost:8000/auth/google/callback", "_self");
  };

  return (
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center min-h-[calc(100vh-4.5rem)] px-4 sm:px-0 pt-[8.5rem] pb-[4rem]">
      {isSuccess ? (
        <div className="text-blue-600 rounded-[var(--r1)] p-8 bg-white w-full sm:w-[450px] custom-border-1">
          <p className="text-center">
            We've sent you a link to your email account. Please check your email
            to verify it.
          </p>
        </div>
      ) : (
        <div className="max-w-[450px] w-[100%] rounded-[var(--r1)] p-4 sm:p-8 bg-white custom-border-1">
          <p className="font-bold text-xl mb-8">Register</p>

          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                type="name"
                name="name"
                className="mt-1 custom-border-1 rounded-[var(--r2)] py-2 px-4 focus:outline-blue-600 w-[100%] placeholder:text-slate-500 focus:placeholder:text-transparent text-sm sm:text-base"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 custom-border-1 rounded-[var(--r2)] py-2 px-4 focus:outline-blue-600 w-[100%] placeholder:text-slate-500 focus:placeholder:text-transparent text-sm sm:text-base"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between w-full box-border mt-4">
              <div className="flex-grow mr-2">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="mt-1 custom-border-1 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] text-sm sm:text-base"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex-grow ml-2">
                <label htmlFor="confirm_password" className="font-medium">
                  Confirm
                </label>
                <input
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  className="mt-1 custom-border-1 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] text-sm sm:text-base"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="h-[41.6px] flex items-center justify-center rounded-[var(--r2)] text-white mt-4 px-4 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500"
            >
              {isLoading ? <div className="loader-1"></div> : "Register"}
            </button>
          </form>

          <div className="relative bg-slate-300 w-full h-[0.5px] my-8">
            <span className="absolute bg-white top-[-12px] left-[calc(50%-(70.95px))] px-3 font-semibold">
              Or continue with
            </span>
          </div>

          <div className="flex items-center justify-between w-[calc(100%)] box-border">
            <button
              type="submit"
              className="rounded-[var(--r2)] py-2 px-4 w-full custom-border-1 hover:bg-slate-100 flex items-center justify-center max-w-[100%] box-border mr-1"
              onClick={handleGoogleAuth}
            >
              <FcGoogle className="text-2xl" />
            </button>
            <button
              type="submit"
              className="rounded-[var(--r2)] py-2 px-4 w-full custom-border-1 hover:bg-slate-100 flex items-center justify-center max-w-[100%] box-border ml-1"
            >
              <FaGithub className="text-2xl" />
            </button>
          </div>

          <p className="mt-4">
            <span>Already have an account? </span>
            <Link href="/pages/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
