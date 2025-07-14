import {
  ClosedQuizStats,
  Quiz,
  QuizCreateRequest,
  QuizDraftRequest,
  QuizFormValues,
} from '@/features/quiz/types/quiz.types';

export const QUIZ_ONGOING: Quiz = {
  id: 'mock-ongoing-quiz-1',
  author: '송이쌤',
  title: '미친토익 기본반 LC 퀴즈 2',
  state: 'ongoing',
  dueTime: '2025-03-20T15:00:00.000Z',
  limitTime: '45분',
  isAvailable: true,
  submitCount: 12,
  totalCount: 20,
};

export const QUIZ_READY: Quiz = {
  id: 'mock-ready-quiz-1',
  author: '송이쌤',
  title: '미친토익 기본반 RC 퀴즈 1',
  state: 'ready',
  dueTime: '2025-03-20T14:00:00.000Z',
  limitTime: '30분',
  isAvailable: false,
  submitCount: 10,
  totalCount: 20,
};

export const QUIZ_CLOSED: Quiz = {
  id: 'mock-closed-quiz-1',
  author: '송이쌤',
  title: '미친토익 기본반 RC 퀴즈 3',
  state: 'closed',
  dueTime: '2025-03-18T14:00:00.000Z',
  limitTime: '40분',
  isAvailable: false,
  submitCount: 13,
  totalCount: 20,
};

export const QUIZ_CLOSED_ERROR: Quiz = {
  id: 'mock-closed-quiz-error',
  author: '송이쌤',
  title: '미친토익 기본반 RC 퀴즈 3',
  state: 'closed',
  dueTime: '2025-03-18T14:00:00.000Z',
  limitTime: '40분',
  isAvailable: false,
  submitCount: 0,
  totalCount: 20,
};

export const CLOSED_QUIZ_STATS_FULL: ClosedQuizStats = [
  {
    rank: 1,
    problemId: 1,
    problemNum: 1,
    incorrectRate: 0.5,
    incorrectCount: 10,
  },
  {
    rank: 2,
    problemId: 2,
    problemNum: 2,
    incorrectRate: 0.3,
    incorrectCount: 5,
  },
  {
    rank: 3,
    problemId: 3,
    problemNum: 3,
    incorrectRate: 0.2,
    incorrectCount: 3,
  },
  {
    rank: 4,
    problemId: 4,
    problemNum: 4,
    incorrectRate: 0.1,
    incorrectCount: 2,
  },
];

export const QUIZ_TEMPORARY_1_EDIT: QuizFormValues & { id: string } = {
  id: 'mock-temporary-quiz-1',
  title: '미친토익 기본반 RC 퀴즈 1 (업데이트)',
  description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
  startTime: '2025-05-24T14:00:00.000Z',
  dueTime: '2025-06-20T14:00:00.000Z',
  limitTime: '30분',
  problems: [
    {
      type: 'CHOICE',
      content: '문항 1',
      answerItemId: 'mock-item-1',
      answer: '',
      files: [],
      item: [
        {
          text: '선지 1',
          id: 'mock-item-1',
        },
        {
          text: '선지 2',
          id: 'mock-item-2',
        },
      ],
    },
    {
      type: 'CHOICE',
      content: '문항 2',
      answerItemId: '',
      answer: '',
      files: [],
      item: [
        {
          text: '선지 1',
          id: 'mock-problem-2-item-1',
        },
        {
          text: '선지 2',
          id: 'mock-problem-2-item-2',
        },
      ],
    },
  ],
};

export const QUIZ_TEMPORARY_2_EDIT: QuizFormValues & { id: string } = {
  id: 'mock-temporary-quiz-2',
  title: '미친토익 기본반 RC 퀴즈 2 (수정중)',
  description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
  startTime: '2025-05-24T14:00:00.000Z',
  dueTime: '2025-06-20T14:00:00.000Z',
  limitTime: '10분',
  problems: [
    {
      type: 'CHOICE',
      content: '문항 1',
      answerItemId: '',
      answer: '',
      files: [],
      item: [
        {
          text: '선지 1',
          id: 'mock-problem-1-item-1',
        },
        {
          text: '선지 2',
          id: 'mock-problem-1-item-2',
        },
      ],
    },
  ],
};

export const QUIZ_TEMPORARY_3_EDIT: QuizFormValues & { id: string } = {
  id: 'mock-temporary-quiz-3',
  title: '미친토익 기본반 RC 퀴즈 3 (수정중)',
  description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
  startTime: '2025-05-24T14:00:00.000Z',
  dueTime: '2025-06-20T14:00:00.000Z',
  limitTime: '20분',
  problems: [
    {
      type: 'CHOICE',
      content: '문항 1',
      answerItemId: '',
      answer: '',
      files: [],
      item: [
        {
          text: '',
          id: 'mock-item-1',
        },
      ],
    },
  ],
};

export const QUIZ_DETAIL_MAP: Record<string, QuizFormValues & { id: string }> = {
  'mock-temporary-quiz-1': QUIZ_TEMPORARY_1_EDIT,
  'mock-temporary-quiz-2': QUIZ_TEMPORARY_2_EDIT,
  'mock-temporary-quiz-3': QUIZ_TEMPORARY_3_EDIT,
};

export const QUIZ_ATTACHMENT_MAP: Record<string, string> = {};

export const QUIZ_DB: Record<string, QuizCreateRequest | QuizDraftRequest> = {
  'mock-quiz-db-1': {
    title: '미친토익 기본반 RC 퀴즈 1',
    description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
    openTime: '2025-03-20T14:00:00.000Z',
    dueTime: '2025-03-20T14:00:00.000Z',
    timeLimit: '30',
    isDraft: false,
    problems: [
      {
        type: 'CHOICE',
        content: '문항 1',
        answer: '',
        items: ['선지 1', '선지 2'],
        fileIds: [],
      },
    ],
  },
  'mock-quiz-db-2': {
    title: '미친토익 기본반 RC 퀴즈 2',
    description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
    openTime: '2025-03-20T14:00:00.000Z',
    dueTime: '2025-03-20T14:00:00.000Z',
    timeLimit: '30',
    isDraft: true,
    problems: [
      {
        type: 'CHOICE',
        content: '문항 1',
        answer: '',
        items: ['선지 1', '선지 2'],
        fileIds: [],
      },
    ],
  },
};
