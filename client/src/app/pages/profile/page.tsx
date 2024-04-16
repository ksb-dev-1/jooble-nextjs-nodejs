"use client";

import dynamic from "next/dynamic";

// ----- redux -----
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// ----- components -----
import AdminHeader from "@/components/AdminHeader";

const ProfileInfoNoSSR = dynamic(() => import("@/components/ProfileInfo"), {
  ssr: false,
});

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.info);

  return (
    <>
      <div
        // className={`max-w-[1100px] w-full mx-auto min-h-[calc(100vh-4.5rem)] ${
        //   user?.role === "admin" ? "mt-[4.5rem]" : "mt-[4.5rem]"
        // }`}
        className="max-w-[1100px] w-full mx-auto min-h-[calc(100vh-4.5rem)] mpx-4 sm:px-8 xl:px-0 pt-[4.5rem] pb-[4rem]"
      >
        <div className="p-2 sm:p-4 rounded min-h-[133.6px] w-fit bg-white shadow-1 mt-8">
          <ProfileInfoNoSSR user={user} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
