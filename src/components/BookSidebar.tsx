import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { openChapter } from "./ui/uiSlice";
import { useState } from "react";

export default function BookSidebar() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const activeBookId = useSelector(
    (state: RootState) => state.book.activeBookId,
  );

  const book = useSelector((state: RootState) =>
    activeBookId ? state.book.books[activeBookId] : null,
  );

  if (!book) return null;

  return (
    <aside
      className={`
        relative
        bg-[#F8F5F1]
        border-r border-indigo-900/10
        shadow-lg
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-12" : "w-64"}
      `}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute -right-3 top-6
          w-6 h-6
          rounded-full
          bg-indigo-900 text-amber-100
          flex items-center justify-center
          shadow-md
          hover:bg-indigo-800
          transition-colors
        "
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      {/* Content */}
      <div
        className={`
          px-5 py-6
          transition-all duration-200
          ${collapsed ? "opacity-0 translate-x-[-8px] pointer-events-none" : "opacity-100"}
        `}
      >
        <h3 className="text-lg font-semibold text-indigo-900 mb-6">
          {book.title}
        </h3>

        <nav className="flex flex-col gap-2">
          {book.chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => dispatch(openChapter(ch.id))}
              className="
                text-left
                px-3 py-2
                rounded-lg
                text-indigo-900
                hover:bg-indigo-900/5
                transition-colors
              "
            >
              {ch.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
