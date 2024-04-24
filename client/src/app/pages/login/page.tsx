"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
// ----- redux -----
import { useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/slices/authApi";
import { setCredentials } from "@/redux/slices/userInfoSlice";
import { userApi } from "@/redux/slices/userApi";

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
  const [login, { isLoading, isError }] = useLoginMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      dispatch(userApi.util.invalidateTags([{ type: "User" }]));
      const res = await login(values).unwrap();

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
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center min-h-[calc(100vh-4.5rem)] px-4 sm:px-0 pt-[8.5rem] pb-[4rem] ">
      <div className="max-w-[500px] w-[100%] rounded-[var(--r1)] p-4 sm:p-8 bg-white shadow-1">
        <p className="font-bold text-xl mb-8">
          Login
          {/* in to <span className="text-blue-600">Jooble</span> account */}
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            className="border border-slate-300 rounded-[var(--r1)] px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 w-[100%] placeholder:text-slate-500 focus:placeholder:text-transparent text-sm sm:text-base"
            onChange={handleChange}
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            name="password"
            className="border border-slate-300 rounded-[var(--r1)] mt-4 px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 w-[100%] placeholder:text-slate-500 focus:placeholder:text-transparent text-sm sm:text-base"
            onChange={handleChange}
            placeholder="Password"
            required
          />

          <p className="mt-4 mb-4">
            <Link href="/pages/forgot-password" className="text-blue-600">
              Forgot your password?
            </Link>
          </p>

          <button
            type="submit"
            className="h-[37.6px] sm:h-[49.6px] rounded-[var(--r1)] mt-2 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
          >
            {isLoading ? <div className="loader-1"></div> : "Login"}
          </button>
        </form>

        <div className="relative bg-slate-300 w-full h-[0.5px] my-8">
          <span className="absolute bg-white top-[-12px] left-[calc(50%-(70.95px))] px-3 font-semibold">
            Or continue with
          </span>
        </div>

        <div className="flex items-center justify-between w-[calc(100%)] box-border">
          <button
            type="submit"
            className="h-[37.6px] sm:h-[49.6px] rounded-[var(--r1)] p-2 w-full border border-slate-300 hover:bg-slate-100 flex items-center justify-center max-w-[100%] box-border mr-2"
          >
            <FcGoogle className="text-2xl" />
          </button>
          <button
            type="submit"
            className="h-[37.6px] sm:h-[49.6px] rounded-[var(--r1)] p-2 w-full border border-slate-300 hover:bg-slate-100 flex items-center justify-center max-w-[100%] box-border ml-2"
          >
            <FaGithub className="text-2xl" />
          </button>
        </div>

        <p className="mt-4">
          <span>Don't have an account? </span>
          <Link href="/pages/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
