import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { openChapter } from "./ui/uiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeftArrow from "./LeftArrow";
import RightArrow from "./RightArrow";

export default function BookSidebar({ bookId }: { bookId?: string }) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const activeChapterId = useSelector(
    (state: RootState) => state.ui.openChapterId,
  );

  // ✅ Use URL prop instead of Redux activeBookId for initial render
  const book = useSelector((state: RootState) =>
    bookId ? state.book.books[bookId] : null,
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
        ${collapsed ? "w-4" : "w-64"}
      `}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          absolute -right-5 top-1/2 -translate-y-1/2
          w-8 h-8
          rounded-full
          bg-transparent
          flex items-center justify-center
          border border-indigo-900/20
          transition-transform
        "
      >
        {collapsed ? (
          <RightArrow width={60} height={60} />
        ) : (
          <LeftArrow width={60} height={60} />
        )}
      </button>

      {/* Content */}
      <div
        className={`
          px-5 py-6
          transition-all duration-200
          ${collapsed ? "opacity-0 -translate-x-2 pointer-events-none" : "opacity-100"}
        `}
      >
        <h3 className="text-lg font-semibold text-indigo-900 mb-6">
          {book.title}
        </h3>

        <nav className="flex flex-col gap-1">
          {book.chapters.map((ch) => {
            const isActive = ch.id === activeChapterId;

            return (
              <button
                key={ch.id}
                onClick={() => {
                  dispatch(openChapter(ch.id));
                  if (bookId) navigate(`/${bookId}/${ch.id}`); // ✅ Chapter routing
                }}
                className={`
                  text-left px-3  text-base py-2 rounded-lg transition-all
                  ${
                    isActive
                      ? "bg-indigo-900/10 text-indigo-900 font-semibold transform translate-x-1"
                      : "text-indigo-900 hover:bg-indigo-900/5 transform hover:translate-x-1"
                  }
                `}
              >
                {ch.title}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
