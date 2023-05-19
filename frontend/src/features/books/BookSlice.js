import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  book: null,
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state, action) => {
      console.log("In the slice");
      state.book = action.payload;
    },
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { setBook, setBooks } = bookSlice.actions;
export const getBookFromSearch = (state) => state.bookState.book;
export default bookSlice.reducer;
