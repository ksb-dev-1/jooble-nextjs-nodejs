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
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-8 xl:px-0">
      <p className="font-bold text-xl sm:text-2xl mb-8 text-center">
        Reset <span className="text-blue-600">Jooble</span> password.
      </p>
      <form
        onSubmit={handleForgotPassword}
        className="max-w-[400px] w-[100%] border border-slate-300 rounded-[var(--radius-3)] p-4 sm:p-8"
      >
        <div className="relative">
          <input
            type="password"
            name="password"
            className="border border-slate-300 rounded p-2 pl-8 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <RiLockPasswordLine className="absolute top-[30%] left-[8px] text-slate-400" />
        </div>
        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            className="border border-slate-300 rounded mt-4 p-2 pl-8 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <RiLockPasswordLine className="absolute top-1/2 left-[8px] text-slate-400" />
        </div>
        <button
          type="submit"
          className="h-[42px] font-semibold rounded mt-4 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
        >
          {isLoading ? <div className="loader-1"></div> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
