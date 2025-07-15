import { QUIZ_LIMIT_TIME_OPTIONS, QUIZ_LIMIT_TIME_REQUEST_OPTIONS } from '@/features/quiz/quiz.constants';
import { QuizState } from '@/features/quiz/types/quiz.types';
import { z } from 'zod';

// 퀴즈 생성 폼 관련 스키마
export const QUIZ_FORM_ERROR_MESSAGE = {
  // 퀴즈 관련 에러 메세지
  EMPTY_TITLE: '제목을 입력해주세요.',
  EMPTY_DESCRIPTION: '설명을 입력해주세요.',
  EMPTY_DUE_TIME: '응시기한을 입력해주세요.',
  EMPTY_LIMIT_TIME: '응시시간을 선택해주세요.',
  EMPTY_PROBLEMS: '한 문제 이상 입력해주세요.',

  // 문제 관련 에러 메세지
  EMPTY_CONTENT: '문제를 입력해주세요.',
  EMPTY_TYPE: '문제 유형을 선택해주세요.',
  EMPTY_ITEM: '선지를 입력해주세요.',
  EMPTY_ANSWER: '정답을 입력해주세요.',
};

// 퀴즈 생성 폼 스키마
export const ProblemSchema = z.object({
  content: z.string(),
  type: z.enum(['CHOICE', 'ESSAY']),
  item: z.array(z.object({ id: z.string(), text: z.string() })).min(1),
  answerItemId: z.string(),
  answer: z.string(),
  files: z.array(z.object({ id: z.string(), previewUrl: z.string() })),
});

export const QuizFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  startTime: z.string().datetime(),
  dueTime: z.string().datetime(),
  limitTime: z.union([z.enum(QUIZ_LIMIT_TIME_OPTIONS), z.literal('')]),
  problems: z.array(ProblemSchema).min(1),
});

// 퀴즈 생성 요청 스키마
export const ProblemChoiceRequestSchema = z.object({
  content: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_CONTENT }),
  type: z.literal('CHOICE'),
  answer: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_ANSWER }),
  items: z.array(z.string()).min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_ITEM }).min(1),
  fileIds: z.array(z.number()),
});

export const ProblemEssayRequestSchema = z.object({
  content: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_CONTENT }),
  type: z.literal('ESSAY'),
  answer: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_ANSWER }),
  items: z.null(),
  fileIds: z.array(z.number()),
});

export const QuizCreateRequestSchema = z.object({
  title: z.string().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_TITLE }),
  description: z.string(),
  openTime: z.string().datetime().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_DUE_TIME }),
  dueTime: z.string().datetime().min(1, { message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_DUE_TIME }),
  timeLimit: z.enum(QUIZ_LIMIT_TIME_REQUEST_OPTIONS, {
    message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_LIMIT_TIME,
  }),
  isDraft: z.literal(false),
  problems: z.array(z.discriminatedUnion('type', [ProblemChoiceRequestSchema, ProblemEssayRequestSchema])).min(1, {
    message: QUIZ_FORM_ERROR_MESSAGE.EMPTY_PROBLEMS,
  }),
});

// 퀴즈 임시저장 요청 스키마
export const ProblemChoiceDraftRequestSchema = z.object({
  content: z.string(),
  type: z.literal('CHOICE'),
  answer: z.string(),
  items: z.array(z.string()).min(1),
  fileIds: z.array(z.number()),
});

export const ProblemEssayDraftRequestSchema = z.object({
  content: z.string(),
  type: z.literal('ESSAY'),
  answer: z.string(),
  items: z.null(),
  fileIds: z.array(z.number()),
});

export const QuizDraftRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  openTime: z.union([z.string().datetime(), z.literal('')]),
  dueTime: z.union([z.string().datetime(), z.literal('')]),
  timeLimit: z.union([z.enum(QUIZ_LIMIT_TIME_REQUEST_OPTIONS), z.literal('')]),
  isDraft: z.literal(true),
  problems: z
    .array(z.discriminatedUnion('type', [ProblemChoiceDraftRequestSchema, ProblemEssayDraftRequestSchema]))
    .min(1),
});

export const QuizResponseSchema = z.object({
  id: z.number(),
  author: z.string(),
  quizName: z.string().min(1),
  quizDate: z.string().min(1),
  timeLimit: z.number(),
  quizAvailable: z.boolean(),
  submitCount: z.number(),
  totalCount: z.number(),
});

export const QuizListResponseSchema = z.object({
  openQuizzes: z.array(QuizResponseSchema),
  closedQuizzes: z.array(QuizResponseSchema),
});

export const DraftQuizResponseSchema = z.object({
  id: z.string().min(1),
  author: z.string(),
  quizName: z.string(),
  quizDate: z.union([z.string(), z.null()]),
  timeLimit: z.union([z.number(), z.null()]),
  quizAvailable: z.boolean(),
  submitCount: z.number(),
  totalCount: z.number(),
});

export const DraftQuizListResponseSchema = z.array(DraftQuizResponseSchema);

export const QuizSchema = z.object({
  id: z.string().min(1),
  author: z.string(),
  state: z.enum(['ready', 'ongoing', 'closed', 'temporary'] as const satisfies readonly QuizState[]),
  title: z.string().min(1),
  dueTime: z.string().datetime().min(1),
  isAvailable: z.boolean(),
  limitTime: z.enum(QUIZ_LIMIT_TIME_OPTIONS),
  submitCount: z.number(),
  totalCount: z.number(),
});

export const QuizListSchema = z.object({
  openQuizzes: z.array(QuizSchema),
  closedQuizzes: z.array(QuizSchema),
});

// 마감 퀴즈 관련 스키마
export const ClosedQuizStatsSchema = z
  .array(
    z.object({
      rank: z.number(),
      problemId: z.number(),
      problemNum: z.number(),
      incorrectRate: z.number(),
      incorrectCount: z.number(),
    }),
  )
  .max(4);

export const ProblemStatsResponseSchema = z.object({
  content: z.string().min(1),
  type: z.enum(['CHOICE', 'ESSAY']),
  answer: z.string().min(1),
  results: z.array(
    z.object({
      count: z.number(),
      option: z.string(),
    }),
  ),
});

export const ProblemStatsSchema = z
  .object({
    content: z.string().min(1),
    type: z.enum(['CHOICE', 'ESSAY']),
  })
  .and(
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal('CHOICE'),
        items: z.array(
          z.object({
            isAnswer: z.boolean(),
            text: z.string().min(1),
            selectedStudents: z.number(),
          }),
        ),
      }),
      z.object({
        type: z.literal('ESSAY'),
        answer: z.string().min(1),
        incorrectSubmit: z.array(
          z.object({
            rank: z.number(),
            answer: z.string(),
            incorrectStudents: z.number(),
          }),
        ),
      }),
    ]),
  );
