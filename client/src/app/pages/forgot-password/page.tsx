"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
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
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center min-h-[calc(100vh-4.5rem)] px-4 sm:px-8 xl:px-0 pt-[8.5rem] pb-[4rem]">
      {isSuccess ? (
        <div className="text-blue-600 rounded-[var(--r1)] p-8 bg-white w-full sm:w-[450px] shadow-1">
          <p className="text-center">
            We've sent you a link to your email account. Please check your email
            to verify it.
          </p>
        </div>
      ) : (
        <div className="max-w-[450px] w-[100%] rounded-[var(--r1)] p-4 sm:p-8 bg-white shadow-1">
          <p className="font-bold text-xl mb-8">
            Send Email
            {/* Send your <span className="text-blue-600">Jooble</span> email. */}
          </p>
          <form onSubmit={handleForgotPassword}>
            <div>
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 border border-slate-300 rounded-[var(--r2)] py-2 px-4 focus:outline-blue-600 w-[100%] placeholder:text-slate-500 focus:placeholder:text-transparent text-sm sm:text-base"
                onChange={(e) => setEmail(e.target.value)}
                //placeholder="Email Address"
                required
              />
            </div>
            <button
              type="submit"
              className="h-[41.6px] flex items-center justify-center rounded-[var(--r2)] mt-4 px-4 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500"
            >
              {isLoading ? <div className="loader-1"></div> : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
