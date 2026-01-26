import { useDispatch } from "react-redux";
import { closeBook } from "../features/bookSlice";
import { resetUI } from "./ui/uiSlice";

type TopBarProps = {
  showDiff: boolean;
  onToggleDiff: () => void;
};

export default function TopBar({ showDiff, onToggleDiff }: TopBarProps) {
  const dispatch = useDispatch();

  const goHome = () => {
    dispatch(resetUI());
    dispatch(closeBook());
  };

  return (
    <header className="h-14 px-6 flex items-center justify-between bg-[#F8F5F1] border-b border-indigo-900/10 shadow-md">
      <button
        onClick={goHome}
        className="text-indigo-900 font-medium hover:text-indigo-700 transition-colors"
      >
        ← Back to books
      </button>

      <button
        onClick={onToggleDiff}
        className="text-sm px-2 py-1 bg-indigo-100 rounded hover:bg-indigo-200 text-indigo-900"
      >
        {showDiff ? "Diff ON" : "Diff OFF"}
      </button>
    </header>
  );
}
