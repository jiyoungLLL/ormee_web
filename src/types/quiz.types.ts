export type ProblemType = 'choice' | 'essay';

export type ChoiceItem = {
  text: string;
};

export type Problem = {
  context: string;
  description: string;
  type: ProblemType;
  item: ChoiceItem[];
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
