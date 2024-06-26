"use client";

import Link from "next/link";

// ----- redux -----
import { useGetKeySkillsQuery } from "@/redux/slices/userApi";

// ----- skeletons -----
import QuickLinksSkeleton from "@/skeletons/QuickLinksSkeleton";

const UserQuickLinks: React.FC = () => {
  const { isFetching, isSuccess } = useGetKeySkillsQuery();

  return (
    <>
      {isFetching && <QuickLinksSkeleton />}
      {isSuccess && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 h-fit custom-shadow-1 bg-white w-full md:flex md:flex-wrap md:flex-col rounded-[var(--r1)] md:w-[250px] md:sticky top-[6.5rem]">
          <p className="font-bold hidden md:block ml-4 mt-2">Quick links</p>
          <Link
            href="#skills"
            className="rounded-[var(--r1)] py-2 px-4 cursor-pointer hover:bg-slate-100 border md:border-none md:text-start"
          >
            Key skills
          </Link>
          <Link
            href="#projects"
            className="rounded-[var(--r1)] py-2 px-4 cursor-pointer hover:bg-slate-100 border md:border-none md:text-start"
          >
            Projects
          </Link>
          <p className="rounded-[var(--r1)] py-2 px-4 cursor-pointer hover:bg-slate-100 border md:border-none md:text-start">
            Education
          </p>
          <p className="rounded-[var(--r1)] py-2 px-4 cursor-pointer hover:bg-slate-100 border md:border-none md:text-start">
            Certifications
          </p>
          <p className="rounded-[var(--r1)] py-2 px-4 cursor-pointer hover:bg-slate-100 border md:border-none md:text-start">
            Career profile
          </p>
          <p className="rounded-[var(--r1)] py-2 px-4 cursor-pointer hover:bg-slate-100 border md:border-none md:text-start">
            Personal details
          </p>
        </div>
      )}
    </>
  );
};

export default UserQuickLinks;
