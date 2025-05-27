import { z } from 'zod';

export const QuestionResponseSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  author: z.string(),
  created_at: z.string().datetime(),
  is_answered: z.boolean(),
});

export const PaginatedQuestionResponseSchema = z.object({
  total_count: z.number(),
  total_pages: z.number(),
  current_page: z.number(),
  page_size: z.number(),
  questions: z.array(QuestionResponseSchema),
});

export const QuestionSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  author: z.string(),
  createdAt: z.string().datetime(),
  isAnswered: z.boolean(),
});

export const PaginatedQuestionSchema = z.object({
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
  questions: z.array(QuestionSchema),
});
