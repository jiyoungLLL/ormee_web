import { z } from 'zod';

export const CLASS_ERROR_MESSAGES = {
  EMPTY_TITLE: '강의명을 입력해주세요.',
  EMPTY_CODE: '비밀번호를 입력해주세요.',
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
  code: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_CODE }),
  description: z
    .string()
    .min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_DESCRIPTION })
    .max(20, { message: '한 줄 소개는 최대 20자까지 입력 가능해요.' }),
  startDate: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_PERIOD }),
  dueDate: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_PERIOD }),
  startTime: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_TIME }),
  endTime: z.string().min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_TIME }),
  days: z.array(z.string()).min(1, { message: CLASS_ERROR_MESSAGES.EMPTY_DAY }),
});

export type ClassModalValues = z.infer<typeof classSchema>;

export const classResponseSchema = z.object({
  id: z.string(),
  code: z.number(),
  profileImage: z.string(),
  name: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  lectureDays: z.array(z.string()),
  startTime: z.string(),
  endTime: z.string(),
  startDate: z.string(),
  dueDate: z.string(),
  students: z.number(),
  quizList: z.array(z.string()),
  activeQuizCount: z.number(),
  messageAvailable: z.boolean(),
});

export const classListResponseSchema = z.object({
  openLectures: z.array(classResponseSchema),
  closedLectures: z.array(classResponseSchema),
});
