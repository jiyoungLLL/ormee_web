import { z } from 'zod';
import { PaginatedQuestionDataSchema, QuestionSchema } from '@/features/question/schemas/question.schema';

export type Question = z.infer<typeof QuestionSchema>;
export type PaginatedQuestionData = z.infer<typeof PaginatedQuestionDataSchema>;
