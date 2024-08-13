/*
import the loader and the slices and assign them to the store in order we want to trigger it.

Slice is also know as reducer

*/

import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    user: userReducer,
  },
});

export default store;
