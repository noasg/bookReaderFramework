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
  onOpenInfo?: () => void; // ✅ callback
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
  const hasAlternatives = alternatives.length > 0;

  // Filter notes for current version
  const notesForCurrentVersion = chapterNotes.filter(
    (note) => note.version === selectedVersionId,
  );

  const showInfoButton = notesForCurrentVersion.length > 0;

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-indigo-900/10 bg-white/70 backdrop-blur relative">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-indigo-900">{title}</h2>

        {hasAlternatives && (
          <select
            value={selectedVersionId}
            onChange={(e) => onVersionChange(e.target.value)}
            className="text-sm rounded-md border border-indigo-900/20 bg-white px-2 py-1 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            className="ml-2 px-2 py-1 text-sm bg-indigo-100 rounded hover:bg-indigo-200 text-indigo-900"
          >
            {showDiff ? "Diff ON" : "Diff OFF"}
          </button>
        )}
      </div>

      {/* CENTER - Informatii button */}
      {showInfoButton && onOpenInfo && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={onOpenInfo}
            className="px-3 py-1.5 rounded-lg text-sm font-semibold text-[#312c85] 
                 bg-indigo-100 hover:bg-indigo-200 transition shadow-sm"
          >
            Info
          </button>
        </div>
      )}

      {/* RIGHT SIDE - Close button */}
      {hasCloseButton && (
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={onClose}
            className="text-indigo-700 hover:text-indigo-900"
          >
            ✕
          </button>
        </div>
      )}
    </header>
  );
}
