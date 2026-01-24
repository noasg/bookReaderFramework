import { useDispatch } from "react-redux";
import { resetUI } from "../components/ui/uiSlice";
import { openBook } from "../features/bookSlice";
import Button from "../components/ui/Button";

export default function Home() {
  const dispatch = useDispatch();

  const open = (bookId: string) => {
    dispatch(resetUI());
    dispatch(openBook(bookId));
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-semibold text-indigo-900 mb-10">
        Select a book
      </h1>

      <div className="flex flex-col gap-6 mb-16">
        <Button variant="primary" onClick={() => open("book-1")}>
          Open Book 1
        </Button>
        <Button variant="primary" onClick={() => open("book-2")}>
          Open Book 2
        </Button>
      </div>

      <p className="text-center max-w-xl text-indigo-900/70 italic">
        Main platform that is to be developed, part II of the roadmap
      </p>
    </div>
  );
}
