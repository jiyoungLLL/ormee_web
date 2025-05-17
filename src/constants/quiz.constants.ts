import { ChoiceItem, Problem, ProblemType } from '@/types/quiz.types';

export const QUIZ_TYPE_MAP: Record<ProblemType, { type: ProblemType; label: string }> = {
  choice: { type: 'choice', label: '객관식' },
  essay: { type: 'essay', label: '주관식' },
};

export const DEFAULT_PROBLEM: Omit<Problem, 'item'> = {
  context: '',
  description: '',
  type: QUIZ_TYPE_MAP.choice.type,
  answerItemId: '',
};

export const DEFAULT_CHOICE_ITEM: Omit<ChoiceItem, 'id'> = { text: '' };
