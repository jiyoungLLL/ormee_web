import { z } from 'zod';

export const AUTH_ERROR_MESSAGES = {
  EMPTY_ID: '아이디를 입력해주세요.',
  EMPTY_PASSWORD: '비밀번호를 입력해주세요.',
} as const;

export const signinSchema = z.object({
  id: z.string().min(1, { message: AUTH_ERROR_MESSAGES.EMPTY_ID }),
  password: z.string().min(1, { message: AUTH_ERROR_MESSAGES.EMPTY_PASSWORD }),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
