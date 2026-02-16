import { useMemo, useState } from "react";
import type {
  ChapterAlternative,
  ChapterNote,
  Comments,
} from "../../../types/types";
import HeaderTextPanel from "./HeaderTextPanel";
import TextWithComments from "./TextWithComments";
import ChapterNotesPopUp from "../popUp/ChapterNotesPopUp";

type TextPanelProps = {
  title: string;
  alternatives: ChapterAlternative[]; // can also be clearText
  defaultVersionId: string;

  selectedVersionId?: string;
  onVersionChange?: (id: string) => void;

  isVisible: boolean;
  widthMode: "half" | "full";
  side: "left" | "right";
  onClose: () => void;

  extraClasses?: string;

  comments?: Comments[];
  chapterId: string;

  chapterNotes?: ChapterNote[];
  hasCloseButton?: boolean;
};

export default function TextPanel({
  title,
  alternatives = [],
  defaultVersionId,
  selectedVersionId: selectedVersionIdProp,
  onVersionChange,
  isVisible,
  widthMode,
  side,
  onClose,
  extraClasses = "",
  comments,
  chapterId,
  hasCloseButton = true,
  chapterNotes = [],
}: TextPanelProps) {
  const [internalSelectedVersionId, setInternalSelectedVersionId] =
    useState(defaultVersionId);
  const [infoOpen, setInfoOpen] = useState(false);

  const selectedVersionId = selectedVersionIdProp ?? internalSelectedVersionId;
  const setSelectedVersionIdFn =
    onVersionChange ?? setInternalSelectedVersionId;

  // ✅ Safely get the selected version
  const selectedVersion = useMemo(() => {
    if (!alternatives || alternatives.length === 0) return undefined;
    return (
      alternatives.find((a) => a.id === selectedVersionId) ?? alternatives[0]
    );
  }, [alternatives, selectedVersionId]);

  // ✅ Safe paragraphs array
  const paragraphs = selectedVersion?.paragraphs ?? [];

  const notesForCurrentVersion = chapterNotes.filter(
    (note) => note.version === selectedVersionId,
  );

  return (
    <section
      data-text-panel
      className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col ${
        isVisible
          ? widthMode === "half"
            ? "w-full lg:w-1/2 opacity-100"
            : "w-full opacity-100"
          : side === "left"
            ? "w-0 opacity-0 -translate-x-6 pointer-events-none"
            : "w-0 opacity-0 translate-x-6 pointer-events-none"
      } ${extraClasses}`}
    >
      {/* --- POPUP AT TOP LEVEL --- */}
      <ChapterNotesPopUp
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        notes={notesForCurrentVersion}
      />

      {/* --- HEADER --- */}
      <HeaderTextPanel
        title={title}
        selectedVersionId={selectedVersionId}
        onVersionChange={setSelectedVersionIdFn}
        alternatives={alternatives}
        onClose={onClose}
        hasCloseButton={hasCloseButton}
        chapterNotes={chapterNotes}
        onOpenInfo={() => setInfoOpen(true)}
      />

      {/* --- TEXT CONTENT --- */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        {paragraphs.map((p) => (
          <TextWithComments
            key={p.id}
            paragraph={p}
            chapterId={chapterId}
            versionId={selectedVersion?.id ?? ""}
            comments={comments ?? []}
          />
        ))}
      </div>
    </section>
  );
}
