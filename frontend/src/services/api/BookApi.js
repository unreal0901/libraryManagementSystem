import { createApi } from "@reduxjs/toolkit/dist/query";
import { setBook } from "../../features/books/BookSlice";
import customFetchBase from "../utils/customFetchBase";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: customFetchBase,
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query() {
        return {
          url: "books/all",
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBook(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
