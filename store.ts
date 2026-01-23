import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./src/components/ui/uiSlice"; // Adjust the path based on your file structure
import { bookReducer } from "./src/features/bookSlice";

export const store = configureStore({
  reducer: { book: bookReducer, ui: uiReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
