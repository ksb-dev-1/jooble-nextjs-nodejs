import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UserData {
  user: User;
}

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    showMe: builder.query<UserData, void>({
      query: () => ({
        url: "/show-me",
        method: "GET",
      }),
      providesTags: [{ type: "User" }],
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: "/edit-profile",
        method: "PATCH",
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const { useShowMeQuery, useEditProfileMutation } = userApi;
