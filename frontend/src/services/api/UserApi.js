import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../../features/user/UserSlice";
import customFetchBase from "../utils/customFetchBase";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (builder) => ({
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
  }),
});

export const { useGetMeQuery } = userApi;
