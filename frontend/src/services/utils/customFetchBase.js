// import * as dotenv from 'dotenv';
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { Mutex } from "async-mutex";
import { logOut } from "../../features/user/UserSlice";

// Creates a new mutex,to prevent multiple requests to /api/auth/refresh
const mutex = new Mutex();
const BASE_URL = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
});

const customFetchBase = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.data?.message === "You are not logged in") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { credentials: "include", url: `${BASE_URL}/api/auth/refresh` },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logOut());
          window.location.href = "/login";
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export default customFetchBase;
