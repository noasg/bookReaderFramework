import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  openChapterId: string | null;
  textMode: "alternatives" | "clearText";
}

const initialState: UIState = {
  openChapterId: null,
  textMode: "alternatives",
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
    toggleTextMode(state) {
      // ✅ new reducer
      state.textMode =
        state.textMode === "alternatives" ? "clearText" : "alternatives";
    },
    setTextMode(state, action: PayloadAction<"alternatives" | "clearText">) {
      // optional
      state.textMode = action.payload;
    },
  },
});

export const {
  openChapter,
  closeChapter,
  resetUI,
  toggleTextMode,
  setTextMode,
} = uiSlice.actions;
export default uiSlice.reducer;
