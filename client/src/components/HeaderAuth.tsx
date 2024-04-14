"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// ----- react-icons -----
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";
import { LiaUserEditSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
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
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.info);
  const [logout, { isLoading, isError }] = useLogoutMutation();
  const profileRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogout = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await logout(user).unwrap();
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
    if (modalRef.current && profileRef.current) {
      modalRef.current.style.transform = "scale(1)";
      modalRef.current.style.opacity = "1";
    }
  };

  const hideModal = () => {
    if (modalRef.current && profileRef.current) {
      modalRef.current.style.transform = "scale(0)";
      modalRef.current.style.opacity = "0";
    }
  };

  return (
    <>
      <div className="hidden sm:flex items-center">
        {/* {typeof window === "undefined" && <div className="loader-3"></div>} */}

        {!user && (
          <Link
            href="/pages/login"
            className="border border-slate-300 rounded hover:bg-slate-100 w-[75px] h-[33.6px] hidden sm:flex items-center justify-center"
          >
            Login
          </Link>
        )}

        {pathname !== "/" && !user && (
          <Link
            href="/pages/register"
            className="border text-white bg-blue-600 border-blue-500 rounded hover:bg-blue-500 w-[75px] h-[33.6px] hidden sm:flex items-center justify-center ml-4"
          >
            Register
          </Link>
        )}
      </div>

      {user && (
        <div
          className="relative hidden sm:flex items-center"
          onMouseOver={showModal}
          onMouseLeave={hideModal}
        >
          <div
            ref={profileRef}
            className="flex items-center justify-center border border-slate-300 hover:bg-slate-100 rounded px-2 h-[33.6px] cursor-pointer"
          >
            <span>
              <HiOutlineUserCircle className="text-lg" />
            </span>
            <span className="ml-1">Profile</span>
          </div>
          <div
            ref={modalRef}
            className="absolute top-[100%] border border-slate-300 rounded bg-white w-max scale-0 opacity-0 transition-opacity flex flex-col right-0 xl:left-0"
          >
            <p className="font-bold px-4 py-2 flex items-center">
              <span className="mr-2 text-blue-600">
                {user.role === "admin" && <MdAdminPanelSettings />}
              </span>
              <span>Hello {user.name}</span>
            </p>
            <p className="h-[1px] bg-slate-300"></p>
            <Link
              href="/pages/profile"
              className="px-4 py-2 flex items-center hover:bg-slate-100"
              onClick={hideModal}
            >
              <HiOutlineUserCircle className="mr-2" /> My Profile
            </Link>
            <Link
              href="/pages/saved"
              className="px-4 py-2 flex items-center hover:bg-slate-100"
              onClick={hideModal}
            >
              <HiOutlineHeart className="mr-2" /> Saved Jobs
            </Link>
            {/* <Link
              href="/pages/edit-profile"
              className="px-4 py-2 flex items-center hover:bg-slate-100"
              onClick={hideModal}
            >
              <LiaUserEditSolid className="mr-2" /> Edit Profile
            </Link> */}
            <button
              className="flex items-center px-4 py-2 hover:bg-slate-100"
              onClick={(e) => {
                !isLoading && handleLogout(e);
              }}
            >
              <IoIosLogOut className="mr-2" />
              {isLoading ? <span className="loader-3"></span> : "Logout"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderAuth;
