// 과제 생성
export type PostHomeWork = {
  title: string;
  description: string;
  files: string | string[];
  isDraft: boolean;
  openTime: string;
  dueTime: string;
};

// 과제 리스트 (GET)
export type Assignment = {
  id: number;
  title: string | null;
  description: string | null;
  filePaths: string | string[] | null;
  openTime: string | null;
  dueTime: string | null;
};

export type AssignmentsData = {
  openedAssignments: Assignment[];
  closedAssignments: Assignment[];
};

export type AssignmentsResponse = {
  status: string;
  code: number;
  data: AssignmentsData;
};
