export interface Paragraph {
  id: string;
  text: string;
}

export interface Chapter {
  id: string;
  title: string;
  paragraphs: Paragraph[];
  alternatives?: ChapterAlternative[]; // ✅ NEW
}

export interface Book {
  id: string;
  title: string;
  chapters: Chapter[];
}

export interface ChapterAlternative {
  id: string;
  label: string;
  paragraphs: Paragraph[];
}

export type CommentScope = "word" | "paragraph" | "chapter";

export interface Comments {
  id: string;
  scope: CommentScope;
  chapterId: string;
  version: string;
  paragraphId?: string;
  anchor?: {
    startWord: number;
    endWord: number;
    selectedText?: string;
  };
  author: string;
  content: string;
  createdAt: string;
}
