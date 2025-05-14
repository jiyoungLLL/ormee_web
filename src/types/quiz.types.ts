export type ProblemType = 'choice' | 'essay';

export type Problem = {
  context: string;
  type: ProblemType;
  item: string[];
  answer: string;
};

export type Quiz = {
  title: string;
  description: string;
  createdTime: string;
  dueTime: string;
  problems: Problem[];
};

export type QuizRequest = {
  title: string;
  description: string;
  created_time: string;
  due_time: string;
  problems: Problem[];
};
