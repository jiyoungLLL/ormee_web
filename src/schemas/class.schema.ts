import { z } from 'zod';

export const CLASS_ERROR_MESSAGES = {
  EMPTY_TITLE: '강의명을 입력해주세요.',
  EMPTY_PASSWORD: '비밀번호를 입력해주세요.',
  EMPTY_PERIOD: '수강기간을 설정해주세요.',
  EMPTY_TIME: '수업시간을 설정해주세요.',
  EMPTY_DAY: '수업요일을 선택해주세요.',
  EMPTY_MESSAGE: '한줄소개를 입력해주세요.',
} as const;

export const classSchema = z.object({
  title: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_TITLE }),
  password: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_PASSWORD }),
  message: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_MESSAGE }),
});

export type ClassModalValues = z.infer<typeof classSchema>;
