import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Chapter, Comments } from "../types/types";
import TextPanel from "./TextPanel";

type ChapterPanelsProps = {
  chapter: Chapter;
  comments: Comments[];
};

export default function ChapterPanels({
  chapter,
  comments,
}: ChapterPanelsProps) {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();

  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  // ✅ Always use first alternative as left panel
  const [leftSelectedVersionId, setLeftSelectedVersionId] = useState(
    (chapter.alternatives ?? [])[0]?.id,
  );

  // Right panel defaults to second alternative if it exists, otherwise fallback to first
  const [rightSelectedVersionId, setRightSelectedVersionId] = useState(
    (chapter.alternatives ?? [])[1]?.id ?? (chapter.alternatives ?? [])[0]?.id,
  );

  const hasAlternatives = (chapter.alternatives ?? []).length > 1; // need at least two versions for right panel
  const visiblePanels = Number(showLeft) + Number(showRight && hasAlternatives);

  // Navigate back when all panels are closed
  useEffect(() => {
    if (!showLeft && (!hasAlternatives || !showRight)) {
      if (bookId) navigate(`/${bookId}`, { replace: true });
    }
  }, [showLeft, showRight, hasAlternatives, navigate, bookId]);

  // Left panel text for diff
  const leftVersionText = useMemo(() => {
    const leftVersion = chapter.alternatives?.find(
      (a) => a.id === leftSelectedVersionId,
    );
    return leftVersion?.paragraphs.map((p) => p.text).join("\n") ?? "";
  }, [leftSelectedVersionId, chapter.alternatives]);

  return (
    <main className="flex-1 flex overflow-hidden border-l border-indigo-900/10">
      {/* LEFT PANEL */}
      <TextPanel
        title={chapter.title}
        alternatives={chapter.alternatives ?? []}
        defaultVersionId={leftSelectedVersionId}
        selectedVersionId={leftSelectedVersionId}
        onVersionChange={setLeftSelectedVersionId}
        isVisible={showLeft}
        widthMode={visiblePanels === 2 ? "half" : "full"}
        side="left"
        onClose={() => setShowLeft(false)}
        extraClasses="bg-white"
        comments={comments}
        chapterId={chapter.id}
        hasCloseButton={false}
      />

      {/* RIGHT PANEL */}
      {hasAlternatives && (
        <TextPanel
          title={chapter.title}
          alternatives={chapter.alternatives ?? []}
          defaultVersionId={rightSelectedVersionId}
          selectedVersionId={rightSelectedVersionId}
          onVersionChange={setRightSelectedVersionId}
          isVisible={showRight}
          widthMode={visiblePanels === 2 ? "half" : "full"}
          side="right"
          onClose={() => setShowRight(false)}
          diffAgainstText={leftVersionText}
          extraClasses="bg-white border-l border-indigo-900/10"
          comments={comments}
          chapterId={chapter.id}
        />
      )}
    </main>
  );
}
