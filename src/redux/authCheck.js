"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
  login: null,
  token: null,
  deviceTokens: null,
  card: null,
  verifyBy: "email",
  loginTab: "first",
  hideBlog: false,
};

export const authCheckSlice = createSlice({
  name: "auth",
  initialState: initialStateObj,
  reducers: {
    loginDetail: (state, { payload }) => {
      state.login = payload;
    },
    storeToken: (state, { payload }) => {
      state.token = payload;
    },
    setdeviceTokens: (state, { payload }) => {
      state.deviceTokens = payload;
    },
    manageSpaCard: (state, { payload }) => {
      state.card = payload;
    },
    handleOtpVerify: (state, { payload }) => {
      state.verifyBy = payload;
    },
    handleLoginTab: (state, { payload }) => {
      state.loginTab = payload;
    },
    handleHideBlog: (state, { payload }) => {
      state.hideBlog = payload;
    },
  },
});

export const {
  loginDetail,
  storeToken,
  setdeviceTokens,
  manageSpaCard,
  handleOtpVerify,
  handleLoginTab,
  handleHideBlog,
} = authCheckSlice.actions;

//it behave like connector (old redux)
export const authCheckSliceSelector = (state) => state.auth;

export default authCheckSlice.reducer;
// export { mobileReducer };
