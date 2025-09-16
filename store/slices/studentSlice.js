import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  student: [],
};

export const studentReducer = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    addStudent: (state, action) => {
      state.student.push(action.payload);
    },
  },
});

export const { setStudent, addStudent } = studentReducer.actions;

export default studentReducer.reducer;
