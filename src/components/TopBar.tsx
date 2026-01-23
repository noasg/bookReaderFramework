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
    <header
      style={{
        padding: "8px 16px",
        borderBottom: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
      }}
    >
      <button onClick={goHome}>← Back to books</button>
    </header>
  );
}
