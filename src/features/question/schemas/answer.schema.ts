import { z } from 'zod';

export const AnswerFormSchema = z.object({
  content: z.string().min(1, { message: '답변을 작성해주세요' }),
  files: z.array(z.object({ id: z.string(), file: z.instanceof(File) })),
});

export const AnswerSubmitRequestSchema = z.object({
  content: z.string().min(1, { message: '답변을 작성해주세요' }),
  files: z.array(z.instanceof(File)),
});

export const AnswerSchema = z.object({
  id: z.string(),
  author: z.string(),
  content: z.string(),
  files: z.array(z.object({ id: z.string(), url: z.string() })),
  createdAt: z.string().datetime(),
});

const SuccessAnswerResponseSchema = z.object({
  status: z.literal('success'),
  code: z.literal(200),
  data: z.array(AnswerSchema),
});

const ErrorAnswerResponseSchema = z.object({
  status: z.literal('error'),
  code: z.number(),
  message: z.string(),
});

export const AnswerResponseSchema = z.discriminatedUnion('status', [
  SuccessAnswerResponseSchema,
  ErrorAnswerResponseSchema,
]);
