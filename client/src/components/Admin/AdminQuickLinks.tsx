"use client";

import Link from "next/link";

// ----- redux -----
import { useGetKeySkillsQuery } from "@/redux/slices/userApi";

// ----- skeletons -----
import QuickLinksSkeleton from "@/skeletons/QuickLinksSkeleton";

const AdminQuickLinks: React.FC = () => {
  const { isFetching, isSuccess } = useGetKeySkillsQuery();

  return (
    <>
      {isFetching && <QuickLinksSkeleton />}
      {isSuccess && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:flex md:flex-wrap md:flex-col bg-white rounded-[var(--r1)] p-4 w-full md:w-[225px] md:sticky top-[6.5rem] h-fit custom-border-1">
          <p className="font-bold hidden md:block ml-4 mt-2">Quick links</p>
          <Link
            href="#"
            className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start"
          >
            Jobs
          </Link>
          <Link
            href="#"
            className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start"
          >
            Work mode
          </Link>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start">
            Role category
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start">
            Company type
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start">
            Department
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start">
            Location
          </p>
          <p className="rounded-[var(--r1)] py-2 pl-4 cursor-pointer hover:bg-slate-100 border md:border-none text-center md:text-start">
            Salary range
          </p>
        </div>
      )}
    </>
  );
};

export default AdminQuickLinks;
