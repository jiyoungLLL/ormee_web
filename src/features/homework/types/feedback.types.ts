export type SubmitDetail = {
  name: string;
  content: string;
  filePaths: string[] | null;
  createdAt: string;
};

type StickerType = 'EXCELLENT' | 'GOOD' | 'OK' | 'FIGHTING' | 'IMPROVE';

export type FeedbackList = {
  id: number;
  stamp: StickerType;
  content: string;
  createdAt: string;
};
