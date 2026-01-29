import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../TopBar";
import BookSidebar from "../BookSidebar";
import RightPanel from "../RightPanel";
import { openBook } from "../../features/bookSlice";
import { openChapter } from "../ui/uiSlice";
import { store, type RootState } from "../../../store";

export default function BookPage() {
  const { bookId, chapterId } = useParams<{
    bookId: string;
    chapterId?: string;
  }>();
  const dispatch = useDispatch();

  // ✅ Get only activeBookId from Redux
  const activeBookId = useSelector(
    (state: RootState) => state.book.activeBookId,
  );
  const activeChapterId = useSelector(
    (state: RootState) => state.ui.openChapterId,
  );

  const [showDiff, setShowDiff] = useState(false);

  // Sync URL → Redux
  useEffect(() => {
    if (bookId && bookId !== activeBookId) {
      dispatch(openBook(bookId));

      // ✅ auto-select first chapter if none
      const bookFromStore = store.getState().book.books[bookId];
      if (bookFromStore?.chapters?.length && !activeChapterId) {
        dispatch(openChapter(bookFromStore.chapters[0].id));
      }
    }
    if (chapterId && chapterId !== activeChapterId) {
      dispatch(openChapter(chapterId));
    }
  }, [bookId, chapterId, activeBookId, activeChapterId, dispatch]);

  // Wait until Redux knows the book
  if (!activeBookId) return null;

  console.log("");

  return (
    <div className="flex flex-col h-screen">
      <TopBar showDiff={showDiff} onToggleDiff={() => setShowDiff(!showDiff)} />
      <div className="flex flex-1">
        {/* Pass activeBookId to sidebar */}
        <BookSidebar bookId={activeBookId} />
        <RightPanel showDiff={showDiff} />
      </div>
    </div>
  );
}
