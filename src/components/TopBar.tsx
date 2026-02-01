import { useDispatch } from "react-redux";
import { closeBook } from "../features/bookSlice";
import { resetUI } from "./ui/uiSlice";
import { useNavigate } from "react-router-dom";
import SingleLeftArrow from "./SingleLeftArrow";

type TopBarProps = {
  showDiff: boolean;
  onToggleDiff: () => void;
};

export default function TopBar({ showDiff, onToggleDiff }: TopBarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ add navigate

  const goHome = () => {
    dispatch(resetUI());
    dispatch(closeBook());
    navigate("/"); // ✅ route back to Home
  };

  return (
    <header className="h-14 px-6 flex items-center justify-between bg-[#F8F5F1] border-b border-indigo-900/10 shadow-md ">
      <button onClick={goHome} className="flex items-center gap-0 group">
        {/* Arrow slides in from right and fades in */}
        <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-1">
          <SingleLeftArrow width={30} height={30} />
        </span>

        <span className="text-[#312c85] cursor-pointer">Back to books</span>
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
