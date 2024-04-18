"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// ----- react-icons -----
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsChevronDown } from "react-icons/bs";
// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- redux -----
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogoutMutation } from "@/redux/slices/authApi";
import { removeUser } from "@/redux/slices/userInfoSlice";
import { userApi } from "@/redux/slices/userApi";

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
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.info);
  const [logout, { isLoading, isError }] = useLogoutMutation();
  const profileRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const downIconRef = useRef<HTMLSpanElement>(null);

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await logout(user).unwrap();
      dispatch(userApi.util.invalidateTags([{ type: "User" }]));
      dispatch(removeUser());

      if (res.msg) {
        toast.success("User logged out successfully");
        router.push("/");
      }

      isError && toast.error(res.data.msg);

      hideModal();
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

  const showModal = () => {
    if (downIconRef.current && modalRef.current) {
      downIconRef.current.style.transform = "rotate(180deg)";
      modalRef.current.style.transform = "scale(1)";
      modalRef.current.style.opacity = "1";
    }
  };

  const hideModal = () => {
    if (downIconRef.current && modalRef.current) {
      downIconRef.current.style.transform = "rotate(0deg)";
      modalRef.current.style.transform = "scale(0)";
      modalRef.current.style.opacity = "0";
    }
  };

  return (
    <>
      {!user && (
        <div className="hidden sm:flex items-center ">
          {/* {typeof window === "undefined" && <div className="loader-3"></div>} */}

          <Link
            href="/pages/login"
            className="px-4 py-[calc(0.5rem-0.8px)] hover:bg-[#F5F5FC] text-blue-600 rounded-[25px] w-[88.91px] text-center border border-blue-600 font-semibold"
          >
            Login
          </Link>

          {pathname !== "/" && (
            <>
              <Link
                href="/pages/register"
                className="px-4 py-2 hover:bg-blue-500 text-white rounded-[25px] bg-blue-600 ml-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}

      {user && (
        <div
          className="relative hidden sm:flex items-center"
          onMouseOver={showModal}
          onMouseLeave={hideModal}
        >
          <div
            ref={profileRef}
            className="flex items-center px-4 py-2 rounded-[25px] bg-blue-600 hover:bg-blue-500 transition cursor-pointer text-white"
          >
            <span>
              <HiOutlineUserCircle />
            </span>
            <span className="ml-1 mr-6">Profile</span>
            <span ref={downIconRef} className="transition">
              <BsChevronDown />
            </span>
          </div>
          <div
            ref={modalRef}
            className="absolute top-[100%] rounded-[25px] shadow-2 w-full scale-0 opacity-0 transition-opacity duration-300 flex flex-col bg-white p-2"
          >
            <Link
              href="/pages/profile"
              className="pl-2 py-2 flex items-center hover:bg-[#F5F5FC] rounded-[25px]"
              onClick={hideModal}
            >
              <HiOutlineUserCircle className="mr-2" />{" "}
              <span className="text-base">My Profile</span>
            </Link>
            <Link
              href="/pages/saved"
              className="pl-2 py-2 flex items-center hover:bg-[#F5F5FC] rounded-[25px]"
              onClick={hideModal}
            >
              <HiOutlineHeart className="mr-2" />{" "}
              <span className="text-base">Saved</span>
            </Link>
            <button
              className="flex items-center pl-2 py-2 hover:bg-[#F5F5FC] rounded-[25px]"
              onClick={(e) => {
                !isLoading && handleLogout(e);
              }}
            >
              <IoIosLogOut className="mr-2" />
              {isLoading ? (
                <span className="loader-3"></span>
              ) : (
                <span className="text-base">Logout</span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderAuth;
