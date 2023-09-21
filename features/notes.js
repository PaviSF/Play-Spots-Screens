import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    value: {
      date: [],
      note: [],
    },
  },
  reducers: {
    setNote: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNote } = noteSlice.actions;
export default noteSlice.reducer;

