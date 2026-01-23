import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "../framework/src/features/bookSlice"; // Adjust the path based on your file structure
import uiReducer from "../framework/src/components/ui/uiSlice"; // Adjust the path based on your file structure

export const store = configureStore({
  reducer: { book: bookReducer, ui: uiReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
