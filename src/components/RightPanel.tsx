import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import ChapterPanels from "./ChapterPanels";
import type { Chapter } from "../types/types";

export default function RightPanel() {
  const activeBookId = useSelector(
    (state: RootState) => state.book.activeBookId,
  );

  const openChapterId = useSelector(
    (state: RootState) => state.ui.openChapterId,
  );

  const book = useSelector((state: RootState) =>
    activeBookId ? state.book.books[activeBookId] : null,
  );

  console.log("RightPanel - activeBook:", book);

  // ✅ GET COMMENTS FROM STORE
  const comments = useSelector((state: RootState) => state.book.comments);

  const chapterNotes = useSelector(
    (state: RootState) => state.book.chapterNotes,
  );

  // console.log("RightPanel - chapterNotes:", chapterNotes);

  const chapter =
    book && openChapterId
      ? book.chapters.find((ch: Chapter) => ch.id === openChapterId)
      : null;

  if (!chapter) {
    return (
      <main className="flex-1 px-10 py-8 text-indigo-900/60 italic">
        Select a chapter to read
      </main>
    );
  }

  if (!chapter) {
    return (
      <main className="flex-1 px-10 py-8 text-indigo-900/60 italic overflow-y-auto">
        Select a chapter to read
      </main>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <ChapterPanels
        key={chapter.id}
        chapter={chapter}
        comments={comments ?? []}
        chapterNotes={chapterNotes ?? []}
      />
    </div>
  );
}
