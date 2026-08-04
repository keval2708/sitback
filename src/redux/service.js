"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialStateObj = {
  serviceList: [],
  selectedService: null,
  selectedSlot: null,
  dateSelected:null,
  selectedSpecialist:null,
  selectedCity:null,
  homeSelectedService:null,
  homeSelectedCity:null,
  spaSelectedCity:null,
  homeSelectedDate:null,
  spaHeadSelectedDate: null,
  spaHeadTextSearch: null,
  spaHeadStatusSearch: null,
  spaHeadSelectedStartDate: null,
  spaHeadSelectedEndDate: null,
  spaHeadSelectedType:null,
  headDateRange:null,
  spaLocationSelectedCity: null,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState: initialStateObj,
  reducers: {
    myServiceList: (state, { payload }) => {
      state.serviceList = payload;
    },
     mySelectedServiceList: (state, { payload }) => {
      state.selectedService = payload;
    },
     mySelectedSlot: (state, { payload }) => {
      state.selectedSlot = payload;
    },
    mySelectedDate: (state, { payload }) => {
      state.dateSelected = payload;
    },
    mySelectedSpecialist: (state, { payload }) => {
      state.selectedSpecialist = payload;
    },
    mySelectedCity: (state, { payload }) => {
      state.selectedCity = payload;
    },
    myHomePageSelectedService: (state, { payload }) => {
      state.homeSelectedService = payload;
    },
    myHomePageSelectedCity: (state, { payload }) => {
      state.homeSelectedCity = payload;
    },
    mySpaPageSelectedCity: (state, { payload }) => {
      state.spaSelectedCity = payload;
    },
    mySpaLocationPageSelectedCity: (state, { payload }) => {
      state.spaLocationSelectedCity = payload;
    },
    myHomePageSelectedDate: (state, { payload }) => {
      state.homeSelectedDate = payload;
    },
    mySpaHeadSelectedDate: (state, { payload }) => {
      state.spaHeadSelectedDate = payload;
    },
    mySpaHeadTextSearch: (state, { payload }) => {
      state.spaHeadTextSearch = payload;
    },
    mySpaHeadStatusSearch: (state, { payload }) => {
      state.spaHeadStatusSearch = payload;
    },
    mySpaHeadSelectedStartDate: (state, { payload }) => {
      state.spaHeadSelectedStartDate = payload;
    },
    mySpaHeadSelectedEndDate: (state, { payload }) => {
      state.spaHeadSelectedEndDate = payload;
    },
    mySpaHeadSelectedType: (state, { payload }) => {
      state.spaHeadSelectedType= payload;
    },
    myHeadDateRange: (state, { payload }) => {
      state.headDateRange = payload;
    },



  },
});

export const { myServiceList,mySelectedServiceList,mySelectedSlot,mySelectedDate,mySelectedSpecialist,mySelectedCity,myHomePageSelectedService,myHomePageSelectedDate,mySpaHeadSelectedDate,mySpaHeadTextSearch,mySpaHeadSelectedStartDate,mySpaHeadSelectedEndDate,mySpaHeadSelectedType,myHomePageSelectedCity,mySpaHeadStatusSearch,myHeadDateRange,mySpaPageSelectedCity,mySpaLocationPageSelectedCity } = serviceSlice.actions;

//it behave like connector (old redux)
export const serviceSliceSelector = (state) => state.service;

export default serviceSlice.reducer;
