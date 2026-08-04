"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import appointment from "./appointment";
import authCheck from "./authCheck";
import insightClient from "./insightClient";
import messageDashboard from "./messageDashboard";
import messageTab from "./messageTab";
import mobileCheck from "./mobileCheck";
import quickBooking from "./quickBooking";
import scheduler from "./scheduler";
import service from "./service";

const middleware = [thunk];

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  mobileCheck: mobileCheck,
  auth: authCheck,
  service: service,
  message: messageTab,
  dashboardMessage: messageDashboard,
  insight: insightClient,
  scheduler: scheduler,
  appointment: appointment,
  quickBooking: quickBooking,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: middleware,
});

const persistor = persistStore(store);

export { store, persistor };
