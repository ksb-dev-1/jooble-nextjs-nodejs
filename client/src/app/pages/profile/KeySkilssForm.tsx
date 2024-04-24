"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
// ----- redux -----
import { useGetKeySkillsQuery } from "@/redux/slices/userApi";
import { useEditKeySkillsMutation } from "@/redux/slices/userApi";
import { useDispatch } from "react-redux";
import { userApi } from "@/redux/slices/userApi";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const KeySkilssForm = () => {
  const { data } = useGetKeySkillsQuery();

  const [skill, setSkill] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  const [editKeySkills, { isLoading, isError, isSuccess }] =
    useEditKeySkillsMutation();
  const dispatch = useDispatch();

  const keySkillsEditBtnRef = useRef<HTMLSpanElement>(null);
  const keySkillsModalRef = useRef<HTMLFormElement>(null);
  const keySkillsCloseBtnRef = useRef<HTMLDivElement>(null);
  const keySkilssCancelBtnRef = useRef<HTMLButtonElement>(null);

  const showEditForm = () => {
    if (keySkillsModalRef.current) {
      keySkillsModalRef.current.style.transform = "scale(1)";
      keySkillsModalRef.current.style.opacity = "1";
      //setValuesFn();
    }
  };

  const hideKeySkillsForm = (e: any) => {
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

  const handleEditKeySkills = async (e: FormEvent) => {
    e.preventDefault();

    if (!skill) return;

    try {
      const res = await editKeySkills({ skills }).unwrap();

      if (res.msg) {
        dispatch(userApi.util.invalidateTags([{ type: "Skills" }]));
        //toast.success("Skill added successfully");

        // if (keySkillsModalRef.current) {
        //   keySkillsModalRef.current.style.opacity = "0";
        //   setTimeout(() => {
        //     keySkillsModalRef.current!.style.transform = "scale(0)";
        //   }, 300);
        // }
      }

      isError && toast.error(res.data.msg);
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1">
        <div className="flex items-center">
          <p className="font-bold mr-2">Key Skills</p>
          <p
            className="relative h-[30px] w-[30px] rounded-full text-white bg-blue-600 hover:bg-blue-500 cursor-pointer"
            onClick={showEditForm}
          >
            <span
              ref={keySkillsEditBtnRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              onClick={showEditForm}
            >
              <BiSolidEdit />
            </span>
          </p>
        </div>
        <p className="text-blue-600 font-medium cursor-pointer">Add</p>
      </div>
      {/* ----- Key skills modal ----- */}
      <form
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
            Next.js etc. (One at a time)
          </p>
          <div className="flex-grow box-border mt-8">
            <label htmlFor="skill" className="inline-block mb-1 font-bold">
              Skills
            </label>
            <div></div>
            <input
              id="skill"
              type="text"
              name="skill"
              //value={skill}
              className="border border-slate-300 rounded-[var(--r1)] px-3 sm:px-4 py-2 sm:py-3 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
              //   onChange={(e: any) =>
              //     setSkills((prevSkills) => [...prevSkills, e.target.value])
              //   }
              onChange={(e: any) => setSkill(skill)}
              placeholder="Add skill"
              onKeyDown={handleKeyDown}
              required
            />
          </div>
          <div>
            {data &&
              data.skills &&
              data.skills.map((skill) => <span key={skill}>{skill}</span>)}
            {skills && skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
          <div className="flex items-center justify-end mt-8">
            <button
              ref={keySkilssCancelBtnRef}
              type="button"
              className="h-[40px] px-4 border border-blue-600 hover:bg-[#f8f8f8] rounded-[var(--r1)] text-blue-600 font-medium flex items-center justify-center cursor-pointer"
              onClick={(e: any) => hideKeySkillsForm(e)}
            >
              Cancel
            </button>
            <button
              className="h-[40px] px-4 bg-blue-600 hover:bg-blue-500 rounded-[var(--r1)] border border-blue-600 text-white flex items-center justify-center w-[90.9px] ml-2"
              onClick={(e: any) => handleEditKeySkills(e)}
            >
              {isLoading ? <div className="loader-1"></div> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default KeySkilssForm;
