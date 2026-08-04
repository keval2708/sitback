"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
  isMobile: false
};

export const mobileCheckSlice = createSlice({
  name: "mobileCheck",
  initialState: initialStateObj,
  reducers: {
    updateMobileStatus: (state, { payload }) => {
      state.isMobile = payload;
    }
  },
});

export const { updateMobileStatus } = mobileCheckSlice.actions;

//it behave like connector (old redux)
export const mobileCheckSelector = (state) => state.mobileCheck;

export default mobileCheckSlice.reducer;
// export { mobileReducer };
