import { Quiz, QuizListResponse } from '@/schemas/quiz.schema';

export const QUIZ_LIST_RESPONSE_MIXED: QuizListResponse = [
  {
    id: 'mock-quiz-1',
    title: '미친토익 기본반 RC 퀴즈 1',
    description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
    state: 'ready',
    due_time: '2024-03-20T14:00:00.000Z',
    limit_time: '30분',
    updated_at: '2024-03-19T10:00:00.000Z',
  },
  {
    id: 'mock-quiz-2',
    title: '미친토익 기본반 LC 퀴즈 2',
    description: '청취력 향상을 위한 퀴즈입니다.',
    state: 'ongoing',
    due_time: '2024-03-20T15:00:00.000Z',
    limit_time: '45분',
    updated_at: '2024-03-19T11:00:00.000Z',
  },
  {
    id: 'mock-quiz-3',
    title: '미친토익 기본반 RC 퀴즈 3',
    description: '독해 실력을 테스트하는 퀴즈입니다.',
    state: 'closed',
    due_time: '2024-03-18T14:00:00.000Z',
    limit_time: '40분',
    updated_at: '2024-03-18T14:00:00.000Z',
  },
  {
    id: 'mock-quiz-4',
    title: '미친토익 기본반 LC 퀴즈 4',
    description: '청취력 종합 평가 퀴즈입니다.',
    state: 'closed',
    due_time: '2024-03-17T15:00:00.000Z',
    limit_time: '50분',
    updated_at: '2024-03-17T15:00:00.000Z',
  },
];

export const QUIZ_ONGOING: Quiz = {
  id: 'mock-ongoing-quiz-1',
  title: '미친토익 기본반 LC 퀴즈 2',
  description: '청취력 향상을 위한 퀴즈입니다.',
  state: 'ongoing',
  dueTime: '2024-03-20T15:00:00.000Z',
  limitTime: '45분',
  updatedAt: '2024-03-19T11:00:00.000Z',
};

export const QUIZ_READY: Quiz = {
  id: 'mock-ready-quiz-1',
  title: '미친토익 기본반 RC 퀴즈 1',
  description: '기본 문법과 어휘를 테스트하는 퀴즈입니다.',
  state: 'ready',
  dueTime: '2024-03-20T14:00:00.000Z',
  limitTime: '30분',
  updatedAt: '2024-03-19T10:00:00.000Z',
};
