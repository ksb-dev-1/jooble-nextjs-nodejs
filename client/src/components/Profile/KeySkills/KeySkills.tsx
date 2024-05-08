"use client";

import { useState, useEffect, useRef } from "react";

// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";
// ----- redux -----
import { useGetKeySkillsQuery } from "@/redux/slices/userApi";
// ----- skeletons -----
import KeySkillsSkeleton from "@/skeletons/KeySkillsSkeleton";

import KeySkillsForm from "./KeySkillsForm";

const KeySkills = () => {
  const { data, isFetching, isSuccess } = useGetKeySkillsQuery();

  const [skills, setSkills] = useState<string[]>([]);

  const keySkillsEditBtnRef = useRef<HTMLSpanElement>(null);
  const keySkillsModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data && data.skills) {
      setSkills(data.skills);
    }
  }, [data]);

  const showEditForm = () => {
    if (keySkillsModalRef.current) {
      keySkillsModalRef.current.style.transform = "scale(1)";
      keySkillsModalRef.current.style.opacity = "1";
      if (data && data.skills) {
        setSkills(data.skills);
      }
    }
  };

  return (
    <>
      {isFetching && <KeySkillsSkeleton />}
      {isSuccess && (
        <div
          className="bg-white rounded-[var(--r1)] p-4 sm:p-8 custom-shadow-1"
          id="skills"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="font-bold mr-2">Key Skills</p>

              {skills.length >= 1 && (
                <span
                  ref={keySkillsEditBtnRef}
                  className="text-blue-600 hover:text-blue-500 text-xl cursor-pointer"
                  onClick={showEditForm}
                >
                  <BiSolidEdit />
                </span>
              )}
            </div>
            {skills.length < 1 && (
              <button
                className="text-blue-600 font-medium cursor-pointer"
                onClick={showEditForm}
                aria-label="Add"
              >
                Add
              </button>
            )}
          </div>

          {skills.length >= 1 && (
            <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 lg:flex items-center flex-wrap">
              {skills &&
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="custom-border-1 rounded-[var(--r2)] py-2 px-4 lg:mr-2 lg:mb-2"
                  >
                    {skill.charAt(0).toUpperCase() + skill.substring(1)}
                  </span>
                ))}
            </div>
          )}
        </div>
      )}
      {/* ----- Key skills modal ----- */}
      <KeySkillsForm
        ref={keySkillsModalRef}
        skills={skills}
        setSkills={setSkills}
        data={data}
      />
    </>
  );
};

export default KeySkills;
