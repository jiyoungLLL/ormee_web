import { z } from 'zod';

export const ChoiceProblemResponseSchema = z.object({
  id: z.number(),
  content: z.string(),
  type: z.literal('CHOICE'),
  answer: z.string(),
  items: z.array(z.string()).min(1),
  fileIds: z.null(),
  filePaths: z.array(z.string().optional()),
  submission: z.null(),
  isCorrect: z.null(),
});

export const EssayProblemResponseSchema = z.object({
  id: z.number(),
  content: z.string(),
  type: z.literal('ESSAY'),
  answer: z.string(),
  items: z.array(z.never()),
  fileIds: z.null(),
  filePaths: z.array(z.string().optional()),
});

export const ProblemResponseSchema = z.discriminatedUnion('type', [
  ChoiceProblemResponseSchema,
  EssayProblemResponseSchema,
]);

export const QuizDetailResponseSchema = z.object({
  title: z.string(),
  description: z.string(),
  dueTime: z.string(),
  timeLimit: z.number(),
  problems: z.array(ProblemResponseSchema),
  opened: z.boolean(),
});
