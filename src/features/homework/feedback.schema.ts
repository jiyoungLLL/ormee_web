import { z } from 'zod';

const stickerEnumValues = ['EXCELLENT', 'GOOD', 'OK', 'FIGHTING', 'IMPROVE'] as const;
export const stickerEnum = z.enum(stickerEnumValues);

export const feedbackSchema = z.object({
  content: z
    .string()
    .regex(/^[^0-9~`!@#$%^&*()\-_=+[\]{}|;:'",.<>/?\\]*$/, {
      message: '특수문자 및 숫자는 입력 불가해요.',
    })
    .optional(),
  stamp: stickerEnum.optional(),
});

export type Feedback = z.infer<typeof feedbackSchema>;
