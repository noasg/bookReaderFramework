import { useDispatch } from "react-redux";
import { closeBook } from "../features/bookSlice";
import { resetUI } from "./ui/uiSlice";

export default function TopBar() {
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(resetUI());
    dispatch(closeBook());
  };

  return (
    <header className="h-14 px-6 flex items-center bg-[#F8F5F1] border-b border-indigo-900/10 shadow-md">
      <button
        onClick={goHome}
        className="text-indigo-900 font-medium hover:text-indigo-700 transition-colors"
      >
        ← Back to books
      </button>
    </header>
  );
}
