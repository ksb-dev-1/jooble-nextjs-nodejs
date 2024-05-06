"use client";

// ----- components -----
import BasicDetails from "@/components/BasicDetails/BasicDetails";
import QuickLinks from "@/components/QuickLinks";
import KeySkills from "@/components/KySkills/KeySkillsForm";
import Projects from "@/components/projects/Projects";
import Education from "@/components/Education/Education";
import Certifications from "@/components/Certifications/Certifications";
import CareerProfile from "@/components/CareerProfile/CareerProfile";
import PersonalDetails from "@/components/PersonalDetails/PersonalDetails";

// const ProfileInfoNoSSR = dynamic(() => import("./ProfileInfo"), {
//   ssr: false,
// });

const ProfilePage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center mx-auto min-h-[calc(100vh-4.5rem)] px-4 sm:px-8 pt-[4.5rem] sm:pt-[6.5rem] pb-[4rem]">
      <div className="max-w-[1280px] w-full p-4 sm:p-8 rounded-[var(--r1)] bg-white custom-border-1">
        <BasicDetails />
      </div>

      <div className="max-w-[1280px] flex flex-col md:flex-row w-full mt-4 sm:mt-8">
        <QuickLinks />

        <div className="mt-4 sm:mt-8 md:mt-0 md:ml-8 h-fit max-w-[calc(1280px-227px-2rem)] w-full">
          <KeySkills />
          <Projects />
          <Education />
          <Certifications />
          <CareerProfile />
          <PersonalDetails />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
