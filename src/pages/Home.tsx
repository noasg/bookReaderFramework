import { useDispatch } from "react-redux";
import { resetUI } from "../components/ui/uiSlice";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = (bookId: string) => {
    dispatch(resetUI());
    navigate(`/${bookId}`); // ✅ navigate
    console.log(`home.tsx ->> Navigating to book: ${bookId}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F1] flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-semibold text-indigo-900 mb-10">
        Select a book
      </h1>

      <div className="flex flex-col gap-6 mb-16">
        <Button variant="primary" onClick={() => open("book1")}>
          Open Book 1
        </Button>
        <Button variant="primary" onClick={() => open("book2")}>
          Open Book 2
        </Button>
      </div>

      <p className="text-center max-w-xl text-indigo-900/70 italic">
        Main platform that is to be developed, part II of the roadmap
      </p>
    </div>
  );
}
