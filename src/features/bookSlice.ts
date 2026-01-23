import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "../types/types";
import book1 from "../data/book1.json";
import book2 from "../data/book2.json";

interface BookState {
  books: Record<string, Book>;
  activeBookId: string | null;
}

const initialState: BookState = {
  books: {
    [book1.id]: book1,
    [book2.id]: book2,
  },
  activeBookId: null,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    openBook(state, action: PayloadAction<string>) {
      state.activeBookId = action.payload;
    },
    closeBook(state) {
      state.activeBookId = null;
    },
  },
});

export const { openBook, closeBook } = bookSlice.actions;

export const bookReducer = bookSlice.reducer;
