"use client";

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

  console.log(projects);

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
        className="mt-4 sm:mt-8 flex items-center justify-between bg-white rounded-[var(--r1)] p-4 sm:p-8 shadow-1"
        id="projects"
      >
        <p className="font-bold mr-2">Projects</p>

        <p
          className="text-blue-600 font-medium cursor-pointer"
          onClick={showCreateProjectForm}
        >
          Add
        </p>
      </div>
      {/* ----- Create Project Form ----- */}
      <CreateProjectForm ref={projectFormModalRef} />
    </>
  );
};

export default Projects;
