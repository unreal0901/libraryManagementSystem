import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
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
  },
});

export default userSlice.reducer;
export const { logOut, setUser } = userSlice.actions;
export const getUser = (state) => state.userState.user;
