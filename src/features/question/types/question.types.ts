import { z } from 'zod';
import {
  PaginatedQuestionDataSchema,
  PaginatedQuestionResponseSchema,
  QuestionDetailResponseSchema,
  QuestionSchema,
} from '@/features/question/schemas/question.schema';

export type Question = z.infer<typeof QuestionSchema>;
export type PaginatedQuestionData = z.infer<typeof PaginatedQuestionDataSchema>;
export type PaginatedQuestionResponse = z.infer<typeof PaginatedQuestionResponseSchema>;
export type QuestionDetailResponse = z.infer<typeof QuestionDetailResponseSchema>;
