import { createSlice } from "@reduxjs/toolkit";
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${year}-${month}-${day}`;

export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    value: {
      turf_details: { turf_id: "", sport_id: [], slot_id: [] },
      date: currentDate,
      start_time: "00:00",
      end_time: "01:00",
    },
  },
  reducers: {
    setDate: (state, action) => {
      state.value.date = action.payload;
    },
    setStartTime: (state, action) => {
      state.value.start_time = action.payload;
    },
    setEndTime: (state, action) => {
      state.value.end_time = action.payload;
    },
    setTurfDetails: (state, action) => {
      state.value.turf_details = action.payload;
    },
    resetData: (state) => {
      state.value = initial.value;
    },
  },
});
export const { setDate, setStartTime, setEndTime, setTurfDetails } =
  bookingSlice.actions;
export default bookingSlice.reducer;
