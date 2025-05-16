import { Problem, ProblemType } from '@/types/quiz.types';

export const QUIZ_TYPE_MAP: Record<ProblemType, { type: ProblemType; label: string }> = {
  choice: { type: 'choice', label: '객관식' },
  essay: { type: 'essay', label: '주관식' },
};

export const DEFAULT_PROBLEM: Problem = {
  context: '제목',
  description: '',
  type: QUIZ_TYPE_MAP.choice.type,
  item: [''],
  answer: '',
};
