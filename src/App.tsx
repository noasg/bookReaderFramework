import "../global.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import BookPage from "./components/pages/BookPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:bookId" element={<BookPage />} />
      <Route path="/:bookId/:chapterId" element={<BookPage />} />{" "}
    </Routes>
  );
}
