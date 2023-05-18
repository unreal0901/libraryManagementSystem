import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  books: null,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBooks } = bookSlice.actions;
export default bookSlice.reducer;
