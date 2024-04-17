import { configureStore } from "@reduxjs/toolkit";

import { userInfoReducer } from "./slices/userInfoSlice";
import { authApi } from "./slices/authApi";
import { userApi } from "./slices/userApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    info: userInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
