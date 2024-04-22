"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
// ----- redux -----
import { useShowMeQuery } from "@/redux/slices/userApi";

// ----- skeletons -----
import ProfileSkeleton from "@/skeletons/ProfileSkeleton";

const ProfileInfoNoSSR = dynamic(() => import("@/components/ProfileInfo"), {
  ssr: false,
});

const ProfilePage: React.FC = () => {
  const { data, isFetching, isSuccess } = useShowMeQuery();
  const keySkillsEditBtnRef = useRef<HTMLSpanElement>(null);
  const keySkillsModalRef = useRef<HTMLDivElement>(null);
  const keySkillsCloseBtnRef = useRef<HTMLDivElement>(null);
  const keySkilssCancelBtnRef = useRef<HTMLButtonElement>(null);

  const showEditForm = () => {
    if (keySkillsModalRef.current) {
      keySkillsModalRef.current.style.transform = "scale(1)";
      keySkillsModalRef.current.style.opacity = "1";
      //setValuesFn();
    }
  };

  const hideEditForm = (e: any) => {
    if (
      (keySkillsModalRef.current &&
        keySkillsCloseBtnRef.current &&
        keySkillsCloseBtnRef.current.contains(e.target as Node)) ||
      (keySkillsModalRef.current &&
        keySkilssCancelBtnRef.current &&
        keySkilssCancelBtnRef.current.contains(e.target as Node))
    ) {
      keySkillsModalRef.current.style.opacity = "0";
      setTimeout(() => {
        keySkillsModalRef.current!.style.transform = "scale(0)";
      }, 300);
    }
  };

  return (
    <div className="max-w-[1100px] w-full mx-auto min-h-[calc(100vh-4.5rem)] px-4 sm:px-8 xl:px-0 pt-[4.5rem] pb-[4rem]">
      <div className="p-4 sm:p-8 rounded-[var(--r1)] min-h-[229.6px] bg-white shadow-1 mt-4 sm:mt-8">
        {isFetching && <ProfileSkeleton />}
        {isSuccess && <ProfileInfoNoSSR user={data.user} />}
      </div>
      <div className="flex flex-col md:flex-row w-full mt-4 sm:mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:flex md:flex-wrap md:flex-col bg-white shadow-1 rounded-[var(--r1)] p-4 md:p-8 w-full md:w-[225px] md:sticky top-[6.5rem] h-fit">
          <p className="font-bold hidden md:block text-lg ml-4">Quick links</p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-[#f8f8f8] border md:border-none text-center md:text-start text-sm md:text-base">
            Key skills
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-[#f8f8f8] border md:border-none text-center md:text-start text-sm md:text-base">
            Projects
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-[#f8f8f8] border md:border-none text-center md:text-start text-sm md:text-base">
            Education
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-[#f8f8f8] border md:border-none text-center md:text-start text-sm md:text-base">
            Certifications
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-[#f8f8f8] border md:border-none text-center md:text-start text-sm md:text-base">
            Career profile
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-[#f8f8f8] border md:border-none text-center md:text-start text-sm md:text-base">
            Personal details
          </p>
        </div>
        <div className="flex-grow mt-4 sm:mt-8 md:mt-0 md:ml-8 h-fit">
          {/* Key skills */}
          <div className="flex items-center justify-between bg-white shadow-1 rounded-[var(--r1)] p-4 sm:p-8">
            <div className="flex items-center">
              <p className="font-semibold mr-2">Key skills</p>
              <p className="relative h-[30px] w-[30px] rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer">
                <span
                  ref={keySkillsEditBtnRef}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  onClick={showEditForm}
                >
                  <BiSolidEdit />
                </span>
              </p>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
          {/* ----- Key skills modal ----- */}
          <div
            ref={keySkillsModalRef}
            className="fixed top-0 left-0 z-30 scale-0 opacity-0 bg-[rgba(0,0,0,0.85)] w-full h-full flex justify-center transition-opacity duration-300 pt-[4.5rem] pb-[4rem] overflow-y-auto"
          >
            <div className="relative rounded-[var(--r1)] bg-white p-4 max-w-[500px] w-full h-fit">
              Key skills
              <div
                ref={keySkillsCloseBtnRef}
                onClick={(e: any) => hideEditForm(e)}
                className="absolute top-2 right-2 bg-[tomato] cursor-pointer rounded-[var(--r1)] h-[40px] w-[40px] hover:bg-[#ff856f]"
              >
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
                  <IoMdClose />
                </span>
              </div>
            </div>
          </div>
          {/* Projects */}
          <div className="flex items-center justify-between bg-white shadow-1 rounded-[var(--r1)] p-4 sm:p-8 mt-4 sm:mt-8">
            <div className="flex items-center">
              <p className="font-semibold mr-2">Projects</p>
              <p className="relative h-[30px] w-[30px] rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <BiSolidEdit />
                </span>
              </p>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
          {/* Education */}
          <div className="flex items-center justify-between bg-white shadow-1 rounded-[var(--r1)] p-4 sm:p-8 mt-4 sm:mt-8">
            <div className="flex items-center">
              <p className="font-semibold mr-2">Education</p>
              <p className="relative h-[30px] w-[30px] rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <BiSolidEdit />
                </span>
              </p>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
          {/* Certifications */}
          <div className="flex items-center justify-between bg-white shadow-1 rounded-[var(--r1)] p-4 sm:p-8 mt-4 sm:mt-8">
            <div className="flex items-center">
              <p className="font-semibold mr-2">Certifications</p>
              <p className="relative h-[30px] w-[30px] rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <BiSolidEdit />
                </span>
              </p>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
          {/* Career profile */}
          <div className="flex items-center justify-between bg-white shadow-1 rounded-[var(--r1)] p-4 sm:p-8 mt-4 sm:mt-8">
            <div className="flex items-center">
              <p className="font-semibold mr-2">Career profile</p>
              <p className="relative h-[30px] w-[30px] rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <BiSolidEdit />
                </span>
              </p>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
          {/* Personal details */}
          <div className="flex items-center justify-between bg-white shadow-1 rounded-[var(--r1)] p-4 sm:p-8 mt-4 sm:mt-8">
            <div className="flex items-center">
              <p className="font-semibold mr-2">Personal details</p>
              <p className="relative h-[30px] w-[30px] rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <BiSolidEdit />
                </span>
              </p>
            </div>
            <p className="text-blue-600 font-semibold cursor-pointer">Add</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
