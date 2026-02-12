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
    <header className="flex items-center px-4 py-2 border-b border-indigo-900/10 bg-white/70 backdrop-blur gap-3">
      {/* Title */}
      <h2 className="text-lg font-semibold text-indigo-900 whitespace-nowrap">
        {title}
      </h2>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-1">
        {alternatives.length > 0 && (
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
            className="px-2 py-1 text-xs bg-indigo-100 rounded hover:bg-indigo-200 text-indigo-900 whitespace-nowrap"
          >
            {showDiff ? "Diff ON" : "Diff OFF"}
          </button>
        )}

        {showInfoButton && (
          <button
            onClick={onOpenInfo}
            className="px-2 py-1 rounded-lg font-semibold text-[#312c85] 
          bg-indigo-100 hover:bg-indigo-200 transition shadow-sm text-sm whitespace-nowrap"
          >
            Info
          </button>
        )}
      </div>

      {/* Close */}
      {hasCloseButton && (
        <button
          onClick={onClose}
          className="px-2 py-1 rounded-lg text-sm font-semibold text-[#312c85] 
        bg-indigo-100 hover:bg-indigo-200 transition shadow-sm whitespace-nowrap"
        >
          ✕
        </button>
      )}
    </header>
  );
}
