import {
  ClosedQuizStatsResponse,
  ProblemStatsResponse,
  Quiz,
  QuizFormValues,
  QuizListResponse,
} from '@/features/quiz/quiz.types';

export const QUIZ_LIST_RESPONSE_MIXED: QuizListResponse = [
  {
    id: 'mock-quiz-1',
    title: '미친토익 기본반 RC 퀴즈 1',
    description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
    state: 'ready',
    due_time: '2025-03-20T14:00:00.000Z',
    limit_time: '30분',
    updated_at: '2025-03-19T10:00:00.000Z',
    submit_students: 10,
    total_students: 20,
  },
  {
    id: 'mock-quiz-2',
    title: '미친토익 기본반 LC 퀴즈 2',
    description: '청취력 향상을 위한 퀴즈입니다.',
    state: 'ongoing',
    due_time: '2025-03-20T15:00:00.000Z',
    limit_time: '45분',
    updated_at: '2025-03-19T11:00:00.000Z',
    submit_students: 12,
    total_students: 20,
  },
  {
    id: 'mock-quiz-3',
    title: '미친토익 기본반 RC 퀴즈 3',
    description: '독해 실력을 테스트하는 퀴즈입니다.',
    state: 'closed',
    due_time: '2025-03-18T14:00:00.000Z',
    limit_time: '40분',
    updated_at: '2025-03-18T14:00:00.000Z',
    submit_students: 13,
    total_students: 20,
  },
  {
    id: 'mock-quiz-4',
    title: '미친토익 기본반 LC 퀴즈 4',
    description: '청취력 종합 평가 퀴즈입니다.',
    state: 'closed',
    due_time: '2025-03-17T15:00:00.000Z',
    limit_time: '50분',
    updated_at: '2025-03-17T15:00:00.000Z',
    submit_students: 10,
    total_students: 20,
  },
];

export const QUIZ_ONGOING: Quiz = {
  id: 'mock-ongoing-quiz-1',
  title: '미친토익 기본반 LC 퀴즈 2',
  description: '청취력 향상을 위한 퀴즈입니다.',
  state: 'ongoing',
  dueTime: '2025-03-20T15:00:00.000Z',
  limitTime: '45분',
  updatedAt: '2025-03-19T11:00:00.000Z',
  submitStudents: 12,
  totalStudents: 20,
};

export const QUIZ_READY: Quiz = {
  id: 'mock-ready-quiz-1',
  title: '미친토익 기본반 RC 퀴즈 1',
  description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
  state: 'ready',
  dueTime: '2025-03-20T14:00:00.000Z',
  limitTime: '30분',
  updatedAt: '2025-03-19T10:00:00.000Z',
  submitStudents: 10,
  totalStudents: 20,
};

export const QUIZ_CLOSED: Quiz = {
  id: 'mock-closed-quiz-1',
  title: '미친토익 기본반 RC 퀴즈 3',
  description: '독해 실력을 테스트하는 퀴즈입니다.',
  state: 'closed',
  dueTime: '2025-03-18T14:00:00.000Z',
  limitTime: '40분',
  updatedAt: '2025-03-18T14:00:00.000Z',
  submitStudents: 13,
  totalStudents: 20,
};

export const QUIZ_CLOSED_ERROR: Quiz = {
  id: 'mock-closed-quiz-error',
  title: '미친토익 기본반 RC 퀴즈 3',
  description: '독해 실력을 테스트하는 퀴즈입니다.',
  state: 'closed',
  dueTime: '2025-03-18T14:00:00.000Z',
  limitTime: '40분',
  updatedAt: '2025-03-18T14:00:00.000Z',
  submitStudents: 0,
  totalStudents: 20,
};

export const CLOSED_QUIZ_STATS_FULL: ClosedQuizStatsResponse = [
  {
    rank: 1,
    problem_id: 'mock-problem-choice',
    problem_label: '문항 1',
    incorrect_rate: 0.5,
    incorrect_students: 10,
  },
  {
    rank: 2,
    problem_id: 'mock-problem-choice',
    problem_label: '문항 2',
    incorrect_rate: 0.3,
    incorrect_students: 5,
  },
  {
    rank: 3,
    problem_id: 'mock-problem-essay',
    problem_label: '문항 3',
    incorrect_rate: 0.2,
    incorrect_students: 3,
  },
  {
    rank: 4,
    problem_id: 'mock-problem-essay',
    problem_label: '문항 4',
    incorrect_rate: 0.1,
    incorrect_students: 2,
  },
];

export const CLOSED_QUIZ_STATS_PARTIAL: ClosedQuizStatsResponse = [
  {
    rank: 1,
    problem_id: 'mock-problem-choice',
    problem_label: '문항 1',
    incorrect_rate: 0.5,
    incorrect_students: 10,
  },
  {
    rank: 2,
    problem_id: 'mock-problem-essay',
    problem_label: '문항 2',
    incorrect_rate: 0.3,
    incorrect_students: 5,
  },
];

export const CLOSED_QUIZ_STATS_MAP: Record<string, ClosedQuizStatsResponse> = {
  'mock-quiz-3': CLOSED_QUIZ_STATS_FULL,
  'mock-quiz-4': CLOSED_QUIZ_STATS_PARTIAL,
  'mock-closed-quiz-1': CLOSED_QUIZ_STATS_FULL,
};

export const PROBLEM_STATS_CHOICE: ProblemStatsResponse = {
  problem_label: '문항 1',
  description: 'Four football matches will be broadcast live on three major stations _______ this weekend.',
  type: 'choice',
  items: [
    {
      is_answer: false,
      text: 'a.nation',
      selected_students: 10,
    },
    {
      is_answer: false,
      text: 'b.national',
      selected_students: 5,
    },
    {
      is_answer: false,
      text: 'c.nationality',
      selected_students: 3,
    },
    {
      is_answer: true,
      text: 'd.nationally',
      selected_students: 2,
    },
  ],
};

export const PROBLEM_STATS_ESSAY: ProblemStatsResponse = {
  problem_label: '문항 1',
  description: 'Four football matches will be broadcast live on three major stations _______ this weekend.',
  type: 'essay',
  answer: 'nationally',
  incorrect_submit: [
    {
      rank: 1,
      answer: 'nation',
      incorrect_students: 10,
    },
    {
      rank: 2,
      answer: 'national',
      incorrect_students: 5,
    },
    {
      rank: 3,
      answer: 'nationality',
      incorrect_students: 3,
    },
    {
      rank: 4,
      answer: 'nationaly',
      incorrect_students: 2,
    },
  ],
};

export const PROBLEM_STATS_MAP: Record<string, ProblemStatsResponse> = {
  'mock-problem-choice': PROBLEM_STATS_CHOICE,
  'mock-problem-essay': PROBLEM_STATS_ESSAY,
};

export const TEMPORARY_QUIZ_LIST: QuizListResponse = [
  {
    id: 'mock-temporary-quiz-1',
    title: '미친토익 기본반 RC 퀴즈 1 (수정중)',
    description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
    state: 'temporary',
    due_time: '2025-06-20T14:00:00.000Z',
    limit_time: '30분',
    updated_at: '2025-05-19T10:00:00.000Z',
    submit_students: 0,
    total_students: 20,
  },
  {
    id: 'mock-temporary-quiz-2',
    title: '미친토익 기본반 RC 퀴즈 2 (수정중)',
    description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
    state: 'temporary',
    due_time: '2025-06-20T14:00:00.000Z',
    limit_time: '10분',
    updated_at: '2025-05-19T10:00:00.000Z',
    submit_students: 0,
    total_students: 20,
  },
  {
    id: 'mock-temporary-quiz-3',
    title: '미친토익 기본반 RC 퀴즈 3 (수정중)',
    description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
    state: 'temporary',
    due_time: '2025-06-20T14:00:00.000Z',
    limit_time: '20분',
    updated_at: '2025-05-19T10:00:00.000Z',
    submit_students: 0,
    total_students: 20,
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
      type: 'choice',
      context: '문항 1',
      answerItemId: 'mock-item-1',
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
      type: 'choice',
      context: '문항 2',
      answerItemId: '',
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
      type: 'choice',
      context: '문항 1',
      answerItemId: '',
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
      type: 'choice',
      context: '문항 1',
      answerItemId: '',
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
