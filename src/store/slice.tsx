import { createSlice } from "@reduxjs/toolkit";
import { exercises } from "../data/exercises";
import { practices } from "../data/practices";

const initialState = {
  // reducer1
  practices: [...practices],
  //reducer2
  exercises: [...exercises],
};

export const practicesSlice = createSlice({
  name: "practices",
  initialState,
  reducers: {
    // eslint-disable-next-line
    // @ts-ignore
    addPractice: (state, action) => {
      console.log("addPractice");
      const newnew = action.payload;
      state.practices.push(newnew);
    },
  },
});

export const { addPractice } = practicesSlice.actions;

export default practicesSlice.reducer;

// A “slice” is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file.
