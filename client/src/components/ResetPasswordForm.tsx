"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// ----- react-toastify -----
import { toast } from "react-toastify";
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

      console.log(isSuccess);

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
      {isSuccess ? (
        <div className="border border-slate-300 rounded px-8 py-4 flex flex-col items-center">
          <p className="mb-2">We've sent you a link to your email account.</p>
          <p>Please check to verify.</p>
        </div>
      ) : (
        <>
          <p className="font-bold text-xl sm:text-3xl mb-8 text-center">
            Send your <span className="text-blue-500">Jooble</span> email.
          </p>
          <form
            onSubmit={handleForgotPassword}
            className="max-w-[500px] w-[100%] border border-slate-300 rounded-[var(--radius-3)] p-4 sm:p-8"
          >
            <div className="flex flex-col mt-4">
              <label htmlFor="password">Enter new password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="border border-slate-300 rounded mt-2 p-2 focus:outline-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="password">Confirm new password</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                className="border border-slate-300 rounded mt-2 p-2 focus:outline-blue-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="h-[42px] font-semibold rounded mt-4 p-2 w-full bg-blue-500 text-[var(--white-1)] hover:bg-blue-400 flex items-center justify-center"
            >
              {isLoading ? <div className="loader-1"></div> : "Submit"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPasswordForm;
