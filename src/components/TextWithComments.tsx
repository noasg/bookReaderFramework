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

  // All comments for this paragraph
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

        // Get all comments covering this commentId
        const popupComments = paragraphComments.filter(
          (c) => c.id === part.commentId,
        );
        const isActive = activeCommentId === part.commentId;
        // console.log(
        //   "Rendering part:",
        //   part.text,
        //   "with commentId:",
        //   part.commentId,
        // );
        return (
          <span key={i} className="relative">
            <span
              className={`bg-yellow-200 rounded px-0.5 cursor-pointer ${
                isActive ? "bg-yellow-300" : ""
              }`}
              onClick={() =>
                setActiveCommentId(isActive ? null : part.commentId || null)
              }
              dangerouslySetInnerHTML={{ __html: part.text }}
            />
            {isActive && (
              <>
                {console.log(
                  "Popup displayed for commentId:",
                  part.commentId,
                  "Popup content:",
                  popupComments.map((c) => c.content),
                )}

                <div className="absolute z-50 top-full left-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-indigo-900/10 p-3 text-lg">
                  <div className="space-y-2">
                    {popupComments.map((c) => (
                      <div key={c.id}>
                        <div className="font-semibold text-indigo-900">
                          {c.author}
                        </div>
                        <div className="text-indigo-900/80">
                          <div
                            dangerouslySetInnerHTML={{ __html: c.content }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}
