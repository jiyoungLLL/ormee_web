import { z } from 'zod';

// TODO: api 완성 후 스키마 수정
export const profileSchema = z.object({
  username: z.string().nullable(),
  name: z.string(),
  nickname: z.string().nullable(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  introduction: z.string().nullable(),
  image: z.string().nullable(),
});
