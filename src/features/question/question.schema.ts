import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  content: z.string(),
  isAnswered: z.boolean(),
  author: z.string(),
  filePaths: z.array(z.string()),
  createdAt: z.string().datetime(),
});

export const PaginatedQuestionDataSchema = z.object({
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
  questions: z.array(QuestionSchema),
});

const SuccessPaginatedQuestionResponseSchema = z.object({
  status: z.literal('success'),
  code: z.literal(200),
  data: PaginatedQuestionDataSchema,
});

const ErrorPaginatedQuestionResponseSchema = z.object({
  status: z.literal('error'),
  code: z.number(),
  message: z.string(),
});

export const PaginatedQuestionResponseSchema = z.discriminatedUnion('status', [
  SuccessPaginatedQuestionResponseSchema,
  ErrorPaginatedQuestionResponseSchema,
]);

const SuccessQuestionDetailResponseSchema = z.object({
  status: z.literal('success'),
  code: z.literal(200),
  data: QuestionSchema,
});

const ErrorQuestionDetailResponseSchema = z.object({
  status: z.literal('error'),
  code: z.number(),
  message: z.string(),
});

export const QuestionDetailResponseSchema = z.discriminatedUnion('status', [
  SuccessQuestionDetailResponseSchema,
  ErrorQuestionDetailResponseSchema,
]);

export const AnswerFormSchema = z.object({
  content: z.string().min(1, { message: '답변을 작성해주세요' }),
  files: z.array(z.object({ id: z.string(), file: z.instanceof(File) })),
});

export const AnswerSubmitRequestSchema = z.object({
  content: z.string().min(1, { message: '답변을 작성해주세요' }),
  files: z.array(z.instanceof(File)),
});

export const AnswerResponseSchema = z.array(
  z.object({
    id: z.string(),
    content: z.string(),
    files: z.array(z.object({ id: z.string(), url: z.string() })),
    createdAt: z.string().datetime(),
  }),
);
