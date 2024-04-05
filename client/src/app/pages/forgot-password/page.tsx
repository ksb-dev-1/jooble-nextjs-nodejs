"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
import { MdOutlineEmail } from "react-icons/md";
// ----- redux
import { useForgotPasswordMutation } from "@/redux/slices/authApi";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, isError, isSuccess }] =
    useForgotPasswordMutation();

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await forgotPassword({ email }).unwrap();

      isError && toast.error(res.data.msg);
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

  return (
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0">
      {isSuccess ? (
        <div className="border border-slate-300 rounded p-4 flex flex-col items-center">
          <p className="mb-2 text-center">
            We've sent you a link to your email account.
          </p>
          <p>Please check to verify.</p>
        </div>
      ) : (
        <>
          <p className="font-bold text-xl sm:text-2xl mb-8 text-center">
            Send your <span className="text-blue-600">Jooble</span> email.
          </p>
          <form
            onSubmit={handleForgotPassword}
            className="max-w-[400px] w-[100%] border border-slate-300 rounded-[var(--radius-3)] p-4 sm:p-8"
          >
            <div className="relative">
              <input
                type="email"
                name="email"
                className="border border-slate-300 rounded p-2 pl-8 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <MdOutlineEmail className="absolute top-1/3 left-[8px] text-slate-400" />
            </div>
            <button
              type="submit"
              className="h-[42px] rounded mt-4 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
            >
              {isLoading ? <div className="loader-1"></div> : "Submit"}
            </button>
            <Link
              href="/pages/login"
              className="mt-4 border border-slate-300 rounded hover:bg-slate-100 p-2 w-[75px] h-[33.2px] flex items-center justify-center"
            >
              Login
            </Link>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
