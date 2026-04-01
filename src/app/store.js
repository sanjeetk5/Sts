// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import shipmentReducer from "../features/shipment/shipmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shipment: shipmentReducer,
  },
});
