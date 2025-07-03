import { z } from 'zod';

export const CLASS_ERROR_MESSAGES = {
  EMPTY_TITLE: '강의명을 입력해주세요.',
  EMPTY_PERIOD: '수강 기간을 설정해주세요.',
  EMPTY_TIME: '수업 시간을 설정해주세요.',
  EMPTY_DAY: '수업 요일을 선택해주세요.',
  EMPTY_DESCRIPTION: '한줄 소개를 입력해주세요.',
} as const;

export const classSchema = z.object({
  title: z
    .string()
    .min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_TITLE })
    .max(20, { message: '강의명은 최대 20자까지 입력 가능해요.' }),
  password: z.string().optional(),
  description: z
    .string()
    .min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_DESCRIPTION })
    .max(20, { message: '한 줄 소개는 최대 20자까지 입력 가능해요.' }),
  startDate: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_PERIOD }),
  dueDate: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_PERIOD }),
  startTime: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_TIME }),
  endTime: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_TIME }),
  lectureDays: z.array(z.string()).min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_DAY }),
  coworker: z.string().optional(),
});

export type ClassModalValues = z.infer<typeof classSchema>;
