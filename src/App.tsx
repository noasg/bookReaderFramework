import { useSelector } from "react-redux";
import "../global.css";
import BookSidebar from "./components/BookSidebar";
import Home from "./pages/Home";
import type { RootState } from "../store";
import TopBar from "./components/TopBar";
import RightPanel from "./components/RightPanel";

export default function App() {
  const activeBookId = useSelector(
    (state: RootState) => state.book.activeBookId,
  );

  if (!activeBookId) {
    return <Home />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />

      <div style={{ display: "flex", flex: 1 }}>
        <BookSidebar />
        <RightPanel />
      </div>
    </div>
  );
}
