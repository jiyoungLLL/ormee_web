import { z } from 'zod';

export const NOTE_ERROR_MESSAGES = {
  EMPTY_TITLE: '쪽지 제목을 입력해주세요.',
  LINE_BREAK_TITLE: '쪽지 제목에 줄바꿈은 사용할 수 없어요.',
} as const;

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, { message: NOTE_ERROR_MESSAGES.EMPTY_TITLE })
    .refine((val) => !/[\r\n]/.test(val), {
      message: NOTE_ERROR_MESSAGES.LINE_BREAK_TITLE,
    }),
});
