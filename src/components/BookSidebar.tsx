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
    <aside className="w-64 bg-[#F8F5F1] border-r border-indigo-900/10 shadow-lg px-5 py-6">
      <h3 className="text-lg font-semibold text-indigo-900 mb-6">
        {book.title}
      </h3>

      <nav className="flex flex-col gap-2">
        {book.chapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => dispatch(openChapter(ch.id))}
            className="text-left px-3 py-2 rounded-lg text-indigo-900 hover:bg-indigo-900/5 transition-colors"
          >
            {ch.title}
          </button>
        ))}
      </nav>
    </aside>
  );
}
