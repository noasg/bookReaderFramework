import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { Chapter, ChapterNote, Comments } from "../../../types/types";
import TextPanel from "./TextPanel";
import type { RootState } from "../../../../store";

type ChapterPanelsProps = {
  chapter: Chapter;
  comments: Comments[];
  chapterNotes: ChapterNote[];
};

export default function ChapterPanels({
  chapter,
  comments,
  chapterNotes = [],
}: ChapterPanelsProps) {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();

  // ✅ Get global text mode from Redux
  const textMode = useSelector((state: RootState) => state.ui.textMode);

  // Determine which source to use based on textMode
  const sourceTexts = useMemo(() => {
    return textMode === "clearText"
      ? (chapter.clearText ?? [])
      : (chapter.alternatives ?? []);
  }, [textMode, chapter]);

  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  // Always use first source as left panel
  const [leftSelectedVersionId, setLeftSelectedVersionId] = useState(
    sourceTexts[0]?.id,
  );

  // Right panel defaults to second source if it exists, otherwise fallback to first
  const [rightSelectedVersionId, setRightSelectedVersionId] = useState(
    sourceTexts[1]?.id ?? sourceTexts[0]?.id,
  );

  const hasAlternatives = sourceTexts.length > 1;
  const visiblePanels = Number(showLeft) + Number(showRight && hasAlternatives);

  // Navigate back when all panels are closed
  useEffect(() => {
    if (!showLeft && (!hasAlternatives || !showRight)) {
      if (bookId) navigate(`/${bookId}`, { replace: true });
    }
  }, [showLeft, showRight, hasAlternatives, navigate, bookId]);

  // ✅ Only reset selected IDs if current selection no longer exists
  useEffect(() => {
    // Compute new IDs
    const newLeftId =
      sourceTexts.find((v) => v.id === leftSelectedVersionId)?.id ??
      sourceTexts[0]?.id;
    const newRightId =
      sourceTexts.find((v) => v.id === rightSelectedVersionId)?.id ??
      sourceTexts[1]?.id ??
      sourceTexts[0]?.id;

    // Only update if different
    if (newLeftId !== leftSelectedVersionId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLeftSelectedVersionId(newLeftId);
    }
    if (newRightId !== rightSelectedVersionId) {
      setRightSelectedVersionId(newRightId);
    }
  }, [sourceTexts, leftSelectedVersionId, rightSelectedVersionId]);

  console.log("ChapterPanels render", {
    textMode,
    sourceTexts,
    leftSelectedVersionId,
    rightSelectedVersionId,
  });

  return (
    <main className="flex-1 flex flex-col lg:flex-row overflow-y-auto border-l border-indigo-900/10">
      {/* LEFT PANEL */}
      <TextPanel
        title={chapter.title}
        alternatives={sourceTexts}
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
        chapterNotes={chapterNotes}
      />

      {/* RIGHT PANEL */}
      {hasAlternatives && (
        <TextPanel
          title={chapter.title}
          alternatives={sourceTexts}
          defaultVersionId={rightSelectedVersionId}
          selectedVersionId={rightSelectedVersionId}
          onVersionChange={setRightSelectedVersionId}
          isVisible={showRight}
          widthMode={visiblePanels === 2 ? "half" : "full"}
          side="right"
          onClose={() => setShowRight(false)}
          extraClasses="
  bg-white
  border-t border-indigo-900/20 shadow-md
  lg:border-t-0 lg:shadow-none
  lg:border-l lg:border-indigo-900/10
"
          comments={comments}
          chapterId={chapter.id}
          chapterNotes={chapterNotes}
          hasCloseButton={false}
        />
      )}
    </main>
  );
}
