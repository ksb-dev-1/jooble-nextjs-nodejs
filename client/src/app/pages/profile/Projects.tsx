"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
// ----- redux -----
// import { useGetProjectsQuery } from "@/redux/slices/userApi";
// import { useEditProjectsMutation } from "@/redux/slices/userApi";
import { useDispatch } from "react-redux";
import { userApi } from "@/redux/slices/userApi";

interface ErrorProps {
  data?: {
    msg?: string;
  };
  error?: string;
}

const Projects = () => {
  //const { data } = useGetProjectsQuery();

  const [skill, setSkill] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [toDeleteSkills, setToDeleteSkills] = useState<string[]>([]);

  //   useEffect(() => {
  //     if (data && data.skills) {
  //       setSkills(data.skills);
  //     }
  //   }, [data]);

  //   const [editKeySkills, { isLoading, isError, isSuccess }] =
  //     useUpdateProjectsMutation();
  const dispatch = useDispatch();

  const projectsEditBtnRef = useRef<HTMLSpanElement>(null);
  const projectsModalRef = useRef<HTMLDivElement>(null);
  const projectsCloseBtnRef = useRef<HTMLDivElement>(null);
  const prjectsCancelBtnRef = useRef<HTMLButtonElement>(null);

  const showProjectsForm = () => {
    if (projectsModalRef.current) {
      projectsModalRef.current.style.transform = "scale(1)";
      projectsModalRef.current.style.opacity = "1";
      //   if (data && data.skills) {
      //     setSkills(data.skills);
      //   }
    }
  };

  const hideProjectsForm = (e: any) => {
    if (
      (projectsModalRef.current &&
        projectsCloseBtnRef.current &&
        projectsCloseBtnRef.current.contains(e.target as Node)) ||
      (projectsModalRef.current &&
        prjectsCancelBtnRef.current &&
        prjectsCancelBtnRef.current.contains(e.target as Node))
    ) {
      projectsModalRef.current.style.opacity = "0";
      setTimeout(() => {
        projectsModalRef.current!.style.transform = "scale(0)";
      }, 300);

      setToDeleteSkills([]);
    }
  };

  const handleEditProjects = async (e: any) => {
    e.preventDefault();

    // if (!skills && !toDeleteSkills) return;

    // try {
    //   const res = await updateProjects({ skills, toDeleteSkills }).unwrap();

    //   //setSkills([]);
    //   setToDeleteSkills([]);

    //   if (res.msg) {
    //     dispatch(userApi.util.invalidateTags([{ type: "Skills" }]));
    //     toast.success("Profile updated successfully");

    //     if (projectsModalRef.current) {
    //       projectsModalRef.current.style.opacity = "0";
    //       setTimeout(() => {
    //         projectsModalRef.current!.style.transform = "scale(0)";
    //       }, 300);
    //     }
    //   }

    //   isError && toast.error(res.data.msg);
    // } catch (err) {
    //   const error = err as ErrorProps;
    //   toast.error(error?.data?.msg);
    // }
  };

  return (
    <>
      <div
        className="mt-4 sm:mt-8 flex items-center justify-between bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1"
        id="projects"
      >
        <p className="font-bold mr-2">Projects</p>

        <p
          className="text-blue-600 font-medium cursor-pointer"
          onClick={showProjectsForm}
        >
          Add
        </p>
      </div>
      {/* ----- Key skills modal ----- */}
      <div
        ref={projectsModalRef}
        className="fixed top-0 left-0 right-0 bottom-0 z-30 scale-0 opacity-0 bg-[rgba(0,0,0,0.85)] w-full h-full flex justify-center transition-opacity duration-300 pt-[4.5rem] pb-[4rem] px-4 overflow-y-auto"
      >
        <div className="relative rounded-[var(--r1)] bg-white p-8 md:p-16 w-fit h-fit">
          <div
            ref={projectsCloseBtnRef}
            onClick={(e: any) => hideProjectsForm(e)}
            className="absolute top-2 right-2 bg-[tomato] cursor-pointer rounded-[var(--r1)] h-[40px] w-[40px] hover:bg-[#ff856f]"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
              <IoMdClose />
            </span>
          </div>
          <p className="font-bold text-xl">Projects</p>
          <p className="text-slate-500">
            Increase your chances of catching the eye of HR by showcasing your
            projects.
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
            <div>
              <label
                htmlFor="project_name"
                className="inline-block mb-1 font-semibold"
              >
                Project Name
              </label>
              <div></div>
              <input
                id="project_name"
                type="text"
                name="project_name"
                value={skill}
                className="border border-slate-300 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                // onChange={(e: any) =>
                //   setSkills((prevSkills) => [...prevSkills, e.target.value])
                // }
                onChange={(e: any) => setSkill(e.target.value)}
                //placeholder="Project Name"
                required
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="details"
                className="inline-block mb-1 font-semibold"
              >
                Details
              </label>
              <div></div>
              <textarea
                id="details"
                rows={3}
                name="details"
                value={skill}
                className="border border-slate-300 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                // onChange={(e: any) =>
                //   setSkills((prevSkills) => [...prevSkills, e.target.value])
                // }
                onChange={(e: any) => setSkill(e.target.value)}
                //placeholder="Description"
                required
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="hosted_link"
                className="inline-block mb-1 font-semibold"
              >
                Hosted Link
              </label>
              <div></div>
              <input
                id="hosted_link"
                type="text"
                name="hosted_link"
                value={skill}
                className="border border-slate-300 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                // onChange={(e: any) =>
                //   setSkills((prevSkills) => [...prevSkills, e.target.value])
                // }
                onChange={(e: any) => setSkill(e.target.value)}
                //placeholder="Description"
                required
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="github_link"
                className="inline-block mb-1 font-semibold"
              >
                GitHub Link
              </label>
              <div></div>
              <input
                id="github_link"
                type="text"
                name="github_link"
                value={skill}
                className="border border-slate-300 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                // onChange={(e: any) =>
                //   setSkills((prevSkills) => [...prevSkills, e.target.value])
                // }
                onChange={(e: any) => setSkill(e.target.value)}
                //placeholder="Description"
                required
              />
            </div>
          </form>

          <div className="flex items-center justify-end mt-8">
            <button
              ref={prjectsCancelBtnRef}
              type="button"
              className="py-2 px-4 border border-blue-600 hover:bg-slate-100 rounded-[var(--r2)] text-blue-600 font-medium cursor-pointer"
              onClick={hideProjectsForm}
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-[var(--r2)] border border-blue-600 flex items-center justify-center text-white w-[85.56px] ml-2"
              onClick={handleEditProjects}
            >
              {/* {isLoading ? <div className="loader-1"></div> : "Save"} */}
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
