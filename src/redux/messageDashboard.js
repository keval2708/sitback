"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
  messageTab: "second",
  activeTab: "first",
  selectedChat: null,
  isBlock: false,
  bankModal: false,
  isSubscribe: 0,
  posCount: 0,
  isProfileTab: 'first',
  personalInfo: { isEdit: false, isLocationFocus: false },
  calenderRefresh: false,
  appointmentTarget: null,
  targetProcess: null,
  calenderData: null,
  bookingData:null,
  dactiveTab: "dfirst",
};

export const messageDashboardCheckSlice = createSlice({
  name: "dashboardMessage",
  initialState: initialStateObj,
  reducers: {
    tabHandle: (state, { payload }) => {
      state.activeTab = payload;
    },
    chatHandle: (state, { payload }) => {
      state.selectedChat = payload;
    },
    messageTabHandle: (state, { payload }) => {
      state.messageTab = payload;
    },
    handleBlock: (state, { payload }) => {
      state.isBlock = payload;
    },
    handleSubscribe: (state, { payload }) => {
      state.isSubscribe = payload;
    },
    handleProfileTab: (state, { payload }) => {
      state.isProfileTab = payload;
    },
    handlePersonalInfoTab: (state, { payload }) => {
      state.personalInfo = payload;
    },
    handleBank: (state, { payload }) => {
      state.bankModal = payload;
    },
    handlePosRedirect: (state, { payload }) => {
      state.posCount = payload;
    },
    handleCalender: (state, { payload }) => {
      state.calenderRefresh = payload;
    },
    handleTarget: (state, { payload }) => {
      state.appointmentTarget = payload;
    },
    handleTargetProcess: (state, { payload }) => {
      state.targetProcess = payload;
    },
    handleCalenderData: (state, { payload }) => {
      state.calenderData = payload;
    },
    handleBookingData: (state, { payload }) => {
      state.bookingData = payload;
    },
     dtabHandle: (state, { payload }) => {
      state.dactiveTab = payload;
    },
  },
});

export const {
  tabHandle,
  chatHandle,
  messageTabHandle,
  handleBank,
  handleBlock,
  handleSubscribe,
  handleProfileTab,
  handlePersonalInfoTab,
  handlePosRedirect,
  handleCalender,
  handleTarget,
  handleTargetProcess,
  handleCalenderData,
  handleBookingData,
  dtabHandle,

} = messageDashboardCheckSlice.actions;

//it behave like connector (old redux)
export const messageCheckDashboardSliceSelector = (state) => state.dashboardMessage;

export default messageDashboardCheckSlice.reducer;
// export { mobileReducer };
