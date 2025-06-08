import { ChoiceItem, ProblemFormValues, ProblemType } from '@/features/quiz/quiz.types';

export const QUIZ_LABEL_MAP: Record<ProblemType, string> = {
  CHOICE: '객관식',
  ESSAY: '단답식',
};

export const DEFAULT_PROBLEM: Omit<ProblemFormValues, 'item'> = {
  content: '',
  type: 'CHOICE',
  answerItemId: '',
  answer: '',
  files: [],
};

export const DEFAULT_CHOICE_ITEM: Omit<ChoiceItem, 'id'> = { text: '' };

export const QUIZ_LIMIT_TIME_OPTIONS = [
  '제한없음',
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

export const QUIZ_LIMIT_TIME_REQUEST_OPTIONS = [
  '제한없음',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
  '60',
] as const;

export const QUIZ_LIMIT_TIME_MAP: Record<
  (typeof QUIZ_LIMIT_TIME_OPTIONS)[number],
  (typeof QUIZ_LIMIT_TIME_REQUEST_OPTIONS)[number]
> = {
  제한없음: '제한없음',
  '10분': '10',
  '15분': '15',
  '20분': '20',
  '25분': '25',
  '30분': '30',
  '35분': '35',
  '40분': '40',
  '45분': '45',
  '50분': '50',
  '55분': '55',
  '60분': '60',
};

export const QUIZ_LIMIT_TIME_MAP_TO_RENDER = {
  제한없음: '제한없음',
  '10': '10분',
  '15': '15분',
  '20': '20분',
  '25': '25분',
  '30': '30분',
  '35': '35분',
  '40': '40분',
  '45': '45분',
  '50': '50분',
  '55': '55분',
  '60': '60분',
} as const;
