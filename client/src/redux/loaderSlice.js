/*
Loader at first is false -> Initial State

Now when we do any operations then set it to true and the loading feature will be enabled i.e make it true
Then again if operation is finished then make it false. And remove the loading feature.


*/

import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",

  initialState: {
    loading: false,
  },

  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },

    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
