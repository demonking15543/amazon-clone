import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
import { composeWithDevTools } from 'redux-devtools-extension';
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
  composeWithDevTools,
});
