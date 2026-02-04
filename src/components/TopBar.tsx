import { useDispatch } from "react-redux";
import { closeBook } from "../features/bookSlice";
import { resetUI } from "./ui/uiSlice";
import { useNavigate } from "react-router-dom";
import SingleLeftArrow from "./SingleLeftArrow";

export default function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goHome = () => {
    dispatch(resetUI());
    dispatch(closeBook());
    navigate("/");
  };

  return (
    <header className="h-14 px-6 flex items-center justify-between bg-[#F8F5F1] border-b border-indigo-900/10 shadow-md ">
      <button onClick={goHome} className="flex items-center gap-0 group">
        <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-1 cursor-pointer">
          <SingleLeftArrow width={30} height={30} />
        </span>
        <span className="text-[#312c85] cursor-pointer">Back to books</span>
      </button>
    </header>
  );
}
