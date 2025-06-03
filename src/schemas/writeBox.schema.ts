import { z } from 'zod';

export const WRITE_ERROR_MESSAGES = {
  EMPTY_TITLE: '제목을 입력해주세요.',
  EMPTY_CONTENTS: '본문을 입력해주세요.',
} as const;

export const writeBoxSchema = z.object({
  title: z.string().min(1, { message: WRITE_ERROR_MESSAGES.EMPTY_TITLE }),
  description: z.string().min(1, { message: WRITE_ERROR_MESSAGES.EMPTY_CONTENTS }),
  files: z.array(z.string()).optional(),
  isDraft: z.boolean(),
  openTime: z.string().min(1),
  dueTime: z.string().min(1),
});

export type WriteBoxFormValues = z.infer<typeof writeBoxSchema>;
