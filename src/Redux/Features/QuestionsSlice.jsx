// src/redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const questionCounterSlice = createSlice({
  name: "questionCounter",
  initialState: {
    value: 0,
    changeChapter: 1,

    uploadStatus: false,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementChapter: (state) => {
      state.changeChapter += 1;
    },
    resetIncrement: (state) => {
      state.value = 0;
    },
    decrementChapter: (state) => {
      state.changeChapter -= 1;
      state.value = 0;
    },
    NavigateQuestionNo: (state, action) => {
      state.value = action.payload; // Use payload to update `value`
    },

    changeStatus: (state) => {
      state.uploadStatus = !state.uploadStatus;
    },
  },
});
export const {
  increment,
  incrementChapter,
  resetIncrement,
  decrement,
  decrementChapter,
  NavigateQuestionNo,
  changeStatus,
} = questionCounterSlice.actions;
export default questionCounterSlice.reducer;
