import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { toggleTextMode } from "./ui/uiSlice";

export default function Footer() {
  const dispatch = useDispatch();
  const textMode = useSelector((state: RootState) => state.ui.textMode);

  return (
    <footer className="w-full py-4 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between px-6">
      {/* Left: disclaimer */}
      <div className="text-sm text-gray-600 text-center md:text-left">
        © Copyright 2026 | Institutul de Istorie și Teorie Literară „G.
        Călinescu” | All Rights Reserved
      </div>

      {/* Right: toggle button */}
      <div className="mt-2 md:mt-0">
        <button
          onClick={() => dispatch(toggleTextMode())}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold text-[#312c85] 
                     bg-indigo-100 hover:bg-indigo-200 transition shadow-sm"
        >
          {textMode === "alternatives"
            ? "Text fara comentarii"
            : "Text cu comentarii"}
        </button>
      </div>
    </footer>
  );
}
