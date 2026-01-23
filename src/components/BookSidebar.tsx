import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { openChapter } from "./ui/uiSlice";

export default function BookSidebar() {
  const dispatch = useDispatch();

  const activeBookId = useSelector(
    (state: RootState) => state.book.activeBookId,
  );

  const book = useSelector((state: RootState) =>
    activeBookId ? state.book.books[activeBookId] : null,
  );

  if (!book) return null;

  return (
    <aside style={{ width: 250, borderRight: "1px solid #ccc", padding: 16 }}>
      <h3>{book.title}</h3>

      {book.chapters.map((ch) => (
        <button
          key={ch.id}
          onClick={() => dispatch(openChapter(ch.id))}
          style={{ display: "block", margin: "8px 0", width: "100%" }}
        >
          {ch.title}
        </button>
      ))}
    </aside>
  );
}
