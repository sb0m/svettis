import { createSlice } from "@reduxjs/toolkit";
import { Exercise } from "../types/types";

type ExerciseState = {
  exercises: Exercise[];
};

const initialState: ExerciseState = {
  exercises: [],
};

export const exercicesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: (state, action) => {
      state.exercises.push(action.payload);
    },
    deleteExercise: (state, action) => {
      state.exercises = state.exercises.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addExercise, deleteExercise } = exercicesSlice.actions;

export default exercicesSlice.reducer;

// A “slice” is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file.
