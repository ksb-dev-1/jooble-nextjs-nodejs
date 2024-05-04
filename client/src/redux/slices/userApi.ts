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
    createProject: builder.mutation({
      query: (data) => ({
        url: "/create-project",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    updateProject: builder.mutation({
      query: (data) => ({
        url: "/update-project",
        method: "PATCH",
        body: data,
        formData: true,
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
  useCreateProjectMutation,
  useUpdateProjectMutation,
} = userApi;
