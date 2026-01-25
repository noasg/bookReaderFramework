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
