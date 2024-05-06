"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- recat-icons -----
import { RiLockPasswordLine } from "react-icons/ri";
// ----- redux
import { useResetPasswordMutation } from "@/redux/slices/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  const [confirm_password, setConfirmPassword] = useState("");
  const router = useRouter();
  // const { user } = useSelector((state: RootState) => state.info);

  // useEffect(() => {
  //   if (!user) router.push("/");
  // }, []);

  const [resetPassword, { isLoading, isError, isSuccess }] =
    useResetPasswordMutation();

  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await resetPassword({
        token,
        email,
        password,
        confirm_password,
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
      <div className="max-w-[450px] w-[100%] rounded-[var(--r1)] p-4 sm:p-8 bg-white custom-border-1">
        <p className="font-bold text-xl mb-8">
          {/* Reset <span className="text-blue-600">Jooble</span> password. */}
          Reset Password
        </p>
        <form onSubmit={handleForgotPassword}>
          <div className="w-full">
            <div>
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="mt-1 custom-border-1 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] text-sm sm:text-base"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="confirm_password" className="font-medium">
                Confirm
              </label>
              <input
                id="confirm_password"
                type="password"
                name="confirm_password"
                className="mt-1 custom-border-1 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%] text-sm sm:text-base"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="h-[41.6px] flex items-center justify-center rounded-[var(--r2)] mt-4 px-4 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500"
          >
            {isLoading ? <div className="loader-1"></div> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
