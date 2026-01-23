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
      <main style={{ flex: 1, padding: 20 }}>
        <em>Select a chapter to read</em>
      </main>
    );
  }

  const chapter = book.chapters.find((ch) => ch.id === openChapterId);

  if (!chapter) return null;

  return (
    <main
      style={{
        flex: 1,
        padding: 20,
        borderLeft: "1px solid #ccc",
        overflowY: "auto",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2>{chapter.title}</h2>
        <button onClick={() => dispatch(closeChapter())}>✕ Close</button>
      </header>

      {chapter.paragraphs.map((p) => (
        <p key={p.id} style={{ marginBottom: 12 }}>
          {p.text}
        </p>
      ))}
    </main>
  );
}
