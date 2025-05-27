import { z } from 'zod';
import {
  PaginatedQuestionDataSchema,
  PaginatedQuestionResponseSchema,
  QuestionSchema,
} from '@/schemas/question.schema';

export type Question = z.infer<typeof QuestionSchema>;
export type PaginatedQuestionData = z.infer<typeof PaginatedQuestionDataSchema>;
export type PaginatedQuestionResponse = z.infer<typeof PaginatedQuestionResponseSchema>;
