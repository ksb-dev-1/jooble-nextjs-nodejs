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
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0">
      {isSuccess ? (
        <div className="border border-slate-300 rounded p-4 flex flex-col items-center">
          <p className="mb-2 text-center">
            We've sent you a link to your email account.
          </p>
          <p>Please check to verify.</p>
        </div>
      ) : (
        <div className="max-w-[500px] w-[100%] border border-slate-400 rounded p-4 sm:p-8">
          <p className="font-bold text-lg sm:text-2xl mb-8 text-center">
            Send your <span className="text-blue-600">Jooble</span> email.
          </p>
          <form onSubmit={handleForgotPassword}>
            <div className="relative">
              <input
                type="email"
                name="email"
                className="border border-slate-400 rounded p-4 py-3 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <button
              type="submit"
              className="h-[49.6px] rounded mt-4 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
            >
              {isLoading ? <div className="loader-1"></div> : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
