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

  return <ChapterPanels key={chapter.id} chapter={chapter} />;
}
