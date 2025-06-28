// 과제 생성
export type PostHomeWork = {
  title: string;
  description: string;
  files: FileList | File[];
  isDraft: boolean;
  openTime: string;
  dueTime: string;
};

// 과제 리스트 (GET)
export type HomeworkItems = {
  id: number;
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
