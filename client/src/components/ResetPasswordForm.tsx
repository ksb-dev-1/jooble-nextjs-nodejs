"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- recat-icons -----
import { RiLockPasswordLine } from "react-icons/ri";
// ----- redux
import { useResetPasswordMutation } from "@/redux/slices/authApi";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const ResetPasswordForm: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const [resetPassword, { isLoading, isError, isSuccess }] =
    useResetPasswordMutation();

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await resetPassword({
        token,
        email,
        password,
        confirmPassword,
      }).unwrap();

      if (res.msg) {
        router.push("/pages/login");
        toast.success("Reset password successful");
      }

      isError && toast.error(res.data.msg);
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

  return (
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center min-h-[calc(100vh-4.5rem)] px-4 sm:px-8 xl:px-0 pt-[8.5rem] pb-[4rem]">
      <div className="max-w-[500px] w-[100%] rounded p-4 sm:p-8 bg-white shadow-1">
        <p className="font-bold text-lg sm:text-2xl mb-8 text-center">
          Reset <span className="text-blue-600">Jooble</span> password.
        </p>
        <form onSubmit={handleForgotPassword}>
          <div className="flex items-center justify-between w-[calc(100%-0.5rem)] box-border">
            <div className="max-w-[50%] box-border">
              <input
                type="password"
                name="password"
                className="border border-slate-400 rounded px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent mr-2 w-[100%] text-sm sm:text-base"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="max-w-[50%] box-border">
              <input
                type="password"
                name="confirmPassword"
                className="border border-slate-400 rounded px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:placeholder:text-transparent ml-2 w-[100%] text-sm sm:text-base"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="h-[37.6px] sm:h-[49.6px] rounded mt-4 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
          >
            {isLoading ? <div className="loader-1"></div> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
