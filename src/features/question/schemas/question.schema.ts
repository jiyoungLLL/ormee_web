import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  isAnswered: z.boolean(),
  author: z.string(),
  filePaths: z.array(z.string()),
  createdAt: z.string().datetime(),
});

export const PaginatedQuestionDataSchema = z.object({
  totalElements: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  content: z.array(QuestionSchema),
});
