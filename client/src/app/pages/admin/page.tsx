"use client";

// ----- components -----
import AdminQuickLinks from "@/components/Admin/AdminQuickLinks";
import Jobs from "@/components/Admin/Jobs/Jobs";
import WorkMode from "@/components/Admin/WorkMode/WorkMode";

// const ProfileInfoNoSSR = dynamic(() => import("./ProfileInfo"), {
//   ssr: false,
// });

const AdminPage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center mx-auto min-h-[calc(100vh-4.5rem)] px-4 sm:px-8 pt-[4.5rem] sm:pt-[6.5rem] pb-[4rem]">
      <div className="max-w-[1280px] flex flex-col md:flex-row w-full">
        <AdminQuickLinks />

        <div className="mt-4 sm:mt-8 md:mt-0 md:ml-8 h-fit max-w-[calc(1280px-227px-2rem)] w-full">
          <Jobs />
          <WorkMode />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
