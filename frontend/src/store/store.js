import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/api/AuthApi";
import { userApi } from "../services/api/UserApi";
import userReducer from "../features/user/UserSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userState: userReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware]),
});
