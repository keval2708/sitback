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

export const schedulerSlice = createSlice({
  name: "scheduler",
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
} = schedulerSlice.actions;

//it behave like connector (old redux)
export const schedulerSliceSelector = (state) => state.scheduler;

export default schedulerSlice.reducer;
