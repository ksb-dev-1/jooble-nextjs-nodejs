"use client";

// ----- components -----
import BasicDetails from "@/components/Profile/BasicDetails/BasicDetails";
import UserQuickLinks from "@/components/Profile/UserQuickLinks";
import KeySkills from "@/components/Profile/KySkills/KeySkillsForm";
import Projects from "@/components/Profile/projects/Projects";
import Education from "@/components/Profile/Education/Education";
import Certifications from "@/components/Profile/Certifications/Certifications";
import CareerProfile from "@/components/Profile/CareerProfile/CareerProfile";
import PersonalDetails from "@/components/Profile/PersonalDetails/PersonalDetails";

const ProfilePage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center mx-auto min-h-[calc(100vh-4.5rem)] px-4 sm:px-8 pt-[4.5rem] sm:pt-[6.5rem] pb-[4rem]">
      <div className="max-w-[1280px] w-full p-4 sm:p-8 rounded-[var(--r1)] bg-white custom-border-1 mb-4 sm:mb-8">
        <BasicDetails />
      </div>

      <div className="max-w-[1280px] flex flex-col md:flex-row w-full">
        <UserQuickLinks />

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
