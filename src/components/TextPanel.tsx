import { useMemo, useState } from "react";
import type { Paragraph, ChapterAlternative } from "../types/types";
import HeaderTextPanel from "./HeaderTextPanel";
import DiffText from "./DiffText";

type Version = {
  id: string;
  paragraphs: Paragraph[];
};

type TextPanelProps = {
  title: string;
  originalParagraphs: Paragraph[];
  alternatives?: ChapterAlternative[];

  defaultVersionId: string;

  // Controlled selection (optional)
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
};

export default function TextPanel({
  title,
  originalParagraphs,
  alternatives = [],
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
}: TextPanelProps) {
  // Build all available versions
  const versions: Version[] = useMemo(
    () => [
      { id: "original", paragraphs: originalParagraphs },
      ...alternatives.map((alt) => ({
        id: alt.id,
        paragraphs: alt.paragraphs,
      })),
    ],
    [originalParagraphs, alternatives],
  );

  // Internal state fallback if controlled props not provided
  const [internalSelectedVersionId, setInternalSelectedVersionId] =
    useState(defaultVersionId);

  const selectedVersionId = selectedVersionIdProp ?? internalSelectedVersionId;
  const setSelectedVersionIdFn =
    onVersionChange ?? setInternalSelectedVersionId;

  // Safety fallback
  const selectedVersion =
    versions.find((v) => v.id === selectedVersionId) ?? versions[0];

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
      {/* HEADER */}
      <HeaderTextPanel
        title={title}
        selectedVersionId={selectedVersionId}
        onVersionChange={setSelectedVersionIdFn}
        alternatives={alternatives}
        onClose={onClose}
        showDiff={showDiff} // ⚡ pass boolean
        onToggleDiff={onToggleDiff} // ⚡ pass callback
      />

      {/* CONTENT */}
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
            <p key={p.id} className="mb-4 text-indigo-900">
              {p.text}
            </p>
          ))
        )}
      </div>
    </section>
  );
}
