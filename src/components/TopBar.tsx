import { useDispatch } from "react-redux";
import { closeBook } from "../features/bookSlice";
import { resetUI } from "./ui/uiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SingleLeftArrow from "./SingleLeftArrow";
import InfoPopUp from "./InfoPopUp";

export default function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [infoOpen, setInfoOpen] = useState(false);

  const goHome = () => {
    dispatch(resetUI());
    dispatch(closeBook());
    navigate("/");
  };

  return (
    <>
      <header className="h-14 px-6 flex items-center justify-between bg-[#F8F5F1] border-b border-indigo-900/10 shadow-md">
        {/* Left */}
        <button onClick={goHome} className="flex items-center gap-0 group">
          <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-1 cursor-pointer">
            <SingleLeftArrow width={30} height={30} />
          </span>
          <span className="text-[#312c85] cursor-pointer">Back to books</span>
        </button>

        {/* Right */}
        <button
          onClick={() => setInfoOpen(true)}
          className="px-3 py-1.5 rounded-lg text-sm font-semibold text-[#312c85] 
                     bg-indigo-100 hover:bg-indigo-200 transition shadow-sm"
        >
          Informatii
        </button>
      </header>

      {/* Info Popup */}
      <InfoPopUp isOpen={infoOpen} onClose={() => setInfoOpen(false)} />
    </>
  );
}
