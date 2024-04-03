"use client";

import { FormEvent, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import svg from "../../public/job-icon-4.svg";

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

// components
import Menu from "./Menu";

const HeaderAuthNoSSR = dynamic(() => import("./HeaderAuth"), { ssr: false });

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const Header: React.FC = () => {
  const pathname = usePathname();
  const path = pathname.includes("login") || pathname.includes("register");
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.info);
  const [logout, { isLoading, isError }] = useLogoutMutation();

  const showMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.zIndex = "20";
      menuRef.current.style.opacity = "1";
      menuRef.current.style.transition = "opacity 0.2s ease";
    }
  };

  const hideMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.zIndex = "-1";
      menuRef.current.style.opacity = "0";
      menuRef.current.style.transition = "opacity 0.2s ease";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        hideMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async (e: FormEvent) => {
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
      <header className="fixed top-0 left-0 w-full bg-white z-10 px-4 lg:px-8 xl:px-0 border shadow-sm">
        <div className="max-w-[1100px] w-[100%] h-[4rem] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <p className="relative h-[35px] w-[35px] mr-2 bg-blue-500 rounded-full">
                <Image
                  src={svg}
                  alt="icon"
                  className="h-[20px] w-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </p>
              <span className="text-blue-500 font-bold text-3xl cursor-pointer no-underline">
                Jooble
              </span>
            </Link>

            <div className="hidden sm:block">
              <Link href="#" className="mx-8">
                Jobs
              </Link>
              <Link href="#" className="mr-8">
                Pricing
              </Link>
              <Link href="#" className="">
                Dashboard
              </Link>
            </div>
          </div>

          <HeaderAuthNoSSR />

          <span
            className="text-2xl sm:hidden cursor-pointer"
            onClick={showMenu}
          >
            <GrMenu />
          </span>
        </div>
      </header>
      <Menu ref={menuRef} hideMenu={hideMenu} />
    </>
  );
};

export default Header;
