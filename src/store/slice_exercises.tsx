import { createSlice } from "@reduxjs/toolkit";
import { exercises } from "../data/exercises";

const initialState = {
  //reducer2
  exercises: [...exercises],
};

export const exercicesSlice = createSlice({
  name: "practices",
  initialState,
  reducers: {
    // eslint-disable-next-line
    // @ts-ignore
    addExercise: (state, action) => {
      console.log("addPractice");
      const newnew = action.payload;
      state.exercises.push(newnew);
    },
  },
});

export const { addExercise } = exercicesSlice.actions;

export default exercicesSlice.reducer;

// A “slice” is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file.
