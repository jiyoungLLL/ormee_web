import { z } from 'zod';

export const WRITE_ERROR_MESSAGES = {
  EMPTY_TITLE: '제목을 입력해주세요.',
  EMPTY_CONTENTS: '본문을 입력해주세요.',
} as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_TOTAL_SIZE = 50 * 1024 * 1024;

export const writeBoxSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    files: z
      .array(z.instanceof(File))
      .optional()
      .refine((files) => !files || files.every((file) => file.size <= MAX_FILE_SIZE), {
        message: '각 파일은 10MB 이하여야 해요.',
      })
      .refine((files) => !files || files.reduce((total, file) => total + file.size, 0) <= MAX_TOTAL_SIZE, {
        message: '파일은 총 50MB까지 첨부 가능해요.',
      }),
    isDraft: z.boolean(),
    dueTime: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.isDraft) {
      if (!data.title || data.title.trim() == '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['title'],
          message: WRITE_ERROR_MESSAGES.EMPTY_TITLE,
        });
      }
      if (!data.description || data.description.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['description'],
          message: WRITE_ERROR_MESSAGES.EMPTY_CONTENTS,
        });
      }
      if (!data.dueTime || data.dueTime.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['dueTime'],
          message: '마감일을 입력해주세요.',
        });
      }
    }
  });

export type WriteBoxFormValues = z.infer<typeof writeBoxSchema>;
