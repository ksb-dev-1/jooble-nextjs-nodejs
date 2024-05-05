"use client";

import Link from "next/link";

import { useState, useEffect, useRef } from "react";

// ----- react-icons -----
import { BiSolidEdit } from "react-icons/bi";
// ----- redux -----
// import { useGetProjectsQuery } from "@/redux/slices/userApi";
import { useGetProjectsQuery } from "@/redux/slices/userApi";
// ----- components -----
import CreateProjectForm from "./CreateProjectForm";
import UpdateProjectForm from "./UpdateProjectForm";

const Projects = () => {
  //const [projectId, setProjectId] = useState<string>("");
  const { data, isFetching, isError } = useGetProjectsQuery();
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
                  <span className="font-bold mr-4">{project.project_name}</span>
                  <span
                    className="text-blue-600 hover:text-blue-500 text-xl cursor-pointer"
                    onClick={() => {
                      //setProjectId(project._id);
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
                    <BiSolidEdit />
                  </span>
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

                <div className="mt-4">
                  <Link
                    href="#"
                    className="text-blue-600 py-2 px-4 rounded-[var(--r2)] bg-blue-100 hover:bg-blue-200"
                  >
                    Live
                  </Link>
                  <Link
                    href="#"
                    className="text-blue-600 py-2 px-4 rounded-[var(--r2)] bg-blue-100 hover:bg-blue-200 ml-2"
                  >
                    Code
                  </Link>
                </div>
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
        //project_id={projectId}
        values={values}
        setValues={setValues}
      />
    </>
  );
};

export default Projects;
