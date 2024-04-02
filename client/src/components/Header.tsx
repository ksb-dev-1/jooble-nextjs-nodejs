"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import svg from "../../public/job-icon-4.svg";

// 3rd party libraries
// react-icons
import { FaCircleUser } from "react-icons/fa6";

const Header: React.FC = () => {
  const pathname = usePathname();
  const path = pathname.includes("login") || pathname.includes("register");

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-10 px-4 lg:px-8 xl:px-0 border shadow-sm">
      <div className="max-w-[1100px] w-[100%] h-[4rem] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative h-[35px] w-[35px] mr-2 bg-blue-500 rounded-full">
            <Image
              src={svg}
              alt="icon"
              className="h-[20px] w-[20px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <span className="text-blue-500 font-bold text-3xl cursor-pointer no-underline">
            Jooble
          </span>
        </Link>

        <div>
          <Link href="#" className="mr-8">
            Jobs
          </Link>
          <Link href="#" className="mr-8">
            Pricing
          </Link>
          <Link href="#" className="">
            Dashboard
          </Link>
        </div>

        {/* Options */}
        <div>
          {/* <div className="flex items-center">
            <FaCircleUser className="text-3xl cursor-pointer text-slate-300" />
            <span>Profile</span>
          </div> */}
          <div>
            <Link
              href="/pages/login"
              className="mr-4  border border-slate-300 px-3 py-1 rounded"
            >
              Login
            </Link>

            {path && (
              <Link
                href="/pages/register"
                className="text-white bg-blue-500 border border-blue-500 px-3 py-1 rounded"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
