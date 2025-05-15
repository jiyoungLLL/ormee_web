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
  type: z.enum(['choice', 'essay'], { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_TYPE }),
  item: z
    .array(z.string())
    .min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_ITEM })
    .min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_ITEM }),
  answer: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_ANSWER }),
});

export const QuizFormSchema = z.object({
  title: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_TITLE }),
  dueTime: z.string().datetime().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_DUE_TIME }),
  limitTime: z.string().datetime().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_LIMIT_TIME }),
  problems: z.array(ProblemSchema).min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_PROBLEMS }),
});

export type QuizFormValues = z.infer<typeof QuizFormSchema>;
