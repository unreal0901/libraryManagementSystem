import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { setBooks, setStudentBook } from "../../features/books/BookSlice";
import customFetchBase from "../utils/customFetchBase";

const playBooksKey = process.env.REACT_APP_GOOGLE_BOOKS_KEY;
export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: customFetchBase,
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query() {
        return {
          url: "book/all",
          credentials: "include",
        };
      },
      providesTags: ["Book"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setBooks(data?.data));
        } catch (error) {}
      },
    }),

    getStudentBooks: builder.query({
      query() {
        return {
          url: "student/mybooks",
          credentials: "include",
        };
      },
      providesTags: ["Book"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setStudentBook(data?.data));
        } catch (error) {}
      },
    }),
    // searchBooks: builder.query({
    //   query(payload) {
    //     console.log(payload);
    //     // const { searchTerm, author, isbn } = payload;
    //     let searchTerm = payload?.searchTerm || " ";
    //     let author = payload?.author || " ";
    //     let isbn = payload?.isbn || " ";
    //     let searchUrl = `https://www.googleapis.com/books/v1/volumes?q=${
    //       searchTerm || " "
    //     }+inauthor:${author || " "}+isbn:${isbn || " "}&key=${playBooksKey}`;
    //     if (isbn !== " ")
    //       searchUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    //     console.log(searchUrl);
    //     return {
    //       url: searchUrl,
    //     };
    //   },
    // }),
    searchBooks: builder.query({
      query(payload) {
        const { searchTerm, author, isbn } = payload;

        let searchUrl = "https://www.googleapis.com/books/v1/volumes?q=";

        // Check if searchTerm exists, treat it as title
        if (searchTerm && searchTerm.trim() !== "") {
          searchUrl += `intitle:${encodeURIComponent(searchTerm)}+`;
        }

        // Check if author exists
        if (author && author.trim() !== "") {
          searchUrl += `inauthor:${encodeURIComponent(author)}+`;
        }

        // Check if isbn exists
        if (isbn && isbn.trim() !== "") {
          searchUrl += `isbn:${encodeURIComponent(isbn)}+`;
        }

        // Remove the trailing '+' and append API key
        searchUrl = searchUrl.slice(0, -1) + `&key=${playBooksKey}`;

        // If no parameters were provided, set default search URL
        if (
          !(searchTerm || author || isbn) ||
          (searchTerm === "" && author === "" && isbn === "")
        ) {
          searchUrl = "https://www.googleapis.com/books/v1/volumes?q=popular";
        }

        console.log(searchUrl);

        return {
          url: searchUrl,
        };
      },
    }),
    addBook: builder.mutation({
      query(payload) {
        return {
          url: "book/add",
          method: "POST",
          credentials: "include",
          body: payload,
        };
      },
      invalidatesTags: ["Book"],
    }),

    updateBook: builder.mutation({
      query(payload) {
        return {
          url: "book/update",
          method: "PUT",
          credentials: "include",
          body: payload,
        };
      },
      invalidatesTags: ["Book"],
    }),

    issueBook: builder.mutation({
      query(bookId) {
        return {
          url: `/student/issue/${bookId}`,
          method: "POST",
          credentials: "include",
        };
      },
      transformErrorResponse: (result) => {
        console.log(result);
        return result.data?.message;
      },
      invalidatesTags: ["Book"],
    }),
    returnBook: builder.mutation({
      query(bookId) {
        return {
          url: `/student/return/${bookId}`,
          method: "POST",
          credentials: "include",
        };
      },
      transformErrorResponse: (result) => {
        console.log(result);
        return result.data?.message;
      },
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useAddBookMutation,
  useSearchBooksQuery,
  useUpdateBookMutation,
  useIssueBookMutation,
  useReturnBookMutation,
  useGetStudentBooksQuery,
} = bookApi;
