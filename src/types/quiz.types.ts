export type ProblemType = 'choice' | 'essay';

export type Problem = {
  context: string;
  description: string;
  type: ProblemType;
  item: { text: string }[];
  answer: string;
};

export type Quiz = {
  title: string;
  description: string;
  dueTime: string;
  limitTime: string;
  problems: Problem[];
};

export type QuizRequest = {
  title: string;
  description: string;
  created_time: string;
  due_time: string;
  problems: Problem[];
};
