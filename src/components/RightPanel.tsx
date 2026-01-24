import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { closeChapter } from "./ui/uiSlice";

export default function RightPanel() {
  const dispatch = useDispatch();

  const activeBookId = useSelector(
    (state: RootState) => state.book.activeBookId,
  );

  const openChapterId = useSelector(
    (state: RootState) => state.ui.openChapterId,
  );

  const book = useSelector((state: RootState) =>
    activeBookId ? state.book.books[activeBookId] : null,
  );

  if (!book) return null;

  if (!openChapterId) {
    return (
      <main className="flex-1 px-10 py-8 text-indigo-900/60 italic">
        Select a chapter to read
      </main>
    );
  }

  const chapter = book.chapters.find((ch) => ch.id === openChapterId);
  if (!chapter) return null;

  return (
    <main className="flex-1 px-10 py-8 overflow-y-auto border-l border-indigo-900/10">
      <header className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-indigo-900">
          {chapter.title}
        </h2>

        <button
          onClick={() => dispatch(closeChapter())}
          className="text-indigo-900/60 hover:text-indigo-900 transition-colors"
        >
          ✕ Close
        </button>
      </header>

      <article className="space-y-4 text-indigo-900 leading-relaxed">
        {chapter.paragraphs.map((p) => (
          <p key={p.id}>{p.text}</p>
        ))}
      </article>
    </main>
  );
}
