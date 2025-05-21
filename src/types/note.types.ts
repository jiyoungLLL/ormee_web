export type OpenNoteData = {
  noteKey: string;
  title: string;
  date: string;
  students?: number;
  data?: (string | number)[][];
};

export type ClosedNoteData = {
  noteKey: string;
  title: string;
  date: string;
  students: number;
  data: (string | number)[][];
};
