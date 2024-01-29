import { configureStore } from "@reduxjs/toolkit";

import practicesReducer from "./slice";

const store = configureStore({ reducer: { practices: practicesReducer } });

export default store;
