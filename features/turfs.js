import { createSlice } from "@reduxjs/toolkit";

export const turfSlice = createSlice({
  name: "turfs",
  initialState: {
    value: {
      turfs: [],
    },
  },
  reducers: {
    setTurfs: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setTurfs } = turfSlice.actions;
export default turfSlice.reducer;