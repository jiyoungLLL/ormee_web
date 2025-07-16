import { z } from 'zod';

export const userInfoResponseSchema = z.object({
  username: z.string(),
  name: z.string(),
  nickname: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  introduction: z.null(),
  image: z.null(),
});
