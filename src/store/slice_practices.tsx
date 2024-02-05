import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  practices: [],
};

export const practicesSlice = createSlice({
  name: "practices",
  initialState,
  reducers: {
    addPractice: (state, action) => {
      console.log("addPractice ", state, action.payload);
      // eslint-disable-next-line
      // @ts-ignore
      state.practices.push(action.payload);
    },
  },
});

export const { addPractice } = practicesSlice.actions;

export default practicesSlice.reducer;

// A “slice” is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file.
