// 과제 생성
export type PostHomeWork = {
  title: string;
  description: string;
  fileIds: number[];
  isDraft: boolean;
  openTime: string;
  dueTime: string;
};

// 과제 임시저장
export type DraftHomework = {
  title: string;
  description?: string;
  fileIds?: number[];
  isDraft: boolean;
  openTime: string;
  dueTime?: string;
};

// 과제 리스트 (GET)
export type HomeworkItems = {
  id: number;
  author: string;
  title: string | null;
  description: string | null;
  filePaths?: string[] | null;
  fileNames?: string[] | null;
  feedbackCompleted: boolean;
  openTime: string | null;
  dueTime: string | null;
};

export type HomeworkData = {
  openedHomeworks: HomeworkItems[];
  closedHomeworks: HomeworkItems[];
};

export type AssignmentsResponse = {
  status: string;
  code: number;
  data: HomeworkData;
};

export type StudentHomework = {
  homeworkSubmitId: number;
  studentName: string;
  isSubmitted: boolean;
  isChecked: boolean;
  isFeedback: boolean;
  createdAt: string;
};
