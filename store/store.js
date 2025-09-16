import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice.js";
import students from "./slices/studentSlice.js";

export const store = configureStore({
  reducer: { auth, students },
});
