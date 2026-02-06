import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, Comments } from "../types/types";
import book1 from "../data/book1.json";
import book2 from "../data/book2.json";

interface BookState {
  comments?: Comments[];
  books: Record<string, Book>;
  activeBookId: string | null;
}

const transformBook = (book: any): Book => ({
  ...book,
  chapters: book.chapters.map((chapter: any) => ({
    id: chapter.id,
    title: chapter.title,
    paragraphs: chapter.alternatives?.[0]?.paragraphs || [],
    alternatives: chapter.alternatives,
  })),
});

const initialState: BookState = {
  books: {
    [book1.id]: transformBook(book1),
    [book2.id]: transformBook(book2),
  },
  comments: book1.comments as Comments[],
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
