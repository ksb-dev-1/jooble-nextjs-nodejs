"use client";

import Image from "next/image";

// ----- react-icons -----
import { BiSolidUserCircle } from "react-icons/bi";

interface UserProps {
  user: {
    image: string;
  };
}

const ProfileInfo: React.FC<UserProps> = ({ user }: any) => {
  return (
    <>
      <div className="relative w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] border border-slate-300 rounded-full overflow-hidden mr-2 sm:mr-4">
        {user && user.image ? (
          <Image
            src={user.image}
            alt="profile"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        ) : (
          <BiSolidUserCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-slate-300" />
        )}
      </div>
      <div>
        <p className="font-semibold text-sm sm:text-xl">
          {user?.first_name} <span>{user?.last_name}</span>
        </p>
        <p className="text-xs sm:text-base">{user?.email}</p>
      </div>
    </>
  );
};

export default ProfileInfo;
