import { useMemo, useState } from "react";
import type { ChapterAlternative, Comments } from "../types/types";
import HeaderTextPanel from "./HeaderTextPanel";
import DiffText from "./DiffText";
import TextWithComments from "./TextWithComments";

type TextPanelProps = {
  title: string;
  alternatives: ChapterAlternative[];
  defaultVersionId: string;

  selectedVersionId?: string;
  onVersionChange?: (id: string) => void;

  isVisible: boolean;
  widthMode: "half" | "full";
  side: "left" | "right";
  onClose: () => void;

  extraClasses?: string;

  diffAgainstText?: string;
  showDiff?: boolean;
  onToggleDiff?: () => void;

  comments?: Comments[];
  chapterId: string;

  hasCloseButton?: boolean;
};

export default function TextPanel({
  title,
  alternatives,
  defaultVersionId,
  selectedVersionId: selectedVersionIdProp,
  onVersionChange,
  isVisible,
  widthMode,
  side,
  onClose,
  extraClasses = "",
  diffAgainstText,
  showDiff,
  onToggleDiff,
  comments,
  chapterId,
  hasCloseButton = true,
}: TextPanelProps) {
  const [internalSelectedVersionId, setInternalSelectedVersionId] =
    useState(defaultVersionId);
  const selectedVersionId = selectedVersionIdProp ?? internalSelectedVersionId;
  const setSelectedVersionIdFn =
    onVersionChange ?? setInternalSelectedVersionId;

  const selectedVersion = useMemo(
    () =>
      alternatives.find((a) => a.id === selectedVersionId) ?? alternatives[0],
    [alternatives, selectedVersionId],
  );

  return (
    <section
      className={`
        transition-all duration-300 ease-in-out overflow-hidden
        ${
          isVisible
            ? widthMode === "half"
              ? "w-1/2 opacity-100"
              : "w-full opacity-100"
            : side === "left"
              ? "w-0 opacity-0 -translate-x-6 pointer-events-none"
              : "w-0 opacity-0 translate-x-6 pointer-events-none"
        }
        ${extraClasses}
      `}
    >
      <HeaderTextPanel
        title={title}
        selectedVersionId={selectedVersionId}
        onVersionChange={setSelectedVersionIdFn}
        alternatives={alternatives}
        onClose={onClose}
        showDiff={showDiff}
        onToggleDiff={onToggleDiff}
        hasCloseButton={hasCloseButton}
      />

      <div className="px-4 py-4 space-y-4">
        {diffAgainstText && showDiff ? (
          <DiffText
            baseText={diffAgainstText}
            compareText={selectedVersion.paragraphs
              .map((p) => p.text)
              .join("\n")}
          />
        ) : (
          selectedVersion.paragraphs.map((p) => (
            <TextWithComments
              key={p.id}
              paragraph={p}
              chapterId={chapterId}
              versionId={selectedVersion.id}
              comments={comments ?? []}
            />
          ))
        )}
      </div>
    </section>
  );
}
