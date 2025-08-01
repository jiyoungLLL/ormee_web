import { z } from 'zod';
import {
  ClosedQuizStatsSchema,
  QuizListSchema,
  QuizListResponseSchema,
  QuizSchema,
  QuizFormSchema,
  ProblemStatsResponseSchema,
  ProblemStatsSchema,
  ProblemSchema,
  QuizCreateRequestSchema,
  ProblemChoiceRequestSchema,
  ProblemEssayRequestSchema,
  QuizDraftRequestSchema,
  QuizResponseSchema,
  DraftQuizListResponseSchema,
} from '@/features/quiz/schemas/quiz.schema';

export type ProblemType = 'CHOICE' | 'ESSAY';

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

export type ProblemFormValues = z.infer<typeof ProblemSchema>;
export type QuizFormValues = z.infer<typeof QuizFormSchema>;
export type ProblemRequest = z.infer<typeof ProblemChoiceRequestSchema> | z.infer<typeof ProblemEssayRequestSchema>;
export type QuizCreateRequest = z.infer<typeof QuizCreateRequestSchema>;
export type QuizDraftRequest = z.infer<typeof QuizDraftRequestSchema>;
export type QuizResponse = z.infer<typeof QuizResponseSchema>;
export type QuizListResponse = z.infer<typeof QuizListResponseSchema>;
export type Quiz = z.infer<typeof QuizSchema>;
export type QuizList = z.infer<typeof QuizListSchema>;
export type DraftQuizListResponse = z.infer<typeof DraftQuizListResponseSchema>;
export type ClosedQuizStats = z.infer<typeof ClosedQuizStatsSchema>;
export type ProblemStatsResponse = z.infer<typeof ProblemStatsResponseSchema>;
export type ProblemStats = z.infer<typeof ProblemStatsSchema>;
