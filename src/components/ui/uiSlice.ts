import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  openChapterId: string | null;
}

const initialState: UIState = {
  openChapterId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openChapter(state, action: PayloadAction<string>) {
      state.openChapterId = action.payload;
    },
    closeChapter(state) {
      state.openChapterId = null;
    },
    resetUI(state) {
      state.openChapterId = null;
    },
  },
});

export const { openChapter, closeChapter, resetUI } = uiSlice.actions;
export default uiSlice.reducer;
