import { configureStore , ReducerType } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

export const store = configureStore ({
  reducer: {
    auth: authReducer,
  },
});
