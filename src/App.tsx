import { useSelector } from "react-redux";
import type { RootState } from "../store";
import "../global.css";
import BookSidebar from "./components/BookSidebar";
import Home from "./pages/Home";
import TopBar from "./components/TopBar";
import RightPanel from "./components/RightPanel";
import { useState } from "react";

export default function App() {
  const activeBookId = useSelector(
    (state: RootState) => state.book.activeBookId,
  );

  // Global Diff toggle
  const [showDiff, setShowDiff] = useState(true);

  if (!activeBookId) return <Home />;

  return (
    <div className="flex flex-col h-screen">
      {/* TopBar with Diff toggle */}
      <TopBar showDiff={showDiff} onToggleDiff={() => setShowDiff(!showDiff)} />

      <div className="flex flex-1">
        <BookSidebar />
        <RightPanel showDiff={showDiff} />
      </div>
    </div>
  );
}
