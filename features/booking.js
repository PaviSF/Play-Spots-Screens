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
      turf_details: {
        turf_id: "",
        sport_id: [],
        slot_id: [],
        currency: "",
        turf_name: "",
        turf_locality: "",
        pay_at_venue: 0,
        allow_half_hour: 0,
        from_thirtieth_minute: 0,
        limit_round: 0,
      },
      date: currentDate,
      start_time: "00:00",
      end_time: "00:00",
      modal_state: false,
      pricing: { price: 0, offer: 0 },
      filtered_data: [],
    },
  },
  reducers: {
    changeModalState: (state, action) => {
      state.value.modal_state = action.payload;
    },
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
    setPricing: (state, action) => {
      state.value.pricing = action.payload;
    },
    setFilteredData: (state, action) => {
      state.value.filtered_data = action.payload;
    },
    resetData: (state) => {
      state.value = initial.value;
    },
  },
});
export const {
  setDate,
  setStartTime,
  setEndTime,
  setTurfDetails,
  changeModalState,
  setPricing,
  setFilteredData,
  resetData
} = bookingSlice.actions;
export default bookingSlice.reducer;
