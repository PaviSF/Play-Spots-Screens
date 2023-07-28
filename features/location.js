import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    value: {
      latitude: 0,
      longitude: 0,
      district: "",
      state: "",
      country: "",
    },
  },
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
