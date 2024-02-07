import { createSlice } from "@reduxjs/toolkit";
import { Practice } from "../types/types";

type PracticeState = {
  practices: Practice[];
};

const initialState: PracticeState = {
  practices: [],
};

export const practicesSlice = createSlice({
  name: "practices",
  initialState,
  reducers: {
    addPractice: (state, action) => {
      state.practices.push(action.payload);
    },
    deletePractice: (state, action) => {
      state.practices = state.practices.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addPractice, deletePractice } = practicesSlice.actions;

export default practicesSlice.reducer;

// A “slice” is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file.
