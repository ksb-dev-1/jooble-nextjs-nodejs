"use client";

import Link from "next/link";

import { useState, useEffect, useRef } from "react";

// ----- react-toastify -----
import { toast } from "react-toastify";
// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
// ----- redux -----
import {
  userApi,
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "@/redux/slices/userApi";
import { useDispatch } from "react-redux";
// ----- components -----
import CreateProjectForm from "./CreateProjectForm";
import UpdateProjectForm from "./UpdateProjectForm";

const Projects = () => {
  const { data, isFetching, isError } = useGetProjectsQuery();
  const [deleteProject, { data: deleteMsg }] = useDeleteProjectMutation();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    _id: "",
    project_name: "",
    details: "",
    hosted_link: "",
    github_link: "",
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedStates, setExpandedStates] = useState(
    Array(projects.length).fill(false)
  );

  const createProjectFormModal = useRef<HTMLDivElement>(null);
  const updateProjectFormModal = useRef<HTMLDivElement>(null);

  const toggleReadMore = (index: number) => {
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);
  };

  useEffect(() => {
    if (data && data.projects) {
      setProjects(data.projects);
    }
  }, [data]);

  const handleDeleteProject = async (project_id: string) => {
    //e.preventDefault();

    try {
      const res = await deleteProject(project_id).unwrap();

      if (res.msg) {
        dispatch(userApi.util.invalidateTags([{ type: "Projects" }]));
        toast.success(res.msg);
      }

      isError && toast.error(res.data.msg);
    } catch (err) {
      const error = err as ErrorProps;
      toast.error(error?.data?.msg);
    }
  };

  const showCreateProjectForm = () => {
    if (createProjectFormModal.current) {
      createProjectFormModal.current.style.transform = "scale(1)";
      createProjectFormModal.current.style.opacity = "1";
    }
  };

  const showUpdateProjectForm = () => {
    if (updateProjectFormModal.current) {
      updateProjectFormModal.current.style.transform = "scale(1)";
      updateProjectFormModal.current.style.opacity = "1";
    }
  };

  return (
    <>
      <div
        className="mt-4 sm:mt-8 bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1"
        id="projects"
      >
        <div className="flex items-center justify-between">
          <p className="font-bold mr-2">Projects</p>

          <p
            className="text-blue-600 font-medium cursor-pointer"
            onClick={showCreateProjectForm}
          >
            Add
          </p>
        </div>

        {projects.length >= 1 && (
          <div className="mt-8">
            {projects.map((project, index) => (
              <div
                className="border border-slate-300 p-8 rounded-[var(--r1)] mt-8"
                key={index}
              >
                <div className="flex items-center">
                  <span className="font-bold">{project.project_name}</span>
                  <div
                    className="relative h-[30px] w-[30px] rounded-full bg-blue-600 hover:bg-blue-500 cursor-pointer mx-4"
                    onClick={() => {
                      setValues({
                        ...values,
                        _id: project._id,
                        project_name: project.project_name,
                        details: project.details,
                        hosted_link: project.hosted_link,
                        github_link: project.github_link,
                      });
                      showUpdateProjectForm();
                    }}
                  >
                    <BiSolidEdit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                  </div>
                  <div
                    className="relative h-[30px] w-[30px] rounded-full bg-red-500 hover:bg-red-400 cursor-pointer"
                    onClick={() => handleDeleteProject(project._id)}
                  >
                    <RiDeleteBin6Line className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                  </div>
                </div>
                <div className="mt-2">
                  {expandedStates[index] ? (
                    <div>
                      <span>{project.details}</span>
                      <span
                        className="text-blue-600 ml-1 text-sm cursor-pointer font-semibold"
                        onClick={() => toggleReadMore(index)}
                      >
                        Hide more
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>{project.details.substring(0, 150)}</span>
                      {project.details.length >= 75 && (
                        <span
                          className="text-blue-600 text-sm ml-1 cursor-pointer font-semibold"
                          onClick={() => toggleReadMore(index)}
                        >
                          Read more...
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {(project.hosted_link || project.github_link) && (
                  <div className="mt-6">
                    {project.hosted_link && (
                      <Link
                        href="#"
                        className="text-blue-600 py-2 px-4 rounded-[var(--r2)] bg-blue-100 hover:bg-blue-200"
                      >
                        Live
                      </Link>
                    )}
                    {project.github_link && (
                      <Link
                        href="#"
                        className="text-blue-600 py-2 px-4 rounded-[var(--r2)] bg-blue-100 hover:bg-blue-200 ml-2"
                      >
                        Code
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ----- Create Project Form ----- */}
      <CreateProjectForm ref={createProjectFormModal} />

      {/* ----- Update Project Form ----- */}
      <UpdateProjectForm
        ref={updateProjectFormModal}
        values={values}
        setValues={setValues}
      />
    </>
  );
};

export default Projects;
