import { z } from 'zod';
import {
  ChoiceProblemResponseSchema,
  EssayProblemResponseSchema,
  ProblemResponseSchema,
  QuizDetailResponseSchema,
} from '@/features/quiz/schemas/quizDetail.schema';

export type QuizDetailResponse = z.infer<typeof QuizDetailResponseSchema>;
export type ProblemResponse = z.infer<typeof ProblemResponseSchema>;
export type ChoiceProblemResponse = z.infer<typeof ChoiceProblemResponseSchema>;
export type EssayProblemResponse = z.infer<typeof EssayProblemResponseSchema>;
