import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice.js";
import students from "./slices/studentSlice.js";
import company from "./slices/companySlice.js";

export const store = configureStore({
  reducer: { auth, students, company },
});
