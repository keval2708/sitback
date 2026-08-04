"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
  schedulerData: null,
  schedulerResponse: null,
  guestResponse: null,
  currentStep: 1,
  isMasterModalOpen: true,
  serviceData: [],
  saveBookInfo: null,
  bookAppointmentInfo: null,
  spaName: null,
  cmsServiceData: null,
  cmsSelectSpa: false,
};

export const quickBookingSlice = createSlice({
  name: "quickBooking",
  initialState: initialStateObj,
  reducers: {
    schedulerDetail: (state, { payload }) => {
      state.schedulerData = payload;
    },
    schedulerSpaName: (state, { payload }) => {
      state.spaName = payload;
    },
    manageSchedulerResponse: (state, { payload }) => {
      state.schedulerResponse = payload;
    },
    manageGuestResponse: (state, { payload }) => {
      state.guestResponse = payload;
    },
    handleStep: (state, { payload }) => {
      state.currentStep = payload;
    },
    handleMasterModal: (state, { payload }) => {
      state.isMasterModalOpen = payload;
    },
    setServiceData: (state, { payload }) => {
      state.serviceData = payload;
    },
    finalBookData: (state, { payload }) => {
      state.saveBookInfo = payload;
    },
    bookAppointmentSchedulerData: (state, { payload }) => {
      state.bookAppointmentInfo = payload;
    },
    cmsSelectService: (state, { payload }) => {
      state.cmsServiceData = payload;
    },
    cmsSelectSpa: (state, { payload }) => {
      state.cmsSpaData = payload;
    },
  },
});

export const {
  schedulerDetail,
  manageSchedulerResponse,
  manageGuestResponse,
  handleStep,
  handleMasterModal,
  setServiceData,
  finalBookData,
  bookAppointmentSchedulerData,
  schedulerSpaName,
  cmsSelectService,
  cmsSelectSpa,
} = quickBookingSlice.actions;

//it behave like connector (old redux)
export const quickBookingSliceSelector = (state) => state.quickBooking;

export default quickBookingSlice.reducer;
