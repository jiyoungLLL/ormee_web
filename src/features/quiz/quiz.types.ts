import { z } from 'zod';
import {
  ClosedQuizStatsResponseSchema,
  ClosedQuizStatsSchema,
  QuizListSchema,
  QuizListResponseSchema,
  QuizSchema,
  QuizFormSchema,
  ProblemStatsResponseSchema,
  ProblemStatsSchema,
} from '@/features/quiz/quiz.schema';

export type ProblemType = 'choice' | 'essay';

export type ChoiceItem = {
  id: string;
  text: string;
};

export type Problem = {
  context: string;
  description: string;
  type: ProblemType;
  item: ChoiceItem[];
  answerItemId: string;
};

export type QuizRequest = {
  title: string;
  description: string;
  created_time: string;
  due_time: string;
  problems: Problem[];
};

export type QuizState = 'ready' | 'ongoing' | 'closed' | 'temporary';

export type QuizFormValues = z.infer<typeof QuizFormSchema>;
export type QuizListResponse = z.infer<typeof QuizListResponseSchema>;
export type Quiz = z.infer<typeof QuizSchema>;
export type QuizList = z.infer<typeof QuizListSchema>;
export type ClosedQuizStatsResponse = z.infer<typeof ClosedQuizStatsResponseSchema>;
export type ClosedQuizStats = z.infer<typeof ClosedQuizStatsSchema>;
export type ProblemStatsResponse = z.infer<typeof ProblemStatsResponseSchema>;
export type ProblemStats = z.infer<typeof ProblemStatsSchema>;
