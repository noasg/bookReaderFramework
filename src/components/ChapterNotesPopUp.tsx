import { useEffect } from "react";
import type { ChapterNote } from "../types/types";

type ChapterNotesPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  notes: ChapterNote[]; // ✅ notes to display
};

export default function ChapterNotesPopUp({
  isOpen,
  onClose,
  notes,
}: ChapterNotesPopUpProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
         relative
    max-w-[75vw]
    max-h-[85vh]
    bg-white
    rounded-2xl
    shadow-2xl
    border border-gray-300
    flex flex-col
    overflow-auto
    animate-popup
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="text-[#312c85] absolute top-3 right-3 bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center shadow hover:scale-105 transition z-10 "
          aria-label="Close"
        >
          <span className="font-bold text-lg">✕</span>
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-6 border-b border-indigo-900/10">
          <h2 className="text-xl font-semibold text-indigo-900 text-center">
            <div dangerouslySetInnerHTML={{ __html: notes[0]?.author || "" }} />
          </h2>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-4 text-indigo-900 space-y-4">
          {notes.length === 0 ? (
            <p className="text-indigo-900/80 italic">
              Nu există note pentru acest capitol/version.
            </p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="space-y-2">
                {/* <h4 className="font-semibold">{note.author}</h4> */}
                <div
                  className="text-sm text-indigo-900/90"
                  dangerouslySetInnerHTML={{ __html: note.content || "" }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
