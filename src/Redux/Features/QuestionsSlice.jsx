// src/redux/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
const questionCounterSlice = createSlice({
  name: "questionCounter",
  initialState: {
    value: 0,
    activeStep: 0,
    selectedOption: null,
    changeChapter: 1,
    giveAnswer: false,
    questionLimit: 1,

    uploadStatus: false,
    menuopen: false,
    counter: 1,
    price: 90,
    enhanceBook: null,
    userDetails: [],
  },
  reducers: {
    increment: (state) => {
      if (state.changeChapter != 11) {
        state.value += 1;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },

    incrementstep: (state, action) => {
      const nextStep = action.payload; // Step number passed in action
      
      if (nextStep >= 0 && nextStep <= 6) {
        state.activeStep = nextStep;
      }
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    decrementstep: (state) => {
      if (state.activeStep > 0) state.activeStep -= 1; // Prevent going below 0
    },

    incrementChapter: (state) => {
      if (state.changeChapter != 11) {
        state.changeChapter += 1;
      }
    },
    resetIncrementPrevBtn: (state) => {
      state.value = -1;
    },
    resetIncrementNextBtn: (state) => {
      state.value = 0;
    },
    decrementChapter: (state) => {
      console.log("Current Chapter:", state.changeChapter);
      if (state.changeChapter != 1) {
        state.changeChapter -= 1;
        state.value = 0;
      }
    },
    NavigateQuestionNo: (state, action) => {
      state.value = action.payload; // Use payload to update `value`
    },

    incrementQuestionLimit: (state) => {
      state.questionLimit += 1;
    },

    resetQuestionLimit: (state) => {
      state.questionLimit = 1;
    },
    changeStatus: (state) => {
      state.uploadStatus = !state.uploadStatus;
    },
    togglemenu: (state) => {
      state.menuopen = !state.menuopen;
    },

    setChangeChapter: (state, action) => {
      state.changeChapter = action.payload; // Update `changeChapter` with the provided value
    },
    setGiveAnswer: (state, action) => {
      state.giveAnswer = action.payload; // Action to update `giveAnswer`
    },

    incrementcounter: (state) => {
      state.counter += 1;
      state.price += 90;
    },
    decrementcounter: (state) => {
      if (state.counter > 1) {
        state.counter -= 1;
        state.price -= 90;
      }
    },

    updateCounterAndPrice: (state, action) => {
      state.counter = action.payload.counter;
      state.price = action.payload.price;
    },
    setEnhanceBook: (state, action) => {
      state.enhanceBook = action.payload; // Action to set enhanceBook
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.userDetails;
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
  incrementQuestionLimit,
  resetQuestionLimit,
  changeStatus,
  resetIncrementNextBtn,
  resetIncrementPrevBtn,
  togglemenu,
  setChangeChapter,
  setGiveAnswer,
  incrementcounter,
  decrementcounter,
  updateCounterAndPrice,
  incrementstep,
  decrementstep,
  setEnhanceBook,
  setSelectedOption,
  setUserDetails,
} = questionCounterSlice.actions;
export default questionCounterSlice.reducer;
