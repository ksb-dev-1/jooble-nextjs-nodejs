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
// import { useGetProjectsQuery } from "@/redux/slices/userApi";
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/redux/slices/userApi";
import { useDispatch } from "react-redux";
import { userApi } from "@/redux/slices/userApi";

interface Props {
  //project_id: string;
  values: {
    project_name: string;
    details: string;
    hosted_link: string;
    github_link: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      project_name: string;
      details: string;
      hosted_link: string;
      github_link: string;
    }>
  >;
}

const UpdateProjectForm = forwardRef<HTMLDivElement, Props>(
  ({ values, setValues }, ref) => {
    //const { data } = useGetProjectQuery(props.project_id);

    //   const [values, setValues] = useState({
    //     project_name: data?.project?.project_name || "",
    //     details: data?.project?.details || "",
    //     hosted_link: data?.project?.hosted_link || "",
    //     github_link: data?.project?.github_link || "",
    //   });

    const dispatch = useDispatch();
    const updateProjectFormModal = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLDivElement>(null);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);

    //   useEffect(() => {
    //     data &&
    //       setValues({
    //         ...values,
    //         project_name: data.project.project_name,
    //         details: data.project.details,
    //         hosted_link: data.project.hosted_link,
    //         github_link: data.project.github_link,
    //       });
    //   }, [data]);

    const [updateProject, { isLoading, isError, isSuccess }] =
      useUpdateProjectMutation();

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
        const res = await updateProject(formData).unwrap();

        if (res.msg) {
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

    const hideUpdateProjectForm = (e: any) => {
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
        className="fixed top-0 left-0 right-0 bottom-0 z-30 scale-0 opacity-0 bg-[rgba(0,0,0,0.85)] w-full h-full flex justify-center transition-opacity duration-300 pt-[4.5rem] pb-[4rem] px-4 overflow-y-auto"
      >
        <div className="relative rounded-[var(--r1)] bg-white p-8 md:p-16 w-fit h-fit">
          <div
            ref={closeBtnRef}
            onClick={(e: any) => hideUpdateProjectForm(e)}
            className="absolute top-2 right-2 bg-[tomato] cursor-pointer rounded-[var(--r1)] h-[40px] w-[40px] hover:bg-[#ff856f]"
          >
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
              <IoMdClose />
            </span>
          </div>
          <p className="font-bold text-xl">Update Project</p>

          <form
            className="relative flex-grow box-border mt-8 min-w-[450px] w-full"
            onSubmit={handleUpdateProject}
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
                value={values.project_name}
                className="border border-slate-300 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                onChange={handleChange}
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
              <textarea
                id="details"
                rows={5}
                name="details"
                value={values.details}
                className="border border-slate-300 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                onChange={handleChange}
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
                value={values.hosted_link}
                className="border border-slate-300 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                onChange={handleChange}
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
                value={values.github_link}
                className="border border-slate-300 rounded-[var(--r2)] px-4 py-2 focus:outline-blue-600 placeholder:text-slate-500 focus:placeholder:text-transparent w-[100%]"
                onChange={handleChange}
                required
              />
            </div>
          </form>

          <div className="flex items-center justify-end mt-8">
            <button
              ref={cancelBtnRef}
              type="button"
              className="py-2 px-4 border border-blue-600 hover:bg-slate-100 rounded-[var(--r2)] text-blue-600 font-medium cursor-pointer"
              onClick={hideUpdateProjectForm}
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-500 rounded-[var(--r2)] border border-blue-600 flex items-center justify-center text-white w-[85.56px] ml-2"
              onClick={handleUpdateProject}
            >
              {isLoading ? <div className="loader-1"></div> : "Save"}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default UpdateProjectForm;
