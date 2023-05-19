import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/api/AuthApi";
import { userApi } from "../services/api/UserApi";
import { bookApi } from "../services/api/BookApi";
import userReducer from "../features/user/UserSlice";
import bookReducer from "../features/books/BookSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    userState: userReducer,
    bookState: bookReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      userApi.middleware,
      bookApi.middleware,
    ]),
});
