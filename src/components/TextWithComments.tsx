import { useState, useRef, useEffect } from "react";
import type { Paragraph, Comments } from "../types/types";

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
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const words = paragraph.text.split(" ");

  type Block = {
    text: string;
    commentIds: string[];
    startIdx: number;
    endIdx: number;
  };

  const blocks: Block[] = [];
  let idx = 0;

  while (idx < words.length) {
    const coveringComment = paragraphComments.find(
      (c) => c.anchor && idx >= c.anchor.startWord && idx <= c.anchor.endWord,
    );

    if (coveringComment && coveringComment.anchor) {
      const start = coveringComment.anchor.startWord;
      const end = coveringComment.anchor.endWord;
      const text = words.slice(start, end + 1).join(" ");
      blocks.push({
        text,
        commentIds: paragraphComments
          .filter(
            (c) =>
              c.anchor &&
              !(c.anchor.endWord < start || c.anchor.startWord > end),
          )
          .map((c) => c.id),
        startIdx: start,
        endIdx: end,
      });
      idx = end + 1;
    } else {
      blocks.push({
        text: words[idx],
        commentIds: [],
        startIdx: idx,
        endIdx: idx,
      });
      idx++;
    }
  }

  return (
    <div ref={containerRef} className="relative mb-4 text-indigo-900 leading-7">
      {blocks.map((block, i) => {
        if (block.commentIds.length === 0)
          return <span key={i}>{block.text} </span>;

        const isActive = activeCommentId === block.commentIds[0];
        const popupComments = paragraphComments.filter((c) =>
          block.commentIds.includes(c.id),
        );

        return (
          <span key={i} className="relative ">
            <span
              className={`bg-yellow-200 rounded px-0.5 cursor-pointer ${
                isActive ? "bg-yellow-300" : ""
              }`}
              onClick={() =>
                setActiveCommentId(isActive ? null : block.commentIds[0])
              }
            >
              {block.text}{" "}
            </span>

            {isActive && (
              <div className="absolute z-50 top-full left-0 mt-2 w-64 rounded-lg bg-white shadow-lg border border-indigo-900/10 p-3 text-sm">
                <div className="space-y-2">
                  {popupComments.map((c) => (
                    <div key={c.id}>
                      <div className="font-semibold text-indigo-900">
                        {c.author}
                      </div>
                      <div className="text-indigo-900/80">{c.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </span>
        );
      })}
    </div>
  );
}
