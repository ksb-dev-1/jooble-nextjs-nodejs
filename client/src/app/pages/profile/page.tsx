"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-skeleton-icons -----
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// ----- redux -----
import { useShowMeQuery } from "@/redux/slices/userApi";

// ----- skeletons -----
import ProfileSkeleton from "@/skeletons/ProfileSkeleton";

const ProfileInfoNoSSR = dynamic(() => import("@/components/ProfileInfo"), {
  ssr: false,
});

const ProfilePage: React.FC = () => {
  const { data, isFetching, isError, isSuccess } = useShowMeQuery();

  if (isError) {
    toast.error("Failed to fetch profile info. Try again.");
  }

  return (
    <>
      <div
        // className={`max-w-[1100px] w-full mx-auto min-h-[calc(100vh-4.5rem)] ${
        //   user?.role === "admin" ? "mt-[4.5rem]" : "mt-[4.5rem]"
        // }`}
        className="max-w-[1100px] w-full mx-auto min-h-[calc(100vh-4.5rem)] px-4 sm:px-8 xl:px-0 pt-[4.5rem] pb-[4rem]"
      >
        <div className="p-4 sm:p-8 rounded-[25px] min-h-[220px] bg-white shadow-1 mt-4 sm:mt-8">
          {isFetching && <ProfileSkeleton />}
          {isSuccess && <ProfileInfoNoSSR user={data.user} />}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
