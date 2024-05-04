"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
// ----- redux -----
import { useShowMeQuery } from "@/redux/slices/userApi";

// ----- components -----
import KeySkills from "./KeySkillsForm";
import Projects from "./projects/Projects";

// ----- skeletons -----
import ProfileSkeleton from "@/skeletons/ProfileSkeleton";

const ProfileInfoNoSSR = dynamic(() => import("./ProfileInfo"), {
  ssr: false,
});

const ProfilePage: React.FC = () => {
  const { data, isFetching, isSuccess } = useShowMeQuery();

  return (
    <div className="relative flex flex-col items-center mx-auto min-h-[calc(100vh-4.5rem)] px-4 sm:px-8 pt-[4.5rem] pb-[4rem]">
      <div className="max-w-[1280px] w-full p-4 sm:p-8 rounded-[var(--r1)] min-h-[244.8px] bg-white mt-4 sm:mt-16 shadow-1">
        {isFetching && <ProfileSkeleton />}
        {isSuccess && <ProfileInfoNoSSR user={data.user} />}
      </div>
      <div className="max-w-[1280px] flex flex-col md:flex-row w-full mt-4 sm:mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:flex md:flex-wrap md:flex-col bg-white rounded-[var(--r1)] p-4 md:p-4 w-full md:w-[225px] md:sticky top-[6.5rem] h-fit shadow-1">
          <p className="font-bold hidden md:block ml-0 text-lg">Quick links</p>
          <Link
            href="#skills"
            className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start"
          >
            Key skills
          </Link>
          <Link
            href="#projects"
            className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start"
          >
            Projects
          </Link>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start">
            Education
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start">
            Certifications
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start">
            Career profile
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start">
            Personal details
          </p>
        </div>
        <div className="flex-grow mt-4 sm:mt-8 md:mt-0 md:ml-8 h-fit">
          <KeySkills />
          <Projects />
          {/* Education */}
          <div className="flex items-center justify-between bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1 mt-4 sm:mt-8">
            <div className="flex items-center">
              <p className="font-bold mr-2">Education</p>

              <span className="text-blue-600 hover:text-blue-500 text-xl cursor-pointer">
                <BiSolidEdit />
              </span>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
          {/* Certifications */}
          <div className="flex items-center justify-between bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1 mt-4 sm:mt-8">
            <div className="flex items-center">
              <p className="font-bold mr-2">Certifications</p>
              <span className="text-blue-600 hover:text-blue-500 text-xl cursor-pointer">
                <BiSolidEdit />
              </span>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
          {/* Career profile */}
          <div className="flex items-center justify-between bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1 mt-4 sm:mt-8">
            <div className="flex items-center">
              <p className="font-bold mr-2">Career profile</p>
              <span className="text-blue-600 hover:text-blue-500 text-xl cursor-pointer">
                <BiSolidEdit />
              </span>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
          {/* Personal details */}
          <div className="flex items-center justify-between bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1 mt-4 sm:mt-8">
            <div className="flex items-center">
              <p className="font-bold mr-2">Personal details</p>
              <span className="text-blue-600 hover:text-blue-500 text-xl cursor-pointer">
                <BiSolidEdit />
              </span>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
