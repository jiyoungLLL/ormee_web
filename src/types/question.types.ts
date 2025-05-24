import { z } from 'zod';
import {
  PaginatedQuestionResponseSchema,
  QuestionResponseSchema,
  QuestionSchema,
  PaginatedQuestionSchema,
} from '@/schemas/question.schema';

export type QuestionResponse = z.infer<typeof QuestionResponseSchema>;
export type PaginatedQuestionResponse = z.infer<typeof PaginatedQuestionResponseSchema>;

export type Question = z.infer<typeof QuestionSchema>;
export type PaginatedQuestion = z.infer<typeof PaginatedQuestionSchema>;
