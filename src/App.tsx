import "../global.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import BookPage from "./components/pages/BookPage";
import NotFound from "./components/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:bookId" element={<BookPage />} />
      <Route path="/:bookId/:chapterId" element={<BookPage />} />{" "}
      {/* 404 route - MUST be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
