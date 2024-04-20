"use client";

import dynamic from "next/dynamic";

// ----- redux -----
import { useShowMeQuery } from "@/redux/slices/userApi";

// ----- skeletons -----
import ProfileSkeleton from "@/skeletons/ProfileSkeleton";

const ProfileInfoNoSSR = dynamic(() => import("@/components/ProfileInfo"), {
  ssr: false,
});

const ProfilePage: React.FC = () => {
  const { data, isFetching, isSuccess } = useShowMeQuery();

  return (
    <div className="max-w-[1100px] w-full mx-auto min-h-[calc(100vh-4.5rem)] px-4 sm:px-8 xl:px-0 pt-[4.5rem] pb-[4rem]">
      <div className="p-4 sm:p-8 rounded-[25px] min-h-[220px] bg-white shadow-1 mt-4 sm:mt-8">
        {isFetching && <ProfileSkeleton />}
        {isSuccess && <ProfileInfoNoSSR user={data.user} />}
      </div>
      <div className="flex flex-col md:flex-row w-full mt-4 md:mt-8">
        <div className="flex flex-wrap md:flex-col bg-white shadow-1 rounded-[25px] p-2 md:p-4 w-full md:w-[200px]">
          <p className="font-bold px-2 sm:px-4 mb-2 hidden md:block">
            Quick links
          </p>
          <p className="rounded-[25px] px-2 sm:px-4 py-2 cursor-pointer hover:bg-[#f8f8f8] text-sm">
            Key skills
          </p>
          <p className="rounded-[25px] px-2 sm:px-4 py-2 cursor-pointer hover:bg-[#f8f8f8] text-sm">
            Projects
          </p>
          <p className="rounded-[25px] px-2 sm:px-4 py-2 cursor-pointer hover:bg-[#f8f8f8] text-sm">
            Education
          </p>
          <p className="rounded-[25px] px-2 sm:px-4 py-2 cursor-pointer hover:bg-[#f8f8f8] text-sm">
            Certifications
          </p>
          <p className="rounded-[25px] px-2 sm:px-4 py-2 cursor-pointer hover:bg-[#f8f8f8] text-sm">
            Career profile
          </p>
          <p className="rounded-[25px] px-2 sm:px-4 py-2 cursor-pointer hover:bg-[#f8f8f8] text-sm">
            Personal details
          </p>
        </div>
        <div className="flex-grow bg-white shadow-1 rounded-[25px] p-2 mt-4 md:mt-0 md:ml-8">
          Page
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
