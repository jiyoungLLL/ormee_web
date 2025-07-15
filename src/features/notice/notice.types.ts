// 공지 생성
export type PostNotice = {
  title: string;
  description: string;
  fileIds: number[];
  isDraft: boolean;
};

// 고정 공지 목록
export type NoticeItems = {
  id: number;
  author: string;
  title: string;
  postDate: string;
  isPinned: boolean;
  likes: number;
};

// 공지 목록
export type NoticeList = {
  content: NoticeItems[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
};

export type NoticeDetail = {
  title: string;
  description: string;
  fileNames: string[] | null;
  filePaths: string[] | null;
  postDate: string;
  isPinned: boolean;
  likes: number;
};

export type NoticeDraft = {
  id: number;
  title: string;
  postDate: string;
  isPinned: boolean;
};
