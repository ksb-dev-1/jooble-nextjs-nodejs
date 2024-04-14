"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
import { AiOutlineMail } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
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
        Log in to <span className="text-blue-600">Jooble</span> account
      </p>
      <div className="max-w-[500px] w-[100%] border border-slate-400 rounded-[var(--radius-3)] p-4 sm:p-8">
        <form onSubmit={handleLogin}>
          <div className="relative">
            <input
              type="email"
              name="email"
              className="border border-slate-400 rounded p-4 py-3 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
              onChange={handleChange}
              placeholder="Email Address"
            />
            {/* <AiOutlineMail className="absolute top-[1rem] left-[12px] text-slate-400 text-xl" /> */}
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              className="border border-slate-400 rounded mt-4 p-4 py-3 focus:outline-blue-600 w-[100%] focus:placeholder:text-transparent"
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {/* <MdPassword className="absolute top-[50%] left-[12px] text-slate-400 text-xl" /> */}
          </div>
          <p className="mt-2 mb-4">
            <Link href="/pages/forgot-password" className="text-blue-600">
              Forgot your password?
            </Link>
          </p>
          <button
            type="submit"
            className="h-[49.6px] rounded mt-2 p-2 w-full bg-blue-600 text-[var(--white-1)] hover:bg-blue-500 flex items-center justify-center"
          >
            {isLoading ? <div className="loader-1"></div> : "Login"}
          </button>
          <p className="mt-2">
            <span>Don't have an account? </span>
            <Link href="/pages/register" className="text-blue-600">
              Register
            </Link>
          </p>
          <div className="relative bg-slate-400 w-full h-[0.5px] my-8">
            <span className="absolute bg-white top-[-14px] left-[calc(50%-(17.63px+0.5rem))] px-4 text-lg">
              Or
            </span>
          </div>
          <button
            type="submit"
            className="h-[49.6px] rounded p-2 w-full border border-slate-400 hover:bg-slate-100 flex items-center justify-center"
          >
            <FcGoogle className="text-2xl mr-2" />
            <span>Login with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
