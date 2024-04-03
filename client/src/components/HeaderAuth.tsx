"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ----- react-icons -----
import { FaCircleUser } from "react-icons/fa6";
import { GrMenu } from "react-icons/gr";
import { SlUser } from "react-icons/sl";
// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- redux -----
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/slices/authApi";
import { removeUser } from "@/redux/slices/userInfoSlice";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const HeaderAuth: React.FC = () => {
  const pathname = usePathname();
  //const path = pathname.includes("login") || pathname.includes("register");
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.info);
  const [logout, { isLoading, isError }] = useLogoutMutation();

  const handleLogout = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await logout(user).unwrap();
      dispatch(removeUser());

      res.msg && toast.success("User logged out successfully");

      isError && toast.error(res.data.msg);
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

  return (
    <>
      <div className="hidden sm:flex items-center">
        {/* {typeof window === "undefined" && <div className="loader-3"></div>} */}

        {typeof window !== "undefined" && !user && (
          <Link
            href="/pages/login"
            className="border border-slate-300 rounded hover:bg-slate-100 min-w-[83.79px] h-[33.6px] hidden sm:flex items-center justify-center"
          >
            Login
          </Link>
        )}

        {typeof window !== "undefined" && pathname !== "/" && !user && (
          <Link
            href="/pages/register"
            className="border text-white bg-blue-500 border-blue-500 rounded hover:bg-blue-400 min-w-[83.79px] h-[33.6px] hidden sm:flex items-center justify-center ml-4"
          >
            Register
          </Link>
        )}
      </div>

      {typeof window !== "undefined" && user && (
        <Link
          href="#"
          className="border border-slate-300 rounded hover:bg-slate-100 min-w-[83.79px] h-[33.6px] hidden sm:flex items-center justify-center"
          onClick={(e) => {
            !isLoading && handleLogout(e);
          }}
        >
          {isLoading ? <span className="loader-3"></span> : "Logout"}
        </Link>
      )}
    </>
  );
};

export default HeaderAuth;
