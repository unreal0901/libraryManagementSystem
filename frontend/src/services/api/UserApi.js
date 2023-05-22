import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser, setStudents } from "../../features/user/UserSlice";
import customFetchBase from "../utils/customFetchBase";
// const BASE_URL = process.env.REACT_APP_BASE_URL;
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query(payload) {
        return {
          url: "auth/register",
          credentials: "include",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["User"],
      transformErrorResponse: (result) => result.data?.message,
    }),

    getMe: builder.query({
      query() {
        return {
          url: "users/me",
          credentials: "include",
        };
      },
      transformErrorResponse: (result) => result.data?.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    getAllStudents: builder.query({
      query() {
        return {
          url: "users",
          credentials: "include",
        };
      },
      providesTags: ["User"],
      transformErrorResponse: (result) => result.data?.students,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setStudents(data));
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllStudentsQuery,
  useCreateStudentMutation,
} = userApi;
