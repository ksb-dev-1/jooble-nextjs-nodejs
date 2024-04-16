"use client";

import dynamic from "next/dynamic";

// ----- redux -----
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ProfileInfoNoSSR = dynamic(() => import("@/components/ProfileInfo"), {
  ssr: false,
});

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.info);

  return (
    <div className="max-w-[1100px] w-full mx-auto min-h-[calc(100vh-4rem)] mt-[4.5rem] px-4 lg:px-8 xl:px-0">
      <div className="border border-slate-3000 p-2 sm:p-4 rounded mt-4 min-h-[133.6px] w-fit">
        <ProfileInfoNoSSR user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
