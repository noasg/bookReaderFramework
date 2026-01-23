export interface Paragraph {
  id: string;
  text: string;
}

export interface Chapter {
  id: string;
  title: string;
  paragraphs: Paragraph[];
}

export interface Book {
  id: string;
  title: string;
  chapters: Chapter[];
}
