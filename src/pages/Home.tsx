import { useDispatch } from "react-redux";
import { resetUI } from "../components/ui/uiSlice";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import BookTile from "../components/BookTile";
// import IntermediatePopUp from "../components/IntermediatePopUp";
import books from "../data/books.json";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [selectedBook, setSelectedBook] = useState<any>(null);
  // const [popupOpen, setPopupOpen] = useState(false);

  // const open = (bookId: string) => {
  //   const book = books.find((b) => b.id === bookId);
  //   if (!book) return;

  //   setSelectedBook(book);
  //   setPopupOpen(true);
  // };

  const goToBook = (bookId: string) => {
    // if (!selectedBook) return;

    dispatch(resetUI());
    navigate(`/${bookId}`);
    console.log(`home.tsx ->> Navigating to book: ${bookId}`);
  };

  // const goToBook = () => {
  //   // if (!selectedBook) return;

  //   dispatch(resetUI());
  //   navigate(`/${selectedBook.id}`);
  //   console.log(`home.tsx ->> Navigating to book: ${selectedBook.id}`);
  // };

  return (
    <div className="min-h-screen bg-[#F8F5F1] flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-semibold text-indigo-900 mb-10">
        Citeste o carte
      </h1>

      <div className="mb-16">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-8
            place-items-center
          "
        >
          {/* test */}
          {/* {books.map((book) => (
            <BookTile
              key={book.id}
              id={book.id}
              title={book.title}
              image={book.image}
              onOpen={() => goToBook(book.id)} // ⬅️ now opens popup
              // onOpen={open} // ⬅️ now opens popup
            />
          ))} */}
        </div>
      </div>

      <p className="text-center max-w-xl text-indigo-900/70 italic">
        Main platform that is to be developed, part II of the roadmap
      </p>

      {/* ================= POPUP ================= */}
      {/* {selectedBook && (
        <IntermediatePopUp
          isOpen={popupOpen}
          title={selectedBook.title}
          image={selectedBook.image}
          description={selectedBook.description}
          onClose={() => setPopupOpen(false)}
          onGoToBook={goToBook}
        />
      )} */}
    </div>
  );
}
