"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
// ----- react-icons -----
import { FiSearch } from "react-icons/fi";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
// ----- redux -----
import { useGetCurrentUserQuery } from "@/redux/slices/userApi";
// components
import Menu from "./Menu";
import { useHandleHeaderScroll } from "@/hooks/useHeaderScroll";
// ----- skeletons -----
import HeaderSkeleton from "@/skeletons/HeaderSkeleton";

const HeaderAuthNoSSR = dynamic(() => import("./HeaderAuth"), { ssr: false });

const Header: React.FC = () => {
  const { data, isFetching, isSuccess, isError } = useGetCurrentUserQuery();
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  useHandleHeaderScroll(headerRef, headerInnerRef);

  const showMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.transform = "translateX(0)";
    }
  };

  const hideMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.transform = "translateX(-100%)";
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

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full bg-white z-20 px-4 sm:px-8 transition duration-300"
      >
        {isFetching && <HeaderSkeleton />}
        {!isFetching && (
          <>
            <div
              ref={headerInnerRef}
              className="max-w-[1280px] w-[100%] h-[4.5rem] mx-auto flex items-center justify-between transition duration-300"
            >
              <div className="flex items-center sm:justify-start md:w-[33.33%]">
                <div
                  className="relative h-[35px] w-[35px] rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer sm:hidden mr-2"
                  onClick={showMenu}
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">
                    <MdMenu />
                  </span>
                </div>
                <Link
                  href="/"
                  className="flex items-center transition-all duration-300 hover:tracking-wide"
                >
                  <span className="text-blue-600 font-bold text-3xl cursor-pointer">
                    naukri
                  </span>
                </Link>
              </div>

              <div className="hidden sm:flex items-center justify-center ml-4 md:w-[33.33%]">
                <Link
                  href="/pages/jobs"
                  className="py-2 px-4 hover:bg-slate-100 rounded-[var(--r1)]"
                >
                  Jobs
                </Link>
                <Link
                  href="/pages/pricing"
                  className="py-2 px-4 hover:bg-slate-100 rounded-[var(--r1)]"
                >
                  Pricing
                </Link>
                <Link
                  href="/pages/dashboard"
                  className="py-2 px-4 hover:bg-slate-100 rounded-[var(--r1)]"
                >
                  Dashboard
                </Link>
              </div>

              <div className="md:w-[33.33%] flex items-center justify-end">
                <HeaderAuthNoSSR />
              </div>

              <span
                className="text-xl sm:hidden cursor-pointer text-white"
                onClick={showMenu}
              >
                <FiSearch />
              </span>
            </div>
          </>
        )}
      </header>
      <Menu ref={menuRef} hideMenu={hideMenu} />
    </>
  );
};

export default Header;
