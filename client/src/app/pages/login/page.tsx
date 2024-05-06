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
      //dispatch(userApi.util.invalidateTags([{ type: "Basic" }]));
      const res = await login(values).unwrap();

      if (res.user) {
        dispatch(userApi.util.invalidateTags([{ type: "Basic" }]));
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

  const handleGoogleAuth = () => {
    window.open("http://localhost:8000/auth/google/callback", "_self");
  };

  return (
    <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center min-h-[calc(100vh-4.5rem)] px-4 sm:px-0 pt-[8.5rem] pb-[4rem] ">
      <div className="max-w-[450px] w-[100%] rounded-[var(--r1)] p-4 sm:p-8 bg-white custom-border-1">
        <p className="font-bold text-xl mb-8">Login</p>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 border custom-border-1 rounded-[var(--r2)] py-2 px-4 focus:outline-blue-600 w-[100%] placeholder:text-slate-500 focus:placeholder:text-transparent text-sm sm:text-base"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 border custom-border-1 rounded-[var(--r2)] py-2 px-4 focus:outline-blue-600 w-[100%] placeholder:text-slate-500 focus:placeholder:text-transparent text-sm sm:text-base"
              onChange={handleChange}
              required
            />
          </div>

          <p className="mt-4 mb-4">
            <Link href="/pages/forgot-password" className="text-blue-600">
              Forgot your password?
            </Link>
          </p>

          <button
            type="submit"
            className="h-[41.6px] flex items-center justify-center rounded-[var(--r2)] mt-2 p-2 w-full bg-blue-600 text-white hover:bg-blue-500"
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
            className="py-2 rounded-[var(--r2)] p-2 w-full border custom-border-1 hover:bg-slate-100 flex items-center justify-center max-w-[100%] box-border mr-2"
            onClick={handleGoogleAuth}
          >
            <FcGoogle className="text-2xl" />
          </button>
          <button
            type="submit"
            className="py-2 rounded-[var(--r2)] p-2 w-full border custom-border-1 hover:bg-slate-100 flex items-center justify-center max-w-[100%] box-border ml-2"
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
