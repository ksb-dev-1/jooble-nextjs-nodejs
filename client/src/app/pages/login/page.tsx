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
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-0">
      <div className="max-w-[500px] w-[100%] border border-slate-400 rounded p-4 sm:p-8">
        <p className="font-bold text-lg sm:text-2xl mb-8 text-center">
          Log in to <span className="text-blue-600">Jooble</span> account
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            className="border border-slate-400 rounded p-4 py-3 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
            onChange={handleChange}
            placeholder="Email Address"
          />

          <input
            type="password"
            name="password"
            className="border border-slate-400 rounded mt-4 p-4 py-3 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
            onChange={handleChange}
            placeholder="Enter Password"
          />
          <p className="mt-4 mb-4">
            <Link
              href="/pages/forgot-password"
              className="text-blue-600 font-semibold"
            >
              Forgot your password?
            </Link>
          </p>
          <button
            type="submit"
            className="h-[49.6px] rounded mt-2 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
          >
            {isLoading ? <div className="loader-1"></div> : "Login"}
          </button>
        </form>
        <div className="relative bg-slate-400 w-full h-[0.5px] my-8">
          <span className="absolute bg-white top-[-12px] left-[calc(50%-(20.81px))] px-3">
            Or
          </span>
        </div>
        <div className="flex items-center justify-between w-[calc(100%)] box-border">
          <button
            type="submit"
            className="h-[49.6px] rounded p-2 w-full border border-slate-400 hover:bg-slate-100 flex items-center justify-center max-w-[100%] box-border mr-2"
          >
            <FcGoogle className="text-2xl" />
          </button>
          <button
            type="submit"
            className="h-[49.6px] rounded p-2 w-full border border-slate-400 hover:bg-slate-100 flex items-center justify-center max-w-[100%] box-border ml-2"
          >
            <FaGithub className="text-2xl" />
          </button>
        </div>
        <p className="mt-4">
          <span>Don't have an account? </span>
          <Link href="/pages/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
