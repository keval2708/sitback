"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
  selectClientPage: 'list',
  selectedClient: null,
};

export const insightCheckSlice = createSlice({
  name: "insight",
  initialState: initialStateObj,
  reducers: {
    handleRedirect: (state, { payload }) => {
      state.selectClientPage = payload;
    },
    saveClientData: (state, { payload }) => {
      state.selectedClient = payload;
    },
  },
});

export const { handleRedirect, saveClientData } = insightCheckSlice.actions;

//it behave like connector (old redux)
export const insightCheckSliceSelector = (state) => state.insight;

export default insightCheckSlice.reducer;
// export { mobileReducer };
