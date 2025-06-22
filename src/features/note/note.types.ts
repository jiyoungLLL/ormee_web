export type GetNoteItem = {
  openMemos: NoteItems[];
  closeMemos: NoteItems[];
};

export type NoteItems = {
  id: number;
  title: string;
  description: string;
  dueTime: string;
  isOpen: boolean;
  submitCount: number;
  totalCount: number;
};

export type NoteStatsItem = {
  rank: number;
  contentDetail: number;
  submitRate: number;
  submit: number;
};

export type NoteStatsResponse = {
  status: string;
  code: number;
  data: NoteStatsItem[];
};

export type PostNote = {
  title: string;
};
