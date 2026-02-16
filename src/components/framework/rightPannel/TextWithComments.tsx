import { useState, useEffect, useRef } from "react";
import type { Paragraph, Comments } from "../../../types/types";
import CommentPopup from "../popUp/CommentPopUp";
import { parseParagraph } from "../../utils/parseParagraph";

type TextWithCommentsProps = {
  paragraph: Paragraph;
  chapterId: string;
  versionId: string;
  comments: Comments[];
};

export default function TextWithComments({
  paragraph,
  chapterId,
  versionId,
  comments,
}: TextWithCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [panelRect, setPanelRect] = useState<DOMRect | null>(null);

  // Close popup on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveCommentId(null);
        setAnchorRect(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // find parent panel + measure it
  useEffect(() => {
    if (containerRef.current) {
      const panel = containerRef.current.closest(
        "[data-text-panel]",
      ) as HTMLDivElement | null;

      if (panel) {
        panelRef.current = panel;
        setPanelRect(panel.getBoundingClientRect());
      }
    }
  }, []);

  const paragraphComments = comments.filter(
    (c) =>
      c.chapterId === chapterId &&
      c.version === versionId &&
      c.paragraphId === paragraph.id &&
      c.scope === "word",
  );

  const parts = parseParagraph(paragraph);

  return (
    <div
      ref={containerRef}
      className="relative mb-4 text-black leading-7 text-xl"
    >
      {parts.map((part, i) => {
        if (!part.commentId) {
          return (
            <span key={i} dangerouslySetInnerHTML={{ __html: part.text }} />
          );
        }

        const popupComments = paragraphComments.filter(
          (c) => c.id === part.commentId,
        );
        const isActive = activeCommentId === part.commentId;

        return (
          <span key={i} className="relative">
            <span
              className={`bg-yellow-200 rounded cursor-pointer ${
                isActive ? "bg-yellow-300" : ""
              }`}
              onClick={(e) => {
                if (isActive) {
                  setActiveCommentId(null);
                  setAnchorRect(null);
                } else {
                  const rect = (
                    e.currentTarget as HTMLElement
                  ).getBoundingClientRect();
                  setActiveCommentId(part.commentId || null);
                  setAnchorRect(rect);
                }
              }}
              dangerouslySetInnerHTML={{ __html: part.text }}
            />

            {/* PORTAL POPUP */}
            {isActive && anchorRect && panelRect && (
              <CommentPopup
                anchorRect={anchorRect}
                panelRect={panelRect}
                comments={popupComments}
                onClose={() => {
                  setActiveCommentId(null);
                  setAnchorRect(null);
                }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
