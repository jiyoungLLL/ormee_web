export type ProblemType = 'choice' | 'essay';

export type Problem = {
  id: string;
  description: string;
  type: ProblemType;
  item: string[];
  answer: string;
};

export type ProblemRequest = Omit<Problem, 'id'> | { context: string };

export type Quiz = {
  title: string;
  dueTime: string;
  limitTime: string;
  problems: Problem[];
};

export type QuizRequest = {
  title: string;
  description: string;
  created_time: string;
  due_time: string;
  problems: ProblemRequest[];
};
