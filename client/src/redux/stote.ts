import { configureStore } from "@reduxjs/toolkit";

import { userInfoReducer } from "./slices/userInfoSlice";
import { authApi } from "./slices/authApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    info: userInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
