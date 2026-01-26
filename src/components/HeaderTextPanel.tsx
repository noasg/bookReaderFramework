import type { ChapterAlternative } from "../types/types";

type HeaderTextPanelProps = {
  title: string;
  selectedVersionId: string;
  onVersionChange: (id: string) => void;
  alternatives?: ChapterAlternative[];
  onClose: () => void;

  // NEW: Diff toggle
  showDiff?: boolean;
  onToggleDiff?: () => void;
};

export default function HeaderTextPanel({
  title,
  selectedVersionId,
  onVersionChange,
  alternatives = [],
  onClose,
  showDiff,
  onToggleDiff,
}: HeaderTextPanelProps) {
  const hasAlternatives = alternatives.length > 0;

  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-indigo-900/10 bg-white/70 backdrop-blur">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-indigo-900">{title}</h2>

        {hasAlternatives && (
          <select
            value={selectedVersionId}
            onChange={(e) => onVersionChange(e.target.value)}
            className="text-sm rounded-md border border-indigo-900/20 bg-white px-2 py-1 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="original">Original</option>
            {alternatives.map((alt) => (
              <option key={alt.id} value={alt.id}>
                {alt.label}
              </option>
            ))}
          </select>
        )}

        {/* NEW: Diff toggle button */}
        {onToggleDiff && (
          <button
            onClick={onToggleDiff}
            className="ml-2 px-2 py-1 text-sm bg-indigo-100 rounded hover:bg-indigo-200 text-indigo-900"
          >
            {showDiff ? "Diff ON" : "Diff OFF"}
          </button>
        )}
      </div>

      <button
        onClick={onClose}
        className="text-indigo-700 hover:text-indigo-900"
      >
        ✕
      </button>
    </header>
  );
}
