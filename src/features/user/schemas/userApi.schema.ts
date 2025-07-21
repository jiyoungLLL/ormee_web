import { z } from 'zod';
import {
  nameSchema,
  nicknameSchema,
  phoneNumberSchema,
  USER_ERROR_MESSAGES,
} from '@/features/user/schemas/user.schema';

export const userInfoResponseSchema = z.object({
  username: z.string(),
  name: z.string(),
  nickname: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  introduction: z.null(),
  image: z.null(),
});

export const userInfoEditRequestSchema = z.object({
  phoneNumber: phoneNumberSchema,
  email: z.string().email({ message: USER_ERROR_MESSAGES.INVALID_EMAIL }),
  name: nameSchema,
  nickname: nicknameSchema,
});
