"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { BsPlus } from "react-icons/bs";
// ----- redux -----
import {
  useGetKeySkillsQuery,
  useUpdateKeySkillsMutation,
} from "@/redux/slices/userApi";
import { useDispatch } from "react-redux";
import { userApi } from "@/redux/slices/userApi";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const KeySkills = () => {
  const {
    data,
    isLoading: skillsLoading,
    isError: skillsError,
  } = useGetKeySkillsQuery();

  const [skill, setSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [toDeleteSkills, setToDeleteSkills] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.skills) {
      setSkills(data.skills);
    }
  }, [data]);

  const [updateKeySkills, { isLoading, isError }] =
    useUpdateKeySkillsMutation();
  const dispatch = useDispatch();

  const keySkillsEditBtnRef = useRef<HTMLSpanElement>(null);
  const keySkillsModalRef = useRef<HTMLDivElement>(null);
  const keySkillsCloseBtnRef = useRef<HTMLDivElement>(null);
  const keySkilsCancelBtnRef = useRef<HTMLButtonElement>(null);

  const showEditForm = () => {
    if (keySkillsModalRef.current) {
      keySkillsModalRef.current.style.transform = "scale(1)";
      keySkillsModalRef.current.style.opacity = "1";
      if (data && data.skills) {
        setSkills(data.skills);
      }
    }
  };

  const hideKeySkillsForm = (e: any) => {
    if (
      (keySkillsModalRef.current &&
        keySkillsCloseBtnRef.current &&
        keySkillsCloseBtnRef.current.contains(e.target as Node)) ||
      (keySkillsModalRef.current &&
        keySkilsCancelBtnRef.current &&
        keySkilsCancelBtnRef.current.contains(e.target as Node))
    ) {
      keySkillsModalRef.current.style.opacity = "0";
      setTimeout(() => {
        keySkillsModalRef.current!.style.transform = "scale(0)";
      }, 300);

      setSkill("");
      setToDeleteSkills([]);
    }
  };

  const handleUpdateKeySkills = async (e: any) => {
    e.preventDefault();

    if (
      skills.length === (data && data.skills && data?.skills?.length)! &&
      toDeleteSkills.length < 1
    ) {
      if (keySkillsModalRef.current) {
        keySkillsModalRef.current.style.opacity = "0";
        setTimeout(() => {
          keySkillsModalRef.current!.style.transform = "scale(0)";
        }, 300);

        setSkill("");
        setToDeleteSkills([]);
        return;
      }
    }

    try {
      const res = await updateKeySkills({ skills, toDeleteSkills }).unwrap();

      //setSkills([]);
      setSkill("");
      setToDeleteSkills([]);

      if (res.msg) {
        dispatch(userApi.util.invalidateTags([{ type: "Skills" }]));
        toast.success("Profile updated successfully");

        if (keySkillsModalRef.current) {
          keySkillsModalRef.current.style.opacity = "0";
          setTimeout(() => {
            keySkillsModalRef.current!.style.transform = "scale(0)";
          }, 300);
        }
      }

      isError && toast.error(res.data.msg);
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1"
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
            <p
              className="text-blue-600 font-medium cursor-pointer"
              onClick={showEditForm}
            >
              Add
            </p>
          )}
        </div>

        {skills.length >= 1 && (
          <div className="mt-8 flex items-center flex-wrap">
            {skills &&
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="border border-slate-300 rounded-[25px] py-2 px-4 mr-2 mb-2"
                >
                  {skill.charAt(0).toUpperCase() + skill.substring(1)}
                </span>
              ))}
          </div>
        )}
      </div>

      {/* ----- Key skills modal ----- */}
      <div
        ref={keySkillsModalRef}
        className="fixed top-0 left-0 right-0 bottom-0 z-30 scale-0 opacity-0 bg-[rgba(0,0,0,0.85)] w-full h-full flex justify-center transition-opacity duration-300 pt-[4.5rem] pb-[4rem] px-4 overflow-y-auto"
      >
        <div className="relative rounded-[var(--r1)] bg-white p-8 md:p-16 w-fit h-fit">
          <div
            ref={keySkillsCloseBtnRef}
            onClick={(e: any) => hideKeySkillsForm(e)}
            className="absolute top-2 right-2 bg-[tomato] cursor-pointer rounded-[var(--r1)] h-[40px] w-[40px] hover:bg-[#ff856f]"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
              <IoMdClose />
            </span>
          </div>
          <p className="font-bold text-xl">Key Skills</p>
          <p className="text-slate-500">
            Add skills that best define your expertise, for e.g, Javascript,
            Next.js etc.
          </p>
          <form
            className="relative flex-grow box-border mt-8"
            onSubmit={(e: any) => {
              e.preventDefault();

              if (!skills.includes(skill.toLocaleLowerCase()))
                setSkills((prevSkills) => [...prevSkills, skill]);
              setSkill("");
            }}
          >
            <label htmlFor="skill" className="inline-block mb-1 font-semibold">
              Skill
            </label>
            <div></div>
            <input
              id="skill"
              type="text"
              name="skill"
              value={skill}
              className="border border-slate-300 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
              // onChange={(e: any) =>
              //   setSkills((prevSkills) => [...prevSkills, e.target.value])
              // }
              onChange={(e: any) => setSkill(e.target.value)}
              //placeholder="Add skill"
              required
            />
            <button
              type="submit"
              className="absolute right-[5px] top-[33px] bg-blue-600 text-white hover:bg-blue-500 rounded-[var(--r2)] h-[32px] w-[32px]"
            >
              <BsPlus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl" />
            </button>
          </form>
          {skills.length >= 1 && (
            <div className="mt-8 flex items-center flex-wrap">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="border border-slate-300 rounded-[25px] py-2 pl-4 pr-2 mr-2 mb-2 flex items-center justify-between"
                >
                  {skill.charAt(0).toUpperCase() + skill.substring(1)}
                  <IoMdClose
                    className="ml-2 bg-[tomato] cursor-pointer text-white hover:bg-tomato hover:bg-[#ff856f] rounded-full p-1 text-2xl transition"
                    onClick={() => {
                      const filter = skills.filter((el) => el !== skill);
                      setToDeleteSkills((prev) => [...prev, skill]);
                      setSkills(filter);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-end mt-8">
            <button
              ref={keySkilsCancelBtnRef}
              type="button"
              className="py-2 px-4 border border-blue-600 hover:bg-slate-100 rounded-[var(--r2)] text-blue-600 font-medium cursor-pointer"
              onClick={hideKeySkillsForm}
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-[var(--r2)] border border-blue-600 text-white flex items-center justify-center w-[85.56px] ml-2"
              onClick={handleUpdateKeySkills}
            >
              {isLoading ? <div className="loader-1"></div> : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default KeySkills;
