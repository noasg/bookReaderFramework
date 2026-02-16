import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../framework/main/TopBar";
import BookSidebar from "../framework/main/BookSidebar";
import RightPanel from "../framework/main/RightPanel";
import { openBook } from "../../features/bookSlice";
import { openChapter } from "../ui/uiSlice";
import { store, type RootState } from "../../../store";
import Footer from "../framework/main/Footer";

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

  // Sync URL → Redux
  useEffect(() => {
    if (bookId && bookId !== activeBookId) {
      dispatch(openBook(bookId));

      // ✅ auto-select first chapter if none
      const bookFromStore = store.getState().book.books[bookId];

      console.log("BookPage useEffect - bookFromStore:", bookFromStore);
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

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top */}
      <TopBar />

      {/* Middle scrollable area ONLY */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-y-auto">
          <BookSidebar bookId={activeBookId} />
          <RightPanel />
        </div>
      </div>

      {/* Footer - ALWAYS visible */}
      <Footer />
    </div>
  );
}
