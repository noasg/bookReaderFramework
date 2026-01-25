import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeChapter } from "./ui/uiSlice";
import type { Chapter } from "../types/types";

export default function ChapterPanels({ chapter }: { chapter: Chapter }) {
  const dispatch = useDispatch();

  const [showOriginal, setShowOriginal] = useState(true);
  const [showAlternative, setShowAlternative] = useState(true);

  const hasAlternatives =
    !!chapter.alternatives && chapter.alternatives.length > 0;
  const alternative = hasAlternatives ? chapter.alternatives![0] : null;

  const visiblePanels =
    Number(showOriginal) + Number(showAlternative && hasAlternatives);

  // Auto-unselect chapter if all panels are closed
  useEffect(() => {
    if (!showOriginal && (!hasAlternatives || !showAlternative)) {
      dispatch(closeChapter());
    }
  }, [showOriginal, showAlternative, hasAlternatives, dispatch]);

  return (
    <main className="flex-1 flex overflow-hidden border-l border-indigo-900/10">
      {/* ORIGINAL PANEL */}
      <section
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${
            showOriginal
              ? visiblePanels === 2
                ? "w-1/2 opacity-100"
                : "w-full opacity-100"
              : "w-0 opacity-0 -translate-x-6 pointer-events-none"
          }
        `}
      >
        <header className="flex items-center justify-between mb-4 ml-4">
          <h2 className="text-xl font-semibold text-indigo-900">
            {chapter.title}
          </h2>
          <button
            onClick={() => setShowOriginal(false)}
            className="text-indigo-700 hover:text-indigo-900 mr-4"
          >
            ✕
          </button>
        </header>

        {chapter.paragraphs.map((p) => (
          <p key={p.id} className="mb-4 text-indigo-900 ml-4">
            {p.text}
          </p>
        ))}
      </section>

      {/* ALTERNATIVE PANEL */}
      {hasAlternatives && alternative && (
        <section
          className={`
            transition-all duration-300 ease-in-out overflow-hidden
            bg-indigo-900/5 border-l border-indigo-900/10
            ${
              showAlternative
                ? visiblePanels === 2
                  ? "w-1/2 opacity-100"
                  : "w-full opacity-100"
                : "w-0 opacity-0 translate-x-6 pointer-events-none"
            }
          `}
        >
          <header className="flex items-center justify-between mb-4 ml-4">
            <h2 className="text-xl font-semibold text-indigo-900">
              {alternative.label}
            </h2>
            <button
              onClick={() => setShowAlternative(false)}
              className="text-indigo-700 hover:text-indigo-900 mr-4"
            >
              ✕
            </button>
          </header>

          {alternative.paragraphs.map((p) => (
            <p key={p.id} className="mb-4 text-indigo-900 ml-4">
              {p.text}
            </p>
          ))}
        </section>
      )}
    </main>
  );
}
