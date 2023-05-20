import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: null,
  books: [],
  editBookData: null,
  issueBook: null, // Add issueBook field to the initial state
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    editBook: (state, action) => {
      state.editBookData = action.payload;
    },
    issueBook: (state, action) => {
      state.issueBook = action.payload;
    }, // Add issueBook reducer
  },
});

export const {
  setBook,
  setBooks,
  editBook,
  issueBook, // Export the issueBook action
} = bookSlice.actions;

export const getBookFromSearch = (state) => state.bookState.book;
export const getAllLibraryBooks = (state) => state.bookState.books;
export const getEditBook = (state) => state.bookState.editBookData;
export const getIssueBook = (state) => state.bookState.issueBook; // Add selector for issueBook

export default bookSlice.reducer;
