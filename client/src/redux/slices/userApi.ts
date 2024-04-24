import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserData {
  user: User;
}

interface Skills {
  skills: string[];
}

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["Basic", "Skills"],
  endpoints: (builder) => ({
    showMe: builder.query<UserData, void>({
      query: () => ({
        url: "/show-me",
        method: "GET",
      }),
      providesTags: [{ type: "Basic" }],
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: "/edit-profile",
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
    editKeySkills: builder.mutation({
      query: (data) => ({
        url: "/edit-key-skills",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useShowMeQuery,
  useEditProfileMutation,
  useGetKeySkillsQuery,
  useEditKeySkillsMutation,
} = userApi;
