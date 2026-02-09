import type { ChapterAlternative, ChapterNote } from "../types/types";

type HeaderTextPanelProps = {
  title: string;
  selectedVersionId: string;
  chapterId?: string;
  onVersionChange: (id: string) => void;
  alternatives?: ChapterAlternative[];
  onClose: () => void;
  showDiff?: boolean;
  onToggleDiff?: () => void;
  hasCloseButton?: boolean;
  chapterNotes?: ChapterNote[];
  onOpenInfo?: () => void; // callback
};

export default function HeaderTextPanel({
  title,
  selectedVersionId,
  chapterId,
  onVersionChange,
  alternatives = [],
  onClose,
  showDiff,
  onToggleDiff,
  hasCloseButton,
  chapterNotes = [],
  onOpenInfo,
}: HeaderTextPanelProps) {
  void chapterId;

  const notesForCurrentVersion = chapterNotes.filter(
    (note) => note.version === selectedVersionId,
  );

  const showInfoButton = notesForCurrentVersion.length > 0 && onOpenInfo;

  return (
    <header className="flex flex-col px-4 py-2 border-b border-indigo-900/10 bg-white/70 backdrop-blur gap-2">
      {/* TOP ROW: Title + Close button */}
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl font-semibold text-indigo-900">{title}</h2>

        {hasCloseButton && (
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg text-sm font-semibold text-[#312c85] 
               bg-indigo-100 hover:bg-indigo-200 transition shadow-sm"
          >
            ✕
          </button>
        )}
      </div>

      {/* BOTTOM ROW: Dropdown + Diff + Info button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        {alternatives.length > 0 && (
          <select
            value={selectedVersionId}
            onChange={(e) => onVersionChange(e.target.value)}
            className="text-lg rounded-md border border-indigo-900/20 bg-white px-2 py-1 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {alternatives.map((alt) => (
              <option key={alt.id} value={alt.id}>
                {alt.label}
              </option>
            ))}
          </select>
        )}

        {onToggleDiff && (
          <button
            onClick={onToggleDiff}
            className="px-2 py-1 text-sm bg-indigo-100 rounded hover:bg-indigo-200 text-indigo-900"
          >
            {showDiff ? "Diff ON" : "Diff OFF"}
          </button>
        )}

        {showInfoButton && (
          <button
            onClick={onOpenInfo}
            className="px-3 py-0 rounded-lg   font-semibold text-[#312c85] 
               bg-indigo-100 hover:bg-indigo-200 transition shadow-sm text-lg"
          >
            Info
          </button>
        )}
      </div>
    </header>
  );
}
