import { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeChapter } from "./ui/uiSlice";
import type { Chapter } from "../types/types";
import TextPanel from "./TextPanel";

type ChapterPanelsProps = {
  chapter: Chapter;
  showDiff: boolean; // controlled by TopBar
};

export default function ChapterPanels({
  chapter,
  showDiff,
}: ChapterPanelsProps) {
  const dispatch = useDispatch();

  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  // Track selected versions for each panel
  const [leftSelectedVersionId, setLeftSelectedVersionId] =
    useState("original");
  const [rightSelectedVersionId, setRightSelectedVersionId] = useState(
    chapter.alternatives?.[0]?.id ?? "original",
  );

  const hasAlternatives =
    !!chapter.alternatives && chapter.alternatives.length > 0;
  const visiblePanels = Number(showLeft) + Number(showRight && hasAlternatives);

  // Auto-close chapter if all panels closed
  useEffect(() => {
    if (!showLeft && (!hasAlternatives || !showRight)) {
      dispatch(closeChapter());
    }
  }, [showLeft, showRight, hasAlternatives, dispatch]);

  // Compute left panel text for diff
  const leftVersion = useMemo(() => {
    if (leftSelectedVersionId === "original") return chapter.paragraphs;
    return (
      chapter.alternatives?.find((a) => a.id === leftSelectedVersionId)
        ?.paragraphs ?? chapter.paragraphs
    );
  }, [leftSelectedVersionId, chapter]);

  const leftText = leftVersion.map((p) => p.text).join("\n");

  return (
    <main className="flex-1 flex overflow-hidden border-l border-indigo-900/10">
      {/* LEFT PANEL */}
      <TextPanel
        title={chapter.title}
        originalParagraphs={chapter.paragraphs}
        alternatives={chapter.alternatives}
        defaultVersionId={leftSelectedVersionId}
        isVisible={showLeft}
        widthMode={visiblePanels === 2 ? "half" : "full"}
        side="left"
        onClose={() => setShowLeft(false)}
        extraClasses="bg-white"
        selectedVersionId={leftSelectedVersionId}
        onVersionChange={setLeftSelectedVersionId}
      />

      {/* RIGHT PANEL */}
      {hasAlternatives && (
        <TextPanel
          title={chapter.title}
          originalParagraphs={chapter.paragraphs}
          alternatives={chapter.alternatives}
          defaultVersionId={rightSelectedVersionId}
          isVisible={showRight}
          widthMode={visiblePanels === 2 ? "half" : "full"}
          side="right"
          onClose={() => setShowRight(false)}
          diffAgainstText={leftText}
          showDiff={showDiff} // ⚡ controlled by TopBar
          extraClasses="bg-indigo-900/5 border-l border-indigo-900/10"
          selectedVersionId={rightSelectedVersionId}
          onVersionChange={setRightSelectedVersionId}
        />
      )}
    </main>
  );
}
