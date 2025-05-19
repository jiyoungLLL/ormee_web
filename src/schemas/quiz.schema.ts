import { QUIZ_LIMIT_TIME_OPTIONS, QUIZ_TYPE_MAP } from '@/constants/quiz.constants';
import { QuizState } from '@/types/quiz.types';
import { z } from 'zod';

export const QUIZ_FORM_ERROR_MESSAGE = {
  // 퀴즈 관련 에러 메세지
  EMPTY_TITLE: '제목을 입력해주세요.',
  EMPTY_DUE_TIME: '응시기한을 입력해주세요.',
  EMPTY_LIMIT_TIME: '응시시간을 입력해주세요.',
  EMPTY_PROBLEMS: '한 문제 이상 입력해주세요.',

  // 문제 관련 에러 메세지
  EMPTY_CONTEXT: '문제를 입력해주세요.',
  EMPTY_TYPE: '문제 유형을 선택해주세요.',
  EMPTY_ITEM: '선지를 입력해주세요.',
  EMPTY_ANSWER: '정답을 입력해주세요.',
};

export const ProblemSchema = z.object({
  context: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_CONTEXT }),
  description: z.string().optional(),
  type: z.enum(Object.keys(QUIZ_TYPE_MAP) as [keyof typeof QUIZ_TYPE_MAP, ...Array<keyof typeof QUIZ_TYPE_MAP>]),
  item: z.array(z.object({ id: z.string(), text: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_ITEM }) })),
  answerItemId: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_ANSWER }),
});

export const QuizFormSchema = z.object({
  title: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_TITLE }),
  description: z.string().optional(),
  dueTime: z.string().datetime().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_DUE_TIME }),
  limitTime: z.enum(QUIZ_LIMIT_TIME_OPTIONS, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_LIMIT_TIME }),
  problems: z.array(ProblemSchema).min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_PROBLEMS }),
});

export const ProblemResponseSchema = z.object({
  context: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(Object.keys(QUIZ_TYPE_MAP) as [keyof typeof QUIZ_TYPE_MAP, ...Array<keyof typeof QUIZ_TYPE_MAP>]),
  item: z.array(z.object({ id: z.string(), text: z.string() })).optional(),
});

export const QuizResponseSchema = z.object({
  id: z.string().min(1),
  state: z.enum(['ready', 'ongoing', 'closed'] as const satisfies readonly QuizState[]),
  title: z.string().min(1),
  description: z.string().optional(),
  due_time: z.string().datetime().min(1),
  limit_time: z.enum(QUIZ_LIMIT_TIME_OPTIONS),
  problems: z.array(ProblemResponseSchema),
});

export const QuizListResponseSchema = z.array(QuizResponseSchema);

export type QuizFormValues = z.infer<typeof QuizFormSchema>;
export type QuizListResponse = z.infer<typeof QuizListResponseSchema>;
