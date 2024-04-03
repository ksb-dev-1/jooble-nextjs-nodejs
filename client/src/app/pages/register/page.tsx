"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";

// ----- react-toastify -----
import { toast } from "react-toastify";
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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await register(values).unwrap();

      isError && toast.error(res.data.msg);
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0">
      {isSuccess ? (
        <div className="border border-slate-300 rounded px-8 py-4 flex flex-col items-center">
          <p className="mb-2">We've sent you a link to your email account.</p>
          <p>Please check to verify.</p>
        </div>
      ) : (
        <>
          <p className="font-bold text-xl sm:text-3xl mb-8 text-center">
            Register for a <span className="text-blue-500">Jooble</span> account
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-[500px] w-[100%] border border-slate-300 rounded-[var(--radius-3)] p-4 sm:p-8"
          >
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="border border-slate-300 rounded mt-2 p-2 focus:outline-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                className="border border-slate-300 rounded mt-2 p-2 focus:outline-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="border border-slate-300 rounded mt-2 p-2 focus:outline-blue-500"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border border-slate-300 rounded mt-2 p-2 focus:outline-blue-500"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="h-[42px] font-semibold rounded mt-4 p-2 w-full bg-blue-500 text-[var(--white-1)] hover:bg-blue-400 flex items-center justify-center"
            >
              {isLoading ? <div className="loader-1"></div> : "Register"}
            </button>
            <p className="mt-4">
              <span>Already have an account? </span>
              <Link href="/pages/login" className="text-blue-500">
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
