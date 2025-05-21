import { ClosedQuizStats, Quiz, QuizListResponse } from '@/types/quiz.types';

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

export const CLOSED_QUIZ_STATS_FULL: ClosedQuizStats = [
  {
    rank: 1,
    problemId: 'mock-problem-1',
    incorrectRate: 0.5,
    incorrectStudents: 10,
  },
  {
    rank: 2,
    problemId: 'mock-problem-2',
    incorrectRate: 0.3,
    incorrectStudents: 5,
  },
  {
    rank: 3,
    problemId: 'mock-problem-3',
    incorrectRate: 0.2,
    incorrectStudents: 3,
  },
  {
    rank: 4,
    problemId: 'mock-problem-4',
    incorrectRate: 0.1,
    incorrectStudents: 2,
  },
];

export const CLOSED_QUIZ_STATS_PARTIAL: ClosedQuizStats = [
  {
    rank: 1,
    problemId: 'mock-problem-1',
    incorrectRate: 0.5,
    incorrectStudents: 10,
  },
  {
    rank: 2,
    problemId: 'mock-problem-2',
    incorrectRate: 0.3,
    incorrectStudents: 5,
  },
];

export const CLOSED_QUIZ_STATS_MAP: Record<string, ClosedQuizStats> = {
  'mock-quiz-3': CLOSED_QUIZ_STATS_FULL,
  'mock-quiz-4': CLOSED_QUIZ_STATS_PARTIAL,
  'closed-quiz-1': CLOSED_QUIZ_STATS_FULL,
};
