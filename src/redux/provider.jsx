"use client";

import { Provider } from "react-redux";
// import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store  } from "./store";

export function Providers({ children }) {
  // let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
