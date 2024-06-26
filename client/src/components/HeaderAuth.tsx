"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// ----- react-icons -----
import { HiOutlineUserCircle } from "react-icons/hi2";
import { BiSolidUserCircle } from "react-icons/bi";
import { SlUser } from "react-icons/sl";
import { LiaUserCircle } from "react-icons/lia";
import { HiOutlineHeart } from "react-icons/hi2";
import { IoIosLogOut } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";
import { BsChevronDown } from "react-icons/bs";
// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- redux -----
import { userApi } from "@/redux/slices/userApi";
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
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.info);
  const [logout, { isLoading, isError }] = useLogoutMutation();
  const profileRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const downIconRef = useRef<HTMLSpanElement>(null);

  // console.log(data?.user);
  //console.log(user);

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await logout(user).unwrap();

      if (res.msg) {
        dispatch(userApi.util.invalidateTags([{ type: "Basic" }]));
        dispatch(removeUser());
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
    if (modalRef.current) {
      modalRef.current.style.transform = "scale(1)";
      modalRef.current.style.opacity = "1";
    }
  };

  const hideModal = () => {
    if (modalRef.current) {
      modalRef.current.style.transform = "scale(0)";
      modalRef.current.style.opacity = "0";
    }
  };

  return (
    <>
      {!user && (
        <div className="hidden sm:flex items-center ">
          <Link
            href="/pages/login"
            className="px-4 py-2 flex items-center justify-center text-center bg-blue-600 text-white hover:bg-blue-500 rounded-[var(--r2)] w-[88.91px]"
          >
            Login
          </Link>

          <Link
            href="/pages/register"
            className="px-4 py-2 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-500 rounded-[var(--r2)]  ml-2"
          >
            Register
          </Link>
        </div>
      )}

      {user && (
        <div
          className="relative hidden sm:flex items-center"
          onMouseOver={showModal}
          onMouseLeave={hideModal}
        >
          <div className="relative w-[40px] h-[40px] border-[3px] border-slate-300 rounded-full overflow-hidden cursor-pointer">
            {user?.image ? (
              <Image
                src={user.image}
                alt="profile"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-full"
              />
            ) : (
              <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-slate-300 rounded-full" />
            )}
          </div>
          <div
            ref={modalRef}
            className="absolute top-[100%] right-0 rounded-[var(--r1)] w-max scale-0 opacity-0 transition-opacity duration-300 flex flex-col bg-white custom-shadow-1 p-4"
          >
            {user?.role === "admin" ? (
              <Link
                href="/pages/admin"
                className="px-4 py-2 flex items-center hover:bg-slate-100 rounded-[var(--r1)] text-blue-600"
                onClick={hideModal}
              >
                <GrUserAdmin className="mr-2" />{" "}
                <span className="text-base font-medium">Admin</span>
              </Link>
            ) : (
              ""
            )}
            <Link
              href="/pages/profile"
              className="px-4 py-2 flex items-center hover:bg-slate-100 rounded-[var(--r1)]"
              onClick={hideModal}
            >
              <HiOutlineUserCircle className="mr-2" />{" "}
              <span className="text-base">My Profile</span>
            </Link>
            <Link
              href="/pages/saved"
              className="px-4 py-2 flex items-center hover:bg-slate-100 rounded-[var(--r1)]"
              onClick={hideModal}
            >
              <HiOutlineHeart className="mr-2" />{" "}
              <span className="text-base">Saved</span>
            </Link>
            <button
              className="flex items-center px-4 py-2 hover:bg-slate-100 rounded-[var(--r1)]"
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
