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
        <div className="text-blue-600 rounded-[var(--r1)] p-8 bg-white w-full sm:w-[500px] shadow-1">
          <p className="text-center">
            We've sent you a link to your email account. Please check your email
            to verify it.
          </p>
        </div>
      ) : (
        <div className="max-w-[500px] w-[100%] rounded-[var(--r1)] p-4 sm:p-8 bg-white shadow-1">
          <p className="font-bold text-xl mb-8">
            Send Email
            {/* Send your <span className="text-blue-600">Jooble</span> email. */}
          </p>
          <form onSubmit={handleForgotPassword}>
            <div className="relative">
              <input
                type="email"
                name="email"
                className="border border-slate-300 rounded-[var(--r1)] px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 w-[100%] placeholder:text-slate-500 focus:placeholder:text-transparent text-sm sm:text-base"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />
            </div>
            <button
              type="submit"
              className="h-[37.6px] sm:h-[49.6px] rounded-[var(--r1)] mt-4 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
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
