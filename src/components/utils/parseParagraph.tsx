import type { Paragraph, ParsedPart } from "../../types/types";

// Normalize text to a single string
function normalizeText(text: string | string[]): string {
  return Array.isArray(text) ? text.join("") : text;
}

export function parseParagraph(paragraph: Paragraph): ParsedPart[] {
  const rawText = normalizeText(paragraph.text);

  const parts: ParsedPart[] = [];
  const commentRegex = /<comment id=['"]([^'"]+)['"]>(.*?)<\/comment>/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = commentRegex.exec(rawText)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: rawText.slice(lastIndex, match.index),
      });
    }

    parts.push({
      text: match[2],
      commentId: match[1],
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < rawText.length) {
    parts.push({
      text: rawText.slice(lastIndex),
    });
  }

  return parts;
}
