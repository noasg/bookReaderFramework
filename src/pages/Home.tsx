import { useDispatch } from "react-redux";
import { resetUI } from "../components/ui/uiSlice";
import { openBook } from "../features/bookSlice";

export default function Home() {
  const dispatch = useDispatch();

  const open = (bookId: string) => {
    dispatch(resetUI());
    dispatch(openBook(bookId));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Select a book</h1>

      <button onClick={() => open("book-1")}>Open Book 1</button>

      <br />
      <br />

      <button onClick={() => open("book-2")}>Open Book 2</button>
    </div>
  );
}
