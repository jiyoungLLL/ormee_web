import { ChoiceItem, ProblemFormValues, ProblemType } from '@/features/quiz/quiz.types';

export const QUIZ_LABEL_MAP: Record<ProblemType, string> = {
  CHOICE: '객관식',
  ESSAY: '단답식',
};

export const DEFAULT_PROBLEM: Omit<ProblemFormValues, 'item'> = {
  content: '',
  type: 'CHOICE',
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
