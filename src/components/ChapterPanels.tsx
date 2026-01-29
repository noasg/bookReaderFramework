import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Chapter, Comments } from "../types/types";
import TextPanel from "./TextPanel";

type ChapterPanelsProps = {
  chapter: Chapter;
  showDiff: boolean;
  comments: Comments[];
};

export default function ChapterPanels({
  chapter,
  showDiff,
  comments,
}: ChapterPanelsProps) {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();

  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  const [leftSelectedVersionId, setLeftSelectedVersionId] =
    useState("original");
  const [rightSelectedVersionId, setRightSelectedVersionId] = useState(
    chapter.alternatives?.[0]?.id ?? "original",
  );

  const hasAlternatives = !!chapter.alternatives?.length;
  const visiblePanels = Number(showLeft) + Number(showRight && hasAlternatives);

  // ✅ Update URL when all panels are closed
  useEffect(() => {
    if (!showLeft && (!hasAlternatives || !showRight)) {
      // Navigate back to book URL without chapter
      if (bookId) navigate(`/${bookId}`, { replace: true });
    }
  }, [showLeft, showRight, hasAlternatives, navigate, bookId]);

  // Left panel text for diff
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
        comments={comments}
        chapterId={chapter.id}
        hasCloseButton={false}
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
          showDiff={showDiff}
          extraClasses="bg-indigo-100 border-l border-indigo-900/10"
          selectedVersionId={rightSelectedVersionId}
          onVersionChange={setRightSelectedVersionId}
          comments={comments}
          chapterId={chapter.id}
        />
      )}
    </main>
  );
}
