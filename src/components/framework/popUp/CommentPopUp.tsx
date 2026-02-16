import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Comments } from "../../../types/types";

type CommentPopupProps = {
  anchorRect: DOMRect | null;
  panelRect: DOMRect | null;
  comments: Comments[];
  onClose: () => void;
};

export default function CommentPopup({
  anchorRect,
  panelRect,
  comments,
  onClose,
}: CommentPopupProps) {
  // ✅ hooks always first
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // ✅ early return AFTER hooks
  if (!anchorRect || !panelRect) return null;

  // center inside the panel (NOT screen)
  const panelCenterX = panelRect.left + panelRect.width / 2;
  const top = anchorRect.bottom + 8;
  const left = panelCenterX;

  return createPortal(
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
        }}
      />

      {/* popup */}
      <div
        style={{
          position: "fixed",
          top,
          left,
          transform: "translateX(-50%)",
          minWidth: "260px",
          maxWidth: panelRect.width * 0.9,
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          border: "1px solid rgba(49,44,133,0.1)",
          padding: "12px",
          zIndex: 9999,
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {comments.map((c) => (
          <div key={c.id} style={{ marginBottom: "10px" }}>
            <div style={{ fontWeight: 600, color: "#312c85" }}>{c.author}</div>
            <div
              style={{ color: "rgba(49,44,133,0.8)" }}
              dangerouslySetInnerHTML={{ __html: c.content }}
            />
          </div>
        ))}
      </div>
    </>,
    document.getElementById("portal-root")!,
  );
}
