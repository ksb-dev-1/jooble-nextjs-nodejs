"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import svg from "../../public/job-icon-4.svg";

// ----- react-icons -----
import { GrMenu } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

// components
import Menu from "./Menu";
import { useHandleHeaderScroll } from "@/hooks/useHeaderScroll";

const HeaderAuthNoSSR = dynamic(() => import("./HeaderAuth"), { ssr: false });

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const Header: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  useHandleHeaderScroll(headerRef, headerInnerRef);

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

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full bg-blue-600 z-20 px-4 lg:px-8 transition duration-300"
      >
        <div
          ref={headerInnerRef}
          className="max-w-[1280px] w-[100%] h-[4.5rem] mx-auto flex items-center justify-between transition duration-300"
        >
          <span
            className="text-xl sm:hidden cursor-pointer text-white"
            onClick={showMenu}
          >
            <GrMenu />
          </span>

          <div className="flex items-center justify-center w-full sm:justify-start md:w-[33.33%]">
            <Link
              href="/"
              className="flex items-center transition hover:scale-95"
            >
              {/* <p className="relative h-[25px] sm:h-[35px] w-[25px] sm:w-[35px] mr-2 bg-blue-600 rounded-full">
                <Image
                  src={svg}
                  alt="icon"
                  className="h-[15px] sm:h-[20px] w-[15px] sm:w-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </p> */}
              <span className="text-white font-bold text-2xl sm:text-3xl cursor-pointer no-underline">
                Jooble
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center justify-center ml-4 md:w-[33.33%]">
            <Link
              href="/pages/jobs"
              className="py-2 px-4 text-white hover:bg-blue-500 rounded-[var(--r1)]"
            >
              Jobs
            </Link>
            <Link
              href="/pages/pricing"
              className="py-2 px-4 text-white hover:bg-blue-500 rounded-[var(--r1)]"
            >
              Pricing
            </Link>
            <Link
              href="/pages/dashboard"
              className="py-2 px-4 text-white hover:bg-blue-500 rounded-[var(--r1)]"
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
      </header>
      <Menu ref={menuRef} hideMenu={hideMenu} />
    </>
  );
};

export default Header;
