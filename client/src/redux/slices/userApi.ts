import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserData {
  user: User;
}

interface Skills {
  skills: string[];
}

interface Projects {
  projects: Project[];
}

interface SingleProject {
  project: Project;
}

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["Basic", "Skills", "Projects"],
  endpoints: (builder) => ({
    showMe: builder.query<UserData, void>({
      query: () => ({
        url: "/show-me",
        method: "GET",
      }),
      providesTags: [{ type: "Basic" }],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile",
        method: "PATCH",
        body: data,
        formData: true,
      }),
    }),
    getKeySkills: builder.query<Skills, void>({
      query: () => ({
        url: "/get-key-skills",
        method: "GET",
      }),
      providesTags: [{ type: "Skills" }] as unknown as undefined,
    }),
    createKeySkills: builder.mutation({
      query: (data) => ({
        url: "/create-key-skills",
        method: "POST",
        body: data,
      }),
    }),
    updateKeySkills: builder.mutation({
      query: (data) => ({
        url: "/update-key-skills",
        method: "PATCH",
        body: data,
      }),
    }),
    getProjects: builder.query<Projects, void>({
      query: () => ({
        url: "/get-projects",
        method: "GET",
      }),
      providesTags: [{ type: "Projects" }] as unknown as undefined,
    }),
    getProject: builder.query<SingleProject, string>({
      query: (project_id) => ({
        url: `/get-project/${project_id}`,
        method: "GET",
      }),
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "/create-project",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    updateProject: builder.mutation({
      query: ({ formData, project_id }) => {
        const formDataToSend = new FormData();

        // Iterate over formData entries
        for (const [key, value] of formData.entries()) {
          formDataToSend.append(key, value);
        }

        // Append project_id to formData
        //formDataToSend.append("project_id", project_id);

        return {
          url: `/update-project/${project_id}`,
          method: "PATCH",
          body: formDataToSend,
          formData: true,
        };
      },
    }),
    deleteProject: builder.mutation({
      query: (project_id) => ({
        url: `/delete-project/${project_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useShowMeQuery,
  useUpdateProfileMutation,
  useGetKeySkillsQuery,
  useCreateKeySkillsMutation,
  useUpdateKeySkillsMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = userApi;
