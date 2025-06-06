import { ChoiceItem, ProblemFormValues, ProblemType } from '@/features/quiz/quiz.types';

export const QUIZ_TYPE_MAP: Record<ProblemType, { type: ProblemType; label: string }> = {
  choice: { type: 'choice', label: '객관식' },
  essay: { type: 'essay', label: '주관식' },
};

export const DEFAULT_PROBLEM: Omit<ProblemFormValues, 'item'> = {
  content: '',
  type: QUIZ_TYPE_MAP.choice.type,
  answerItemId: '',
  files: [],
};

export const DEFAULT_CHOICE_ITEM: Omit<ChoiceItem, 'id'> = { text: '' };

export const QUIZ_LIMIT_TIME_OPTIONS = [
  '10분',
  '15분',
  '20분',
  '25분',
  '30분',
  '35분',
  '40분',
  '45분',
  '50분',
  '55분',
  '60분',
] as const;
