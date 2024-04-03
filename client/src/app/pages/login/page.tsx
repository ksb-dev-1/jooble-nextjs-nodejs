"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- redux -----
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/redux/slices/authApi";
import { setCredentials } from "@/redux/slices/userInfoSlice";
import { RootState } from "@/redux/store";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const LoginPage: React.FC = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [register, { isLoading, isError }] = useLoginMutation();
  const { user } = useSelector((state: RootState) => state.info);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await register(values).unwrap();

      if (res.user) {
        dispatch(setCredentials({ ...res.user }));
        router.push("/");
        toast.success("User logged in successfully");
      }

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
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] pt-[4rem] px-4 sm:px-8 xl:px-0">
      <p className="font-bold text-xl sm:text-3xl mb-8 text-center">
        Log in to <span className="text-blue-500">Jooble</span> account
      </p>
      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="max-w-[500px] w-[100%] border border-slate-300 rounded-[var(--radius-3)] p-4 sm:p-8"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="off"
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
            autoComplete="off"
            id="password"
            name="password"
            className="border border-slate-300 rounded mt-2 p-2 focus:outline-blue-500"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="h-[42px] font-semibold rounded mt-4 p-2 w-full bg-blue-500 text-[var(--white-1)] hover:bg-blue-400 flex items-center justify-center"
        >
          {isLoading ? <div className="loader-1"></div> : "Login"}
        </button>
        <p className="mt-2">
          <span>Don't have an account? </span>
          <Link href="/pages/register" className="text-blue-500">
            Register
          </Link>
        </p>
        <p className="mt-2">
          <span>Forgot your password? </span>
          <Link href="/pages/forgot-password" className="text-blue-500">
            Reset password
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
