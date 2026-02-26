import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../framework/main/TopBar";
import BookSidebar from "../framework/main/BookSidebar";
import RightPanel from "../framework/main/RightPanel";
import { openBook } from "../../features/bookSlice";
import { openChapter } from "../ui/uiSlice";
import { type RootState } from "../../../store";
import Footer from "../framework/main/Footer";
import NotFound from "./NotFound";

export default function BookPage() {
  const { bookId, chapterId } = useParams<{
    bookId: string;
    chapterId?: string;
  }>();

  const dispatch = useDispatch();

  const books = useSelector((state: RootState) => state.book.books);
  const activeBookId = useSelector(
    (state: RootState) => state.book.activeBookId,
  );
  const activeChapterId = useSelector(
    (state: RootState) => state.ui.openChapterId,
  );

  const bookExists = bookId && books[bookId];
  const chapterExists =
    chapterId &&
    bookExists &&
    books[bookId].chapters.some((c) => c.id === chapterId);

  // ✅ Hooks must run before any return
  useEffect(() => {
    if (!bookExists) return;

    if (bookId && bookId !== activeBookId) {
      dispatch(openBook(bookId));

      const bookFromStore = books[bookId];

      if (bookFromStore?.chapters?.length && !chapterId) {
        dispatch(openChapter(bookFromStore.chapters[0].id));
      }
    }

    if (chapterId && chapterId !== activeChapterId) {
      dispatch(openChapter(chapterId));
    }
  }, [
    bookId,
    chapterId,
    activeBookId,
    activeChapterId,
    books,
    bookExists,
    dispatch,
  ]);

  // ✅ Now safe to return conditionally
  if (!bookExists) {
    return <NotFound />;
  }

  if (chapterId && !chapterExists) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-y-auto">
          <BookSidebar bookId={bookId!} />
          <RightPanel />
        </div>
      </div>

      <Footer />
    </div>
  );
}
