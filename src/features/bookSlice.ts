import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, ChapterNote, Comments } from "../types/types";
import book1 from "../data/book1.json";
import book2 from "../data/book2.json";

// ---------------------- Types ----------------------

interface BookState {
  comments?: Comments[];
  books: Record<string, Book>;
  activeBookId: string | null;
  chapterNotes: ChapterNote[];
}

// ---------------------- Helper ----------------------
const transformBook = (book: any): Book => ({
  ...book,
  chapters: book.chapters.map((chapter: any) => ({
    id: chapter.id,
    title: chapter.title,
    paragraphs: chapter.alternatives?.[0]?.paragraphs || [],
    alternatives: chapter.alternatives,
    clearText: chapter.clearText ?? [],
  })),
});

// ---------------------- Initial State ----------------------
const initialState: BookState = {
  books: {
    [book1.id]: transformBook(book1),
    [book2.id]: transformBook(book2),
  },
  comments: book1.comments as Comments[],
  activeBookId: null,
  chapterNotes: book1.chapterNotes ?? [], // initialize empty
};

// ---------------------- Slice ----------------------
export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // Open / Close Book
    openBook(state, action: PayloadAction<string>) {
      state.activeBookId = action.payload;
    },
    closeBook(state) {
      state.activeBookId = null;
    },
  },
});

// ---------------------- Exports ----------------------
export const { openBook, closeBook } = bookSlice.actions;

export const bookReducer = bookSlice.reducer;
