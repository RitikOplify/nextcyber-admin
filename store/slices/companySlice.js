import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  company: [],
};

export const companyReducer = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    addCompany: (state, action) => {
      state.company.push(action.payload);
    },
  },
});

export const { setCompany, addCompany } = companyReducer.actions;

export default companyReducer.reducer;
