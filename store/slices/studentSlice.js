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
    removeStudent: (state, action) => {
      state.student = state.student.filter((stu) => stu.id !== action.payload);
    },
  },
});

export const { setStudent, addStudent, removeStudent } = studentReducer.actions;

export default studentReducer.reducer;
