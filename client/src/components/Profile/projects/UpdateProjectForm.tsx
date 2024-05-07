"use client";

import {
  useState,
  useRef,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
import { IoMdClose } from "react-icons/io";
// ----- redux -----
import { useUpdateProjectMutation } from "@/redux/slices/userApi";
import { useDispatch } from "react-redux";
import { userApi } from "@/redux/slices/userApi";
// ----- common -----
import CancelSaveButtons from "../common/CancelSaveButtons";

interface Props {
  values: {
    _id: string;
    project_name: string;
    details: string;
    hosted_link: string;
    github_link: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      _id: string;
      project_name: string;
      details: string;
      hosted_link: string;
      github_link: string;
    }>
  >;
}

const UpdateProjectForm = forwardRef<HTMLDivElement, Props>(
  ({ values, setValues }, ref) => {
    const dispatch = useDispatch();
    const updateProjectFormModal = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);

    const [updateProject, { isLoading, isError }] = useUpdateProjectMutation();

    useImperativeHandle(
      ref,
      () => updateProjectFormModal.current as HTMLDivElement
    );

    const handleUpdateProject = async (e: any) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("project_name", values.project_name);
      formData.append("details", values.details);
      formData.append("hosted_link", values.hosted_link);
      formData.append("github_link", values.github_link);

      try {
        const res = await updateProject({
          formData,
          project_id: values._id,
        }).unwrap();

        if (res.msg) {
          dispatch(userApi.util.invalidateTags([{ type: "Projects" }]));
          toast.success(res.msg);

          setValues({
            ...values,
            project_name: "",
            details: "",
            hosted_link: "",
            github_link: "",
          });

          if (updateProjectFormModal.current) {
            updateProjectFormModal.current.style.opacity = "0";
            setTimeout(() => {
              updateProjectFormModal.current!.style.transform = "scale(0)";
            }, 300);
          }
        }

        isError && toast.error(res.data.msg);
      } catch (err) {
        const error = err as ErrorProps;
        toast.error(error?.data?.msg);
      }
    };

    const hideUpdateProjectForm = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (
        (updateProjectFormModal.current &&
          closeBtnRef.current &&
          closeBtnRef.current.contains(e.target as Node)) ||
        (updateProjectFormModal.current &&
          cancelBtnRef.current &&
          cancelBtnRef.current.contains(e.target as Node))
      ) {
        updateProjectFormModal.current.style.opacity = "0";
        setTimeout(() => {
          updateProjectFormModal.current!.style.transform = "scale(0)";
        }, 300);

        setValues({
          ...values,
          project_name: "",
          details: "",
          hosted_link: "",
          github_link: "",
        });
      }
    };

    const handleChange = (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
      <div
        ref={updateProjectFormModal}
        className="fixed z-30 scale-0 opacity-0 w-full top-0 left-0 right-0 bottom-0 flex justify-center min-h-full px-4 bg-[rgba(0,0,0,0.85)] transition-opacity duration-300 pt-[4.5rem] pb-[4rem] overflow-y-auto"
      >
        <div className="relative rounded-[var(--r1)] bg-white p-8 sm:p-16 w-full sm:w-[600px] h-fit">
          <button
            ref={closeBtnRef}
            onClick={hideUpdateProjectForm}
            className="absolute top-2 right-2 bg-[tomato] cursor-pointer rounded-full h-[40px] w-[40px] hover:bg-[#ff856f]"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
              <IoMdClose />
            </span>
          </button>
          <p className="font-bold text-xl">Update Project</p>

          <form
            className="relative flex-grow box-border mt-8"
            onSubmit={handleUpdateProject}
          >
            <div>
              <label
                htmlFor="project_name"
                className="inline-block mb-1 font-medium"
              >
                Project Name
              </label>
              <input
                id="project_name"
                type="text"
                name="project_name"
                value={values.project_name}
                className="custom-border-1 flex items-center justify-center rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="details"
                className="inline-block mb-1 font-medium"
              >
                Details
              </label>
              <textarea
                id="details"
                rows={5}
                name="details"
                value={values.details}
                className="custom-border-1 flex items-center justify-center rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="hosted_link"
                className="inline-block mb-1 font-medium"
              >
                Hosted Link
              </label>
              <input
                id="hosted_link"
                type="text"
                name="hosted_link"
                value={values.hosted_link}
                className="custom-border-1 flex items-center justify-center rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="github_link"
                className="inline-block mb-1 font-medium"
              >
                GitHub Link
              </label>
              <input
                id="github_link"
                type="text"
                name="github_link"
                value={values.github_link}
                className="custom-border-1 flex items-center justify-center rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                onChange={handleChange}
              />
            </div>
            {/* ----- Cancel & Save buttons ----- */}
            <CancelSaveButtons
              cancelBtnRef={cancelBtnRef}
              fn={hideUpdateProjectForm}
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>
    );
  }
);

export default UpdateProjectForm;
