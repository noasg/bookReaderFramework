import { useState, useEffect, useRef } from "react";
import type { Paragraph, Comments } from "../types/types";

type TextWithCommentsProps = {
  paragraph: Paragraph;
  chapterId: string;
  versionId: string;
  comments: Comments[];
};

// Helper: parse paragraph text into parts with commentId
function parseParagraph(paragraph: Paragraph) {
  const parts: { text: string; commentId?: string }[] = [];
  const commentRegex = /<comment id=['"]([^'"]+)['"]>(.*?)<\/comment>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = commentRegex.exec(paragraph.text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: paragraph.text.slice(lastIndex, match.index) });
    }
    parts.push({ text: match[2], commentId: match[1] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < paragraph.text.length) {
    parts.push({ text: paragraph.text.slice(lastIndex) });
  }

  return parts;
}

export default function TextWithComments({
  paragraph,
  chapterId,
  versionId,
  comments,
}: TextWithCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  // Close popup on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setActiveCommentId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
              className={`bg-yellow-200 rounded px-0.5 cursor-pointer ${isActive ? "bg-yellow-300" : ""}`}
              onClick={() =>
                setActiveCommentId(isActive ? null : part.commentId || null)
              }
              dangerouslySetInnerHTML={{ __html: part.text }}
            />

            {isActive && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 mt-2 rounded-lg bg-white shadow-lg border border-indigo-900/10 p-3 text-lg whitespace-pre-wrap"
                style={{
                  minWidth: "200px",
                  maxWidth: "90%",
                  textAlign: "center",
                  zIndex: 10,
                }}
              >
                {popupComments.map((c) => (
                  <div key={c.id} className="mb-2">
                    <div className="font-semibold text-indigo-900">
                      {c.author}
                    </div>
                    <div
                      className="text-indigo-900/80"
                      dangerouslySetInnerHTML={{ __html: c.content }}
                    />
                  </div>
                ))}
              </div>
            )}
          </span>
        );
      })}
    </div>
  );
}
