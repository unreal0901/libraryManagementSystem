import { createApi } from "@reduxjs/toolkit/query/react";
import { userApi } from "./UserApi";
import customFetchBase from "../utils/customFetchBase";
import { setUser } from "../../features/user/UserSlice";

// const BASE_URL = 'http://localhost:8000';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    // registerUser: builder.mutation({
    //   query(data) {
    //     return { url: "auth/register", method: "POST", body: data };
    //   },
    // }),
    loginUser: builder.mutation({
      query(data) {
        return {
          url: "auth/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: "auth/logout",
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUser(null));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApi;
