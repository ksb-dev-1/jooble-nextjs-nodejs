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

const Projects = () => {
  const { data, isFetching, isError } = useGetProjectsQuery();

  const [projects, setProjects] = useState<Project[]>([]);
  const [readMore, setReadMore] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.projects) {
      setProjects(data.projects);
    }
  }, [data]);

  const projectFormModalRef = useRef<HTMLDivElement>(null);

  const showCreateProjectForm = () => {
    if (projectFormModalRef.current) {
      projectFormModalRef.current.style.transform = "scale(1)";
      projectFormModalRef.current.style.opacity = "1";
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
        <div className="mt-8">
          {projects.length >= 1 &&
            projects.map((project) => (
              <div className="border border-slate-300 p-8 rounded-[var(--r1)] mt-8">
                <div className="flex items-center">
                  <span className="font-bold mr-4">{project.project_name}</span>
                  <span className="text-blue-600 hover:text-blue-500 text-xl cursor-pointer">
                    <BiSolidEdit />
                  </span>
                </div>
                <p className="mt-2">
                  {readMore ? (
                    <div>
                      <span>{project.details}</span>
                      <span
                        className="text-blue-600 ml-1 cursor-pointer"
                        onClick={() => setReadMore(!readMore)}
                      >
                        Hide more
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>{project.details.substring(0, 75)}</span>
                      <span
                        className="text-blue-600 ml-1 cursor-pointer"
                        onClick={() => setReadMore(!readMore)}
                      >
                        Read more
                      </span>
                    </div>
                  )}
                </p>

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
      </div>
      {/* ----- Create Project Form ----- */}
      <CreateProjectForm ref={projectFormModalRef} />
    </>
  );
};

export default Projects;
