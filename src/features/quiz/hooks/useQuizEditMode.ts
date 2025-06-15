import { useSearchParams } from 'next/navigation';
import { useGetQuizDetailTemp } from './useGetQuizDetail';
import { QuizFormValues } from '@/features/quiz/types/quiz.types';

type UseQuizEditModeReturn = {
  isEditMode: boolean;
  quizId: string | null;
  quizDetail: QuizFormValues & { id: string };
};

export const useQuizEditMode = (): UseQuizEditModeReturn => {
  const searchParams = useSearchParams();
  const createType = searchParams.get('type');
  const quizId = searchParams.get('quizId');

  const isEditMode = createType === 'edit' && quizId !== null;

  const { data } = useGetQuizDetailTemp(quizId ?? '');

  return {
    isEditMode,
    quizId,
    quizDetail: data,
  };
};
