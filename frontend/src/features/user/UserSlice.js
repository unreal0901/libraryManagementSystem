import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  students: null, // Set students to null
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logOut: () => initialState,
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(state);
    },
    setStudents: (state, action) => {
      state.students = action.payload;
      console.log(state);
    },
  },
});

export default userSlice.reducer;
export const { logOut, setUser, setStudents } = userSlice.actions;
export const getUser = (state) => state.userState.user;
export const getStudents = (state) => state.userState.students;
