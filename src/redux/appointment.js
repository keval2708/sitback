"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
  isPaymentTab: "first",
  failedModal: false,
  failedModalData: null,
  subscriptionPayment: false,
  isSpaCardExpired: false,
  reminderDetails: {
    openModal: false,
    data: null,
    total: null,
  },
  upcomingDetails: [],
  tipTotalAmount:{
    tipPrice:null,
    isAddTip:false,
    optionSelected:null
  },
};

export const appointmentCheckSlice = createSlice({
  name: "appointment",
  initialState: initialStateObj,
  reducers: {
    handlePaymentTab: (state, { payload }) => {
      state.isPaymentTab = payload;
    },
    handlePaymentFailedModal: (state, { payload }) => {
      if (typeof payload === "object" && payload !== null) {
        state.failedModal = payload.show ?? true;
        state.failedModalData =
          payload.data !== undefined ? payload.data : state.failedModalData;
        if (!state.failedModal) {
          state.failedModalData = null;
        }
      } else {
        state.failedModal = !!payload;
        if (!payload) {
          state.failedModalData = null;
        }
      }
    },
    handleSubscriptionFail: (state, { payload }) => {
      state.subscriptionPayment = payload;
    },
    handleSpaCardExpired: (state, { payload }) => {
      state.isSpaCardExpired = payload;
    },
    handleReminderData: (state, { payload }) => {
      state.reminderDetails = payload;
    },
    handleUpcomingData: (state, { payload }) => {
      state.upcomingDetails = payload;
    },
    handlePaymentFailedTotalAmount: (state, { payload }) => {
      state.tipTotalAmount = payload;
    },
  },
});

export const {
  handlePaymentTab,
  handlePaymentFailedModal,
  handleSubscriptionFail,
  handleSpaCardExpired,
  handleReminderData,
  handleUpcomingData,
  handlePaymentFailedTotalAmount,

} = appointmentCheckSlice.actions;

//it behave like connector (old redux)
export const appointmentCheckSliceSelector = (state) => state.appointment;

export default appointmentCheckSlice.reducer;
