import { configureStore } from "@reduxjs/toolkit";

import exercicesReducer from "./slice_exercises";
import practicesReducer from "./slice_practices";

const store = configureStore({
  reducer: { practices: practicesReducer, exercises: exercicesReducer },
});

export default store;
export type IRootState = ReturnType<typeof store.getState>;
